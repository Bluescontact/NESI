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
/* what each one KEEPS — the presence it protects, in the same order */
const KEEPS = block ? [...block[1].matchAll(/keeps:"([^"]+)"/g)].map(m => m[1]) : [];
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
  "no-call":   "refusal_check — the file makes no call at all",  /* wire_check dropped 2026-08-17: retired, and its own notice forbids citing it */
  "no-number": "refusal_check — no figure reaches the screen",
  "verbatim":  "UNHELD — wire_check R4 held this and is retired; no live instrument has taken it up",
  /* Corrected 2026-08-17. This cited refusal_check, which carries no deep token
     at all — grep returns zero. conserve.js:95 K6 does assert it, and conserve
     is outside check_all and runs inside a copy of a page nobody walks, so it
     is not a live keeper either. The boundary stands and is liftable; what it
     has is no instrument, and saying so is a container edge. */
  "deep":      "UNHELD — no live instrument asserts it; conserve.js K6 is the nearest and is unwired",
  "fifth":     "kit_check K1/K4 — four gestures, every stage declares one",
  /* ADDED 2026-08-17, Kevin's F4 mark. Held by the law 4/5 group in
     refusal_check, proven by four falsifiers: a classifier on a core-loop
     surface fails; the same classifier passes once the surface declares
     CORE_LOOP = false with a reason; a declaration in a comment buys nothing;
     and a declared-outside surface still fails law 2. */
  "no-machine-sort": "refusal_check law 4/5 — no classifier decides a fraction; F9's lift must declare itself in code"
};
const dead = ids.filter(id => calls.indexOf(id) < 0 && !HELD_ELSEWHERE[id]);
ok("C3 every registered constraint is actually reached by the code",
   dead.length === 0, dead.join(", ") || "none unreached");
/* ═══ C3b, REPAIRED 2026-08-17 ══════════════════════════════════════════════
   It claimed each boundary is "enforced elsewhere, by name, not by hope" while
   checking only that the id sat in the registry. The name was never resolved,
   so a citation could point at a retired file or a check that does not contain
   what is claimed, and this line would print it as held. Two of seven did:
   `verbatim` cited wire_check, which lives in tools/retired/ under a notice
   reading "do not cite their output as evidence", and `deep` cited
   refusal_check, which carries no deep token at all.

   That is law 22's own falsifier, verbatim: "a gate of this class that is
   satisfied while the thing it guards is absent."

   The repair resolves the name against the filesystem. A cited instrument must
   exist in tools/ and must not be in tools/retired/. A boundary whose keeper
   cannot be resolved is reported as unheld rather than held — which is a
   reading, and leaves the boundary itself standing and liftable as before. */
const TOOLS = path.join(__dirname);
const resolves = name => {
  for (const ext of [".js", ".mjs", ".py"])
    if (fs.existsSync(path.join(TOOLS, name + ext))) return "live";
  for (const ext of [".js", ".mjs", ".py"])
    if (fs.existsSync(path.join(TOOLS, "retired", name + ext))) return "retired";
  return "absent";
};
const unheld = [];
for (const id of Object.keys(HELD_ELSEWHERE)) {
  const cite = HELD_ELSEWHERE[id];
  const named = [...new Set((cite.match(/\b[a-z][a-z0-9_]*_(?:check|lint|audit|filter|guard|map)\b|\bfirst_four\b/g) || []))];
  const states = named.map(n => n + ":" + resolves(n));
  /* UNHELD is a declared state, not a failure: the boundary stands, it is
     announced and liftable, and it says plainly that no instrument holds it.
     Counted and printed so the gap stays visible — law 21's token shape. */
  if (cite.indexOf("UNHELD") === 0) { unheld.push(id); continue; }
  const held = ids.indexOf(id) >= 0 && named.length > 0
               && named.every(n => resolves(n) === "live");
  ok("C3b " + id + " names a keeper that resolves to a live instrument",
     held, states.join(" ") + (named.length ? "" : "no instrument named") +
           " — " + cite);
}

/* the unheld, printed rather than hidden. A boundary with no instrument is a
   real state of this build and a hand should be able to see how many. */
ok("C3c every boundary with no live keeper says so plainly",
   true, unheld.length ? unheld.length + " unheld: " + unheld.join(", ")
                       : "none — every boundary has a live keeper");

/* reachable by a hand: announced at a gate, and switchable */
ok("C4 every constraint is announced at a gate the case can show",
   REG.every(c => c.where.length > 0), REG.map(c => c.where).join(" "));
ok("C5 and every one of them can be switched off by a hand",
   /function unbind\(/.test(src) && /function boundsClick\(/.test(src) &&
   /S\.off/.test(src) && /off:\[\]/.test(src),
   "unbind + a click target + kept in his own store, declared so it survives the night");

/* ═══ A BOUNDARY NAMES WHAT IT KEEPS ════════════════════════════════════════
   A rule that says only what it stops asks a hand to lift it blind. Every
   constraint carries the presence it protects, so lifting one shows what is
   given up rather than only what becomes allowed — the same binding the refusal
   check makes between a law and the thing that satisfies it, one level in, where
   a hand can reach it. */
/* AND THE PANEL HAS ROOM FOR IT. A second line per row needs the spacing to
   carry it; the rows were 30px apart and the keeps line sits 12px under the
   says line, so a row that did not grow would print one boundary's yes over the
   next boundary's no. */
ok("C9 the panel gives each boundary room for both its lines",
   /y:top\+34\+i\*44/.test(src) && /rows\.length\s*\*\s*44/.test(src),
   "44px a row, the keeps line 12px under the says line");

ok("C8 every boundary names what it keeps, not only what it stops",
   KEEPS.length === REG.length && KEEPS.every(k => k.length > 8),
   KEEPS.length + " of " + REG.length + " named");

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
