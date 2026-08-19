---
name: conservation-harness
description: For any mechanic that routes, splits, transforms, or persists a unit of a player's own material, name the exact quantity that must not change and generate a runnable check for it — not advice, a script. Use when a new mechanic offers a player's material more than one path, when asked "what's conserved here," "build a conservation check," "does this leak or duplicate," or before trusting a routing/persistence system that hasn't been counted. Born from nesi/game2d/tools/conserve.js: "conservation is your test harness... total volume must be constant unless a gate adds or a drain removes." Proven twice on 2026-08-19 against real, live bugs it found and adversarially confirmed: a re-visitable seat re-routing the same material forever, and a 500-word write destroyed in full if interrupted before its physics settled.
---

# Conservation harness

No caption, screenshot, or geometry check can see a duplicated or dropped
unit of a player's own material. Only a count can. The reasoning this skill
exists to protect: *"a duplicated stone is the player's own sentence
appearing in the world more times than they wrote it — the world editing
their material by arithmetic rather than by words."* That failure is
invisible to every other kind of check.

**This skill's output is a script, not a paragraph.** A conservation check
that lives as prose ("routing should preserve the total") gets skipped the
same way every unenforced instrument in this corpus's own record has been
skipped. The point of this procedure is to leave behind something that runs
on its own, registered wherever this project's checks already run
unconditionally — not something a future session has to remember to reach
for again.

## The procedure

### 1. Name the unit

The single smallest piece of the player's own material that moves through
this mechanic — a sentence, a stone, a resource token, a save-file entry.
Not the container it travels in; the thing itself.

### 2. Name the invariant precisely

What must be true of the count or total no matter how the unit is routed?
State it as a number or a rule, not a feeling: "exactly one landing, however
many destinations it's offered to," "total unchanged unless a named gate
adds or a named drain removes," "a null action changes nothing, anywhere."
If you cannot state this precisely, that inability is the finding — stop and
say **NO INVARIANT NAMED**, don't force an answer to fill the step.

### 3. Enumerate every route the mechanic actually offers

Drawn from `conserve.js`'s K1–K6, adapt to what the mechanic at hand
actually has:

- **Single destination** — the unit routed to one place. Does it land
  exactly once?
- **Split across multiple paths** — the same unit offered to several
  destinations at once (e.g., three fractions each getting a route call). Do
  they still land exactly once total, not once per path offered?
- **The stage/record matches the actual landing** — if the object tracks
  its own state ("where I ended up"), does that self-report agree with where
  it's actually stored? A stage that says one thing while the store holds it
  somewhere else is a second kind of leak.
- **The null/no-op action** — declining, setting down, canceling. Does this
  add to *no* store and remove from *no* store? An absence that
  accidentally accumulates somewhere is the mechanic quietly rewarding or
  penalizing a non-action.
- **The intentionally invisible destination** — anything designed never to
  render or resurface (a discard pile, a "the deep," a permanent delete).
  Does it actually never accumulate in a store that *does* render? A design
  that promises "this never comes back" and then quietly keeps counting it
  somewhere visible is lying to the player by omission.

### 4. Generate the actual check

Write real, runnable code — parametrized by the routing function, a landing
counter, and the expected count per scenario above — not a description of
what such a check would do. **Drive the real code, never a reimplemented
copy.** If the mechanic lives inline in a page rather than an importable
module (common in this codebase — game logic embedded directly in an
HTML file's `<script>` block), extract and `vm.runInContext` that exact
block rather than rewriting its logic from memory; a copy can drift from
what ships and then the check is proving something the game no longer does.
`nesi/game2d/tools/first_four.js` and `tools/conserve_stations.js` /
`tools/conserve_seating.js` are the reference harness — reuse their DOM/canvas
mock and vm-extraction setup wholesale rather than rebuilding it each time;
they were built for exactly this reuse.

Register it wherever this project's existing check suite runs on every
pass (the equivalent of this game's `check_all.js`), the same way
`organ_audit.js` and the other structural instruments are registered there,
not left as a standalone script nobody remembers to invoke.

### 5. Run it and report per-scenario, not just a total

Each scenario from step 3 gets its own pass/fail with the actual landing
count and location — "the sentence came to rest 2 times: pool0, compost —
expected exactly 1" is a finding; "conservation failed" is not.

### 6. Prove the check catches what it claims to — this step is not optional

A conservation check that has only ever been run against passing code has
never actually been shown to detect anything; it might pass any input. If
you found or suspect a real defect: **revert the fix, run the new check,
confirm it fails with the shape of failure the defect predicts (not just
"a test failed" — the actual wrong count, at the actual wrong location),
then restore the fix and confirm it passes again.** This caught a real
self-inflicted regression on 2026-08-19 (a fix that broke an unrelated,
already-passing check) that the "does it pass now" question alone would
have missed — the adversarial half of the proof is not decoration, it is
where a second bug hides. If there's no known-bad state to revert to
(the check is preventive, not curative), say so and skip this step
honestly rather than fake a revert.

## Ending states

- **CONSERVED** — every scenario checked lands exactly where the invariant
  says it should, and the check now runs unconditionally, not only when
  invoked.
- **NOT CONSERVED** — name which scenario failed, the actual count, and
  every location the unit was found. Don't average this into "mostly
  conserved."
- **NO INVARIANT NAMED** — step 2 couldn't be answered. This is itself worth
  reporting, not a failure to hide: a mechanic nobody can state a
  conservation law for is a mechanic nobody has decided what it's allowed to
  do to a player's material.
