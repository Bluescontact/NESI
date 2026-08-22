#!/usr/bin/env node
/*
 * WORLD CHECK — the figure the map shows must BE the world.
 *
 * ■ REPOINTED, 2026-08-21, the same pass that rebuilt ascent.html from
 * scratch on Kevin's mark ("cut the ascent entirely... build the levels
 * entirely from scratch"). The retired file kept its OWN independent
 * placement solve (a `world: (()=>{...})()` literal) as a deliberate
 * cross-check against solid.js's own EMBED — two solves, compared, to
 * catch exactly the kind of drift this file's own header names (the
 * original d²=6 bug). The new ascent.html does not duplicate that solve —
 * it reads G.EMBED directly (see its own `project()`), which is the
 * correct fix for the law this file protects, not a violation of it:
 * solid.js's own header already states "nothing here is a stored fact that
 * could drift from the table it came from," and a SECOND independent
 * placement kept only in ascent.html was itself a second table that could
 * drift, not a safeguard against one. So this file now checks solid.js's
 * own EMBED directly — the single source every live surface actually
 * reads — rather than hunting for a copy that no longer exists on purpose.
 *
 *   node tools/world_check.js
 */
const path = require("path");
const ROOT = path.join(__dirname, "..");
const G = require(path.join(ROOT, "solid.js"));

/* Reshape solid.js's own tables into the same {v,e,name,idx} shape this
   file has always tested against, so every check below is unchanged. */
const name = G.NAMES.slice();
const idx = {}; name.forEach((n,i) => { idx[n] = i; });
const v = name.map(n => G.EMBED[n]);
const e = G.MEMBERS.map(m => [idx[m.a], idx[m.b]]);
const W = { v, e, name, idx };

const results = [];
const ok = (n, pass, note) => results.push({ n, pass: !!pass, note: note == null ? "" : String(note) });
const d2 = (a, b) => W.v[a].reduce((s, x, k) => s + (x - W.v[b][k]) ** 2, 0);

ok("W1 the figure is not empty — a placement was found",
   W.e.length > 0, W.e.length ? W.e.length + " members" : "the solve refused, as it should when nothing fits");
ok("W2 twelve seats, each named", W.v.length === 12 && W.name.filter(Boolean).length === 12,
   W.name.filter(Boolean).length + " named");
ok("W3 twenty-four members", W.e.length === 24, W.e.length);

/* the one that matters */
const bad = W.e.filter(([a, b]) => d2(a, b) !== 2);
ok("W4 EVERY MEMBER IS A REAL EDGE of the solid, d²=2",
   bad.length === 0,
   bad.length ? bad.map(e => W.name[e[0]] + "—" + W.name[e[1]] + " d²=" + d2(e[0], e[1])).join(" · ")
              : "no diagonal is drawn as a member");

const deg = {};
W.e.forEach(([a, b]) => { deg[a] = (deg[a] || 0) + 1; deg[b] = (deg[b] || 0) + 1; });
ok("W5 four members at every seat", Object.values(deg).every(d => d === 4) && Object.keys(deg).length === 12,
   [...new Set(Object.values(deg))].join(","));

let tri = 0;
for (let a = 0; a < 12; a++) for (let b = a + 1; b < 12; b++) for (let c = b + 1; c < 12; c++)
  if (d2(a, b) === 2 && d2(b, c) === 2 && d2(a, c) === 2) tri++;
ok("W6 eight triangles — it is a cuboctahedron and not merely 12-and-24", tri === 8, tri);

ok("W7 his line holds: ↓TANK and ↓FILTER are joined",
   W.e.some(([a, b]) => [W.name[a], W.name[b]].sort().join() === "FILTER,TANK"),
   "the relation that pinned the placement is a member of the figure that is drawn");

/* the map lights what a hand has worked, so every seat must be findable by key —
   read live off solid.js's own NAMES (2026-08-21), never a second list: the
   retired file's "winter" alias for OVERWINTERING was a ROOMS-era key
   convention that did not survive the rebuild on purpose. */
const KEYS = G.NAMES.slice();
const missing = KEYS.filter(k => W.idx[k] === undefined);
ok("W8 every seat is findable by its own key, so the map can light what was worked",
   missing.length === 0, missing.join(", ") || "all twelve");

let failed = 0;
for (const r of results) {
  if (!r.pass) failed++;
  console.log((r.pass ? "  ok  " : "  FAIL") + "  " + r.n + (r.note ? "   [" + r.note + "]" : ""));
}
console.log(failed ? "\nworld: " + failed + " FAILED — the map is showing something that is not the world\n"
                   : "\nworld: all " + results.length + " passed — the figure on the map IS the solid\n");
process.exit(failed ? 1 : 0);
