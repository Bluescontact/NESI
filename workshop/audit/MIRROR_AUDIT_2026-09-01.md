# Mirror Audit — NESI repo (/root/dev-run/nesi-repo)

Deep Review. Auditor: the gamification mirror. Artifact: the whole repo — game surface
(`game/index.html`, `game/solid.js`), builder's gate (`workshop/game-gate/`), open ledger
(`house/open-ledger/`), plus `index.html` / `weave.html` skimmed for mechanics only.
Single-operator system: the keeper is player, builder, and metric owner on nearly every
surface. Per the missing-middle rule, that clears nothing — the cash question still governs:
does each mechanic's yield settle into the writing/reflection movement itself, or into a
meta-metric the mechanic feeds?

---

## Mechanic entries

### 1 · The sentence tally (the padhint)
`game/index.html:448` — `"0 sentences · placed by idle time and length alone — your words stay yours"`; `hintText()` at :756–761 re-renders the count after every save.
- **Jurisdiction:** invented by the builder, who is the player. Metric owner: the keeper.
- **Reduction:** a bare accumulating count — validation-lite, Kelly's first item.
- **Cash:** localStorage only; nobody aggregates it; the same line doubles as the
  persist-failure warning channel (`the last save didn't land`), which is real work.
- **Giraffe:** write "a giraffe walked through the kitchen." The count increments; nothing
  judges it. Absorbed.
- **Verdict: DECORATES.** Not because it extracts — it doesn't — but because it is exactly
  the object the same page's own displayed law forbids. `CASE_CONSTRAINTS` at :610–613,
  rendered to the player in the TAB panel: *"No number reaches you. No tally, count, rank,
  percentage, or a bar that fills as you go."* The tally is a count, on that surface, and it
  does not transform writing into anything; it decorates it with an odometer. Small yield,
  but the mechanic-as-built falsifies the constraint-as-displayed.

### 2 · The Burn / overread
`game/index.html:730–732` (`OVERREAD_AT = 5`, `attentionCount`, `overreadIds`), counter incremented in the dwell handler at :1235–1244, CSS state at :128 (`opacity:.58; filter:saturate(.35)` — "dimmer, flatter, permanent").
- **Jurisdiction:** invented by the builder for himself; explicitly a test — "the smallest
  test of 'does sustained attention as an irreversible mark mean anything'" (:122–128).
- **Reduction:** not validation/completion/prizes — a hidden counter with an irreversible
  threshold state. No number is ever shown; only the quality change.
- **Cash:** the player's own page; `attentionCount` persists in localStorage, is verified by
  the projection log, and is read by nothing outside the page.
- **Giraffe:** hover on one sentence six times out of pure fondness. At the fifth dwell it
  permanently dims and desaturates — "no decay, no self-heal" (:727–729). The mark is not
  named failure, but playful rereading permanently reduces the legibility of the player's
  own writing, and there is no way back inside the mechanic (only localStorage surgery, i.e.
  leaving the game to undo the game). The giraffe is absorbed *as a scar*.
- **Verdict: BOUNDARY.** The file's own comment names the fork open ("tested small before
  any fuller station is built"). Yield settles on the player; nothing extracts. But the
  giraffe result is the ambiguous case the definition warns about — re-run this one when
  the fuller station exists. If a fuller build ever *reads* overread counts as anything
  (a diligence signal, a "most-worn sentences" surface), it becomes severed ludus.

### 3 · The world ground — "N/12 seated"
`game/index.html:2084` (`"<b>N</b>/12 seated"`), partial-state readout at :2167–2169 ("X of 24 edges real so far, X of 8 triangular faces…"), volume revealed only at 12/12 (:2163–2165). `toggleWorldPick` :2013–2019.
- **Jurisdiction:** invented, keeper-owned; the geometry is `solid.js`'s real solid, not a
  progress skin.
- **Reduction:** completion-shaped on its face (a fill-the-seats counter with a reveal at
  full completion — Kelly's second item).
- **Cash:** the player; picks persist locally, un-pick is one click and free
  (`pick_remove` logged, nothing lost), and the partial state is ruled "an honest gap,
  same as an open aperture" — a correct state, not a deficiency.
- **Giraffe:** seat three nonsense sentences and unseat them again. Free, unscored,
  reversible; the room just redraws. Absorbed.
- **Verdict: TRANSFORMS.** The seating genuinely turns sentence-picking into a spatial
  act on a real 12-vertex solid; the counter reports the game rather than being it. The
  redemption is structural: exit without penalty, incomplete ruled lawful.

### 4 · The score ground
`game/index.html:2252–2342` — strokes by word count, silences as blank width, three sieves, click-to-jump. The comment records that `refusal_check` refused the name "score" outright, the ground shipped as "trace", and the keeper made a narrow exception in his own words.
- **Jurisdiction:** invented; keeper-owned.
- **Reduction:** despite the name, no points — heights are word counts, sieves are pure
  structural filters, nothing accumulates, nothing targets.
- **Cash:** the player's own recall ("a half-remembered sentence can be found by
  structural memory").
- **Giraffe:** toggle all three sieves and click strokes at random. Nothing scores it;
  blind strokes deliberately "answer nothing." Absorbed.
- **Verdict: TRANSFORMS.** And the crossing history (the gate refusing its own builder,
  the keeper ruling, the narrow exception) is the refusal apparatus working as built.

### 5 · Derived-structure displays — charge underline, hinge border, gift-tetra volume
`nodeCharge()` :923–928 rendered at :1215–1218; hinge (windowed cut-vertex, `WINDOW_DAYS=21`) :944–948, :1078–1087; tetra volume note :1641–1649 ("Relative to this anchor's own spread only, never comparable across sentences").
- **Jurisdiction:** invented; keeper-owned. **Reduction:** readings, not rewards — no
  accumulation, no rank, each number explicitly non-comparable. **Cash:** the player.
  **Giraffe:** drag cards into a giraffe silhouette — `userMoved` is "recorded … and never
  interpreted, never shown as a signal" (:56–63); the layout keeps your giraffe. Absorbed,
  by design comment. **Verdict: TRANSFORMS** (the drag-persistence-without-interpretation
  is play headroom written into the persistence layer itself).

### 6 · The justarrived flash and the "sure?" delete arm
`.justarrived` :120, cleared after 1.5s at :857–858 and :911; two-click delete :1311–1321.
- **Jurisdiction:** invented; keeper-owned. **Reduction:** a 1.5s gold acknowledgment on
  every banked sentence — an acknowledgment construct on a page whose constraint list says
  "No confirmation toast, chime, or acknowledgement construct anywhere in this build"
  (:620–622). Readable as orientation (where did my sentence land) rather than reward.
  **Cash:** none; nothing persists. **Giraffe:** n/a — nothing to subvert; it fires
  identically for every sentence. **Verdict: BOUNDARY.** Orientation and reward-cue are
  indistinguishable at this size; the tension with the displayed law is named, not ruled.

### 7 · The anti-mechanics — blind mode, tombstones, filter motes, garden, tarp
Blind :447, :837–850; tombstones :695–708; the filter's "SET IT DOWN" exit :1917–1920 ("no destination, no animation, no confirmation… the mote leaves the tray and nothing happens", player-facing note :511: "Dropping one anywhere costs it nothing and reads nothing back"); garden :1971 ("no fitness, no target… running this again changes nothing"); tarp :2008 ("No text, no label, no number, anywhere").
- One line, as instructed for surfaces without real mechanics: these are not mechanics but
  the deliberate absence of them — the "set it down" exit is a built-in landing zone for
  the giraffe, the rare case of paidia headroom constructed on purpose. No verdict rows.

### 8 · solid.js
Pure derived geometry; its own header: "NO NUMBER IN HERE REACHES THE PLAYER" (:34–35).
No mechanic surfaces here. One line: no mechanics; nothing to verdict.

### 9 · The gate verdict — pass / refuse / held / vacuous / void
`workshop/game-gate/gate/gate.mjs:141–163` (verdict + exit codes), self-append at :167–190, admissions printed before refusals at :193–204 ("a run summary that opens with failures teaches the reader that the best available outcome is nothing going wrong").
- **Jurisdiction:** imposed by the builder on the builder; "BUILDER'S GATE, not player's
  surface. No gate event has a player projection" (:16–18).
- **Reduction:** not validation — every refusal must carry a ground and a return date;
  every admission must carry `--made`; a cost-free instrument voids the whole run.
- **Cash:** LEDGER.jsonl, read by the instruments and the keeper. Notable and to the
  gate's credit: the 2026-08-24 compaction header admits 123 of 134 ledger lines were
  gate-run self-logging that *no instrument reads* — the gate's own scorekeeping was pure
  exhaust and was composted with a receipt. (It is accumulating again; the tail shows
  fresh gate-run entries.)
- **Giraffe:** run the gate for no reason at 3 a.m. It appends one more unread gate-run
  line and exits. Absorbed, at the cost of ledger silt.
- **Verdict: TRANSFORMS.** The win-state is deliberately not "nothing went wrong" but
  "something landed," which is the anti-decoration inversion.

### 10 · 06-landed — the admitted-in-window count
`instruments/06-landed.mjs`; current reading in the ledger tail: `"126 admitted in 30d"`, printed green on every run. Its own comment: "an instrument that refused a quiet fortnight would be a productivity meter wearing a constitution."
- **Jurisdiction:** self-imposed; keeper-owned.
- **Reduction:** an accumulating count, displayed every run — the one number in the whole
  system that only goes up.
- **Cash:** nothing mechanically consumes the count (no threshold reads it). But the
  missing-middle question bites here: the only counter-force to monotone growth,
  05-subtract, is HELD — "0 subtraction pass(es) are on record; proposed cadence 14d is
  not enforced" (gate-run tail; `STANDING.json` heldCandidateMechanisms). 05-subtract's
  own header names the disease: "any list grows monotonically while its accuracy falls
  monotonically." The admission counter is live and green; the subtraction quota has never
  once run. MARKS.jsonl also shows the count can be pumped in bulk: fourteen retroactive
  gift-admissions landed in one seven-minute burst (2026-08-28T00:07–00:14).
- **Giraffe:** admit "giraffe" `--made "a giraffe now lives at the gate" --at README.md`.
  admit.mjs accepts it (the path exists); 06-landed counts it. Absorbed — nothing
  distinguishes a playful mark from a load-bearing one, which cuts both ways.
- **Verdict: BOUNDARY.** Today a fact-report with explicit anti-target design (no refusal
  on low, held-is-lawful). It becomes DECORATES the day the count is read as the build's
  pulse — and with 05-subtract held and the mark-stream at 126/30d against nine
  never-routed organs (entry 11), the facts are drifting toward that day. Re-run when
  05-subtract's fork closes.

### 11 · 02-selfuse — the routing window
`instruments/02-selfuse.mjs:1–18`: "Self-use is the only health metric… did I route through this in the last N days?" `gate.conf: selfuse_window_days = 14`. Current reading (ledger tail): `"3/12 live; cold and untouched: FILTER, STATIONS, GROUND, DEEP, HELIOSTAT, OVERWINTERING, LENS, GARDEN, SEATING (never routed)"` — status: pass.
- **Jurisdiction:** self-imposed; keeper-owned.
- **Reduction:** streak-shaped on its face (keep routing or be flagged) — but inverted:
  it rewards nothing and only *blocks spending effort on organs life has stopped routing
  through*. The anti-Duolingo: the streak protects the player from the build, not the
  build's engagement numbers from the player.
- **Cash:** the keeper's honesty about which organs are alive. One tension worth naming:
  `gate.mjs:79–88` runs `deriveRoutes()` first, machine-appending route events from
  seat-visits.json — a machine incrementing the self-use signal, the exact class 01-motion
  disqualifies ("any signal a machine can increment is disqualified from meaning life").
  It derives from recorded hand-visits, so it is borderline, but the seam exists.
- **Giraffe:** `node instruments/02-selfuse.mjs route GARDEN` for fun. One appended line;
  the organ reads "live" for 14 days on a joke. Absorbed — and it demonstrates the metric
  is trivially satisfiable by its owner, which in a one-person system is disclosure, not
  fraud.
- **Verdict: TRANSFORMS.** With the standing fact stated plainly: the health metric
  currently reports nine of twelve organs never routed through, and the meta-layer
  (entry 10) is thriving anyway. The instrument is working; the reading is the finding.

### 12 · 07-magnitude — the two-mark threshold
`instruments/07-magnitude.mjs`; `gate.conf: magnitude_threshold = 6`. Magnitude is self-declared 1–10; above 6, a change "cannot close on the sitting that proposed it."
- **Jurisdiction:** self-imposed. **Reduction:** a leveling threshold, but it gates rhythm
  (one sitting vs. two), not reward. **Cash:** the keeper's own second look. **Giraffe:**
  propose "acquire a giraffe" at magnitude 10 — the gate holds it for a second sitting,
  then lets it land. The mechanic solemnly absorbs the joke. **Verdict: TRANSFORMS.**

### 13 · 01-motion — bot ceiling and strut trailers
`instruments/01-motion.mjs`; `motion_bot_ceiling = 0.85`, `strut:` trailer declared never derived; source finding Listory (1,870 of 2,144 commits by bots, graph green into the archive).
- **Jurisdiction:** self-imposed. **Reduction:** none — it exists to refuse a gamed
  progress signal. **Cash:** the keeper. **Giraffe:** commit with trailer
  `strut: the repo can now be walked by a giraffe` — the instrument checks only grammar,
  and its own comment accepts this: a fourth rearticulation "has to write a sentence it
  cannot honestly fill in." The giraffe passes; the shame is the enforcement. Absorbed.
  **Verdict: TRANSFORMS** — this is the calibration table's target-gaming record
  internalized as an instrument.

### 14 · KEYS.txt — the blank-assertion keys
`gate/KEYS.txt`: `marks-installed`, `gates-closed`, `struts-moved`, `cards-refused` — four count-shaped keys awaiting dated assertion; 03-blanks HELD ("whether blanks get asserted, and where" — open fork, `STANDING.json`).
- **Jurisdiction:** self-imposed, unenforced. **Reduction:** these are the missing
  middle's exact objects — meta-metrics of compliance with the system (marks installed,
  gates closed) rather than of the writing the system exists for. **Cash:** nothing yet;
  the fork is open. **Giraffe:** not runnable — no enforcement to play inside.
- **Verdict: BOUNDARY.** Named so it is re-run if the fork closes with these keys live:
  a dated tally of gates-closed is a compliance streak, whoever owns it.

### 15 · The crystal-degree tally and the twelve-around-the-VE target
`weave.html`, the line under "The strands": *"Declared crystal degrees today: c1:1 · c2:2 · c3:1 · c4:1 · c5:0 · c6:1 · c7:1 · c8:1 · c9:0 · c10:0 · c11:0. The held twelve-around-the-VE hypothesis needs every crystal at exactly four, arrived at without aiming — this line is data, never a target."* Fed by `gate/DECLARATIONS.jsonl` via `declare.mjs` — the one channel where the writer's own judgment enters the structure.
- **Jurisdiction:** invented by the builder; the metric feeds a hypothesis the keeper
  holds as theorist. Same person, two hats — and the missing middle says that is exactly
  where to look.
- **Reduction:** a per-crystal tally with a *named winning configuration* (every crystal
  at exactly four). This is a scoreboard with the high score printed on it and an
  instruction not to aim.
- **Cash:** here the yield does NOT settle into the reflection. A declaration's yield as
  a declaration is the relation named in the hand's own words. This line harvests the
  same stream into a second product: evidence-per-crystal toward the twelve-around-the-VE
  claim. The declaring hand feeds a meta-metric the declaring hand also wants to see
  reach a specific shape. The "never a target" disclaimer is instruction, not structure —
  and this artifact's own open-ledger doctrine rules on exactly this: "A frame held by
  instruction breaks the moment the instructor leaves… the spine lives in the schema,
  not the onboarding" (`THE_OPEN_LEDGER.md:13`). By the repo's own law, a displayed count
  with a stated ideal, restrained only by a sentence asking you not to aim, is a broken
  frame. Bevan & Hood is the record for what happens next to a published number with a
  known target.
- **Giraffe:** declare a whimsical relation touching c5 ("c5 — reminds me of a giraffe's
  neck — some mark"). The strand renders; c5's degree ticks from 0 toward the needed 4.
  The giraffe has nowhere to land *uncounted* — every act of play in the declaration
  channel is conscripted as evidence for the hypothesis. Severed ludus at the tally,
  even though the strands themselves remain free text.
- **Verdict: DECORATES.** The strand-declaring TRANSFORMS (free-text relations, receipts,
  append-only); the degree line decorates that activity with a target-shaped tally, and
  it is the one mechanic in the artifact whose yield visibly settles into a meta-metric
  rather than the activity.

### 16 · Open ledger — states, incapacities, the Brake
`schema.ts` (`State = 'gap' | 'flowing' | 'resting'` — "There is no 'complete', no 'paid', no 'settled'"), `SCHEMA.sql:40–41` ("no standing / score → nothing here can rank, type, or profile a person"), Brake at `circuit.html:175–181` ("A ceiling… set from the body, not from paper. It trips into warning when more is flowing than you can hold").
- **Jurisdiction:** designed by the keeper for a village of strangers — the one surface
  here whose future players are not its builder. **Reduction:** none: the design is the
  *removal* of validation, completion, and prizes at the schema layer (no balance, no
  recipient, no amount, no decline log, no role). **Cash:** structurally nowhere — the
  five incapacities make the extractive reads unwritable; `demo.html`'s whole game is
  failing to break the frame. **Giraffe:** post "need: a giraffe, weight: one long neck"
  — it lands as a signal, binds no one, types no one, and can rest and re-open forever.
  Absorbed completely. The Brake: set ceiling 0 as a joke, everything warns, clear it —
  absorbed. **Verdict: TRANSFORMS** — and it is the artifact's own best statement of
  the standard entry 15 fails: incapacity in the schema, not a disclaimer in the prose.

### 17 · Root index.html and weave.html (as surfaces)
Root index: corpus map with recurrence counts per crystal ("the recognition law · 15") and invocation counts — descriptive stats about the corpus, not about a player's performance; no thresholds, no targets stated. One line: no mechanics beyond entry 15, which lives on weave.html.

---

## Closing

### Recurring finding — the disclaimed tally
The same pattern appears in five places, which is past the three-instance escalation
threshold: a displayed count accompanied by a sentence asking the reader not to treat it
as what it is. The sentence tally under a law that says no tally reaches you (entry 1);
the categories ground's stat cards closing with "read these as what they are: a count,
not a verdict" (`game/index.html:2239`); "N/12 seated" softened by "an honest gap"
(entry 3); "126 admitted in 30d" under a comment refusing to be a productivity meter
(entry 10); and "this line is data, never a target" over a tally with a named ideal
(entry 15). Individually most survive their checks. As a pattern, the artifact's
characteristic move is to ship the number and neutralize it with prose — while its own
strongest component (the open ledger) demonstrates the correct move, which is to make
the number unwritable. Spontaneous disclaiming stays local; this recurrence makes it a
standing agenda item: the numbers that matter should be removed the way the open ledger
removes them, or owned as mechanics the way the burn is owned.

### The pleasant-smuggle check
Answered, and the answer is **yes, partially**. This artifact is the most pleasant
self-accounting apparatus this auditor has reviewed: every mechanic ships with a
first-person cost, a provenance, a named fork, and an honest-gap ruling. That pleasure
has a function. The arrangement underneath is: one person's writing practice feeding a
meta-layer of marks, declarations, gate-runs, and weave-strands — and the meta-layer's
throughput (126 admissions in 30 days, 78+ strands, a fresh gate-run tail) now dwarfs
the base activity by the system's own health instrument, which reports nine of twelve
organs of the actual game never routed through (entry 11). Operating the accounting
layer *feels like* the reflective practice — the refusal vocabulary is itself the
reward — and that pleasantness is precisely what lets "the game is mostly unplayed
while the ledger thrives" escape review. The instruments that would surface this exist
(02-selfuse says it plainly every run; 05-subtract would prune the growth) — one is
being read as a pass-line, the other has never run.

### Ending

**DECORATION FOUND**

Ordered by how much of the artifact's yield flows through each:

1. **The crystal-degree tally with the twelve-around-the-VE target** (`weave.html`,
   entry 15) — harvests the entire declaration stream, the one channel of the writer's
   own judgment, into a target-shaped meta-metric restrained only by a disclaimer the
   repo's own doctrine says cannot hold.
2. **The sentence tally** (`game/index.html:448`, entry 1) — small, constant, and in
   direct contradiction of the constraint panel displayed on the same page; every
   sentence written flows through it, and it transforms nothing.

BOUNDARY, on the record and blocking nothing: the burn (entry 2), the justarrived flash
(entry 6), 06-landed's count while 05-subtract stays held (entry 10), and the KEYS.txt
compliance keys (entry 14). Re-run each when its named fork closes.

The mark is the operator's.
