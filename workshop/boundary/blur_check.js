#!/usr/bin/env node
/*
 * BLUR CHECK — checks a draft against boundary/NO_BLUR.md, rules 1, 2, 4.
 *
 * the keeper, 2026-08-20: the trimtab boundary is "a locating, coordination, and
 * calibration tool to be able to identify and place structural load-bearing
 * writing as an input, weaving other authors' work together into a
 * compounded gift without blur. My gift and words, and their gifts and
 * words, are always held separately." This is the calibration half of that
 * for the compounded piece's OWN formatting — not whether a passage
 * deserves to be there, only whether, once it's there, it stays legibly
 * someone's and not a blend.
 *
 * SORTS BY SHAPE, exactly as this corpus's release_filter.js already does:
 * a markdown blockquote, an attribution line, a ledger heading. It never
 * reads a passage for whether the attribution is TRUE, only for whether one
 * is PRESENT and adjacent. Truth is the hand's to judge; shape is checkable.
 *
 * RULE 3 (your words never finish their sentence) and RULE 5 (your own
 * prior writing gets the same treatment) are NOT checked here — no script
 * can tell whether a sentence quietly completes someone else's thought.
 * Those stay a human read, named as a limit rather than silently skipped.
 *
 *   node boundary/blur_check.js DRAFT.md
 */
const fs = require("fs");
const path = require("path");

const QUOTE = /^\s*>\s?/;
const BLANK = /^\s*$/;
/* the em-dash citation convention this corpus already uses throughout
   LEARNED.md and its own sourced lines ("— the keeper, MARKS 1020, 2026-08-13"),
   plus a plain double-hyphen fallback for drafts written before a dash key
   is reached for. */
const ATTRIBUTION = /^\s*(—|--)\s*\S/;
const DASH_PREFIX = /^\s*(—|--)\s*/;
const LEDGER_HEADING = /^#{1,6}\s*(sources?|boundary ledger|attribution)\b/i;
const HEADING = /^(#{1,6})\s/;

function quoteBlocks(lines) {
  const blocks = [];
  let start = -1;
  for (let i = 0; i <= lines.length; i++) {
    const isQuote = i < lines.length && QUOTE.test(lines[i]);
    if (isQuote && start < 0) start = i;
    if (!isQuote && start >= 0) { blocks.push({ start, end: i - 1 }); start = -1; }
  }
  return blocks;
}

function ledgerText(lines) {
  let start = -1, level = 0;
  for (let i = 0; i < lines.length; i++) {
    const h = lines[i].match(LEDGER_HEADING);
    if (h) { start = i + 1; level = h[0].match(HEADING)[1].length; break; }
  }
  if (start < 0) return null;
  let end = lines.length;
  for (let i = start; i < lines.length; i++) {
    const h = lines[i].match(HEADING);
    if (h && h[1].length <= level) { end = i; break; }
  }
  return lines.slice(start, end).join("\n");
}

function nearestNonBlank(lines, from, dir) {
  let i = from;
  while (i >= 0 && i < lines.length && BLANK.test(lines[i])) i += dir;
  return (i >= 0 && i < lines.length) ? i : -1;
}

function attributionNear(lines, block) {
  const before = nearestNonBlank(lines, block.start - 1, -1);
  if (before >= 0 && ATTRIBUTION.test(lines[before])) return { line: before, text: lines[before] };
  const after = nearestNonBlank(lines, block.end + 1, 1);
  if (after >= 0 && ATTRIBUTION.test(lines[after])) return { line: after, text: lines[after] };
  return null;
}

function attributedName(line) {
  const stripped = line.replace(DASH_PREFIX, "").trim();
  return stripped.split(",")[0].trim();
}

function touchesProse(lines, block) {
  const before = block.start - 1, after = block.end + 1;
  const beforeTouches = before >= 0 && !BLANK.test(lines[before]) && !QUOTE.test(lines[before]) && !ATTRIBUTION.test(lines[before]);
  const afterTouches = after < lines.length && !BLANK.test(lines[after]) && !QUOTE.test(lines[after]) && !ATTRIBUTION.test(lines[after]);
  return beforeTouches || afterTouches;
}

function check(file) {
  const lines = fs.readFileSync(file, "utf8").split("\n");
  const blocks = quoteBlocks(lines);
  const ledger = ledgerText(lines);
  const findings = [];

  if (!blocks.length) {
    console.log("\nno quoted blocks found — nothing to check against " + path.basename(file));
    return;
  }

  for (const b of blocks) {
    const at = "lines " + (b.start + 1) + "-" + (b.end + 1);
    const attr = attributionNear(lines, b);
    if (!attr) {
      findings.push({ at, why: "NO ATTRIBUTION — no " + '"—"' + "-marked line touches this block" });
    } else {
      const name = attributedName(attr.text);
      if (ledger === null) {
        findings.push({ at, why: "NO LEDGER SECTION — attributed to " + name + " but no ## Sources / ## Boundary Ledger heading exists" });
      } else if (!ledger.toLowerCase().includes(name.toLowerCase())) {
        findings.push({ at, why: "NOT IN LEDGER — attributed to " + name + " (line " + (attr.line + 1) + ") but " + name + " does not appear in the ledger section" });
      }
    }
    if (touchesProse(lines, b)) {
      findings.push({ at, why: "NO BLANK LINE — this block touches surrounding prose with no separating blank line" });
    }
  }

  console.log("\n== " + path.basename(file) + "   (" + blocks.length + " quoted block(s))");
  if (!findings.length) {
    console.log("  clean — every block attributed, adjacent, and in the ledger");
  } else {
    findings.forEach(f => console.log("  " + f.why + "\n    " + f.at));
  }
  console.log("\n  NOTHING HERE IS A VERDICT ON THE WRITING. This checks FORM only —");
  console.log("  whether attribution is present and adjacent, never whether a passage");
  console.log("  belongs, and never whether a sentence quietly finishes someone else's");
  console.log("  thought. Rules 3 and 5 in boundary/NO_BLUR.md stay a human read.\n");
}

const args = process.argv.slice(2);
if (!args.length) {
  console.log("\nusage: node boundary/blur_check.js DRAFT.md [DRAFT2.md ...]\n");
  process.exit(0);
}
for (const a of args) {
  const f = path.isAbsolute(a) ? a : path.join(process.cwd(), a);
  if (!fs.existsSync(f)) { console.log("\nnot found: " + a); continue; }
  check(f);
}
