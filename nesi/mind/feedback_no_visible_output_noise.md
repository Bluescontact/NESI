---
name: feedback-no-visible-output-noise
description: "[Your previous response had no visible output] system notifications are noise — widget in Launch panel IS the visible output"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 16727476-96d7-4a7e-939f-c4ebad2a388c
---

The system notification "[Your previous response had no visible output]" fires when a chat response has no prose text. This is noise — not a real signal from Kevin.

**Why:** The widget written to `_widgets/latest_<slug>.html` shows in the Launch panel, which follows the most-recent write. That IS the visible output. Kevin sees it and uses it as the decision surface. The chat pane having no text is correct behavior, not a failure.

**Dead line struck 2026-08-05** (Kevin's mark, "strip the capcity bar line, and other dead lines"): this used to say the widget *"opens in the Launch panel via the PostToolUse hook"* and named the shared `_widgets/latest.html`. **Both are dead** — the auto-open PostToolUse hook was removed 2026-07-02, and the shared file was replaced by per-session files on 2026-07-09. The rule below is unaffected and still law.

**How to apply:** When this notification appears, do not add prose or repeat the widget. The widget already rendered in the Launch panel. Hold the pattern: widget only, no prose wrapper, no response to the notification.
