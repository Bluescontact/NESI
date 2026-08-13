#!/usr/bin/env node
/*
 * STILL CHECK — does the valley actually go quiet?
 *
 * THE STILLING's whole claim is that the page stops asking for frames. That is
 * a claim about a loop terminating, and a browser cannot answer it by looking:
 * a world that never stills and a world that stilled correctly render the same
 * still picture. So the real frame() is driven here against a synthetic clock
 * and a requestAnimationFrame that records instead of scheduling, and the
 * question is simply: does the queue ever come up empty?
 *
 * A loop that never terminates is the failure this file exists to catch — it
 * caught one (sediment load decaying exponentially re-dirtied the bed every
 * frame forever, so the world could not finish going still).
 *
 * Usage:  node tools/still_check.js
 */
const fs = require("fs"), path = require("path"), vm = require("vm");
const src = fs.readFileSync(path.join(__dirname, "..", "world.html"), "utf8")
  .match(/<script>([\s\S]*?)<\/script>/)[1];

let clock = 1e6;                    /* ms; advanced by hand */
let queue = [];
const noop = () => {};
const ctx = new Proxy({}, { get: (_, k) =>
  (k === "createLinearGradient" || k === "createRadialGradient")
    ? () => ({ addColorStop: noop })
    : (k === "canvas" ? { clientWidth: 1000, clientHeight: 700 } : noop),
  set: () => true });
const el = () => ({ value: "", style: {}, width: 0, height: 0,
  addEventListener: noop, focus: noop, setPointerCapture: noop,
  getContext: () => ctx,
  getBoundingClientRect: () => ({ left: 0, top: 0, width: 1000, height: 700 }) });

const sandbox = {
  document: { getElementById: el, activeElement: null, addEventListener: noop },
  localStorage: { getItem: () => null, setItem: noop, removeItem: noop },
  performance: { now: () => clock },
  requestAnimationFrame: cb => { queue.push(cb); return queue.length },
  addEventListener: noop, setInterval: noop, setTimeout: noop,
  innerWidth: 1000, innerHeight: 700, devicePixelRatio: 1,
  Math, JSON, Date, Float32Array, Array, Object, String, Number, isNaN, console
};
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(src + "\n;globalThis.__X={S,stir,load,calm,BODIES,volumeAt,surfaceOf,groundY};",
  sandbox, { filename: "world.html<script>" });
const X = sandbox.__X, S = X.S;

/* run until the loop stops asking, or give up */
function run(limitFrames) {
  let n = 0;
  while (queue.length && n < limitFrames) {
    const due = queue; queue = [];
    clock += 16.7; n++;
    for (const cb of due) cb(clock);
  }
  return { frames: n, stillGoing: queue.length > 0 };
}

const checks = [];
/* 1 · an untouched world paints once and stops */
let r = run(600);
checks.push(["S1 an untouched valley paints and stops",
  !r.stillGoing && r.frames <= 3, "stopped after " + r.frames + " frame(s)"]);

/* 2 · a stirred world with water and sediment in it settles and stops */
S.res = 6000; S.basin = 2500;
X.load.res = 0.6; X.load.basin = 0.6; X.load.lake = 0.4;
X.stir();
r = run(6000);
const seconds = (r.frames * 16.7 / 1000).toFixed(1);
checks.push(["S2 a stirred, silt-laden valley goes still on its own",
  !r.stillGoing, r.stillGoing ? "STILL RUNNING after " + r.frames + " frames"
                              : "quiet after " + r.frames + " frames (~" + seconds + "s)"]);
/* the sited mechanic quiets at amplitude 0.3 of a swell of 6 — 22000·ln(20),
   about 66s. anything much shorter is a snap; much longer is a loop running on
   after the world has visibly finished moving. */
checks.push(["S3 it quiets on the sited decay's own clock (~66s)",
  r.frames > 3500 && r.frames < 4300, "~" + seconds + "s"]);
checks.push(["S4 the sediment reached zero rather than approaching it",
  X.load.res === 0 && X.load.basin === 0 && X.load.lake === 0,
  "res " + X.load.res + " basin " + X.load.basin + " lake " + X.load.lake]);
checks.push(["S5 the bed was actually changed by the settling",
  S.silt.some(v => v > 0.01), "cells silted: " + S.silt.filter(v => v > 0.01).length]);

/* 3 · the hand starts it again */
X.stir();
r = run(50);
checks.push(["S6 a stir wakes it back up", r.frames > 0, r.frames + " frame(s) ran"]);

let bad = 0;
for (const [name, ok, detail] of checks) {
  if (!ok) bad++;
  console.log((ok ? "  ok   " : "  FAIL ") + name + "   [" + detail + "]");
}
console.log(bad === 0 ? "[still_check] PASS — the valley goes quiet and wakes"
                      : "[still_check] FAIL — " + bad + " of " + checks.length);
process.exit(bad === 0 ? 0 : 1);
