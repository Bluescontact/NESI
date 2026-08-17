# THE HAND, FROM THE COMMONS

**Swept 2026-08-16 on Kevin's instruction:** *"Start researching the things the
hand can do, we use open source software rather then inventing anythgin new."*

**This is pass one and it is not finished.** Nothing here is installed, vendored,
wired, or ranked. Routing is the hand's; a tile with no mark is a tile in the
soil, and blank is a complete state.

---

## 0 · WHAT THIS SWEEPS, AND WHY IT IS NOT THE SAME SWEEP AS THE LAST ONE

Two documents already stand next to this and neither one covers the ask:

- **`THE_HAND.md`** extracted every mechanism *this corpus has already described*
  for acting on a visible field. It reads inward.
- **`DEPOSITS_FROM_THE_COMMONS.md`** swept the commons **per seat** — a tile for
  ↓TANK, a tile for ↓GROUND, a tile for ↑LENS.

**This sweeps per VERB.** The gap it aims at is the one the reconciliation
found: `THE_VISION.md` § 2 calls SHAPE *"the part that is actually a game, with
hands and skill in it"*, and the walked build has **no terrain in the save
file** — what persists is `done · kept · routed · seated · shop · off · faces ·
arrived`. The seats exist. The hand's verbs do not.

**The verbs, taken from § 2 and § 4 of the vision and from nothing else:**

```
CARVE     cut a channel, shape the bed
DAM       place it, hold head, open it
FLOOD     send water here and starve there
REMEMBER  the terrain erodes, silts, reshapes — the land is the save file
AIM       the heliostat, bounced past an obstacle into a dark pool
SEAT      a mirror set into the vector equilibrium
GROW      where light and water meet
```

**The house constraint, unchanged and load-bearing:** static HTML + vanilla JS,
served locally · **no package.json, no node_modules, zero dependencies, ever** ·
no asset, no webfont, no image, no audio, no network call — everything drawn.
A candidate arriving as a package is a change of *kind*, not just of weight.

---

## 1 · THE FINDING THAT ORGANISES EVERYTHING ELSE

**The licence line runs straight through the middle of this field, and it is not
where the star counts are.**

Checked this session against the GitHub API, one repository at a time, rather
than assumed from a README badge or a search snippet:

| project | licence | verified how |
|---|---|---|
| **`jobtalle/HydraulicErosion`** | **MIT** | API + repo page |
| **`redblobgames/mapgen4`** | **Apache-2.0** | repo page |
| `weigert/SimpleHydrology` — 738★ | **none** | API |
| `ncase/sight-and-light` — 1,086★ | **none** | API |
| `jasonwebb/morphogenesis-resources` — 2,274★ | **none** | API |
| `tessapower/hydraulic-erosion` | **none** | API — **and this corrects a search snippet that reported MIT.** `DEPOSITS_FROM_THE_COMMONS.md` carries it untagged; it should be read as unlicensed. |
| `matthias-research/pages` (Ten Minute Physics) | **none** — licence endpoint 404s | API |
| `gre/illuminated.js` | **NOASSERTION**, and **archived** | API |
| `Hartrik/sand-game-js` | **explicitly not open source** — see § 6 | the author's own licence file |

**No licence file means all rights reserved.** Not "probably fine", not
"public because it's on GitHub". Six of the nine best-fitting things in this
field are published without a grant.

### And the distinction that saves the ask

**The algorithm is readable; the code is not takeable.** These projects publish
their *method* in the open — as blog posts, papers and tutorials written to be
implemented — and the method is not the thing a licence covers.

> **So for several of the hand's verbs the lawful move is: implement the
> published description.** That is not inventing. It is the same act as taking a
> library, minus the grant you were never given — and against this build's
> zero-dependency house style it is frequently the *cheaper* act as well, because
> a published 20-line method costs less than a vendored engine.

This is the same shape the last sweep already found once and named as *"one of
the few places where the wheel is smaller than the cart"* — there, about the
jitterbug. It turns out to be the general condition of this field, not a special
case.

---

## 2 · REMEMBER — erosion, and the land as the save file

**The best-supplied verb, and the one the build has none of.**

### The clean take

| tile | carries | licence | conf |
|---|---|---|---|
| **`jobtalle/HydraulicErosion`** | droplet/"snowball" erosion **running in the browser, JavaScript, no build step**, `index.html` + `js/` + `css/`. 286 KB, 40★. Its companion article states its own three objectives: *look natural · be simple · be fast* — the same order of priority this build has. | **MIT** | **verified** |

**This is the single best-fitting artifact found in the whole pass.** Vanilla JS,
browser-native, MIT, no build step, and small. It is the only candidate that can
be taken *as code* without breaking either the licence line or the dependency
line.

### The unlicensed method, which is still available as method

| tile | carries | licence | conf |
|---|---|---|---|
| **Nick McDonald — particle-based hydraulic erosion** (`nickmcd.me`, 2020–2023) | the reference treatment of the technique, published as a worked description in four articles, extended to streams, pools and **meandering rivers**. Two laws only: a **Particle Motion Law** and a **Mass Transfer Law**, ~20 lines of erosion math. | article: published to be implemented · **code (`weigert/SimpleHydrology`, C++, 738★): none** | **verified** (licence) · named (method) |

> The most-starred thing in the field is C++ and unlicensed. Its *method* is the
> most thoroughly written-up in the field. Take the second, not the first.

### Refused, with the reason

`tessapower/hydraulic-erosion` (TypeScript, Three.js, **48 MB**, unlicensed) and
`huw-man/Interactive-Erosion-Simulator-on-GPU` (GPU/WebGL) both fail the
dependency line before the licence line is reached — Three.js is a change of
kind. Kept named rather than dropped, because the first exists specifically to
*compare erosion algorithms side by side*, which makes it worth **reading** even
though it cannot be taken.

---

## 3 · DAM and FLOOD — head, release, and where the water goes

| tile | carries | licence | conf |
|---|---|---|---|
| **Height-field water** — *Ten Minute Physics* tutorial 20, Matthias Müller | water as **an array of columns, each with a height and a velocity.** Simple, fast, trivially surfaced. Its stated limits are exactly the ones this game does not need: no overturning waves, no splashes. The demos are **self-contained single HTML documents with no dependencies** — the house style, arrived at independently. | **repo carries none** — read the tutorial, write the loop | **verified** (licence) · named (method) |
| **Shallow-water equations** | the honest model for a dam, because it has a free surface **and a head** — which is the whole of what a dam is for. The velocity-field family the erosion sims run on. | published field, many implementations | field |

> **Why height-field is the fit and particle fluid is not.** A dam mechanic needs
> *head* — water piling up behind something — and a height field gives that in one
> number per column. It also composes directly with § 2: an erosion heightmap and
> a water heightmap are the same data structure, so CARVE, DAM, FLOOD and REMEMBER
> can share one grid instead of four systems.

**The collision, named rather than smoothed:** the Ten Minute Physics demos match
this build's house style more exactly than anything else found — single file,
vanilla, no dependencies, a few lines of JS — **and they carry no licence.** The
best stylistic fit in the field is the one that cannot be copied. The tutorial and
its PDF exist to be implemented from; that is the route.

---

## 4 · CARVE — the hand shapes the bed and the water answers

| tile | carries | licence | conf |
|---|---|---|---|
| **`redblobgames/mapgen4`** | **a painting interface where you shape terrain and rivers re-route in real time as you paint.** Explicitly built to *"run fast enough to regenerate in real time as you paint"*. This is the closest thing found to the dam hand as the vision describes it. | **Apache-2.0** | **verified** |

**Its cost, stated plainly and it is real:** node + npm/pnpm + esbuild + a
TypeScript build, and five vendored dependencies (Delaunator ISC ·
fast-2d-poisson-disk-sampling MIT · simplex-noise MIT · flatqueue ISC ·
gl-matrix MIT). Every licence is clean. **Every one of them is a dependency, and
this build has never taken one.**

> So mapgen4 is the one candidate where the licence is fine and the *kind* is
> wrong. It is also Voronoi/Delaunay-based where §§ 2–3 are grid-based, so its
> code would not compose with them anyway. **Read it for the interaction grammar
> — paint, re-route, immediately — and take the grammar, not the graph.**

---

## 5 · AIM and SEAT — the heliostat

**Aiming a mirror past an obstacle into a dark pool is a visibility-polygon
problem, and it is among the most solved problems in 2D game code.** The
difficulty here is entirely licensing, not technique.

| tile | carries | licence | conf |
|---|---|---|---|
| **Red Blob Games — 2D visibility** (Amit Patel) | the additive sweep algorithm: cast rays only where walls begin and end. Written as a teaching article with interactive diagrams. **Patel licenses his code Apache-2.0 across his repositories** — `mapgen4`, `mapgen2`, `circular-obstacle-pathfinding` all verified Apache-2.0 this session — so this is the one author in the field with a consistent, checkable grant. | **Apache-2.0** across his repos · the visibility article's own repo not yet checked | **partly verified — finish this** |
| **`ncase/sight-and-light`** — 1,086★ | the canonical explainer: rays to segment endpoints plus two offset rays. HTML, browser, tiny. | **none** | **verified** |
| `gre/illuminated.js` | 2D lights and shadows on HTML5 canvas, drop-in | **NOASSERTION · archived** | **verified** |

> **`SEAT` has no tile and should not have one.** Seating a mirror is a hand-act;
> every candidate the field offers for it is placement *logic*. Same shape the
> last sweep found at ↓FILTER and ↑SEATING — *a seat with no tributary is not
> always a gap.* Carried forward unchanged.

**Reflection specifically:** visibility gives you *what the light reaches*. A
mirror needs one more step — reflect the ray about the surface normal and
re-cast. That is four lines and no library offers it as a unit.

---

## 6 · THE ONE REFUSAL WITH TEETH

**`Hartrik/sand-game-js`** — a fast, mature falling-sand engine for desktop and
mobile browsers, WebGL 2, sand/soil/water/fire. Mechanically it is a very good
match for a material field a hand acts on with no words attached.

**It is not open source, in its author's own words.** Its licence file states it
is *not open-source software in the legal sense*, that publishing distributions
or derivative works is not automatically permitted, and that the restriction
exists to protect a commercial product.

Named here rather than quietly dropped, because it will keep surfacing in any
search for this capability and a future sweep should not have to re-discover the
licence. **The falling-sand family generally is worth a second look** —
`The Powder Toy` is GPL-3.0, which is a real grant but a copyleft one and
therefore a decision about what `nesi.exe` may be, not a technical question.

---

## 7 · WHAT THIS PASS DID NOT REACH

Said out loud rather than left as an implied completeness:

- **GROW** — where light and water meet. `DEPOSITS_FROM_THE_COMMONS.md` already
  names the tiles (reaction-diffusion, space colonization, Algorithmic Botany);
  **none of their licences are checked**, and the one index repo that was checked
  (`morphogenesis-resources`, 2,274★) has none.
- **The Red Blob visibility article's own repository** — the author's other four
  repos are Apache-2.0; this one was not individually confirmed.
- **The direct-manipulation grammar itself** — how a hand grabs, drags, carves and
  releases with no text on screen. This is what `sorting_tarp.gd` was asking for
  in 2026-08-06 (*"a button that folds a sorting tarp doesnt need language
  processing"*), and it is a different literature from the simulation literature.
  Not swept.
- **The Powder Toy's GPL question**, which is Kevin's and not a research finding.
- **Nothing was run.** Every claim here is about a licence, a description, or a
  file listing. No candidate has been executed, ported, or benchmarked against
  this build.

---

## 8 · WHERE THIS LEAVES THE ASK

Kevin's instruction was *use open source software rather than inventing anything
new.* Held against what the field actually contains:

**One thing can be taken as code** — `jobtalle/HydraulicErosion`, MIT, vanilla
JS, browser, no build step. It lands directly on REMEMBER, the emptiest and
best-supplied verb.

**Three things can be taken as method, lawfully and cheaply** — height-field
water (columns of height + velocity), particle erosion (two laws, ~20 lines),
and visibility-with-reflection. All three are published to be implemented, all
three are grid-native, and all three compose on one shared heightmap.

**One thing can be taken as grammar and not as code** — mapgen4's paint-and-
re-route interaction, which is the dam hand already working, in a codebase whose
kind this build has never admitted.

**And one verb should stay empty** — SEAT, on the same law that empties ↓FILTER.

> The shortage was never invention, and this pass says something narrower: **the
> shortage is not even implementation. It is the grant.** The commons has built
> every one of these verbs. It has licensed about a third of them.
