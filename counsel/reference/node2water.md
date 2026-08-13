# NODE 2 — WATER
## The second vertex of the four-faced game development skill
*Distilled from building and walking Dam & Valley (2D, from-scratch JS). August 2026.*

---

## What water is in a game

Gravity gives one body a future; water gives ten thousand bodies a *shared* future. The player never commands water — they command the shape of the world, and water answers. Every water mechanic worth building reduces to that inversion: **the player edits constraints, the fluid finds the consequence.** Open a gate, dig a channel, raise a wall — then watch what the physics decides. This is why water feels alive in games with almost no AI budget: emergence is doing the acting.

## The technique ladder — buy only what the game needs

Water simulation is a ladder, and each rung costs roughly 10× the one below:

1. **Flat water line** — a y-value. Buoyancy checks against it. Zero simulation. Enough for many games.
2. **Heightfield / pipe model** *(this node's build)* — water as depth-per-column over terrain. Flows, pools, floods, drains. Handles every "water finds its level" mechanic. This is the workhorse; most "amazing water" in 2D games is this.
3. **Shallow-water equations** — the pipe model with proper wave dynamics; adds realistic wave speed and bore fronts.
4. **Particles (SPH)** — individual droplets, splashes, spray. Expensive, chaotic, glorious. Use for garnish *on top of* a heightfield, not instead of one.
5. **Full grid solvers (Navier–Stokes)** — smoke, swirls, true 3D fluid. Almost never worth it in gameplay; worth it in shaders.

**Rule: pick the lowest rung that produces the *consequence* your design needs.** Dam & Valley needed flooding, pooling, and drainage — rung 2 delivered all of it in ~20 lines.

## The pipe model with momentum — the whole engine

World = N columns. `ground[i]` terrain height, `water[i]` depth on top, `flow[i]` momentum at each interface. Water pushes toward the neighbor whose *surface* (ground + water) is lower:

```js
for(let i=0;i<N-1;i++){
  const hL = ground[i]   + water[i];      // SURFACE height, not depth —
  const hR = ground[i+1] + water[i+1];    // this one word is the whole sim
  flow[i] = (flow[i] + K*(hL-hR)*g*dt) * DAMP;   // momentum + friction
}
for(let i=0;i<N-1;i++){
  let f = flow[i];                        // clamp: can't move more water
  if(f>0) f = Math.min(f,  water[i]  *0.45);   // than a column holds
  else    f = Math.max(f, -water[i+1]*0.45);
  water[i] -= f;  water[i+1] += f;
}
```

Laws learned by walking it:

1. **Compare surfaces, not depths.** Flow driven by `water[i]-water[i+1]` gives nonsense — deep pools uphill would push into shallow pools downhill. Driven by surface height, water climbs over saddles, fills bowls to a common level, and stops. All the intelligence is in that one addition.
2. **The momentum term is the difference between plumbing and water.** A memoryless model (flux recomputed from scratch each step) settles instantly and looks like mercury. Keeping `flow[]` between frames gives overshoot — sloshing, waves lapping a shore, the jagged living surface of a river in flood. Damping (≈0.994/step) decides the character: high damp = syrup, low damp = ocean.
3. **Clamp the transport.** Never move more than ~45% of a column's water in one pass, or columns go negative and the sim detonates. This clamp is the entire stability story — with it, the model is unconditionally robust to any terrain the player digs.
4. **Conservation is your test harness.** Total volume must be constant unless a gate adds or a drain removes. Walking the build, volume held exactly at 2754 through the whole flood — that single number validates the sim better than any visual check.

## Gates, drains, digging — constraints are the verbs

Every player verb in a water game edits the boundary conditions, never the water:

- **Gate** = a temporary addition to effective terrain height (`wall(i) = ground[i] + gateHeight`). Opening it is just lowering the wall; the physics does the drama of the release.
- **Drain** = a sink: subtract depth at a column, let neighbors rush in.
- **Digging** = editing `ground[]` live under a running sim. The pipe model doesn't care — next step it just reroutes. This is the cheapest "player reshapes the world" mechanic in games, and it works because the sim reads terrain fresh every step.

## Consequence design: let the water write, let the world remember

The walk exposed the correct grammar. Water itself is a *reversible* medium — it drains, evaporates, returns. So the persistent consequence must be something water *touches into being*: seeds that sprout after enough wet time, and never un-sprout. When the valley drains, ponds remain in the basins (local minima can't drain uphill — honest physics), and the five plants stand. The screenshot of the drained-but-green valley **is** the game's meaning: *flow passes; what it fed remains.* Pair a reversible medium with an irreversible response and you get consequence for free.

Also: sprouting on a timer (`wet frames ≥ threshold`) rather than on first touch matters — a splash shouldn't count as watering. Thresholds turn physics into judgment.

## 3D is the same node

The heightfield generalizes directly: `ground[x][z]`, `water[x][z]`, flow at four (or eight) neighbor interfaces instead of two. Same surface comparison, same clamp, same momentum. Rendering becomes a displaced translucent mesh. The classic "virtual pipes" GPU water in big 3D games is exactly this loop on a texture. What does *not* survive into 3D cheaply is particle water — that's where budgets die. Heightfield first, always.

## The face this node offers the tetra

Water is the **flow** of a physics game: many parts, one behavior, commanded only through constraints. With Gravity (one body, direct consequence) it forms the edge *"the world answers"*; with Light it will form the edge *"the world is seen."* 

**Vertex law:** *Compare surfaces, keep momentum, clamp the transport, conserve the total — and let something irreversible grow where the water went.*
