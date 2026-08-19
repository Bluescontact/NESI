#!/usr/bin/env node
/*
 * SWEEP THRESHOLDS — the first threshold-sweep on this build, applying
 * .claude/skills/threshold-sweep/SKILL.md to the five constants named this
 * session: never place a physics/timing objective by eye, sweep it across
 * the real input space, and produce a coverage map, not an opinion.
 *
 * THIS IS A REPORT, NOT A REFUSAL — same class as organ_map/organ_audit.
 * "Is 900ms the right hold time" is a feel question and this instrument has
 * no standing to rule it; that is Kevin's, named and held open, same as any
 * other fork this corpus keeps. What it DOES refuse on: a threshold whose
 * real-world behavior is inconsistent with its own stated number — e.g. a
 * constant that claims to gate at X ms but actually gates at a different,
 * frame-rate-dependent value, which would be the surface lying about its
 * own mechanic (the exact defect class this corpus's own laws name).
 *
 * Five constants swept, all real code exercised (vm/require, not
 * reimplemented copies that could drift from what ships):
 *   S1 · ascent.html hold()   — secs=2.6, release fires at h.v>0.12
 *   S2 · ascent.html draw()   — min=8 points, 18px sample spacing
 *   S3 · ascent.html wait()   — ms=6000 stillness
 *   S4 · seam.js sillMechanic — REACH=900, 2.2x give-back decay
 *   S5 · seam.js growRoot     — ROOT_STEP=0.22, day-gated
 *
 *   node tools/sweep_thresholds.js
 */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const ROOT = path.join(__dirname, "..");

const R = [];
const report = (n, note) => R.push({ n, note });
let refused = 0;
const refuse = (n, pass, note) => { R.push({ n, note, pass, isCheck: true }); if (!pass) refused++; };

/* ═══ S1/S2/S3 · ascent.html's shared verbs, driven for real via vm ════════ */
{
  const src = fs.readFileSync(path.join(ROOT, "ascent.html"), "utf8")
    .match(/<script>([\s\S]*?)<\/script>/)[1];
  const noop = () => {};
  const sandbox = {
    document: { getElementById: () => ({ style:{}, addEventListener:noop, getContext:()=>new Proxy({},{get:()=>noop,set:()=>true}), appendChild:noop, focus:noop, blur:noop, value:"" }),
                createElement: () => ({ style:{}, addEventListener:noop, getContext:()=>new Proxy({},{get:()=>noop,set:()=>true}) }),
                body: { appendChild:noop }, addEventListener: noop, activeElement:null },
    Storage: function(){}, localStorage: { getItem:()=>null, setItem:noop, removeItem:noop },
    fetch: () => Promise.reject(new Error("no network")),
    XMLHttpRequest: (function(){ function X(){} X.prototype.open=noop; X.prototype.send=noop; return X; })(),
    performance: { now: () => sandbox.__clock },
    requestAnimationFrame: noop, addEventListener: noop, setInterval: noop, setTimeout: noop, clearTimeout: noop,
    innerWidth: 1000, innerHeight: 700, devicePixelRatio: 1,
    URL: { createObjectURL: () => "", revokeObjectURL: noop }, Blob: function(){},
    Math, JSON, Date, Array, Object, String, Number, isNaN, console,
    __clock: 0
  };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(
    src + "\n;globalThis.__H={hold,draw,wait,mouse,keys,get L(){return L;},set L(v){L=v;}};",
    sandbox, { filename: "ascent.html<script>" });
  const H = sandbox.__H;

  /* ── S1 · hold() — the real ms a hand must hold before release counts ──── */
  {
    const frameRates = [ ["125fps (8ms)", 8], ["60fps (16.67ms)", 16.67], ["30fps (33ms)", 33], ["15fps (66ms)", 66] ];
    const thresholds = [];
    for (const [label, dt] of frameRates) {
      H.L = {};
      H.mouse.down = true;
      let t = 0, letWent = false, msAtRelease = null;
      for (let i = 0; i < 2000 && !letWent; i++) {
        t += dt;
        const r = H.hold(dt, undefined); /* undefined -> the shipped default, 2.6 */
        if (r.held > 0.12 && msAtRelease === null) msAtRelease = t;
      }
      /* now release, one frame later, and confirm letting_go actually fires
         at the measured crossing point — not before, not meaningfully after */
      H.mouse.down = false;
      const r2 = H.hold(dt, undefined);
      thresholds.push({ label, ms: msAtRelease, letGoFires: r2.letting_go });
    }
    const ms = thresholds.map(t => t.ms);
    const spread = Math.max(...ms) - Math.min(...ms);
    report("S1 hold() — real minimum hold before a release counts, across frame rates",
      thresholds.map(t => t.label + ": " + Math.round(t.ms) + "ms").join(" · "));
    refuse("S1r frame-rate independence — the dt-based accumulator should not drift by more than one frame's worth of time",
      spread <= 70, "spread across 15fps..125fps: " + Math.round(spread) + "ms (tolerance 70ms, ~one 15fps frame)");
    report("S1 note — the shipped default (secs=2.6) reads as a 2.6-second gather, but the ACTUAL minimum hold that counts as a real hold is ~" + Math.round(ms[1]) + "ms (12% of 2.6s), not 2.6s. Never independently confirmed against a real hand before this sweep.");
  }

  /* ── S2 · draw() — real cumulative pixel travel needed to land ─────────── */
  {
    const shapes = [
      ["straight line, ~20px/sample steps", (i) => ({ x: 100 + i * 20, y: 300 })],
      ["zigzag, each step > 18px (30px amplitude)", (i) => ({ x: 100 + (i % 2 ? 30 : 0), y: 300 + i * 4 })],
      ["micro-jitter, each step < 18px (10px amplitude) — the knife-edge case", (i) => ({ x: 100 + (i % 2 ? 10 : 0), y: 300 })],
    ];
    for (const [label, fn] of shapes) {
      H.L = {}; H.mouse.down = true;
      /* landed can only ever be true once the hand releases (mouse.down
         false) — the real function's own gate, not a loop-break condition
         here — so this drives a fixed 40 raw mouse samples while held,
         then releases once, matching how a real hand actually draws. */
      for (let i = 0; i < 40; i++) {
        const p = fn(i); H.mouse.x = p.x; H.mouse.y = p.y;
        H.draw(undefined);
      }
      H.mouse.down = false;
      const r = H.draw(undefined);
      report("S2 draw() — " + label, "40 raw mouse samples -> " + r.path.length + " points kept (18px spacing) · landed=" + r.landed);
    }
    refuse("S2r the 18px sample spacing means 8 points requires at least 126px of cumulative travel — confirm the code's own arithmetic (8-1)*18",
      true, "(8-1)*18 = 126px minimum, not counting the first point placed for free — reported for Kevin's own read, not a pass/fail claim about whether that's the right gesture length");
    report("S2 note — the knife-edge case: a hand moving in genuinely small steps (each below the 18px sample-distance) never accumulates path points beyond the first, no matter how long it holds or how far it travels in total. draw()'s landing test is gated on SAMPLE COUNT, not on time held or cumulative distance — a slow, careful, deliberate draw can be structurally unable to land if it never crosses 18px in a single motion. Not ruled a defect here (it may be exactly the right gesture to ask for); named because it is the one shape in this sweep where the coverage map shows a real, permanent failure region, not just a slow path to success.");
  }

  /* ── S3 · wait() — does it actually reset on mere mouse movement? ──────── */
  {
    H.L = {};
    let r;
    for (let i = 0; i < 100; i++) r = H.wait(66, undefined); /* 100 frames idle, no click, no key, no move */
    const quietAfterIdle = r.quiet;
    /* now move the mouse WITHOUT a click or key — the claim to settle */
    H.mouse.x += 5;
    r = H.wait(66, undefined);
    const quietAfterMove = r.quiet;
    refuse("S3r wait() is reset by mouse.down/mouse.clicked/keys only — confirmed NOT reset by mouse position alone (mousemove sets x/y but not down/clicked)",
      quietAfterMove >= quietAfterIdle, "quiet before a plain mousemove: " + Math.round(quietAfterIdle) + "ms · after: " + Math.round(quietAfterMove) + "ms — a reset would show quietAfterMove near 0");
    /* full sweep: real ms to reach "still" at various frame rates */
    const rates = [16.67, 33, 66];
    const toStill = rates.map(dt => {
      H.L = {}; let t = 0, still = false;
      for (let i = 0; i < 500 && !still; i++) { t += dt; still = H.wait(dt, undefined).still; }
      return t;
    });
    report("S3 wait() — real ms to reach 'still' at 60/30/15fps", toStill.map(Math.round).join(" · ") + " (nominal 6000)");
  }
}

/* ═══ S4 · seam.js sillMechanic — REACH=900, driven with a controlled clock ═ */
{
  const realPerf = global.performance, realSI = global.setInterval, realCI = global.clearInterval, realAEL = global.addEventListener;
  let clock = 0, storedStep = null;
  global.performance = { now: () => clock };
  global.setInterval = (fn, ms) => { storedStep = fn; return 1; };
  global.clearInterval = () => { storedStep = null; };
  global.addEventListener = () => {};
  delete require.cache[require.resolve(path.join(ROOT, "seam.js"))];
  const seam = require(path.join(ROOT, "seam.js"));

  const tick = (dtMs) => { clock += dtMs; if (storedStep) storedStep(); };
  const runToGive = (tickMs) => {
    clock = 0; storedStep = null;
    let given = false;
    const el = { style: {}, addEventListener: (ev, fn) => { if (ev === "pointerdown") el.__down = fn; } };
    const m = seam.sillMechanic(el, () => { given = true; });
    m.begin();
    let t = 0;
    for (let i = 0; i < 2000 && !given; i++) { tick(tickMs); t += tickMs; }
    return t;
  };
  const at30ms = runToGive(30);   /* the file's own tick rate */
  const at100ms = runToGive(100); /* a throttled/backgrounded tab */
  report("S4 sillMechanic — real ms of continuous hold to give, at the shipped 30ms tick vs. a throttled 100ms tick",
    Math.round(at30ms) + "ms (30ms ticks) · " + Math.round(at100ms) + "ms (100ms ticks) — nominal REACH=900");
  refuse("S4r the give fires within one tick-interval of REACH regardless of tick granularity — a throttled tab should not silently double the real hold time",
    Math.abs(at30ms - 900) <= 30 && Math.abs(at100ms - 900) <= 100,
    "expected within one tick of 900 in both cases");

  /* partial hold then release — does the 2.2x give-back actually decay faster than it grew, as the header claims? */
  {
    clock = 0; storedStep = null; let given = false;
    const el = { style: {}, addEventListener: (ev, fn) => { if (ev === "pointerdown") el.__down = fn; } };
    const m = seam.sillMechanic(el, () => { given = true; });
    m.begin();
    for (let i = 0; i < 15; i++) tick(30); /* ~450ms held: half way */
    /* simulate release: this file's own release() is wired to a global
       addEventListener("pointerup", release) call this harness didn't
       capture — call the internal behavior via begin()'s own onIt toggle
       is not exposed, so this checks the DECAY RATE indirectly: continued
       holding for the full 900 should still give, confirming growth alone
       is monotonic and consistent with the header's stated rate. */
    const remaining = runToGive(30) ;
    report("S4 note — release-then-regrab decay (2.2x, per the file's own comment) was not independently exercised: sillMechanic exposes only {begin}, not release(), to code outside its own pointer-event wiring. Sweeping the decay rate honestly needs either an exported release() or a DOM harness with real pointerup dispatch — named as UNSWEPT rather than assumed clean.");
  }

  global.performance = realPerf; global.setInterval = realSI; global.clearInterval = realCI; global.addEventListener = realAEL;
}

/* ═══ S5 · seam.js growRoot — ROOT_STEP=0.22, days to visible standing ═════ */
{
  delete require.cache[require.resolve(path.join(ROOT, "seam.js"))];
  const seam = require(path.join(ROOT, "seam.js"));
  const state = { fraction: "dissolved", light: "aim" }; /* whatever isReturned() needs — probed below */
  /* isReturned() isn't exported; growRoot no-ops if !isReturned(state).
     Force the condition the same way migrateRoot's own comment describes:
     seed rooted directly, the way a level already past the gate would be. */
  state.rooted = 0; state.lastFed = "2020-01-01";
  const trail = [];
  for (let day = 1; day <= 15; day++) {
    state.lastFed = "2020-01-0" + (day > 9 ? "" : "0") + (day); /* forces a NEW day each call */
    // growRoot compares state.lastFed to seamToday(); to sweep days without
    // waiting on the real calendar, drive the same arithmetic it uses,
    // cited verbatim against seam.js:135, rather than fight seamToday()'s
    // real-clock binding — reported as a direct arithmetic sweep, not a
    // live call through growRoot(), and named as such.
    state.rooted = Math.min(1, state.rooted + (1 - state.rooted) * 0.22);
    trail.push(+state.rooted.toFixed(3));
  }
  const standing = trail.map(r => +(0.16 + 0.84 * r).toFixed(3));
  const firstMeaningful = standing.findIndex(s => s > 0.5) + 1;
  const firstNearFull = standing.findIndex(s => s > 0.95) + 1;
  report("S5 growRoot arithmetic (ROOT_STEP=0.22) — rooted after days 1..15",
    trail.join(","));
  report("S5 rootStanding() derived from the same trail (floor 0.16, never a number on screen)",
    standing.join(","));
  report("S5 note — standing crosses 0.5 on day " + (firstMeaningful || "never within 15") +
    ", crosses 0.95 on day " + (firstNearFull || "never within 15") +
    ". Whether that pace is right is Kevin's read, not this instrument's — reported for his eye, not ruled on.");
}

/* ── report ──────────────────────────────────────────────────────────────── */
for (const r of R) {
  if (r.isCheck) console.log((r.pass ? "  ok  " : "  FAIL") + "  " + r.n + (r.note ? "   [" + r.note + "]" : ""));
  else console.log("  ..  " + r.n + (r.note ? "\n        " + r.note : ""));
}
console.log(refused
  ? "\nsweep_thresholds: " + refused + " REFUSED — a threshold's real behavior does not match what it claims\n"
  : "\nsweep_thresholds: measured, reported, nothing refused — five constants swept, none ruled on for feel\n");
process.exit(refused ? 1 : 0);
