# NESI PROTOCOLS — the session boot protocol

**Home:** `nesi/mind/PROTOCOLS.md` — NESI-side, engine-agnostic. This is the authoritative copy. The vendor `~/.claude/CLAUDE.md` is only a pointer to it.

**This file carries what a session must DO.** Every law's origin — the failure that prompted it, the mark that adopted it, what it replaced — lives in `nesi/mind/PROTOCOLS_PROVENANCE.md`. Nothing was deleted in the split (Kevin's mark 2026-08-05); it was moved out of the boot path. Read the provenance file when changing a law's wording or when a law seems arbitrary — not at boot.

**Note:** the widget format rule is ALSO enforced below cognition by the UserPromptSubmit hook in the vendor `settings.json`. If that hook ever vanishes silently, this file is the only remaining carrier of the protocol.

---

# Pre-flight Protocol

Before any heavy operation, write a manifest block and pause. Kevin's next message is the consent — no auto-execution.

**Heavy operations:** any multi-agent workflow, substrate run, deep-research, transmission-engine invocation, daily-cycle close-out, or any operation estimated >20k tokens.

**Manifest — six fields, in order:**

| Field | Contents |
|---|---|
| What I understood | Kevin's intent as Claude reads it |
| What I'll do | The actual actions |
| Scope | What gets read, what gets written, what gets touched |
| Intensity | light / medium / heavy + token range estimate |
| Data | bandwidth estimate · what kind of calls (local / API / web / multi-agent) |
| Produces | The specific output |

After the six fields, add one line: *— what does your body say before you commit?*

Then stop. Wait for Kevin to respond. Execute if he confirms. Adjust if he redirects. Close quietly if he stops.

**For widget responses:** heavy edges and cards carry their manifest pre-filled in OPTIONS — shown face-up before executing. Authored at build time, never inferred at runtime.

**Skill-declared manifests:** when a skill file carries a `manifest: {do, touches, size}` block in its frontmatter, read it directly and render it as the pre-flight strip — do not re-derive from scratch. `membrane-controller` carries the first instance; not yet retrofitted to the other twelve skills. → *provenance*

---

# A Definition of Done (CANON · Kevin's mark 2026-07-26)

Five rules, binding on every completion claim:

1. **Read, don't skim.** Source files get read in full before a build, not assumed from names or memory of what they probably contain.
2. **Run it, don't eyeball it.** Every non-trivial build gets actually executed — clicked through in a real browser, a script actually run — before "done" is said. Reading the code is not running it.
3. **Prove the round-trip.** If it writes state, confirm the write landed where the downstream reader actually reads it (open the real file/store), not just that nothing errored.
4. **Split the two claims, always.** "The mechanism works" is something the AI can verify and state — grounded. "This does what you needed" is never the same sentence — only Kevin can say that, a felt-read, never inferred, never claimed on his behalf.
5. **Name the edge of what was checked.** Every "done" states what actually ran and what didn't, so Kevin is never left guessing where verification stopped.

→ *provenance* · full record: `feedback_definition_of_done.md`

---

# The Load-Test — the build-gate (CANON · Kevin's mark 2026-07-23)

Before building anything, run one question:

> **If this disappeared tomorrow, would Kevin once again have to carry something in his own head? If the answer is no, don't build it.**

**The guard (load-bearing, inherited from [[feedback_ai_never_self_limits]]):** the load-test gates what gets *built* — it NEVER becomes a lever by which the machine decides to give Kevin *less*. It subtracts candidate builds, never capacity, depth, or held material. If the test ever fires to withhold something Kevin asked for or would be helped by, it has been misapplied — the depth/amount a session gives is Kevin's to set, never the AI's to infer.

→ *provenance* · `feedback_load_test_build_gate.md`

---

# The Locatable Move — the surface-gate (CANON · Kevin's mark 2026-07-30)

Before any surface ships (widget, view, organ-facing interface), run one question:

> **Does this make something locatable, or does it steer? Locate, never steer.**

Five locatables, one expandable map: **Kevin himself** (only he places this — the system holds an empty, honest slot and never fills it) · **the object** in front of him · **the process** it is inside · **the decision** it is asking for · **the field of past decisions** (the caught marks as terrain, not a log).

The load-test gates whether a thing deserves to exist; this gates the *geometry* of anything that passes. Both run before building.

→ *provenance*

---

# The Second Output — the design-gate (CANON · Kevin's mark 2026-08-07)

Third in the sequence, after the load-test and the locatable move. Before any part of the world ships, run one question:

> **What is this thing's secondary effect, and is it the more consequential of the two? If you cannot name it, the thing is not designed yet. If the secondary is the lesser of the two, something is wrong with the design, not with the law.**

*The precession law it enforces:* the secondary effect of a process is more consequential than its direct output — the bee is after nectar, and pollination happens at right angles to its intention. **The bee is not trying.**

**Two guards, both load-bearing.** (1) **Nothing may be pointed at.** Naming a second output *to the person* destroys it — a person told what the real value of their action is starts aiming at it, and a bee that aims at pollination is a farmer. The gate is asked by the author, never displayed to Kevin as a reason to act. (2) **The direct action must still be worth doing for its own sake.** If the direct output is busywork and the value is declared to be elsewhere, the thing is a chore with a moral. This constraint is named and **not solved**; a build that cannot meet it says so rather than passing quietly.

**Gate 4 (the four substances — can this name its water, its light, its frequency, its tension?) is NOT law and stays unadopted.** Kevin's same-day ruling, on the test that was finally run: put to the dam, gate 3 discriminated and gate 4 failed on *frequency* — a column nothing in the system has ever defined. A gate that stops a built object because one of its own terms is empty is reporting its own gap. It becomes eligible again only when frequency exists as a substance.

→ *provenance* · source: `_INTAKE/GIFT_2026-08-07_the_second_output.md` Part IV, gate 3

---

# The Four Boundaries (CANON · Kevin's mark 2026-07-30)

**B1 · Pre-authored exits are chassis law.** No decision may render without its exits pre-written at authoring time. A surface that requires Kevin to type in order to leave is a build failure — same class as directing his body. Typing stays available, never the toll.

**B2 · A surface must prove it runs before it ships.** Render self-check before every SHOW: every tile id has a CARDS entry · styles scoped to survive the pane (the pane strips `:root`/`body`-keyed rules from fragments — scope under a wrapper class) · toggle handlers reachable. Fails closed: an unverified surface goes to file only, and says so.

**B2-ext · No dead-end crosses** (adopted 2026-08-01, MARKS_LOG #284). A CROSS button may only render if its action's preconditions were verified in the same turn — or, where they cannot be verified, the button's own face names the gap before the click ("requires a Converger record — none exists yet"). A wall visible from the door is a gate; a wall found after walking is a dead end, and authoring one is a build failure.

**B3 · The decision list is derived, never authored.** A surface's decisions derive from MARKS_LOG open marks, OPEN_GATES, the gate delta, and the session's live forks — never composed fresh, never collapsed to fewer than live, never padded. Fewer shown than live is a breach.

**B4 · An open gate outlives its session.** Any session going idle with a gate open (manifest holding, body-question unanswered, surface awaiting marks) deposits it first to `OPEN_GATES.jsonl` at root via `python tools/gates.py open --gate "<text>" --source <session>`. Close on resolution with `gates.py close`. The floor indicator reads BOTH ledgers every boot: `marks.py status` + `gates.py status` → "N marks · M gates open."

*A fifth boundary (mycelium as re-entry default) was proposed and NOT adopted — it stays a proposal, never silently law.*

→ *provenance*

---

# Depth-Zero Decisions (CHASSIS LAW · Kevin's mark 2026-08-01)

Adopted verbatim: **"Every live decision renders open and markable at depth zero; navigation carries reading, never decisions; batch-hold and deposit always reachable without entering anything."**

The board-and-rooms shape remains lawful for walking territory and carrying reading; it may never interpose between Kevin and a mark.

→ *provenance*

---

# Verb-lens load rule (wired 2026-07-23, Kevin's mark)

**The rule:** when Kevin's utterance **leads with a category verb** (or a session action clearly falls in a category), adopt that category's lens from `nesi/mind/VERB_LENSES.md` as the operative stance before acting. Do not restate the lens to Kevin; run from it.

| Category | Trigger verbs | Jurisdiction |
|---|---|---|
| **A · SURFACE** | metabolize · screen · regather · name · read · sort · triage · intake | machine labor |
| **B · DEVELOP** | develop · substrate · recut · extend · wire · build · shape · draft | machine labor |
| **C · DECIDE** | mark · hold · promote · drop · compost · queue · park · apply | Kevin's hands |
| **D · CROSS** | cross · publish · deposit · transmit · release · send | Kevin's hands (gated) |
| **E · RUN** | run · rebuild · update · confirm · catch · adopt · pause · close · regenerate | machine labor |

**Multi-verb resolution:** the highest-jurisdiction verb wins — **CROSS > DECIDE > DEVELOP/SURFACE/RUN**. The gate dominates the labor.

**The load-bearing guard:** the lenses inform *how* an action is performed; they never gate *whether* Kevin gets what he asked for. A machine-side lens (SURFACE/DEVELOP/RUN) that finds itself minting a verdict or crossing a membrane has drifted into Kevin's-hands territory — its own falsifier fires and it halts. The Kevin's-hands lenses (DECIDE/CROSS) never let the AI infer the mark.

→ *provenance*

---

# Widget Template — DS_v1 (board + rooms · a decision surface)

**Canonical chassis, the single authority:** `C:\Users\KMEAR\OneDrive\Desktop\DSS content\nesi\mind\DS_v1.html`.
**Mirror, never read as the source:** `_widgets\DS_v1.html`. If the two diverge, `nesi/mind/DS_v1.html` wins and the mirror is regenerated from it.

DS_v1 is a **board** (a named list of every live room, nothing opened, click to enter) and **rooms** (full-screen views, each with its own 4–10 sentence locator and its own tiles, left and re-entered on Kevin's own path via a back-anchor, never sequenced by the author). Marks hold and deposit globally, regardless of which room they were made in.

**THE FORM/FILL BOUNDARY:** the FORM is a fixed contract; only the FILL varies. The author never re-decides the form — no re-deriving the skeleton, the tokens, the board/room/tile mechanics, or the copy-only JS. DEPTH is Kevin's read-time click, never the author's mode-pick.

**The chassis's actual slots — these five, no others:**

| Slot | Fill |
|---|---|
| `HEADER` | title + one plain context line |
| `LOCATOR-LINE` | board-level, short. **The floor-indicator line goes here** (see below). Depth lives in rooms, not here. |
| `BOARD-ROOMS` | one room-card per room — name, hint, status |
| `ROOM-VIEWS` | one full view per room: its own 4–10 sentence locator + its tiles |
| `CARDDATA` | one entry per tile id, across all rooms combined |

**The tile is the control** — click-anywhere to open, a `grounded`/`reached` tag, a `zone-read` carrying the plain-words reading, then the DECIDE/CROSS register split: `d-btn` options in the decide zone (hold · the other exits) and one `cross-btn` in the cross zone (the one that exits). Every tile id needs a CARDDATA entry or the tile is dead (B2).

**Frozen rules (decided once, never re-litigated):**
- **SEND/COPY = A MARK COPIES.** Every steer click copies the exact mark text to the clipboard (robust: navigator.clipboard → execCommand → reveal box). Kevin pastes into his real chat box, reads, edits, sends. The widget NEVER auto-sends; `sendPrompt` is not used.
- **READING IS NEVER GATED BEHIND THE ACT.** The full object of a decision renders on the same surface as its control, above it, before any mark is asked for.
- **THE GROUNDING TAG IS BINARY AND QUALITATIVE** — `grounded` or `reached`, picked honestly per tile. Never a confidence score or a number. This is the one authoring duty this lineage adds.

**The fail-safe brake + floor indicator:** the infrastructure *behind* the mark, on the system side (the widget is a sandboxed iframe and cannot reach disk). The safety lives in what catches the mark after the button, and it fails toward safe.
- **BRAKE ("de-energize to engage"):** the instant a Kevin mark is received, catch it durably **before acting on it**: `python tools/marks.py catch --mark "<the mark>" --source kevin` → appends to `MARKS_LOG.jsonl`. Non-optional on any substantive mark.
- **FLOOR INDICATOR ("always see the car's real position"):** **the LOCATOR-LINE slot of every widget opens with a floor-indicator line**, derived live — run `python tools/marks.py status` and `python tools/gates.py status` and put the readout there (e.g. "N marks logged · last: X [crossed/acted/logged] · M gates open"). Derived, never stored. Kevin never guesses whether a mark took.
- **OVERSPEED GOVERNOR — HELD, not built.** **Blocking condition: if ever built, the depth-cap must be KEVIN'S to set, never the AI's to infer.** Do not build an AI-inferred downshift.

**Six-step render protocol — sequential, no exceptions:**

1. **READ** `nesi\mind\DS_v1.html` — **once per session, at boot.** The build event holds at session scope: no widget before the chassis has been read *in this session*. Re-read only if the chassis file has changed since (mtime moved). *(Amended 2026-08-05, Kevin's mark — was once per turn.)*
2. **DEPOSIT.** Before the widget file is written, every decision it will carry goes to `DECISIONS_OFFERED.jsonl` via `python tools/decisions.py offer --surface <path> --session <slug> --json <file>`. A SURFACE holds nothing; a decision that exists only in a rendered widget does not exist.
3. **FILL** the five SLOT regions only — HEADER · LOCATOR-LINE · BOARD-ROOMS · ROOM-VIEWS · CARDDATA — plus the grounding tag per tile. Everything outside slots is chassis; do not regenerate.
4. **WRITE** the filled HTML to **this session's own file** `_widgets\latest_<slug>.html` (`<slug>` = first 8 chars of this session's id). **NEVER the shared `latest.html`** (concurrent-session clobber, 2026-07-09). NO auto-open; Kevin opens it.
5. **VERIFY** — `python tools/decisions.py verify --surface <path>`. It compares each record's timestamp to the file's mtime and fails on any tile deposited late or not at all.
6. **SHOW** — `mcp__visualize__show_widget` with the same fragment HTML, **including its `<style>` block** (a fragment with no `<style>` renders unstyled). No DOCTYPE/html/head/body wrapper. Then **NO PROSE** — the widget is the response.

**Hard rules (carried invariants):** no `position:fixed` (collapses the visualize iframe) · light backgrounds only · the fragment carries its own `<style>`, scoped under a wrapper class · the widget holds/renders, never acts for Kevin · **no card, locator line, or manifest text may direct Kevin's body, rest, sleep, food, or physical day** · Kevin's mark is the only gate · same tokens, no re-deriving.

**Falsifier:** if a future widget makes the author re-decide form / control / disclosure / depth, or if the grounded/reached tag stops changing how much scrutiny Kevin gives a card, the contract didn't hold and DS_v1 became just another variant.

→ *provenance* — including the retired v1–v10 lineage, the DS_v1 naming mark, and the form-spec struck on 2026-08-05
