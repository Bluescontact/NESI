# RESEARCH — what holds load, and how to let Kevin build relationships that carry it

**Asked 2026-08-24**, mid-session on THE_TERRAIN: *"I don't have a way to
create, and manage relationships here. I want to be able to find what holds
weight... what holds load and how? That's the next extraction I'd like you
to research and develop before integrating into the terrain."*

Research and design only. Nothing below is wired into THE_TERRAIN_LIVE.html.
A standalone prototype exists at `THE_TRUSS.html`, held separate, per his
own instruction.

---

## 1 · The capability already exists, and is almost never used

`THE_FIELD.html` already does exactly what "create relationships" means in
this corpus's own discipline: *"an edge is `{to, rel}` where the RELATION IS
THE NAMING... there is deliberately no vocabulary offered — a menu would be
the machine pre-naming the thing this exists to let Kevin name"*
(`nesi/mind/project_the_field.md:11`). It stages, never writes — the exit is
a copied shell command:

```
python tools/marks.py catch "..." --source kevin --blocks "{"to":"...","rel":"..."}"
```

`tools/marks.py`'s `catch()` (line 87) already accepts `--blocks` and parses
it into a real, permanent field on the mark: `entry["blocks"] = _parse_edges(blocks)`.
Checked directly against the live log: two `blocks` entries exist, dated
2026-08-06 — and checked again, more carefully, both carry `"source":
"claude"`, not `"source": "kevin"`. **Zero relationships have ever actually
been declared by Kevin's own hand through this mechanism.** The two that
exist are a session's own doing, which this corpus's own standing law (only
Kevin's click marks a decision) would not count as a legitimate declaration
in the first place. `THE_TRUSS.html` below excludes them for exactly that
reason — it only ever reads relationships attached to a `kevin`-sourced
mark.

**Finding:** the gap isn't "no way to create relationships." It's that the
one way that exists — declare in one file, copy a generated shell string,
paste it into a terminal, run it, hope the quoting survived — has never once
actually been walked start to finish by the one hand authorized to use it.
Solving "I don't have a way" means lowering that cost until it's actually
usable, not inventing a second mechanism next to the first.

---

## 2 · What "holds load" already means here, read across the corpus

The phrase isn't new. It recurs, mostly as metaphor, across `nesi/workbench/`'s
own pattern library (`tension_index.json` — a separate, unrelated "AI
Constitutional Stack" compost stream, not load-bearing itself here, but its
own vocabulary is telling): *"load off the vulnerable node"* (crossed to
LIBRARY, 2026-07-21), *"keystone held by least authority,"* *"the falsifier
travels with the pattern... load-bearing, not decorative."* Each use points
at the same underlying test, stated most plainly in `extend_dont_invent_
name_the_wall`: *"the load-bearing hazard is not under-reaching but pitching
a claim at a false height."*

None of these give a **mechanical** test — a way to ask a real structure
"which of your parts are load-bearing" and get an answer that isn't a
judgment call. One does exist, though, and it isn't metaphorical: **a cut
vertex (articulation point) or a bridge, in graph theory.** Given any graph
of nodes and declared edges, a node or edge is load-bearing in the exact
engineering sense — remove it and the structure it was carrying disconnects
— if and only if it is a cut vertex or a bridge. This is computable in
linear time (Tarjan's algorithm, 1972), deterministically, from nothing but
the edges Kevin himself declared. It never reads content, never scores a
mark's importance, never infers what a relation means — it only asks
whether removing a declared connection would fragment the graph it sits in.
That is precisely the register this corpus already requires of a mechanical
fact (`terrain_layout.py`'s own guard: *"counts words, never reads the
writer"*) — this counts edges, never reads the writer either.

---

## 3 · The distinction this design has to keep, not collapse

Named directly earlier this session and worth repeating as the design's own
constraint: **relationship holds the load. Narrative holds the meaning.
Structure holds when relationships collapse.** A cut-vertex test answers the
first question only — what is structurally necessary for the graph to stay
connected. It says nothing about which relationship *matters* more to
Kevin — that's meaning, and meaning is his to name, never the tool's to
infer. A relationship that isn't load-bearing by this test can still be the
one that matters most; a relationship that is load-bearing by this test can
still be trivial. **The tool must show both without conflating them** — a
structural fact (load-bearing: yes/no, mechanically true) sitting beside,
never merged into, whatever Kevin's own words say the relation means.

---

## 4 · The prototype

`THE_TRUSS.html` — not linked anywhere, not wired to the terrain. It:

- Reads the same real marks THE_TERRAIN already reads, and the two real
  `blocks` edges that already exist in `MARKS_LOG.jsonl` — real data, not a
  mock.
- Lets Kevin declare a new relationship the same way THE_FIELD does: pick a
  mark, pick a second mark, type the relation in his own words — free text,
  no offered vocabulary. Stages it. Copies the same `marks.py catch --blocks`
  command THE_FIELD already generates — same ledger, same format, same
  discipline, so nothing here is a second, competing mechanism.
- On every change to the declared-edge graph, runs a real bridge/
  articulation-point pass (client-side, no engine, no network) and marks
  which nodes and edges are structurally load-bearing right now, given only
  what's been declared so far.
- Two grounds fewer than THE_TERRAIN's four — this instrument's whole job is
  the relationship graph, not the four-ground apparatus; nothing about it is
  meant to duplicate or replace the terrain, only to feed it a real, working
  relationship layer once Kevin decides it's ready to be read into a ground
  there.

**What it does not do, on purpose:** it does not rank marks, does not
suggest a relation, does not auto-detect a likely edge from shared language
(that's THE_TERRAIN's relationship ground, already disclosed as mechanical
nearness — a different, existing thing). It does not write anything by
itself. The load-bearing marker is the only computed output, and it is
computed from structure alone, never content.

---

## 5 · What's still open, named rather than resolved

- **Whether "load-bearing" should ever cross into the terrain visually** —
  e.g., giving load-bearing marks a heavier weight in the collapse-slider
  built earlier today. Plausible, not decided here — that's the
  "integrating into the terrain" step Kevin asked to hold until this piece
  is developed on its own first.
- **What happens to a relationship's load-bearing status as more get
  declared.** With 2 edges, almost nothing is load-bearing (the graph is
  mostly disconnected components of one). This is correct, not a bug — the
  measure is honest about how little structure exists yet. It will become
  more informative exactly as fast as Kevin actually uses it, which is the
  whole point of lowering the cost in §1.
