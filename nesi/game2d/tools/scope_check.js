#!/usr/bin/env node
/*
 * SCOPE CHECK — does each instrument read the building it claims to?
 *
 * THE PATTERN THIS EXISTS FOR, found three times in one session and each time by
 * accident rather than by any check:
 *
 *   the palette check said "one palette" and compared exactly two files, so the
 *     front door carried a colour in no palette for as long as it liked
 *   the gesture check said "every stage declares its verb" and asked four of
 *     twenty, so thirteen stages wore a label they did not honour
 *   the refusal check — the instrument that enforces "the refusals are the
 *     product" — defaulted to nesi.html and had NEVER been pointed at the game.
 *     It reported PASS all session about a file last touched two days earlier
 *
 * Every one of those passed clean while the property it named was false
 * somewhere it was not looking. A check narrower than its own claim reads as
 * safety and is silence.
 *
 * So this asks the only question that catches the whole class: WHICH FILES DOES
 * EACH CHECK ACTUALLY READ, and are they the live ones? It cannot judge whether
 * a check's logic is right. It can see that an instrument is looking at a
 * building nobody walks, which is what happened three times.
 *
 * LIVE means reachable from the front door: index.html, what it points at, and
 * what those point at. Not "recently edited", not "looks important".
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
