# GIFT — a rule for the sheet, not a solver

- **title:** a rule for the sheet, not a solver
- **what:** a tension-membrane station: a grid of points displaced from a drag point by a pure exponential falloff (no physics solver, no iteration) with real-time strain; pulling past a reach threshold tears the sheet, which then holds nothing and self-heals only by elapsed real time — never while the panel is closed, and never on demand.
- **source:** `nesi/world2d/scripts/membrane_panel.gd:1-180`
- **when:** predates this session; no in-file date, sibling station to `heliostat_panel.gd` (dated 2026-08-09 for the same persistence law)
- **quote:** *"Tension here is OBEYED, not simulated. There is no solver — the sheet's shape is a rule: depth falls off with distance from the pull, and strain is the pull's reach."* And on the fail state: *"a torn membrane holds nothing... It closes again on its own, in its own time, and nothing asks you to wait."*
- **capacity:** game2d has no deformable/elastic surface and no fail state that repairs itself purely on the clock while the player is elsewhere. This is a cheap, non-physics way to render a responsive, tactile-feeling surface (one `exp()` per point, no simulation step) plus a distinct kind of consequence from the burn gift's permanent scorch: a temporary but real cost the player cannot rush — it heals in wall-clock time whether or not the page is open, because the countdown only runs against the same persisted timestamp the rest of the station's state uses.
- **unrouted_because:** built and finished entirely inside world2d's Godot scene tree; game2d's index.html has no drag-deformation, tension, tear, or self-healing-over-real-time concept — the only "anchor" and "pull" hits in index.html are unrelated lattice-node vocabulary.
- **routing:** a way in → a lattice surface or connector line rendered as a grid of sampled points → an act → on drag, displace each sampled point from the pointer by `exp(-distance/k)` scaled by pull length, per this file's `_sheet_point` rule → a visible consequence → dragging past a reach constant flips a persisted "torn" state with a wall-clock close-timestamp; while torn the surface renders inert (routes nothing) and only un-tears itself once real time has actually elapsed, even across a reload.
- **reading:** capacity: M · effort: M · confidence: M

---
*Ordered nothing. Waiting for a mark.*
