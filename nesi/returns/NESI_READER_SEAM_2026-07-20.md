# NESI — the reader + engine-ready seam (session 3/3, 2026-07-20)

**Build target:** build the reader (the structural second-read Kevin has never externalized), then wire the one socket so all deterministic stubs — metabolizer, bench make-ops, interrogator semantic-absence, reader — dispatch through a single authenticated call path. Engine still dark; no login, no live call, anywhere in this session.

## What shipped

- **`nesi/conductor/reader.py`** (new organ). `read(obj) -> {lines, engine, stub}`. Three deterministic checks, no engine: passive-voice regex heuristic (uncomfortable), a marks.jsonl lookup for prior verdicts on the same pile — "this pile was already marked compost, is the reason for returning to it named?" (uncomfortable), and load-path naming off the object's own `pulled` field (neutral, informational). Then one call through the socket, `bench.invoke("read", {"object": obj})` — always empty on the stub. Findings sort uncomfortable-first before returning; that ordering is a presentation law over already-tagged severities, not a judgment this organ makes.
- **Shared, not duplicated** (S2's default, reaffirmed by name this session): `bench.run_break()` now delegates to `reader.read()` instead of carrying its own falsification-notes stub — the "break" button and the reader are the same code. `interrogator.check_reader(text)` (new function) calls the same `reader.read()` on bare front-drop text, degrading gracefully (no pile, no pulled patterns → drift and load-path checks skip silently; passive-voice and the socket call still run). No second copy of this logic exists anywhere in the tree.
- **`nesi/bench/reader/STANDING_SPEC.md`** — the 9-field construction-language spec, SIGN-OFF marked "not yet seen live in the window" (honest — build-session smoke tests only).
- **The engine-agnostic unit, named** (`nesi/mind/ENGINE_SOCKET.md`, new section). Audited all five call sites (metabolizer, bench draft/break/refine, interrogator bearing_semantic, reader read). Four already share one function, `bench.invoke(op, payload)`. The metabolizer does not — it predates the socket and has its own dispatch table (`core.metabolize(pile) -> ENGINES[eng](pile)`) with the identical three-rule contract (engine registration is a pure function; selection and fallback live outside it; a stub entry always exists and never raises). **Did not merge them in code** — core.py is protected ground this session, and literally rewriting its call site is a build, not an audit. Named the shared contract instead, proposed `bench.invoke()` as canonical form, and left the question of whether to migrate metabolizer's literal call site explicitly marked for Kevin, not assumed.
- **`nesi/conductor/preflight.py`** (new, built not run-live). `check()` — structural-only verification of both sign-offs. Metabolizer check: registry shape only (`ENGINES` has `stub` + `claude-cli`, `current_engine()` callable) — never invokes `_metabolize_claude_cli`, since that IS a live subprocess call and this session is forbidden from making one. Bench check: an actual dry-run, safely — bench has no `claude-cli` entry in its own op table at all (S2's design), so forcing `NESI_ENGINE=claude-cli` through `invoke()` can only ever hit the existing try/except fallback path. Structurally impossible for it to reach a live call. Wired into `nesi_app.py`: runs once on boot, off the UI thread, renders a passive one-line badge under the engine status line — not a gate, a render; nothing blocks on it.

## Verified live, engine still dark (§4 success test, run this session)

```
preflight.check() -> {"metabolizer": ok, "bench": ok, "overall_ok": true}

bench.new_object("a departure note to Frank about leaving the property")
  -> type: note, pulled: [load_to_form, Transition After Successful Departure]
bench.run_break(o) -> break_notes via reader: ["load paths: load_to_form, ..."]
bench.land(o) -> origin=made, type=note, mark.verdict=None

interrogator.open_reach() -> the felt-read line, same as sessions 1 and 2 — still true
interrogator.check_reader("It was decided quietly that the cost would be handled later.")
  -> ["passive voice: be handled, was decided — who's doing it?"]

front.handle("write a letter to Frank about the well pump")
  -> all four sessions' work composing in one turn: type tag (S2), pattern floor (S2),
     Move B/C from S1, no duplication, no regression.
```
Smoke-test staged object removed from the live mark queue after verification, same discipline as sessions 1 and 2.

## §3 marks — left for Kevin, not resolved in code

- **The engine-agnostic unit's literal shape** — proposed default in `ENGINE_SOCKET.md`: `bench.invoke()` as canonical, metabolizer as a second conforming implementation (not migrated). Load-bearing; genuinely his to ratify.
- **Reader = one, shared** — built exactly that way this session; verified no second copy exists.
- **Out of scope, untouched, as instructed**: whether NESI wraps/inherits/composts the DSS machinery; whether the interrogator's reach-back and the DSS gate-delta are one organ. Not resolved in code, not resolved in this log.

## Kevin's first live session — named exactly, per §5

1. `terminal → claude → trust → /login`, in `DSS content`, at his own pace. This session made no attempt at it and verified nothing that requires it.
2. One real object built end-to-end through the bench — an intent in, real patterns pulled (already deterministic, unaffected by login), a REAL draft this time (not `[STUB DRAFT]`), a real reader pass (`reader.read()` now capable of returning actual findings once `bench.invoke("read", ...)` stops landing on the stub), landed. That object is the interior's own falsifier: if the shape breaks under a live engine, it breaks there first, privately, before anything else does.

Bench's own `_ENGINE_OPS` table still has no `claude-cli` entry — login alone does not make bench's stub calls go live. That's a separate, later wiring step (S2's "internal-complete before the engine" mark), not implied or started by this session's seam work.

## Touched

`nesi/conductor/reader.py` (new), `nesi/conductor/preflight.py` (new), `nesi/bench/reader/STANDING_SPEC.md` (new), `nesi/mind/ENGINE_SOCKET.md` (new section, additive), `nesi/conductor/bench.py` (one new stub op `read`; `run_break()` now delegates to reader — minimal, interface-exposing edit to protected ground), `nesi/conductor/interrogator.py` (one new function, `check_reader` — additive), `nesi/conductor/nesi_app.py` (preflight badge on boot, off the UI thread).

## Not touched

core.py's dispatch internals, metabolizer's engine table, continuity, front's routing table, return circuit, marks.jsonl, the object store, the pattern library. No engine call, no auth, no login, anywhere in this session.

## Close

State snapshot refreshed (`continuity.checkpoint` + `close_snapshot`, held 23 / felt 18 / staged 6, unchanged by this session's work). No build beyond target; no prune. This closes session 3/3 — the arc opened at "the system that couldn't sense itself" (session 1) and closes at "the only thing between NESI-built and NESI-running is Kevin's hand on `/login`."
