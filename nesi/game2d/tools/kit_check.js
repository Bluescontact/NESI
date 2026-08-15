#!/usr/bin/env node
/*
 * KIT CHECK — the two things THE_KIT.md said were missing, held in place.
 *
 * Kevin, 2026-08-14: "build the four gesture verbs and one shared palette."
 *
 * 1 · THE FOUR GESTURES. Every stage must DECLARE which of the four it uses, and
 *     there must be no fifth. The dam's fault — an act that was a key nobody
 *     named, with no affordance at all — was found by a hand and not by a check,
 *     because nothing could ask a stage what its gesture was. Now it can.
 *
 * 2 · ONE PALETTE. ascent.html and daily.html must name the SAME materials with
 *     the SAME values. "One palette" that depends on someone remembering is two
 *     palettes with a delay, so this fails the moment they drift — including if
 *     one file quietly adds a material the other does not have.
 *
 *   node tools/kit_check.js
 */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
const ascent = fs.readFileSync(path.join(ROOT, "ascent.html"), "utf8");
const daily  = fs.readFileSync(path.join(ROOT, "daily.html"),  "utf8");

const results = [];
const ok = (n, pass, note) => results.push({ n, pass: !!pass, note: note == null ? "" : String(note) });

/* ── 1 · THE FOUR GESTURES ────────────────────────────────────────────────── */
const VERBS = ["reach", "hold", "draw", "wait"];
ok("K1 the four verbs exist and there is no fifth",
   /const GESTURES\s*=\s*\[([^\]]*)\]/.test(ascent) &&
   JSON.stringify(VERBS) === JSON.stringify(
     ascent.match(/const GESTURES\s*=\s*\[([^\]]*)\]/)[1].split(",").map(s => s.trim().replace(/"/g, ""))),
   ascent.match(/const GESTURES\s*=\s*\[([^\]]*)\]/)[1]);

for (const v of VERBS)
  ok("K2 " + v + " is a real verb, not a name in a list",
     new RegExp("function " + v + "\\s*\\(|function " + (v === "hold" ? "holding" : v) + "\\s*\\(").test(ascent));

/* every stage body declares its gesture */
const SET = ascent.slice(ascent.indexOf("const SET = {"));
const stages = [...SET.matchAll(/\n([a-z]+):\{\s*(g:"([a-z]+)",)?/g)]
  .map(m => ({ key: m[1], g: m[3] || null }));
const undeclared = stages.filter(s => !s.g);
ok("K3 every stage declares which gesture it is",
   stages.length >= 17 && undeclared.length === 0,
   stages.length + " stages · undeclared: " + (undeclared.map(s => s.key).join(", ") || "none"));
const wrong = stages.filter(s => s.g && VERBS.indexOf(s.g) < 0);
ok("K4 and no stage declares a gesture that is not one of the four",
   wrong.length === 0, wrong.map(s => s.key + ":" + s.g).join(", ") || "none");

/* the level that is actually built uses the verbs it declares */
const faceOf = k => { const i = SET.indexOf("\n" + k + ":{");
  const rest = SET.slice(i + 1); const j = rest.search(/\n[a-z]+:\{/);
  return j < 0 ? rest : rest.slice(0, j); };
/* THE METHOD NAMED draw(){ } IS NOT A USE OF THE VERB draw(). A check that
   counted it would pass every stage that renders anything, which is all of them
   — and it did: rain passed this line while still hand-rolling its drag. The
   call sites are matched; a method key, which is the name followed directly by
   `(){`, is not. */
const call = v => new RegExp("(?:^|[^\\w.])" + v + "\\((?!\\)\\s*\\{)");
const USES = { reach: call("reach"), hold: /(?:^|[^\w.])(hold|holding)\(/,
               draw: call("draw"), wait: call("wait") };
for (const k of ["tank", "rain", "dam", "channel"]) {
  const body = faceOf(k), g = stages.find(s => s.key === k).g;
  ok("K5 LEVEL ONE · " + k + " declares " + g + " and uses that verb",
     USES[g].test(body), g);
}
ok("K6 and no face of LEVEL ONE hand-rolls a hit test any more",
   ["tank", "rain", "dam", "channel"].every(k => !/Math\.hypot\(mouse/.test(faceOf(k))),
   "the verbs own the geometry now");

/* ── 2 · ONE PALETTE ──────────────────────────────────────────────────────── */
const palA = {};
const blockA = ascent.match(/const PAL\s*=\s*\{([\s\S]*?)\n\};/);
if (blockA) for (const m of blockA[1].matchAll(/(\w+)\s*:\s*"([^"]+)"/g)) palA[m[1]] = m[2];
const palD = {};
const blockD = daily.match(/:root\{([\s\S]*?)\n\s*\}/);
if (blockD) for (const m of blockD[1].matchAll(/--(\w+)\s*:\s*([^;]+);/g)) palD[m[1]] = m[2].trim();

ok("K7 both files declare a palette", Object.keys(palA).length > 0 && Object.keys(palD).length > 0,
   Object.keys(palA).length + " in ascent · " + Object.keys(palD).length + " in daily");

/* the shared materials must agree exactly. ascent carries two extras that are
   drawing conventions rather than materials (edge, quiet) and daily has no
   canvas outline convention to match them to — those are exempt by name, and by
   name only, so a real material can never slip through this hole. */
const EXEMPT = ["edge", "quiet"];
const namesA = Object.keys(palA).filter(k => EXEMPT.indexOf(k) < 0).sort();
const namesD = Object.keys(palD).sort();
ok("K8 the two files name the same materials",
   JSON.stringify(namesA) === JSON.stringify(namesD),
   "ascent-only: " + namesA.filter(n => namesD.indexOf(n) < 0).join(",") +
   " · daily-only: " + namesD.filter(n => namesA.indexOf(n) < 0).join(","));

const drift = namesA.filter(n => palA[n] !== palD[n]);
ok("K9 and give every material the same value — one world, one palette",
   drift.length === 0,
   drift.length ? drift.map(n => n + ": " + palA[n] + " vs " + palD[n]).join(" · ")
                : namesA.length + " materials, identical in both files");

/* and the palette has to be USED, or it is a comment */
ok("K10 daily's canvas draws from the palette, not from literals of its own",
   /const PAL\s*=\s*\(\(\)\s*=>/.test(daily) &&
   (daily.match(/g\.fillStyle\s*=\s*"#/g) || []).length === 0,
   (daily.match(/g\.fillStyle\s*=\s*"#/g) || []).length + " hex literals left on the canvas");

/* ── report ──────────────────────────────────────────────────────────────── */
let failed = 0;
for (const r of results) {
  if (!r.pass) failed++;
  console.log((r.pass ? "  ok  " : "  FAIL") + "  " + r.n + (r.note ? "   [" + r.note + "]" : ""));
}
console.log(failed ? "\nkit: " + failed + " FAILED\n"
                   : "\nkit: all " + results.length + " passed — four verbs, one palette\n");
process.exit(failed ? 1 : 0);
