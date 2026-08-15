#!/usr/bin/env node
/*
 * WORLD CHECK — the figure the map shows must BE the world.
 *
 * The map's aperture used to show `twin`, a generic figure that stood for the
 * shape without being it. It shows the pinned solid now, and the placement is
 * SOLVED at load rather than typed in — because a typed coordinate table is a
 * second place the world can drift from the circuits that define it.
 *
 * WHY THIS FILE EXISTS. The first solve was greedy: it took the first free
 * vertex whose planes matched and produced TWELVE MEMBERS AT d²=6 — a body
 * diagonal, not an edge. It drew a figure that was not the world, four-regular
 * and twelve-vertexed and wrong, and reported nothing amiss. Nothing would have
 * caught that but this.
 *
 *   node tools/world_check.js
 */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
const src = fs.readFileSync(path.join(ROOT, "ascent.html"), "utf8");

const i = src.indexOf("  world: (()=>{");
const j = src.indexOf("\n  })()", i);
if (i < 0 || j < 0) { console.log("  FAIL  the map has no world to show\n"); process.exit(1); }
const W = new Function("return (" + src.slice(i + "  world: ".length, j + "\n  })()".length) + ")")();

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
   W.e.some(([a, b]) => [W.name[a], W.name[b]].sort().join() === "filter,tank"),
   "the relation that pinned the placement is a member of the figure that is drawn");

/* the map lights what a hand has worked, so every seat must be findable by key */
const KEYS = ["tank","dam","filter","stations","ground","deep","lens","heliostat","seating","winter","garden","cast"];
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
