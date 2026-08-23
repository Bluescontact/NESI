# GIFT · The Capacity-Hold Third Anchor — a second read the board never asks for

Brought to the gate 2026-08-23, unrouted-gifts pass, whole-corpus sweep.
This card orders nothing. Mark it, or leave it — blank is a complete state.

**What it is** — `held_record.py`'s generalized hold record (entry_ref/kind/condition/clock/latency_type/falsifier/status) plus `return_circuit.py`'s `scan_capacities()` — a third tier of the return circuit for latent capacities marked resourced and awaiting a second read, distinct from the date/file-anchored holds the live board already surfaces.

**Where it came from**
> "scan_capacities() — The third anchor, surfaced not fired: capacities Kevin has marked resourced and that await his second read (Step 6). This reads the held_record store..."
— `nesi/conductor/held_record.py` + `return_circuit.py`, 2026-07-22 (Rebuild pass 3, Step 5)

**Latent capacity** — A second, distinct return-circuit question ("this capacity is now resourced — take your second read") that the live board never asks, because it only calls `return_circuit.scan()`, not `scan_capacities()`.

**Why it went unrouted** — `v2_board_data.py`'s `_returns()` calls `return_circuit.scan()` only; `scan_capacities()` — and therefore `held_record.py`, its only real dependent — has no caller anywhere in the live path.

**Shortest routing** — Way in: add `scan_capacities()` to `v2_board_data._returns()`. Act: one capacity gets marked resourced via `held_record.mark_resourced()`. Consequence: one new question appears in the board's returns list.

**Reading** — capacity M · routing effort L · confidence M

────────────────────────────────────────

Your mark:
