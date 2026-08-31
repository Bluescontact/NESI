#!/usr/bin/env node
/*
 * FRAMING CHECK — SKILL & AGENT LAYER
 *
 * Sibling to nesi/game2d/tools/framing_check.js, same law, different ground.
 * That instrument watches 3 game-design docs. It was never pointed at the
 * layer where a session actually writes new instructions for itself —
 * skills/, .claude/skills/, .claude/agents/ — which is exactly where the
 * shape keeps reproducing after the law existed to catch it: three skills
 * (route-map, cold-walk, the-closing-check) were written 2026-08-19, two
 * days after the framing law entered the boot path, and still measured
 * among the highest negative-density files in the whole corpus. Naming the
 * law did not touch the template a session reaches for when authoring a new
 * skill or agent file. This instrument puts eyes on that layer specifically.
 *
 * Kevin's law, 2026-08-17, verbatim from CLAUDE.md:
 *
 *   "a generalized or specific negative assert creates a leakage in the
 *    context lense... write what holds, what is available, and what a
 *    thing does."
 *
 * ── WHY THIS DOES NOT REFUSE ─────────────────────────────────────────────
 *
 * framing_check.js calibrates a document's prose against its OWN declared
 * lint/edge sections — a fair ceiling because a doc is expected to be dense
 * with refusal where it says so. Skill and agent files carry no such
 * per-section declaration (no `<!-- framing: lint -->`), and a HARD LIMIT
 * line is itself a lint by convention, not by markup. Calibrating skill
 * files against a per-doc ceiling would require inferring which lines are
 * lints — the exact classifier law 5 forbids ("the hand runs the filter, no
 * classifier decides what a fraction is"). So this instrument does not
 * grade. It measures density per file, ranks it, and reports — the same
 * stance framing_check.js already takes for its own F3, and for the same
 * reason: a check that can turn red by density alone rewards deleting
 * words, which drives the exact flattening the law exists to prevent. The
 * reading stays a hand's.
 *
 * ── WHAT IT ADDS THAT THE FILE COUNT ALONE DOESN'T ──────────────────────
 *
 * It splits results into PRE-LAW (first committed before 2026-08-17) and
 * POST-LAW (first committed on or after). A high-density pre-law file is
 * old contamination; a high-density post-law file is the shape still being
 * reproduced today. Only the second is evidence the law isn't reaching the
 * hand that writes new skills.
 *
 * ── SCOPE, ON PURPOSE ─────────────────────────────────────────────────────
 *
 * Three named directories, not a repo walk. framing_check.js's own header
 * already paid for this lesson once (a whole-corpus walk hung
 * display_law_check on a cloud-backed tree the same day it was written).
 * Widening past these three is a session's decision to make deliberately,
 * not a glob's decision to make by accident.
 *
 *   node tools/framing_check_skills.js
 */
"use strict";
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const LAW_DATE = new Date("2026-08-17T00:00:00Z");

/* Same word list as nesi/game2d/tools/framing_check.js. Keep the two in sync
   by hand if either changes — duplicated deliberately rather than shared
   across a game2d/tools boundary and a project-root/tools boundary that
   otherwise have no dependency on each other. */
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

const MIN_WORDS = 80;

const TARGET_DIRS = ["skills", ".claude/skills", ".claude/agents"];

function density(body) {
  const w = body.split(/\s+/).filter(Boolean).length;
  const n = NEGATIVE.reduce((s, re) => s + (body.match(re) || []).length, 0);
  return { w, n, per1000: w ? (n / w) * 1000 : 0 };
}

function walk(dir, out) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch (e) { return; }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (/\.md$/i.test(e.name)) out.push(full);
  }
}

function firstCommitDate(file) {
  try {
    const out = execSync(`git log --follow --format=%aI --date=iso-strict -- "${file}"`,
      { cwd: ROOT, stdio: ["pipe", "pipe", "pipe"] }).toString().trim();
    const lines = out.split("\n").filter(Boolean);
    return lines.length ? new Date(lines[lines.length - 1]) : null;
  } catch (e) { return null; }
}

const files = [];
for (const d of TARGET_DIRS) walk(path.join(ROOT, d), files);

/* --summary: boot-path mode. The per-file `git log --follow` era lookup below
   is the entire cost of a full run (~9s over 30 files, one git subprocess
   each) — fine for a hand invoking this on purpose, wrong for something that
   runs on every SessionStart. Summary mode skips it: density is a pure file
   read (fast), era classification is not, so the boot hook gets density
   ranking only and a pointer to the full run for era detail. */
const SUMMARY = process.argv.includes("--summary");

if (files.length === 0) {
  if (SUMMARY) {
    console.log("[framing_check_skills] no skill/agent files in scope.");
    process.exit(0);
  }
  console.error("\nFRAMING (skills & agents) — is the shape still being reproduced after the law?\n");
  console.error("[framing_check_skills] REFUSED — none of " + TARGET_DIRS.join(", ") +
    " exist or contain any .md file. A run that checks nothing must not print green.");
  process.exit(1);
}

const rows = [];
for (const f of files) {
  const text = fs.readFileSync(f, "utf8");
  const { w, n, per1000 } = density(text);
  if (w < MIN_WORDS) continue;
  if (SUMMARY) {
    rows.push({ rel: path.relative(ROOT, f), w, n, per1000 });
    continue;
  }
  const committed = firstCommitDate(f);
  rows.push({
    rel: path.relative(ROOT, f),
    w, n, per1000,
    era: committed ? (committed < LAW_DATE ? "pre-law" : "post-law") : "unversioned",
    firstDate: committed ? committed.toISOString().slice(0, 10) : ""
  });
}

rows.sort((a, b) => b.per1000 - a.per1000);

if (SUMMARY) {
  const top = rows[0];
  console.log("framing (skills & agents): " + rows.length +
    " file(s) measured, top density " + top.per1000.toFixed(1) + "/1000 (" + top.rel + "). " +
    "Report-only, no era classification in this mode. " +
    "Run `node tools/check_harness.js` for the full, dated reading.");
  process.exit(0);
}

const postLaw = rows.filter(r => r.era === "post-law");
const preLaw = rows.filter(r => r.era === "pre-law");

console.log("\nFRAMING (skills & agents) — is the shape still being reproduced after the law?\n");
console.log("  measured " + rows.length + " file(s) across " + TARGET_DIRS.join(", ") +
  "  ·  " + postLaw.length + " post-law  ·  " + preLaw.length + " pre-law\n");

console.log("  top 15 by density, regardless of era:");
for (const r of rows.slice(0, 15))
  console.log("    " + r.per1000.toFixed(1).padStart(6) + " /1000  " +
    ("[" + r.era + "]").padEnd(12) + " " + r.rel + "  (" + r.firstDate + ")");

if (postLaw.length) {
  console.log("\n  post-law files, ranked — the shape reproducing itself after the law existed:");
  for (const r of postLaw.slice(0, 15).sort((a, b) => b.per1000 - a.per1000))
    console.log("    " + r.per1000.toFixed(1).padStart(6) + " /1000  " + r.rel + "  (" + r.firstDate + ")");
} else {
  console.log("\n  no post-law file found in scope — nothing here is evidence of ongoing reproduction.");
}

console.log("\n[framing_check_skills] reports only, does not refuse — the reading is a hand's. " +
  rows.length + " file(s) measured, 0 graded.");
process.exit(0);
