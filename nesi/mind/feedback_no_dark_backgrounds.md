---
name: feedback-no-dark-backgrounds
description: "Don't use dark backgrounds on deployed pages — harder to read on many screens"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 5efa28a9-fbfa-4880-bb42-c81afc5a723d
---

Use light backgrounds for all deployed pages, especially public-facing ones.

**Why:** Dark backgrounds are harder to read on many screens — projectors, phones in daylight, older displays. Kevin flagged this directly when preparing to show a page to a consultant.

**How to apply:** When building pages on Lettherobotsbuild, OSG, or any public-facing site, default to the light theme variables (`--bg`, `--surface`, `--surface-raised`). Override `body { background: var(--bg); }` explicitly if the site's core.css defaults to a dark atmospheric background. Template blocks, cards, and content panels should use `--surface` (white) with dark text. Reserve dark panels only when Kevin explicitly requests them.
