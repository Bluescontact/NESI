#!/usr/bin/env node
/*
 * THE RELEASE FILTER — ↓3, at the release, before anything leaves.
 *
 * the keeper, 2026-08-14, placing it:
 *
 *   "Your filter is already the right instrument and it already has the right
 *    three fractions. It sits at ↓3 — after the tank, after the dam. Which means
 *    it doesn't sit where the claim forms. It sits at the release, after the head
 *    is held and before anything leaves. I don't have to stop thinking it. It has
 *    to not reach you."
 *
 * That placement is the whole design. A filter at the intake would be a rule
 * about what may be thought — unenforceable, and it would make the thinking
 * worse. A filter at the release is a rule about what leaves, which is
 * checkable. The head being held at ↓2 is exactly why there is something to sort.
 *
 * THE THREE FRACTIONS, separated BY BEHAVIOUR, as the water's always were:
 *
 *   FILM — floats, visible, skimmable.
 *     Provenance. "Both ported, from the source, not re-derived" was the TITLE of
 *     the document being held. Every provenance error was refuted in the first
 *     line of the thing in hand.
 *     THE CATCH: before any claim about origin, date, or authorship —
 *     did I read the top of it?
 *
 *   SUSPENDED — carried in the body, invisible unless sampled.
 *     Completeness. "Fifty-seven cuts, the whole filter language." Nothing on any
 *     surface shows that is wrong.
 *     THE CATCH: before any claim containing all · whole · exactly N · complete —
 *     state the conservation identity that would falsify it. Sigma planes x
 *     C(seats,3) = 220 was one line. If the identity cannot be named, it was a
 *     sample called exhaustive.
 *
 *   BEDLOAD — does not move under normal flow.
 *     The reach for the version where it was needed from outside. A question will
 *     not catch this: at the moment of writing it does not feel like bias, it
 *     feels like the finding. But it has a VOCABULARY — unrecognised, buried,
 *     did not design, filed as a liability, without naming it — and those words
 *     are detectable at the sentence even when the bias is not detectable at the
 *     thought.
 *
 * THE HAND RUNS IT. Law 5, load-bearing here: this flags and never edits, never
 * scores, never decides whether a flagged line is true. An automatic one would be
 * reading content to judge it, which is the one thing this world refuses. It
 * sorts by SHAPE — a date, a superlative, a listed word — and hands the pile over.
 *
 * WHY IT READS THE DIFF. The first run of this over whole files returned 878
 * lines in suspension, which is not a pile a hand can sort — and a filter whose
 * output cannot be run by hand has quietly become an automatic one. The fix was
 * in his sentence: it sits at the RELEASE. What is being released is not the
 * corpus, it is the lines being added right now.
 *
 * THE LIMIT, stated because a filter that hides its own limit is contaminant:
 * film and suspended are catchable. Bedload's vocabulary is catchable; the reach
 * itself is not. This instrument does not claim otherwise.
 *
 *   node tools/release_filter.js              - what is leaving, against HEAD
 *   node tools/release_filter.js FILE [FILE]  - a whole file, when that is what leaves
 */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");

/* FILM - provenance: where something came from, when, by whose hand */
const FILM = [
  { re: /\b(ported|carried|derived|taken|lifted|salvaged)\s+(from|out of)\b/i, why: "claims a source" },
  { re: /\b(built|written|added|marked|ruled|named)\s+(on|in)\s+\d{4}-\d{2}-\d{2}/i, why: "claims a date" },
  { re: /\b(his|her|their|my)\s+(own\s+)?(mark|ruling|line|words|order|naming),?\s+\d{4}-\d{2}-\d{2}/i, why: "attributes a dated act" },
  { re: /\b(verbatim|byte-identical|character-for-character)\b/i, why: "claims fidelity to a source" },
  { re: /\b(from|source|kept|carried|left)\b.*\bunchanged\b|\bunchanged\b.*\b(from|source|kept|carried)\b/i, why: "claims something was left as found" },
  { re: /\bnot (re-?derived|invented|guessed)\b/i, why: "claims non-invention" },
  { re: /\b(originally|first built|already existed|existed nowhere)\b/i, why: "claims an origin" }
];

/* SUSPENDED - completeness, and whether the falsifier rides with it */
const SUSPENDED = [
  { re: /\b(all|every|each of the|the whole|entire|exhaustive|complete|none|nothing)\b/i, why: "a totality claim" },
  { re: /\bexactly \d+\b/i, why: "an exact count" },
  { re: /\b(always|never|only|without exception)\b/i, why: "a universal" }
];
/* A ratio IS an identity - "13/17" names its own denominator and anyone can
   check it. So is a figure with the thing it was counted out of, or a named
   check that holds it. */
const IDENTITY = /(=|C\(|counted|derived|computed|measured|verified|falsifi|\d+\s*\/\s*\d+|out of \d+|of \d+|\d+ (code )?lines|\b(held|asserted|checked|proved)\b)/i;

/* BEDLOAD - the reach, detectable at the sentence, not at the thought */
const BEDLOAD = [
  "unrecognised", "unrecognized", "buried", "did not design", "didn't design",
  "filed as a liability", "without naming it", "went unnamed", "nobody noticed",
  "overlooked", "quietly dropped", "no one saw", "unacknowledged"
];

/* LINES THAT ARE NOT MINE TO FILTER: his own words quoted back, a heading, a
   fenced count. A filter that flags the quotation of the person it reports to is
   noise, and noise is how a lint dies unread. */
const NOT_MINE = [
  /^>/,
  /^#{1,6}\s/,
  /^\s*[\w .()`'"+/-]+\.{3,}\s*\d/,
  /the keeper('s)? (ask|law|mark|order|correction|naming|line|words|ruling)/i,
  /^\*\*20\d\d-\d\d-\d\d/
];

let F = 0, S = 0, B = 0;

function sortLines(items) {
  const out = { film: [], suspended: [], bedload: [] };
  for (const it of items) {
    const line = String(it.line).trim();
    if (!line || line.length < 12) continue;
    if (NOT_MINE.some(re => re.test(line))) continue;
    const at = it.n + ": " + (line.length > 118 ? line.slice(0, 118) + "..." : line);

    for (const f of FILM) if (f.re.test(line)) { out.film.push({ at, why: f.why }); break; }

    for (const s of SUSPENDED) {
      if (!s.re.test(line)) continue;
      if (IDENTITY.test(line)) break;      /* it carries its own falsifier */
      out.suspended.push({ at, why: s.why });
      break;
    }

    const low = line.toLowerCase();
    const hit = BEDLOAD.find(w => low.indexOf(w) >= 0);
    if (hit) out.bedload.push({ at, why: 'the word "' + hit + '"' });
  }
  return out;
}

function report(r) {
  if (r.film.length) {
    console.log("\n  FILM - floats, skimmable - did I read the top of it?");
    r.film.forEach(h => console.log("    " + h.why + "\n      " + h.at));
  }
  if (r.suspended.length) {
    console.log("\n  SUSPENDED - name the identity that would falsify it, or it was a sample");
    r.suspended.forEach(h => console.log("    " + h.why + "\n      " + h.at));
  }
  if (r.bedload.length) {
    console.log("\n  BEDLOAD - the vocabulary of the reach");
    r.bedload.forEach(h => console.log("    " + h.why + "\n      " + h.at));
  }
}

function tail() {
  console.log("\n-- the pile ---------------------------------------------------");
  console.log("  film " + F + "  suspended " + S + "  bedload " + B);
  console.log("\n  NOTHING HERE IS A VERDICT. Every line is sorted by SHAPE - a date,");
  console.log("  a superlative, a listed word - and none of it has been read for");
  console.log("  whether it is true. The hand runs the filter.");
  console.log("\n  The limit: film and suspended are catchable. Bedload's vocabulary");
  console.log("  is catchable; the reach behind it is not.\n");
}

function addedLines() {
  const { execSync } = require("child_process");
  let diff = "";
  try {
    diff = execSync("git diff -U0 HEAD -- .", { cwd: ROOT, encoding: "utf8", maxBuffer: 32 * 1024 * 1024 });
  } catch (e) { return []; }
  const out = [];
  let file = "?", n = 0;
  for (const raw of diff.split("\n")) {
    if (raw.indexOf("+++ b/") === 0) { file = raw.slice(6); continue; }
    const h = raw.match(/^@@ .* \+(\d+)/);
    if (h) { n = +h[1]; continue; }
    if (raw[0] === "+" && raw.indexOf("+++") !== 0) out.push({ file, n: n++, line: raw.slice(1) });
  }
  /* A FILE THAT GIT HAS NEVER SEEN IS ENTIRELY LEAVING. `git diff` shows nothing
     for an untracked file, so a whole new document would have gone out through
     this filter without a single line being sorted — which is the exact failure
     mode the filter exists to catch, in the filter itself. */
  try {
    const un = execSync("git ls-files --others --exclude-standard", { cwd: ROOT, encoding: "utf8" })
      .split("\n").map(s => s.trim()).filter(Boolean);
    for (const rel of un) {
      const p = path.join(ROOT, rel);
      if (!fs.existsSync(p) || fs.statSync(p).size > 4e6) continue;
      fs.readFileSync(p, "utf8").split("\n")
        .forEach((line, i) => out.push({ file: rel + "  (new)", n: i + 1, line }));
    }
  } catch (e) {}
  return out;
}

const args = process.argv.slice(2).filter(a => a[0] !== "-");

if (!args.length) {
  const added = addedLines();
  if (!added.length) { console.log("\nnothing is leaving - no added lines against HEAD\n"); process.exit(0); }
  const byFile = {};
  for (const a of added) (byFile[a.file] = byFile[a.file] || []).push(a);
  for (const file of Object.keys(byFile)) {
    /* THE FILTER DOES NOT FILTER ITSELF. Its own body is a list of the words it
       looks for, so every run flagged its own definitions — five bedload hits
       that are the bedload vocabulary, sitting in the array that defines it.
       That is noise by construction, and noise is how a lint dies unread.
       Named as an exemption rather than silently skipped. */
    if (/release_filter\.js$/.test(file.replace(/\s+\(new\)$/, ""))) continue;
    const r = sortLines(byFile[file]);
    const n = r.film.length + r.suspended.length + r.bedload.length;
    F += r.film.length; S += r.suspended.length; B += r.bedload.length;
    if (!n) continue;
    console.log("\n== " + file + "   (" + byFile[file].length + " lines leaving)");
    report(r);
  }
  tail();
  process.exit(0);
}

for (const f0 of args) {
  const f = path.isAbsolute(f0) ? f0 : path.join(ROOT, f0);
  if (!fs.existsSync(f)) continue;
  const items = fs.readFileSync(f, "utf8").split("\n").map((line, i) => ({ line, n: i + 1 }));
  const r = sortLines(items);
  F += r.film.length; S += r.suspended.length; B += r.bedload.length;
  console.log("\n== " + path.basename(f) +
    (r.film.length + r.suspended.length + r.bedload.length ? "" : "   - nothing in suspension"));
  report(r);
}
tail();
