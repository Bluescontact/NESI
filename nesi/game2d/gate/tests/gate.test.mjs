import test from 'node:test';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import assert from 'node:assert/strict';

import { PASS, REFUSE, VACUOUS, HOLD, ADMIT, mark, project, BUILDER, assertGateJurisdiction } from '../lib.mjs';
import { assertBlankable } from '../instruments/03-blanks.mjs';
import { classify } from '../instruments/04-horizon.mjs';

// Jurisdiction is structural, not a UI convention.
test('builder event has no player projection', () => {
  const event = { jurisdiction: BUILDER, kind: 'gate-run', reason: 'ground', checked: 4 };
  assert.equal(project(event, 'player'), null);
  assert.equal(project(event, 'builder'), event);
});


test('gate ledger refuses a player-jurisdiction write before I/O', () => {
  assert.throws(() => assertGateJurisdiction({ jurisdiction: 'player', kind: 'x' }), /only "builder" is writable/);
  assert.deepEqual(assertGateJurisdiction({ jurisdiction: 'builder', kind: 'x' }), { jurisdiction: 'builder', kind: 'x' });
});

test('unknown projection jurisdiction is refused', () => {
  assert.throws(() => project({}, 'public'), /unknown projection jurisdiction/);
});

test('player namespaces cannot be blank-asserted', () => {
  for (const key of ['ground.empty', 'surface.foo', 'sounding.none', 'deep.slot', 'player.blank']) {
    assert.throws(() => assertBlankable(key), /player surface/);
  }
  assert.equal(assertBlankable('marks-installed'), 'marks-installed');
});

test('unknown horizon direction cannot silently become tightening', () => {
  assert.equal(classify('loosen'), 'loosen');
  assert.equal(classify('tighten'), 'tighten');
  assert.throws(() => classify('loosenn'), /unknown direction/);
});

test('verdict grammar distinguishes pass, refusal, vacuity and held candidate', () => {
  assert.equal(PASS(1).status, 'pass');
  assert.equal(REFUSE('no', 1, 1).status, 'refuse');
  assert.equal(VACUOUS('blank').status, 'vacuous');
  assert.equal(HOLD(2, 'fork open').status, 'held');
});

// ── the admission path ────────────────────────────────────────────────────
// A gate built only from a census of deaths has a ceiling of zero: PASS means
// no refusal fired, never that anything landed. These fix the shape of the yes.

test('an admission must name what it made possible', () => {
  assert.throws(() => ADMIT(1, ''), /made possible/);
  assert.throws(() => ADMIT(1, undefined), /made possible/);
  assert.equal(ADMIT(1, 'the deep can now return a sentence').status, 'admit');
});

test('there is no field for what an admission prevented', () => {
  const a = ADMIT(1, 'a loosening now waits seven days');
  assert.equal('prevented' in a, false);
  assert.equal(a.made, 'a loosening now waits seven days');
  assert.equal(a.ok, true);
});

test('a mark refuses to be written without a ground', () => {
  assert.throws(() => mark({ id: 'x' }), /what it made possible/);
});

test('admit and refuse carry equal mechanical weight', () => {
  // a refusal must state a ground and a return date; an admission a ground and
  // what it opened. Neither may be filed bare.
  const r = REFUSE('ground', 1, 1);
  const a = ADMIT(1, 'ground');
  assert.ok(r.reason && r.returnAt);
  assert.ok(a.made);
  assert.equal(r.status, 'refuse');
  assert.equal(a.status, 'admit');
});

// ── the write path is reachable ───────────────────────────────────────────
// Each instrument's CLI sits behind a run-as-main guard. The naive form,
// `file://` + process.argv[1], never matches on Windows or under any path
// needing percent-encoding: the block does not run, nothing is written, and
// the process exits 0 — a write path that fails silently and reports success.
// Twelve `route` commands wrote nothing before this was caught, 2026-08-17.
// Run with no arguments each CLI must reach its own usage refusal, exit 2.
test('every instrument CLI is reachable as main', () => {
  const here = dirname(fileURLToPath(import.meta.url));
  for (const name of ['02-selfuse', '03-blanks', '04-horizon', '05-subtract', '07-magnitude', '09-dispute']) {
    let status = 0;
    try {
      execFileSync(process.execPath, [join(here, '..', 'instruments', name + '.mjs')], { stdio: 'pipe' });
    } catch (e) {
      status = e.status;
    }
    assert.equal(status, 2, `${name} did not reach its usage refusal — the main guard never fired`);
  }
});
