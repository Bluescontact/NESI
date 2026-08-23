// 08-return — McNamara's two-node rule, applied to organs rather than to the
// instruments that watch them.
//
// "Who pays to hold this connection open?" — and its corollary: a card with
// no return path is extractive by construction. The gate already prices
// itself (every instrument declares a first-person cost, enforced by
// gate.mjs's declaresCost). Nothing previously priced the organs the gate
// exists to watch. An organ that takes the player's time, attention or
// material and names nothing given back is the two-node defect, live, in the
// build this gate governs.
//
// Declared, never derived — same discipline as ORGANS.txt itself and as
// 01-motion's strut trailer. No instrument can read what an organ gives back;
// the hand states it, once, in RETURNS.txt, and this checks only that every
// named organ has a non-empty statement.
//
// RETURNS.txt is plain text, hand-edited, in the same key = value grammar as
// gate.conf — not a CLI write path, because naming what an organ returns is a
// design act about the game itself, not a timestamped event about the gate.
//
//   ORGAN = what this organ gives back to the hand that routes through it

import { conf, lines, PASS, REFUSE, VACUOUS } from '../lib.mjs';

export const id = '08-return';
export const cost =
  'I will not let an organ be called live until something says what it gives ' +
  'back, which means a seat that only takes cannot be counted as built.';

export function run() {
  const organs = lines('ORGANS.txt');
  if (organs.length === 0) {
    return VACUOUS('ORGANS.txt is empty — there is nothing to read a return path against, so this run proves nothing');
  }

  const returns = conf('RETURNS.txt');
  const missing = organs.filter((o) => !returns[o] || !returns[o].trim());

  if (missing.length === organs.length) {
    return REFUSE(
      `none of ${organs.length} organ(s) has a declared return: ${missing.join(', ')}. ` +
        `A card with no return path is extractive by construction. Name one line each in RETURNS.txt: ` +
        `ORGAN = what it gives back.`,
      1,
      organs.length
    );
  }
  if (missing.length) {
    return REFUSE(
      `${missing.length} of ${organs.length} organ(s) have no declared return: ${missing.join(', ')}. ` +
        `The rest name one; these do not.`,
      1,
      organs.length
    );
  }

  return PASS(organs.length, `all ${organs.length} organ(s) declare a return path`);
}
