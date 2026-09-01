# ROUTING MANIFEST — the membrane filter, as run

*2026-08-02 · routed by `_INTAKE/MEMBRANE_ROUTER.html` on the keeper's mark ("ACCEPT the default routing", MARKS_LOG 17:58)*

*Source corpus: 1883 turns across 205 Claude Code sessions + 24113 turns across all 1290 claude.ai conversations (2024-12-12 → 2026-08-01). 5101 distinct lines extracted, all seven fields, merged and de-duplicated.*

---

## the balance

**5101 lines in. 5101 lines out. 0 waiting on a disposition.**

- **378** route to something that serves — MEMBRANE 82 · ASK 100 · STANDING 82 · STUCK 114
- **190** held — DIRECTION 190
- **4533** recycled — COMPOST

> **RECORD no longer exists.** On the keeper's mark 2026-08-02 18:43 — "two-thirds of the record producing nothing is a graveyard with good manners" — the four rules that fed RECORD now feed COMPOST. Its 3,391 lines are in `COMPOST.md`, with the same provenance they had before. `RECORD.md` on disk is a tombstone pointing here.

> **STUCK is now its own route.** On the same mark — "being stuck is a condition, not a request, and he asked what I needed" — the STUCK field split out of ASK. ASK fell from 235 to 114; STUCK holds 121. The serve total is unchanged at 403; only its shape changed.

> `DIRECTION.md` was not named in any mark. It is written anyway, because without it 204 lines would have no file and the on-disk accounting would no longer sum to the input. Nothing is dropped silently.

## the rules, in order — first match wins

| # | rule | the disposition it reads | → | caught |
|---|---|---|---|---|
| 1 | It belongs to a chapter you closed. | first said before 2025-10-01 — the chapter you closed yourself | COMPOST | 2597 |
| 2 | You pasted it, you didn't type it. | formal register, no bare lowercase "i", no typo, no trailing dots — pasted, not typed | COMPOST | 715 |
| 3 | It was flagged as possibly not yours. | typographic quotes, em-dashes or second-person address — flagged as possibly not yours | COMPOST | 34 |
| 4 | It was an errand, and the errand is over. | errand-shaped — consumed on completion | COMPOST | 119 |
| 5 | You said it once in the bridge chapter and never again. | said once between 2025-10-01 and 2026-05-01 and never returned to | COMPOST | 984 |
| 6 | You returned to it in the bridge chapter. | said two or more times between 2025-10-01 and 2026-05-01 | COMPOST | 45 |
| 7 | It names something from an arc you closed. | names an object or third party from an arc that has closed — the trade, the DSS people, the bike return, the coop, the legal thread | COMPOST | 39 |
| 8 | You said it in this chapter. It routes by field. | said on or after 2026-05-01, in your own typing, not an errand — routed by field | by field | 568 |

**The field map** (the one place a judgment is made, and the only rule not derived from the keeper's own record): `REFUSALS→MEMBRANE` · `CAPACITIES→MEMBRANE` · `EXCESS→MEMBRANE` · `NEEDS→ASK` · `STUCK→STUCK` · `STANDING→STANDING` · `WANTS→DIRECTION`

**The dials as run:** closed chapter ends `2025-10-01` · current chapter begins `2026-05-01` · "returned to" means `×2` or more.

---

## what this is not

- Not a decision. No line in any route file is marked, approved, or published.
- Not a score. Nothing here measures the keeper; the counts are counts of the record.
- Not a deletion. COMPOST holds its lines with full provenance, in this folder.
- Not permanent. Every rule is a switch and every dial is live in `MEMBRANE_ROUTER.html`; re-running it with different dials re-routes everything.

