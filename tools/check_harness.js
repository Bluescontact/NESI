#!/usr/bin/env node
/*
 * CHECK HARNESS — one front door for the harness layer itself.
 *
 * nesi/game2d/tools/check_all.js is the front door for the game2d build. It
 * says so in its own header: a second jurisdiction, not folded into the
 * first, sited at ../gate/. This file is the same move one layer up — a
 * front door for the layer where sessions write instructions for THEMSELVES
 * (skills/, .claude/skills/, .claude/agents/), which had no runner at all
 * until now and so could accumulate a shape for months with nothing reading
 * it back. See tools/framing_check_skills.js's own header for the incident
 * that made the gap visible: three skills written 2026-08-19, two days after
 * the framing law entered the boot path, still among the highest
 * negative-density files in the corpus, because naming the law in CLAUDE.md
 * never put anything in the path of a session authoring a NEW skill file.
 *
 * PRESENCE-ASSERTING, the same convention check_all.js uses (game-craft,
 * 2026-08-13): it refuses if it finds fewer live instruments than it knows
 * about. A run that checks nothing must not print green.
 *
 * Kept deliberately small. One instrument today. Add to HARNESS below by
 * name, never by glob — a glob would silently shrink if a file were
 * renamed, and print green over the gap, the exact failure check_all.js's
 * own header describes.
 *
 *   node tools/check_harness.js
 */
"use strict";
const { execFileSync } = require("child_process");
const fs = require("fs"), path = require("path");
const HERE = __dirname;

/* THE LIVE INSTRUMENTS — each one reads the harness layer a session actually
   writes into. REPORT means it measures and ranks but does not fail the run
   on density alone (see framing_check_skills.js's own header for why: a
   check that turns red on word count rewards deleting words, not rewriting
   them — the reading stays a hand's). REFUSE means a missing/broken
   structural fact fails the run. */
const HARNESS = [
  ["framing_check_skills", "framing_check_skills.js", "REPORT",
    "is the negative-framing shape still being reproduced in new skills/agents, after the law"],
  ["lens_usage_check", "lens_usage_check.js", "REPORT",
    "are the skills in .claude/skills/ named vs. actually invoked, per MARKS_LOG.jsonl"],
  ["agent_usage_check", "agent_usage_check.js", "REPORT",
    "are the agents in .claude/agents/ named vs. actually invoked, per MARKS_LOG.jsonl"],
  ["skill_invocation_check", "skill_invocation_check.js", "REPORT",
    "were the skills in .claude/skills/ actually RUN, per real session transcripts — not a mark-log proxy"],
  ["agent_invocation_check", "agent_invocation_check.js", "REPORT",
    "were the agents in .claude/agents/ actually RUN (direct + adopted-persona), per real session transcripts"],
];

let fail = 0, crash = 0;
const missing = [];

for (const [name, file] of HARNESS)
  if (!fs.existsSync(path.join(HERE, file))) missing.push(name);

console.log("\nCHECK HARNESS — the skill/agent layer, one front door\n");

for (const [name, file, kind, holds] of HARNESS) {
  if (missing.includes(name)) { console.log("  GONE   " + name.padEnd(22) + holds); continue; }
  let out = "", code = 0;
  try {
    out = execFileSync(process.execPath, [path.join(HERE, file)],
      { stdio: "pipe", cwd: HERE, encoding: "utf8" });
  } catch (e) {
    code = typeof e.status === "number" ? e.status : 1;
    out = String(e.stdout || "") + String(e.stderr || "");
  }

  let mark;
  if (/ReferenceError|SyntaxError|TypeError|Cannot find module/.test(out)) { mark = "CRASH "; crash++; }
  else if (code === 0) mark = kind === "REPORT" ? "report" : "ok    ";
  else { mark = "FAIL  "; fail++; }

  console.log("  " + mark + " " + name.padEnd(24) + holds);
  const lines = out.split("\n").filter(l => l.trim());
  for (const l of lines) console.log("         " + l);
  console.log("");
}

if (missing.length) {
  console.error("[check_harness] REFUSED — " + missing.length +
    " instrument(s) named here are not on disk: " + missing.join(", "));
  console.error("                a run that checks fewer things than it claims must not print green.");
  process.exit(1);
}

const n = HARNESS.length;
if (fail || crash) {
  console.error("[check_harness] " + (n - fail - crash) + " of " + n + " hold · " +
    fail + " failed · " + crash + " crashed");
  process.exit(1);
}
console.log("[check_harness] all " + n + " hold");
