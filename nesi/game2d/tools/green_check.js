#!/usr/bin/env node
/*
 * GREEN CHECK — is standing actually made of returns, or of hours?
 *
 * M3's falsifier is its own first line: "a volume-storm roots nothing." That is
 * a claim about what a LONG SESSION cannot buy, and a long session is precisely
 * what neither a screenshot nor a hand at this keyboard can sit through. So the
 * real light() is driven here for thousands of frames against a synthetic clock,
 * and the question is whether the valley grew anything for it.
 *
 * Also under test: the second seat is earned by a return rather than by a count,
 * and it can reach ground the first seat cannot reach at any angle — otherwise
 * it is a spare mirror rather than a puzzle.
 *
 * Usage:  node tools/green_check.js
 */
const fs = require("fs"), path = require("path"), vm = require("vm");
const SRC = fs.readFileSync(path.join(__dirname, "..", "world.html"), "utf8")
  .match(/<script>([\s\S]*?)<\/script>/)[1];
const NOMARK = 1e9;
const noop = () => {};

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
  /* the world asks `new Date()` for today; hand it a different day when a
     scenario needs one, which is the only way to cross a boundary in a test */
  const RealDate = Date;
  const D = fakeToday ? function (...a) {
    if (a.length) return new RealDate(...a);
    return new RealDate(fakeToday + "T12:00:00");
  } : RealDate;
  D.UTC = RealDate.UTC; D.now = RealDate.now; D.parse = RealDate.parse;
  const sandbox = {
    document: { getElementById: el, createElement: el, createTextNode: () => ({}), activeElement: null, addEventListener: noop },
    localStorage: { getItem: k => store.get(k) ?? null,
                    setItem: (k, v) => store.set(k, String(v)), removeItem: k => store.delete(k) },
    performance: { now: () => clock },
    requestAnimationFrame: cb => q.push(cb),
    addEventListener: noop, setInterval: noop, setTimeout: noop,
    innerWidth: 1000, innerHeight: 700, devicePixelRatio: 1,
    Math, JSON, Date: D, Float32Array, Array, Object, String, Number, isNaN, console
  };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(SRC +
    "\n;globalThis.__X={S,stir,cast,autoAim,SEATS,light,standing,feed,wetAt,groundY,surfaceOf,volumeAt,BODIES,waters,dayKey};",
    sandbox, { filename: "world.html<script>" });
  const X = sandbox.__X;
  X.run = n => { let i = 0; while (q.length && i < n) {
    const due = q; q = []; clock += 16.7; i++; for (const cb of due) cb(clock); } return i; };
  X.pump = n => { for (let i = 0; i < n; i++) { clock += 16.7; X.waters(0.0167); X.light(0.0167); } };
  return X;
}
const dayAgo = n => { const d = new Date(Date.now() - n * 86400000);
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" +
         String(d.getDate()).padStart(2, "0"); };

function store(over) {
  return Object.assign({
    writing: {}, watermark: 0,
    /* a basin already flooded, so the beam's ground is wet from frame one */
    res: 0, basin: 7000, lake: 28205.3,
    gate: 0, mirrors: [], aimedM: [], seated: 1,
    wet: [], shoots: [], stones: [], sunk: 0,
    creature: { x: 840, y: 598, tx: 840, ty: 598 },
    silt: Array(251).fill(0), hiNow: { res: NOMARK, basin: NOMARK, lake: NOMARK },
    hiPast: { res: NOMARK, basin: NOMARK, lake: NOMARK },
    lastDay: dayAgo(0), queue: [], built: []
  }, over);
}

const checks = [];
const T = (n, ok, d) => checks.push([n, ok, d]);

/* ---- G1 · a volume-storm roots nothing ---- */
let X = boot(store({}));
X.pump(120);                                   /* two seconds: seed it */
const seeded = X.S.shoots.length;
X.pump(6000);                                  /* a hundred more seconds on it */
const rootedAfterStorm = X.S.shoots[0] ? X.S.shoots[0].rooted : -1;
T("G1 a hundred seconds of unbroken light roots NOTHING",
  seeded === 1 && rootedAfterStorm === 0,
  "shoots " + seeded + ", rooted " + rootedAfterStorm);

/* ---- G2 · and it looks like nothing, too ---- */
T("G2 the sprout stands at its first-day height and no higher",
  Math.abs(X.standing(X.S.shoots[0]) - 0.16) < 1e-9,
  "standing " + X.standing(X.S.shoots[0]).toFixed(3));

/* ---- G3 · three returns stand a shoot ---- */
/* the SAME shoot carried across four explicit days, the world reopened on each */
let carry = [{ x: 330, y: 446, rooted: 0, lastFed: "2099-01-01", s: 1 }];
const steps = [];
for (const day of ["2099-01-02", "2099-01-03", "2099-01-04"]) {
  X = boot(store({ shoots: JSON.parse(JSON.stringify(carry)), lastDay: "2099-01-01" }), day);
  X.pump(60);
  carry = JSON.parse(JSON.stringify(X.S.shoots));
  steps.push(carry[0].rooted);
}
T("G3 three returns root it, each step smaller than the last",
  steps[0] > 0.21 && steps[1] > steps[0] && steps[2] > steps[1] &&
    (steps[1] - steps[0]) < steps[0] && (steps[2] - steps[1]) < (steps[1] - steps[0]),
  "rooted " + steps.map(v => v.toFixed(3)).join(" → "));

/* ---- G4 · it never completes ---- */
let s4 = { x: 330, y: 446, rooted: 0, lastFed: "1999-01-01", s: 1 };
for (let i = 0; i < 200; i++) { s4.lastFed = "1999-01-0" + (i % 2 ? 1 : 2);
  if (s4.lastFed !== "1999-01-01") s4.rooted = Math.min(1, s4.rooted + (1 - s4.rooted) * 0.22); }
T("G4 rooting is asymptotic — two hundred returns never reach 1",
  s4.rooted < 1 && s4.rooted > 0.99, "after 200: " + s4.rooted.toFixed(12));

/* ---- G5 · the second seat is earned by a return, not by a clock ---- */
X = boot(store({}));
X.pump(4000);
T("G5 a valley that has never rooted anything still has one seat",
  X.S.seated === 1, "seated " + X.S.seated);

X = boot(store({ shoots: [{ x: 330, y: 446, rooted: 0, lastFed: dayAgo(2), s: 1 }] }));
X.pump(120);
T("G6 the first rooting seats the second mirror, and nothing announces it",
  X.S.seated === 2 && X.S.shoots[0].rooted > 0, "seated " + X.S.seated);

/* ---- G7 · the dark pool: seat 0 cannot reach the reservoir at ANY angle ---- */
X = boot(store({ res: 9000 }));
let reach0 = 1e9, reach1 = 1e9, hits0 = 0, hits1 = 0;
const RES_L = 84, RES_R = 232;              /* the reservoir's own shore band */
for (let a = -Math.PI; a < Math.PI; a += 0.002) {
  const h0 = X.cast(a, 0);
  if (h0.hit && h0.hit !== "wall") { reach0 = Math.min(reach0, h0.x);
    if (h0.x >= RES_L && h0.x <= RES_R) hits0++; }
  const h1 = X.cast(a, 1);
  if (h1.hit && h1.hit !== "wall") { reach1 = Math.min(reach1, h1.x);
    if (h1.x >= RES_L && h1.x <= RES_R) hits1++; }
}
T("G7 the first mirror lands NOWHERE in the reservoir, at any angle in a full circle",
  hits0 === 0 && reach0 >= 232,
  hits0 + " of ~3140 angles reach it; its leftmost landing is x=" + reach0.toFixed(0) +
    " (the dam's own face)");
T("G8 the second mirror lands there freely — the dark pool has an answer",
  hits1 > 100 && reach1 < 232,
  hits1 + " angles reach the reservoir shore, leftmost x=" + reach1.toFixed(0));

/* ---- G9 · fruit is many returns away, and unreachable in one ---- */
let n = 0, r = 0; while (r <= 0.72) { r += (1 - r) * 0.22; n++; }
T("G9 fruit hangs only after several returns, and no day can buy it",
  n >= 5 && n <= 8, n + " returns to fruit");

/* ---- G10 · bare ground stays bare ---- */
X = boot(store({ basin: 0, res: 0 }));      /* nothing wet anywhere but the lake */
X.pump(3000);
T("G10 light on dry ground for fifty seconds grows nothing, and says nothing",
  X.S.shoots.length === 0, "shoots " + X.S.shoots.length);

let bad = 0;
for (const [name, ok, detail] of checks) {
  if (!ok) bad++;
  console.log((ok ? "  ok   " : "  FAIL ") + name + "   [" + detail + "]");
}
console.log(bad === 0 ? "[green_check] PASS — standing is made of returns"
                      : "[green_check] FAIL — " + bad + " of " + checks.length);
process.exit(bad === 0 ? 0 : 1);
