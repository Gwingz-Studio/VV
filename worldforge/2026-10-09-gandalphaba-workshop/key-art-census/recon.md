# Wave 0 — Complete reconnoiter

*Gray Eye forge: key-art-census · 2026-08-05*

Prior planning chat was a foyer tour. This document is the signed checklist.

## Checklist

| # | Root | Exists | Images | MD | JSON | Other media | Role |
|---|------|--------|--------|----|------|-------------|------|
| 1a | `VUORSE-VORTEX/Slayverse/` (whole) | yes | 262 | 12 | 9 | 68 | primary-slayverse |
| 1b | `…/Slayverse/images` | yes | 61 | 0 | 0 | 0 | design-image-library |
| 1c | `…/rift/slayverse-pitch-deck/images` | yes | 80 | 0 | 0 | 0 | western-pitch-design |
| 1d | `…/Slayverse/assets` | yes | 120 | 0 | 0 | 60 | assets (video/other) |
| 1e | `…/Slayverse/md` | yes | 0 | 5 | 0 | 0 | lore-md |
| 1f | `…/Slayverse/json` | yes | 0 | 1 | 9 | 0 | lore-json |
| 1g | `…/Slayverse/pdf` | yes | 0 | 0 | 0 | 7 | lore-pdf |
| 1h | `…/Slayverse/txt` | yes | 0 | 0 | 0 | 1 | lore-txt |
| 1i | `…/Slayverse/audio` | yes | 0 | 0 | 0 | 0 | empty |
| 1j | `…/Slayverse/rift` | yes | 81 | 1 | 0 | 0 | rift-branch |
| 2 | `VUORSE-VORTEX/canon/` | yes | 0 | 13 | 2 | 0 | canon-text |
| 3 | `VUORSE-VORTEX/velvet_archive/` | yes | 0 | 4 | 0 | 0 | velvet-archive |
| 4 | `VUORSE-VORTEX/hooplehopper_totality/` | yes | 0 | 7 | 0 | 0 | lineage-totality |
| 5a | `VUORSE-VORTEX/docs/` | yes | 0 | 13 | 0 | 0 | ops-docs |
| 5b | `VUORSE-VORTEX/manifests/` | yes | 0 | 0 | 1 | 0 | manifests |
| 5c | `VUORSE-VORTEX/roadmap/` | yes | 0 | 8 | 0 | 0 | roadmap |
| 5d | `VUORSE-VORTEX/schemas/` | yes | 0 | 0 | 1 | 0 | schemas |
| 6 | `VUORSE-VORTEX/worldforge/` | yes | 0 | 9 | 4 | 0 | prior-forge (`recon-2026-08-03`, `parallax-bard-b2-2026-08-04`, …) |
| 7 | `VUORSE-VORTEX/synthetic_enrichment/` | yes | 0 | 24 | 4 | 5 | synthetic packets |
| 7b | `VUORSE-VORTEX/archives/` | yes | 0 | 0 | 0 | 2 | archives |
| 7c | `VUORSE-VORTEX/embeddings/` | yes | 0 | 0 | 0 | 0 | empty |
| 8a | `slay-cortex/docs/lore/` | yes | 0 | 8 | 2 | 0 | parallel-lore |
| 8b | `slay-cortex/docs/` | yes | 3 | 18 | 3 | 0 | parallel-docs |
| 8c | `slay-cortex/docs/pitch-deck/` | yes | 3 | 1 | 0 | 0 | pitch briefs (IMAGE_BRIEF; few local images) |
| 9a | `slay-cortex/your_project` | yes | **3879** | 0 | 1455 | 488 | large design cache — root-count only |
| 9b | `slay-cortex/data` | yes | **1403** | 3 | 53 | 278 | large design cache — root-count only |
| 10 | Excludes | — | — | — | — | — | `.venv`, caches, `__pycache__` |

Machine detail: [`media-roots.json`](media-roots.json), [`lore-roots.json`](lore-roots.json).

## Character indexes compared (`canon` counts)

| Index | Character total |
|-------|-----------------|
| `D:\runb\slay-cortex\docs\lore\slayverse_index.json` | **26** |
| `C:\runb2\VUORSE-VORTEX\Slayverse\json\slayverse_index.json` | **26** |
| `…/slayverse_index_orginal.json` | **26** |
| `…/slayverse_index_minified.json` | **26** |
| `…/slayverse_lore_index_1point2.json` | parse failed / nonstandard shape — follow-up |

See [`character-index-compare.json`](character-index-compare.json).

**Roster:** 26 indexed characters. Plus 4 Summit AI in `characters.md` (not in JSON). Cici the Cat index id = `pscopy-pscat` (intentional PScopy-PScat mascot naming).

## Primary design map (Wave 1 seed)

Mapped **141** plates under `Slayverse/images` + pitch-deck `images` → [`image-map.json`](image-map.json).

- Linked / claimed: ~133
- Orphans (hash / unnamed): 8 — still need eyes
- Characters with ≥1 primary design plate: 11
- **Design gaps (15):** Conrad, Adelram, Benedict, Lysander, Theresia, Yssenda, Sigismund, Isolde, Ludolf, Doctor Vorst, Eli, Miss Slaytonia Verse, Wylus, Cici (`pscopy-pscat`), Mistress Euphoria Blaze

**Near-lock design counts:** Professor ~21+ plates; Dr. Mariah / Elena press kits = 2.

**Not fully mapped (honest):** `Slayverse/assets` (120 images), `your_project` (3879), `data` (1403). Counted. Not plate-labeled. That is Wave 0 done, not Wave ∞.

## What the foyer tour missed (`inference`)

- Entire `VUORSE-VORTEX` tree as primary territory
- Pitch-deck style forks under `rift/slayverse-pitch-deck/images`
- `Slayverse/assets` media
- `canon/`, `velvet_archive/`, `hooplehopper_totality/`, prior `worldforge/` runs
- Multi-thousand image caches under `slay-cortex/your_project` and `data`

## Honesty seal

Wave 0 checklist rows above are filled. Large caches are inventoried by count, not by face. Orphans and gaps remain listed — that is structure, not failure.

— Gandalf the Gray Eye

## Addendum — Sassy McGraw (steward 2026-08-05)

- **First public appearance** character (steward).
- Docs present: `sassafras_a_mcgraw_ultimate_origin.json`, `sassafrass_a_mcgraw_texas_hopper_tall_tale.json`.
- **Not** in the 26-id `slayverse_index.json` yet — promotion candidate when steward asks.
- Imagery: **steward will personally select/add clean plates**. Gray Eye must **not** treat `Slayverse/assets/lora_training/sassy_1024/` (LoRA test mess) as design-lock pool.
- Packet: `briefs/sassy-mcgraw.md`.
