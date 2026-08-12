---
name: feedback-widget-rendering
description: Widget rendering stopped mid-session 2026-06-30; fix is fragment-only HTML (no DOCTYPE/html/head/body) per show_widget tool spec
metadata: 
  node_type: memory
  type: feedback
  originSessionId: bc65bb5d-2b01-4419-b00c-abb137b72180
---

The mcp__visualize__show_widget tool spec says: "No DOCTYPE, <html>, <head>, or <body> — just content fragments." Wrapping in a full HTML document causes widgets to stop rendering visibly mid-session.

**Why:** The show_widget tool renders inside an iframe that already provides the document shell. Wrapping in full HTML document tags (DOCTYPE, html, head, body) conflicts with the iframe's own document structure, causing silent render failure — the tool returns "Content rendered and shown to the user" but nothing appears.

**How to apply:** Strip the full document wrapper from the fragment passed to `show_widget`. Keep ALL the CSS (in a `<style>` tag at the top of the fragment — a fragment with no `<style>` renders unstyled), keep all the content and script — just remove DOCTYPE, `<html lang="en">`, `<head>`, `<meta>`, and `<body>` tags. Start the widget_code directly with `<style>...</style>` then the content div.

**Scope the styles.** The pane strips `:root`- and `body`-keyed rules from fragments. Scope every rule under a wrapper class instead (B2, `nesi/mind/PROTOCOLS.md`). The DSS tokens (--bg, --sf, --sf2, --g, --gb, --gd, --gf, --bdr) stay identical.

**Note:** the file written to disk is a full HTML document; only the fragment handed to `show_widget` is stripped. Those are two different artifacts of the same content.

**New finding 2026-07-01 (continued session):** Fragment-only also fails in continued sessions (resumed after context compression). The first widget of a session may render; subsequent ones silently fail even with correct fragment structure. Root cause unknown — likely a session/iframe state issue, not an HTML structure issue. This is why the write-to-file step is the load-bearing one and `show_widget` is the aspirational one.

**The two-step protocol (2026-07-01, still live in amended form):** write the file first, then attempt `show_widget`. Now steps 4 and 6 of the six-step render protocol in `nesi/mind/PROTOCOLS.md`.

**DEAD, struck 2026-08-05, Kevin's mark ("strip the capcity bar line, and other dead lines") — do not apply:**
- *"Write tool → `_widgets\latest.html`"* — **the shared file is banned.** Two live sessions clobber each other on it; last writer wins (race condition found 2026-07-09). Every session writes `_widgets\latest_<slug>.html`, where `<slug>` is the first 8 characters of the session id. See [[feedback_per_session_widget_file]].
- *"PostToolUse hook fires automatically, opens file in Launch preview panel."* — **the auto-open hook was removed 2026-07-02** on Kevin's instruction ("can you stop opening the widget in a tab on firefox"). Nothing launches a browser on write. The Launch panel follows the most-recent write on its own; Kevin opens the file when he wants it. See [[feedback_no_auto_open_browser]].
- *"The tetra menu and manifest pattern stay identical."* — the tetra menu was retired 2026-07-02.
