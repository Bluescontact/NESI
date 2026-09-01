// 06-landed — the admission reading. The counterweight to the other five.
//
// The first build of this gate was assembled entirely from a census of deaths:
// 34.3% survival, 46.4% zero forks, 2% leaving a word. Every instrument in it
// was a no. PASS did not mean anything landed — it meant no refusal fired — so
// a run could be fully green over a directory in which nothing had ever
// happened. The ceiling was zero.
//
// This instrument reads MARKS.jsonl and reports what got through.
//
// It deliberately DOES NOT refuse an empty window. LEARNED 20 — no law becomes
// a lever to give the keeper less — and an instrument that refused a quiet fortnight
// would be a productivity meter wearing a constitution. Held is lawful. A
// fallow season is a correct state. So a window with no marks is reported as a
// fact, in the same voice as any other fact, and the run stays green.
//
// What it does instead is make the admissions visible at the same weight as the
// refusals, every single run, so `what has this built` is answerable without
// reading the refusal history.

import { conf, num, marks, daysSince, ADMIT, PASS, VACUOUS } from '../lib.mjs';

export const id = '06-landed';
export const cost =
  'I ask you to say what a thing made possible before it may be marked, ' +
  'which is harder than saying what it prevented and cannot be answered from a census.';

export function run() {
  const c = conf();
  const window = num(c, 'landed_window_days', 30);
  const all = marks();

  // Presence assertion, held honestly: an empty marks file is not proof of
  // anything, so this cannot print green on a directory that has never run.
  if (all.length === 0) {
    return VACUOUS(
      'MARKS.jsonl is empty — nothing has ever been admitted, so this instrument has examined nothing. ' +
        'Admit something: node admit.mjs <id> --made "…"'
    );
  }

  const recent = all.filter((m) => daysSince(m.ts) <= window);

  if (recent.length === 0) {
    const last = all[all.length - 1];
    return PASS(
      all.length,
      `nothing admitted in ${window}d; ${all.length} mark(s) on record, last "${last.id}" ` +
        `${Math.floor(daysSince(last.ts))}d ago. A quiet window is a correct state, not a finding.`
    );
  }

  const made = recent.map((m) => `${m.id} — ${m.made}`);
  return {
    ...ADMIT(all.length, recent[recent.length - 1].made, `${recent.length} admitted in ${window}d`),
    madeAll: made,
  };
}
