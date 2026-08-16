# THE CENTRE — the faces, the hinges, and the thing they serve

**Kevin's ruling, 2026-08-16:** *"the centre is the game. everything else serves it."*

**And the standing line under it, same day:** *"The geometry decides what works or
doesnt."*

---

## 0 · HOW THIS HOLDS, AND WHY IT IS WRITTEN TWICE

`THE_24.md` went stale while the build moved under it — it still says seventeen
mechanisms where there are twenty. A document alone does not hold in this tree.

So everything in this file is **derived in `solid.js` and checked in
`tools/solid_check.js`.** Twenty-two new assertions, all passing. No coordinates
are written down anywhere: the embedding is *solved* from the circuit table, so
if a circuit ever changes, the faces and the centre move with it or the solve
fails loudly.

**Read the prose here for what it means. Trust `solid_check.js` for what is
true.** Where the two ever disagree, the check is right and this file is stale.

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

- **The eight triangles are empty, and eight built mechanics have no home.**
  `membrane · spring · table · rain · channel · shoal · stilling · sounding`.
  The counts match. Nothing is sited, and siting them is his.
- **NESI's ten organs are unsited.** Second census, `ORGANS.json` has the
  first; the second is in the session record only.
- **The inner tetra, relocated by §6** — available as its own body, not as seats.
- **The ascent/jitterbug direction, §8.**
- **Law 8 against ↓THE DEEP's own line.** Named twice and still standing: "no
  offline progression" against "returns later as ground, on a day you did not
  come back." His frame of 2026-08-16 — that the deep is inhabited — is the
  first reading that does not require one of them to be wrong. Not resolved.
