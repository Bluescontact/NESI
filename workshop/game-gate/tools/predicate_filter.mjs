#!/usr/bin/env node
/*
 * predicate_filter.mjs — REBUILT 2026-08-16 on the keeper's ruling ("The predicate
 * filter need to be rebuilt").
 *
 * THE INSTRUMENT WAS MISSING. `nesiseed` is not in this corpus and neither was
 * this file, while COVERAGE.md quoted its numbers ("3 of 59", "5 of 59") as the
 * authority on what the build reaches, and THE_BUILD_SHAPE.md:93 asserted
 * "It has now been run against this build." A measurement with no instrument.
 * This rebuild exists so those numbers have a source that can be re-run and
 * disagreed with.
 *
 * THE CONTRACT, from nesiseed's own DECISIONS.md CLOSED-2: "routed" had been ONE
 * PREDICATE DOING THREE JOBS. They stay separate here and are never merged:
 *
 *   EXISTS     the file is on disk
 *   MENTIONED  some .html/.js names it — split live-code vs comment-only
 *   REACHABLE  an unbroken navigation path from the door, live edges only
 *
 * "Named in live code is not reachable by a player — the check suite can open it
 * and the hand cannot." (THE_BUILD_SHAPE.md:110)
 *
 * THE STANDING LAW THIS OBEYS (route_map SKILL.md): the unreached number "falls
 * when the keeper routes. It must never fall because the harness got cleverer."
 * So every rule this filter follows is PRINTED with the count. A number that
 * moves because the rules moved is visible as such, or the instrument is lying.
 *
 * A KNOWN DEFECT IN A SIBLING, NOT REPRODUCED HERE: route_map.js follows only
 * href/src/location.replace/require and NOT `location.href = "..."`, so it
 * reports ascent.html unreachable while daily.html:987 reaches it. Every
 * navigation form is followed here and the full list is printed.
 *
 * THE OLD FILTER'S OWN NAMED LIMIT, FIXED: "three DEAD LINKS are regex literals
 * inside daily_walk.js, refusal_check.js and scope_check.js being parsed as
 * filenames. False positives." Regex literals are masked out before scanning.
 *
 * Reads only. Writes nothing. Decides nothing.
 *
 *   node tools/predicate_filter.mjs
 *   node tools/predicate_filter.mjs --root <dir> --door index.html
 *   node tools/predicate_filter.mjs --why <file>      why is this unreached
 *   node tools/predicate_filter.mjs --json
 *
 * @seat none
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));

/* ---------- args ---------- */
const argv = process.argv.slice(2);
const arg = (k, d) => { const i = argv.indexOf(k); return i >= 0 && argv[i + 1] ? argv[i + 1] : d; };
const ROOT = path.resolve(arg("--root", path.join(HERE, "..")));
const DOOR = arg("--door", "index.html");
const WHY  = arg("--why", null);
const JSONOUT = argv.includes("--json");

/* Scope, declared out loud so it is arguable. Directories are excluded because a
   file a player cannot reach from the door is the question; tools and the cold
   walk copy are instruments, not surfaces. */
const SKIP_DIRS = new Set(["tools", "coldwalk", "node_modules", ".git", "__pycache__", ".night"]);
const CODE_EXT  = new Set([".html", ".htm", ".js", ".mjs"]);
const COUNT_EXT = new Set([".html", ".htm", ".js", ".mjs", ".json", ".md", ".css"]);

/* ---------- enumerate ---------- */
function walk(dir, base = "") {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? base + "/" + e.name : e.name;
    if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) out.push(...walk(path.join(dir, e.name), rel)); }
    else if (COUNT_EXT.has(path.extname(e.name).toLowerCase())) out.push(rel);
  }
  return out;
}
const FILES = walk(ROOT).sort();
const SET = new Set(FILES);
const isCode = f => CODE_EXT.has(path.extname(f).toLowerCase());

/* ---------- masking: which byte ranges are NOT live code ---------- */
/* mask[i] = 0 live · 1 comment · 2 regex-literal (never a path) */
function maskOf(text, ext) {
  const m = new Uint8Array(text.length);
  const mark = (a, b, v) => { for (let i = a; i < b && i < m.length; i++) m[i] = v; };

  if (ext === ".html" || ext === ".htm") {
    // HTML comments
    let i = 0;
    while ((i = text.indexOf("<!--", i)) !== -1) {
      const end = text.indexOf("-->", i + 4);
      mark(i, end === -1 ? text.length : end + 3, 1);
      i = end === -1 ? text.length : end + 3;
    }
    // JS inside <script> — mask its comments and regex literals too
    const re = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
    let s;
    while ((s = re.exec(text)) !== null) {
      const off = s.index + s[0].indexOf(s[1]);
      const sub = maskOf(s[1], ".js");
      for (let k = 0; k < sub.length; k++) if (sub[k] && !m[off + k]) m[off + k] = sub[k];
    }
    return m;
  }

  // JS / MJS
  let i = 0;
  while (i < text.length) {
    const c = text[i], n = text[i + 1];
    if (c === "/" && n === "/") { let e = text.indexOf("\n", i); if (e === -1) e = text.length; mark(i, e, 1); i = e; continue; }
    if (c === "/" && n === "*") { let e = text.indexOf("*/", i + 2); e = e === -1 ? text.length : e + 2; mark(i, e, 1); i = e; continue; }
    if (c === '"' || c === "'" || c === "`") { // skip strings whole — they may hold paths
      let j = i + 1;
      while (j < text.length && text[j] !== c) { if (text[j] === "\\") j++; j++; }
      i = j + 1; continue;
    }
    // regex literal — THE FIXED FALSE POSITIVE. A regex may contain ".html" and
    // is not a path. Detected by the token preceding the slash.
    if (c === "/") {
      let k = i - 1; while (k >= 0 && /\s/.test(text[k])) k--;
      const prev = k >= 0 ? text[k] : "";
      if (prev === "" || "(,=:[!&|?{};+~*%<>^".includes(prev)) {
        let j = i + 1, cls = false, ok = false;
        while (j < text.length) {
          const d = text[j];
          if (d === "\\") { j += 2; continue; }
          if (d === "[") cls = true; else if (d === "]") cls = false;
          else if (d === "/" && !cls) { ok = true; break; }
          else if (d === "\n") break;
          j++;
        }
        if (ok) { while (j + 1 < text.length && /[a-z]/i.test(text[j + 1])) j++; mark(i, j + 1, 2); i = j + 1; continue; }
      }
    }
    i++;
  }
  return m;
}

/* ---------- the edge grammar, printed with the result ---------- */
const NAV = [
  ["<a href>",                 /<a\b[^>]*?\bhref\s*=\s*["']([^"'#?][^"'?#]*)/gi],
  ["<script src>",             /<script\b[^>]*?\bsrc\s*=\s*["']([^"'?#]+)/gi],
  ["<link href>",              /<link\b[^>]*?\bhref\s*=\s*["']([^"'?#]+)/gi],
  ["<img|iframe|embed src>",   /<(?:img|iframe|embed|source|video|audio)\b[^>]*?\bsrc\s*=\s*["']([^"'?#]+)/gi],
  ["meta refresh url=",        /http-equiv\s*=\s*["']refresh["'][^>]*?url\s*=\s*([^"'>\s]+)/gi],
  ["location.href =",          /location\s*\.\s*href\s*=\s*["']([^"'#?]+)/gi],
  ["location.replace()",       /location\s*\.\s*replace\s*\(\s*["']([^"'#?]+)/gi],
  ["location.assign()",        /location\s*\.\s*assign\s*\(\s*["']([^"'#?]+)/gi],
  ["window.open()",            /window\s*\.\s*open\s*\(\s*["']([^"'#?]+)/gi],
  ["import from",              /\bimport\b[^;]*?from\s*["'](\.[^"']+)/gi],
  ["require()",                /\brequire\s*\(\s*["'](\.[^"']+)/gi],
];
const MENTION = /["'`]([A-Za-z0-9_\-./]+\.(?:html?|m?js|json|css))["'`]/g;

const read = f => { try { return fs.readFileSync(path.join(ROOT, f), "utf8"); } catch { return ""; } };
const norm = (from, raw) => {
  let t = String(raw).trim().replace(/^\.\//, "").split(/[#?]/)[0];
  if (!t || /^[a-z]+:/i.test(t) || t.startsWith("//")) return null;
  const dir = path.posix.dirname(from);
  const j = t.startsWith("/") ? t.slice(1) : (dir === "." ? t : path.posix.normalize(dir + "/" + t));
  return SET.has(j) ? j : null;
};

/* ---------- scan ---------- */
const edges = new Map();      // file -> [{to, form, line}]
const mentions = new Map();   // target -> {live:Set, comment:Set}
const dead = [];              // navigation to a file that does not exist

for (const f of FILES) {
  if (!isCode(f)) continue;
  const text = read(f);
  const mask = maskOf(text, path.extname(f).toLowerCase());
  const lineAt = i => text.slice(0, i).split("\n").length;
  const out = [];

  for (const [form, re] of NAV) {
    re.lastIndex = 0; let m;
    while ((m = re.exec(text)) !== null) {
      const at = m.index + m[0].lastIndexOf(m[1]);
      if (mask[at]) continue;                       // comment or regex — not an edge
      const to = norm(f, m[1]);
      if (to) { if (to !== f) out.push({ to, form, line: lineAt(at) }); }
      else if (/\.(html?|m?js)$/i.test(m[1])) dead.push({ from: f, raw: m[1], form, line: lineAt(at) });
    }
  }
  edges.set(f, out);

  MENTION.lastIndex = 0; let mm;
  while ((mm = MENTION.exec(text)) !== null) {
    const at = mm.index + 1;
    if (mask[at] === 2) continue;                   // regex literal — the fixed false positive
    const to = norm(f, mm[1]);
    if (!to || to === f) continue;
    if (!mentions.has(to)) mentions.set(to, { live: new Set(), comment: new Set() });
    mentions.get(to)[mask[at] === 1 ? "comment" : "live"].add(f);
  }
  // HTML comment blocks name files as bare text, not in quotes — index.html does this
  if (!isCode(f)) continue;
  const cre = /<!--([\s\S]*?)-->/g; let cm;
  while ((cm = cre.exec(text)) !== null) {
    const bre = /([A-Za-z0-9_\-./]+\.(?:html?|m?js))/g; let bm;
    while ((bm = bre.exec(cm[1])) !== null) {
      const to = norm(f, bm[1]);
      if (!to || to === f) continue;
      if (!mentions.has(to)) mentions.set(to, { live: new Set(), comment: new Set() });
      if (!mentions.get(to).live.has(f)) mentions.get(to).comment.add(f);
    }
  }
}

/* ---------- BFS from the door ---------- */
const hop = new Map([[DOOR, 0]]);
const via = new Map();
const q = [DOOR];
while (q.length) {
  const cur = q.shift();
  for (const e of (edges.get(cur) || [])) {
    if (!hop.has(e.to)) { hop.set(e.to, hop.get(cur) + 1); via.set(e.to, { from: cur, ...e }); q.push(e.to); }
  }
}

/* ---------- the three predicates, kept apart ---------- */
const EXISTS = FILES.length;
const REACHABLE = [...hop.keys()].filter(f => SET.has(f));
const ment = f => mentions.get(f) || { live: new Set(), comment: new Set() };
const MENTIONED = FILES.filter(f => ment(f).live.size || ment(f).comment.size);
const LIVE_MENT = MENTIONED.filter(f => ment(f).live.size);
const COMM_ONLY = MENTIONED.filter(f => !ment(f).live.size && ment(f).comment.size);

/* A FOURTH DISTINCTION, added on the first run, because without it the count
   lies. 39 of the 48 "unreachable" files were .md design documents. A document
   was never meant to be reachable from the door; reporting it as unreached
   manufactures work that does not exist. An instrument that inflates its own
   disagreement number is a dead-end generator, which is the thing this rebuild
   was ordered against. Kind is not merged into the three predicates — it says
   what a file IS, before asking whether a hand can get to it. */
const KIND = f => {
  const e = path.extname(f).toLowerCase();
  if (e === ".html" || e === ".htm") return "surface";   // a hand could open it
  if (e === ".md") return "document";                    // read by a person, never routed to
  return "carried";                                      // js/json/css — a surface loads it
};
const SURFACES = FILES.filter(f => KIND(f) === "surface");
const CARRIED  = FILES.filter(f => KIND(f) === "carried");
const DOCUMENTS = FILES.filter(f => KIND(f) === "document");

const unreached = FILES.filter(f => !hop.has(f) && KIND(f) !== "document");
const namedInCode = unreached.filter(f => ment(f).live.size);
const namedInComment = unreached.filter(f => !ment(f).live.size && ment(f).comment.size);
const orphans = unreached.filter(f => !ment(f).live.size && !ment(f).comment.size);
const liveEdgeUnreached = unreached.filter(f => isCode(f) && (edges.get(f) || []).length > 0);

/* ---------- --why ---------- */
if (WHY) {
  const f = WHY.replace(/^\.\//, "");
  const m = ment(f);
  console.log("\n  " + f);
  console.log("  EXISTS      " + (SET.has(f) ? "yes" : "NO — not on disk under " + ROOT));
  console.log("  MENTIONED   live: " + (m.live.size ? [...m.live].join(", ") : "nothing") +
              "\n              comment-only: " + (m.comment.size ? [...m.comment].join(", ") : "nothing"));
  if (hop.has(f)) {
    const chain = []; let c = f;
    while (via.has(c)) { const v = via.get(c); chain.unshift(`${v.from}:${v.line}  --[${v.form}]-->  ${c}`); c = v.from; }
    console.log("  REACHABLE   yes, " + hop.get(f) + " hop(s):");
    chain.forEach(l => console.log("              " + l));
  } else {
    console.log("  REACHABLE   NO — no unbroken live edge from " + DOOR);
    console.log("              the absent connection is a route, not a mention." +
                (m.live.size ? " It is named in live code, which is not the same thing." : ""));
  }
  console.log("");
  process.exit(0);
}

/* ---------- report ---------- */
if (JSONOUT) {
  console.log(JSON.stringify({
    root: ROOT, door: DOOR, exists: EXISTS,
    mentioned: MENTIONED.length, mentionedLive: LIVE_MENT.length, mentionedCommentOnly: COMM_ONLY.length,
    reachable: REACHABLE.length, namedInCode, namedInComment, orphans, liveEdgeUnreached,
    dead: dead.map(d => `${d.from}:${d.line} → ${d.raw}`)
  }, null, 2));
  process.exit(0);
}

const pad = (s, n) => String(s).padEnd(n, ".");
console.log("");
console.log("  PREDICATE FILTER  ·  three predicates, never merged");
console.log("  root " + ROOT);
console.log("  door " + DOOR);
console.log("");
const rSurf = SURFACES.filter(f => hop.has(f)).length;
const rCarr = CARRIED.filter(f => hop.has(f)).length;
console.log("  SURFACES   " + String(rSurf).padStart(3) + " of " + String(SURFACES.length).padEnd(3) +
            "  reachable from " + DOOR + "   <- the number that means something");
console.log("  CARRIED    " + String(rCarr).padStart(3) + " of " + String(CARRIED.length).padEnd(3) +
            "  loaded by something reachable");
console.log("  DOCUMENTS  " + String(DOCUMENTS.length).padStart(3) +
            "       not routed to by design — excluded from the disagreement, not hidden");
console.log("");
console.log("  files " + EXISTS + "      REACHABLE from " + DOOR + "      " + REACHABLE.length);
console.log("  EXISTS " + EXISTS + "  ·  MENTIONED " + MENTIONED.length +
            " (live " + LIVE_MENT.length + " · comment-only " + COMM_ONLY.length + ")" +
            "  ·  REACHABLE " + REACHABLE.length);
console.log("");
console.log("  " + pad("EXISTS but not REACHABLE ", 34) + " " + String(unreached.length).padStart(3) + "    <- the disagreement");
console.log("  " + pad("MENTIONED but not REACHABLE ", 34) + " " +
            String(MENTIONED.filter(f => !hop.has(f)).length).padStart(3) + "    <- an old index would call these routed");
console.log("");
const block = (title, list, note) => {
  console.log("  " + title + " (" + list.length + ")" + (note ? "   " + note : ""));
  if (!list.length) console.log("      none");
  else list.forEach(f => console.log("      " + f));
  console.log("");
};
block("NAMED-IN-CODE, not reachable", namedInCode, "the check suite opens it; the hand cannot");
block("NAMED-IN-COMMENT only", namedInComment, "a comment is not a door");
block("ORPHAN", orphans, "named nowhere, in code or comment");
block("LIVE-EDGE-UNREACHED", liveEdgeUnreached, "real edges that fire, no path from the door");
if (dead.length) {
  console.log("  DEAD LINKS (" + dead.length + ")   a live edge pointing at a file that is not on disk");
  dead.forEach(d => console.log("      " + d.from + ":" + d.line + "  --[" + d.form + "]-->  " + d.raw));
  console.log("");
}
console.log("  THE RULES THIS COUNT OBEYS — printed so the number cannot fall by cleverness");
NAV.forEach(([form]) => console.log("      follows   " + form));
console.log("      ignores   anything inside an HTML comment or a // or /* */ comment");
console.log("      ignores   regex literals (the old filter's three false DEAD LINKS)");
console.log("      ignores   .md prose entirely — documentation is not a mention");
console.log("      scope     " + [...SKIP_DIRS].join(", ") + " excluded");
console.log("");
console.log("  A mention is not a route. A route is not a walk. This measures the middle one.");
console.log("");
