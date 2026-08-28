# PREFLIGHT — a scanner for Group K, the 45 directories nothing has ever walked

Identified as the next largest unlocking task: VE24's own swarm pass (edges
7 and 22) found that Group K — Library-at-large, 45 unclaimed top-level
directories, ~140 files, canonically inventoried in
`nesi/mind/VE24_07_protocols_library.html` — has **zero instrument
coverage**. `library_lens.js` proved this exact discipline works (it's how
gifts 1–14 got found); it was just never pointed at K, because K isn't
retired-build lineage, it's everything else.

**Nothing below is authorized. This is planning only.**

## Scope

Build a sibling scanner, not a silent extension of `library_lens.js`
itself. `library_lens.js`'s own docstring is precise about what it walks —
"a fixed list of library roots" meaning retired-build lineage (world2d,
world3d, `_overnight_build`, bench, `nesi_bench_v0`, `game2d/_compost`).
Group K is a different domain in VE24's own 12-domain map (K:
Library-at-large, distinct from J: Retired builds) — conflating the two
inside one ROOTS array would blur a distinction VE24's own swarm pass just
spent real work establishing. A sibling script, `tools/k_lens.js`, reusing
`library_lens.js`'s scoring/report functions rather than duplicating them,
keeps the domains honest while sharing real code.

**Explicit exclusion, decided now rather than left to the scanner's own
heuristic:** the "external/legal/physical-world documents" cluster in K's
own census (`Anna_Berger_Storage_Demand_Letter.docx`, `Anna_Kollter_Bike_Packet.docx`,
`AHJ_Knowledge_Document.pdf`, `Elevator_AHJ_Reference_Guide.pdf`,
`S7944A_Comments_Package.pdf`, and similar) is **not corpus capacity** —
it's personal/legal material unrelated to game2d, and scoring it as a
"gift candidate" would be the wrong kind of read entirely, separate from
any privacy concern. `k_lens.js` should exclude these by pattern (file
extension `.pdf`/`.docx` outside a small allowlist, or by directory) rather
than silently score them and rely on a later session to notice and discard.

## Spec

- **Roots:** the 45 directories from `VE24_07`'s own census table, read
  directly from that file or re-listed fresh (`VE24_07` itself warns its
  census could drift — a fresh top-level `ls` should re-confirm the count
  before this scanner trusts it).
- **Extensions scanned:** start narrow, matching `library_lens.js`'s own
  discipline exactly (`.gd`, `.js`, `.py`, `.html`) rather than inventing a
  new scoring model for `.md` canon documents on day one. This will only
  catch two of K's ten named clusters honestly (the "Python build scripts"
  and "standalone HTML tools" clusters, roughly 9 + 17 files) — **named as
  a real, stated limit**, not smoothed into "scans K." The other eight
  clusters (state/ledger files, `THE_*` architecture docs, canon/seed
  documents, NESI-named artifacts, `RETURN_*` session documents, kevin-marks
  exports, reference PDFs, misc infrastructure) are almost entirely
  markdown, PDF, or data files this pass's own scoring heuristic (function
  defs, "built"/"works" language) has no real signal for — extending
  coverage to them is a second, separate decision, not bundled in here.
- **Excluded cluster:** the external/legal/physical-world documents named
  above, hard-excluded by extension/path, not merely deprioritized.
- **Output:** same report shape as `LENS_REPORT_*.md`, sited at
  `nesi/game2d/inbox/K_LENS_REPORT_<date>.md`, same "not a judge" framing
  verbatim.

## Verification

- Confirm the 45-directory count against a fresh `ls` before trusting
  `VE24_07`'s own census (its own text names this as a real risk — counts
  in this corpus have gone stale three separate times already this
  session, per the VE24 swarm pass's own cross-cutting finding).
- Confirm the excluded cluster is actually excluded by running the scanner
  and checking zero PDFs/docx from that specific list appear in the
  report, not just trusting the exclusion pattern was written correctly.
- Spot-check at least 3 of whatever candidates surface by opening the real
  file — the same discipline every gift card this session was built
  against, not trusting the heuristic's score alone.
- Run `node tools/check_all.js` after — this is a new file under
  `tools/`, not `nesi/game2d/tools/`, so it does not touch anything
  `check_all.js` currently scans, but confirming that boundary holds is
  cheap and worth doing rather than assuming it.

## Preflight manifest

- Must read before building: `nesi/mind/VE24_07_protocols_library.html`'s
  full K-census table (cited above from memory this pass; needs a fresh
  read at build time), `library_lens.js` in full (already read this
  pass, to extract shared scoring logic rather than copy-paste it stale).
- Open question for Kevin: should the shared scoring/report code actually
  be factored into a small shared module both scripts `require()`, or is
  a second near-identical file (matching the corpus's own precedent at
  `framing_check.js`/`framing_check_skills.js` — "duplicated deliberately
  rather than shared across a boundary that otherwise has no dependency")
  the more honest shape here too? Named, not decided.
- Risk/cost: **low** — this is a read-only scanner, structurally identical
  to an instrument already proven safe and useful (`library_lens.js`
  itself), with one real design decision (shared module vs. duplicate)
  and one real exclusion to implement carefully (the legal/personal
  documents cluster).
- **NOT AUTHORIZED — awaiting Kevin's mark.**
