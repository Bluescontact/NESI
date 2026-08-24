# GIFT · the load-bearing test — a mechanical read of which sources actually hold the file up

Brought to the gate 2026-08-24, same gift-circuit pass against
`tools/workbench_bridge/WORKBENCH.html`. This card orders nothing. Mark it,
or leave it — blank is a complete state.

**What it is** — A working bridge/articulation-point graph algorithm (Tarjan,
one DFS pass) exists in two places already: `THE_TRUSS.html`'s
`computeStructure()` (lines 206-237) and `THE_TERRAIN_LIVE.html`'s
`computeStructure()`/`recomputeRelStruct()` (lines 411-441). Given a set of
declared edges, it computes — mechanically, from structure alone, never
content — which nodes and edges are load-bearing: remove them and something
disconnects.

**Where it came from**
> "a node or relationship is load-bearing here if removing it would disconnect part of the graph — the graph-theory sense of the word, nothing more. It is not a measure of what matters."
— `THE_TRUSS.html:61`, the same law this session already cited once (Relationship 1 of the "six standing questions" tab in `WORKBENCH_BRIDGE.html`) without reusing the actual algorithm behind it

**Latent capacity** — A generated bridge's Sources tab is currently a flat
list — every source reads as equally central. If a session cites which
sources support which gifts, process steps, or relationship-set items as
edges, this same algorithm could mark which sources are load-bearing for
*this specific bridge* (cited nowhere else, everything else disconnects
without it) versus merely supporting. That's a real, mechanical answer to
"what actually holds this file up," computed the same way `THE_TRUSS.html`
already computes it for marks — not a new invention, a second application of
an existing one.

**Why it went unrouted** — Both existing copies are wired to their own
instrument's specific data shape (marks + declared relations); nobody has yet
pointed the same 30-line algorithm at a bridge's own Sources-to-tabs citation
graph, because that graph didn't exist as data until this session's
`session_2026-08-24.json` schema was built.

**Shortest routing** — Way in: add an optional `citedBy` array to each source
entry in the session JSON (which gift/process/lens/relationship items cite
it), or infer edges directly from substring-matching source paths inside
other fields' text. Act: run the same `computeStructure()` function (copied,
not rewritten) over that edge list inside `template.html`. Consequence: the
Sources tab gets a small, honest marker — load-bearing or not — next to each
entry, using an algorithm this corpus has already proven twice rather than a
new heuristic.

**Reading** — capacity M · routing effort M (the algorithm is a straight
copy; the edge data has to be added to the schema first) · confidence H

────────────────────────────────────────

Your mark:
