# NESI REFLEXES — everything that acts below cognition
**Written:** 2026-07-16 · NESI memory-migration step 4, Kevin's mark ("keep going, step 4 now")
**What this is:** the plain-text inventory the migration doc calls "most urgent" — every mechanism that shapes or fires behavior *without a session deciding to*. Inventory and documentation only; nothing was moved, changed, or disabled in this pass. The vendor's config files are, from today, documented mirrors of this file: **if a reflex changes, change it here first, then in the vendor file.**
**The rule this file exists to enforce:** no reflex may vanish or change silently. Losing the format hook, for example, would evaporate the entire widget protocol below cognition without anyone deciding that.

---

## R1 · The format hook (LIVE — the load-bearing reflex)
- **Where:** `~/.claude/settings.json` → `hooks.UserPromptSubmit` (PowerShell command hook, status line "Widget format enforced").
- **What it does:** on every user message, injects the MANDATORY FORMAT RULE as additional context — single HTML widget per response, per-session file `_widgets/latest_<slug>.html` (never shared `latest.html` — clobber race found 2026-07-09), write-first is load-bearing, show_widget aspirational, core tokens listed, tetra menu required, no prose wrapper.
- **Why it's a reflex:** it fires below cognition, before the model reads anything. It enforces the protocol even if CLAUDE.md/PROTOCOLS.md were lost. It is currently the *second* carrier of the widget protocol (PROTOCOLS.md is the first, since the step-2 inversion).
- **Failure mode:** silent removal (settings edit, vendor update, reinstall) = protocol evaporates with no decision made. This file is the tripwire: the hook's full intent is recorded here, so a missing hook is detectable and restorable.
- **Migration state:** vendor-side. Moving it NESI-side means NESI's own boot writes/verifies the hook — that is harness work, not a copy; deferred.

## R2 · The scheduled Dispatcher (LIVE)
- **Where:** `~/.claude/scheduled-tasks/dss-dispatcher-daily/SKILL.md`; fires daily 8AM Mountain.
- **What it does:** the daily CYCLE cadence per `DISPATCHER_PROMPT.md` (see [[project_dispatcher]]); includes the GHOST-GATE reconciliation duty (gate/pending vs patterns/ each run, per [[project_canon_maturity]]).
- **Why it's a reflex:** it runs whether or not Kevin opens a session that day.
- **Failure mode:** schedule silently dropped (vendor change) = the daily metabolism stops without notice; or conversely, it keeps firing while Kevin believes the system idle.
- **Migration state:** vendor-side (item 6 of the checklist). Deferred.

## R3 · The CLAUDE.md pointer (LIVE — new reflex as of step 2)
- **Where:** `~/.claude/CLAUDE.md` (6 lines) → points at `nesi/mind/PROTOCOLS.md`.
- **What it does:** every session boots on the pointer and is instructed to read the NESI-side protocol file first, and to STOP rather than improvise if it can't be read.
- **Failure mode:** two-link chain — pointer lost (vendor) or PROTOCOLS.md unreachable (OneDrive sync, rename). The stop-don't-improvise line is the fail-closed guard. Backup: `nesi/mind/CLAUDE.md.backup_2026-07-16.md`. **Test boot still pending** as of this writing.

## R4 · The permissions allowlist (LIVE, large)
- **Where:** `DSS content/.claude/settings.local.json` → `permissions.allow` (hundreds of accumulated entries: bash patterns, WebFetch domains, tool grants).
- **What it does:** pre-approves classes of tool calls so sessions act without prompting Kevin each time.
- **Why it's a reflex:** each entry is a standing consent granted once, still firing months later. This is the *consent memory* of the system and nobody reads it.
- **Failure mode:** scope creep by accumulation — old grants for dead projects (e.g. `C:\projects\DSS content - phase transition` paths) still standing. Not dangerous today, but it is unaudited standing authority.
- **Recommended (not done):** a one-time prune pass, Kevin-marked. Deferred — flagged, not queued.

## R5 · mcp.json (EMPTY — kept as a guarded socket)
- **Where:** `~/.claude/mcp.json` → `{"mcpServers": {}}`.
- **History:** carried a live-looking bearer token for the mito MCP server; resolved 2026-07-15 on Kevin's mark (ideation drift; entry removed; token was an expired 1-hour JWT; backup kept).
- **Standing rule (constitutional, from the migration doc):** **secrets by reference, never by value.** Any future credential gets pointed at (env var, OS credential store), never pasted into config. An empty mcpServers block is the correct resting state.

## R6 · Auto-update rules (LIVE — behavioral reflexes carried in memory)
These fire because memory instructs them, not because Kevin asks each time:
- **update_state_view.py after every membrane mark sequence** ([[feedback_automate_state_view]]) — never ask Kevin manually.
- **Memory maintenance:** update MEMORY.md index + memory file the moment state changes ([[feedback_memory_maintenance]]).
- **Mind-sync (new, since step 1):** any memory-file change must be re-copied to `nesi/mind/` in the same session (the two-copies drift rule; same applies to skills vs `nesi/bench/` per `nesi/bench/BENCH_NOTE.md`).
- **GHOST-GATE reconciliation** each dispatcher run.
- **Failure mode:** these live in prose memory, not in enforced code — they are the softest reflexes in this inventory and degrade first under context pressure.

## R7 · The stale-minds hazard (RESOLVED 2026-07-21 — see NECROPSY_2026-07-19.md)
- **Ground truth as of 2026-07-21:** only one project dir remains under `~/.claude/projects/`: `C--Users-KMEAR-OneDrive-Desktop-DSS-content` (the live mind). The four originally-named stale minds were already gone by an unrecorded hand as of the 07-19 necropsy read (burial 1). The fifth, `C--Users-KMEAR-OneDrive-Desktop-DSS-content-nesi` (transcript residue, not a stale mind — six stub-fallback-era headless-run .jsonl files, no memory/), was composted 2026-07-21 (burial 2): archived to `nesi/_compost/necropsy_transcript_residue_2026-07-21/`, vendor dir removed.
- **R7 provenance (who removed the original four)** — could not be determined from any record on disk; recorded as genuinely unknown rather than guessed at.
- **Current state:** the two-minds hazard this entry originally warned about no longer exists — one project dir, one mind. Re-open this entry only if a new stale dir appears.

## R8 · Vendor-side retention (NAMED FACT, nothing built on it)
- 252+ transcript .jsonl files (~305MB) persist vendor-side under retention Kevin does not control. Recorded here because a reflex inventory should name what *cannot* be inventoried away. No burial promises possible.

---

## The mirror discipline, restated
`nesi/mind/PROTOCOLS.md` (protocol) + this file (reflexes) + `nesi/bench/` (organ prompts) are the NESI-side authorities. The vendor files that currently *execute* them (`CLAUDE.md` pointer, `settings.json` hook, `scheduled-tasks/`, `skills/`) are mirrors. Until the cold-start run (checklist step 7) passes, both sides must be kept in agreement by hand — change NESI-side first, mirror second, and re-diff `bench/` and `mind/` before any repointing.

**Checklist state after this step:** 1 mind ✓ · 2 inversion ✓ (test boot pending) · 3 bench ✓ · **4 reflexes.md ✓ (this file)** · 5 ARTIFACT_GRAMMAR.md ~~not run~~ ✓ (correction 2026-07-19, Kevin's Mark 3: the file exists at `nesi/mind/ARTIFACT_GRAMMAR.md` — this line was the stale record; discrepancy named, not smoothed) · 6 necropsy — CLOSED 2026-07-21, all 3 burials marked (`nesi/returns/NECROPSY_2026-07-19.md`) · 7 cold-start + vendor retirement — not run (blocked: engine login is Mark 1, held).
