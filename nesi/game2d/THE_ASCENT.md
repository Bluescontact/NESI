# THE DESCENT AND THE ASCENT — twelve levels, two directions

**WALKABLE.** All twelve played to completion from a cleared state, in the new
order, zero runtime errors. `nesi/game2d/ascent.html`, one file, no server
required, no network, no model call.

---

## Two directions, not one ladder

Kevin's correction, 2026-08-13, verbatim:

> the ascent is light and lens and heliostat...
> the descent is the water and filters and nesi

Which is the world's own physics as the governing brief already states it —
**"Light rises. Water and deposit fall. The heliostat shines up from the world
below"** — and the geometry ruled in `THE_FOUR_RULINGS_2026-08-07.md:44`:

> the two tetras meet face to face — one shared triangle. The interface IS that
> triangle: three sediment corners, three rivers inward, **the lake on the
> vertical axis**, the rim as its boundary.

So the map is two tetrahedra meeting face to face. Six seats fall through the
lower one; six rise through the upper one. The shared face is drawn edge-on as
the line across the middle, with the lake sitting on it.

**The turn is not a level.** You cross it by having reached the bottom.

### ↓ THE DESCENT — water · filters · NESI

| # | Level | The mechanic |
|---|---|---|
| 1 | THE TANK | writing becomes water — *"you type a hundred words, and you see the water flow into the dam"* |
| 2 | THE DAM | power comes at the release, never at the restriction |
| 3 | THE FILTER | separation by behaviour, run by your hand — never computed |
| 4 | THE STATIONS | three outputs, always — and the third does nothing, on purpose |
| 5 | THE GROUND | what it sets down *is* the ground; there is no other ground |
| 6 | THE DEEP | the line is yours; what you release comes back as ground |

### ↑ THE ASCENT — light · lens · heliostat

| # | Level | The mechanic |
|---|---|---|
| 7 | THE LENS | the hand works the material — *"250 word, and it gets worked by the user into a lens"* |
| 8 | THE HELIOSTAT | light rises from the world below |
| 9 | THE SEATING | the frame is fed, never filled |
| 10 | THE OVERWINTERING | time cannot be counterfeited |
| 11 | THE GARDEN | it fills only from play; it never says what it means |
| 12 | THE CAST | the only door out, by hand — the world loses what it gives |

---

## Where the three word-counts went

Kevin named three numbers. They are now attached to the three acts he named
them *for*, rather than to the first three rungs of a ladder:

- **100 → THE TANK.** *"you type a hundred words, and you see the water flow into the dam."*
- **250 → THE LENS.** *"250 word, and it gets worked by the user into a lens."*
- **500 → THE SEATING.** *"500 words, reduced to 2 lens."* One writing, halved by
  the hand into two lenses, which then seat themselves.

**THE DAM asks for no writing at all.** It is a hand act — hold, then let go —
and the whole of it is that the wheel turns only on the drop. Adding a writing
gate there would have been a word-count wearing a mechanic's coat.

**The ladder does not keep climbing.** Doubling to level twelve is 204,800
words, which is a volume gate, and volume gates are what this game refuses. After
the three he named, the escalating thing is the mechanic. *If the ladder was
meant to keep climbing, that is one constant and it is not defaulted here.*

---

## The walk — all twelve, from cleared state, through real input

```
↓1 TANK          3 sentences → drops → pooled behind the gate
↓2 DAM           head 1.00 WHILE HELD; wheel turned 8.4 ONLY after release; no writing asked
↓3 FILTER        6 caught by hand across three behaviours
↓4 STATIONS      spire 2 · lake 2 · set-down 2 — set-down produced nothing
↓5 GROUND        14 of his sentences fell and settled
↓6 DEEP (NESI)   3 lines dropped (one ran out — a deep) · 3 let go below the line
↑7 LENS          walked 3 faces, held 'e' 1 s each, read [t,t,t]; one lens
↑8 HELIOSTAT     aimed by hand until the beam crossed water; 3 shoots stood
↑9 SEATING       two lenses CAME TO REST at seats 8 and 4 — never aimed, never placed
↑10 OVERWINTERING returned same day → rooted 0. Correct, not a failure.
↑11 GARDEN       3 lenses standing; nothing prompts
↑12 CAST         pulled past resistance → it left
──────────────────────────────────────────────────────────────────────
ALL TWELVE       true · 0 runtime errors
```

**Level 9 is the one to check hardest.** *"The frame is fed, never filled — a
lens comes to rest where it belongs; the hand never aims at a socket."* The walk
never clicked a seat: the two lenses drifted under their own motion and settled
at 8 and 4. Where you release has nothing to do with where it lands. If a future
pass ever lets the hand aim at a socket, that law is broken.

**Level 10 rooted nothing**, because the walk returned the same day. That is the
mechanic working — *"a thousand releases in one afternoon root nothing."* It is
the only level that cannot be finished by playing harder.

## Kevin's store, untouched

```
kevins-water.json SHA256 : 928F860EF20FBF2E59CFEA9005393EC310BFC7C16AF678D41183B928A70D59BB (unchanged)
```

`tools/pour.js` opens it read-only. 19 of his stones stand on the faces in THE
LENS and fall as the ground in THE GROUND — verbatim, in the order they came.
**`nesi.html` is not touched**; its integrity gate stands.

---

## Run it

```bash
python -m http.server 8731 --directory "nesi/game2d"
```

`http://localhost:8731/`

WASD/arrows to walk · hold **E** to read, to hold the gate, to acknowledge ·
click to catch, route, sound and let go · drag to aim the mirror and to pull the
cast · **Ctrl+Enter** to commit writing · **Esc** back to the map.

Re-pour after writing more: `node tools/pour.js`
Walk it fresh: clear `localStorage` key `nesi.ascent`.

---

## THE JOIN — the twelve mirrors are the twelve seats

Built 2026-08-14 on Kevin's instruction: *"join the heliostat mirrors to the
twelve seats."*

**One index, two places.** Mirror `i` on the perimeter of the lake **is** seat
`i` on the equilibrium. There is no mapping table and no second registry:
`S.seated` holds seat indices, and every question about a mirror is answered by
asking whether its seat has been fed. A seated mirror's bearing is *derived* from
the geometry rather than stored, so it can never drift out of step with which
seats are actually fed.

**Which means the hand cannot pick a mirror to make permanent.** It feeds the
frame in THE SEATING, the lens comes to rest where it belongs, and the mirror
that lights is whichever one that seat happens to be. *The hand never aims at a
socket — from either end.*

**The direction the join runs.** Your hand aims the whole array at once, from
wherever you stand — *"the whole array from any single face."* That aim lasts
exactly as long as your hand is on it. Let go and the unseated mirrors fall
slack. **A mirror stays aimed when you are gone only if its seat above has been
fed a lens.** Held is lawful; permanence is earned by seating, never by holding
harder.

### The join, measured

```
1 · one index, two places
    no seats fed          → every mirror slack (aim: null)
    feed seats 3 and 7    → mirrors 3 and 7 aimed; 0 and 11 still slack
2 · earned in play, not set by hand
    before THE SEATING    → mirrors lit: 0
    after  THE SEATING    → mirrors lit: 2, at indices [5, 7]
    seats fed             → [5, 7]  — the SAME two. never clicked.
    lenses came to rest in 44 frames of their own drift
3 · permanence is earned by seating, not by holding
    hand on the array     → 12 mirrors throwing
    hand off              →  2 mirrors throwing (the seated ones)
    with NO hand at all   →  3 shoots grew under the seated mirrors
4 · the layered ascent draws at 0 / 4 / 8 / 12 without error
5 · twelve seated         → lake pixel (128,146,149) → (255,239,180):
                            all twelve beams converge and the surface reads as
                            light rather than as water
ALL TWELVE                → true · 0 runtime errors
```

**A real defect the walk caught.** The first physics gave each released lens
`vy = -1.4` against gravity `0.012`, which peaked about 50 px *short* of the seat
ring — so both lenses bounced between the floor and the same height forever and
THE SEATING could never complete. Found by reading the actual positions
(`{x:600, y:768}`, both of them, `rest: null`), not by guessing. Fixed by giving
the release enough rise to carry through the ring, plus a per-lens lateral drift
so the two do not travel the same line.

### The ending is built up to the line the law draws

*"The final unfold — all twelve mirrors seated, the equilibrium — makes the water
go glass-clear for the first time... and you see NESI whole. One time."*

**The clearing is built.** At twelve seated the lake goes clear and all twelve
beams converge on it. **What is seen through it is not built, deliberately.**
Law 9 — *"the deep never renders"* — carries three live readings recorded at
`MARKS_LOG.jsonl:1013` as **NOT DEFAULTED — his**. So the water clears and
nothing is drawn beneath it. Building the creature there would be a build session
resolving an open fork by furniture.

---

## What is not built, and is not faked

- **Levels 3–6 and 8–12 are one gesture each.** Each has a way in, an act, a
  consequence and a way out — none is a stub — but they are single gestures, not
  the full rooms the workshops eventually want.
- **Reaching twelve seats takes many sittings.** One writing seats two lenses, so
  the equilibrium is a long arc across returns, not a thing tonight closes. THE
  SEATING is re-enterable for exactly that reason.
- **Nothing here resolves an open fork.** The set-down's record, the presence
  seam, and law 9's three readings (all OPEN, all Kevin's) are untouched:
  set-down produces nothing, nothing moves that the hand did not move, and the
  deep renders nothing.

---

## THE 3D WINDOWS AND THE CLEAR CASE

Built 2026-08-14 on Kevin's mark: *"I'm imagining a 2d game with 3d windows,
objects, and spaces. developed headup displays that give the user a clear case
machine operating in full transparency."*

### The windows — the world stays flat and the solids are real

A window is an **aperture cut in the 2D surface** with an actual
three-dimensional object standing behind it: rotated, perspective-divided, and
depth-sorted so nearer struts overlay farther ones. Not a picture of a solid, and
not a 3D world you walk — a hole in the flat world with depth on the other side.

**The solids are the corpus's own, at true coordinates, never decorative:**

| solid | what it is | where it opens |
|---|---|---|
| `tetra` | the writing tetra, **vertex down**, *"you at the point"* | THE TANK |
| `twin` | two tetrahedra meeting face to face on one shared triangle | the map |
| `ve` | the vector equilibrium — the solid the game is contained in | THE SEATING |

**The VE is derived, not drawn from memory.** Twelve vertices at the
permutations of (±1,±1,0); the 24 edges are computed as every pair at distance
√2. Verified in the running game: 12 vertices, 24 edges, every vertex a
permutation of (±1,±1,0), all radii equal, **every vertex of degree 4** — which
is the cuboctahedron and nothing else.

**In THE SEATING the window lights the seats you have actually fed.** The flat
ring is those twelve seen from directly above; the window is the same twelve in
the round, with your fed seats lit on the real solid. One list, three places now.

**NOTHING TURNS ON ITS OWN.** A solid rotating by itself is a thing moving that
the player did not cause — precisely the **presence seam**, marked OPEN and
Kevin's. So a window turns under the pointer and is otherwise still. Measured:
**180 frames with no hand on it produced exactly zero yaw and zero pitch drift.**

### The case — it reports the machine, never you

`TAB` opens and closes it. What is on it:

```
hand      what input is live right now
store     nesi.ascent (this browser)
water     read-only
model     no call
network   no request
last      the last four things the machine actually did
```

**The distinction that makes this lawful.** Law 2 forbids a number that is a
**read of you** — a score, a count of your words, a streak. Which store the code
opened, and whether it read or wrote, is a fact about the *machine*. **No line on
the case reads `S.lenses`, `S.ground`, `S.done`, or any of your writing.**

**IT IS INSTRUMENTED, NOT ASSERTED — this is the whole point of a clear case.**
`localStorage.getItem/setItem`, `fetch` and `XMLHttpRequest.open` are wrapped, so
every line is a record of a call that actually happened. Proven both ways in the
running game:

```
a real getItem      → the case showed  read  nesi.ascent
a real save()       → the case showed  write nesi.ascent
a probe XHR opened  → the network counter went 0 → 1
                      (so "no request" cannot be true by claim — the wrapper fires)
after a full twelve-level playthrough:  network 0 · model 0
```

If the case ever reads *no request* while one is being made, the wrapper is
broken. The line cannot become true by claiming it.

### Verified

```
solids            tetra 4v/6e · twin 5v/9e · ve 12v/24e, all degree 4, all radii equal
perspective       a vertex behind centre projects at 0.75, in front at 1.50 — nearer is bigger
stillness         180 frames, no hand → yaw drift 0.000000, pitch drift 0.000000
the hand          drag inside the aperture turns it; outside it, the click still enters a level
the aperture      inside (142,154,162) vs the flat surface beside it (219,220,211)
TAB               case (45,49,50) → closed (168,173,166) → reopens byte-identical
regression        all twelve still play from cleared state · 0 runtime errors
first frame       no blank surface; the lowest is THE DEEP at 4 colours, which is
                  law 9 holding — water above the line, nothing drawn below
```

---

## The one thing next

Level 10 still roots nothing, because every walk so far came back the same day.
Open it tomorrow — that is the only test the build cannot run on its own.
