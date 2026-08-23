# GIFT · The Annotations Sidecar — a way to note canon without touching it

Brought to the gate 2026-08-23, unrouted-gifts pass, whole-corpus sweep.
This card orders nothing. Mark it, or leave it — blank is a complete state.

**What it is** — An append-only, per-pattern sidecar (`nesi/annotations/<slug>.jsonl`) letting you note something about a standing canon pattern without ever touching the immutable pattern body.

**Where it came from**
> "Canon is immutable in place... So annotations live in a SIDECAR (nesi/annotations/<slug>.jsonl), never in the pattern body. The pattern's bytes are never changed... the note is Kevin's, timestamped, append-only."
— `nesi/conductor/annotations.py`, 2026-07-22 (pass-3, step 8)

**Latent capacity** — The only built way to leave a note in passing on a canon pattern without opening the deepdive chamber or breaking the immutability guard.

**Why it went unrouted** — Only imported by `nesi_app.py` (composted). No board panel or CLI calls it; `nesi/annotations/` has never been created on disk.

**Shortest routing** — Way in: one "note" action wherever a pattern is shown. Act: type one line. Consequence: one line appended to `nesi/annotations/<slug>.jsonl`, pattern untouched.

**Reading** — capacity M · routing effort L · confidence M

────────────────────────────────────────

Your mark:
