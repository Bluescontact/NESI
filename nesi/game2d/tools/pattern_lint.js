#!/usr/bin/env node
/**
 * pattern_lint.js — THE PATTERN LIBRARY SITED AS CONSTRUCTION LINT
 *
 * A3, 2026-08-12. The library is 176 patterns, 106 of them carrying a falsifier,
 * and it has been sitting inert beside a build that never consulted it. This puts
 * it IN the build loop: given the game's source, it surfaces the falsifiers whose
 * own subject matter the build actually touches.
 *
 * WHAT IT IS NOT, and this is the whole design constraint:
 *   · it does not PASS or FAIL anything — a falsifier is a question, and only a
 *     hand can answer it. No exit code drama, no score, no gate.
 *   · it never reads or reasons about Kevin's material. It reads SOURCE ONLY.
 *   · it is a builder's instrument. It never renders in the game and nothing it
 *     says reaches a player.
 *
 * Companion to refusal_check.js, which is the opposite kind of tool: that one is
 * a hard guard that fails the build. This one only ever hands you the questions
 * the library already knows to ask about what you just touched.
 *
 * Usage:  node tools/pattern_lint.js [path-to-html] [--all]
 */
const fs = require("fs");
const path = require("path");

const HTML = process.argv[2] && !process.argv[2].startsWith("--")
  ? process.argv[2] : path.join(__dirname, "..", "nesi.html");
const SHOW_ALL = process.argv.includes("--all");
const LIB = path.join(__dirname, "..", "..", "..", "patterns");

if (!fs.existsSync(LIB)) { console.log("[pattern_lint] no library at " + LIB); process.exit(0); }

const src = fs.readFileSync(HTML, "utf8").toLowerCase();

// the terms the build actually uses — drawn from the game's own vocabulary, so the
// lint stays in NESI's language rather than importing one
const VOCAB = ["gift","boundary","recognition","hold","held","refusal","refuse","crossing",
  "cross","membrane","gate","water","ground","fruit","seed","soil","light","return",
  "arrive","arrival","absence","empty","carry","set down","load","node","centre","center",
  "tetra","equilibrium","name","naming","verbatim","record","witness"];

const files = fs.readdirSync(LIB).filter(f => f.endsWith(".md"));
const hits = [];

for (const f of files) {
  const text = fs.readFileSync(path.join(LIB, f), "utf8");
  const m = text.match(/^## Falsifier\s*\n([\s\S]*?)(?=\n## |\n---|\s*$)/m);
  if (!m) continue;
  const falsifier = m[1].trim().replace(/\s+/g, " ");
  if (!falsifier) continue;
  const name = f.replace(/\.md$/, "");
  // relevance: how much of this pattern's own subject the build actually touches
  const subject = (name + " " + falsifier).toLowerCase();
  let score = 0;
  for (const v of VOCAB) if (subject.includes(v) && src.includes(v)) score++;
  if (score > 0 || SHOW_ALL) hits.push({ name, score, falsifier });
}

hits.sort((a, b) => b.score - a.score);
const shown = SHOW_ALL ? hits : hits.slice(0, 12);

console.log("[pattern_lint] " + files.length + " patterns · " + hits.length +
            " carry a falsifier this build touches · showing " + shown.length);
console.log("[pattern_lint] these are QUESTIONS, not verdicts. Nothing here passes or fails.\n");

for (const h of shown) {
  const q = h.falsifier.length > 260 ? h.falsifier.slice(0, 257) + "..." : h.falsifier;
  console.log("  · " + h.name);
  console.log("      " + q + "\n");
}
process.exit(0);   // never fails a build — a question cannot fail one
