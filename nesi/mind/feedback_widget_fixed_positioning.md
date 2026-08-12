---
name: feedback-widget-fixed-positioning
description: position:fixed breaks in the visualize iframe — menu and manifest must be in-flow
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 32f5fb29-3fc2-4090-a068-912fd322f762
---

The `show_widget` tool renders inside an iframe that sizes itself to in-flow content height. `position: fixed` elements collapse the iframe to `min-height: 100px` and become invisible or unreachable.

**Why:** The visualize iframe viewport is determined by in-flow content. Fixed elements escape normal flow, so the iframe doesn't account for them — they render outside the visible area or collapse the container.

**How to apply:** In all widget responses, the `.menu` and `.manifest` blocks must use in-flow positioning, not `position: fixed`. Place them at the bottom of `.wrap` as normal block elements. The CLAUDE.md template uses `position: fixed` — override this every time by replacing with `margin-top: 24px; border-top: 1px solid var(--bdr); padding: 10px 0` on the menu div, and keeping the manifest as a toggled block directly above it in the DOM.
