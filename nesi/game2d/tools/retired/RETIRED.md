# RETIRED — ten instruments that describe a superseded surface

`bloom_check` · `boot_check` · `green_check` · `head_check` · `hold_check` ·
`night_check` · `reach_check` · `still_check` · `wire_check` · `pattern_lint`

They read `world.html` and `nesi.html`. Nobody walks either page. They are kept
whole, at their own site, marked here — the same convention as `world3d/RETIRED.md`:
supersession is a new mark layered on top, never a silent deletion.

**Do not run them, do not extend them, and do not cite their output as evidence
about the live build.** A green line from an instrument reading a building nobody
walks is the exact failure `scope_check` exists to catch.

## Why they moved out of `tools/`

`scope_check` named them on every run and failed. A red line that is red by
design trains a hand to read past red — which is worse than no line at all. The
move makes `scope_check` mean something again: every instrument still in
`tools/` reads the live build, and a new failure there is a real one.

## What of theirs is still held, and by what

| their claim | now held by |
|---|---|
| the world holds the writing | `daily_walk` |
| a hand finds what the world answers | `answer_check` |
| the chain crosses every wire | walked once by hand — **no instrument holds it** |

The third is a gap, and it is named in `COVERAGE.md` under *where to build next*
rather than left to be discovered by someone reading a retired file.
