# THE RIM — how it is routed

**Kevin's mark, 2026-08-07, answering d1:**

> *"THE RIM IS ROUTED ALONG GROUND, not a straight chord. A rim edge is a line you can see the two waters meet along, so it follows the surface. State how it is routed before anything builds it."*
> *"The rim edge is a line between two vertexes so it follows the surface."*

**And, same message:**

> *"the whole world is contained in a dual tetra."*
> *"Later we will build a merge mechanic that uses either the rim, or a face as membrane to process the recombination of two tetra worlds. we arent there yet."*

**This file states the routing. It builds nothing.**

---

# THE RULE, IN ONE SENTENCE

> **A rim edge is the shortest path over walkable ground from one corner to the next. Nothing chooses it. The terrain does.**

That is the same discipline the world already runs on and it is not a new idea here:

| existing | its rule |
|---|---|
| **the corners** | not placed — walked outward to the nearest ground with standing room (`Tetra._settle`) |
| **the river** | *"water does not choose a route"* — steepest descent from the source (`river.gd`) |
| **the deposit** | not arranged — terrain plus fall, and material finds its level |
| **the rim** | **not drawn — the shortest way across ground between two corners** |

**Why this and not something prettier:** any other rule needs an author, and whatever authors the route is choosing where the boundary between Kevin's own waters lies. **A shortest path has no author.** It is a fact about the ground, recomputed from the ground, and it moves when the ground moves.

---

# THE ROUTING, STATED PRECISELY ENOUGH TO BUILD

## 1 · The endpoints are the corners, unchanged

`Tetra.corner(i)` for i in 0,1,2. **The rim does not re-settle them and does not move them.** Corner 0 is where THE GROWN SPIRE lands, 1 THE GIVEN, 2 THE WOVEN.

## 2 · Walkable is already defined and is not redefined here

`Terrain.is_walkable(x, z)` — inside the world bounds, and `height(x, z) > DEEP_LIMIT` (−3.0). **The rim uses that test and nothing else.** No new notion of passable is introduced.

## 3 · The path is the shortest walkable one

Search the surface between the two corners for the shortest connected route across cells that pass `is_walkable`. Straight if straight is walkable; otherwise it bends exactly as much as it must and no more.

**Two consequences that fall out without being added:**

- **Where the straight chord crosses water, the rim goes around it — the shortest way around.** It does not tunnel, does not bridge, and does not float. *A boundary between two grounds cannot cross something that is not ground.*
- **Only where the chord is already walkable does the rim run straight.** Two of the three do today; one does not.

## 4 · It is derived every time, never stored as points

**The rim is recomputed from the terrain, exactly as the corners are.** No authored polyline goes on disk. If the terrain changes, the rim changes with it, and nobody has to remember to update anything.

## 5 · Fail closed — if there is no walkable path, there is no rim edge

If the two corners are not connected across walkable ground, **the rim edge is not drawn and the world says so on stdout.** It does not invent a crossing to complete the triangle. *An impossible rim should look impossible, the same way an undeclared pattern should look undeclared.*

---

# WHAT THIS ROUTING DOES TO THE THREE EDGES, AS THE WORLD STANDS TONIGHT

Corners settle at **(0, 80)**, **(−69.28, −40)**, **(69.28, −40)**. The lake is centred **(−58, 8)** with radius **46**, floor at −9.5, and `DEEP_LIMIT` is −3.0.

| edge | straight chord | under this routing |
|---|---|---|
| **w1 · GROWN–GIVEN** | passes **14.2 m** from the lake centre — about **87 m** of it over open water | **bends around the lake.** The longest of the three, and the only one whose shape is not a straight line. |
| **w2 · GROWN–WOVEN** | clears the bowl by **86 m** | **straight**, subject to local terrain. |
| **w3 · GIVEN–WOVEN** | clears the bowl by **2 m** | **straight today, and only just.** Two metres of margin means a re-settle of either corner could push it into water and change its shape. |

**The thing worth seeing:** the boundary between what you built and what was given to you **goes around the lake.** Not by design — because the lake is there and the rule is the shortest way over ground. *The rim edge that has to travel furthest is the one between the water that is full and the water that is dry.*

---

# WHAT IS NOT DECIDED HERE, AND IS NOT DEFAULTED

**a · Width.** A line between two vertices has no width. Whether the rim is a zero-width boundary, a band a few metres across, or simply the place where two deposits abut with nothing drawn at all — **not stated in the mark, not chosen here.**

**b · Whether the rim renders before there is deposit on both sides.** Your own reading is that the line is *"the only place in the world you can see the difference between them."* **With no deposit there is no difference to see.** Two of the three waters are dry. Drawing a rim edge across bare rock would be drawing a boundary between nothing and nothing.

**c · Whether the three edges close into a circuit.** Three routed paths meeting at three corners would form a loop around the world — the boundary of the interface, per R3. **Nothing says they must join cleanly**, and two bent paths meeting at a corner is not automatically a closed ring.

**d · What a rim edge does when you stand on it.** Nothing in any mark gives it an act. It may be purely a thing you can see.

---

# WHAT THE OTHER TWO MARKS SETTLE, AND WHAT THEY POSTPONE

**THE WHOLE WORLD IS CONTAINED IN A DUAL TETRA.** Confirms R3's face-to-face reading as the container of everything — one solid, two tetras, the shared triangle between them.

**THE MERGE IS DEFERRED, AND BOTH CANDIDATES SURVIVE.** *"Either the rim, or a face as membrane"* — **you did not pick, and this file does not.** Under d2 the rim keeps one job for now: the boundary between two of your own waters. When the merge is built, whichever carrier it uses, **it inherits a rim that is already a routed path over ground rather than an idealised straight line** — which is a different object to hand a merge mechanic, and worth knowing now rather than discovering then.

---

# THE ONE THING TO WATCH

**A shortest-path route is deterministic but it is not stable.** Move a corner two metres and a path that was straight can become a path that bends 60 m around a lake. w3 has two metres of margin. **If the rim is going to be a thing you recognise, its shape has to be robust to the world settling — and nothing in this routing guarantees that.**

Not a reason to route it differently. A reason to know it before it surprises you.

---

*Stated 2026-08-07, session 2a8040ba, on Kevin's mark. Nothing was built. No rim geometry exists in code, and this file does not add any.*
