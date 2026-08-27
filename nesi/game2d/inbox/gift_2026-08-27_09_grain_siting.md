# GIFT — site it on the grain, never by hand

- **title:** site it on the grain, never by hand
- **what:** a river/dam siting algorithm that reads three facts purely off existing terrain data — the highest standing point (source), steepest-descent trace from there (course), and the narrowest cross-section along that course (the throat, where a dam goes) — with zero authored coordinates anywhere in the file.
- **source:** `nesi/world3d/.walk/_snapshot/scripts/river.gd:1-24` (header), `_site_dam()`/`_cross_width()` 160-244
- **when:** 2026-08-05, per the file's own header mark
- **quote:** *"SITE THE DAM AND THE RIVER ON THE GRAIN: the river runs where the ground already falls (valleys cut along bedding), and the dam sits where the grain makes a throat. Nothing placed by hand."* ... *"NOTHING IN THIS FILE CONTAINS A COORDINATE. Every position is read off Terrain, which reads off patterns/. If canon changes, the river moves."*
- **capacity:** game2d's lattice/solid already has real structural data (`solid.js` is named as the authority for every countable claim about the geometry). This pattern — derive a placement algorithmically from the data's own shape (highest point, steepest path, narrowest point) instead of hand-picking coordinates — is directly portable to any game2d feature that needs to site something new (a gate, a marker, a route) without an author choosing where.
- **unrouted_because:** never crossed from world3d into game2d; a different project, and the mechanic was never abstracted out of its Godot terrain-height-function form into anything game2d's lattice code could call.
- **routing:** a way in → a small module in game2d reading `solid.js`'s own vertex/edge data → an act → compute one derived siting (e.g. the sparsest region, or the point where two structural measures cross) instead of an authored coordinate → a visible consequence → a placement that changes if the underlying solid changes, and that Kevin never had to pick by eye.
- **reading:** capacity: M · effort: M · confidence: M

---
*Ordered nothing. Waiting for a mark.*
