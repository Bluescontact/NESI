# NESI ORDERING SURFACE — D1 · D2 · D3 · 2026-07-19
**Status:** STAGED — three decisions fully prepared, all open, none resolved, none ordered, none recommended. Read-only pass; this file is the only write.

## D1 · THE FORK — unresolved

**Where the two verbs live (every definition, writer, reader, dependent):**
- `uncross` — one definition: `conductor/core.py:332` (rollback: canon file → `patterns/_folded/`, sync-loud index rebuild with revert-on-failure, stamps `obj.uncrossed`, appends ledger verdict `uncross`). One UI dependent: `nesi_app.py` — the un-cross button rendered only on a CROSSED card, plus an "un-crossed" footer state. One reader: `continuity.py:79` counts it among last-mark verdicts. conductor.py's duplicate is composted and out of the bundle.
- `correction` — zero definitions, zero writers in code, zero readers (continuity's filter excludes it). It exists as one hand-appended marks.jsonl line (2026-07-16, the zombie-server incident).

**Live or dormant — the fact, with evidence:**
- `uncross` is **reachable but currently idle**. The code path is live in the running window, but the button renders only on crossed cards and the floor holds **0 crossed objects** today (staged: 5, none crossed). It has fired twice in history, both test-era — the evidence sits at `patterns/_folded/crossed_test_pile_A_turbo_b2b785.md` and the two ledger lines. No normal daily operation reaches it until the next cross exists.
- `correction` is **dormant** — an annotation in the ledger no code writes or reads.

**The two resolutions, evenly:**
- **Raise the law.** An amendment sanctioning `uncross` as a fourth Kevin-only verb (rollback-with-record) and classing `correction` as a ledger annotation. Touches: vocabulary text (spec mark-set lines, ORGAN_CONTEXT vocabulary, ARTIFACT_GRAMMAR if it lists the triad), the bird's-eye DIVERGENT row. Zero code. Commits NESI to: a four-verb gate forever after — every future organ, artifact, and outside reader learns four verbs, and "cross is a ceremony" gains a sanctioned reverse gear.
- **Strip the behavior.** Remove `uncross` from core.py, the nesi_app button/footer, and continuity's filter (three files), and class the two ledger lines annotations. Requires: an exe rebuild to reach the window; a decision about the existing `_folded/` artifact and the two historical ledger lines (they remain as record either way). Commits NESI to: the strict triad — walking back a mistaken cross becomes compost-the-canon-file-and-recross, a two-step with its own ledger trace, losing the one-motion rollback and its sync-loud revert logic.

## D2 · THE ORDER — unmarked

**Settle-first.** Don't animate a machine over a law that contradicts its own behavior. Facts under it: the divergence is in reachable code, not just paper — the next cross puts the un-cross button back on screen; a live engine accelerates the arrival of real crosses (real digestion → real material at the gate), so the window between go-live and the first crossed card is where the unsanctioned verb becomes exercisable again.
**Light-then-settle.** The divergence is idle today — zero crossed objects means zero paths to `uncross` until a cross happens, and every cross is Kevin's own ceremony; nothing fires without his hand between. Facts under it: the engine read (real digestion quality, the stub re-runs, cold-start) is blocked only by Mark 1, touches no uncross code, and D1's raise-resolution would need no code at all if chosen later.

Both readings stop here. No order named.

## D3 · MARK 1's SHAPE — unmarked

**Where the engine reads memory now — the Q5 fact, split honestly:**
- **Organ calls (the seam): Q5 is DONE.** metabolize() passes only NESI-owned paths — `bench/metabolizer/SKILL.md`, `mind/ORGAN_CONTEXT.md`, the pile. Wired 2026-07-16; the organ is forbidden `~/.claude` by its own context file.
- **Engine boot: a vendor weld REMAINS.** `claude -p` loads `~/.claude/CLAUDE.md` (the pointer) and vendor settings/hooks before the organ prompt arrives (ENGINE_SOCKET weld #1, left deliberately). Per the weld ledger, none of these welds carries NESI's memory — a swap loses auth and boot quirks, not mind.
- **Vendor retirement (migration step 7): NOT RUN.** The vendor memory dir, hook, dispatcher, and skills still execute for CHAT sessions; the cold-start test that gates retirement is itself blocked on Mark 1.

**What this does to Mark 1's shape:** the hardening cost of a live engine is bounded — daily runs would deepen boot/auth habit, not memory captivity, because the memory seam is already NESI-owned. But go-live is also the unlock for the cold-start test, which is the gate for retiring the vendor copies — so Mark 1 and the Q5 tail are coupled in that direction: lighting the engine is what makes finishing the migration testable. Whether go-live carries the cold-start + retirement tail with it, or ships bare, is the D3 mark. Q5 was not performed this session.

## INTERACTIONS — dependencies as facts, not routes
- §3 found `uncross` reachable-but-idle: the settle-first urgency in D2 is real but not immediate — it activates at the first cross, and crosses are Kevin-gated.
- §5 found Q5's memory half done and its retirement half pending-behind-Mark-1: the cost of light-first-without-Q5 is lower than the inversion's worst case (memory is already NESI-owned), while light-first is simultaneously the enabler of Q5's own finish test. Both directions of that coupling are stated; neither concludes an order.
- D1's raise-resolution needs no code; D1's strip-resolution needs a rebuild — so if D2 lands light-first and D1 later lands strip, the strip costs one more rebuild cycle than it would today. A fact about cost, not a route.

---
*Three decisions, prepared and open. The mark is Kevin's.*
