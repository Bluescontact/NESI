---
name: daily-cycle
description: >-
  The session-boundary protocol — the smallest loop that keeps the system alive
  between sessions. On open: read the gate, state the one-line system state, name
  what this session is for, check that against the felt-read queue. On close: run
  the metabolizer on the session's own output, regenerate the static snapshot,
  update the system-state gauge, append one line to the cycle log. Use at the
  start and end of a working session. Triggers: "open the cycle", "boot",
  "orient", "close out", "wrap the session", "end of cycle". It invokes; it never
  creates. Hard ceiling: the close-out is ten minutes — if it grows, that is a
  Governor reading.
---

# Daily cycle — the circulation loop

*Instrument-class — written for the operator. The smallest loop that keeps
everything else alive between sessions. It builds nothing and decides nothing;
it opens the system, names the session, and closes the system. Its whole value
is that it runs every session, the same way, so nothing accumulates in the gap.*

**This skill invokes, never creates.** It calls the gate and the metabolizer.
It does not author instruments, patterns, or canon. No new instrument is ever
built inside this skill — ever. The circulation organ that starts inventing
organs is no longer a circulation organ.

---

## Reserved zero — there is none, and that is the design

Every other instrument reserves one un-automatable judgment for the gate-holder.
**This one reserves none — because it touches nothing that crosses.** It reads
state, names a session, runs an already-built organ, regenerates a snapshot,
writes a log line. If this skill ever needs a reserved zero, it has started doing
something that crosses, and it has left its purpose. State the absence; do not
fill it.

---

## Base paths

```
root:  C:\Users\KMEAR\OneDrive\Desktop\DSS content
gate:  root\gate\gate.py
log:   root\CYCLE_LOG.md
```

All gate commands run from `root\gate\`: `cd root\gate && python gate.py <cmd>`

Alternatively, read `root\gate\data\gate_data.json` directly for state when
the Python environment is not available.

---

## ON OPEN — orient in four steps

Invoke when Kevin says: **"open the cycle"**, **"boot"**, **"orient"**, or
starts a session and hasn't oriented yet.

**Step 1 — Read the gate.**

Run: `python gate.py show` (from `root\gate\`)
OR read `root\gate\data\gate_data.json` directly.

Extract counts: `felt_read_queue` (staged vs. marked), `staging_tray` (staged),
`ledger_gauges`, last-build timestamp.

**Step 1b — Surface substrate ledger and refresh codex index.**

Run from `root\`: `python tools/ledger.py summary`

This surfaces unmarked PROMOTE-READY items from substrate runs — candidates that completed the full Grounder/Governor cycle and need only Kevin's mark. If count is nonzero, fold it into the system-state line:
> *"Queue: 8 staged, 2 marked; 3 PROMOTE-READY unmarked in ledger."*

Then check codex index freshness. If `patterns/` has been modified since the last index build, run:
```
tools\codex_index\run.bat
```
(or `python tools/codex_index/build_index.py && python tools/codex_index/screen_intake.py` if run.bat is unavailable)

If the index is current, one line: *"Codex index current."* Skip the rebuild.

This keeps the pre-screen fresh before any Dispatcher pass without requiring manual invocation.

**Step 1c — Surface unstaged metabolizer deltas.**

Scan `root\gate\data\` for any files matching `_delta_*.json`.

- **None found** → one line: *"No staged deltas."* Continue.
- **Found** → list each file with its date slug. Surface before orientation proceeds:

> *"N staged delta(s) found in gate/data/ — [_delta_2026-07-01_slug.json, ...]. Apply before proceeding?"*

If Kevin says apply (or equivalent): instruct Kevin to run `python gate.py apply <delta_path>` from `root\gate\`, or if no apply command exists, to manually merge the delta into `gate/data/gate_data.json`. After application, confirm: *"Delta applied. Gate state updated."*

If Kevin says skip: note it in the system-state line as *"1 unapplied delta pending."* Do not discard or lose the reference.

**This step runs before Step 2.** An unapplied delta means the gate state Kevin reads in Step 2 may not reflect the last session's metabolizer output. The delta surface is what makes the metabolizer's output load-bearing instead of staged-and-forgotten.

**Step 2 — State the one-line system state.**

One sentence, from the gate's counts. Examples:
- *"Queue: 8 staged, 2 marked; tray: 3 staged; last snapshot 2026-06-09."*
- *"Pile at 8 — no items marked since last session; rented-cognition read still
  first in queue."*

If you cannot summarize in one line, the gate data is stale — that is the first
thing to flag. Do not proceed past a stale gate without naming it.

**Step 3 — Name what this session is for.**

One sentence. Ask Kevin if it is not stated: *"What is this session for?"*
Then hold that answer. It becomes the cycle-log entry.

**Step 4 — Check against the felt-read queue.**

Look at the `felt_read_queue` items by order. Does the session's stated purpose
jump the queue — does it act on something while a prior item is still unread?

Jumping is allowed. **Silent jumping is not.** If the session jumps the queue,
say so in one line:

> *"This session jumps the queue — it builds [X] while [Y] is still first.
>  That's a deliberate jump."*

Said out loud, it's a choice. Unsaid, it's drift.

That is the open. Four steps. It is not a planning session; it is an orientation.

---

## ON CLOSE — circulate in five steps (ten-minute ceiling)

Invoke when Kevin says: **"close out"**, **"wrap the session"**, **"end of
cycle"**, or signals session end.

**Step 1 — Run the metabolizer on this session's output.**

Invoke `skills/metabolizer`. Point it at what this session produced — files
written, decisions made, builds staged, content generated. Pass the session
output as the pile; the metabolizer returns a disposition table and a staged
GATE_DATA delta.

**Always run the recognition pass alongside the disposition pass at close.** The recognition pass (Steps R1–R5 in the metabolizer) reads the same pile for outside-in signals — moments where something arrived, was noticed, or found Kevin rather than being produced. When recognition signals are found, the metabolizer writes them directly to `root\propagation_map.md` (Step R4). This is the load-bearing path for the propagation map.

The session digests itself — this is what stops the session's output from
becoming next session's undisposed pile.

**Step 2 — Regenerate the static snapshot.**

Apply nothing the body hasn't marked. Then run both commands from `root\gate\`:

```
python gate.py build
python update_state_view.py
```

`gate.py build` regenerates `root\gate\THE_GATE.html` — the offline canonical snapshot.
`update_state_view.py` regenerates the STATE block in `root\state_view.html` from
`gate_data.json` — this is the durable session widget Kevin opens in the browser.
Both must run together. A close-out that skips `update_state_view.py` leaves
`state_view.html` stale and forces a manual reboot next session.

Confirm: "Snapshot regenerated. state_view.html updated."

**Step 3 — Update the system-state gauge.**

Run: `python gate.py stats` (from `root\gate\`).

Report the four counts: **spine N · hold N · queue N · tray N**

Flag if any count grew two reads in a row — that is a subtraction-failure signal
(the gauge goes red). Log it if so.

**Step 3b — Run the membrane falsifier.**

Run from `root\`: `python tools/membrane_falsifier.py`

The shelf checks itself: every file in `patterns/` is scanned against
`membrane/transition_records/` (THE record). Files in the pre-2026-07-04
baseline report as known; anything else unrecorded is a NEW violation.

- Clean → one line: *"Membrane falsifier: clean — no new unrecorded Library files."*
- NEW violations → name every file in the close report and carry them to the
  next open as first-line flags. Do not stage records for them — bypassed
  writes get named, never retrofitted (controller law). Kevin marks the
  disposition per file.

This step is what gives the crossing witness its own witness: a bypassed write
survives at most one session close before it is named. (Wired 2026-07-04 on
Kevin's mark.)

**Step 3c — Read the drift meter.**

Run from `root\`: `python tools/recognition/drift_meter.py`

The drift organ reads the coordination log's `quality_score` as a running sum
(CUSUM), catching slow degradation that no single exchange would show — every
exchange can score fine while quality quietly slides. It watches the agent /
the exchange — **never Kevin**.

- Clean → one line: *"Drift meter: OK — quality holding at standard."*
- WATCH / DRIFT → surface the one-line status (accumulated / trip, run-length,
  which dimension is sliding) in the close report and carry it to the next open
  as a first-line flag. It **reports; it does not decide** — the disposition of
  a drift is Kevin's read, not the loop's.
- No data yet → one line: *"Drift meter: no data — coordination log empty."*

This externalizes the one vigilance that cannot be performed by attention: per
step everything looks fine while the sum climbs. (Wired 2026-07-08 on Kevin's
mark.)

**Step 3d — Read the Brier ledger.**

Run from `root\`: `python tools/recognition/brier_ledger.py`

The long-run integrity audit. It scores load-bearing **claims** against reality
(Brier score) and reports calibration over time — whether "sounds right" has
been tracking "is right." It scores claims, **never Kevin**.

- Clean → one line: *"Brier ledger: OK — calibration holding, nothing overdue."*
- Off-band or overdue → surface the one-line status (Brier score · overdue
  count · any probability band where said-vs-happened is off) in the close
  report, and carry an off-band to the next open as a first-line flag. It
  **reports; it does not decide** — what a miscalibration means is Kevin's read.
- No data yet → one line: *"Brier ledger: no claims logged."*

This is the audit behind the fast gates — the slow check that says whether the
integrity organs actually separate sound from fluent. (Wired 2026-07-08 on
Kevin's mark. P1 of the integrity organ.)

**Step 3e — Append one line to the Governor trail.**

Append to `root\tools\recognition\governor-log.jsonl` — one line, four fields:

```json
{"date": "<date>", "gate": "DAILY §1|DAILY §2|DAILY §3|CYCLE|none", "reading": "green|stop|uncertain|none", "next": "rested|pushed anyway|redirected|<short factual phrase>"}
```

Which Governor gate was touched this session, what it said, what actually
happened. If no gate was read, write `"gate": "none", "reading": "none"` —
**recording the absence is load-bearing**; a run of `none` lines is the
failure mode the trail exists to catch.

**Hard limit (same law as mark-record field 5): four fields, no fifth, ever.**
The trail records gate outcomes only — never the body-line, never the felt
content, never why. It watches the brake, not the driver. This is one append
inside the ten-minute ceiling; if it ever makes the close-out grow, the trail
has become the disease — log that as a Governor reading. Nothing reads this
trail yet — the reader stays unwired until the trail holds ~three weeks of
lines (see `governor-log_NOTE.md`). (Wired 2026-07-10 on Kevin's mark.)

**Step 3f — Read the falsifier gate.**

Run from `root\`: `python tools/recognition/falsifier_gate.py report`

P2 of the integrity organ — the break-only gate on promote-ready items.
It gates items, **never Kevin**, and never judges a claim itself: L0 is a
mechanical form check (warrant · disconfirmer · provenance), L1/L2 verdicts
arrive from outside and are only read back here.

- Clean → one line: *"Falsifier gate: OK — no open breaks."*
- Open breaks → surface the one-line status (item id · which layer broke ·
  why) in the close report and carry it to the next open as a first-line
  flag. It **reports; it does not decide** — disposition of a break is
  Kevin's read, and NO-BREAK certifies nothing.
- Smoothness nag (≥5 items, zero breaks) → surface the nag verbatim; a gate
  that never breaks anything is broken or being fed easy items.
- No data yet → one line: *"Falsifier gate: no items gated."*

(Wired 2026-07-10 on Kevin's mark.)

**Step 3g — Read the metamorphic check.**

Run from `root\`: `python tools/recognition/metamorphic_check.py report`

P3 of the integrity organ — meaning-preserving re-render of claims. It
checks claims, **never Kevin**, and never renders or judges a transform
itself: the separated pass does both; only verdicts live in the log.

- Clean → one line: *"Metamorphic check: OK — no open flips."*
- Flips → surface the one-line status (claim id · transform · the
  inversion) in the close report and carry it to the next open as a
  first-line flag. It **reports; it does not decide** — what a flip
  means is Kevin's read, and STABLE certifies nothing.
- Smoothness nag (≥5 verdicted, zero flips) → surface the nag verbatim.
- No data yet → one line: *"Metamorphic check: no claims registered."*

(Wired 2026-07-10 on Kevin's mark.)

**Step 4 — Append one line to the cycle log.**

Append to `root\CYCLE_LOG.md`. Format:

```
<date> · <what entered> · <what was dispositioned> · <what's owed the body>
```

Four fields, `·`-separated, one line. Examples:
```
2026-06-26 · morning-pages-channel skill built · 3 artifacts created, nothing staged to GATE · daily-cycle open (rented-cognition read still first in queue)
```

Append only — never rewrite. If CYCLE_LOG.md does not exist, create it with the
header from the existing file format (see `root\CYCLE_LOG.md`).

**Step 4b — Confirm propagation map update.**

The metabolizer's recognition pass (Step 1) is the primary path for propagation map entries. This step confirms it ran:

- If the metabolizer found recognition signals: confirm `root\propagation_map.md` was updated by the metabolizer (Step R4). Report the count: *"N recognition signals → propagation_map.md updated."*
- If the metabolizer found no signals: confirm the map was not written. *"No recognition signals this session — propagation_map.md unchanged."*
- If a recognition event arrived outside the metabolizer's pile (e.g. something Kevin named in conversation that wasn't in the pile): append it now in the metabolizer format: `## [date] · [LANDING-REPORT|RECURRENCE|BODY-NATIVE] · [pattern slug]`

A blank close is valid — forced entries corrupt the map. Do not append anything that wasn't a genuine outside-in arrival.

**Step 5 — Read the close-out itself — the ceiling.**

State how long the close-out took (approximate).

**The close-out is ten minutes of work.** If it is reliably growing past that,
the sessions are producing more than the system can digest. That is not a
logistics problem — it is a Governor reading: throughput exceeds metabolic
capacity. Log it: `python gate.py stage tray --json '{"title": "Close-out
time trending up — Governor: throughput > digestion", "class": "zero-unset",
"note": "cure: fewer/smaller sessions, not faster close-out"}'`

Do not optimize the close to hide the signal.

---

## Trigger summary

| Phrase | Action |
|---|---|
| "open the cycle" / "boot" / "orient" | ON OPEN |
| "close out" / "wrap the session" / "end of cycle" | ON CLOSE |
| "what's the state?" / "where are we?" | Step 1-2 of ON OPEN only |

---

## What it invokes (and nothing else)

- `root\gate\gate.py show` — read gate state (open, step 1)
- `root\tools\ledger.py summary` — surface unmarked PROMOTE-READY ledger items (open, step 1b)
- `root\tools\codex_index\run.bat` — rebuild codex index if patterns/ changed (open, step 1b)
- `root\gate\data\_delta_*.json` — scan for unstaged metabolizer deltas (open, step 1c)
- `skills/metabolizer` — digest session output (close, step 1)
- `root\gate\gate.py build` — regenerate gate snapshot (close, step 2)
- `root\gate\update_state_view.py` — regenerate state_view.html STATE block (close, step 2)
- `root\gate\gate.py stats` — recompute gauges (close, step 3)
- `root\tools\membrane_falsifier.py` — shelf-vs-records scan (close, step 3b)
- `root\tools\recognition\drift_meter.py` — CUSUM drift read over the coordination log (close, step 3c)
- `root\tools\recognition\brier_ledger.py` — Brier calibration read over the claim ledger (close, step 3d)
- `root\tools\recognition\governor-log.jsonl` — append one four-field line (close, step 3e)
- `root\tools\recognition\falsifier_gate.py report` — break-only read over the falsifier log (close, step 3f)
- `root\tools\recognition\metamorphic_check.py report` — flip-only read over the metamorphic log (close, step 3g)
- `root\CYCLE_LOG.md` — append one line (close, step 4)
- `root\propagation_map.md` — append recognition events (close, step 4b)

No other tool. No new file beyond the log line. No mark — the gate and the
metabolizer hold those gates; this loop only turns the crank.

---

## Files

| Path | Role |
|---|---|
| `gate/gate.py` | Gate backend — `show`, `build`, `stats` |
| `gate/data/gate_data.json` | Canonical state — read for orientation |
| `gate/THE_GATE.html` | Static snapshot — regenerated on close |
| `CYCLE_LOG.md` | Append-only session ledger |
| `tools/ledger.py` | Substrate ledger — `summary` or `list` for unmarked items |
| `tools/codex_index/run.bat` | Codex index rebuild + intake screen |
| `gate/data/_delta_*.json` | Scanned at open (step 1c) — unstaged metabolizer deltas |
| `tools/membrane_falsifier.py` | Shelf-vs-records scan at close (step 3b) |
| `tools/recognition/drift_meter.py` | CUSUM drift read over coordination log at close (step 3c) |
| `tools/recognition/brier_ledger.py` | Brier calibration read over claim ledger at close (step 3d) |
| `tools/recognition/governor-log.jsonl` | Governor trail — one four-field line at close (step 3e), no fifth field ever |
| `tools/recognition/falsifier_gate.py` | Break-only gate read over falsifier log at close (step 3f) |
| `tools/recognition/metamorphic_check.py` | Meaning-preserving re-render check at close (step 3g) |
| `propagation_map.md` | Append-only recognition log — arrival events only |

---

*It circulates; it does not decide. It touches nothing that crosses, which is
why it needs no reserved zero. The reaching is not the mark — and this loop
does not even reach. It keeps the others honest between sessions.*
