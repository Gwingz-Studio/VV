

#CONTINUITY AUDIT

```
This is the part where we stop pretending the lore doesn’t have glorious, manageable chaos.

```

## A. Resolved or acceptably framed paradoxes
These are **not problems**, they are canon features.

### 1. Doctor Vorst as absent and causal
- **Status:** Resolved in-text
- **Current handling:** “RESOLVED — BOTH TRUE”
- **Why it works:** The setting explicitly allows paradoxical causality through temporal fracture and narrative collapse.

### 2. Professor as both historical Rolf and archetypal Velvet Archivist
- **Status:** Resolved as mythic duality
- **Why it works:** The world supports archetypal overlay and synchronic identity.

### 3. VUORSE as glitch-born but soul-line successor
- **Status:** Resolved
- **Why it works:** The soul-line is metaphysical, not strictly biological.

---

## B. Soft ambiguities that are productive
These are good mysteries, but should be tracked.

### 1. Exact succession chain of the soul-line
- **Issue:** Not every generational handoff is explicit.
- **Current state:** Hildebrand → Margarethe → Velma echo → Lysander → Theresia → Lisette/Professor/VUORSE is implied but not fully mapped.
- **Recommendation:** Add a `succession_order` field in `lineages`.

### 2. Relationship of Yssenda, Sigismund, Isolde, and Ludolf to the main bloodline chronology
- **Issue:** They are clearly lineage figures but not chronologically pinned.
- **Recommendation:** Add `approximate_sequence` or `family_branch`.

### 3. Wylus Kalyndros
- **Issue:** Mentioned once, structurally important-sounding, almost no canon data.
- **Recommendation:** Keep as `hook`, maybe tag `possible-meta-echo`.

### 4. The 747 Scrolls
- **Issue:** Named but content unknown.
- **Recommendation:** Good candidate for future document expansion.

---

## C. Structural inconsistencies now cleaned but worth noting

### 1. `the-thread` used to be typed as artifact
- **Now:** `cosmology`
- **Compatibility preserved:** `legacy_type: "artifact"`

### 2. `glamorons` used to be typed as artifact
- **Now:** `phenomenon`
- **Compatibility preserved**

### 3. `golden-wingers-charter` used to be typed as artifact
- **Now:** `document`
- **Compatibility preserved**

### 4. `mistress-euphoria-blaze` used to be treated as character
- **Now:** `persona`
- **Compatibility preserved**

---

## D. Referenced areas still underdefined

### 1. Federkreis Devices
- **Status:** Added as hook entity
- **Need later:** what they do, who built them, whether they interface with sigils, lattice nodes, or mirrors

### 2. Forbidden Suitcase
- **Status:** Added as moderate artifact
- **Need later:** contents, sealing reason, opener conditions, relation to 1938

### 3. Seven Fissures
- **Status:** Added as phenomenon
- **Need later:** names/locations of the other six

### 4. Temporal Diaspora
- **Status:** Added as phenomenon
- **Need later:** list of displaced persons, objects, animals, and institutions

---

## E. Historical coherence notes

### 1. Theresia and Marie Antoinette
- **Potential issue:** “1754” may read like the year of activity rather than birth/era marker.
- **Not a contradiction**, but it could confuse readers.
- **Recommendation:** later split `era` into `start_year`, `end_year`, `era_label`.

### 2. Jake marked as “19th-century-wyoming”
- **Potential issue:** Jake’s narrative also intersects present/meta framing through the Weaver.
- **Not a contradiction:** temporal fissure logic covers it.
- **Recommendation:** add `temporal_status`.

### 3. Timeless entities in event chronology
- **Potential issue:** “timeless” is narratively right but structurally messy.
- **Recommendation:** add `event_time_class` with values like `historical`, `timeless`, `meta`, `paradoxical`.

---

## F. Suggested next upgrades
If you want this thing to be museum-grade:

1. Add `start_year`, `end_year`, `sort_year`
2. Add `canon_source_refs` for every creator-supplement entity
3. Add `branch` fields for bloodline subfamilies
4. Add `event_time_class`
5. Add `succession_order` to soul-line entries
6. Add `contains` arrays to archives and places
7. Add `open_questions` arrays to hook and sketched entities

---

# Final recommendation
The **best next step** is a **v1.3 archival edition** with:
- structured dates,
- branch-aware family trees,
- named fissures,
- and a dedicated `open_questions` field.