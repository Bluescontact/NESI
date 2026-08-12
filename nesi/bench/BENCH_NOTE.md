# The workshop bench — mirrors in waiting
**Landed:** 2026-07-16 · NESI memory-migration step 3, Kevin's mark ("run step 3")

## What this is
Verbatim copies of the 13 organ prompts (skills) from `~/.claude/skills/`, 54 files, diff-verified byte-identical at copy time:

coordination · daily-cycle · field-kit-engine · graduated-trust · infrastructure · mark-record · membrane-controller · metabolizer · miro-handler · morning-pages-channel · provenance · substrate · transmission-engine

## What this is NOT (yet)
- **Nothing runs from here.** Sessions still load the vendor copies in `~/.claude/skills/` — those remain live and load-bearing.
- **`bench.json` does not exist.** The registry (and the rename of this directory's role to "the workshop bench") is specified in job grammar v2 (`_INTAKE/nesi_job_grammar_2026-07-15.md`), which is drafted but **unratified** — M1 awaits Kevin's mark at `_INTAKE/nesi_job_grammar_chain_2026-07-15.md`. Repointing happens only after that mark.
- Per the migration doc: after repointing, the vendor copies become the mirror and this directory becomes authoritative. Until then it is a mirror-in-waiting.

## Drift warning
From this moment the two copies can drift: a skill edited vendor-side is NOT auto-synced here. Before any repointing, re-diff and re-copy. (Same rule as nesi/mind/ vs the vendor memory dir.)

## Migration state after this step
1 mind copy — DONE (2026-07-16) · 2 CLAUDE.md inversion — DONE (2026-07-16, test boot pending) · **3 skills copy — DONE (this)** · 4 reflexes.md / hook — NOT RUN · 5 ARTIFACT_GRAMMAR.md — NOT RUN · 6 necropsy of 3 stale memory dirs — NOT RUN · 7 cold-start run + vendor retirement — NOT RUN.

---
2026-07-16 · bench.json WRITTEN (registry only, 12 entries + membrane-controller deliberately absent per grammar law). Stream placements UNMARKED pending M5. Nothing repointed — vendor skills still live. Re-diff before any repoint still applies.
