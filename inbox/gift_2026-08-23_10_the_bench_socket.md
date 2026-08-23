# GIFT · The Bench Socket — one generative contract, engine-dark, unwired

Brought to the gate 2026-08-23, unrouted-gifts pass, whole-corpus sweep.
This card orders nothing. Mark it, or leave it — blank is a complete state.

**What it is** — A single generative contract — `invoke(op, payload)` with four ops (draft/break/refine/semantic_pull) — meant to be NESI's one generation seam, engine-dark and stub-labeled until an engine is wired.

**Where it came from**
> "invoke(op, payload) -> {\"op\", \"engine\", \"stub\", \"output\"} ... every generative operation is an instance of it."
— `nesi/conductor/bench.py`, built by 2026-07-20/21

**Latent capacity** — The one place drafting/falsifying/refining/pulling patterns would happen if wired to the board — currently only reachable as a dependency other unrouted modules (front, deepdive, interrogator, preflight, reader) import but never call live.

**Why it went unrouted** — `interrogator.py` imports bench at module load, but the only interrogator function the live board calls — `open_reach()` — never touches `bench.invoke()`. No live path calls `invoke()` itself.

**Shortest routing** — Way in: one board action ("draft from this pattern"). Act: `bench.invoke('draft', payload)` runs. Consequence: a stub-labeled draft object appears in `staged/`, honestly marked [STUB].

**Reading** — capacity M · routing effort M · confidence M

────────────────────────────────────────

Your mark:
