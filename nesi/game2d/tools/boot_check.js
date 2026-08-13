#!/usr/bin/env node
/*
 * BOOT CHECK — cold-boots world.html's real boot path outside a browser.
 *
 * Why this exists, named rather than assumed: the in-app preview pane pins a
 * single JS realm. location.reload(), a forced navigate, and even opening the
 * same code at a different URL all reuse it, so the module-level boot code
 * (migration, the day roll, rebuildGround) CANNOT be observed running there —
 * a probe after "reloading" reports the previous session's mutated state and
 * looks like a boot that did nothing. That is a silent-wrong instrument, so it
 * is replaced rather than trusted.
 *
 * This runs the actual <script> block from world.html against a stub DOM with
 * requestAnimationFrame disabled, then reports the state the boot produced.
 * It renders nothing and asserts nothing about how the world LOOKS.
 *
 * Usage:  node tools/boot_check.js
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const file = path.join(__dirname, "..", "world.html");
const src = fs.readFileSync(file, "utf8").match(/<script>([\s\S]*?)<\/script>/)[1];

/* a store standing at a PREVIOUS day, carrying marks and a silted bed, and
   missing nothing — this is the shape a returning player's save has */
const NOMARK = 1e9;
const prior = {
  writing: {}, watermark: 0,
  res: 0, basin: 0, lake: 28205.3,
  gate: 0, mirror: null, aimed: false,
  wet: [], shoots: [], stones: [], sunk: 0,
  creature: { x: 840, y: 598, tx: 840, ty: 598 },
  silt: Array(251).fill(0),
  hiNow: { res: 300, basin: 470, lake: 538 },
  hiPast: { res: NOMARK, basin: NOMARK, lake: NOMARK },
  lastDay: "1999-01-01"
};
for (let i = 95; i <= 105; i++) prior.silt[i] = 7;   /* a silted shelf at x≈400 */

const store = new Map([["nesiworld", JSON.stringify(prior)]]);

/* ---- the thinnest DOM that lets the boot path run ---- */
const noop = () => {};
const ctx = new Proxy({}, {
  get: (_, k) => {
    if (k === "createLinearGradient" || k === "createRadialGradient")
      return () => ({ addColorStop: noop });
    if (k === "canvas") return { clientWidth: 1000, clientHeight: 700 };
    return noop;
  },
  set: () => true
});
const el = () => ({
  value: "", style: {}, width: 0, height: 0,
  addEventListener: noop, removeEventListener: noop, focus: noop,
  setPointerCapture: noop, getContext: () => ctx,
  getBoundingClientRect: () => ({ left: 0, top: 0, width: 1000, height: 700 })
});

const sandbox = {
  document: { getElementById: el, activeElement: null, addEventListener: noop },
  localStorage: {
    getItem: k => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, String(v)),
    removeItem: k => store.delete(k)
  },
  performance: { now: () => Date.now() % 1e7 },
  requestAnimationFrame: noop,       /* nothing animates; boot only */
  addEventListener: noop, setInterval: noop, setTimeout: noop,
  innerWidth: 1000, innerHeight: 700, devicePixelRatio: 1,
  Math, JSON, Date, Float32Array, Array, Object, String, Number, isNaN,
  console
};
sandbox.window = sandbox;
vm.createContext(sandbox);
/* top-level let/const live in the script's declarative scope, not on the global
   object — one appended line hands them out without altering a byte above it */
vm.runInContext(
  src + "\n;globalThis.__X={S,groundY,terrAt,volumeAt,surfaceOf,BODIES,calm,cast,rebuildGround,LIP,SEATS};",
  sandbox, { filename: "world.html<script>" });

/* ---- what the boot actually produced ---- */
const X = sandbox.__X;
const S = X.S;
const today = (() => { const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" +
         String(d.getDate()).padStart(2, "0"); })();

let B5 = {};
const checks = [
  ["B1 the day rolled — lastDay is today",
    S.lastDay === today, S.lastDay],
  ["B2 yesterday's marks moved to the past",
    S.hiPast.res === 300 && S.hiPast.basin === 470 && S.hiPast.lake === 538,
    JSON.stringify(S.hiPast)],
  ["B3 today's marks were cleared",
    S.hiNow.res === NOMARK && S.hiNow.basin === NOMARK && S.hiNow.lake === NOMARK,
    JSON.stringify(S.hiNow)],
  ["B4 the silted bed stands HIGHER than the bed it was born with",
    Math.abs(X.groundY(400) - (X.terrAt(400) - 7)) < 0.01,
    "ground " + X.groundY(400).toFixed(2) + " vs born " + X.terrAt(400).toFixed(2)],
  /* the load-bearing one: silt must REMOVE capacity from the basin's own area
     table, or the waterline would sit on ground that is no longer there */
  ["B5 the area tables were rebuilt against the silted bed",
    (() => {
      const capNow = X.volumeAt(X.BODIES.basin, X.LIP);
      X.S.silt.fill(0); X.rebuildGround();
      const capBorn = X.volumeAt(X.BODIES.basin, X.LIP);
      B5 = { lost: capBorn - capNow, expect: 7 * 44, round:
        Math.abs(X.surfaceOf(X.BODIES.basin, X.volumeAt(X.BODIES.basin, 470)) - 470) };
      return B5.lost > 250 && B5.lost < 380 && B5.round < 0.6;
    })(),
    () => "capacity lost " + B5.lost.toFixed(0) + " (7px over 11 cells ≈ " +
          B5.expect + "), volume→surface round-trip err " + B5.round.toFixed(3)],
  ["B6 the world opens STILL (calm ~ 0)",
    X.calm() < 0.001, X.calm().toExponential(2)],
  ["B7 the first mirror re-derived itself onto the basin floor",
    S.aimedM[0] === false && typeof S.mirrors[0] === "number" &&
      Math.abs(X.cast(S.mirrors[0], 0).x - 330) < 8,
    "mirror " + S.mirrors[0].toFixed(3) + " lands x=" + X.cast(S.mirrors[0], 0).x.toFixed(1)],
  ["B7b a valley that has never rooted anything has ONE seat",
    S.seated === 1 && X.SEATS.length === 2,
    "seated " + S.seated + " of " + X.SEATS.length],
  ["B8 a missing-field save migrates without loss",
    Array.isArray(S.wet) && S.wet.length === 251 && S.silt.length === 251,
    "wet " + S.wet.length + " silt " + S.silt.length]
];

let bad = 0;
for (const [name, ok, detail] of checks) {
  if (!ok) bad++;
  console.log((ok ? "  ok   " : "  FAIL ") + name +
    "   [" + (typeof detail === "function" ? detail() : detail) + "]");
}
console.log(bad === 0
  ? "[boot_check] PASS — the boot path cold-starts correctly"
  : "[boot_check] FAIL — " + bad + " of " + checks.length);
process.exit(bad === 0 ? 0 : 1);
