# export_pile.py — wordless shape-only deposit export

**What:** Reads the _INTAKE drop-zone and emits pile.json: per item only an opaque ref, extent (size 0..1) and settled (age 0..1). No titles, no text crosses.

**Source:** `tools/export_pile.py`
**When:** 2026-08-06

**Evidence (verbatim):**
> "What crosses is SHAPE — how big a thing is, and how long it has been lying there. The world is not allowed to know what any of these say." ... OUT = ROOT / "nesi" / "world3d" / "data" / "pile.json"

**Capacity:** A ready renderer-feed for physical objects whose use is apparent by shape not explanation — slabs/stones in the 2D world, law-2 and law-5 clean by construction.

**Unrouted because:** Its output path is world3d/data only; the 2D game reads no pile.json.

**Shortest routing:** Add a 2D output path (path_override pattern) or point the 2D deposit scene at the existing pile.json.

**Reading:** capacity M · effort L · confidence H

---
This card orders nothing. It waits for Kevin's mark. Blank is a complete state.
