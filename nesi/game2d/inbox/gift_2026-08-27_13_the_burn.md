# GIFT — the burn that never heals itself

- **title:** the burn that never heals itself
- **what:** a drag-aimed light-beam station where sustained targeting on one of three receivers accumulates heat, and past a threshold the receiver scorches permanently shut — the closure is written to the store the instant it happens and read back on reopen, so it survives a panel close, a scene change, or the process being killed outright.
- **source:** `nesi/world2d/scripts/heliostat_panel.gd:1-176`
- **when:** predates this session; header dates a persistence fix in this file to 2026-08-09 ("Until 2026-08-09 `scorched` and `heat` were variables on this instance... closing the station un-burnt every receiver; that was the law being broken")
- **quote:** *"HOW LONG A SCORCH LASTS: IT OUTLIVES THE PANEL AND IT OUTLIVES THE PROGRAM. A receiver burnt shut is something the world lost, and law 12 — quitting loses nothing — governs it."* And on the feedback itself: *"the aperture narrows and reddens as it takes heat — a quality, and never a bar or a number."*
- **capacity:** game2d has nothing that turns sustained player attention into an irreversible, session-surviving mark on the world — the closest things it has are reversible states (open/closed panels, edited text). This mechanic is a working pattern for a consequence that is real, permanent, and legible without a single number on screen: a qualitative decay (glow color, aperture radius) the player reads and that never resets itself. Routing it gives game2d a way to let sustained action cost something that stays cost.
- **unrouted_because:** world2d and game2d are different projects — this station was built and finished inside world2d's Godot scene tree and never crossed into the single-file HTML lattice; nothing in index.html references heat, scorch, burn, or a receiver/beam concept.
- **routing:** a way in → pick or build one lattice node/gift that can take sustained pointer-hold or repeated action → an act → accumulate a heat value in that node's persisted state while the hold continues, decaying it when it stops, per this file's `act_process` rule → a visible consequence → past a threshold, write a permanent "spent" flag to localStorage that the render checks on load and never clears, shown only as a color/shape change (never a number), so a node a player over-used stays visibly used up across reloads.
- **reading:** capacity: M · effort: M · confidence: M

---
*Ordered nothing. Waiting for a mark.*
