#!/usr/bin/env node
/* MARKS GUARD CHECK — 2026-08-25, built on the mark "build all three."
 *
 * "Only Kevin's click marks land in MARKS_LOG.jsonl / MARKS.jsonl / marks.jsonl"
 * was checked by hand during a reconciliation pass — grepped for write calls
 * targeting any of those three filenames across the whole tree — and came back
 * clean. That was a snapshot, not a fact: nothing kept it true as tools get
 * added. This is the thing that keeps it true, re-asserted on every run.
 *
 * Targets any file whose basename matches marks(_log)?.jsonl, case-insensitive
 * — that covers MARKS_LOG.jsonl (repo root), gate/MARKS.jsonl,
 * .gate_control/MARKS.jsonl, and nesi/marks/marks.jsonl, all four found on disk
 * 2026-08-25, without hard-coding the list — a fifth ledger with the same
 * naming shape is caught without editing this file.
 *
 * PRESENCE-ASSERTING, same law as check_all.js and zero_dependencies_check.js:
 * it refuses if it scans zero files, so a broken walk cannot print green by
 * having nothing left to complain about.
 *
 * WHAT IT DOES NOT DO: it does not read the ledgers' own content, only source
 * files for write calls near a reference to one of their names. A write call
 * and the filename are matched within a six-line window so the common
 * `fs.appendFileSync(marksPath, line)` shape — where the path lives in a
 * variable assigned a few lines above the call — is still caught.
 *
 *   node tools/marks_guard_check.js
 */
"use strict";
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..", "..", ".."); // repo root
const EXCLUDE_DIRS = new Set([
  "node_modules", ".git", "__pycache__", ".night",
  ".claude", // worktrees and session state live here — not the live corpus
]);
const TARGET_NAME = /^marks(_log)?\.jsonl$/i;
const WRITE_CALL = /\b(writeFileSync|appendFileSync|createWriteStream|fs\.write\b)\s*\(/;
const WINDOW = 6;

let scanned = 0;
const hits = [];

function walk(dir) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); }
  catch (e) { return; }
  for (const f of entries) {
    if (f.isDirectory()) {
      if (EXCLUDE_DIRS.has(f.name)) continue;
      walk(path.join(dir, f.name));
    } else if (/\.(js|mjs|py)$/.test(f.name)) {
      const p = path.join(dir, f.name);
      let text;
      try { text = fs.readFileSync(p, "utf8"); } catch (e) { continue; }
      scanned++;
      const lines = text.split("\n");
      for (let i = 0; i < lines.length; i++) {
        if (!WRITE_CALL.test(lines[i])) continue;
        const start = Math.max(0, i - WINDOW);
        const windowText = lines.slice(start, i + 1).join("\n");
        // a bare filename reference in the window is enough to flag —
        // this check is deliberately looser than it needs to be, because a
        // false positive costs a look and a false negative costs the law.
        const named = windowText.match(/([A-Za-z0-9_.\/-]*\.jsonl)/g) || [];
        if (named.some((n) => TARGET_NAME.test(path.basename(n)))) {
          hits.push(path.relative(ROOT, p) + ":" + (i + 1) + "  " + lines[i].trim());
        }
      }
    }
  }
}
walk(ROOT);

console.log("");
console.log("  scanned " + scanned + " .js/.mjs/.py file(s) under " + path.relative(path.join(ROOT, ".."), ROOT));

if (scanned === 0) {
  console.error("\n[marks_guard_check] REFUSED — scanned 0 files, the walk itself is broken");
  console.error("                     a run that checks nothing must not print green");
  process.exit(1);
}

if (hits.length) {
  console.error("\n[marks_guard_check] REFUSED — a write call sits near a marks ledger's name, outside the click path:");
  for (const h of hits) console.error("    " + h);
  console.error("    only a hand's click may write a mark. Route this through the UI, or strike it.");
  process.exit(1);
}

console.log("\n[marks_guard_check] all clear — no tool writes to a marks ledger; only a click does");
process.exit(0);
