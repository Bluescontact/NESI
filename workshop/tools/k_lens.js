#!/usr/bin/env node
/* ═══ THE K LENS ═══════════════════════════════════════════════════════════
 * Built 2026-08-27, per PREFLIGHT_2026-08-27_k_lens.md — the next largest
 * unlocking task the VE24 swarm pass itself surfaced: Group K
 * (Library-at-large), 44-45 unclaimed top-level directories, ~140 files,
 * canonically inventoried in nesi/mind/VE24_07_protocols_library.html —
 * with ZERO instrument coverage anywhere in this corpus. library_lens.js
 * proved this discipline works; it was just never pointed at K, because K
 * isn't retired-build lineage, it's everything else.
 *
 * A SIBLING SCRIPT, NOT A SILENT EXTENSION. library_lens.js's own docstring
 * is precise about what it walks — retired-build lineage (world2d, world3d,
 * _overnight_build, bench, nesi_bench_v0, game2d/_compost). Group K is a
 * different domain in VE24's own 12-domain map (K: Library-at-large,
 * distinct from J: Retired builds) — folding K into that same ROOTS array
 * would blur a distinction the VE24 swarm pass spent real work establishing.
 * Kept as a deliberately separate file rather than a shared module, matching
 * this corpus's own precedent at framing_check.js/framing_check_skills.js:
 * "duplicated deliberately rather than shared across a boundary that
 * otherwise has no dependency on each other." Named as an open question in
 * the preflight, decided this way for the build.
 *
 * ROOTS RE-COUNTED, NOT TRUSTED FROM VE24_07's OWN TEXT. A fresh top-level
 * `ls`, run 2026-08-27 building this file, found 44 real directories after
 * excluding the five already-claimed domains (.claude, .git, nesi, tools,
 * gate) and __pycache__ (a bytecode cache, not content) — one fewer than
 * VE24_07's own stated "45." Not chased down further; named as a live
 * discrepancy, the fourth stale-count instance this session has found
 * (after edges 2, 6, 21's own findings), not silently reconciled.
 *
 * NOT A JUDGE — same discipline as library_lens.js exactly: finds
 * candidates, ranks by a cheap heuristic, decides nothing.
 *
 * EXTENSIONS SCANNED: the same narrow set library_lens.js already uses
 * (.gd, .js, .py, .html) — NOT extended to .md/.pdf/.docx on this pass.
 * This is a real, named limit, not an oversight: it means this scanner
 * honestly covers only two of K's own ten content clusters (roughly the
 * "Python build scripts" and "standalone HTML tools" clusters, ~26 of
 * K's ~140 files) — the other eight (canon/seed docs, THE_* architecture
 * HTML-as-markdown-adjacent files, RETURN_* session documents, the keeper-marks
 * exports, reference PDFs, misc infrastructure) are markdown/PDF/data this
 * pass's scoring heuristic has no real signal for. Extending coverage to
 * them is a second, separate decision — not bundled in here.
 *
 * THE SAME NARROW-EXTENSION CHOICE ALSO HANDLES THE ONE HARD EXCLUSION THE
 * PREFLIGHT NAMED: K's own census includes real personal/legal documents
 * (storage demand letters, bike packets, elevator references, AHJ
 * comments) under .pdf/.docx — not corpus capacity, and scoring them as
 * "gift candidates" would be the wrong kind of read entirely. Since those
 * extensions were never in the scanned set to begin with, the exclusion is
 * structural (nothing to score in the first place), not a separate filter
 * that could be forgotten or bypassed — named here so the reason is visible,
 * not just the absence.
 *
 *   node tools/k_lens.js              full scan, writes the report
 *   node tools/k_lens.js --top 10     change how many print per root
 *   node tools/k_lens.js --json       machine-readable, no file write
 */
"use strict";
const fs = require("fs"), path = require("path");

const ROOT = __dirname.endsWith(path.join("tools")) ? path.join(__dirname, "..") : __dirname;
const GAME2D = path.join(ROOT, "nesi", "game2d");

/* THE CLAIMED DOMAINS — everything at DSS-root that another VE24 domain
   already names, per VE24_07's own table (B: CLAUDE.md, E/F: .claude/,
   A/B/D/F/G/I/J/L/K's-own-nesi_bench_v0: nesi/, G: tools/, D: gate/).
   Filtered out here, not walked as K. */
const CLAIMED = new Set([".claude", ".git", "nesi", "tools", "gate", "__pycache__"]);

function listKRoots() {
  let entries;
  try { entries = fs.readdirSync(ROOT, { withFileTypes: true }); } catch { return []; }
  return entries
    .filter(e => e.isDirectory() && !CLAIMED.has(e.name))
    .map(e => ({ label: e.name, dir: path.join(ROOT, e.name) }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

const CODE_EXTS = new Set([".gd", ".js", ".py", ".html"]);
const MAX_DEPTH = 6;
const SKIP_DIRS = new Set(["__pycache__", "node_modules", ".git", ".import", ".godot"]);

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

/* Real, checkable signals only — identical to library_lens.js's own
   scoring, ported rather than re-invented so the two scanners' outputs are
   directly comparable. */
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
  const headerMatch = text.match(/\/\*[\s\S]{0,400}|##[^\n]{0,200}(\n##?[^\n]{0,200}){0,3}/);
  const header = (headerMatch ? headerMatch[0] : text.slice(0, 240)).replace(/\s+/g, " ").trim().slice(0, 240);
  return { size, hasDef, claimsBuilt, score, header };
}

function loadIndexText() {
  try { return fs.readFileSync(path.join(GAME2D, "index.html"), "utf8"); } catch { return ""; }
}

/* ROUTED means the deposit target's own text already names this file — same
   conservative substring-on-filename check library_lens.js uses. K's own
   files are much less likely to already be routed than retired-build code
   was (K was never scanned before), so a low routed-count here is expected,
   not a sign the check is broken. */
function isRouted(indexText, filename) {
  return indexText.includes(filename);
}

function main() {
  const args = process.argv.slice(2);
  const topN = (() => { const i = args.indexOf("--top"); return i >= 0 ? parseInt(args[i + 1], 10) || 8 : 8; })();
  const asJson = args.includes("--json");

  const roots = listKRoots();
  const indexText = loadIndexText();
  const report = [];

  roots.forEach(({ label, dir }) => {
    const files = [];
    walk(dir, 0, files);
    const scored = files.map(full => {
      const s = scoreFile(full);
      if (!s) return null;
      const rel = path.relative(ROOT, full).replace(/\\/g, "/");
      const routed = isRouted(indexText, path.basename(full)) || isRouted(indexText, rel);
      return { full, rel, routed, ...s };
    }).filter(Boolean);
    const unrouted = scored.filter(f => !f.routed && f.score > 0).sort((a, b) => b.score - a.score);
    report.push({ label, dir, totalFiles: files.length, routedCount: scored.length - unrouted.length, candidates: unrouted.slice(0, topN) });
  });

  if (asJson) { console.log(JSON.stringify({ kRootCount: roots.length, report }, null, 2)); return; }

  const today = new Date().toISOString().slice(0, 10);
  const lines = [];
  lines.push(`# K LENS — a scan of Group K (Library-at-large), a scan not a judgment, ${today}`);
  lines.push("");
  lines.push("Built per `nesi/mind/PREFLIGHT_2026-08-27_k_lens.md`, identified by the VE24");
  lines.push("swarm pass as the next largest unlocking task: 44 top-level directories with");
  lines.push("zero instrument coverage anywhere in this corpus before this scan.");
  lines.push("");
  lines.push(`**${roots.length} directories scanned this run** — VE24_07's own census stated`);
  lines.push("45; a fresh count found 44. Named as a live discrepancy, not reconciled here.");
  lines.push("");
  lines.push("Same discipline as `tools/library_lens.js` exactly: extensions scanned are");
  lines.push("`.gd`/`.js`/`.py`/`.html` only — nothing here reads meaning, confirms real");
  lines.push("capacity, or composts anything. This narrow extension set also means personal/");
  lines.push("legal `.pdf`/`.docx` material in K (storage letters, bike packets, AHJ");
  lines.push("documents) is structurally excluded — never in the scanned set to begin with,");
  lines.push("not filtered out after the fact. It also means most of K's own content —");
  lines.push("canon/seed markdown, `RETURN_*` session documents, reference PDFs — has no");
  lines.push("signal here at all; extending coverage to those is a separate decision.");
  lines.push("");
  report.forEach(r => {
    lines.push(`## ${r.label}`);
    lines.push(`${r.totalFiles} code file(s) scanned (of matched extensions only), ${r.routedCount} already cited in index.html, ${r.candidates.length} unrouted candidate(s) shown.`);
    lines.push("");
    if (!r.candidates.length) { lines.push("*nothing scored above zero in this directory, or everything found is already routed.*", ""); return; }
    r.candidates.forEach(c => {
      lines.push(`- **${c.rel}** — score ${c.score} (${c.size}b${c.hasDef ? ", has a def" : ""}${c.claimsBuilt ? ", claims built/works" : ""})`);
      lines.push(`  > ${c.header}`);
    });
    lines.push("");
  });
  const md = lines.join("\n");

  const outDir = path.join(GAME2D, "inbox");
  try { fs.mkdirSync(outDir, { recursive: true }); } catch {}
  const outPath = path.join(outDir, `K_LENS_REPORT_${today}.md`);
  fs.writeFileSync(outPath, md, "utf8");

  console.log(md);
  console.log(`\n[k_lens] written to ${path.relative(ROOT, outPath)}`);
}

main();
