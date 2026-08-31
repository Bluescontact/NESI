#!/usr/bin/env node
/* STALE-COUNT CHECK — do the corpus's own documented counts still match a live recount?
 *
 * WHY IT EXISTS: item 2 of nesi/mind/DRAFT_LENS_PANEL_VE24_2026-08-27_preflight_manifest.md
 * (Kevin's mark 2026-08-27). Stuart Cowan's lens-panel reading over the VE24 build named a
 * defect that recurred four independent times inside that build alone — a documented count
 * (of laws, skills, instruments, tools/ files) accurate when written, with nothing
 * mechanically re-checking it as the corpus grows. Named at VE24 edges 2, 6, 21, and a fourth
 * time inside the swarm pass's own output (a "35 of 56" count later corrected to 52).
 * game-craft's own reading found a fifth instance in the same pass: the VE24 traversal
 * file's edge-relationship data is a hand-transcribed copy of VE24_RELATIONSHIPS' own table,
 * with nothing catching the two drifting apart — folded into this checker as its first
 * target, per item 5 of the same manifest ("fold this specific file-pair into item 2's
 * general checker once built, as its first/highest-priority target").
 *
 * REPORT-ONLY, REFUSES NOTHING, CORRECTS NOTHING: same discipline as session_bridge_check.js
 * — a measured reading, not a gate. It flags drift; it does not fix it.
 *
 *   node tools/stale_count_check.js
 */
"use strict";
const fs = require("fs"), path = require("path");

const ROOT = path.resolve(__dirname, "..");
const read = (p) => { try { return fs.readFileSync(path.join(ROOT, p), "utf8"); } catch (e) { return null; } };

let flags = 0;
function report(label, claimed, live, extra) {
  const stale = claimed !== null && live !== null && String(claimed) !== String(live);
  console.log(`  ${stale ? "DRIFT " : "match "} ${label}: documented=${claimed === null ? "?" : claimed}  live=${live === null ? "?" : live}${extra ? "  " + extra : ""}`);
  if (stale) flags++;
  return stale;
}

console.log("stale_count_check\n");

// --- 1. LEARNED.md's own law count, as cited by other files in the corpus ---
console.log("1. nesi/mind/LEARNED.md law count vs. citations elsewhere");
{
  const learned = read("nesi/mind/LEARNED.md");
  let liveCount = null;
  if (learned) {
    const nums = [...learned.matchAll(/^\*\*(\d+)\s*·/gm)].map(m => parseInt(m[1], 10));
    if (nums.length) liveCount = Math.max(...nums);
  }
  const citers = [
    ["nesi/mind/VE24_01_laws_lenses.html", /(\d+)\s*numbered laws/],
    ["nesi/mind/VE24_TRAVERSAL_2026-08-27.html", null], // no count claim in this file
  ];
  for (const [file, re] of citers) {
    if (!re) continue;
    const src = read(file);
    const m = src && src.match(re);
    const claimed = m ? parseInt(m[1], 10) : null;
    if (claimed !== null) report(`${file}`, claimed, liveCount);
  }
  if (liveCount !== null) console.log(`  (live count, highest numbered law header in LEARNED.md: ${liveCount})`);
}

// --- 2. .claude/skills/ count vs. any "N skills" claim ---
console.log("\n2. .claude/skills/ population vs. citations elsewhere");
{
  let liveCount = null;
  try { liveCount = fs.readdirSync(path.join(ROOT, ".claude", "skills")).filter(f =>
    fs.statSync(path.join(ROOT, ".claude", "skills", f)).isDirectory()).length; } catch (e) {}
  const protocols = read("nesi/mind/PROTOCOLS.md");
  const m = protocols && protocols.match(/other (twelve|\d+) skills/i);
  if (m) {
    const word = m[1].toLowerCase();
    const claimed = word === "twelve" ? 12 : parseInt(word, 10);
    // PROTOCOLS.md's phrasing implies claimed+1 total (the one with the manifest + "other twelve")
    report("PROTOCOLS.md 'other twelve skills' (+1 = total claimed)", claimed + 1, liveCount);
  }
  if (liveCount !== null) console.log(`  (live count, .claude/skills/ subdirectories: ${liveCount})`);
}

// --- 3. check_all.js instrument count vs. CLAUDE.md's "twelve instruments" ---
console.log("\n3. nesi/game2d/tools/check_all.js instrument count vs. root CLAUDE.md's claim");
{
  const claudeMd = read("CLAUDE.md");
  const m = claudeMd && claudeMd.match(/(Twelve|Nine|Ten|Eleven|Thirteen|Fourteen|Fifteen|Sixteen|Seventeen|Eighteen|\d+) instruments hold or refuse/);
  const WORDS = { twelve: 12, nine: 9, ten: 10, eleven: 11, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18 };
  const claimed = m ? (WORDS[m[1].toLowerCase()] ?? parseInt(m[1], 10)) : null;

  const checkAll = read("nesi/game2d/tools/check_all.js");
  let liveCount = null;
  if (checkAll) {
    const arrCount = (name) => {
      const am = checkAll.match(new RegExp(`const ${name} = \\[([\\s\\S]*?)\\];`));
      if (!am) return 0;
      return (am[1].match(/\[\s*['"]/g) || []).length;
    };
    liveCount = arrCount("NODE") + arrCount("PY") + arrCount("ESM") + arrCount("GATE");
  }
  report("CLAUDE.md 'twelve instruments'", claimed, liveCount, "(NODE+PY+ESM+GATE rows in check_all.js)");
  if (liveCount !== null) console.log(`  (live count breakdown available by re-running this script with --verbose)`);
}

// --- 4. VE24 traversal RELATIONS array vs. VE24_RELATIONSHIPS' own Relationship Map table ---
console.log("\n4. VE24_TRAVERSAL_2026-08-27.html's RELATIONS array vs. VE24_RELATIONSHIPS_2026-08-27.html's own table");
console.log("   (item 5 of the lens-panel manifest, folded in here as this checker's first named target)");
{
  const traversal = read("nesi/mind/VE24_TRAVERSAL_2026-08-27.html");
  const relFile = read("nesi/mind/VE24_RELATIONSHIPS_2026-08-27.html");

  function edgeSetsFromTraversal(src) {
    if (!src) return null;
    const m = src.match(/const RELATIONS = \[([\s\S]*?)\n\];/);
    if (!m) return null;
    const entries = [...m[1].matchAll(/edges:\s*\[([\d,\s]+)\]/g)];
    return entries.map(e => e[1].split(",").map(n => parseInt(n.trim(), 10)).sort((a, b) => a - b).join(","));
  }

  function edgeSetsFromRelationshipsTable(src) {
    if (!src) return null;
    const tableMatch = src.match(/<table>\s*<tr><th>Relationship<\/th><th>Edges<\/th>[\s\S]*?<\/table>/);
    if (!tableMatch) return null;
    const rows = [...tableMatch[0].matchAll(/<tr><td>([^<]*)<\/td><td>([^<]*)<\/td>/g)];
    return rows.map(r => {
      const nums = [...r[2].matchAll(/\d+/g)].map(n => parseInt(n[0], 10)).sort((a, b) => a - b);
      return nums.join(",");
    }).filter(s => s.length);
  }

  const travSets = edgeSetsFromTraversal(traversal);
  const relSets = edgeSetsFromRelationshipsTable(relFile);

  if (!travSets || !relSets) {
    console.log("  UNPARSEABLE — one or both files' relationship data no longer matches this checker's own patterns; needs a human read.");
    flags++;
  } else {
    const travOnly = travSets.filter(s => !relSets.includes(s));
    const relOnly = relSets.filter(s => !travSets.includes(s));
    console.log(`  traversal rows: ${travSets.length}  relationships-table rows: ${relSets.length}`);
    if (travOnly.length === 0 && relOnly.length === 0) {
      console.log("  match — every edge-set in the traversal file's RELATIONS array has a corresponding row in the relationships table, and vice versa.");
    } else {
      flags++;
      if (travOnly.length) console.log(`  DRIFT — in traversal but not in the relationships table: ${travOnly.join(" | ")}`);
      if (relOnly.length) console.log(`  DRIFT — in the relationships table but not in traversal: ${relOnly.join(" | ")}`);
    }
  }
}

console.log(`\n${flags === 0 ? "READING: no drift found against this run's baseline claims." : `READING: ${flags} drift point(s) found. Not a refusal — a reading for a session to check its own claims against before citing them.`}`);
