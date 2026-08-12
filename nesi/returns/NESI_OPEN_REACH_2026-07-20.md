# NESI — interrogator reaches back on open (session 1/3, 2026-07-20)

**Build target:** the already-live interrogator speaks first when the window opens — surfaces its own state and runs any live drop against Kevin's written conditions — using only deterministic bookkeeping. No engine.

## What shipped

Three deterministic moves, wired, zero engine calls:

- **Move A — proprioception speaks first.** `interrogator.open_reach()` (new). Reads marks.jsonl-derived first-seen ages, the hold queue, and the felt-read queue; reduces to ONE plain line by default (config: `open_surface_mode`, flippable to `full_panel` for the whole `proprioception()` list). Priority order: stale-helds-no-condition first (matches the §5 example line exactly), then hold-queue movement since the last continuity close snapshot, then the standing pile/felt-read thresholds. Wired into `nesi_app.py`'s front-tab build — fires off the UI thread the moment the window opens, before Kevin has typed anything. Silence law enforced: empty lines list = nothing queued, nothing rendered.
- **Move B — failure-shape check on a live drop.** Already-built `interrogator.check_drop()` (7 escalation conditions from `ESCALATION_CONDITIONS.md`) is now wired into `front.handle()` via `_reach_lines()` so it runs on **every** front turn, not only text that routes to the interrogator organ by keyword. Only what trips is reported; no trip, no line. De-duped against the existing interrogator-organ route (`skip_drop`) so a message that explicitly asks the interrogator doesn't get the same questions twice.
- **Move C — absence against the library, deterministic floor.** New `interrogator.check_absence()`. Reuses the bench's existing keyword/title-overlap pull (`bench.keyword_pull` — patterns carry no tags, so title/thesis word-overlap IS the field match) to find patterns that bear on the drop's words and aren't named in the drop's own text. The semantic "should bear" layer is the one stubbed socket op — `bench.invoke("bearing_semantic", ...)`, added to `bench.py`'s `_stub_op`, always returns `{"patterns": []}` while the engine is dark. No second seam.

## Verified live, engine still dark

```
open_reach() -> {'mode': 'one_line',
  'lines': ['felt-read queue holds 18 (threshold 15) — movement, or accumulation?']}
```
True today: tray 23 held (< pile threshold 24, so quiet there), felt-read 18 ≥ threshold 15. Aging is quiet — all 23 helds were first-stamped 2026-07-17, three days old, under the 14-day mark.

```
check_absence("...a departure with a lot riding on it")
-> trips "Transition After Successful Departure" (transition_after_successful_departure.md), unnamed
```

`front.handle()` end to end: a drop carrying "urgent... have to prove it" through the interrogator route surfaces the condition-4 question once (not duplicated) plus Move C's unnamed-pattern lines; a drop routed to bench still gets Move C checked against it.

## Marks for Kevin (defaults set, flippable — §4)

- `nesi/interrogator/config.json`: `open_aging_days: 14`, `open_surface_mode: "one_line"` (flip to `"full_panel"` for the whole proprioception list on open instead of one line).

## Touched

`nesi/conductor/interrogator.py` (open_reach, check_absence, bench import), `nesi/conductor/bench.py` (bearing_semantic stub op), `nesi/conductor/front.py` (_reach_lines wired into handle()), `nesi/conductor/nesi_app.py` (open-reach worker on front-tab build), `nesi/interrogator/config.json` (two new marks).

## Not touched

Metabolizer, marks.jsonl writer, continuity, return circuit, core.py, the shared socket contract — all read, none modified beyond the one new stubbed op. Engine stays dark; no wiring, no call, no auth touched.

## Close

State snapshot refreshed (`continuity.checkpoint` + `close_snapshot` run this session — held 23, felt 18, inbox 2, unchanged). No build beyond target; no prune.
