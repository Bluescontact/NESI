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
/* THIS LIST WENT STALE AND A BREACH RODE THROUGH IT, 2026-08-16.
   `day_one.html` was built on 2026-08-16 and never added here. On the same day
   its root card was given the line "circuits 2 and 3" — raw circuit INDICES on
   a player-facing surface, which solid.js's own header forbids in as many
   words: "NO NUMBER IN HERE REACHES THE PLAYER." check_all printed all twelve
   holding while that was on screen, because no instrument was pointed at the
   file. The breach was found by an ad-hoc digit count typed by hand, not by
   anything in this repo.
   THE LIST IS THE WEAK PART, NOT THE RULES. It is hand-maintained, so it
   shrinks relative to the build every time a surface is added and nobody
   remembers this line. check_all is presence-asserting for INSTRUMENTS and
   nothing is presence-asserting for SURFACES. That gap is named here and not
   quietly patched: closing it means deciding what counts as a player surface,
   and that is Kevin's ruling, not a build session's.
   NOT ADDED, AND WHY: options.html fails this check on the single token
   "score", which occurs there only in Kevin's own reasoning ABOUT law 2 on a
   bench page — the same shape as the exemptions below. Loosening a refusal
   check is his word, not mine, so it stands outside the list and is named
   rather than exempted. */
/* tank.html added 2026-08-19: it supersedes daily.html (2026-08-18) and is
   index.html's actual TANK destination as of this fix, but was reading
   nothing here for a day — the same hand-maintained-list gap this file's
   own header already names above. */
/* day_one.html, descent.html, traversal.html DROPPED 2026-08-26, Kevin's
   ruling (asked directly, per this file's own header: "closing it means
   deciding what counts as a player surface, and that is Kevin's ruling,
   not a build session's"). index.html was reclaimed the same day as
   the_page.html's own entry — no twelve-seat door, no route from the
   front door to these three anymore. His words, put to him as "the front
   door defines live now": "No, drop all three." Not orphaned files —
   still linked from tank.html and daily.html, both still watched — just
   no longer the walked build this list exists to cover. */
const LIVE = ["ascent.html", "daily.html", "decisions.html",
              "index.html", "level_one.html", "tank.html"];
const targets = process.argv[2]
  ? [path.resolve(process.cwd(), process.argv[2])]
  : LIVE.map(f => path.join(__dirname, "..", f)).filter(f => fs.existsSync(f));

if (!targets.length) { console.error("[refusal_check] nothing to check"); process.exit(1); }

/* ═══ THE EXEMPTIONS, EACH ONE NAMED AND REASONED ════════════════════════════
   Pointing it at the game turned up three, all in the retired ascent.html
   (the CASE glass overlay, and the boundary line that named "score"/
   "progress bar" only to forbid them). ■ REMOVED, 2026-08-21, same pass
   ascent.html was rebuilt from scratch — the rebuild contains none of these
   three tokens at all (confirmed: 0 occurrences), so the exemptions have
   nothing left to exempt. Never as a blanket suppression, so a real breach
   cannot hide behind one — this file now trusts the wildcard presence check
   below for ascent.html, same as every other page. */
const EXEMPT = {};

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
  /* ═══ ADDED 2026-08-17 ON KEVIN'S F4 MARK ════════════════════════════════
     His mark: "yes, and refusal_check is amended by this mark." Checked before
     amending: this file enforced laws 3/11, 2 and 6 and NOTHING ELSE. It never
     forbade inference, classification or categories — so the F4 collision as
     written ("YES costs an exemption in refusal_check") was false, in BOTH
     directions. `inferred` as an origin never tripped this check, and laws 4
     and 5 — the ones that actually bind inference — were enforced by nothing
     anywhere in the build. Unenforced prose.

     So the amendment his mark authorises is not an exemption. It is the
     opposite: laws 4 and 5 become enforced for the first time, which is what
     makes the yes SAFE rather than unbounded.

     WHAT IS FORBIDDEN IS THE ACT, NEVER THE LABEL. Storing, printing or
     carrying an origin whose value is `inferred` is lawful — that is his mark.
     A machine DECIDING which category a thing is remains forbidden: law 4, no
     inferred categories on the player path; law 5, the hand runs the filter,
     no automatic sorting, no computed pass, no classifier deciding what a
     fraction is. The token `inferred` is deliberately absent below. */
  "law 4/5 — the hand runs the filter; no machine decides a category": [
    "classify(",
    "autoClassify",
    "autoSort",
    "inferCategory",
    "detectFraction",
    "guessFraction",
    "categorize(",
    ".predict(",
  ],
};

const hits = [];
/* ═══ EVERY REFUSAL IS BOUND TO THE PRESENCE THAT SATISFIES IT ═══════════════
   A prohibition on its own is satisfied by a world that does less: this check
   passed a blank page, proven by running it on one. game-craft named the rule on
   2026-08-13 — "invert every check to presence-asserting, never
   absence-passing. A blank screen passes every refusal."

   So each law now carries the YES it protects. A surface that carries the law's
   subject must carry its presence, and a surface carrying neither is not
   compliant — it is empty, and says so.

   The presences are the things the laws exist for:
     the refusals hold when a hand can act at all
     "no model call" holds when the machine SHOWS it makes none
     "no number reaches you" holds when the boundary saying so is announced
     "set-it-down has no feedback" holds when the third output is there to take */
const PRESENCE = {
  "*": [
    { needs: /addEventListener\(|onCommit|reach\(|holding\(|draw\(|wait\(|location\.replace|opt\.addEventListener/,
      is: "a hand can act on this surface at all — a page with no act refuses nothing" }
  ],
  /* ascent.html's own three PRESENCE entries — REMOVED, 2026-08-21, same
     pass ascent.html was rebuilt from scratch. All three checked for
     ROOMS-era content (the CASE glass overlay, the CONSTRAINTS registry,
     THE STATIONS' three-output send) that the rebuild dropped on purpose.
     ascent.html now falls through to the wildcard "*" entry above, the
     same as every other page — "a hand can act on this surface at all,"
     which the rebuild's write/sort/aim/sill controls satisfy plainly. */
  "daily.html": [
    { needs: /localStorage\.setItem\(KEY\s*\+\s*"\.pad"/,
      is: "pad, read back, commit — quitting loses nothing, which is the law it protects" },
    { needs: /function bandCut/,
      is: "his sentences bank as he writes them, which is what the world is refusing to spoil" }
  ]
};

const need = (PRESENCE["*"] || []).concat(PRESENCE[path.basename(target)] || []);
const missing = need.filter(n => !n.needs.test(code));

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

/* ═══ THE CORE LOOP, DEFINED IN A WAY THAT HOLDS ═════════════════════════════
   Kevin's F9 mark, 2026-08-17: "the last twelve are outside the core loop by
   definition." The fork's own cost line warned what that needs — *"reading two
   needs 'core loop' defined in a way that holds, or the exemption widens on its
   own later."* This is that definition, and it is built so it cannot widen
   quietly.

   A SURFACE IS INSIDE THE CORE LOOP UNLESS IT SAYS OTHERWISE, IN CODE. The
   declaration must be a real const — comments are stripped before this runs, so
   a claim in prose cannot buy an exemption — and it must carry a reason string.
   Nothing is inferred from a filename, a level number or a directory.

   Deliberately NOT keyed to "the last twelve": under his F10 mark the count
   moved from 36 to 30, so which twelve are last is no longer settled, and a
   check that guessed would be asserting his ruling for him.

   The lift is narrow: laws 4/5 and the model-call half of law 3/11. Law 2 (no
   number), law 6 (no reward cue) and the outward-reach half are NEVER lifted —
   a surface outside the core loop is still forbidden to score the player or
   phone home. And every declaration PRINTS, so the widening is always counted. */
const declared = code.match(
  /CORE_LOOP\s*=\s*false\s*[,;]?\s*[\/*]*\s*(?:REASON|reason)\s*[:=]\s*["'`]([^"'`]+)["'`]/
);
const outside = !!declared;
const LIFTABLE = /law 4\/5|no model call/;
const MODEL_ONLY = new Set([
  "fetch(", "XMLHttpRequest", "WebSocket", "sendBeacon", "navigator.sendBeacon",
]);
const lifted = outside
  ? hits.filter(h => LIFTABLE.test(h.law) &&
      (h.law.indexOf("law 4/5") === 0 || MODEL_ONLY.has(h.tok)))
  : [];
const isLifted = h => lifted.indexOf(h) >= 0;

const real = hits.filter(h => !ex[h.tok] && !isLifted(h));
const allowed = hits.filter(h => ex[h.tok]);

if (missing.length) {
  anyFail += missing.length;
  console.error("[refusal_check] FAIL —", base, "·", missing.length, "refusal(s) bound to nothing:");
  for (const m of missing) console.error("   missing:", m.is);
} else if (real.length === 0) {
  console.log("[refusal_check] PASS —", base,
    "(", code.split("\n").length, "code lines · " + need.length + " presence(s) bound )");
  for (const n of need) console.log("      bound to:", n.is);
  for (const h of allowed) console.log("      allowed:", h.tok, "—", ex[h.tok]);
  /* the widening is never silent — F9's boundary announces itself or it is not
     doing its job. Laws 2 and 6 are named as still binding on purpose. */
  if (outside) {
    console.log("      ■ DECLARED OUTSIDE THE CORE LOOP —", declared[1]);
    console.log("        law 4/5 and the model call lifted here on Kevin's F9 mark;",
                "laws 2, 6 and no-outward-reach still bind.");
    for (const h of lifted) console.log("        lifted:", h.tok, "—", h.law);
  }
} else {
  anyFail += real.length;
  console.error("[refusal_check] FAIL —", base, "·", real.length, "forbidden construct(s):");
  for (const h of real) console.error("  ", h.tok, " —", h.law);
}
}
process.exit(anyFail ? 1 : 0);
