#!/usr/bin/env node
/*
 * FRAMING CHECK — negative form belongs in a lint or at a container's edge.
 *
 * Kevin's law, 2026-08-17, verbatim from CLAUDE.md:
 *
 *   "i want to remove all negative framing... that's fine if the negative
 *    framing is a lint, or the edge of a container... but a generalized or
 *    specific negative assert creates a leakage in the context lense."
 *
 *   "Negative form belongs in two places and holds well there: a LINT, which
 *    refuses one named thing at a gate, and the EDGE OF A CONTAINER, which says
 *    where the container ends. Stated as a general or specific assertion in
 *    prose it leaks into the lens and narrows what comes after it, invisibly and
 *    downstream. So: write what holds, what is available, and what a thing does."
 *
 * ── WHY THIS EXISTS ──────────────────────────────────────────────────────────
 *
 * The law has been live in the boot path since the morning of 2026-08-17 and NO
 * INSTRUMENT READ IT. That gap has a measured cost: §4 of THE_VISION_2026-08-17
 * — the return, the most open-handed mechanic in the design — sat at 41 negative
 * constructions per thousand words, describing a gift as a stack of denials, and
 * it passed an adversarial audit, a ground pass and a full converge without one
 * of them flagging it.
 *
 * IT PASSED BECAUSE EVERY OTHER INSTRUMENT HERE TESTS WHETHER A CLAIM IS TRUE.
 * A true sentence in negative form is correct, survives every check in the
 * suite, and still narrows the aperture. Truth and framing are different
 * properties and nothing was measuring the second one.
 *
 * ── THE RULE, AND WHY IT CARRIES NO MAGIC NUMBER ─────────────────────────────
 *
 * A threshold picked by a session is a session ruling a matter of taste. This
 * one is self-calibrating and derived from the document's own structure:
 *
 *     NO PROSE SECTION MAY CARRY A HIGHER DENSITY OF NEGATIVE FORM THAN THE
 *     DOCUMENT'S OWN LINTS AND CONTAINER EDGES.
 *
 * A law list is SUPPOSED to be dense with refusals; that is what a lint is. An
 * open-forks section is supposed to say where the container ends. When a passage
 * describing what the world DOES is more negative than the list of things the
 * world REFUSES, the framing has inverted — and that inversion is the exact
 * shape the law names. It needs no number to detect.
 *
 * ── DECLARED, NEVER INFERRED ─────────────────────────────────────────────────
 *
 * A section is a lint or an edge because it SAYS SO, in the file, on one line:
 *
 *     <!-- framing: lint -->     this section refuses named things at a gate
 *     <!-- framing: edge -->     this section says where the container ends
 *
 * Nothing here works out which is which. Law 5 — the hand runs the filter, no
 * classifier decides what a fraction is — and a framing classifier would be the
 * same organ one level up. An undeclared section is measured as prose, so the
 * default is to be measured and a section hides only by a hand declaring it.
 *
 * ── WHAT THIS CANNOT DO, said rather than left as silence ────────────────────
 *
 * It is a word list over prose. It cannot see a sentence that narrows without
 * using one of these words, it cannot tell a load-bearing refusal from a
 * habitual one, and it has no opinion about whether any individual sentence
 * should change. It measures placement and reports it. The reading is a hand's.
 *
 *   node tools/framing_check.js
 */
"use strict";
const fs = require("fs");
const path = require("path");

const GAME = path.join(__dirname, "..");
const CORPUS = path.join(GAME, "..", "..");

/* Assertions of absence or negation. The LINT VERBS are deliberately absent —
   `refuses`, `forbids`, `may not` are the vocabulary a lint is written in, and
   counting them would penalise a section for being the thing the law permits. */
const NEGATIVE = [
  /\bdoes not\b/gi, /\bdo not\b/gi, /\bdid not\b/gi,
  /\bis not\b/gi, /\bare not\b/gi, /\bwas not\b/gi, /\bwere not\b/gi,
  /\bcannot\b/gi, /\bnever\b/gi, /\bnothing\b/gi, /\bnone\b/gi,
  /\bno one\b/gi, /\bnowhere\b/gi, /\bnot one\b/gi, /\bno longer\b/gi,
  /\bneither\b/gi, /\bwithout\b/gi, /\blacks?\b/gi, /\bmissing\b/gi,
  /\babsent\b/gi, /\bunbuilt\b/gi, /\bbroken\b/gi, /\bfails?\b/gi,
  /\bfailed\b/gi, /\bfailure\b/gi, /\bwrong\b/gi, /\bfalse\b/gi,
  /\bstale\b/gi, /\bdefect\b/gi
];

/* The documents this reads. Scoped and short by design — the whole-corpus walk
   is what made display_law_check hang on a cloud-backed tree the same day it was
   written, and that lesson is one file old. */
const TARGETS = [
  "nesi/game2d/THE_VISION_2026-08-17.md",
  "nesi/game2d/THE_VISION.md",
  "nesi/game2d/THE_SHAPE_OF_THE_WHOLE.md"
];

const MIN_WORDS = 150;   /* below this a single sentence swings the rate */

const results = [];
const ok = (n, pass, note) => results.push({ n, pass: !!pass, note: note == null ? "" : String(note) });

/* ── F1 · the law it enforces is on disk ─────────────────────────────────── */
let lawPresent = false;
try {
  const c = fs.readFileSync(path.join(CORPUS, "CLAUDE.md"), "utf8");
  lawPresent = /negative framing is a lint, or the edge of a container/.test(c);
} catch (e) { /* lawPresent stays false */ }
ok("F1 the framing law is in the boot path", lawPresent,
   lawPresent ? "CLAUDE.md carries it" : "REFUSED — this instrument enforces a law that is not on disk");

/* ── measure ─────────────────────────────────────────────────────────────── */
const density = body => {
  const w = body.split(/\s+/).filter(Boolean).length;
  const n = NEGATIVE.reduce((s, re) => s + (body.match(re) || []).length, 0);
  return { w, n, per1000: w ? (n / w) * 1000 : 0 };
};

const docs = [];
for (const rel of TARGETS) {
  const p = path.join(CORPUS, rel);
  if (!fs.existsSync(p)) continue;
  const text = fs.readFileSync(p, "utf8");
  const parts = text.split(/^(## .*)$/m);
  const secs = [];
  for (let i = 1; i < parts.length; i += 2) {
    const head = parts[i].trim(), body = parts[i + 1] || "";
    const declared = /<!--\s*framing:\s*(lint|edge)\s*-->/.exec(body);
    const d = density(body);
    secs.push({ head, kind: declared ? declared[1] : "prose", ...d });
  }
  if (secs.length) docs.push({ rel, secs });
}

ok("F2 at least one document was read", docs.length > 0,
   docs.map(d => d.rel.split("/").pop() + " (" + d.secs.length + " sections)").join(" · ") || "none");

/* ── F3 · the inversion ──────────────────────────────────────────────────── */
const inversions = [];
for (const doc of docs) {
  const declared = doc.secs.filter(s => s.kind !== "prose" && s.w >= MIN_WORDS);
  if (!declared.length) continue;                    /* nothing to calibrate against */
  const ceiling = Math.max(...declared.map(s => s.per1000));
  for (const s of doc.secs) {
    if (s.kind !== "prose" || s.w < MIN_WORDS) continue;
    if (s.per1000 > ceiling)
      inversions.push({ doc: doc.rel.split("/").pop(), head: s.head, at: s.per1000, ceiling });
  }
}
const anyDeclared = docs.some(d => d.secs.some(s => s.kind !== "prose" && s.w >= MIN_WORDS));
ok("F3 no prose section is more negative than the document's own lints",
   anyDeclared && inversions.length === 0,
   !anyDeclared
     ? "REFUSED — no section declares itself a lint or an edge, so there is nothing to calibrate against. Add <!-- framing: lint --> or <!-- framing: edge --> to the sections where negative form belongs."
     : inversions.length
       ? inversions.map(i => i.head.slice(0, 44) + "  " + i.at.toFixed(1) + " against a ceiling of " + i.ceiling.toFixed(1)).join("\n          ")
       : "checked against each document's own declared ceiling");

/* ── report ──────────────────────────────────────────────────────────────── */
console.log("\nFRAMING — negative form sits in a lint or at an edge\n");
for (const r of results)
  console.log("  " + (r.pass ? "ok  " : "FAIL") + "  " + r.n + (r.note ? "\n          " + r.note : ""));

for (const doc of docs) {
  console.log("\n  " + doc.rel);
  const rows = doc.secs.filter(s => s.w >= MIN_WORDS).sort((a, b) => b.per1000 - a.per1000);
  for (const s of rows)
    console.log("    " + s.per1000.toFixed(1).padStart(6) + " /1000  " +
                (s.kind === "prose" ? "        " : ("[" + s.kind + "]").padEnd(8)) + " " +
                s.head.replace(/^## /, "").slice(0, 52));
}

/* ── WHAT REFUSES, AND WHAT REPORTS ──────────────────────────────────────────
   F1 and F2 REFUSE. Both are structural: the law is on disk or it is not, and a
   section declares itself or it does not. A hand closes either in a minute.

   F3 REPORTS, for the reason standing_check gives about lost support. If an
   inversion turned the suite red, the cheapest route back to green would be
   DELETING WORDS rather than rewriting a passage to say what holds — and a
   measure that rewards deletion drives the flattening the law exists to prevent.
   Framing is a judgement about prose and the judgement is a hand's. This counts,
   ranks, and leaves the reading where it belongs. */
const structural = results.filter(r => /^F[12] /.test(r.n));
const failed = structural.filter(r => !r.pass);
console.log("\n[framing_check] " + (structural.length - failed.length) + " of " +
  structural.length + " hold" +
  (inversions.length ? " · " + inversions.length + " prose section(s) above the ceiling, reported" : ""));
process.exit(failed.length ? 1 : 0);
