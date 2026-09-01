#!/usr/bin/env node
// THE SPRING — where dropped water becomes visible. Zero dependencies.
//
// From THE_CATCHMENT naming (§5): "a spring is not where water begins; it
// is where it becomes visible." This tool walks the headwaters folder,
// notices files that have arrived since the last run, and appends one
// line each to SPRING.jsonl. That is all it does.
//
// The laws it runs under, from the naming itself:
//   - VOLUME, NEVER CONTENT (§6/T3, the freshet law): the only facts
//     recorded are filename, word count, byte count, arrival date. The
//     response is identical for a thousand words of grief and a thousand
//     words of grocery lists. If a future edit of this file reads what a
//     dropped file SAYS, the catchment naming is falsified (§11).
//   - IT RECEIVES; IT DOES NOT GO LOOKING (T1): this tool walks only
//     this folder, never above it, never beside it.
//   - NOTHING CROSSES ON ITS OWN: a surfaced line is not an admission.
//     The keeper routes a candidate to the gate with a mark, or does not.
//   - APPEND-ONLY: SPRING.jsonl is never edited or rewritten.
//
// Usage, from this folder or anywhere:  node nesi/headwaters/spring.js

const fs = require('fs');
const path = require('path');

const HERE = __dirname;
const LEDGER = path.join(HERE, 'SPRING.jsonl');
const SKIP = new Set(['README.md', 'spring.js', 'SPRING.jsonl']);

const surfaced = new Set(
  fs.existsSync(LEDGER)
    ? fs.readFileSync(LEDGER, 'utf8').split('\n').filter(Boolean)
        .map((l) => { try { return JSON.parse(l).file; } catch { return null; } })
        .filter(Boolean)
    : []
);

const arrivals = fs.readdirSync(HERE, { withFileTypes: true })
  .filter((e) => e.isFile() && !SKIP.has(e.name) && !e.name.startsWith('.'))
  .map((e) => e.name)
  .filter((name) => !surfaced.has(name));

if (!arrivals.length) {
  console.log('[spring] the water is where it was — nothing new has surfaced.');
  process.exit(0);
}

for (const name of arrivals) {
  const full = path.join(HERE, name);
  const buf = fs.readFileSync(full);
  let words = null;
  try {
    // Word count is a volume fact about the file, not a reading of it —
    // the same two-scalar discipline the writing surface itself holds.
    words = buf.toString('utf8').split(/\s+/).filter(Boolean).length;
  } catch (e) { /* binary — bytes stand alone */ }
  const line = { ts: new Date().toISOString(), file: name, bytes: buf.length, ...(words != null ? { words } : {}) };
  fs.appendFileSync(LEDGER, JSON.stringify(line) + '\n');
  console.log(`[spring] surfaced: ${name} — ${buf.length} bytes${words != null ? `, ${words} words` : ''}. The keeper's mark decides what it becomes.`);
}
console.log(`[spring] ${arrivals.length} arrival(s). To route one toward the deposit: node ../game2d/gate/admit.mjs <id> --made "<what it makes possible>" --at "../../headwaters/<file>"`);
