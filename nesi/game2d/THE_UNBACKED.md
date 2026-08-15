# WHAT IS CHECKED, AND WHAT ONLY LOOKS CHECKED — 2026-08-14

**Ten of twenty-one instruments read a page nobody walks.** `tools/scope_check.js`
found it; three instances had been found by hand first, one at a time, and the
tenth would not have been found at all.

---

## 0 · THE PATTERN, THIRD TIME NAMED

```
the palette check   said "one palette"      and compared exactly two files
the gesture check   said "every stage"      and asked four of twenty
the refusal check   enforces "the refusals are the product"
                    and had NEVER been pointed at the game
```

Every one passed clean while the property it named was false somewhere it was
not looking. **A check narrower than its own claim reads as safety and is
silence.**

The refusal check is the sharpest: it defaulted to `nesi.html`, a surface last
touched on the 12th, and reported PASS all session. It has now been pointed at
every live surface for the first time.

---

## 1 · WHAT IS ACTUALLY BACKED

Live, from the front door: `index.html` → `daily.html`, plus `ascent.html`,
`decisions.html`, `level_one.html`, and `solid.js`.

| instrument | reads | what it holds |
|---|---|---|
| `refusal_check` | **all five live surfaces** | no model call, nothing outward, no score/rank/percentage, no reward cue |
| `kit_check` | ascent + daily | four verbs used by every stage; one palette across every page |
| `constraint_lint` | ascent | every boundary registered, announced at its gate, liftable |
| `first_four` | ascent + his water | level one walks, on a copy of his real writing |
| `door_check` | ascent | the levels are reachable from the map |
| `world_check` | ascent | the figure drawn IS the solid |
| `cut_check` | ascent | the hand cuts where it wants |
| `solid_check` | — | the solid's own arithmetic |
| `daily_walk` | the running page | nineteen properties of the surface he writes in |
| `scope_check` | the tools | this |

---

## 2 · WHAT IS NOT BACKED, AND WHAT EACH ONE WAS FOR

These ten are **kept, not deleted** — they are a true record of what was verified
about a surface that has been superseded. What they say about `world.html` and
`nesi.html` was true when written. **None of it is a statement about the game a
hand opens today.**

| instrument | its claim | live equivalent |
|---|---|---|
| `bloom_check` | does the world unfold all at once, only when earned, carrying everything the hand placed | **none** |
| `boot_check` | does it cold-boot correctly from an empty store | **partly** — `first_four` cold-starts LEVEL ONE only; four levels never |
| `green_check` | is standing made of returns, not of hours — "a volume-storm roots nothing" | **none** |
| `head_check` | does upstream work shape the weather, and does the thing that leaves carry no words out | **partly** — the gift shop is walked, the weather is not |
| `hold_check` | does the world hold the writing | **yes** — `daily_walk` D1–D15 |
| `night_check` | does the deep work while you are away, and only then | **none** |
| `reach_check` | can a hand find the things the world will answer | **none** — and its rule does not fit a canvas world; see §3 |
| `still_check` | does the valley actually go quiet — a claim about the frame loop | **none** |
| `wire_check` | is anything an island — does a chain cross every wire in one sitting | **partly** — the circuit was walked once, by hand |
| `pattern_lint` | A3's pattern rules | **none** |

---

## 3 · THE TWO THAT MATTER MOST

> **CORRECTED 2026-08-14, on his standing instruction — *check before any
> assertion*.** This section as first written made two claims I had not checked,
> and both were wrong. They are corrected below rather than removed.

**`reach_check`** — *can a hand find the things the world will answer?*

**I claimed it would have caught THE DAM having no handle. IT WOULD NOT.**
Checked: its rule is that every target acted on in `pointerdown` must also be
tested in `hover()`, so the cursor changes over it. `ascent.html` has **no
`hover()` function and no cursor change anywhere** — 0 of each — because it is a
canvas world that DRAWS its affordances rather than changing a pointer. And the
dam's act before the handle was `keys["e"]||keys[" "]`, **a keyboard act with no
click target at all.** The rule has no subject there and would not have looked.

**What is true:** the live build has no affordance check of any kind, and an
affordance check for a canvas world needs a different rule than this one —
*every act must have something drawn that answers a hand before the act is
taken.* That rule does not exist anywhere yet.

**`boot_check`** — cold-boot from an empty store.

**I claimed the live build has no cold-boot check. IT HAS ONE, narrowly.**
`first_four` clears the store and walks LEVEL ONE from empty. What is missing is
a cold boot of *the rest*: four of the five levels have never been entered from
a cleared store by any instrument.

**And the three faults I called cold-boot faults are not, quite.** The drained
lake was — it appeared on a fresh morning. The stations finishing on nothing and
the sounding into an empty lake appeared **when a face was entered before the
face that feeds it**, which a cleared store guarantees but does not define. They
are EMPTY-STATE faults: a seat entered with nothing upstream of it. That is the
class, and it is wider than cold boot, because ungated faces mean any order is
reachable at any time.

---

## 4 · WHAT THIS DOES NOT CLAIM

It does not say the ten are wrong. It says **they are not evidence about the live
build**, and I have been reporting several of them in a passing count all
session as though they were. That count was wrong and this file is the
correction.

`scope_check` fails while any instrument reads a page nobody walks, so this
cannot go quiet again.
