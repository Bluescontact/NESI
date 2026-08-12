# NESI — RECONCILED VISION
**STATUS: PROPOSAL — awaiting Kevin's ratification. Not canon. Written by an extraction-and-reconcile pass, 2026-07-20, over the full NESI corpus. Nothing here was built, run, or marked in producing it.**

This file exists so a future session opens on the reconciled read instead of re-deriving it from 100+ scattered files. It draws only from claims sources actually make (§3 bins 1/2/5 of the governing brief) — nothing invented, nothing resolved that the corpus itself leaves open. Every contradiction and every named-but-unbuilt item lives instead in the companion file, `NESI_OPEN_MARKS.md`.

Reading order for a cold session: this file, then `PROTOCOLS.md`, then `COLD_START.md` for the most recent sealed state, then `NESI_OPEN_MARKS.md` for what's still Kevin's to decide.

---

## 1 · What NESI is (settled)

One machine, extracted from a life, that converts raw living into transferable patterns, under a human gate, without consuming the human it holds. The name covers two things deliberately: Kevin's bus (holds the body) and this system (holds the mind) — same function, holding, at two scales.
*Sources: `_INTAKE/NESI_SPEC_v1_2026-07-15.md` §2; `project_nesi.md` (2026-07-15 opening).*

**The inversion that defines it:** the system used to live inside a vendor AI harness (skills, memory, protocols all vendor-owned; the chat session was the machine's body). The target flips it — the AI lives inside NESI. NESI is a standalone local program that owns its own memory, protocols, and organs; the language model is a replaceable socket ("Claude is the engine behind it for now" — Kevin). Build is progressive migration, organ by organ, daily use unchanged throughout — no big-bang cutover.
*Source: `NESI_SPEC_v1` §2; confirmed as executed practice across the entire `project_nesi.md` migration log, 2026-07-16 onward.*

## 2 · The stack (settled + current standing)

**NESI (private, holds Kevin first) → THE DOOR (the membrane, its own layer) → OurSharedGifts (public face).** Order is load-bearing: "a gift the giver hasn't been held by is a theory." Two patterns crossed to canon on this: `patterns/anatomy_is_not_the_cockpit.md` and `patterns/the_door_as_stack_layer.md` (crossed 2026-07-15).
*Sources: `NESI_SPEC_v1` §2; `project_nesi.md` 2026-07-15; `NESI_BUILD_REPORT_2026-07-20.md` §1.*

Current standing: THE DOOR is deliberately absent from the build — `bench.json` excludes membrane-controller from its executable registry by design ("crossing is unrepresentable as a job — grade-two incapacity, not prohibition"), and `front.py` hard-walls any outward intent ("the door isn't open, membrane unratified," then stops). OSG exists, deployed, outside `nesi/`, but nothing in NESI routes to it — expected, held behind the unbuilt DOOR.
*Source: `NESI_BIRDSEYE_2026-07-19.md` §1.*

## 3 · Constitutional laws (settled, inherited by every organ)

1. Anatomy is not the cockpit — functional anatomy and the daily interface are different layers, many-to-many, never rendered 1:1.
2. Fluency is not authority — no amount of coherent AI output ratifies anything; judgment stays human at the gate.
3. Staging-only, fail-closed — machine work stages; errors halt without partial writes; ambiguity resolves toward not acting.
4. Incapacity over prohibition — violations are made structurally impossible, not merely asked-not-to.
5. Nothing deleted without a mark; compost leaves a record.
6. The felt-read gates what matters and cannot be automated.
7. "Would Kevin actually use this?" — the build-time falsifier. It has already killed at least one build (Route B v0, the quiz-form demo, composted 2026-07-15).
*Source: `NESI_SPEC_v1` §3, reaffirmed verbatim in practice throughout `project_nesi.md`.*

## 4 · Vocabulary (settled — RATIFIED law, `ARTIFACT_GRAMMAR.md`)

**mark** — a human decision, typed by Kevin; the only thing that ratifies, promotes, deletes, or publishes. AI never marks.
**stage** — to produce output that awaits a mark; all machine work is staging; staged ≠ accepted.
**cross / the membrane** — the one-way passage into canon; a ceremony Kevin performs, never queued or batched.
**compost** — retire with a recorded reason; not deletion, not failure; most material should compost.
**HOLD** — "not yet, and here is the named condition that would change it." A HOLD without a condition is procrastination with a label.
**uncross** *(fourth verb, ratified 2026-07-19 — "keep undo, update the rules")* — Kevin's one-motion rollback of a mistaken cross: the pattern folds to `patterns/_folded/` (kept, never deleted), the index rebuilds sync-loud, the ledger records `uncross`. Kevin-only, like every mark.
**correction** — NOT a mark. A ledger annotation naming a discrepancy on the page; no code acts on it.
**canon / patterns/ / the lint** — the pattern library, a flat reference surface ("a machinist's flat table") that new work is checked against for coherence, not compliance.
**the gate** — the queue of staged items awaiting Kevin's marks; human-only territory, no approve button, ever.
**felt-read** — a somatic yes/no only Kevin performs; instruments exist to prompt it, none to pass, simulate, or infer it.
**organ** — a named function of the system (metabolizer, substrate, Converger, Governor, daily-cycle, and peers); anatomy, not a menu item.
**the tetrahedron** *(NESI's own development-protocol sense)* — four agents with opposed jobs (Grounder holds what's real · Dreamer reaches · Governor cuts · Shaper forms), six stated tensions, a separate synthesis step. NESI's meaning-compression engine for development chains.
*Source: `ARTIFACT_GRAMMAR.md`, RATIFIED 2026-07-16 (uncross entry added 2026-07-19); `NESI_SPEC_v1` §1 (earlier, unratified three-verb draft — see marks ledger for the drift arc).*

## 5 · The gate mechanism (settled, with a resolved historical fork)

Four marks exist in practice: **cross · hold · compost · uncross.** `correction` is a ledger annotation, never a mark. This supersedes `NESI_SPEC_v1`'s earlier three-verb draft (2026-07-15, never ratified) — the corpus shows the extension surfaced as a live divergence (`NESI_BIRDSEYE_2026-07-19.md`: "mark-set divergence... DIVERGENT"), was mapped in full as an open fork (`NESI_ORDERING_SURFACE_2026-07-19.md` D1: raise-the-law vs strip-to-triad, consequences of each mapped), and was resolved same day — **Kevin's mark: "keep undo, update the rules."** `uncross` ratified as the fourth Kevin-only verb; vocabulary updated in `ARTIFACT_GRAMMAR.md`, `ORGAN_CONTEXT.md`, and `core.py`'s comment; zero code changes needed (the build was already coherent with this reading).
*Sources: `NESI_BIRDSEYE_2026-07-19.md`; `NESI_ORDERING_SURFACE_2026-07-19.md`; `project_nesi.md` 2026-07-19 evening entry ("D1 resolved A"); `COLD_START.md` §5.*

Current standing: marks are now fully reversible. `core.unmark()` reverses any mark — the prior mark moves to `mark_history`, the ledger gets an `{"annotation":"unmark", ...}` line (never silent), a crossed card routes through `uncross()` first. Round-trip verified live 2026-07-19. Cross itself is **sync-loud**: write the file → rebuild the index synchronously → only then record the mark; a simulated rebuild failure rolled back cleanly in testing (2026-07-16).
*Sources: `NESI_MARK_TOGGLE_2026-07-19.md`; `project_nesi.md` 2026-07-16 evening entry ("CANON RECONCILED").*

## 6 · The organs, as built

Seven modules live natively in `nesi/conductor/` (Python, no HTTP layer, called from the tkinter window `NESI.exe`). All five with retro-specs are **marked STANDS** by Kevin (2026-07-19); reader and composer (built 2026-07-20) are unmarked — Kevin has not yet seen either run in the window.

| Organ | Problem it resolves | Form | Standing (as of latest read) |
|---|---|---|---|
| **metabolizer** (digests) | raw piles outpace Kevin's sorting | dropped pile → staged object (dispositions + evidence + `raw_text_inside`) + lint → card at gate | LIVE, loop runs end-to-end; every real run lands on the engine stub (CLI installed, not authenticated). SIGN-OFF open — first-real-read quality check can only run on the motor. |
| **interrogator** (asks) | escalation conditions + drift-awareness lived only in Kevin's head | Move A (check_drop, 7 escalation conditions, marker-matched) + Move B (proprioception over its own state) + Move C (deterministic keyword-overlap absence-check against the library, one stubbed semantic op) | Deterministic by law, no engine call anywhere — has always run real. |
| **continuity** (remembers) | Kevin was the persistence layer | ledgers → resume board on open, change-detected checkpoint, close snapshot (retention 14) | DONE in practice — real closes on disk, latest 2026-07-20T17:14. Never a store; deterministic. |
| **return circuit** (returns) | held things never came back on their own | scans hold trays for explicit machine-parseable anchor tags (`until YYYY-MM-DD` / `when file:path exists`); prose never parsed; writes nothing | Built, deterministic, truthfully idle — 0 of 23 current holds carry an anchor, so it has never fired; commissioning test is the first tagged hold. |
| **bench** (makes) | pattern → new-object work was hand-cranked in chat | `invoke(op)` socket (draft/break/refine/semantic_pull, since extended — see §7) → `land()` stages the object with `origin="made"`, no crossing-eligibility flag, ever | Internal-complete (marked 2026-07-17); production quality awaits the motor. Center identity still open — see marks ledger. |
| **front** (the conversational entrance) | daily use must stay conversation, not a dashboard | deterministic verb table: ROUTE → ASSEMBLE (through existing organ seams only) → RETURN; no brain, never marks, never answers; hard outward wall on send/publish/transmit | LIVE. Its own construction-language spec came back thin on purpose — see marks ledger (organ vs. entrance). |
| **reader** (reads) | the second read — load paths, passive voice, drift from a prior position — lived only in Kevin's head | `read(obj) -> {lines, engine, stub}`; three deterministic checks (passive voice, marks.jsonl drift lookup, load-path naming) + one socket call, always stubbed today; uncomfortable findings surface first | Built 2026-07-20, shared (not duplicated) between `bench.run_break()` and `interrogator.check_reader()`. Not yet seen live in the window. |
| **composer** (renders) | a made object had no seat where it became an artifact in NESI's own house register | `compose(obj, dsl_text=None) -> {card, infographic, doc, diagram_status}`; one renderer at two scales, one locked register (`REGISTER_CSS`); never marks, never crosses, never invents a diagram | Built 2026-07-20; wired into `bench.new_object()`/`bench.land()` same session on Kevin's go ("pipe confirmed as the default"). **Not yet in the running exe** — no rebuild/swap followed this session (see §9). |

*Sources: all five `STANDING_SPEC.md` files (`nesi/bench/<organ>/`); `NESI_RETRO_SPECS_2026-07-19.md`; `NESI_OPEN_REACH_2026-07-20.md` (S1); `NESI_BENCH_SURFACE_2026-07-20.md` (S2); `NESI_READER_SEAM_2026-07-20.md` (S3); `NESI_COMPOSER_2026-07-20.md` (S4).*

**Distinct from the above:** `bench.json` also registers 12 vendor-skill executables (substrate, daily-cycle, mark-record, coordination, graduated-trust, infrastructure, morning-pages-channel, provenance, miro-handler, transmission-engine, field-kit-engine, plus metabolizer itself). These are **mirrors-in-waiting** — copied byte-identical to `nesi/bench/` 2026-07-16, but nothing runs from there yet; the vendor copies in `~/.claude/skills/` remain live and load-bearing. Their headless/conversational stream split is explicitly **UNMARKED** (job-grammar mark M5) — a best-guess placement per executable, staged as a 12-row sheet, awaiting Kevin's per-organ read.
*Sources: `bench/BENCH_NOTE.md`; `bench/bench.json` `_meta`; `M5_PLACEMENT_SHEET_2026-07-19.md`.*

## 7 · The engine seam (settled)

One contract, named as such 2026-07-20: `engine_fn(payload: dict) -> result: dict`. Every dispatch table obeys three rules: (1) try the selected engine's registered function, (2) any exception falls back to the `stub` entry LOUDLY — the result records the fallback string, never passes stub output off as real, (3) a `stub` entry always exists and never raises. `bench.invoke(op, payload)` is this unit's canonical form (four ops became more — see §9); `core.metabolize(pile)` is the same unit with a narrower, single-purpose payload, predating the socket.
*Source: `ENGINE_SOCKET.md` §"The engine-agnostic unit," `NESI_READER_SEAM_2026-07-20.md`.*

Engine selection: `NESI_ENGINE` env override, else `claude-cli` if the binary is found, else `stub`. Registered engines: `stub` (always available) and `claude-cli` (headless `claude -p`). Everything the engine needs crosses through the call explicitly — the organ spec (`nesi/bench/metabolizer/SKILL.md`) and `nesi/mind/ORGAN_CONTEXT.md` — never the vendor's `~/.claude` store.
*Source: `ENGINE_SOCKET.md` §"The contract."*

**Engine dark by choice, not by failure.** Mark 1 (engine go-live) is deliberately HELD, per Kevin's "elevator sequence": rigging/plumb lines (laws) → rails (organs, set true all the way to the top) → **false car on a temp motor (the stub engine — a required construction phase, not debt)** → cables + motor (the engine, last) → cab/entrances (surfaces, last) → the single button (the finish test: infrastructure invisible in operation). CLI is installed (v2.1.212) but not authenticated; go-live is Kevin's one-time hand alone (`terminal in DSS content → claude → trust → /login`). The motor gates exactly two organs' final sign-off: metabolizer and bench.
*Sources: `seed_construction_language.md` §"The elevator sequence"; `COLD_START.md`; `NESI_BUILD_REPORT_2026-07-20.md` §4.*

**"There is no sign-in, ever."** Kevin's correction, 2026-07-19: NESI itself is a local `.exe` gated only by the user's own desktop — no login, no lock, no account, ever. The one-time vendor `claude /login` is the ENGINE's own plumbing behind the socket, not a NESI gate. Speak of Mark 1 as "plugging the motor in," never "signing in to NESI."
*Source: `COLD_START.md` §4; `NESI_MARK_TOGGLE_2026-07-19.md` §2.*

## 8 · Memory and the DSS relationship (settled + current standing)

NESI-side files are authority; vendor files (`~/.claude/**`) are mirrors. Mirror discipline: change NESI-side first, then the vendor mirror. `nesi/mind/` carries: `PROTOCOLS.md`, `ORGAN_CONTEXT.md` (the laws organ runs may not violate — staging only, strip-the-writer-not-the-world, never read the writer, evidence local-only, "probably absorbed" is not a disposition), `ENGINE_SOCKET.md`, `ESCALATION_CONDITIONS.md`, `ARTIFACT_GRAMMAR.md` (RATIFIED), `reflexes.md` (the below-cognition inventory), `seed_construction_language.md` (partially canon), `COLD_START.md`, `FORK_LANDING.md`, and the full memory mirror.
*Sources: `ORGAN_CONTEXT.md`; `reflexes.md` §"The mirror discipline."*

Memory migration checklist: steps 1–6 done (mind copy, CLAUDE.md pointer inversion — test-boot PASSED — bench copy, reflexes.md, ARTIFACT_GRAMMAR RATIFIED, necropsy STAGED). **Step 7 (cold-start test + vendor retirement) NOT RUN** — blocked on Mark 1 (a fresh engine given only `nesi/mind/` + one artifact must orient correctly; needs a live engine to test). Vendor copies (the format hook, the scheduled dispatcher, the skills, the CLAUDE.md pointer) remain load-bearing for everything that fires below cognition until step 7 passes.
*Sources: `project_nesi.md` 2026-07-16 entry; `reflexes.md` checklist line; `NECROPSY_2026-07-19.md`.*

**The general DSS-wrap/inherit/compost question is explicitly out of scope, unresolved** (see marks ledger) — but one concrete instance is settled: the four DSS recognition-organ PANES (drift meter, brier ledger, falsifier gate, metamorphic check) were composted from NESI's own window 2026-07-17 ("zero evidence of pane use... every live log entry came through chat-side skills"), while the underlying DSS **scripts** (`tools/recognition/*.py`) were explicitly left untouched, live, and load-bearing for chat-side skills outside NESI's exe entirely.
*Source: `project_nesi.md` 2026-07-17 "ORGAN PRUNE COMPLETE" entry; `_compost/COMPOST_NOTE_2026-07-17_organ_panes.md`.*

## 9 · What's actually live right now (current standing structure)

The chronology matters here — `NESI_BUILD_REPORT_2026-07-20.md` is a mid-arc "pre-travel close" snapshot written at the *start* of 2026-07-20, before that day's four-session arc (S1 interrogator reach-back → S2 bench production → S3 reader + engine-ready seam → S4 Composer) ran. It is not the latest state; it is cited below only for what it covers.

The **running `NESI.exe`**, as of the last recorded rebuild+swap (`NESI_EXE_SYNC_2026-07-20b.md`, session 3/3), carries: the anchor-seam hold dialog + un-mark toggle (2026-07-19) · S1's open-reach (interrogator speaks first on window-open) and broadened Move B/C · S2's bench type-tagging · S3's reader organ + preflight badge. **S4 (Composer) is built in source and wired into `bench.new_object()`/`bench.land()`, but no exe rebuild followed it** — no `NESI_EXE_SYNC` file exists for session 4, and both `bench/composer/STANDING_SPEC.md` and `NESI_COMPOSER_2026-07-20.md` state plainly: "Kevin has not yet seen it run in the window."
*Sources: `NESI_EXE_SYNC_2026-07-20.md`; `NESI_EXE_SYNC_2026-07-20b.md`; `bench/composer/STANDING_SPEC.md`; `NESI_COMPOSER_2026-07-20.md` — cross-checked by the absence of a fourth exe-sync file.*

Bench's op table grew past its original three-op sketch (draft/break/refine): it now also carries `semantic_pull` (= interrogator's Move C, one shared call), `classify` (front's routing upgrade), `read` (delegates to the reader organ), and `author_diagram` (the Composer's one engine-touching seam) — all loud stubs today except `keyword_pull`, which produces real content engine-off. The bench's own build notes name this directly: "the bench is already a shared socket serving two other organs' semantic needs... its de facto boundary is wider than 'maker' before any center is chosen."
*Source: `NESI_BENCH_SPEC_2026-07-19.md` §1; `NESI_COMPOSER_2026-07-20.md`.*

The pattern library (canon) sits at roughly 89–96 patterns depending on the read date — it is a live-growing count, not a fixed one (see marks ledger for the drift detail). Zero of the patterns on disk carry frontmatter or tags (confirmed by grep, 2026-07-20) — bench's pattern-pull runs on filename slug + H1 title + bold-thesis word overlap instead, documented as the deliberate stand-in until patterns grow real fields.
*Sources: `project_nesi.md` (count across sessions); `NESI_BENCH_SURFACE_2026-07-20.md` §"§4 marks — resolved."*

First real canon crossing sourced from the bench line: "Confession at the Call Site," crossed 2026-07-19 as a section of `patterns/extend_dont_invent_name_the_wall.md`, walked through the full membrane gate (Membrane Controller correctly rejected a first premature "proceed as marked," then accepted Kevin's specific mark).
*Source: `project_nesi.md` 2026-07-19 close entry.*

Live queue state at last read: inbox 2 files · staged objects awaiting marks (several stub drafts) · held 23 (all felt-holds, zero anchored) · felt-read queue 18, over the interrogator's threshold of 15 — Move B is, or should be, actively asking.
*Source: `continuity/state.json` (closed_at 2026-07-20T17:14:10); `NESI_BUILD_REPORT_2026-07-20.md` §7.*

## 10 · Terminal Law and escalation (settled)

Daily (conversational) mode is the default, unless one of seven conditions is true: public consequence · asks another person for capacity · body strained/depleted · desire feels urgent/proving/identity-loaded · hidden-cost smuggle suspected · commitment beyond today · prior pass returned ambiguity. If any is true, the rule routes to "the full-form deep review terminal." Extracted verbatim from `energetic_integrity_os_resynthesis.html` §Escalation Rule, adopted with Terminal Law 2026-06-28 as a constitutional constraint; NESI-side is the authority copy — if the source page and this file ever disagree, that is a drift event to surface, not silently resolve.
*Source: `ESCALATION_CONDITIONS.md`.*

Implemented as interrogator Move A: lowercase substring marker-matching, deliberately narrow ("better a check that misses quietly than one that fabricates a trip"); wired into `front.handle()` as of 2026-07-20 so it runs on every front turn, not only interrogator-routed text.
*Source: `ESCALATION_CONDITIONS.md`; `NESI_OPEN_REACH_2026-07-20.md`.*

The destination this rule routes *to* — "the full-form deep review terminal" — is named by the rule but its own build was not located anywhere in the read NESI corpus; see marks ledger.

## 11 · The construction language (partially canon)

Two axes, both Kevin's, crossed to canon 2026-07-19: **coherence** (every organ specified as a pattern — problem · forces · form · falsifier — before any code; the falsifier field is Kevin's own addition to Alexander's quad) and **sequence** (the elevator axis — plumb before load; nothing raised over un-true ground; false car before real motor; no stage carries the next without a sign-off mark). The generative rule: "use names the next organ" — friction in real operation names what raises next, never a diagram (Kevin's workbench-last law, generalized). A 9-field spec form is the standing shape every future organ fills before code.
*Source: `seed_construction_language.md` §"CANON," Lines 1–3; proven end-to-end by fully specifying a booking-membrane organ.*

The "centers enrichment" (strong center / boundary / strengthens-neighbors / the void / inner calm, imported from Alexander's *The Nature of Order*) is also canon, adopted **with a provenance flag** — explicitly not Kevin's original seed, offered as one optional second reading of the coherence axis, a cross-check rather than a second form.
*Source: `seed_construction_language.md` Line 5.*

**HELD, not canon:** Line 4 (the entrance rule — "each organ its own way in, none reached through another's door") and Line 6 (the booking-membrane organ spec itself, though it fully proved the grammar in a dry run).
*Source: `seed_construction_language.md` header; `NESI_CONSTRUCTION_LANG_2026-07-19.md` §4.*

## 12 · The fork's landing (settled, ratified 2026-07-20)

A mailbox — not a mechanism — for the felt answer to "what does the holding free Kevin to do." Google Doc "NESI — fork landing" (gift-library object #1) on the road side; on return, its content (if any) is copied verbatim into `nesi/inbox/fork_<date>.md` and treated exactly like any other inbox pile — surfaced by continuity, waiting at the gate for Kevin's mark. Hard limits: never prompt or ping for it; never paraphrase in transit; arrival never triggers ordering, building, or any engine path; the Doc is read-in only.
*Source: `FORK_LANDING.md`.*

**Governing storage rule, ratified the same day:** develop and host locally; the gift library is Google Drive/Google Docs; no ambient whole-tree sync — one named document, one deliberate crossing at a time, Kevin at the gate.
*Source: `FORK_LANDING.md` header; `NESI_BUILD_REPORT_2026-07-20.md` §8.*

Note on vocabulary: "fork" names three distinct things across the corpus — the Mark 2 vocabulary fork (uncross vs. correction, resolved §5 above), the bench CENTER fork (open, see marks ledger), and this mailbox (a felt-answer inbox, not a decision-point at all). Collapsed here only as a terminology note, not a structural claim.

## 13 · From the companion document (2026-07-20, pasted into chat — provenance unconfirmed)

A second document, "NESI — What the Machine Could Hold," was pasted directly into the session that produced this reconciliation. It was not found anywhere in the file search this pass ran, and its authorship (Kevin's own draft, another session's output, or something else) was not stated when asked. What follows is folded in with that provenance flagged plainly — it is sourced to *the pasted document itself*, not to anything verified on disk, and it is held to a lower evidentiary bar than everything in §1–12 above.

**The holding test it proposes:** a piece of infrastructure earns a place in NESI's hands only if it (1) lowers a cost Kevin actually carries, and (2) leaves the mark on Kevin's own touch — the machine may route, stage, tend, and surface, but never decide. This reads as consistent with, not additive to, the constitutional laws in §1 (staging-only, fail-closed, the felt-read gates what matters) — a restatement in holding-specific language rather than a new law.
*Source: the pasted document, §1.*

**Claimed gift patterns and mechanisms, verification result:** the document names several moves as already "in canon" — Pre-funded gift, Single undeniable ask, Regulatory aikido, Sub-threshold node, Missing-vertex naming, Crossing razor ("a gift that hasn't held you is a theory" — a variant phrasing of the door_as_stack_layer line already in this reconciliation's §2), Holding-has-a-floor. **A direct check against the 93-file `patterns/` directory (filename and full-text search) found none of these as standalone pattern files.** One partial exception: `load_test_over_elegance` is referenced as a wikilink inside the existing pattern `same_quartet_assembly_standing.md`, meaning the concept is real and in circulation even though it has no file of its own — a different, weaker status than "in canon" as the document states it. This is named as a direct discrepancy between the pasted document's claims and the searchable corpus, not resolved in either direction.

**Candidate holdings named (all explicitly unmarked in the source document):** a queue-tender/readiness router (surfaces the next thing to mark, never crosses), a cycle-close reconciler (catches log/disk drift and ages the held queue), a gift-pattern library wired into the bench (makes §2's moves callable by name from a compose call), a Return Metabolizer (re-feeds returned/held material as new feedstock — flagged in the source as engine-gated, sequenced behind engine go-live), and a Territory Listener (reads where flow is stuck and how a fix would propagate). None of these appear built anywhere in the file corpus this pass read — see the marks ledger, §E.

**The coordination seam:** the pasted document's own §5 independently names the same open question this reconciliation's marks A1 and A5 already carry — whether NESI's organs and the DSS instrument stack (falsifier gate, governor trail, Brier ledger, drift meter) are two engines or one under two names, and whether the interrogator's reach-back and the DSS gate-delta are the same check specified twice. The document does not answer this either — its own words: "This is surfaced, not answered. It's a mark, and it's yours." Two independently-arrived-at documents naming the same unresolved seam is worth noting as convergent pressure on that mark, not as a resolution of it.

---
*Reconciliation ends. Everything the sources disagree on, or state as vision without a build to match, lives in `NESI_OPEN_MARKS.md`. This file is a proposal; ratifying it — in whole or by line — is Kevin's mark.*
