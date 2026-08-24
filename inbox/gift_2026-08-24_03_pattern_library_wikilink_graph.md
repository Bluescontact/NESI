# GIFT · the pattern library's own relationship graph — 385 real links, never drawn

Brought to the gate 2026-08-24, a gift circuit run on "I see a board, not a
library with visible mapped relationships." This card orders nothing. Mark
it, or leave it — blank is a complete state.

**What it is** — `patterns/` holds 178 real, crossed pattern documents (the
canon library — seeds, organs, nutrients, lenses). Grepped directly: they
already contain **385 `[[wikilink]]`-style cross-references** in their own
prose — `patterns/commission_grammar_screen.md` opens by citing
`[[the_governor]]` and extending its §8 resequence principle; this repeats
throughout the library. A separate 14 files also carry a formal `extends:`
field. None of this is inferred — every link is a sentence Kevin (or a
session writing under his mark) already wrote, citing one pattern from
inside another.

**Where it came from**
> "The Governor's §8 resequence principle extends here."
— `patterns/commission_grammar_screen.md:3`, one of 385 such citations
across `patterns/*.md`

**Latent capacity** — This is the exact material the terrain's new relate
feature was built to hold — declared relationships, in Kevin's own words,
never inferred — except it already exists, at roughly 190x the density of
`MARKS_LOG.jsonl`'s own declared-edge count (385 real citations vs. zero
ever declared by Kevin's hand there, per the 2026-08-24 truss research).
Nothing currently reads this graph or draws it. The whole library sits as
178 unlinked documents to anyone who opens `patterns/` directly.

**Why it went unrouted** — The links were written as prose citations, the
normal way anyone extends an idea in writing — never built as data, never
extracted, because nothing before now needed them extracted.

**Shortest routing** — Way in: a small script (same shape as
`tools/terrain_layout.py`, no new dependency) regexes `\[\[([a-zA-Z0-9_.-]+)\]\]`
out of every pattern file, resolves each to a real filename, and emits an
edge list — real, not staged, since these are already Kevin's own written
words. Act: feed that edge list into a sibling of THE_TERRAIN scoped to
`patterns/` instead of `MARKS_LOG.jsonl` — the relate/compare/merge/collapse
machinery built this session already expects exactly this shape (mark
index, edge list, `rel` text) and needs no redesign, only a second data
source. Visible consequence: the library becomes a mapped, walkable field
instead of 178 separate files — precisely closing "I see a board, not a
library."

**Reading** — capacity H · routing effort M (extraction script is small;
reusing the terrain UI is the larger, still-modest, share of the work) ·
confidence H

────────────────────────────────────────

Your mark:
