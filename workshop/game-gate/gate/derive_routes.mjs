#!/usr/bin/env node
// gate/derive_routes.mjs — the reader half of automatic seat-visit recording.
//
// ascent.html's visit-writer.js (../visit-writer.js) writes
// `{SEAT: isoTimestamp, ...}` to a local file the browser was granted a
// handle to, silently, on every enterSeat(seat) call — real disk I/O, no
// network, no server. This file is the other end: it reads whatever that
// file holds and appends `{kind:'route', organ}` events to gate/LEDGER.jsonl
// for anything newer than what is already recorded, the same event shape
// `node instruments/02-selfuse.mjs route <organ>` and route-server.mjs
// already write, so 02-selfuse needs no change to read it.
//
// WHERE THE FILE IS EXPECTED, AND WHY: the browser's save dialog decides
// where the visits file actually lands — the File System Access API has no
// way to force a starting folder to an arbitrary project path (see
// ../visit-writer.js's own header). The expected default is
// nesi/game2d/seat-visits.json — a sibling of ascent.html, the same folder
// this page is opened from, which is what a hand pointing the save dialog at
// "here" on first connect will produce. Override with SEAT_VISITS_PATH if the
// file was saved somewhere else.
//
// IDEMPOTENT: a seat's visit timestamp is only turned into a new route event
// if it is newer than the ts of the last route event already on record for
// that seat (of ANY origin — route-server.mjs, the manual CLI, or a prior run
// of this file). Running this twice on an unchanged visits file appends
// nothing the second time.
//
// Silent no-op if the visits file does not exist or does not parse — this is
// a quiet derive-and-append step, not a gate instrument. It never refuses,
// never holds, never passes, and has no verdict of its own.
//
//   node gate/derive_routes.mjs
//   SEAT_VISITS_PATH=/other/path/seat-visits.json node gate/derive_routes.mjs

import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ledger, append, lines, ROOT } from './lib.mjs';

export const DEFAULT_VISITS_PATH = resolve(ROOT, '..', 'seat-visits.json');

export function deriveRoutes(visitsPath) {
  const target = visitsPath
    ? resolve(visitsPath)
    : (process.env.SEAT_VISITS_PATH
        ? resolve(process.cwd(), process.env.SEAT_VISITS_PATH)
        : DEFAULT_VISITS_PATH);

  if (!existsSync(target)) {
    return { ran: false, appended: 0, seats: [], visitsPath: target, reason: `no visits file at ${target}` };
  }

  let visits;
  try {
    visits = JSON.parse(readFileSync(target, 'utf8'));
  } catch (e) {
    return { ran: false, appended: 0, seats: [], visitsPath: target, reason: `visits file did not parse as JSON: ${e.message}` };
  }
  if (!visits || typeof visits !== 'object' || Array.isArray(visits)) {
    return { ran: false, appended: 0, seats: [], visitsPath: target, reason: 'visits file is not a {SEAT: timestamp} object' };
  }

  const organs = new Set(lines('ORGANS.txt'));
  const events = ledger();

  // Last route ts per organ, across every route event already on record —
  // this is the "already in gate/LEDGER.jsonl for that seat" line, and it is
  // what makes a second run idempotent regardless of who wrote the earlier
  // event (route-server.mjs, the CLI, or this file itself).
  const lastRouteTs = new Map();
  for (const e of events) {
    if (e.kind !== 'route' || !e.organ) continue;
    const prev = lastRouteTs.get(e.organ);
    if (!prev || e.ts > prev) lastRouteTs.set(e.organ, e.ts);
  }

  const seats = [];
  for (const [seatRaw, tsRaw] of Object.entries(visits)) {
    const seat = String(seatRaw || '').trim().toUpperCase();
    if (!organs.has(seat)) continue; // not a named seat — skip silently, not a refusal
    const visitMs = Date.parse(tsRaw);
    if (!Number.isFinite(visitMs)) continue; // not a real timestamp — skip silently
    const visitTs = new Date(visitMs).toISOString();
    const last = lastRouteTs.get(seat);
    if (last && last >= visitTs) continue; // already recorded, at least this recent

    const rec = append({ kind: 'route', organ: seat, via: 'derive_routes', visitedAt: visitTs });
    lastRouteTs.set(seat, rec.ts);
    seats.push(seat);
  }

  return { ran: true, appended: seats.length, seats, visitsPath: target };
}

// ── cli ───────────────────────────────────────────────────────────────────
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const r = deriveRoutes();
  if (!r.ran) {
    console.log(`[derive_routes] no-op — ${r.reason}`);
  } else if (r.appended === 0) {
    console.log(`[derive_routes] read ${r.visitsPath} — nothing newer than what LEDGER.jsonl already holds`);
  } else {
    console.log(`[derive_routes] read ${r.visitsPath} — appended ${r.appended} route event(s): ${r.seats.join(', ')}`);
  }
}
