# DEVELOPED — VE24 same-group batch, post-audit rebuild

Layered on top of, not replacing: `DRAFT_LENS_PANEL_VE24_2026-08-27_preflight_manifest.md`
(D1, 5 items) and `DRAFT_VE24_SAMEGROUP_2026-08-27_preflight_manifest.md` (D2, 9
cross-cutting findings + 18 pairs). Both source files stay on disk, unedited,
per this corpus's own convention that supersession is a mark on top, never a
silent erasure. This file is the output of a full-development pass (compost,
inventory, adversarial audit, ground, diverge, dream, converge, route/place,
verify) run 2026-08-28 on Kevin's ask.

**Verdict: BLOCKED.** Two findings below cannot be resolved by rebuilding
prose — they need a decision or a confirmation only Kevin can make. Everything
else that survived audit is rebuilt below into a form ready to mark.

---

## BLOCKING FINDING 1 — the mark that authorizes this whole batch doesn't exist anywhere it's supposed to

D2's opening sentence states as settled fact: *"Kevin's mark, offered a fork
between 'small lever'... and 'reopen the 66,' chose Branch B: reopen the 66."*

A ground-agent search of every place this corpus logs a mark — root
`MARKS_LOG.jsonl` (1446 lines), `nesi/mind/KEVIN_VERBATIM_2026-08-27_marks_log_extract.md`
(4,023 lines, containing 978 extracted `source: kevin*` mark entries — corrected
here from an earlier draft of this file, which misstated the file's own line
count as 978, the same stale-count failure mode this pass exists to catch),
`nesi/game2d/gate/{MARKS,LEDGER,COMPOST}.jsonl`, and `OPEN_GATES.jsonl` in root
and all nine worktree copies — found **no occurrence** of "Branch B," "reopen
the 66," or this fork, in this context, anywhere. Every other claim in both
900-line source documents carries a file:line citation or is explicitly
flagged unconfirmed. This is the one claim the entire second document is
authorized from, and it carries neither.

This does not mean the choice wasn't made — it may have been said in a
conversation that never landed in a logged file, which this corpus's own
`CLAUDE.md` already treats differently ("only Kevin's click marks" count).
But as written, D2 treats an unlocatable, unsourced assertion as settled
authorization for an 18-item batch — the exact failure mode `LEARNED.md:9-10`'s
"every line sourced, none composed" rule exists to block.

**What's needed from Kevin:** either point to where this was logged, or
re-confirm the Branch B choice now as a fresh, sourced mark. Nothing in the
18 pairs below should be treated as authorized-in-principle until this
lands.

## BLOCKING FINDING 2 — two "NOT AUTHORIZED" items are already built

D1 items 1 and 3 (nav strip on the 24 edge files; gift-card-12's citation
fix) each end "**NOT AUTHORIZED — awaiting Kevin's mark.**" Both are already
implemented, unstaged, in the working tree — byte-for-byte matching each
item's own spec (`git diff` on all 24 `VE24_*.html` files, and on
`nesi/game2d/inbox/gift_2026-08-27_12_the_case.md`). This is the corpus's
own most-repeated defect (building before a mark) occurring inside the
document meant to be flagging that defect.

**What's needed from Kevin:** either mark these two now (retroactively,
named as such) or the two changes get reverted before this material is
presented as an honest "nothing built without a mark" status.

---

## Corrected facts (audit + ground, accepted as findings, folded in below)

1. **"Reopening the 66" undercounts by 24.** C(12,2) = 66 total pairs on the
   12-vertex graph. 24 are built VE24 edges. 18 are the same-group pairs D2
   covers. The remaining **24 are cross-group pairs that are also non-edges**
   (e.g. A-G, A-H, B-I, C-E, D-F, E-J, F-K, G-L, H-I — a partial list; a full
   enumeration was not verified this pass and should be run before "reopening
   the 66" is claimed as complete). These are foreclosed by the exact same
   construction Fuller's reading names for the 18 — D2 never acknowledges
   they exist. **Fix applied below:** title/scope narrowed to "the 18
   same-group pairs," not "the 66," until the other 24 are named.
2. **The "128 unrouted candidates" figure is a display cap, not a count.**
   `K_LENS_REPORT_2026-08-28.md` caps each of its 44 directory sections at
   "N shown"; 128 is the sum of *shown* rows, not real unrouted totals.
   Summing the report's own scanned-minus-cited numbers per directory gives
   **~2,032** real unrouted candidates within the same narrow scan (one
   directory, `podcast_narrator`, alone accounts for ~1,069). **Fix applied
   below:** I-K and K-L now cite ~2,032 (same-scope figure), flagged as
   itself likely an undercount for the reason D2 already names (extension
   scope only).
3. **`nesi/bench` lowercase-`skill.md` count is 3, not 2** (`diamond/skill.md`,
   `membrane-controller/skill.md`, `miro-handler/skill.md`).
4. **Root `CLAUDE.md`'s "twelve instruments" claim is stale now, not
   "possibly."** Live `nesi/game2d/tools/check_all.js` NODE array = 16 named
   instruments (plus 3 that run in-page per `CLAUDE.md`'s own text). This
   was checkable with tools already open during the original pass and
   wasn't checked.
5. **The Fuller "sieve vs. reading device" fork was framed as more
   symmetric than the evidence supports.** Two things D2 never states
   plainly: (a) same-group vertex-pairs are **definitionally absent** from a
   cuboctahedron's edge set — this isn't a policy layered onto the geometry,
   it's what makes the shape a cuboctahedron; "reopening" them means
   building a graph that is no longer the VE24's own edge structure, not a
   different reading of the same one. (b) The *original* 24-edge draft's own
   stated reason for leaving Laws↔Protocols without a dedicated file cites
   corpus **text** directly ("that relationship is already carried by
   `CLAUDE.md` itself") — not blind geometry. That directly weakens item 4's
   claim that geometry decided "regardless of what the corpus's own text
   says." **This doesn't reverse Kevin's Branch B choice** (see Blocking
   Finding 1 — that choice isn't even confirmed yet) — it's added context he
   should have before confirming it either way.
6. **A-D and C-D are not equally weak.** A-D (Laws↔Gate/Ledger) has no
   citation either direction, but `gate.mjs`/`admit.mjs` are arguably the
   corpus's clearest *working instance* of law 22's own content (a mark only
   a hand can write; refusal that must carry a ground) — an uncited but real
   resemblance. C-D (Memory/Suspension↔Gate/Ledger) is confirmed by grep to
   be genuinely nothing but coincidental vocabulary overlap. Both stay
   correctly-unbuilt candidates; C-D is the weaker of the two.
7. **J-L's "no connection found" is softened, not reversed — on weaker
   grounds than first stated.** `SESSION_BRIDGE_2026-08-27_three_actions_and_the_return.html:267`
   does name "world2d's retirement status" and the nesi_bench_v0 K→J
   reclassification question as open items — a real, if thin, J-domain
   touch inside an L-domain file. The adjacent citation to lines 165-166
   does not hold up on verify: those lines are gift-extraction result-table
   rows ("nesi_bench_v0 — 8 — DRY," "world2d — 8 — 2 gifts"), not a
   discussion of retirement status, and citing them alongside :267 overstated
   the evidence. Reclassified from "no connection" to "worth a closer read
   before calling this settled," resting on the single verified citation
   (:267) — same status as items D2 already flags this way elsewhere.

---

## Mark sheet — everything ready to mark once the two blocks above clear

*(Compressed per diverge's Shape 3; full scope/spec/verification prose is
unchanged and lives in the two source files — this is a routing view, not a
replacement. Unranked, per law 30 — order below is domain-grouped, not
priority-ordered.)*

**D1 — lens-panel items**
- Nav strip on 24 edges — low cost — **already built, see Blocking Finding 2**
- Stale-count checker (new tool) — low-medium cost — not yet built
- Gift-card-12 citation fix — low cost — **already built, see Blocking Finding 2**
- Traversal edge-list hand-copy fix — low cost — not yet built; can fold into
  the stale-count checker once that exists, or stand alone

**D2 — RULE group**
- A-B Laws↔Protocols — low cost, richest pair
- A-C Laws↔Suspension — needs the same suspension-framing confirmation as B-C
- A-D Laws↔Gate — correctly-unbuilt candidate; uncited but real resemblance (see fact 6)
- B-C Protocols↔Suspension — richest of all 18; needs suspension-framing confirmation
- B-D Protocols↔Gate — real, verbatim mechanism; surfaces the 3-4-gate-systems ambiguity, name it before building
- C-D Suspension↔Gate — correctly-unbuilt candidate; weaker of the two (see fact 6)

**D2 — READ group**
- E-F Lenses↔Skills — direct; must state the `lens-panel` domain overlap
- E-G Lenses↔Tools — weak: one dead citation, one retired-agent citation, one live anchor (`framing_check_skills.js`)
- E-H Lenses↔Gift-pipeline — thin, one clean quote
- F-G Skills↔Tools — deepest-evidenced pair of all 18
- F-H Skills↔Gift-pipeline — real; must state the `external-extraction` overlap and the missing `unrouted-gifts/SKILL.md`
- G-H Tools↔Gift-pipeline — one strong self-referential anchor; must state the `library_lens.js` overlap

**D2 — BUILD group**
- I-J live build↔Retired — strongest BUILD pair; carries its own live drift finding (RETIRED.md vs index.html) — name it in the file
- I-K live build↔Library — real mechanism (K_LENS_REPORT); cite ~2,032, not 128 (fact 2); K's directory count still disputed (44 vs 45)
- I-L live build↔Session-bridge — one-directional; state that plainly
- J-K Retired↔Library — genuine documented reclassification; flag the `nesi/bench/` vs `nesi_bench_v0/` naming-confusion risk
- J-L Retired↔Session-bridge — softened per fact 7; re-read the flagged session bridge before drafting
- K-L Library↔Session-bridge — real, dated mechanism; cite ~2,032 not 128; name the K-report dating inconsistency

---

## What this run cut, and why

Per stage 8's "anything that cannot be assigned a location is cut, not
parked": nothing substantive was cut. The per-item SCOPE prose was
compressed to one line each in the mark sheet above, with the full text left
in place in the two source files rather than duplicated here — a duplicate
copy would itself become the stale-count failure mode this whole pass is
about.

## Deferral accounting

- **What did this add that nothing calls?** Nothing — every correction above
  is wired to a specific item in the mark sheet or to one of the two
  blocking findings.
- **What did it name that it did not build?** The stale-count checker (D1
  item 2) and the exact enumeration of the 24 missing cross-group pairs
  (fact 1) — both named, neither built this pass.
- **What did it defer?** A full verified list of all 24 cross-group non-edge
  pairs (only examples given, not a checked complete set); the actual
  resolution of Blocking Findings 1 and 2, which only Kevin can close.
