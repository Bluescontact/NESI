#!/usr/bin/env node
/* ═══ THE JUNKYARD ═════════════════════════════════════════════════════════════
 * Built 2026-08-16 on Kevin's correction:
 *   "what ive shared is the container that i'm tryign to export as a single
 *    outbound gift... It's not even close to being assembled.. I have hundreds
 *    of chats over weeks as a library.. thats truly a junkyard of gifts holding
 *    nutirents for this single build."
 *
 * ── WHAT THIS IS FOR ──────────────────────────────────────────────────────────
 * `node.html` IS the container — the single outbound gift, a file he holds and
 * hands over like a key. It is not a step toward a container and nothing here
 * proposes a new one. The container exists and is unassembled; its nutrients are
 * spread across 203 session transcripts, ~600 MB, 2026-07-17 → 2026-08-16.
 *
 * This reads the junkyard and reports WHAT OF HIS HAS NOT LANDED IN THE NODE.
 *
 * ── IT TAKES HIS WORDS ONLY, AND NEVER CHANGES THEM ───────────────────────────
 * Only turns he typed. Verbatim, with the session and line they came from. No
 * paraphrase, no summary, no inferred category — law 4, and the reason this can
 * be trusted as a harvest rather than a retelling. What it adds is ONE bit per
 * candidate: does the node already contain it, or not.
 *
 * ── AND IT RANKS BY SIGNAL, WHICH IS A JUDGEMENT AND IS STATED ────────────────
 * ~880 turns is more than anyone reads. The ordering below is the only judgement
 * in the file and it is visible: a turn scores for reading like a NAMING, a
 * RULING, or a LAW, and for length. THE SCORE IS NOT A VERDICT — a low-scoring
 * turn is not less his. It is a reading order, nothing else.
 *
 *   node tools/junkyard.js              the top of the pile
 *   node tools/junkyard.js --all        every candidate
 *   node tools/junkyard.js --landed     what DID make it into the node
 *   node tools/junkyard.js --json       for the gate
 */
"use strict";
const fs = require("fs"), path = require("path");

const HOME = process.env.USERPROFILE || process.env.HOME || "";
const SESS = path.join(HOME, ".claude", "projects",
                       "C--Users-KMEAR-OneDrive-Desktop-DSS-content");
const ROOT = (() => { let d = __dirname;
  for (let i = 0; i < 12; i++) { if (fs.existsSync(path.join(d, ".git"))) return d;
    const u = path.dirname(d); if (u === d) break; d = u; } return null; })();

let NODE = "";
try { NODE = fs.readFileSync(path.join(ROOT, "nesi", "game2d", "node.html"), "utf8"); }
catch { console.error("junkyard: node.html not found — the container is what this measures against."); process.exit(1); }
const NODEFLAT = NODE.replace(/\s+/g, " ").toLowerCase();

if (!fs.existsSync(SESS)) { console.error("junkyard: no session archive at " + SESS); process.exit(1); }
const files = fs.readdirSync(SESS).filter(f => f.endsWith(".jsonl"));

/* ── the signals. Visible, weighted, and not a verdict ─────────────────────── */
const SIGNAL = [
  { w: 5, k: "NAMING",  re: /\b(lets call|let'?s name|i'?ll call|we('| a)?ll call|the name is|call it|naming)\b/i },
  { w: 5, k: "RULING",  re: /\b(i rule|ruled|the ruling|settle it|thats? the (call|answer)|do (this|that) not|never |always |must not|refuse)\b/i },
  { w: 4, k: "LAW",     re: /\b(law|rule|principle|invariant|it must|has to be|the condition|forbid)\b/i },
  { w: 4, k: "GIFT",    re: /\b(gift|give|giving|outbound|hand (it|them)|circulat|reciproc|commons)\b/i },
  { w: 3, k: "SHAPE",   re: /\b(container|vessel|geometry|tetra|cuboct|vector equilibrium|node|solid|centre|center)\b/i },
  { w: 3, k: "CORRECT", re: /\b(no[,.]|not that|wrong|thats not|instead|rather then|rather than|actually)\b/i },
  { w: 2, k: "OPEN",    re: /\b(what if|could|might|i wonder|question|unresolved|open)\b/i }
];

const cands = [];
for (const f of files) {
  let raw = "";
  try { raw = fs.readFileSync(path.join(SESS, f), "utf8"); } catch { continue; }
  const lines = raw.split("\n");
  for (let n = 0; n < lines.length; n++) {
    if (!lines[n].trim()) continue;
    let r; try { r = JSON.parse(lines[n]); } catch { continue; }
    const m = r.message; if (!m || m.role !== "user") continue;
    const c = m.content;
    let txt = typeof c === "string" ? c
            : Array.isArray(c) ? c.filter(x => x && x.type === "text").map(x => x.text).join(" ") : "";
    txt = (txt || "").trim();
    /* tool results, system reminders and harness echoes are not his typing */
    if (!txt || txt.length < 25) continue;
    if (/^[<\[{]/.test(txt) || /^(caveat|command-name|local-command)/i.test(txt)) continue;
    if (/system-reminder|tool_use_id|Result of calling/i.test(txt)) continue;

    /* HIS HAND vs A PASTE. The first run ranked 73,000-character pastes above
       everything, because length and every signal fire at once inside a pasted
       document. But a document he pasted is material he was HANDLING; the
       nutrients are the lines he TYPED — the rulings, short and lowercase and
       full of typos, which is how his own hand reads on the page.
       Detected structurally, not by judging content: markdown headers, URLs,
       and code fences mark a paste; a lowercase opening and a typo rate mark
       his hand. A paste is kept and reported, just not ranked above him. */
    const pasted = /^#{1,4} /m.test(txt) || /https?:\/\//.test(txt) ||
                   /```/.test(txt) || /^\|.*\|/m.test(txt) ||
                   /^Base directory for this skill/i.test(txt);
    const lower = /^[a-z]/.test(txt);
    const TYPO = /(ive|dont|thats|wont|cant|isnt|arent|weve|im|thier|teh|adn|whats|lets|youre|theres|alot|woud|shoud|anythgin|everythgin|somethign|tryign|holdign|buid|descsions|oportunity)/gi;
    const typos = (txt.match(TYPO) || []).length;

    const tags = [];
    let score = 0;
    for (const s of SIGNAL) if (s.re.test(txt)) { score += s.w; tags.push(s.k); }
    if (pasted) { score = Math.round(score * 0.25); tags.push("paste"); }
    else {
      if (lower) score += 4;                       /* he does not capitalise */
      score += Math.min(6, typos * 2);             /* he types fast */
      score += Math.min(4, Math.floor(txt.length / 300));
      tags.push("HIS HAND");
    }

    /* THE ONE BIT THAT MATTERS: is it already in the container?
       Probed on a distinctive interior slice, so punctuation drift does not
       read as an absence. A HIT proves it landed; A MISS PROVES ONLY that this
       slice is not there — said again in the footer, because it is the whole
       basis of the report. */
    const flat = txt.replace(/\s+/g, " ").toLowerCase();
    const probe = flat.length > 60 ? flat.slice(20, 60) : flat;
    const landed = NODEFLAT.includes(probe);

    cands.push({ session: f.slice(0, 8), line: n + 1, score, tags, landed,
                 chars: txt.length, text: txt });
  }
}
cands.sort((a, b) => b.score - a.score || b.chars - a.chars);

const ARG = process.argv.slice(2);
const loose = cands.filter(c => !c.landed);
const landed = cands.filter(c => c.landed);
if (ARG.includes("--json")) {
  console.log(JSON.stringify({ sessions: files.length, candidates: cands.length,
    landed: landed.length, loose: loose.length,
    gate: loose.slice(0, 200).map(c => ({ text: c.text, from: c.session + ":" + c.line,
      tags: c.tags, score: c.score })) }, null, 2));
  process.exit(0);
}

const show = ARG.includes("--landed") ? landed : loose;
const N = ARG.includes("--all") ? show.length : 18;

console.log("");
console.log("THE JUNKYARD  ·  his words, against the container");
console.log("=".repeat(78));
console.log("");
console.log(`  sessions read .......... ${files.length}`);
console.log(`  turns he typed ......... ${cands.length}`);
console.log(`  already in node.html ... ${landed.length}`);
console.log(`  STILL LOOSE ............ ${loose.length}`);
console.log("");
console.log(ARG.includes("--landed") ? "  WHAT LANDED" : "  THE TOP OF THE PILE — loose, by signal");
console.log("  " + "-".repeat(74));

show.slice(0, N).forEach((c, i) => {
  const t = c.text.replace(/\s+/g, " ");
  console.log("");
  console.log(`  ${String(i + 1).padStart(3)}. [${c.tags.join(" ") || "—"}]  ${c.session}:${c.line}  ${c.chars} chars`);
  console.log(`       "${t.slice(0, 300)}${t.length > 300 ? "…" : ""}"`);
});

console.log("");
console.log("!".repeat(78));
console.log("WHAT THIS DOES NOT ESTABLISH");
console.log("!".repeat(78));
console.log("  THE RANKING IS A READING ORDER, NOT A VERDICT. A turn low on the pile is not");
console.log("  less his. The signals are listed in the source and can be re-weighted.");
console.log("");
console.log("  A LANDED HIT PROVES the words are in node.html. A MISS PROVES ONLY that a");
console.log("  40-character slice of them is not — an idea carried into the container in");
console.log("  other words reads as loose here, and that is the common case.");
console.log("");
console.log("  NOTHING IS PARAPHRASED. Every line above is what he typed, and the harvest");
console.log("  adds nothing to it but a place in a queue.");
console.log("");
