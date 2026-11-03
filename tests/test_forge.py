"""Batch journal recovery and draft lineage, without CUDA or model downloads."""

import argparse
import json
import sys
from types import SimpleNamespace

import pytest

from vuorse_vortex import forge
from vuorse_vortex.synthesis import generate_seed_theses


@pytest.fixture
def setup_run(tmp_path, monkeypatch, patch_walled_pool):
    roots = [r.model_dump(exclude_none=True) for r in generate_seed_theses(n_records=3)]
    source = tmp_path / "input.jsonl"
    source.write_text("\n".join(json.dumps(r) for r in roots) + "\n")
    model = tmp_path / "model.gguf"
    model.write_bytes(b"fixture model identity")
    monkeypatch.setenv("EMBEDDING_MODEL_PATH", str(model))
    args = argparse.Namespace(
        input=source, model=model, output=tmp_path / "run", seed=42, cycles=3, url="http://unused"
    )
    rows = {}

    class Collection:
        def upsert(self, ids, documents):
            rows.update(zip(ids, documents, strict=True))

        def query(self, query_texts, n_results):
            return {"ids": [list(rows)[:n_results]]}

    class Client:
        def __init__(self, path):
            pass

        def get_or_create_collection(self, *args, **kwargs):
            return Collection()

    monkeypatch.setitem(sys.modules, "chromadb", SimpleNamespace(PersistentClient=Client))
    monkeypatch.setitem(
        sys.modules,
        "chromadb.utils.embedding_functions",
        SimpleNamespace(DefaultEmbeddingFunction=lambda: None),
    )
    monkeypatch.setattr(forge, "complete", lambda *a: {"title": "Draft", "text": "New hypothesis"})
    return args, roots, rows


def test_batch_resume_is_idempotent_and_rebuilds_store(setup_run):
    args, roots, rows = setup_run
    forge.run(args)
    journal = args.output / "candidates.jsonl"
    before = journal.read_bytes()
    rows.clear()
    forge.run(args)
    assert journal.read_bytes() == before
    assert len(rows) == len(roots) + 3
    records = [json.loads(line) for line in before.splitlines()]
    for record in records:
        assert record["layer"] == "apocrypha"
        assert record["behavior"]["may_state_as_fact"] is False
        assert record["behavior"]["may_reveal_to_user"] is False
        assert len(record["metadata"]["provenance"]["parent_atom_ids"]) == 2
    assert not (args.output / "approved").exists()


def test_partial_tail_recovery_and_more_cycles(setup_run):
    args, _, _ = setup_run
    forge.run(args)
    journal = args.output / "candidates.jsonl"
    with journal.open("ab") as handle:
        handle.write(b'{"partial":')
    args.cycles = 4
    forge.run(args)
    assert len(journal.read_text().splitlines()) == 4
    assert forge.validate_jsonl(journal) == []


def test_resume_rejects_changed_model(setup_run):
    args, _, _ = setup_run
    forge.run(args)
    args.model.write_bytes(b"changed model")
    with pytest.raises(ValueError, match="differ"):
        forge.run(args)


def test_model_failure_leaves_completed_records_resumable(setup_run, monkeypatch):
    args, _, _ = setup_run
    forge.run(args)
    args.cycles = 4

    def fail(*args):
        raise ValueError("invalid model JSON")

    monkeypatch.setattr(forge, "complete", fail)
    with pytest.raises(ValueError):
        forge.run(args)
    assert len((args.output / "candidates.jsonl").read_text().splitlines()) == 3


def test_completion_validates_response(monkeypatch):
    from io import BytesIO

    payload = {"choices": [{"message": {"content": json.dumps({"title": "X", "text": "Y"})}}]}
    requests = []

    def respond(request, timeout):
        requests.append(json.loads(request.data))
        return BytesIO(json.dumps(payload).encode())

    monkeypatch.setattr(forge.urllib.request, "urlopen", respond)
    assert forge.complete("http://local", [], 7) == {"title": "X", "text": "Y"}
    assert requests[0]["seed"] == 7
    payload["choices"][0]["message"]["content"] = '{"title": "X", "text": []}'
    with pytest.raises(ValueError, match="nonempty"):
        forge.complete("http://local", [], 7)


def test_download_checksum_rejects_corruption(tmp_path, monkeypatch):
    import importlib.util
    from io import BytesIO
    from pathlib import Path

    spec = importlib.util.spec_from_file_location(
        "forge_entrypoint", Path(__file__).parents[1] / "containers/forge/entrypoint.py"
    )
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    target = tmp_path / "model.gguf"
    monkeypatch.setattr(module.urllib.request, "urlopen", lambda *a, **k: BytesIO(b"bad"))
    with pytest.raises(SystemExit, match="Checksum mismatch"):
        module.fetch_asset(target, "https://fixture.invalid/model", "0" * 64)
    assert not target.exists()
    target.write_bytes(b"bad")
    with pytest.raises(SystemExit, match="Existing asset checksum"):
        module.fetch_asset(target, None, "0" * 64)


def test_separate_batches_have_distinct_ids(setup_run):
    args, _, rows = setup_run
    forge.run(args)
    first = json.loads((args.output / "candidates.jsonl").read_text().splitlines()[0])
    args.output = args.output.parent / "another-run"
    rows.clear()  # A different output directory has a separate Chroma collection.
    forge.run(args)
    second = json.loads((args.output / "candidates.jsonl").read_text().splitlines()[0])
    assert first["id"] != second["id"]


def test_embedding_clips_tokens_and_preserves_separator(monkeypatch):
    from io import BytesIO

    def respond(request, timeout):
        if request.full_url.endswith("/tokenize"):
            return BytesIO(json.dumps({"tokens": list(range(600))}).encode())
        tokens = json.loads(request.data)["input"]
        assert len(tokens) == 512
        assert tokens[-1] == 599
        return BytesIO(json.dumps({"data": [{"embedding": [0, 1.0, 0]}]}).encode())

    monkeypatch.setattr(forge.urllib.request, "urlopen", respond)
    assert forge.LlamaEmbeddingFunction()(["synthetic"]) == [[0.0, 1.0, 0.0]]


def test_restart_repairs_failure_between_journal_and_chroma(setup_run, monkeypatch):
    args, _, rows = setup_run
    forge.run(args)
    args.cycles = 4
    original_client = sys.modules["chromadb"].PersistentClient

    class FailingClient(original_client):
        def get_or_create_collection(self, *args, **kwargs):
            collection = super().get_or_create_collection(*args, **kwargs)
            original_upsert = collection.upsert

            def upsert(ids, documents):
                if len(ids) == 1:
                    raise RuntimeError("simulated index failure after journal write")
                return original_upsert(ids, documents)

            collection.upsert = upsert
            return collection

    monkeypatch.setattr(sys.modules["chromadb"], "PersistentClient", FailingClient)
    with pytest.raises(RuntimeError, match="index failure"):
        forge.run(args)
    journal = args.output / "candidates.jsonl"
    before = journal.read_bytes()
    assert len(before.splitlines()) == 4
    monkeypatch.setattr(sys.modules["chromadb"], "PersistentClient", original_client)
    forge.run(args)
    assert journal.read_bytes() == before
    assert json.loads(before.splitlines()[-1])["id"] in rows
