---
name: feedback-widget-cards-open-sendprompt
description: "2026-07-19 correction — cards render OPEN by default (STILL LAW). The sendPrompt half is DEAD: reversed 2026-07-22, a mark copies, sendPrompt is not used."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 522a3aa1-fa51-44b0-b4b1-61f26cbc2a6d
---

**HALF DEAD — struck 2026-08-05, Kevin's mark ("strip the capcity bar line, and other dead lines").** The cards-open half is still law. The sendPrompt half was reversed on 2026-07-22 and issued a dead instruction for two weeks after that.

2026-07-19, Kevin's correction: "buttons for the widget dont fire. Display card as open, and each click puts the prompt in this box."

**Why:** v4.2's clipboard bridge (`navigator.clipboard.writeText`) did not work in the render pane — clicks silently did nothing. Closed-by-default cards also hid the decisions (same class as [[feedback_widget_gate_visibility]]).

**How to apply — the live half:** every card renders with class `open` by default, no click-to-open gate. This is now stronger than a preference: it is chassis law under depth-zero decisions (`nesi/mind/PROTOCOLS.md`) — every live decision renders open and markable at depth zero.

**DEAD, struck 2026-08-05 — do not apply:** this file used to instruct *"Steer buttons call `sendPrompt(text)` directly — the only working bridge into Kevin's chat"*, and declared itself as superseding [[feedback_click_populates_not_sends]]. **That is reversed.** The current frozen law, in PROTOCOLS.md § Widget Template: **SEND/COPY = A MARK COPIES.** Every steer click copies the mark text to the clipboard (navigator.clipboard → execCommand → reveal box); Kevin pastes, reads, edits, sends. **The widget never auto-sends; `sendPrompt` is not used.** The clipboard failure this file was written to route around is handled by the three-stage fallback in the chassis, not by sending on Kevin's behalf.

**Why the reversal held:** auto-send collapses composing and sending into one irreversible act — the exact failure [[feedback_click_populates_not_sends]] named. A copy is always safe and reversible, which is what lets the reading sit face-up beside the control instead of behind a confirmation gate.

The "v4.3 amendment awaits Kevin's mark" line is also dead — the v1–v10 chassis lineage was retired and composted into DS_v1 on 2026-07-28.
