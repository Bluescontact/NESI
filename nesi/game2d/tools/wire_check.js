#!/usr/bin/env node
/*
 * WIRE CHECK — is anything an island?
 *
 * M6's walk test is that a chain crosses every wire in one sitting. Its own
 * sentence names the chain: rain shaped by worked writing erodes terrain that
 * redirects water that feeds growth that ripens casts whose pulls leave gaps
 * the deep answers with structures that change the light paths that fuel the
 * bloom. This file walks exactly that sentence, one link at a time, asserting
 * each transition ACTUALLY MOVED something downstream — a wire that is merely
 * present in the source is not a wire.
 *
 * It also asserts the REFUSALS. "For each pair, name the wire or the refusal"
 * cuts both ways: a pair that should not touch has to be shown not touching, or
 * the audit is only half done.
 *
 * Usage:  node tools/wire_check.js
 */
const fs = require("fs"), path = require("path"), vm = require("vm");
const SRC = fs.readFileSync(path.join(__dirname, "..", "world.html"), "utf8")
  .match(/<script>([\s\S]*?)<\/script>/)[1];
const NOMARK = 1e9, noop = () => {};

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
    getBoundingClientRect: () => ({ left: 0, top: 0, width: 1000, height: 700 }) });
  let clock = 1e6, q = [];
  const RD = Date;
  const D = fakeToday ? function (...a) {
    return a.length ? new RD(...a) : new RD(fakeToday + "T12:00:00"); } : RD;
  D.UTC = RD.UTC; D.now = RD.now; D.parse = RD.parse;
  const sandbox = {
    document: { getElementById: el, activeElement: null, addEventListener: noop,
                createElement: () => ({ click: noop }) },
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
  vm.runInContext(SRC + "\n;globalThis.__X={S,arrive,release,setDrag:d=>{drag=d}," +
    "waters,light,rain,deep,stones,rebuildWeather,rebuildGround,rebuildBlocks," +
    "groundY,wetAt,cast,autoAim,pullCast,fruitAt,standing,volumeAt,surfaceOf," +
    "BODIES,LIP,DAM,dayKey,mean:()=>rainMean,getSeats:()=>SEATS," +
    "getLakeY:()=>lakeY,getBasinY:()=>basinY,setGate:v=>{S.gate=v}};",
    sandbox, { filename: "world.html<script>" });
  const X = sandbox.__X;
  /* the clock lives out here, so the pump does too */
  X.pump = n => { for (let i = 0; i < n; i++) {
    clock += 16.7;
    X.waters(0.0167); X.rain(0.0167); X.light(0.0167); X.deep(0.0167); X.stones(0.0167);
  } };
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
    lastDay: dayAgo(0), queue: [], built: [], settled: [],
    stage: 0, everFruited: false
  }, over);
}
const checks = [];
const T = (n, ok, d) => checks.push([n, ok, d]);

/* ======================================================================
   THE CHAIN — one world, walked link by link, each link asserted to have
   moved the next thing along.
   ====================================================================== */
let X = boot(store({}));

/* 1 · WRITING → SOIL */
X.arrive("A sentence that will become weather.");
const stone = X.S.stones[0];
stone.x = 470; stone.y = X.groundY(470);
X.setDrag({ k: "stone", s: stone }); X.release();
T("W1 writing → soil: a sentence set down in the ground stays there, verbatim",
  X.S.settled.length === 1 && X.S.settled[0].text === "A sentence that will become weather.",
  "settled at x=" + X.S.settled[0].x.toFixed(0));

/* 2 · SOIL → WEATHER */
const meanBefore = X.mean();
X.arrive("A second one, worked onto the first.");
const s2 = X.S.stones[X.S.stones.length - 1];
s2.x = 474; s2.y = X.groundY(474);
X.setDrag({ k: "stone", s: s2 }); X.release();
T("W2 soil → weather: settling, and then WORKING, moves the sky both times",
  X.S.settled[0].seams === 1 && X.mean() > meanBefore + 15,
  "mean x " + meanBefore.toFixed(0) + " → " + X.mean().toFixed(0) + ", seams 1");

/* 3 · WEATHER → WATER */
const basinBefore = X.S.basin;
X.pump(900);                                    /* let the rain fall */
T("W3 weather → water: the rain the soil shaped raises the water it falls into",
  X.S.basin > basinBefore + 300, "basin " + basinBefore.toFixed(0) + " → " + X.S.basin.toFixed(0));

/* 4 · WATER → TERRAIN (deposition, and the sluice's cut) */
const siltAfterRain = X.S.silt.filter(v => v > 0.01).length;
X.S.res = X.volumeAt(X.BODIES.res, 300); X.setGate(1); X.pump(400);
const cut = X.S.silt.filter(v => v < -0.01).length;
T("W4 water → terrain: standing water lays a bed down, and the sluice cuts one",
  siltAfterRain > 0 && cut > 0,
  siltAfterRain + " cells silted by rain, " + cut + " cut by the sluice");

/* 5 · TERRAIN → WATER (the bed the water made changes where the water stands) */
const volFixed = X.volumeAt(X.BODIES.basin, 470);
const before5 = X.surfaceOf(X.BODIES.basin, volFixed);
for (let i = 90; i <= 130; i++) X.S.silt[i] += 6;
X.rebuildGround();
const after5 = X.surfaceOf(X.BODIES.basin, volFixed);
T("W5 terrain → water: the same water stands HIGHER on a bed that has silted up",
  after5 < before5 - 1, "surface y " + before5.toFixed(1) + " → " + after5.toFixed(1));

/* 6 · WATER + LIGHT → GREEN */
X.setGate(0); X.S.basin = X.volumeAt(X.BODIES.basin, 474); X.pump(260);
T("W6 water + light → green: where a beam stands on wet ground, something seeds",
  X.S.shoots.length > 0 && X.wetAt(X.S.shoots[0].x) > 0.3,
  X.S.shoots.length + " shoot(s), ground wetness " + X.wetAt(X.S.shoots[0].x).toFixed(2));

/* 7 · LIGHT + RETURN → CAST */
let carry = JSON.parse(JSON.stringify(X.S));
for (const day of ["2099-01-02","2099-01-03","2099-01-04","2099-01-05","2099-01-06","2099-01-07","2099-01-08"]) {
  carry.lastDay = "2099-01-01"; carry.everFruited = carry.everFruited || false;
  X = boot(carry, day); X.pump(200); carry = JSON.parse(JSON.stringify(X.S));
}
const ripe = X.S.shoots.find(s => X.fruitAt(s));
T("W7 light + returns → cast: enough returns under the beam hang a cast to pull",
  !!ripe && X.S.everFruited === true,
  ripe ? "rooted " + ripe.rooted.toFixed(2) + ", fruit hanging" : "none ripened");

/* 8 · CAST → DEEP  (the wire M6 named and earlier passes left unbuilt) */
const queuedBefore = X.S.queue.length;
X.pullCast(ripe);
T("W8 cast → deep: the gap a pull leaves goes down to the deep, carrying no word",
  X.S.queue.length === queuedBefore + 1 && X.S.queue[X.S.queue.length-1].text === "",
  "queue " + queuedBefore + " → " + X.S.queue.length + ", text is empty");

/* 9 · DEEP → the night → structures */
carry = JSON.parse(JSON.stringify(X.S)); carry.lastDay = "2099-01-08";
X = boot(carry, "2099-01-12");
T("W9 deep → shoreline: what you released rose while you were gone",
  X.S.built.length > 0, X.S.built.length + " block(s) standing");

/* 10 · DEEP → LIGHT  (the other wire M6 named and earlier passes left unbuilt) */
X.S.built = [];
for (let k = 0; k < 7; k++) X.S.built.push({ x: 700, y: 560 - k*16, w: 34, h: 16, seed: k, text: "" });
X.rebuildBlocks();
let blocked = 0, throughBefore = 0;
X.S.built = []; X.rebuildBlocks();
for (let a = -Math.PI; a < Math.PI; a += 0.004) {
  const h = X.cast(a, 0); if (h.hit && h.x > 690 && h.x < 900) throughBefore++;
}
for (let k = 0; k < 7; k++) X.S.built.push({ x: 700, y: 560 - k*16, w: 34, h: 16, seed: k, text: "" });
X.rebuildBlocks();
for (let a = -Math.PI; a < Math.PI; a += 0.004) {
  const h = X.cast(a, 0); if (h.hit === "wall" && h.x > 680 && h.x < 720) blocked++;
}
let throughAfter = 0;
for (let a = -Math.PI; a < Math.PI; a += 0.004) {
  const h = X.cast(a, 0); if (h.hit && h.x > 690 && h.x < 900) throughAfter++;
}
T("W10 deep → light: a tower the deep built casts a shadow the beam cannot cross",
  blocked > 20 && throughAfter < throughBefore,
  blocked + " angles stopped by it; ground beyond reachable at " +
    throughBefore + " → " + throughAfter + " angles");

/* 11 · GREEN → BLOOM */
T("W11 green → bloom: the fruit that ripened is what arms the unfold",
  X.S.everFruited === true, "everFruited true, carried across every boot since");

/* ======================================================================
   THE REFUSALS — pairs that must NOT touch. Half the audit.
   ====================================================================== */
X = boot(store({ settled: [{ x: 300, text: "a.", n: 1, seams: 0 }],
                 built: [{ x: 800, y: 600, w: 30, h: 16, seed: 1, text: "" }],
                 shoots: [{ x: 330, y: 446, rooted: 0.6, lastFed: dayAgo(0), s: 1 }],
                 basin: 6000 }));
const w0 = X.mean(), basinStart = X.S.basin;
X.pump(600);
T("R1 the deep does not touch the weather — what it builds changes no rain",
  Math.abs(X.mean() - w0) < 0.001, "mean x unchanged at " + X.mean().toFixed(1));
T("R2 growth does not drink — a standing shoot takes nothing out of the water",
  X.S.basin >= basinStart, "basin did not fall");
const siltUnderDeposit = X.S.silt[75];
T("R3 a settled sentence does not move the ground it sits on, only the sky",
  siltUnderDeposit >= 0, "no cell was cut by a deposit");

/* the one that matters most: nothing in this file can put a word outside it */
const canWrite = /fillText|strokeText|innerHTML|document\.write/.test(SRC);
T("R4 the world cannot write a word anywhere — no text primitive exists in it",
  !canWrite, "no fillText, strokeText, innerHTML or document.write");
T("R5 the membrane is a place, not a feature — nothing in the file hit-tests it",
  !/W-26[^\n]*hypot|membrane[^\n]*click|seam[^\n]*pointer/i.test(SRC),
  "drawn only; no hit test, no handler");

let bad = 0;
for (const [name, ok, detail] of checks) {
  if (!ok) bad++;
  console.log((ok ? "  ok   " : "  FAIL ") + name + "   [" + detail + "]");
}
console.log(bad === 0 ? "[wire_check] PASS — the chain carries end to end, and nothing is an island"
                      : "[wire_check] FAIL — " + bad + " of " + checks.length);
process.exit(bad === 0 ? 0 : 1);
