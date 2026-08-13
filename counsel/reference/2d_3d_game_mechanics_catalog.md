# 2D & 3D GAME MECHANICS — KNOWLEDGE ARTIFACT
## For a webpage-based game with no open world

*Kevin's text, dropped verbatim into session d0a3e5cd on 2026-08-12 and saved here
because it existed nowhere on disk. Anchored to the NESI build. Extends the
physics-game-tetra skill and runs under the vertical-slice law. August 2026.*

---

## PART 0 — THE GOVERNING CONSTRAINT

"No open world" is not a limitation to work around. It is the strongest design decision available to a small web game, and this artifact treats it as law.

An open world spends its budget on area; a chambered world spends it on consequence density. Every screen the player can stand in is authored: its sightlines chosen, its physics sited, its state remembered. The great bounded games — the single dungeon room, the one valley, the tower you climb — all obey the same economy: space is never filler, travel is never dead time, and every place the player can reach exists because something can happen there that matters.

The browser reinforces this. A webpage game loads in one breath, runs in one tab, needs no install, and is at its best when the whole world fits in the player's head. The NESI build's grammar — write at the apex, ride the spire, hold or release the dam, watch the ground below change — is already a chambered grammar: a small number of places, each with one strong verb, joined vertically.

Everything below is organized around one sentence:

**A no-open-world game is a set of chambers, each of which is a vertical slice, joined by meaningful travel, sharing one memory.**

Four clauses; four parts of this artifact. Mechanics of the chamber (Parts 2–4), mechanics of the join (Part 1), mechanics of the memory (Part 5), and the architecture that carries all of it in flat web files (Part 6).

## PART 1 — WORLD STRUCTURE: THE SHAPES THAT REPLACE OPENNESS

### 1.1 The five closed shapes

Nearly every non-open world is one of five shapes, and choosing consciously is the first design act:

**The chain** — chambers in fixed order (Gravity Wells' three fields). Strongest teaching structure: each chamber may assume everything earlier chambers taught. Weakest for return visits.

**The hub** — one central place with spokes (a valley floor with spires around it). The hub becomes the witness surface: it should visibly accumulate the consequences of every spoke, so returning to it is a progress report the player reads with their eyes rather than a menu.

**The spire** — chambers stacked vertically; elevation is progression. This is NESI's native shape. Height carries automatic meaning humans read for free: up is aspiration and overview, down is consequence and ground truth. A lift or descent between levels is travel with meaning built in — you feel the distance between the writing at the apex and the water landing on the ground.

**The loop** — chambers in a cycle that changes each pass (a valley across seasons, a day-night circuit). The world is small but time makes it large. Loops are the cheapest form of "more content": same geometry, new state.

**The gate-graph** — chambers connected by conditional doors (locks, water levels, light beams). The player's map knowledge is the progression currency. This is where "no open world" outperforms open worlds outright: a locked door in a five-room world is a promise; in an open world it's clutter.

NESI as built points at a spire whose floors are a gate-graph, standing over a hub: apex (write) → dam floor (hold/release) → ground (consequence), with gates driven by water and light state.

### 1.2 Scene mechanics — the chamber boundary

The chamber boundary is a mechanic, not plumbing. Three implementation patterns, all framework-free:

```js
// The scene registry: each scene owns update/draw/enter/exit, shares one worldState
const scenes = {
  apex:   { enter, exit, update(dt), draw(ctx), },
  dam:    { ... },
  ground: { ... },
};
let current = scenes.apex;
function goTo(name, doorId){
  current.exit();
  current = scenes[name];
  current.enter(worldState, doorId);   // doorId → where the player appears
}
```

The rules that make it feel right: the player exits through something visible (a door, a lift, the edge of the dam), never via an abstract button; the entry point in the next chamber corresponds spatially (leave going down, arrive from above); and transitions are short and diegetic — a lift hum, a second of falling water — never a loading bar. In a chambered game, a 400ms transition that shows the world connecting does more world-building than a square kilometer of terrain.

**Camera as chamber language (2D):** fixed camera = a room (the whole chamber is one composition, the player reads it like a picture — right for puzzles); bounded-follow camera = a hall (camera tracks the player but hard-clamps at chamber edges, so walls feel like walls); axis-locked follow = the spire (camera follows only y — lateral bounds are absolute, verticality is emphasized). The clamp is the no-open-world contract, made visible: `cam.x = clamp(player.x - W/2, 0, chamberW - W)`.

### 1.3 Gates: conditional passage as the spine

Every progression mechanic in a bounded world reduces to a gate — a passage whose state is a function of world memory:

```js
const gates = [
  { from:'dam', to:'ground', open: s => s.damReleasedOnce },
  { from:'ground', to:'grove', open: s => s.sproutCount >= 5 },
  { from:'apex', to:'lens',  open: s => s.crystalsLit >= 2 },
];
```

Three laws for gates, learned across the tetra builds: the gate's condition must be visible in the world (a dark crystal beside the door, a dry channel under it — never only a tooltip); the gate must open by the world's own physics when the condition is met (water actually flows into the slot, light actually strikes the lock); and once open, a gate that stays open is a memory the player made — closing gates behind players erases their work and should be reserved for deliberate drama. A gate is the reversible-medium/irreversible-response pairing from the tetra applied to space.

## PART 2 — 2D MECHANICS

### 2.1 Movement: the body in the chamber

Movement is the mechanic under all mechanics — the player's hands live here, so feel-budget spent on movement pays out every second of play.

**Platformer body** (side-view chambers). Don't tune g and jump speed; derive them from design intent — jump height h and time-to-apex t: `g = 2h/t²`, `vJump = g·t`. Then break physics deliberately and consistently:

```js
// The four feel-cheats every good platformer body uses
if(falling) g *= 1.6;                        // heavier down than up
if(!grounded && sinceGrounded < 0.09) canJump = true;   // coyote time
if(jumpPressed) jumpBuffer = 0.12;           // buffered input: press early, land, jump fires
if(jumpReleased && vy < 0) vy *= 0.45;       // variable height: tap = hop, hold = leap
```

**Top-down body** (map-view chambers). Acceleration toward input with damping — `v += (input·maxSpeed − v)·k·dt` — gives weight without slipperiness; k≈10 is crisp, k≈4 is a boat. Circle-vs-tile collision with corner sliding, nothing more.

**The lift** (NESI's signature move). A lift is one-dimensional movement with ceremony: the player boards (a positional check + commitment), the lift moves on its own physics (constant speed or eased), the world scrolls past showing the chambers between floors, and the player cannot act until arrival. That enforced pause is a designed breath — the moment the player anticipates consequence. Implement as a rail: `lift.y += dir * speed * dt` with the player parented to it; the spire's other floors drawn passing by are the cheapest cinematic in games.

### 2.2 Aim-and-commit: the slingshot family

Drag-to-aim, release-to-commit (Gravity Wells) is the strongest single input pattern for physics consequence, because it separates deliberation (free, reversible, previewed) from commitment (one release, irreversible). The implementation law from the tetra holds everywhere: the preview must run the same integrator as the flight. Variants of the same skeleton: charge-and-release (hold to power a held gauge — commitment under time pressure), place-and-run (position objects freely, then press GO and physics runs — the puzzle version), and inscribe-then-release (NESI's apex writing: the text is composed freely, then sent, and becomes world state — see 2.5).

### 2.3 Terraform and route: editing the constraint surface

From the Water node: the player never commands the medium; they edit the constraints and the medium answers. This family — dig, pile, gate, channel, mirror-turn — is NESI's mechanical heart, and it has one implementation shape: world-as-editable-field, medium-as-solver.

```js
// dig / pile: edit the field the sim reads fresh every step
function dig(col, amt){ ground[col] = max(bedrock, ground[col] - amt); }
// the water (or light, or falling sand) then simply finds the new answer
```

Design laws for the family: the edit must be slow enough to be a decision (digging one notch per drag-pass, a mirror turning 90° per press — instant terraforming makes the solver's answer feel arbitrary); the medium's answer must be legible in motion (water visibly rushing to the new channel is the reward); and the best puzzles pose the medium's question before offering the tools — show the dry seed and the pooled water first, let the player infer the channel.

### 2.4 Tend-and-wait: slow consequence

Sprouts that grow over wet-time (Dam & Valley) belong to a mechanic family bounded worlds do uniquely well: consequence on a delay. Plant now, see it on return to the chamber. Implementation is a threshold accumulator (`wet += dt when watered; grown = wet > need`), but the design payload is in the return visit: the chamber the player re-enters is visibly further along than they left it. In a chambered world every re-entry is a scene the designer controls — schedule growth so that coming back is where the payoff lands. This is the hub's witness-surface duty (1.1) at the mechanic scale.

### 2.5 Inscription: writing as a mechanic

NESI's "write at the apex" is rare and worth doing properly: text input as a world act, not a form field. The grammar that keeps it a mechanic: the writing surface is a place (you travel to the apex to write; the chamber is quiet; the input is diegetic — carved, inked, glowing); the words are committed like a slingshot release (a deliberate send, no editing after); and the text becomes material downstream — the written line appears carried by the water, embedded in the ground where the outflow landed, readable by the returning player. Implementation is honest and small:

```js
// the inscription is world state, stamped with where/when, routed like any physics object
worldState.inscriptions.push({ text, at:'apex', tick: worldTick, routedTo:null });
// downstream chambers claim unrouted inscriptions when their condition fires
if(damReleased) route(latestInscription, 'ground');  // the words travel with the water
```

**Never validate or judge the text mechanically. The mechanic is that the world carries the words, not that it grades them.**

### 2.6 The 2D puzzle grammars

For chambers that are puzzles, three grammars cover nearly everything, all already in the tetra's physics: **level-seeking** (water finds its height: raise/lower/divert until the level satisfies a condition — the solution state is stable, so the player can approach it from any direction); **path-routing** (beams and mirrors: discrete redirections of a continuous flow, instantly re-traced — solutions read at a glance); **order-and-timing** (gates and flows with momentum: open A before B, the transient matters). Level-seeking puzzles forgive, routing puzzles clarify, timing puzzles pressure. A NESI floor should usually be one grammar, purely — mixing grammars in one chamber muddies what question the room is asking.

## PART 3 — 3D MECHANICS (BROWSER, NO OPEN WORLD)

### 3.1 When a chamber earns 3D

3D in a webpage game is a spice, not a base. A chamber earns first-person 3D when its mechanic is about *being inside* — darkness and light falloff around your body, sightlines you must walk to gain, presence in front of a thing you act on (Beacon Chamber's mirrors). It does not earn 3D for spectacle: overview, planning, and terraforming mechanics are all stronger in 2D, where the player sees the whole field. The chambered structure makes mixing trivial: the ground valley is a 2D scene, the dark lens-chamber is a raycast 3D scene, and the scene registry (1.2) doesn't care. Per-chamber dimensionality is a bounded world's superpower — an open world could never switch.

### 3.2 The from-scratch 3D chamber

The raycaster (Light node) is the complete recipe: grid map, DDA per column, `wallHeight = H/perpDist`, fisheye correction, distance shading, N/S vs E/W face shading, billboard sprites depth-tested against the column z-buffer. ~150 lines, no WebGL, runs anywhere. Its constraints are aligned with no-open-world: grid maps are small, chambers are rooms by construction, and darkness-plus-falloff makes a 16×16 grid feel deep. If a chamber someday needs true meshes (the spire seen from outside, water surfaces in 3D), that is the one place to admit a library (three.js) — but keep it to that chamber, behind the same scene interface.

### 3.3 First-person verbs

Browser first-person on a keyboard supports exactly this verb set comfortably: **walk/turn** (W/S/A/D — arrow-turn beats mouse-look on a webpage; no pointer-lock friction), **approach-and-press** (one contextual key on the thing you face — distance + facing-angle check, with the prompt appearing only when valid: the E-verb), and **carry** (pick up in one chamber, place in another — item rides in worldState, drawn as a sprite in the hand-corner). Resist adding more. Beacon Chamber's walk-test failure — the press that missed because the player stood 0.1 cells too far — is the standing lesson: tune the E-verb's range generously and show the prompt honestly, because the prompt appearing IS the affordance.

### 3.4 Depth the player can read

From-scratch 3D lives or dies on depth cues, in priority order: distance-darkening (near-free, do always), face-orientation shading (one multiplier), floor gradient toward a horizon, sprite scale (1/d), and motion parallax (free — comes from walking). Skip textures; light-defined space reads better than textured space at this fidelity, and it keeps the chamber's mood (dark until earned — the Light node's ambient-as-emotional-state law) as the visual center.

## PART 4 — CONSEQUENCE & FEEDBACK MECHANICS (BOTH DIMENSIONS)

### 4.1 The consequence ladder

Every act should land on the ladder, and the game should climb it as the player advances: **instant echo** (the splash, the flash — sub-100ms, confirms the act registered) → **state change** (the beacon lit, the sprout begun — visible, persistent) → **world change** (the chamber brighter, the channel now a stream — ambient, passive, everywhere) → **witnessed change** (another place reflects it: the hub shows the spire's light; the ground carries the apex's words). The tetra games each climbed to rung three; NESI's structure — writing routed down the spire — is built to reach rung four, which is where a game starts feeling like a world.

### 4.2 Juice, bounded

The standard kit, sized for a contemplative build: squash-and-stretch on impacts (scale 1.15/0.85 for 80ms), 2–4px camera shake only for the dam release and similar earthquakes, particles as punctuation (a dozen droplets, not a fountain), and eased interpolation on everything mechanical (`x += (target-x)*k*dt` is 90% of all game animation). The discipline: **juice confirms consequence, never substitutes for it. If the state didn't change, nothing shakes.**

### 4.3 Sound in one paragraph

WebAudio needs no assets: an oscillator with an exponential-decay gain envelope is a chime (beacon), filtered noise is water (loop it under the dam scene, volume mapped to flow rate), a low sine swell is the lift. Fifteen lines per sound, generated at runtime, no files to upload to GitHub. One law: sound follows the same falloff math as light — nearer is louder — so the audio confirms the same spatial truths the eye reads. And browsers require a user gesture before audio starts: begin the soundscape on the first real input, silently before that.

## PART 5 — STATE, PERSISTENCE, AND MEMORY

### 5.1 One memory, owned by no chamber

The single most important architectural decision: all persistent state lives in one flat `worldState` object; chambers read and write it but never own it.

```js
const worldState = {
  tick: 0,
  beaconsLit: [], sproutWet: [], crystalCount: 0,
  damReleasedOnce: false, gatesOpened: [],
  inscriptions: [],            // the words, with routing
  edits: { dug: [], mirrors: {} },   // player terraforming, replayed on scene enter
};
```

Chamber-local state (particles, camera, the probe in flight) is rebuilt on every `enter()` and never saved. The test for which side a value belongs on is the vertical-slice law itself: **would the player notice if this were forgotten when they leave and return?** If yes, it's worldState. If no, it's scenery.

### 5.2 Persistence across sessions

Two contexts, two answers. As a claude.ai artifact: in-memory only (browser storage APIs are unsupported there) — sessions are single sittings, which suits prototype slices. On oursharedgifts.org (GitHub Pages): `localStorage` works and is the right default — serialize worldState on every meaningful change (`localStorage.setItem('nesi', JSON.stringify(worldState))`), load on boot, version the save (`{v:3, ...}`) so old saves can be migrated or gently retired. Additionally, at rung four of ambition: an export/import string (the serialized state, base64, shown in a copyable box) makes a save a gift that travels — a player can hand their valley to someone else. That mechanic is one line of code and it is very NESI.

### 5.3 Irreversibility as the meaning-maker

The tetra's deepest law generalizes into the state system: classify every field of worldState as **medium** (reversible: water level, probe, beam path, lift position) or **record** (irreversible: sprouts grown, crystals lit, words written, gates opened). Code enforces the classification — records only ever get more: `record.sprouts = max(record.sprouts, newCount)`. A bug that un-lights a crystal is not a glitch, it is a broken promise; the walk-test's leave-and-return step exists precisely to catch it.

## PART 6 — ARCHITECTURE: CARRYING IT ALL IN FLAT WEB FILES

### 6.1 The loop and the clock

One pattern serves every chamber, both dimensions:

```js
let last = performance.now(), acc = 0; const DT = 1/120;
function frame(t){
  acc += min(0.05, (t - last)/1000); last = t;      // clamp: tab-switch safe
  while(acc >= DT){ current.update(DT); acc -= DT; } // fixed-step physics
  current.draw(ctx);                                 // render once per frame
  requestAnimationFrame(frame);
}
```

Fixed timestep (determinism, tuning that holds on every machine), accumulator (render rate decoupled from physics rate), clamp (returning to a background tab must not fast-forward the world). This is the tetra's integrator law promoted to whole-game law.

### 6.2 File shape

Match the site's standing architecture — flat files, no build tools. A slice or prototype ships as one self-contained HTML file (everything the tetra produced). The grown game ships as one page plus flat siblings: `nesi.html`, `world.js` (worldState + save/load), `scenes/*.js` one per chamber, loaded with plain `<script>` tags in order — no modules, no bundler, uploadable by browser drag-and-drop like every other page on oursharedgifts.org. The discipline that keeps flat files sane at this scale: chambers talk only through worldState and goTo(); if two scenes ever need to call each other directly, that call belongs in world.js.

### 6.3 Input as a map, not listeners everywhere

One input layer, consulted by the current scene: `const keys={}; onkeydown/up → keys[k]=bool`, plus a per-frame `pressed()` edge-detector for E-verbs and commits. Scenes read the map; nothing else registers listeners. This is also what makes every chamber automatically walk-testable — the harness drives the same map through real dispatched events.

### 6.4 The budget

A no-open-world web game's performance envelope, from the walked builds: 240-column water sim + rendering ≈ trivial; 480-column raycast with per-column light sums ≈ comfortable; thousands of particles ≈ where canvas 2D starts to bend. Design inside the envelope rather than optimizing past it — a 16×16 chamber never needs a spatial index, and reaching for one is the spec-not-slice failure mode wearing an engineering hat.

## PART 7 — THE NESI ROUTING TABLE

How the catalog above lands on the build, floor by floor:

**The apex** — inscription mechanic (2.5) in a fixed-camera 2D chamber (1.2); the commit is a slingshot-family release (2.2); the words enter worldState.inscriptions (5.1). Quietest juice in the game (4.2) — the apex is the room where nothing shakes.

**The spire descent** — the lift (2.1) as meaningful travel (Part 0); passing floors drawn as parallax; gates on the lift's stops driven by water/light state (1.3).

**The dam floor** — hold/release as order-and-timing grammar (2.6); shallow-water pipe model with momentum (Water node); dam release is the game's one earthquake (4.2); `damReleasedOnce` is a record, not a medium (5.3).

**The ground** — terraform-and-tend (2.3, 2.4) in a bounded-follow 2D chamber; the outflow carries inscriptions to where they embed (2.5→4.1 rung four); sprouts and embedded words are the hub's witness surface (1.1).

**The dark chamber** (when the build wants it) — first-person raycast 3D (3.2) with the E-verb (3.3); light routed here opens a gate elsewhere (1.3); the one 3D room in a 2D world (3.1).

**Every floor** — is a vertical slice before it is a floor: way in, act, consequence, way out; walked, screenshotted, read. WALKABLE or BLOCKED; no third word.

## THE CLOSING CHECK

Four questions for any mechanic before it enters the build, mirroring the tetra check:

1. Does it give the player a **decision**, not just an action?
2. Does the world answer through its **own physics** rather than through UI?
3. Does something **irreversible** remember the act?
4. Can it be **walked in a chamber the player reaches from spawn** — because a mechanic with no chamber is a spec, and the failure mode of this project is well documented.

*Companion pieces: the physics-game-tetra skill (gravity, water, light nodes + build discipline) for the physics under these mechanics; the vertical-slice law for how any of this becomes a build session.*
