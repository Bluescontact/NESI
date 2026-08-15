#!/usr/bin/env node
/*
 * SCOPE CHECK — every instrument reads the live build.
 *
 * THE RULE: a check's scope matches its claim. One that says "every stage" asks
 * every stage; one that says "one palette" compares every page; one that
 * enforces the refusals reads the surfaces a hand opens.
 *
 * It asks the question that catches the whole class: WHICH FILES DOES EACH CHECK
 * READ, and are they the live ones? It judges no check's logic. It sees an
 * instrument reading a building nobody walks.
 *
 * LIVE means reachable from the front door: index.html, what it points at, and
 * what those point at.
 *
 *   node tools/scope_check.js
 */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");

/* ── what is actually reachable from the front door ───────────────────────── */
const live = new Set();
(function follow(file) {
  if (live.has(file)) return;
  const p = path.join(ROOT, file);
  if (!fs.existsSync(p)) return;
  live.add(file);
  const t = fs.readFileSync(p, "utf8");
  const refs = [
    ...[...t.matchAll(/url=([a-z_0-9]+\.html)/gi)].map(m => m[1]),
    ...[...t.matchAll(/location\.replace\("([a-z_0-9]+\.html)"\)/gi)].map(m => m[1]),
    ...[...t.matchAll(/href="([a-z_0-9]+\.html)"/gi)].map(m => m[1]),
    ...[...t.matchAll(/<script src="([a-z_0-9]+\.js)"/gi)].map(m => m[1])
  ];
  refs.forEach(follow);
})("index.html");

/* the surfaces a hand can open directly are live too, even without a link in —
   they are addresses he has been given and uses */
["daily.html", "ascent.html", "decisions.html", "level_one.html"].forEach(f => {
  if (fs.existsSync(path.join(ROOT, f))) live.add(f);
});

/* ── what each check reads ────────────────────────────────────────────────── */
const checks = fs.readdirSync(path.join(ROOT, "tools"))
  .filter(f => /_(check|lint|walk)\.js$|^first_four\.js$/.test(f))
  .sort();

const results = [];
const ok = (n, pass, note) => results.push({ n, pass: !!pass, note: note == null ? "" : String(note) });

const dead = [];
for (const c of checks) {
  const t = fs.readFileSync(path.join(ROOT, "tools", c), "utf8");
  /* the files it names — a check that reads nothing is measuring the world
     through the running page instead, which is its own kind of scope */
  const named = [...new Set([...t.matchAll(/"([a-z_0-9]+\.(?:html|js|json))"/g)].map(m => m[1]))]
    .filter(f => !/_check\.js|_lint\.js|_walk\.js|^first_four\.js$/.test(f));
  const pages = named.filter(f => /\.html$/.test(f));
  if (!pages.length) { ok("S· " + c, true, "reads no page by name — drives the running one"); continue; }
  const stale = pages.filter(f => !live.has(f));
  if (stale.length) dead.push(c + " → " + stale.join(", "));
  ok("S· " + c, stale.length === 0,
     stale.length ? "READS A PAGE NOBODY WALKS: " + stale.join(", ")
                  : pages.filter(f => live.has(f)).join(", "));
}

console.log("live, from the front door: " + [...live].sort().join(" · ") + "\n");
let failed = 0;
for (const r of results) {
  if (!r.pass) failed++;
  console.log((r.pass ? "  ok  " : "  FAIL") + "  " + r.n.padEnd(22) + (r.note ? " " + r.note : ""));
}
console.log(failed
  ? "\nscope: " + failed + " instrument(s) are reading a building nobody walks.\n" +
    "  " + dead.join("\n  ") + "\n" +
    "  A check narrower than its claim reads as safety and is silence.\n"
  : "\nscope: every instrument reads the live build\n");
process.exit(failed ? 1 : 0);
