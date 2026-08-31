#!/usr/bin/env node
/*
 * SKILL INVOCATION — was this skill actually RUN, not just named in a mark?
 *
 * Built 2026-08-31, on Kevin's own correction to lens_usage_check.js:
 * "there are unarticulated processes... kevin uses the 7 with one mention."
 * lens_usage_check.js's MARKS_LOG.jsonl scan measured whether a skill got
 * named in a formal decision-mark — a rare, deliberate act. It is NOT the
 * same thing as whether the skill was actually run, and checking real
 * session transcripts proved the gap is large: full-development alone shows
 * at least 6 real "Launching skill" events across sessions while
 * MARKS_LOG.jsonl showed it once. The mark-log signal was the wrong proxy.
 *
 * This instrument reads the real, structural fact instead: every session
 * transcript (~/.claude/projects/<project>/*.jsonl) contains one line per
 * skill invocation with `"toolUseResult":{"success":true,"commandName":
 * "<skill-name>"}` — written by the harness itself when a skill actually
 * runs, not something a session chose to log. That is what "was this
 * cloned into the geometry of Kevin's actual development process" checks
 * against.
 *
 * WHICH PROJECT DIRECTORIES: this corpus's working directory moved once
 * already (2026-08-30, OneDrive -> dev\) mid-session, and Claude Code sites
 * a session's transcripts under a slug derived from its cwd AT START, not
 * live-updated — so history before the move and history after it live in
 * two different directories. Both are named here explicitly, the same
 * "named, never by glob" rule check_harness.js's own header states, so a
 * third relocation is visible (ROOT_MISSING below) rather than silently
 * dropping history.
 *
 * WHAT THIS DOES NOT CATCH: a skill invoked from a DIFFERENT project
 * directory than the two named below (this corpus running from yet another
 * path) is invisible to this instrument. Said plainly rather than left as
 * silence, the same convention lens_usage_check.js's own header uses.
 *
 *   node tools/skill_invocation_check.js
 *   node tools/skill_invocation_check.js --summary
 */
"use strict";
const fs = require("fs");
const path = require("path");
const os = require("os");

const ROOT = path.join(__dirname, "..");
const SKILLS_DIR = path.join(ROOT, ".claude", "skills");
const SUMMARY = process.argv.includes("--summary");

// Named explicitly — see header. Add a line here, by hand, if this corpus
// moves again; a glob across all of ~/.claude/projects/ would silently
// pull in every OTHER project Kevin has ever worked in.
const PROJECT_SLUGS = [
  "C--Users-KMEAR-OneDrive-Desktop-DSS-content",
  "C--Users-KMEAR-dev-DSS-content",
];
const PROJECTS_ROOT = path.join(os.homedir(), ".claude", "projects");

function discoverSkills() {
  let folders;
  try {
    folders = fs.readdirSync(SKILLS_DIR, { withFileTypes: true })
      .filter(d => d.isDirectory()).map(d => d.name);
  } catch (e) {
    console.error("[skill_invocation_check] REFUSED — .claude/skills/ could not be read (" + e.message + ").");
    process.exit(1);
  }
  const names = [];
  for (const folder of folders) {
    const skillMd = path.join(SKILLS_DIR, folder, "SKILL.md");
    if (!fs.existsSync(skillMd)) continue;
    const head = fs.readFileSync(skillMd, "utf8").slice(0, 500);
    const m = /^name:\s*(.+)$/m.exec(head);
    names.push(m ? m[1].trim() : folder);
  }
  return names.sort();
}

const SKILLS = discoverSkills();

const rootsFound = [];
const rootsMissing = [];
for (const slug of PROJECT_SLUGS) {
  const p = path.join(PROJECTS_ROOT, slug);
  (fs.existsSync(p) ? rootsFound : rootsMissing).push(p);
}
if (!rootsFound.length) {
  console.error("[skill_invocation_check] REFUSED — none of the named project transcript directories exist.");
  process.exit(1);
}

const counts = {};
for (const name of SKILLS) counts[name] = { count: 0, lastTs: null, lastSession: null };

const COMMAND_RE = /"commandName":"([^"]+)"/g;
const TS_RE = /"timestamp":"([^"]+)"/;

for (const root of rootsFound) {
  const files = fs.readdirSync(root).filter(f => f.endsWith(".jsonl"));
  for (const file of files) {
    const full = path.join(root, file);
    let text;
    try { text = fs.readFileSync(full, "utf8"); } catch (e) { continue; }
    if (!text.includes('"commandName"')) continue;
    for (const line of text.split("\n")) {
      if (!line.includes('"commandName"')) continue;
      let m;
      COMMAND_RE.lastIndex = 0;
      while ((m = COMMAND_RE.exec(line))) {
        const skill = m[1];
        if (!(skill in counts)) continue; // struck/plugin/not-a-live-skill — out of scope, not silently merged in
        counts[skill].count++;
        const tm = TS_RE.exec(line);
        const ts = tm ? tm[1] : null;
        if (ts && (!counts[skill].lastTs || ts > counts[skill].lastTs)) {
          counts[skill].lastTs = ts;
          counts[skill].lastSession = file.replace(/\.jsonl$/, "");
        }
      }
    }
  }
}

const rows = SKILLS.map(name => ({ name, ...counts[name] })).sort((a, b) => b.count - a.count);
const neverRun = rows.filter(r => r.count === 0);

if (SUMMARY) {
  console.log("skill invocation (real session transcripts): " + rows.length + " live skill(s), " +
    neverRun.length + " never actually invoked" +
    (neverRun.length ? " (" + neverRun.map(r => r.name).join(", ") + ")" : "") + ". " +
    "Run `node tools/skill_invocation_check.js` for the full reading.");
  process.exit(0);
}

console.log("\nSKILL INVOCATION — real \"Launching skill\" events, not mark-log mentions\n");
console.log("  project dir(s) scanned: " + rootsFound.length + " found, " + rootsMissing.length + " missing (" +
  (rootsMissing.map(r => path.basename(r)).join(", ") || "none") + ")\n");

for (const r of rows) {
  console.log("  " + String(r.count).padStart(3) + "x  " + r.name.padEnd(22) +
    (r.lastTs ? "last: " + r.lastTs.slice(0, 10) + "  (" + r.lastSession.slice(0, 8) + ")" : "never invoked"));
}

console.log("\n  " + neverRun.length + " of " + rows.length + " skills have zero real invocations across scanned history.");
console.log("[skill_invocation_check] reports only, does not refuse on findings — the reading is a hand's.");
process.exit(0);
