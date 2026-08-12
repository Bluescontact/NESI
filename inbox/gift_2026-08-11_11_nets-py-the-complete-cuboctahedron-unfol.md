# nets.py — the complete cuboctahedron unfolder

**What:** The actual working code from session 87c5c4fc: builds the 12 VE vertices, the 14 faces, the bipartite dual graph (24 edges), computes exactly 331,776 spanning trees via exact-rational Kirchhoff determinant, and — the core ingredient — unfold(tree)->{face:[xy]} that lays any spanning tree flat in the plane with reflection handling, plus SAT-based poly_overlap and valid(tree_edges) returning the 14 face polygons in 2D coordinates or None. This IS the 2D game's board generator.

**Source:** `(temp) 87c5c4fc scratchpad/nets.py — preserved copy: skill ._work/rescued_87c5c4fc/nets.py`
**When:** 2026-08-09

**Evidence (verbatim):**
> def unfold(tree_adj, root=0): """returns {face: [xy,...]} or None if a face can't be placed""" ... return poly if len(poly)==14 else None | minor = [[L[r][c] for c in range(1,14)] for r in range(1,14)]; NTREES = int(det_frac(minor))

**Capacity:** Import it, feed it the cupola-split tree, and you have the exact 2D coordinates of all 14 faces of the 1943 Life net — the game board, computed not drawn.

**Unrouted because:** Lives ONLY in a session-specific temp scratchpad; one temp-clean deletes it. PROTOCOLS.md carries the prose conclusions; the code that produced them is on the wrong side of the membrane.

**Shortest routing:** Copy nets.py (with cupola.py and run2.py) into the DSS tree — then it is the direct board-layout generator for NESI the 2D game.

**Reading:** capacity H · effort L · confidence H

---
This card orders nothing. It waits for Kevin's mark. Blank is a complete state.
