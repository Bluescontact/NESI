# THE REGATHERING — the nine stranded instruments, ruled and brought in

*2026-08-16, on Kevin's order: "bring the 9 stranded instruments into nesi..
regather what belongs within nesi's boundary."*

The order has a filter in it. Not all nine belong, and saying which is half the
work. **Five were brought in and walked. One was already inside under another
name. One is held outside by a standing ruling. One half-crossed and waits on
his mark. One is a technique, not an instrument, and was already in use.**

Every ruling below is mine and overturnable in one word.

---

## THE BOUNDARY I APPLIED

Drawn from his own marks, not invented:

- **"its a world."** — 2026-08-16
- **"all three surfaces should be inside the final nesi"** — personal writing
  development · commons extraction and development · gift library, 2026-08-16.
  So the boundary is wider than the game: it holds the worksurfaces too.
- **The build is `nesi/game2d/`** — static HTML, vanilla JS, zero dependencies,
  no network, no model call, local files only.
- **The standing laws that were never Godot-specific** — no number to the player,
  words never rewritten, the hand runs the filter, held is lawful, set-down has
  no confirmation, shape carries the distinction.

A thing belongs if it can stand inside that and still be itself.

---

## BROUGHT IN — five

### 1 · THE SORTING TARP → `regathered.html`, a place you walk to
The origin of this whole thread and the instrument the brief was written for.
The pile lies on one cloth, all at once. **Footprint is how big a thing is;
shade is how long it has lain there.** One press folds the cloth and gathers it.

**Walked:** 19 slabs on the cloth, footprints varying `79.1 / 48.7 / 61.9`,
shades varying `132 / 136 / 140`, and **zero text nodes** — verified by counting
`<text>` elements inside the instrument, of which there are none. The press
gathers every slab toward the middle. It stages; it deletes nothing.

**The one adaptation:** it is handed `WATER.pile` — `{ref, extent, settled}` —
and never `WATER.stones`. Verified that none of his 19 sentences appears
anywhere in the pile data. That separation *is* the instrument.

### 2 · THE UNCOVERING (THE WASH) → `regathered.html`, press **F**
Marching squares over relief that is already in the ground. Asked for, never
volunteered, never labelled; fades in about eight seconds and nothing brings it
up again.

**Walked, against the shipped source:** bare ground → **0 segments**. One drop →
136 segments. Three drops → 402. Segments further than 200px from any drop →
**0**. It cannot invent a line.

### 3 · THE OVERWORLD WALK → `regathered.html`, the ground itself
Arrows/WASD or click-to-walk; places entered by proximity plus Enter; **press D
to drop verbatim text where you stand and it becomes ground.** Your marker moves
only by your hand; the system never places it.

**Walked:** keys move the avatar and persist it. A drop landed at exactly the
avatar's coordinates, **verbatim** through an em dash, apostrophes and an
ampersand. The room closed with no toast — the ground changing is the feedback.
An empty drop wrote nothing, silently.

**A real bug this surfaced.** A click resolved against `near`, which only the
draw loop set. Since `requestAnimationFrame` stops while the tab is hidden — law
8, correctly — a click arriving before the first frame walked you *past* a place
you were standing on. Proximity is now resolved in the click and Enter handlers
themselves.

### 4 · THE ROUND → `regathered.html`, a place you walk to
Five moves dealt from the live field. **A skip resolves a move the same as a
play.** The fifth ends the round; nothing carries over; closing the door is a
complete ending.

**Walked:** five pips, five moves, all dealt from real state — the cloth being
open, the ground holding relief, one of his own stones, the door, and *nothing
in particular*. A skip and a play were indistinguishable in effect. **Zero digits
anywhere in the instrument** — the round counts in pips, because law 2 forbids a
number reaching the player, and the Flask original printed `N of M resolved`.

### 5 · THE RELATION → `field.html`, shift-click two things
From `THE_FIELD.html`. **An edge is `{to, rel}` and the relation word is free
text you write.** No vocabulary is offered — verified: no placeholder, no
datalist, no options, no select. A menu of relation words would be the machine
pre-naming the thing this exists to let you name.

**Walked:** shift-click picks, shift-click again asks, a blank box writes
nothing, `is the body of` was stored and drawn on the line between the two.
Dragging one end moved the line with it (`y1: 188 → 430`). The relation and the
position-utterance coexist on the same object without interfering.

---

## ALREADY INSIDE — one

### 6 · THE BAR'S BOARD
Both halves are already here under other names, so porting would duplicate.
Its **board** — draggable tiles that never move again on their own — is what
`field.html` is. Its **deposit granularity** — punctuation fires the deposit,
consecutive sentences hold as one open thought — is live in `daily.html`
(*"sentences bank as they are written"*, `THE_BUILD_SHAPE.md`).

**Named, not ported.** Nothing was lost.

---

## HELD OUTSIDE — one, by a standing ruling

### 7 · THE MENU TETRA
Four vertices reading **live or dry** by whether anything actually stands behind
them, refusing to fake a list. Good grammar, and I did not bring it in.

**Why:** `index.html`'s door was ruled on 2026-08-14 — the daily surface is the
door, *"because that is the game: a page you open and write into."* The menu
tetra is a front door. Siting it would move the door and overturn that ruling,
which is not mine to do.

**What it would take:** your word that the door moves, or a site for the
live/dry grammar that is not the front door.

---

## HALF-CROSSED — one, waiting on a mark

### 8 · THE TETRA POSITION-BOARD
**Its law already crossed.** *Holder derived from position, never stored* is
running in `field.html` and was proven this morning: the same object said three
different things from three placements, and the store holds only `{x, y}`.

**Its poles have not crossed.** The board's four are SELF · OTHER · WORLD · TIME.
The field's three are the arms you named on 2026-08-16. These are different
readings of different things, and **which poles the field carries is yours** —
changing them is three lines of code, and guessing would be the machine choosing
your geometry.

---

## NOT AN INSTRUMENT — one

### 9 · THE LATTICE RENDERER
A technique, not a thing to regather: *measure where the content actually sits,
then draw the connecting lines live, so the figure derives from placement rather
than hand-set coordinates.*

**It is already how this build draws.** `field.html`'s relation lines are
computed from live node positions on every render; `tiles.html` derives its edges
the same way. Nothing to bring in — it arrived as a habit rather than a file.

---

## WHAT IS NOW TRUE

> **A mistake, recorded rather than quietly fixed.** This surface was first
> written to `world.html`, which **already existed** — a 1,495-line NESI surface
> from the commit *"Rebuild: the world holds the writing."* A directory listing
> truncated at forty lines hid it (it sorts past `tiles.html`) and I treated the
> partial listing as complete. Caught by `git status` reporting `M` instead of
> `??`. `world.html` was restored from HEAD and verified byte-identical; the new
> surface moved to `regathered.html`. Nothing was lost. The lesson is the same
> one this corpus keeps paying for: **a truncated read is not a read.**

| | |
|---|---|
| **new** | `regathered.html` — the walk, the tarp, the wash, the round |
| **untouched** | `world.html` — its own surface, here first, restored intact |
| **new** | `tools/gather.js` — carries his real water in, read-only |
| **new** | `world_water.js` — 19 verbatim stones · 19 shape-only pile entries |
| **changed** | `field.html` — gains the relation |
| **unchanged** | the door. `index.html` still goes to `daily.html`. |
| **unchanged** | his store. `kevins-water.json` was opened read-only and git reports it clean. |

**Nothing was written to any ledger.** The suspension holds; no machinery was
re-adopted to do this.

**The water seam (S4) is kept.** Every instrument above that touches material
runs on a copy of his real poured water — 19 stones — and `gather.js` refuses to
run rather than fabricate a pile if the store is empty.

**WALKABLE.**
