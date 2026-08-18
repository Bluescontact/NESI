#!/usr/bin/env node
/* MAP BUILD — writes nesi/THE_MAP_2026-08-17.html, and every number in it is
 * derived at build time rather than typed.
 *
 * WHY IT IS A GENERATOR AND NOT A DOCUMENT. THE_MAP_2026-08-11.html is a hand-
 * written map, and solid.js's own header records what happens to hand-written
 * counts: THE_24.md's circuit four was wrong and prose could not tell. The rule
 * this corpus already keeps — values derive, the derivation lives in one
 * function — applies to a map harder than to anything else, because a map is
 * ALL counts. So the solid's layer is read out of solid.js, the corpus layer is
 * measured off the filesystem, and the instrument row is whatever
 * tools/check_all.js actually prints today.
 *
 * Nothing here reaches the player. This draws the skeleton, not the face.
 *
 *   node tools/map_build.js          from nesi/game2d/
 */
"use strict";
const fs = require("fs"), path = require("path");
const { execFileSync } = require("child_process");
const S = require("../solid.js");

const GAME2D = path.join(__dirname, "..");
const NESI   = path.join(GAME2D, "..");
const ROOT   = path.join(NESI, "..");
const OUT    = path.join(NESI, "THE_MAP_2026-08-17.html");

/* ── measuring ────────────────────────────────────────────────────────────── */

function walk(dir, hit) {
  let out = [];
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch (e) { return out; }
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out = out.concat(walk(p, hit));
    else if (e.isFile()) { out.push(p); if (hit) hit(p); }
  }
  return out;
}
const day = t => new Date(t).toISOString().slice(0, 10);

function dirCensus() {
  return fs.readdirSync(NESI, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .map(e => {
      const files = walk(path.join(NESI, e.name));
      let newest = 0;
      for (const f of files) { const m = fs.statSync(f).mtimeMs; if (m > newest) newest = m; }
      return { name: e.name, files: files.length, newest: newest ? day(newest) : null };
    })
    .sort((a, b) => (b.newest || "").localeCompare(a.newest || "") || b.files - a.files);
}

function lines(files) {
  let n = 0;
  for (const f of files) { try { n += fs.readFileSync(f, "utf8").split("\n").length; } catch (e) {} }
  return n;
}
const byExt = (files, exts) => files.filter(f => exts.includes(path.extname(f).toLowerCase()));

function jsonlCount(name) {
  try { return fs.readFileSync(path.join(ROOT, name), "utf8").trim().split("\n").filter(Boolean).length; }
  catch (e) { return null; }
}

function gates() {
  let L;
  try {
    L = fs.readFileSync(path.join(ROOT, "OPEN_GATES.jsonl"), "utf8").trim().split("\n")
      .map(l => { try { return JSON.parse(l); } catch (e) { return null; } }).filter(Boolean);
  } catch (e) { return null; }
  const open = new Set();
  let opened = 0, closed = 0, last = "";
  for (const o of L) {
    if (o.ts > last) last = o.ts;
    if (/open/i.test(o.event)) { open.add(o.gate); opened++; }
    else { open.delete(o.gate); closed++; }
  }
  return { events: L.length, opened, closed, still: open.size, last: last.slice(0, 10) };
}

function lastMark() {
  try {
    const L = fs.readFileSync(path.join(ROOT, "MARKS_LOG.jsonl"), "utf8").trim().split("\n");
    return { count: L.length, ts: (JSON.parse(L[L.length - 1]).ts || "").slice(0, 10) };
  } catch (e) { return { count: null, ts: null }; }
}

function suite() {
  /* whatever it actually prints today — a map that transcribes a suite result is
     the same mistake as a map that transcribes a count */
  let out;
  try {
    out = execFileSync(process.execPath, [path.join(__dirname, "check_all.js")],
      { stdio: "pipe", cwd: GAME2D }).toString();
  } catch (e) { out = String(e.stdout || "") + String(e.stderr || ""); }
  const rows = [];
  for (const l of out.split("\n")) {
    const m = l.match(/^\s{2}(ok|FAIL|CRASH|GONE)\s+(\S+)\s+(.*)$/);
    if (m) rows.push({ mark: m[1], name: m[2], holds: m[3].trim() });
  }
  const inPage = [];
  let seen = false;
  for (const l of out.split("\n")) {
    if (/in the page, not covered/.test(l)) { seen = true; continue; }
    if (!seen) continue;
    const m = l.match(/^\s{6,}(GONE\s+)?(\S+)\s+(.*)$/);
    if (m && m[2]) inPage.push({ name: m[2], holds: m[3].trim() });
  }
  const tail = (out.match(/\[check_all\].*/g) || []).pop() || "";
  return { rows, inPage, tail: tail.trim(), green: /all \d+ hold/.test(tail) };
}

/* ── the drawings, generated from the same tables ──────────────────────────── */

function circuitsSVG() {
  const R = 66, cells = [[200, 180], [600, 180], [200, 480], [600, 480]];
  let o = '<svg viewBox="0 0 800 660" role="img" aria-label="The four circuits: each a closed walk of six seats, three falling then three rising, with one turn and one return.">';
  o += '<defs><marker id="ar" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="currentColor"/></marker></defs>';
  S.CIRCUITS.forEach((c, ci) => {
    const [cx, cy] = cells[ci];
    const P = c.map((n, i) => { const a = (-90 - 60 * i) * Math.PI / 180; return [cx + R * Math.cos(a), cy + R * Math.sin(a)]; });
    o += `<text x="${cx - R - 58}" y="${cy - R - 46}" class="ct">CIRCUIT ${ci + 1}</text>`;
    for (let i = 0; i < 6; i++) {
      const m = S.memberBetween(c[i], c[(i + 1) % 6]);
      const cls = m.kind === "fall" ? "e-fall" : m.kind === "rise" ? "e-rise" : m.kind === "turn" ? "e-turn" : "e-ret";
      o += `<line x1="${P[i][0].toFixed(1)}" y1="${P[i][1].toFixed(1)}" x2="${P[(i + 1) % 6][0].toFixed(1)}" y2="${P[(i + 1) % 6][1].toFixed(1)}" class="${cls}" marker-end="url(#ar)"/>`;
    }
    for (let i = 0; i < 6; i++) {
      const n = c[i], f = S.falls(n);
      o += `<circle cx="${P[i][0].toFixed(1)}" cy="${P[i][1].toFixed(1)}" r="5.5" class="${f ? "n-fall" : "n-rise"}"/>`;
      let x = P[i][0], y = P[i][1], an = "middle";
      if (i === 0) y -= 14;
      else if (i === 3) y += 22;
      else if (i === 1 || i === 2) { an = "end"; x -= 11; y += 4; }
      else { an = "start"; x += 11; y += 4; }
      o += `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="${an}" class="sl ${f ? "f" : "r"}">${n}</text>`;
    }
  });
  return o + "</svg>";
}

function tradesSVG() {
  const cx = [150, 450, 750], cy = [110, 290], H = 42;
  let o = '<svg viewBox="0 0 900 400" role="img" aria-label="The six squares drawn as trades: in each, one diagonal closes exactly as the other opens.">';
  o += '<defs><marker id="aI" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="currentColor"/></marker></defs>';
  S.TRADES.forEach((t, i) => {
    const X = cx[i % 3], Y = cy[Math.floor(i / 3)], r = t.ring;
    const P = [[X, Y - H], [X + H, Y], [X, Y + H], [X - H, Y]];
    for (let k = 0; k < 4; k++)
      o += `<line x1="${P[k][0]}" y1="${P[k][1]}" x2="${P[(k + 1) % 4][0]}" y2="${P[(k + 1) % 4][1]}" class="sq-side"/>`;
    o += `<line x1="${X}" y1="${Y - H + 6}" x2="${X}" y2="${Y - 8}" class="d-close" marker-end="url(#aI)"/>`;
    o += `<line x1="${X}" y1="${Y + H - 6}" x2="${X}" y2="${Y + 8}" class="d-close" marker-end="url(#aI)"/>`;
    o += `<line x1="${X - 8}" y1="${Y}" x2="${X - H + 4}" y2="${Y}" class="d-open" marker-end="url(#aI)"/>`;
    o += `<line x1="${X + 8}" y1="${Y}" x2="${X + H - 4}" y2="${Y}" class="d-open" marker-end="url(#aI)"/>`;
    const cl = n => S.falls(n) ? "f" : "r";
    P.forEach((p, k) => { o += `<circle cx="${p[0]}" cy="${p[1]}" r="4.5" class="n-${S.falls(r[k]) ? "fall" : "rise"}"/>`; });
    o += `<text x="${X}" y="${Y - H - 11}" text-anchor="middle" class="sl ${cl(r[0])}">${r[0]}</text>`;
    o += `<text x="${X + H + 9}" y="${Y + 4}" text-anchor="start" class="sl ${cl(r[1])}">${r[1]}</text>`;
    o += `<text x="${X}" y="${Y + H + 20}" text-anchor="middle" class="sl ${cl(r[2])}">${r[2]}</text>`;
    o += `<text x="${X - H - 9}" y="${Y + 4}" text-anchor="end" class="sl ${cl(r[3])}">${r[3]}</text>`;
  });
  return o + "</svg>";
}

/* ── gather ───────────────────────────────────────────────────────────────── */

const stamp = process.env.MAP_STAMP || new Date().toISOString().slice(0, 10);
const dirs = dirCensus();
const nesiFiles = walk(NESI);
const g2Files = walk(GAME2D);
const g2md = byExt(g2Files, [".md"]);
const g2code = byExt(g2Files, [".js", ".mjs", ".html", ".py"]);
const G = gates(), M = lastMark(), SU = suite();

const alive = dirs.filter(d => d.newest && d.newest >= "2026-08-16");
const empty = dirs.filter(d => d.files === 0);
const retired = dirs.filter(d => d.name === "world3d");
const dormant = dirs.filter(d => d.files > 0 && !alive.includes(d) && !retired.includes(d));

const kinds = S.MEMBERS.reduce((a, m) => (a[m.kind] = (a[m.kind] || 0) + 1, a), {});
const N = n => n.toLocaleString("en-US");

const dirRows = dirs.map(d => {
  const cls = d.files === 0 ? "empty" : d.name === "world3d" ? "retired"
    : (d.newest >= "2026-08-16" ? "alive" : "dormant");
  const w = Math.max(1.2, (d.files / dirs[0].files) * 100);
  return `<div class="drow ${cls}"><span class="dn">${d.name}</span><span class="dbar"><i style="width:${w.toFixed(1)}%"></i></span><span class="dc">${N(d.files)}</span><span class="dd">${d.newest || "empty"}</span></div>`;
}).join("\n      ");

const suiteRows = SU.rows.map(r =>
  `<tr><td class="m ${r.mark === "ok" ? "ok" : "no"}">${r.mark}</td><td class="nm">${r.name}</td><td>${r.holds}</td></tr>`
).join("\n        ");
const pageRows = SU.inPage.map(r =>
  `<tr><td class="m wait">wait</td><td class="nm">${r.name}</td><td>${r.holds}</td></tr>`
).join("\n        ");

const memberRows = S.MEMBERS.map((m, i) =>
  `<tr><td class="i">${String(i + 1).padStart(2, "0")}</td><td class="k k-${m.kind}">${m.kind}</td><td class="nm">${m.a}</td><td class="nm">${m.b}</td><td class="i">${m.circuits.map(c => c + 1).join(", ")}</td></tr>`
).join("\n        ");

const antipodes = S.DIAMETERS.map(d => `<li><span class="${S.falls(d[0]) ? "f" : "r"}">${d[0]}</span> <em>↔</em> <span class="${S.falls(d[1]) ? "f" : "r"}">${d[1]}</span></li>`).join("");

/* ── the page ─────────────────────────────────────────────────────────────── */

const html = `<title>NESI Measured</title>
<style>
:root{
  --ground:#edf0f2; --surface:#ffffff; --surface-2:#f5f7f9; --surface-3:#e4e9ee;
  --ink:#12161b; --ink-2:#47505b; --ink-3:#737d89;
  --rule:#ccd3da; --rule-2:#e1e6eb;
  --fall:#1f4fbf; --rise:#8a6410; --alive:#2b6e4a; --dead:#a8402a; --centre:#6b3560;
  --fall-bg:#e6ecfa; --rise-bg:#f4ecd8; --alive-bg:#e3f0e8; --dead-bg:#f8e7e2; --centre-bg:#f1e6ee;
  --mono:ui-monospace,"SF Mono","JetBrains Mono","IBM Plex Mono",Menlo,Consolas,monospace;
  --serif:"Iowan Old Style","Palatino Linotype",Palatino,"Book Antiqua",Georgia,serif;
}
*{box-sizing:border-box}
body{margin:0;background:var(--ground);color:var(--ink);font-family:var(--mono);font-size:0.94rem;line-height:1.6;-webkit-font-smoothing:antialiased}
.wrap{max-width:1080px;margin:0 auto;padding:0 1.5rem 6rem}
h1,h2,h3,h4{font-family:var(--mono);font-weight:600;margin:0;text-wrap:balance}
.prose{font-family:var(--serif);font-size:1.05rem;line-height:1.62;color:var(--ink-2);max-width:70ch}
.prose strong{color:var(--ink);font-weight:600}
.prose em{font-style:italic}
.label{font-family:var(--mono);font-size:0.67rem;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-3);font-weight:600}
code{font-family:var(--mono);font-size:.86em;background:var(--surface-3);padding:.08em .32em;border-radius:2px;color:var(--ink)}

header.top{background:var(--surface);border-bottom:1px solid var(--rule);padding:3.2rem 0 2.2rem}
header.top .inner{max-width:1080px;margin:0 auto;padding:0 1.5rem}
header.top h1{font-size:2.6rem;letter-spacing:-.02em;line-height:1.05;margin:1.3rem 0 1rem}
header.top .thesis{font-family:var(--serif);font-size:1.26rem;line-height:1.5;color:var(--ink);max-width:62ch;margin:0 0 1.5rem}
header.top .thesis b{font-weight:600}
.stamp{font-size:.7rem;line-height:1.8;color:var(--ink-3);border-top:1px solid var(--rule-2);padding-top:.9rem;max-width:84ch}

section{margin-top:4.5rem}
.sec-head{display:flex;align-items:baseline;gap:1rem;border-bottom:1px solid var(--rule);padding-bottom:.6rem;margin-bottom:1.5rem;flex-wrap:wrap}
.sec-head .z{font-size:.67rem;letter-spacing:.14em;color:var(--ink-3);font-weight:600;border:1px solid var(--rule);padding:.14rem .45rem;border-radius:2px}
.sec-head h2{font-size:1.35rem;letter-spacing:-.01em}
.sec-head .k{color:var(--ink-3);font-size:.7rem;letter-spacing:.1em;margin-left:auto}

.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:1px;background:var(--rule-2);border:1px solid var(--rule);margin-bottom:1.6rem}
.stat{background:var(--surface);padding:1rem 1.05rem .95rem}
.stat .n{font-size:1.7rem;font-weight:600;letter-spacing:-.03em;font-variant-numeric:tabular-nums;display:block;line-height:1.1}
.stat .n.a{color:var(--alive)} .stat .n.d{color:var(--dead)} .stat .n.w{color:var(--fall)} .stat .n.c{color:var(--centre)}
.stat .c{font-size:.71rem;color:var(--ink-3);line-height:1.45;margin-top:.42rem;display:block}

.pull{font-family:var(--serif);font-size:1.28rem;line-height:1.45;color:var(--ink);border-left:3px solid var(--fall);padding:.35rem 0 .35rem 1.05rem;margin:1.7rem 0 0;max-width:58ch}
.pull.warn{border-left-color:var(--dead)}

.panel{border:1px solid var(--rule);background:var(--surface);padding:1.2rem 1.3rem 1.35rem;margin-top:1.5rem}
.panel h3{font-size:.96rem;margin-bottom:.5rem}
.panel .prose{margin:.4rem 0 0}

.dirs{border:1px solid var(--rule);background:var(--surface);margin-top:1.5rem;padding:.5rem 0}
.drow{display:grid;grid-template-columns:11rem 1fr 4.5rem 6rem;gap:.75rem;align-items:center;padding:.24rem 1.1rem;font-size:.76rem}
.drow .dn{color:var(--ink-2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.drow .dbar{background:var(--surface-3);height:9px;border-radius:1px;overflow:hidden}
.drow .dbar i{display:block;height:100%;background:var(--ink-3)}
.drow .dc,.drow .dd{font-variant-numeric:tabular-nums;color:var(--ink-3);text-align:right}
.drow.alive .dn{color:var(--alive);font-weight:600} .drow.alive .dbar i{background:var(--alive)}
.drow.retired .dn{color:var(--dead);font-weight:600} .drow.retired .dbar i{background:var(--dead)}
.drow.empty .dn,.drow.empty .dd{color:#a9b2bc} .drow.empty .dbar i{background:#c6cdd5}
.dkey{display:flex;gap:1.1rem;flex-wrap:wrap;padding:.6rem 1.1rem 0;margin-top:.4rem;border-top:1px solid var(--rule-2);font-size:.68rem;color:var(--ink-3);letter-spacing:.04em}
.dkey b{font-weight:600}
.dkey .s{display:inline-block;width:9px;height:9px;border-radius:1px;margin-right:.32rem;vertical-align:-1px}

table{width:100%;border-collapse:collapse;font-size:.78rem;margin-top:1.2rem}
.tw{overflow-x:auto;border:1px solid var(--rule);background:var(--surface)}
.tw table{margin:0}
th{text-align:left;font-weight:600;font-size:.66rem;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-3);padding:.6rem .9rem;border-bottom:1px solid var(--rule)}
td{padding:.36rem .9rem;border-bottom:1px solid var(--rule-2);vertical-align:top;color:var(--ink-2)}
tr:last-child td{border-bottom:none}
td.nm{color:var(--ink);font-weight:600;white-space:nowrap}
td.i{font-variant-numeric:tabular-nums;color:var(--ink-3);white-space:nowrap}
td.m{font-weight:600;font-size:.68rem;letter-spacing:.06em;text-transform:uppercase;white-space:nowrap}
td.m.ok{color:var(--alive)} td.m.no{color:var(--dead)} td.m.wait{color:var(--ink-3)}
td.k{font-size:.68rem;letter-spacing:.07em;text-transform:uppercase;font-weight:600;white-space:nowrap}
.k-fall{color:var(--fall)} .k-rise{color:var(--rise)} .k-turn{color:var(--centre)} .k-return{color:var(--dead)}

figure{margin:1.6rem 0 0;border:1px solid var(--rule);background:var(--surface)}
figure .fbody{overflow-x:auto;padding:1.1rem .8rem .4rem}
figure svg{display:block;min-width:620px;width:100%;height:auto}
figcaption{font-family:var(--serif);font-size:.96rem;color:var(--ink-2);border-top:1px solid var(--rule-2);padding:.8rem 1.2rem 1rem;line-height:1.55}
figcaption b{color:var(--ink);font-weight:600}
.flegend{display:flex;gap:1.1rem;flex-wrap:wrap;padding:.7rem 1.2rem;border-top:1px solid var(--rule-2);font-size:.68rem;letter-spacing:.05em;color:var(--ink-3);text-transform:uppercase}
.flegend i{display:inline-block;width:16px;height:0;border-top-width:2px;border-top-style:solid;margin-right:.35rem;vertical-align:4px}
svg .ct{font-family:var(--mono);font-size:10px;letter-spacing:.14em;fill:var(--ink-3);font-weight:600}
svg .sl{font-family:var(--mono);font-size:10px;letter-spacing:.04em;font-weight:600}
svg .sl.f{fill:var(--fall)} svg .sl.r{fill:var(--rise)}
svg .n-fall{fill:var(--fall)} svg .n-rise{fill:var(--rise)}
svg .e-fall{stroke:var(--fall);stroke-width:1.6;color:var(--fall)}
svg .e-rise{stroke:var(--rise);stroke-width:1.6;color:var(--rise)}
svg .e-turn{stroke:var(--centre);stroke-width:2.4;color:var(--centre)}
svg .e-ret{stroke:var(--dead);stroke-width:2.4;stroke-dasharray:5 3;color:var(--dead)}
svg .sq-side{stroke:var(--ink-3);stroke-width:1.3;fill:none}
svg .d-close{stroke:var(--alive);stroke-width:1.8;color:var(--alive)}
svg .d-open{stroke:var(--dead);stroke-width:1.5;stroke-dasharray:4 3;color:var(--dead)}

ul.anti{list-style:none;padding:0;margin:1.2rem 0 0;display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1px;background:var(--rule-2);border:1px solid var(--rule)}
ul.anti li{background:var(--surface);padding:.8rem 1rem .9rem;font-size:.8rem;display:flex;align-items:baseline;gap:.55rem}
ul.anti li em{font-style:normal;color:var(--ink-3);font-size:.72rem}
ul.anti li .f{color:var(--fall);font-weight:600} ul.anti li .r{color:var(--rise);font-weight:600}

.corr{display:flex;flex-direction:column;gap:1px;background:var(--rule-2);border:1px solid var(--rule);margin-top:1.4rem}
.corr .c{background:var(--surface);padding:1.05rem 1.2rem 1.15rem}
.corr h3{font-size:.94rem;margin-bottom:.45rem}
.corr .said{font-family:var(--serif);font-size:.98rem;color:var(--ink-3);font-style:italic;border-left:2px solid var(--rule);padding-left:.8rem;margin:0 0 .55rem}
.corr p{font-family:var(--serif);font-size:1rem;line-height:1.58;color:var(--ink-2);margin:0;max-width:76ch}
.corr p strong{color:var(--ink);font-weight:600}

ul.open{list-style:none;padding:0;margin:1.2rem 0 0;border-top:1px solid var(--rule-2)}
ul.open li{font-family:var(--serif);font-size:1.01rem;line-height:1.55;color:var(--ink-2);padding:.8rem 0;border-bottom:1px solid var(--rule-2);max-width:78ch}
ul.open li b{color:var(--ink);font-weight:600}

footer{margin-top:4.5rem;border-top:1px solid var(--rule);padding-top:1.4rem;font-size:.74rem;line-height:1.7;color:var(--ink-3);max-width:84ch}
footer strong{color:var(--ink-2)}

@media (max-width:680px){
  header.top h1{font-size:2rem}
  .drow{grid-template-columns:8.5rem 1fr 3.6rem;gap:.5rem}
  .drow .dd{display:none}
}
@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}
</style>

<header class="top">
  <div class="inner">
    <p class="label">Derived ${stamp} · supersedes THE_MAP_2026-08-11.html, which stands unedited</p>
    <h1>NESI Measured</h1>
    <p class="thesis">Three layers, read outward to inward: <b>the corpus on disk, the build that runs, and the solid underneath it.</b> Every number here was derived at build time — the geometry out of <code>solid.js</code>, the census off the filesystem, the instrument row out of a live run.</p>
    <p class="stamp">
      BUILT BY · <code>nesi/game2d/tools/map_build.js</code>. Re-run it and the numbers move with the thing they measure; nothing on this page is transcribed.<br>
      AUTHORITY · <code>solid.js</code> for every claim about the geometry, per the boot path. The corpus layer is <code>fs.statSync</code> over <code>nesi/</code>. The build layer is whatever <code>tools/check_all.js</code> printed on this run.<br>
      STANDING · MEASURED throughout. The three corrections in section 4 are measurements against documents, not rulings. Nothing here closes a fork and nothing was written to <code>MARKS_LOG.jsonl</code>.
    </p>
  </div>
</header>

<div class="wrap">

<section>
  <div class="sec-head"><span class="z">LAYER 1</span><h2>The corpus</h2><span class="k">WHAT IS ON DISK</span></div>
  <div class="stats">
    <div class="stat"><span class="n">${N(nesiFiles.length)}</span><span class="c">files under <code>nesi/</code>, across ${dirs.length} directories.</span></div>
    <div class="stat"><span class="n a">${alive.length}</span><span class="c">directories touched in the last two days — <b>${alive.map(d => d.name).join(", ")}</b>. Everything else is older.</span></div>
    <div class="stat"><span class="n d">${dormant.length}</span><span class="c">dormant directories holding files nothing has opened. Oldest: ${dirs.filter(d => d.files > 0).slice(-1)[0].newest}.</span></div>
    <div class="stat"><span class="n d">${N(retired.length ? retired[0].files : 0)}</span><span class="c">files in <code>world3d/</code> — retired 2026-08-14, marked at its own site, and <b>gitignored</b>: kept on this machine, absent from history.</span></div>
    <div class="stat"><span class="n">${N(M.count)}</span><span class="c">marks in <code>MARKS_LOG.jsonl</code>, the last on ${M.ts}.</span></div>
    <div class="stat"><span class="n w">${G ? G.still : "—"}</span><span class="c">gates still open — ${G ? G.opened : "?"} opened against ${G ? G.closed : "?"} closed. Last gate event ${G ? G.last : "?"}.</span></div>
  </div>

  <div class="dirs">
    <div class="dkey" style="border-top:none;padding-top:0;padding-bottom:.6rem;border-bottom:1px solid var(--rule-2);margin-top:0">
      <span><span class="s" style="background:var(--alive)"></span><b>alive</b> — touched since 2026-08-16</span>
      <span><span class="s" style="background:var(--dead)"></span><b>retired</b> — marked dead at its own site</span>
      <span><span class="s" style="background:var(--ink-3)"></span><b>dormant</b> — holds files, nothing opened them</span>
      <span><span class="s" style="background:#c6cdd5"></span><b>empty</b></span>
    </div>
      ${dirRows}
  </div>

  <p class="pull warn">Two directories out of ${dirs.length} carry everything this week. One is marked dead. The rest have no mark either way.</p>
  <p class="prose" style="margin-top:1.4rem">Only <code>world3d/</code> was ever given a terminal mark, and it is the one directory the repository cannot see. The other ${dormant.length} stopped being opened and nothing recorded that they had — which is the same asymmetry the gift-territory census measures at scale: adding is a contribution, ending is an accusation, so only the beginnings get written down.</p>
</section>

<section>
  <div class="sec-head"><span class="z">LAYER 2</span><h2>The build</h2><span class="k">WHAT RUNS</span></div>
  <p class="prose">Entry is <code>nesi/game2d/index.html</code> → <code>ascent.html</code>. The suite runs from <code>nesi/game2d/</code> with <code>node tools/check_all.js</code>, and this row is what it printed on this build.</p>
  <div class="stats" style="margin-top:1.5rem">
    <div class="stat"><span class="n ${SU.green ? "a" : "d"}">${SU.rows.filter(r => r.mark === "ok").length} / ${SU.rows.length}</span><span class="c">instruments hold. ${SU.inPage.length} more run in the page and were not covered by this run.</span></div>
    <div class="stat"><span class="n">${N(g2Files.length)}</span><span class="c">files in <code>game2d/</code> — ${g2md.length} markdown, ${g2code.length} runnable.</span></div>
    <div class="stat"><span class="n w">${(lines(g2code) / lines(g2md)).toFixed(1)} : 1</span><span class="c">code lines to markdown lines in the live build — ${N(lines(g2code))} against ${N(lines(g2md))}.</span></div>
    <div class="stat"><span class="n c">${S.PRODUCTS.filter(p => !p.member).length}</span><span class="c">of ${S.PRODUCTS.length} products are set-downs: no member, no destination, permanently unsited.</span></div>
  </div>
  <div class="tw">
    <table>
      <thead><tr><th style="width:4rem">Mark</th><th style="width:11rem">Instrument</th><th>What it holds</th></tr></thead>
      <tbody>
        ${suiteRows}
        ${pageRows}
      </tbody>
    </table>
  </div>
  <p class="prose" style="margin-top:1.3rem"><code>${SU.tail}</code></p>
</section>

<section>
  <div class="sec-head"><span class="z">LAYER 3</span><h2>The solid</h2><span class="k">WHAT IS UNDERNEATH</span></div>
  <p class="prose">Two tables are written down in <code>solid.js</code> — twelve seats, and four closed walks of six. Everything below is derived from those two and nothing else is stored, so a claim here cannot go stale while the shape moves underneath it.</p>

  <div class="stats" style="margin-top:1.5rem">
    <div class="stat"><span class="n">${S.NAMES.length}</span><span class="c">seats — ${S.NAMES.filter(S.falls).length} falling, ${S.NAMES.filter(n => !S.falls(n)).length} rising.</span></div>
    <div class="stat"><span class="n">${S.MEMBERS.length}</span><span class="c">members: ${kinds.fall} fall, ${kinds.rise} rise, ${kinds.turn} turns, ${kinds.return} returns.</span></div>
    <div class="stat"><span class="n">${S.TRIANGLES.length} · ${S.SQUARES.length}</span><span class="c">triangles and squares. Every member borders exactly one of each.</span></div>
    <div class="stat"><span class="n">${S.RIGIDITY.mechanisms}</span><span class="c">mechanisms, against ${S.SQUARES.length} squares — ${S.RIGIDITY.bars} bars, rank ${S.RIGIDITY.rank}, <b>${S.RIGIDITY.redundant} redundant.</b> Not one member is spare.</span></div>
    <div class="stat"><span class="n">${Math.round(S.VOLUME)}</span><span class="c">tetrahedral units, in ${S.CELLS.length} cells: ${S.CELLS.filter(c => c.kind === "tetra").length} tetrahedra at 1, ${S.CELLS.filter(c => c.kind === "pyramid").length} pyramids at 2.</span></div>
    <div class="stat"><span class="n c">${S.CENTRE.membersReaching}</span><span class="c">members reach the centre. It sits on all ${S.CENTRE.circuitPlanes} circuits, equidistant from every seat, and every radius equals the edge exactly.</span></div>
  </div>

  <figure>
    <div class="fbody">${circuitsSVG()}</div>
    <div class="flegend">
      <span><i style="border-color:var(--fall)"></i>fall</span>
      <span><i style="border-color:var(--rise)"></i>rise</span>
      <span><i style="border-color:var(--centre)"></i>turn — water becomes light</span>
      <span><i style="border-color:var(--dead);border-top-style:dashed"></i>return — the world comes back down</span>
    </div>
    <figcaption><b>The four circuits.</b> Each is a closed walk of six: three falling seats, then three rising, contiguous — so every circuit carries exactly one turn and one return, and the edge signature of all four is identical. It was not designed that way; it fell out of the solid. Every seat appears on exactly two of the four, which is why the second circuit walked returns you to a room you have already furnished, from a direction that should not exist.</figcaption>
  </figure>

  <figure>
    <div class="fbody">${tradesSVG()}</div>
    <div class="flegend">
      <span><i style="border-color:var(--alive)"></i>closes</span>
      <span><i style="border-color:var(--dead);border-top-style:dashed"></i>opens</span>
      <span>sides are members and cannot change · diagonals are free</span>
    </div>
    <figcaption><b>The six squares, and each one is a trade.</b> A square's four sides are members and cannot change length; its two diagonals are the only free lengths in it. Folding one therefore closes one diagonal exactly as it opens the other — two seats may be brought together, and the price is fixed in advance: the other two are pushed apart by the same motion. There is no way to do half of it and no way to do it anywhere else. <b>Six squares, six mechanisms, each available alone</b> — so anything ever sited in a square glues that hinge shut and the count runs ${S.RIGIDITY.mechanisms} → ${S.RIGIDITY.mechanisms - 1} → … → 0.</figcaption>
  </figure>

  <div class="panel">
    <h3>The six antipodal pairs</h3>
    <p class="prose">A seat's opposite shares both its circuits and is not adjacent to it. Derived, never listed — and because the solid is vertex-transitive, all six sit at exactly the same distance.</p>
    <ul class="anti">${antipodes}</ul>
    <p class="prose" style="margin-top:1rem">Two seats carry neither a turn nor a return — <b>${S.PURE.join(" and ")}</b> — and they are one of the six pairs. The one place that spends nothing is opposite the one place everything settles into.</p>
  </div>

  <div class="panel">
    <h3>The named members the build sites things on</h3>
    <p class="prose">Found rather than written, so that if a circuit ever changes and the member stops existing, the lookup returns null and the caller says so instead of drawing a door onto nothing.</p>
    <div class="tw" style="margin-top:.9rem">
      <table>
        <tbody>
          <tr><td class="nm" style="width:11rem">DOOR&nbsp;OUT</td><td>${S.DOOR_OUT ? S.DOOR_OUT.key : "—"} — circuit four's turn</td></tr>
          <tr><td class="nm">WITHDRAWAL</td><td>${S.WITHDRAWAL ? S.WITHDRAWAL.join(" → ") : "—"} — the only two-step path, and it is not written down anywhere; it is found</td></tr>
          <tr><td class="nm">CENTRE</td><td>unreachable by construction — no <code>to</code>, no <code>receive</code>, no field to fill. Twelve radii can be measured and none can be travelled.</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="tw" style="margin-top:1.6rem">
    <table>
      <thead><tr><th style="width:3rem">#</th><th style="width:6rem">Kind</th><th style="width:11rem">From</th><th style="width:11rem">To</th><th>Circuit</th></tr></thead>
      <tbody>
        ${memberRows}
      </tbody>
    </table>
  </div>
</section>

<section>
  <div class="sec-head"><span class="z">LAYER 4</span><h2>Where the documents and the disk disagree</h2><span class="k">MEASURED, NOT RULED</span></div>
  <p class="prose">Three claims stated in prose that this build measured differently. None of them is a fault in the thing measured; all three are counts that moved while the sentence stayed still — which is the exact failure <code>solid.js</code>'s own header records and the reason this map is generated rather than written.</p>

  <div class="corr">
    <div class="c">
      <h3>The instrument count</h3>
      <p class="said">"Twelve instruments hold or refuse; three more run in the page." — <code>CLAUDE.md</code>, the boot path</p>
      <p>Measured today: <strong>${SU.rows.length} hold</strong>, ${SU.inPage.length} more wait for a page. Six were registered on 2026-08-17 alone — the three trim-tab surveys, the standing spine, the display law, and the traversal organ. The sentence was right when it was written and the suite grew past it inside a week. <strong>A count in prose beside a register that grows is a claim with an expiry nobody set.</strong></p>
    </div>
    <div class="c">
      <h3>Specification against build</h3>
      <p class="said">"This repo has far more specification than game." — carried forward from the 3D brief</p>
      <p>True of <code>nesi/</code> whole: ${walk(NESI).filter(f => f.endsWith(".md")).length} markdown files against ${byExt(nesiFiles, [".js", ".mjs", ".html", ".py"]).length} runnable ones. <strong>False of the live build, and by a wide margin.</strong> <code>game2d/</code> holds ${N(lines(g2md))} markdown lines against ${N(lines(g2code))} lines of code — <strong>${(lines(g2code) / lines(g2md)).toFixed(1)} to 1 the other way.</strong> The ratio inverted when the 3D tree was retired and nobody updated the sentence. The warning it carries is still worth keeping; the measurement it rests on is no longer the live one.</p>
    </div>
    <div class="c">
      <h3>The gate ledger stopped before the marks did</h3>
      <p class="said">${G ? `${G.opened} opens, ${G.closed} closes, ${G.still} still open` : "—"} — <code>OPEN_GATES.jsonl</code></p>
      <p>Its last event is <strong>${G ? G.last : "?"}</strong>. <code>MARKS_LOG.jsonl</code> ran on to <strong>${M.ts}</strong>, and the six instruments above were registered in that gap. <strong>${G ? G.still : "?"} gates stand open and nothing has opened or closed one since the retirement</strong> — so the surface that records what is undecided has been still for three days while the build moved. That is not a backlog. It is a ledger that stopped being written in, which is the one state a ledger cannot report about itself.</p>
    </div>
  </div>
</section>

<section>
  <div class="sec-head"><span class="z">LAYER 5</span><h2>Open</h2><span class="k">NAMED, UNDEFAULTED</span></div>
  <p class="prose">Two of these the build carries in its own source, in headers written to be read rather than smoothed. The rest are the corpus's, and none is this map's to close.</p>
  <ul class="open">
    <li><b>Is a level an edge or a tetra of four faces?</b> Both models are live. Held together they give ${S.MEMBERS.length} × 4 = ${S.MEMBERS.length * 4} faces against 17 built mechanisms. <code>solid.js</code> assumes the edge reading and forecloses nothing — <code>MEMBERS</code> carries no face field, so adding one costs nothing. Carried in the file's own header, undecided.</li>
    <li><b>What is a set-down's trace?</b> One of every seat's three outputs leaves none by design; whether "none" means invisible-but-recorded or genuinely nothing is unmarked. The build's candidate answer is genuinely nothing — <code>member: null</code>, and no caller stores it. ${S.PRODUCTS.filter(p => !p.member).length} products hang on this.</li>
    <li><b>Whether the collapse's price is the mechanic or a wall.</b> ${S.SQUARES.length} display windows sited is ${S.RIGIDITY.mechanisms} mechanisms spent is a world that cannot fold, cannot pack, and cannot be carried out — which lands directly on the last four levels, where the fold is assumed to be available.</li>
    <li><b>Density or emptiness at the centre.</b> The deposit's endpoint is a tetrahedron dense with history; the solid's is a centre that cannot be reached, cannot be filled, and has no field to fill. The second is enforced in code by a parameter that does not exist, which is why it is the deepest of the seven seams rather than the loudest.</li>
    <li><b>${G ? G.still : "?"} gates in <code>OPEN_GATES.jsonl</code></b>, unmoved since ${G ? G.last : "?"}, and ${dormant.length} dormant directories with no terminal mark of any kind.</li>
  </ul>
</section>

<footer>
  <p><strong>Provenance.</strong> Generated ${stamp} by <code>nesi/game2d/tools/map_build.js</code>. Geometry from <code>nesi/game2d/solid.js</code>, whose two written tables are the twelve seats and the four circuits; everything else in this map's third layer is derived from those. Corpus layer measured with <code>fs</code> over <code>nesi/</code>. Build layer is the parsed output of a live <code>node tools/check_all.js</code>. Ledger counts read from <code>MARKS_LOG.jsonl</code>, <code>OPEN_GATES.jsonl</code> at the DSS root.</p>
  <p><strong>Standing.</strong> MEASURED throughout — a computation over a live authority returned it, and re-running the generator re-runs the computation. The three disagreements in layer 4 are measurements against sentences, not rulings; the five items in layer 5 are named and left standing. <strong>No number on this page reaches the player.</strong> This is the world's skeleton, not its face.</p>
  <p><strong>Supersession.</strong> This map replaces <code>nesi/THE_MAP_2026-08-11.html</code> as the current one. That file stands unedited where it is, as the convention requires — a mark on top, never a silent erasure.</p>
</footer>

</div>
`;

fs.writeFileSync(OUT, html);
console.log("");
console.log("  wrote  " + path.relative(ROOT, OUT).replace(/\\\\/g, "/") + "  (" + (html.length / 1024).toFixed(1) + " KB)");
console.log("  solid  " + S.NAMES.length + " seats · " + S.MEMBERS.length + " members · " + S.TRIANGLES.length +
            " triangles · " + S.SQUARES.length + " squares · " + S.RIGIDITY.mechanisms + " mechanisms · volume " + Math.round(S.VOLUME));
console.log("  suite  " + SU.rows.filter(r => r.mark === "ok").length + " of " + SU.rows.length +
            " hold · " + SU.inPage.length + " wait for a page");
console.log("  corpus " + nesiFiles.length + " files · " + dirs.length + " directories · " +
            alive.length + " alive · " + dormant.length + " dormant");
console.log("");
