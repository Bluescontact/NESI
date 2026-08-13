#!/usr/bin/env node
/*
 * THE RUNNER — an unattended night that builds and never decides.
 *
 * Built 2026-08-13 on Kevin's mark "build the runner," from the four counsel
 * seats' converged reading of the 08-12/13 six-manifest run. Their sentence,
 * reached independently and in four vocabularies:
 *
 *     THE NIGHT MAY BUILD. IT MAY NOT DECIDE.
 *
 * Every gate below is a filesystem fact or a string match. None of them asks a
 * session to restrain itself — an exhortation is a rudder, and the run that
 * failed was made of six individually lawful passes. What changed is what is
 * CHEAP: continuing now requires a row that only his hand writes, a citation
 * that must resolve, and a declared cost that must not name another phase.
 *
 * THE GATES, in order, all fail closed:
 *
 *   G1 · S3, THE VISION SEAM. Every phase cites the articulation passage it
 *        serves — file and line. The runner opens the file and reads the line.
 *        Unresolvable, or empty, or out of range → the whole run is BLOCKED.
 *        Not minimized (PROTOCOLS.md, THE VISION SEAM, 2026-08-13).
 *
 *   G2 · COWAN'S SIBLING RULE. Every phase declares, in one line, what a NO on
 *        it would cost. If that line names another phase in the run, the phase
 *        is a rung, not a sibling, and unattended depth compounds error where
 *        unattended breadth does not. Refused.
 *
 *   G3 · COMPOSITE'S LAW. The order is scanned for decision verbs. A night that
 *        spends a fork bills the morning. A phase whose own order asks it to
 *        choose, decide, resolve or rule is refused before it runs.
 *
 *   G4 · FULLER'S TRIM TAB. A phase may not mark itself done. The precondition
 *        for the next phase is a row in PLAY_LOG.jsonl, written by his hand
 *        (tools/played.js), later than the previous phase's completion. If the
 *        row is absent the run HALTS AND SLEEPS. A missing row is not a verdict.
 *        This removes the interrupt without removing the check: the phases still
 *        run unattended, across as many nights as his hand takes.
 *
 *   G5 · THE WATER SEAM (S4). Every phase runs against a COPY of his real
 *        poured water. His store is hashed before and after and must be
 *        byte-identical, or the run stops on the spot.
 *
 *   G6 · PRESENCE-ASSERTING CHECKS. After each phase, the declared checks run.
 *        A blank screen passes every refusal, so a check that cannot see its
 *        subject must FAIL rather than pass. On failure the phase is reverted
 *        ALONE and the run continues to the next sibling — a NO costs one
 *        phase, never the night.
 *
 * THE MORNING IS A WALK, NOT A LOG. The run writes .night/morning.html: the
 * world itself, openable, with one line per phase beneath it. Six pass reports
 * to read is the debt composite named; a thing to open is the gift.
 *
 * Usage:
 *   node tools/runner.js --phases PHASES.json            run the night
 *   node tools/runner.js --phases PHASES.json --validate gates only, build nothing
 *   node tools/runner.js --phases PHASES.json --exec "<cmd>"   custom executor
 *   node tools/runner.js --status                        where the run stands
 *
 * The executor default is `claude --print`, given the order on stdin. The order
 * is the phase's own text and nothing is added to it.
 */
const fs = require("fs"), path = require("path"), crypto = require("crypto");
const { spawnSync } = require("child_process");

const G2D = path.join(__dirname, "..");
const ROOT = path.join(G2D, "..", "..");
const NIGHT = path.join(G2D, ".night");
const STATE = path.join(NIGHT, "state.json");
const PLAY = path.join(G2D, "PLAY_LOG.jsonl");
const WATER = path.join(G2D, "kevins-water.json");

const argv = process.argv.slice(2);
const has = f => argv.includes(f);
const val = f => { const i = argv.indexOf(f); return i === -1 ? null : argv[i + 1] || null; };

const say = s => console.log(s);
const sha = f => fs.existsSync(f) ? crypto.createHash("sha256").update(fs.readFileSync(f)).digest("hex") : null;

function readState() {
  if (!fs.existsSync(STATE)) return { phases: {} };
  try { return JSON.parse(fs.readFileSync(STATE, "utf8")); } catch (e) { return { phases: {} }; }
}
function writeState(s) {
  fs.mkdirSync(NIGHT, { recursive: true });
  fs.writeFileSync(STATE, JSON.stringify(s, null, 2), "utf8");
}
function playRows() {
  if (!fs.existsSync(PLAY)) return [];
  return fs.readFileSync(PLAY, "utf8").split("\n").filter(Boolean)
    .map(l => { try { return JSON.parse(l); } catch (e) { return null; } }).filter(Boolean);
}
function git(args, opts) {
  return spawnSync("git", args, Object.assign({ cwd: ROOT, encoding: "utf8" }, opts || {}));
}

/* ---------- G1 · the vision seam ------------------------------------------ */
function checkCitation(ph) {
  const c = ph.cites;
  if (!c || !c.file || !c.line) return "no `cites` — S3: a build order that cannot find a passage to cite has found something worth saying out loud";
  const f = path.join(ROOT, c.file);
  if (!fs.existsSync(f)) return "cites " + c.file + " — no such file";
  const lines = fs.readFileSync(f, "utf8").split("\n");
  if (c.line < 1 || c.line > lines.length) return "cites " + c.file + ":" + c.line + " — file has " + lines.length + " lines";
  const text = lines[c.line - 1].trim();
  if (!text) return "cites " + c.file + ":" + c.line + " — that line is empty";
  return { ok: true, text: text };
}

/* ---------- G2 · siblings, not ancestors ---------------------------------- */
function checkSibling(ph, allIds) {
  if (!ph.cost_of_no || !String(ph.cost_of_no).trim())
    return "no `cost_of_no` — cowan's line: declare what a NO on this phase would cost, before it builds";
  const s = String(ph.cost_of_no).toLowerCase();
  const named = allIds.filter(id => id !== ph.id && s.includes(String(id).toLowerCase()));
  if (named.length) return "its cost names " + named.join(", ") + " — that is a rung, not a sibling; unattended depth compounds error";
  if (/\b(the (five|four|three|two) after|everything after|all subsequent|the rest of the run)\b/.test(s))
    return "its cost is the phases after it — that is a rung, not a sibling";
  return { ok: true };
}

/* ---------- G3 · the night builds, it does not decide ---------------------- */
const DECIDE = [
  "decide", "decides", "decision", "choose", "chooses", "choice", "pick ", "picks ",
  "resolve the", "rule on", "rule which", "settle the fork", "whichever", "either way",
  "your call", "up to you", "select which", "determine which"
];
function checkNoDecision(ph) {
  const o = String(ph.order || "").toLowerCase();
  if (!o.trim()) return "no `order` — nothing to build";
  const hits = DECIDE.filter(w => o.includes(w));
  if (hits.length) return "its order contains " + hits.map(h => JSON.stringify(h.trim())).join(", ") +
    " — a night that spends a fork bills the morning; pre-mark it or leave it standing";
  return { ok: true };
}

/* ---------- G4 · fuller's trim tab ---------------------------------------- */
function playGate(prevDoneTs) {
  const rows = playRows();
  if (rows.length && rows[rows.length - 1].event === "stop")
    return { open: false, why: "a stop row is the last row in PLAY_LOG.jsonl" };
  const plays = rows.filter(r => r.event === "played");
  if (!plays.length)
    return { open: false, why: "PLAY_LOG.jsonl holds no play row — the want-check gate of 2026-08-13 is still open, and it is not the runner's to close" };
  const last = plays[plays.length - 1].ts;
  if (!prevDoneTs) return { open: true, why: "last play " + last };
  if (new Date(last) > new Date(prevDoneTs)) return { open: true, why: "played " + last + " after the previous phase landed " + prevDoneTs };
  return { open: false, why: "the last play (" + last + ") is older than the previous phase (" + prevDoneTs + ") — the run sleeps until his hand writes a row" };
}

/* ---------- G6 · the checks ----------------------------------------------- */
function runChecks(names) {
  const out = [];
  for (const n of names) {
    const f = path.join(G2D, "tools", n);
    if (!fs.existsSync(f)) { out.push({ name: n, ok: false, detail: "no such check" }); continue; }
    const r = spawnSync("node", [f], { cwd: G2D, encoding: "utf8" });
    out.push({ name: n, ok: r.status === 0, detail: (r.stdout || "").trim().split("\n").pop() || ("exit " + r.status) });
  }
  return out;
}

/* ---------- the morning artifact ------------------------------------------ */
function writeMorning(phases, state) {
  fs.mkdirSync(NIGHT, { recursive: true });
  const rows = phases.map(p => {
    const s = state.phases[p.id] || {};
    const stands = s.status === "stands";
    return `<li class="${stands ? "s" : "r"}"><b>${p.id}</b> — ${stands ? "stands" : (s.status || "not run")}` +
      (s.commit ? ` <code>${s.commit}</code>` : "") +
      `<div class="c">${p.cost_of_no || ""}</div></li>`;
  }).join("\n");
  const html = `<!doctype html><meta charset="utf-8"><title>the morning</title>
<style>body{background:#f7f5f0;color:#2a2620;font:15px/1.6 -apple-system,Segoe UI,sans-serif;margin:0;padding:0}
.w{height:72vh;border:0;width:100%;display:block}
.b{max-width:820px;margin:0 auto;padding:18px 22px}
ul{list-style:none;padding:0}li{border-bottom:1px solid #ddd6c8;padding:9px 0;font-size:14px}
li.r{color:#8a8172}.c{color:#6b6355;font-size:12.5px;margin-top:2px}
code{background:#f1ede4;padding:1px 4px;border-radius:2px;font:12px ui-monospace,Consolas,monospace}
p{color:#6b6355;font-size:13px}</style>
<iframe class="w" src="../world.html"></iframe>
<div class="b"><p>The world is above. Walk it first — what follows is a receipt, not a report.</p>
<ul>${rows}</ul>
<p>Nothing here asks you for anything. When you have walked it: <code>node tools/played.js</code></p></div>`;
  fs.writeFileSync(path.join(NIGHT, "morning.html"), html, "utf8");
  return path.join(NIGHT, "morning.html");
}

/* ---------- main ----------------------------------------------------------- */
if (has("--status")) {
  const st = readState();
  const rows = playRows();
  say("[runner] phases recorded: " + Object.keys(st.phases).length);
  for (const [id, s] of Object.entries(st.phases)) say("  " + id + "  " + s.status + "  " + (s.ts || ""));
  const plays = rows.filter(r => r.event === "played");
  say("[runner] last play: " + (plays.length ? plays[plays.length - 1].ts : "none"));
  say("[runner] " + (rows.length && rows[rows.length - 1].event === "stop" ? "STOPPED by a stop row" : "not stopped"));
  process.exit(0);
}

const phasesFile = val("--phases");
if (!phasesFile) { say("usage: node tools/runner.js --phases PHASES.json [--validate] [--exec \"<cmd>\"]"); process.exit(2); }
const spec = JSON.parse(fs.readFileSync(path.isAbsolute(phasesFile) ? phasesFile : path.join(G2D, phasesFile), "utf8"));
const phases = spec.phases || [];
const ids = phases.map(p => p.id);
const executor = val("--exec") || spec.executor || "claude --print";

say("[runner] " + phases.length + " phases · executor: " + JSON.stringify(executor));
say("[runner] gates: S3 citation · sibling rule · no-decision · play row · water seam · presence checks\n");

/* --- validate every phase before ANY of them runs. Fail closed, whole run. -- */
let blocked = 0;
for (const p of phases) {
  const cite = checkCitation(p), sib = checkSibling(p, ids), dec = checkNoDecision(p);
  for (const [g, r] of [["G1 cites", cite], ["G2 sibling", sib], ["G3 builds-not-decides", dec]]) {
    if (r.ok) say("  ok   " + p.id + " " + g + (r.text ? "   [" + r.text.slice(0, 90) + "]" : ""));
    else { blocked++; say("  BLOCKED " + p.id + " " + g + "   [" + r + "]"); }
  }
}
if (blocked) {
  say("\n[runner] BLOCKED — " + blocked + " gate(s). Divergence from the cited vision is blocked, not minimized.");
  say("[runner] Nothing ran. No file was touched.");
  process.exit(1);
}
say("\n[runner] all phases pass the pre-gates.");

if (has("--validate")) { say("[runner] --validate: stopping here by request. Nothing built."); process.exit(0); }

/* --- G0 · a clean tree, so that each phase's commit is that phase alone ----
 * cowan's rule needs a NO to cost one phase. That is only true if the commit
 * the runner makes contains the phase's work and nothing else. An unrelated
 * edit sitting in the tree at midnight would be swept into the first phase's
 * commit and reverted with it. Refused, not warned about. --dry is exempt: a
 * rehearsal commits nothing. */
if (!has("--dry")) {
  const dirty = git(["status", "--porcelain"]).stdout.trim();
  if (dirty) {
    say("[runner] BLOCKED — the working tree is not clean. Each phase must commit alone, and an\n" +
        "          unrelated edit would be swept into the first phase's commit and reverted with it.");
    say(dirty.split("\n").map(l => "          " + l).join("\n"));
    say("[runner] Nothing ran. Commit or stash, then start the night.");
    process.exit(1);
  }
}

/* --- the water seam, before anything runs --------------------------------- */
const waterBefore = sha(WATER);
if (!waterBefore) { say("[runner] BLOCKED — kevins-water.json not found; a build that drops the writing fails its own walk (S4)."); process.exit(1); }
fs.mkdirSync(NIGHT, { recursive: true });
fs.copyFileSync(WATER, path.join(NIGHT, "water.copy.json"));
say("[runner] S4: his water copied to .night/water.copy.json; his store will be verified untouched.");

/* --- the run --------------------------------------------------------------- */
const state = readState();
let prevDone = null;
for (const id of ids) { const s = state.phases[id]; if (s && s.status === "stands") prevDone = s.ts; }

for (const p of phases) {
  if (state.phases[p.id] && state.phases[p.id].status === "stands") { say("\n[" + p.id + "] already stands — skipping."); continue; }

  const gate = playGate(prevDone);
  if (!gate.open) {
    say("\n[" + p.id + "] HALT AND SLEEP — " + gate.why);
    say("[runner] A missing row is not a verdict. The run stops here and keeps its place.");
    break;
  }
  say("\n[" + p.id + "] play gate open — " + gate.why);

  if (has("--dry")) {
    say("[" + p.id + "] --dry: would run the executor on its order (" + p.order.length + " chars), then " +
        (p.checks || []).join(", ") + ", then commit alone.");
    say("[" + p.id + "] --dry: nothing spawned, nothing committed, no rollback exercised.");
    state.phases[p.id] = { status: "dry", ts: new Date().toISOString() };
    writeState(state);
    prevDone = state.phases[p.id].ts;   /* mirrors the real run: the next phase now needs a NEWER play row */
    continue;
  }

  const r = spawnSync(executor, { shell: true, input: p.order, encoding: "utf8", cwd: ROOT, stdio: ["pipe", "inherit", "inherit"] });
  const ranOk = r.status === 0;

  if (sha(WATER) !== waterBefore) {
    say("[" + p.id + "] STOP — his water store changed during the phase. S4 forbids it. Run halted, nothing further.");
    process.exit(1);
  }

  const checks = ranOk ? runChecks(p.checks || []) : [];
  for (const c of checks) say("   " + (c.ok ? "ok  " : "FAIL") + " " + c.name + "   [" + c.detail + "]");
  const passed = ranOk && checks.every(c => c.ok) && (p.checks || []).length > 0;

  git(["add", "-A"]);
  /* If the phase changed nothing there is nothing to commit — and committing
   * anyway would leave HEAD pointing at an UNRELATED commit, which the rollback
   * below would then revert. That is the one way this runner could destroy work
   * it never touched, so it is checked rather than assumed. */
  const staged = git(["diff", "--cached", "--name-only"]).stdout.trim();
  if (!staged) {
    say("[" + p.id + "] the phase changed no file. Nothing committed, nothing to roll back.");
    state.phases[p.id] = { status: "empty", ts: new Date().toISOString() };
    writeState(state);
    continue;
  }
  const msg = (passed ? "" : "REVERTED: ") + "night/" + p.id + " — " + (p.title || "");
  git(["commit", "-m", msg, "-m", "cites " + p.cites.file + ":" + p.cites.line]);
  const commit = git(["rev-parse", "--short", "HEAD"]).stdout.trim();

  if (!passed) {
    say("[" + p.id + "] rolled back — a NO costs this phase, never the night.");
    git(["revert", "--no-edit", commit]);
    state.phases[p.id] = { status: "reverted", ts: new Date().toISOString(), commit: commit };
  } else {
    say("[" + p.id + "] stands — " + commit);
    state.phases[p.id] = { status: "stands", ts: new Date().toISOString(), commit: commit };
    prevDone = state.phases[p.id].ts;
  }
  writeState(state);
}

const m = writeMorning(phases, state);
say("\n[runner] the morning is a walk: " + m);
say("[runner] his water: " + (sha(WATER) === waterBefore ? "byte-identical, untouched" : "CHANGED — this is a breach"));
