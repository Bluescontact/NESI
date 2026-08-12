# terrain_layout.py — the writer the game believes is lost

**What:** Runnable generator that turns Kevin's verbatim marks (MARKS_LOG.jsonl) into a 2D landscape: TF-IDF -> cosine distance -> MDS positions, KMeans regions labelled by their own top terms, patterns projected into the same space. Writes terrain_layout.json — the exact file the world already reads.

**Source:** `tools/terrain_layout.py`
**When:** 2026-08-02

**Evidence (verbatim):**
> "THE_TERRAIN.html (2026-07-30) embedded a computed layout as JS constants and the generator was never saved. This is that generator ... TF-IDF over the mark text -> cosine distance -> 2D layout. Nearness encodes SHARED LANGUAGE." — world3d STATE_MAP.md:248 records it as "tools/terrain_layout.py | (named, absent) | SPEC_ONLY ... Not on disk." (D-14). It IS on disk.

**Capacity:** A words-to-2D-ground pipeline with the guard already built (counts words, never reads the writer). For the 2D net game this is the ground-generation ingredient whole: text in, x/y positions + named regions out.

**Unrouted because:** world3d's own STATE_MAP (D-14) declares the writer missing and parked regeneration; the 2D game consumes nothing from it.

**Shortest routing:** Point its --out at a world2d store and let the 2D net read positions/regions the way regions.gd already does; also closes D-14 by naming the file found.

**Reading:** capacity H · effort L · confidence H

---
This card orders nothing. It waits for Kevin's mark. Blank is a complete state.
