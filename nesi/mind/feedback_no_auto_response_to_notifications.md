---
name: no-auto-response-to-notifications
description: Task-notification events are not user messages — do not auto-render completion widgets; hold until Kevin speaks
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 8fd164cf-5a56-4c83-b5d4-3c1d549a3ece
---

When a background agent completes and fires a task-notification, do NOT automatically render a completion widget or act on the result. Task notifications are system events, not user messages. Kevin has not asked for anything — hold until he speaks.

The system message `[Your previous response had no visible output. Please continue and produce a user-visible response.]` is **infrastructure noise**, not Kevin speaking. The Threshold organ (AI Constitutional Stack) must classify this as a system event before acting. When `show_widget` has already fired and returned "Content rendered and shown to the user," this system message is a false signal — the output exists in the Launch panel. Do not respond with prose. Hold until Kevin's next actual message.

**Why:** Kevin named this 2026-07-01 — he sees Claude responding to itself (auto-rendering completion widgets on task notifications) when no response from Kevin has occurred. The "no visible output" loop is the same pattern: show_widget fires → system notification → Claude responds with prose → Kevin frustrated. Threshold must catch this before the prose fires.

**How to apply:** On task-notification receipt OR "[no visible output]" system message: read the result, hold it in context, wait for Kevin's next message. Only render completion content when Kevin asks. Threshold organ classifies "[Your previous response had no visible output]" as infrastructure noise when show_widget already returned success. [[no-prose-after-widget]] [[ai-constitutional-stack]]
