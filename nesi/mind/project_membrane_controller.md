---
name: project-membrane-controller
description: "Membrane Controller LIVE 2026-06-27 — exclusive write authority at the two crossing points (Promote-Ready → Library, Library → Release Packet); fail-close; invoked explicitly per crossing"
metadata: 
  node_type: memory
  type: project
  originSessionId: 68a060c5-1844-4082-8097-c41464c8c048
---

RECREATED 2026-07-02 during memory consolidation — the original memory file was never written to disk; only the index line existed (the index outran the disk). Operational detail lives in the skill itself at `~/.claude/skills/membrane-controller/`; this file is the thin pointer the index needs.

**What it is:** exclusive write authority at the two membrane crossing points — **Promote-Ready → Library (`patterns/`)** and **Library → Release Packet**. No other path writes to either state. LIVE since 2026-06-27.

**Behavior:** fail-close — any missing condition, error, or timeout = DENY, halt, no write. Not a background process; invoked explicitly per crossing.

**Triggers:** "cross the membrane" · "promote to library" · "deposit to library" · "create release packet" · "transmission mark" · any request to move material from promote-ready to canon or from library to transmission.

**A+B amendment (2026-07-04, Kevin's mark, after the crossing-gap audit):** write order is now **record first, file second** — a failure leaves an orphan record (fail-noisy), never an unrecorded Library file (fail-silent). `membrane/transition_records/` is THE record; `CROSSING_LOG.html` is a rendered view (`tools/render_crossing_log.py`, never hand-written; v1 archived at `membrane/CROSSING_LOG_v1_2026-06-28.html`). The controller's falsifier is runnable (`tools/membrane_falsifier.py`, baseline = 64-file pre-07-04 gap in `membrane/falsifier_baseline.txt`) and wired into the daily-cycle close (step 3b) — a bypassed write survives at most one session close. Bypassed writes are named, never retrofitted. Audit context: 2026-07-04, only 4 of 68 Library files had records; the register (membrane/VIOLATION_REGISTER.md, Entry 001) lists **5 active breaches** awaiting Kevin's individual marks: catalysis_without_claim · questions_as_structural_events · undeclared_disjunction · veto_agenda_gap (promote_candidate record only, never crossed) · load_to_form (in Library against a live Converger-HOLD, Condition 2 open). Earlier memory said "4" — corrected 2026-07-10 against the register itself.

See [[feedback_publish_delete_boundary]] (Kevin holds the gate), [[project_crossing_spine]] (the 8-step crossing sequence it enforces), [[project_the_converger]] (what routes material to PROMOTE-READY upstream of it).
