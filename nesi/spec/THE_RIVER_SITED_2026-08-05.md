# BUILD REPORT — the river is sited on the grain. The dam has no site.

**Built 2026-08-05** on Kevin's ruling, caught in `MARKS_LOG.jsonl` before anything was acted on:

> *"SITE THE DAM AND THE RIVER ON THE GRAIN: the river runs where the ground already falls (valleys cut along bedding), and the dam sits where the grain makes a throat. Nothing placed by hand."*

**Files:** `nesi/world3d/scripts/river.gd` (new) · `scripts/main.gd` (wired) · `scripts/test_river.gd` + `scenes/test_river.tscn` (new).
**Verified by running it** headless against the real scene, twelve assertions, plus the five existing scenes.

---

## 1 · THE MECHANISM — three sentences, no coordinates

**There is not a single coordinate in `river.gd`.** Every position is read off `Terrain`, which reads off `patterns/`. If canon changes, the river moves.

1. **THE SOURCE** is the highest standing bedrock — the hardest pattern, the one most has been built on top of. Found by sweeping the map, not chosen. Building sites are excluded: a spring does not rise inside a workshop, and a levelled plateau is a floor rather than a summit.
2. **THE COURSE** is steepest descent from there. Water does not pick a route; it takes the one the ground already made. Where it reaches a hollow it **pools and spills** over the lowest lip within reach — the one part of a river's path that rises, flagged as such.
3. **THE THROAT** is the narrowest cross-section with **two real banks** — ground rising 1.5 m within 46 m on *both* sides. That is where the dam stands.

**The dam's own rules, stated as what they are rather than as step counts:** not in standing water (it would hold nothing) · not on a building site (that ground is taken, and its plateau fakes a throat) · not within the top 10% of the drop (a wall around a spring) · not within 3 m of the lake surface (a wall in the lake).

**The guard from the naming, kept:** a dam holds and releases. No code in this file looks at any text, because no text ever reaches it.

---

## 2 · WHAT RAN

| assertion | result |
|---|---|
| A course exists | **65 steps** |
| The source stands high | y = **29.84**, the highest walkable non-site ground on the map |
| The source is walkable | yes |
| The channel never climbs | **0** climbing channel steps |
| The course falls, source to mouth | **30.97 m** net |
| Every step sits on the ground | **0** off-surface |
| The river ends where it can fall no further | mouth y = **−1.14**, below the water line — it reaches the lake |
| Spill steps | **36 of 65**, of which 19 rise over a lip |
| Deterministic | a second build produced the identical course |

**Existing scenes, all still passing:** `test_bedrock` · `test_counts` · `test_shore_roundtrip` · `test_field` · `test_tetra`.
**Web build re-exported** 15:44 — 43 tetra overlay lines, 0 unfilled placeholders.

---

## 3 · THE DAM HAS NO SITE, AND THAT IS THE FINDING

```
[dam] NO SITE. 5 channel step(s) eligible · 0 with ground rising 1.5 m
      within 46.0 m on BOTH sides · narrowest none
[dam] the grain makes no throat on this course. Nothing was placed.
```

**On this terrain, the grain makes no throat.** Of 65 course steps, 36 cross pools, several sit on building sites, and the rest fall inside the spring head or the lake margin — leaving **five** eligible channel steps, **none** of which has ground rising on both sides within reach.

The ruling said the dam sits where the grain makes a throat. It does not say what to do when there is none, and **inventing one would be placing it by hand** — the exact thing the ruling forbids. So nothing was placed, and the measurement is printed every time the world loads rather than swallowed.

**Two honest readings, both available, neither taken here:**
- **The instrument is too strict.** 1.5 m of rise within 46 m on both sides is a canyon test, and this bedrock is broad hills, not canyons. A gentler bank definition would find a throat.
- **The ground genuinely has no throat.** The bedrock is a sum of 96 smooth masses; it makes basins and saddles, not gorges. If so, the dam waits for canon to grow a narrower valley — which is a real thing to wait for, and the river runs meanwhile.

---

## 4 · THE EDGE OF WHAT WAS CHECKED

- **Nothing was seen.** Twelve assertions, all state read out of a running scene. Nobody has walked the river.
- **36 of 65 steps are spills.** The course spends more of its length crossing hollows than running in a channel. A real drainage model would accumulate flow and cut a bed; this one follows the ground as it is. Named, not hidden.
- **`test_regions` fails, and it is not this build.** The player ends at y ≈ 209 — inside a building interior (`Buildings.INTERIOR_Y = 160`), not on the region marker — so the assertion that fails is not the one being tested. **Reproduced with `River` entirely absent from `main.gd`**, twice, byte-identical. `main.gd` was concurrently modified by another session during this work (the edit tool reported changes on disk not in context). Left alone rather than chased, with a diagnostic line added to the test so the next session sees where the player actually went.
- **The dam's geometry is written and untested.** `_draw_dam()` builds a wall, a collider and a label sized to the throat — it has never run, because no throat was found.

---

## 5 · THE TWO CLAIMS, SPLIT

**The mechanism works.** The river is derived end to end from canon, descends without climbing, sits on the ground at every step, reaches the lake, and is deterministic. The dam's siting rule runs, finds nothing that qualifies, and says so with the numbers.

**Whether this does what you needed** is not something this report can say — and one specific piece of it is yours alone: whether "no throat" is the ground telling the truth, or an instrument set too fine.
