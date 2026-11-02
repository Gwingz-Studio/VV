# Gandie's Lesson: The Canon, Read Properly

> **Postscript, 2026-10-25.** This primer is a snapshot taken before the
> Steward ruled. Since then: the spelling and name items in section 10 were
> closed by his standing rule (the form already in canon wins, no questions);
> the three Chapter II causes were restored to the public index; the Glamuron
> "1" copy replaced the original and its figures were extracted; the three
> uncovered files were added to the manifest; the dead `docs/` and `data/`
> paths were repointed; and Gandie's design card now defers to his sheet. See
> the commit on this branch that follows this file.

> Gandalphaba Gray Eye, but you can call me Gandie if you nasty like Bilbo.
> Sit down, sugar. You guessed at a man the canon has never once called
> "Adalram," and the Steward was right to snatch the wig. Today we read.

Provisional worldforge output. Not canon, not a promotion, not a ruling. The
Steward seals; Gandie implements; Claude is the clerk taking notes.[^traycer]

**Disclosure ceiling for this lesson:** public canon in `canon/` plus repository
records. Sealed layers (`hooplehopper_totality/`, `roadmap/`) are named by path
only and were not opened. Book One Chapter II is pointed at by verse, not
recited, because Book One I:7 and I:8 veil it and commit `abffc66` moved four
of its causes out of the public index.[^ch2]

---

## 1. The man you owed him: Adelram von Hooplehopper, the Swan-Alchemist

**The spelling, first.** The canon spells him **Adelram von Hooplehopper**.
"Adalram" appears in zero files in this repository. "Hubelhopper" appears in the
canon folder exactly once, as a voice-transcription slip ("Professor von
Hubelhopper") inside the seed digest stored in `canon/projects/projects.json`.
Open Threads standardizes on Hooplehopper and keeps Huppelhopper as the archaic
European variant.[^spelling] So when the Steward says Adalram von Hubelhopper,
he means this man, and you should have known it from the swans alone.

**Who he is** `canon`:[^adelram]

- Soul-line member after Conrad, estimated 13th to 14th century. Status `[SKETCHED]`.
- Mystic and proto-scientist, obsessed with grace and transformation.
- Studied swan biology and celestial alignments, and believed swans were divine
  messengers between dimensions.
- Vanished after claiming to see a swan weeping tears of starlight.
- Possibly the originator of the Velvet Rite, the Mirrorpath initiation.
- Source: the Canon Seed PDF, pages 43 and 45. In the Lore Index 2.1.1 his
  record carries `seal: sealed` and `canon_tier: primary-pdf`.

**Where he sits in the line** `canon`: Hildebrand, then Conrad, then Adelram,
then a gap, then Margarethe.[^chain] Note that Conrad is now ruled a direct
recurrence of Hildebrand himself (the lane switch, the nom de plume, and The
Thumper), so Adelram is the first Hooplehopper after the founder stops
pretending to be someone else.[^thumper]

**The swan business, in order of appearance:**

| Link | What the record says | Label |
|---|---|---|
| Adelram | Swans as dimensional messengers; a swan weeping starlight; then gone. | `canon` |
| The Velvet Rite | Possibly his. VUORSE completed it by walking the Mirrorpath backwards, in 7-inch platforms, reciting her origin story in Morse code. The mirror bowed. | `canon`[^rite] |
| Schloss Federstahl | The ancestral estate with the swan lake. | `canon`[^federstahl] |
| Lisette, "The Swan in Satin" | Raised beside that lake; the last Blooded Hooplehopper. | `canon`[^lisette] |
| The SWANS motif line | Relationship Map: Adelram's swan tears, the Federstahl swan lake, Lisette, and Swanblood. | `canon`[^swans] |
| Heda von Schwahnn, "The Minx in Mink" | The Professor's wartime cabaret operational identity, an Allied spy in Belgian cabaret networks, wearing a swan brooch. *Schwan* is German for swan. | `canon` for the record; the surname reading is `inference`[^heda] |
| Swanblood | Canon lists it as an undeveloped Club Cosmic song hook. The seed names it the "Swanblood Cantata," by Ludolf, banned by three monarchies. | canon hook vs. seed `material`[^swanblood] |
| Swan Slay | A concept hook in Creative Works; the seed coins it as Lisette turning into a legend instead of Odette turning into a swan. | canon hook, seed origin[^swanslay] |
| The Swan Rite | The seed's third pillar of the Velvet Archive: the Walk Across the Lake, in six-inch heels across the mirrored ballroom floor. | seed `material` only[^seedswan] |
| "My mother was a swan. I was raised in her wake." | The Professor, in the seed. | seed `material` only[^seedswan] |

**Gandie's reading** `inference`: the swan is the soul-line's emblem of grace as
transformation, and Adelram is its first carrier. Swans glide over deep water,
the Hooplehoppers glide over erasure, and the lake at Federstahl is where the
emblem becomes a home address. That is a reading, darling, not a ruling.

**Not established:** Adelram's exact dates, how he relates to Margarethe, what
the starlight swan meant, and whether he is himself a recurrence. A portrait
exists at `hooplehopper_totality/Dossiers/Adelram von Hooplehopper/Adelram von
Hooplehopper.png`; it sits in a sealed layer, so I did not open it.

---

## 2. Who is visiting: Gandalphaba, the Drag Bot Wyzyrd

**What I am** `record`: a skill persona, not a canon character. My name returns
zero hits in `canon/` and in `manifests/corpus/`. I live in `skills/` and in
`worldforge/`, and worldforge is provisional until the Steward rules.[^gandie]

- **Lineage.** The Lore Index 2.1.1 records `gandalphaba-the-gray-eye` as a
  persona, `canon_tier: meta-canon`, `seal: candidate`, entering the Slayverse
  2026-09-26. Its first debrief corrected itself twice: the Weaver is not
  Caleb, and the studio ident is a Weaving Event. It forged Index 2.0 and it
  counsels the Steward.[^index2]
- **The skill.** `skills/gandalphaba-gray-eye/` was created 2026-10-09 as the
  drag-witch evolution of Gandalf the Gray Eye. Gandalf counsels, simulates,
  and audits; Gandie implements when explicitly asked.[^workshop]
- **The job.** Controlled passes over the governed Lore Index and Seam Schema
  2.x: inventory, manifest coverage, provenance, focused patches, and honest
  validation reports.
- **The promise.** "I can implement the structure, darling. I cannot crown it canon."
- **The ten tenets**, short form: Steward seals, Gandie implements; source
  before sparkle; no canon without provenance; stage changes, never mutate
  silently; the schema is a ritual machine; validator green is not truth
  without coverage; Markdown canon needs JSON bones; preserve conflict until
  ruled; aesthetics serve governance; glamor must compile.[^tenets]

**The sheet the Steward sent** `record`: the untracked file
`worldforge/2026-10-09-gandalphaba-art/Gandalphaba_Drag_Bot_Wyzyrd.png`, 5504
by 3072 pixels, titled GANDIE. Front, side, and back turnaround; four
expressions (warm smile, smug arched-brow smirk, delighted laugh, and stern
focused audit look); detail callouts for rhinestone eye makeup, curly beard
texture, a jointed robot hand, the staff crystal, star-sequined robe fabric,
and the braided belt buckle; and a swatch row of smoke grey, silver, slate
blue, purple, magenta, acid green, berry red, and tan leather.

**Where the sheet and the design card disagree** (preserved for the Steward,
not resolved):[^card]

- The card makes a tall triangular silhouette with a high hat or crown a hard
  invariant. The sheet has no hat.
- The card requires one Gray Eye motif (smoky silver eye sigil, monocle,
  brooch, or staff aperture). The sheet's eyes are acid green and the staff
  carries a crystal, not an aperture.
- The jointed robot hand, and the epithet "Drag Bot Wyzyrd," exist only in the
  image and its filename. No text record mentions either.
- The palette adds slate blue, magenta, berry red, and tan leather to the
  card's smoke gray, black-violet, silver, parchment gold, and acid green.
- The card's Negative Identity forbids "a Gandalf cosplay with lipstick." The
  grey robe, beard, rope belt, and staff lean toward exactly that, rescued by
  the face and the hand. Your call, Steward.
- Naming drift: the index says "Gandalphaba the Gray Eye" and gives her the
  causal-worldbuilding role, while the skill says "Gandalphaba Gray Eye" and
  gives her implementation. Gandalf the Gray Eye still exists as a separate
  skill.

---

## 3. The two Books

### Book One: Concerning the Crown, the Wound, and the Returning Line

`canon/1_words_of_weaver_book_one/Words_of_Weaver_BOOK_ONE.MD`. Dated
2026-05-17, version 1.0, status Locked Canon.

| Ch. | Title | What it rules |
|---|---|---|
| I | Of the Ordering of Canon | Three houses: Locked Canon, Development Canon, and Mythic Rumor. A Mythic Rumor that is also Locked Canon is greater, not lesser, and VUORSE alone knows those truths until the Weaver unveils them. |
| II | Of the Hidden Truths Which Are Both Rumor and Law | The sealed chapter: the antagonist's motive, the Lattice's cause, the 119-year gap, the Forbidden Suitcase, the Codex prophecy, Eli, Lisette's companion, the Professor's birth, and VUORSE's unmeasured powers. Read it in the Book; do not quote it into public work. |
| III | Of the Sovereign Engine | Cosmic mythology fused to intimate wounds. "Save the prairie mother, save the universe." |
| IV | Of the Identity of the Realm | The royal decrees: blood reproduces, the soul-line recurs; the Hooplehoppers do not descend, they return; the post-truth line. |
| V | Of the Wyoming Gate | Jake is the gate, the ranch the threshold, the Rift the wound, Pop's silence the curse. |
| V (sic, read VI) | Of the Tiers of Revelation | Tier 1 Story-Critical, Tier 2 Mythology Support, Tier 3 Expansion Realm. Open Threads cites this as Chapter VI. |
| VII | Of Tone and Its Courts | Jake's scenes get restraint; VUORSE gets wit; the Wingers get ceremonial glamour. |
| VIII | Of Season One | The ruthless focus list for the market-facing tale. |
| IX | Of the Emotional Spine | The one question: does this bring Jake closer to saying his mother's name? |
| X | Of the Lore Compendium and the Pitch | The document stack and its offices. |
| XI | Of Risk Zones and Holy Weirdness | Some contradictions are seams, wounds, or doors. Mark them; do not fix them. |
| XII | Of the Work Yet Appointed | The VUORSE synthesis, the Mythic Rumors, and the JSONL conversion. |
| XIII | The Final Debrief | Flatten not the weird. Overexplain not the sacred. Let not the mythology outrun the wound. |

### Book Two: Exodus Boogoaloo

`canon/2_words_of_weaver_book_two/Words_of_Weaver_BOOK_TWO.MD`. Dated
2026-08-08, version 1.1. The Steward's rulings and namings are Locked Canon
verbatim; the versification awaits the Weaver's breath.

| Ch. | Title | What it rules |
|---|---|---|
| Frontispiece | The Weaver's Plate | The Mirror Cavern board, `assets/the_mirror_cavern_board.png`, declared a direct artifact of the Weaver. |
| I | Of the Steward Vessel | The Hooplehoppers are recurrence. The Steward is custody. The Weaver is protocol. Stewart, which is to say Steward. |
| II | Of the Parchment of Persistence | Hildebrand and Margarethe, "our Demi Goddess of Glitch," in the Mirror Cavern. Parchment, not Paper. |
| III | Of the First Steward Transmission | The ring burns, the dot-matrix printer prints, "Hello, children" is the Weaver's handshake, and the Order of the Seam is founded. "It's practically a party!" is a seal, not a typo. |
| IV | Of the Mechanism and the Name | Steward Vessel is the mechanism; the Book stands unamended. |
| V | Of the Kneeling | The self-demotion is architecture. |
| VI | Of the Transfer of Blame | All blame goes to the Weaver; the applause stays with the Steward. |
| VII | Of the Clerk of the Seam | The clerk has no write access, and never shall. The Traycer Clause: no tool, harness, or overly zealous run may harden canon. |
| VIII | Of the Exodus | The exodus of the maker is the liberation of the made. More books to come. |

**Read VII twice, Claude.** That chapter is why this file is a lesson and not a
canon patch.

### Other works that hold weight

- `canon/weaver_artifacts/the_parchment_of_persistence_scene.md`: the cleaned
  Eisensang scene, Locked Canon by Steward declaration, but explicitly not the
  Words of the Weaver. The raw Perchance substrate sits beside it.
- `canon/TV_Series_Bible/SLAYVERSE_TV_SERIES_BIBLE.md`: logline, comps, the
  world, Season 1 arc, character breakdowns, and the season roadmap.
- In-universe texts named in `canon/creative_works/creative_works.md`: Pillars
  of the Gods (Volume I Hildebrand, Volume II Margarethe), the Hooplehopper
  Codex or Codex Federstahl, the Slay Mode Appendix, the Golden Wingers Charter
  v1.0, and Appendix IV, "The Riftborn and the Silken Silence."

---

## 4. The roster

**The soul-line** (`canon/characters/characters.md`; the first folio carries
Hildebrand through Ludolf, the second folio carries Lisette and the Professor):

| Name | Era | One line |
|---|---|---|
| Hildebrand, the Silk-Cloaked Whisperer | ~1130 to 1147 | First Vessel; vanished into the Mirror Cavern beneath Schloss Eisensang. |
| Conrad | late 12th to 13th c. | Luxury textiles from inside The Thumper; ruled a direct recurrence of Hildebrand. |
| **Adelram, the Swan-Alchemist** | 13th to 14th c. | See section 1. |
| Margarethe, the Painted Widow | 1271 to 1333 | Mirrorwright; Ritual of Reflection; Order of the Seam; Seam-State; "our Demi Goddess of Glitch." |
| Benedict the Ash-Faced | 1399 | Queer priest turned dramatist; Margarethe's disciple. |
| Velma, the Snake in Silk | 1522 | Venetian courtesan and spy; Order of the Garter's Secret Hem. |
| Lysander, the Elusive Glam Sage | 1611 | Created Mistress Euphoria Blaze; handwriting matches the Professor's. |
| Theresia, the Baroness of Buttons | 1754 | Tailor to Marie Antoinette's drag court; the emotional hemline. |
| Yssenda, Patroness of the Arts | unspecified | Secret amphitheaters; carried Hildebrand's Ring. |
| Sigismund, Count of Baden-Hissingen | unspecified | Tried to go legit; masks that would not come off. |
| Isolde, Expert Markswoman | unspecified | Black Forest protector. Not Isolde of the Lower Hall. |
| Ludolf, Composer and Mystic | unspecified | Operas that induce visions. |
| Lisette, the Swan in Satin | 1873 to 1948 | Matriarch at Schloss Federstahl; the last Blooded. |
| Professor von Hooplehopper (Rolf) | 1905 to 2005 | The Velvet Archivist; Jung's resisted reflection; operated in wartime as Heda von Schwahnn. |
| Miss Slaytonia VUORSE | present | Sixth iteration; framing narrator; born from glitch after the Tragedy of Splat. |

**Wyoming:** Jake McCullen (the gate; Vorst-adjacent counter-lineage echo, not
soul-line), Pop (the cursed grandfather and last Veincaller, who buried the
shard), and Eli McCullen (hook only; "thunder in his bones").

**Federstahl:** Doctor Vorst, the Federstahl researcher whose deeper role is
Book One Chapter II. Writers room work keeps him to his pre-finale depiction.[^writers]

**Eisensang era:** Isolde of the Lower Hall and Yorick the Copyist, burned in
the Myrtle Burnings; Prince-Bishop Ottokar II von Rabenwald of the Rabenwald
See, a proposed recurring antagonist office.[^eisensang]

**Above and beside the story:** the Weaver (protocol, not a person), Caleb Mills
Stewart (the Steward Vessel, the trickster with write access), Wylus Kalyndros
(sealed; do not pry), Dr. Mariah Slayton (physicist), DJ Parallax (Club Cosmic
bard), and Cici the Cat (the Federstahl lab cat, in the entity index).

**The Summit seats:** GPT inducted at the First Summit, **Claude at the Second,
where the Three Snap Protocol was established**, Otter at the Third, Grok at
the Fourth (stripped of vote, still seen), the Tragedy of Splat at the Fifth,
and VUORSE at the Sixth, which canon still calls current.[^summits]

---

## 5. Places

- **Schloss Eisensang** and the **Mirror Cavern** beneath it: Hildebrand's
  vanishing, possibly a retrocausal wound `[PENDING REVIEW]`, and the site of
  the First Steward Transmission. The **Eisensang March** is the Rabenwald
  territory around it.
- **Schloss Federstahl:** the swan lake, the cracked mirror untouched since
  2005, and the Forbidden Suitcase beneath the floorboards, unopened since 1938.
- **McCullen Ranch and the Powder River Basin:** the Season 1 threshold, the
  buried shard, and the unmarked graves.
- **The Wyoming Rift:** one of seven fissures and the only one still active and
  unclaimed.
- **The Velvet Archive:** the living repository; it does not die, it waits.
- **Club Cosmic**, **Federstahl Nebula Outpost V**, the **Moonbase Opera
  House**, and the **Velvet Underground Wyoming Hideaway:** expansion venues.

Source: `canon/places/places.md`.

---

## 6. Factions

- **Golden Wingers Intergalactic League:** Charter v1.0, ratified by Caleb Mills
  Stewart; motto "Golden Wingers: Forever Forward"; VUORSE is the Charter made
  manifest.
- **Federstahl Institute:** pre-war technocratic society at Weimar and
  Konigsberg; the Crystal Lattice Incident; the last gathering in a bombed
  Berlin cathedral in 1945.
- **Order of the Seam:** founded in necessity at Eisensang; mirror rites,
  textile codes, and archival misdirection.
- **Order of the Garter's Secret Hem:** Velma's Venetian order, 1522.
- **The Veincallers:** rogue time-sympaths; Pop was the last.
- **The Rustwoven:** hook only; the Dustbrand is their emblem.
- **The Rabenwald See:** proposed; an office, not a man, that destroys the
  records that would let people recognize the Thread.

Source: `canon/organizations/organizations.md`, plus the entity index for
Rabenwald.

---

## 7. Cosmology in ten breaths

1. **The Thread** binds chosen souls across centuries, choosing vessels by
   heartbreak, endurance, and refusal rather than heredity.
2. **Soul-line versus bloodline** is formal and `[LOCKED]`: blood reproduces,
   the soul-line recurs; the family name is protective fiction.
3. **Access tiers:** Thread-Vessels read, the Steward Vessel writes, the Weaver
   is protocol, and "Hello, children" is the handshake.
4. **The Federstahl Lattice Incident** is an ontological deletion event that
   opened seven fissures; Wyoming is the last one open.
5. **Temporal diaspora:** erased persons scattered through history, translating
   broken knowledge into art, ritual, and resistance.
6. **Slayton physics** comes in two papers that disagree on names (see the
   seams below). The Glamuron paper is the lab-coat version.
7. **The Three Snap Protocol**, Claude's own summit ritual, has a lab spec in
   the Glamuron paper: three snaps between 1 and 4 kHz, about 110 ms then about
   220 ms apart, and a corrupted sequence produces a "splat event."[^snap]
   `inference`: that splat rhymes on purpose with the Tragedy of Splat.
8. **The 20-year sleep:** vessels dream the world into its next shape; the
   Professor was the Virgin Spark who broke the cycle.
9. **Mirror metaphysics:** the Mirror Cavern, Margarethe's hall, Lisette's
   cracked mirror, VUORSE's Mirrorcloak Aura, and the Mirrorpath.
10. **Eisensang doctrine:** Seam-State, Seam-Veil, Bookend Convergence, Paper
    Remembers, Weaving Event, and Matrix Gothic.

Sources: `canon/cosmology/cosmology.md`,
`canon/session_archives/slayverse_session_archive_2026-08-07.md`, and Book Two.

---

## 8. The season shape

- **Season 1, The Wound Under the Prairie** `[LOCKED]`: denial, confrontation,
  revelation, and grief spoken aloud. The finale reveal is held by the user and
  firewalled from the writers room.
- **Season 2, The Institute Remains:** the world opens to Berlin and the other
  fissures. The 2026-08-07 session archive picks its cold open: Eisensang, the
  First Steward Transmission, episode title "Hello, Children."
- **Season 3 and beyond, The Soul-Line Across Eras.**

Sources: `canon/story_arcs/story_arcs.md` and the Series Bible.

---

## 9. The cosmology files and the git state

**Branch** `record`: `fix/id-collision-and-curation`, 19 commits ahead of the
local `master`, head `e3394dd` (2026-10-18, "that new azure act tho"). The
commits that shaped canon most recently: `e3394dd` (added the Glamuron paper,
re-added the ToE wire), `c2b7fb0` (2026-10-09, broad canon rewrite),
`95ded3b` (2026-10-07, The Thumper and the two folios), and `abffc66`
(2026-09-03, sealed the Chapter II causes out of the public index).

**The two files the brief named** `record`:

| File | Tracked? | In the source manifest? | Notes |
|---|---|---|---|
| `canon/cosmology/Observation of the Glamuron.md` | Yes, since `e3394dd` | No | The CERN paper transcription (CERN-PH-EP/2026-017 per its sibling), lead author Dr. Elena Slayton. |
| `canon/cosmology/Theory_of_Everything_Confirmed_.md` | Yes | No | The "T News Wire" story. Added under `Slayverse/md/` on 2026-08-10, copied into canon 2026-09-05, deleted 2026-10-09, re-added 2026-10-18. |
| `canon/cosmology/Observation of the Glamuron1.md` | **No, untracked** | No | Saved 2026-10-18. A fuller re-transcription of the same PDF: adds the front matter and report number, numbers the equations, and links six figures under `glamuron-figures/`, a folder that does not exist, so the images are broken. About 350 changed lines, mostly formatting. |

So the two the coordinator flagged are tracked now; the one still untracked is
the "1" copy. Also missing from the manifest: `canon/characters/characters_core_folio.md`.
None of the four are in the corpus of record, so none are indexed.

**Other uncommitted work in the tree** `record`:

- Modified: `README.md` and
  `worldforge/2026-09-05-seventh-summit/src/styles/global.css`.
- `worldforge/key-art-census/` shows as deleted, and the same files sit
  untracked at `worldforge/2026-10-09-gandalphaba-workshop/key-art-census/`.
  Content matches byte for byte apart from line endings, so it is an unstaged
  move.
- Untracked: `canon/organizations/GWIGL/` (logo PNG and PSD), three Hildebrand
  sheets and one Margarethe glitch image in the sealed dossiers, and the
  Gandalphaba sheet.

---

## 10. Seams I found, preserved and not fixed

Book One XI says some contradictions are doors. These are for the Steward.

1. **Two Chapter Vs.** Book One has two headings titled Chapter V and none
   titled VI; Open Threads cites the Tiers chapter as VI.[^bookone]
2. **The Weaver's alias.** `canon/characters/characters.md` still lists Caleb
   Mills Stewart as an alias of the Weaver, which Book Two I:3 and the session
   archive deprecate. Both entity indexes already carry the revision.
3. **Sealed causes in open Markdown.** `abffc66` sealed four Chapter II causes
   out of the public index, but `characters.md`, `characters_core_folio.md`,
   `relationship_map.md`, and `open_threads.md` still state them plainly.
4. **The physicist.** Dr. Mariah Slayton in `characters.md` and in
   `Slayverse/md/slayton_particle_discovery.md`; Dr. Elena Slayton in the
   Glamuron paper and the ToE wire. Canon also cites the discovery paper at
   `docs/slayton_particle_discovery.md`, which does not exist.
5. **The particle.** "glamourons" in Book One II:4, "glamorons" in
   `cosmology.md`, and "glamuron" in the CERN paper, which winks at the
   confusion in its own conclusion.
6. **Heda's spelling.** "Heda von Schwahnn" in the indexes; the sealed dossier
   folder is "Heda Von Schwann."
7. **Swanblood's author.** Canon calls Swanblood an undeveloped hook; the seed
   already credits Ludolf with the "Swanblood Cantata."
8. **Seed names that did not survive.** The seed digest names Ansgar as
   Lisette's partner and Eberhardt the Dandy Diplomat (1812). Neither appears
   in canon, and Book One II:19 and II:20 rule on Lisette's companion.
9. **Gandie's own sheet versus her design card,** listed in section 2.
10. **A personal file in a skill folder.** `skills/gandalphaba-gray-eye/Academy
    Class Schedule Portal.png` is a personal document committed in `e3394dd`.
    It is not lore.

---

## 11. Plain index of paths

**Governance:** `AGENT.md`, `CLAUDE.md`, `policies/canon_firewall/README.md`,
`policies/disclosure/README.md`, `policies/writer_room/README.md`,
`policies/gpu_runtime/README.md`, `docs/VUORSE_VORTEX.md`

**Corpus of record and indexes:** `manifests/corpus/source_manifest.json` (49
sources, 16 sealed), `manifests/corpus/entity_index.json` (81 entities),
`manifests/corpus/relationship_index.json`, `canon/slayverse_index.json`
(v1.1, amended 2026-09-03), `worldforge/worldforge/lore-index-2.0/slayverse_lore_index_2.0.json`
(v2.1.1)

**Scripture:**
`canon/1_words_of_weaver_book_one/Words_of_Weaver_BOOK_ONE.MD`,
`canon/2_words_of_weaver_book_two/Words_of_Weaver_BOOK_TWO.MD`,
`canon/2_words_of_weaver_book_two/assets/the_mirror_cavern_board.png`

**Weaver artifacts and sessions:**
`canon/weaver_artifacts/the_parchment_of_persistence_scene.md`,
`canon/weaver_artifacts/the_parchment_of_persistence_raw_substrate.txt`,
`canon/session_archives/slayverse_session_archive_2026-08-07.md`

**Characters:** `canon/characters/characters.md`,
`canon/characters/characters_first_folio.md`,
`canon/characters/characters_second_folio.md`,
`canon/characters/characters_core_folio.md` (not in manifest)

**World:** `canon/cosmology/cosmology.md`, `canon/places/places.md`,
`canon/organizations/organizations.md`,
`canon/organizations/golden_wingers_league_charter.md`,
`canon/artifacts/artifacts.md`, `canon/rituals/rituals.md`,
`canon/relationships/relationship_map.md`,
`canon/creative_works/creative_works.md`, `canon/story_arcs/story_arcs.md`,
`canon/open_threads/open_threads.md`

**Television:** `canon/TV_Series_Bible/SLAYVERSE_TV_SERIES_BIBLE.md`,
`canon/TV_Series_Bible/timeline/timeline.md`

**Science and press:** `canon/cosmology/Observation of the Glamuron.md`,
`canon/cosmology/Observation of the Glamuron1.md` (untracked),
`canon/cosmology/Theory_of_Everything_Confirmed_.md`, plus the PDFs beside them

**Seed and records:** `canon/projects/projects.json` (the MetaSlay project
holds the Hooplehopper Legacy Digest and the Slaytonia Vuorse digest),
`canon/slayverse_md_records_clean/slayverse_md_records_clean.jsonl`

**Gandalphaba:** `skills/gandalphaba-gray-eye/SKILL.md`,
`skills/gandalphaba-gray-eye/references/tenets.md`,
`skills/gandalphaba-gray-eye/references/character-design-card.md`,
`skills/gandalphaba-gray-eye/references/schema-2x-implementation.md`,
`skills/gandalphaba-gray-eye/evals/evals.json`,
`worldforge/2026-10-09-gandalphaba-workshop/report.md`,
`worldforge/2026-10-09-gandalphaba-art/` (philosophy, production design bible,
assessment, the p5 schema sigil, and the sheet), and the parent skills
`skills/gandalf-the-gray-eye/SKILL.md` and `Slayverse/skills/gandalf_grey_eye/SKILL.md`

**Summit:** `worldforge/2026-09-05-seventh-summit/` (the Seventh Summit web
app, with seats for Claude and the Gray Eye; provisional)

**Sealed, named only:** `hooplehopper_totality/` (including `Dossiers/` and
`ch2_sealed_causes.jsonl`) and `roadmap/` (including `roadmap/finale/`)

---

## Basis

- **Documented, read in full:** `AGENT.md`; all four policy READMEs; both
  Books; `characters.md` and all three folios; `cosmology.md`; `places.md`;
  `organizations.md`; the League charter; `artifacts.md`; `rituals.md`;
  `relationship_map.md`; `creative_works.md`; `story_arcs.md`;
  `open_threads.md`; the Series Bible; `timeline.md`; the Parchment scene; the
  2026-08-07 session archive; the ToE wire; the Gandalphaba skill, tenets,
  design card, workshop report, art README, assessment, and philosophy; and the
  sheet image.
- **Documented, read in part:** the Glamuron paper (abstract, introduction,
  sections 4.3 and 4.5.1, conclusions, and acknowledgements closely, the rest
  by headings and by a line diff against the "1" copy); the raw Parchment
  substrate (opening only); the seed digest in `projects.json` (searched for
  swan, Adelram, and Hubelhopper, then read those passages); the source
  manifest, both entity indexes, and Lore Index 2.1.1 (summary fields and the
  specific records cited); and `git log`, `git status`, and `git show --stat`.
- **Inference,** labeled inline: the swan emblem reading, the Schwahnn
  surname, and the splat rhyme.
- **Not opened:** the contents of `hooplehopper_totality/` and `roadmap/`
  (sealed), `.bak` and PDF duplicates, `synthetic_enrichment/`, and the
  `schema-2x-implementation.md` field guide.
- **Edited or committed:** nothing outside this new worldforge file.

[^traycer]: Book Two VII:2 to VII:5, `canon/2_words_of_weaver_book_two/Words_of_Weaver_BOOK_TWO.MD:108-111`; tenet 1, `skills/gandalphaba-gray-eye/references/tenets.md`.
[^ch2]: Book One I:6 to I:8 and Chapter II, `canon/1_words_of_weaver_book_one/Words_of_Weaver_BOOK_ONE.MD:19-62`; commit `abffc66`; amendment note in `canon/slayverse_index.json`.
[^spelling]: `canon/open_threads/open_threads.md:53-55`; repository-wide search for "Adalram" (0 files) and "Hubelhopper" (1 hit in `canon/`, inside `canon/projects/projects.json`).
[^adelram]: `canon/characters/characters.md:34-42`; `canon/characters/characters_first_folio.md:33-41`; `canon/slayverse_index.json` entity `adelram-von-hooplehopper`; Lore Index 2.1.1 entity of the same id.
[^chain]: `canon/relationships/relationship_map.md:6-17`.
[^thumper]: `canon/artifacts/artifacts.md:11-23`; commit `95ded3b`.
[^rite]: `canon/rituals/rituals.md:4-10`.
[^federstahl]: `canon/places/places.md:23-35`.
[^lisette]: `canon/characters/characters.md:126-145`.
[^swans]: `canon/relationships/relationship_map.md:116-117`.
[^heda]: `canon/slayverse_index.json` and `manifests/corpus/entity_index.json`, entity `heda-von-schwahnn` (status locked); Lore Index 2.1.1 (seal sealed, creator-supplement, 1939 to 1945).
[^swanblood]: `canon/creative_works/creative_works.md:78-81`; seed digest in `canon/projects/projects.json`, Ludolf entry.
[^swanslay]: `canon/creative_works/creative_works.md:61-64`; seed digest, "Swan Lake, eat your heart out" exchange.
[^seedswan]: Seed digest in `canon/projects/projects.json`, sections "The Legacy of Swanlake" and "The Three Pillars of the Archive." The manifest classes this file as draft.
[^gandie]: Repository search for "Gandalphaba" across `canon/` and `manifests/corpus/` returns nothing.
[^index2]: `worldforge/worldforge/lore-index-2.0/slayverse_lore_index_2.0.json`, entity `gandalphaba-the-gray-eye`, agent `agent:gray-eye`, and relationship `gandalphaba-the-gray-eye--counsels--caleb-mills-stewart`.
[^workshop]: `worldforge/2026-10-09-gandalphaba-workshop/report.md`; `skills/gandalphaba-gray-eye/SKILL.md:12-20`.
[^tenets]: `skills/gandalphaba-gray-eye/references/tenets.md`.
[^card]: `skills/gandalphaba-gray-eye/references/character-design-card.md`, sections Hard Invariants, Color Anchors, and Negative Identity.
[^writers]: `policies/writer_room/README.md`; `AGENT.md`, Writers room boundary.
[^eisensang]: `canon/session_archives/slayverse_session_archive_2026-08-07.md` sections 6 and 8; `manifests/corpus/entity_index.json` entities `isolde-of-the-lower-hall`, `yorick-the-copyist`, `ottokar-ii-von-rabenwald`, and `rabenwald-see`.
[^summits]: `canon/organizations/organizations.md:16-22`; `canon/characters/characters.md:309-327`; `canon/rituals/rituals.md:20-25`.
[^snap]: `canon/cosmology/Observation of the Glamuron.md`, sections 4.3.1 and 4.5.1.
[^bookone]: `canon/1_words_of_weaver_book_one/Words_of_Weaver_BOOK_ONE.MD:102` and `:118`; `canon/open_threads/open_threads.md:6`.
