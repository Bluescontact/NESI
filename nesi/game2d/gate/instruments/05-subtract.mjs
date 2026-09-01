// 05-subtract — Card 13 candidate. The mechanism exists; enforcement is HELD.
// The fork "where the subtraction quota lives" remains open, so gate.mjs does
// not install the cadence as law.
//
// suckless: "the more code lines you have removed, the more progress you have
// made." Its proof by counter-example: awesome-selfhosted-data issue #1,
// "Remove dead links, unmaintained projects", open since 27 June 2021 — five
// years and two months, a removal queue that has never drained.
//
// The reason is structural rather than a lapse. Adding is a contribution;
// removing is an accusation. So any list grows monotonically while its accuracy
// falls monotonically — the census's founding disease in miniature.
//
// The quota is the whole fix: a scheduled pass whose only permitted output is
// deletion or demotion, which must remove at least one, and whose removals go
// to compost WITH A CAUSE rather than to the void.
//
// The unfakeable check: the target file must not be larger after the pass.
//
//   node instruments/05-subtract.mjs begin <target-file>
//   … remove things by hand …
//   node instruments/05-subtract.mjs end   <target-file> <id>=<cause> […]

import { pathToFileURL } from 'node:url';
import { existsSync } from 'node:fs';
import { conf, num, ledger, append, daysSince, bytes, PASS, REFUSE, VACUOUS, HOLD } from '../lib.mjs';

export const id = '05-subtract';
export const cost =
  'I require you to remove something on a schedule, which means a pass where ' +
  'you added your best work and took nothing away does not count as a pass.';

export function run() {
  const c = conf();
  const quota = num(c, 'subtract_quota_days', 14);
  const events = ledger();

  // Fork CLOSED 2026-09-01, the keeper's instruction ("build the subtraction
  // membrane"), after the second mirror audit named this the item drifting
  // fastest toward its fork (129 admitted in 30d, zero passes ever run).
  // The quota lives in gate.conf (subtract_quota_days), enforced here; the
  // membrane's law is house/membrane/04_THE_SUBTRACTION_MEMBRANE.md in the
  // public deposit. The enforcement below is the design retained since
  // Card 13, made reachable.

  if (events.length === 0) {
    return VACUOUS('the ledger is empty — no subtraction pass was examined, so the quota cannot be said to be met');
  }

  const passes = events.filter((e) => e.kind === 'subtract');
  if (passes.length === 0) {
    return REFUSE(
      `no subtraction pass has ever run. The pile rebuilds itself: compost-as-default is unbuilt, ` +
        `and a list that only grows loses accuracy monotonically.`,
      1,
      events.length
    );
  }

  const lastPass = passes[passes.length - 1];
  const age = daysSince(lastPass.ts);
  if (age > quota) {
    return REFUSE(
      `last subtraction pass was ${Math.floor(age)}d ago; quota is ${quota}d. ` +
        `Removal queues do not drain on intention — awesome-selfhosted-data issue #1 has been open five years.`,
      1,
      events.length
    );
  }

  const removed = passes.reduce((n, e) => n + (e.removed?.length ?? 0), 0);
  return PASS(events.length, `${passes.length} pass(es), ${removed} item(s) composted; last ${Math.floor(age)}d ago`);
}

// ── cli ───────────────────────────────────────────────────────────────────
// Two phases, so the pass is scriptable and needs no terminal:
//
//   node instruments/05-subtract.mjs begin <target>
//   … remove things by hand …
//   node instruments/05-subtract.mjs end <target> <id>=<cause> [<id>=<cause> …]
//
// `end` refuses unless the target actually shrank. That check is unfakeable and
// it is the only reason this instrument cannot be satisfied by paperwork.

function parsePairs(pairs) {
  if (pairs.length === 0) {
    throw new Error(
      'refused: a subtraction pass must remove at least one item. Its only permitted output is ' +
        'deletion or demotion. A pass that removes nothing is not a pass.'
    );
  }
  return pairs.map((pair) => {
    const i = pair.indexOf('=');
    if (i < 1) throw new Error(`refused: "${pair}" has no cause. Removed items go to compost with a cause, not to the void.`);
    const itemId = pair.slice(0, i).trim();
    const cause = pair.slice(i + 1).trim();
    if (!itemId || !cause) throw new Error(`refused: "${pair}" has an empty id or cause.`);
    return { id: itemId, cause };
  });
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [cmd, target, ...pairs] = process.argv.slice(2);
  try {
    if (!target) throw new Error('usage: 05-subtract.mjs <begin|end> <target-file> [<id>=<cause> …]');
    if (!existsSync(target)) throw new Error(`refused: no such target "${target}"`);

    if (cmd === 'begin') {
      const before = bytes(target);
      append({ kind: 'subtract-begin', target, bytesBefore: before });
      console.log(`opened on ${target} at ${before} bytes. Remove at least one thing, then: end ${target} <id>=<cause>`);
    } else if (cmd === 'end') {
      const removed = parsePairs(pairs);
      const opened = ledger().filter((e) => e.kind === 'subtract-begin' && e.target === target).pop();
      if (!opened) throw new Error(`refused: no pass was opened on "${target}". Run: begin ${target}`);
      const closed = ledger().filter((e) => e.kind === 'subtract' && e.target === target).pop();
      if (closed && Date.parse(closed.ts) > Date.parse(opened.ts)) {
        throw new Error(`refused: the last pass on "${target}" is already closed. Run: begin ${target}`);
      }
      const before = opened.bytesBefore;
      const after = bytes(target);
      if (after >= before) {
        throw new Error(
          `refused: ${target} is ${after} bytes, was ${before}. A subtraction pass that did not shrink ` +
            `the target did not subtract. Nothing was written to the ledger.`
        );
      }
      for (const r of removed) append({ kind: 'compost', target, ...r }, 'COMPOST.jsonl');
      append({ kind: 'subtract', target, removed, bytesBefore: before, bytesAfter: after });
      console.log(`recorded: \u2212${before - after} bytes, ${removed.length} item(s) composted.`);
    } else {
      throw new Error('usage: 05-subtract.mjs <begin|end> <target-file> …');
    }
  } catch (e) {
    console.error(e.message);
    process.exit(2);
  }
}
