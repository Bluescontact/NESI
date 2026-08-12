# cupola.py — the two-cupola split verified end to end, with a found flat net and its seam join edge

**What:** Verifies all four body-diagonal cupola splits (7/7 faces, exactly 6 seam edges each), confirms the seam vertices are the zero-dot hexagonal great circle, computes the 24 proper rotations and the C3 fixing the (1,1,1) axis, then searches spanning trees constrained to the cupola split and FINDS one that unfolds flat with no overlap, printing the join edge. The specific net Kevin's 'hold the two-cupola net' mark rests on.

**Source:** `(temp) 87c5c4fc scratchpad/cupola.py — preserved copy: skill ._work/rescued_87c5c4fc/cupola.py`
**When:** 2026-08-09

**Evidence (verbatim):**
> for join in cross: for ta in nx.SpanningTreeIterator(nx.Graph(inA)): for tb in nx.SpanningTreeIterator(nx.Graph(inB)): ... if valid(T) is not None: best=(T,join); break

**Capacity:** Re-running it reproduces the exact tree edges and seam join for the marked two-cupola net — the coordinates of THE net, deterministic. Carries the great-circle seam and C3 checks as executable proof.

**Unrouted because:** Same temp scratchpad; the tree/join it found was printed to a transcript, not saved to disk (no good.json anywhere).

**Shortest routing:** Copy into the DSS tree with nets.py; run once and persist the found tree + the 14 face polygons as a JSON the 2D scene reads (path_override pattern).

**Reading:** capacity H · effort L · confidence H

---
This card orders nothing. It waits for Kevin's mark. Blank is a complete state.
