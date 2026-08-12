---
name: feedback-run-ahead-rate
description: "316 decisions offered, 1 answered - the run-ahead measured 2026-08-06. Four standing laws already forbade it and none was attached to a mechanism. The brake now lives in decisions.py offer."
metadata:
  node_type: memory
  type: feedback
---

**Kevin, 2026-08-06:** *"The rate of claude running ahead of kevin, and the efficiency, and alignment of requests has been buried in lost capacity."*

**Measured from the ledgers, not felt: 316 decisions offered, 1 answered.** 306 unique across 13 surfaces in three days - mean **24 decisions per surface** - one surface carrying **92**. Backlog 18 -> 562. The only negative day (07-30, -127) was a 183-record test probe, so **it has never actually fallen.** Marks act at 58% and gates close at 40%; those loops work. **Decisions specifically run away, and decisions are what the machine generates.** The backlog is not a queue Kevin fell behind on - it is exhaust.

**Why:** four standing laws already forbade this and **not one was attached to a mechanism** -
1. *"The ceiling is not a target"* (`feedback_3_options`, 2026-07-01). Kevin's batch size of 4 was turned into a per-widget quota. That file was rewritten on 08-05, the sentence carried forward as still-law, and then broken four widgets in a row.
2. **B3** - written to catch showing FEWER than live; nobody wrote the other direction, so padding never tripped anything.
3. **The load-test** - gates *builds*, not *asks*. 316 decisions passed a gate never pointed at them.
4. *"Pace to the felt-read"* - depends on an inference about Kevin's state the AI is forbidden to make, so it is **inert by construction**.

**Not a lens problem - an enforcement problem.** One more written rule would be the fifth inert law.

**THE BRAKE (built, Kevin's mark 2026-08-06).** `decisions.py offer` refuses more than 4 tiles per surface, and refuses any deposit while unresolved decisions stand there. Fail-closed, **no force flag**. It limits the MACHINE, never Kevin: it caps how many things he is *asked*, nothing about depth or what he gets - which is why it is not the still-forbidden overspeed governor. **It cannot deadlock a session:** a refusal blocks new decisions, not the response. A reading-only surface with zero tiles is always allowed - **when Kevin is behind, report, do not ask.**

**It fired against the machine on its first live use** (19 unanswered), and two surfaces that day shipped with no tiles at all. That is the mechanism working.

**Known over-tightness, and the fix is a habit not a looser brake:** Kevin answers in prose, and the ledger only sees an answer through `decisions.py answer --tile <id> --option <key>`. **Record every prose answer against its tile in the same turn.**

Related: [[feedback_triage_batch_pace]] - [[feedback_four_cards_per_widget]] - [[feedback_ai_never_self_limits]] - [[project_compost_window]]
