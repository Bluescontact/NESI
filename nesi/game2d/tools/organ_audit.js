#!/usr/bin/env node
/* ═══ THE ORGAN AUDIT ══════════════════════════════════════════════════════════
 * Built 2026-08-16 on Kevin's line: "now find the organs in the code i already
 * have." The wild-side catalogue is ORGANS.json; this is the other side of it —
 * which of the twenty-four are already standing in his own tree.
 *
 * ── CODE PROBES RUN AGAINST COMMENT-STRIPPED SOURCE, AND THAT IS NOT FUSSINESS ─
 * The first pass of this file reported THE SEATING's computed-midpoint defect as
 * LIVE. It is not: `Math.ceil(w.length/2)` survives only inside a comment saying
 * it was removed on 2026-08-14. A tree that documents its own corrections in
 * prose will hand a naive grep the exact opposite of the truth, and this tree
 * documents its corrections more than most. So every probe declares where it
 * must match:
 *     in:"code"   — matched against source with all comments removed
 *     in:"prose"  — matched against comments only, for organs whose evidence IS
 *                   the stated intent rather than a construct
 * A prose hit is never counted as a built organ. It is counted as a claim.
 *
 * ── THE ASYMMETRY, same as crossing_audit.js ──────────────────────────────────
 *     A HIT IS PROOF THE CONSTRUCT IS AT THAT LINE.
 *     A MISS IS NOT PROOF THE ORGAN IS ABSENT.
 * A probe is one written signature. An organ built a different way passes
 * silently and is reported as absent when it is not. The verdicts below are a
 * session's reading, carried in the `finding` line; the probe only fixes them to
 * a line of real source so that they collapse to UNVERIFIED if the code moves.
 *
 * ── NOTHING HERE IS A DEFECT LIST ─────────────────────────────────────────────
 * An organ absent from the tree is not a bug. Several are absent because a law
 * forbids them. The state to read for is not `no` — it is `discipline`: the law
 * is obeyed, and nothing in the construction stops it being broken tomorrow.
 *
 *   node tools/organ_audit.js             the audit
 *   node tools/organ_audit.js --gap       only what is absent or held by discipline
 *   node tools/organ_audit.js --json
 */
"use strict";
const fs = require("fs"), path = require("path");

let SOLID, CAT;
try { SOLID = require(path.join(__dirname, "..", "solid.js")); }
catch { console.error("organ_audit: cannot load solid.js — refusing to name the seats from memory."); process.exit(1); }
try { CAT = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "ORGANS.json"), "utf8")); }
catch (e) { console.error("organ_audit: cannot read ORGANS.json — " + e.message); process.exit(1); }
const { NAMES, falls, ADJ, isMember } = SOLID;

/* ── the built table, READ FROM ORGANS.json ──────────────────────────────────
   Kevin's line, 2026-08-16: "the game and the absorption instrument are the same
   thing, looked at from different lenses." This file used to carry its own copy
   of the twenty-four, keyed by name against the catalogue — one object written
   down twice, which is exactly the split his line says does not exist. There is
   one record per organ now: its sightings in the commons and its state in the
   tree are two faces of it, and neither can drift from the other because there
   is no other.

   state:  built      the construct is there and the organ is structural
           discipline the law is obeyed, and nothing in the code enforces it
           partial    part of the organ is there
           inverted   the opposite construct is there
           absent     no construct found by this probe
           by-law     absent because a law forbids it — not a gap  */
const BUILT = CAT.organs.map(o => {
  if (!o.built) { console.error("organ_audit: '" + o.organ + "' carries no built face — refusing to report a tree it has not looked at."); process.exit(1); }
  const b = o.built;
  return { organ:o.organ, seat:o.seat, state:b.state, file:b.at || "—",
           probe: b.probe ? new RegExp(b.probe) : null, in: b.probe_in || "code",
           finding: b.finding };
});

/* ── read the tree ───────────────────────────────────────────────────────────
   Comments are stripped for code probes. Line comments are removed only when the
   line has no quote before the //, which is crude and is stated rather than
   hidden: a probe that straddles that case would misreport, and none here does. */
const ROOT = path.join(__dirname, "..");
const cache = {};
function src(f) {
  if (cache[f]) return cache[f];
  let raw = ""; try { raw = fs.readFileSync(path.join(ROOT, f), "utf8"); } catch { }
  /* PROSE IS DEFINED AS WHAT THE STRIPPER REMOVED, never as its own pattern.
     Written twice, the two drift: the first version matched trailing comments
     only on lines with no quote before the //, so `fillRect(...);  // below the
     line: nothing. ever.` was neither code nor prose and its probe reported a
     miss on an organ that is plainly built. Deriving prose from the removal
     makes that class of hole impossible — every character is in exactly one. */
  const removed = [];
  const code = raw
    .replace(/\/\*[\s\S]*?\*\//g, m => { removed.push(m); return ""; })
    .replace(/(^|[^:"'`\\])\/\/(.*)$/gm, (m, pre, c) => { removed.push(c); return pre; });
  const prose = removed.join("\n");
  return (cache[f] = { raw, code, prose });
}
function lineOf(hay, m) { return hay.slice(0, m.index).split("\n").length; }

const rows = BUILT.map(b => {
  const r = Object.assign({}, b, { hit: null, line: null, falsePositive: false });
  if (!b.probe || b.file === "—") return r;
  const s = src(b.file);
  const target = b.in === "prose" ? s.prose : s.code;
  const m = target.match(b.probe);
  r.hit = !!m;
  if (m && b.in === "code") { const rm = s.raw.match(b.probe); if (rm) r.line = lineOf(s.raw, rm); }
  if (!m && b.in === "code" && b.probe.test(s.raw)) r.falsePositive = true;   /* matches only in prose */
  return r;
});

const ARG = process.argv.slice(2);
if (ARG.includes("--json")) { console.log(JSON.stringify(rows, null, 2)); process.exit(0); }

const L = s => console.log(s);
const bar = c => L(c.repeat(78));
const MARK = { built: "●  BUILT", discipline: "◐  BY DISCIPLINE", partial: "◐  PARTIAL",
               inverted: "◑  INVERTED", absent: "○  ABSENT", "by-law": "—  ABSENT BY LAW" };
const GAP = new Set(["discipline", "partial", "inverted", "absent"]);

L("");
L("THE ORGAN AUDIT  ·  which of the twenty-four are standing in his own tree");
bar("=");
L("");
L(`  organs in the catalogue ..... ${CAT.organs.length}`);
L(`  probed against .............. ${[...new Set(BUILT.map(b => b.file))].filter(f => f !== "—").join(", ")}`);
L(`  code probes run against source with comments stripped`);
L("");

for (const seat of NAMES) {
  const here = rows.filter(r => r.seat === seat);
  if (!here.length) continue;
  if (ARG.includes("--gap") && !here.some(r => GAP.has(r.state))) continue;
  L(`${falls(seat) ? "↓" : "↑"}${seat}  —  ${CAT.gestures[seat]}`);
  L("  " + "-".repeat(74));
  for (const r of here) {
    if (ARG.includes("--gap") && !GAP.has(r.state)) continue;
    L(`  ${MARK[r.state]}   ${r.organ}`);
    if (r.probe) L(`      probe ${r.hit ? "hit" : "MISS"}${r.line ? `  ${r.file}:${r.line}` : r.file !== "—" ? `  ${r.file}` : ""}${r.in === "prose" ? "  (prose — a stated intent, not a construct)" : ""}`);
    if (r.falsePositive) L(`      !  the probe matches ONLY inside a comment — the construct is not in the code`);
    if (r.probe && !r.hit) L(`      !  probe did not match; the finding below is UNVERIFIED and may have rotted`);
    L(`      ${r.finding}`);
    L("");
  }
}

bar("=");
L("THE CENSUS");
bar("=");
L("");
const t = {}; rows.forEach(r => t[r.state] = (t[r.state] || 0) + 1);
["built", "discipline", "partial", "inverted", "absent", "by-law"].forEach(k => { if (t[k]) L(`  ${String(t[k]).padStart(3)}  ${MARK[k].replace(/^.\s+/, "")}`); });
L("");
const miss = rows.filter(r => r.probe && !r.hit);
L(`  probes: ${rows.filter(r => r.probe).length} run, ${rows.filter(r => r.hit).length} hit, ${miss.length} missed`);
if (miss.length) miss.forEach(r => L(`    UNVERIFIED — ${r.organ}`));
L("");

/* the geometry check: where do the gaps sit relative to each other */
const gapSeats = [...new Set(rows.filter(r => r.state === "absent" || r.state === "discipline").map(r => r.seat))];
L(`  seats carrying an absence or a discipline-only hold: ${gapSeats.join(", ")}`);
const pairs = [];
for (let i = 0; i < gapSeats.length; i++) for (let k = i + 1; k < gapSeats.length; k++)
  if (isMember(gapSeats[i], gapSeats[k])) pairs.push(gapSeats[i] + "—" + gapSeats[k]);
L(pairs.length ? `  and these are members of each other, so the gaps are adjacent: ${pairs.join(" · ")}`
               : "  none of them are members of each other — the gaps are scattered, not a seam.");
L("");

bar("!");
L("WHAT THIS AUDIT DOES NOT ESTABLISH");
bar("!");
L("  A HIT PROVES the construct is at that line. A MISS PROVES NOTHING — a probe is");
L("  one written signature, and an organ built another way passes silently and is");
L("  reported absent when it is not.");
L("");
L("  AN ABSENCE IS NOT A DEFECT. background compaction is absent because law 8");
L("  forbids it. The state to read for is BY DISCIPLINE — the law is obeyed and");
L("  nothing in the construction stops it being broken tomorrow.");
L("");
L("  ONE TENSION, NAMED AND NOT RESOLVED HERE: law 8 says no offline progression,");
L("  and THE DEEP's own line says what went down 'returns later as ground, on a day");
L("  you did not come back to check.' Both are in the corpus. Which governs is not");
L("  this instrument's to decide.");
L("");
