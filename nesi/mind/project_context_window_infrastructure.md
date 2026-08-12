---
name: project-context-window-infrastructure
description: "How the infrastructure engages Kevin's data limits — sessions abandoned at context exhaustion is the pattern; work requires large lens; daily-cycle is the structural answer"
metadata: 
  node_type: memory
  type: project
  originSessionId: a4275d36-3134-48e4-a052-d5343a9dd5da
---

Named by Kevin at session close 2026-06-26.

**The pattern:** Kevin closes sessions by abandoning them when the context window runs up. This is not a failure mode — it is how he uses the tool. The infrastructure needs to account for it, not fight it.

**Why it matters for this work:** RI work operates at high abstraction. Holding the full framework — tetras, instruments, library, canon, ground state — requires a large context. Sessions at this level of abstraction naturally run longer before exhaustion. The close-out protocol needs to fire before exhaustion, not after.

**The structural answer:** The daily-cycle skill (item 4, unbuilt as of 2026-06-26). A session-boundary loop that closes what mark-record opens, captures what was live, stages it for the next session, and feeds the gate. It is the instrument that makes "abandon at context exhaustion" a clean handoff rather than a drop.

**Complementary tool built 2026-06-26:** `state_view.html` at DSS root — at-a-glance dashboard that addresses the cold-start tax. Open it first every session. Shows: 3 orientation questions, ground panel, pipeline stage counts, at-the-gate item with 3 moves ahead, backlog gauge (warn 15 / stop 20), all instrument links. Config object at top — update when STATE.md changes.

**Workspace UI design principle (named 2026-06-26):** Pre-flight at every decision point, 3 moves ahead, invisible when running, diagnostic when not. Tetra menu buttons are the prototype. The elevator standard: when it works, you don't see the system; when it breaks, the open circuit is visible.

**How to apply:** 
- `state_view.html` is the cold-start fix — tell Kevin to open it first if re-orientation is happening.
- Invoke close-out protocol when Kevin signals end-of-session.
- When a session is running long, proactively offer the close-out rather than waiting for exhaustion.
