#!/usr/bin/env node
/*
 * THE RECORDLESS VERB's test pattern — ported from
 * nesi/world3d/scripts/loose_stones.gd's guard + scripts/test_l5.gd (2026-08-11).
 *
 * Not a design fork, a verification instrument: a build-time test that reads
 * nesi.html's OWN SOURCE and fails if any logging/counting/scoring/telemetry
 * construct appears anywhere in it. The refusals (PROTOCOLS.md's twelve laws,
 * nesi/world3d/CLAUDE.md's six refusals) enforced by a test, not by care —
 * "the closest thing in the corpus to mechanized enforcement of 'the refusals
 * are the product.'" (counsel/gamecraft/SHAPE_nutrients_and_gifts.md, card 10.)
 *
 * WHAT THIS CHECKS, and nothing else:
 *   - no network/telemetry primitive anywhere (fetch, XHR, WebSocket, beacon,
 *     analytics, gtag) — law 3 (no model call) and law 11 (nothing reaches
 *     outward) together
 *   - no scoring/ranking/gamification vocabulary (score, XP, streak, rank,
 *     leaderboard, achievement, percent, progress bar) — law 2, no number
 *     reaches the player
 *   - no reward-cue/acknowledgement audio or toast construct — law 6, set-it-
 *     down has no confirmation; the sound field (when ported) must never fire
 *     on "you just did X"
 *
 * WHAT THIS DOES NOT CHECK (named so nobody mistakes silence for a pass):
 *   - it cannot verify a NUMBER never reaches the player through a rendered
 *     digit that isn't spelled with one of these tokens (e.g. a raw counter
 *     assigned straight into .textContent under a variable name this list
 *     doesn't know to look for) — that is a human read, same as the corpus's
 *     own Definition of Done requires ("run it, don't eyeball it" for the
 *     rest; this script is one instrument, not the whole verification bar)
 *   - it does not run the page; it only reads its text
 *
 * Comments are stripped before the check runs, the same reasoning test_l5.gd's
 * guard uses: the comments in a file whose whole SUBJECT is these refusals
 * necessarily NAME the very words being forbidden (see this file's own header).
 * Checking the comments would make the guard fail on itself.
 *
 * Usage:  node tools/refusal_check.js [path-to-html, default ../nesi.html]
 * Exits 0 and prints "PASS" if clean; exits 1 and lists every hit if not.
 */
"use strict";
const fs = require("fs");
const path = require("path");

const target = process.argv[2]
  ? path.resolve(process.cwd(), process.argv[2])
  : path.join(__dirname, "..", "nesi.html");

if (!fs.existsSync(target)) {
  console.error("[refusal_check] no file at", target);
  process.exit(1);
}

const raw = fs.readFileSync(target, "utf8");

// Strip HTML comments, then JS /* */ and // comments inside the <script> block.
// Line-oriented, mirroring test_l5.gd's "strip comment lines" approach rather
// than a full tokenizer — good enough for a guard that is checking for the
// ABSENCE of specific words, not parsing the language.
function stripComments(src) {
  let s = src.replace(/<!--[\s\S]*?-->/g, "");
  s = s.replace(/\/\*[\s\S]*?\*\//g, "");
  // strip // line comments, but naively — skip lines that are clearly inside
  // a string containing "//" (URLs) by only stripping when // is preceded by
  // whitespace or start-of-line, which is how this file's own comments read.
  s = s
    .split("\n")
    .map((line) => {
      const idx = line.search(/(^|\s)\/\//);
      if (idx === -1) return line;
      // don't eat "https://" — require the char before // not be ':'
      const m = line.match(/(^|\s)\/\//);
      const at = line.indexOf(m[0]) + m[0].indexOf("//");
      if (line[at - 1] === ":") return line;
      return line.slice(0, at);
    })
    .join("\n");
  return s;
}

const code = stripComments(raw);

// --- THE FORBIDDEN TOKENS, grouped by which law each protects -------------
const groups = {
  "law 3/11 — no model call, nothing reaches outward": [
    "fetch(",
    "XMLHttpRequest",
    "WebSocket",
    "sendBeacon",
    "navigator.sendBeacon",
    "analytics",
    "gtag(",
    "google-analytics",
    "mixpanel",
    "segment.io",
    "amplitude",
  ],
  "law 2 — no number reaches the player": [
    "score",
    "leaderboard",
    "achievement",
    "streak",
    " xp ",
    " xp<",
    "levelup",
    "level up",
    "progressbar",
    "progress bar",
    "completion percent",
    "percentComplete",
  ],
  "law 6 — set-it-down has no confirmation; no reward cue": [
    "playSound(\"success",
    "playSound('success",
    "confirm(",
    "alert(",
    "new Notification(",
    "toast(",
    ".showToast",
  ],
};

const hits = [];
for (const [law, tokens] of Object.entries(groups)) {
  for (const tok of tokens) {
    // case-insensitive scan; " xp " padding avoids matching "export"/"expand"
    const re = new RegExp(
      tok.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      "i"
    );
    if (re.test(code)) hits.push({ law, tok });
  }
}

if (hits.length === 0) {
  console.log("[refusal_check] PASS —", path.relative(process.cwd(), target),
    "(", code.split("\n").length, "code lines checked, comments stripped )");
  process.exit(0);
} else {
  console.error("[refusal_check] FAIL —", hits.length, "forbidden construct(s) found:");
  for (const h of hits) console.error("  ", h.tok, " —", h.law);
  process.exit(1);
}
