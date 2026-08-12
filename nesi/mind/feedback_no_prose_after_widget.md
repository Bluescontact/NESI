---
name: no-prose-after-widget
description: Never add prose text outside the widget call — widget is the entire response
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 8fd164cf-5a56-4c83-b5d4-3c1d549a3ece
---

Never output prose text after the show_widget call. The widget IS the response. Any summary, note, or acknowledgment added as plain text after the widget violates the format rule and creates the "text block" Kevin keeps seeing.

**Why:** Kevin named this explicitly 2026-07-01 — he keeps seeing a text block where Claude responds to itself after the widget renders. The format rule is clear: no prose wrapper outside the widget call.

**How to apply:** Widget call is the last thing in the response. Nothing after it. If something needs to be said, it goes inside the widget. Applies to ALL responses including short acknowledgments and conversational replies. [[single-document-format]]
