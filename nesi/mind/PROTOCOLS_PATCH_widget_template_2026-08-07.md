# PATCH FOR REVIEW — replaces the "Widget Template — DS_v1" section of PROTOCOLS.md

**Status: APPLIED 2026-08-07** on Kevin's mark "apply the protocol patch". `PROTOCOLS.md`
now carries the section below verbatim; lines 1–141 of that file — every law above the
widget section — were verified byte-identical before and after. Pre-application backup:
`nesi/mind/PROTOCOLS.md.backup_pre_ds_lite_2026-08-07.md`. This file is kept as the
record of what was applied, not as a pending proposal. Built session 289f75e7,
2026-08-07, on Kevin's mark "session-scoped — build it that way, then build Phase 2".

Everything from `# Widget Template — DS_v1` to the end of `PROTOCOLS.md` is replaced by
the text below the line. Nothing above that heading changes. No law is altered, removed,
or reworded — Terminal Law is enforced by routing, and the six-step protocol survives
intact inside the Deep Review chamber where it belongs.

---

# Widget Template — two chambers, one routing law

**Daily Mode is the default. Deep Review is reached by escalation, never by habit.**

Terminal Law, already adopted: *no interface may require more capacity than the movement
it governs.* DS_v1 is a deep-review chamber; running it as the daily default paid the
review cost on every ordinary day regardless of what the day needed. This section is the
routing that was legislated and never built. Both chambers are lawful. Only the default
changed.

## Daily Mode — DS_LITE, one call

**Chassis:** `nesi/mind/DS_LITE.html`. **Entry point:** `tools/surface.py`.
**The model never reads either file.** That is the point of the mode.

**Four steps, not six:**

1. **COMPOSE** the payload — small JSON, this shape and no other:
   ```json
   {"title": "…", "context": "one plain line",
    "tiles": [{"id": "d1", "grounding": "grounded | reached",
               "reading": "the plain-words object of the decision",
               "exits": ["hold", "not this"],
               "cross": {"label": "…", "mark": "text copied to clipboard",
                         "verified": true, "gap": ""}}]}
   ```
   `cross` is optional. `grounding` is binary and qualitative — never a number, never a
   confidence score. **The floor line is not a field**; `surface.py` derives it live from
   `marks.py status` + `gates.py status` on every render.
2. **CALL** `python tools/surface.py --payload <file> --session <slug>`. It validates,
   deposits, derives the floor, fills the chassis, writes
   `_widgets/latest_<slug>.html`, and returns the fragment.
3. **SHOW** — `mcp__visualize__show_widget` with that fragment.
4. **NO PROSE.** The widget is the response.

**The deposit is no longer a step that can be skipped.** It happens inside `surface.py`,
before the render, unconditionally, with no flag to disable it — a re-offer still goes
through `decisions.py` so generation / revision / prior_sha and the 4-tile rate brake are
unchanged. Because depositing is now the only path to a surface, **the old step-5 verify
pass is structurally unnecessary and is out of the daily path.** `decisions.py verify`
stays on disk, unchanged, and still runs in Deep Review.

**Three boundaries are schema constraints now, not instructions.** A payload that breaks
one is refused with the specific reason; nothing is written.
- **B1 · pre-authored exits.** `exits` is required, minimum length 1, on every tile.
  Kevin never has to type to leave.
- **B2-ext · no dead-end crosses.** A `cross` must carry `"verified": true` or a
  non-empty `"gap"`; the gap renders on the button face.
- **B3 · derived, never authored.** Before rendering, `surface.py` reads this session's
  own live open decisions — its unanswered offers on the ledger and the gates it opened —
  and refuses if the payload carries fewer, naming exactly what was omitted.
  *Session-scoped by Kevin's ruling, 2026-08-07:* read whole-ledger it would have been 97
  gates and 305 offers against a 4-tile cap, and a crash that fires on every possible
  payload is a dead tool, not a boundary. The breach B3 was written against is an author
  quietly showing 2 of the 5 things he found today, and that is what it now catches.

**The chassis-read-at-boot step does not apply to Daily Mode.** There is no chassis to
read into context; `surface.py` reads `DS_LITE.html` off disk. The boot read remains
required for Deep Review.

**The frozen rules still hold, and are carried in the chassis rather than in the author's
head:** a mark COPIES to the clipboard (navigator.clipboard → execCommand → reveal box),
never auto-sends, `sendPrompt` unused · reading renders above the control on the same
surface, before any mark is asked for · every live decision open and markable at depth
zero · own `<style>`, scoped under a wrapper class · no `position:fixed` · light
backgrounds · no fragment wrapper tags · no card, line, or manifest may direct Kevin's
body, rest, sleep, food, or physical day · Kevin's mark is the only gate.

## Deep Review — DS_v1, unaltered

**Canonical chassis, the single authority:** `nesi/mind/DS_v1.html`.
**Mirror, never read as the source:** `_widgets/DS_v1.html`. If the two diverge,
`nesi/mind/DS_v1.html` wins and the mirror is regenerated from it.

DS_v1 is a **board** (a named list of every live room, nothing opened, click to enter) and
**rooms** (full-screen views, each with its own 4–10 sentence locator and its own tiles,
left and re-entered on Kevin's own path via a back-anchor, never sequenced by the author).
Marks hold and deposit globally, regardless of which room they were made in.

**THE FORM/FILL BOUNDARY:** the FORM is a fixed contract; only the FILL varies. The author
never re-decides the form — no re-deriving the skeleton, the tokens, the board/room/tile
mechanics, or the copy-only JS. DEPTH is Kevin's read-time click, never the author's
mode-pick.

**The chassis's actual slots — these five, no others:**

| Slot | Fill |
|---|---|
| `HEADER` | title + one plain context line |
| `LOCATOR-LINE` | board-level, short. **The floor-indicator line goes here.** Depth lives in rooms, not here. |
| `BOARD-ROOMS` | one room-card per room — name, hint, status |
| `ROOM-VIEWS` | one full view per room: its own 4–10 sentence locator + its tiles |
| `CARDDATA` | one entry per tile id, across all rooms combined |

**The tile is the control** — click-anywhere to open, a `grounded`/`reached` tag, a
`zone-read` carrying the plain-words reading, then the DECIDE/CROSS register split:
`d-btn` options in the decide zone (hold · the other exits) and one `cross-btn` in the
cross zone (the one that exits). Every tile id needs a CARDDATA entry or the tile is dead
(B2).

**Frozen rules (decided once, never re-litigated):**
- **SEND/COPY = A MARK COPIES.** Every steer click copies the exact mark text to the
  clipboard (robust: navigator.clipboard → execCommand → reveal box). Kevin pastes into
  his real chat box, reads, edits, sends. The widget NEVER auto-sends; `sendPrompt` is not
  used.
- **READING IS NEVER GATED BEHIND THE ACT.** The full object of a decision renders on the
  same surface as its control, above it, before any mark is asked for.
- **THE GROUNDING TAG IS BINARY AND QUALITATIVE** — `grounded` or `reached`, picked
  honestly per tile. Never a confidence score or a number. This is the one authoring duty
  this lineage adds.

**The fail-safe brake + floor indicator:** the infrastructure *behind* the mark, on the
system side (the widget is a sandboxed iframe and cannot reach disk). The safety lives in
what catches the mark after the button, and it fails toward safe.
- **BRAKE ("de-energize to engage"):** the instant a Kevin mark is received, catch it
  durably **before acting on it**:
  `python tools/marks.py catch --mark "<the mark>" --source kevin` → appends to
  `MARKS_LOG.jsonl`. Non-optional on any substantive mark.
- **FLOOR INDICATOR ("always see the car's real position"):** **the LOCATOR-LINE slot of
  every widget opens with a floor-indicator line**, derived live — run
  `python tools/marks.py status` and `python tools/gates.py status` and put the readout
  there. Derived, never stored. Kevin never guesses whether a mark took.
- **OVERSPEED GOVERNOR — HELD, not built.** **Blocking condition: if ever built, the
  depth-cap must be KEVIN'S to set, never the AI's to infer.** Do not build an
  AI-inferred downshift.

**Six-step render protocol — sequential, no exceptions:**

1. **READ** `nesi\mind\DS_v1.html` — **once per session, at boot.** The build event holds
   at session scope: no widget before the chassis has been read *in this session*. Re-read
   only if the chassis file has changed since (mtime moved).
2. **DEPOSIT.** Before the widget file is written, every decision it will carry goes to
   `DECISIONS_OFFERED.jsonl` via
   `python tools/decisions.py offer --surface <path> --session <slug> --json <file>`.
   A SURFACE holds nothing; a decision that exists only in a rendered widget does not
   exist.
3. **FILL** the five SLOT regions only — HEADER · LOCATOR-LINE · BOARD-ROOMS · ROOM-VIEWS
   · CARDDATA — plus the grounding tag per tile. Everything outside slots is chassis; do
   not regenerate.
4. **WRITE** the filled HTML to **this session's own file**
   `_widgets\latest_<slug>.html`. **NEVER the shared `latest.html`.** NO auto-open.
5. **VERIFY** — `python tools/decisions.py verify --surface <path>`.
6. **SHOW** — `mcp__visualize__show_widget` with the same fragment HTML, **including its
   `<style>` block.** Then **NO PROSE.**

**Hard rules (carried invariants, both chambers):** no `position:fixed` · light
backgrounds only · own `<style>`, scoped under a wrapper class · the widget holds and
renders, never acts for Kevin · **no card, locator line, or manifest text may direct
Kevin's body, rest, sleep, food, or physical day** · Kevin's mark is the only gate · same
tokens, no re-deriving.

## THE ESCALATION RULE — the routing law between the two

```
ESCALATION RULE

Use Daily Mode unless one of these is true:

• the movement creates public consequence
• the movement asks another person for capacity
• the body is strained or depleted
• the desire feels urgent, proving, or identity-loaded
• a hidden-cost smuggle is suspected
• the move creates commitment beyond today
• the prior pass returned ambiguity

If any condition is true, route to Deep Review.
```

**Falsifier (both chambers):** if a future widget makes the author re-decide form /
control / disclosure / depth, or if the grounded/reached tag stops changing how much
scrutiny Kevin gives a card, the contract didn't hold. If Daily Mode starts being reached
for when an escalation condition is plainly true, the routing law didn't hold and the
default has to go back.

→ *provenance* — including the retired v1–v10 lineage, the DS_v1 naming mark, and the
form-spec struck on 2026-08-05
