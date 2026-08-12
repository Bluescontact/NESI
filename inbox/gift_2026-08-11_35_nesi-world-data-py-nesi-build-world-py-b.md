# nesi_world_data.py + nesi_build_world.py — bedrock/grain derivation and the self-contained HTML world

**What:** Pipeline: patterns/ declared lineage -> world_data.json (per-pattern hardness/mass/grounded, typed directional edges, never computed similarity), then injected into a template producing nesi/THE_WORLD.html — a no-server, no-network, self-contained rendered world.

**Source:** `tools/nesi_world_data.py ; tools/nesi_build_world.py`
**When:** 2026-08-05

**Evidence (verbatim):**
> "BEDROCK — one mass per pattern, height from hardness / GRAIN — the declared lineage graph, typed and directional ... Emitted as a 0..1 relief value and never as a count, per b6"; builder: "The output is self-contained: no server, no network, no imports. Open it."

**Capacity:** Terrain relief and directional grain derived from Kevin's own hand-written lineage — the ground-truth heightfield ingredient for the 2D net's ground, with law-2 already honoured.

**Unrouted because:** world_data.json ships to world3d/data and THE_WORLD.html; nothing in the 2D game reads either.

**Shortest routing:** Reuse world_data.json as the 2D game's ground input (hardness/mass/dip per face of the net); the injector pattern (template + /*WORLD_DATA*/ token) is directly reusable for a 2D HTML build.

**Reading:** capacity M · effort M · confidence M

---
This card orders nothing. It waits for Kevin's mark. Blank is a complete state.
