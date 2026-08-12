# The 4-6-4-1 barycentric sort — 7,440 items with per-item tetrahedral coordinates

**What:** A completed, runnable sort of the entire library onto the tetrahedral form: SORT.jsonl holds 7,440 rows, each with barycentric weights over D/C/B/A, a position (vertex/edge/face/center), a kind, and verbatim evidence words. tools/sift.py regenerates it end to end. Counts: 1172 vertex, 3382 edge, 2491 face, 306 center, 89 unsorted.

**Source:** `Desktop/4-6-4-1/deposit/SORT.jsonl (7,440 lines) + tools/sift.py + deposit/THE_FORM.md`
**When:** 2026-08-07

**Evidence (verbatim):**
> "4 VERTICES every item lands on exactly one, by the evidence in its own text / 6 EDGES ... / 4 FACES ... / 1 CENTER" (sift.py); sample row: {"path":"DSS content/ASSEMBLY_MAP.md", ... "position":"DA","kind":"edge","weights":{"D":0.261,"C":0.116,"B":0.132,"A":0.49}}

**Capacity:** Every item already has coordinates ON a tetrahedron — the exact solid the entry tetrahedron is. A ready-made placement function for dropping items onto the 2D net with no new classification; evidence words travel verbatim so placement stays auditable and overturnable by hand. The 306 center items and 89 unsorted are lawful held states. Terrain-population data, computed, sitting on the Desktop.

**Unrouted because:** Standalone folder outside DSS content; nothing in nesi/ or the game stores reads SORT.jsonl.

**Shortest routing:** Read SORT.jsonl into the game's data store; map each row's position code onto the corresponding region of the net. The center region collects its 306 items and stays unnamed per standing instruction. No numbers surface to the player.

**Reading:** capacity H · effort L · confidence H

---
This card orders nothing. It waits for Kevin's mark. Blank is a complete state.
