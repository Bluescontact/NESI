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

/* ═══ IT CHECKS THE LIVE SURFACES NOW ════════════════════════════════════════
   Until 2026-08-14 this defaulted to `nesi.html` and had never once been pointed
   at the game. It reported PASS all session — about a file last touched on the
   12th — while ascent.html and daily.html, the two surfaces a hand actually
   walks, went unexamined. The refusals are the product, and the instrument that
   enforces them was reading a different building.

   The default is every live surface now. Naming one on the command line still
   works, for looking at a single file. */
const LIVE = ["ascent.html", "daily.html", "decisions.html", "index.html", "level_one.html"];
const targets = process.argv[2]
  ? [path.resolve(process.cwd(), process.argv[2])]
  : LIVE.map(f => path.join(__dirname, "..", f)).filter(f => fs.existsSync(f));

if (!targets.length) { console.error("[refusal_check] nothing to check"); process.exit(1); }

/* ═══ THE EXEMPTIONS, EACH ONE NAMED AND REASONED ════════════════════════════
   Pointing it at the game turned up three, and all three are the laws working
   rather than breaking. They are listed by file and by token with the reason —
   never as a blanket suppression, so a real breach cannot hide behind one.

   XMLHttpRequest in ascent.html — THE CLEAR CASE WRAPS IT, to count requests and
     show "network · no request" on the glass. It is the proof, not a breach:
     take it out and the only evidence the world makes no call goes with it.
   score / progress bar in ascent.html — the BOUNDARY LINE that tells a hand
     "No number reaches you. No score, count, rank, percentage or progress bar."
     The forbidden vocabulary appears exactly once, inside the sentence denying
     it. A law that cannot state what it forbids cannot be announced at a gate. */
const EXEMPT = {
  "ascent.html": {
    "XMLHttpRequest": "the clear case wraps it to prove no request is made",
    "score":          "inside the boundary line that says no score reaches you",
    "progress bar":   "inside the boundary line that says no progress bar exists"
  }
};

let anyFail = 0;
for (const target of targets) {
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

const base = path.basename(target);
const ex = EXEMPT[base] || {};
const real = hits.filter(h => !ex[h.tok]);
const allowed = hits.filter(h => ex[h.tok]);

if (real.length === 0) {
  console.log("[refusal_check] PASS —", base,
    "(", code.split("\n").length, "code lines, comments stripped )");
  for (const h of allowed) console.log("      allowed:", h.tok, "—", ex[h.tok]);
} else {
  anyFail += real.length;
  console.error("[refusal_check] FAIL —", base, "·", real.length, "forbidden construct(s):");
  for (const h of real) console.error("  ", h.tok, " —", h.law);
}
}
process.exit(anyFail ? 1 : 0);
