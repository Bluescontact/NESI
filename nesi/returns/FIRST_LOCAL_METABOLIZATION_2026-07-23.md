# FIRST REAL METABOLIZATION — LOCAL ENGINE — 2026-07-23

**The center lit, locally.** NESI ran its own `metabolize()` seam against a real pile through a local engine — no `/login`, no Anthropic, no cloud. Kevin's mark: "wire it + run one real pile."

## What ran
- **New file:** `nesi/conductor/engine_local.py` — the local articulation engine. stdlib-only (`urllib`), POSTs directly to Ollama (`http://localhost:11434`, `hermes3:8b`), `format:"json"` forces one JSON object. Same contract as `_articulate_claude_cli` (takes `(context, mode)`, returns articulation, raises→dark fallback). Reads the real organ spec + ORGAN_CONTEXT + pile and inlines them (local model can't read files).
- **Wiring:** registered into the REAL socket at runtime — `core._ARTICULATE_ENGINES["local"] = articulate_local`, `NESI_ENGINE=local`. `core.metabolize()` unchanged; it delegated to `articulate()` → the local engine, exactly as designed ("lighting the engine = registering one fn").
- **Pile:** `_INTAKE/sovereignty_gate_conditions_2026-06-28.md` (real gate-conditions doc).
- **Runtime:** ~4m55s (hermes3:8b, CPU-bound).

## The result (engine="local", staging-only — no canon, no mark)
5 items inventoried, each a fixed-vocabulary disposition with an evidence line: 4× `still-open`, 1× `RESTORE` (restored_count 1). Writer stripped, operational objects kept. **This is real digestion, not the stub** (the stub makes every line RESTORE with a canned evidence string; this varied dispositions and drew evidence from the content).

## Honest quality read (against the "couldn't have produced by rereading" bar)
- **The socket works — that is the win, and it is proven.** NESI has a functioning engine in its own body, no login, no cost.
- **hermes3:8b is shallow.** This first output is *faithful but coarse* — it read the section headers as items and the answers as evidence, which is close to what a reread would give. By the metabolization quality bar (from the external returns), it leans "reformatting" more than "deep digestion."
- **One factual drift:** it wrote "2023-06-28" where the source says 2026 — a small hallucination worth noting (small-model behavior).
- **Verdict:** NESI learned to swim in shallow water. The socket is the achievement; engine depth is the swappable upgrade (a larger local model, or Claude once its login bug is fixed — same socket, nothing else changes).

## Reversibility
Two new files only: `nesi/conductor/engine_local.py` + a scratchpad driver. **`core.py` and `NESI.exe` untouched** — the local engine was registered in memory at runtime. To revert: delete `engine_local.py`. NESI reverts to engine-dark.

## Open (Kevin's marks — not done)
- **Persist the socket:** add the two registration lines to `core.py` and rebuild `NESI.exe` so the window runs local by default (currently source-only, runtime-registered).
- **Stage the object:** this run showed the result but did NOT write it into `nesi/staged/` (avoided driver-vs-loop divergence) — run it through the real window to stage, or wire the loop.
- **Upgrade the engine:** bigger local model for depth, or Claude via the swappable socket when login is sorted.
- **Quality gate:** adopt the "couldn't have produced by rereading" acceptance test before trusting local output as real metabolization.
