# A prompt for a different model

Copy everything below the line into ChatGPT, Gemini, or any model other than
Claude. The point of asking somewhere else is a genuinely different read —
not confirmation. Bring whatever comes back to Claude afterward; nothing
here gets built or decided by the other model, only proposed.

---

I'm building a personal writing tool called "the page." Here's exactly how
it works today, then what I'm trying to figure out next.

**The mechanism.** You type into a box. The moment you finish a sentence
(ending in `. ! ? …`), it drops into a running, day-grouped document below —
nothing is ever truncated, nothing is ever deleted by the system itself.
Two structural facts about each sentence, and only two, are ever measured:
how long my hands were idle before I started typing it, and how many words
it is. The tool never reads what a sentence *says* — no sentiment, no
topic-modeling, no keyword extraction, nothing semantic at all. That's
deliberate and load-bearing: I built this specifically to get away from
tools with menus and features that route nowhere and give me no reason to
actually write.

A second view shows the same sentences as a graph. Edges between two
sentences are one of: **chain** (written back-to-back), **near** (landed
close together in time but not sequential), **hinge** (a real graph
cut-vertex — remove it and the graph splits), or **declared** (I manually
named a relationship myself by clicking two sentences and typing a label —
never inferred). I can drag a card to rearrange it for legibility; the drag
is recorded but never treated as meaning anything.

**What I'm exploring now.** I've started thinking about it as: each **word**
is a node, each **sentence** is a pebble (a small cluster of word-nodes),
and sentences can be manually grouped into a **stone** — a paragraph-level
unit, gathered by hand, never inferred from content. And I want to be able
to take **any four things** in this system — four sentences, four stones,
maybe someday four words — and see the six relationships between them at
once, the way a tetrahedron's four vertices give you six edges.

I've already built three working prototypes exploring this:

1. A **lens**: pick any four sentences, see the six real relationships
   between them (chain/near/hinge/declared/none), nothing new stored.
2. A **hierarchy**: pebbles gather into named stones; a four-stone tetra
   reads structural facts about the groups (pebble count, word count,
   whether either touches a hinge, how many sentences two stones share).
3. An **ambient companion**: no picking at all — a second window that
   always shows the tetrahedron around wherever my writing currently is
   (the last sentence, its neighbors), updating live, meant to sit open
   beside the main page rather than be opened deliberately.

Real problems already found in each, by an internal audit: the lens
originally lost information when a pair was both sequential and manually
declared related (fixed). The hierarchy's "hinge" detection was originally
fake — it called almost every sentence a hinge (fixed, now real graph
theory). The ambient companion's core weakness is real and *not* yet fixed:
"where my writing is" currently means "the last sentence I wrote," which
goes stale the moment I'm rereading old material instead of adding new
material — there's no way yet to tell it "no, look here" while just reading.

**What I want from you.** Not validation of what I've already built — a
genuinely different angle on it. Some directions, though don't feel bound to
these:

- Is there a shape for "six relationships / four things" I haven't tried
  that isn't a lens, a hierarchy, or an ambient companion?
- Is the tetrahedron (4 things, 6 edges) actually the right geometric
  primitive here, or am I reaching for it because it's familiar rather than
  because it fits what writing relationships actually are?
- What would it mean to apply this at the **word** level, not just the
  sentence or paragraph level — is that even a good idea, or does it break
  something that matters about treating a sentence as the smallest unit
  worth relating to another one?
- What's the failure mode I'm not seeing yet — the thing that looks fine in
  a demo with a handful of sentences and breaks or becomes meaningless at
  the scale of months of daily writing?
- Anything else this reminds you of, in software, in writing tools, in
  mathematics, in anything — that I should know about before I build more.

Be concrete. If you propose a new shape, describe it precisely enough that
someone could actually build it — not just a metaphor for one.
