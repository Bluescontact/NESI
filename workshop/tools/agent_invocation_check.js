#!/usr/bin/env node
/*
 * AGENT INVOCATION — was this lens agent actually run, not just named?
 *
 * Sibling to skill_invocation_check.js, same correction applied to
 * .claude/agents/ instead of .claude/skills/: agent_usage_check.js's
 * MARKS_LOG.jsonl scan measures name-presence in a decision-mark, not a
 * real invocation. This reads the real record — an "Agent" tool_use entry
 * in a session transcript with `input.subagent_type` set.
 *
 * TWO COUNTS, KEPT SEPARATE, NOT MERGED:
 *
 *   DIRECT   — subagent_type is the agent's own name exactly
 *              (e.g. subagent_type: "change-composite"). Unambiguous.
 *
 *   ADOPTED  — subagent_type is "general-purpose" (or another non-matching
 *              type) but the prompt text names this agent's own file
 *              (".claude/agents/<name>.md") and instructs the spawned
 *              agent to "adopt" or "become" it. Real, seen directly in this
 *              corpus's own transcripts (change-composite's GROUND-vertex
 *              swarm runs work exactly this way), but a substring match on
 *              a prompt is weaker evidence than a structured field — a
 *              prompt could name a file without adopting its voice. Kept
 *              as its own column rather than folded into DIRECT, so a
 *              false positive here doesn't inflate the harder number.
 *
 * Same project-directory scope and same disclosed blind spot as
 * skill_invocation_check.js — see that file's header for why only the two
 * named slugs are scanned, and what a third relocation would hide.
 *
 *   node tools/agent_invocation_check.js
 *   node tools/agent_invocation_check.js --summary
 */
"use strict";
const fs = require("fs");
const path = require("path");
const os = require("os");

const ROOT = path.join(__dirname, "..");
const AGENTS_DIR = path.join(ROOT, ".claude", "agents");
const SUMMARY = process.argv.includes("--summary");

const PROJECT_SLUGS = [
  "<corpus-slug>",
  "<corpus-slug>",
];
const PROJECTS_ROOT = path.join(os.homedir(), ".claude", "projects");

let agentFiles;
try {
  agentFiles = fs.readdirSync(AGENTS_DIR).filter(f => f.endsWith(".md"));
} catch (e) {
  console.error("[agent_invocation_check] REFUSED — .claude/agents/ could not be read (" + e.message + ").");
  process.exit(1);
}
const AGENTS = agentFiles.map(f => f.replace(/\.md$/, "")).sort();

const rootsFound = [];
const rootsMissing = [];
for (const slug of PROJECT_SLUGS) {
  const p = path.join(PROJECTS_ROOT, slug);
  (fs.existsSync(p) ? rootsFound : rootsMissing).push(p);
}
if (!rootsFound.length) {
  console.error("[agent_invocation_check] REFUSED — none of the named project transcript directories exist.");
  process.exit(1);
}

const counts = {};
for (const name of AGENTS) counts[name] = { direct: 0, adopted: 0, lastTs: null };

const TS_RE = /"timestamp":"([^"]+)"/;

for (const root of rootsFound) {
  const files = fs.readdirSync(root).filter(f => f.endsWith(".jsonl"));
  for (const file of files) {
    const full = path.join(root, file);
    let text;
    try { text = fs.readFileSync(full, "utf8"); } catch (e) { continue; }
    if (!text.includes('"name":"Agent"')) continue;
    for (const line of text.split("\n")) {
      if (!line.includes('"name":"Agent"') || !line.includes('subagent_type')) continue;
      const stMatch = /"subagent_type":"([^"]+)"/.exec(line);
      if (!stMatch) continue;
      const subagentType = stMatch[1];
      const tm = TS_RE.exec(line);
      const ts = tm ? tm[1] : null;

      if (subagentType in counts) {
        counts[subagentType].direct++;
        if (ts && (!counts[subagentType].lastTs || ts > counts[subagentType].lastTs)) counts[subagentType].lastTs = ts;
        continue;
      }
      // ADOPTED pattern: non-matching subagent_type, but the prompt names an agent file
      for (const name of AGENTS) {
        if (line.includes(".claude/agents/" + name + ".md") || line.includes(".claude\\\\agents\\\\" + name + ".md")) {
          counts[name].adopted++;
          if (ts && (!counts[name].lastTs || ts > counts[name].lastTs)) counts[name].lastTs = ts;
        }
      }
    }
  }
}

const rows = AGENTS.map(name => ({ name, ...counts[name] }))
  .sort((a, b) => (b.direct + b.adopted) - (a.direct + a.adopted));
const neverRun = rows.filter(r => r.direct === 0 && r.adopted === 0);

if (SUMMARY) {
  console.log("agent invocation (real session transcripts): " + rows.length + " agent(s), " +
    neverRun.length + " never actually invoked (direct or adopted)" +
    (neverRun.length ? " (" + neverRun.map(r => r.name).join(", ") + ")" : "") + ". " +
    "Run `node tools/agent_invocation_check.js` for the full reading.");
  process.exit(0);
}

console.log("\nAGENT INVOCATION — real Agent tool_use events, direct vs. adopted-persona\n");
console.log("  project dir(s) scanned: " + rootsFound.length + " found, " + rootsMissing.length + " missing (" +
  (rootsMissing.map(r => path.basename(r)).join(", ") || "none") + ")\n");

for (const r of rows) {
  console.log("  " + String(r.direct).padStart(3) + "x direct  " + String(r.adopted).padStart(3) + "x adopted  " +
    r.name.padEnd(20) + (r.lastTs ? "last: " + r.lastTs.slice(0, 10) : "never invoked"));
}

console.log("\n  " + neverRun.length + " of " + rows.length + " agents show zero invocations, direct or adopted.");
console.log("  ADOPTED is a prompt-text substring match, not a structured field — weaker evidence than DIRECT.");
console.log("[agent_invocation_check] reports only, does not refuse on findings — the reading is a hand's.");
process.exit(0);
