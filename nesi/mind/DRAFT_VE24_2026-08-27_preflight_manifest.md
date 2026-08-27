# DRAFT — the VE24: 24 edge-files collapsing the library, preflight layer

Proposed 2026-08-27, on Kevin's mark: *"Lets identify and build 24 html
files across a VE. Then transfer and routes gifts, skills, tools, builds,
capacities, law, lints, lens, nutrients, maps, ect ect. We collape the
whole lobrary into those 24 html files. Each one its own fully self
contained lens and knowledge artifact."* Scoped further on his mark: *"use
the 12 domain draft, and build the scope, spec, verification, and preflight
manifest for each before authorization."*

**This document is planning only. No HTML artifact is built yet. Nothing
below is authorized until Kevin marks it — per law 30, this is handed over
unranked and whole, all 24, not a curated subset.**

---

## The geometry

A vector equilibrium (cuboctahedron) has 12 vertices, 24 edges, 8 triangular
faces, 6 square faces — every vertex touches exactly 4 edges. The 12
vertices split naturally into three sets of 4 (each set coplanar, each
vertex in a set touching zero others *in its own set* and exactly 2 in
*each* of the other two sets). Computed directly from vertex coordinates
(permutations of (±1,±1,0)), not asserted:

**Group RULE — what constrains:**
- **A · Laws** — `nesi/mind/LEARNED.md`, `LEARNED_PROVENANCE.md`
- **B · Protocols / boot-path** — `CLAUDE.md` (root), `nesi/mind/PROTOCOLS.md`
- **C · Memory / the suspension** — `MEMORY.md`, `CLAUDE.md.backup_pre-suspension_2026-08-15.md`, `MEMORY.md.backup_pre-suspension_2026-08-15.md`
- **D · Gate / ledger / marks** — `nesi/game2d/gate/`, `nesi/game2d/inbox/`, root `gate/gate.py`, `tools/ledger.py`

**Group READ — what perceives and finds:**
- **E · Lenses** — `.claude/agents/*.md` (buckminster-fuller, stuart-cowan, change-composite, game-craft, nesi), `.claude/skills/lens-panel/SKILL.md`
- **F · Skills / instruments** — `.claude/skills/*`, `nesi/bench/*/SKILL.md`
- **G · Tools / checks** — `nesi/game2d/tools/*.js`, root `tools/*.py`, `*.js`
- **H · Gift-extraction pipeline** — `unrouted-gifts`, `library_lens.js`, `full-development`, `external-extraction`

**Group BUILD — what exists physically:**
- **I · game2d live build** — `nesi/game2d/index.html`, `solid.js`, `options.html`
- **J · Retired builds** — `nesi/world2d/`, `nesi/world3d/`, `nesi/bench/geometric_bench` and siblings, `nesi/game2d/_compost/`, `_overnight_build/`
- **K · Library-at-large** — `nesi_bench_v0/`, remaining top-level directories not yet categorized above
- **L · Session-bridge format** — `FORMAT_SPEC_2026-08-25_session_bridge_html.html`, `SESSION_BRIDGE_*.html`, `CLAUDE.md`'s "THE LAST ACTION" section, `tools/session_bridge_check.js`

No edge connects two vertices in the same group — geometry excludes those
pairs (e.g. no dedicated Laws↔Protocols file; that relationship is already
carried by `CLAUDE.md` itself). This is not an omission to fix — 24 of the
66 possible pairs is the whole discipline: **only the structurally real
relationships get a file, not every combination.**

## The 24 edges

| # | Edge | Relationship |
|---|------|--------------|
| 1 | A–E | Laws ↔ Lenses |
| 2 | A–F | Laws ↔ Skills/Instruments |
| 3 | A–I | Laws ↔ game2d live build |
| 4 | A–J | Laws ↔ Retired builds |
| 5 | B–E | Protocols ↔ Lenses |
| 6 | B–F | Protocols ↔ Skills/Instruments |
| 7 | B–K | Protocols ↔ Library-at-large |
| 8 | B–L | Protocols ↔ Session-bridge format |
| 9 | C–G | Memory/Suspension ↔ Tools/Checks |
| 10 | C–H | Memory/Suspension ↔ Gift-pipeline |
| 11 | C–I | Memory/Suspension ↔ game2d live build |
| 12 | C–J | Memory/Suspension ↔ Retired builds |
| 13 | D–G | Gate/Ledger ↔ Tools/Checks |
| 14 | D–H | Gate/Ledger ↔ Gift-pipeline |
| 15 | D–K | Gate/Ledger ↔ Library-at-large |
| 16 | D–L | Gate/Ledger ↔ Session-bridge format |
| 17 | E–I | Lenses ↔ game2d live build |
| 18 | E–K | Lenses ↔ Library-at-large |
| 19 | F–J | Skills/Instruments ↔ Retired builds |
| 20 | F–L | Skills/Instruments ↔ Session-bridge format |
| 21 | G–I | Tools/Checks ↔ game2d live build |
| 22 | G–K | Tools/Checks ↔ Library-at-large |
| 23 | H–J | Gift-pipeline ↔ Retired builds |
| 24 | H–L | Gift-pipeline ↔ Session-bridge format |

## The common spec (applies to all 24, stated once)

- **Format:** single self-contained HTML file, no network/CDN, theme-aware
  (light/dark via `prefers-color-scheme`), built to the same shell/tab
  mechanics as `FORMAT_SPEC_2026-08-25_session_bridge_html.html` — sidebar +
  tabbed panels, provenance-tagged claims (`verbatim` / `marked` /
  `inherited` / `instrument fact` / `session-derived` / `state`).
- **Minimum tabs per edge-file:** Overview (what this edge is, why these
  two domains are adjacent on the VE), the two domains' own current state
  (one tab each, cited to real files), the actual relationship/interface
  between them (what's live vs. spec'd vs. missing), and Sources.
- **Naming:** `nesi/mind/VE24_<##>_<domainA>_<domainB>.html`, numbered 1–24
  per the table above.
- **Verify, per law 30 amendment to `full-development`:** every edge-file
  goes through the full audit → ground → converge → **verify** pipeline
  before being called built. Given this session's own 2-for-2 regression
  rate on two much smaller drafts, no edge-file skips stage 9 regardless of
  how small it looks.

---

## Cross-cutting findings — before any single edge, read this

Four parallel agents grounded all 24 edges against real files rather than
inventing content. Several findings recur across batches and matter more
than any one edge:

- **`nesi_bench_v0/` is not where the DRAFT table above says it is.** It
  does not exist at repo-root top level; it exists at `nesi/nesi_bench_v0/`
  (confirmed, 50 files, including its own `gate.py`, `ledger.py`,
  `STANDING.md`). The domain-K row in this document's own table needs its
  path corrected before any K-touching edge is built (edges 7, 15, 18, 22).
- **"Twelve instruments" (root `CLAUDE.md`'s own phrase) does not match
  `check_all.js`'s actual current instrument count**, which multiple
  batches independently found runs closer to 15-17 named entries. Not yet
  reconciled — is `CLAUDE.md` stale, or does "twelve" mean a specific
  hold/refuse subset distinct from the full list? Open across edges 3, 6,
  9, 13, 21.
- **There are at least three distinct systems using the name "gate" and/or
  "ledger"** in this corpus: `nesi/game2d/gate/` (gate.mjs, LEDGER.jsonl,
  MARKS.jsonl — confirmed live, wired into `check_all.js`), root
  `gate/gate.py` (a different codebase, "stages and displays, never
  closes"), and `nesi/nesi_bench_v0/gate.py` + `ledger.py` (unread this
  pass, disposition unconfirmed). Edges 13-16 cover only the first;
  building any of them without naming the other two risks a reader
  conflating three separate systems that happen to share a word.
- **Whether the "six parallel judges" that produced gift cards 9-14 (this
  session's own Action 1 pass) were literally the five standing lens agents
  is unconfirmed.** `INDEX.md`'s own text says "six parallel judges," never
  names `lens-panel` or the five lenses by name. Edge 18 (Lenses ↔
  Library-at-large) cannot honestly claim a Lenses↔Library relationship
  until this is resolved — it is currently the single weakest-grounded edge
  of the 24.
- **`unrouted-gifts` has no `SKILL.md` file anywhere in this repo** —
  confirmed by direct search across both skill directories. It's presumably
  a plugin/anthropic-skills built-in, not a repo file. Any edge citing "the
  unrouted-gifts skill" as a corpus artifact (14, 23) should say this
  plainly rather than imply a file that doesn't exist locally.
- **A likely numbering collision**: `nesi.md` cites a "Law 4" attributed to
  `kevin-lens.md`'s own citation grammar ("no summarizing, paraphrasing...
  verbatim only") — this is a *different* law 4 from `LEARNED.md`'s actual
  law 4 ("a blank screen passes every refusal test"). Two separate
  numbering systems share the digit 4. Edge 1 (Laws ↔ Lenses) surfaced
  this; it needs resolving, not smoothing over, before that edge is built.
- **Three edges (9, 10, 12) directly touch the suspension domain** by
  definition (Group C is the suspension). Each batch flagged the same
  question independently: is read-only *characterization* of what's
  currently suspended — quoting its own stated shape, never arguing for or
  against it — within the suspension's escape clause, or does even that
  need its own explicit go-ahead before drafting starts? This wasn't
  resolved by any of the four agents (correctly — it isn't theirs to
  resolve) and needs your answer before edges 9, 10, or 12 are built,
  regardless of what happens with the other 21.
- **Every one of the 24 preflight entries below ends "NOT AUTHORIZED —
  awaiting Kevin's mark."** No agent treated grounding-the-scope as
  authorization-to-build, consistent with this document's own opening line.

---

## Edge 1: Laws ↔ Lenses (A–E)

### SCOPE

Real relationship confirmed by direct read: `nesi/mind/LEARNED.md` (30 numbered laws, `nesi/mind/LEARNED.md:22-206`) is read at boot by at least two of the five lens agents opened directly — `.claude/agents/nesi.md:15` ("Read `nesi/mind/LEARNED.md` at boot; where it and your habits collide, it wins.") and `.claude/agents/game-craft.md:9` (identical sentence). `buckminster-fuller.md`, `stuart-cowan.md`, `change-composite.md` not opened in full this pass — **unconfirmed whether all five carry the identical boot line.**

`nesi.md:26-31` cites a "Law 4" ("No summarizing, paraphrasing, generated prose, or inferred categories… Verbatim only") attributed to `.claude/agents/kevin-lens.md`'s "citation grammar," **not** to `LEARNED.md`'s law 4 ("A blank screen passes every refusal test") — two separate numbering systems sharing the digit 4, a real collision the artifact must resolve, not gloss over.

**Boundaries:** does not cover laws↔skills (edge 2), laws↔game2d build (edge 3), or laws↔retired builds (edge 4).

### SPEC

Tabs: Overview · A: Laws · E: Lenses · Relationship/Interface · Sources.

Anchors: (1) `nesi.md:15`/`game-craft.md:9`'s shared boot-read sentence; (2) the Law-4 collision above; (3) `lens-panel/SKILL.md:56` invoking law 17 ("divergence is held, never averaged") by number and text as its own operating rule; (4) all five agents share "never scores Kevin; never defaults his forks" in frontmatter, but the two read directly don't cite specific law numbers for it.

### VERIFICATION

1. Confirm all five agents' boot-read behavior (only 2/5 confirmed). 2. Resolve the Law-4 collision — is kevin-lens's numbering still citable given the seat is CLOSED? 3. Confirm any law-number citation in an agent file matches current `LEARNED.md` numbering (now through law 30). 4. Confirm read-only tool grants across all five (2/5 confirmed).

### PREFLIGHT MANIFEST

Must read: `buckminster-fuller.md`, `stuart-cowan.md`, `change-composite.md`, `kevin-lens.md` in full. Open question for Kevin: is kevin-lens's own numbering still citable material, or history-only? Risk/cost: low-medium. **NOT AUTHORIZED — awaiting Kevin's mark.**

---

## Edge 2: Laws ↔ Skills/Instruments (A–F)

### SCOPE

Confirmed: `boundary-audit/SKILL.md:3` — "Born from `nesi/mind/LEARNED.md` laws 11, 22, and 24." `authority-check/SKILL.md:3` — "Born from... laws 20 and 25." At least 5 of 14 `.claude/skills/*` form a named cluster from `DRAFT_SIX_SHAPES_2026-08-20.md` (unread this pass). 9 of 14 `.claude/skills/*` and all 11 `nesi/bench/*/SKILL.md` unread — citations unconfirmed.

A discrepancy: `authority-check/SKILL.md:101` says the six-shapes cluster derives "from the same read of LEARNED.md's 25 laws" — but LEARNED.md now runs through law 30. Stale count or a specific subset — unresolved.

**Boundaries:** does not cover skills↔lenses (edge 1) or the `nesi/bench/*` skill set's own relationship to `.claude/skills/*` (undocumented anywhere found).

### SPEC

Tabs: Overview · A: Laws · F: Skills/Instruments (split: `.claude/skills/*` [14] vs `nesi/bench/*/SKILL.md` [11]) · Relationship/Interface · Sources.

Anchors: the two verbatim citations above; the "25 vs 30 laws" discrepancy, named not resolved.

### VERIFICATION

1. Check `DRAFT_SIX_SHAPES_2026-08-20.md`'s actual date/content against the "25 laws" claim. 2. Grep remaining 9+11 skill files for law citations. 3. Confirm whether skills "operationalize" laws into procedure, or merely restate them.

### PREFLIGHT MANIFEST

Must read: all 14 `.claude/skills/*` (9 unread), all 11 `nesi/bench/*/SKILL.md` (0 read), `DRAFT_SIX_SHAPES_2026-08-20.md`. Open question: is `nesi/bench/*` live or a parallel/older instrument set relative to `.claude/skills/*`? Risk/cost: medium. **NOT AUTHORIZED — awaiting Kevin's mark.**

---

## Edge 3: Laws ↔ game2d live build (A–I)

### SCOPE

Confirmed by grep of `index.html` (2101 lines) and read of `solid.js`: both cite LEARNED.md laws inline as code comments — law 8 (`index.html:381`), law 20 (`:579`), law 27 (`:1043`), law 6 (`:1049`), "law 3/11" (`:1459`), law 8 again (`:1668`). `solid.js:34`: "NO NUMBER IN HERE REACHES THE PLAYER... Law 2 governs anything drawn from it" — but law 2 in `LEARNED.md` is "verification needs a stranger," while the comment's context reads closer to law 5 (perception over measurement). **Possible mismatch, needs resolving, not smoothing.**

**Boundaries:** does not cover laws↔tools/checks generally (edges 13, 21) — only citations embedded in the build's own source.

### SPEC

Tabs: Overview · A: Laws · I: game2d live build (index.html/solid.js/options.html, line counts) · Relationship/Interface (a table of confirmed law#→file:line citations) · Sources.

Anchors: the six confirmed citations above; the law-2/law-5 possible mismatch in solid.js:34; law 27's citation at index.html:1043 (the same law CLAUDE.md's own FRAMING section draws from — a cross-domain thread, not pursued here).

### VERIFICATION

1. Re-check solid.js:34's "law 2" against LEARNED.md's actual law 2 text. 2. Verify index.html:1459's "law 3/11" double-citation — neither number obviously matches "refuses any network primitive" at first read. 3. options.html (666 lines) was never opened this pass — any claim about it is unconfirmed.

### PREFLIGHT MANIFEST

Must read: `options.html` in full, `index.html` in full (only grepped), `solid.js` in full (only partially read). Open question: does the live build's law numbering match current LEARNED.md, or reference an earlier version? Risk/cost: medium-high. **NOT AUTHORIZED — awaiting Kevin's mark.**

---

## Edge 4: Laws ↔ Retired builds (A–J)

### SCOPE

Confirmed: `nesi/world3d/RETIRED.md:36` — "The learnings are lifted to `nesi/mind/LEARNED.md`. They are engine-agnostic and they outlive the tree." Names one specific lesson (`RETIRED.md:41-47`, the walk.gd landing-fix incident) that maps closely to law 23, though not cited by number in RETIRED.md itself — a textual match, not a cross-reference.

`nesi/world3d/CLAUDE.md` carries its own pre-LEARNED.md "six refusals," a separate, earlier constraint system — not the same laws under an old name.

**World2d's retirement status is unconfirmed by any document found** — only inferable from its absence from root `CLAUDE.md`'s "live build" designation. `nesi/bench/geometric_bench/STANDING_NOTE.md` unread — status unconfirmed.

### SPEC

Tabs: Overview · A: Laws · J: Retired builds (world3d/world2d/bench/geometric_bench/game2d-_compost/_overnight_build — status confirmed vs. unconfirmed per tree) · Relationship/Interface · Sources.

Anchors: the two RETIRED.md quotes above, side by side rather than asserted as identical; world2d's unconfirmed status stated plainly.

### VERIFICATION

1. Search for any document (LEARNED_PROVENANCE.md, unread) that makes the law-23/walk.gd citation explicit. 2. Search for a world2d retirement declaration — none found this pass. 3. Read STANDING_NOTE.md for geometric_bench's actual status.

### PREFLIGHT MANIFEST

Must read: `LEARNED_PROVENANCE.md` (likely the primary source for this edge, unread), world2d docs/scripts for a retirement declaration, `STANDING_NOTE.md`. Open question: is `nesi/world2d/` actually retired? No document confirms it. Risk/cost: medium. **NOT AUTHORIZED — awaiting Kevin's mark.**

---

## Edge 5: Protocols ↔ Lenses (B–E)

### SCOPE

`PROTOCOLS.md` (824 lines, read in full) mentions none of the five lens agents by name anywhere **except** the "COUNSEL'S STANDING BUILD MANDATE" section (`:309-427`), which names buckminster-fuller/stuart-cowan/game-craft/kevin-lens, later amended to add change-composite and seat nesi explicitly **outside** the DECIDE-bar class: "she cannot default a fork because she cannot author a sentence" (`:330-331`).

**Boundaries:** does not cover LEARNED.md↔lenses (edge 1, done) or protocols↔skills (edge 6).

### SPEC

Tabs: Overview · B: Protocols (Counsel Mandate section) · E: Lenses (DECIDE-bar class) · Relationship/Interface · Sources.

Anchors: `PROTOCOLS.md:317` and `:330-333` verbatim (quoted above); the AMENDMENT section (`:381-427`) narrowing this to one historical build scope.

### VERIFICATION

1. Re-grep the full 824-line file for each of the five agent names (negative claim, worth a second pass). 2. Confirm the "never defaults his forks" phrase is still live in each of the four DECIDE-bar agents' own files — only 2/4 opened. 3. Confirm whether the Counsel Mandate is still binding or superseded.

### PREFLIGHT MANIFEST

Must read: the three unopened DECIDE-bar agent files, `kevin-lens.md` in full. Open question: is the 2026-08-11 Counsel Mandate still active given how much has changed since? Risk/cost: low. **NOT AUTHORIZED — awaiting Kevin's mark.**

---

## Edge 6: Protocols ↔ Skills/Instruments (B–F)

### SCOPE

`PROTOCOLS.md:503`: "Skill-declared manifests: when a skill file carries a `manifest: {do, touches, size}` block... `membrane-controller` carries the first instance; not yet retrofitted to the other twelve skills." None of the 4 skill files opened this pass carry a `manifest:` frontmatter block, consistent with the claim — but `membrane-controller/SKILL.md` itself was never opened, so the **positive** claim is unconfirmed.

Count discrepancy: PROTOCOLS.md's "other twelve" implies 13 total at time of writing; the corpus now has 14 `.claude/skills/*` files — stale count or narrower original scope, unresolved.

### SPEC

Tabs: Overview · B: Protocols (pre-flight manifest system, `:445-503`) · F: Skills/Instruments (manifest-frontmatter question) · Relationship/Interface · Sources.

Anchors: `PROTOCOLS.md:503` verbatim; the 4-of-14 confirmed-absent finding; the twelve-vs-fourteen count discrepancy; the heavy-operations rescoping (`:466-484`, 2026-08-18 mark) that frames why only one skill bothered to pre-declare.

### VERIFICATION

1. Open `membrane-controller/SKILL.md` directly — the single most important unread file for this edge. 2. Check dates/git history on whether 2 skills were added after the "twelve" line was written. 3. Grep remaining 9+11 unread skill files for `manifest:`.

### PREFLIGHT MANIFEST

Must read: `membrane-controller/SKILL.md` (load-bearing, unread), remaining 9 `.claude/skills/*`, `PROTOCOLS_PROVENANCE.md`. Open question: was "twelve" accurate when written, and has it gone stale? Risk/cost: low. **NOT AUTHORIZED — awaiting Kevin's mark.**

---

## Edge 7: Protocols ↔ Library-at-large (B–K)

### SCOPE

`PROTOCOLS.md:3`: "The brief governs NESI work specifically; a session on the library, the letters, or the instruments is bound by this file, not by the station laws." The only explicit jurisdiction claim — an assertion, not a mechanism. Library-at-large is large: ~40 top-level DSS-root directories unclaimed by any other domain (full list in the batch-2 agent report). `nesi_bench_v0/` is at `nesi/nesi_bench_v0/`, not DSS-root — a path correction carried into the cross-cutting findings above.

`library_lens.js` only walks six named roots (`world2d`, `world3d`, `_overnight_build`, `bench`, `nesi_bench_v0`, `game2d/_compost`) — none of the ~40 DSS-root directories. The one active library-scanning instrument has a scope that excludes almost all of Group K as currently enumerated.

### SPEC

Tabs: Overview · B: Protocols (jurisdiction clause) · K: Library-at-large (directory census, path correction) · Relationship/Interface · Sources.

Anchors: `PROTOCOLS.md:3` verbatim; `library_lens.js`'s six-root list (`:53-60`); `nesi/nesi_bench_v0/STANDING.md`'s existence (33,767 bytes, unread for content).

### VERIFICATION

1. Re-transcribe `PROTOCOLS.md:3` exactly. 2. Re-run a fresh `ls` of DSS-root at build time (directories churn). 3. Confirm library_lens.js's root list is quoted, not paraphrased into something broader.

### PREFLIGHT MANIFEST

Must read: `PROTOCOLS.md` full, root `CLAUDE.md` full, `library_lens.js` full, fresh top-level `ls`, `nesi_bench_v0/STANDING.md`. Open question: does the ~40-directory census belong in this edge alone, or is it duplicated across the four other K-touching edges (7, 15, 18, 22) unless one is designated canonical? Risk/cost: medium. **NOT AUTHORIZED — awaiting Kevin's mark.**

---

## Edge 8: Protocols ↔ Session-bridge format (B–L)

### SCOPE

The most concrete, most currently-live relationship in this document. Root `CLAUDE.md`'s "THE LAST ACTION OF EVERY SESSION" (added today) requires every session to end with one `SESSION_BRIDGE_<date>_<slug>.html`, points to `FORMAT_SPEC_2026-08-25_session_bridge_html.html` as the shape spec, names `tools/session_bridge_check.js` as the checker. All three exist and were confirmed on disk; two real worked instances exist.

### SPEC

Tabs: Overview · B: Protocols (the mandate, its explicit non-membership in daily-cycle) · L: Session-bridge format (spec, instances, checker) · Relationship/Interface · Sources.

Anchors: `CLAUDE.md`'s "not a daily-cycle step... producing this file is a create action" quote; `session_bridge_check.js`'s "REPORT-ONLY, REFUSES NOTHING" header (read in full); its actual comparison mechanism (git log date vs. latest bridge filename date), verified by reading the code.

### VERIFICATION

1. Re-run `session_bridge_check.js` at verify time and confirm output matches description (state will have moved). 2. Confirm the FORMAT_SPEC's actual tab list against the real file. 3. Confirm both bridge instances conform to the spec's minimum tabs.

### PREFLIGHT MANIFEST

Must read: `CLAUDE.md:36-73`, `FORMAT_SPEC` full, `session_bridge_check.js` full (done), both bridge instances. Open question: none — entirely post-suspension, dated 2026-08-25/27. Risk/cost: low. **NOT AUTHORIZED — awaiting Kevin's mark.**

---

## Edge 9: Memory/Suspension ↔ Tools/Checks (C–G)

### SCOPE

Direct grep of `nesi/game2d/tools/*.js` and root `tools/*.py` for `MEMORY|suspens`: two hits, both false positives (sediment-transport physics sense of "suspension" in `hand_check.js` and `release_filter.js`, unrelated to governance). **Grounded finding: no instrument in either tools directory currently reads, checks, or enforces the suspension state.** The suspension is a prose convention only, sourced to `MARKS_LOG.jsonl` timestamps, not a filesystem-fact check comparable to `session_bridge_check.js` or `refusal_check.js`.

### SPEC

Tabs: Overview · C: Memory/Suspension · G: Tools/Checks (the grep result, the check_all.js instrument roster) · Relationship/Interface (the gap, named as navigation data per law 27) · Sources.

Anchors: the grep result itself (two false positives, zero true hits); `session_bridge_check.js` as proof this corpus can build this kind of check when it chooses to.

### VERIFICATION

1. Re-run the grep — tool files may have been added since. 2. Read the two false-positive hits' surrounding context directly to confirm the sediment-physics reading. 3. Broaden the grep beyond the two named trees. 4. Re-verify the "twelve instruments" count (see cross-cutting findings).

### PREFLIGHT MANIFEST

Must read: `hand_check.js` and `release_filter.js` at the cited lines, root `CLAUDE.md`, vendor `MEMORY.md`. **Open question for Kevin — touches the suspension directly:** confirm that read-only characterization of the suspension's current shape (what's suspended, since when) is within the escape clause's "read as history" allowance, and that the built edge-file should stay strictly descriptive, never argue why the suspension holds or should change. Risk/cost: low-medium. **NOT AUTHORIZED — awaiting Kevin's mark, and awaiting this specific framing confirmation before drafting begins.**

---

## Edge 10: Memory/Suspension ↔ Gift-pipeline (C–H)

### SCOPE

`library_lens.js:61`: `CODE_EXTS = new Set([".gd", ".js", ".py", ".html"])` — structurally excludes `.md` files, so `MEMORY.md` can never appear as a scored candidate. The unrouted-gifts skill's own gift definition ("a concrete thing that was built... not currently routed into a walkable path") is scoped to runnable code, not governance documents. **Grounded finding: the gift pipeline and the suspension structurally cannot currently meet.**

### SPEC

Tabs: Overview · C: Memory/Suspension · H: Gift-pipeline (scope rules, CODE_EXTS filter, INDEX.md census) · Relationship/Interface (the extension-filter gap, as navigation data, not a recommendation to extend it) · Sources.

Anchors: `CODE_EXTS` line verbatim; the gift-definition quote; INDEX.md's 14 cards, all code, none memory-related.

### VERIFICATION

1. Re-grep `CODE_EXTS` at verify time. 2. Re-read INDEX.md fresh — card content is live and mutable. 3. `full-development` and `external-extraction` skills' silence on memory/suspension is **unconfirmed, needs direct read**, not asserted.

### PREFLIGHT MANIFEST

Must read: `full-development/SKILL.md` and `external-extraction/SKILL.md` (both unread — required), `library_lens.js` full (done), `INDEX.md` full (done). **Open question for Kevin — touches the suspension directly:** does documenting the *absence* of a suspension-aware gift-pipeline read as neutral navigation data, or risk implying "someone should extend CODE_EXTS"? The edge-file must stay in "this is what's true" territory only. Risk/cost: medium. **NOT AUTHORIZED — awaiting Kevin's mark, and awaiting this framing confirmation.**

---

## Edge 11: Memory/Suspension ↔ game2d live build (C–I)

### SCOPE

Grep of `index.html` (118KB): zero matches for `MEMORY|suspens`. The relationship is structural/successional, not citational: root `CLAUDE.md`'s SCOPE section names the suspended "decision brake"; a different, concrete mark-mechanism (`options.html` + `MARKS_LOG.jsonl`, "only Kevin's click marks") is what's actually live today. Worth documenting as **parallel structures**, not the same mechanism continuing under suspension — no source found stating one replaced the other.

### SPEC

Tabs: Overview · C: Memory/Suspension · I: game2d live build (grep-confirmed silence, the live mark surface) · Relationship/Interface (parallel-not-successor framing) · Sources.

Anchors: the zero-match grep; CLAUDE.md's SCOPE list verbatim; CLAUDE.md's WHERE THE WORK IS section verbatim; `LEDGER.jsonl`'s live/actively-written status (confirmed in git status).

### VERIFICATION

1. Re-grep index.html at verify time (actively edited, 118KB). 2. Confirm the "successor" framing isn't overclaimed — no sourced quote states causation. 3. Grep `solid.js` for suspension terms — not done this pass.

### PREFLIGHT MANIFEST

Must read: `options.html`, `LEDGER.jsonl`, `MARKS_LOG.jsonl`, `solid.js` (suspension grep not yet run). **Open question for Kevin:** is the "parallel, not successor" framing the right one, or should the edge-file stay purely descriptive with no relationship claim at all? Risk/cost: low-medium. **NOT AUTHORIZED — awaiting Kevin's mark.**

---

## Edge 12: Memory/Suspension ↔ Retired builds (C–J)

### SCOPE

The strongest, most directly-evidenced edge in this batch: a shared convention, stated near-verbatim in three places. Vendor `MEMORY.md`: "Nothing was deleted... kept whole and unaltered." Root `CLAUDE.md` on world3d: "kept whole as a record... available to quarry when Kevin names a piece of it back." `PROTOCOLS.md:20-22`: "supersession is a mark on top, never a silent erasure." Confirmed on disk: matching `.backup_<reason>_<date>.md` naming convention across both the suspension and world3d's own backup file.

### SPEC

Tabs: Overview · C: Memory/Suspension · J: Retired builds (world3d as primary example) · Relationship/Interface (the shared convention, quoted from all three sources, framed as parallel not identity) · Sources.

Anchors: the three quotes above, verbatim; the matching backup-file naming pattern as a checkable filesystem fact, not just prose.

### VERIFICATION

1. Character-for-character re-check of all three quotes. 2. Confirm world3d still exists whole at verify time. 3. Confirm the backup-naming pattern holds beyond the one pair checked. 4. Confirm the edge-file frames this as an *observed pattern* across independent decisions, not an asserted equivalence Kevin never stated.

### PREFLIGHT MANIFEST

Must read: vendor `MEMORY.md` full, CLAUDE.md SCOPE section, `PROTOCOLS.md` lines ~1-40 (done), world3d `CLAUDE.md` and backup, `game2d/_compost/ascent_2026-08-21_pre-rebuild.html` (existence-only so far). **Open question for Kevin — touches the suspension directly, quotes its own language:** confirm the Overview tab should explicitly frame this as drawing a *parallel*, not a *lift*, so it isn't mistaken for unauthorized reactivation. Risk/cost: low. **NOT AUTHORIZED — awaiting Kevin's mark, and this framing confirmation.**

---

## Edge 13: Gate/Ledger ↔ Tools/Checks (D–G)

### SCOPE

Real, live, wired: `check_all.js:152` runs the gate as one row (`["gate", "gate/gate.mjs", ...]`); its own comment says the gate's output is "relayed verbatim, never re-judged here." `gate.mjs` runs eight instruments (01-motion through 09-dispute, minus retired 04-horizon) and appends to `LEDGER.jsonl` — confirmed by reading a real tail entry. **A second, separate "gate" exists at repo root** (`gate/gate.py`, "stages and displays, never closes") — a different codebase entirely; must not be conflated with `nesi/game2d/gate/` (see cross-cutting findings).

### SPEC

Tabs: Overview · D: Gate/Ledger · G: Tools/Checks · Relationship/Interface (the check_all→gate.mjs→LEDGER chain; the two-gate disambiguation) · Sources.

Anchors: `check_all.js:152` verbatim; the comment on relayed-verbatim output; a real LEDGER.jsonl line (instrument fact); the explicit two-gate naming collision.

### VERIFICATION

1. Confirm gate.mjs is genuinely invoked, not just mentioned in a comment. 2. Trace `append()` calls to confirm LEDGER.jsonl is written by gate.mjs specifically. 3. Reconcile "eight instruments" vs. "twelve instruments" (see cross-cutting). 4. Confirm the two-gate distinction survives into the final HTML without merging.

### PREFLIGHT MANIFEST

Must read: `check_all.js` full (done), `gate.mjs` full, `lib.mjs`, all 8 files in `gate/instruments/`, `LEDGER.jsonl` tail, root `gate/gate.py` header. Open question: does root `gate/gate.py` deserve its own disambiguation note here, or does it belong to an edge not currently in this table? Risk/cost: low-medium. **NOT AUTHORIZED — awaiting Kevin's mark.**

---

## Edge 14: Gate/Ledger ↔ Gift-pipeline (D–H)

### SCOPE

**No wiring exists.** Grep for "inbox" inside `nesi/game2d/gate/` returns zero matches. `MARKS.jsonl`'s last entry (2026-08-18) predates the newest gift cards (2026-08-27) by 9 days with zero intervening admit calls. Cards 1-4's "routed" status (per INDEX.md) happened by direct code commit, not a gate `admit` call. `library_lens.js`'s own header: "NOT A JUDGE... it does not decide what belongs." This is a **spec'd/missing** relationship — the honest job is naming the gap, not inventing a pipeline that doesn't exist.

### SPEC

Tabs: Overview · D: Gate/Ledger · H: Gift-pipeline · Relationship/Interface (named plainly, e.g. "The Missing Link") · Sources.

Anchors: the zero-match grep (dated, instrument fact); MARKS.jsonl's 9-day-stale tail against the newest cards; library_lens.js's "not a judge" quote.

### VERIFICATION

1. Re-run the inbox grep — stale within days. 2. Recheck MARKS.jsonl's tail for new entries. 3. Confirm "routed" really means "committed into index.html" by spot-checking one cited source file inside index.html. 4. Confirm library_lens.js has zero write access to gate/ by grepping for `fs.writeFile` targets.

### PREFLIGHT MANIFEST

Must read: `MARKS.jsonl`, `LEDGER.jsonl` tail, `INDEX.md` full (done), `library_lens.js` full (done), 2-3 sample gift cards. Open question: does Kevin want this gap named as something to close, or documented as intentionally-sufficient prose-tracking? Risk/cost: low to build, but real risk of overclaiming a connection that doesn't exist. **NOT AUTHORIZED — awaiting Kevin's mark.**

---

## Edge 15: Gate/Ledger ↔ Library-at-large (D–K)

### SCOPE

A **third** distinct "gate"/"ledger" pair exists: `nesi/nesi_bench_v0/gate.py` and `ledger.py` — unread this pass, disposition entirely unconfirmed (live? retired? duplicative of the game2d gate?). The one confirmed D↔K link: INDEX.md records that a lens pass checked `nesi_bench_v0` against the live build and found it "DRY" — but that finding came through the gift-pipeline (H), not through the gate directly.

### SPEC

Tabs: Overview · D: Gate/Ledger · K: Library-at-large · Relationship/Interface (consider a small table enumerating every "gate"/"ledger"-named file in the repo with real path and disposition: live/unconfirmed/retired) · Sources.

Anchors: the DRY finding quote from INDEX.md; the directory listing of `nesi_bench_v0/` (13 top-level entries, 50 files, content unread); the DRAFT's own path inaccuracy (missing `nesi/` prefix), corrected.

### VERIFICATION

1. **Highest priority: read `nesi_bench_v0/gate.py` and `ledger.py` in full** before saying anything about their relationship to the game2d gate — not done this pass. 2. Spot-check the DRY finding against an actual nesi_bench_v0 file. 3. Check git log recency on that path.

### PREFLIGHT MANIFEST

Must read: `nesi_bench_v0/gate.py`, `ledger.py`, `STANDING.md`, INDEX.md cards 9-14 section (done), `git log --oneline -- nesi/nesi_bench_v0/`. Open question: is `nesi_bench_v0` really "Library-at-large" (unrouted) or should it reclassify as a Retired build (J) given its DRY finding and naming pattern? Risk/cost: medium. **NOT AUTHORIZED — awaiting Kevin's mark.**

---

## Edge 16: Gate/Ledger ↔ Session-bridge format (D–L)

### SCOPE

**No wiring.** Grep for "SESSION_BRIDGE"/"session_bridge" inside `nesi/game2d/gate/` returns nothing. `session_bridge_check.js` (root `tools/`) is fully independent — reads only `fs.readdirSync` on `nesi/mind/` and calls `git log`; never touches `LEDGER.jsonl` or `MARKS.jsonl`. **Two independent "did the session close out correctly" mechanisms exist and do not talk to each other** — the game2d gate's LEDGER (builder-jurisdiction) and session_bridge_check.js (root-level, git-date-based). Worth stating as a finding, not assumed-unified because both concern session closure.

### SPEC

Tabs: Overview · D: Gate/Ledger · L: Session-bridge format · Relationship/Interface · Sources.

Anchors: session_bridge_check.js's "REPORT-ONLY, REFUSES NOTHING" quote; CLAUDE.md's mandate line; the confirmed-empty cross-reference grep; the two existing bridge files.

### VERIFICATION

1. Re-run the cross-reference grep. 2. Confirm session_bridge_check.js is never invoked from inside check_all.js or gate.mjs (direct grep of those two files). 3. Confirm the bridge-file count is current. 4. Read past session_bridge_check.js's header to confirm its exit-code behavior matches its self-description.

### PREFLIGHT MANIFEST

Must read: CLAUDE.md's full mandate section, session_bridge_check.js full, FORMAT_SPEC (at least Overview/Structure/Provenance), both bridge instances, gate.mjs/lib.mjs (to confirm no hidden reference). Open question: should this edge only document current non-wiring, or is there an implicit ask (from the VE24 project itself) to propose how the two could connect — that would be new design, out of scope unless Kevin names it. Risk/cost: low-medium. **NOT AUTHORIZED — awaiting Kevin's mark.**

---

## Edge 17: Lenses ↔ game2d live build (E–I)

### SCOPE

Of the five lenses, only `game-craft.md` (live) and `kevin-lens.md` (closed/retired) reference game2d by grep. `game-craft.md` carries real cold-walk findings about this exact build (a TANK seat once routed to a retired file). `lens-panel/SKILL.md` is generic, not game2d-specific. The live build: `index.html` (2101 lines) was rewired 2026-08-26 to be a verbatim copy of `the_page.html` (confirmed via its own header), loading `solid.js` unmodified.

### SPEC

Tabs: Overview · E: Lenses · I: game2d live build · Relationship/Interface · Sources.

Anchors: the game-craft.md TANK-seat finding; lens-panel's "none of the five write, mark, or cross a membrane" quote; index.html's "copied here verbatim... so the two never drift" header quote; the grep confirming only game-craft/kevin-lens reference game2d.

### VERIFICATION

1. Re-run the game2d-reference grep across all five agents. 2. Diff index.html against the_page.html at verify time rather than trusting the header comment. 3. Confirm solid.js is still loaded unmodified. 4. Re-confirm kevin-lens's closed status.

### PREFLIGHT MANIFEST

Must read: `game-craft.md` full (only grepped so far), `lens-panel/SKILL.md` full (done), index.html/solid.js/options.html headers, kevin-lens.md header. Open question: should this edge also cover `the_page.html` directly, since as of 2026-08-26 it's arguably the real live-build source, though not named in the DRAFT's domain-I file list? Risk/cost: medium. **NOT AUTHORIZED — awaiting Kevin's mark.**

---

## Edge 18: Lenses ↔ Library-at-large (E–K)

### SCOPE

The weakest-grounded edge of the 24. `library_lens.js` explicitly disclaims any semantic/agent reading of its own ("No semantic reading, no guessing at intent"). INDEX.md's cards 9-14 describe "six parallel judges" that read every candidate in full — but **whether these were literally the five standing lens agents (via lens-panel) is unconfirmed**; INDEX.md never names lens-panel or the five lenses by name. This is the central open question for this edge, and it must be resolved before the edge-file can honestly claim a Lenses↔Library relationship exists at all.

### SPEC

Tabs: Overview · E: Lenses · K: Library-at-large · Relationship/Interface (titled candidly, e.g. "What Actually Connects These Two") · Sources.

Anchors: library_lens.js's "not a judge... no semantic reading" quote; INDEX.md's "six parallel judges" quote, flagged explicitly as unconfirmed-identity; the overlap between INDEX.md's six roots and this document's own K/J domain lists.

### VERIFICATION

1. **Highest priority: confirm whether "six parallel judges" were the five lens agents** (plus one extra?) or generic subagents — check session logs, commit messages, or card text for agent-type names. 2. Re-read library_lens.js's full source (not just header) to confirm no agent call was added later. 3. Grep all five lens `.md` files for "library_lens"/"LENS_REPORT."

### PREFLIGHT MANIFEST

Must read: library_lens.js full (done), LENS_REPORT_2026-08-27.md full, INDEX.md full (done), all five lens files grepped for library_lens references, ideally the session/commit history from 2026-08-27. Open question: this is the load-bearing one — without resolving judge-identity, this edge cannot honestly claim what its own title asserts. Risk/cost: medium-high — building before resolving this risks exactly the overclaim this whole task was warned against. **NOT AUTHORIZED — awaiting Kevin's mark.**

---

## Edge 19: Skills/Instruments ↔ Retired builds (F–J)

### SCOPE

`library_lens.js` is the one live mechanism connecting these two — it walks `world2d`, `world3d`, `bench`, `nesi_bench_v0`, `game2d/_compost` (plus `_overnight_build`) and produced the gift cards tracing directly to named retired-build files (e.g. gift #7 to `sorting_tarp.gd`, gift #6 to `deposit.gd:129-160`). One structural gap found: `library_lens.js`'s `CODE_EXTS` (`.gd/.js/.py/.html`) cannot see `_overnight_build/intake_copy/`'s markdown content at all — a blind spot in the one instrument bridging F and J. `unrouted-gifts` (F) has no `SKILL.md` file on disk anywhere in the repo (see cross-cutting findings).

### SPEC

Tabs: Overview · F: Skills/Instruments · J: Retired builds · Relationship/Interface · Sources.

Anchors: library_lens.js's own "not a judge" quote; the `CODE_EXTS` line and the markdown blind spot; the four gift-card source citations to specific retired-build files/lines.

### VERIFICATION

1. Re-confirm `unrouted-gifts` has no SKILL.md via a broader tree-wide search. 2. Confirm the CODE_EXTS markdown gap by checking LENS_REPORT for zero `_overnight_build` candidates. 3. Spot-check the four gift-card line-range citations against the actual files. 4. Re-confirm `nesi_bench_v0`'s existence/path (see cross-cutting).

### PREFLIGHT MANIFEST

Must read: library_lens.js full (done), INDEX.md full (done), LENS_REPORT_2026-08-27.md, the 6 surviving gift files. Open question: is `library_lens.js` itself an F (skill/instrument) object or a G (tools/checks) object — the DRAFT's own F/G boundary is fuzzy exactly at this scanner. Risk/cost: medium. **NOT AUTHORIZED — awaiting Kevin's mark.**

---

## Edge 20: Skills/Instruments ↔ Session-bridge format (F–L)

### SCOPE

Thin, real material: no skill file (by name, filename-grep only) references the session-bridge format. The one mechanical connection: `session_bridge_check.js` is itself instrument-layer, wired into the boot-path rule (a `CLAUDE.md` rule, not a skill's own logic). Root CLAUDE.md explicitly states `daily-cycle` does NOT own session-bridge production — "no new instrument is ever built inside this skill — ever" — so this edge's honest finding is **adjacency without ownership**, not a deep integration.

### SPEC

Tabs: Overview · F: Skills/Instruments · L: Session-bridge format · Relationship/Interface · Sources.

Anchors: session_bridge_check.js's header quote; CLAUDE.md's daily-cycle-exclusion quote; the confirmed absence of any skill filename-referencing the format (full-text grep across all 24 SKILL.md files not yet run — only filenames checked).

### VERIFICATION

1. Full-text (not filename-only) grep of all 24 SKILL.md files for "session bridge"/"SESSION_BRIDGE"/"FORMAT_SPEC." 2. Confirm whether session_bridge_check.js is invoked automatically anywhere, or only ever run by hand. 3. Read `nesi/bench/daily-cycle/SKILL.md` directly (only its boot-path paraphrase was read).

### PREFLIGHT MANIFEST

Must read: FORMAT_SPEC full (only partially read), both bridge instances full (only partially read), session_bridge_check.js (done), daily-cycle/SKILL.md (unread). Open question: is this edge's real content "the format spec as a skill-like artifact," or strictly "which named skills touch it" (close to none, making this one of the thinnest edges)? Risk/cost: low-medium — build short and honest rather than pad. **NOT AUTHORIZED — awaiting Kevin's mark.**

---

## Edge 21: Tools/Checks ↔ game2d live build (G–I)

### SCOPE

The most densely evidenced edge overall. `nesi/game2d/tools/*.js` (39 files) exists entirely to check `index.html`/`solid.js`/`options.html` — no daylight between G and I here. `check_all.js` runs 17 named NODE instruments plus gate.mjs as one row plus 3 in-page-only checks. Root `CLAUDE.md` itself says "twelve instruments hold or refuse; three more run in the page" — a real discrepancy against the 17 actually enumerated (see cross-cutting findings). `check_all.js`'s own header names its founding incident: a crashed instrument's error output "looked exactly like output," which is why there's "one front door."

### SPEC

Tabs: Overview · G: Tools/Checks · I: game2d live build · Relationship/Interface · Sources.

Anchors: check_all.js's founding-incident quote; the twelve-vs-seventeen discrepancy, stated not resolved; index.html's own "WIRED IN AS THE ENTRY POINT, 2026-08-26" header as evidence of active, checked iteration.

### VERIFICATION

1. Recount check_all.js's arrays exactly and reconcile against CLAUDE.md's "twelve." 2. **Actually run** `node tools/check_all.js` (this pass only read source, never executed it) before asserting current build health. 3. Confirm the in-page-only trio (answer_check, daily_walk, store_guard) has no check_all.js counterpart.

### PREFLIGHT MANIFEST

Must read: check_all.js full (done), index.html full (only first 80 lines read), solid.js full (not read — root CLAUDE.md names it "the authority for every countable claim"), options.html (unread). Open question: which count is authoritative, root CLAUDE.md's "twelve" or the live array — and should this edge-file be the place that reconciles it? Risk/cost: medium. **NOT AUTHORIZED — awaiting Kevin's mark.**

---

## Edge 22: Tools/Checks ↔ Library-at-large (G–K)

### SCOPE

Root-level `tools/*.py`/`*.js` (39 files) form a separate ecosystem from `nesi/game2d/tools/`, operating at whole-repo scope. `library_lens.js` is the one instrument bridging G-inside-game2d outward into K. **`nesi_bench_v0` — named in library_lens.js's own ROOTS array — does not exist where this session searched** (see cross-cutting: it's at `nesi/nesi_bench_v0/`, confirmed to exist there). Two possibly-duplicate instruments found by name alone: `tools/framing_check_skills.js` (root) vs. `nesi/game2d/tools/framing_check.js` — not yet compared directly.

### SPEC

Tabs: Overview · G: Tools/Checks · K: Library-at-large · Relationship/Interface · Sources.

Anchors: the library_lens.js ROOTS-array path discrepancy (now resolved per cross-cutting findings: correct path is `nesi/nesi_bench_v0/`); the framing_check naming overlap, flagged not resolved; session_bridge_check.js as evidence root `tools/` is where whole-library checks live.

### VERIFICATION

1. Confirm the corrected `nesi_bench_v0` path is used consistently. 2. Read `framing_check_skills.js` and `framing_check.js` side by side to confirm independence or drift. 3. Enumerate the repo's actual top-level directory listing to resolve what K concretely contains beyond A-J and L.

### PREFLIGHT MANIFEST

Must read: root `tools/` full listing, library_lens.js (done), `framing_check_skills.js`, `lens_usage_check.js`, `check_harness.js`, full top-level `ls`. Open question: what does "Library-at-large" concretely resolve to now that the nesi_bench_v0 path confusion is corrected — is K's definition still accurate? Risk/cost: medium-high — K was the least-defined of the 12 domains going in. **NOT AUTHORIZED — awaiting Kevin's mark.**

---

## Edge 23: Gift-pipeline ↔ Retired builds (H–J)

### SCOPE

The most concretely evidenced edge in the whole document. INDEX.md's 14 cards are overwhelmingly sourced from retired builds — cards 1-4 (world2d, routed), 5-8 (world2d/world3d/nesi_bench_v0), 9-14 (three world3d, two world2d, one game2d/_compost). INDEX.md states the mechanism plainly: "Six parallel judges each took one library root... read every remaining candidate file in full." Every surviving gift card ends with the identical closing line, confirmed verbatim in three read directly: "Ordered nothing. Waiting for a mark." — the pipeline's own discipline that cataloguing is never adoption.

### SPEC

Tabs: Overview · H: Gift-pipeline · J: Retired builds · Relationship/Interface · Sources.

Anchors: INDEX.md's own summary quote (bench/nesi_bench_v0 "DRY," six gifts survived); gift #7's source citation and routing note; the "ordered nothing" invariant across cards.

### VERIFICATION

1. Confirm gifts 9-14 (only summarized via INDEX.md, not all read directly) carry the same discipline as 5-8. 2. Verify exact line-range citations against the actual source files (existence confirmed, ranges not verified). 3. Re-confirm no unrouted-gifts SKILL.md exists via a broader search. 4. Check whether any cards have since been composted between this pass and build time — INDEX.md is live and mutable.

### PREFLIGHT MANIFEST

Must read: INDEX.md full (done), all 14 gift files (only 05-08 read in full), LENS_REPORT_2026-08-27.md (unread), the cited source files themselves (sorting_tarp.gd, deposit.gd, writing_main.gd, render.py — none read directly, only cited by the cards). Open question: should the Relationship tab summarize all 14 cards or a representative subset with a pointer to INDEX.md, given the "self-contained" spec constraint against INDEX.md's own ~100+ line length? Risk/cost: medium — richest material, but needs 10 more gift files and source spot-checks read before it's honestly grounded. **NOT AUTHORIZED — awaiting Kevin's mark.**

---

## Edge 24: Gift-pipeline ↔ Session-bridge format (H–L)

### SCOPE

The clearest H-L connection: `SESSION_BRIDGE_2026-08-27_three_actions_and_the_return.html` itself narrates a gift-pipeline run as its first substantive tab ("Gift 01 — Unrouted Gifts"). The connection runs **one direction only** — a session-bridge file documents a gift-pipeline run after the fact; nothing in library_lens.js or INDEX.md references the session-bridge format at all (confirmed by direct full read of both). The format spec's own "Standard tabs" section uses the word "Gift" for its per-output tabs — a real terminological echo of the gift-pipeline's own vocabulary, though whether that's deliberate borrowing or coincidence is unconfirmed.

### SPEC

Tabs: Overview · H: Gift-pipeline · L: Session-bridge format · Relationship/Interface (state the one-way direction plainly) · Sources.

Anchors: the bridge file's own overview-text quote about Action 1; FORMAT_SPEC's "Gift 01, Gift 02..." tab-naming quote; the confirmed absence of any session-bridge reference inside library_lens.js or INDEX.md.

### VERIFICATION

1. The "deliberate vocabulary echo" claim is session-derived pattern-matching, not a sourced fact — must be labeled as such, not asserted. 2. Read `SESSION_BRIDGE_2026-08-25_build_state_survey.html` (unread this pass) to check whether it also has a gift-pipeline tab, or whether 08-27 is the only instance — a single example is a thin base for a central claim. 3. Confirm no gift card has since been amended to reference a bridge file.

### PREFLIGHT MANIFEST

Must read: `SESSION_BRIDGE_2026-08-27...` full (only first 60 lines read, including its actual Gift 01 tab content), `SESSION_BRIDGE_2026-08-25...` full (unread), FORMAT_SPEC full (only partially read), INDEX.md (done). Open question: is the "Gift NN" naming echo intentional/load-bearing, worth asking Kevin directly, or is this edge's claim too thin until the 08-25 file is checked? Risk/cost: low-medium — the one clear example is strong, but reading the second bridge file first would settle whether it's a pattern or a coincidence. **NOT AUTHORIZED — awaiting Kevin's mark.**

---

*All 24 entries above are planning material only. Every one ends "NOT
AUTHORIZED." Three (9, 10, 12) additionally need an explicit framing
confirmation from Kevin before drafting starts, since they touch the
suspension directly. This document itself is unranked and whole per law 30
— nothing above has been curated down to a recommended subset.*


