// 02-selfuse — Card 06. Self-use is the only health metric.
//
// "I am no longer running this tool on my Bear notes." — the single honest
// farewell across twelve archived personal-infrastructure repos. Not one cited
// a technical failure.
//
// Personal infrastructure does not die when it breaks. It dies when the
// author's own life stops routing through it. With no self-use telemetry the
// author finds out months late, or never.
//
// The reading is per-organ and separate from effort spent:
//     did I route through this in the last N days?
// Any built organ whose self-use has gone to zero surfaces BEFORE further
// effort may be admitted to it. This is the instrument that would have caught
// the dispatcher holding one item for thirteen days while 424 marks landed
// elsewhere.
//
//   record a use:    node instruments/02-selfuse.mjs route <organ>
//   record effort:   node instruments/02-selfuse.mjs build <organ>

import { pathToFileURL } from 'node:url';
import { conf, num, lines, ledger, append, daysSince, PASS, REFUSE, VACUOUS } from '../lib.mjs';

export const id = '02-selfuse';
export const cost =
  'I make an organ you stopped using visible before you may spend more on it, ' +
  'which means the thing you most want to work on is the thing I will hold.';

export function run() {
  const c = conf();
  const window = num(c, 'selfuse_window_days', 14);
  const organs = lines('ORGANS.txt');

  if (organs.length === 0) {
    return VACUOUS('ORGANS.txt is empty — there is nothing to read self-use against, so this run proves nothing');
  }

  const events = ledger();
  const routes = new Map();
  const builds = new Map();
  for (const e of events) {
    if (!e.organ) continue;
    if (e.kind === 'route') routes.set(e.organ, Math.min(routes.get(e.organ) ?? Infinity, daysSince(e.ts)));
    if (e.kind === 'build') builds.set(e.organ, Math.min(builds.get(e.organ) ?? Infinity, daysSince(e.ts)));
  }

  const cold = [];
  const dark = [];
  for (const organ of organs) {
    const lastRoute = routes.get(organ);
    const lastBuild = builds.get(organ);
    const routedInWindow = lastRoute != null && lastRoute <= window;
    const builtInWindow = lastBuild != null && lastBuild <= window;

    if (!routedInWindow && builtInWindow) {
      dark.push(`${organ} (built ${Math.floor(lastBuild)}d ago, last routed ${lastRoute == null ? 'never' : Math.floor(lastRoute) + 'd ago'})`);
    } else if (!routedInWindow) {
      cold.push(`${organ} (${lastRoute == null ? 'never routed' : Math.floor(lastRoute) + 'd'})`);
    }
  }

  if (dark.length) {
    return REFUSE(
      `effort was admitted to ${dark.length} organ(s) you have not routed through in ${window} days: ${dark.join('; ')}. ` +
        `Route through it, retire it, or say out loud that you are building something you do not use.`,
      1,
      organs.length
    );
  }

  // Nothing routed at all is the death signature itself, not a clean run.
  // Personal infrastructure dies when the author stops routing through it, so a
  // green light over an entirely cold set would be the exact false negative
  // this instrument exists to prevent.
  if (cold.length === organs.length) {
    return REFUSE(
      `not one of ${organs.length} organs has been routed through in ${window} days: ${cold.join(', ')}. ` +
        `This is the shape the graveyard is made of — nothing broke, the hand stopped arriving.`,
      1,
      organs.length
    );
  }

  const note = cold.length
    ? `${organs.length - cold.length}/${organs.length} live; cold and untouched: ${cold.join(', ')}`
    : `all ${organs.length} organs routed within ${window}d`;

  return PASS(organs.length, note);
}

// ── cli ───────────────────────────────────────────────────────────────────
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [kind, organ] = process.argv.slice(2);
  if (!['route', 'build'].includes(kind) || !organ) {
    console.error('usage: 02-selfuse.mjs <route|build> <organ>');
    process.exit(2);
  }
  console.log(JSON.stringify(append({ kind, organ })));
}
