---
name: feedback-single-document-format
description: "ALL responses return as a single HTML widget — no exceptions except trivial one-liner clarifications. No prose outside the widget, ever. Corrected 2026-06-27 after lapse."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 32db604c-c862-4459-be9c-5e5d60dd9663
---

Kevin confirmed 2026-06-26 and re-corrected 2026-06-27: the single-document HTML widget is the ONLY format for responses. No prose outside the widget at all — not manifests, not questions, not orientation summaries. If content, state, a build result, a question, or a manifest needs to be communicated, it goes inside the widget.

**The rule (hard):** Every response that contains any content beyond a one-word acknowledgment MUST be a `show_widget` HTML artifact and nothing else. No text before the tool call. No text after the tool call. The widget IS the entire response.

**Why:** Kevin re-corrected this 2026-06-27 after the session lapsed into prose. The visual interface lapses when Claude outputs text first "just this once." There is no "just this once." The rule is always.

**How to apply:**
- When in doubt: build the widget, write it to the per-session file, call `show_widget`, output nothing else.
- Manifests go inside the widget (table format, **six** fields visible — see the pre-flight table in `nesi/mind/PROTOCOLS.md`).
- Questions go inside the widget, as a tile with pre-authored exits (B1 — a surface that requires Kevin to type in order to leave is a build failure).
- Even short answers go inside the widget.
- Light background only (`--bg`/`--surface`; see [[feedback_no_dark_backgrounds]]).
- Short tool-call status lines mid-execution are fine ("Reading files." etc.) — those are not responses, they are progress narration.

**The current form is DS_v1** — board + rooms + tiles, the five slots named in PROTOCOLS.md § Widget Template. This file governs *that every response is one widget*; it does not govern the widget's shape. PROTOCOLS.md does.

**DEAD, struck 2026-08-05, Kevin's mark ("strip the capcity bar line, and other dead lines") — do not apply:**
- *"The tetra menu with `sendPrompt()` buttons is always at the bottom."* **The tetra menu was retired 2026-07-02** by the open-grammar mark (every edge clickable, no button bar) and nothing in the nine chassis generations since brought it back. DS_v1's bottom carries the hold/deposit chip row. **Note the live conflict:** the `UserPromptSubmit` hook in the vendor `settings.json` still instructs "Include the tetra menu with manifest pattern at the bottom of every widget." That hook has not been amended — it is an open decision, unmarked.
- *The "Button fix (2026-06-27, hardened)" paragraph* on calling `sendPrompt` via the onclick attribute. **`sendPrompt` is not used.** A mark copies (PROTOCOLS.md § Widget Template, frozen rules).
- *The "Button manifest (2026-06-27)" paragraph* specifying buttons as taller cards with an inline manifest. Superseded by the DS_v1 tile — click-anywhere open, `zone-read` carrying the reading, then the DECIDE/CROSS register split. The principle it was protecting survives and is stronger: reading is never gated behind the act.
