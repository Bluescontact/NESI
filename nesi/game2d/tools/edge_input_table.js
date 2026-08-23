#!/usr/bin/env node
/* THE EDGE INPUT TABLE — 2026-08-21, on Kevin's own reframing: "each level
 * adds a layer of complexity... already determined by the relationship and
 * position... we need to understand what the inputs are."
 *
 * This does one thing: reads solid.js and prints, for every one of the 24
 * edges, exactly what the geometry already knows about it — before any
 * session invents a mechanic, a text beat, or a difficulty curve for it.
 * Nothing here is designed. Nothing here is a mechanic. It is the raw input
 * list a level's own complexity should be derived FROM, not a proposal for
 * what that complexity should be.
 *
 * DERIVED, NEVER HAND-TYPED — same law solid.js's own header states for a
 * number: a typed table is a second place this could drift from the solid
 * that actually defines it. Re-run this any time solid.js changes; do not
 * hand-edit the output.
 *
 *   node tools/edge_input_table.js            → markdown table to stdout
 *   node tools/edge_input_table.js --write    → writes THE_EDGE_INPUTS.md
 */
"use strict";
const fs = require("fs"), path = require("path");
global.window = global;
require(path.join(__dirname, "..", "solid.js"));
const G = global.SOLID;

const seatKind = s => (G.SEATS[s].fall ? "falling" : "rising");

const rows = G.MEMBERS.slice().sort((a, b) => {
  if (a.circuits[0] !== b.circuits[0]) return a.circuits[0] - b.circuits[0];
  return a.key.localeCompare(b.key);
}).map(m => {
  const f = G.facesAlong(m.a, m.b);
  const half = (m.kind === "fall" || m.kind === "turn") ? "tutorial (water)" : "platform (rise/return)";
  return {
    edge: m.key,
    kind: m.kind,
    circuit: m.circuits.join(","),
    half,
    aKind: seatKind(m.a),
    bKind: seatKind(m.b),
    triangle: f.triangle ? (f.triangle.seats.join("/") + " · tetra " + f.triangle.tetra) : "—",
    square: f.square ? (f.square.axis + " (" + f.square.seats.join("/") + ")") : "—",
  };
});

function toMarkdown(rows) {
  const head = "| edge | kind | circuit | half | seat A | seat B | triangle it borders | square it borders |\n"
             + "|---|---|---|---|---|---|---|---|\n";
  const body = rows.map(r =>
    `| ${r.edge} | ${r.kind} | ${r.circuit} | ${r.half} | ${r.aKind} | ${r.bKind} | ${r.triangle} | ${r.square} |`
  ).join("\n");
  return head + body + "\n";
}

const md = "# THE EDGE INPUT TABLE — every level's geometric inputs, derived not designed\n\n"
  + "**Generated " + new Date().toISOString().slice(0,10) + " by `tools/edge_input_table.js` — "
  + "do not hand-edit; re-run the generator if `solid.js` ever changes.**\n\n"
  + "Kevin's own framing, 2026-08-21: *\"Each layer of complexity is already "
  + "determined by the relationship and position... we need to understand "
  + "what the inputs are, and how they affect downstream participation.\"* "
  + "This is that list. Nothing here proposes a mechanic, a difficulty, or a "
  + "text beat — it is only what the solid itself already knows about each "
  + "edge before anyone designs anything for it.\n\n"
  + "**What each column actually is, not a guess:**\n"
  + "- **kind** — fall/rise/turn/return, computed from whether each endpoint "
  + "seat is on the falling or rising half (`solid.js` `MEMBERS`).\n"
  + "- **circuit** — which one of the solid's four closed six-edge walks this "
  + "edge sits on. Every edge sits on exactly one (a clean 4×6 partition, "
  + "already verified elsewhere in this corpus).\n"
  + "- **half** — tutorial (the 12 fall+turn edges, \"water's twelve\") or "
  + "platform (the 12 rise+return edges, unlocked once the workbench opens).\n"
  + "- **seat A / seat B** — whether each endpoint itself is a falling or "
  + "rising seat (`SEATS[s].fall`).\n"
  + "- **triangle / square it borders** — the one triangle and one square "
  + "face every edge touches (`facesAlong`), and which tetra (A/B) the "
  + "triangle belongs to, and which of the three hinge axes the square sits "
  + "on. Every edge borders exactly one of each.\n\n"
  + toMarkdown(rows)
  + "\n---\n\n"
  + "*Regenerate: `node tools/edge_input_table.js --write` from `nesi/game2d/`.*\n";

if (process.argv.includes("--write")) {
  const out = path.join(__dirname, "..", "THE_EDGE_INPUTS.md");
  fs.writeFileSync(out, md, "utf8");
  console.log("wrote " + out);
} else {
  console.log(md);
}
