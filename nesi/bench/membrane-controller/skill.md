---
name: membrane-controller
description: >-
  Exclusive write authority at two membrane crossing points: Promote-Ready →
  Library (patterns/) and Library → Release Packet. No other path writes to
  either state. Fail-close: any missing condition, error, or timeout = DENY,
  halt, no write. Triggers: "cross the membrane", "promote to library",
  "deposit to library", "create release packet", "transmission mark", or any
  request to move material from promote-ready to canon or from library to
  transmission. NOT a background process — invoked explicitly per crossing.
manifest:
  do: "Write one pattern/release file into canon and one crossing record into membrane/transition_records/ — record first, file second."
  touches: "patterns/ or a release packet, plus membrane/transition_records/. Nothing else."
  size: "small-medium per crossing — one file pair, no batch writes."
---

# Membrane Controller

One component. Exclusive write authority at two crossings. Every other path to
Library state or Release Packet is non-existent — not discouraged, not logged
after the fact. Non-existent.

Does not process, evaluate, or generate content. Controls one thing: whether a
marked, brake-passed transition record is sufficient to permit a state change
across a membrane. If yes, it writes. If anything is missing, ambiguous, or
errored, it denies and halts.

**Fail-close rule applies to every condition at every step.** Partial pass =
DENY. Error or timeout = treated as FAIL, not PASS. No fallback, no override,
no "let it through for now."

---

## Paths and Records

```
Library:            C:\Users\KMEAR\OneDrive\Desktop\DSS content\patterns\
Transition records: C:\Users\KMEAR\OneDrive\Desktop\DSS content\membrane\transition_records\
Release packets:    C:\Users\KMEAR\OneDrive\Desktop\DSS content\membrane\release_packets\
```

Create `membrane/transition_records/` and `membrane/release_packets/` if they
do not exist. These directories are never written to by any other skill or agent.

---

## Crossing 1 — Promote-Ready → Library

### When invoked

Kevin requests that a promote-ready item be deposited into the Library
(`patterns/`). The item must be identified by artifact ID or filename.

### Conditions in sequence — each must pass before the next is evaluated

**Condition 1: Converger Pass**

Ask Kevin to confirm the Converger has run on this specific item and the pile
did not grow as a result. A batch or prior Converger clearance does not cover
this item.

If Kevin cannot confirm, or states the Converger has not run: DENY. Halt. State:
"Crossing 1 denied — Converger pass required before Governor evaluation."

Do not proceed to Condition 2.

**Condition 2+3: Governor Pass + Decision Surface — Collapsed**

*Correction applied 2026-07-01: asking Kevin to separately articulate "Governor
confirmed" is cost-shifting — it extracts the articulation debt from Kevin's
body at the moment of crossing. The body-question IS the Governor evaluation.
Conditions 2 and 3 are a single step.*

Compose a body-question specific to this deposit. The question must name:
- The artifact (by ID or title)
- The transition (promote-ready → library / canon)
- The stakes (what changes if this is canon)

Example form: *"[Artifact name] — does this belong in the Library as permanent
ground, or is it a position the body still holds open?"*

Present this question to Kevin. Kevin's body-response to this question IS the
Governor pass — it evaluates overreach, lived ground, and canon fit in one act.
Do not ask Kevin to separately confirm "Governor passed." That is a redundant
articulation requirement that shifts cognitive cost onto Kevin.

If the material is too ambiguous to compose a specific question: DENY. Halt.
State: "Crossing 1 denied — Decision Surface cannot compose a body-question
until material ambiguity is resolved."

Do not proceed to Condition 4 until Kevin has read and responded to the
body-question.

**Condition 4: Kevin's Mark**

Request Kevin's explicit mark for this specific deposit. The mark must name:
- Artifact ID or title
- Source state: promote-ready
- Target state: library
- Timestamp

A Library mark does not authorize transmission. A general or vague mark
("add this to canon") is not a valid mark for this condition — ask Kevin to
name the artifact explicitly.

If Kevin's mark arrives before the body-question (Condition 3) has been
surfaced: reject the mark as malformed. Halt. Recompose the body-question
and re-request.

If no explicit mark is given: DENY. No write. No exceptions.

### What the controller writes on all four conditions met — record first, file second

*Amended 2026-07-04 on Kevin's mark (A+B build). The prior order — file first,
record second — meant a session dying between the two steps left a Library file
with no record, silently. The 2026-07-04 crossing-gap audit found 26 files that
entered patterns/ that way since 06-28 alone. Reversed order fails noisy: a
failure now leaves a record pointing at a missing file, which announces itself.*

1. Write the transition record FIRST to
   `membrane/transition_records/crossing1_<date>_<artifact_id>.json`:

```json
{
  "artifact_id": "",
  "version": "",
  "source_state": "promote-ready",
  "target_state": "library",
  "converger_pass": { "confirmed_by": "kevin", "timestamp": "", "pile_state": "stable" },
  "governor_pass": { "confirmed_by": "kevin", "timestamp": "" },
  "decision_surface_q": "",
  "kevin_mark": { "timestamp": "", "mark_type": "library-deposit", "scope": "artifact-specific" },
  "controller_write": ""
}
```

2. Write the artifact file to `patterns/<artifact_filename>`.

   If this step fails after the record was written: do NOT delete the record.
   Report the orphan record to Kevin immediately — an orphan record is the
   fail-noisy alarm working as designed, not a mess to clean up.

3. Rebuild the codex index:

   Run `tools\codex_index\run.bat` from `root\`
   (or `python tools/codex_index/build_index.py && python tools/codex_index/screen_intake.py` if run.bat is unavailable).

   Confirm: "Codex index rebuilt — proximity verdicts current."

   This keeps the pre-screen fresh immediately after every library deposit. Substrate screening and Dispatcher passes see the new pattern on the next invocation without a manual rebuild step.

4. Re-render the crossing log view:

   Run `python tools/render_crossing_log.py` from `root\`.

   `CROSSING_LOG.html` is a RENDERED VIEW generated from
   `membrane/transition_records/` — never written by hand (amended 2026-07-04;
   the hand-written v1 is archived at `membrane/CROSSING_LOG_v1_2026-06-28.html`).
   If view and records disagree, the records are truth; re-render.

5. Report to Kevin: artifact name, target path, transition record path.

### Bypass prevention

No agent, script, import, sync, migration, or metadata update writes to
`patterns/` outside this controller. If Kevin asks for any of these paths to
Library state, invoke this controller — do not write directly.

---

## Crossing 2 — Library → Release Packet

### When invoked

Kevin requests that Library material be made available to the Transmission
Engine for a specific public output.

The Transmission Engine reads only from Release Packets — never from `patterns/`
directly. If the engine is invoked without a Release Packet for the current
request: DENY. Halt. Route to this controller.

### Conditions in sequence

**Condition 1: Decision Surface — Transmission Body-Question Composed**

Compose a body-question specific to this transmission. The question must name:
- The material (artifact IDs or titles)
- The audience
- The format
- The channel
- The scope limit (what the engine may and may not use)

Example form: *"[Material title] going to [audience] via [channel] as [format] —
is this the right scope, right time, right reach?"*

Present this question to Kevin. No mark request is valid without this question.

If scope cannot be named (audience, format, or channel is unstated): DENY.
Halt. State: "Crossing 2 denied — transmission body-question requires named
audience, format, and channel. Resolve and return."

**Condition 2: Kevin's Transmission Mark**

Request Kevin's explicit transmission mark. The mark must name:
- The material (artifact IDs or titles)
- The audience
- The format
- The channel
- The scope limit

A broad or unscoped mark ("approved for transmission generally") is not valid.
Reject it, state the reason, return to Condition 1.

A Library deposit mark (from Crossing 1) does not carry forward. This is a
second, independent mark.

If no explicit scoped mark is given: DENY. No Release Packet created.

### What the controller creates on both conditions met

1. Create a Release Packet directory:
   `membrane/release_packets/<packet_id>/`

   Where `packet_id` = `rp_<date>_<slug>` (slug derived from material title).

2. Copy (not move) marked artifacts into the packet directory. The packet is
   read-only for the engine — `patterns/` remains unchanged.

3. Write a transmission record to
   `membrane/release_packets/<packet_id>/transmission_record.json`:

```json
{
  "packet_id": "",
  "source_artifacts": [],
  "audience": "",
  "format": "",
  "channel": "",
  "scope_limit": "",
  "decision_surface_q": "",
  "kevin_mark": { "timestamp": "", "mark_type": "transmission-release", "scope": "packet-specific" },
  "packet_created": "",
  "engine_access_granted": ""
}
```

4. Report to Kevin: packet ID, contents, transmission record path, and the
   exact scope granted to the engine.

### Derivative scope rule

Material generated by the Transmission Engine from the Release Packet inherits
the packet's scope. If generation would require material or reach beyond the
packet, the engine halts and Kevin is returned to Crossing 2 for a new mark.

### Observability boundary

Logs, audit records, and system status outputs are internal. They do not cross
the public membrane without a separate Crossing 2 mark naming them explicitly
as the release material.

---

## Falsifier — run this check on request

The controller is working if:
- Every file in `patterns/` has a matching transition record in
  `membrane/transition_records/` with all four Crossing 1 fields
- Every directory in `membrane/release_packets/` has a `transmission_record.json`
  with both Crossing 2 fields
- No public output exists without being traceable to a release packet
- The Library has never grown without Kevin's mark in the audit trail

Run falsifier check: `python tools/membrane_falsifier.py` from `root\` — scans
`patterns/` for files without crossing1 transition records. Files named in
`membrane/falsifier_baseline.txt` (the pre-2026-07-04 gap, per the crossing-gap
audit) report as baseline, not new. Any NEW unrecorded file is a live violation:
name it immediately; never retrofit a record for it.
Also scan `membrane/release_packets/` for packets without transmission records.

The falsifier runs at every daily-cycle close (wired 2026-07-04) — the shelf
checks itself once per session, so a bypassed write survives at most one close.

Trigger: "run the falsifier" or "check membrane integrity."

---

## The record — one witness

`membrane/transition_records/` is THE record of every crossing. `CROSSING_LOG.html`
at root is a rendered view generated from it by `tools/render_crossing_log.py` —
never hand-written. `CYCLE_LOG.md` narrates sessions; it is not a crossing record.
If any two disagree, `transition_records/` is truth.

---

## Integration with existing instruments

**Governor** — required at Crossing 1 only. If Governor is offline or
unavailable, Crossing 1 is closed. Not slowed — closed.

**Converger** — required at Crossing 1 as pre-condition to Governor. If the
Converger fires ("pile grew"), Crossing 1 closes until pile is ratified.
Not wired at Crossing 2.

**Decision Surface** — required at both crossings as the precondition to
Kevin's mark request. Different question at each crossing. Decision Surface
failure → mark request cannot be generated → crossing closes.

**Kevin's Mark** — required at both crossings. Two distinct marks with
different scope specifications. Neither is transferable to the other crossing.
Neither can be issued without the Decision Surface question first.

---

## What the controller must never do

- Infer, assume, or substitute for Kevin's explicit mark
- Let a partial pass (3 of 4 conditions) proceed
- Treat timeout or error as PASS
- Write to `patterns/` outside this procedure
- Give the Transmission Engine direct access to `patterns/`
- Retrofit a transition record after a write that bypassed this procedure
  (that is a falsifier violation, not a recovery path)

---

## Files

| Path | Role |
|---|---|
| `patterns/` | Library — written only by Crossing 1, after the record |
| `tools/codex_index/run.bat` | Rebuilt at step 3 of every Crossing 1 write |
| `membrane/transition_records/` | THE record — written first, before the Library file |
| `membrane/release_packets/` | Crossing 2 — read-only bundles for Transmission Engine |
| `CROSSING_LOG.html` | Rendered view of the records — regenerated at step 4, never hand-written |
| `tools/render_crossing_log.py` | Renders the view from the records |
| `tools/membrane_falsifier.py` | Shelf-vs-records scan — per close + on demand |
| `membrane/falsifier_baseline.txt` | Known pre-2026-07-04 gap — scan config, not a record |
| `membrane/CROSSING_LOG_v1_2026-06-28.html` | Archived hand-written v1 log — unaltered |

Base directory: `C:\Users\KMEAR\OneDrive\Desktop\DSS content`

---

*The enforcement layer. Not an instrument alongside the Governor and Converger —
the layer that makes them load-bearing. Without it they are advisory. With it,
their passes are structurally required: not because agents are instructed to
respect them, but because no write path exists that doesn't run through here.*
