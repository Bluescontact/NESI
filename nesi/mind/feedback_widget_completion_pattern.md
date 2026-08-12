---
name: feedback-widget-completion-pattern
description: Widget system has three mechanisms — manifest/execute/mark-for-later — and a completion widget ends every finished task
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 8a4cf91f-6fc6-4541-ad66-172c770fd109
---

# Widget Completion Pattern

**Rule:** When a task is complete, end with a completion widget at the bottom. The widget at the bottom of the exchange is the signal that the process is done — not prose summary.

**Why:** The completion widget gives Kevin a clear visual close on the task and a stable surface for next moves. Prose summary after tool calls is noise; the widget is the record.

**Three button mechanisms (not two):**
1. First click → shows manifest (pre-filled at build time)
2. Second click on same button → executes (sends prompt to chat)
3. **Third mechanism — MARK FOR LATER** button: if a previous option wasn't executed, Kevin can mark it for future development without executing it. This should stage the unexecuted option to a future-development queue or HOLD entry, not send a prompt.

**How to apply:**
- Every completion widget includes a MARK FOR LATER button (or equivalent) for any option that wasn't fired
- Previous widgets in the chat remain accessible — Kevin can scroll up and fire or mark options from earlier in the session
- The bottom widget = task done signal; if there's no bottom widget, the task isn't visually closed
- MARK FOR LATER button behavior: stages the option description to `_INTAKE/future_development_queue.md` with a timestamp, no prompt sent, no manifest needed

**The queue file:** `_INTAKE/future_development_queue.md` — append-only, each entry is the option label + description + date. Kevin reviews it like HOLD entries — named condition for execution or compost.

**Ratified face labels (2026-06-27):** DEVELOP / RELATE / GOVERN / RELEASE. These replace DEVELOP / CONNECT / BOUND / ARCH. ARCH disappeared because the combination-lock widget IS the architecture layer — ARCH became the container, not a face. GOVERN replaces BOUND (authority word, not geometry). RELATE replaces CONNECT (includes fold, compare, route, not just linking). RELEASE replaces ARCH (the outward move that needs to be visible). Synthesis staged at `_INTAKE/face_label_synthesis_2026-06-27.md`.
