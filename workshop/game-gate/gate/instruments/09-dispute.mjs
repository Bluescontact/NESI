// 09-dispute — Card candidate. The mechanism exists; whether a dispute
// changes anything is HELD, because that fork is not this instrument's to
// close.
//
// The P2P Wiki anti-nutrient, named directly: "no page anywhere describes a
// dispute path" for a refusal — and Sensorica's extractors surfacing as
// near-absent in a voluntary ledger reads, in hindsight, as the same gap.
// Until now this gate had a refusal grammar (REFUSE, with a ground and a
// return date) and no way to contest one that stood without simply waiting
// out the return date or re-running the check unchanged.
//
// What this does NOT do: resolve a dispute, override a refusal, or change
// gate.mjs's verdict. Whether a dispute may ever do any of those is a fork
// only the keeper can close — a session granting a mechanism it built the power to
// overrule the gate it built would be exactly the self-dealing LEARNED's
// laws 20 and 25 exist to catch. So this stays HELD, always, the same shape
// as 03-blanks and 05-subtract: a candidate mechanism, visible and usable by
// hand, installed as law by nobody yet.
//
//   node instruments/09-dispute.mjs open  <ref> <reason…>
//   node instruments/09-dispute.mjs close <ref> <resolution…>

import { pathToFileURL } from 'node:url';
import { ledger, append, HOLD } from '../lib.mjs';

export const id = '09-dispute';
export const cost =
  'I keep every disputed refusal visible until someone closes it by hand, ' +
  'which means a contested no does not quietly age off the ledger.';

export function run() {
  const events = ledger();
  const opens = events.filter((e) => e.kind === 'dispute-open');
  const closes = new Set(events.filter((e) => e.kind === 'dispute-close').map((e) => e.ref));
  const open = opens.filter((e) => !closes.has(e.ref)).map((e) => e.ref);

  return HOLD(
    opens.length,
    opens.length === 0
      ? 'candidate only — mechanism exists, 0 disputes on record; nothing yet decides what a dispute changes'
      : `candidate only — ${opens.length} dispute(s) on record, ${open.length} still open` +
          (open.length ? `: ${open.join(', ')}` : '') +
          `. The fork "what a dispute is allowed to change" remains open.`
  );
}

// ── cli ───────────────────────────────────────────────────────────────────
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [cmd, ref, ...words] = process.argv.slice(2);
  const text = words.join(' ');
  try {
    if (cmd === 'open') {
      if (!ref || !text) throw new Error('usage: open <ref> <reason…>');
      if (ledger().some((e) => e.kind === 'dispute-open' && e.ref === ref)) {
        throw new Error(`refused: a dispute is already open on "${ref}". Open identities do not rewrite.`);
      }
      append({ kind: 'dispute-open', ref, reason: text });
      console.log(`opened a dispute on ${ref}. It stays visible until: close ${ref} <resolution…>`);
    } else if (cmd === 'close') {
      if (!ref || !text) throw new Error('usage: close <ref> <resolution…>');
      const opened = ledger().some((e) => e.kind === 'dispute-open' && e.ref === ref);
      if (!opened) throw new Error(`refused: no open dispute on record for "${ref}"`);
      if (ledger().some((e) => e.kind === 'dispute-close' && e.ref === ref)) {
        throw new Error(`refused: the dispute on "${ref}" is already closed.`);
      }
      append({ kind: 'dispute-close', ref, resolution: text });
      console.log(`closed the dispute on ${ref}.`);
    } else {
      throw new Error('usage: 09-dispute.mjs <open|close> <ref> <text…>');
    }
  } catch (e) {
    console.error(e.message);
    process.exit(2);
  }
}
