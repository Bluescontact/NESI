#!/usr/bin/env node
/*
 * NIGHT CHECK — does the deep actually work while you are away, and only then?
 *
 * M2's whole claim happens in the one place a browser cannot be made to look:
 * the boot, across a day boundary that cannot be reached by waiting. So the
 * real <script> is cold-booted here against a stub DOM, once per scenario, with
 * the store standing at a chosen number of days ago.
 *
 * The claims under test are M2's own words: what you sink QUEUES rather than
 * vanishing · on your next day something has RISEN · a missed week is a bigger
 * reveal and never a penalty · the structure is traceable to what sank by COUNT
 * and PLACE, never by content · and the valley's own water does not advance
 * while you are gone (law 8 holds for everything except the deep).
 *
 * Usage:  node tools/night_check.js
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
    appendChild: noop, removeChild: noop, click: noop, href: "", firstChild: null, insertBefore: noop,
    className: "", textContent: "", scrollTop: 0,
    classList: { add: noop, remove: noop, toggle: noop, contains: () => false },
    getBoundingClientRect: () => ({ left: 0, top: 0, width: 1000, height: 700 }) });
  let clock = 1e6, queue = [];
  const sandbox = {
    document: { getElementById: el, createElement: el, createTextNode: () => ({}), activeElement: null, addEventListener: noop },
    localStorage: { getItem: k => store.get(k) ?? null,
                    setItem: (k, v) => store.set(k, String(v)), removeItem: k => store.delete(k) },
    performance: { now: () => clock },
    requestAnimationFrame: cb => queue.push(cb),
    addEventListener: noop, setInterval: noop, setTimeout: noop,
    innerWidth: 1000, innerHeight: 700, devicePixelRatio: 1,
    Math, JSON, Date, Float32Array, Array, Object, String, Number, isNaN, console
  };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(SRC + "\n;globalThis.__X={S,stir,groundY,surfaceOf,volumeAt,BODIES,NIGHTS};",
    sandbox, { filename: "world.html<script>" });
  const X = sandbox.__X;
  X.run = n => { let i = 0; while (queue.length && i < n) {
    const due = queue; queue = []; clock += 16.7; i++; for (const cb of due) cb(clock); } return i; };
  return X;
}

const dayAgo = n => { const d = new Date(Date.now() - n * 86400000);
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" +
         String(d.getDate()).padStart(2, "0"); };

function store(over) {
  return Object.assign({
    writing: {}, watermark: 0, res: 4000, basin: 2200, lake: 28205.3,
    gate: 0, mirror: null, aimed: false, wet: [], shoots: [], stones: [], sunk: 0,
    creature: { x: 840, y: 598, tx: 840, ty: 598 },
    silt: Array(251).fill(0), hiNow: { res: NOMARK, basin: NOMARK, lake: NOMARK },
    hiPast: { res: NOMARK, basin: NOMARK, lake: NOMARK },
    lastDay: dayAgo(1), queue: [], built: []
  }, over);
}
const sank = (n, x) => Array.from({ length: n },
  (_, i) => ({ text: "sentence " + i + ".", x: x, seed: (i * 13 + 5) / 99 }));

const checks = [];
const T = (name, ok, detail) => checks.push([name, ok, detail]);

/* ---- N1 · a same-day reopen builds nothing ---- */
let X = boot(store({ lastDay: dayAgo(0), queue: sank(4, 800) }));
T("N1 reopening the same day builds nothing",
  X.NIGHTS === 0 && X.S.built.length === 0 && X.S.queue.length === 4,
  "nights " + X.NIGHTS + " built " + X.S.built.length + " queued " + X.S.queue.length);

/* ---- N2 · one night, one block ---- */
X = boot(store({ lastDay: dayAgo(1), queue: sank(4, 800) }));
T("N2 one night away raises one block from four waiting",
  X.S.built.length === 1 && X.S.queue.length === 3,
  "built " + X.S.built.length + ", still waiting " + X.S.queue.length);

/* ---- N3 · a week away is a bigger reveal, not a penalty ---- */
X = boot(store({ lastDay: dayAgo(7), queue: sank(9, 800) }));
T("N3 a week away raises seven — bigger reveal, nothing lost",
  X.S.built.length === 7 && X.S.queue.length === 2,
  "built " + X.S.built.length + ", still waiting " + X.S.queue.length);

/* ---- N4 · it can never take more than you gave it ---- */
X = boot(store({ lastDay: dayAgo(9), queue: sank(2, 800) }));
T("N4 nine nights over two stones raises two, and waits",
  X.S.built.length === 2 && X.S.queue.length === 0,
  "built " + X.S.built.length);

/* ---- N5 · nothing sunk, nothing rises, silently ---- */
X = boot(store({ lastDay: dayAgo(30), queue: [], built: [] }));
T("N5 a month away with nothing sunk raises nothing, and does not complain",
  X.S.built.length === 0 && X.S.queue.length === 0, "built 0");

/* ---- N6 · traceable by PLACE: same place stacks, spread places spread ---- */
X = boot(store({ lastDay: dayAgo(4), queue: sank(4, 760) }));
const xs = X.S.built.map(b => b.x);
const stacked = new Set(xs).size === 1 && X.S.built.length === 4;
const tops = X.S.built.map(b => b.y).sort((a, b) => a - b);
T("N6 four sunk in ONE place stand as a stack, each on the last one's shoulders",
  stacked && tops[0] < tops[3] - 30,
  "columns " + new Set(xs).size + ", top " + tops[0].toFixed(0) + " base " + tops[3].toFixed(0));

X = boot(store({ lastDay: dayAgo(4),
  queue: [ ...sank(1, 700), ...sank(1, 790), ...sank(1, 870), ...sank(1, 930) ] }));
T("N7 four sunk ALONG the shore stand as a reef, not a tower",
  new Set(X.S.built.map(b => b.x)).size === 4,
  "columns " + new Set(X.S.built.map(b => b.x)).size);

/* ---- N8 · the words ride along, verbatim, and are never drawn ---- */
X = boot(store({ lastDay: dayAgo(1), queue: [{ text: "The lake keeps it.", x: 800, seed: 0.4 }] }));
X.run(5);
const kept = X.S.built[0] && X.S.built[0].text === "The lake keeps it.";
/* the deep's work is recognizable in SHAPE and never in words — so a block's own
   text must be reachable by nothing. `own()` resolves only the page and the soil;
   there is no path from a built block to the screen. */
const blockReadable = /own\([^)]*\{\s*k\s*:\s*["']built/.test(SRC);
T("N8 the sentence rides inside the block, verbatim, and nothing can show it",
  kept && !blockReadable,
  kept ? "carried verbatim; no door resolves a block's text" : "LOST");

/* ---- N9 · law 8 for the valley: the water did not move while you were gone ---- */
const prior = store({ lastDay: dayAgo(6), queue: sank(3, 800) });
X = boot(prior);
T("N9 six nights advanced the deep and NOT the water",
  X.S.res === prior.res && X.S.basin === prior.basin && X.S.lake === prior.lake &&
    X.S.silt.every(v => v === 0),
  "res " + X.S.res + " basin " + X.S.basin + " silt untouched");

/* ---- N10 · nothing is built while you are present ---- */
X = boot(store({ lastDay: dayAgo(0), queue: sank(3, 800) }));
X.stir(); X.run(400);
T("N10 four hundred frames of being there build nothing",
  X.S.built.length === 0 && X.S.queue.length === 3,
  "built " + X.S.built.length + ", waiting " + X.S.queue.length);

let bad = 0;
for (const [name, ok, detail] of checks) {
  if (!ok) bad++;
  console.log((ok ? "  ok   " : "  FAIL ") + name + "   [" + detail + "]");
}
console.log(bad === 0 ? "[night_check] PASS — the deep works only in your absence"
                      : "[night_check] FAIL — " + bad + " of " + checks.length);
process.exit(bad === 0 ? 0 : 1);
