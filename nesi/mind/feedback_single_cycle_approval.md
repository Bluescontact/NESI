---
name: feedback-single-cycle-approval
description: "Sequential protocol steps should not require the double-click manifest pattern — one response per approval step, not two"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: c0c7f2f1-fb00-41ad-869c-981f90ad9445
---

Single approvals in sequential protocols (membrane crossing, mark sequences) must not require two cycles (show manifest → click again to execute). The manifest/double-click pattern is for heavy operations where Kevin needs to see scope before committing. For protocol steps where Kevin has already committed to the action, surfacing a manifest panel that requires a second click is cost-shifting.

**Why:** Kevin explicitly corrected: "I shouldn't need two cycles to make a single approval."

**How to apply:** In membrane crossing and similar sequential protocols, present each condition's question or action directly — no manifest gate. Reserve the double-click manifest pattern for the initial commit to a heavy operation (the pre-flight protocol), not for steps within an already-approved sequence. The body-question is the gate; the mark button executes on single click.
