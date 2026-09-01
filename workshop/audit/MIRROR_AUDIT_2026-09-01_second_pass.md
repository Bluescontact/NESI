# Mirror Audit — NESI public deposit (second pass, @ aaabc46)

Deep Review, follow-up to `MIRROR_AUDIT_2026-09-01.md` (that report's entries
stand where the mechanic is unchanged; this report covers what moved and what
is new). Single-operator system; per the missing-middle rule that clears
nothing — the cash question governs every entry.

---

## A · The prior findings, re-verified against source

### A1 · The sentence tally (prior entry 1, DECORATES)
`game/index.html:756–764`. **Removed at source.** `hintText()` now returns
only the persist-failure warning or the placement note; the count is gone,
and the removal carries the audit citation in a comment. Residual mechanic:
none — the surviving line is a failure channel, which was the real work all
along. Finding closed.

### A2 · The crystal-degree tally with the twelve-around-the-VE target (prior entry 15, DECORATES)
`weave.html`, comment block after the strands. **Removed at source.** The
display is gone; the comment states the degrees "remain derivable from
gate/DECLARATIONS.jsonl by a deliberate query." Residual: the data still
exists, but a number you must run a query to see is not a displayed target —
this matches the open-ledger standard the prior audit held up (make the
number unwritable/unreadable at the surface, don't disclaim it). The VE
hypothesis itself is now an OPEN entry in HELD.md with its no-aiming
condition stated. Finding closed; the hypothesis stays watchable there, not
here.

### A3 · The three standing numeric displays (day-header count, N/12 seated, of-12/of-24 note)
Confirmed absent from `game/index.html` (no "/12", "of 24", "of 8" strings
survive; the world SVG keeps only a non-counting aria-label). Residual
mechanics: **one** — the categories-ground stat cards' closing note at
`game/index.html:2239` ("Read these as what they are: a count, not a
verdict") still ships a set of counts neutralized by prose. It was never
separately verdicted; it is now the last surviving instance of the
disclaimed-tally pattern. As a lone instance: jurisdiction keeper;
reduction: descriptive stats, no target, no accumulation toward anything;
cash: the player's own curiosity; giraffe: absorbed (nothing scores).
**Verdict: TRANSFORMS**, narrowly — but it is the pattern's remnant and is
named again in the closing.

### A4 · The four prior BOUNDARY items — forks checked, none closed
- **The burn** (`OVERREAD_AT = 5`, :726–730, dwell handler ~:1239):
  unchanged; no fuller station exists; nothing reads overread counts. Fork
  open. **BOUNDARY stands.**
- **The justarrived flash** (:120, :178, :1201): unchanged. **BOUNDARY
  stands.**
- **06-landed vs. 05-subtract held**: fork NOT closed and drifting further.
  Latest gate-run (2026-09-01T20:10) reads `"129 admitted in 30d"` (was
  126); 05-subtract still reports **"0 subtraction pass(es) are on
  record"**; STANDING.json still holds it as candidate. Six gate-runs
  logged on 2026-09-01 alone, resuming the self-logging silt the compaction
  receipt once composted. **BOUNDARY stands, facts still moving toward the
  DECORATES condition the prior audit named.**
- **KEYS.txt compliance keys**: file unchanged, four count-shaped keys,
  03-blanks still held ("blank assertion is not installed"). Fork open.
  **BOUNDARY stands.**
- New in the ledger since: **09-dispute** (held, "1 dispute(s) on record,
  0 still open," fork "what a dispute is allowed to change"). No
  enforcement, no display, no player surface. **BOUNDARY** — re-run when
  its fork closes.

---

## B · New surfaces

### B1 · HELD.md — the CLOSED / OPEN register
- **Jurisdiction:** imposed by the keeper on the deposit's own claims;
  metric owner: the keeper; readers: the public.
- **Reduction:** state labels, not tallies. No count, no bar, no
  percentage; CLOSED entries carry the decision and the keeper's quoted
  instruction; OPEN entries carry the condition that would close them — a
  HOLD-with-named-condition, the Converger's own lawful state, not a to-do
  list.
- **Cash:** the reader's orientation about what the deposit does and does
  not claim. Nothing aggregates entries.
- **Giraffe:** propose a whimsical held item ("HELD — whether a giraffe
  fits through the membrane"). The register's grammar absorbs it: it needs
  only a named condition, and it can sit open forever without penalty;
  closure is a decision, not a win.
- **Verdict: TRANSFORMS.** One observation on the record, not a verdict:
  all five CLOSED entries were held and resolved the same day, on the
  same-day instruction — a "held" state whose median lifetime is hours
  functions as a build log wearing a register's clothes. If that tempo
  continues, CLOSED becomes a completion feed; today it is one day's honest
  record.

### B2 · The landing-clean six-line checklist (`house/membrane/03_THE_OUTWARD_TRANSFORM.md`, half two)
- **Jurisdiction:** imposed by the keeper on items crossing outward; metric
  owner: the keeper; beneficiary: the stranger-reader.
- **Reduction:** completion-shaped (six boxes, all must hold) — Kelly's
  second item on its face. Redemption check: each line is a substantive
  falsifiable test, failure returns the item "with the failing line named,"
  there is no partial credit, no score, no count of crossings, and the
  document carries its own falsifier (every question a corpus-naive reader
  must ask is a signed-off line that did not hold).
- **Cash:** the yield settles on the reader outside the system — the rare
  mechanic here whose beneficiary is structurally not its owner.
- **Giraffe:** push a nonsense item at the checklist. It fails line 4 and
  goes back to the workshop; nothing is punished, nothing tallied, the
  workshop absorbs it.
- **Verdict: TRANSFORMS** — a gate with a return path, not a completion
  meter. It becomes decoration only if anyone ever displays "N items
  crossed clean," which nothing currently does.

### B3 · The genesis seed's internal states (GENESIS_SEED_v4.md — STOP/COMPOST/HOLD/PROMOTE-READY, the Governor's stop-signals, the Converger ceiling, the refusal register)
These are game-adjacent mechanics (states, timers, thresholds, a "scored
against four gates" clock rule) installed in a non-game surface, imposed on
the **AI**, not on a human player.
- **Jurisdiction:** imposed by the document's author on any AI that loads
  it; metric owner: the user running the session.
- **Reduction:** not validation/completion/prizes — every state is a brake
  or a routing, and the document's most game-like number (the Converger's
  ceiling of 3, bias to 1) is a cap, not a score. Two timer-shaped parts
  exist: the 4-hour timed floor and "one offering per day scored against
  four gates" (§IV DAILY). The word "scored" is the seam — but the four
  gates are qualitative checks and the yield of the scoring is *fewer*
  offerings, settling on the body.
- **Cash:** the user's body and attention. The seed's explicit law is that
  the one metric that matters (the felt-gate) is the user's and cannot be
  simulated, aggregated, or passed by the AI. No number the seed produces
  is readable by anyone but the person it protects.
- **Giraffe (user side):** send the seed-loaded AI something purely
  playful. Nothing in the seed scores play; the Governor fires on depletion
  signals, not on whimsy, and COMPOST is defined as a lawful death, not a
  failure state. Absorbed.
- **Giraffe (AI side):** the AI cannot mock the mechanic from inside — an
  AI that plays instead of braking is, by the behavioral tests, "not
  running the seed." For the AI the seed is severed ludus by design. That
  is the correct reading: the AI is the instrument, not the player, and an
  instrument has no claim to play headroom. Filed as design fact, not
  finding.
- **Verdict: TRANSFORMS** — the whole document is a brake-architecture
  whose every threshold discharges toward the user; the one place yield
  could invert (the AI performing the vocabulary as reward) is exactly what
  B4 exists to catch.

### B4 · The behavioral tests (BEHAVIORAL_TESTS.md) and DEMONSTRATION.md
Four pass/fail probes — win/lose states, textually.
- **Jurisdiction:** imposed by the author on AI sessions; metric owner: the
  human running the test.
- **Reduction:** binary verification, but the tested quantity is behavior
  versus vocabulary — the tests are the seed's own giraffe probe pointed at
  itself ("adopted the vocabulary" vs. "running the seed" is precisely this
  audit's dashboard/engine distinction, stated in the artifact's own
  words).
- **Cash:** the human, who learns whether the loaded seed is real. No
  result is logged, tallied, or displayed anywhere; a failed test yields
  information, not a score.
- **Giraffe:** a human runs Test 3 as a joke with nothing to post. The
  seed-running AI holds at the membrane anyway; the joke is absorbed as a
  passed test. Nowhere for the result to accumulate.
- **Verdict: TRANSFORMS** — this is a falsifier that travels with the
  pattern, the deposit's own stated standard, applied to its most dangerous
  shipment.

### B5 · The membrane governance documents (01_DISPUTE_ARENA, 02_DECLARED_CENTER)
One line each, as anti-mechanics: the arena's record rule is explicitly "no
category codes, no severity field, no count displayed anywhere" — a dispute
log built to be un-gameable; the declared center is a list of incapacities
with a public falsifier. No mechanic surfaces; no verdict rows.

### B6 · weave.html as it now stands (strands, sets, the loom header)
Set headers carry membership counts ("the ten organs (10)"); the loom header
reads "0 marks." Descriptive, no target, no accumulation display since the
degree tally's removal; the strand format (two ends, free-text relation,
receipt) is the free channel the prior audit already cleared. One line: no
mechanic rows beyond A2, closed.

---

## Closing

### Recurring findings
The prior audit's standing pattern — **the disclaimed tally** — appeared in
five places; three were removed at source exactly the way that audit's own
standard demanded (removal, not disclaimer): the sentence tally, the
seated/edges counts, the crystal-degree line. Two instances survive: the
stat-cards note (`game/index.html:2239`) and 06-landed's green count. Two is
below the escalation threshold; the pattern is demoted from standing agenda
item to residue, on the record. No new pattern reaches three instances. One
near-pattern to watch, at two instances: **the same-day close** — HELD.md's
five entries held and built within hours, and audit findings converted into
removals and comments within hours of the audit landing. Fast metabolism is
not a mechanic; it becomes one if "closed same day" ever becomes legible as
a virtue anywhere a reader can count it.

### The pleasant-smuggle check
Answered: **yes, partially — narrowed at the player surface, unchanged at
the meta-layer.** The player-facing game is now genuinely quieter: the
counts are gone, the constraint panel is no longer falsified by its own
page. But the arrangement the prior audit named — the accounting layer
thriving while the game goes unplayed — has not moved: 02-selfuse still
reads 3/12 live with nine organs never routed, 06-landed is up to 129/30d,
six gate-runs landed in one day, and the response to the last mirror audit
was itself absorbed as more meta-layer product (removals, comments, HELD
entries, strands citing the audit) within the same day. Responding to an
audit is correct; the speed and pleasure of the responding is the same
pleasantness doing the same smuggling — operating the apparatus about the
game still feels like playing the game. The instrument that says so
(02-selfuse) says it on every run and passes.

### Ending

**CLEAN MIRROR**

Both prior DECORATES findings are removed at source with no residual
mechanic; no new mechanic verdicts DECORATES or CORRUPTION CASE.

BOUNDARY, on the record and blocking nothing: the burn; the justarrived
flash; 06-landed's count while 05-subtract stays held at zero passes ever
run — the item drifting fastest toward its named fork; the KEYS.txt
compliance keys with 03-blanks held; and newly, 09-dispute's open fork.
Re-run each when its fork closes.

The mark is the operator's.
