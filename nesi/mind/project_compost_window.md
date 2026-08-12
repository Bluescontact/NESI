---
name: project-compost-window
description: "Compost, not expiry - Kevin's naming 2026-08-06. A decision or mark not held degrades, drops, and feeds the tree that made it. 7-day window, rate is his, clock started 2026-08-06."
metadata:
  node_type: memory
  type: project
---

**Kevin's naming, 2026-08-06:** *"Expired decisions carry compost... the decision degrades if not held, a branch withers, and drops, and turns to compost, feeding the tree that created it, and the larger soil."* Plus: *"Lets put a one week window on marks starting today with the option for a user to set the compost rate."*

**The word is the design.** The machine had proposed `expire`. **Expiry deletes; compost returns.** A composted record keeps its full text and every option **forever**, stops being reported as awaiting Kevin, and becomes readable substrate through `--list` - the soil. Nothing is ever removed from a ledger.

- `python tools/decisions.py compost` - decisions
- `python tools/marks.py compost` - marks
- `--set-rate N` - `--dry-run` - `--list` - `--surface P`

**One window for the whole system.** The rate lives as a `compost_rate` **event on DECISIONS_OFFERED.jsonl**, read back as the last one written - derive-don't-store applied to config, so there is no second file to drift, and every rate change is itself a dated record. `marks.py` reads that same authority. Set it once, both move.

**"Starting today" is enforced, not promised.** An item is measured from `max(offered_or_caught, rule_started)`. Turning the rule on could not compost 161 standing marks in one stroke. Clock started **2026-08-06**; first drops **2026-08-13**.

**The rate is Kevin's.** A window he sets is a fixed mechanical trip - exactly what the held overspeed governor required (*"the depth-cap must be KEVIN'S to set, never the AI's to infer"*). Nothing reads his state or judges an item's worth; it reads a date against a number he wrote down. **A deliberate 37-day hold and a forgotten ask look identical to it, and that is the right price.**

The boundary was first narrowed to decisions only, then extended on his mark the same day: it now covers **both** decisions (the machine's asks) and marks (Kevin's instructions).

Related: [[feedback_run_ahead_rate]] - [[project_the_field]] - [[feedback_composting_threshold]]
