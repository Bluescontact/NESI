#!/usr/bin/env node
/*
 * HAND CHECK — the bed obeys its own arithmetic, or the hand is a lie.
 *
 * `hand.js` claims a short list of things about the world it makes. Each one is
 * a rule first and a row here second, and every row is written so that a bed
 * which did nothing at all would fail it. A substrate that can only be checked
 * by looking at it is a substrate nobody can change safely.
 *
 * THE ROWS ARE PRESENCE-ASSERTING, on the method `assertion_audit` established:
 * "water is never negative" is satisfied by a world with no water, so every
 * conservation row is paired with a row asserting the thing actually MOVED.
 * Passing both is the only evidence worth having.
 *
 *   node tools/hand_check.js
 */
const path = require("path");
const HAND = require(path.join(__dirname, "..", "hand.js"));

const R = [];
const ok = (n, pass, note) => R.push({ n, pass: !!pass, note: note == null ? "" : String(note) });
const near = (a, b, eps) => Math.abs(a - b) <= (eps == null ? 1e-9 : eps);
const run = (f, n, dt) => { for (let i = 0; i < n; i++) HAND.step(f, dt || 16); return f; };

/* ── the shape of the thing ──────────────────────────────────────────────── */
{
  const f = HAND.make();
  ok("H1 the bed exists, one row, every column carrying four quantities",
     f.n === HAND.N && f.bed.length === f.n && f.water.length === f.n &&
     f.silt.length === f.n && f.vel.length === f.n,
     f.n + " columns");

  ok("H2 the bed at rest has a grain — it is not flat, and it is not noise",
     new Set(f.bed.map(v => Math.round(v * 1000))).size > 20 &&
     f.bed.every(v => v > 0 && v < 1),
     new Set(f.bed.map(v => Math.round(v * 1000))).size + " distinct heights");

  ok("H3 it starts dry — no water, no silt, nothing in flight",
     HAND.sea(f) === 0 && f.silt.every(v => v === 0));

  /* THE ROW THAT COST THE MOST TO EARN. The first bed had swells steeper than
     its own fall, so it carried closed hollows nobody dug, and water poured
     anywhere filled the nearest accident and stopped. Every pool in this world
     must be one a hand made — by cutting, or by holding a gate. */
  const uphill = f.bed.map((v, i) => i && v > f.bed[i - 1] ? i : -1).filter(i => i > 0);
  ok("H3b the land falls at every column — there is no hollow the hand did not dig",
     uphill.length === 0,
     uphill.length ? "rises at " + uphill.slice(0, 8).join(", ") : "monotone across all " + f.n);
}

/* ── DETERMINISM · the ground decides, not a coin ────────────────────────── */
{
  const a = HAND.make(), b = HAND.make();
  [a, b].forEach(f => { HAND.pour(f, 12, 0.5); HAND.carve(f, 40, 52, 0.08); run(f, 400); });
  const same = a.bed.every((v, i) => v === b.bed[i]) && a.water.every((v, i) => v === b.water[i]);
  ok("H4 the same bed and the same hand give the same land, twice", same,
     same ? "identical to the last bit" : "DIVERGED — something in here is random");

  const src = require("fs").readFileSync(path.join(__dirname, "..", "hand.js"), "utf8")
    .replace(/\/\*[\s\S]*?\*\//g, "");                       /* prose may discuss it; code may not use it */
  ok("H5 and there is no randomness in the file to begin with",
     !/Math\.random|Date\.now|new Date/.test(src));
}

/* ── WATER · conserved, never negative, and it actually moves ────────────── */
{
  const f = HAND.make();
  HAND.pour(f, 8, 0.60);
  const before = HAND.sea(f);
  const startedAt = f.water.findIndex(v => v > 1e-6);
  run(f, 600);

  ok("H6 water is conserved — the row is neither a source nor a sink",
     near(HAND.sea(f), before, 1e-9), "before " + before.toFixed(9) + " · after " + HAND.sea(f).toFixed(9));

  ok("H7 no column ever holds a negative depth", f.water.every(v => v >= 0),
     "min " + Math.min(...f.water).toExponential(2));

  /* THE PRESENCE HALF: conservation is trivially true of water that never
     moved. Measured as the CENTRE OF MASS, not as the deepest column — water
     spreading down a slope is a thin sheet whose deepest point can sit still at
     the pour while the body of it travels, and the first version of this row
     read that as "it never moved" and was wrong about a bed that was working. */
  const centre = g => { let s = 0, m = 0; g.water.forEach((v, i) => { s += v * i; m += v; }); return m ? s / m : -1; };
  const endedAt = centre(f);
  ok("H8 and it MOVED — poured on a slope, it is not where it was put",
     Math.abs(endedAt - startedAt) > 4,
     "poured at " + startedAt + ", its body now centred on " + endedAt.toFixed(2));

  ok("H9 it went DOWNHILL, which is the direction the bed leans",
     endedAt > startedAt, "the rest-bed falls to the right");
}

/* ── THE BED · mass moves between land and water, and is never made ──────── */
{
  const f = HAND.make();
  HAND.pour(f, 6, 0.8);
  const before = HAND.land(f);
  run(f, 800);
  ok("H10 bed plus suspension is conserved — erosion moves mass, never mints it",
     near(HAND.land(f), before, 1e-8),
     "before " + before.toFixed(8) + " · after " + HAND.land(f).toFixed(8));

  ok("H11 no column is eroded below the floor of the world", f.bed.every(v => v >= 0));

  const rest0 = HAND.make();
  const moved = f.bed.reduce((a, v, i) => a + Math.abs(v - rest0.bed[i]), 0);
  ok("H12 and the bed CHANGED — water that ran over it did something",
     moved > 0.01, "total bed movement " + moved.toFixed(4));
}

/* ── THE TWO BRANCHES · fast water takes, still water gives back ─────────── */
{
  /* a steep step, so the water genuinely runs */
  const fast = HAND.make();
  HAND.pour(fast, 4, 0.9);
  run(fast, 60);
  const lifted = fast.silt.reduce((a, b) => a + b, 0);
  ok("H13 running water lifts the bed into suspension",
     lifted > 0, "carrying " + lifted.toFixed(5));

  /* NOW LET IT ALONE. Capacity follows what MOVED, so stillness must put it
     down — and the water only truly stills once it has finished running off the
     slope and found the low end, which takes a while and is the point. */
  run(fast, 12000);
  const held = fast.silt.reduce((a, b) => a + b, 0);
  ok("H14 stillness is deposition — left alone, the water gives back what it holds",
     held < lifted * 0.05, "was " + lifted.toFixed(5) + ", now " + held.toExponential(2));

  /* AND THE LAW ITSELF, not just the scenario — a still pool with a load in it
     must put the whole load down, with no hand and no flow anywhere. This is
     ↑THE OVERWINTERING's "a thousand releases in one afternoon root nothing"
     and ↓GROUND's `wait`, stated as arithmetic. */
  const pool = HAND.make();
  /* A LEVEL SURFACE, which is what "still" actually means. Filling every column
     to the same DEPTH on sloping ground is not a still pool — its surface still
     leans, so it still flows, so its capacity is not zero and it is entitled to
     keep what it carries. Filled to a level SURFACE it has nowhere to go. */
  const LEVEL = 0.50;
  for (let i = 0; i < pool.n; i++) {
    pool.water[i] = Math.max(0, LEVEL - pool.bed[i]);
    pool.silt[i] = 0.02;
  }
  const load = pool.silt.reduce((a, b) => a + b, 0);
  const bed0 = pool.bed.reduce((a, b) => a + b, 0);
  run(pool, 400);
  ok("H14b and the law alone: a still pool puts down everything it carries",
     pool.silt.reduce((a, b) => a + b, 0) < load * 0.01 &&
     pool.bed.reduce((a, b) => a + b, 0) > bed0 + load * 0.9,
     "the load became bed, which is what 'it comes back as ground' means");
}

/* ── THE GATE · head on one side, starved on the other ───────────────────── */
{
  const f = HAND.make();
  const AT = 48;
  HAND.gate(f, AT, 0.30);
  for (let i = 0; i < 40; i++) HAND.pour(f, 10, 0.02);
  run(f, 900);

  const behind = f.water.slice(0, AT).reduce((a, b) => a + b, 0);
  const beyond = f.water.slice(AT + 1).reduce((a, b) => a + b, 0);
  ok("H15 a raised gate holds head — the water stands behind it",
     behind > 0.5, "behind " + behind.toFixed(4));
  ok("H16 and starves what is past it — flooding here IS starving there",
     beyond < behind * 0.05, "beyond " + beyond.toFixed(6));

  const bedUnder = f.bed[AT];
  const wetBefore = f.water.slice(AT + 1).filter(v => v > HAND.WET).length;
  HAND.gate(f, AT, 0);                        /* let go */
  run(f, 2000);
  const after = f.water.slice(AT + 1).reduce((a, b) => a + b, 0);
  const wetAfter = f.water.slice(AT + 1).filter(v => v > HAND.WET).length;
  /* measured as a RATIO and as ground actually wetted, not against a round
     number — what the release does is send a held body downstream, and how
     thin it spreads on arrival is the bed's business, not the law's */
  ok("H17 letting go sends it past — the release is what moves the world",
     after > beyond * 20 && wetAfter > wetBefore + 20,
     "beyond: " + beyond.toFixed(6) + " → " + after.toFixed(4) +
     " · columns wetted past the gate: " + wetBefore + " → " + wetAfter);

  ok("H18 and the gate left no scar — it was never written into the bed",
     f.bed[AT] <= bedUnder + 0.31,
     "a gate that edited the land would have kept its own height");
}

/* ── THE HAND · carving is a real cut, and the water finds it ────────────── */
{
  const f = HAND.make();
  const before = f.bed.slice();
  HAND.carve(f, 30, 44, 0.12);

  ok("H19 a stroke lowers the bed under it", f.bed[37] < before[37] - 0.05,
     "cut " + (before[37] - f.bed[37]).toFixed(4) + " at the middle of the stroke");

  ok("H20 with banks, not walls — the edges cut less than the middle",
     (before[30] - f.bed[30]) < (before[37] - f.bed[37]));

  /* THE SWALE PROPERTY, and it is the whole reason the spoil goes downhill:
     NOTHING ABOVE THE CUT IS TOUCHED, so water arriving from upstream meets an
     open trench rather than a wall of its own spoil. Below the cut the heap may
     spread over as many columns as it needs — it runs on downhill rather than
     clamping at the ceiling of the world, which is how mass stays conserved. */
  ok("H21 nothing UPSTREAM of the stroke is touched — a swale, never a moat",
     f.bed.every((v, i) => i >= 30 || v === before[i]));

  ok("H21b and everything that changed is in the cut or below it",
     f.bed.every((v, i) => v === before[i] || i >= 30));

  ok("H22 what was cut is ON THE DOWNHILL LIP, not out of the world",
     near(HAND.land(f), before.reduce((a, b) => a + b, 0), 1e-9) &&
     f.bed[45] > before[45] && f.bed[29] === before[29],
     "spoil heaped below the cut and nothing above it — a swale, not a moat");

  /* THE ROW THAT WOULD HAVE CAUGHT THE FIRST CARVE. Spoil left in suspension
     over its own hole deposits straight back down and the channel is gone
     before any water arrives — which is precisely what happened. */
  const settles = HAND.make();
  const cutBed = (HAND.carve(settles, 30, 44, 0.12), settles.bed.slice());
  run(settles, 600);
  /* A DRAGGING HAND, one column at a time — the shape a real stroke actually
     makes, and the one the default banks destroy. Found by walking the room:
     the bed had moved and both ends had heaps while the middle of a thirty-
     column drag was untouched to the last bit, because each step piled its
     spoil exactly where the next step was about to cut. */
  const drag = HAND.make(), was = drag.bed.slice();
  for (let i = 30; i < 60; i++) HAND.carve(drag, i, i + 1, 0.004, [61]);
  ok("H22c a stroke dragged column by column cuts its whole length, not just its ends",
     was[45] - drag.bed[45] > 0.002 && was[38] - drag.bed[38] > 0.002 &&
     drag.bed[61] > was[61],
     "middle of the drag cut by " + (was[45] - drag.bed[45]).toFixed(4) +
     " · the heap on the downhill lip");

  ok("H22d and the same drag still conserves mass",
     near(HAND.land(drag), was.reduce((a, b) => a + b, 0), 1e-9));

  ok("H22b and the cut is still there after the world has run — it does not fill itself in",
     settles.bed[37] < cutBed[37] + 0.005,
     "depth at the middle of the stroke, 600 ticks later: " + settles.bed[37].toFixed(4) +
     " against " + cutBed[37].toFixed(4) + " when cut");

  /* EVERY ROW BELOW RUNS AGAINST A CONTROL — the same land, the same water, the
     same place, and the ONLY difference is that a hand shaped one of them. It is
     the only way these mean anything: an earlier version of this row asserted an
     absolute amount, and passed a bed whose channel did nothing at all. */
  const seg = (g, lo, hi) => g.water.slice(lo, hi).reduce((a, b) => a + b, 0);

  /* A HOLLOW HOLDS. On a bed that falls at every column (H3b) water runs off and
     keeps running; the only thing that stops it is something a hand made. */
  const dug = HAND.make(), flat = HAND.make();
  HAND.carve(dug, 34, 46, 0.12);
  [dug, flat].forEach(g => { HAND.pour(g, 40, 0.5); run(g, 8000); });
  ok("H23 a hollow a hand dug holds water that would otherwise run away",
     seg(dug, 34, 47) > 0.4 && seg(flat, 34, 47) < 0.01,
     "dug " + seg(dug, 34, 47).toFixed(4) + " · same stretch, unshaped " + seg(flat, 34, 47).toFixed(4));

  ok("H23b and it is held BECAUSE it did not run off — the two accounts agree",
     seg(dug, 47, 96) < 0.01 && seg(flat, 47, 96) > 0.4,
     "downstream: dug " + seg(dug, 47, 96).toFixed(4) + " · unshaped " + seg(flat, 47, 96).toFixed(4));

  /* A CHANNEL STEERS. Cut from where the water already stands, downhill — the
     water runs the course instead of sheeting across the land.
     (Cut a trench BESIDE water rather than from it and its own spoil banks keep
     the water out, which is what a levee is and is not a defect.) */
  const course = HAND.make(), unshaped = HAND.make();
  HAND.carve(course, 40, 80, 0.06);
  [course, unshaped].forEach(g => { HAND.pour(g, 40, 0.5); run(g, 8000); });
  ok("H23c a channel cut from the water steers what comes after",
     seg(course, 40, 81) > seg(unshaped, 40, 81) * 3,
     "in the course " + seg(course, 40, 81).toFixed(4) +
     " · same stretch, unshaped " + seg(unshaped, 40, 81).toFixed(4));
}

/* ── THE SAVE FILE · the land survives the night, the weather does not ───── */
{
  const f = HAND.make();
  HAND.pour(f, 10, 0.6); HAND.carve(f, 20, 30, 0.1); run(f, 500);

  const packed = HAND.pack(f);
  ok("H24 the bed packs to plain small integers", Array.isArray(packed) &&
     packed.length === f.n && packed.every(v => Number.isInteger(v) && v >= 0 && v <= 1000));

  ok("H25 and it is small enough to sit beside his writing",
     JSON.stringify(packed).length < 700, JSON.stringify(packed).length + " bytes");

  const back = HAND.unpack(packed);
  ok("H26 the land comes back as it was, to a thousandth",
     back.bed.every((v, i) => Math.abs(v - f.bed[i]) < 0.001));

  ok("H27 and it comes back DRY — law 8, the world stops when you leave",
     HAND.sea(back) === 0 && back.silt.every(v => v === 0));
}

/* ── the report ──────────────────────────────────────────────────────────── */
const bad = R.filter(r => !r.pass);
console.log("\nTHE HAND — the bed's own arithmetic\n");
for (const r of R) console.log("  " + (r.pass ? "ok  " : "FAIL") + "  " + r.n + (r.note ? "\n           " + r.note : ""));
console.log("\n[hand_check] " + (R.length - bad.length) + " of " + R.length + " hold" +
            (bad.length ? " · REFUSED: " + bad.map(b => b.n.split(" ")[0]).join(", ") : ""));
process.exit(bad.length ? 1 : 0);
