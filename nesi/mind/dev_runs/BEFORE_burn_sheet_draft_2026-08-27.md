# DRAFT — design proposal for gifts #13 (the burn) and #14 (the sheet)

Proposed 2026-08-27, after Kevin's mark: *"i thought 5 13 1nd 14 all need a
new ui built that deserves a dream and a develop pass."* This document is
the target for that pass — not yet authorized, not yet built. Its job is
to give `full-development` something concrete to compost, audit, ground,
diverge, and dream against, rather than running the process on nothing.

## The two source mechanics, as catalogued

**Gift #13, "the burn that never heals itself"** (`gift_2026-08-27_13_the_burn.md`,
source `nesi/world2d/scripts/heliostat_panel.gd`): a drag-aimed light-beam
station with three receivers. Sustained targeting on one accumulates heat;
past a threshold the receiver scorches permanently shut — closure written
to the store the instant it happens, survives reload/quit, never heals.
Feedback is a quality (aperture narrows, colour reddens), never a number.
Named capacity: game2d has nothing that turns sustained attention into an
irreversible, session-surviving mark on the world.

**Gift #14, "a rule for the sheet, not a solver"** (`gift_2026-08-27_14_rule_for_the_sheet.md`,
source `nesi/world2d/scripts/membrane_panel.gd`): a tension-membrane
station — a grid of points displaced from a drag point by pure exponential
falloff, no physics solver. Pulling past a reach threshold tears the
sheet; a torn sheet holds nothing and self-heals only by elapsed real
(wall-clock) time, never on demand, never while closed. Named capacity: a
temporary but real cost the player cannot rush.

## My own first-pass design sketch, offered as raw material to attack

This is deliberately a first draft, not a proposal to defend — the audit
and ground stages exist to find what's wrong with it.

**Burn, sketched as a new "burn" ground:** three receiver circles in a
canvas. Pointer-hold on one accumulates held-milliseconds toward a fixed
threshold (ported unchanged: 3.4s, `heliostat_panel.gd`'s own `BURN_AT`).
No decay while not held — heat only ever goes up, holds steady when
released, until either the player stops or crosses the line. Past
threshold: permanent scorch, persisted, rendered only as colour/radius.

**Sheet, sketched as a new "sheet" ground:** a grid of points on a canvas.
Drag anywhere; each point's screen offset is `exp(-distance/k) * pull`
toward the pointer, recomputed on every pointermove, no simulation step.
Dragging past a reach threshold (ported: 150px) flips a persisted `torn`
flag with a wall-clock timestamp; while torn, the grid renders flat and
ignores drag input; it un-tears once 7 real seconds (`membrane_panel.gd`'s
own `RELAX`) have elapsed, checked on every render including after reload.

## Open questions this draft does NOT resolve, named for the audit/ground/diverge stages

- Is "hold a pointer down on a circle" an honest translation of "sustained
  beam targeting via a hand-turned mirror," or does dropping the aiming
  step lose the actual skill the source mechanic tests?
- Does either mechanic need to connect to the writer's own sentence data at
  all (the way garden/tarp/filter/words do), or is a content-free tactile
  surface a legitimate ground in this build — and if so, on what grounds
  (no pun intended) does that get decided?
- Is two new "grounds" the right container, or could one or both live as a
  feature *inside* an existing ground instead of a new top-level nav item?
- The burn's "no decay, ever" and the sheet's "heals only by wall-clock
  time" are opposite failure shapes on purpose (per their own source
  files) — does building them in the same pass risk flattening that
  difference into "two canvases with a threshold," losing what makes each
  one specific?
- Neither mechanic has an obvious "visible consequence" beyond itself —
  unlike gift #9 (which fed into the existing WORLD FACE ground) these are
  freestanding. Is a freestanding tactile mechanic, with no data feeding it
  and nothing downstream reading its state, actually wanted here, or is
  that itself the finding?

## What this document is not

Not a build. Not an authorization. Not a claim that the sketch above is
correct — it is the compost this pass works on.
