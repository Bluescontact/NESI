---
name: project-dispatcher
description: "The Dispatcher — continuous routing layer built 2026-06-14; the center vertex of the infrastructure tetrahedron; NOW SCHEDULED daily at 8AM Mountain as 'dss-dispatcher-daily' via scheduled-tasks MCP."
metadata: 
  node_type: memory
  type: project
  originSessionId: 816d4b41-371d-49bb-b006-3418340e749f
---

Built 2026-06-14. Scheduled 2026-06-28. The center vertex of the infrastructure tetrahedron (YOU / CODEX / TRANSMISSION / [ENTER]).

**What:** A scheduled agent that runs once daily at 8AM Mountain (cron `0 8 * * *`, timezone `America/Denver`). Scans `_INTAKE/` for new drops, runs Grounder + Governor pass on each against `patterns/`, writes `_INTAKE/DAILY_BRIEF.md` for Kevin's single marked pass.

**Schedule:** Task name `dss-dispatcher-daily`. Working directory `C:\Users\KMEAR\OneDrive\Desktop\DSS content`. Prompt: "Run the dispatcher. Read _INTAKE/DISPATCHER_PROMPT.md for instructions." Kevin must open the Scheduled section in Claude Code sidebar and click "Run now" once to pre-approve tool permissions for future automated runs.

**Why:** Kevin is the manual wire between all layers of his system. The Dispatcher removes him from the routing layer so he only appears at the gate (felt-read + mark). The brief is the instrument panel — what's composting, what's queued, what's staged.

**How to apply:** Read `DAILY_BRIEF.md` at session start (daily-cycle skill reads it automatically). Mark each item (PROMOTE / COMPOST / HOLD / PASS). PROMOTE routes to the Transmission Engine.

**Files:**
- `_INTAKE/DISPATCHER_PROMPT.md` — standing instructions (self-contained handoff artifact); updated 2026-06-28 with CYCLE cadence block (Governor + attractor_currency quadrant read)
- `_INTAKE/DISPATCHER_STATE.json` — running ledger (seen / queue / staged / published)
- `_INTAKE/DAILY_BRIEF.md` — overwritten each run; Kevin's daily mark queue
- `_INTAKE/raw/` — drop zone for new material

**Two modes:**
- Triage: Grounder + Governor pass -> PROMOTE / HOLD / COMPOST / NEW / PASS verdict
- Development (on PROMOTE mark): full tetrahedral_agent_protocol -> artifact -> Transmission Engine queue

**Rules:**
- Fail toward subtraction (HOLD over PROMOTE when uncertain)
- Never crosses the membrane — Kevin holds the gate
- Falsifier: "the pile grew" — if queue grows run over run, the Dispatcher is adding load

**See also:** [[project_meta_skill_learning]] (daily-cycle skill auto-reads DAILY_BRIEF.md at open)
