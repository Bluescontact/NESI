#!/usr/bin/env node
/* ═══ ALREADY ANSWERED ═════════════════════════════════════════════════════════
 * Built 2026-08-16 on Kevin's standing instruction:
 *   "find rather then ask for as many of the open positions as possible. kevins
 *    library hold everythgin you need, and open source repos hold everythgin
 *    already built."
 *
 * ── THE FILTER THIS FIXES, MEASURED ───────────────────────────────────────────
 * In one session I put three navigational questions to him that his own library
 * had already closed:
 *   · the four vertices  — named in his May 2026 canon, the-four-ones.md
 *   · law 8 vs the deep  — ruled in BUILD_RECORD.md and verified by night_check,
 *                          and I raised it as open THREE TIMES
 *   · the somatic ground — marked yes at c62 and held un-named since
 * EVERY QUESTION THE CORPUS ALREADY ANSWERS IS A DECISION HE HAS TO MAKE TWICE.
 * That is the cost, and it is paid in the one resource the system exists to
 * protect.
 *
 * ── WHY A RULE WAS NOT ENOUGH ─────────────────────────────────────────────────
 * The rule already existed — `feedback_check_corpus_before_proposing_builds`,
 * "search patterns/, nesi/, memory first". It did not hold. Today's own finding
 * at THE STATIONS says why: a law obeyed by discipline and a law that cannot be
 * broken are different states, and only the second survives the next session.
 * This makes the sweep ONE COMMAND, so not checking is a choice and not an
 * oversight.
 *
 * ── IT FINDS; IT NEVER ANSWERS ────────────────────────────────────────────────
 * It prints where the corpus speaks and stops. It does not summarise a passage,
 * rank it against a thesis, or decide what it means — every one of those would
 * be the same failure one layer down: an inference handed over as a finding.
 *
 * ── AND IT WALKS THE DISK RATHER THAN THE REPO ────────────────────────────────
 * The first version used `git grep` and returned NOTHING for "the four ones",
 * which is the title of a file in his canon. git grep cannot see outside the
 * repository and TWO OF THE MOST LOAD-BEARING ZONES ARE OUTSIDE IT — his May
 * canon is a sibling folder, his memory is under ~/.claude. A tool built to stop
 * false confidence that emits a false MISS is worse than no tool.
 *
 *   node tools/already_answered.js "the four ones"
 *   node tools/already_answered.js jitterbug "held center"
 *   node tools/already_answered.js --wide "somatic ground"    include the archives
 */
"use strict";
const fs = require("fs"), path = require("path");

const ROOT = (() => { let d = __dirname;
  for (let i = 0; i < 12; i++) { if (fs.existsSync(path.join(d, ".git"))) return d;
    const u = path.dirname(d); if (u === d) break; d = u; } return null; })();
if (!ROOT) { console.error("already_answered: no .git above " + __dirname); process.exit(1); }

const ARG = process.argv.slice(2);
const WIDE = ARG.includes("--wide");
const terms = ARG.filter(a => !a.startsWith("--"));
if (!terms.length) {
  console.error('already_answered: give it the thing you were about to ask.\n' +
                '  node tools/already_answered.js "the four ones"');
  process.exit(1);
}

/* WHERE HIS ANSWERS LIVE, heaviest first — his own namings and marks before
   anything a session wrote about them. */
const HOME = process.env.USERPROFILE || process.env.HOME || "";
const ZONES = [
  { w: 5, name: "HIS CANON",       roots: [path.join(ROOT, "..", "DSS content - phase transition", "canonical")] },
  { w: 5, name: "HIS MARKS",       roots: [path.join(ROOT, "MARKS_LOG.jsonl"), path.join(ROOT, "DECISIONS_OFFERED.jsonl"), path.join(ROOT, "OPEN_GATES.jsonl")] },
  { w: 4, name: "the instruments", roots: [path.join(ROOT, "Ari_Tal_handoff"), path.join(ROOT, "genesis_seed_share")] },
  { w: 4, name: "the build",       roots: [path.join(ROOT, "nesi", "game2d")] },
  { w: 3, name: "nesi's mind",     roots: [path.join(ROOT, "nesi", "mind"), path.join(ROOT, "nesi", "spec")] },
  { w: 3, name: "the memory",      roots: [path.join(HOME, ".claude", "projects", "C--Users-KMEAR-OneDrive-Desktop-DSS-content", "memory")] },
  { w: 2, name: "the patterns",    roots: [path.join(ROOT, "patterns")] },
  { w: 2, name: "counsel + intake",roots: [path.join(ROOT, "counsel"), path.join(ROOT, "_INTAKE"), path.join(ROOT, "inbox")] }
];

const TEXT = /\.(md|jsonl|json|txt|js|py|html|csv|ya?ml)$/i;
const SKIP = /[\\/](\.git|node_modules|worktrees|\.walk|__pycache__|dist|build|retired)([\\/]|$)/;

function walk(dir, out, depth) {
  if (depth > 8 || out.length > 40000) return out;
  let ents = [];
  try { ents = fs.readdirSync(dir, { withFileTypes: true }); } catch { return out; }
  for (const e of ents) {
    const full = path.join(dir, e.name);
    if (SKIP.test(full)) continue;
    if (e.isDirectory()) walk(full, out, depth + 1);
    else if (TEXT.test(e.name)) out.push(full);
  }
  return out;
}
const CACHE = {};
function filesUnder(root) {
  if (CACHE[root]) return CACHE[root];
  let out = [];
  try { out = fs.statSync(root).isDirectory() ? walk(root, [], 0) : [root]; } catch { out = []; }
  return (CACHE[root] = out);
}

function sweep(term, zone) {
  const re = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
  const out = [];
  for (const root of zone.roots) {
    for (const f of filesUnder(root)) {
      let txt = "";
      try { if (fs.statSync(f).size > (8 << 20)) continue; txt = fs.readFileSync(f, "utf8"); }
      catch { continue; }
      if (!re.test(txt)) continue;
      const lines = txt.split("\n");
      for (let n = 0; n < lines.length && out.length < 300; n++) {
        if (re.test(lines[n])) {
          let rel = path.relative(ROOT, f).replace(/\\/g, "/");
          out.push({ file: rel, line: n + 1, text: lines[n].trim().slice(0, 140) });
        }
      }
    }
  }
  return out;
}

console.log("");
console.log("ALREADY ANSWERED?  ·  his library, swept before the question is put to him");
console.log("=".repeat(78));

let total = 0, dry = 0;
for (const term of terms) {
  console.log("");
  console.log(`  "${term}"`);
  console.log("  " + "-".repeat(74));
  let any = false;
  for (const zone of ZONES) {
    if (!WIDE && zone.w < 3) continue;
    const hits = sweep(term, zone);
    if (!hits.length) continue;
    any = true; total += hits.length;
    console.log(`    ${zone.name}   (${hits.length})`);
    hits.slice(0, 3).forEach(h => {
      console.log(`      ${h.file}:${h.line}`);
      console.log(`         ${h.text}`);
    });
  }
  if (!any) { dry++; console.log("    nothing found for these words."); }
}

console.log("");
console.log("!".repeat(78));
console.log("WHAT THIS DOES NOT ESTABLISH");
console.log("!".repeat(78));
console.log("  A HIT IS A PLACE TO READ, never an answer. This file does not summarise a");
console.log("  passage or decide what it means; doing either would be the same failure one");
console.log("  layer down.");
console.log("");
console.log("  A MISS PROVES ALMOST NOTHING. It searched these words in these zones. His");
console.log("  library speaks in his own vocabulary, and the right word is usually one he");
console.log("  used and the session did not think of. Try his words before believing a miss.");
console.log("");
console.log(`  ${total} place${total === 1 ? "" : "s"} to read.` +
            (dry ? `   ${dry} term${dry === 1 ? "" : "s"} came back dry — that is a prompt to re-word, not a clearance.` : ""));
console.log("");
