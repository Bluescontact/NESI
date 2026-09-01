#!/usr/bin/env node
/*
 * STANDING CHECK — re-runs every claim's support set and reports what still
 * stands.
 *
 * IT REPORTS, AND IT REFUSES ON EXACTLY ONE THING. An unsupported claim is not
 * a build failure: "something beneath me changed, I no longer know whether I
 * stand" is a lawful and useful state, and a suite that went red on it would
 * push a hand to delete the claim to get green — which is the silent rewrite
 * this whole spine exists to prevent. So UNSUPPORTED and UNKNOWN are printed
 * and the run stays green.
 *
 * WHAT IT DOES REFUSE: a MISFILED claim, and an empty spine. Misfiling is the
 * one failure the spine alone can settle — a MEASURED claim standing only on a
 * mark is a category error whatever the world is doing, and letting it through
 * would let the five relationships collapse back into one, which is the fault
 * the file was built for. Presence-asserting, like every instrument here: a run
 * that checks nothing must not print green.
 *
 *   node tools/standing_check.js
 */
"use strict";
const { KINDS, evaluateAll, loadClaims } = require("./standing.js");

let claims;
try { claims = loadClaims(); }
catch (e) { console.error("[standing_check] " + e.message); process.exit(1); }

const results = evaluateAll(claims);
const by = v => results.filter(r => r.verdict === v);

const MARK = { stands: "  ", unsupported: "▲ ", unknown: "? ", misfiled: "✕ " };

console.log("\nTHE STANDING SPINE — what kind of standing, and what keeps it standing\n");

for (const kind of Object.keys(KINDS)) {
  const rows = results.filter(r => r.kind === kind);
  if (!rows.length) continue;
  console.log("  " + kind + " — " + KINDS[kind].is);
  for (const r of rows) {
    console.log("    " + MARK[r.verdict] + r.id.padEnd(30) + r.verdict);
    if (r.verdict !== "stands")
      [...r.broken, ...r.unknown].forEach(b => console.log("        " + b));
  }
  console.log("");
}

const unfiled = results.filter(r => !KINDS[r.kind]);
unfiled.forEach(r => console.log("  ✕ " + r.id + " — " + r.broken.join("; ")));

/* ── the report ──────────────────────────────────────────────────────────── */
const line = (n, v) => n + " " + (n === 1 ? "claim" : "claims") + " " + v;
console.log("  " + [
  line(by("stands").length, "stand"),
  by("unsupported").length ? line(by("unsupported").length, "have lost a support") : null,
  by("unknown").length ? line(by("unknown").length, "could not be looked at") : null,
  by("misfiled").length ? line(by("misfiled").length, "are misfiled") : null
].filter(Boolean).join(" · "));

for (const r of by("unsupported"))
  console.log("\n  ▲ " + r.id + " — " + r.says + "\n    " + r.broken.join("\n    ") +
              "\n    Nothing was rewritten. The break is here for a hand.");

/* ── the two gates ───────────────────────────────────────────────────────── */
if (!claims.length) {
  console.error("\n[standing_check] the spine is empty — a run that checks nothing must not print green");
  process.exit(1);
}
if (by("misfiled").length) {
  console.error("\n[standing_check] MISFILED — a claim's supports cannot establish a claim of its kind.");
  process.exit(1);
}
console.log("\n[standing_check] " + claims.length + " claims read · nothing misfiled");
