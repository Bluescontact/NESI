# KNOWLEDGE — Light in Games

*Reference material. Not a spec, carries no marks, proposes nothing. Written to disk 2026-08-09, session 4029580c, at Kevin's direct instruction — "write it to disk as reference material." The FULL FREEZE of 2026-08-07 binds the machine's initiative, never his; this file exists because he asked for it, and nothing in it is adopted, ruled, or offered as a decision.*

*Body verbatim as Kevin delivered it. Nothing added, nothing rewritten. The three collisions this session read against the live record are noted at the foot, below the horizontal rule, and are clearly marked as reading — they are not part of the document.*

---

A reference map — optics, beams, mirrors, heliostats, and what they cost.

---

## 0. The one thing that governs everything else

**The light you see and the light the game knows about are two different systems, and they almost never talk.**

Every shipped light-puzzle game runs two layers:

| | Rendering light | Simulated light |
|---|---|---|
| Lives on | GPU | CPU, in gameplay code |
| Made of | lightmaps, probes, shadow maps, GI | raycasts, segments, a graph |
| Cost | high, fixed | very low, scales with beam count |
| Readable by gameplay | **no** | yes |
| Deterministic | not usefully | yes, if you're careful |
| What it's for | how the room feels | what the room does |

You cannot ask the renderer "is this point lit?" — not in Godot, not in Unity, not in Unreal, not cheaply anywhere. The visual beam is drawn *after* the logical beam has already been resolved, to match it.

The classic exception is the Thief / Splinter Cell trick: sample a precomputed **light grid** at the player's position to get a 0–1 "visibility" number. That's not reading the render — it's reading a separate low-resolution data structure that happens to have been baked from the same lights. It works, and it's the only widely-used bridge between the two layers.

Consequence: **decide which layer each idea lives on before building it.** Ideas that live on the render layer are art. Ideas that live on the sim layer are mechanics. Ideas that need both need two implementations that agree.

---

## 1. Three models of light. Pick one per layer.

Almost everything in games reduces to one of three.

### A. The ray model — light as segments

An emitter fires a ray. It hits something. The surface decides what happens next. Repeat until absorbed or out of budget.

- **Data structure:** a directed graph of segments, rebuilt on change.
- **Good for:** puzzles, precision, geometry-as-wiring, mirrors, splitters.
- **Cost:** trivial. Thousands of raycasts per frame is fine.
- **Games:** Portal 2 (discharge lasers, redirection cubes), The Talos Principle (connectors), Lightmatter, Zelda mirror shields, Hue.

### B. The field model — light as a scalar on a grid

Light level is a number per cell, spread by flood-fill. No rays, no angles.

- **Data structure:** a grid + a propagation pass with falloff.
- **Good for:** light as *terrain* — where you can stand, what grows, what sees you. Scales to enormous worlds.
- **Cost:** cheap, but recomputation is the whole grid or a dirty region.
- **Games:** Minecraft (light level 0–15, drives mob spawns and crop growth), roguelike FOV, most stealth games' light values.

### C. The budget model — light as a number, no geometry at all

Sunlight is a quantity per tick, modified by time of day and weather. Nothing is aimed.

- **Good for:** economy, day/night buffering, production chains.
- **Cost:** none.
- **Games:** Factorio and Satisfactory solar (light with zero optics), most colony sims.

**Most games pick one. The interesting move is running two at different zoom levels** — budget at the macro scale, rays when you inspect one instrument. A heliostat field is exactly this: the field is a throughput number, one mirror is a ray problem.

---

## 2. The ray model in full — the component vocabulary

This is the "what can I build" list. Every light puzzle ever made is a subset.

**Emitters**
- point / directional / cone
- continuous vs pulsed vs charge-and-fire
- fixed vs moving (a sun on a cycle is a moving emitter — see §4)
- what it carries (see §3)

**Media** — what the ray passes *through*
- vacuum: straight, invisible from the side (games always cheat this)
- fog / scattering: beam visible, intensity attenuates with distance
- refractive volume: ray bends on entry and exit
- absorbing volume: attenuation without visibility

**Surface responses** — the interesting part

| Response | Segments out | Notes |
|---|---|---|
| Reflect | 1 | `d' = d − 2(d·n)n`. Godot: `Vector3.bounce()` |
| Split | 2+ | fan-out; the only way to build parallel logic |
| Filter | 1 | subtracts a channel — the classic colour-key |
| Refract | 1 | Snell; cheap for flat interfaces, ugly for curves |
| Absorb | 0 | termination — also how you build "arrival" |
| Diffuse | 0 logically, but illuminates | terminates the graph, lights the room |
| Amplify / attenuate | 1 | analog value changes |
| Delay | 1, later | non-physical, and the single most useful lie (see §6) |

**Receivers**
- threshold ("any light")
- channel-match ("red only")
- intensity accumulator ("enough light")
- duration ("held for 3 seconds")
- count ("three beams at once")

Everything a light puzzle can be is a graph over these five lists. That's the whole space, and it's smaller than it looks — which is why light puzzles feel familiar fast.

---

## 3. The lever most designs miss: what does the beam *carry*?

The beam is a wire. The genre is decided by the signal on it.

| Carried | Bandwidth | Grammar it produces |
|---|---|---|
| Presence | 1 bit | on/off puzzles — Portal 2 |
| Colour | ~3 bits, combinable | key-and-lock, mixing, filters — Talos Principle |
| Intensity | analog | tuning, optimisation, thresholds |
| Direction/polarisation | a few states | tokenised; not real physics, and that's fine |
| Pulses over time | a stream | timing, rhythm, encoding — rare and expensive to teach |
| Nothing (light as ground) | n/a | light as terrain, darkness as hazard — Lightmatter |

Colour is the most-used because it's the only one that's self-documenting: the player reads the state without a HUD. Analog intensity is the least-used because players can't tell 0.6 from 0.7 without a number — and the moment you show the number, you've built a score.

If a design wants a non-numeric readout of an analog value, the two working answers are **caustics** (pattern complexity as legibility without countability) and **colour temperature**. Both are read, not measured.

---

## 4. Heliostats — the sharpest tool in this box

A heliostat is a mirror that tracks a moving source to keep a **fixed target** illuminated. This is a much bigger design object than "a mirror," because it drags three things in at once: **time, control, and aggregation.**

### The control law is two lines

Let `s` = unit vector from the mirror toward the sun, `t` = unit vector from the mirror toward the target. Then the required mirror normal is:

```
n = normalize(s + t)
```

That's it. The normal bisects the two directions. A 12-mirror array is 12 vector adds per frame — free.

### Cosine loss gives you a free difficulty gradient

Delivered energy scales with `dot(n, s)` = cosine of half the angle between source and target. A mirror positioned so the sun and target are nearly opposite delivers almost nothing. So:

- mirrors near the tower's sun-side are efficient; far ones are not
- efficiency changes across the day *without you authoring anything*
- field layout becomes a real spatial problem with a real answer

This is physically true, costs one dot product, and produces genuine design texture.

### The sun is not a point

Angular diameter ~0.53°, so a reflected spot spreads roughly **1 cm per metre of slant range**, plus the mirror's own size. Distant mirrors make soft, wide spots; near mirrors make tight ones. Free focus/distance tradeoff, no optics simulation.

### What heliostats structurally add

- **Time becomes an input.** The sun's position is a clock the player doesn't control.
- **Mirrors become actuators, not furniture.** Now there's a tracking problem: aim, error, drift, re-aim.
- **Aggregation.** N mirrors onto one target is a sum with a threshold. That's a production chain.
- **The manual→programmed axis.** Aiming one mirror is a puzzle. Aiming 200 by hand is misery. Somewhere in between, the design has to hand the player *automation* — and that's the door from puzzle game into management game. Where that threshold sits is the whole design decision.

### The honest warning

A heliostat field wants to become a numbers screen. Concentrated solar is inherently a throughput problem, and throughput wants a readout, and a readout is a score. If a project has a no-scoring law, the heliostat is the single most likely place it breaks — the physics is pushing toward a bankable quantity the whole time.

---

## 5. Process management — where optics becomes an economy

The bridge from "light puzzle" to "light system" is adding **loss, storage, and schedule.**

- **Loss functions:** distance attenuation, mirror reflectivity (~90–94% real), dust/fouling that accumulates, misalignment drift. Each is a maintenance verb.
- **Storage:** batteries, charged crystals, molten salt, heated mass. Storage is what decouples generation from use.
- **Schedule:** sun angle, cloud events, seasons. Creates the buffering problem that makes storage matter.
- **Concentration:** N sources → 1 target with a threshold. Below the threshold, nothing; above, a state change. Thresholds are how you get discrete events out of an analog system without a number.

**The structural fact underneath all of this:** light has no queue. Water backs up behind a dam. Items back up on a belt. Light cannot back up — it either arrives this instant or is gone. So:

> **Under a stocks-and-rates model, light is pure rate and cannot be a stock.**

The only ways to give light a stock are (a) store it as something else — heat, charge, a lit state that lapses — or (b) invent a delay that physics doesn't have. Both are legitimate; both are inventions and should be known as such. This is also why light and water pair so well as a two-element system: one has a stock and no aim, the other has aim and no stock.

---

## 6. What you can't do — or can't do cheaply

**Hard walls**

1. **You cannot read the renderer from gameplay.** No engine exposes it usefully. Build a second system or bake a light grid.
2. **True caustics as data.** Caustics are an integral over a light distribution. Games fake them with an animated projector texture or a floor shader. They are decoration; they carry no gameplay value you didn't put there yourself. (They are excellent *readouts* precisely because they're un-countable.)
3. **Wave optics.** Interference, diffraction, real polarisation, dispersion into a continuous spectrum — not happening in real time. You can *tokenise* them (polarisation = 4 discrete states) but that's a symbol, not a simulation.
4. **Unbounded recursion.** Two mirrors facing each other is an infinite loop. Every light system needs a **bounce budget** (8–32 typical) and a cycle detector. Non-negotiable.
5. **Many recursive real mirrors.** A mirror that shows a *true reflected image* needs a second camera rendering to a viewport. Each recursion level is another full scene render. Practical ceiling: 2–3, and only for a handful of mirrors.

**Soft walls — technically possible, reliably bad**

6. **Analog aiming at range.** Nearly every shipped light game snaps mirrors to discrete angles (45°/90°, or hex). Free aim at distance means the player misses by 0.3° and cannot see why. If precision aiming must exist, add a coarse/fine mode or a lock-on.
7. **Floating-point beams.** A beam that "just barely" clips an edge is fragile — and breaks outright under replay, networking, or a different CPU. Fix with snapped directions, generous receiver volumes, or fixed-point.
8. **Per-frame full recomputation at scale.** Emitters × bounces × raycasts every frame is waste. Go **event-driven**: dirty-flag on mirror move / occluder change / emitter toggle. A static light network should cost zero when nothing moves.
9. **More than ~5–7 simultaneous beams on screen.** Past that, players stop reading the graph. Mitigations: colour coding, thickness by intensity, animated flow direction, and letting the player dim beams they aren't working on.
10. **Beams visible in vacuum.** Physically a beam is invisible from the side. You will cheat. Options: volumetric fog (looks best, costs most), an additive stretched quad or tube mesh (cheap, controllable, standard), or a shader-driven line. Just know you're cheating so the fiction stays consistent.
11. **Moving occluders + moving beams.** Combinatorially explosive to author and near-impossible to communicate. Move one or the other, rarely both.
12. **Light with latency.** There is none to work with. If a design wants "the light arrives later," that's an invented rule and the player must be taught it.

---

## 7. Godot 4, specifically

**The sim layer**
- `PhysicsDirectSpaceState3D.intersect_ray()` for segments. Cheap. Use collision layers so beams only hit optical surfaces.
- `Vector3.bounce(normal)` for mirror reflection.
- `Area3D` or the raycast's returned collider for receivers.
- Run it in `_physics_process`, or better, event-driven with a dirty flag.

**The visual layer**
- Beam draw: pooled `MeshInstance3D` with a stretched cylinder + additive unshaded material, or `ImmediateMesh`. `Line2D` in 2D.
- `SpotLight3D` looks like a beam but casts a cone; shadow bias gets fragile on long thin volumes.
- Side-visible beams: `Environment.volumetric_fog_enabled` + `FogVolume`. Expensive but convincing.
- Fake caustics: `Light3D.projector` with an animated texture, or a floor shader. This is the standard approach and it is entirely visual.
- Real mirrors: `Camera3D` → `SubViewport` → texture on the surface. Budget carefully.
- `SDFGI` / `VoxelGI` / `LightmapGI` / `ReflectionProbe` are all rendering-only. Nothing in them is queryable.

**The bridge, if needed**
- Bake or author a low-res light grid and sample it. This is the Thief trick and it's still the right answer.

---

## 8. Where this touches the light control room — as reads, not rulings

Things in the record that this map has something to say about. All of these are my reads and stay open:

- **The 12-mirror array is nearly free.** The `n = normalize(s + t)` law and cosine loss mean the whole array is a dozen vector operations. Nothing here is a performance question.
- **"Light rises" costs nothing structurally.** A heliostat shining up into the room is the same math with the target overhead. Cosine loss then makes the mirror's *position below* matter, which is a real coupling to the world's state rather than an authored one.
- **"Light quality as a non-numeric progress signal"** has a working implementation: a projector texture whose pattern complexity or colour temperature shifts with cycle count. Read, never measured — and caustics being un-countable is the reason they fit, not a limitation.
- **The stock/rate problem is live.** Light is pure rate. Under a stocks-and-rates world it cannot fill a tank. "Charge as a duration that lapses" is one of the two available answers (store it as another quantity); an invented delay is the other. Both are inventions.
- **The heliostat is where a no-scoring law is most at risk.** Concentration is a sum against a threshold, and sums want readouts. Nothing about the physics protects against it.
- **The four operations (clarify / distill / heat / charge)** sit on different layers by this map: heat and charge are stock-conversions (light → another quantity that persists), clarify and distill are filter operations on a workpiece. That's a layer split, not a value judgement, and it doesn't decide anything about the tetra reading.
- **Two mirrors facing each other** will need a bounce budget and a cycle check the first time an operator can aim anything freely.

---

## 9. Reference games, by what they'd teach

| Game | The lesson |
|---|---|
| Portal 2 | 1-bit beams, snapped angles, one carrier — how little you need |
| The Talos Principle | colour channels as a lock system; strict acyclic graphs |
| Lightmatter | light as *terrain*, not signal; darkness as hazard |
| Minecraft | the field model — light as a cheap scalar driving growth and spawning |
| Thief / Splinter Cell | the light-grid sampling bridge; light as a hidden player stat |
| Zelda (mirror shield, BotW/TotK) | manual aim at a moving sun — the closest thing to a heliostat in a mainstream game |
| Factorio | light as pure economy with zero optics; day/night as a buffering problem |
| Opus Magnum / Zachtronics | the programmable-actuator grammar a mirror *field* would need |
| Manifold Garden | light and perception as spatial logic rather than signal |

---

## 10. The compression

- Two layers. Render light is art; sim light is mechanics. Decide per idea.
- Three models. Ray (puzzle), field (terrain), budget (economy). Pick per zoom level.
- The beam is a wire; the carried signal decides the genre.
- Heliostats are cheap, physically honest, and drag time, control, and aggregation in with them.
- Light has aim and no stock. Water has stock and no aim.
- The five real constraints: no reading the renderer, bounce budgets, snap your angles, go event-driven, cap simultaneous beams.

---

# FOOT — three collisions with the live record (session reading, 2026-08-09)

**Not part of the document. Reading only, no marks, nothing adopted.**

1. **§7 is Godot-4-3D and the standing ruling of 2026-08-07 is that NESI is 2D.** That section is largely moot as written; §§0–5 (the two layers, the three models, what the beam carries, loss/storage/schedule) are dimension-free and carry over intact.
2. **§4's closing warning lands directly on station law 2** ("no number reaches the player"). Concentration is a sum against a threshold; the document's own read is that the heliostat is the single most likely place a no-scoring law breaks, and that nothing in the physics protects against it.
3. **"Light has aim and no stock. Water has stock and no aim."** This matches the world's water economy exactly. By the same reading, heat and charge are stock-conversions — inventions — and the document flags them as inventions rather than physics before anyone else has to.
