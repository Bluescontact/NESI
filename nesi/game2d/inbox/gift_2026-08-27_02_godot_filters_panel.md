# GIFT — the fully-built filter sub-game, in a different part of the library

- **title:** THE FILTERS — the drag-and-sort panel (world2d)
- **what:** a complete, playable filter game — a tray of "motes," each one fraction of a writing-charge (suspended / dissolved / bedload), separated by hand-drag into five real destinations: three spires (chosen by the hand), the lake, or "set it down" (no destination, no confirmation, nothing drawn). Fully implemented UI, hit-testing, drawing, and state wiring.
- **source:** `nesi/world2d/scripts/filters_panel.gd` (238 lines) + `nesi/world2d/scripts/store.gd` (the tank/charge/fraction data model beneath it)
- **when:** built prior to the 2026-08-14 world2d snapshot this session read; predates yesterday's and today's game2d work entirely
- **quote:** *"THE FILTERS — the one station whose game is built... Nothing here sorts, scores, classifies or suggests. The three fractions of every charge are laid out already separated by their own physics; which one goes where is entirely the hand's, and the panel has no opinion about it."* — `filters_panel.gd:3-8`, its own header
- **capacity:** this is the single most complete existing answer, anywhere in the library, to what you asked about last turn — "the filters become their own sub game." It is more resolved than anything currently in `game2d`: a real tray, real drag mechanics, five real exits, and its own header already proves law 5, law 6, and law 10 compliance by construction, the same discipline `THE_FILTER.md` and `ORGANS.json` later re-derived independently for the HTML build. Routing it (or porting its interaction design) would give the filter arm a finished shape instead of one built from scratch.
- **unrouted_because:** it lives in `nesi/world2d` — a separate Godot project, a different engine entirely from the HTML lattice — and was never connected to `game2d` at all. Not struck, not superseded, not audited against the current build; simply never crossed the boundary between the two projects.
- **routing:** a way in → the filter arm named in yesterday's dream-pass and today's pronoun-fractions mark needs a real interaction design → an act → port this panel's exact shape (tray of motes, drag-to-exit, no labels, no confirmation on set-down) into HTML/JS rather than designing one from nothing → a visible consequence → the filter sub-game ships with a design already proven against every relevant law, not one invented under time pressure.
- **reading:** capacity: H · effort: H · confidence: H

---
*Ordered nothing. Waiting for a mark.*
