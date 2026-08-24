# GIFT · tools/codex_index — a real semantic-similarity engine, wrong Python

Brought to the gate 2026-08-24, same gift circuit as the wikilink-graph
card above. This card orders nothing. Mark it, or leave it — blank is a
complete state.

**What it is** — A working, already-populated vector-embedding index over
all 178 `patterns/*.md` files: `chromadb` for the vector store,
`sentence-transformers` (`all-MiniLM-L6-v2`) for embeddings, with an
optional structural-fingerprint mode that matches on "mechanism/register
proximity rather than vocabulary proximity" — a genuinely richer nearness
signal than the plain word-overlap (TF-IDF) method `terrain_layout.py`
already uses for marks. The database directory is real and populated (spot
checked: real UUID-named entries on disk, not an empty scaffold).

**Where it came from**
> "It is a pre-filter, not a judge. It clears the obvious folds and the
> clean misses, and surfaces only the ambiguous ones — so your felt-read
> lands where it's decidable, not on all 35 patterns at once."
— `tools/codex_index/query.py`, quoted in `inbox/gift_2026-08-11_48_the_
codex_index.md`, a prior gift-circuit pass that already routed this once
without result

**Latent capacity** — A second, deeper nearness ground for a future library
terrain — richer than word-overlap, already computed and stored, needing
only a query call, not a rebuild.

**Why it went unrouted, checked directly this pass** — Confirmed the real
blocker, more precisely than the 2026-08-11 card did: `chromadb` shows
installed (`pip show chromadb` → version 1.5.9) but `import chromadb` fails
under the `python3` this session runs as. The package is installed into a
separate virtualenv (`~/AppData/Local/hermes/hermes-agent/venv`), not the
interpreter any of today's tools (including the new terrain/truss scripts)
actually run under. This is an environment mismatch, not a missing build —
the tool itself is finished.

**Shortest routing** — Two forks, not one path: (A) point a routing script
at the hermes-agent venv's Python explicitly, or reinstall
`chromadb`+`sentence-transformers` into whichever interpreter the rest of
today's tools use — real but small effort, no rebuild. (B) treat the
wikilink-graph gift (card 03) and `terrain_layout.py`'s proven zero-dependency
TF-IDF as sufficient for a first library terrain, and hold this engine as a
richer nearness ground for a later pass — avoids a new dependency entirely
for v1. Both are legitimate; this pass doesn't default to either.

**Reading** — capacity M · routing effort M (fork A) or L (fork B, by
deferring it) · confidence M — this is the second gift-circuit pass to find
this exact tool unrouted; naming that repetition per law 27, since a second
refusal at the same gate is itself the signal.

────────────────────────────────────────

Your mark:
