#!/usr/bin/env node
/* CHECK ALL — every instrument, one exit code.
 *
 * WHY IT EXISTS: I ran the store guard, it threw "window is not defined", I
 * piped it through `tail -2`, read the last line, and committed. The crash
 * looked exactly like output. Eight instruments passing means nothing if the
 * ninth's failure can be mistaken for a line of text.
 *
 * So there is one front door. It runs every node instrument, prints one row
 * each, and exits non-zero if ANY of them fails — including by crashing, which
 * is reported as CRASH rather than folded into FAIL, because a broken
 * instrument and a broken build need different hands.
 *
 * PRESENCE-ASSERTING, like everything else here (game-craft, 2026-08-13): it
 * refuses if it finds FEWER live instruments than it knows about. A run that
 * checks nothing must not print green.
 *
 *   node tools/check_all.js
 */
"use strict";
const { execFileSync } = require("child_process");
const fs = require("fs"), path = require("path");
const HERE = __dirname;

/* THE LIVE INSTRUMENTS — each one reads the build a hand actually walks.
   Named here rather than globbed: a glob would silently shrink if a file were
   renamed, and print green over the gap. */
const NODE = [
  ["refusal_check",   "no model call, nothing outward, no score or reward cue"],
  /* kit_check, constraint_lint, first_four, cut_check, conserve_stations,
     conserve_seating — RETIRED 2026-08-21 to tools/retired/, same pass
     ascent.html was rebuilt from scratch (Kevin's mark: "cut the ascent
     entirely"). They tested GESTURES/CONSTRAINTS/FACES.json content the
     rebuild dropped on purpose, not an interface that merely changed shape.
     See tools/retired/RETIRED.md's own "second wave" note. */
  ["door_check",      "every level reachable from the map"],
  ["world_check",     "the figure drawn IS the solid"],
  ["solid_check",     "the solid's own arithmetic"],
  ["hand_check",      "the bed's own arithmetic — conserved, deterministic, and it holds"],
  ["scope_check",     "every instrument reads the live build"],
  /* REGISTERED 2026-08-17 on Kevin's "close all three gaps", after the trim-tab
     audit found these three built, working, and running only when a hand typed
     them. The gesture map is the tab that sites every organ — commons and gate —
     onto the twelve seats; it had no automatic channel, which is the exact shape
     law 22 names. Registering them puts the channel in the suite.
     They REPORT rather than refuse: each exits 0 today and says what it found.
     That is honest for a map, and it is also why they sit at the end of the
     list — a reader must be able to tell a gate from a survey. */
  ["organ_map",       "27 organs sited by gesture, and the sockets still open"],
  ["organ_audit",     "what each organ would cost the build if it were taken in"],
  ["crossing_audit",  "what may leave the world, and what stays"],
  /* REGISTERED 2026-08-17 on Kevin's mark, "build the truth-bearing spine
     first, not TANK." It REPORTS on lost support and REFUSES on misfiling —
     see its header for why those are the right way round. A claim that has lost
     its support must not turn the suite red, because the cheapest way back to
     green would be deleting the claim, and the silent rewrite is the thing the
     spine exists to prevent. */
  ["standing_check",  "what kind of standing a claim has, and what keeps it standing"],
  /* REGISTERED 2026-08-17 on Kevin's mark, "traversal is a fourth source — add
     it to the display law." The display law had never lived in code. It is
     stated in prose in three files and NOTHING asserted the copies agreed —
     amending it turned up a drift of one word already sitting there. This one
     DISCOVERS its statements instead of listing them, so it cannot go stale the
     way a hand-maintained list does. It refuses. */
  ["display_law_check","one law, stated in three places, and the copies agree"],
  /* REGISTERED 2026-08-17 on Kevin's mark, "build the traversal organ." It
     refuses on the two ways the display law's fourth source can be defeated: the
     record acquiring a return's content, and a surface label acquiring
     properties. Both are asserted against the source rather than asked for in a
     comment, and both were control-tested the day they were written. */
  ["traversal_check", "the fourth source stays the fourth"],
  /* REGISTERED 2026-08-17 on Kevin's "build the instrument first", after he read
     a response of mine and saw negative assertion across the whole of it. His
     framing law has been in the boot path since that morning and NOTHING READ
     IT. Every other instrument here tests whether a claim is TRUE; a true
     sentence in negative form passes all of them and still narrows the aperture,
     which is how one section sat at 41 per thousand through an adversarial
     audit, a ground pass and a full converge.
     It REFUSES on structure — the law on disk, a section declaring itself — and
     REPORTS the inversions, because a red suite would reward deleting words. */
  ["framing_check",   "negative form sits in a lint or at an edge, never in the prose"],
  /* conserve_stations, conserve_seating — RETIRED 2026-08-21 alongside the
     rest of the second wave, above: both conserved material specific to
     THE STATIONS'/THE SEATING's own retired ROOMS-era mechanics, neither of
     which exists in the rebuilt ascent.html. hand_check's own conservation
     (the terrain bed) is untouched and still runs. */
  /* REGISTERED 2026-08-19, threshold-sweep's first run (see the two
     conserve_* entries above for conservation-harness's). REPORTS on feel
     (Kevin's fork, never defaulted here) and REFUSES only where a
     threshold's real measured behavior would contradict its own claimed
     number — the same standard organ_map/organ_audit already hold to.
     TRIMMED 2026-08-21: its own S1-S3 (hold/draw/wait as generic verbs)
     tested the retired GESTURES vocabulary; S4-S5 (seam.js's own
     sillMechanic/growRoot) are untouched and still the whole of what it
     checks now — see its own header. */
  ["sweep_thresholds", "two feel constants swept for feel, one geometry check swept for correctness and fixed"],
  /* REGISTERED 2026-08-20 on Kevin's mark, closing a fact-lens gap the
     process-geometry reconciliation pass found: "zero dependencies, ever"
     (THE_BUILD_SHAPE.md, THE_KIT.md, THE_HAND_FROM_THE_COMMONS.md) was
     standing law with nothing checking it. Now something does. */
  ["zero_dependencies_check", "no package.json, no node_modules, no remote script/fetch/import — a fact, not a claim"],
  /* REGISTERED 2026-08-25 on Kevin's mark, "build all three," closing a gap a
     reconciliation pass named: "only Kevin's click marks land in a marks
     ledger" was checked once by hand and true, with nothing keeping it true
     as tools accumulate. Now something does. */
  ["marks_guard_check", "only a hand's click writes to a marks ledger — a fact, not a claim"],
];

/* assertion_audit.py and its own upstream, seats.js — RETIRED 2026-08-21,
   third wave, to tools/retired/. Both ran entirely on ascent.html's old
   SET table (the GESTURES-era per-seat stage bodies), which the rebuild
   dropped. See tools/retired/RETIRED.md's own "third wave" note. */
const PY = [];

/* THE PREDICATE FILTER, REGISTERED 2026-08-16 on Kevin's "save the filter to be
   persistent." It is ESM (.mjs) so it gets its own row rather than being folded
   into NODE and silently skipped by the .js path.
   IT IS HERE BECAUSE IT WENT MISSING ONCE. `nesiseed`'s filter did not exist in
   this corpus while COVERAGE.md quoted its numbers as the authority on what the
   build reaches and THE_BUILD_SHAPE.md:93 asserted it had been run. A
   measurement with no instrument. This register is presence-asserting — it
   refuses if it finds fewer instruments than it knows about — so from now on
   the filter cannot vanish quietly a second time. */
const ESM = [
  ["predicate_filter", "EXISTS, MENTIONED and REACHABLE kept apart — a mention is not a route"],
];

/* THE GATE, REGISTERED 2026-08-17 on Kevin's mark, "wire it into check_all."
   It is not in tools/ and it is not one more instrument. It is a second
   jurisdiction with its own runner, its own ledger and its own verdict grammar,
   sited at ../gate/. It gets a row here so the build has ONE front door rather
   than two, which is this file's whole reason for existing.

   ── ITS THIRD EXIT CODE GETS ITS OWN WORD, AND THAT IS NOT FUSSINESS ────────
   The gate exits 0 when every active instrument examined something and held,
   1 when one refused, and 3 when one EXAMINED NOTHING. Three is the verdict
   this suite had no word for. Folding it into FAIL would report a breach where
   none was looked for; folding it into ok is the exact false green the gate was
   built to prevent — LEARNED 4, a blank screen passes every refusal test. So it
   is reported as THIN, on the reasoning this file already applies to CRASH: an
   instrument that checked nothing and one that checked everything and found a
   breach need different hands. THIN counts against the run.

   ── IT CARRIES ITS OWN WORDS UP, INCLUDING THE YES ──────────────────────────
   The gate's output is relayed verbatim, never re-judged here: its `made
   possible` lines whenever something landed, and its verdict line whenever it
   does not hold. Nothing in this file re-implements the reading. The admissions
   print FIRST, for the same reason the gate prints them first — a summary that
   opens with failures teaches its reader that the best available outcome is
   nothing going wrong. */
const GATE = [
  ["gate", "gate/gate.mjs", "what the build made possible, and what it refuses to call progress"],
];

/* THE ONES THAT RUN IN THE PAGE. Not failures, and not silence either — a hand
   reading this list must be able to see what was NOT covered by this run. */
const IN_PAGE = [
  ["answer_check", "every act answers a hand before it is taken"],
  ["daily_walk",   "nineteen properties of the surface he writes in"],
  ["store_guard",  "his writing is the same before and after any work"],
];

let fail = 0, crash = 0, thin = 0;
const missing = [];

for (const [name] of NODE.concat(IN_PAGE))
  if (!fs.existsSync(path.join(HERE, name + ".js"))) missing.push(name);
for (const [name] of PY)
  if (!fs.existsSync(path.join(HERE, name + ".py"))) missing.push(name);
for (const [name] of ESM)
  if (!fs.existsSync(path.join(HERE, name + ".mjs"))) missing.push(name);
for (const [name, rel] of GATE)
  if (!fs.existsSync(path.join(HERE, "..", rel))) missing.push(name);

console.log("");
for (const [name, holds] of NODE) {
  if (missing.includes(name)) { console.log("  GONE   " + name.padEnd(16) + holds); continue; }
  let mark;
  try {
    execFileSync(process.execPath, [path.join(HERE, name + ".js")],
                 { stdio: "pipe", cwd: path.join(HERE, "..") });
    mark = "ok    ";
  } catch (e) {
    /* A CRASH IS NOT A FAIL. An instrument that threw before reaching its own
       assertions checked nothing; one that ran and refused checked everything
       and found a breach. Reading the first as the second is how a green run
       hides a dead instrument. */
    const out = String(e.stdout || "") + String(e.stderr || "");
    if (/ReferenceError|SyntaxError|TypeError|Cannot find module/.test(out)) {
      mark = "CRASH "; crash++;
      const line = out.split("\n").find(l => /Error/.test(l)) || "";
      console.log("  " + mark + name.padEnd(16) + holds + "\n" + " ".repeat(25) + line.trim());
      continue;
    }
    mark = "FAIL  "; fail++;
  }
  console.log("  " + mark + name.padEnd(16) + holds);
}

for (const [name, holds] of PY) {
  if (missing.includes(name)) { console.log("  GONE   " + name.padEnd(16) + holds); continue; }
  try {
    execFileSync("python", [path.join(HERE, name + ".py")], { stdio: "pipe", cwd: path.join(HERE, "..") });
    console.log("  ok    " + name.padEnd(16) + holds);
  } catch (e) {
    const out = String(e.stdout || "") + String(e.stderr || "");
    if (/REFUSED/.test(out)) {
      fail++;
      console.log("  FAIL  " + name.padEnd(16) + holds);
      for (const l of out.split("\n").filter(l => /REFUSED/.test(l)))
        console.log(" ".repeat(25) + l.trim());
    } else {
      crash++;
      console.log("  CRASH " + name.padEnd(16) + holds);
      const line = out.split("\n").filter(Boolean).pop() || "python did not run";
      console.log(" ".repeat(25) + line.trim());
    }
  }
}

for (const [name, holds] of ESM) {
  if (missing.includes(name)) { console.log("  GONE   " + name.padEnd(16) + holds); continue; }
  try {
    execFileSync(process.execPath, [path.join(HERE, name + ".mjs")],
      { stdio: "pipe", cwd: path.join(HERE, "..") });
    console.log("  ok    " + name.padEnd(16) + holds);
  } catch (e) {
    crash++;
    console.log("  CRASH " + name.padEnd(16) + holds);
    const out = String(e.stdout || "") + String(e.stderr || "");
    console.log(" ".repeat(25) + (out.split("\n").filter(Boolean).pop() || "did not run").trim());
  }
}

/* ── THE GATE ─────────────────────────────────────────────────────────────── */
const strip = (x) => String(x).replace(/\x1b\[[0-9;]*m/g, "");

for (const [name, rel, holds] of GATE) {
  if (missing.includes(name)) { console.log("  GONE   " + name.padEnd(16) + holds); continue; }
  let out = "", code = 0;
  try {
    out = strip(execFileSync(process.execPath, [path.join(HERE, "..", rel)],
                             { stdio: "pipe", cwd: path.join(HERE, "..") }));
  } catch (e) {
    code = typeof e.status === "number" ? e.status : 1;
    out = strip(String(e.stdout || "") + String(e.stderr || ""));
  }

  const said = out.split("\n").filter((l) => l.trim());
  const verdict = said.length ? said[said.length - 1].trim().replace(/^──\s*/, "") : "no output";
  const landed = said.filter((l) => l.trim().startsWith("· ")).map((l) => l.trim().slice(2));

  /* Tested before the exit code: a module that failed to load exits non-zero
     looking exactly like a refusal, and a gate that never reached its own
     instruments checked nothing. */
  let mark;
  if (/ReferenceError|SyntaxError|TypeError|Cannot find module/.test(out)) { mark = "CRASH "; crash++; }
  else if (code === 0) mark = "ok    ";
  else if (code === 3) { mark = "THIN  "; thin++; }
  else { mark = "FAIL  "; fail++; }

  console.log("  " + mark + name.padEnd(16) + holds);
  for (const m of landed) console.log(" ".repeat(25) + "made possible: " + m);
  if (mark !== "ok    ") console.log(" ".repeat(25) + verdict);
}

console.log("\n  in the page, not covered by this run:");
for (const [name, holds] of IN_PAGE)
  console.log("      " + (missing.includes(name) ? "GONE " : "     ") + name.padEnd(16) + holds);

if (missing.length) {
  console.error("\n[check_all] REFUSED — " + missing.length +
    " instrument(s) named here are not on disk: " + missing.join(", "));
  console.error("            a run that checks fewer things than it claims must not print green.");
  process.exit(1);
}

const n = NODE.length + PY.length + ESM.length + GATE.length;
if (fail || crash || thin) {
  console.error("\n[check_all] " + (n - fail - crash - thin) + " of " + n + " hold · " +
    fail + " refused · " + crash + " crashed" +
    (thin ? " · " + thin + " examined nothing" : ""));
  process.exit(1);
}
console.log("\n[check_all] all " + n + " hold · " + IN_PAGE.length + " more wait for a page");
