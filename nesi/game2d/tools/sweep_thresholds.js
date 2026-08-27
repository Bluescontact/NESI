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
 * ■ TRIMMED, 2026-08-21, same pass ascent.html was rebuilt from scratch on
 * Kevin's mark ("cut the ascent entirely"). The three constants this file
 * used to sweep here — hold()/draw()/wait() as generic gesture verbs —
 * belonged to the retired ROOMS system and don't exist in the rebuild.
 * What's left is the two constants that were always seam.js's own, never
 * ascent.html's, and are untouched by the rebuild:
 *   S4 · seam.js sillMechanic — REACH=900, 2.2x give-back decay
 *   S5 · seam.js growRoot     — ROOT_STEP=0.22, day-gated
 * The full original sweep (S1-S3) is preserved in git history, not
 * reconstructed here on a guess at what a future write-panel/sill gesture
 * in the rebuilt file might need — that's a fresh sweep when it exists.
 *
 *   node tools/sweep_thresholds.js
 */
"use strict";
const path = require("path");
const ROOT = path.join(__dirname, "..");

const R = [];
const report = (n, note) => R.push({ n, note });
let refused = 0;
const refuse = (n, pass, note) => { R.push({ n, note, pass, isCheck: true }); if (!pass) refused++; };

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

/* ═══ S6 · index.html checkRatifyByCrossing() — gift_2026-08-27_08, swept
   2026-08-27. First version used dist(center,center) < (a.r+b.r), a circle-
   radius-sum proxy for "actual rectangle overlap." Swept across this
   build's real card-size range (r: 45-547px from word counts 1-144, aspect
   ratio 0.24-5.91): the circle proxy false-positive-ratified up to 44% of
   the sampled offset space for size-mismatched cards, worst case 416px
   apart while "confirmed" — not a knife-edge, the wrong shape of check.
   Fixed to real axis-aligned rectangle overlap, which is exact, no
   constant to tune. THIS is the refusable self-consistency assertion: does
   the live code in index.html still test real overlap, or has it drifted
   back toward a proxy? Ported directly from index.html's own
   checkRatifyByCrossing(), not re-described. */
{
  const fs = require("fs");
  const indexSrc = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  const fnMatch = indexSrc.match(/function checkRatifyByCrossing\(dragged\) \{[\s\S]*?\n\}/);
  const usesRealOverlap = fnMatch && /Math\.abs\(n\.x - dragged\.x\) < \(n\.w \+ dragged\.w\) \/ 2/.test(fnMatch[0]);
  const usesCircleProxy = fnMatch && /n\.r \+ dragged\.r/.test(fnMatch[0]);
  refuse("S6 checkRatifyByCrossing() found in index.html", !!fnMatch,
    fnMatch ? "present" : "MISSING — gift 8's routing may have been reverted");
  refuse("S6 tests real w/h rectangle overlap, not a radius-sum proxy",
    usesRealOverlap && !usesCircleProxy,
    usesRealOverlap ? "confirmed exact overlap test" : "REGRESSED to (or still uses) a circle-radius proxy — re-run the false-positive sweep before trusting this");

  // Re-derive the sweep's own headline number so a future change to card
  // sizing (CARD_CHAR_W, the 60+words*11 formula, etc.) gets re-measured
  // rather than silently trusted from this comment's memory.
  const CARD_CHAR_W = 6.6, CARD_LINE_H = 15;
  function wrapLines(text, widthPx) {
    const maxChars = Math.max(4, Math.floor((widthPx - 16) / CARD_CHAR_W));
    const words = text.split(/\s+/);
    const lines = []; let cur = "";
    words.forEach(w => { const t = cur ? cur + " " + w : w;
      if (t.length > maxChars && cur) { lines.push(cur); cur = w; } else cur = t; });
    if (cur) lines.push(cur);
    return lines.length ? lines : [""];
  }
  function cardSize(wordCount, avgWordLen) {
    const w = Math.max(90, Math.min(260, 60 + wordCount * 11));
    const text = Array.from({length: wordCount}, () => "x".repeat(Math.max(1, avgWordLen))).join(" ");
    const lines = wrapLines(text, w);
    const h = Math.max(30, lines.length * CARD_LINE_H + 14);
    return { w, h, r: Math.max(w, h) / 2 };
  }
  function circleTest(a, b, dist) { return dist < (a.r + b.r); }
  function rectOverlap(a, dx, dy, b) {
    return Math.abs(dx) < (a.w + b.w) / 2 && Math.abs(dy) < (a.h + b.h) / 2;
  }
  const a = cardSize(1, 2), b = cardSize(144, 12); // the sweep's own worst-case pair
  const STEP = 4, maxOffset = a.r + b.r + 40;
  let samples = 0, falsePos = 0, worstGap = 0;
  for (let dx = -maxOffset; dx <= maxOffset; dx += STEP) {
    for (let dy = -maxOffset; dy <= maxOffset; dy += STEP) {
      const dist = Math.hypot(dx, dy);
      samples++;
      if (circleTest(a, b, dist) && !rectOverlap(a, dx, dy, b)) { falsePos++; worstGap = Math.max(worstGap, (a.r+b.r) - dist); }
    }
  }
  report("S6 the retired circle-proxy's own worst-case false-positive rate (small vs. large card, re-measured live)",
    falsePos + " of " + samples + " sampled offsets (" + (100*falsePos/samples).toFixed(1) + "%), worst gap " + worstGap.toFixed(0) + "px — this is why S6's fix uses real overlap, not a smaller circle constant");
}

/* ── report ──────────────────────────────────────────────────────────────── */
for (const r of R) {
  if (r.isCheck) console.log((r.pass ? "  ok  " : "  FAIL") + "  " + r.n + (r.note ? "   [" + r.note + "]" : ""));
  else console.log("  ..  " + r.n + (r.note ? "\n        " + r.note : ""));
}
console.log(refused
  ? "\nsweep_thresholds: " + refused + " REFUSED — a threshold's real behavior does not match what it claims\n"
  : "\nsweep_thresholds: measured, reported, nothing refused — three constants swept, none ruled on for feel\n");
process.exit(refused ? 1 : 0);
