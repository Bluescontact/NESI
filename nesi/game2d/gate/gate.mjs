#!/usr/bin/env node
// gate.mjs — one command.
//
// Five mechanisms that refuse rather than advise, and one that admits. The
// sixth is not decoration: a gate assembled only out of refusals has a ceiling
// of zero, because PASS means no refusal fired and never that anything landed.
// ADMIT is the verdict that lets the run report what got through.
//
//     node gate.mjs
//
// Exit 0 if every ACTIVE instrument examined something and passed.
// Exit 1 on refusal. Exit 3 if an active instrument examined nothing or the
// runner could not record its own result. HELD candidate instruments do not
// pass or refuse: they are visible mechanics behind still-open forks.
//
// Jurisdiction: BUILDER'S GATE, not player's surface. Every run is appended to
// the builder ledger with its grounds. No gate event has a player projection.

import { declaresCost, append } from './lib.mjs';
import { namedDeposits } from './deposits.mjs';
import { deriveRoutes } from './derive_routes.mjs';

const MODULES = [
  './instruments/01-motion.mjs',
  './instruments/02-selfuse.mjs',
  './instruments/03-blanks.mjs',
  './instruments/04-horizon.mjs',
  './instruments/05-subtract.mjs',
  './instruments/06-landed.mjs',
  './instruments/07-magnitude.mjs',
  './instruments/08-return.mjs',
  './instruments/09-dispute.mjs',
];

const C = {
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  amb: (s) => `\x1b[33m${s}\x1b[0m`,
  grn: (s) => `\x1b[32m${s}\x1b[0m`,
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
};

const wrap = (s, indent = 8, width = 84) => {
  const pad = ' '.repeat(indent);
  const out = [];
  let line = '';
  for (const word of String(s).split(/\s+/)) {
    if ((line + ' ' + word).trim().length > width - indent) {
      out.push(pad + line.trim());
      line = word;
    } else line += ' ' + word;
  }
  if (line.trim()) out.push(pad + line.trim());
  return out.join('\n');
};

const results = [];
let vacuous = 0;
let refused = 0;
let admitted = 0;
let held = 0;
let uncosted = 0;

console.log('\n' + C.bold('  GATE') + C.dim('  ·  builder jurisdiction  ·  refuse, do not advise') + '\n');

// A quiet derive-and-append step, same shape as "made possible" / "named
// deposits" below: no pass/refuse verdict, never affects exit code or any
// instrument's own reading of the ledger it ran before this loop — it runs
// first so a seat visited since the last run is already on record for
// 02-selfuse to read in THIS run. Silent no-op if seat-visits.json (or
// SEAT_VISITS_PATH) does not exist, per derive_routes.mjs's own header.
try {
  const derived = deriveRoutes();
  if (derived.ran && derived.appended) {
    console.log(`  ${C.dim('·')} derive_routes  ${C.dim(`appended ${derived.appended} route event(s) from ${derived.visitsPath}`)}`);
    console.log(wrap(derived.seats.join(', ')));
    console.log('');
  }
} catch (e) {
  console.log(`  ${C.dim('·')} derive_routes  ${C.dim(`did not run: ${e.message}`)}`);
}

for (const path of MODULES) {
  let mod;
  try {
    mod = await import(path);
  } catch (e) {
    const r = { status: 'refuse', ok: false, checked: 0, reason: `did not load: ${e.message}`, returnAt: '—' };
    results.push({ id: path, r });
    console.log(`  ${C.red('✕')} ${path}`);
    console.log(wrap(r.reason));
    refused++;
    continue;
  }

  if (!declaresCost(mod)) {
    const r = { status: 'void', ok: false, checked: 0, reason: 'declares no cost in the first person' };
    results.push({ id: mod.id ?? path, r });
    console.log(`  ${C.red('✕')} ${mod.id ?? path}`);
    console.log(wrap('declares no cost in the first person. An organ that costs nothing to run is not a gate.'));
    uncosted++;
    continue;
  }

  let r;
  try {
    r = mod.run();
  } catch (e) {
    r = { status: 'vacuous', ok: false, checked: 0, vacuous: true, reason: `threw: ${e.message}`, returnAt: '—' };
  }
  results.push({ id: mod.id, r });

  const mark =
    r.held ? C.cyan('◇')
    : r.vacuous || !r.checked ? C.amb('◐')
    : r.admitted ? C.grn('◆')
    : r.ok ? C.grn('✓')
    : C.red('✕');
  console.log(`  ${mark} ${C.bold(mod.id)}  ${C.dim(`checked ${r.checked ?? 0}`)}`);
  console.log(C.dim(wrap(mod.cost)));
  if ((r.ok || r.held) && r.note) console.log(wrap(r.note));
  if (!r.ok && !r.held) {
    console.log(wrap(r.reason));
    if (r.returnAt) console.log(C.dim(wrap(`return ${r.returnAt}`)));
  }
  console.log('');

  if (r.admitted) admitted++;
  if (r.held) held++;
  else if (r.vacuous || !r.checked) vacuous++;
  else if (!r.ok) refused++;
}

const active = MODULES.length - held;
let code = 0;
let verdictText;
let verdictKind;

if (uncosted) {
  verdictText = `${uncosted} instrument(s) declare no cost — the run is void`;
  verdictKind = 'void';
  code = 3;
} else if (vacuous) {
  verdictText = `${vacuous}/${active} active instrument(s) examined nothing` +
    `${refused ? `; ${refused}/${active} also refused` : ''}. ` +
    `The run is incomplete and does not print green${held ? `; ${held} candidate mechanism(s) remain held at open forks` : ''}.`;
  verdictKind = refused ? 'incomplete' : 'vacuous';
  code = 3;
} else if (refused) {
  verdictText = `${refused}/${active} active instrument(s) refused${held ? `; ${held} candidate mechanism(s) held at open forks` : ''}.`;
  verdictKind = 'refuse';
  code = 1;
} else {
  verdictText = `${active}/${active} active passed${held ? `; ${held} candidate mechanism(s) held at open forks` : ''}.`;
  verdictKind = 'pass';
}

// Card 04 + Card 08 at the builder gate: refusal/ending becomes evidence as a
// side effect of moving. The gate does not rely on a second bookkeeping act.
try {
  append({
    kind: 'gate-run',
    verdict: verdictKind,
    exit: code,
    active,
    held,
    refused,
    vacuous,
    instruments: results.map(({ id, r }) => ({
      id,
      status: r.status ?? (r.held ? 'held' : r.vacuous ? 'vacuous' : r.ok ? 'pass' : 'refuse'),
      checked: r.checked ?? 0,
      ...(r.reason ? { reason: r.reason } : {}),
      ...(r.returnAt ? { returnAt: r.returnAt } : {}),
      ...(r.note ? { note: r.note } : {}),
    })),
  });
} catch (e) {
  console.log(`  ${C.red('✕')} ${wrap(`gate result could not be recorded: ${e.message}`, 0)}`);
  code = 3;
  verdictText += ' Result was not recorded; the run is void.';
  verdictKind = 'void';
}

const paint = verdictKind === 'pass' ? C.grn : verdictKind === 'refuse' || verdictKind === 'void' ? C.red : C.amb;
// The frame, made structural. What landed is reported before what refused,
// because a run summary that opens with failures teaches the reader that the
// best available outcome is nothing going wrong.
const landed = results
  .filter(({ r }) => r.admitted)
  .flatMap(({ r }) => r.madeAll ?? (r.made ? [r.made] : []));

if (landed.length) {
  console.log(`  ${C.grn('◆')} ${C.bold('made possible')}`);
  for (const m of landed) console.log(wrap('· ' + m, 8));
  console.log('');
}

// Law 27: a refusal that repeats is read as the place naming its own missing
// upstream deposit, not restated each run. Read-only over the ledger's full
// history — never affects verdictKind or code above.
const deposits = namedDeposits();
if (deposits.length) {
  console.log(`  ${C.cyan('◇')} ${C.bold('named deposits')}` + C.dim('  ·  what a repeated refusal is asking for'));
  for (const d of deposits) {
    console.log(`    ${C.bold(d.id)}  ${C.dim(`refused ${d.count}x, since ${d.firstSeen.slice(0, 10)}`)}`);
  }
  console.log('');
}

console.log(`  ${C.dim('──')}  ${paint(verdictText)}\n`);
process.exit(code);
