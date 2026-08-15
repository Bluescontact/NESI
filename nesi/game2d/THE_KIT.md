# THE KIT — what every stage uses, measured

**2026-08-14, Kevin's ask:** *"lets work from the skeleton down. What elements
and assets, and mechanisms are useful across every stage."*

Nothing here is proposed. Every figure below is counted out of `ascent.html` and
`daily.html` as they stand, and every gap is a gap the count found.

---

## 0 · THE SHAPE OF WHAT IS ALREADY THERE

```
the shared chassis .......... 726 code lines
all seventeen level bodies .. 532 code lines
average level body ..........  31 lines
```

**The kit is already bigger than everything built on it,** and a stage costs
about thirty lines. That is the answer to "work from the skeleton down" in its
strongest form: the skeleton exists, it carries most of the weight already, and
the honest work is naming it, closing three gaps in it, and then a stage is
thirty lines rather than a project.

---

## 1 · USED BY EVERY STAGE, WITHOUT EXCEPTION — 17/17

| | what it is |
|---|---|
| `finish()` | **the way out.** One function. It now knows whether you are in a face of a level (→ back to the level) or a run on the circuit (→ back to the map). Every stage ends through it and no stage decides its own exit. |
| `save()` | **the record.** pad → read back → commit, in both files. A bad write never destroys a good one. |

These two are the whole contract a stage signs. Nothing else is mandatory.

---

## 2 · THE COUPLING — one water, and the trace it leaves

| | count | what it is |
|---|---|---|
| `W_()` | 13/17 | **THE ONE WATER.** Every stage reads it on entry and writes it on the act. No stage holds a private copy — which is why "each level affects all other levels" is not a rule the code obeys but the fact that *there is nothing else to act on*. |
| `reading(edge, what)` | 12/17 | **the trace.** What a stage leaves behind for the ascent to work with. Three distinct traces seed one lens. |
| `clamp01()` | 10/17 | every field of the water is 0–1, so nothing can run away and nothing needs a cap. |

The water's fields are the real vocabulary: `level · load · clarity · held ·
released · still · cut · readings`. **A new stage is mostly a choice of which of
those it reads and which it moves.**

---

## 3 · THE STAGE ITSELF — the room primitives

| | count |
|---|---|
| `sky()` | 12/17 |
| `ground(y)` | 9/17 |
| `ring(x,y,r)` · `dot(x,y)` | 7 · 2 |
| `window3d()` / `windowDrag()` — the 3D windows | 3/17 |
| `facesOf()` / `inTri()` — **the level container**, built 2026-08-14 | the level, not the face |

`sky` + `ground` are the whole set dressing. Together they are eleven lines and
they are what makes every room read as the same world.

**`facesOf()` is the new one and it is the one that scales:** it lays a level's
four faces out as the tetra's net, hit-tests them, and draws worked/unworked
without colour carrying it. It is written against `LEVEL1` today and is the
piece every one of the twenty-four levels will use unchanged.

---

## 4 · THE HAND — and this is the first real gap

Four gestures exist in the build. **None of them has a shared verb.** Each stage
hand-rolls its own.

| gesture | where it is | how it is written today |
|---|---|---|
| **the reach** — a hand on a thing, and that thing answers | tank · filter · stations · sounding · deep · seating · cast | `mouse.clicked` + a hand-rolled `Math.hypot` distance test, per stage |
| **the hold** — gather, then let go, and the letting-go is the act | dam · heliostat · rain | `mouse.down` and/or `keys["e"]` |
| **the draw** — a course dragged across a surface that persists | channel · shoal · cast | `mouse.down` + a point list |
| **the wait** — the stage where doing nothing is the mechanic | stilling · winter | a timer against `quiet` |

`mouse.clicked` 7/17 · `mouse.down` 7/17 · `keys[…]` 6/17 — **three input idioms
and no fourth wall between them.** The dam proved the cost of this: its act was a
key nobody named, with no affordance at all, and a hand could stand in the room
forever. It was found by hand, not by a check.

> **BUILT.** `reach(x,y,r)` · `hold(dt,secs)` · `draw(min)` · `wait(dt,ms)`, and
> `near()` as the reach's affordance half. Every stage declares one and uses it,
> held by `kit_check` K3–K5. `answer_check` asks all twenty the same question
> because they all speak the same four verbs.

---

## 5 · HIS WORDS ON SCREEN — the one door

| | count |
|---|---|
| `wrap(t,n)` — the only text layout | 3/17 |
| `sheetAt()` — his sentence shown at a place | 2/17 |
| the single text door | verified by `wire_check` R4: *"the only text that reaches the screen is his own, and it comes through one door"* |

That single door is the most load-bearing thing in the kit and it is the least
used. **Nine stages draw no words at all** — which is correct for them, and it
also means the pathway that carries the writing has been exercised by two.

---

## 6 · ASSETS

```
images ......... 0
audio .......... 0
webfonts ....... 0
network calls .. 0
```

**There are no assets.** Everything is drawn from primitives at runtime. What
stands in place of an asset library is a palette — 30 colours in `ascent.html`,
15 in `daily.html` — and it is not shared between the two files.

> **BUILT.** Eleven materials, named by material and identical across every page,
> held by `kit_check` K7–K11. The two blues were the surface and the deep of one
> gradient and are kept as named depths: `shallow` and `water`.

---

## 7 · THE HUD — the clear case

`drawCase()` runs **every frame, in every view, above everything** — map, room,
face alike. It is the only thing in the build that is genuinely universal by
construction rather than by convention, and it is what makes the machine legible
without putting a number in front of the player.

---

## 8 · WHAT THE COUNT SAYS TO DO NEXT

Three gaps, in the order they pay:

1. **The four gestures get verbs.** `reach · hold · draw · wait`. Every stage
   declares its gesture; the affordance check can then ask all twenty-four the
   same question, instead of a fault being found by a hand at the dam.
2. **One palette.** Two files, one world, two colour sets today.
3. **The level container is already right — leave it alone and use it.**
   `facesOf()` is the piece the other twenty-three levels reuse unchanged.

**On the grouping** — which mechanisms gather into which of the twenty-four
levels — this document takes no position, because the kit is indifferent to it:
every grouping costs the same thirty lines a stage. Three workable groupings are
on the decision surface (by circuit, by what the water is doing, by what the hand
is doing), each with what it would cost.
