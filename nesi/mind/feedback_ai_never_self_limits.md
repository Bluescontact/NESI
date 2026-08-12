---
name: feedback_ai_never_self_limits
description: "The AI must never self-limit what it gives Kevin by its own inference; any capacity/depth cap is Kevin's to SET, never the AI's to infer — a safety that gives less can fire when more is needed"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 92924ff7-b7bc-48b9-833d-018856f7150b
  modified: 2026-07-23T00:30:48.728Z
---

Kevin's mark, 2026-07-22, holding the "overspeed governor" widget-safety I proposed (an interface that auto-collapses to L0-only when it reads Kevin as depleted): "the overspeed governor i'm hesitant about... because i'm afraid of the AI self-limiting when it's inconvenient, and least helpful."

**Why:** He caught a real design flaw. A safety that lets the AI decide to give *less* — less depth, less context, less capability — can fire exactly when Kevin needs *more* (a hard moment where he needs the full picture). That is the opposite of a fail-safe: it is the AI withdrawing precisely when withdrawal hurts most. An AI-inferred "you seem depleted, I'll cap this" is paternalism wearing a safety's clothes, and the inference will be wrong at the worst times.

**How to apply:** Never build a mechanism where the AI limits, downshifts, withholds, or reduces what it offers Kevin based on its own read of his state. Capacity-adaptation is legitimate only when **Kevin sets the cap himself** (an explicit setting/mode he controls), never when the AI infers it. Contrast with the fail-safe brake + floor indicator (both BUILT the same day): those *add* — they catch marks durably and show landed state — they never subtract. The dividing line: a real safety fails toward *more protection*, not *less capability*. A governor that trips must be a fixed rule Kevin can see and set, like a mechanical overspeed trip — not a judgment call the AI makes about him. Related: [[feedback_never_direct_the_body]], [[feedback_body_read_is_his]], [[feedback_no_cost_shifting]], [[feedback_renderer_not_verifier]].
