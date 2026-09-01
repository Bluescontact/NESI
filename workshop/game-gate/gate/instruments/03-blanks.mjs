// 03-blanks — Card 03 candidate. Builder-side assertions are implemented, but
// gate enforcement is HELD because "whether blanks get asserted, and where"
// remains an open fork.
//
// hledger balance assertions; beancount's Balance and Pad directives.
//
//   assert  — a dated, positive record that a key held exactly N and that this
//             was CHECKED. Structurally different from an absent file.
//   pad     — an explicit, dated, auditable admission of ignorance:
//             something happened here that I did not record.
//
// Without assert, a long gap in the ledger reads as missing data instead of as
// a reading, and the census becomes a population of gaps nobody can
// distinguish from silence.
//
// ── JURISDICTION · INFERRED, NOT RULED ────────────────────────────────────
// This is the one place in the crossing where a card and a law contradict
// rather than differ in scope. §4 of the world design refuses to record where
// the sounding found nothing, on the stated ground that a map of the empty
// places is a map of the player's failures.
//
// So this instrument implements ONLY the uncontested half: it asserts blanks in
// the BUILDER'S ledger and refuses, structurally, to be pointed at anything
// under the player surface. The fork stays open. Widening it is the keeper's.
//
//   node instruments/03-blanks.mjs assert <key> <count>
//   node instruments/03-blanks.mjs pad    <key> <since-iso> <reason...>

import { pathToFileURL } from 'node:url';
import { conf, num, lines, ledger, append, daysSince, PASS, REFUSE, VACUOUS, HOLD } from '../lib.mjs';

export const id = '03-blanks';
export const cost =
  'I require you to state that nothing happened, on a dated line, ' +
  'which means a quiet week costs you an act you would rather not perform.';

// Structural guard, not policy: these namespaces belong to the player's ground.
const FORBIDDEN = /^(ground|surface|sounding|deep|player)\./i;

export function assertBlankable(key) {
  if (FORBIDDEN.test(key)) {
    throw new Error(
      `refused: "${key}" is under the player surface. A map of the empty places is a map of the ` +
        `player's failures. Blanks are asserted in the builder's ledger only.`
    );
  }
  return key;
}

export function run() {
  const c = conf();
  const maxGap = num(c, 'blank_max_gap_days', 7);
  const keys = lines('KEYS.txt');

  // Fork remains open: whether blanks get asserted, and where. The mechanism
  // is executable by hand, but the gate does not enforce it as law.
  if (keys.length) {
    return HOLD(
      keys.length,
      `candidate only — ${keys.length} builder key(s) are named, but blank assertion is not installed. ` +
        `The fork "whether blanks get asserted, and where" remains open.`
    );
  }

  if (keys.length === 0) {
    return VACUOUS('KEYS.txt is empty — no key is being asserted against, so an empty ledger proves nothing');
  }

  const events = ledger();
  const last = new Map();
  for (const e of events) {
    if (e.kind !== 'assert' || !e.key) continue;
    const age = daysSince(e.ts);
    if (!last.has(e.key) || age < last.get(e.key)) last.set(e.key, age);
  }

  const stale = [];
  const never = [];
  for (const key of keys) {
    const age = last.get(key);
    if (age == null) never.push(key);
    else if (age > maxGap) stale.push(`${key} (${Math.floor(age)}d)`);
  }

  if (never.length) {
    return REFUSE(
      `${never.length} key(s) have never been asserted: ${never.join(', ')}. ` +
        `Absence is not a reading. Run: assert <key> 0`,
      1,
      keys.length
    );
  }
  if (stale.length) {
    return REFUSE(
      `${stale.length} key(s) unasserted for more than ${maxGap}d: ${stale.join(', ')}. ` +
        `The gap currently reads as missing data rather than as a checked blank.`,
      1,
      keys.length
    );
  }

  const pads = events.filter((e) => e.kind === 'pad').length;
  return PASS(keys.length, `all ${keys.length} keys asserted within ${maxGap}d${pads ? `; ${pads} pad(s) on record` : ''}`);
}

// ── cli ───────────────────────────────────────────────────────────────────
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [cmd, key, ...rest] = process.argv.slice(2);
  try {
    if (cmd === 'assert') {
      assertBlankable(key);
      const count = Number(rest[0]);
      if (!Number.isFinite(count)) throw new Error('usage: assert <key> <count>');
      console.log(JSON.stringify(append({ kind: 'assert', key, count })));
    } else if (cmd === 'pad') {
      assertBlankable(key);
      const since = rest[0];
      const reason = rest.slice(1).join(' ');
      if (!since || !reason) throw new Error('usage: pad <key> <since-iso> <reason...>');
      console.log(JSON.stringify(append({ kind: 'pad', key, since, reason })));
    } else {
      throw new Error('usage: 03-blanks.mjs <assert|pad> …');
    }
  } catch (e) {
    console.error(e.message);
    process.exit(2);
  }
}
