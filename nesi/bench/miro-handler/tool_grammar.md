# Miro Tool Grammar

Decision tree: what to reach for when. Read this before any build operation.
The wrong tool class produces the right output in the wrong substrate — which
means it can't be maintained, synced, or extended later.

---

## Primary question: does the content change over time?

**YES — content is live / updates between sessions:**
→ `table_create` / `table_sync_rows`
Examples: gate counts, system state, item tallies, session logs with numbers

**NO — content is structural / placed once:**
→ continue to next question

---

## Is the structure generated (derived from rules) or composed (positioned by intent)?

**GENERATED — relationships are the content, position doesn't matter:**
→ `diagram_create` with mermaid DSL
Examples: dependency graphs, call graphs, sequence diagrams, state machines,
any "A calls B calls C" structure

**COMPOSED — position encodes meaning (tier, authority, load path):**
→ `layout_create` / `layout_update`
Examples: spine/brake/I-O diagram, Tree of Life geometry, authority flow where
left/right/up/down carries signal

---

## Is this prose, specification, or contextual annotation?

**YES — narrative text, instrument specs, pattern descriptions:**
→ `doc_create` / `doc_update`
Place adjacent to or inside the frame it governs.
Examples: instrument spec next to its component, pattern text next to a node,
contextual annotation for a frame

**NO — a brief label, state snapshot, or short annotation:**
→ `layout_create` with SHAPE or TEXT type
Keep it under 6 lines. Longer than that → doc.

---

## Is this a signal Kevin leaves during review?

**YES — Kevin marks on the board, system should hear it:**
→ `comment_create` (Kevin) / `comment_list_comments` + `comment_resolve` (handler)
Comments are the gate channel. Handler reads and stages them on next OPEN.

**NO — Claude is placing content, not Kevin marking:**
→ use appropriate class above; comments are not a content tool

---

## Is this a tool visitors use (not a diagram they read)?

**YES — interactive, input/output, visitor operates it:**
→ `prototype_create`
Examples: Circuit Tool embedded on the board, Gift Circle map, any form-like
experience that takes input and returns output

**NO — content for reading / reference:**
→ appropriate class above

---

## Quick reference

| Need | Tool class |
|---|---|
| Live counts / data that changes | table_create + table_sync_rows |
| Generated relationship graph | diagram_create (mermaid) |
| Spatial / positional diagram | layout_create / layout_update |
| Instrument spec / prose annotation | doc_create / doc_update |
| Short label / state snapshot ≤6 lines | layout SHAPE or TEXT |
| Kevin's mark / signal to gate | comment (Kevin places; handler reads) |
| Interactive tool visitor uses | prototype_create |
| Read current board state | layout_read (always first) |
| Find existing items by type | board_list_items + filter |
| Search across boards | board_search_boards |

---

## layout_create batch limit

**Max ~3 items per layout_create call.** Batches of 4+ return HTTP 400 with
no useful error message. Split large creates into sequential calls of ≤3 items.
Discovered 2026-06-27 — single items and 3-item batches confirmed working;
5- and 8-item batches both failed.

---

## Anti-patterns — do not do these

- **Do not use layout SHAPE for live data.** A snapshot shape goes stale.
  Gate counts → table. Snapshot shape → one-time orientation note only.

- **Do not use layout for relationship graphs.** Hand-placing a call graph
  that mermaid can generate in one DSL block is maintenance debt.

- **Do not embed long prose in SHAPE content.** Shape text is for labels
  and short annotations. Three sentences max. Beyond that → doc.

- **Do not create without reading first.** layout_read is the entry condition,
  not optional. A create against a stale mental model duplicates or misplaces.

- **Do not use comments as a content layer.** Comments are Kevin's signal
  channel. Handler-generated comments pollute the gate channel.

---

## Compound operations — what to reach for first

**"Add a live gate state widget"**
1. layout_read to find existing gate state snapshot shape (if any)
2. table_create adjacent to it (or in its place)
3. table_sync_rows from gate_data.json
4. doc_create with one-line label "GATE STATE — live sync"

**"Document an instrument on the board"**
1. layout_read to find the component's shape URL
2. doc_create with instrument spec text, positioned right of component
3. layout_create with a thin connector: component → doc (dashed, muted)

**"Auto-draw the skill dependency graph"**
1. Read skills/ directory for invocation chains
2. diagram_create with mermaid flowchart LR
3. layout_create a frame around it with label "SKILL DEPENDENCIES"

**"Wire Kevin's comment to the gate"**
1. comment_list_comments — filter unresolved
2. For each: gate.py stage tray → comment_resolve
3. Report count staged

*Grammar is decided before the first tool call, not after the first shape
appears. The substrate shapes the work; the work should not fight the substrate.*
