#!/usr/bin/env node
// project.mjs — two projections over the same builder event history.
//
//     node project.mjs builder   # emits builder ledger JSONL
//     node project.mjs player    # emits nothing
//
// The silence of `player` is structural, not a formatting choice: gate events
// carry capacity/refusal/self-use/blank evidence that has no player projection.

import { ledger, project } from './lib.mjs';

const jurisdiction = process.argv[2];
if (!['builder', 'player'].includes(jurisdiction)) {
  console.error('usage: node project.mjs <builder|player>');
  process.exit(2);
}

for (const event of ledger()) {
  const visible = project(event, jurisdiction);
  if (visible) process.stdout.write(JSON.stringify(visible) + '\n');
}
