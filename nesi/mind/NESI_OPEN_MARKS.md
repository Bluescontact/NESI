# NESI — OPEN MARKS LEDGER
**STATUS: PROPOSAL — a map of forks, not a decision on any of them. Companion to `NESI_RECONCILED_VISION.md`. Nothing here is ranked, recommended, or defaulted. Kevin marks; this file only names.**

Each mark states both sides (or all named candidates) and cites its sources. Where a mark from the governing brief's seed list (§5) turned out to already be resolved, or reframed by later work, that finding is stated plainly rather than left as if still open — the finding itself is still offered for Kevin's confirmation, not asserted as settled fact on this file's own authority.

---

## A · The seeded marks (confirmed, resolved, or reframed)

### A1 · DSS relationship — wrap, inherit, or compost?
**Still open, explicitly.** Does NESI wrap, inherit, or compost the DSS machinery (falsifier gate, governor trail, Brier ledger, drift meter)? The 2026-07-20 reader-seam session states this directly: "Out of scope, untouched, as instructed: whether NESI wraps/inherits/composts the DSS machinery... Not resolved in code, not resolved in this log."
One concrete data point exists, but doesn't resolve the general question: the four DSS recognition-organ *panes* were composted from NESI's window (2026-07-17) as unused UI, while the underlying DSS *scripts* were explicitly left untouched and live outside NESI's exe. That is one instance of "neither wrap nor inherit nor compost, just don't render" — not a stated policy.
**Independent corroboration, lower-confidence source:** the pasted companion document (§E below) names this same tension as "the coordination seam" and proposes it as a live cost Kevin pays daily — without answering it either. Two documents landing on the same open question from different angles is a signal the question is real, not a resolution of it.
*Sources: `NESI_READER_SEAM_2026-07-20.md` §"§3 marks"; `_compost/COMPOST_NOTE_2026-07-17_organ_panes.md`; companion document §5 (provenance unconfirmed — see §E).*

### A2 · Composer: pipe or language?
**Found resolved in the corpus, not open — offered for confirmation, not asserted as durable.** The seed brief lists this as open. The Composer's own build session (2026-07-20) records: "Kevin's mark: 'pipe confirmed as the default.'" — wired the same session: `bench.new_object()` and `bench.land()` now call `compose_preview()`/`compose()` automatically; every bench object carries its own render.
**What remains genuinely unresolved underneath this:** only bench is wired to the Composer. `front.py` stays "HTML-free by design... no brain, no second engine seam" — it surfaces `diagram_status` as a plain-text line rather than rendering through the Composer itself. Is front exempt from the pipe default as an entrance rather than a renderable organ, or is this an unwired gap the pipe default should eventually close? Interrogator's own output is likewise not piped through the Composer. Neither question is addressed in any source read.
*Sources: `NESI_COMPOSER_2026-07-20.md` §"Addendum, same session"; `bench/composer/STANDING_SPEC.md`.*

### A3 · The four faces of the integrated tetra
**Could not be located in the read NESI corpus — flagged as a gap, not resolved.** No file names "the integrated tetra" or its "four faces" verbatim. Two candidate structures exist and neither is confirmed to be the referent, and neither is mapped onto the other:
- NESI's own development-protocol tetrahedron: four agent *roles* (Grounder / Dreamer / Governor / Shaper), not faces, six stated-tension edges, a separate synthesis center. (`ARTIFACT_GRAMMAR.md` "the tetrahedron"; `seed_construction_language.md`.)
- The Architecture of Coherence's four *vertices* (Differentiation, Connection, Boundaries, Architecture, six edges, four failure modes) — named DSS/library-wide canon, not NESI-specific, and no NESI file cites it by name. (`project_architecture_of_coherence.md`.)
Whether these are the same geometry under different names, two different geometries serving different scales, or something else entirely named "integrated tetra" in a document outside this read's scope — unresolved.

### A4 · The engine-agnostic unit — named, but the call-site question is open
**Reframed by later work, not simply open as originally seeded.** The seed brief calls this "the shape of the thing crossing the socket, unnamed." As of 2026-07-20 the shape *is* named: `engine_fn(payload: dict) -> result: dict`, with `bench.invoke(op, payload)` as its canonical form and `core.metabolize(pile)` as a second conforming implementation. What the corpus itself still marks open, verbatim "Marked, not assumed (Kevin's to ratify)": should metabolizer's call site be rewritten to literally call `bench.invoke("metabolize", {...})` so there is one function everything calls — or does the unit stay defined at the contract level with two conforming implementations, since metabolizer's payload (a raw pile) doesn't obviously fit the `{op, payload}` shape without renaming what "payload" means for it?
*Source: `ENGINE_SOCKET.md` §"Marked, not assumed."*

### A5 · Interrogator == DSS gate-delta?
**Confirmed still open, verbatim.** Is the reach-back interrogator and the DSS gate-delta one organ under two names? The 2026-07-20 reader-seam session lists this explicitly as untouched, unresolved in code, unresolved in its own log — same status as A1, stated in the same sentence.
**Independent corroboration, lower-confidence source:** the pasted companion document (§E below) raises the identical question in its own words ("the interrogator that reaches back and the DSS gate-delta may be the same check specified twice... surfaced, not answered") without resolving it either.
*Sources: `NESI_READER_SEAM_2026-07-20.md` §"§3 marks"; companion document §5 (provenance unconfirmed — see §E).*

### A6 · Tetra deposit — automatic, or a separate act?
**Not directly addressed anywhere in the read corpus.** Is a gift-library deposit an automatic output of a tetrahedral development cycle, or a separate act awaiting Kevin's hand? The closest settled law is general, not specific to tetra outputs: the 2026-07-20 storage rule (local dev/host; gift library = Google Drive/Docs; no ambient sync; one named document, one deliberate crossing at a time, Kevin at the gate) and the fork-landing mailbox's own hard limit ("never let arrival trigger ordering, building, or any engine path"). Neither states whether a *tetra cycle's own output* auto-deposits or requires the same per-item hand-crossing as everything else. Read most consistently with everything else in the corpus (no auto-anything crosses without Kevin), but that consistency is an inference from adjacent law, not a direct statement — flagged rather than assumed.
*Sources: `FORK_LANDING.md`; `NESI_BUILD_REPORT_2026-07-20.md` §8.*

---

## B · Contradictions surfaced in this pass (both sides stated, neither chosen)

### B1 · The bench's CENTER — three candidates, explicitly undecided
The bench's own identity is unresolved, and the corpus is emphatic that this is the standing open question, "no decay clock":
- **A · organ-spec generator** — the bench drafts organ specs through the 9-field construction-language form and breaks them against their falsifiers. Faces inward, toward the language itself.
- **B · held-thing maker** — the bench takes a rich felt-hold from the tray and forges it into a made object. Faces the 23-item hold tray as feedstock.
- **C · transmission engine** — the bench is where living becomes transmissible gift; faces the world, through a shut door. Not a mode but "an identity claim about where NESI's purpose lives" (the corpus's own words).
- **Or: one bench, three modes** — `invoke()` is op-agnostic and would serve all three behind one socket without forcing a single center.
Whichever is chosen changes the bench's INTERLOCK (what it must not do) and its FALSIFIER. Not resolved by the corpus's own admission — "Rendered fully, chosen nowhere."
*Sources: `NESI_BENCH_SPEC_2026-07-19.md` §3; `COLD_START.md` addendum; `NESI_BUILD_REPORT_2026-07-20.md` §7.*

### B2 · Front — organ, or entrance?
The construction-language grammar found that `front.py` "filled the form badly on purpose (no PROBLEM of its own; it routes)" when specced through the same 9-field form as every other organ — read as evidence for Line 4 (the entrance rule: "each organ its own way in, none reached through another's door"), which itself is HELD, not canon. So front's own ontological status — is it an organ like the other seven, or a structurally different thing (an entrance) that the grammar shouldn't even try to spec the same way — rests on an unratified line.
*Sources: `NESI_RETRO_SPECS_2026-07-19.md` §"FINDINGS ACROSS THE FIVE," item 5; `seed_construction_language.md` header (Line 4 status).*

### B3 · The seven constitutional organs — two disjoint namings, never mapped
`project_nesi.md`'s founding entry (2026-07-15) names the seven constitutional organs as: recognition lens · guide rails · decision space · cognitive heliostat · lint · scaffold · nanobot workshop. The later, ratified vocabulary (`ARTIFACT_GRAMMAR.md`, `NESI_SPEC_v1` §1) names organs by operational role instead — metabolizer, substrate, Converger, Governor, daily-cycle, "and peers" — without stating there are exactly seven or mapping these names onto the earlier poetic set. No source in the read corpus reconciles the two namings one-to-one.
*Sources: `project_nesi.md` 2026-07-15 opening entry; `ARTIFACT_GRAMMAR.md` "organ"; `NESI_SPEC_v1` §1.*

### B4 · "Crossing Razor" — term not found in the file corpus; found later in a pasted, provenance-unconfirmed document
The governing brief for this pass names "the Crossing Razor" alongside "the membrane" as a §2 topic to cover. No file read during the disk search uses that term. A companion document pasted directly into the session afterward ("NESI — What the Machine Could Hold," see §E below) does define it — "a gift that hasn't held you is a theory," tagged "canon" — a variant phrasing of the door_as_stack_layer line this reconciliation already carries in §2. But that document's own authorship and provenance were not stated when asked, and a direct search of `patterns/` (93 files) found no file by that name or containing that phrase. So the term is now *attested*, but not *verified against the searchable corpus* — still open which of these is true: an informal name in circulation that never made it to disk, a term from this specific pasted document only, or a canon claim the document overstates.

---

## C · Named-but-unbuilt (vision stated, no matching build found)

### C1 · The full-form deep review terminal
Terminal Law's escalation rule routes to "the full-form deep review terminal" when any of its seven conditions trips. `ESCALATION_CONDITIONS.md` carries the routing rule in full, verbatim, with provenance — but no organ, form, or module in the read NESI corpus specifies what that terminal *is* or how a session actually reaches it once Move A trips. It may live in the pre-NESI DSS layer (outside this pass's scope) rather than inside NESI's own build; that possibility is untested here.
*Source: `ESCALATION_CONDITIONS.md`.*

### C2 · Move 3 — the membrane's constitutional line — RATIFIED 2026-07-21
"The cross-touch is the membrane crossing. The conductor's write is its hand, never its author... A promotion is lawful only as the execution of Kevin's explicit cross, and every promoted file carries the mark's lineage as proof the crossing was human-originated." Proposed 2026-07-16, flagged "awaiting Kevin's ratification, do not self-adopt." **Ratified as written, 2026-07-21, Kevin's mark ("ratify as written") — no changes to the text.** Record: `marks/2026-07-21_move3-membrane-ratified.md`. This closes the one item named as an actual precondition on the first real cross (see the pre-login audit, same session) — login and the engine swap were never gated on anything else in this ledger.
*Sources: `project_nesi.md` 2026-07-16 "CANON RECONCILED" entry, 2026-07-21 ratification entry; `NESI_BUILD_REPORT_2026-07-20.md` §4; `marks/2026-07-21_move3-membrane-ratified.md`.*

### C3 · The booking / coordination membrane
Named vision (2026-07-18 morning pages): NESI as Kevin's booking and coordination membrane — a way for hosts to name their asks in a form Kevin can filter without downshifting into transactional logic; "pre-transactional infrastructure that allows Kevin to operate as a villager anywhere." The nearest existing structure (THE DOOR) is outward-facing to the public; this vision is inward-facing coordination with specific named people — read by the corpus's own audit as "a genuinely new pole, not a refinement of an existing one." Raw feedstock only; Kevin's same-day mark was explicitly "no Nesi work — stage only." A full construction-language spec for it *was* drafted and proven as a grammar test (all 9 fields filled cleanly) but stays HELD, not canon (construction-language Line 6).
*Sources: `_INTAKE/2026-07-18_nesi_vision_booking_membrane.md`; `NESI_REALIGN_2026-07-19.md` §4; `NESI_CONSTRUCTION_LANG_2026-07-19.md` §3.*

### C4 · Vendor retirement (migration step 7)
The memory-migration checklist's final step — a fresh engine given only `nesi/mind/` + one artifact must orient correctly, then the vendor copies (hook, dispatcher, skills, CLAUDE.md pointer) retire. Named as the closing move of the whole migration since 2026-07-15's spec draft; still blocked on Mark 1 (engine go-live) as of the latest read, itself deliberately held.
*Sources: `NESI_SPEC_v1` §6; `NECROPSY_2026-07-19.md` §"Cold-start test."*

### C5 · M2–M4 of the job grammar chain
M1 (ratify job grammar v2.1) and M5 (stream placements, staged as a 12-row sheet) are the only job-grammar marks with a concrete artifact on file. M2 (pile-ceiling  ratification + baseline move), M3 (per-tier engine contract), and M4 (runtime home outside OneDrive) are named in the original 2026-07-15 chain record but no later source in this pass shows them resolved, staged, or revisited.
*Source: `project_nesi.md` 2026-07-15 "JOB GRAMMAR" entry (five marks named; only M1 and M5 traced further in later sessions read).*

### C6 · seed/ — empty directory, resting state unconfirmed
Created 2026-07-16 alongside the mind-copy step, as a naming convention for "what any NESI instance would share" (distinct from `mind/`, which is Kevin's own instance and never crosses). Still empty as of the last read. `NESI_BIRDSEYE_2026-07-19.md` names this directly: "Confirm empty-is-correct resting state or compost the dir." Held, not confirmed either way.
*Sources: `project_nesi.md` 2026-07-16 step-1 entry; `NESI_BIRDSEYE_2026-07-19.md` mark 7; `COLD_START.md` ("Mark 7 seed/ stands as the named empty socket").*

### C7 · Registered-but-unmigrated executables (M5's other side)
Twelve bench.json executables beyond the seven native conductor organs (substrate, daily-cycle, mark-record, coordination, graduated-trust, infrastructure, morning-pages-channel, provenance, miro-handler, transmission-engine, field-kit-engine, plus metabolizer's own registry entry) are copied as mirrors-in-waiting but not migrated to run through NESI's own conductor — they still execute, if at all, as vendor skills in chat sessions. M5 marks their intended stream split as best-guess only.
*Sources: `bench/BENCH_NOTE.md`; `M5_PLACEMENT_SHEET_2026-07-19.md`.*

### C8 · Composer not yet in the running window
Built and source-wired 2026-07-20 (see reconciled vision §9), but no exe rebuild followed — confirmed by the absence of a fourth `NESI_EXE_SYNC_2026-07-20` file (sessions 1–3 each produced one; session 4 did not) and stated directly in both `bench/composer/STANDING_SPEC.md` and the session's own return: "not yet seen live in the window."

---

## D · Housekeeping marks visible in the ledgers themselves (not vision forks, but unresolved administrative items)

- **Necropsy burials ×3** — the four stale vendor minds R7 named turned out to be already gone by unrecorded hand; three one-line burial marks (the vanished minds, the transcript-residue dir, R7's own rewrite) are staged and await Kevin's mark. *Source: `NECROPSY_2026-07-19.md`.*
- **R7 provenance** — who removed the four stale minds, and when, is not recorded anywhere on disk. *Source: `NESI_REALIGN_2026-07-19b.md` §3.*
- **R4 permissions prune** — the vendor permissions allowlist (`hundreds` of accumulated grants, some for dead project paths) has been flagged since 2026-07-16 as needing a one-time audited prune; not done. *Source: `reflexes.md` R4.*
- **Bench TYPE_MARKERS review** — the six guessed intent-classification tags (letter/note/instrument/spec/reflection/gift) are unreviewed against Kevin's actual drop history. *Source: `NESI_EXE_SYNC_2026-07-20.md` §3.*
- **Felt-read queue over threshold** — 18 against a standing threshold of 15, named across three consecutive sessions (S1, S2, S3) without being acted on; not a build question, a queue-clearing one. *Source: `NESI_OPEN_REACH_2026-07-20.md`; both `NESI_EXE_SYNC_2026-07-20` files.*
- **The pattern-library count drifts by read date** (~89 → 90 → 94 → 96-plus-a-section across 2026-07-15 through 2026-07-19 sessions) — collapsed in the reconciled vision as ordinary growth, not a contradiction, but flagged here in case Kevin wants a single canonical count stated somewhere.

---

## E · From the pasted companion document (2026-07-20 — provenance unconfirmed, held to a lower bar)

"NESI — What the Machine Could Hold" was pasted directly into the session that produced this ledger. It was not found during the file search this pass ran, and when asked where it came from, Kevin's answer was "fold it," not an answer to the provenance question itself. Everything below is sourced to that document alone — not cross-verified against disk except where explicitly noted — and is offered with that caveat attached to every line, per Kevin's fold-it mark.

### E1 · Canon-claim discrepancy — five named patterns not found on disk
The document names Pre-funded gift, Single undeniable ask, Regulatory aikido, Sub-threshold node, and Missing-vertex naming as "in canon," alongside Crossing razor (see B4) and Holding-has-a-floor. A direct search of `patterns/` (93 files, filename + full-text) found none of these seven as standalone files. One partial exception: `load_test_over_elegance` is not a file itself but is referenced as a live wikilink inside the existing pattern `same_quartet_assembly_standing.md` — a real, circulating concept, but not "in canon" in the same sense as a crossed pattern file. Whether the other six are patterns that exist under different names, patterns real in practice but never crossed to their own files, or an overstatement in the pasted document is unresolved.
*Source: the pasted document §§2–3; verification search run this session against `patterns/`.*

### E2 · Candidate holdings named, none built
Five pieces of infrastructure are proposed as candidates, explicitly unmarked in the source: a **queue-tender / readiness router** (surfaces the next thing to mark, routes but never crosses), a **cycle-close reconciler** (catches log/disk drift, ages the held queue at close), a **gift-pattern library wired into the bench** (makes E1's moves callable by name from a compose call — contingent on E1's patterns actually existing as named), a **Return Metabolizer** (re-feeds returned/held material as feedstock; the document itself flags this as engine-gated, sequenced behind Mark 1), and a **Territory Listener** (reads where flow is stuck and how a fix would propagate). None appear anywhere in the file corpus this pass read. Whether any of these should be built, and in what order, is not touched here — named only.
*Source: the pasted document §§4, 6.*

### E3 · "The coordination seam" — a third framing of A1/A5, not a resolution
The document's §5 independently proposes that NESI and the DSS instrument stack being "two engines" rather than one is itself the single highest-cost open decision — naming it as a decision Kevin is currently paying for daily by holding the seam in his own head, rather than as a technical gap. This adds a framing (cost-of-non-decision) that A1 and A5 do not carry from the file corpus alone, worth holding alongside them, but it is not new evidence toward answering A1/A5 — the document explicitly declines to answer it too.
*Source: the pasted document §5.*

---
*Ledger ends. Nothing above is ordered, defaulted, or recommended. Each mark waits exactly as found.*
