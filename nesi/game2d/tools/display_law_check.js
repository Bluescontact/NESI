#!/usr/bin/env node
/*
 * DISPLAY LAW CHECK — one law, stated in several places, and they must agree.
 *
 * THE DISPLAY LAW is the clause that stops law 1 being defeated through the side
 * door: the machine may never read the words to decide how the words appear. It
 * has never lived in code. It lives in prose, in more than one file, and until
 * this instrument nothing asserted that the copies said the same thing.
 *
 * THEY ALREADY DID NOT. Amending it on 2026-08-17 turned up a copy reading
 * "derives from one of exactly three sources" against the source's "must derive
 * from one of exactly three sources" — a drift of one word, in a law, sitting
 * there unnoticed. One word today is a different law in six months.
 *
 * ── WHY IT DISCOVERS RATHER THAN LISTS ───────────────────────────────────────
 *
 * refusal_check carries a hand-maintained list of live surfaces and says so in
 * its own header: "THE LIST IS THE WEAK PART, NOT THE RULES. It is
 * hand-maintained, so it shrinks relative to the build every time a surface is
 * added and nobody remembers this line." A breach rode through that gap on
 * 2026-08-16.
 *
 * So this does not hold a list. It SEARCHES the tree for the law's opening line
 * and checks every statement it finds. A new copy is checked the moment it
 * exists; a copy that drifts is caught without anyone registering it. The list
 * cannot go stale because there is no list.
 *
 * ── WHAT IT ASSERTS ──────────────────────────────────────────────────────────
 *
 *   D1  at least two statements exist        (presence — a run that checks
 *                                             nothing must not print green)
 *   D2  every statement names the same COUNT of sources
 *   D3  every statement names the same SOURCES, in the same order
 *   D4  every statement carries the closing refusal, one higher than the count
 *   D5  the fourth source carries its lint wherever it appears — a widening is
 *       where a law gets defeated, so the clause that bounds it travels with it
 *
 *   node tools/display_law_check.js
 */
"use strict";
const fs = require("fs");
const path = require("path");
/* SCOPED TO THE NESI TREE, AND BOUNDED — repaired 2026-08-17, same day it was
   written, after it hung the suite for 25s+ and had to be killed.
   THE FAULT WAS MINE AND IT WAS THE COST OF THE GOOD PROPERTY. Discovering
   statements instead of listing them means walking a tree, and I pointed it at
   the whole DSS corpus — which is OneDrive-backed, so a cold read fetches from
   the cloud one file at a time. It passed three times on a warm cache and then
   stopped finishing. `find` over the same root does not finish either.
   The repair keeps the property and pays for it honestly: the walk is scoped to
   `nesi/`, which is where a statement of a NESI law lives, and it is capped. The
   scope is PRINTED at D1 rather than assumed, so a statement placed outside it
   is a visible gap and not a silent one. A cap that is hit is reported as a
   refusal, never as a pass — an instrument that ran out of budget checked less
   than it claims to. */
const ROOT = path.join(__dirname, "..", "..");        /* nesi/ */
const BUDGET = 4000;                                   /* files opened, hard cap */
let opened = 0, capped = false;

const OPENING = "The machine may never read the words to decide how the words appear.";
const SKIP = new Set([".git", "node_modules", "__pycache__", "worktrees", ".night", "coldwalk", "retired"]);
const EXT = new Set([".md", ".html", ".js", ".txt"]);

/* ── find every statement ─────────────────────────────────────────────────── */
const found = [];
(function walk(dir) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch (e) { return; }
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (!SKIP.has(e.name) && !e.name.startsWith(".")) walk(p); continue; }
    if (!EXT.has(path.extname(e.name))) continue;
    /* the instrument names the law in order to find it, and is not a statement
       of it. Excluded by path rather than by a cleverer regex, because a regex
       that tries to tell a quotation from a statement is the kind of thing that
       silently stops finding real ones. */
    if (path.resolve(p) === path.resolve(__filename)) continue;
    if (opened >= BUDGET) { capped = true; return; }
    let t;
    try { t = fs.readFileSync(p, "utf8"); opened++; } catch (err) { continue; }
    if (!t.includes(OPENING)) continue;
    /* the statement is the opening line through the closing refusal */
    const i = t.indexOf(OPENING);
    const m = t.slice(i).match(/Never from a (\w+): what the writing says\./);
    found.push({
      file: path.relative(path.join(ROOT, ".."), p).replace(/\\/g, "/"),
      body: m ? t.slice(i, i + t.slice(i).indexOf(m[0]) + m[0].length) : t.slice(i, i + 900),
      closing: m ? m[1] : null,
      whole: t
    });
  }
})(ROOT);

const results = [];
const ok = (n, pass, note) => results.push({ n, pass: !!pass, note: note == null ? "" : String(note) });

/* ── D1 · presence ────────────────────────────────────────────────────────── */
ok("D1 the law is stated in at least two places", found.length >= 2 && !capped,
   (capped ? "REFUSED — the " + BUDGET + "-file cap was hit, so the walk is incomplete. "
           : "") +
   found.length + " found in " + path.basename(ROOT) + "/ · " + opened + " files opened of " +
   BUDGET + " · " + found.map(f => f.file).join(", "));

if (found.length) {
  /* ── parse each statement's sources ─────────────────────────────────────── */
  /* the COUNT is written as a cardinal ("exactly four sources") and the CLOSING
     REFUSAL as an ordinal ("never from a fifth"). One table for each: the first
     version of this looked the cardinal up in the ordinal table, got undefined
     for every file, and reported a drift that was its own. */
  const CARD = { two: 2, three: 3, four: 4, five: 5, six: 6 };
  const ORD  = { second: 2, third: 3, fourth: 4, fifth: 5, sixth: 6 };
  for (const f of found) {
    const cm = f.body.match(/exactly (\w+) sources:/);
    f.count = cm ? (CARD[cm[1]] || null) : null;
    f.sources = [...f.body.matchAll(/^\s*(\d)\.\s+([A-Z][A-Z ]+[A-Z])/gm)].map(m => m[2].trim());
  }

  /* ── D2 · same count ────────────────────────────────────────────────────── */
  const counts = [...new Set(found.map(f => f.count))];
  ok("D2 every statement names the same number of sources", counts.length === 1 && counts[0] != null,
     found.map(f => f.file.split("/").pop() + ":" + f.count).join(" · "));

  /* ── D3 · same sources, same order ──────────────────────────────────────── */
  const sigs = [...new Set(found.map(f => f.sources.join(" | ")))];
  ok("D3 every statement names the same sources, in the same order", sigs.length === 1,
     sigs.length === 1 ? found[0].sources.join(" · ")
                       : "DRIFT:\n        " + found.map(f => f.file + "\n          " + f.sources.join(" | ")).join("\n        "));

  /* ── D4 · the closing refusal is one higher than the count ──────────────── */
  const bad = found.filter(f => !f.closing || ORD[f.closing] !== (f.count || 0) + 1);
  ok("D4 the closing refusal is one higher than the source count", bad.length === 0,
     bad.length ? bad.map(f => f.file + " closes on '" + f.closing + "' against " + f.count + " sources").join("; ")
                : found.map(f => f.count + "→" + f.closing).join(" · "));

  /* ── D5 · the fourth source travels with its lint ───────────────────────── */
  if ((counts[0] || 0) >= 4) {
    /* NORMALISED, because the thing being searched is PROSE and prose wraps.
       The first version looked for the literal string and reported two files
       missing a clause both of them carried — the clause simply broke across a
       line inside a blockquote. Same fault, twice in one evening: a support
       written against a file's meaning rather than against its bytes. Collapse
       whitespace and the blockquote markers, then compare. */
    const flat = s => s.replace(/^[>\s]+/gm, " ").replace(/\s+/g, " ");
    const LINT = "the fifth source wearing the fourth's coat";
    const naked = found.filter(f => !flat(f.whole).includes(LINT));
    ok("D5 the fourth source carries its bounding lint wherever it is stated",
       naked.length === 0,
       naked.length ? naked.map(f => f.file).join(", ") + " state four sources without the clause that bounds the fourth"
                    : "all " + found.length + " carry it");
  }
}

/* ── report ──────────────────────────────────────────────────────────────── */
console.log("\nDISPLAY LAW — the copies must agree\n");
for (const r of results)
  console.log("  " + (r.pass ? "ok  " : "FAIL") + "  " + r.n + (r.note ? "\n          " + r.note : ""));

const failed = results.filter(r => !r.pass);
console.log("\n[display_law_check] " + (results.length - failed.length) + " of " + results.length + " hold");
process.exit(failed.length ? 1 : 0);
