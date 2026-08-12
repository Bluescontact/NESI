# THE SOURCE — words-into-water measure (waters.gd + waters.json)

**What:** The inflow of each of the three flumes derived from actual intake writing: export_waters.py reads the intake read-only, writes waters.json; waters.gd loads it by the same lawful path as the other stores, falls back silently to the old constant if absent; no number ever reaches the screen.

**Source:** `nesi/world3d/scripts/waters.gd (+ export/web/waters.json, export_waters.py)`
**When:** 2026-08-06 (closes C4)

**Evidence (verbatim):**
> # THE SOURCE — Kevin's mark 2026-08-06, closing C4: "the water rises on WORDS INTO THE INTAKE." ... ABSENT FILE = the world falls back to the old constant, silently and honestly, and says so once in the log.

**Capacity:** The already-built bridge from the WHOLE historical intake to flume fill — the 2D world's water level answers everything ever written, not just today's session.

**Unrouted because:** Only spires.gd (3D) consumes it; the 2D scripts contain no reference to waters.json.

**Shortest routing:** 2D store reads waters.json at load -> the three spire channels on the net draw at their measured fills -> writing more and re-exporting visibly raises them.

**Reading:** capacity M · effort L · confidence M

---
This card orders nothing. It waits for Kevin's mark. Blank is a complete state.
