---
name: feedback_derive_dont_store_count
description: A count with more than one writer WILL drift; the fix is never to reconcile copies but to derive from the single authority — the boundary that makes the conflict obsolete
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 92924ff7-b7bc-48b9-833d-018856f7150b
  modified: 2026-07-22T23:37:07.546Z
---

Kevin's lens, 2026-07-22: after the canon count showed four disagreeing values (gate_data.json=69, memory=86/96, disk=100, crossing records=51), he said "update it to 100... but figure out why the counts keep drifting, and identify the upstream boundary that makes the conflict obsolete."

**Why:** The drift was never a counting error. Canon count was STORED as independent state in ≥4 places, each written by a different actor at a different time, DECOUPLED from the one event that actually changes canon — a membrane crossing. Any stored copy not refreshed in the same step as the count-changing event is a cache guaranteed to go stale. Reconciling the copies (what I kept doing) treats the symptom; the disease is duplicated authority.

**How to apply — the boundary move:** don't reconcile copies, collapse them. A quantity has exactly ONE authority (here: `patterns/*.md` on disk — the membrane's own output). Every other appearance must be DERIVED from it at read time, or be a rewritten-from-source cache with a SINGLE writer, never an independently hand-maintained number. Enacted: `gate_data.json` `canon_global` is now rewritten from `len(patterns/*.md)` by `tools/ghost_gate_reconcile.py --apply` every dispatcher pass — proven drift-proof (corrupt it to 42, next pass self-heals to 100). Once no second independent number exists, "which is right?" cannot be asked.

This is a general design lens, not a one-off: whenever two places can independently assert the same fact, they will eventually disagree. Find the single authority (usually the event/artifact that changes the fact), make everything else derive from it, and the conflict becomes structurally impossible rather than perpetually reconciled. Same shape as the interface-boundary fix earlier this session (the widget's missing `<style>` upstream of every downstream class). Related: [[project_canon_maturity]], [[feedback_pretriage_never_gates]], [[project_membrane_controller]].
