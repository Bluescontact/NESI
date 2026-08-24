# COLD WALK — ascent.html, the 12 built levels — 2026-08-23

**Asked:** Kevin, scoped explicitly — *"confirm the 12 built levels actually
play, end to end"* — no new levels, verify what exists, fix real breaks.
`PROGRESSION.md` marked this build UNWITNESSED as of 2026-08-21; no stranger
had walked it since.

**Who walked it:** this session, through the Browser pane tool (an automated
hand, not a human one). Per this skill's own rule, that means this file may
**never write WALKABLE** — only a human who did not build the game gets to
write that word. What follows is a structural pre-check plus one full,
real interactive walk, both real evidence, neither a substitute for a human's
own read.

---

## SETUP

- Server: `nesi/game2d` served locally (`.claude/launch.json`, config
  `game2d`), reached at `http://localhost:52890/ascent.html`.
- State cleared: `localStorage.clear()` then reload, confirmed cold —
  `nesi.ascent` and `nesi.water` both null before the walk began.
- **Tool caveat, named up front so it isn't mistaken for a game bug:** the
  Browser pane's synthetic `ctrl+Return` keypress (via the `computer` tool)
  did not reach the page's keydown handler — the write-commit action
  appeared not to fire. Dispatching a real `KeyboardEvent` directly from
  script (`ctrlKey:true`) fired it correctly on the first try. This is a
  tooling limitation of the automated walk, not a defect in `ascent.html` —
  a real human's keypress carries `ctrlKey` correctly and would not hit this.

---

## STRUCTURAL PRE-CHECK, ALL 12 SEATS

Every seat visited via its own hash link (`#tank` through `#seating`).

| seat | heading renders correctly | fraction buttons present | crashed / blank |
|---|---|---|---|
| TANK | ✓ | 30 | no |
| DAM | ✓ | 28 | no |
| FILTER | ✓ | 28 | no |
| STATIONS | ✓ | 28 | no |
| GROUND | ✓ | 30 | no |
| DEEP | ✓ | 28 | no |
| HELIOSTAT | ✓ | 28 | no |
| OVERWINTERING | ✓ | 28 | no |
| CAST | ✓ | 28 | no |
| LENS | ✓ | 28 | no |
| GARDEN | ✓ | 28 | no |
| SEATING | ✓ | 28 | no |

All 12 render real content — no blank seat, no crash, no seat whose card
failed to build. TANK and GROUND read 30 rather than 28 because each already
had one seam interacted with during the full walk below, which changes that
seam's own control set (the "write here" option is replaced once a level's
own entry is kept).

Page-level scroll checked directly (not trusted from a possibly-miscomposited
viewport, per this skill's own §8 gotcha): `scrollHeight` 1131 vs
`clientHeight` 324, `overflow: visible` on both `html` and `body` — a normal,
reachable page scroll, nothing clipped or trapped.

## ONE FULL WALK, TANK → GROUND, START TO FINISH

1. Clicked the TANK seat link from the cold map. Real navigation
   (`location.hash` → `#tank`), real new content rendered (body grew from
   29,560 to 32,231 chars).
2. Clicked the "write here" fraction option on the TANK→GROUND seam. The
   writing panel (`#wp`, previously `display:none` — correctly gated, not
   broken) opened with real dimensions and a focused, empty textarea.
3. Typed a real sentence, not a known-good test string: *"I keep forgetting
   to water the tomatoes and I think about it every night before I fall
   asleep."*
4. Committed with ctrl+Enter (via direct event dispatch, see tool caveat
   above). The panel closed. Checked `localStorage['nesi.ascent']` directly:
   the sentence was banked **verbatim**, tagged `"GROUND—TANK"`, and the
   seam's `fraction` field recorded correctly.
5. Clicked the "aim" (beam-sent-straight) light option on the same seam.
   Checked state again: `seamState['GROUND—TANK']` now reads
   `{formed:true, fraction:"dissolved", light:"x+", daysGrown:1,
   lastFed:"2026-08-23", rooted:0, windowsSeen:["x+"]}` — a complete,
   correctly-shaped record.
6. **The visible, on-screen consequence, not just the store:** the seam's
   own caption changed live, in front of the walking hand, from *"pick a
   fraction and aim it at a window"* to *"sorted, aimed, and written — this
   level's week isn't in yet."* The "write here" button was replaced by
   *"this level's own entry is kept, whole, in the world."* Both are real,
   perceivable, at the moment the act landed — passes this skill's own
   pre-check item on visible consequence.
7. The "week isn't in yet" language is not a bug — it's the game correctly
   naming its own by-design limitation: a level's week (7 real distinct
   days touched) cannot complete in one sitting, and this walk did not try
   to fake that.

**No BLOCKED finding survived investigation.** Two things looked like breaks
at first look and both resolved to real, correct behaviour once checked
against the source (`ascent.html:190-225`) rather than assumed:
- the writing panel's `display:none` before any fraction is picked — correct
  gating, confirmed by reading `openWrite()`;
- the ctrl+Enter non-response — a tool limitation, confirmed by dispatching
  a real event.

---

## VERDICT

**UNWITNESSED — the honest default, not lowered.** This walk is real
evidence: 12/12 seats render correctly with no crash, and one full seam
(TANK—GROUND) was walked start to finish with a genuine, on-screen,
perceivable consequence at every step, no shortcuts taken from knowing the
code. But it was walked by the same tool ecosystem this build itself runs
in, through an automated hand — not a second, independent human party. Per
`LEARNED.md` law 3 and this skill's own step 6, that means it may **never be
written WALKABLE**, no matter how clean the transcript reads.

**What still needs an actual human stranger, and what they'd be answering:**
- Does the fraction-picker's plain-language captions actually read as
  intended to a first-time hand, or only to one who already knows the
  vocabulary this corpus has built up (dissolved/suspended/formed/light)?
  That's a felt-read question no automated walk can answer.
- The other 11 seats' full write→fraction→light cycles were confirmed
  structurally sound but not walked start to finish the way TANK—GROUND was
  — a human doing that across all 12 would either confirm the pattern holds
  everywhere, or find the one place it doesn't.
- The multi-day week mechanic, by the corpus's own repeated admission, is
  the one thing that structurally cannot be witnessed in a single sitting —
  confirming a level's *week* completes correctly needs a real hand
  returning across real distinct days, not simulable here.
- The `visit-writer.js` connect flow (built earlier today) needs one real
  human click on the native file-save picker — that dialog cannot be driven
  by this tool at all.
