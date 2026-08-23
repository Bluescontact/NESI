# GIFT · The Preflight Sign-Off Check — a go-live gate nothing runs

Brought to the gate 2026-08-23, unrouted-gifts pass, whole-corpus sweep.
This card orders nothing. Mark it, or leave it — blank is a complete state.

**What it is** — A structural check that asks, for the metabolizer's and bench's two engine seams, whether the fallback-loudly law would still hold if an engine went live right now, or whether something above the seam would crash instead of degrading honestly.

**Where it came from**
> "This module answers one question, structurally, for each: if the engine goes live right now, does the fallback-loudly law still hold — or does something above the seam assume a real engine and crash instead of falling back?"
— `nesi/conductor/preflight.py`, 2026-07-20

**Latent capacity** — The one built go-live readiness gate for the day an engine actually gets wired — currently nothing runs it, so that day would arrive unchecked.

**Why it went unrouted** — Only imported by `nesi_app.py` (composted). No CLI or board entry calls it.

**Shortest routing** — Way in: `python -m preflight`, or a line added to `whats_up.bat`. Act: run the check once. Consequence: PASS/FAIL per seam, printed, nothing else moves.

**Reading** — capacity L · routing effort L · confidence H

────────────────────────────────────────

Your mark:
