#!/usr/bin/env node
/*
 * LENS USAGE — is a named check actually being run, or only being read?
 *
 * Sibling to framing_check_skills.js, same method applied one step over:
 * that instrument asked whether a LAW was reaching new files after it was
 * named. This one asks whether the skills a session could run against real
 * material — everything under .claude/skills/ with a live SKILL.md — are
 * ever actually invoked, or only exist as files a session could run and
 * mostly doesn't.
 *
 * GENERALIZED, 2026-08-31 (Kevin's mark: "build the missing signal for
 * skills and lenses"). Originally hardcoded to six named lenses
 * (instrument-audit, boundary-audit, conservation-harness, record-audit,
 * authority-check, unrouted-gifts) from nesi/mind/DRAFT_SIX_SHAPES_2026-08-20.md.
 * A corpus-wide skills survey found 8 more skill folders this instrument
 * never covered at all. Now discovers every skill dynamically from
 * .claude/skills/*\/SKILL.md's own `name:` frontmatter — a skill added or
 * removed changes what's reported without anyone having to remember to
 * update this file too. Two folders under .claude/skills/ are excluded by
 * fact, not by list: `cold-walk` (SKILL.md replaced by
 * SKILL.md.struck_2026-08-30.md — no live SKILL.md to name) and
 * `unrouted-gifts_work` (no SKILL.md at all — it holds rescued scratch
 * scripts, not a skill; the real `unrouted-gifts` skill it's sometimes
 * confused with is a plugin skill, not a local one, so it's out of this
 * instrument's scope on the same "no live SKILL.md here" basis).
 *
 * WHY THIS EXISTS: instrument-audit's own question 5 — the vacuous-pass
 * test — asked of the four newest lenses (instrument-audit, boundary-audit,
 * record-audit, authority-check, all built 2026-08-21) turned up exactly
 * one documented real application among all four combined, and it's a
 * meta-case: auditing the process that built the lenses, the same night
 * they were built. A corpus where none of the four were ever run again
 * would look identical, because nothing currently distinguishes "unused"
 * from "quietly working." conservation-harness and unrouted-gifts are the
 * control group — both have dated, repeated, real finds on record — so this
 * instrument reports every live skill, not just the original six, and lets
 * the contrast speak.
 *
 * ── WHAT THIS ACTUALLY MEASURES, AND WHAT IT DOES NOT ────────────────────
 *
 * It scans MARKS_LOG.jsonl's `mark` field for each lens's name and reports
 * the count and the most recent timestamp. That is presence of the NAME in
 * a mark, not proof of a real application — a mark could name a lens while
 * only discussing it, the same way a file can mention a word without doing
 * the thing the word describes. This instrument cannot tell the difference;
 * a hand reading the matched line can. Said plainly rather than left as
 * silence, the same convention framing_check.js's own header uses.
 *
 * REPORT-ONLY. Refuses only if MARKS_LOG.jsonl itself cannot be read — a
 * run that checks nothing must not print green.
 *
 * ── A DEFECT FOUND WHILE BUILDING THIS, KEPT VISIBLE RATHER THAN QUIETLY
 *    FIXED ──────────────────────────────────────────────────────────────
 * The first version of this instrument parsed each line with JSON.parse and
 * searched the resulting `mark` field. That undercounted every lens near
 * zero: the entry that names all six lenses together has a `mark` field
 * that JSON.parse resolves to only 49 characters against a 1167-character
 * raw line — an unescaped quote in the source data truncates the string
 * silently, and JSON.parse does not error on it. Searching the parsed
 * field was blind to everything past that break. This version searches the
 * RAW LINE TEXT instead, which is what is actually on disk regardless of
 * whether it round-trips through JSON.parse — selector honesty (law 6)
 * applied to a log file: search the object itself, not a lossy proxy of it.
 * `ts` is still read from JSON.parse where it succeeds, with a regex
 * fallback where it doesn't, since a truncated mark doesn't need to cost
 * the timestamp too.
 *
 *   node tools/lens_usage_check.js
 *   node tools/lens_usage_check.js --summary
 */
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const LOG = path.join(ROOT, "MARKS_LOG.jsonl");
const SKILLS_DIR = path.join(ROOT, ".claude", "skills");
const SUMMARY = process.argv.includes("--summary");

function discoverLenses() {
  let folders;
  try {
    folders = fs.readdirSync(SKILLS_DIR, { withFileTypes: true })
      .filter(d => d.isDirectory()).map(d => d.name);
  } catch (e) {
    console.error("[lens_usage_check] REFUSED — .claude/skills/ could not be read (" + e.message + ").");
    process.exit(1);
  }
  const names = [];
  for (const folder of folders) {
    const skillMd = path.join(SKILLS_DIR, folder, "SKILL.md");
    if (!fs.existsSync(skillMd)) continue; // struck, superseded, or not a skill at all — no live file to name
    const head = fs.readFileSync(skillMd, "utf8").slice(0, 500);
    const m = /^name:\s*(.+)$/m.exec(head);
    names.push(m ? m[1].trim() : folder);
  }
  return names.sort();
}

const LENSES = discoverLenses();

let rawLines;
try {
  rawLines = fs.readFileSync(LOG, "utf8").split("\n").filter(l => l.trim().length > 1);
} catch (e) {
  const msg = "[lens_usage_check] REFUSED — MARKS_LOG.jsonl could not be read (" + e.message + "). " +
    "A run that checks nothing must not print green.";
  console.error(msg);
  process.exit(1);
}

function extractTs(rawLine) {
  try { return JSON.parse(rawLine).ts; } catch (e) { /* fall through */ }
  const m = /"ts":"([^"]*)"/.exec(rawLine);
  return m ? m[1] : null;
}

const rows = LENSES.map(name => {
  const hits = rawLines
    .filter(l => l.includes('"mark"') && l.includes(name))
    .map(l => ({ ts: extractTs(l), snippet: l.slice(l.indexOf(name) - 40, l.indexOf(name) + 60) }));
  hits.sort((a, b) => (a.ts < b.ts ? 1 : -1));
  return {
    name,
    count: hits.length,
    lastTs: hits[0] ? hits[0].ts : null,
    lastSnippet: hits[0] ? hits[0].snippet.replace(/\s+/g, " ") : null,
  };
}).sort((a, b) => b.count - a.count);

if (SUMMARY) {
  const stale = rows.filter(r => r.count <= 1);
  console.log("skill usage (MARKS_LOG.jsonl): " + rows.length + " live skill(s) checked, " +
    stale.length + " with " + (stale.length === 1 ? "1 mention or fewer" : "1 mention or fewer each") +
    " (" + stale.map(r => r.name).join(", ") + "). " +
    "Run `node tools/lens_usage_check.js` for the full reading.");
  process.exit(0);
}

console.log("\nSKILL USAGE — named vs. actually invoked, per MARKS_LOG.jsonl\n");
console.log("  " + rawLines.length + " mark line(s) scanned, by raw text, not by a JSON.parse of the mark field\n");

for (const r of rows) {
  console.log("  " + String(r.count).padStart(3) + "x  " + r.name.padEnd(22) +
    (r.lastTs ? "last: " + r.lastTs.slice(0, 10) : "never mentioned"));
  if (r.lastSnippet) console.log("        " + JSON.stringify(r.lastSnippet));
}

const stale = rows.filter(r => r.count <= 1);
console.log("\n  " + stale.length + " of " + rows.length + " skills have 1 mention or fewer in the whole log — " +
  "name presence only, not evidence of repeated real use.");
console.log("[lens_usage_check] reports only, does not refuse on findings — the reading is a hand's.");
process.exit(0);
