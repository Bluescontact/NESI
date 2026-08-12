---
name: click-populates-not-sends
description: "Widget steer buttons copy to clipboard, not auto-send and not an in-widget composer — Kevin pastes into his own real chat box"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 12e51a45-a033-4a77-bfce-66d3b9b3d1cc
---

Steer-button clicks in the DSS widget chassis copy the direction to the clipboard and stop there. Kevin pastes (Ctrl+V) into his own real chat input — the one outside the widget's iframe — reads it, edits if he wants, sends when he sends.

**Why:** Two-step correction, both from Kevin, same day 2026-07-15. First: "I should be able to click once to paste the button response into the text box" — auto-send (the original v4 behavior) collapsed composing and sending into one irreversible act. My first fix populated an in-widget composer textarea instead — wrong target. Kevin named it directly: "the only if you'd rather box is something I've never used. The text I use is this one" — meaning Claude's actual chat input, not anything inside the widget. There is no host-provided bridge that fills that real box without sending (`sendPrompt()` sends instantly, no fill-only variant exists) — clipboard copy is the only real mechanism available.

**How to apply:** This corrects [[feedback_open_grammar_surface]] (chassis v4's original auto-send) and supersedes my own first attempt at this same fix (in-widget composer, also wrong). Landed in the canonical `go()` function in `_chassis_v4.html`, now v4.2 (corrected 2026-07-15): every click calls `navigator.clipboard.writeText(t)` and shows "copied — paste into your chat box with Ctrl+V" in the status line. The in-widget composer/textarea and its CSS (`.composer`, `.comp-row`, `.comp-send`) were removed entirely — it was dead weight nobody used. Any future widget-building session must carry this forward — do not reintroduce an in-widget composer or auto-send from an older cached chassis copy or from memory.
