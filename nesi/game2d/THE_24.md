# THE TWENTY-FOUR — a draft, derived from the twelve and the circuits

> ## ■ CORRECTED 2026-08-14, THE WORK SURFACES PASS
>
> **The arithmetic below is right and its subject is wrong.** These 24 edges were
> walked out of the four circuits *as the corpus writes their cyclic order*, and
> that graph is **not a cuboctahedron**: it carries 4 triangles where the solid
> carries 8. Two graphs, 12 vertices and 24 edges and 4-regular apiece, not the
> same shape.
>
> **What survives:** twelve places · twenty-four transits · four closed walks of
> six that partition them · each place on exactly two walks · six pairs sharing
> both walks. All still true of the graph the circuits write.
>
> **What does not survive:** that these are the solid's edges, and therefore
> every specific pair — the turns, the returns, the antipodal table, and the
> tank-to-lens distance.
>
> **And it cannot be fixed by re-ordering.** The edge set is not determined by
> anything written down: 192 placements satisfy the sets, the
> three-falling-three-rising property, and circuit 1 exactly as written, and they
> disagree about which pairs are members. See `THE_WORK_SURFACES.md` §0. **One
> written adjacency cuts it.**
>
> **PINNED 2026-08-14** on Kevin's line *"↓TANK and ↓FILTER are joined"*, which
> cut 192 to three, and the counsel brief's own census, which cut three to one.
> **The placement is `THE_SOLID.md`** — a real cuboctahedron, 8 triangles. The
> edges below are superseded by the twenty-four there; the accomplishment lines
> stand and can be re-cut against the true pairs.
>
> Left standing rather than deleted, per the supersession convention.

> ## ■ RESOLVED — the same day, by enumeration. The re-ordering exists and it is unique.
>
> **The block above is right about the defect and wrong about the remedy.** It
> found 4 triangles where the solid carries 8 — that is real, and it is exactly
> the signature of this file's original circuit four. It then concluded *"it
> cannot be fixed by re-ordering"* and asked for a written adjacency from outside.
> None is needed. Holding circuits one, two and three exactly as the corpus writes
> them, every possible circuit four was enumerated:
>
> ```
> distinct circuit-four cycles giving a 4-regular graph .......... 60
>   of which embed as the cuboctahedron ........................... 1
>   that one: ↓DEEP–↓FILTER–↓TANK–↑CAST–↑SEATING–↑LENS  ·  8 triangles
>   the version this file had: ↓TANK–↓DEEP–↓FILTER–↑LENS–↑CAST–↑SEATING  ·  4
> triangle counts across all 60 candidates: 2, 3, 4, 5, 6, 8 — and only 8 embeds
> ```
>
> **One candidate in sixty.** The solid is not underdetermined by what is written
> down; it is pinned by it, once the test applied is *does this embed as the
> cuboctahedron* rather than *does this satisfy the sets and the falling/rising
> signature*. The 192 placements counted in `THE_WORK_SURFACES.md` §0 are the
> weaker test's answer — they disagree with each other because that test cannot
> tell a great circle from any other hexagon through the same six seats.
>
> **So what does not survive the block above's own list — the turns, the returns,
> the antipodal table — survives after all**, and is corrected and re-verified in
> the section immediately below. The antipodal table was never wrong: all six
> pairs hold in the embedding. Nothing outside the corpus was consulted to get
> here, and no adjacency was chosen by hand.


**Kevin's ask, 2026-08-14:** *"draft the 24 level list from the twelve and the
circuits."*

**The pairings are derived; the sentences about them are mine.** The twelve
vertices and the four circuits were already written down, and the twenty-four
edges fall out of them by computation — that part cannot be wrong without the
circuits being wrong. What each level *accomplishes* is one line I wrote from
what its two ends do to each other, and every one of those is a cut you can make.

---

## ■ CORRECTION — 2026-08-14, circuit four was mis-transcribed

**The circuits being wrong is exactly what happened.** Kevin's build prompt of
the same day carried a different circuit four. The two were tested against real
coordinates rather than argued about, and this file's version does not exist:

```
BUILD PROMPT   ↓DEEP–↓FILTER–↓TANK–↑CAST–↑SEATING–↑LENS   embeds as a great circle: True
THIS FILE was  ↓TANK–↓DEEP–↓FILTER–↑LENS–↑CAST–↑SEATING   embeds as a great circle: False
```

**The superseded line is kept here and nowhere else.** Circuits one, two and
three were right and are untouched; the six vertices of circuit four were right;
**four of its six edges were not.** What this file had — `↓TANK—↓DEEP`,
`↓FILTER—↑LENS`, `↑LENS—↑CAST`, `↑SEATING—↓TANK` — are not edges of the solid.
The four that replace them are `↓FILTER—↓TANK`, `↓TANK—↑CAST`, `↑SEATING—↑LENS`,
`↑LENS—↓DEEP`.

**Why the file's own checks did not catch it.** The wrong cycle passed every test
written in §0: it visits the same six vertices, it puts each antipodal pair
opposite, and it runs three falling then three rising contiguously. Two distinct
6-cycles satisfy all three. Only an embedding test separates them — the six
vertices of a circuit form an octahedron graph, which carries several
Hamiltonian cycles, and just one of them is the great circle.

**What this changed downstream, and is fixed below:** levels 19–24, the turn on
circuit four (was 21 `↓FILTER—↑LENS`, is 21 `↓TANK—↑CAST`), the return (was 24
`↑SEATING—↓TANK`, is 24 `↑LENS—↓DEEP`), and both readings in §2. **What it did
not change:** the twelve vertices, circuits one–three, the six antipodal pairs,
and the uniform edge signature — all re-verified after the correction.

**One §0 claim is withdrawn outright.** "↓TANK is three steps from ↑LENS, and
everything else in the world is two or fewer" was false before the correction and
is false after it. The solid is vertex-transitive: **all six antipodal pairs sit
at distance 3**, and no pair is farther from itself than any other. Writing is not
measurably farther from a worked lens than the dam is from the heliostat — that
sentence read a symmetry as a discovery.

---

## 0 · WHAT WAS COMPUTED FIRST, SO THE LIST IS NOT A GUESS

```
edges walked out of the four circuits ....... 24, all distinct
degree of every vertex ...................... 4  (a cuboctahedron is 4-regular)
each vertex lies on ......................... exactly 2 circuits
antipodal pairs (same two circuits) .......... 6, none adjacent, ALL at distance 3
edge signature of every circuit ............. dd dd du uu uu ud — identical, all four
faces ....................................... 14 — 8 triangular, 6 square
planes cutting 3+ seats ..................... 81 — 56 cut three, 21 cut four,
                                                  4 cut six, and those four ARE
                                                  the circuits
```

Re-verified after the correction above, from coordinates, not from this table.
The plane census carries its own identity: Σ planes × C(seats,3) = 220 = C(12,3),
which holds exactly.

Two things fell out that were not designed:

**The edge signature is uniform.** "Three falling, three rising" is true of the
*vertices*. The *edges* of every circuit go **two falling · the turn · two rising
· the return.** All four circuits, no exceptions. So each circuit has exactly one
level that turns the world over and exactly one that closes it.

**Six antipodal pairs, none adjacent:**

| | |
|---|---|
| ↓TANK ↔ ↑LENS | writing becomes water ↔ the hand works the material |
| ↓DAM ↔ ↑HELIOSTAT | power at the release ↔ light rises from below |
| ↓FILTER ↔ ↑SEATING | separation by hand ↔ the frame is fed, never filled |
| ↓STATIONS ↔ ↑OVERWINTERING | three outputs always ↔ time cannot be counterfeited |
| ↓GROUND ↔ ↑GARDEN | what it sets down is the ground ↔ fills only from play |
| ↓DEEP ↔ ↑CAST | what you release comes back ↔ the world loses what it gives |

You can never walk from one of a pair to its opposite in one level, and each pair
reads as a real opposition. ~~One of them is measurably extreme — ↓TANK is three
steps from ↑LENS and everything else is two or fewer.~~ **Withdrawn, see the
correction above:** every antipodal pair sits at exactly three steps. The solid
gives no pair a longer walk than any other, and every seat sees an identical
world.

**Two seats carry neither a turn nor a return: ↓GROUND and ↑GARDEN.** Ground's
four members all fall; garden's four all rise. They are the only two like that,
and they are each other's antipode — the pure seats, the one pair the world never
asks to change direction.

---

## 1 · THE TWENTY-FOUR

Each is named by its two ends, not by a name I made up. `↓` falls, `↑` rises.

### CIRCUIT ONE — the release, the depth, and the departure

| # | level | what it accomplishes |
|---|---|---|
| 1 | ↓DAM — ↓STATIONS | What was held is let go, and the letting-go immediately has to be routed. Power arrives already needing a destination. |
| 2 | ↓STATIONS — ↓DEEP | What you sent on keeps falling. The third output — set down, no feedback — is the one that never arrives here, and its absence is the lesson. |
| 3 | ↓DEEP — ↑HELIOSTAT | **THE TURN.** What sank is what the light rises from. The bottom is the source. |
| 4 | ↑HELIOSTAT — ↑OVERWINTERING | Light needs returns to strengthen. What rises is limited by how many days actually happened. |
| 5 | ↑OVERWINTERING — ↑CAST | Only what has actually wintered is worth giving. Time is the thing that makes a gift a gift. |
| 6 | ↑CAST — ↓DAM | **THE RETURN.** Giving empties the head, and the world must be filled again before it can release again. |

### CIRCUIT TWO — the release, the separation, and the frame

| # | level | what it accomplishes |
|---|---|---|
| 7 | ↓DAM — ↓GROUND | The release sets things down. What power moves, it deposits — nothing is spent without leaving a bed. |
| 8 | ↓GROUND — ↓FILTER | You cannot sort what has not yet settled. The ground is what makes separation possible. |
| 9 | ↓FILTER — ↑HELIOSTAT | **THE TURN.** Clarity is what lets light through. What your hand took out of suspension is what the world can now see by. |
| 10 | ↑HELIOSTAT — ↑GARDEN | Light lands and something grows, and nothing you do makes it grow faster. |
| 11 | ↑GARDEN — ↑SEATING | What grew unprompted is what feeds the frame. A seat is fed by growth, never filled by effort. |
| 12 | ↑SEATING — ↓DAM | **THE RETURN.** A fed frame changes what may be held. The structure decides the next head. |

### CIRCUIT THREE — the intake, the deposit, and the lens

| # | level | what it accomplishes |
|---|---|---|
| 13 | ↓TANK — ↓GROUND | Writing becomes water and water sets something down. The first proof that words become terrain. |
| 14 | ↓GROUND — ↓STATIONS | What has settled can be routed. You cannot send on what has not landed. |
| 15 | ↓STATIONS — ↑LENS | **THE TURN.** What you chose to send on is the material your hand works into a lens. Routing was already a first cut. |
| 16 | ↑LENS — ↑GARDEN | A lens worked by hand is a thing that can be planted. Working material is the same act as sowing it. |
| 17 | ↑GARDEN — ↑OVERWINTERING | What grew has to survive absence. A garden is only real across a night you were not there for. |
| 18 | ↑OVERWINTERING — ↓TANK | **THE RETURN.** The morning after a winter is a new intake. Time empties the tank, and writing fills it again. |

### CIRCUIT FOUR — the intake, the depth, and the departure

| # | level | what it accomplishes |
|---|---|---|
| 19 | ↓DEEP — ↓FILTER | What came back from the deep is what there is to sort. You separate what returned, not what you sent. |
| 20 | ↓FILTER — ↓TANK | Separation runs back into intake. What your hand pulled out of suspension is what the page holds next — and this is the withdrawal route: a deleted sentence leaves the line by way of the filter, and the bank keeps it. |
| 21 | ↓TANK — ↑CAST | **THE TURN.** Writing departs directly. One member from intake to the world, where the long way round is eleven — the door out, and the shortest crossing the solid contains. |
| 22 | ↑CAST — ↑SEATING | What departed leaves a seat behind it. Giving is what makes room in the frame. |
| 23 | ↑SEATING — ↑LENS | A frame with a filled seat is what a hand has to work with. The seating is what the lens is ground against. |
| 24 | ↑LENS — ↓DEEP | **THE RETURN.** The worked lens falls to the bottom. What you shaped is what sinks, and circuit one is waiting there to raise it as light. |

---

## 2 · THE FOUR TURNS AND THE FOUR RETURNS

The uniform signature means the world has exactly four of each, and they are the
levels that carry the whole shape:

**The turns — 3 · 9 · 15 · 21.** ↓DEEP—↑HELIOSTAT · ↓FILTER—↑HELIOSTAT ·
↓STATIONS—↑LENS · ↓TANK—↑CAST. **Two of the four pass through ↑HELIOSTAT**, which
makes light the turn on half the circuits.

**The returns — 6 · 12 · 18 · 24.** ↑CAST—↓DAM · ↑SEATING—↓DAM ·
↑OVERWINTERING—↓TANK · ↑LENS—↓DEEP. **Two of the four land on ↓DAM.**

Together these eight are every mixed edge the solid has — 8 of 24, counted, with
the other sixteen running falling-to-falling or rising-to-rising. And the two
seats that take a doubled share are **↑HELIOSTAT and ↓DAM**, which are *each
other's antipode* and sit on the same two circuits, one and two. The world
concentrates its turning and its returning on a single axis, and it is the axis
between light and what holds.

~~4 of 4 land on the tank or the dam.~~ **Withdrawn with the correction above** —
the returns land 2 on ↓DAM, 1 on ↓TANK, 1 on ↓DEEP.

---

## 3 · WHAT THIS DRAFT DOES NOT COVER, COUNTED

**Five mechanisms in `ascent.html` are not vertices of the solid:** RAIN, CHANNEL,
SHOAL, SOUNDING, STILLING. The file has 17 bodies; the solid has 12 places. Those
five are built, walked and have nowhere on this map.

**Two models of a level are both live and they are not the same:** a level as an
EDGE (24 of them, this list) and a level as a TETRA OF FOUR FACES (which is what
LEVEL ONE is built as). Held together they give 24 × 4 = **96 faces**, and 17
mechanisms exist. This draft says nothing about the other 79.

Both of those are real and neither is settled by this list.

---

## 4 · HOW TO CUT IT

Nothing here needs to be accepted whole. The cuts that would change the most:

- **A turn or a return that reads wrong.** Those eight carry the shape; if one is
  wrong the circuit it sits on is wrong.
- **The antipodal pairs.** They were derived, not chosen, so if a pair reads as
  false the circuits themselves are mis-transcribed.
- **Any single accomplishment line.** Those are mine, written from the two ends.
  The pairing is derived; the sentence about it is not.
