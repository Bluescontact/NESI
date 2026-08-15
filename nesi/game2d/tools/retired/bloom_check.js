#!/usr/bin/env node
/*
 * BLOOM CHECK — does the world unfold, all at once, only when it is earned, and
 * does it carry everything the hand ever placed through the fold with it?
 *
 * The bloom is a boot-time event across a day boundary that cannot be reached by
 * waiting, and it runs for three seconds during which nothing is simulated — so
 * a browser can show you that it looks like something, and nothing else. What
 * matters is what is TRUE on the far side of it: that a stand is still on the
 * ground, that a stair is still a stair, that no silt was invented on land the
 * world did not have before, and that the ascent cannot be pressed.
 *
 * L1 is the load-bearing one and it is not about M5 at all: it asserts that at
 * m=0 the new stage machinery reproduces the ORIGINAL terrain exactly, so that
 * four passes of verified work cannot have quietly moved underneath.
 *
 * Usage:  node tools/bloom_check.js
 */
const fs = require("fs"), path = require("path"), vm = require("vm");
const SRC = fs.readFileSync(path.join(__dirname, "..", "world.html"), "utf8")
  .match(/<script>([\s\S]*?)<\/script>/)[1];
const NOMARK = 1e9;
const noop = () => {};

/* the terrain exactly as it stood before M5 existed */
const ORIGINAL = [[0,268],[70,296],[140,326],[206,336],[232,338],[258,338],
  [292,392],[330,446],[372,484],[432,499],[500,499],[548,486],
  [566,452],[610,494],[664,532],[720,590],[800,636],[900,650],[1000,654]];
function origAt(x) {
  if (x <= ORIGINAL[0][0]) return ORIGINAL[0][1];
  for (let i = 1; i < ORIGINAL.length; i++) {
    const a = ORIGINAL[i-1], b = ORIGINAL[i];
    if (x <= b[0]) return a[1] + (b[1]-a[1]) * (x-a[0]) / (b[0]-a[0]);
  }
  return ORIGINAL[ORIGINAL.length-1][1];
}

function boot(prior, fakeToday) {
  const store = new Map([["nesiworld", JSON.stringify(prior)]]);
  const ctx = new Proxy({}, { get: (_, k) =>
    (k === "createLinearGradient" || k === "createRadialGradient")
      ? () => ({ addColorStop: noop })
      : (k === "canvas" ? { clientWidth: 1000, clientHeight: 700 } : noop),
    set: () => true });
  const el = () => ({ value: "", style: {}, width: 0, height: 0,
    addEventListener: noop, focus: noop, setPointerCapture: noop,
    getContext: () => ctx,
    appendChild: noop, removeChild: noop, click: noop, href: "", firstChild: null, insertBefore: noop,
    className: "", textContent: "", scrollTop: 0,
    classList: { add: noop, remove: noop, toggle: noop, contains: () => false },
    getBoundingClientRect: () => ({ left: 0, top: 0, width: 1000, height: 700 }) });
  let clock = 1e6, q = [];
  const RealDate = Date;
  const D = fakeToday ? function (...a) {
    return a.length ? new RealDate(...a) : new RealDate(fakeToday + "T12:00:00");
  } : RealDate;
  D.UTC = RealDate.UTC; D.now = RealDate.now; D.parse = RealDate.parse;
  const sandbox = {
    document: { getElementById: el, activeElement: null, addEventListener: noop,
                createElement: el, createTextNode: () => ({}) },
    localStorage: { getItem: k => store.get(k) ?? null,
                    setItem: (k, v) => store.set(k, String(v)), removeItem: k => store.delete(k) },
    performance: { now: () => clock },
    requestAnimationFrame: cb => q.push(cb),
    addEventListener: noop, setInterval: noop, setTimeout: noop,
    innerWidth: 1000, innerHeight: 700, devicePixelRatio: 1,
    Blob: function () {}, URL: { createObjectURL: () => "b", revokeObjectURL: noop },
    Math, JSON, Date: D, Float32Array, Float64Array, Array, Object, String, Number,
    isNaN, console
  };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(SRC + "\n;globalThis.__X={S,profileAt,bounds,mapX,invMapX,cast,groundY," +
    "BODIES,volumeAt,surfaceOf,LIP,stir,waters,light,rebuildWeather,autoAim," +
    "getSeats:()=>SEATS,getBloom:()=>bloom,getM:()=>M,getLakeL:()=>LAKE_L};",
    sandbox, { filename: "world.html<script>" });
  const X = sandbox.__X;
  X.run = n => { let i = 0; while (q.length && i < n) {
    const due = q; q = []; clock += 16.7; i++; for (const cb of due) cb(clock); } return i; };
  return X;
}
const dayAgo = n => { const d = new Date(Date.now() - n * 86400000);
  return d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2,"0") + "-" +
         String(d.getDate()).padStart(2,"0"); };

function store(over) {
  return Object.assign({
    writing: {}, watermark: 0, res: 0, basin: 0, basin2: 0, lake: 28205.3,
    gate: 0, mirrors: [], aimedM: [], seated: 2,
    wet: [], shoots: [], stones: [], sunk: 0, nn: 0,
    creature: { x: 840, y: 598, tx: 840, ty: 598 },
    silt: Array(251).fill(0),
    hiNow: { res: NOMARK, basin: NOMARK, lake: NOMARK, basin2: NOMARK },
    hiPast: { res: NOMARK, basin: NOMARK, lake: NOMARK, basin2: NOMARK },
    lastDay: dayAgo(1), queue: [], built: [], settled: [],
    stage: 0, everFruited: false
  }, over);
}
/* a world that has lived: stands, soil, a stair in the deep, silted bed */
function lived(over) {
  const s = store(Object.assign({
    everFruited: true,
    shoots: [{ x: 330, y: 446, rooted: 0.80, lastFed: dayAgo(1), s: 1 },
             { x: 180, y: 333, rooted: 0.40, lastFed: dayAgo(1), s: 4 }],
    settled: [{ x: 300, text: "one.", n: 1, seams: 0 },
              { x: 470, text: "two. three.", n: 2, seams: 1 }],
    stones: [{ x: 640, y: 500, r: 7, text: "loose.", n: 3, vy: 0, seed: 2 }],
    built: [{ x: 742, y: 588, w: 30, h: 16, seed: 3, text: "sunk one." },
            { x: 742, y: 572, w: 28, h: 16, seed: 4, text: "sunk two." },
            { x: 742, y: 556, w: 26, h: 16, seed: 5, text: "sunk three." },
            { x: 880, y: 630, w: 30, h: 15, seed: 6, text: "sunk four." }]
  }, over));
  for (let i = 80; i <= 120; i++) s.silt[i] = 5;
  return s;
}

const checks = [];
const T = (n, ok, d) => checks.push([n, ok, d]);

/* ---- L1 · the stage machinery reproduces the ORIGINAL terrain at m=0 ---- */
let X = boot(store({}));
let worst = 0, at = 0;
for (let x = 0; x <= 1000; x += 0.5) {
  const e = Math.abs(X.profileAt(0, x) - origAt(x));
  if (e > worst) { worst = e; at = x; }
}
T("L1 at m=0 the unfolded machinery reproduces the ORIGINAL terrain exactly",
  worst < 1e-9, "worst error " + worst.toExponential(2) + " at x=" + at);

/* ---- L2 · it cannot be reached without the accumulation ---- */
X = boot(store({ lastDay: dayAgo(4) }));           /* four nights, no fruit ever */
T("L2 four nights away with nothing ever fruited does NOT unfold the world",
  X.getBloom() === null && X.S.stage === 0, "stage " + X.S.stage);

/* ---- L3 · nor by reopening the same day ---- */
X = boot(lived({ lastDay: dayAgo(0) }));
T("L3 reopening on the same day does not unfold it either",
  X.getBloom() === null && X.S.stage === 0, "stage " + X.S.stage);

/* ---- L4 · it fires on a return, once the valley has carried fruit ---- */
X = boot(lived({}));
T("L4 a return, after the valley has carried fruit, starts the unfold",
  X.getBloom() !== null && X.S.stage === 0, "bloom armed, stage still " + X.S.stage);

/* ---- L5 · all-or-nothing: it runs to 1 and commits, never rests part-open ---- */
const before = {
  settled: X.S.settled.map(d => d.x), shoots: X.S.shoots.map(s => s.x),
  built: X.S.built.length, siltCells: X.S.silt.filter(v => v !== 0).length
};
X.run(400);
T("L5 the fold runs to completion and commits — no half-open world persists",
  X.getBloom() === null && X.S.stage === 1 && X.getM() === 1,
  "stage " + X.S.stage + ", M=" + X.getM());

/* ---- L6 · everything the hand placed came through, and is ON the ground ---- */
let offGround = 0;
for (const d of X.S.settled) if (Math.abs(d.y - X.groundY(d.x)) > 0.6) offGround++;
for (const s of X.S.shoots) if (Math.abs(s.y - X.groundY(s.x)) > 0.6) offGround++;
const moved = X.S.settled.every((d, i) => d.x < before.settled[i] - 1);
T("L6 every stand and every settled sentence rode the fold and still sits on the ground",
  offGround === 0 && moved && X.S.settled.length === 2 && X.S.shoots.length === 2,
  offGround + " off the ground; settled " + before.settled.map(v => v.toFixed(0)).join(",") +
    " → " + X.S.settled.map(d => d.x.toFixed(0)).join(","));

/* ---- L7 · a stair is still a stair ---- */
const cols = {};
for (const b of X.S.built) cols[b.x.toFixed(1)] = (cols[b.x.toFixed(1)] || 0) + 1;
const tall = Math.max(...Object.values(cols));
let sunkInRock = 0;
for (const b of X.S.built) if (b.y + b.h > X.groundY(b.x) + 0.6) sunkInRock++;
T("L7 the deep's stack came through as a stack, and none of it is buried in the bed",
  tall === 3 && Object.keys(cols).length === 2 && sunkInRock === 0,
  "columns " + Object.keys(cols).length + ", tallest " + tall + ", buried " + sunkInRock);

/* ---- L8 · no silt invented on ground the world did not have ---- */
const b1 = X.bounds(1);
let invented = 0;
for (let i = 0; i < 251; i++) if (i * 4 > b1.lR && X.S.silt[i] !== 0) invented++;
T("L8 the new valley's ground carries no silt the world never laid there",
  invented === 0 && X.S.silt.filter(v => v !== 0).length > 0,
  invented + " invented cells; " + X.S.silt.filter(v => v !== 0).length + " carried");

/* the world exactly as the fold leaves it, before any check pokes at it — L10
   must measure THAT, not a world some earlier check poured water into */
const AFTER_FOLD = JSON.parse(JSON.stringify(X.S));

/* ---- L9 · the second valley holds its own water table and spills to the deep ---- */
const cap2 = X.volumeAt(X.BODIES.basin2, X.LIP);
X.S.basin2 = cap2 * 0.5;
X.waters(0.0167);
const held = X.surfaceOf(X.BODIES.basin2, X.S.basin2);
const lakeBefore = X.S.lake;
X.S.basin2 = cap2 * 1.6; X.waters(0.0167); X.waters(0.0167);
T("L9 the second valley holds a water table of its own, and gives its excess to the deep",
  cap2 > 800 && held < 520 && held > 440 && X.S.lake > lakeBefore,
  "capacity " + cap2.toFixed(0) + ", surface y=" + held.toFixed(0) + ", spilled to the deep");

/* ---- L10 · a third seat, and it owns the new valley's BOWL ----
   Measured rather than assumed, and the measurement corrected the claim: the old
   seats CAN graze the second valley's upper slopes across the water. What they
   cannot light is its bowl — the only ground over there where water gathers and
   anything can root. Ten angles out of some three thousand thread that needle
   from the whole of the first valley; the seat that stands over it has 274. */
const XF = boot(AFTER_FOLD);
const seats = XF.getSeats();
const bowlHits = [0, 0, 0];
const BOWL = [700, 800];
for (let a = -Math.PI; a < Math.PI; a += 0.002) {
  for (const i of [0, 1, 2]) {
    const h = XF.cast(a, i); if (!h.hit || h.hit === "wall") continue;
    if (h.x > BOWL[0] && h.x < BOWL[1]) bowlHits[i]++;
  }
}
T("L10 the unfold seats a third mirror, and the new valley's bowl is its own",
  seats.length === 3 && XF.S.seated === 3 &&
    bowlHits[2] > 200 && (bowlHits[0] + bowlHits[1]) < bowlHits[2] / 10,
  "angles onto the bowl — first valley's two seats: " + bowlHits[0] + " and " +
    bowlHits[1] + "; the new seat: " + bowlHits[2]);

/* ---- L11b · a seat the unfold creates is aimed by the world, not by a stale flag ----
   Found in a real walk: the third mirror came up pointing back into the first
   valley because something had left its aimed flag standing. A seat that did not
   exist a moment ago has never been aimed by a hand, and the world says so. */
const XS = boot(lived({ aimedM: [false, false, true], mirrors: [0, 0, -1.5] }));
XS.run(400);
const beam2 = XS.cast(XS.S.mirrors[2], 2);
T("L11b a mirror the unfold seats is aimed onto its OWN valley, whatever flag it inherited",
  XS.S.aimedM[2] === false && beam2.hit === "ground" && beam2.x > 690,
  "third beam lands at x=" + beam2.x.toFixed(0) + " (its valley starts at " +
    XS.bounds(1).lR.toFixed(0) + ")");

/* ---- L11 · the ascent cannot be climbed twice ---- */
const carried = JSON.parse(JSON.stringify(X.S));
carried.lastDay = dayAgo(1);
const X2 = boot(carried);
T("L11 a further return does not unfold it again — the rung is climbed once",
  X2.getBloom() === null && X2.S.stage === 1, "stage " + X2.S.stage);

let bad = 0;
for (const [name, ok, detail] of checks) {
  if (!ok) bad++;
  console.log((ok ? "  ok   " : "  FAIL ") + name + "   [" + detail + "]");
}
console.log(bad === 0 ? "[bloom_check] PASS — the world unfolds once, whole, and carries everything"
                      : "[bloom_check] FAIL — " + bad + " of " + checks.length);
process.exit(bad === 0 ? 0 : 1);
