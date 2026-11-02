# Slayverse/ — Working Archive, Not Corpus

**This directory is not a corpus root and must not be indexed.**

`Slayverse/` predates `canon/`. It is the working archive the canon corpus grew
out of, retained for provenance and media, not for retrieval.

Audited 2026-09-05: 345 files, 438 MB. 96% media — `images/` 145M, `rift/` 108M,
`audio/` 74M, `assets/` 68M, `pdf/` 36M. Only 24 textual files sit outside
`assets/`, five of which are the Gandalf skill (now installed at
`skills/gandalf-the-gray-eye/`).

Superseded by `canon/`:

- `md/SLAYVERSE_TV_SERIES_BIBLE.md` — byte-identical to `canon/TV_Series_Bible/`
- `json/jsonl/slayverse_md_records_clean.jsonl` — byte-identical to `canon/`
- `json/slayverse_index.json` — 53,118 B predecessor of `canon/`'s 68,488 B

Promoted out on 2026-09-05, now indexed from `canon/` (as `draft`, pending
line-by-line review):

- `json/sassafras_a_mcgraw_ultimate_origin.json` → `canon/characters/`
- `json/sassafrass_a_mcgraw_texas_hopper_tall_tale.json` → `canon/creative_works/`
- `json/golden_wings_intergaltactic_league_charter.json` → `canon/organizations/`
- `md/slayton_particle_discovery.md` → `canon/cosmology/`
- `md/Theory_of_Everything_Confirmed_.md` → `canon/cosmology/`
- `md/slayverse_session_archive_first_steward_transmission.md` → `canon/session_archives/`
- `json/jsonl/Continutity_Audit.md` → `canon/open_threads/`

Deliberately **not** promoted — format experiments and one browser scrape:
`slayverse_index_minified.json`, `slayverse_index_orginal.json`,
`slayverse_lore_index_1point2.json`, `slayverse_schema_example_detailed.json`,
`slayverse_md_batch_messages_fixedgguf.json`,
`FireShot_Capture_013_…chatgpt.com_.md`.

To promote anything else from here, copy it into `canon/`, add a manifest entry
with `canon_status: draft`, and record its origin in the entry's `notes`.
