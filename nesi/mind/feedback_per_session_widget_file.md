---
name: feedback_per_session_widget_file
description: "Widget render protocol writes to a per-session file, never the shared latest.html — concurrent sessions were clobbering each other"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: f514a600-6aad-4b4f-8a54-4d64c32730c0
---

Ratified 2026-07-09. The widget render protocol used to write every session's widget to one global file, `_widgets/latest.html`. With two sessions alive at once (found live: an organ-list thread + a Heartland brake thread), that file is a shared mutable write-target with no lock — last writer wins, the other thread's widget is lost or half-overwritten mid-edit ("file modified since read" collision). This is a race condition, not a render bug; the resumed-session `show_widget` no-op (see [[feedback_widget_rendering]]) was a red herring sitting on top of it.

**Why:** one path, many concurrent writers = cross-thread overlap. Kevin caught it: "the latest chassis is one thing being used by multiple sessions, causing overlap between different threads."

**How to apply:** each session writes to `_widgets/latest_<slug>.html`, where `<slug>` = first 8 chars of the session id (the UUID in the scratchpad path); optional human tag appended (e.g. `latest_f514a600_organ.html`). NEVER write the shared `latest.html`. The Launch panel follows the most-recent write, so the active session's widget still shows automatically — no cost to the panel. Both layers were updated: CLAUDE.md step 3 and the `UserPromptSubmit` hook in `~/.claude/settings.json`. Related: [[feedback_widget_rendering]], [[feedback_no_auto_open_browser]], [[feedback_open_grammar_surface]].
