#!/usr/bin/env node
/*
 * AGENT USAGE — is a named lens agent actually being invoked, or only read?
 *
 * Sibling to lens_usage_check.js, same method, one category over: that
 * instrument covers .claude/skills/ (things a session runs on itself).
 * This one covers .claude/agents/ (the standing lens panel — buckminster-
 * fuller, change-composite, game-craft, kevin-lens, nesi, stuart-cowan) —
 * a category that had NO usage instrument at all before this file existed,
 * even though .claude/agents/nesi.md itself is the corpus's own most-quoted
 * seat and kevin-lens.md carries a formal 2026-08-13 retirement notice in
 * its own frontmatter description ("CLOSED ... Do not invoke it").
 *
 * Discovers agent names dynamically from .claude/agents/*.md (by filename
 * stem), not from a hardcoded list — an agent added or removed changes what
 * this reports without anyone having to remember to update this file too.
 * A retired agent (one whose frontmatter `description:` contains "CLOSED")
 * is still scanned and reported, but flagged RETIRED rather than counted
 * toward "unused" — a retired seat with zero recent mentions is working as
 * intended, not a gap.
 *
 * Same raw-line-text scan lens_usage_check.js uses, for the same reason:
 * MARKS_LOG.jsonl has at least one line whose `mark` field JSON.parse
 * truncates silently on an unescaped quote. Searching the parsed field
 * would be blind to whatever's past that break; searching the raw line is
 * what's actually on disk.
 *
 * REPORT-ONLY. Refuses only if MARKS_LOG.jsonl or .claude/agents/ itself
 * cannot be read — a run that checks nothing must not print green.
 *
 *   node tools/agent_usage_check.js
 *   node tools/agent_usage_check.js --summary
 */
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const LOG = path.join(ROOT, "MARKS_LOG.jsonl");
const AGENTS_DIR = path.join(ROOT, ".claude", "agents");
const SUMMARY = process.argv.includes("--summary");

let agentFiles;
try {
  agentFiles = fs.readdirSync(AGENTS_DIR).filter(f => f.endsWith(".md"));
} catch (e) {
  console.error("[agent_usage_check] REFUSED — .claude/agents/ could not be read (" + e.message + ").");
  process.exit(1);
}

const agents = agentFiles.map(f => {
  const name = f.replace(/\.md$/, "");
  let retired = false;
  try {
    const head = fs.readFileSync(path.join(AGENTS_DIR, f), "utf8").slice(0, 1000);
    retired = /^description:.*\bCLOSED\b/mi.test(head) || /\bCLOSED\b.*retired/i.test(head);
  } catch (e) { /* leave retired = false, report will still show the name */ }
  return { name, retired };
});

let rawLines;
try {
  rawLines = fs.readFileSync(LOG, "utf8").split("\n").filter(l => l.trim().length > 1);
} catch (e) {
  const msg = "[agent_usage_check] REFUSED — MARKS_LOG.jsonl could not be read (" + e.message + "). " +
    "A run that checks nothing must not print green.";
  console.error(msg);
  process.exit(1);
}

function extractTs(rawLine) {
  try { return JSON.parse(rawLine).ts; } catch (e) { /* fall through */ }
  const m = /"ts":"([^"]*)"/.exec(rawLine);
  return m ? m[1] : null;
}

const rows = agents.map(({ name, retired }) => {
  const hits = rawLines
    .filter(l => l.includes(name))
    .map(l => ({ ts: extractTs(l), snippet: l.slice(Math.max(0, l.indexOf(name) - 40), l.indexOf(name) + 60) }));
  hits.sort((a, b) => (a.ts < b.ts ? 1 : -1));
  return {
    name,
    retired,
    count: hits.length,
    lastTs: hits[0] ? hits[0].ts : null,
    lastSnippet: hits[0] ? hits[0].snippet.replace(/\s+/g, " ") : null,
  };
}).sort((a, b) => b.count - a.count);

const live = rows.filter(r => !r.retired);
const staleLive = live.filter(r => r.count <= 1);

if (SUMMARY) {
  console.log("agent usage (MARKS_LOG.jsonl): " + rows.length + " agent(s) checked (" +
    (rows.length - live.length) + " retired), " + staleLive.length + " live with 1 mention or fewer" +
    (staleLive.length ? " (" + staleLive.map(r => r.name).join(", ") + ")" : "") + ". " +
    "Run `node tools/agent_usage_check.js` for the full reading.");
  process.exit(0);
}

console.log("\nAGENT USAGE — named vs. actually invoked, per MARKS_LOG.jsonl\n");
console.log("  " + rawLines.length + " mark line(s) scanned, by raw text\n");

for (const r of rows) {
  const tag = r.retired ? "RETIRED" : String(r.count).padStart(3) + "x  ";
  console.log("  " + tag.padEnd(7) + " " + r.name.padEnd(20) +
    (r.lastTs ? "last: " + r.lastTs.slice(0, 10) : "never mentioned"));
  if (r.lastSnippet) console.log("        " + JSON.stringify(r.lastSnippet));
}

console.log("\n  " + staleLive.length + " of " + live.length + " live agents have 1 mention or fewer in the whole log — " +
  "name presence only, not evidence of a real invocation.");
console.log("[agent_usage_check] reports only, does not refuse on findings — the reading is a hand's.");
process.exit(0);
