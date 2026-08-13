#!/usr/bin/env node
/*
 * HEAD CHECK — does the hand's work upstream actually shape the weather, and
 * does the one thing that leaves the world carry no words out with it?
 *
 * M4's walk test is "a stranger can see WHICH region its water favoured because
 * of where they worked it." That is a claim about a probability distribution,
 * which is exactly the kind of thing a person watching rain fall cannot verify
 * and a screenshot cannot show. So the real rebuildWeather() and rainX() are
 * driven here and sampled tens of thousands of times.
 *
 * The second half is the sharper one: the cast is the ONLY thing that leaves,
 * and it must carry shape and never a word. That is checked by handing the
 * world a stand and a store full of distinctive sentences and then searching
 * the actual emitted SVG for any of them.
 *
 * Usage:  node tools/head_check.js
 */
const fs = require("fs"), path = require("path"), vm = require("vm");
const SRC = fs.readFileSync(path.join(__dirname, "..", "world.html"), "utf8")
  .match(/<script>([\s\S]*?)<\/script>/)[1];
const NOMARK = 1e9;
const noop = () => {};

function boot(prior) {
  const store = new Map([["nesiworld", JSON.stringify(prior)]]);
  const ctx = new Proxy({}, { get: (_, k) =>
    (k === "createLinearGradient" || k === "createRadialGradient")
      ? () => ({ addColorStop: noop })
      : (k === "canvas" ? { clientWidth: 1000, clientHeight: 700 } : noop),
    set: () => true });
  const el = () => ({ value: "", style: {}, width: 0, height: 0,
    addEventListener: noop, focus: noop, setPointerCapture: noop,
    getContext: () => ctx,
    getBoundingClientRect: () => ({ left: 0, top: 0, width: 1000, height: 700 }) });
  let clock = 1e6, q = [];
  const sandbox = {
    document: { getElementById: el, activeElement: null, addEventListener: noop,
                createElement: () => ({ click: noop, set href(v) {}, get href() { return ""; } }) },
    localStorage: { getItem: k => store.get(k) ?? null,
                    setItem: (k, v) => store.set(k, String(v)), removeItem: k => store.delete(k) },
    performance: { now: () => clock },
    requestAnimationFrame: cb => q.push(cb),
    addEventListener: noop, setInterval: noop, setTimeout: noop,
    innerWidth: 1000, innerHeight: 700, devicePixelRatio: 1,
    Blob: function () {}, URL: { createObjectURL: () => "blob:x", revokeObjectURL: noop },
    Math, JSON, Date, Float32Array, Float64Array, Array, Object, String, Number, isNaN, console
  };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  /* the last line is a TEST HOOK and lives only here — world.html is unmodified.
     `drag` is a top-level binding, so a second runInContext could never see it. */
  vm.runInContext(SRC + "\n;globalThis.__X={S,rainX,rebuildWeather,castSVG,pullCast," +
    "fruitAt,standing,groundY,volumeAt,BODIES,release,arrive," +
    "setDrag:d=>{drag=d}, mean:()=>rainMean};",
    sandbox, { filename: "world.html<script>" });
  const X = sandbox.__X;
  X.run = n => { let i = 0; while (q.length && i < n) {
    const due = q; q = []; clock += 16.7; i++; for (const cb of due) cb(clock); } return i; };
  return X;
}
const today = (() => { const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" +
         String(d.getDate()).padStart(2, "0"); })();

function store(over) {
  return Object.assign({
    writing: {}, watermark: 0, res: 0, basin: 0, lake: 28205.3,
    gate: 0, mirrors: [], aimedM: [], seated: 1,
    wet: [], shoots: [], stones: [], sunk: 0, nn: 0,
    creature: { x: 840, y: 598, tx: 840, ty: 598 },
    silt: Array(251).fill(0), hiNow: { res: NOMARK, basin: NOMARK, lake: NOMARK },
    hiPast: { res: NOMARK, basin: NOMARK, lake: NOMARK },
    lastDay: today, queue: [], built: [], settled: []
  }, over);
}
/* where 20k drops actually land, by region */
function sample(X, n) {
  const bins = { catchment: 0, channel: 0, basin: 0, east: 0 };
  let sum = 0;
  for (let i = 0; i < n; i++) {
    const x = X.rainX(); sum += x;
    if (x < 232) bins.catchment++; else if (x < 330) bins.channel++;
    else if (x < 566) bins.basin++; else bins.east++;
  }
  bins.mean = sum / n;
  return bins;
}

const checks = [];
const T = (n, ok, d) => checks.push([n, ok, d]);

/* ---- H1 · an untouched world keeps the weather it was born with ---- */
let X = boot(store({}));
let s0 = sample(X, 40000);
T("H1 with nothing settled the rain still falls on the high catchment",
  s0.catchment / 40000 > 0.55 && s0.mean < 210 && s0.basin / 40000 < 0.15,
  (100 * s0.catchment / 40000).toFixed(0) + "% catchment, mean x=" + s0.mean.toFixed(0));

/* ---- H2 · settling in the basin brings the weather to the basin ---- */
X = boot(store({ settled: [
  { x: 430, text: "a.", n: 1, seams: 0 }, { x: 470, text: "b.", n: 2, seams: 0 },
  { x: 500, text: "c.", n: 3, seams: 0 }, { x: 460, text: "d.", n: 4, seams: 0 }] }));
X.rebuildWeather();
let s1 = sample(X, 40000);
T("H2 four sentences settled in the basin move the weather onto it",
  s1.basin > s0.basin * 3 && s1.mean > s0.mean + 60,
  "basin " + (100 * s0.basin / 40000).toFixed(0) + "% → " + (100 * s1.basin / 40000).toFixed(0) +
    "%, mean " + s0.mean.toFixed(0) + " → " + s1.mean.toFixed(0));

/* ---- H3 · worked draws harder than unworked, at the same place ---- */
X = boot(store({ settled: [{ x: 460, text: "a.", n: 1, seams: 0 }] }));
X.rebuildWeather(); const un = sample(X, 30000).basin;
X = boot(store({ settled: [{ x: 460, text: "a. b. c.", n: 1, seams: 2 }] }));
X.rebuildWeather(); const wk = sample(X, 30000).basin;
T("H3 a worked deposit pulls the weather harder than an unworked one",
  wk > un * 1.6, "unworked " + un + " drops vs worked " + wk);

/* ---- H4 · the merge: written order kept, seam counted, text verbatim ---- */
X = boot(store({}));
X.arrive("First sentence."); X.arrive("Second sentence.");
let st = X.S.stones;
X.setDrag({ k: "stone", s: st[0] }); st[0].x = 420; st[0].y = X.groundY(420); X.release();
X.setDrag({ k: "stone", s: st[0] }); st[0].x = 424; st[0].y = X.groundY(424); X.release();
let d = X.S.settled[0];
T("H4 setting one sentence down ON another joins them in written order, with a seam",
  X.S.settled.length === 1 && d.seams === 1 &&
    d.text === "First sentence. Second sentence." && X.S.stones.length === 0,
  "seams " + d.seams + ", text " + JSON.stringify(d.text));

/* ---- H5 · reversed pick order still joins in WRITTEN order ---- */
X = boot(store({}));
X.arrive("Alpha one."); X.arrive("Beta two.");
st = X.S.stones;
X.setDrag({ k: "stone", s: st[1] }); st[1].x = 430; st[1].y = X.groundY(430); X.release();
X.setDrag({ k: "stone", s: st[0] }); st[0].x = 434; st[0].y = X.groundY(434); X.release();
T("H5 picking them up in the wrong order does not put them down in it",
  X.S.settled[0].text === "Alpha one. Beta two.",
  JSON.stringify(X.S.settled[0].text));

/* ---- H6 · settling actually moved the weather, end to end ---- */
const meanBefore = X.mean();
X.S.settled.push({ x: 520, text: "e.", n: 9, seams: 3 });
X.rebuildWeather();
T("H6 the weather is derived from the soil — adding to it moves the sky",
  X.mean() > meanBefore + 20,
  "mean x " + meanBefore.toFixed(0) + " → " + X.mean().toFixed(0));

/* ---- H7 · THE CAST carries shape and not one word ---- */
X = boot(store({
  writing: { [today]: "A private sentence that must never leave." },
  settled: [{ x: 330, text: "SETTLED-SECRET-TEXT.", n: 1, seams: 0 }],
  queue: [{ x: 800, text: "SUNK-SECRET-TEXT.", seed: 0.3 }],
  stones: [{ x: 640, y: 500, r: 7, text: "STONE-SECRET-TEXT.", n: 2, vy: 0, seed: 1 }],
  shoots: [{ x: 330, y: 446, rooted: 0.88, lastFed: today, s: 2 }]
}));
const svg = X.castSVG(X.S.shoots[0]);
const leaks = ["SETTLED-SECRET-TEXT", "SUNK-SECRET-TEXT", "STONE-SECRET-TEXT",
               "A private sentence", "sentence", "secret"]
  .filter(w => svg.toLowerCase().includes(w.toLowerCase()));
T("H7 the cast carries no word from anywhere in the world",
  leaks.length === 0 && svg.startsWith("<svg") && /<path/.test(svg),
  leaks.length ? "LEAKED: " + leaks.join(", ") : svg.length + " bytes of pure geometry");

/* ---- H8 · and it cannot: nothing textual is even reachable from it ---- */
T("H8 the cast has no text element and no font — it is paths and one circle",
  !/<text|font|textPath|<tspan/i.test(svg),
  "no text primitive in the emitted file");

/* ---- H9 · pulling it costs the stand what it grew ---- */
const before = X.S.shoots[0].rooted;
X.pullCast(X.S.shoots[0]);
const after = X.S.shoots[0].rooted;
T("H9 pulling the cast spends the stand's rooting, and it drops below fruiting",
  after < before && after < 0.72 && after > 0,
  "rooted " + before.toFixed(2) + " → " + after.toFixed(2) + " (fruits at 0.72)");

/* ---- H10 · a stand that has not rooted enough has nothing to give ---- */
X = boot(store({ shoots: [{ x: 330, y: 446, rooted: 0.5, lastFed: today, s: 1 }] }));
T("H10 an unripe stand offers no cast to the hand at all",
  X.fruitAt(X.S.shoots[0]) === null, "fruitAt returns nothing");

let bad = 0;
for (const [name, ok, detail] of checks) {
  if (!ok) bad++;
  console.log((ok ? "  ok   " : "  FAIL ") + name + "   [" + detail + "]");
}
console.log(bad === 0 ? "[head_check] PASS — the work upstream is the weather downstream"
                      : "[head_check] FAIL — " + bad + " of " + checks.length);
process.exit(bad === 0 ? 0 : 1);
