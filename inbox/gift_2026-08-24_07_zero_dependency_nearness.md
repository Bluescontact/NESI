# GIFT · zero-dependency nearness — TF-IDF word-overlap, no library, no server

Brought to the gate 2026-08-24, same gift-circuit pass against
`tools/workbench_bridge/WORKBENCH.html`. This card orders nothing. Mark it,
or leave it — blank is a complete state.

**What it is** — `tools/terrain_layout.py` is a working, hand-rolled TF-IDF +
cosine-distance nearness engine over mark text, with zero third-party
dependencies — confirmed directly: `import json, re, sys, argparse, os` and
`from collections import Counter` only. "Nearness encodes SHARED LANGUAGE.
Nothing is interpreted, scored, or judged; the geometry falls out of word
overlap and nothing else" (its own header comment). This is the honest,
already-proven alternative to `tools/codex_index`'s vector-embedding engine —
the one flagged in gift card `_04` this same day as blocked on an environment
mismatch (`chromadb` in the wrong virtualenv). This one has no such blocker;
it runs anywhere Python's stdlib runs.

**Where it came from**
> "TF-IDF over the mark text -> cosine distance -> 2D layout. Nearness encodes SHARED LANGUAGE. Nothing is interpreted, scored, or judged; the geometry falls out of word overlap and nothing else."
— `tools/terrain_layout.py:9-11`

**Latent capacity** — `WORKBENCH.html` and `build.py` have no way to suggest
that two Sources, or a Source and a Gift, might be related by shared
language — a session author has to notice that by hand while writing the
JSON. The same TF-IDF math (small enough to port to ~40 lines of browser
JS — no Python needed at runtime, since `WORKBENCH.html` is explicitly
zero-dependency and browser-only) could surface *candidate* pairs worth a
look, exactly the way `THE_FIELD.html`'s own law already requires:
suggestion only, never an offered vocabulary, never an inferred edge treated
as declared.

**Why it went unrouted** — Built for a different instrument (the terrain's
own 2D spatial layout) with a different output shape (x/y coordinates, not a
suggestion list); nobody has taken just the nearness half without the layout
half, and `WORKBENCH.html` didn't exist yet when this was built.

**Shortest routing** — Way in: port the TF-IDF + cosine-distance core only
(not the KMeans clustering, not the 2D layout — those solve a problem
`WORKBENCH.html` doesn't have) to a ~40-line JS function inside
`template.html` or `WORKBENCH.html`. Act: on render, compute pairwise
similarity across all Sources/Gifts text and surface the top few pairs above
some threshold as a quiet, dismissible "these might be related" note — never
auto-added as a relationship. Consequence: a session author gets a nudge
toward a connection they might have missed, with the same "suggestion, never
inference-as-fact" discipline this corpus already holds `THE_FIELD.html` to.

**Reading** — capacity M · routing effort M (the math ports cleanly; deciding
where in the UI a "maybe related" suggestion belongs without it becoming a
menu is the real work) · confidence M

────────────────────────────────────────

Your mark:
