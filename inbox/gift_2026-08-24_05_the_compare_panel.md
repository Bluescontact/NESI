# GIFT · the compare panel — shift-click two things, hold them side by side

Brought to the gate 2026-08-24, an unrouted-gifts pass run against
`tools/workbench_bridge/WORKBENCH.html` on Kevin's own ask: "use the unrouted
gifts tool to find capabilities that can be folded into the html." This card
orders nothing. Mark it, or leave it — blank is a complete state.

**What it is** — `THE_TERRAIN_LIVE.html` has a working compare panel: shift-click
two marks and a `#comparePanel` opens, holding both side by side
(`compareSet`, capped at 2 — `if(compareSet.length>2) compareSet.shift()`),
plus a `#mergeTools` row underneath for staged (never auto-applied) merge
actions. It's live, wired to real click handlers, not a sketch.

**Where it came from**
> `let compareSet=[]; // up to 2 mark indices, held for side-by-side reading — never more than a reading; merging is still staged, never applied here`
— `THE_TERRAIN_LIVE.html:208`, confirmed live in `renderCompare()` (line 543) and the shift-click handler (line 491-494)

**Latent capacity** — `WORKBENCH.html` (built this session) has no way to view
two Sources, two Gifts, or two relationship-set items side by side while
writing a session's JSON — a session author editing the textarea has to
scroll or hold two things in their head. The terrain's compare pattern is
exactly this: pick two, read them next to each other, nothing forced further.

**Why it went unrouted** — Built for a different instrument (the mark/relation
terrain) at a different date; `WORKBENCH.html` didn't exist yet when this was
built, so there was never an occasion to route it there.

**Shortest routing** — Way in: in `WORKBENCH.html`'s preview iframe, add a
click handler on `.src` rows and gift/relationship tabs that pushes into a
2-slot `compareSet`, same cap logic. Act: a small side-by-side panel renders
above or beside the preview. Consequence: a session author writing a long
Sources list can check two entries for contradiction or redundancy without
losing their place. Merge tools are not needed here — comparison alone closes
the gap.

**Reading** — capacity M · routing effort L · confidence H

────────────────────────────────────────

Your mark:
