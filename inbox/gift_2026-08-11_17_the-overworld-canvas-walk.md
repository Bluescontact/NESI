# The overworld canvas walk

**What:** A complete, working 2D walkable-world engine in vanilla canvas JS: avatar moved with WASD/arrows or click-to-walk, places entered by proximity + Enter, encounter markers on roads, road brightness from traffic, deposit-density drawn as scattered ground, and a press-D drop form that lands verbatim text where you stand. Avatar position persists in localStorage.

**Source:** `osg_organ/templates/world.html`
**When:** ~2026-07-31

**Evidence (verbatim):**
> "Walk with the arrow keys or WASD, or click anywhere to walk there. ... Press D to make a drop where you're standing — it becomes ground. ... nothing on it was hand-placed — the world derives itself from the ledgers on every load." — `let av = JSON.parse(localStorage.getItem('nesi_avatar') || '{"x":450,"y":390}')`

**Capacity:** The entire locomotion + place-entry + drop-becomes-ground layer of a 2D game, already law-compliant (no score, world derived not stored, verbatim drops).

**Unrouted because:** Lives inside the retired Flask osg_organ; the NESI build went 3D in Godot and this 2D chassis was never carried forward.

**Shortest routing:** Lift the canvas walk loop nearly verbatim as the 2D net-traversal layer — places become net faces, roads become fold edges, D-drop becomes the intake.

**Reading:** capacity H · effort L · confidence H

---
This card orders nothing. It waits for Kevin's mark. Blank is a complete state.
