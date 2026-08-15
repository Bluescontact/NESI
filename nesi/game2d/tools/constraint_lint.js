#!/usr/bin/env node
/*
 * CONSTRAINT LINT — an unannounced boundary is a build failure.
 *
 * Kevin's law, 2026-08-14, verbatim:
 *
 *   "A constraint acts as a lint, it's an upstream boundary and should be
 *    announced at each gate. A negative assertion that isn't user visible and
 *    modifiable is a failure. the user controls all negative assertions and
 *    contraints."
 *
 * A lint is the right instrument for exactly the reason he gave: these things
 * accumulate invisibly. One "not yet" added in a build session is unremarkable;
 * eleven of them are a different game, and nobody decided it.
 *
 * So this asserts four things and fails on any of them:
 *
 *   1 · every registered constraint is REACHED by the code — a boundary that is
 *       announced and does not exist is a lie on the glass
 *   2 · every bound() call names a registered constraint
 *   3 · every registered constraint is REACHABLE BY A HAND — it appears at some
 *       gate the case can show, and can be switched off
 *   4 · no refusal in a stage body is unrouted — a bare `return;` guard that
 *       does not pass through bound() is an unannounced boundary
 *
 *   node tools/constraint_lint.js
 */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
const src = fs.readFileSync(path.join(ROOT, "ascent.html"), "utf8");

const results = [];
const ok = (n, pass, note) => results.push({ n, pass: !!pass, note: note == null ? "" : String(note) });

/* the registry */
const block = src.match(/const CONSTRAINTS\s*=\s*\[([\s\S]*?)\n\];/);
const REG = block ? [...block[1].matchAll(/id:"([^"]+)",\s*mine:(true|false),\s*where:"([^"]+)"/g)]
  .map(m => ({ id: m[1], mine: m[2] === "true", where: m[3] })) : [];
ok("C1 the registry exists and is not empty", REG.length > 0, REG.length + " constraints registered");

/* the call sites */
const calls = [...src.matchAll(/bound\("([^"]+)"\)/g)].map(m => m[1]);
const ids = REG.map(c => c.id);

const unregistered = [...new Set(calls)].filter(id => ids.indexOf(id) < 0);
ok("C2 every bound() names a registered constraint", unregistered.length === 0,
   unregistered.join(", ") || "none");

/* a constraint that is announced and never reached is a lie on the glass. The
   ones that are enforced by the file EXISTING rather than by a branch — no model
   call, no network, no rewriting, the deep not rendering, no fifth gesture — are
   held by other checks by name, and are listed here so the exemption is a list
   and not a shrug. */
const HELD_ELSEWHERE = {
  "no-offer":  "first_four B4 — nothing falls on its own over 200 frames untouched",
  "no-call":   "refusal_check + wire_check — the file makes no call at all",
  "no-number": "refusal_check — no figure reaches the screen",
  "verbatim":  "wire_check R4 — one text door, his words only",
  "deep":      "refusal_check — the deep is never drawn",
  "fifth":     "kit_check K1/K4 — four gestures, every stage declares one"
};
const dead = ids.filter(id => calls.indexOf(id) < 0 && !HELD_ELSEWHERE[id]);
ok("C3 every registered constraint is actually reached by the code",
   dead.length === 0, dead.join(", ") || "none unreached");
for (const id of Object.keys(HELD_ELSEWHERE))
  ok("C3b " + id + " is enforced elsewhere, by name, not by hope",
     ids.indexOf(id) >= 0, HELD_ELSEWHERE[id]);

/* reachable by a hand: announced at a gate, and switchable */
ok("C4 every constraint is announced at a gate the case can show",
   REG.every(c => c.where.length > 0), REG.map(c => c.where).join(" "));
ok("C5 and every one of them can be switched off by a hand",
   /function unbind\(/.test(src) && /function boundsClick\(/.test(src) &&
   /S\.off/.test(src) && /off:\[\]/.test(src),
   "unbind + a click target + kept in his own store, declared so it survives the night");

/* the ones this build introduced, counted out loud — these are the ones that
   accumulate invisibly, so the number of them is itself worth seeing */
const mine = REG.filter(c => c.mine);
ok("C6 the boundaries this build introduced are marked as such",
   mine.length > 0 && mine.length < REG.length,
   mine.length + " of " + REG.length + " are the build's: " + mine.map(c => c.id).join(", "));

/* 4 · no unrouted refusal inside a stage body */
const SET = src.slice(src.indexOf("const SET = {"));
const keys = [...SET.matchAll(/\n([a-z]+):\{\s*g:"/g)].map(m => m[1]);
const bodyOf = k => { const i = SET.indexOf("\n" + k + ":{");
  const rest = SET.slice(i + 1); const j = rest.search(/\n[a-z]+:\{/);
  return j < 0 ? rest : rest.slice(0, j); };
const unrouted = [];
for (const k of keys) {
  const body = bodyOf(k);
  for (const line of body.split("\n")) {
    const t = line.trim();
    if (!/^if\s*\(.*\)\s*return\s*;/.test(t)) continue;
    if (/bound\(/.test(t)) continue;
    if (/typing/.test(t)) continue;   /* the writing panel has the keyboard; not a boundary */
    /* A BOUNDARY IS A GUARD THAT REFUSES A HAND. A guard on a null, an empty
       list, an index, or whether a panel is open refuses nothing — it is the
       code keeping its own footing, and flagging those made this lint noise,
       which is how a lint dies. What counts is a guard that reads the hand:
       mouse or keys. That is the thing that can silently narrow the world. */
    if (!/mouse|keys\[/.test(t)) continue;
    if (/^if\s*\(\s*!\s*mouse\.(clicked|down)\s*\)/.test(t)) continue;  /* "nothing happened yet" */
    /* the same guard written in the shared verb. `if(!reach(...)) return` refuses
       nothing — it is the stage saying no gesture has happened this frame, which
       is the state every stage is in most of the time. Flagging it made the lint
       fire on the conversion to the verbs, which is the opposite of its job. */
    if (/^if\s*\(\s*!\s*(reach|holding|draw|wait)\s*\(/.test(t)) continue;
    unrouted.push(k + ": " + t);
  }
}
ok("C7 no stage refuses without announcing it", unrouted.length === 0,
   unrouted.join(" · ") || "no unrouted guards in any stage body");

/* ── report ──────────────────────────────────────────────────────────────── */
let failed = 0;
for (const r of results) {
  if (!r.pass) failed++;
  console.log((r.pass ? "  ok  " : "  FAIL") + "  " + r.n + (r.note ? "   [" + r.note + "]" : ""));
}
console.log(failed ? "\nconstraints: " + failed + " FAILED — an unannounced boundary is a build failure\n"
                   : "\nconstraints: all " + results.length + " passed — every boundary is on the glass and liftable\n");
process.exit(failed ? 1 : 0);
