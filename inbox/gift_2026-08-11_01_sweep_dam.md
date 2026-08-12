# GIFT · sweep_dam.gd — inflow/hold-release with downstream terrain response

Brought to the gate 2026-08-11, by Kevin's own hand.
This card orders nothing. Mark it, or leave it — blank is a complete state.

**What it is** — A complete, tested script: takes an inflow value, holds or releases on a lever, recomputes downstream water level each tick, and the outflow reshapes the ground below.

**Where it came from**
> I built sweep_dam.gd and it works ... the outflow changes the ground height below it. It's a complete script but it isn't placed on the river yet — nothing in the scene instantiates it.
— Dam mechanic session · 2026-03-14

**Latent capacity** — This is nearly the whole apex-to-consequence slice already: write at the apex, water rises, hold or release at the dam, the ground below changes. Siting it turns a built script into a walkable path.

**Why it went unrouted** — Session closed with 'we'll site it next pass' and moved on. Confirmed unrouted: no sweep_dam reference in the current build index (main.gd sites River and Terrain only). Corroborated by STATE_MAP.md 2026-08-07: N-019 sweep_dam.gd BUILT_UNSITED, disposition SITE; N-005 sweep_dam.tscn "not in run_tests.py, no door, never run this week."

**Shortest routing** — Way in: instantiate sweep_dam on the existing river in main. Act: player pulls the lever. Consequence: terrain below visibly changes and persists.

**Reading** — capacity H · routing effort L · confidence H

────────────────────────────────────────

Your mark:
