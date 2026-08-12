# Terrain derived live from the log

**What:** A working page that renders ground thickness from the mark log on every load — density bars per point, fresh deposits listed — explicitly never stored, explicitly not a score.

**Source:** `osg_organ/templates/terrain.html`
**When:** ~2026-07

**Evidence (verbatim):**
> "{{ t.total }} marks, deposited as ground — derived live from the log on every load, never stored. The points thicken where you've walked them. A landscape, not a score: it reflects, it never rates."

**Capacity:** The derive-don't-store ground-accretion mechanic: marks thicken terrain visibly without any number reaching the player.

**Unrouted because:** Bound to the Flask organ's mark log; never restated for the game's deposit triangles.

**Shortest routing:** Use as the update rule for the game's ground deposits: recompute terrain from the deposit ledger on every load, render as thickness/scatter, no stored state.

**Reading:** capacity M · effort L · confidence H

---
This card orders nothing. It waits for Kevin's mark. Blank is a complete state.
