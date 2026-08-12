# THE FLOOR LIFT — one overnight build, one approval

**Status: SPEC awaiting a single mark.** Nothing here is built. Written 2026-08-05 on Kevin's ask: *"i want to bring the floor up across the board of the entire game experience today by authorizing an overnight build, through a single approval."*

**The shape of the ask, as read:** not one place finished — **every place raised off the floor at once.** Breadth, not depth. The world is walkable and read-only; ten lanes below each take one system from *nothing* or *marker* to *a body you can meet*. No lane finishes. Every lane stops being absent.

**Grounded in:** `NESI_AS_A_WHOLE_2026-08-04.md` p.6–10 (the craft/contract split, the honest ladder) · `BUILD_SPEC_v1_2026-08-04.md` §6 (the dependency table, 5 marked / 12 not) · `THE_WHOLE_NAMING_2026-07-31.md` §7d/§7e · `world3d/HARNESS.md`.

---

## §1 · THE GOVERNING CONSTRAINT

**Every lane rests on marked ground, or on nothing at all.**

Five dependencies are marked (b1 canon-is-bedrock · b3 declared-kinship · k6 volume-never-content · p1 four-states, plus b1's D9 reach). Twelve are not. §9 of BUILD_SPEC_v1 says: *a build that proceeds on an unmarked dependency makes §6 decoration.*

So the floor lift is deliberately built out of two materials only:

- **Craft that decides nothing** — camera, traversal, light, sound, form, doors. None of it needs a dependency, because none of it makes a claim about Kevin's material.
- **Marked ground** — placement from lineage (b3), ground from canon (b1), water from volume (k6).

Nothing in this build touches d1, d2, d3, **d5**, b4, b5, b6, f1, k5, w3, s1/p0, p3. The indicator mapping (d5, highest risk) stays closed. **The world will look and feel much better and will still say exactly as much about you as it does today: nothing.**

---

## §2 · THE TEN LANES

### L1 · THE DOOR
*Now:* `PLAY_WORLD.bat` starts a python server, a console window stays open, the browser opens to a raw canvas.
*Floor:* one file, double-clicked, no console in the face, lands you inside. Failure states say what failed in one plain line instead of a stack trace. Nothing about the door is a menu.
*Rests on:* nothing.

### L2 · TRAVERSAL, CAMERA, FEEL
*Now:* a capsule that slides at a constant rate; the camera is rigid.
*Floor:* acceleration and friction with weight; a step cadence that changes with speed and surface; camera easing, collision, and a look that settles rather than snaps; a walk and a longer stride. **The single largest lift for the least risk in the project** — p.6 names game-feel as pure craft, orthogonal to progression.
*Rests on:* nothing.

### L3 · LIGHT AND READABILITY
*Now:* flat ambient; everything equally lit; you find places by walking into them.
*Floor:* one committed light direction with the heliostat as its source, so the world has a legible axis; depth fog so distance reads; silhouettes that separate the seven places from the terrain at range. This is **locate-never-steer solved visually** (p.6): the world tells you where things are without a label, a marker, or a nudge.
*Rests on:* nothing. Explicitly: no highlight, no outline, no waypoint on anything the system thinks matters.

### L4 · THE SEVEN PLACES GET BODIES
*Now:* buildings are boxes; several places are markers or absent.
*Floor:* Shore · Three Spires · Workshop · Hearth · Heliostat · Lake · Membrane — each a distinguishable built form, recognizable from a distance, enterable, procedurally generated from primitives. No two read alike. The Given and Woven Spires are built **empty on purpose**, so their emptiness reads as *waiting* rather than *broken* (p.8).
*Rests on:* b1, b3 (marked) for where they sit. Form is geometry, not claim.

### L5 · THE ONE VERB — pick up, carry, put down
*Now:* the world is read-only. p.10: *"until a verb set is chosen, no amount of craft produces a game."*
*Floor:* the round's own **move 1** — you can lift a stone, feel it have weight, carry it, and set it down somewhere else. It persists where you left it. That is the entire verb.
**What it is not:** it is not the verb-set choice. Six candidate sets are surfaced and stay unchosen. This builds the one physical act the round already names, and nothing above it — no use, no combine, no consume.
**The guard:** picking a stone up produces no record. Nothing is logged, counted, or noticed. *The game has, correctly, no idea that anything just happened* (p.9).
*Rests on:* a decision. **Carried face-up in the approval.**

### L6 · THE DAM GETS A BODY
*Now:* named, adopted, zero geometry — the most complete idea in the naming with the least existing form.
*Floor:* held water with visible head, a gate you can stand at, and a release where the sound and light change across the valley. Power at the drop, never at the restriction. Standing at a closed gate and leaving it closed is a complete interaction.
**The guard:** the release does **no ledger work.** It moves water and light. It writes nothing, scores nothing, unlocks nothing. That is what keeps d3/d5 closed.
*Rests on:* a decision (the no-ledger-work guard). **Carried face-up in the approval.**

### L7 · WEATHER AND THE UNCOVERING
*Now:* `weather.gd` and `test_weather.tscn` exist; the cycle does not run in the live world.
*Floor:* the cycle runs — fog off the lake, rain, the near slope washing. Where the wash exposes existing relief, it exposes it. **The erosion uncovers; it never creates** (p.9). No text appears. If you are not looking, you miss it, and nothing brings it up later.
*Rests on:* nothing new — the erosion here is geometric wash over ground already derived from marked b1.

### L8 · APEX ENTRY
*Now:* you spawn standing on the ground.
*Floor:* you come in at the apex — a point above the world — and the descent *is* the loading. One vertex uppermost. Nobody explains anything.
**Not built:** the four apex states (f1, unmarked). The entry descent only.
*Rests on:* p1 (marked) for the chain being four states; the rotation stays unbuilt.

### L9 · SOUND
*Now:* silent.
*Floor:* water as a continuous bed that changes with proximity, wind that answers elevation, footfall that answers surface. Procedural or synthesized in-engine.
**The guard, load-bearing:** **no chime, no sting, no acknowledgment cue, ever.** p.10 names this as the subtle failure mode — *a satisfying acknowledgement chime IS an achievement.* Sound reports the world's state. It never reports on you.
*Rests on:* nothing.

### L10 · THE LEDGER HOLE
*Now:* `decisions.py` silently skips a deposit whose tile id already exists on a surface, and `verify` still passes. A mechanism that reports clean while skipping.
*Floor:* it fails loudly. Same-id re-deposit either errors or records a distinct entry; verify catches it.
*Rests on:* nothing. This is a correctness fix, not a design move.

---

## §3 · THE CEILING — what this build will not touch

Named so the morning report cannot quietly claim more than it did:

- **S6's hollowness stays hollow.** Exposure order still equals inbound-link order. Wear-by-position-in-grain is not built.
- **S7, the Lock, stays unbuilt.** 129 crossings in, zero out. Untouched.
- **The four apex states stay unbuilt** (f1 unmarked). Entry descent only.
- **Indicators stay closed** (d5 unmarked, highest risk). Nothing in the world will report a state about Kevin.
- **The word-count clock stays as it is.** The law and the build still disagree; the disagreement stays recorded, not smoothed.
- **No imported art assets.** Everything procedural, from primitives, in-engine. A downloaded tree is someone else deciding what this world contains.
- **The twelve unmarked dependencies stay untouched.**
- **No gift, no guest, no crossing.** The Given and Woven Spires stay empty.

---

## §4 · WHAT ONE APPROVAL CARRIES

The single yes authorizes ten lanes and, inside them, exactly three decisions that are not already marked:

1. **L5** — pick up / carry / put down is built as the round's move 1, and this does **not** close the verb-set question.
2. **L6** — the dam's release does no ledger work; it moves water, sound, and light only.
3. **The run itself** — unattended, overnight, on this machine, writing only inside `nesi/world3d/` and `tools/`, with a morning report.

Anything else the build would need, it does not get. If a lane turns out to require an unmarked dependency, **that lane stops and the report names it** rather than proceeding.

---

## §5 · WHAT THE MORNING REPORT MUST DO

Per the Definition of Done, split in two, every lane:

- **What ran** — the scene that was executed, the test that passed, the export timestamp that moved.
- **What only Kevin can say** — whether the floor coming up made the world a place he wants to be in. No machine claim touches that line.

And: **the edge of what was checked**, per lane. Where verification stopped.

---

## §6 · THE FALSIFIER

If the floor comes up across all ten lanes and Kevin walks in and the honest description is *"it was beautiful and I felt like I should keep playing"* — the contract got in through the craft, and the guards in L5, L6, and L9 were decorative.

The correct description, if this works, is quieter:

> *It was a good place to be. Nothing wanted anything from me. I left when I was done and it was fine.*

And the second falsifier, from p.10, which this build cannot escape: **if the floor comes up everywhere and the world is still unvisited, the missing thing was never craft.**

---

*Written 2026-08-05. Nothing built. One mark authorizes the whole; any line amends in Kevin's own words and the rest stands.*
