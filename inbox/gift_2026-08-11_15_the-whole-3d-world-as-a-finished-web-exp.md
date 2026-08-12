# THE WHOLE 3D WORLD AS A FINISHED WEB EXPORT

**What:** A complete, runnable browser export of the 3D world — index.html, 39.5 MB wasm, 0.97 MB pck, audio worklets, plus the five data stores (stations/stones/stores/terrain_layout/waters .json) already exported beside it.

**Source:** `nesi/world3d/export/web/`
**When:** current (refreshed by export_stores.py)

**Evidence (verbatim):**
> index.html · index.wasm (39,513,091 bytes) · index.pck (970,252 bytes) · stations.json · stones.json · stores.json · terrain_layout.json · waters.json

**Capacity:** The literal '3D environments within it' ingredient at zero build cost: a door on the 2D net that leads into the full walkable tetra world.

**Unrouted because:** Nothing in the 2D game links to or embeds this export; it stands as its own front door.

**Shortest routing:** One door on the 2D net -> opens export/web/index.html (iframe or navigation) -> the player walks the 3D world and closes it to return to the net.

**Reading:** capacity H · effort L · confidence H

---
This card orders nothing. It waits for Kevin's mark. Blank is a complete state.
