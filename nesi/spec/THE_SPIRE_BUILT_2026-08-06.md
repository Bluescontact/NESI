# ONE SPIRE, ALL THE WAY DOWN — BUILT AND VERIFIED

**Kevin's mark, 2026-08-06:** *"build one spire, all the way down."* And in the same
breath, two namings that went straight into the build: *"every spire has it's own range
extending towards the center from it's corner in the tetra. Each terrain has it's own
ecosystems... when flow is restored the land fills with life."* And mid-build: *"a central
cylinder of light... the ring expands as coherence and convergence of water and light. The
center of the cylinder reaches into the unnamed deep."*

**Status: BUILT, RUN, AND VERIFIED — but not looked at.** See §6.

---

## 1 · WHAT WAS BUILT

Five new files, one wiring, two edits to the body.

| File | What it is |
|---|---|
| `scripts/tetra.gd` | the world's form as arithmetic — apex, three corners, three edges |
| `scripts/spire_dam.gd` | the gate on a spire; §7d's three laws, dam.gd's physics |
| `scripts/spire.gd` | one edge: channel, water, gate, outfall, range, ecosystem |
| `scripts/spires.gd` | the three, the apex room, the cylinder, the deck registry |
| `scripts/test_spire.gd` + `scenes/test_spire.tscn` | 47 assertions |

Wired in `scripts/main.gd` (built after the tarp; `[R]` works a spire gate exactly as it
works the river's). Two edits in `scripts/player.gd` — `_floor_at` and `_footing`, so a
deck is a floor.

Added to `run_tests.py` as the twelfth scene.

---

## 2 · THE GEOMETRY, DERIVED NOT TYPED

**The apex** is `Vector3(Terrain.LAKE_CX, 240, Terrain.LAKE_CZ)` — read from the lake's own
constants, which is the point `player.gd` has descended from since the floor lift. Move the
lake and the whole tetra moves.

**The three corners** are three bearings at 80 m from the world origin, each then walked
outward to the nearest ground with standing room around it — the same rule the spawn uses,
and for the same reason. All three landed on their first try (settled by 0.0 m).

Measured, at build:

| Spire | Corner | Edge length | Fall |
|---|---|---|---|
| **THE GROWN** | (0.0, −1.3, 80.0) | 258.4 m | 241.3 m |
| **THE GIVEN** | (−69.3, 1.9, −40.0) | 243.1 m | 238.1 m |
| **THE WOVEN** | (69.3, 2.9, −40.0) | 273.4 m | 237.1 m |

Nearest pair of corners: 138.6 m. They are genuinely spread.

**Three sources at the apex, three descents, three waters.** The Grown/Given/Woven
assignment is the graft flagged in `THE_VISION_WHOLE` and it is **still unmarked** — it is
carried here as `Tetra.NAMES` and one line changes it.

---

## 3 · WHAT IS ON A SPIRE, GOING DOWN

**THE ROUND ROOM AT THE APEX** — radius 21 m, a glass floor rendered on both faces so you
look down through it at the world you are feeding, a parapet of 48 posts with three gaps
where the edges leave, and three outlets in the floor. This is **THE HEADWATERS**, which
has had a name since 08-04 and no body until now.

**THE CHANNEL** — 40 slabs down each edge: a deck 15 m wide, two kerbs, and the water
between them. Above the gate the water always runs. Below it, it waits.

**THE GATE** — `SpireDam`. Its body is its own (a flume has no banks, so its abutments are
the flume's own walls) but **every law is `dam.gd`'s, called, not restated**:
`Dam.flow_of`, `Dam.head_of`, `Dam.power_of`, `Dam.build_streams`, `Dam.to_db`. There is
exactly one account of what a gate does in this world.

**THE OUTFALL** — the mouth, standing on the corner.

**THE RANGE** (Kevin's naming, same day) — two posts at each corner, 12 m and 34 m out,
on the bearing from that corner toward the lake at the centre. `on_range()` is a pure
function of where you stand. It computes nothing, recommends nothing, and tells nobody.

**THE ECOSYSTEM** — 50 things per corner, scattered deterministically from
`Terrain.seed_value()` (the canon count), each a different kind per spire. They stand at
zero height while the gate is shut and grow as the water arrives, nearest the outfall
first. These are **INDICATORS** in `THE_DEPOSIT`'s sense: readable, attention elsewhere.

**THE CYLINDER** — standing on the lake's centre, its foot 26 m below the water in the
unnamed deep, its head above the apex. Its radius is a pure function of how much water is
converging. Unshaded geometry, **not** a `Light3D` — L3's one-sun guard holds.

---

## 4 · WHAT THE TEST PROVES

47 assertions, all passing, `run_tests.py` 12/12 in 59 s. The numbers it printed:

**Holding is not producing.** Held 3 s: leaf 0.0, flow 0.0, **power exactly 0.0** — not a
small number. And the land at its corner is not alive.

**Power comes from the fall.** The same volume (flow 28.46) released at head 0 does
**0.0** work. Give it a drop and it works.

**The release.** 30 s open: level 98.39, flow 16.03, head 27.3, **power 437.8**, peak
595.4. Release reads 1.0. **Life reads 1.0 — when flow is restored, the land fills with
life.**

**And it goes back.** 30 s shut: flow 0.0, life 0.0. *Nothing accumulated and nothing was
owed.*

**The cylinder.** Three shut gates: convergence 0.0, ring at its 6 m minimum. Three open,
50 s: convergence 1.0, ring 74 m. Three shut again, 60 s: **back to 6.0 m.**

**The deck.** Mid-edge it answers at the edge's own height, 20 m+ above the ground below.
Step off the side and it stops answering. The apex room floor is standable and ends where
the room ends. A deck over deep water is a floor — but only from at or above it, so
walking underneath does nothing.

**The range.** Stand on the line and the marks are in line; move off and they separate;
the bearing points at the centre (dot 0.98+).

**The guard.** With comments stripped, none of the four sources contains `FileAccess`,
`JSON`, `OverlayBridge`, `JavaScriptBridge`, `MARKS_LOG`, `signal`, `emit(`, `Light3D`, or
`emission_enabled`.

---

## 5 · TWO BUGS THE TEST CAUGHT, NAMED

**Two drivers is no driver.** `SpireDam` and `Spire` were each written with their own
`_process`. Driven by hand in a headless test there are no frames, so a gate that had been
opened passed no water for thirty simulated seconds and every release assertion failed.
Fixed by removing both: there is now one chain — the frame steps `Spires`, which steps each
`Spire`, which steps its own gate. **A headless test now drives exactly what a frame
drives**, which is the only reason the numbers above mean anything.

**A guard read its own warning label.** The first version scanned the whole source for
forbidden tokens and failed on `JSON`, `signal` and `Light3D` — all three appearing only in
the comments explaining that they are forbidden. Comments are stripped now. *A guard must
test the code.*

**And one lie the test told while passing.** `snappedf`'s second argument is a step, not a
count of decimals. `snappedf(x, 3)` rounds to the nearest multiple of three, so a release
of 0.998 printed as `0.0` and a life of 1.0 printed as `2.0` while the assertions beside
them passed on the raw values. The assertions were right and the table was lying. Fixed,
and re-run.

---

## 6 · THE EDGE OF WHAT WAS CHECKED

**Run:** `run_tests.py` 12/12, and `scenes/main.tscn` booted headless — all three spires
build in the real world with no errors, and no existing scene regressed after the
`player.gd` edits.

**NOT run:** the web export, and **nobody has looked at any of this.** Kevin's standing
mark of 08-05 is *export only when asked*, so it was not exported. Every claim above is a
claim about mechanism from a headless run. **Whether this is what he wanted is his to say
and is not claimed here.**

**Deliberately not decided:**

- **The spawn did not move.** `player.gd` carries `BEGIN_AT_APEX := false` with the reason
  in a comment. The room is built and standable; whether the apex opening *replaces* the
  ground spawn is collision C3 and it is unmarked. One line flips it.
- **The light half of the cylinder is not built.** The ring reads converging *water* only.
  There is no honest reading of "coherence of light" on disk, and inventing one would be
  the machine doing the recognizing.
- **NESI reshaping the lake into lenses, reflections, recognitions, membranes and
  workspaces** — caught 15:06, not built, not designed.
- **Grown / Given / Woven** on the three edges is still the unmarked graft.

**The sharpest guard in this build, stated so it can be checked later.** An expanding ring
is the closest thing this world has ever had to a progress bar. It passes on one test only
— **the freshet test**: its response would be identical for a thousand words of grief and a
thousand words of grocery lists, because it reads flow and has no access to anything else.
It is not a total, it does not accumulate, and it returns to its minimum the moment the
gates are shut. **If it ever reads a count, a history, or a mark, it has become a score.**

---

*Built, run and verified 2026-08-06. Not exported and not looked at. Nothing here says it
is what Kevin wanted.*
