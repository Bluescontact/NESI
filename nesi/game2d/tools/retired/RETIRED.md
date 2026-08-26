# RETIRED — sixteen instruments that describe a superseded surface

`bloom_check` · `boot_check` · `green_check` · `head_check` · `hold_check` ·
`night_check` · `reach_check` · `still_check` · `wire_check` · `pattern_lint`

They read `world.html` and `nesi.html`. Nobody walks either page. They are kept
whole, at their own site, marked here — the same convention as `world3d/RETIRED.md`:
supersession is a new mark layered on top, never a silent deletion.

## The second wave, 2026-08-21

`kit_check` · `constraint_lint` · `first_four` · `cut_check` ·
`conserve_stations` · `conserve_seating`

Kevin's mark: *"cut the ascent entirely.. It's too many patches in to fix..
we need to build the levels entirely from scratch based on the vision of
the game as it currently stands."* `ascent.html` was rebuilt clean the same
day — `solid.js`/`seam.js` untouched, the ROOMS/five-gesture grouping and
its twenty per-seat mechanics dropped, along with the `GESTURES`/
`CONSTRAINTS` registries, `hold()`/`draw()`/`wait()` as generic verbs, and
`FACES.json`'s eight sited-mechanic stage bodies.

These six instruments tested exactly that content — not an interface that
changed shape, but mechanics that no longer exist because the vision they
verified was superseded. Rewriting them to pass would have meant rebuilding
the patches this rebuild was ordered to cut. Retired here rather than
repointed, same reasoning the first wave used for `world.html`/`nesi.html`:
a green line reading for a mechanic nobody can walk is the exact failure
`scope_check` exists to catch.

`world_check`, `door_check`, and two of `solid_check`'s own assertions were
repointed instead, the same pass — they tested something still true
(the figure is the solid; every level is reachable), just needed to read
the new file's own interface rather than the old one's.

`kit_check`, `constraint_lint`, `first_four`, `cut_check`,
`conserve_stations`, `conserve_seating` — same wave, moved above.

## The third wave, same day: `seats.js` and `assertion_audit.py`

Both retired together — `assertion_audit.py`'s own "27 register rules" ran
entirely on what `seats.js` extracted from `ascent.html`'s old `SET` table
(`key:{ g:"reach|hold|draw|wait", ...}` per-seat stage bodies, the same
GESTURES vocabulary the second wave already retired). `seats.js` crashed
outright against the rebuilt file (`starts[starts.length-1]` undefined —
there is nothing left in `SET`'s old shape to find), and `assertion_audit.py`
crashes the same way one call downstream. Same reasoning as the second
wave: the register these 27 rules verified was a real, working model of a
mechanic system that no longer exists by design, not an interface that
shifted shape. Rebuilding a `SET`-shaped model just to keep this instrument
green would mean re-deriving the patches the rebuild was ordered to cut.

**Do not run them, do not extend them, and do not cite their output as evidence
about the live build.** A green line from an instrument reading a building nobody
walks is the exact failure `scope_check` exists to catch.

## Why they moved out of `tools/`

`scope_check` named them on every run and failed. A red line that is red by
design trains a hand to read past red — which is worse than no line at all. The
move makes `scope_check` mean something again: every instrument still in
`tools/` reads the live build, and a new failure there is a real one.

## The fourth wave, 2026-08-26: `04-horizon` — a different kind of retirement

Every wave above retired an instrument because what it tested no longer
existed — a superseded surface, dead by rebuild, not by choice. `04-horizon`
is not that. It was live, correctly built, and doing exactly its named job:
an akrasia horizon (Beeminder's own device) holding every "loosening" of the
gate's own rules for seven days, specifically so a rule change made in the
moment someone wants to bypass it can't take effect in that same moment —
its own header, verbatim: *"a law written after the event it governs did not
constrain; it ratified."*

It was blocking a real commit (the_page/index.html reclaim) on an unrelated
governance gap with a return date of 2026-08-27. Asked directly rather than
quietly patched around, the choice was named as what it actually was —
removing the check is itself the exact class of loosening the check exists
to slow down — and Kevin's mark, in his own words: *"override it, I know
what it is."* An informed, direct override of a real, working instrument, on
purpose, not a discovery that it tested nothing. Its own `run()`, `classify()`,
and CLI (`propose`/`revoke`/`apply`) are kept whole at
`tools/retired/04-horizon.mjs` — read it if a future session wants the same
mechanism back; nothing about it was wrong, only unwanted, once, by name.

## What of theirs is still held, and by what

| their claim | now held by |
|---|---|
| the world holds the writing | `daily_walk` |
| a hand finds what the world answers | `answer_check` |
| the chain crosses every wire | walked once by hand — **no instrument holds it** |

The third is a gap, and it is named in `COVERAGE.md` under *where to build next*
rather than left to be discovered by someone reading a retired file.
