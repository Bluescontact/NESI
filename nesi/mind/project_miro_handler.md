---
name: miro-handler
description: Miro Handler skill — infrastructure handler for all Miro board operations; built 2026-06-27
metadata: 
  node_type: memory
  type: project
  originSessionId: bebb7d5a-58c8-46f5-93a1-7889a5b5d1ce
---

Miro Handler skill LIVE 2026-06-27 at `~/.claude/skills/miro-handler/` (3 files: skill.md · board_registry.json · tool_grammar.md).

**Why:** every prior Miro session started blind — no read-before-write, no tool grammar, no cost awareness, no session memory, no comment channel. The handler applies the same discipline as the Gate/Governor/Membrane to the board substrate.

**Six components:**
1. Board Registry (`board_registry.json`) — known boards, purpose, item count, session history; never enter a board without reading this first
2. Tool Grammar (`tool_grammar.md`) — decision tree: layout (spatial/positional) · table (live data) · diagram/mermaid (generated graphs) · doc (prose/specs) · comment (Kevin's gate channel) · prototype (interactive tools visitors use)
3. Read-Before-Write — `layout_read` is the entry condition on every OPEN; extract item count, frame list, unresolved comments before any write
4. Cost Brake — 50 items/session budget; 100 items/frame ceiling; session-log shape appended after every write batch
5. Comment → Gate Channel — unresolved board comments staged to gate tray via `gate.py stage tray`; comment resolved only after successful staging (fail-close)
6. Live Sync — `table_sync_rows` pulls gate_data.json counts into a GATE STATE table widget on the board

**Triggers:** "open miro board [url/name]" · "run miro handler" · "read board comments" · "sync gate to board" · any Miro operation in DSS context

**Falsifier:** if the handler adds more surface to maintain than it removes, it failed.

**Board Registry seed:** DSS System Diagram at `https://miro.com/app/board/uXjVHOR5Kfg=/` — 85 items post v2 + track zones + rhombus tetrahedron frame, last session 2026-06-27. Two frames: linear diagram (x=1400,y=0,w=7200,h=3600) + rhombus tetrahedron (x=1400,y=3900,w=5200,h=5300).

**How to apply:** invoke miro-handler before any Miro board work; the skill loads board state, routes to the right tool class, tracks cost, and channels Kevin's comments to the gate.
