#!/usr/bin/env node
/*
 * PLAYED — the row Kevin's hand writes.
 *
 * The runner cannot see the world being played. The world persists to
 * localStorage inside a browser (world.html:229, :461-465); nothing on disk
 * moves when a session is walked. So the fact of a play is not observable by
 * the machine, and the runner does not try to infer it.
 *
 * This is the whole of the mechanism the counsel converged on, 2026-08-13:
 * a phase may not mark itself done. Done is a row in this store, written by
 * his hand, and the runner's precondition for the next phase is a filesystem
 * fact rather than a judgement. A missing row is not a verdict; it is a
 * missing row, and the run sleeps.
 *
 * It records THAT he played. It never records how it went. There is no rating,
 * no score, no scale, no "did you want tomorrow" prompt — that answer is his
 * felt read and this file has no field for it. --word takes a word only if he
 * volunteers one, stored verbatim, never parsed.
 *
 * Usage:
 *   node tools/played.js                 the row: he played, just now
 *   node tools/played.js --word "…"      the same row, carrying his own word
 *   node tools/played.js --stop          halt the run; no phase starts after this
 *   node tools/played.js --status        what the store holds, and what it gates
 */
const fs = require("fs"), path = require("path");

const STORE = path.join(__dirname, "..", "PLAY_LOG.jsonl");

function rows() {
  if (!fs.existsSync(STORE)) return [];
  return fs.readFileSync(STORE, "utf8").split("\n").filter(Boolean).map(l => {
    try { return JSON.parse(l); } catch (e) { return null; }
  }).filter(Boolean);
}

function append(row) {
  fs.appendFileSync(STORE, JSON.stringify(row) + "\n", "utf8");
}

const argv = process.argv.slice(2);
const has = f => argv.includes(f);
const val = f => { const i = argv.indexOf(f); return i === -1 ? null : argv[i + 1] || null; };

if (has("--status")) {
  const r = rows();
  const stopped = r.length && r[r.length - 1].event === "stop";
  const last = [...r].reverse().find(x => x.event === "played");
  console.log("[play] " + r.length + " rows at PLAY_LOG.jsonl");
  console.log("[play] last play: " + (last ? last.ts + (last.word ? "  word: " + JSON.stringify(last.word) : "") : "none — the runner will not start"));
  console.log("[play] " + (stopped ? "STOPPED — a stop row is the last row; no phase will start" : "open — the next phase may start when its own gate is met"));
  process.exit(0);
}

if (has("--stop")) {
  append({ ts: new Date().toISOString(), event: "stop", source: "kevin" });
  console.log("[play] stop row written. No phase starts after this until a later play row.");
  process.exit(0);
}

const word = val("--word");
const row = { ts: new Date().toISOString(), event: "played", source: "kevin" };
if (word) row.word = word;          // verbatim, never parsed, never scored
append(row);
console.log("[play] row written: " + row.ts + (word ? "  word: " + JSON.stringify(word) : ""));
console.log("[play] the next phase is now ungated. Nothing else changed.");
