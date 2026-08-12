---
name: project_codex_screen
description: the automated codex screen (tools/codex_index) is LIVE — use it to screen intake against canon instead of hand-reading 35 pattern files
metadata: 
  node_type: memory
  type: project
  originSessionId: f3db418c-2224-49e4-a735-720e59b1e198
---

`tools/codex_index/` — the EMBED→MATCH leg of the github pipeline (`_INTAKE/github_pipeline_map_2026-06-21.md`), built earlier and **thrown live 2026-06-23**. chromadb + sentence-transformers (`all-MiniLM-L6-v2`), CPU-only, offline, zero cost. The trio (sentence-transformers/chromadb/watchdog) is already pip-installed in the hermes venv python (3.11).

Pieces: `build_index.py` (embed all `patterns/*.md` → `db/`), `query.py` (score one item → FOLD<0.25 / HOLD<0.50 / PASS, cosine), `screen_intake.py` (batch → writes `_INTAKE/CODEX_SCREEN.md`), `watch.py`+`watch.bat` (DROP node — `watchdog` auto-screens every new non-`_` `.md` in `_INTAKE/`, model stays warm, logs to `tools/codex_index/watch_log.md`; `--test` self-test passes), `grounder.py` (structured triage, needs ollama+Hermes3 running). **`run.bat` refreshes the index and screens all intake in one tap.** Note: console prints reconfigured to utf-8 (Windows cp1252 can't encode the arrow).

**USE IT:** before hand-reading the library to place a new candidate, run the screen — it does the mechanical proximity work and surfaces only the decidable items, keeping Kevin at the mark ([[feedback_felt_read_horizon]]). Index is a snapshot — re-run `build_index.py` after `patterns/` changes (currently 35 patterns incl `legal_as_floor`). First batch (2026-06-23): 41 candidates → 3 fold / 29 hold / 9 pass.

The recurring lesson it embodies ([[feedback_no_cost_shifting]]): the tools are built and half-wired; the friction is the unthrown switch, not missing capability. **Full pipeline wired 2026-06-23:** DROP node (`watch.py`) + Dispatcher integration — `DISPATCHER_PROMPT.md` now has a "Codex pre-screen layer" (mirrors the Hermes pre-triage convention): the daily pass reads `CODEX_SCREEN.md`/`watch_log.md` for the mechanical proximity cut instead of hand-scanning 35 patterns, spends depth only on the HOLD band, and the brief carries a `Codex:` line (nearest·distance·verdict). The pre-screen is a pre-filter not a judge — a coarse PASS can still fold on an axis the agent's depth catches (Kevin still the only gate). Further-out switches (github map): template-assembled brief (PMG direction), Telegram mark-buttons.
