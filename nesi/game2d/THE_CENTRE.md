# THE CENTRE — the faces, the hinges, and the thing they serve

**Kevin's ruling, 2026-08-16:** *"the centre is the game. everything else serves it."*

**And the standing line under it, same day:** *"The geometry decides what works or
doesnt."*

---

## 0 · HOW THIS HOLDS, AND WHY IT IS WRITTEN TWICE

`THE_24.md` went stale while the build moved under it — it still says seventeen
mechanisms where there are twenty. A document alone does not hold in this tree.

So everything in this file is **derived in `solid.js` and checked in
`tools/solid_check.js`** — one command, and it prints every assertion and its
verdict. *No count is written here on purpose:* a number in prose is the exact
thing that went stale in `THE_24.md`, and this file would rot the same way. Run
it and read the tally it prints. No
coordinates are written down anywhere: the embedding is *solved* from the circuit
table, so if a circuit ever changes, the faces and the centre move with it or the
solve fails loudly.

**One exception, and it is named where it appears:** the siting of the eight
mechanics on the eight triangles (§11) is a *reading*, not a derivation. Its form
is checked; its content cannot be. Everything else here is computed.

**Read the prose here for what it means. Trust `solid_check.js` for what is
true.** Where the two ever disagree, the check is right and this file is stale.

**THIS FILE IS WRITTEN IN A SPECIALIST REGISTER AND KEVIN SAID SO** — *"im
struggling to align with the domain specific language your using"*, 2026-08-16.
**`THE_CENTRE_IN_PLAIN_WORDS.md` says all of it again without jargon**, and
carries a table of which vocabulary is his and which was imported. Read that one
first. It is looser on purpose; this one is the precise version and the check is
the true one.

---

## 1 · THE CENTRE, MEASURED

```
distance to every seat        1.414214    one value, all twelve
edge length                   1.414214    the same number
members reaching it           0           it cannot be walked to
circuit planes containing it  4 of 4      every hexagon is a central hexagon
seats on all four circuits    0           a seat crosses two, never four
```

Three properties, and no other position in the world has any of them:

- **It is one edge-length from all twelve seats.** Fuller's radial equilibrium.
- **It is the only place on all four circuits at once.** Every seat is the
  crossing of exactly two. The centre is the crossing of four.
- **It is the only point that does not move in the jitterbug.**

The ruling is not a reading laid over the shape. It is the shape's arithmetic.
Everything Fuller singled out about this solid is a statement about its centre:
radial equilibrium is a claim about the centre, the four hexagons are hexagons
*through* the centre, and the transformation is motion *around* the centre.

**Nothing here names it.** The slot stays empty on his standing line, and the
geometry gives that a reason rather than a mystery: a thing that *is* the game
cannot also be a piece of the game.

---

## 2 · THE SERVICE ORDER

Derived, not assigned. Each row is on the row above it.

```
centre     on all four circuits              1
circuit    the only structure whose plane contains the centre    4
seat       on two circuits                  12
member     on exactly one                   24
```

**The circuits are the only apparatus that touches the centre directly.**
Everything else serves through one.

---

## 3 · THE CONSTRAINT — nothing can be sent inward

**No edge reaches the centre.** There is no member to send anything along.

This is a rule about what may be built, not a curiosity. **Any design in which a
seat delivers something to the centre is geometrically false** and should be
refused on sight. The circuits do not lead to the centre. They encircle it.
Whatever the centre receives, it receives by being surrounded.

---

## 4 · THE FULL ELEMENT CENSUS

> **■ THIS CENSUS STOPS AT THE SURFACE. Superseded 2026-08-16 by §13**, on his
> line *"there are volumes, edges, and points within the solid that have yet to
> be mapped."* Opening the interior roughly triples it. Read this as the skin
> and §13 as the body.

```
vertices  12   OCCUPIED    a seat — a hand acts at each
edges     24   OCCUPIED    the members, the levels
triangles  8   the braced faces
squares    6   the hinges
centre     1   the game
```

Euler holds: 12 − 24 + 14 = 2.

---

## 5 · THE SIX SQUARES — the hinges

```
z+   FILTER · STATIONS · GROUND · DEEP            all four fall
z−   OVERWINTERING · CAST · GARDEN · SEATING      all four rise
       between:  ↓TANK  ↓DAM  ↑HELIOSTAT  ↑LENS

x+   TANK · FILTER · HELIOSTAT · OVERWINTERING
x−   DAM · STATIONS · LENS · SEATING
       between:  GROUND · DEEP · CAST · GARDEN

y+   TANK · DAM · GROUND · CAST
y−   DEEP · HELIOSTAT · LENS · GARDEN
       between:  FILTER · STATIONS · OVERWINTERING · SEATING
```

**Nothing is sited in a square. A square is where the shape moves.** As a
strut-and-hinge frame the triangles are braced and the squares are not — the
solid flexes only here. Wikipedia's own wording: the skeleton *"does not have
structural rigidity… its vertices can be repositioned by folding."* That is the
whole of the jitterbug, and `THE_SIX_MANIFESTS.md` has promised the
transformation without ever saying where it happens. It happens in these six.

Four things hold of every square, and none of them were arranged:

- it carries all four circuits, one seat each
- it contains no antipodal pair
- every member borders exactly one square and exactly one triangle
- every seat sits on exactly two squares — vertex configuration 3.4.3.4

**One axis carries the world's own law, and only one.** `z+` is four falling
seats and nothing else; `z−` is four rising. The other two split 2/2 and 3/1.
Nobody assigned that; it fell out of the circuit table.

**And the four seats left over on that axis are the two pairs the corpus had
already singled out** — ↓TANK↔↑LENS and ↓DAM↔↑HELIOSTAT. `THE_24.md` reached
both independently: *"writing is the farthest thing from a worked lens"*, and
*"the world concentrates its turning and its returning on a single axis, and it
is the axis between light and what holds."* Two unrelated readings landing on
the same four seats.

---

## 6 · THE EIGHT TRIANGLES — two bodies, and they are OUTSIDE

```
A   TANK·FILTER·GROUND        DAM·CAST·SEATING
    STATIONS·DEEP·LENS        HELIOSTAT·OVERWINTERING·GARDEN

B   TANK·OVERWINTERING·CAST   DAM·STATIONS·GROUND
    FILTER·DEEP·HELIOSTAT     LENS·GARDEN·SEATING
```

No two triangles share a member; they meet only at seats. And **every seat sits
on exactly one A and one B** — the twelve are precisely where the two bodies
touch.

**A CORRECTION, KEPT RATHER THAN QUIETLY FIXED.** This session claimed for two
passes that these were two tetrahedra *inside* the solid. They are outside.
Checked: **no four seats form a regular tetrahedron** — all 495 combinations
tested, zero — and every vertex lies within all eight triangle planes. Four of
those planes bound a tetrahedron *around* the solid; the other four bound its
dual; their intersection is the octahedron. That is the stella octangula.

**What this does to the inner tetra** (his proposal, 2026-08-16: *"what if the
deep is it's own inner tetra. It coud hold 10"*): it does not kill it, it
relocates it. There is no tetra *made of seats*. A tetra placed inside as its
own body is untouched — the geometry neither supplies it nor forbids it, and the
4 + 6 = 10 count stands on its own. It simply cannot be built out of the twelve.

---

## 7 · RADIAL EQUILIBRIUM — why this solid and not another

The distance from the centre to a vertex equals the edge length. Wikipedia:
*"This radial equilateral symmetry is a property of only a few uniform
polytopes, including the two-dimensional hexagon, the three-dimensional
cuboctahedron, and the four-dimensional 24-cell and 8-cell."*

Fuller *"did not give any mathematics"* but stressed this above everything else
about the shape. It is the property that makes the centre a position rather than
a coordinate, and it is the reason his ruling has arithmetic under it.

---

## 8 · THE ASCENT AND THE JITTERBUG RUN OPPOSITE

The jitterbug goes **equilibrium → icosahedron → octahedron → tetrahedron.**

`THE_SIX_MANIFESTS.md` climbs the other way — *"axes-lit (one tetra) →
faces-lit (the star) → all twelve seated (the equilibrium)."*

**The equilibrium is the top of the ascent and the first frame of the collapse.**
Same point, two directions. What that means for the build is not settled here.

---

## 9 · WHAT THE RULING DEMOTES

Everything catalogued on 2026-08-16 — 24 player organs in `ORGANS.json`, 10 of
NESI's still unsited, 20 built mechanics, five complete levels — is **apparatus.
It is not the game.** That is a demotion of the whole day's work and it is
correct.

Each of them now has a test it did not have: *does it serve the centre, or does
it serve itself?* Applying that test is Kevin's, not this file's.

---

## 10 · WHAT IS OPEN, AND WHOSE IT IS

- ~~**The eight triangles are empty, and eight built mechanics have no home.**~~
  **SITED 2026-08-16 on his instruction, same day. See `FACES.json` and §11.**
  The assignment is a session's reading and not one row is marked.
- **NESI's ten organs are unsited.** Second census, `ORGANS.json` has the
  first; the second is in the session record only.
- **The inner tetra, relocated by §6** — available as its own body, not as seats.
- **The ascent/jitterbug direction, §8.**
- **Law 8 against ↓THE DEEP's own line.** Named twice and still standing: "no
  offline progression" against "returns later as ground, on a day you did not
  come back." His frame of 2026-08-16 — that the deep is inhabited — is the
  first reading that does not require one of them to be wrong. Not resolved.

---

## 11 · THE EIGHT FACES — sited 2026-08-16

**Kevin's instruction:** *"site the eight mechanics on the eight triangles."*

**The criterion is derived and exact.** Every one of the twelve seated mechanics
declares a `cost:` line beside its gesture. **Not one of the eight does.** A seat
is where the hand gives something up; these eight take nothing. That is why they
are faces, and `solid_check.js` re-tests it every run — add a cost to one of them
and it has become a seat, and its siting is void.

**Two facts the code gave up on the way:**

- **`cut` is written by no seat at all** — only `table` and `channel`, both
  `draw`. Carving the bed is a face-level act with no vertex, which is itself an
  argument that faces are a real class and not a filing convenience.
- **One triangle is silent.** LENS · GARDEN · SEATING write nothing into the
  water between them, so only a mechanic writing a single field can lawfully sit
  there — `shoal` or `sounding`, and no other.

```
A   TANK·FILTER·GROUND              membrane   strong
    DAM·CAST·SEATING                table      medium
    STATIONS·DEEP·LENS              spring     strong
    HELIOSTAT·OVERWINTERING·GARDEN  stilling   medium

B   TANK·OVERWINTERING·CAST         rain       strong
    DAM·STATIONS·GROUND             channel    medium
    FILTER·DEEP·HELIOSTAT           sounding   strong
    LENS·GARDEN·SEATING             shoal      WEAK
```

**HOW FAR THE GEOMETRY CARRIED, stated plainly because it did not carry far.**
Scored by shared water fields, the best total was 7 — **achieved by 1872 of the
40320 possible matchings.** The mechanical evidence does not pick one. The slots
are the solid's; the tenants are a session's reading. `sited_by` is `"session"`
on every row and not one is marked. Striking a row costs only that row.

`solid_check.js` therefore checks the FORM and never the assignment: real
mechanics, real triangles, one tenant each, four per tetrahedron, still costless,
and the silent triangle holding a single-field mechanic.

**Two things that were not arranged.** Every mechanic landed on a triangle
containing the seat it obviously belongs to, without that being a criterion. And
↓THE DEEP has exactly two triangles and there were exactly two homeless
mechanics that read the deep — `spring` took one and `sounding` the other.

**The weakest row is named as weak.** `shoal` on the silent triangle is taste.

---

## 12 · THE SCAFFOLD FOR THE CENTRE — built 2026-08-16

**Kevin's instruction:** *"take the parts that serve, and arrange them into the
scaffold for the centre."*

Nothing in open source scaffolds a centre. Every mesh and polyhedron library
models vertices, edges and faces; not one has a concept for a position that
participates in everything and is reachable by nothing. **So it is assembled
from three parts, each borrowed from a different instrument, and one of them is
a negative.**

**A HALF-EDGE MESH'S SILENCE.** That structure's whole vocabulary is boundary,
and it has no way to *name* an interior. Taken as the mechanism rather than as a
gap: the centre is **unaddressable, not merely un-addressed.** No method writes
it, and the object is frozen so one cannot be added at runtime. Same move as the
void return at ↓THE STATIONS — the law holds because there is nothing to write,
not because nobody has written it.

**RIGIDITY ANALYSIS'S GAUGE.** A framework's own motion is what remains once the
six trivial motions are subtracted, and they are subtracted by holding the
centroid fixed. **The centre is not a body in the system; it is what is held
still so the system's motion becomes measurable.** That is "everything else
serves it" as arithmetic rather than as a reading.

**THE JITTERBUG'S FIXED POINT.** The whole shape breathes and this does not move.

### What it does, and every line of it is checked

```
CENTRE.at(pos)            the centroid, DERIVED every call, never stored
CENTRE.relativeTo(s,pos)  a seat read in the frame — and the relation runs one
                          way only: a seat is read against the centre, never
                          the centre against a seat
CENTRE.holds(pos, eps)    the invariance test — hand it any displaced twelve
```

- at rest it is the origin
- it **holds when the shape breathes** — the fixed point
- it **follows a translation**, which is what makes it a gauge: move the whole
  world and a seat read in the frame is unchanged, so internal motion stays
  measurable
- frozen; no field can be added
- **no `receive`, no `to`, no `send`, no `set`, no `put`** — there is nothing to
  send to
- **no `name`, no `value`, no `content`** — the frame carries nothing. The slot
  stays empty because there is no field to fill, which is the standing line made
  structural rather than remembered.

### And the number nobody had

`RIGIDITY` computes the container's own motion from the rigidity matrix.
Wikipedia states only that the edge-framework *"does not have structural
rigidity"* and gives no count.

```
bars                24
rank                24
redundant            0    every member load-bearing, not one spare
rigid-body motions   6
INTERNAL MECHANISMS  6    — and there are six squares
```

### Confirmed by a second implementation

Kevin's instruction, same day: *"confirm the 6 with pyrigi."*

**[PyRigi](https://github.com/PyRigi/PyRigi) 1.3.0** — MIT, published in ACM
TOMS this year — was given this exact framework, the twelve seats and the
twenty-four members exported straight out of `solid.js`. A different
implementation, by a different method, on the same object:

```
rigidity matrix          24 x 36
rank                     24        agrees
redundant bars            0        agrees
trivial inf flexes        6        the rigid-body motions
NONTRIVIAL inf flexes     6        agrees — the mechanisms
is_inf_rigid()        False
```

The accounting closes: **nullity 12 = 6 rigid-body + 6 mechanisms.** Checked
explicitly, because PyRigi's `inf_flexes()` excludes the trivial ones by default
and a confirmation resting on a misread API is not a confirmation.

**The six is no longer this session's arithmetic alone.**

**And it depends on whether the faces are filled.** Wikipedia again: the solid
*is* rigid read as rigid faces on hinges, and is *not* rigid read as rigid edges
on free joints. Triangles are already braced as bar-frames, so tenanting the
eight (§11) cost no motion. **The six squares are the whole of the freedom, and
anything ever sited in one of them stops the container moving.** "Nothing goes
in the squares" is now a mechanical law and not a preference.

---

## 13 · THE INTERIOR — the 26 positions, mapped

**Kevin, 2026-08-16:** *"there are volumes, edges, and points within the solid
that have yet to be mapped, and assigned function."* → *"map the 26 positions."*

Opening the interior roughly triples the census. All of it is derived in
`solid.js` from the same embedding and checked in `tools/solid_check.js`.

```
points    13    the twelve seats + the centre          was 12
lines     36    24 members + 12 RADII                  was 24
faces     14    8 triangles + 6 squares                unchanged
volumes   14    8 tetrahedra + 6 half-octahedra        entirely new
```

### A CORRECTION TO §3, KEPT RATHER THAN SMOOTHED

§3 says no edge reaches the centre. **Twelve radii do.** What survives is the
precise form: **no MEMBER reaches it.** A member is a walk — it lies on a
circuit, it appears in a route, something travels it. A radius is none of those.
It can be measured and it cannot be travelled, and nothing in `PRODUCTS`,
`routes()` or `ADJ` will ever return one. Checked as a standing assertion.

### THE 12 RADII — and their function is derived, not assigned

Every radius is **exactly one edge long**. That equality is the entire reason
Fuller called this shape the *vector equilibrium*: the outward spokes and the
surrounding edges balance exactly. **So the radii are the holding, not channels.
The twelve hold the centre by standing exactly as far from it as they stand from
each other**, which is the mechanical form of the word you used.

They pair into **six straight lines through the centre** — a seat's radius and
its antipode's are collinear. So there are six diameters, not twelve spokes.

```
R·TANK    ─── R·LENS         R·DAM     ─── R·HELIOSTAT
R·FILTER  ─── R·SEATING      R·STATIONS─── R·OVERWINTERING
R·GROUND  ─── R·GARDEN       R·DEEP    ─── R·CAST
```

### THE 8 TETRAHEDRAL CELLS — 1 unit each · RIGID

Because the radius equals the edge, **every one is a perfectly regular
tetrahedron** — the minimum system. Each sits under a triangle, so each carries
the mechanic already sited on that face (§11).

```
T1  A  TANK · FILTER · GROUND                  membrane
T2  B  TANK · OVERWINTERING · CAST             rain
T3  B  DAM · STATIONS · GROUND                 channel
T4  A  DAM · CAST · SEATING                    table
T5  B  FILTER · DEEP · HELIOSTAT               sounding
T6  A  STATIONS · DEEP · LENS                  spring
T7  A  HELIOSTAT · OVERWINTERING · GARDEN      stilling
T8  B  LENS · GARDEN · SEATING                 shoal
```

### THE 6 PYRAMID CELLS — 2 units each · THESE DEFORM

Half-octahedra, under the hinges. **These are what change shape when the world
moves.**

```
P1  x+  TANK · FILTER · HELIOSTAT · OVERWINTERING
P2  x−  DAM · STATIONS · LENS · SEATING
P3  y+  TANK · DAM · GROUND · CAST
P4  y−  DEEP · HELIOSTAT · LENS · GARDEN
P5  z+  FILTER · STATIONS · GROUND · DEEP          ALL FALL
P6  z−  OVERWINTERING · CAST · GARDEN · SEATING    ALL RISE
```

`P5` and `P6` are the two ends of the world's only pure descent/ascent axis
(§12's out-and-return line). Everything that goes down goes through one;
everything that rises goes through the other.

### THE SPLIT THAT GOVERNS WHAT MAY BE BUILT

```
8 units    rigid, under the triangles     40%
12 units   deforming, under the squares   60%
────────
20 units   Fuller's number, and it came out of the circuit table
```

**Twelve of the twenty units are in motion; eight cannot be.** And the breathing
is total: at the equilibrium the volume is 20; collapsed to the octahedron it is
4 — a fifth — without one member changing length.

**My read, marked as a read and not derived:** the eight are what the world *is*,
the six are what it *does*. Anything permanent belongs in a tetrahedral cell.
Putting a thing in a pyramid cell would jam the hinge above it, the same way
siting in a square would.

### THIRTEEN AXES, THREE FAMILIES

One family per class of position, and the count matches the points.

```
3   through opposite SQUARES      the hinge axes
4   through opposite TRIANGLES    the tetrahedra axes
6   through opposite SEATS        the radii, paired
──
13  axes — and 13 points. The shape counts itself twice.
```

---

## 14 · WHAT THE SIX PYRAMID CELLS DO — the trades

**Kevin, 2026-08-16:** *"now assign function to the 6 pyramid cells."*

### First: whether the question is even well-posed

Six cells and six mechanisms could be a coincidence. **It is not.** For every one
of the six squares there is a **one-dimensional space of motion that folds that
square and leaves the other five rigid** — solved over the mechanism space with
PyRigi, and all six localise.

So each cell has its own movement, unique up to scale, available alone.

### Second: what the movement does

A square's four sides are members and cannot change. Its **two diagonals** are the
only free lengths in it. Folding therefore moves the diagonals — and in every one
of the six, **one diagonal closes exactly as the other opens.**

**So a pyramid cell is a TRADE.** One exchange the world can make and only that
one: two seats may be brought together, and the price is fixed in advance — the
other two are pushed apart by the same motion. There is no way to do half of it,
and no way to do it anywhere else.

```
x+    TANK ↔ HELIOSTAT          traded against    FILTER ↔ OVERWINTERING
x−    DAM ↔ LENS                traded against    STATIONS ↔ SEATING
y+    TANK ↔ DAM                traded against    GROUND ↔ CAST
y−    DEEP ↔ GARDEN             traded against    HELIOSTAT ↔ LENS
z+    FILTER ↔ STATIONS         traded against    GROUND ↔ DEEP      (all falling)
z−    OVERWINTERING ↔ SEATING   traded against    CAST ↔ GARDEN      (all rising)
```

**NOT A GENERAL LAW OF FOUR-BAR LINKAGES**, and this file nearly wrote it as one.
An isolated equilateral four-bar can change one diagonal while holding the other.
The trade is a fact about *these* squares *inside this solid*, where the rest of
the frame constrains them, and it was **measured, not deduced.**

### And it completes the classification of seat relations

Every pair of the twelve is exactly one of three things, and the count closes:

```
distance 1    24 pairs    A MEMBER — a level, something you walk
distance 2    36 pairs    of which 12 share a square face — THE TRADES
distance 3     6 pairs    the antipodes, never adjacent
              ────────
              66 pairs    = every pair of twelve
```

A diagonal is never a member and never an antipodal pair. **The trades are
relations that are not walks** — the world can change them without anyone
travelling anything, which is the same class of act as the radii holding the
centre.

### The three axes are graded, and nobody arranged that

```
z    4↓0↑  and  0↓4↑      pure — the only axis where a face is all one direction
y    3↓1↑  and  1↓3↑      mostly
x    2↓2↑  and  2↓2↑      balanced
```

The trade on `z+` happens entirely within the descent; the trade on `z−`
entirely within the ascent. The `x` trades each cross between them.

---

## 15 · WHAT THE EIGHT TETRAHEDRAL CELLS DO — and a correction first

**Kevin, 2026-08-16:** *"now assign function to the 8 tetrahedral cells."*

### THE CORRECTION, because the answer depends on it

§13 said the eight are **rigid** and that twelve of the twenty units move while
eight cannot. **Both were wrong.** A cell's three lateral edges are *radii*, and
radii are not members — they change length when the container moves. Measured
with PyRigi: **under five of the six mechanisms a tetrahedral cell's volume
changes.** Every cell in this solid changes volume. Nothing is rigid in that
sense.

**And the check written to confirm it was circular.** It defined rigid as
`under === "triangle"`, so it asserted a tautology and passed while measuring
nothing. That is a worse fault than the wrong claim, and it is the one to watch
for: a check that restates its own premise will hold forever and tell you
nothing. Replaced with three that measure.

### WHAT IS ACTUALLY TRUE, and it is narrower and more useful

```
a triangular face   three sides, all MEMBERS      cannot change SHAPE
a square face       four sides, all members       CAN — its diagonals are free
                    but two diagonals free
```

**The difference is shape, not volume. The triangle keeps its shape and loses its
volume. The square loses both.**

### THE FUNCTION

**A tetrahedral cell is the volume between two invariants.** Its outer bound is a
face that cannot change shape; its inner bound is the centre, which cannot move.
Both ends are fixed in their own way, and only the distance between them varies.
Nothing else in the container is bounded like that — a pyramid cell has neither.

**And they are what the trades happen against.** The interior is a
**checkerboard**: all 24 internal faces separate a tetrahedral cell from a
pyramid cell, and **no two of a kind ever touch.**

```
every pyramid cell   walled on all four sides by tetrahedral cells
every tetra cell     abuts exactly three pyramid cells
                     24 internal faces, one per member, each a tetra/pyramid wall
```

So the six exchanges of §14 do not happen in open space. **Each is bounded on
all four sides by faces that cannot deform.** The eight are what make a trade
*definite* rather than a general collapse — they are the reference the exchanges
are measured against.

**Which is the centre's relation to the twelve, one level down.** The centre
holds while the shape moves; the eight hold their shape while the six change
theirs. The same structure, recursed.

### AND EVERY TRADE IS BRACED BY BOTH BODIES

The eight split 4+4 into the two tetrahedra (§6). Checked: **every one of the six
pyramid cells is walled by exactly two cells of body A and two of body B.**

No trade is braced by one body alone. Whatever the two bodies are, every
exchange in the world is held between them equally — and that was not arranged.
