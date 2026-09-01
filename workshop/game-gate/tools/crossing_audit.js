#!/usr/bin/env node
/* ═══ THE CROSSING AUDIT ═══════════════════════════════════════════════════════
 * Built 2026-08-16 on the keeper's order: "i want the 176 run against the geometry
 * before we ever publish anything."
 *
 * ── FIRST, THE NUMBER WAS WRONG AND IT MATTERS ────────────────────────────────
 * 176 was route_map.js's count of CAPABILITIES that are tracked — surfaces,
 * modules, instruments, seats, ledgers. The repository holds far more than
 * capabilities. `git ls-files` is the publish surface, and it is the number this
 * file uses. Anchoring a publish gate on the smaller count would gate a fifth of
 * what leaves.
 *
 * ── WHAT IT ASKS OF EVERY FILE THAT WOULD CROSS ───────────────────────────────
 *   1 · WHERE IT SITS      which of the twelve seats it declares (@seat)
 *   2 · WHAT IT CARRIES    whether his verbatim writing is inside it
 *
 * ── THE PROVENANCE TEST IS A DETECTOR, NEVER A CLEARANCE ──────────────────────
 * THIS IS THE MOST IMPORTANT LINE IN THIS FILE. The test takes known strings —
 * his poured sentences from keepers-water.json, the marks he authored in
 * MARKS_LOG.jsonl, and his twenty-month corpus embedded in NESI.html — and asks
 * which tracked files contain them. That is a fact about containment, not a
 * reading of content: no classifier decides what is personal, which law 5 forbids.
 *
 * THE SOURCES ARE REPORTED SEPARATELY AND THAT SEPARATION IS THE POINT. His
 * MARKS are decisions he made about this work; his CORPUS is his daily writing.
 * A repository may reasonably hold the first and must be looked at twice before
 * it holds the second, so a single blended number would hide the only
 * distinction a publish decision turns on.
 *
 * The consequence is asymmetric and must never be smoothed:
 *
 *      A HIT IS PROOF THAT HIS WRITING IS IN THAT FILE.
 *      A MISS IS NOT PROOF THAT IT IS NOT.
 *
 * The probe set is small and finite. A file holding writing from any other
 * source — a journal, a letter, a corpus this file never read — passes silently.
 * This gate narrows the question; it does not answer it. Anything reported CLEAR
 * is clear OF THESE PROBES and of nothing else, and the report says so on every
 * run rather than in a footnote.
 *
 *   node tools/crossing_audit.js            the audit
 *   node tools/crossing_audit.js --carries  only the files carrying his writing
 *   node tools/crossing_audit.js --json
 */
"use strict";
const fs = require("fs"), path = require("path"), cp = require("child_process");

const ROOT = (() => { let d = __dirname;
  for (let i = 0; i < 12; i++) { if (fs.existsSync(path.join(d, ".git"))) return d;
    const u = path.dirname(d); if (u === d) break; d = u; } return null; })();
if (!ROOT) { console.error("crossing_audit: no .git above " + __dirname); process.exit(1); }

let SEATS;
try { SEATS = require(path.join(__dirname, "..", "solid.js")).NAMES; }
catch { console.error("crossing_audit: cannot load solid.js — refusing to name the seats from memory."); process.exit(1); }
const SEATSET = new Set(SEATS);

/* ── the publish surface: what git would actually ship ──────────────────────── */
const TRACKED = cp.execFileSync("git", ["-C", ROOT, "ls-files"],
  { encoding: "utf8", maxBuffer: 64 << 20 }).split("\n").filter(Boolean);

/* ── the probes ──────────────────────────────────────────────────────────────
   A fixed-width slice from inside each sentence rather than the whole of it: a
   whole sentence can differ by one character of punctuation between the store
   and a file that quotes it, and the miss would read as an absence. Short
   sources are dropped — a common phrase would hit everything and the report
   would mean nothing.

   THE REPORT NEVER PRINTS A PROBE. Every probe is a fragment of his writing, so
   an audit that echoed its matches would be a second copy of the thing it is
   auditing. Only paths, counts and origins are ever printed. */
const W = 32;                                  /* probe width, characters */
const probeSet = new Set();
const probeOrigin = new Map();
const srcCount = {};
function addProbe(text, origin) {
  if (typeof text !== "string") return;
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length < W + 10) return;
  const s = t.slice(6, 6 + W);
  if (s.length < W) return;
  if (!probeSet.has(s)) { probeSet.add(s); probeOrigin.set(s, origin);
    srcCount[origin] = (srcCount[origin] || 0) + 1; }
}

/* his poured water — the store the game runs on */
try {
  const w = JSON.parse(fs.readFileSync(path.join(ROOT, "nesi/game2d/keepers-water.json"), "utf8"));
  ["tank", "grounds", "lake", "compost", "linesList", "standing"].forEach(k =>
    (Array.isArray(w[k]) ? w[k] : []).forEach(e => addProbe(e && (e.text || e.t || e), "water")));
} catch (e) { console.error("crossing_audit: could not read keepers-water.json — " + e.message); process.exit(1); }

/* his own marks */
try {
  fs.readFileSync(path.join(ROOT, "MARKS_LOG.jsonl"), "utf8").split("\n").forEach(l => {
    if (!l.trim()) return;
    try { const r = JSON.parse(l); if (r.source === "the keeper") addProbe(r.mark, "mark"); } catch {}
  });
} catch {}

/* THE CORPUS — NESI.html at the repo root, added 2026-08-16 on the keeper's order
   "extend the probe set from NESI.html". 5,081 entries, 2024-12-12 → 2026-08-02,
   embedded as JSON in a script tag. The file itself is held OUTSIDE the
   repository by the /* rule and is read here only to build hashes; not one
   character of it is written anywhere by this instrument. */
try {
  const src = fs.readFileSync(path.join(ROOT, "NESI.html"), "utf8");
  const i = src.indexOf('id="poured"');
  if (i > 0) {
    const j = src.indexOf(">", i) + 1, k = src.indexOf("</script>", j);
    JSON.parse(src.slice(j, k)).forEach(e => addProbe(Array.isArray(e) ? e[3] : e && e.text, "corpus"));
  }
} catch (e) { console.error("crossing_audit: NESI.html not readable — " + e.message +
  "\n  Continuing WITHOUT the corpus probes; the gate is correspondingly narrower."); }

if (!probeSet.size) { console.error("crossing_audit: no probes could be built — refusing to report a clean tree."); process.exit(1); }

/* ── matching: Rabin-Karp over a fixed window ────────────────────────────────
   Thousands of patterns against megabytes of text, so one pass per file with a
   rolling hash rather than a pattern-by-pattern scan. A hash hit is VERIFIED by
   a real string compare before it counts — an unverified hash match is a
   collision reported as his writing, which is the one error this file must not
   make in that direction. */
const BASE = 131, MOD = 1e9 + 7;
let POW = 1; for (let i = 1; i < W; i++) POW = (POW * BASE) % MOD;
function hashOf(s) { let h = 0; for (let i = 0; i < W; i++) h = (h * BASE + s.charCodeAt(i)) % MOD; return h; }
const byHash = new Map();
for (const s of probeSet) { const h = hashOf(s);
  if (!byHash.has(h)) byHash.set(h, []); byHash.get(h).push(s); }

function scan(flat) {
  const found = new Set();
  if (flat.length < W) return found;
  let h = hashOf(flat);
  for (let i = 0; ; i++) {
    const cands = byHash.get(h);
    if (cands) for (const c of cands) if (flat.startsWith(c, i)) found.add(c);
    if (i + W >= flat.length) break;
    h = (h - flat.charCodeAt(i) * POW % MOD + MOD * 2) % MOD;
    h = (h * BASE + flat.charCodeAt(i + W)) % MOD;
  }
  return found;
}

/* ── read every tracked file that is text ───────────────────────────────────── */
const BIN = /\.(pdf|png|jpe?g|gif|zip|exe|ico|woff2?|ttf|mp4|webm|wasm)$/i;
const DECL = /@seat\s+([A-Za-z]+)/;
const rows = [];
for (const rel of TRACKED) {
  const abs = path.join(ROOT, rel);
  let st; try { st = fs.statSync(abs); } catch { continue; }
  const row = { path: rel, bytes: st.size, binary: BIN.test(rel), seat: null, hits: [], probes: 0 };
  if (!row.binary && st.size < (24 << 20)) {
    let txt = ""; try { txt = fs.readFileSync(abs, "utf8"); } catch { txt = ""; }
    const flat = txt.replace(/\s+/g, " ");
    const m = txt.slice(0, 4000).match(DECL);
    if (m) { const n = m[1].toUpperCase();
      row.seat = n === "NONE" ? "none" : (SEATSET.has(n) ? n : null); }
    const found = scan(flat);
    row.probes = found.size;
    const origins = {}; found.forEach(s => { const o = probeOrigin.get(s); origins[o] = (origins[o] || 0) + 1; });
    row.hits = origins;
  }
  rows.push(row);
}

const ARG = process.argv.slice(2);
if (ARG.includes("--json")) { console.log(JSON.stringify({ root: ROOT, probes: probeSet.size, sources: srcCount, rows }, null, 2)); process.exit(0); }

const kb = n => (n / 1024).toFixed(0) + "K";
const L = s => console.log(s);
const carries = rows.filter(r => r.probes > 0).sort((a, b) => b.probes - a.probes);
const routed  = rows.filter(r => r.seat && r.seat !== "none");

L("");
L("THE CROSSING AUDIT  ·  everything that would publish");
L("=".repeat(78));
L("");
L(`  files in the repository ..... ${rows.length}`);
L(`  binary, not probed .......... ${rows.filter(r => r.binary).length}`);
L(`  probes built ................ ${probeSet.size}   ${Object.entries(srcCount).map(([k,v])=>k+" "+v).join(" · ")}`);
L("");

L("1 · WHERE IT SITS IN THE GEOMETRY");
L("-".repeat(78));
if (!routed.length) {
  L(`  NOTHING DECLARES A SEAT. ${rows.length} files would publish and not one of them`);
  L("  says where in the geometry it belongs. The twelve seats exist; the repository");
  L("  does not reference them. That is the answer to running the tree against the");
  L("  geometry, and it is a fact about the tree, not a failure of this instrument.");
} else {
  SEATS.forEach(s => { const at = routed.filter(r => r.seat === s);
    if (at.length) L(`  ${s.padEnd(15)} ${at.length}`); });
  L(`  unrouted ....... ${rows.length - routed.length} of ${rows.length}`);
}
L("");

L("2 · WHAT IT CARRIES — files containing his verbatim writing");
L("-".repeat(78));
L(`  ${carries.length} of ${rows.length} files match one or more probes.`);
L("");
const bySrc = {};
carries.forEach(r => Object.entries(r.hits || {}).forEach(([k, v]) => bySrc[k] = (bySrc[k] || 0) + v));
L("  distinct probes hit, BY SOURCE — the separation a publish decision turns on:");
Object.keys(srcCount).forEach(k =>
  L(`    ${k.padEnd(8)} ${String(bySrc[k] || 0).padStart(5)} hits   of ${srcCount[k]} probes built`));
L("");
carries.slice(0, ARG.includes("--carries") ? 500 : 25).forEach(r =>
  L(`  ${String(r.probes).padStart(4)} hits  ${kb(r.bytes).padStart(7)}  ${r.path}`));
if (!ARG.includes("--carries") && carries.length > 25)
  L(`  … and ${carries.length - 25} more — run with --carries for the full list`);
L("");

const zones = {};
carries.forEach(r => { const z = r.path.includes("/") ? r.path.split("/").slice(0, 2).join("/") + "/" : "(root)";
  zones[z] = (zones[z] || 0) + 1; });
L("  by zone:");
Object.entries(zones).sort((a, b) => b[1] - a[1]).slice(0, 10)
  .forEach(([z, n]) => L(`    ${String(n).padStart(4)}  ${z}`));
L("");

L("!".repeat(78));
L("WHAT THIS AUDIT DOES NOT ESTABLISH");
L("!".repeat(78));
L(`  It tested ${probeSet.size} known strings. A hit PROVES his writing is in that`);
L("  file. A miss proves only that these strings are not — writing from");
L("  any other source passes this gate silently, and so does anything paraphrased,");
L("  reformatted, or summarised.");
L("");
L(`  ${rows.filter(r => r.binary).length} binary files were not read at all.`);
L("");
L("  NOTHING HERE IS A CLEARANCE TO PUBLISH. It narrows the question. The reading");
L("  of what may leave is the keeper's, and this instrument does not make it.");
L("");
