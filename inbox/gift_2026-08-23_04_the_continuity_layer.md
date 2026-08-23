# GIFT · The Continuity Layer — a resume/checkpoint system, proven, gone quiet

Brought to the gate 2026-08-23, unrouted-gifts pass, whole-corpus sweep.
This card orders nothing. Mark it, or leave it — blank is a complete state.

**What it is** — A derived resume-view that checkpoints session state to `nesi/continuity/state.json` and archives timestamped snapshots to `nesi/continuity/history/` — 14 real `close_*.json` files already on disk, dated 2026-07-21 through 2026-07-25.

**Where it came from**
> "Write side (called from nesi_app, never from core): checkpoint() ... close_snapshot() ..."
— `nesi/conductor/continuity.py`, built by 2026-07-21, last real write 2026-07-25

**Latent capacity** — This is the exact "so Kevin stops being the continuity between sittings" layer the module names as its whole point — with real historical proof it worked, now silent since its only caller was retired.

**Why it went unrouted** — Its own docstring names its single caller as `nesi_app` — explicitly never `core`. `nesi_app` is composted; nothing else calls `checkpoint()` or `close_snapshot()`. The history folder has been silent since 2026-07-25.

**Shortest routing** — Way in: call `continuity.checkpoint()` from `core.py`'s own close path or from `board.html`'s launcher. Act: one session ends. Consequence: one new file lands in `nesi/continuity/history/`.

**Reading** — capacity M · routing effort L · confidence H

────────────────────────────────────────

Your mark:
