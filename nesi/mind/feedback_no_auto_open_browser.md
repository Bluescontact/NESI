---
name: feedback-no-auto-open-browser
description: "No auto-opening latest.html in the browser — hook removed 2026-07-02 at Kevin's instruction; the file is written silently, Kevin opens it when he wants it"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 68a060c5-1844-4082-8097-c41464c8c048
---

2026-07-02, Kevin: "can you stop opening the widget in a tab on firefox." The PostToolUse hook in `~/.claude/settings.json` that ran `Start-Process` on `_widgets/latest.html` was removed the same turn; the UserPromptSubmit format-rule text was updated to say "NO auto-open."

**Why:** every response was spawning a Firefox tab — interruption, not service. The Launch preview panel and the inline widget already show the render.

**How to apply:** keep writing the widget file every response (it remains the load-bearing persistent copy per [[feedback_single_document_format]]), but never reintroduce an auto-open hook, `Start-Process`, or any browser-launch on write. Kevin opens the file on his own action. Same principle as [[feedback_no_auto_response_to_notifications]]: the system holds; Kevin moves.

**Dead line struck 2026-08-05** (Kevin's mark, "strip the capcity bar line, and other dead lines"): this used to say *"keep writing `latest.html` every response."* **The shared `latest.html` is banned** — concurrent sessions clobber it, last writer wins (2026-07-09). Every session writes its own `_widgets\latest_<slug>.html`. See [[feedback_per_session_widget_file]]. The no-auto-open rule above is unaffected and still law.
