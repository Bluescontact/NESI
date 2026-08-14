# LEVEL ONE — THE TANK. Run report, 2026-08-13.

**UNWITNESSED.** Four increments green in one walk on Kevin's real poured water
— **driven from code by the hand that made the change.**

> **Corrected 2026-08-14.** This said **WALKABLE**. `LEARNED.md:2`, Kevin's mark:
> *"no WALKABLE without a stranger read; machine-proved surfaces are
> UNWITNESSED."* The evidence below is real; the word was not earned.

```
way in ................... PASS  ← fresh load: player at entry, legible [true,false,false],
                                   closed=false, held=false. One face open, two dark.
act ...................... PASS  ← 267/141/144 frames of steered walking to the three faces.
                                   Held 'e' 501 ms did NOT read; past 1000 ms it did, and the
                                   NEXT face opened. All three read → tetra closed.
                                   Centre accepted only then. 120 words typed → exactly 100
                                   landed, no corruption, no digits, room strip 100% → 0%.
consequence .............. PASS  ← real Ctrl+Enter (hold() never called directly) → lens held,
                                   lit 0.04 → 1.00 over ~900 ms, face bearings 0° → [180°,−60°,60°],
                                   beams run face→centre, drain ring opens at the centre.
persistence (relaunch) ... PASS  ← full page navigation, fresh JS context. read=[t,t,t],
                                   closed=true, held=true, drained=true, lit=1 on load,
                                   lens restored verbatim. Walking back and holding 'e'
                                   did NOT reopen the field. It cannot be re-held.
```

---

## The articulation it serves — cited, per SEAM S3

Kevin's own words, in his own store, `nesi/game2d/kevins-water.json`:

| stone | verbatim |
|---|---|
| n:26 | *"buckminster fuller, The first tetra and level is the tank."* |
| n:34 | *"The write is separated face by face until a clear lens is held in 3 faces..."* |
| n:35 | *"When the 3 faces light up.."* |
| n:36 | *"the tetra can drain to the next tetra."* |
| n:42 | *"Leve one the daily jounral is the most load bearing surface of everything."* |

And `counsel/reference/NESI_VISION_as_it_stands.md:22` — *"Level One — the Tank,
the daily journal… Four faces of one writing tetra, vertex down, you at the
point."*

**The mechanic is his sentence, built literally.** The writing separates face by
face; a lens is held across all three; the faces light; the tetra drains.

**The first version of this file diverged and was replaced whole.** It put three
documents the machine had chosen at the vertices and had the player write *about*
them. That held none of his writing — the same failure he named at 07:15 on
2026-08-13: *"notice how what was built never actually held the writing."* The
triangulation he asked for is not between three machine-picked documents. It is
between three faces of his own writing, and the thing held across all three is
the lens.

## THE WATER SEAM S4 — satisfied, and measured

> every game walk runs on a copy of Kevin's real poured water — his store
> untouched — never on synthetic stones.

`tools/pour.js` opens `kevins-water.json` **read-only** and writes
`level_one_water.js`. 19 of his stones, dealt across three faces **in the order
they came** — the river's own order. Nothing computes kinship, similarity, or
theme; a kinship measure would quietly become a claim about his thinking.

```
store SHA256 before : 928F860EF20FBF2E59CFEA9005393EC310BFC7C16AF678D41183B928A70D59BB
store SHA256 after  : 928F860EF20FBF2E59CFEA9005393EC310BFC7C16AF678D41183B928A70D59BB
UNTOUCHED           : True
```

What actually stands on the faces, read back out of the running game after a
relaunch: *"buckminster fuller, The first tetra and level is the tank."* ·
*"The use can change, gather, delete merge, analyse, observe patterns and
grouping and structure between sentences."*

## A real defect the walk caught, fixed rather than worked around

The word cap first truncated on `input`, which moved the caret and produced
`word91ord92ord93…` — **a cap that corrupted the writing**, in a game whose
fourth law is that the player's words are never rewritten. Moved to
`beforeinput` (refuse the keystroke, edit nothing), with a restore-last-accepted
backstop for paths that ignore a cancelled event. Verified corruption-free.

## Laws held

No score, no rank, no judge, no validator, no correct answer, no model call, no
network. No number reaches the player — the cap is seen as *room*, never digits
(`SHOW_DIGITS = false` is the one-line revert). No instructional text anywhere;
the reveal order is the instruction, and the only glyph is a bare `·` at the
trigger radius. Colour is never the only carrier: the faces light **and** turn
**and** the drain opens. Reading is declinable — walk past and nothing happens.
Quitting loses nothing; the save is written on the act, never on exit.

---

## Run it

```bash
python -m http.server 8731 --directory "nesi/game2d"
```

`http://localhost:8731/level_one.html`

**WASD** or arrows to walk · hold **E** one second at a face to read it · when all
three are read, walk to the middle and hold **E** · type · **Ctrl+Enter** to hold
the lens · walk into the centre to drain, or south past the line to leave.

To re-pour after writing more: `node tools/pour.js`
To walk it fresh: clear `localStorage` key `nesi.level_one` (schema 2).

**Nothing in `nesi.html` was touched.** Its integrity gate stands.

## At the gate, routed nowhere

`inbox/gift_2026-08-13_stage_two_the_lens.md` — 250 words → a lens.
`inbox/gift_2026-08-13_stage_three_two_lenses.md` — 500 words → 2 lenses.

Stage two carries one ambiguity left unresolved rather than defaulted: *"250 user
words reduced by user to 250"* — the two numbers are the same, and three readings
are live.

## The one thing I'd do next

Wire the faces to the live daily page instead of the poured snapshot, so writing
today changes what stands on the faces tomorrow — the Overwintering, which only
returning can produce.
