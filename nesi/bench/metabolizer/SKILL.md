---
name: metabolizer
description: >-
  Convert any raw pile — a session's output, an intake folder, a stale snapshot
  — into GATE dispositions: exactly one disposition per item, each with an
  evidence line, output as a disposition table plus a staged GATE_DATA delta.
  Use when a session ends with loose output, when an intake folder needs
  sorting, when a snapshot has gone stale, or whenever you catch yourself saying
  "that's probably already absorbed." Triggers: "metabolize this", "run the
  metabolizer", "sort this pile", "disposition this", "what's the delta on the
  gate". STAGING-ONLY: stages a delta, never marks, never crosses the membrane.
---

# Metabolizer — the digestion organ

Takes a pile, returns dispositions. Every item gets exactly one; "probably
absorbed" is not a disposition. Stages a GATE_DATA delta; the gate-holder
applies and marks it. Nothing crosses until Kevin marks.

---

## Reserved zero — the hard stop

**This skill produces a staged delta only.** It writes no mark. It moves nothing
from `staged` to `marked`. It never deletes, never crosses the membrane. If a
run ever resolves into "therefore promote / publish / delete," it has overrun
its reserved zero. Stop and stage.

---

## Disposition vocabulary — exactly one per item

| Disposition | Means | Goes to | Requires |
|---|---|---|---|
| `folded-into [parent]` | This restates an already-canon pattern | Compost ledger | Named parent + evidence line showing the fold |
| `superseded-by [item]` | A newer item replaces this one | Compost ledger | Named superseder + date |
| `still-open → GATE` | A real undecided thing owed a decision | `felt_read_queue` | One-line statement of what the mark changes |
| `zero-unset → tray` | A built mechanism missing one calibration | `staging_tray` | Which zero is unset, and who holds it |
| `RESTORE` | "Probably absorbed" — uncertain | Back to pile | Nothing — uncertainty *forces* this |

**Load-bearing rule:** "probably absorbed" triggers RESTORE, never fold. A fold
asserts identity ("this IS that parent"). If you cannot name the parent and show
the fold in one evidence line, you have a guess — and a guessed fold is how a
live item disappears. Fail toward keeping the item.

**Every disposition carries an evidence line.** No bare verdicts.
`folded-into consented_ledger` is not a disposition.
`folded-into consented_ledger — restates feel/consent/never-hide with no new
mechanism` is.

---

## Procedure

### Step 1 — Inventory: contains AND implies

List every item the pile holds. Then list every item it *implies*: a claim that
assumes an unstated prior, a fold that names no parent, a queue item referenced
but not present.

**Implied items are where displacement hides.** An item that was in the last
snapshot and is silently gone from this one is an implied item until you find
its disposition. Log the inventory count. If it is smaller than the prior
snapshot's open count, every missing item must appear with a disposition.

Read the pile (a file path, a folder, or conversation content). Read the current
`gate/data/gate_data.json` for context on what is already staged or marked.

### Step 2 — Disposition each

Walk the inventory. Assign exactly one disposition from the table above.
Where you reach for "probably," write RESTORE and move on — do not argue
yourself into a fold.

Evidence line required on every item. No bare verdicts.

### Step 3 — Emit the disposition table

```
| # | item (contained / implied) | disposition | named parent / superseder / zero | evidence line |
|---|---|---|---|---|
```

### Step 4 — Emit the GATE_DATA delta

Translate dispositions into a delta against `gate/data/gate_data.json`.

- `still-open → GATE` items become `felt_read_queue` entries:
  `{ "title": "...", "origin": "...", "mark_size": "small|medium|large", "changes": "...", "status": "staged" }`
- `zero-unset → tray` items become `staging_tray` entries:
  `{ "title": "...", "class": "...", "note": "...", "status": "staged" }`
- `folded-into` / `superseded-by` items become compost-ledger lines (recorded,
  never deleted — SUBTRACTION law applies).
- Any gauge whose reading changed gets an updated `ledger_gauges` reading
  (reading/log only — never a score; the DISPLACED-ZERO law refuses to build
  if a gauge carries a verdict).

Write the delta as a staged artifact:
`gate/data/_delta_<date>_<slug>.json`

**Do not edit the live `gate_data.json`.** Applying the delta is the
gate-holder's act.

### Step 5 — Hand off

State in one line:
- Items in
- Items dispositioned
- Items RESTORED (the honest residue)
- Delta location

A run that RESTOREs nothing on a large messy pile is suspect, not impressive.

---

## Known failure modes — and their guards

### Queue displacement
An item owed the body's felt-read gets dispositioned by an engine pass before
the body reads it. The displacement is silent because the pass produces a tidy
result.

**Guard:** Step 1 forces implied/missing items into the inventory. Step 2
forbids "probably absorbed." An engine pass that wants to fold a queued item
must name the parent and show the fold — which surfaces the displacement as a
decision instead of a side effect.

### Evaporation between snapshots
Items move between snapshots without a per-item disposition ledger.

**Guard:** The GATE_DATA delta IS the per-item ledger. No item changes state
except through a delta line with an evidence line.

### The forced fold that makes the geometry tidy
A fold taken because it makes the structure elegant, not because the identity
is real. "A unification that rests on a pun is decorative." A clean inversion
that feels like insight is this framework's deepest trap.

**Guard:** The evidence line. A real fold shows the mechanism of the parent
generating the child. A forced fold can only assert a resemblance. If the
evidence line is a resemblance and not a derivation, the disposition is RESTORE.

---

## Transition test

A second human, with or without an AI, can run this on a pile they did not
create and reach the same dispositions — because the vocabulary is fixed, the
evidence line is required, and "probably" is mechanically routed to RESTORE. If
running this requires being Kevin, it has failed its own test.

---

---

## Recognition pass — optional second stream (morning pages / explicit request)

When the pile is morning pages output, or when Kevin explicitly asks for a
recognition pass, run this after the disposition pass. It reads the same pile
for a different signal type. It does not replace or modify any disposition from
the main pass.

**Guard — never-read-the-writer.** The recognition pass reads for pattern
signals only. It does not extract personal content, quote emotional material,
or report what Kevin was feeling. If a signal can only be named by citing
Kevin's private experience, it is not a recognition signal — it is a
violation of the guard. Stop and do not flag it.

### Recognition signal vocabulary — exactly one per flag

| Signal | Means | Evidence required |
|---|---|---|
| `RECURRENCE` | Same language, frame, or move appears without being invented in this session — body reaching without deciding | Quote the phrase; name the canon pattern it maps to; note prior appearances if known |
| `LANDING-REPORT` | Kevin describes a real interaction where something was offered and received by another person | Name what was offered; what the response was (Kevin's words, not interpreted); which pattern it suggests |
| `BODY-NATIVE` | Framework language used naturally, without citation — the pattern running in Kevin, not being performed | Quote the usage; name the canon match; note that it was not set up or explained |

Items that do not match any signal type: `NOT-RECOGNITION` — route to
existing disposition stream or log as work-object.

### Recognition pass procedure

**Step R1 — Read for signals only.** Scan the pile. Flag candidate phrases,
descriptions, or moments. Do not flag everything — only what carries a
signal. A quiet page with no signals is a valid result.

**Step R2 — Assign signal type and evidence.** One signal type per flag.
Evidence line required. No bare verdicts.

**Step R3 — Emit the recognition table.**

```
| # | signal type | what appeared (quoted or paraphrased) | canon pattern it maps to | evidence / prior appearances |
|---|---|---|---|---|
```

**Step R4 — Route to propagation map.**

Write flagged signals as append-only entries to:
`DSS root/propagation_map.md`

Format per entry:
```
## [date] · [signal type] · [canon pattern slug]
> [quoted or paraphrased signal, Kevin's words]

Evidence: [one line]
Prior appearances: [count or "first seen"]
```

Do not edit existing entries. Append only.

**Step R5 — Hand off (recognition stream).**

One line: signals found / NOT-RECOGNITION count / propagation_map.md updated.

---

## What it invokes

- `gate/data/gate_data.json` — read for current state before the run
- `gate/data/_delta_<date>_<slug>.json` — write the staged delta here
- `gate/gate.py show` — optional: read current state via the gate script
- `DSS root/propagation_map.md` — append recognition flags (recognition pass only)

Does not invoke: new instruments, the mark-record skill, the substrate skill,
or anything that builds rather than disposes.

---

## Files

| Path | Role |
|---|---|
| `gate/data/gate_data.json` | Read for current queue/tray state |
| `gate/data/_delta_<date>_<slug>.json` | Staged delta output — not applied until Kevin marks |

Base directory: `C:\Users\KMEAR\OneDrive\Desktop\DSS content`

---

*Staged only. It digests; the body swallows. Nothing it produces crosses or
marks. The reaching is not the mark.*
