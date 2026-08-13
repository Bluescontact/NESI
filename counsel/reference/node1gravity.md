# NODE 1 — GRAVITY
## The first vertex of the four-faced game development skill
*Distilled from building and walking Gravity Wells (2D, from-scratch JS). August 2026.*

---

## What gravity is in a game

Gravity is the cheapest consequence engine a game has. It is one line of intent — things fall toward mass — and everything a player launches, drops, or jumps immediately acquires a future the player can read but not fully control. That gap between readable and controllable is where a physics game lives.

Two regimes, one law:

**Constant-field gravity** (platformers, projectiles): `a = g`, straight down. The planet is so large you're inside its field and it looks uniform. Use when the ground is the world.

**Point-mass gravity** (orbital games, wells): `a = G·m/r²` toward each mass. Use when masses are objects *in* the world. Multiple wells sum — that superposition is free gameplay: two planets create corridors, slingshots, and knife-edge paths nobody designed.

## The integrator — the actual heart

Semi-implicit (symplectic) Euler, fixed timestep. Velocity first, then position:

```js
function step(b, planets){
  const [ax, ay] = accel(b.x, b.y, planets);
  b.vx += ax * DT;   b.vy += ay * DT;   // velocity FIRST
  b.x  += b.vx * DT; b.y  += b.vy * DT; // then position uses NEW velocity
}
```

Three laws learned the hard way:

1. **Velocity before position.** Swap those two lines (explicit Euler) and orbits spiral outward, energy grows, and long trajectories lie. Semi-implicit Euler is symplectic — it conserves energy well enough that a probe can coast for twenty simulated seconds and still be trustworthy.

2. **Fixed DT, always.** `DT = 1/120` regardless of frame rate, with N substeps per render frame. Variable timestep makes physics depend on the player's hardware — the same drag produces different flights on different machines. Determinism is not a nicety; it's what makes aim, prediction, and replay possible at all.

3. **Soften the singularity.** Raw `1/r²` explodes as r→0. Add an epsilon inside the distance: `d² = dx²+dy²+ε²`. Bodies that pass close get a strong-but-finite kick instead of a teleport to infinity.

```js
function accel(x, y, planets){
  let ax=0, ay=0;
  for(const p of planets){
    const dx=p.x-x, dy=p.y-y;
    const d2 = dx*dx + dy*dy + 400;      // ε² = 400 → no singularity
    const inv = 1/Math.sqrt(d2);
    const a = G * p.m / d2;              // inverse square
    ax += a*dx*inv; ay += a*dy*inv;
  }
  return [ax, ay];
}
```

That is the entire physics core: fourteen lines. Everything else is game.

## Prediction is a mechanic, not a debug view

The trajectory preview in Gravity Wells runs *the same `step()` function* a few hundred iterations ahead and draws dots. Because integrator and preview share one code path, the preview never lies. The moment you write a second, "approximate" predictor, it will disagree with reality and the player will feel cheated. **One integrator, used everywhere: flight, preview, and AI aiming.**

This generalizes: in any physics game, the player's ability to *read the field* is the skill being tested. Give them honest instruments (preview arcs, field rings, ghost trails) and you can make the physics itself harder.

## Tuning: the constants are the game

`G`, masses, launch-speed clamp, and level geometry are one coupled system. There are no correct values — there is only *feel*, and feel is found by walking:

- Set G so a mid-speed shot visibly curves within one screen-width. Too low reads as "nothing happened"; too high reads as "random."
- Clamp launch speed. An unclamped fling escapes every well and the physics never gets to speak.
- Scale: in a 960px world, G·m ≈ 70k–90k px³/s² with speeds 100–520 px/s gave arcs that curve but don't whip.

**The walk-test found what design reasoning missed twice.** A beacon placed directly behind a planet on the launch axis was *provably unreachable* — every trajectory that bends around a well recrosses the axis elsewhere. And a beacon between two wells was reachable within 30px but not within its 19px hit radius: knife-edge, technically fair, actually cruel. The fix both times was the same move: sweep the real integrator over the full angle×speed input space, build a reachability map, and site objectives where *many* solutions pass, not one. **Never place a physics objective by eye. Place it with the physics.**

## Collision and consequence

Minimum viable: circle-vs-circle distance checks *inside the fixed-step loop* (checking once per render frame lets fast probes tunnel through targets). Planet hit → probe destroyed. Beacon hit → state flips and **stays flipped**. Persistence is what turns a toy into a game: the world must remember the player was there. Gravity supplies the drama; remembered state supplies the meaning.

## Jump-feel corollary (constant-field regime)

For platformers, don't pick g and jump velocity — pick *jump height h* and *time-to-apex t*, then derive: `g = 2h/t²`, `v_jump = g·t`. Designers can reason about "half a second to rise two tiles"; nobody can reason about g = 1800 px/s². For game-feel gravity, break physics deliberately: heavier fall than rise (`g *= 1.6` when falling), coyote time, jump buffering. Point-mass games earn trust by being exact; platformers earn feel by cheating consistently.

## 3D is the same node

Nothing above changes in 3D except vectors gain a z component: `accel` returns three numbers, `step` updates three axes. Inverse-square is already a 3D law (it's *more* correct there). The genuinely new 3D problems — seeing depth, reading trajectories in perspective — belong to the Light node, because they are problems of *seeing*, not of gravity.

## The face this node offers the tetra

Gravity is the **body** of a physics game: mass, momentum, consequence. It pairs with Water (flow — many bodies moving as one) and Light (sight — how the world is revealed). The fourth face binds them: a development discipline where nothing counts as done until it has been walked, screenshotted, and read.

**Vertex law:** *One honest integrator, fixed in time, softened at the center, walked before shipped.*
