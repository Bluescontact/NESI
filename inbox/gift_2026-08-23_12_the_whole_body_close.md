# GIFT · The Whole-Body Close — a one-time coherence check, never re-run

Brought to the gate 2026-08-23, unrouted-gifts pass, whole-corpus sweep.
This card orders nothing. Mark it, or leave it — blank is a complete state.

**What it is** — A read-only stage-6 report pairing `count_definitions()` (three genuinely different canon counts, stated as definitions rather than reconciled into one) with `coherence_check()` (a benign stub-mode run through `front.handle()` confirming the organism still routes end to end).

**Where it came from**
> "coherence_check() — runs one benign turn through front.handle() in stub mode (engine untouched) as the whole-body run-through: does the organism route, sense, and remember without raising?"
— `nesi/conductor/whole_body.py` + `held_map.py`, 2026-07-21 (pass-3, stage 5-6)

**Latent capacity** — The only built end-to-end sanity check that the organ body still coheres as one thing — and the only caller of `held_map.py`, a read-only map of every still-open item's home in the body.

**Why it went unrouted** — Nothing imports `whole_body.py` — grep across the whole repo returns zero callers. Written as a one-time pass-3 closing report and never wired to run again.

**Shortest routing** — Way in: `whats_up.bat` prints one extra line. Act: `whole_body.coherence_check()` runs. Consequence: PASS/FAIL plus the three canon counts, printed once.

**Reading** — capacity L · routing effort L · confidence H

────────────────────────────────────────

Your mark:
