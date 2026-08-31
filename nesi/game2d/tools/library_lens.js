#!/usr/bin/env node
/* ═══ THE LIBRARY LENS ═══════════════════════════════════════════════════════
 * Built 2026-08-27, Kevin's instruction: "build a lens to extract anything
 * useful we can find and use from the library to aid in this deposit
 * process." The deposit target is named the same day, same instruction:
 * "the current build is the deposit target."
 *
 * NOT A JUDGE. Same discipline this corpus already names elsewhere for a
 * pre-filter — Hermes tiering, the refusal sink's "read before offer" —
 * a volume pre-filter is never a judge against a hand's own mark. This
 * script finds CANDIDATES and ranks them by a cheap heuristic; it does not
 * decide what belongs in the page. Every candidate it prints still needs a
 * session — or Kevin — to read the real file and confirm it before
 * anything gets composted, the same way today's actual composting passes
 * (filter, garden, blind mode, the tombstone, the world) each opened the
 * real source file and quoted it before writing a line of index.html.
 *
 * WHAT IT DOES, four steps:
 *   1. Walk a fixed list of library roots (world2d, world3d,
 *      _overnight_build, bench, nesi_bench_v0, this folder's own _compost)
 *      for real code files — .gd, .js, .py, .html — the same extensions
 *      the unrouted-gifts skill already treats as build-capacity signals.
 *   2. Score each file on real, checkable signals: does it define a
 *      function or class, is it non-trivial in size, does its own text
 *      say "built" or "works". No semantic reading, no guessing at intent.
 *   3. Read index.html once and check whether each candidate file's own
 *      name already appears in it — literally, a substring match against
 *      every comment this build already writes citing its own sources
 *      (e.g. "world2d/scripts/filters_panel.gd"). If it's already cited,
 *      it's ROUTED, not a candidate — the lens does not re-surface what
 *      composting has already reconciled.
 *   4. Print the unrouted survivors, ranked, grouped by root, to a dated
 *      report in inbox/ — the same siting the unrouted-gifts pass already
 *      uses for candidates awaiting a mark.
 *
 * WHAT IT DOES NOT DO: read meaning out of a file, decide a candidate is
 * good, write anything to index.html, or delete/mark a candidate once
 * printed. Re-running it after a real composting pass is expected to
 * shrink the list — that's the instrument confirming its own last report,
 * not a bug.
 *
 *   node tools/library_lens.js              full scan, writes the report
 *   node tools/library_lens.js --top 10     change how many print per root
 *   node tools/library_lens.js --json       machine-readable, no file write
 */
"use strict";
const fs = require("fs"), path = require("path");

const HERE = __dirname;                              // nesi/game2d/tools
const GAME2D = path.join(HERE, "..");                 // nesi/game2d
const NESI = path.join(GAME2D, "..");                 // nesi

const ROOTS = [
  { label: "world2d",          dir: path.join(NESI, "world2d", "scripts") },
  { label: "world3d",          dir: path.join(NESI, "world3d") },
  { label: "_overnight_build", dir: path.join(NESI, "_overnight_build") },
  { label: "bench",            dir: path.join(NESI, "bench") },
  { label: "nesi_bench_v0",    dir: path.join(NESI, "nesi_bench_v0") },
  { label: "game2d/_compost",  dir: path.join(GAME2D, "_compost") },
  // NESI v2's organ body — Kevin's mark 2026-08-31: v2 and world3d both
  // "imploded under the weight of debris," neither revived nor deleted,
  // both soil to mine into game2d. world3d was already a root above;
  // conductor/ (worth.py, tension_table.py, heartwood.py, coordination_surface.py,
  // and 20+ siblings) is the actual code the world3d root's dormant sibling
  // never had scanned at all before this.
  { label: "nesi_v2_conductor", dir: path.join(NESI, "conductor") },
  // The fresh walk, 2026-08-31 (Kevin's mark: "run a fresh scan on
  // territory the lens hasn't walked"). ROOT below is NESI's parent —
  // the corpus root. Chosen deliberately: territories Kevin has named as
  // holding abandoned value (the widget app, the design-system surface,
  // root tools/) plus every code-bearing sibling never walked before.
  // Prose-only trees (decks, substack, counsel, patterns/) carry no
  // CODE_EXTS files worth ranking — they wait for a reading pass, not
  // this scanner.
  { label: "_widgets",            dir: path.join(NESI, "..", "_widgets") },
  { label: "ds-kit",              dir: path.join(NESI, "..", "ds-kit") },
  { label: "tools_root",          dir: path.join(NESI, "..", "tools") },
  { label: "village_app",         dir: path.join(NESI, "..", "village_app") },
  { label: "osg-v6",              dir: path.join(NESI, "..", "osg-v6") },
  { label: "osg_organ",           dir: path.join(NESI, "..", "osg_organ") },
  { label: "mito-mcp",            dir: path.join(NESI, "..", "mito-mcp") },
  { label: "podcast_narrator",    dir: path.join(NESI, "..", "podcast_narrator") },
  { label: "kwp",                 dir: path.join(NESI, "..", "kwp") },
  { label: "kit",                 dir: path.join(NESI, "..", "kit") },
  { label: "coherence-codex",     dir: path.join(NESI, "..", "coherence-codex") },
  { label: "aoc-v2",              dir: path.join(NESI, "..", "aoc-v2") },
  { label: "netlify_forms_relay", dir: path.join(NESI, "..", "netlify_forms_relay") },
  { label: "open_ledger",         dir: path.join(NESI, "..", "open_ledger") },
  { label: "rhythm",              dir: path.join(NESI, "..", "rhythm") },
  { label: "held_refusal",        dir: path.join(NESI, "..", "held_refusal") },
  { label: "gate_root",           dir: path.join(NESI, "..", "gate") },
  { label: "instruments_root",    dir: path.join(NESI, "..", "instruments") },
  { label: "nesi/workbench",      dir: path.join(NESI, "workbench") },
  { label: "nesi/net",            dir: path.join(NESI, "net") },
  { label: "nesi/forest",         dir: path.join(NESI, "forest") },
  { label: "nesi/interrogator",   dir: path.join(NESI, "interrogator") },
  { label: "nesi/continuity",     dir: path.join(NESI, "continuity") },
  { label: "nesi/world",          dir: path.join(NESI, "world") },
];
const CODE_EXTS = new Set([".gd", ".js", ".py", ".html"]);
const MAX_DEPTH = 6;
const SKIP_DIRS = new Set(["__pycache__", "node_modules", ".git", ".import", ".godot",
  // Python venvs (podcast_narrator ships one) — library code, not this corpus's own work
  "venv", ".venv", "site-packages", "Lib", "Scripts"]);

function walk(dir, depth, out) {
  if (depth > MAX_DEPTH) return;
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const e of entries) {
    if (SKIP_DIRS.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) { walk(full, depth + 1, out); continue; }
    const ext = path.extname(e.name);
    if (!CODE_EXTS.has(ext)) continue;
    out.push(full);
  }
}

/* Real, checkable signals only — the same class of thing unrouted-gifts'
   own scan.mjs looks for (built / works / a class or function definition),
   never a reading of what the code means. */
const DEF_PATTERN = /\bclass_name\b|\bfunc\s+\w+|\bfunction\s+\w+|\bdef\s+\w+\(|<script/;
const CLAIM_PATTERN = /\b(built|works|working|verified)\b/i;

function scoreFile(full) {
  let text;
  try { text = fs.readFileSync(full, "utf8"); } catch { return null; }
  if (!text.trim()) return null;
  const hasDef = DEF_PATTERN.test(text);
  const claimsBuilt = CLAIM_PATTERN.test(text.slice(0, 2000));
  const size = Buffer.byteLength(text, "utf8");
  let score = 0;
  if (hasDef) score += 3;
  if (size > 1024) score += 1;
  if (claimsBuilt) score += 2;
  // a short header: the first real comment block, or the first non-blank lines
  const headerMatch = text.match(/\/\*[\s\S]{0,400}|##[^\n]{0,200}(\n##?[^\n]{0,200}){0,3}/);
  const header = (headerMatch ? headerMatch[0] : text.slice(0, 240)).replace(/\s+/g, " ").trim().slice(0, 240);
  return { size, hasDef, claimsBuilt, score, header };
}

function loadIndexText() {
  try { return fs.readFileSync(path.join(GAME2D, "index.html"), "utf8"); } catch { return ""; }
}

/* ROUTED means the deposit target's own text already names this file —
   the exact discipline every real composting pass this session ran used
   by hand (quote the source path in the comment that ports it in). A
   substring match on the filename is cheap and conservative: it can miss
   a file that got composted under a different name, but it will never
   falsely clear one that hasn't been. */
function isRouted(indexText, filename) {
  return indexText.includes(filename);
}

function main() {
  const args = process.argv.slice(2);
  const topN = (() => { const i = args.indexOf("--top"); return i >= 0 ? parseInt(args[i + 1], 10) || 8 : 8; })();
  const asJson = args.includes("--json");

  const indexText = loadIndexText();
  const report = [];

  ROOTS.forEach(({ label, dir }) => {
    if (!fs.existsSync(dir)) { report.push({ label, dir, exists: false, candidates: [] }); return; }
    const files = [];
    walk(dir, 0, files);
    const scored = files.map(full => {
      const s = scoreFile(full);
      if (!s) return null;
      const rel = path.relative(NESI, full).replace(/\\/g, "/");
      const routed = isRouted(indexText, path.basename(full)) || isRouted(indexText, rel);
      return { full, rel, routed, ...s };
    }).filter(Boolean);
    const unrouted = scored.filter(f => !f.routed && f.score > 0).sort((a, b) => b.score - a.score);
    report.push({ label, dir, exists: true, totalFiles: files.length, routedCount: scored.length - unrouted.length, candidates: unrouted.slice(0, topN) });
  });

  if (asJson) { console.log(JSON.stringify(report, null, 2)); return; }

  const today = new Date().toISOString().slice(0, 10);
  const lines = [];
  lines.push(`# LIBRARY LENS — a scan, not a judgment, ${today}`);
  lines.push("");
  lines.push("Built on Kevin's instruction 2026-08-27: \"build a lens to extract anything");
  lines.push("useful we can find and use from the library to aid in this deposit");
  lines.push("process.\" `tools/library_lens.js` did the walking; nothing below has been");
  lines.push("read for meaning, confirmed as real capacity, or composted — every line is a");
  lines.push("candidate, ranked by a cheap heuristic (real function/class definitions,");
  lines.push("nontrivial size, the file's own text claiming \"built\" or \"works\"), and every");
  lines.push("one still needs a session to open the real file before it's trusted.");
  lines.push("");
  lines.push("A file is left off this list only because `index.html` already names it —");
  lines.push("literally, a substring match against this build's own citation comments —");
  lines.push("not because anything here judged it unworthy.");
  lines.push("");
  report.forEach(r => {
    lines.push(`## ${r.label}`);
    if (!r.exists) { lines.push("", "*not found on disk*", ""); return; }
    lines.push(`${r.totalFiles} code file(s) scanned, ${r.routedCount} already cited in index.html, ${r.candidates.length} unrouted candidate(s) shown.`);
    lines.push("");
    if (!r.candidates.length) { lines.push("*nothing scored above zero, or everything found is already routed.*", ""); return; }
    r.candidates.forEach(c => {
      lines.push(`- **${c.rel}** — score ${c.score} (${c.size}b${c.hasDef ? ", has a def" : ""}${c.claimsBuilt ? ", claims built/works" : ""})`);
      lines.push(`  > ${c.header}`);
    });
    lines.push("");
  });
  const md = lines.join("\n");

  const outDir = path.join(GAME2D, "inbox");
  try { fs.mkdirSync(outDir, { recursive: true }); } catch {}
  const outPath = path.join(outDir, `LENS_REPORT_${today}.md`);
  fs.writeFileSync(outPath, md, "utf8");

  console.log(md);
  console.log(`\n[library_lens] written to ${path.relative(GAME2D, outPath)}`);
}

main();
