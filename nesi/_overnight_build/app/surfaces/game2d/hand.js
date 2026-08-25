/* ═══════════════════════════════════════════════════════════════════════════
   THE HAND — the bed, and what the hand does to it
   Built 2026-08-16 on Kevin's mark: "build the hand", and before it
   "both, in order" — the height-field method first, the erosion on top.

   WHAT THIS IS FOR. `THE_VISION.md` § 2 calls SHAPE "the part that is actually
   a game, with hands and skill in it" — carve channels, place and open dams,
   flood one region and starve another, and "the terrain remembers — every
   choice erodes, silts, reshapes. THE LAND IS THE SAVE FILE."

   None of that existed. The walk of 2026-08-16 found what actually persisted
   in `ascent.html`: `done · kept · routed · seated · shop · off · faces ·
   arrived` — progress and his sentences. No terrain at all. ↓DAM's head was a
   scalar behind a `fillRect`, and ↓CHANNEL stored a polyline that nothing ever
   flowed down. The gestures were there and there was nothing under them.

   This is the something under them. One body: a row of columns, each with a
   bed height, a depth of water standing on it, and what that water carries.

   ─── FROM THE COMMONS, NOT INVENTED ────────────────────────────────────────
   `THE_HAND_FROM_THE_COMMONS.md` swept this field and found the licence line
   runs through the middle of it — six of the nine best-fitting projects are
   published with no grant at all. So this is built the way that sweep said was
   lawful and cheap: FROM THE PUBLISHED METHOD, which no licence covers.

     · HEIGHT-FIELD WATER — Matthias Müller, "Ten Minute Physics" tutorial 20.
       Water as an array of columns, each carrying a height and a velocity.
       Simple, fast, trivially surfaced. Its stated limits are precisely the
       ones this game does not need: no overturning waves, no splashes. The
       repository carries no licence; the tutorial exists to be implemented
       from, and that is what happened here.

     · PARTICLE EROSION — Nick McDonald, nickmcd.me, 2020–2023. Two laws and
       nothing else: a MOTION law and a MASS-TRANSFER law, about twenty lines
       of arithmetic. Reduced here from a wandering droplet to a column, which
       is the same transfer written where the water already is.

   The one thing that could have been taken as code — `jobtalle/Hydraulic-
   Erosion`, MIT, vanilla JS — is a top-down heightmap on a 2D grid. This world
   is drawn side-on, in bands of sky and ground. A row of columns IS the
   side-on case, so the MIT code would have had to be bent into a shape its own
   author did not write it for. Taking the method and leaving the code is not a
   refusal of the grant; it is the grant not fitting. It stays available and
   named, for the day a top-down surface wants it.

   ─── WHAT IS LOAD-BEARING HERE ─────────────────────────────────────────────

   NOTHING IN THIS FILE IS RANDOM. Not the bed's own starting shape, not where
   a deep falls, not what erodes. `ascent.html` already learned this once and
   wrote it down: THE GROUND DECIDES, NOT A COIN — a sounding's outcome was
   `Math.random()<0.25` until 2026-08-14, so nothing the hand had given the
   world determined anything. Same law here. Run it twice from the same bed
   with the same hand and you get the same land, and `hand_check` asserts it.

   MASS IS CONSERVED AND THAT IS THE WHOLE POINT. Erosion does not destroy the
   bed and deposition does not invent it — every grain that leaves the bed is
   in the water, and every grain that leaves the water is in the bed. This is
   what makes "nothing you release is wasted; it comes back as ground" a fact
   about the arithmetic rather than a promise in prose.

   STILLNESS IS DEPOSITION, AND IT FELL OUT RATHER THAN BEING ADDED. Carrying
   capacity is a function of how much water actually moved. Still water moves
   none, so its capacity is zero, so it must put down everything it holds.
   ↑THE OVERWINTERING's law — "a thousand releases in one afternoon root
   nothing" — and ↓GROUND's `wait` are the same sentence as this line of
   arithmetic. No separate settling rule was written; there was nothing left to
   write.

   NO NUMBER IN HERE EVER REACHES A PLAYER. This file is a substrate and hands
   numbers to code alone. What a hand sees is form — where the land is, how
   high the water stands, how thick the haze is. Law 2 is not this file's to
   keep, but nothing here makes it harder to keep.

   ═══════════════════════════════════════════════════════════════════════════ */

/* ═══ EVERYTHING IN HERE IS PRIVATE, AND THAT IS NOT TIDINESS ════════════════
   A `<script src>` in a browser shares one global scope with every other one.
   This file and `ascent.html` both wanted a helper called `clamp01`, and two
   `const`s of the same name in that shared scope is a SyntaxError that kills the
   whole of `ascent.html` before a line of it runs — a blank world, from a name
   collision in a utility.

   Every node instrument passed it, because `require()` hands each file its own
   scope and the two names never met. The browser is where they meet, and it is
   the only place that could have caught it. So: one name leaves this file, and
   it is `HAND`. */
(function(){

/* THE WIDTH OF THE WORLD, in columns. Ninety-six is chosen against two real
   limits and nothing else: it must read as land rather than as a bar chart
   when drawn a few pixels wide, and the whole bed must sit in localStorage
   beside his writing without crowding it. Quantized on the way out (see
   `pack`), a bed of this width is a few hundred bytes. */
const N = 96;

/* The constants of the world. Each one is a rate, and every one of them was
   tuned by watching the bed rather than by argument.

   FLOW   how much of a column's height difference becomes movement in a tick
   DAMP   what a tick keeps of the last tick's motion — the water's memory
   CARRY  how much the moving water can hold per unit of movement
   BITE   how fast the bed gives way when the water has room to carry more
   DROP   how fast the water lets go of what it can no longer hold
   WET    below this depth the ground is damp, not flowing, and carries nothing */
const FLOW = 0.34, DAMP = 0.88, CARRY = 0.35, BITE = 0.05, DROP = 0.09, WET = 0.004;

/* NO SINGLE TICK MAY TAKE MORE THAN THIS FRACTION OF A COLUMN'S BED. The
   erosion guard, and it was earned: with the first constants a full column of
   water gave a carrying capacity several times the height of the land under it,
   so one tick removed most of a column. The water then sat in the pit it had
   just blasted, which read on the instrument as "the channel does nothing" —
   the water was not failing to travel, it had dug itself a hole at the pour and
   fallen in. Erosion is a slow sculptor or it is not erosion. */
const BITEMAX = 0.0025;

/* A column may never hand over more than this fraction of what it is holding in
   a single tick. THE STABILITY CLAMP, and it is not a fudge: without it a steep
   step moves more water than the column contains, the depth goes negative, and
   the next tick reads that as a hole and accelerates into it. The published
   method names this as the thing that must be bounded. Bounding it here means
   the water can always be drawn, because it is always a real depth. */
const GIVE = 0.5;

const clamp01 = v => v < 0 ? 0 : v > 1 ? 1 : v;

/* ── THE BED, AT REST ────────────────────────────────────────────────────────
   A closed-form shape, not noise. It is a slope from left to right — so water
   has somewhere to go before a hand touches anything — with two long swells
   across it, so there is already something to cut with or against. A hand
   arriving in a room for the first time meets land that has a grain, and
   nothing tells it which way the grain runs.

   AND IT FALLS EVERYWHERE. THE SWELLS ARE GRAIN, NEVER BASINS. The first
   version of this line had swells of 0.045 and 0.018 against a fall of 0.20,
   and the arithmetic of that is a bed with closed hollows in it: a swell's own
   slope (amplitude × frequency) was larger than the ground's, so the land ran
   uphill in places. Water poured into it filled the nearest accidental dip and
   sat there — the check caught it as "the channel does nothing", and a cut bed
   and an uncut bed held the same water to two decimal places.

   That was not a tuning error, it was the wrong world. A hollow nobody dug is a
   pool nobody made, and this game's whole claim is that the land is what the
   hand did to it. So the amplitudes are now bounded by the fall: the steepest
   the swells can pull is 0.016×5.6 + 0.006×13.1 = 0.168, against 0.20, so the
   bed descends at every single column and **every pool in the world is one the
   player made** — by cutting, or by holding a gate. `hand_check` asserts the
   monotonicity directly, so nobody can quietly put the hollows back. */
function rest(i) {
  const t = i / (N - 1);
  return 0.46 - t * 0.20
       + Math.sin(t * 5.6) * 0.016
       + Math.sin(t * 13.1 + 1.7) * 0.006;
}

function make(n) {
  const w = n || N;
  const f = { n: w, bed: new Array(w), water: new Array(w),
              vel: new Array(w), silt: new Array(w), flux: new Array(w) };
  for (let i = 0; i < w; i++) {
    f.bed[i] = clamp01(rest(i)); f.water[i] = 0;
    f.vel[i] = 0; f.silt[i] = 0; f.flux[i] = 0;
  }
  return f;
}

/* ── ONE TICK ────────────────────────────────────────────────────────────────
   Three passes in a fixed order, and the order is the physics: water moves,
   then what it carries moves with it, then the bed and the water settle their
   account. Doing the account before the movement would let a column erode on
   water that has already left it. */
function step(f, dt) {
  const k = Math.min(2.2, (dt || 16) / 16);          /* a long frame is capped, never skipped */
  const n = f.n;

  /* THE GATE IS READ HERE AND WRITTEN NOWHERE. It stands as extra height at one
     column for as long as a hand holds it, and the bed underneath is untouched
     — so lowering it gives the land back exactly as it was, and a dam leaves no
     scar unless the water cut one. A gate that edited the bed would be a hand
     building terrain, which is a different act from holding water back. */
  const top = i => f.bed[i] + ((f.gateH > 0 && i === f.gateAt) ? f.gateH : 0);

  /* 1 · FLOW. The surface is bed plus water; water goes downhill in the
     surface, never in the bed. That single line is why a dam works at all —
     pile water up and its own surface is what pushes back.

     EVERY COLUMN IS READ BEFORE ANY COLUMN IS WRITTEN, and that is not a
     style choice. The first version moved water in place as it walked the row,
     so a column that had just received water gave it straight on, and a single
     pulse crossed the whole world in one tick — rightward only, because that is
     the direction the loop happens to run. The instrument caught the result as
     water standing at column 18 after it had already reached column 88: it was
     not flowing back uphill, the scheme was manufacturing waves and reflecting
     them off the ends. The published method computes the whole field from one
     snapshot and then applies it, which is symmetric and stable, and that is
     what this does. */
  const surf = new Array(n);
  for (let i = 0; i < n; i++) surf[i] = top(i) + f.water[i];

  const q = new Array(n).fill(0);
  for (let i = 0; i < n - 1; i++) {
    f.vel[i] = (f.vel[i] + (surf[i] - surf[i + 1]) * FLOW * k) * DAMP;
    q[i] = f.vel[i] * k * 0.5;
  }

  /* THE STABILITY CLAMP, applied to a column's WHOLE outgoing account rather
     than to one edge at a time. A column can be asked to give in both
     directions at once, and clamping each edge on its own still lets the pair
     of them empty it past zero — which is the failure the depth can never
     recover from, because the next tick reads a negative depth as a hole and
     accelerates into it. */
  for (let i = 0; i < n; i++) {
    const out = (q[i] > 0 ? q[i] : 0) + (i > 0 && q[i - 1] < 0 ? -q[i - 1] : 0);
    const room = f.water[i] * GIVE;
    if (out > room && out > 0) {
      const s = room / out;
      if (q[i] > 0) q[i] *= s;
      if (i > 0 && q[i - 1] < 0) q[i - 1] *= s;
    }
  }

  for (let i = 0; i < n - 1; i++) { f.water[i] -= q[i]; f.water[i + 1] += q[i]; f.flux[i] = q[i]; }
  f.flux[n - 1] = 0;

  /* 2 · WHAT THE WATER CARRIES GOES WITH THE WATER. Without this the silt
     erodes and deposits in the same column forever, and nothing you let go of
     ever comes back anywhere else — which is the one promise the whole world
     is built on. Carried as a share of the column's depth, so water that is
     half of a column takes half of what that column holds. */
  for (let i = 0; i < n - 1; i++) {
    const q = f.flux[i];
    if (q > 0) { const src = f.water[i] + q;
      if (src > WET) { const m = f.silt[i] * Math.min(1, q / src); f.silt[i] -= m; f.silt[i + 1] += m; } }
    else if (q < 0) { const src = f.water[i + 1] - q;
      if (src > WET) { const m = f.silt[i + 1] * Math.min(1, -q / src); f.silt[i + 1] -= m; f.silt[i] += m; } }
  }

  /* 3 · THE ACCOUNT BETWEEN THE BED AND THE WATER. Capacity is set by how much
     water actually MOVED, not by how much is standing — a deep still pool
     carries nothing, and a thin fast run carries a great deal. Both of those
     are true of rivers and both matter to the hand: holding water behind a gate
     is not the same act as letting it run.

     THE TWO BRANCHES ARE THE WHOLE OF EROSION. Under capacity, the water takes
     from the bed. Over capacity, it puts back. Nothing is created in either. */
  for (let i = 0; i < n; i++) {
    const moved = (Math.abs(f.flux[i]) + Math.abs(i ? f.flux[i - 1] : 0)) * 0.5;
    const cap = f.water[i] > WET ? CARRY * moved : 0;
    if (f.silt[i] < cap) {
      const take = Math.min((cap - f.silt[i]) * BITE * k, f.bed[i], f.bed[i] * BITEMAX * k);
      f.bed[i] -= take; f.silt[i] += take;                       /* the bed goes into the water */
    } else {
      const give = (f.silt[i] - cap) * DROP * k;
      f.silt[i] -= give; f.bed[i] += give;                       /* and the water gives it back */
    }
  }
  return f;
}

/* ── WHAT THE HAND DOES ──────────────────────────────────────────────────────
   Three acts, and they are the three verbs the world already has. No fourth,
   and no fifth gesture: `draw` cuts, `hold` gates, and `wait` is not a call at
   all — it is what happens in `step` when the hand does nothing, which is the
   honest way to build a verb whose whole content is not acting. */

/* CARVE — the hand draws across the bed and the bed goes down under it.
   `at` and `to` are column positions; `depth` is how deep this stroke cuts.

   THE SPOIL GOES ON THE BANKS, AND THAT IS THE WHOLE OF WHY THIS WORKS. The
   first version put what was cut into `silt` in the same columns — the land
   lifted into suspension, sitting directly over the hole it came out of. On dry
   ground still water carries nothing, so on the very next tick every grain of
   it deposited straight back down, and the channel filled itself in before any
   water arrived. The instrument read it as "a cut bed and an uncut bed hold the
   same water", identical to four decimal places at every damping value I swept
   — which was the right answer to the wrong question: nothing was wrong with
   the flow, the cut was simply not there any more.

   A spade does not leave the spoil hovering in the hole. It goes on the bank.
   So the stroke's whole take is piled on the two columns just outside it, which
   is mass-conserving, and which makes a dug channel hold MORE than the depth of
   its own cut — the banks are part of what a hand builds. Dig at the edge of
   the world and it all goes on the one side there is. */
/* `banks` names the columns the spoil is piled on, and a dragging hand MUST
   pass it. Left to the default, a stroke that advances one column at a time
   piles each increment's spoil onto the very column the next increment cuts,
   and the trench cancels itself out along its whole length — the walk found
   exactly that: the bed had moved, both ends had heaps, and the middle of a
   thirty-column drag was untouched to the last bit. A stroke's spoil belongs
   outside the STROKE, not outside each step of it. */
function carve(f, at, to, depth, banks) {
  const a = Math.max(0, Math.min(f.n - 1, Math.round(Math.min(at, to))));
  const b = Math.max(0, Math.min(f.n - 1, Math.round(Math.max(at, to))));
  let spoil = 0;
  for (let i = a; i <= b; i++) {
    /* the ends of a stroke cut less than its middle, so a channel has a floor
       that falls away rather than a pit with walls, and two strokes side by side
       make one valley instead of two holes */
    const e = (b === a) ? 1 : 1 - Math.abs((i - (a + b) / 2) / ((b - a) / 2 + 1e-9));
    const cut = Math.min(f.bed[i], depth * (0.35 + 0.65 * e));
    f.bed[i] -= cut; spoil += cut;
  }
  /* THE SPOIL GOES ON THE DOWNHILL LIP, AND ONLY THERE. Split across both ends
     it made every trench a moat: the land falls to the right at every column
     (see `rest`), so water always arrives from the left, and a heap on the left
     is a wall across the inflow. Dug a hollow, poured water above it, and the
     hollow stayed dry — correct as physics, useless as a hand, and in one
     dimension there is no flowing around a heap the way there would be in two.

     Piled downhill it is a check dam, which is what this earthwork actually is:
     you dig a swale and throw the spoil on the far lip, and the hollow catches
     what comes at it. One mechanic, two things at once — the cut deepens the
     catch and the heap raises its wall. */
  /* THE HEAP SPREADS, AND IT NEVER CLAMPS. Piling a whole stroke's spoil onto
     one column ran it into the ceiling of the world, and `Math.min(1, …)` then
     deleted the difference without a word — the conservation row caught it, and
     that is the only reason it is not still in here. A heap that will not fit
     runs on downhill to the next column, and if it reaches the edge of the world
     with anything left it goes into suspension rather than nowhere. Mass leaves
     this function exactly as it came in. */
  let start = (banks && banks.length ? Math.round(banks[banks.length - 1]) : b + 1);
  if (start <= b) start = b + 1;
  let left = spoil, i = Math.max(0, start);
  while (left > 1e-12 && i < f.n) {
    const room = 1 - f.bed[i];
    const put = Math.min(left, room);
    f.bed[i] += put; left -= put; i++;
  }
  if (left > 1e-12) f.silt[f.n - 1] += left;    /* the edge of the world: it stays in the water */
  return f;
}

/* GATE — the dam. A gate is not a separate object in the world; it is the bed,
   raised by a hand and held there. Let go and it comes down, and the head that
   gathered behind it is real water that now has somewhere to be.

   THAT IS WHY THE RELEASE ERODES AND THE HOLDING DOES NOT. Nothing here says
   "a release erodes". Held water does not move, so it carries nothing; the same
   water let go moves hard, so it carries a great deal. The dam's own line in
   `ascent.html` — "power comes at the release" — is now a consequence of the
   arithmetic instead of a caption on a spinning wheel. */
function gate(f, at, height) {
  f.gateAt = Math.max(0, Math.min(f.n - 1, Math.round(at)));
  f.gateH = Math.max(0, height || 0);
  return f;
}

/* POUR — water arrives. Nothing about where it came from is recorded and
   nothing about it is read: this is the fact of writing arriving as weather,
   and the only thing that crosses is an amount. */
function pour(f, at, amount) {
  const i = Math.max(0, Math.min(f.n - 1, Math.round(at)));
  f.water[i] += Math.max(0, amount);
  return f;
}

/* ── THE ACCOUNTS, FOR THE INSTRUMENT ────────────────────────────────────────
   Two sums, and every law this file claims is a statement about one of them.
   `land` is bed plus what is in suspension — erosion moves mass between the
   two and must never change their total. `sea` is the water itself — flow
   moves it along the row and must never change how much there is. */
const land = f => f.bed.reduce((a, b) => a + b, 0) + f.silt.reduce((a, b) => a + b, 0);
const sea  = f => f.water.reduce((a, b) => a + b, 0);

/* ── THE SAVE FILE ───────────────────────────────────────────────────────────
   THE LAND IS THE SAVE FILE, so this is the save file. Quantized to thousandths
   on the way out: the difference is far below anything a hand can see or a
   stroke can place, and it keeps the whole bed to a few hundred bytes beside
   his writing rather than a wall of float noise.

   WATER AND SILT ARE NOT SAVED, AND THAT IS LAW 8. "The world runs while you
   are in it and stops when you leave." What the water was doing at the moment
   you closed the tab is not a thing the world keeps; what it had already made
   of the land is. Come back and the bed is exactly as you left it, dry. */
function pack(f) { return f.bed.map(v => Math.round(clamp01(v) * 1000)); }

function unpack(a) {
  const f = make(Array.isArray(a) && a.length ? a.length : N);
  if (Array.isArray(a)) for (let i = 0; i < f.n; i++) f.bed[i] = clamp01((+a[i] || 0) / 1000);
  return f;
}

const HAND = { N, FLOW, DAMP, CARRY, BITE, DROP, WET, GIVE,
               rest, make, step, carve, gate, pour,
               land, sea, pack, unpack, clamp01 };

if (typeof window !== "undefined") window.HAND = HAND;
if (typeof module !== "undefined") module.exports = HAND;

})();
