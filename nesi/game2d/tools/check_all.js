#!/usr/bin/env node
/* CHECK ALL — every instrument, one exit code.
 *
 * WHY IT EXISTS: I ran the store guard, it threw "window is not defined", I
 * piped it through `tail -2`, read the last line, and committed. The crash
 * looked exactly like output. Eight instruments passing means nothing if the
 * ninth's failure can be mistaken for a line of text.
 *
 * So there is one front door. It runs every node instrument, prints one row
 * each, and exits non-zero if ANY of them fails — including by crashing, which
 * is reported as CRASH rather than folded into FAIL, because a broken
 * instrument and a broken build need different hands.
 *
 * PRESENCE-ASSERTING, like everything else here (game-craft, 2026-08-13): it
 * refuses if it finds FEWER live instruments than it knows about. A run that
 * checks nothing must not print green.
 *
 *   node tools/check_all.js
 */
"use strict";
const { execFileSync } = require("child_process");
const fs = require("fs"), path = require("path");
const HERE = __dirname;

/* THE LIVE INSTRUMENTS — each one reads the build a hand actually walks.
   Named here rather than globbed: a glob would silently shrink if a file were
   renamed, and print green over the gap. */
const NODE = [
  ["refusal_check",   "no model call, nothing outward, no score or reward cue"],
  ["kit_check",       "four verbs used, one palette, every page"],
  ["constraint_lint", "every boundary registered, announced, liftable, and naming what it keeps"],
  ["first_four",      "LEVEL ONE walks from a cleared store, on a copy of his writing"],
  ["door_check",      "every level reachable from the map"],
  ["world_check",     "the figure drawn IS the solid"],
  ["cut_check",       "the hand cuts where it wants"],
  ["solid_check",     "the solid's own arithmetic"],
  ["scope_check",     "every instrument reads the live build"],
];

/* HIS AUDIT RUNS HERE TOO. tools/assertion_audit.py encodes the register —
   the standing rules, the load alphabet, the seven fields, the ending states,
   the siting — as predicates, and gates on three facts: a blank passes none,
   the control fails on F7 alone, the live world holds. It is python, so it gets
   its own row rather than being folded into the node list and quietly skipped
   if python is missing. */
const PY = [
  ["assertion_audit", "27 register rules, each satisfiable only by a world that is there"],
];

/* THE ONES THAT RUN IN THE PAGE. Not failures, and not silence either — a hand
   reading this list must be able to see what was NOT covered by this run. */
const IN_PAGE = [
  ["answer_check", "every act answers a hand before it is taken"],
  ["daily_walk",   "nineteen properties of the surface he writes in"],
  ["store_guard",  "his writing is the same before and after any work"],
];

let fail = 0, crash = 0;
const missing = [];

for (const [name] of NODE.concat(IN_PAGE))
  if (!fs.existsSync(path.join(HERE, name + ".js"))) missing.push(name);
for (const [name] of PY)
  if (!fs.existsSync(path.join(HERE, name + ".py"))) missing.push(name);

console.log("");
for (const [name, holds] of NODE) {
  if (missing.includes(name)) { console.log("  GONE   " + name.padEnd(16) + holds); continue; }
  let mark;
  try {
    execFileSync(process.execPath, [path.join(HERE, name + ".js")],
                 { stdio: "pipe", cwd: path.join(HERE, "..") });
    mark = "ok    ";
  } catch (e) {
    /* A CRASH IS NOT A FAIL. An instrument that threw before reaching its own
       assertions checked nothing; one that ran and refused checked everything
       and found a breach. Reading the first as the second is how a green run
       hides a dead instrument. */
    const out = String(e.stdout || "") + String(e.stderr || "");
    if (/ReferenceError|SyntaxError|TypeError|Cannot find module/.test(out)) {
      mark = "CRASH "; crash++;
      const line = out.split("\n").find(l => /Error/.test(l)) || "";
      console.log("  " + mark + name.padEnd(16) + holds + "\n" + " ".repeat(25) + line.trim());
      continue;
    }
    mark = "FAIL  "; fail++;
  }
  console.log("  " + mark + name.padEnd(16) + holds);
}

for (const [name, holds] of PY) {
  if (missing.includes(name)) { console.log("  GONE   " + name.padEnd(16) + holds); continue; }
  try {
    execFileSync("python", [path.join(HERE, name + ".py")], { stdio: "pipe", cwd: path.join(HERE, "..") });
    console.log("  ok    " + name.padEnd(16) + holds);
  } catch (e) {
    const out = String(e.stdout || "") + String(e.stderr || "");
    if (/REFUSED/.test(out)) {
      fail++;
      console.log("  FAIL  " + name.padEnd(16) + holds);
      for (const l of out.split("\n").filter(l => /REFUSED/.test(l)))
        console.log(" ".repeat(25) + l.trim());
    } else {
      crash++;
      console.log("  CRASH " + name.padEnd(16) + holds);
      const line = out.split("\n").filter(Boolean).pop() || "python did not run";
      console.log(" ".repeat(25) + line.trim());
    }
  }
}

console.log("\n  in the page, not covered by this run:");
for (const [name, holds] of IN_PAGE)
  console.log("      " + (missing.includes(name) ? "GONE " : "     ") + name.padEnd(16) + holds);

if (missing.length) {
  console.error("\n[check_all] REFUSED — " + missing.length +
    " instrument(s) named here are not on disk: " + missing.join(", "));
  console.error("            a run that checks fewer things than it claims must not print green.");
  process.exit(1);
}

const n = NODE.length + PY.length;
if (fail || crash) {
  console.error("\n[check_all] " + (n - fail - crash) + " of " + n + " hold · " +
    fail + " refused · " + crash + " crashed");
  process.exit(1);
}
console.log("\n[check_all] all " + n + " hold · " + IN_PAGE.length + " more wait for a page");
