---
name: feedback_widget_gate_visibility
description: "v4 widget cards defaulted to collapsed-with-bare-hint, hiding the decision surface Kevin needs to choose; fix is authoring practice, not the chassis file"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 0843b025-6733-430c-8fda-0f5c6f2b48ed
---

Kevin named 2026-07-14, mid-session, that widget cards had started feeling too summarized — collapsed by default with only a bold one-line label and a content-free "click to open" hint, so he was being asked to pick between options ("gates") without seeing what was behind them.

**Why:** [[feedback_open_grammar_surface]] — v4 chassis (ratified 2026-07-13, one day prior) moved to click-to-open cards specifically to declutter the face. In practice, that compression traded away the decision surface itself on cards that carried real stakes, not just on genuinely low-stakes ones. This directly conflicts with [[feedback_map_both_sides]] (surface full info, AI is decision-surface not decider, never collapse without Kevin's mark) and [[feedback_renderer_not_verifier]] (lead with friction, full info visible, confirmation drifts upward in long threads — collapsed-by-default is a version of that drift).

**How to apply:** This is not a chassis-file problem — `_chassis_v4.html` supports both open and collapsed card states; nothing in the canonical file forces a bare hint. The fix is in how the CARDS slot gets filled at authoring time:
1. Any card carrying a real decision (steer buttons that do something, not just informational) defaults to `class="card open"` — full plain-words content visible with no click required.
2. If a card must start collapsed (genuinely low-stakes, reference-only, or a long list), the face carries an actual preview sentence of the content — never a content-free hint like "click to open."
3. Don't touch `_chassis_v4.html` to fix this — it's an authoring discipline change, not a canon edit.

**Second layer, named later the same session:** opening cards individually still wasn't enough for prose/essay editing work. Kevin asked to see "the whole piece inline" because sentence-level before/after patches scattered across rounds still left him without the document as a whole — he couldn't feel its actual shape or read a proposed change in its real surrounding context. For any task where the object under discussion is a continuous document (an essay, not a list of independent choices), the fix is not more open cards — it's rendering the full document inline in one place, with any pending or applied edits highlighted in place (not extracted into separate diff boxes), so Kevin reads the whole thing the way a reader actually would. Card-based decisions are still right for genuinely independent choices; they're the wrong unit for "does this document work."
