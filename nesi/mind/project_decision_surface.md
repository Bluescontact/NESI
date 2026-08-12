---
name: project_decision_surface
description: "THE_DECISION_SURFACE instrument — collapses Converger's PROMOTE-READY set to one inhabitable gate object; built 2026-06-25"
metadata: 
  node_type: memory
  type: project
  originSessionId: 223083f0-7f87-4c21-837b-213738986530
---

THE_DECISION_SURFACE is the exit-side completion instrument, built 2026-06-25 at `THE_DECISION_SURFACE.md` (DSS root). It sits between the Converger's PROMOTE-READY output and Kevin's gate.

**What:** Takes all PROMOTE-READY candidates → selects one (by density → age → falsifier strength) → renders it as AT THE GATE in the DAILY_BRIEF.md. All others held invisible in `pending_decision` in DISPATCHER_STATE.json until the gate clears.

**Why:** The Converger routes candidates but still hands Kevin a list. Reading is derivative work; deciding which item to read is cost-shifting. The Decision Surface completes the differentiation so Kevin inhabits one object, not a sorted pile. Membrane collaboration pattern is the spec.

**AT THE GATE format:** pattern name + one arrived-at sentence + 2-3 canonical links + falsifier + one-breath somatic question + [ PROMOTE ] · [ COMPOST ]. No queue number, no options, two moves.

**Wired into:** `_INTAKE/DISPATCHER_PROMPT.md` — Decision Surface pass added after Converger gate, before brief generation; AT THE GATE section added to brief format between RECOGNITION and QUEUE; QUEUE section now shows HOLD/NEW only (not PROMOTE-READY); `pending_decision` and `current_gate` fields added to DISPATCHER_STATE.json spec.

**Body-question composer** added as new section in THE_DECISION_SURFACE.html: three question types (settlement / recognition / cost) with selection rules and composition formula. The open variable is now specified.

**Format shift 2026-06-25:** All four instrument specs converted to self-contained HTML (double-click to open, shareable). THE_GOVERNOR.html / THE_CONVERGER.html / THE_DECISION_SURFACE.html / THE_DEVELOPMENT_MODE.html all live at DSS root. DISPATCHER_PROMPT.md stays .md (agent instruction file). Old .md instrument files still exist — Kevin holds the delete gate.

**How to apply:** When running the dispatcher, check `current_gate` first — occupied gate holds; cleared gate advances the next from `pending_decision`.

[[the_converger]] → [[the_governor]] → [[membrane_collaboration]]
