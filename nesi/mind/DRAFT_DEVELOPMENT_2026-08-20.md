# DRAFT — DEVELOPMENT STATE, synthesized from a 30-day swarm pass

**Status: draft, not seated, not ruled.** Produced 2026-08-20 alongside
`DRAFT_VISION_BUILD_SPEC_2026-08-20.md`, same workflow (`wf_e54c77f2-473`),
same 382-candidate pool and four-lens audit (whose 5/381 flagged, fact
88/382 flagged, proof 9/382 flagged, sourced 9/382 flagged). This file names
what's actively open, where the lenses disagreed or caught something, and
what needs Kevin's own mark before being treated as settled. Disagreements
are named here, not resolved.

---

## CURRENT STATE (as measured across the pass)

- Geometry is the most solid part of the corpus: 12 seats / 24 members / 8 triangles / 6 squares / 1 centre / 4 circuits, cross-confirmed by independent derivation and PyRigi (THE_SOLID.md, THE_CENTRE.md). This held up clean across all four lens audits with almost no flags.
- The build itself moved fast in the final days of the pass: seam.js, the light mechanic, root/succession, and the ds-kit minimap were all built and wired 2026-08-19 (MARKS_LOG.jsonl). field_kernel.js exists but is not wired into tank.html.
- A real stranger cold-walk (2026-08-19, git log) found the door broken twice and recovered a 500-word write the seating was silently losing — this is the single strongest piece of evidence in the whole pool, because it's the one claim that actually meets LEARNED.md law 2's standard (no WALKABLE without a stranger's read) rather than a same-session self-check.
- Multiple other "verified"/"WALKABLE" claims in the pool do NOT meet that standard — see below.

## OPEN THREADS WORTH PICKING BACK UP

1. **Day-one siting collision.** ALIGNMENT.md B2 (answered 2026-08-18) said day one's atomic unit is "one tetra CELL" — three seats plus the centre — and explicitly left which cell open pending more context from Kevin. The 2026-08-19 amendment to THE_BOOT_2026-08-18.md instead rules day one is the bottom SQUARE (FILTER·STATIONS·GROUND·DEEP), per Kevin's own words in MARKS_LOG.jsonl 2026-08-19T00:00:00. The square framing supersedes the cell framing, but the earlier "which cell" open item and its narrowed-to-4-candidates handoff (MARKS_LOG.jsonl 2026-08-18T23:26:00) is now moot rather than resolved — worth naming explicitly rather than letting it silently vanish.

2. **Whether a diameter counts as a level.** F10 (2026-08-17 mark) settled six roots on circuit pairs but explicitly declined to resolve whether a diameter is itself a level — the corpus's own note says this is "not resolved by him and not guessed by" the session (THE_VISION_2026-08-17.md section 7, lines 330-341; ALIGNMENT.md). The 30-level count downstream of this (24 seams + 6 diameters) is carried forward as if settled in several later documents (THE_BOOT_2026-08-18.md, THE_GROWTH.md §2) — worth flagging that the count rests on an unresolved sub-question.

3. **F6's jitterbug-cap-at-five.** The mark itself ("cap at five — one window stays unsited so the fold survives") stands as Kevin's ruling, but the geometric reasoning behind it was found wrong on later review: since the six mechanisms fold independently (per solid.js/PyRigi), the FIRST window sited ends a coordinated fold, not the sixth. The gap between what the mark says it buys and what the geometry actually shows is explicitly named as Kevin's to close, not the session's (ALIGNMENT.md, F6 note; THE_VISION_2026-08-17.md section 10, lines 497-513).

4. **Law 8 vs. the deep-works-while-away collision.** Law 8 ("the world runs while you're in it and stops when you leave, no offline progression") directly collides with THE_GAME.md's own claim that "the creature works only while you're away." Both are Kevin's, nine days apart, and nothing has ruled between them — named as open in §16, not defaulted (THE_VISION_2026-08-17.md section 13, lines 598-604).

5. **What departs at the cast.** Whether the fruit alone departs, or the fruit plus the stand and ground it grew from, is unresolved and explicitly reserved to Kevin (THE_VISION_2026-08-17.md section 12, lines 571-577; THE_GIFT.md 'At the gate'; THE_WORK_SURFACES.md CAST entry — which also calls the current state "half-built and dishonest": the file leaves and the world loses nothing, even though CAST's whole point is that the cost is the point).

6. **8 orphan mechanics.** As of the 2026-08-19 amendment, eight real, built mechanics in ascent.html (rain, channel, shoal, sounding, stilling, membrane, spring, table) have no edge in solid.js — their fate (resite/retire/keep outside the 30) is named as real, unresolved, and Kevin's alone (THE_BOOT_2026-08-18.md, 2026-08-19 amendment).

7. **Set-down position.** Whether an appearance at the rim is a tally, or (if nothing appears) the site is nominal, is a genuine collision between two of Kevin's own marks, hours apart — carried forward from the now-composted DECISIONS.md explicitly unresolved on purpose (DECISIONS.md, RE-SEATED section).

8. **The presence seam.** Whether the world may ever move on its own while the player is present (not just absent) is open; the water table already breaks toward "stillness with you present" via load falling out of suspension, but this hasn't been ruled as policy (DECISIONS.md, RE-SEATED section).

9. **Whether resurfacing a held mark differs from the forbidden re-engagement hook (law 13/14).** Explicitly labeled unsettled in the source itself — "the two have never been read against each other before this pass" (RETURN_regather_load_bearing_mark_2026-08-19.md).

10. **Which poles the field's relation-object carries** (SELF/OTHER/WORLD/TIME vs. the field's current three arms) — explicitly left for Kevin, not to be guessed ("guessing would be the machine choosing your geometry") (THE_REGATHERING.md, item 8).

## WHERE THE LENSES DISAGREED OR FLAGGED THE SAME MATERIAL DIFFERENTLY

- **The eight-triangle-mechanic siting criterion.** THE_VISION.md section 4B (lines 260-317) presents the "no cost line" criterion for tenanting the eight triangular faces as mechanically settled/derived — the *proof* lens flags this as an overclaim, because THE_CENTRE.md §11/§17 later shows this exact criterion was a correlation observed at one moment, later misrepresented as a derivation. The *whose* lens, looking at THE_CENTRE.md's own later correction, calls that correction clean — the corpus catching its own error. Net: the correction exists and is honest, but an earlier overclaim (THE_VISION.md §4B) still stands in the corpus uncorrected in its own text. Both readings are accurate to what's on the page; they're about two different documents describing the same fact at two different times.

- **"Verified"/"WALKABLE" claims resting on same-session, builder-only checks.** The *proof* lens repeatedly flags this pattern as a live tension against LEARNED.md law 2 ("no WALKABLE without a stranger's read"):
  - BUILD_RECORD.md's 2026-08-14 claim that the door into THE ASCENT was "verified WALKABLE (22/22 door_check.js)" — flagged: an automated pass alone, no stranger cited.
  - THE_BOOT_2026-08-18.md's claim that tank.html was "verified running in a real browser the same session it was built" — flagged, and the same document's own next line honestly admits "it has not been walked by a stranger."
  - field_kernel.js's dawn/rewind mechanics described as "verified adversarially" — flagged as same-session, unwitnessed, and not yet wired into the real system it's meant to serve.
  - MARKS_LOG.jsonl 2026-08-18T21:07:07 ("TANK woven... verified live") — same pattern.
  - The *whose*, *fact*, and *sourced* lenses did not flag these same claims (they check different things — authority, enforcement mechanism, and quotation fidelity, not witness standard), so this is not four-way disagreement, it's the *proof* lens catching something the others aren't built to catch. Worth treating as a single standing finding: **several "verified"/"WALKABLE" claims in the build-status pool have not actually cleared the corpus's own stranger-witness bar**, with the 2026-08-19 stranger cold-walk being the one clean counter-example that did.

- **Candidate law 26 / cost-shifting.** DRAFT_LAW26_2026-08-19.md was explicitly blocked from LEARNED.md admission and salvaged narrower, gated as "held, not seated — single-session, self-judged; promote only if it recurs and an outside read confirms it." All four lenses read this as clean specifically *because* it stayed unpromoted and self-labeled as provisional — included here as an example of the corpus handling an uncertain claim correctly, not as a settled law.

- **THE_VISION.md's "12 laws / What Never Bends."** The *whose* lens flags this list itself: THE_VISION.md's own header (lines 3-33) states nothing in the document is a ruling except five explicitly named marks, and this 12-law list isn't among them — yet it's presented in law-or-rule form as "What Never Bends." The *fact* lens separately flags several of the individual laws inside that list for having no cited enforcement mechanism. Both objections stand together: not only is the list's authority unclear, several of its contents also aren't currently enforced even where they claim to be.

## NEEDS KEVIN'S MARK

The following are flagged by at least one lens as resting on a session's own judgment, an unratified reading, or an internally-inconsistent authority claim — they should not be treated as settled until Kevin says so directly.

1. **THE_GAME.md's standing order** ("game-craft leads with full authority, every prior ruling is advisory except the laws listed sacred") — *whose* lens: only the "supersedes the filing-loop" clause is directly quoted from Kevin; the "full authority" and "every prior ruling advisory" language extends beyond the quote and reads as a session's own authority grab dressed as his ruling (THE_GAME.md, lines 71-82).

2. **THE_VISION.md's 12 laws / "What Never Bends"** — *whose* lens: presented as law-or-rule despite the document's own disclaimer that nothing in it is a ruling except five named marks; this list isn't one of the five (THE_VISION.md section 7, lines 385-414).

3. **Canon-maturity default screening posture** ("default to COLLAPSES_TO_EXISTING") — *whose* lens: converts a session's own analytical read into a standing default that pre-collapses freshly surfaced material to existing canon, risking under-crediting genuinely new patterns Kevin surfaces without his having ruled on the posture itself (project_canon_maturity.md, lines 16-20).

4. **THE NAVIGATOR REFRAME** ("NESI is the navigator to the win-win, not the gift medium") — *whose* lens: the source labels this "unmarked" while simultaneously calling it "load-bearing" and using it to de-scope the entire multi-tenant build — an admittedly unratified idea functioning as if it were a ruling (project_nesi_gift_workspace_navigator.md, line 20).

5. **CANDIDATE_GRAMMAR.md's standing rules** (worksurface-not-sign, the indicator refusal, etc.) — *sourced* lens: self-described as "candidate grammar (not law, never promoted by any seat)" yet asserted as "load-bearing until superseded" — the weight claimed exceeds the file's own stated status (CANDIDATE_GRAMMAR.md).

6. **"Net: timed/triggered resurfacing is possible fully dark today"** — *whose* lens: this definitive conclusion is reached immediately after the same document calls the underlying question ("whether this differs from the forbidden re-engagement hook") "not settled anywhere in the current text" — a confident determination on an admittedly open question (RETURN_regather_load_bearing_mark_2026-08-19.md).

7. **A large family of behavioral/conduct rules for the AI itself** (no self-limiting, map both sides, no cost-shifting, renderer-not-verifier, hold direction on closeout, and roughly 30 similar feedback_*.md entries) — *fact* lens: flagged consistently as prose-only compliance rules with no cited mechanical enforcement — they depend entirely on a future session reading and remembering them. Not false, but not filesystem facts either; worth Kevin knowing which of these he wants actually built into a checked gate versus left as read-and-comply convention.

8. **"Zero dependencies, ever"** and similar absolute build-constraint language (THE_BUILD_SHAPE.md, THE_KIT.md §6, THE_HAND_FROM_THE_COMMONS.md §0) — *fact* lens: stated as standing law with no instrument that checks for the absence of package.json/node_modules/network calls across the codebase. Currently convention, not enforced fact.

9. **External statistical/market claims used to ground design decisions** — *sourced* lens: BiAffect's R²=.63 depression-prediction claim, the psychotherapy-alliance correlation figures (r=.278/.28), Forest's "60M users," and specific claims about Rosebud's premium-unlock feature are all cited as settled fact to justify design choices, without a checkable source in the corpus itself (THE_VISION_2026-08-17.md section 2, lines 36-108; section 17, lines 816-832). These may be true, but they're currently unverified within this project's own record.

## STANDING METHODOLOGICAL NOTE

Two skills exist in this workspace built directly from the pattern the *proof* lens keeps finding: **cold-walk** (a stranger must walk a surface before it can be called WALKABLE — "an author cannot be their own stranger") and **conservation-harness** (name the conserved quantity, generate a runnable check, don't trust a routing system that hasn't been counted). Both were proven twice on 2026-08-19 against real bugs. Given how often this pass's proof-lens flags rest on exactly this gap (same-session verification standing in for a stranger's read), routing open build claims through cold-walk before they're treated as done is the corpus's own established remedy for the class of finding above — not a new recommendation, a reminder to use what already exists.
