# leaf_audit.py — the executable no-ask walk-test

**What:** A stdlib-only Python auditor that parses an HTML page, walks every terminal 'leaf' node, and exits 1 if any leaf contains an interactive ask-affordance or ask-language. Enforcement by build, not vigilance.

**Source:** `held_refusal/leaf_audit.py`
**When:** 2026-07-25

**Evidence (verbatim):**
> "walk every terminal node (leaf) of the held-refusal page and FAIL if any leaf contains an ask-affordance ... the no-ask discipline is enforced by the build, not by vigilance" ... ASK_TAGS = {"form","input","textarea","select","button","a"}

**Capacity:** A ready-made lint pattern for the game's hard laws: swap ASK_WORDS/ASK_TAGS for number-patterns, counters, progress bars, re-engagement language — an automated Law-2/Law-7 auditor over the game's screens or web export.

**Unrouted because:** Only audits held_refusal/index.html; never generalized against the game's surfaces or export.

**Shortest routing:** Copy into the NESI toolchain as a screen-audit script run alongside run_tests.py, retargeted at the game's rendered UI/export HTML.

**Reading:** capacity M · effort L · confidence H

---
This card orders nothing. It waits for Kevin's mark. Blank is a complete state.
