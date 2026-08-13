# NODE 3 — LIGHT
## The third vertex of the four-faced game development skill
*Distilled from building and walking Beacon Chamber (3D from-scratch raycaster, JS). August 2026.*

---

## What light is in a game

Gravity is felt, water is answered, but light is *how the world is given to the player at all*. That makes light the only physics domain that is simultaneously a mechanic and the rendering itself. In Beacon Chamber the beam is a puzzle object, the crystals are goals, and the light level is the reward — all three are the same subsystem. When light is your theme, the renderer *is* the game design.

Light in games splits into two honest jobs:

**Light as sight** — illumination: how bright each visible surface is. This is a shading problem.
**Light as ray** — propagation: where a beam travels, what blocks it, what it reflects off. This is a geometry problem.

Games that feel magical about light (Portal's lasers, Zelda's mirror puzzles, Talos Principle) keep the two jobs coupled: the ray you route *changes* the illumination you see. That coupling is the whole trick, and it costs almost nothing.

## Rays: DDA is the one algorithm

One algorithm serves both jobs: **grid traversal (DDA)** — march a ray cell by cell, advancing whichever axis boundary is nearer. It is exact (no missed corners, no tunneling), needs no square roots in the loop, and one implementation serves:

- the *renderer* (one ray per screen column → wall distance → column height: from-scratch 3D in ~30 lines),
- the *beam* (a cell-walk from the source, redirected at mirrors),
- and later *line-of-sight, shadows, bullets* — every "can A see B" question.

```
if (sideX < sideY) { sideX += ddx; mapX += stepX; side = 0 }
else               { sideY += ddy; mapY += stepY; side = 1 }
```

That is the entire 3D engine's core decision. Perspective is just `wallHeight = screenH / perpendicularDistance` — with the fisheye correction `dist·cos(rayAng−viewAng)`, without which straight walls bow outward. Reflection is a pure direction swap: a `/` mirror maps `(dx,dy) → (−dy,−dx)`, a `\` maps `(dx,dy) → (dy,dx)`. Rotating a mirror is one boolean; the beam re-traces in a microsecond. **Cheap re-trace is what makes light a toy the player can play with** — never cache what you can recompute instantly.

## Illumination: a sum of falloffs

The entire lighting model of the chamber is one function — brightness at a point is a sum of light sources, each an inverse-square falloff:

```js
L = ambient                                   // the world's floor level
  + torch  / (1 + d²(player)  · k1)           // light that travels with the player
  + Σ crystal / (1 + d²(crystal) · k2)        // lights the player has earned
  + beamGlow / (1 + d²(nearestBeamCell) · k3) // light that shows the mechanism
L = min(L, cap)                               // never blow out to white
```

Laws learned by walking it:

1. **`1/(1+kd²)`, not `1/d²`.** The physical law explodes at d=0; the +1 softens it exactly like gravity's epsilon (the same fix in every field — singularities are always the enemy). k tunes the *radius of caring*.
2. **Distance shading is what makes from-scratch 3D read as 3D.** Flat-lit walls look like wallpaper; walls that dim with distance look like space. Add the classic trick — N/S faces at ~0.78 brightness of E/W faces — and pure rectangles acquire form. Two multipliers create the entire sense of volume.
3. **Ambient is emotional state.** The chamber starts at ambient 0.09 (dark, structure barely legible) and each lit crystal adds +0.10 *permanently*. The player doesn't read a score; they *feel* the room stay brighter. Persistent consequence delivered through the light level itself is stronger than any HUD text.
4. **Tune darkness with screenshots, not intent.** The first build's opening view was "atmospherically dark" in intent and *unreadably* dark in the actual PNG. Dark must still show structure — the walk caught what the design couldn't. (The general law from all three cycles: read the pixels, not the plan.)

## Sprites in a raycast world

Entities (mirrors, crystals, beam glows) render as billboards: project angle → screen x, scale by 1/distance, draw back-to-front, and skip any sprite whose distance exceeds the wall z-buffer at its column. Depth sorting plus a z-buffer test is the entire visibility model of a raycaster — the same two ideas that (elaborated) run every 3D engine.

## Light as consequence

The grammar from the Water node repeats one level up: the beam is *reversible* (turn a mirror, it re-routes instantly) but a crystal, once touched by the beam, is lit *forever* — and re-routing the beam afterward does not un-light it. The reversible medium explores; the irreversible response records. The chamber ends brighter than it began and nothing can undo it; walking back to spawn through your own accumulated light is the emotional payoff of the whole slice.

## Reaching for more

Everything richer is the same two jobs at higher resolution: refraction is a direction change with Snell's law instead of a swap; colored light is three falloff sums (R,G,B) instead of one; shadows are DDA visibility checks from the light instead of the eye; 2D games do "light as sight" with radial gradients and shadow polygons cast from wall corners. Nothing new in kind — only in count. Buy resolution the way the Water node buys rungs: only when the *consequence* your design needs demands it.

## The face this node offers the tetra

Light is the **seeing** of a physics game: the channel through which gravity's drama and water's answer reach the player at all — and, when routed, a mechanic in its own right. Gravity is one body, water is many bodies, light is *the relation between world and witness*.

**Vertex law:** *One ray algorithm for sight and mechanism alike; brightness as a sum of softened falloffs; and let the light the player earns stay on.*
