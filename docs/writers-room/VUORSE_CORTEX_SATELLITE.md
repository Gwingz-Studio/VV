# VUORSE-VORTEX Cortex Satellite

## Purpose

The VUORSE-VORTEX Cortex Satellite is a project-local retrieval service modeled on `/mnt/d/runb/slay-cortex`.

It adopts Slay Cortex's durable SQLite FTS5 retrieval pattern while retaining VUORSE-VORTEX's own source manifest, layer routing, and canon firewall as the authority. It makes no network requests and incurs no embedding API charges.

## Architecture

```text
VUORSE-VORTEX routed sources
        |
        v
build_source_manifest()
        |
        v
CortexSatellite.build()
        |
        v
SQLite FTS5 database
embeddings/indexes/vuorse_cortex.sqlite3
        |
        +--> vuorse-vortex cortex search
        |
        +--> GET /cortex/search
```

The existing ChromaDB backend remains available for optional local semantic retrieval. The satellite's default path is lexical so project recall works without OpenAI Platform credits, remote services, model downloads, or GPU availability.

## Canon boundary

The satellite indexes routed corpus roots and records each chunk's source path, layer, visibility, and canon status. Searches always remove layers listed in `Settings.sealed_categories` before returning results.

PDF derivatives and `roadmap/finale/` are excluded by default. `.agent-quarantine/` is outside the routed roots and is never walked.

## Commands

Build or replace the local satellite:

```bash
uv run vuorse-vortex cortex build
```

Search it:

```bash
uv run vuorse-vortex cortex search "Miss Slaytonia VUORSE" --top-k 5
```

Inspect identity and counts:

```bash
uv run vuorse-vortex cortex stats
```

## MCP access

Install the optional MCP adapter and run it over stdio:

```bash
uv sync --extra cortex
uv run vuorse-cortex
```

It exposes two tools:

- `search_vuorse`, returning canon metadata and exact source paths
- `vuorse_cortex_stats`, returning the index fingerprint and counts

An OpenClaw registration can use `uv` as the command, `/mnt/c/runb2/vuorse-vortex` as the working directory, and `run vuorse-cortex` as its arguments.

## HTTP access

Run the existing FastAPI application:

```bash
uv run uvicorn vuorse_vortex.api:app --host 127.0.0.1 --port 8191
```

Then use:

- `GET /cortex/search?q=Miss%20Slaytonia%20VUORSE&top_k=5`
- `GET /cortex/stats`
- `GET /health`

The service binds to loopback in this example and exposes no build or mutation endpoint.

## Relationship to Slay Cortex

Slay Cortex remains the large, multi-source personal-memory system with local dense embeddings, cross-encoder reranking, ChromaDB, FTS5, MCP, and HTTP access. This satellite is intentionally narrower:

- VUORSE-VORTEX sources only
- VUORSE-VORTEX provenance on every hit
- VUORSE-VORTEX sealed-layer filtering
- no paid embeddings
- no dependency on the mutable Slay Cortex database

This separation prevents a general personal-memory corpus from becoming a canon source merely because it produced a persuasive search result.
