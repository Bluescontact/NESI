#!/usr/bin/env node
/* ═══ THE ROUTE MAP ════════════════════════════════════════════════════════════
 * Built 2026-08-16 on the keeper's order, before a new GitHub repo is handed over:
 * "build a harness that understands the complete tool, and functionalities, and
 * how those route within the container and workspace held by github."
 *
 * WHAT IT ANSWERS, and it is three questions rather than one:
 *
 *   1 · WHAT EXISTS      every functional surface in the workspace
 *   2 · WHERE IT ROUTES  in the geometry — which of the twelve seats
 *   3 · WHETHER IT CROSSES  into the workspace GitHub actually holds
 *
 * The third is the one nothing else here asks. This working directory is NOT
 * the repository. `.gitignore` carries a staged-worktree scoping (the keeper's mark,
 * 2026-08-11): `/*` ignored, then a short list of exceptions, so that legal,
 * financial and personal material at the DSS root can never be swept in by an
 * `git add -A`. A capability can therefore be LIVE in the geometry and OUTSIDE
 * the repository at the same time — NESI.html at the root is exactly that, 653KB
 * carrying 5,081 verbatim entries, ignored by the `/*` rule.
 *
 * ── IT NEVER INFERS A SEAT ────────────────────────────────────────────────────
 * Law 5: the operator's hand runs the filter. A classifier that guessed which
 * seat a file belongs to would be the thing the law refuses, wearing a harness.
 * So a file ROUTES only if it says so, in its own text — the marker, then either
 * one of the twelve seat names from solid.js, or the word for no seat at all,
 * which is a real answer rather than an absence:
 *
 *      @seat <ONE OF THE TWELVE>
 *      @seat <THE WORD NONE>
 *
 * The examples are written in brackets ON PURPOSE. The first run of this file
 * reported ITSELF routed to TANK, because its own documentation matched its own
 * reader. A convention demonstrated literally in the file that enforces it is a
 * file that declares itself, and the map said so on line one.
 *
 * Everything undeclared is reported UNROUTED. The unrouted count is the work,
 * and it is meant to fall as the keeper routes, never as this file gets cleverer.
 *
 * @seat none
 * — this harness reads the geometry; it does not sit in it.
 *
 * ── IT ASKS GIT RATHER THAN REIMPLEMENTING IT ─────────────────────────────────
 * Ignore status comes from `git check-ignore` and tracked status from
 * `git ls-files`. A hand-rolled .gitignore parser would drift from the real one
 * and the drift would be invisible — and this is the file whose whole job is to
 * say what crosses a membrane.
 *
 *   node tools/route_map.js           the map
 *   node tools/route_map.js --json    the same, for another instrument
 *   node tools/route_map.js --cross   the membrane report alone
 *
 * Exit code is 0 for a clean read and 1 only if it could not read — never
 * because the map showed something unrouted. Unrouted is a state, not a fault.
 */
"use strict";
const fs = require("fs"), path = require("path"), cp = require("child_process");

/* ── find the repo root by walking up to .git, never by assuming a depth ───── */
const ROOT = (() => {
  let d = __dirname;
  for (let i = 0; i < 12; i++) {
    if (fs.existsSync(path.join(d, ".git"))) return d;
    const up = path.dirname(d); if (up === d) break; d = up;
  }
  return null;
})();
if (!ROOT) { console.error("route_map: no .git found above " + __dirname); process.exit(1); }

const rel = p => path.relative(ROOT, p).split(path.sep).join("/");
const git = (args, input) => {
  try {
    return cp.execFileSync("git", ["-C", ROOT, ...args],
      { input, encoding: "utf8", maxBuffer: 64 << 20, stdio: ["pipe","pipe","pipe"] });
  } catch (e) { return (e.stdout || ""); }   /* check-ignore exits 1 when nothing matches */
};

/* ── 1 · WHAT EXISTS ──────────────────────────────────────────────────────────
   A bounded walk. .git and node_modules are skipped as machinery; everything
   else is looked at, including the parts that do not cross, because "what is
   outside the repo" is half of what this file reports. */
const SKIP = new Set([".git", "node_modules", "__pycache__", ".venv"]);
const files = [];
(function walk(dir, depth) {
  if (depth > 7) return;
  let ents; try { ents = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const e of ents) {
    if (SKIP.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, depth + 1);
    else if (e.isFile()) files.push(full);
  }
})(ROOT, 0);

/* WHAT COUNTS AS A CAPABILITY. Named rather than inferred: a surface a hand can
   open, an instrument that can be run, a seat that can be invoked, a skill that
   can be called. A .md that is only prose is a record, not a capability, and is
   counted separately so the map does not inflate. */
function kindOf(p) {
  const r = rel(p), b = path.basename(p);
  if (/^\.claude\/agents\/.+\.md$/.test(r))            return "seat";
  if (/^\.claude\/skills\/.+\/SKILL\.md$/.test(r))     return "skill";
  if (/\/tools\/[^/]+\.(js|py)$/.test(r))              return "instrument";
  if (/\.html$/.test(r))                               return "surface";
  if (/\.(js|py)$/.test(r) && !/\/tools\//.test(r))    return "module";
  if (/\.jsonl$/.test(r))                              return "ledger";
  return null;
}

/* ── 2 · WHERE IT ROUTES ─────────────────────────────────────────────────────
   The twelve come from solid.js, so this file writes no seat names of its own.
   If solid.js cannot be loaded the map REFUSES rather than falling back to a
   literal — the same rule seats.js states about its own deriver. */
let SEATS;
try { SEATS = require(path.join(__dirname, "..", "solid.js")).NAMES; }
catch (e) { console.error("route_map: cannot load solid.js — refusing to name the seats from memory."); process.exit(1); }
const SEATSET = new Set(SEATS);

const DECL = /@seat\s+([A-Za-z]+)/;          /* the only routing input there is */

/* ── 3 · WHETHER IT CROSSES ──────────────────────────────────────────────────
   Two git questions, each asked once for the whole set rather than per file. */
const tracked = new Set(git(["ls-files"]).split("\n").filter(Boolean));
const ignored = new Set(
  git(["check-ignore", "--stdin"], files.map(rel).join("\n")).split("\n").filter(Boolean));

/* The secrets block at the head of .gitignore is not merely "ignored" — it is
   named there as material that must never cross. Read from the file so the list
   cannot drift from the rule that enforces it. */
const SECRET = (() => {
  const gi = fs.existsSync(path.join(ROOT, ".gitignore"))
    ? fs.readFileSync(path.join(ROOT, ".gitignore"), "utf8") : "";
  const head = gi.split(/\n#\s*Runtime/)[0];      /* everything above "Runtime / generated" */
  return head.split("\n").map(s => s.trim())
    .filter(s => s && !s.startsWith("#")).map(s => s.replace(/\/$/, ""));
})();
const isSecret = r => SECRET.some(s => r === s || r.startsWith(s + "/"));

function stratumOf(r) {
  if (isSecret(r))                                    return "secret";
  if (/^\.claude\/worktrees\//.test(r))               return "worktree";
  if (/(^|\/)world3d\//.test(r) || /\/retired\//.test(r)) return "retired";
  if (tracked.has(r))                                 return "tracked";
  if (ignored.has(r))                                 return "outside";
  return "untracked";      /* inside the fence, not yet committed — would cross on add */
}

/* ── REACHABILITY, walked from the front door rather than assumed ────────────
   A capability nothing points at is not necessarily dead — but it is not
   reachable, and the slice rule cares about that. Followed: href, src, require,
   location.replace, and <script src>. One hop set, iterated to fixpoint. */
const DOOR = "nesi/game2d/index.html";
const byRel = new Map(files.map(p => [rel(p), p]));
const reached = new Set();
(function reach(start) {
  if (!byRel.has(start)) return;
  const q = [start];
  while (q.length) {
    const r = q.shift();
    if (reached.has(r)) continue;
    reached.add(r);
    let txt = ""; try { txt = fs.readFileSync(byRel.get(r), "utf8"); } catch { continue; }
    if (txt.length > 4 << 20) continue;
    const dir = path.posix.dirname(r);
    const refs = [...txt.matchAll(/(?:href|src)\s*=\s*["']([^"'#?]+)["']|location\.replace\(["']([^"']+)["']\)|require\(["']([^"']+)["']\)/g)]
      .map(m => m[1] || m[2] || m[3]).filter(Boolean)
      .filter(u => !/^(https?:|data:|mailto:|\/\/)/.test(u));
    for (const u of refs) {
      let t = path.posix.normalize(path.posix.join(dir, u));
      if (byRel.has(t)) q.push(t);
      else if (byRel.has(t + ".js")) q.push(t + ".js");
    }
  }
})(DOOR);

/* ── build the map ───────────────────────────────────────────────────────────*/
const MAP = [];
for (const p of files) {
  const kind = kindOf(p); if (!kind) continue;
  const r = rel(p);
  const st = stratumOf(r);
  let seat = null, bad = null;
  if (st !== "secret") {
    let head = ""; try { head = fs.readFileSync(p, "utf8").slice(0, 4000); } catch {}
    const m = head.match(DECL);
    if (m) {
      const n = m[1].toUpperCase();
      if (n === "NONE") seat = "none";
      else if (SEATSET.has(n)) seat = n;
      else bad = m[1];                    /* declared a seat the solid does not have */
    }
  }
  MAP.push({ path: r, kind, stratum: st, seat, bad, reachable: reached.has(r),
             bytes: (()=>{ try { return fs.statSync(p).size; } catch { return 0; } })() });
}

/* ── report ──────────────────────────────────────────────────────────────────*/
const ARG = process.argv.slice(2);
if (ARG.includes("--json")) { console.log(JSON.stringify({ root: ROOT, seats: SEATS, map: MAP }, null, 2)); process.exit(0); }

const by = (k, v) => MAP.filter(m => m[k] === v);
const count = k => [...new Set(MAP.map(m => m[k]))].sort()
  .map(v => `${v} ${MAP.filter(m => m[k] === v).length}`).join("  ·  ");
const kb = n => (n / 1024).toFixed(0) + "K";
const L = s => console.log(s);

L("");
L("THE ROUTE MAP  ·  " + ROOT);
L("=".repeat(78));
L("");
L("  capabilities  " + MAP.length);
L("  by kind       " + count("kind"));
L("  by stratum    " + count("stratum"));
L("");

/* ── the membrane: what the workspace GitHub holds actually contains ──────── */
L("THE MEMBRANE — what crosses into the repository");
L("-".repeat(78));
const crossing = MAP.filter(m => m.stratum === "tracked");
const willCross = MAP.filter(m => m.stratum === "untracked");
const held     = MAP.filter(m => m.stratum === "outside" || m.stratum === "secret");
L(`  crosses now .......... ${crossing.length}`);
L(`  would cross on add ... ${willCross.length}` + (willCross.length ? "   ← not yet committed" : ""));
L(`  held outside ......... ${held.length}`);
if (by("stratum", "secret").length) {
  L("");
  L("  NEVER CROSSES, by the .gitignore's own secrets block:");
  by("stratum", "secret").forEach(m => L(`    · ${m.path}`));
}
L("");

/* THE CONFLICT THIS FILE EXISTS TO FIND: live capability outside the repo — a
   thing a hand can open that a clone would not contain.

   IT DOES NOT JUDGE WHICH OF THE 1,100 MATTER. Sorting archive from live would
   be a classifier, and the first draft of this block was one: it hand-listed
   patterns it thought were compost and called the rest significant. Two facts
   are used instead, and both are facts rather than readings — a capability at
   the REPO ROOT (nothing above it to explain it away), and one TOUCHED IN THE
   LAST SEVEN DAYS (whatever it is, it is in use). Everything else is counted by
   zone and not listed. */
const out = MAP.filter(m => m.stratum === "outside" && m.kind !== "ledger");
if (out.length) {
  L("HELD OUTSIDE THE REPOSITORY — by zone");
  L("-".repeat(78));
  const zones = {};
  out.forEach(m => { const z = m.path.includes("/") ? m.path.split("/")[0] + "/" : "(repo root)";
    (zones[z] = zones[z] || { n: 0, b: 0 }).n++; zones[z].b += m.bytes; });
  Object.entries(zones).sort((a, b) => b[1].b - a[1].b).slice(0, 12)
    .forEach(([z, v]) => L(`  ${String(v.n).padStart(5)}  ${kb(v.b).padStart(7)}  ${z}`));
  const shown = Object.keys(zones).length;
  if (shown > 12) L(`  … and ${shown - 12} more zones`);
  L("");

  const WEEK = Date.now() - 7 * 864e5;
  const notable = out.filter(m => {
    if (m.kind !== "surface" && m.kind !== "instrument" && m.kind !== "module") return false;
    const atRoot = !m.path.includes("/");
    let recent = false;
    try { recent = fs.statSync(path.join(ROOT, m.path)).mtimeMs > WEEK; } catch {}
    return atRoot || recent;
  });
  if (notable.length) {
    L("  AT THE ROOT, OR TOUCHED IN THE LAST SEVEN DAYS  ← a clone would not have these");
    notable.sort((a, b) => b.bytes - a.bytes).slice(0, 20).forEach(m => {
      let d = ""; try { d = new Date(fs.statSync(path.join(ROOT, m.path)).mtimeMs)
        .toISOString().slice(0, 10); } catch {}
      L(`    ${kb(m.bytes).padStart(6)}  ${d}  ${m.path}`);
    });
    if (notable.length > 20) L(`    … and ${notable.length - 20} more`);
  }
  L("");
}
if (ARG.includes("--cross")) process.exit(0);

/* ── routing into the geometry ───────────────────────────────────────────── */
L("ROUTED INTO THE GEOMETRY — declared by hand, never inferred");
L("-".repeat(78));
const routed = MAP.filter(m => m.seat && m.seat !== "none");
if (!routed.length) L("  nothing declares a seat yet.");
SEATS.forEach(s => {
  const at = routed.filter(m => m.seat === s);
  if (at.length) L(`  ${s.padEnd(15)} ${at.map(m => m.path).join("\n" + " ".repeat(18))}`);
});
const none = MAP.filter(m => m.seat === "none");
if (none.length) L(`  (declared seatless: ${none.length})`);
L("");

L("UNROUTED — exists, works, sits at no seat");
L("-".repeat(78));
const unrouted = MAP.filter(m => !m.seat && m.stratum !== "secret" && m.stratum !== "retired" && m.stratum !== "worktree");
L(`  ${unrouted.length} of ${MAP.length}. This number is the work; it falls when the keeper routes, not when this file gets cleverer.`);
["surface","instrument","skill","seat","module"].forEach(k => {
  const at = unrouted.filter(m => m.kind === k);
  if (at.length) L(`    ${k.padEnd(11)} ${at.length}`);
});
L("");

const bad = MAP.filter(m => m.bad);
if (bad.length) {
  L("DECLARED A SEAT THE SOLID DOES NOT HAVE");
  L("-".repeat(78));
  bad.forEach(m => L(`  ${m.path}  →  @seat ${m.bad}`));
  L("");
}

L("UNREACHABLE FROM THE FRONT DOOR  (" + DOOR + ")");
L("-".repeat(78));
const unreach = MAP.filter(m => !m.reachable && (m.kind === "surface" || m.kind === "module")
  && m.stratum !== "retired" && m.stratum !== "worktree" && !/_compost|quarantine|_widgets|coldwalk/.test(m.path));
L(`  ${unreach.length} surfaces and modules. Unreachable is not dead — but the slice rule counts it.`);
unreach.sort((a,b)=>b.bytes-a.bytes).slice(0,12)
  .forEach(m => L(`  ${kb(m.bytes).padStart(6)}  ${m.path}`));
if (unreach.length > 12) L(`  … and ${unreach.length - 12} more`);
L("");
L("=".repeat(78));
L("The map orders nothing. A seat is declared with `@seat <NAME>` in the file's");
L("own text, or `@seat none`. Undeclared is a complete state.");
L("");
