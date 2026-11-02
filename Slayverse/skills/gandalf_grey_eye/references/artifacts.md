# Artifact layout

Default workspace (create if missing):

```text
<project>/worldforge/<run-id>/
  meta.md              # setup: change point, cutoff, mode, assumptions
  baseline.md          # canon anchors + file paths
  nodes.json           # typed nodes
  edges.json           # admitted causal edges
  human-packets/       # sealed actor packets (markdown)
  branches.md          # clustered outcomes + weights
  report.md            # final report
  handoff.md           # only if unsaturated / interrupted
```

The folder stays `worldforge/` (the forge). The agent is **Gandalf the Gray Eye**.

## Minimal JSON shapes

`nodes.json`:

```json
[
  {
    "id": "wyoming-rift",
    "type": "place|person|force|event|institution|artifact|secret",
    "label": "Wyoming Rift",
    "status": "canon|assumption|simulation",
    "notes": ""
  }
]
```

`edges.json`:

```json
[
  {
    "from": "naming-the-mother",
    "to": "thread-resonance",
    "mechanism": "grief spoken aloud activates Thread recognition",
    "sign": "+",
    "lag": "immediate to one episode",
    "context": "Season 1 Powder River",
    "confidence": "med"
  }
]
```

## Slayverse convenience

When working in Slayverse, prefer reading first:

- `md/SLAYVERSE_TV_SERIES_BIBLE.md`
- `md/` lore notes
- `json/slayverse_lore_index_1point2.json` / `json/slayverse_index.json`
- prior `worldforge/` runs

Write new simulation artifacts under `worldforge/<run-id>/` unless the user names another path. Do not overwrite bible or index without an explicit "promote to canon" ask.
