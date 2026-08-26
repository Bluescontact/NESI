# RETIRED — this directory is a frozen fork of `../gate/`

**Superseded 2026-08-25, on the mark "build all three."** During a reconciliation
pass on gate enforcement, `.gate_control/` turned up as a byte-identical copy of
`gate/lib.mjs` and the same `admit.mjs`/`gate.mjs` shape, last touched
2026-08-17 while `gate/` kept evolving (its own `LEDGER.jsonl` and instruments
were still changing as late as 2026-08-24). Nothing anywhere marked which of the
two was live.

**`gate/` is the live gate.** It is the one wired into `tools/check_all.js`'s
GATE row, the one `check_all` actually executes, and the one whose `LEDGER.jsonl`
keeps growing. This directory's `LEDGER.jsonl`, `MARKS.jsonl`, `COMPOST.jsonl`
and `STANDING.json` are a snapshot of gate state as of 2026-08-17 and record
nothing since.

Same convention as `tools/retired/RETIRED.md` and `nesi/world3d/`: supersession
is a mark layered on top, never a silent deletion. Nothing here was moved or
edited to produce this notice.

**Do not run `.gate_control/gate.mjs`, do not point a tool at this directory's
ledgers, and do not cite anything in here as current gate state.** If a script
or a session ever does reference this path going forward, that is itself the
"informal side door" this notice exists to close — treat it as a live finding,
not as this directory being reactivated.
