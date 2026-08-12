---
name: feedback-memory-maintenance
description: Memory files and MEMORY.md index must be updated the moment state changes — stale entries create false confidence downstream
metadata: 
  node_type: memory
  type: feedback
  originSessionId: dc587d17-1042-4387-8aef-04ce8e02a1c5
---

Update memory at the moment work completes, not later. Stale MEMORY.md index entries seed downstream decisions with false confidence — the index line is what loads in every session and drives outputs like dream cycles, status reads, and build decisions.

**Why:** In June 2026, a session completed the RI Kit (all four substrates + index.html) but left the MEMORY.md index entry saying "three substrates remain." A later session used that stale line to generate a dream cycle claiming three substrates were missing, Kevin clicked build on a false premise, and the error only surfaced when files were actually read. The cost was downstream confusion and wasted motion.

**How to apply:**
- When a build completes, a substrate is finished, a project changes state: update the memory file AND the MEMORY.md index line before the session closes — not after, not next time.
- The MEMORY.md one-liner is the highest-stakes text in the system: it loads in every session and is what Claude acts on without checking. It must be accurate, not aspirational or stale.
- Before using memory to generate output (dream cycles, status reports, build plans), check: is the relevant memory file consistent with the index line? If not, read the actual files first.
- The daily-cycle close-out should include a sweep of MEMORY.md for entries whose one-liner no longer matches the actual file state.
