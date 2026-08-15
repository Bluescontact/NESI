# THE PROGRESSION — entry to the reveal, twenty-four levels

**2026-08-14, Kevin's ask:** *"we have a total of 24 levels… and i want to map out
the progression from entry, to the final reveal of the cubedecohedron and nesi as
a 2 second flash with a nesi reveal, and final gifts. It doesnt end the game… and
the end can be replayed after changing anything prior."*

This is the map. It builds nothing. Where a name is his, it is quoted; where a
slot is unnamed, it is left unnamed and said so.

---

## 0 · WHY THERE ARE EXACTLY TWENTY-FOUR

His own line, 2026-08-13: **"Each edge is a game level."**

The cuboctahedron has **12 vertices and 24 edges.** So the count was never a
choice — it fell out of the solid the moment the edge became the level.

Computed from the twelve vertices at the permutations of (±1,±1,0), edges taken
at distance √2, central hexagons taken as the planes through the origin normal to
the (±1,±1,±1) family:

```
vertices ....................... 12
edges .......................... 24        ← the levels
central hexagons ................ 4        the four closed circuits
edges per hexagon ............... 6, 6, 6, 6
each edge lies on ............... exactly 1 hexagon      → 4 × 6 = 24, a clean partition
each vertex lies on ............. exactly 2 hexagons     → the doubt arrives twice
```

**The twelve named levels are not the twenty-four. They are the vertices — the
places.** A level is the *edge between two of them*: a transit, and its mechanic
is what those two places do to each other. THE_SHAPE_OF_THE_WHOLE.md:51 already
counted the other half of this — "twenty-four incidences, two apiece."

Which resolves the standing worry that a twelve-step ladder was being laid over a
shape three members wide. It was. **The shape's own unit is the edge, and there
are twenty-four of them arranged as four closed walks of six.**

---

## 1 · THE PROGRESSION

### Entry — the writing tetra, rung one

`daily.html` and level one's faces. A tetrahedron **discloses nothing about a
cuboctahedron** (THE_SHAPE_OF_THE_WHOLE.md:63), so the entry is already
concealment-safe and needs no change. The player writes. Water appears. Nothing
here suggests a solid.

### The four circuits — twenty-four levels, six at a time

Each hexagon is one complete water cycle: **three falling, then three rising,
contiguous.** Verified, no exceptions.

```
circuit 1   ↓DAM → ↓STATIONS → ↓DEEP → ↑HELIOSTAT → ↑OVERWINTERING → ↑CAST →
circuit 2   ↓DAM → ↓GROUND → ↓FILTER → ↑HELIOSTAT → ↑GARDEN → ↑SEATING →
circuit 3   ↓TANK → ↓GROUND → ↓STATIONS → ↑LENS → ↑GARDEN → ↑OVERWINTERING →
circuit 4   ↓TANK → ↓DEEP → ↓FILTER → ↑LENS → ↑CAST → ↑SEATING →
```

Six edges each. **Walk one and you have walked a whole world that closes.** The
player is not under-informed by a lie — they are under-informed by exactly one
dimension, which is the only honest way to hide a shape.

### The doubt — and it is not scripted

Every vertex sits on **exactly two** circuits. So the second circuit a player
walks necessarily returns them to a room they have already furnished, **from a
direction that should not exist.** No cutscene arranges this. The geometry does
it, twice, before it resolves.

### The reveal — the twenty-fourth edge

The last edge of the fourth circuit is the only edge that can be walked while all
twenty-three others are behind it. **The solid closes itself.** That is the
trigger: not a threshold, not a score, not a count reaching twelve — the last
member going in.

---

## 2 · THE REVEAL, AS HE ASKED FOR IT

Four beats, in his order.

### i · The flash — two seconds

The cuboctahedron, whole, for two seconds. First and only time the solid is seen
as a solid. Everything before it was a true cross-section; nothing has to be
retracted.

Under the laws that already hold: **no number appears** in it, and it says
nothing about the player. It is the shape they were walking, shown once.

### ii · NESI

Then NESI. What she is at that moment is **not named here** — the carriage seat
holds no voice of her own, and inventing her reveal would be exactly the kind of
naming that has to stay his. What the geometry can say: she is on the vertical
axis, where the lake sits, on the shared face of the two tetras. Everything
walked has been around her.

**This is a marker, not a build.** ▲

### iii · The gifts

Final, plural, and already half-defined by the corpus: *"the world now takes the
writing, keeps it whole, says nothing about it, asks nothing for it, and — later,
on a day you did not come back to check — hands one of them back to you
unlabelled, unranked, with no reason given"* (THE_GIFT.md:25). The cast is
already named "the gift at the gate" (THE_GIFT.md:101).

So the final gifts are **his own writing given back** — not unlocks, not
cosmetics, not rewards for completion. What form and how many is his to say.

**This is a marker, not a build.** ▲

### iv · It does not end

His words: *"It doesnt end the game… and the end can be replayed after changing
anything prior."*

Which is a hard engineering constraint, not a mood:

- **The reveal is derived, never flagged.** No `seen_the_end = true` anywhere. The
  condition is "all twenty-four edges stand walked", evaluated fresh. A stored
  flag would make the end a thing that has happened rather than a thing that is
  true, and the replay would be a replay of a recording.
- **Changing anything prior re-opens it, and re-walking closes it again.** Undo a
  merge, withdraw a sentence, unseat a lens — the solid is no longer closed, and
  the twenty-fourth edge is a live edge again.
- **Nothing is consumed by the reveal.** No gift is spent, no level is greyed, no
  door locks behind it.
- **It is not a wall.** The world after it is the world before it, plus having
  seen the shape.

---

## 3 · WHAT THIS MAP DOES NOT DO

- It **does not name the twenty-four levels.** The vertices are named; the edges
  are not, and twenty-four names is exactly the kind of invention that would be
  load-bearing and not his. An edge's mechanic is derivable from its two ends —
  ↓TANK—↓GROUND is what writing-becomes-water does to what-it-sets-down — but
  what each is *called* stays open.
- It **does not rank the circuits or fix a walking order.** Four circuits, no
  first among them; the solid permits many orders and enforces none.
- It **does not touch NESI's reveal or the gifts' form.** Both are marked.

---

## 4 · WHAT IS BUILT AND WHAT IS NOT

| | state |
|---|---|
| the twelve vertices | **built** — bodies for all twelve in `ascent.html`, all 17 door checks pass |
| the 24 edges as levels | **not built** — the file walks vertices, not edges |
| the four circuits as closed walks | **not built** — the geometry is verified, the walk is not |
| the two-second flash | **not built** |
| NESI's reveal | **marker** — his naming ▲ |
| the final gifts | **marker** — his naming ▲ |
| replay-after-change | **not built**, and it is a constraint on how the reveal is written, not a feature added after |

The next slice already agreed — the first four levels playable — is unaffected by
this map, and lands inside circuit 3 and circuit 4 at their falling ends.

---

## 5 · A LEVEL IS NOT A MECHANISM — Kevin's correction, 2026-08-14

Shown four walked runs, he said:

> **"those arent full levels. those are all 4 mechanisms inside the first level."**

He was right, and the map was the evidence: THE TANK, THE RAIN, THE DAM and THE
CHANNEL each had their own node, their own door and their own way out. **Four
doors is four levels.** They were never four levels.

### What a level is

**A level is a tetra with four faces.** You enter it once. Inside it you move
between its four faces without leaving — his own shape from the writing tetra:
*"one board seeds the next, and returning to the first doesn't undo anything."*
The level is complete when its four faces have been worked, and **only then** does
it hand you back to the map, and only then does anything beyond it open.

Escape steps out by one: from a face into the level, from the level to the map.
A face left early is unworked and re-enterable, and nothing is lost.

**LEVEL ONE is built this way** — four faces of one tetra, laid out as its net so
all four are in front of you at once, none gated against another. Worked faces
are filled with their edge doubled; the distinction is never colour alone.

### What this does to the count

| | |
|---|---|
| levels | 24 — the edges of the solid, unchanged |
| faces per level | 4 |
| faces in total | **96** |
| mechanisms that exist today | **12** |

**That gap is real.** Eight of the twelve mechanisms are still loose on the map,
standing as themselves rather than pretending to be levels. The circuit shows
nine runs today — one level and eight ungathered mechanisms.

**The grouping is an open question with at least three workable answers**, and
they are on the decision surface as options rather than as a wait:

1. **By circuit** — the solid already gives four closed walks of six, and each
   walk's members are a natural set.
2. **By what the water is doing** — intake, separation, deposit, return.
3. **By what the hand is doing** — the four gestures, one level per gesture.

LEVEL ONE is numbered rather than named on screen. A number is a lawful
permanent answer; whether it takes a name is also on that surface.
