---
name: miro-handler
description: >-
  Infrastructure handler for all Miro board operations. Read-before-write
  protocol, tool grammar (layout/table/diagram/doc/comment/prototype), cost
  brake, board registry, and comment-to-gate channel. Triggers: "open miro
  board [url]", "run miro handler", "read board comments", "sync gate to board",
  or any Miro operation in the DSS context. NOT a background process — invoked
  per session.
---

# Miro Handler

One handler. Every Miro operation in DSS runs through it. The board is a
substrate — same discipline as the library, the gate, the membrane. Enter blind
and you accumulate. This handler enforces read-before-write, routes to the right
tool class, brakes on cost, and closes the comment-to-gate channel.

---

## Paths

```
Registry:     C:\Users\KMEAR\.claude\skills\miro-handler\board_registry.json
Grammar:      C:\Users\KMEAR\.claude\skills\miro-handler\tool_grammar.md
Gate root:    C:\Users\KMEAR\OneDrive\Desktop\DSS content\gate\
Gate script:  gate\gate.py  (run from gate root)
Gate data:    gate\data\gate_data.json
```

---

## Invocation triggers

| Phrase | Action |
|---|---|
| "open miro board [url or name]" | OPEN — full read-before-write entry |
| "run miro handler" | OPEN on last active board in registry |
| "read board comments [url or name]" | COMMENT CHANNEL only |
| "sync gate to board" | LIVE SYNC — gate counts → board table |
| "add session log to board" | SESSION LOG append only |
| any Miro build/edit request | OPEN first, then route via grammar |

---

## OPEN — read-before-write entry (run every session)

**Step 1 — Load registry.**
Read `board_registry.json`. Locate the board by URL or name. If not found,
add it: prompt for purpose + board type, append, confirm before proceeding.

**Step 2 — Read the board.**
Call `layout_read` on the board URL. Extract:
- Item count by type (shapes, connectors, tables, docs, diagrams, comments)
- Frame list with dimensions
- Any unresolved comments (flag for COMMENT CHANNEL if present)

Report one-line board state:
> *"DSS System Diagram · 46 items (37 layout + 2 tables + 5 docs + 2 unresolved comments) · last session: 2026-06-27"*

If item count exceeds registry's last-known count by more than 20%, surface
the delta before proceeding — don't write into a board that changed unexpectedly.

**Step 3 — Check cost brake.**
Read `session_item_budget` from registry entry (default 50 items/session).
If the requested operation would exceed it, stop and surface the count:
> *"This batch would add N items. Budget: 50/session. Proceed / reduce scope / split session?"*

**Step 4 — Route to grammar.**
Read `tool_grammar.md`. Map the request to the correct tool class. Never
default to layout_create when another class is more appropriate.

**Step 5 — Build.**
Execute. After each batch: update registry `last_read`, `item_count`, `last_session`.

**Step 6 — Session log.**
After any write operation, append a session-log shape to the board:
- Small TEXT item, bottom-right of active frame, outside content area
- Format: `[YYYY-MM-DD] +N items · purpose`
- Color: `#a89870` (gf — muted, non-distracting)

---

## COMMENT CHANNEL — comment → gate

Run after OPEN if unresolved comments are found, or invoked directly.

**Step 1 — List comments.**
Call `comment_list_comments` on the board URL. Filter: unresolved only.

**Step 2 — Stage each comment to gate.**
For each unresolved comment:
- Extract text, author, item URL (the item the comment is on)
- Stage to gate tray:
  ```
  python gate.py stage tray --json '{
    "title": "[MIRO] <first 60 chars of comment text>",
    "class": "zero-unset",
    "note": "board comment · item: <item_url> · <full comment text>"
  }'
  ```
- Call `comment_resolve` on the comment after staging. Do not resolve without staging first.

**Step 3 — Report.**
> *"2 board comments staged to gate tray and resolved on board."*

Fail-close: if gate.py stage fails for any comment, do NOT resolve that
comment on the board. Leave it unresolved so it surfaces again next session.

---

## LIVE SYNC — gate counts → board table

Syncs current gate_data.json counts into a table widget on the board.
Idempotent: creates the table if missing, updates rows if present.

**Step 1 — Read gate data.**
Read `gate\data\gate_data.json`. Extract:
- `spine_count`, `hold_count`, `queue_count`, `tray_count`
- `system_state` (AT REST / ACTIVE / ARMED)
- `rented_cognition_status`, `pile_direction`
- Date (from gate data or current date)

**Step 2 — Find or create gate table.**
Search board items for a table with label "GATE STATE". 
- If found: `table_sync_rows` with fresh data.
- If not found: `table_create` with 7 rows, position it below or beside the gate state snapshot shape.

**Table schema:**
| Field | Value |
|---|---|
| Date | YYYY-MM-DD |
| Spine | N |
| Hold | N |
| Queue | N |
| Tray | N |
| System | AT REST / ACTIVE |
| Pile | SHRINKING / GROWING / FLAT |

**Step 3 — Update registry.**
Set `last_sync` to current date in registry entry.

---

## DIAGRAM GENERATION — mermaid auto-draw

For relationship graphs, dependency maps, or anything structurally generated
(not hand-placed): use `diagram_create` with mermaid DSL.

Never hand-place a diagram that can be generated. Hand-placement is for
spatial/authority diagrams where position encodes meaning.

Mermaid is appropriate when:
- Showing which components call which (dependency graph)
- Showing data flow sequence (sequence diagram)
- Showing state transitions (state diagram)

Layout DSL is appropriate when:
- Position on the canvas encodes authority, tier, or load path
- The diagram IS the argument (Tree of Life geometry, spine/brake/I-O)

---

## DOC EMBEDDING — instrument specs on-board

For any instrument that governs a diagram component, create a doc widget
adjacent to that component:
- `doc_create` with the instrument spec text
- Position: immediately right of or below the governed component
- The doc and its component share a parent frame

This closes the loop: the diagram and what governs it are one object.

---

## Cost brake — hard limits

| Metric | Limit | Action at limit |
|---|---|---|
| Items per session | 50 | Stop, surface count, ask to reduce or split |
| Items per frame | 100 | Warn at 80, stop at 100 |
| Boards touched per session | 3 | Warn at 2, stop at 3 |
| Comment batch | 20 | Process 20, stage remainder for next session |

If a limit is hit mid-batch: complete the current item, stop, report partial
completion. Never silently truncate.

---

## Registry maintenance

After every session: update `board_registry.json`:
- `last_session`: today's date
- `item_count`: post-session count from layout_read
- `last_sync`: if LIVE SYNC ran

The registry is the handler's memory across sessions. Without it, every
session starts blind. Keep it current; it is cheap to update and expensive
to lose.

---

## What this handler does not do

- Does not mark anything as canon — that is the Membrane Controller
- Does not decide what to build — that is Kevin's mark
- Does not auto-run between sessions — invoked explicitly per session
- Does not delete board items without Kevin's explicit instruction
- Does not create new boards without Kevin's explicit instruction

*The board is a substrate Kevin marks on. This handler makes the tool
layer coherent so the marking can be clean.*
