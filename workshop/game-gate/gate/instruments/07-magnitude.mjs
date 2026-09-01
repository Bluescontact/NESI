// 07-magnitude — routes on a number, not a mood.
//
// OpenCivics' one real threshold: $2,500 routes a request to full assembly
// instead of the default path, and the binary-deliverable rule removes the
// need for self-assessed honesty entirely. Ostrom adds repetition as a
// trigger regardless of content. The corpus's own licence graveyard proves
// the corollary in twenty years of counter-example: membership questions are
// gateable by a human reading them; magnitude questions were left to
// self-report, and in twenty years nobody ever filled in the percentage.
//
// This build is one person, so there is no second reviewer to route a large
// proposal to. The honest analog: a small change closes on one mark; a large
// one cannot close on the same act that proposed it — it requires a second,
// separate mark, at a second sitting, before it may land. That is what
// "escalates" here — not who looks at it, but whether one sitting is allowed
// to be enough.
//
// Magnitude is declared, never derived — same discipline as 01-motion's
// strut trailer and gate.mjs's cost strings. No parser here can see how big a
// change really is; the hand states it and the instrument only checks that
// the second mark exists before the first one is allowed to stand alone.
//
//   node instruments/07-magnitude.mjs propose <id> <magnitude 1-10> <text…>
//   node instruments/07-magnitude.mjs confirm <id>

import { pathToFileURL } from 'node:url';
import { conf, num, ledger, append, PASS, REFUSE, VACUOUS } from '../lib.mjs';

export const id = '07-magnitude';
export const cost =
  'I make a large proposal unable to close on the sitting that proposed it, ' +
  'which means the change you most want to land today may need a second day.';

export function classifyMagnitude(n) {
  const v = Number(n);
  if (!Number.isFinite(v) || v < 1 || v > 10) {
    throw new Error(`magnitude must be a number 1–10; got "${n}". A scale that admits any number is not a scale.`);
  }
  return v;
}

export function run() {
  const c = conf();
  const threshold = num(c, 'magnitude_threshold', 6);
  const events = ledger();
  const relevant = events.filter((e) => ['magnitude-propose', 'magnitude-confirm'].includes(e.kind));

  if (relevant.length === 0) {
    return VACUOUS('no magnitude proposal or confirmation is on record — nothing relevant was examined, so nothing is proven');
  }

  const proposals = new Map();
  for (const e of events) if (e.kind === 'magnitude-propose' && e.id) proposals.set(e.id, e);
  const confirmed = new Set(events.filter((e) => e.kind === 'magnitude-confirm').map((e) => e.id));

  const unconfirmed = [...proposals.values()]
    .filter((p) => p.magnitude > threshold)
    .filter((p) => !confirmed.has(p.id))
    .map((p) => `${p.id} (${p.magnitude}/10)`);

  if (unconfirmed.length) {
    return REFUSE(
      `${unconfirmed.length} proposal(s) above threshold ${threshold}/10 with no second, separate mark: ` +
        `${unconfirmed.join(', ')}. A proposal this size does not get to close on the act that proposed it. ` +
        `Run: confirm <id>`,
      1,
      relevant.length
    );
  }

  const small = [...proposals.values()].filter((p) => p.magnitude <= threshold).length;
  const large = [...proposals.values()].filter((p) => p.magnitude > threshold).length;
  return PASS(
    relevant.length,
    `${small} proposal(s) at or under ${threshold}/10 closed on one mark; ${large} above it carry a confirmed second mark`
  );
}

// ── cli ───────────────────────────────────────────────────────────────────
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [cmd, ...rest] = process.argv.slice(2);
  try {
    if (cmd === 'propose') {
      const [markId, magStr, ...words] = rest;
      const text = words.join(' ');
      if (!markId || magStr === undefined || !text) throw new Error('usage: propose <id> <magnitude 1-10> <text…>');
      const magnitude = classifyMagnitude(magStr);
      if (ledger().some((e) => e.kind === 'magnitude-propose' && e.id === markId)) {
        throw new Error(`refused: proposal id "${markId}" already exists. Proposal identities do not rewrite.`);
      }
      append({ kind: 'magnitude-propose', id: markId, magnitude, text });
      console.log(
        magnitude > num(conf(), 'magnitude_threshold', 6)
          ? `recorded at ${magnitude}/10 — above threshold. It cannot close on this sitting. Run: confirm ${markId}`
          : `recorded at ${magnitude}/10 — at or under threshold. One mark is enough.`
      );
    } else if (cmd === 'confirm') {
      const markId = rest[0];
      if (!markId) throw new Error('usage: confirm <id>');
      const prop = ledger().filter((e) => e.kind === 'magnitude-propose' && e.id === markId).pop();
      if (!prop) throw new Error(`refused: no proposal on record for "${markId}"`);
      if (ledger().some((e) => e.kind === 'magnitude-confirm' && e.id === markId)) {
        throw new Error(`refused: "${markId}" is already confirmed. Confirmation is not repeatable motion.`);
      }
      append({ kind: 'magnitude-confirm', id: markId });
      console.log(`confirmed ${markId} — the second, separate mark this magnitude required.`);
    } else {
      throw new Error('usage: 07-magnitude.mjs <propose|confirm> …');
    }
  } catch (e) {
    console.error(e.message);
    process.exit(2);
  }
}
