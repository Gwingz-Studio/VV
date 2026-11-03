"""JSONL validation helpers."""

from __future__ import annotations

from collections.abc import Iterator
from io import BytesIO
from pathlib import Path
from typing import Any

import orjson
from pydantic import ValidationError

from vuorse_vortex.firewall import CanonFirewallValidator
from vuorse_vortex.schemas import MemoryRecord


def iter_jsonl(path: Path, *, data: bytes | None = None) -> Iterator[tuple[int, Any]]:
    with path.open("rb") if data is None else BytesIO(data) as f:
        for line_no, raw in enumerate(f, start=1):
            line = raw.strip()
            if not line:
                continue
            yield line_no, orjson.loads(line)


def validate_jsonl(path: Path, *, data: bytes | None = None) -> list[str]:
    errors: list[str] = []
    seen: set[str] = set()
    firewall = CanonFirewallValidator()

    for line_no, obj in iter_jsonl(path, data=data):
        try:
            record = MemoryRecord.model_validate(obj)
        except ValidationError as exc:
            errors.append(f"{path}:{line_no}: schema error: {exc}")
            continue

        if record.id in seen:
            errors.append(f"{path}:{line_no}: duplicate id: {record.id}")
        seen.add(record.id)

        for msg in firewall.validate_record(record):
            errors.append(f"{path}:{line_no}: {msg}")

    return errors
