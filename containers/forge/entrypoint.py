"""Supervise the local GGUF server and batch; forward signals and reap children."""

import fcntl
import hashlib
import json
import os
import signal
import subprocess
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

from vuorse_vortex.jsonl import validate_jsonl

# Maximum accepted asset sizes: 64 GiB for weights, 1 GiB for source JSONL.
MODEL_MAX_BYTES = 64 * 1024**3
INPUT_MAX_BYTES = 1024**3
STARTUP_BUDGET_SECONDS = 5400


def fetch_asset(path, url, expected, max_bytes=MODEL_MAX_BYTES):
    def reusable():
        if not path.exists():
            return False
        if not expected:
            return True
        digest = hashlib.sha256()
        with path.open("rb") as handle:
            for block in iter(lambda: handle.read(1024 * 1024), b""):
                digest.update(block)
        if digest.hexdigest() == expected.lower():
            return True
        if not url:
            raise SystemExit(f"Existing asset checksum mismatch: {path.name}")
        return False

    if reusable():
        return
    if not url or not expected:
        raise SystemExit(f"Missing {path}; mount it or supply its URL and SHA256")
    if not url.startswith("https://"):
        raise SystemExit("Asset URLs must use HTTPS")
    path.parent.mkdir(parents=True, exist_ok=True)
    # The lock remains in place so all processes lock the same inode.
    with path.with_suffix(path.suffix + ".lock").open("a") as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        if reusable():
            return
        partial = path.with_suffix(path.suffix + ".partial")
        digest = hashlib.sha256()
        try:
            with urllib.request.urlopen(url, timeout=120) as response, partial.open("wb") as handle:
                header = (
                    response.headers.get("Content-Length") if hasattr(response, "headers") else None
                )
                if header is not None and int(header) > max_bytes:
                    raise ValueError(f"Asset exceeds size limit: {path.name}")
                size = 0
                for block in iter(lambda: response.read(1024 * 1024), b""):
                    size += len(block)
                    if size > max_bytes:
                        raise ValueError(f"Asset exceeds size limit: {path.name}")
                    handle.write(block)
                    digest.update(block)
            if digest.hexdigest() != expected.lower():
                raise SystemExit(f"Checksum mismatch for {path.name}")
            partial.replace(path)
        finally:
            partial.unlink(missing_ok=True)


def main():
    def startup_timeout(signum, frame):
        raise TimeoutError("Startup exceeded the 90-minute budget")

    # Bounds downloads, asset locks, preflight and both server loads together.
    signal.signal(signal.SIGALRM, startup_timeout)
    signal.alarm(STARTUP_BUDGET_SECONDS)
    subprocess.run(["nvidia-smi"], check=True)
    # A real CUDA operation, before model load; built from CUDA's sample API.
    subprocess.run(["/opt/bin/cuda-check"], check=True)
    input_path = Path("/input/debriefing_walled.jsonl")
    if os.environ.get("INPUT_URL"):
        input_path = Path("/data/input/debriefing_walled.jsonl")
        fetch_asset(
            input_path, os.environ["INPUT_URL"], os.environ.get("INPUT_SHA256"), INPUT_MAX_BYTES
        )
    if not input_path.is_file() or validate_jsonl(input_path):
        raise SystemExit("Missing or invalid input JSONL; supply valid MemoryRecord input first")
    model = Path(os.environ["MODEL_PATH"])
    fetch_asset(model, os.environ.get("MODEL_URL"), os.environ.get("MODEL_SHA256"))
    server = subprocess.Popen(
        [
            "/opt/bin/llama-server",
            "-m",
            str(model),
            "--host",
            "127.0.0.1",
            "--port",
            "8080",
            "--alias",
            "vuorse-qwen",
            "--n-gpu-layers",
            "all",
            "--ctx-size",
            os.environ.get("CONTEXT_SIZE", "4096"),
            "--parallel",
            os.environ.get("PARALLEL", "1"),
        ]
    )
    children = [server]

    def stop(signum, frame):
        for child in reversed(children):
            if child.poll() is None:
                child.terminate()
        raise SystemExit(128 + signum)

    signal.signal(signal.SIGTERM, stop)
    signal.signal(signal.SIGINT, stop)
    try:
        embeddings = subprocess.Popen(
            [
                "/opt/bin/llama-server",
                "-m",
                os.environ["EMBEDDING_MODEL_PATH"],
                "--host",
                "127.0.0.1",
                "--port",
                "8081",
                "--alias",
                "vuorse-embed",
                "--n-gpu-layers",
                "all",
                "--embedding",
                "--pooling",
                "mean",
                "--ctx-size",
                "512",
                "--batch-size",
                "512",
                "--ubatch-size",
                "512",
                "--parallel",
                "1",
            ]
        )
        children.append(embeddings)
        deadline = time.monotonic() + 600
        pending = {8080, 8081}
        while pending and time.monotonic() < deadline:
            if any(child.poll() is not None for child in children):
                raise RuntimeError("GGUF server exited during load; inspect server logs")
            for port in list(pending):
                try:
                    with urllib.request.urlopen(f"http://127.0.0.1:{port}/health", timeout=2) as r:
                        if json.load(r).get("status") == "ok":
                            pending.remove(port)
                except (OSError, urllib.error.URLError):
                    pass
            if pending:
                time.sleep(1)
        if pending:
            raise RuntimeError("GGUF load timed out after 600 seconds")
        signal.alarm(0)
        worker = subprocess.Popen(
            [sys.executable, "-m", "vuorse_vortex.forge", "--input", str(input_path), *sys.argv[1:]]
        )
        children.append(worker)
        while worker.poll() is None:
            if any(child.poll() is not None for child in (server, embeddings)):
                raise RuntimeError("GGUF server died during generation")
            time.sleep(1)
        return worker.returncode
    finally:
        for child in reversed(children):
            if child.poll() is None:
                child.terminate()
            try:
                child.wait(timeout=10)
            except subprocess.TimeoutExpired:
                child.kill()
                child.wait()


if __name__ == "__main__":
    sys.exit(main())
