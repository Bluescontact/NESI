# rhythm/brief.py — fail-closed staging engine

**What:** Pure-stdlib Python generator that mechanically reads gate_data.json and stages output with fail-closed behavior everywhere (no creds -> outbox, no send_time -> generate only); never marks, never crosses the membrane.

**Source:** `rhythm/brief.py + config.json`
**When:** pre-2026-08

**Evidence (verbatim):**
> "Pure Python standard library. No pip, no AI, no rented cognition to PRODUCE the emails — they are a mechanical read of gate_data.json." ... "FAIL-CLOSED everywhere"

**Capacity:** A tested no-network, no-model, hold-don't-send pipeline pattern — the exact posture the game's stores need (Laws 3, 5, 11); reusable as-is for local store staging.

**Unrouted because:** Built for the email rhythm loop; the game never imported its mechanism.

**Shortest routing:** Reuse its fail-closed stage/outbox pattern for the game's local save/store writes.

**Reading:** capacity M · effort L · confidence M

---
This card orders nothing. It waits for Kevin's mark. Blank is a complete state.
