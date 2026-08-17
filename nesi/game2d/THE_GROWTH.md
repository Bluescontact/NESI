# THE GROWTH — what falls out of the geometry, and what does not

**Kevin, 2026-08-16:** *"build the plan from what i just described to the
completion of the game... only what your certain can fall out of the geometry
cleanly so far."*

Everything in § 1 and § 2 was produced by running `solid.js` today, not read
from a document. Everything I am **not** certain of is in § 3, and it is not
smuggled into the plan as a detail.

**The definitions this rests on, in his words:**
> *"the roots are a representation of writing that has survived water, and light.
> the roots represent a level inhabited"*
> *"surviving water is the sort, surviving light is the shareable form"*
> *"Each level is a seam, hold two faces… the squares become display windows,
> the triangles are the tools"*

---

## 1 · THE GROWTH, STAGE BY STAGE

A root is one piece of writing that went down through the sort and came back up
as shareable form. It is **returned**, not earned. Each root is a level
inhabited, and the figure only becomes visible as roots grow.

| nodes | what exists | what the geometry says |
|---|---|---|
| **1** | a seat | nothing spans. no line. |
| **2** | one root between two nodes | a line. no area, no rigidity, nothing enclosed. |
| **3** | a triangle | **area arrives.** still no volume. |
| **4** | a tetrahedron | **volume 1 arrives, and rigidity arrives with it.** `CELLS` records `faceRigid: true, deforms: false`. The tetra is the only cell that cannot fold. |
| **5** | a second tetra on the shared face | **the membrane arrives** — it is the shared triangle. Two apexes, three arms each, six arms, one membrane between them. |

Day four is not a new idea. It is the architecture already in the governing
brief — *"Two stacked tetrahedra, meeting face to face. Upper tetra = the light
control room at the apex. Lower tetra = the ground and the lake."* The growth
walks into the spec rather than being built to it.

**The first tetra is already named on the solid:** `TANK · FILTER · GROUND`,
tetra A, volume 1.

---

## 2 · WHAT COMPLETION IS, IN NUMBERS THAT ARE FIXED

Every figure below is computed, not chosen.

### The counts

```
seats            12
members          24        the perimeter
roots            12        one per seat, radial
LEVELS           30        24 seams + 6 diameters, per Kevin's F10 mark 2026-08-17
                 ~~36~~    was 24 + 12, when a root was read as one per seat

faces            14        8 triangles (tools) + 6 squares (windows)
cells            14        8 tetra (volume 1 each) + 6 pyramids (volume 2 each)
VOLUME           20        Fuller's number, in tetra units
circuits          4        of six seats each
antipodal pairs   6
```

### What every level is

Every seam holds **exactly one triangle and one square** — one tool and one
window, always, because the cuboctahedron is quasiregular. `facesAlong` returns
a named pair, not a list. So no level ever feeds two tools or two windows.

```
8 tools   × 3 seams each  = 24
6 windows × 4 seams each  = 24
```

**A tool is made from three levels. A window shows four.**

### What the two halves are

> **■ SUPERSEDED AS A READING, 2026-08-16, Kevin's mark on fork F1:** *"three
> equal physics — each addresses all twenty-four."* Root, water and light are
> not two halves of the member set; each addresses the whole of it. **The
> arithmetic below is untouched and still true** — `fall` and `turn` number 12,
> `rise` and `return` number 12 — but those are member KINDS, water's own
> circuit, and they are no longer a division between two physics. Light is not
> a member kind. Nothing was computed from the old reading: it appears in no
> code anywhere in the build, only here and in `ALIGNMENT.md:25`, so nothing
> recomputes. The one place it had reached code was `day_one.html`'s seam
> labels, corrected the same day.

```
water  = fall 8 + turn 4   = 12
light  = rise 8 + return 4 = 12
```

Seats split six that fall — TANK DAM FILTER STATIONS GROUND DEEP — and six that
rise — HELIOSTAT OVERWINTERING CAST LENS GARDEN SEATING.

### How the halves land on the faces — this is not uniform, and it was not designed

**The eight tools:** three are pure water, three are pure light, and **two are
mixed** (2w/1l and 1w/2l). Only two of the eight require both halves of the
game to complete.

**The six windows** pair complementary, each pair summing to 4 water and 4 light:

| | |
|---|---|
| 4 water / 0 light | 0 water / 4 light |
| 3 / 1 | 1 / 3 |
| 2 / 2 | 2 / 2 |

Exactly one window shows only water. Exactly one shows only light. Two are
perfectly balanced.

### The structural milestones — thresholds nobody chose

- **4th node** — first volume, first rigidity. Before this the assembly can fold.
- **5th node** — first membrane.
- **12th node** — every seat present; the perimeter can close.
- **24 members** — all four circuits walkable end to end.
- **12 roots** — ~~the six mechanisms are gone and the figure is fixed.~~ **WRONG, corrected 2026-08-16 against `solid.js` rather than quietly dropped.** Roots fix nothing. `RADII` carries `member: null` on all twelve, permanently — *"it is not a walk and never becomes one"* — and `solid.js` states the opposite of what I wrote: *"The 24 members are struts and cannot change. Radii change whenever the container moves."* A root is a free length, not a bar. Checked counterfactually as well: admit the centre as a thirteenth node and add all twelve radials as real struts, and the rank goes 24 → 32 with **one** mechanism still standing, not zero. The claim was false twice over.
- **The six mechanisms are spent on the six SQUARES — one each, and the squares are the display windows.** `solid.js`: *"The six squares are the whole of the freedom, and anything ever sited in one of them stops the container moving."* Measured, not repeated: bracing the squares one at a time takes the mechanism count `6 → 5 → 4 → 3 → 2 → 1 → 0`, exactly one per window, in any order. The eight triangles are already braced as bar-frames, so **the tools are free and only the windows cost.** What this means for the build is in § 3.8.
- **R = e exactly**, and the twelve radials sum to `[0,0,0]`, so the centre holds nothing by arithmetic — reaching inward costs what reaching sideways costs. That much stands.
- **20 volumes** — full.

### What a completed circuit is

Three falls, the turn, three rises, the return. Six seats. Four of them, and
each carries exactly one turn and one return. That shape is the round trip your
definition describes: down through the sort, pivot, up through the form, home.

### What a root buys

An antipode is **three steps away around the perimeter, by four distinct
routes** — or **one step through the centre by root**. TANK to LENS: four
three-step ways, or the root. That is the only one-step crossing in the solid.

---

## 3 · WHAT I AM NOT CERTAIN OF — excluded from the plan above

Named so the plan cannot be read as complete.

1. **The order of growth.** Nothing in the geometry sequences the 30. Which root grows second is yours.
2. **What the sort sorts into.** The hand sorts — law 5 makes that binding and `refusal_check` enforces it. What the fractions are on the page is unwritten. `day_one.html` records that the hand acted and names no fraction.
3. **Whether a root belongs to a seat or to a circuit.** There are twelve roots and four circuits and a seat sits on two circuits. The mapping is not one-to-one and the geometry does not hand it over.
4. **What light does mechanically.** Water is sorting and pattern recognition and I can picture it. "Shareable form" I can define and cannot yet build.
5. **The membrane's behaviour.** The geometry gives it a location — the shared triangle at five nodes — and says nothing about what crosses it.
6. **Whether the two mixed tools carry special weight.** The asymmetry is real and computed; whether it means anything is a reading, and readings are yours.
7. **Days.** Nothing here is a schedule. "Day one, day two" is his sequence of structural states, not a calendar, and I have not converted it into one.
8. **What the jitterbug costs, which is not open but is not yet ruled.** The 13–24 arc put to me on 2026-08-16 ends in a jitterbug collapse, a tetrahedral packing, a download and a release. The geometry certifies the move — the six mechanisms *are* the jitterbug, and volume runs 20 at the VE, 4 at the octahedron, 1 at the tetrahedron. But it prices it: **the collapse is available only while a window is still unsited.** Six display windows built is six mechanisms spent is a world that cannot fold, cannot pack, cannot be carried out. Whether that reads as the mechanic — *the world becomes portable by giving up its displays* — or as a wall to route around is Kevin's, and I have not chosen it.

---

## 4 · WHAT IS BUILT AS OF THIS FILE

- `index.html` — the door, on the solid. 11 of 12 surfaces reachable, from 3 this morning. `nesi.html` gated and left shut.
- `tools/predicate_filter.mjs` — rebuilt. Three predicates kept apart; it can return no.
- `day_one.html` — TANK, its four members with each one's tool and window read from `solid.js`, and the root shown with no faces because `member: null` says it has none. **The thousand-word gate is removed**: a root is now two hand-gestures on one sentence — sort, then form — and no count gates anything. Writes only to `nesi.dayone`; his water is never opened.

**Unwalked by a person.** Everything above is measured and driven, not seen.

---

*Nothing in this file decides anything in § 3.*
