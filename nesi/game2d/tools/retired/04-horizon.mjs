// 04-horizon — Card 05. Loosening takes a week; tightening is instant.
//
// Beeminder's akrasia horizon: any change that makes a goal easier takes seven
// days to bite; removing accrued slack applies immediately.
//
// This closes the hole LEARNED 3 recorded and did not close — all five seams
// written on 2026-08-13 were authored by the sessions that produced or read the
// fault, four to twelve hours after it. A law written after the event it
// governs did not constrain; it ratified.
//
// Adds no organ. Loosening a prior mark waits N days. Tightening, refusing and
// deferring stay available now. Revoking a pending loosening is itself a
// tightening, and is therefore instant — the decrement path ships in the same
// organ as the grant (the Karrot lesson).
//
// Companion, made mechanical: people choose more aggressive commitment
// contracts for others than for themselves and view themselves as the
// exception. Gate parameters are authored in the THIRD PERSON — "what would you
// require of someone in this position" — so a loosening written in the first
// person is refused before the clock even starts.
//
//   node instruments/04-horizon.mjs propose loosen  <id> <third-person text…>
//   node instruments/04-horizon.mjs propose tighten <id> <text…>
//   node instruments/04-horizon.mjs revoke  <id>
//   node instruments/04-horizon.mjs apply   <id>

import { pathToFileURL } from 'node:url';
import { conf, num, ledger, append, daysSince, iso, DAY, PASS, REFUSE, VACUOUS } from '../lib.mjs';

export const id = '04-horizon';
export const cost =
  'I hold every loosening for a week, which means the change you most want ' +
  'today is the one change you cannot make today.';

const LOOSENING = new Set(['loosen', 'widen', 'relax', 'extend']);
const TIGHTENING = new Set(['tighten', 'narrow', 'restrict', 'refuse', 'defer', 'revoke']);
const FIRST_PERSON = /\b(i|i'm|i've|i'd|i'll|me|my|myself|mine)\b/i;

export function classify(direction) {
  const d = String(direction).toLowerCase();
  if (LOOSENING.has(d)) return 'loosen';
  if (TIGHTENING.has(d)) return 'tighten';
  throw new Error(`unknown direction "${direction}"; refusing to treat an unrecognized word as a tightening`);
}

export function effectiveAt(rec, horizonDays) {
  const base = Date.parse(rec.ts);
  return classify(rec.direction) === 'loosen' ? base + horizonDays * DAY : base;
}

export function run() {
  const c = conf();
  const horizon = num(c, 'horizon_days', 7);
  const events = ledger();
  const relevant = events.filter((e) => ['propose', 'revoke', 'apply'].includes(e.kind));

  if (relevant.length === 0) {
    return VACUOUS('no horizon proposal, revocation or application is on record — nothing relevant was examined, so nothing is proven');
  }

  const proposals = new Map();
  for (const e of events) if (e.kind === 'propose' && e.id) proposals.set(e.id, e);

  const revoked = new Set(events.filter((e) => e.kind === 'revoke').map((e) => e.id));

  const breaches = [];
  for (const e of events) {
    if (e.kind !== 'apply' || !e.id) continue;
    const prop = proposals.get(e.id);
    if (!prop) {
      breaches.push(`${e.id} applied with no proposal on record`);
      continue;
    }
    if (revoked.has(e.id)) {
      breaches.push(`${e.id} applied after revocation`);
      continue;
    }
    const eff = effectiveAt(prop, horizon);
    if (Date.parse(e.ts) < eff) {
      const early = Math.max(0, (eff - Date.parse(e.ts)) / DAY);
      breaches.push(`${e.id} applied ${early.toFixed(1)}d before its horizon (${iso(eff)})`);
    }
  }

  if (breaches.length) {
    return REFUSE(
      `${breaches.length} loosening(s) applied inside the horizon: ${breaches.join('; ')}. ` +
        `A law written after the event it governs ratifies rather than constrains.`,
      horizon,
      relevant.length
    );
  }

  const pending = [...proposals.values()]
    .filter((prop) => classify(prop.direction) === 'loosen')
    .filter((prop) => !revoked.has(prop.id))
    .filter((prop) => Date.now() < effectiveAt(prop, horizon))
    .map((prop) => `${prop.id} → ${iso(effectiveAt(prop, horizon))}`);

  return PASS(
    relevant.length,
    pending.length ? `${pending.length} loosening(s) pending: ${pending.join(', ')}` : 'no loosening pending'
  );
}

// ── cli ───────────────────────────────────────────────────────────────────
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [cmd, ...rest] = process.argv.slice(2);
  try {
    if (cmd === 'propose') {
      const [direction, markId, ...words] = rest;
      const text = words.join(' ');
      if (!direction || !markId || !text) throw new Error('usage: propose <direction> <id> <text…>');
      const classed = classify(direction);
      if (ledger().some((e) => e.kind === 'propose' && e.id === markId)) {
        throw new Error(`refused: proposal id "${markId}" already exists. Proposal identities do not rewrite.`);
      }
      if (classed === 'loosen' && FIRST_PERSON.test(text)) {
        throw new Error(
          'refused: a loosening must be written in the third person — "what would you require of ' +
            'someone in this position" — so the first-person self cannot soften it on contact.'
        );
      }
      const rec = append({ kind: 'propose', id: markId, direction, text });
      const eff = effectiveAt(rec, num(conf(), 'horizon_days', 7));
      console.log(`${classed} recorded. effective ${iso(eff)}`);
    } else if (cmd === 'revoke') {
      if (!rest[0]) throw new Error('usage: revoke <id>');
      append({ kind: 'revoke', id: rest[0] });
      console.log(`revoked ${rest[0]} — immediate, because revocation is a tightening.`);
    } else if (cmd === 'apply') {
      const markId = rest[0];
      if (!markId) throw new Error('usage: apply <id>');
      const horizon = num(conf(), 'horizon_days', 7);
      const events = ledger();
      const prop = events.filter((e) => e.kind === 'propose' && e.id === markId).pop();
      if (!prop) throw new Error(`refused: no proposal on record for "${markId}"`);
      if (events.some((e) => e.kind === 'revoke' && e.id === markId)) {
        throw new Error(`refused: "${markId}" was revoked. Revocation is a decrement path, not a pause.`);
      }
      if (events.some((e) => e.kind === 'apply' && e.id === markId)) {
        throw new Error(`refused: "${markId}" is already applied. Application is not repeatable motion.`);
      }
      const eff = effectiveAt(prop, horizon);
      if (Date.now() < eff) {
        throw new Error(`refused: "${markId}" is a ${classify(prop.direction)}ing inside its horizon. return ${iso(eff)}`);
      }
      append({ kind: 'apply', id: markId });
      console.log(`applied ${markId}`);
    } else {
      throw new Error('usage: 04-horizon.mjs <propose|revoke|apply> …');
    }
  } catch (e) {
    console.error(e.message);
    process.exit(2);
  }
}
