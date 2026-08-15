# COVERAGE — what each instrument holds, 2026-08-15

Live, from the front door: `index.html` → `daily.html`, plus `ascent.html`,
`decisions.html`, `level_one.html`, and `solid.js`.

---

## THE BUILD, COUNTED

```
mechanisms ......... 20      reach 8 · hold 4 · draw 4 · wait 4
levels .............  5      THE REACH · THE WAIT · THE HOLD · THE DRAW · THE RETURN
                             every one gesture-pure, four faces each
seats on the solid . 12
members ............ 24
```

---

## WHAT IS HELD, AND BY WHAT

| instrument | reads | what it holds |
|---|---|---|
| `refusal_check` | all five live surfaces | no model call, nothing outward, no score, rank, percentage or reward cue |
| `answer_check` | the running page | **every act answers a hand before it is taken** — 20 of 20 |
| `kit_check` | ascent + daily | four verbs, used by every stage that declares one; one palette across every page |
| `constraint_lint` | ascent | every boundary registered, announced at its gate, liftable by hand |
| `load_check` | the running daily page | **the load member is the hand's** — 7 of 7 live, and 0 of 7 with the member taken away, run as a control rather than asserted |
| `first_four` | ascent + his water | LEVEL ONE walks from a cleared store, on a copy of his real writing |
| `daily_walk` | the running page | nineteen properties of the surface he writes in |
| `door_check` | ascent | every level is reachable from the map |
| `world_check` | ascent | the figure drawn IS the solid — every member a real edge |
| `cut_check` | ascent | the hand cuts where it wants |
| `solid_check` | the solid | its own arithmetic |
| `scope_check` | the tools | every instrument reads the live build |
| `store_guard` | both stores | his writing is the same before and after any work |

---

## EVERY REFUSAL IS BOUND TO A PRESENCE

A prohibition on its own is satisfied by a world that does less — a blank page
passed the refusal check, which was proven by running it on one. So each law
carries the yes it protects, and a surface that carries neither the law's subject
nor its presence is empty rather than compliant.

| the no | the yes it is bound to |
|---|---|
| no model call, nothing outward | the clear case SHOWS the machine making none |
| no number reaches you | the boundary saying so is registered and announced at its gate |
| set-it-down has no confirmation | the third output is there to take, which is what makes it a choice |
| quitting loses nothing | pad, read back, commit — in the surface he writes in |
| the world holds the writing | his sentences bank as he writes them |
| any refusal at all | a hand can act on the surface — a page with no act refuses nothing |
| the load is never read, inferred, computed or defaulted | four words on the stone, nothing preselected, and a hollow slot that stays hollow — a law satisfied by never asking is now satisfied by asking |
| an unanswered load is held, not zero and not yes | held is a drawn third thing: hollow slot and four words, distinct from both answered and absent |
| no information is offered to a don't-want-to | the exchange ends — the panel closes and nothing at all is rendered after it |

### And the same binding at the player's hand

The eleven boundaries a hand can lift each name **what they keep**, not only what
they stop, and the clear case prints both. Lifting one shows what is given up.

| the boundary | what it keeps |
|---|---|
| a run opens after the one before it | each run opens on the water the one before it left |
| a level closes on all four faces | a level's four faces are one act, so closing it means something |
| the tank does not ask twice | a morning is poured once, in the place you actually write |
| nothing falls on its own | the reach stays yours — the world waits however long you take |
| a sentence is poured once | your sentence stands in the water once, however often you return |
| four gestures, no fifth | four verbs is what lets every act be asked the same question |
| no number reaches you | what you see is form — how high, how clear, how far down |
| no model call | the world runs in your hands, with nothing listening |
| your words are never rewritten | what comes back to you is what you wrote |
| the deep never renders | what you let go of is out of sight until it returns as ground |
| a line cannot be dropped into the sky | a line finds what the water is holding |

`constraint_lint` C8 refuses a boundary that names no yes, so a new *no* arrives
with the question already attached.

**Ten of ten live instruments are presence-asserting.** Removing the clear case's
proof from `ascent.html` now fails the refusal check by name, and a blank page
fails it on the first line.

---

## THE RULES THESE HOLD

Each is a rule first and an instrument second. The rule is the thing to build to.

**Every act answers a hand before it is taken.** A reach changes the screen with
the hand over it, unclicked. A hold changes it while held. A draw follows a
moving hand. A wait shows the room moving on its own, so a hand can tell a live
room from a stuck one.

**Every stage declares one of four gestures and uses it.** reach · hold · draw ·
wait. A fifth needs a new mark.

**Every boundary is announced where it binds and liftable there.** The clear
case lists what binds in the room you are standing in; a click lifts it.

**One palette, every page.** Eleven materials named by material, identical
across the files.

**His writing is never touched by an instrument.** Fingerprint before, compare
after, and say so when no fingerprint was taken.

**Every instrument reads the live build.** `scope_check` holds this.

---

## WHERE TO BUILD NEXT

Three rules have no instrument yet, and each names its own first move.

**A cold boot of every level.** `first_four` cold-starts LEVEL ONE. The other
four have never been entered from a cleared store by an instrument.

**Empty-state coverage.** A seat entered before the seat that feeds it: the
stations with an empty queue, the sounding over an empty lake, the garden before
anything has grown. Faces inside a level are open to each other by design, so
every order is reachable — and each of these three was found by walking. A rule
that says *a seat entered with nothing upstream is empty and finishes nothing*
would hold all of them at once.

**The circuit, end to end, by instrument.** Written in the daily surface, dropped
to the lake, standing at the tank, reached for, cast, taken as a gift. Walked
once by hand; no instrument holds it.

---

## ONE FRONT DOOR

```bash
node tools/check_all.js
```

Ten instruments, one exit code. It reports a **CRASH** separately from a FAIL,
because an instrument that threw before reaching its assertions checked nothing
while one that refused checked everything — and it refuses outright if any
instrument it names is missing from disk. It exists because the store guard
crashed under node, the crash was piped through `tail -2`, and the last line read
like output.

The three that run in the page are printed as *not covered by this run* rather
than left silent.

`tools/assertion_audit.py` is his, and runs here as a row: it encodes the whole
register — the standing rules, the load alphabet, the seven fields, the ending
states, the siting — as predicates, and gates on three facts at once. **A blank
passes none of the 27. The control, which is the live world with the held form
removed, fails on F7 alone. The live world holds.** The control is what keeps the
first two honest: a suite that refused everything unconditionally would also pass
the empty test.

Two entries came back absence-passing *and* unbound — E1 (WALKABLE) and E2
(UNWITNESSED), stated as *"state != WALKABLE or produced"*, which is satisfied by
never claiming WALKABLE. The two ending states meant to carry evidence were the
two asking for none. Both are bound now, and all three endings require what they
produced.

---

## THE TEN THAT DESCRIBE A SUPERSEDED SURFACE

`bloom_check` · `boot_check` · `green_check` · `head_check` · `hold_check` ·
`night_check` · `reach_check` · `still_check` · `wire_check` · `pattern_lint`

They read `world.html` and `nesi.html`. They now live at `tools/retired/`, marked
by their own `RETIRED.md` — the world3d convention, a mark layered on rather than
a deletion. They were failing `scope_check` on every run by design, and **a red
line that is red by design trains a hand to read past red.** Moving them makes
that instrument mean something again: everything still in `tools/` reads the live
build, so a new failure there is a real one. `scope_check` now also asserts the
register is not empty and that a retirement is *marked* rather than merely gone. Three of their claims already have live equivalents: the world
holding the writing (`daily_walk`), a hand finding what the world answers
(`answer_check`), and the chain crossing every wire (walked once).
