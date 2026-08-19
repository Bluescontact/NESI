---
name: threshold-sweep
description: For any numeric constant a player's success or a screen's legibility depends on — a hit-radius, a timing window, a drag distance, a hold duration, a darkness/contrast value — sweep it across the real input space instead of placing it by eye, and produce a coverage map, not an opinion. Use before shipping any such constant, or when asked to "sweep this," "did we place this by eye," "check this threshold," or "is this readable/reachable." Absorbs visual/atmospheric tuning (read the actual renders, not the intent). Born from the game-craft lens's Node 1 law — "NEVER PLACE A PHYSICS OBJECTIVE BY EYE" — and a live 2026-08-19 finding that nesi/game2d/seam.js's REACH=900 and ROOT_STEP=0.22 carried forward unswept across two files. Built and registered the same day (tools/sweep_thresholds.js): found a genuine knife-edge in a drag gesture, confirmed one constant's real behavior differs from its own nominal value, and corrected a wrong claim made earlier in the same session by measuring instead of re-asserting it.
---

# Threshold sweep

*"His walk found a beacon that was provably unreachable and another reachable
within 30px but not within its 19px radius: technically fair, actually
cruel."* A constant placed by eye reads correctly in the designer's head and
fails somewhere in the real input space the designer never actually tried.
The failure is invisible to reasoning about the constant and obvious the
first time something sweeps the range it will actually be evaluated against.

This applies to two kinds of constant, by the same procedure: a **physics or
interaction gate** (does this input succeed or fail) and a **visual
parameter** (does this render read as intended). The second is not a
separate skill — *"TUNE DARKNESS WITH SCREENSHOTS, NOT INTENT... read the
pixels, not the plan"* is the identical law applied to image-space instead of
input-space: sweep the actual range of states it will render under, and read
the actual output, not a description of it.

## The procedure

### 1. Name the constant and what success means

State it as a number with units, and state the pass/fail (or graded)
function it gates — not "the timing feels right" but "a hold of ≥X ms opens
the sill" or "a click within Ypx of the target counts."

### 2. Name the real input space — not a single test case

For an interaction constant: the actual range of positions, velocities,
hold-durations, or drag-paths a real hand could produce, not the one clean
example that motivated the number. For a visual constant: the actual range of
states it will be evaluated under — every time-of-day, every accumulated
level, every device/display condition that changes what's on screen — not
the one screenshot taken while building it.

### 3. Generate a sweep, not a spot-check

Write a script that evaluates the success function (or, for visual
constants, produces the actual renders — real screenshots, not a described
mockup) across that space, sampled densely enough to find edges, not just
midpoints. Output a coverage map: where it holds, where it fails, and how
close the nearest failure is to anything a real hand or a real render state
would actually land on.

Register the sweep script wherever this project's existing check suite runs
on every pass (the equivalent of this game's `check_all.js`), the same way
`organ_audit.js` and the other structural instruments are registered there —
not left as a standalone script a future session has to remember to
re-invoke. A sweep that only ran once, by hand, the day the constant was
introduced gives no protection against the next change that moves the input
space out from under it.

### 4. Read the actual result — same rule as cold-walk's outside verdict

For visual output specifically, hand the actual renders to a reader who
wasn't holding the intended mood in their head while building it. "Reads as
atmospherically dark" from the person who wrote the darkness value is not
evidence; the PNG, looked at cold, is.

### 5. Flag knife-edges explicitly

If the map shows the constant is only satisfied within a margin no real
input or render state would land on by more than a hair — even if it
technically passes — that is a finding, not a pass. Site objectives and
thresholds where *many* solutions clear them, not exactly one.

### 6. For timer/animation-driven constants: control the clock, don't wait on it

A constant gated by real elapsed time (`performance.now()`, `setInterval`,
`requestAnimationFrame`) doesn't need the sweep to actually sit through real
seconds. Monkey-patch the clock and the timer functions the code reads
(`global.performance = { now: () => controllableValue }`,
`global.setInterval = (fn) => { store fn, return a fake id }`), then advance
the fake clock and invoke the stored callback yourself. This makes a sweep
across "smooth 60fps" through "throttled background tab" instantaneous and
exact instead of a slow, noisy real-time observation — and it's how a real
defect class (a threshold that silently takes 3x longer under throttling)
gets caught deterministically rather than by luck.

### 7. Refuse only where the number lies about itself; report everything else

A threshold-sweep instrument has no standing to rule on feel — "should a
hold take 300ms or 900ms" is exactly the kind of fork this corpus never
defaults, the same as any other. What it *can* refuse on, the same way
`hand_check`/`solid_check` refuse: whether the constant's **measured, real
behavior matches its own claimed number** — a threshold that claims `900`
but actually fires at a frame-rate-dependent value nowhere near 900 is the
surface lying about its own mechanic, this corpus's own named defect class,
and that's refusable. Register the instrument as a REPORT-class row in the
check suite (like `organ_map`/`organ_audit` — exits clean, prints what it
found) with a small number of genuine REFUSE-class assertions inside it for
the self-consistency checks specifically. Don't make the whole instrument
refuse on a feel number; that manufactures authority the skill doesn't have.

## Ending states

- **SWEPT** — here is the coverage map, here is where it's safe, here is the
  narrowest margin found and whether anything real would actually hit it.
- **UNSWEPT** — say so plainly if there wasn't time or the input space
  couldn't be enumerated yet. Never ship a constant silently un-swept while
  implying it was checked — an eyeballed number that says nothing about
  itself is honest; an eyeballed number presented next to a green checkmark
  is not.
