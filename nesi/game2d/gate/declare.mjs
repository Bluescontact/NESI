#!/usr/bin/env node
// THE DECLARATION CHANNEL — how a strand of the weave gets made.
//
// Born of the dream-and-development pass on the connective tissue
// (the keeper's mark, 2026-09-01): the weave renders declared relations,
// and until this tool existed there was no mechanism to declare one —
// the loop was open. This closes it, under the standing laws:
//
//   - declared kinship, never computed similarity: a strand exists only
//     because a hand wrote it here.
//   - the machine offers no relation vocabulary (field_render): --rel is
//     free text, required, never suggested, never defaulted.
//   - only a hand's command writes to a ledger (marks_guard): this tool
//     appends one line per invocation and does nothing on its own.
//   - append-only: no edit, no delete; a wrong strand is corrected by a
//     new line that says so.
//
// Usage, from gate/:
//   node declare.mjs <a> <b> --rel "<the relation, in your own words>" [--by "<where this was declared, if reading the record>"]
//
// <a> and <b> are mark ids from MARKS.jsonl, or crystal ids c1..c8.
// --by distinguishes a strand READ FROM THE RECORD (citation required)
// from one declared fresh by the hand (no --by needed; the line itself
// is the declaration).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const MARKS = path.join(HERE, 'MARKS.jsonl');
const LEDGER = path.join(HERE, 'DECLARATIONS.jsonl');
const CRYSTAL_IDS = new Set(['c1','c2','c3','c4','c5','c6','c7','c8']);

const args = process.argv.slice(2);
const positional = [];
let rel = null, by = null;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--rel') rel = args[++i];
  else if (args[i] === '--by') by = args[++i];
  else positional.push(args[i]);
}
const [a, b] = positional;

function refuse(msg) { console.error('refused: ' + msg); process.exit(2); }

if (!a || !b) refuse('two endpoints required — a strand connects two real things.');
if (!rel || !rel.trim()) refuse('--rel is required and free — naming the relation IS the act; this tool will never suggest a word for it.');

const markIds = new Set(
  fs.readFileSync(MARKS, 'utf8').split('\n').filter(Boolean)
    .map((l) => { try { return JSON.parse(l).id; } catch { return null; } })
    .filter(Boolean)
);
for (const end of [a, b]) {
  if (!markIds.has(end) && !CRYSTAL_IDS.has(end)) {
    refuse(`"${end}" is neither an admitted mark nor a crystal (c1..c8). A declaration may be generous; it may not be fictional.`);
  }
}
if (a === b) refuse('a strand needs two distinct ends.');

const line = {
  ts: new Date().toISOString(),
  a, b,
  rel: rel.trim(),
  source: by ? 'read from the record' : 'the hand',
  ...(by ? { declared_in: by } : {}),
};
fs.appendFileSync(LEDGER, JSON.stringify(line) + '\n');
console.log(`declared: ${a} —[${line.rel}]— ${b}` + (by ? `  (read from: ${by})` : '  (the hand\'s own declaration)'));
