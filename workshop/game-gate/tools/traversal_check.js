#!/usr/bin/env node
/*
 * TRAVERSAL CHECK — the fourth source cannot become the fifth.
 *
 * The display law was widened on 2026-08-17 to admit what a writing has CROSSED
 * as a driver of appearance. A widening is where a law gets defeated, and there
 * are exactly two ways this one can be:
 *
 *   1 · by the record acquiring a model's output text, so that a display state
 *       ends up derived from what a return SAID
 *   2 · by a surface label acquiring properties, so that "it crossed Claude"
 *       becomes "Claude means analytical" and the organ is a classifier
 *
 * Both are asserted here against the source, not asked for in a comment.
 *
 * IT REFUSES. Unlike standing_check, which reports on lost support because the
 * cheapest way back to green would be deleting the claim, there is no honest
 * reason for this to go amber: a text field in the record or a branch on a
 * surface name is a breach of the law itself, not a change in the world.
 *
 *   node tools/traversal_check.js
 */
"use strict";
const fs = require("fs");
const path = require("path");
const T = require("./traversal.js");

const HERE = __dirname, GAME = path.join(HERE, "..");
const results = [];
const ok = (n, pass, note) => results.push({ n, pass: !!pass, note: note == null ? "" : String(note) });

const organSrc = fs.readFileSync(path.join(HERE, "traversal.js"), "utf8");
const storeSrc = fs.readFileSync(path.join(GAME, "TRAVERSALS.jsonl"), "utf8");
/* comments in a file whose whole subject is these refusals necessarily NAME the
   forbidden words — refusal_check's own reasoning. Strip them first. */
const strip = s => s.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/^\s*\/\/.*$/gm, " ");
const organ = strip(organSrc), store = strip(storeSrc);

/* ── T1 · there is nowhere to put a return's content ──────────────────────── */
const TEXT_FIELDS = ["output", "text", "result", "response", "content", "body",
                     "completion", "answer", "reply", "message"];
const inOrgan = TEXT_FIELDS.filter(f => new RegExp("[{,]\\s*" + f + "\\s*[,:}]").test(organ));
ok("T1 the organ has no field for a return's content",
   inOrgan.length === 0,
   inOrgan.length ? "FOUND: " + inOrgan.join(", ") : "none of: " + TEXT_FIELDS.join(" "));

const inStore = TEXT_FIELDS.filter(f => new RegExp('"' + f + '"\\s*:').test(store));
ok("T2 the store holds no return's content", inStore.length === 0,
   inStore.length ? "FOUND: " + inStore.join(", ") : "clean");

/* ── T3 · the organ never branches on a surface's value ───────────────────── */
/* a surface with properties is a classifier wearing a label */
const branchOnSurface = [
  /surface\s*===/, /surface\s*==[^=]/, /surface\s*!==/,
  /SURFACES\s*=\s*\{/, /surface\.(?!length)[a-z]/i,
  /\[\s*(?:c\.)?surface\s*\]/
].filter(re => re.test(organ)).map(re => re.source);
ok("T3 no code path branches on what a surface is",
   branchOnSurface.length === 0,
   branchOnSurface.length ? "FOUND: " + branchOnSurface.join(" | ")
                          : "surfaces are counted and grouped, never compared to a literal");

/* ── T4 · the seven gestures are closed, with no fallback ─────────────────── */
const names = Object.keys(T.GESTURES);
ok("T4 the gestures are the seven, closed, and there is no eighth",
   names.length === 7 && !names.includes("other") && !names.includes("unknown"),
   names.join(" · "));

let threw = false;
try { T.cross({ from: "doc:0", to: "doc:9", gesture: "reframe", surface: "x" }); }
catch (e) { threw = true; }
ok("T5 a gesture outside the seven is refused rather than absorbed", threw);

/* ── T6 · the store loads, and every crossing names objects that exist ────── */
let S = null, loadErr = null;
try { S = T.load(); } catch (e) { loadErr = e.message; }
ok("T6 the store loads", !!S, loadErr || (S ? Object.keys(S.objects).length + " objects · " + S.crossings.length + " crossings" : ""));

if (S) {
  const dangling = [];
  for (const c of S.crossings) {
    for (const f of c.from) if (!S.objects[f]) dangling.push(c.gesture + " from " + f);
    if (c.to && !S.objects[c.to]) dangling.push(c.gesture + " to " + c.to);
  }
  ok("T7 every crossing names objects that exist", dangling.length === 0,
     dangling.length ? dangling.join("; ") : "no dangling ends");

  /* ── T8 · the form carries no number ───────────────────────────────────── */
  /* law 2 — a reading may count; what reaches a display state may not */
  const forms = Object.keys(S.objects).map(id => T.formOf(T.readingOf(S, id)));
  const numeric = forms.flatMap(f => Object.entries(f).filter(([, v]) => typeof v === "number").map(([k]) => k));
  ok("T8 nothing in the display form is a number",
     numeric.length === 0,
     numeric.length ? "FOUND: " + [...new Set(numeric)].join(", ")
                    : "form values are shape words and booleans only");

  /* ── T9 · presence — a run that reads nothing must not print green ─────── */
  ok("T9 the store is not empty", S.crossings.length > 0 && Object.keys(S.objects).length > 0,
     S.crossings.length + " crossings");

  /* ── T10..T13 · THE SITING — the keeper's "site traversal on the radii" ───────── */
  const SOLID = require(path.join(GAME, "solid.js"));
  const SD = SOLID.SOLID || SOLID;

  const seated = Object.keys(S.objects).map(id => (S.objects[id] || {}).seat);
  ok("T10 every object declares a seat, and it is one of the twelve",
     seated.length > 0 && seated.every(x => SD.NAMES.includes(x)),
     [...new Set(seated)].join(" · ") || "none declared");

  const radii = SD.NAMES.map(n => T.radiusOf(S, n));
  ok("T11 a traversal radius is not a walk, and never becomes one",
     radii.every(r => r.member === null),
     "member:null on all " + radii.length + " — mirroring solid.js:422");

  /* The distinction collapses if a radius ever has a member beside it: a seat
     and its opposite adjacent would make the diameter walkable. */
  ok("T12 no radius has a member beside it — antipodes are never adjacent",
     SD.RADII.every(r => !SD.isMember(r.seat, r.opposite)),
     "all six diameters cross the centre and none is walkable");

  /* NO DIRECTION IS COMPUTED. Whether a worked seat draws nearer the game or
     stands further off is his fork; a sign appearing here would be a session
     ruling it by implementation. */
  /* T14 · THE FORM MAY NOT CONTRADICT ITSELF. Added the day the organ met its
     first real event and reported three objects as both ended and still out.
     A display state that says two incompatible things is worse than one that
     says nothing, because it reads as detail. */
  const contradictions = Object.keys(S.objects)
    .map(id => ({ id, f: T.formOf(T.readingOf(S, id)) }))
    .filter(x => (x.f.pruned && x.f.waiting) || (x.f.resting && x.f.waiting) ||
                 (x.f.open && x.f.arms !== "none"));
  ok("T14 no object's form says two incompatible things at once",
     contradictions.length === 0,
     contradictions.length
       ? contradictions.map(x => x.id + ": " + JSON.stringify(x.f)).join("; ")
       : "checked " + Object.keys(S.objects).length + " objects");

  const rforms = SD.NAMES.map(n => T.radiusFormOf(T.radiusOf(S, n)));
  const signed = /nearer|further|toward|inward|outward|shorten|lengthen/
     .test(organ);
  ok("T13 no direction is computed for a displaced radius — that fork is unmarked",
     !signed && rforms.every(f => !("direction" in f) && !("sign" in f)),
     signed ? "a direction word reached live code" : "magnitude only, no sign");
}

console.log("\nTHE TRAVERSAL ORGAN — the fourth source stays the fourth\n");
for (const r of results)
  console.log("  " + (r.pass ? "ok  " : "FAIL") + "  " + r.n + (r.note ? "\n          " + r.note : ""));

if (S) {
  console.log("\n  what the record says about each object, as form — no numbers reach here:\n");
  for (const id of Object.keys(S.objects)) {
    const f = T.formOf(T.readingOf(S, id));
    const said = Object.entries(f).filter(([, v]) => v && v !== "none").map(([k, v]) => v === true ? k : k + ":" + v);
    console.log("    " + id.padEnd(8) + (said.join(" · ") || "—"));
  }
  const SOLID2 = require(path.join(GAME, "solid.js"));
  const SD2 = SOLID2.SOLID || SOLID2;
  console.log("\n  the twelve radii — traversal's siting, as form:\n");
  for (const n of SD2.NAMES) {
    const rf = T.radiusFormOf(T.radiusOf(S, n));
    console.log("    " + n.padEnd(15) + rf.standing);
  }
}

const failed = results.filter(r => !r.pass);
console.log("\n[traversal_check] " + (results.length - failed.length) + " of " + results.length + " hold");
process.exit(failed.length ? 1 : 0);
