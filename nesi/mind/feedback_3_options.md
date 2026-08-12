---
name: feedback-3-options
description: "The tetra menu — RETIRED 2026-07-02 (open grammar). Its principles carried forward into DS_v1 and the Four Boundaries; the structure and the sendPrompt activation are dead."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: e80b485f-722c-4d37-8fe1-77dbd9b33190
---

**STRUCTURE RETIRED — struck 2026-08-05, Kevin's mark ("strip the capcity bar line, and other dead lines").** The tetra menu was a bottom-of-widget button bar: up to six moves plus the Mark. **Chassis v2 retired it on Kevin's 2026-07-02 mark** — the open-grammar move, every edge clickable, no button bar — and none of the eight generations since brought it back. DS_v1's bottom carries the hold/deposit chip row instead. This file is kept because its *principles* are load-bearing and still in force; its *structure* is not.

**LIVE CONFLICT, unresolved:** the `UserPromptSubmit` hook in the vendor `settings.json` still instructs *"Include the tetra menu with manifest pattern at the bottom of every widget."* That hook has issued an instruction for a retired control since 2026-07-02. Amending it is an open decision, unmarked — named here rather than acted on.

---

## What carried forward — still law, under other names

**Never a trailing question.** Trailing questions run Kevin the wrong way. This hardened into **B1 · pre-authored exits are chassis law** (`nesi/mind/PROTOCOLS.md`): no decision may render without its exits pre-written at authoring time; a surface that requires Kevin to type in order to leave is a build failure. Typing stays available, never the toll.

**Contextual labels, not category words** (evolved 2026-06-26). The labels were generic (Deepen · Build · Branch · Run · Ground · Rest); Kevin named the problem — generic labels leave interpretation work on his side, and that is load. The label IS the navigation instrument: it names the specific move, not the category.
- *Before:* `[Deepen ↗]` — Kevin must interpret what "deepen" means right now
- *After:* `[Close the brief loop ↗]` — Kevin knows exactly what fires

This now lives in the DS_v1 tile one-liner and in each exit's own face. The with-Kevin / without-Kevin split that organized the old slots survives as the **DECIDE / CROSS register split** in the tile body.

**The nano-bot principle (named 2026-06-26):** the workshop reshapes itself around what Kevin is holding — Kevin doesn't navigate to the tools, the tools surface at the object. This is the ancestor of **the Locatable Move** (locate, never steer) and of **depth-zero decisions** (every live decision open and markable without entering anything).

**The number follows what is live (named 2026-07-01 as an anti-pattern).** Three buttons every response is stale; artificially filling slots costs Kevin attention and signals a template rather than a read of the room. If one move is obvious, one. This became **B3 · the decision list is derived, never authored** — decisions derive from the open marks, the gates, and the session's live forks; never composed fresh, never padded, never collapsed to fewer than live.

**Manifests are pre-filled at authoring time, not inferred at runtime.** Still law, in PROTOCOLS.md § Pre-flight: *"heavy edges and cards carry their manifest pre-filled in OPTIONS — shown face-up before executing. Authored at build time, never inferred at runtime."*

**Reading is never gated behind the act.** The old rule was "the manifest renders always-visible and pre-filled, never `display:none` toggled — zero clicks required to read the first option." Now a frozen rule of the widget template and a standing law in its own right: the full object of a decision renders on the same surface as its control, above it, before any mark is asked for.

**No `position:fixed`.** Still a hard rule — the iframe sizes itself to content height, and fixed elements collapse invisible below the viewport.

---

## DEAD — struck 2026-08-05, do not apply

- **The structure itself:** "up to 3 spokes with Kevin · up to 3 far-face without Kevin · the Mark, always present," rendered as a menu at the bottom of every response. Retired 2026-07-02.
- **Rule 5, the activation gesture:** *"Double-click fires the command — `ondblclick` calls `sendPrompt()`. Single click = select, double-click = commit."* **`sendPrompt` is not used.** The current frozen law is SEND/COPY = A MARK COPIES: every steer click copies the mark text to the clipboard; Kevin pastes into his real chat box, reads, edits, sends. The widget never auto-sends. See [[feedback_click_populates_not_sends]] and [[feedback_widget_cards_open_sendprompt]].
- **Tiles as selection-only surfaces** that merely switch which manifest is foregrounded. In DS_v1 the tile carries its own reading and its own exits; there is no separate manifest panel to switch.
