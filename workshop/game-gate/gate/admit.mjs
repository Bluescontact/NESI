#!/usr/bin/env node
// admit.mjs — the gate's yes.
//
//     node admit.mjs <id> --made "<what this made possible>" [--at <path>] [--note "…"]
//
// Symmetry with refusal, on purpose. A refusal must carry a ground and a return
// date or it is avoidance. An admission must carry WHAT IT MADE POSSIBLE, or it
// is bookkeeping.
//
// The required field is `--made`, never `--prevented`. That is the whole point
// and it is structural rather than advisory: there is no field for avoided harm,
// so an admission phrased as damage control has nowhere to be written. A gate
// built out of a census of deaths can only reach zero; this is the organ that
// lets it reach something else.
//
// `--at` is optional and, when given, is verified to exist. A mark that names a
// path which is not there is refused — an admission may be generous, but it may
// not be fictional.

import { existsSync } from 'node:fs';
import { mark, marks } from './lib.mjs';

const argv = process.argv.slice(2);
const id = argv[0];

function flag(name) {
  const i = argv.indexOf(`--${name}`);
  return i < 0 ? undefined : argv[i + 1];
}

try {
  if (!id || id.startsWith('--')) throw new Error('usage: admit.mjs <id> --made "<what this made possible>" [--at <path>]');
  if (marks().some((m) => m.id === id)) throw new Error(`refused: "${id}" is already admitted. Marks do not rewrite.`);

  const made = flag('made');
  const at = flag('at');
  const note = flag('note');

  if (!made) {
    throw new Error(
      'refused: an admission must name what it made possible (--made). There is no --prevented flag; ' +
        'a gate that can only record avoided harm has a ceiling of zero.'
    );
  }
  if (at && !existsSync(at)) {
    throw new Error(`refused: --at "${at}" does not exist. An admission may be generous; it may not be fictional.`);
  }

  const rec = mark({ id, made, ...(at ? { at } : {}), ...(note ? { note } : {}) });
  console.log(`admitted ${id}`);
  console.log(`  made possible: ${rec.made}`);
  if (rec.at) console.log(`  at: ${rec.at}`);
} catch (e) {
  console.error(e.message);
  process.exit(2);
}
