// gate/lib.mjs — shared primitives. No dependencies, no network, no model calls.
//
// This directory is the BUILDER'S GATE. Every event written here is builder-
// jurisdiction by construction. The player surface gets no projection of gate
// telemetry, grounds, counts, self-use or blank assertions from this module.
//
// Ledger discipline: append-only JSONL, plain text, readable with `cat` and
// parseable with nothing running. Data survival is not tool survival.

import { readFileSync, appendFileSync, existsSync, statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)));
export const DAY = 86_400_000;
export const BUILDER = 'builder';

export const p = (...seg) => resolve(ROOT, ...seg);

// ── config ────────────────────────────────────────────────────────────────
// key = value, one per line, # comments. Plain text on purpose.
export function conf(file = 'gate.conf') {
  const out = {};
  if (!existsSync(p(file))) return out;
  for (const line of readFileSync(p(file), 'utf8').split('\n')) {
    const s = line.trim();
    if (!s || s.startsWith('#')) continue;
    const i = s.indexOf('=');
    if (i < 0) continue;
    out[s.slice(0, i).trim()] = s.slice(i + 1).trim();
  }
  return out;
}

export function num(c, key, fallback) {
  const v = Number(c[key]);
  return Number.isFinite(v) ? v : fallback;
}

// ── plain-text lists ──────────────────────────────────────────────────────
export function lines(file) {
  if (!existsSync(p(file))) return [];
  return readFileSync(p(file), 'utf8')
    .split('\n')
    .map((s) => s.trim())
    .filter((s) => s && !s.startsWith('#'));
}

// ── append-only ledger ────────────────────────────────────────────────────
export function ledger(file = 'LEDGER.jsonl') {
  if (!existsSync(p(file))) return [];
  const out = [];
  for (const line of readFileSync(p(file), 'utf8').split('\n')) {
    const s = line.trim();
    if (!s || s.startsWith('#')) continue;
    try {
      const o = JSON.parse(s);
      if (o && typeof o === 'object') out.push(o);
    } catch {
      out.push({ kind: 'UNPARSEABLE', raw: s });
    }
  }
  return out;
}

// Structural jurisdiction guard. Gate code cannot write a player event even
// when a caller tries to supply one explicitly. That projection belongs to the
// world surface, not to this ledger.
export function assertGateJurisdiction(obj) {
  if (obj?.jurisdiction && obj.jurisdiction !== BUILDER) {
    throw new Error(`gate ledger refuses jurisdiction "${obj.jurisdiction}"; only "${BUILDER}" is writable here`);
  }
  return obj;
}

export function append(obj, file = 'LEDGER.jsonl') {
  assertGateJurisdiction(obj);
  const rec = { ts: new Date().toISOString(), jurisdiction: BUILDER, ...obj };
  appendFileSync(p(file), JSON.stringify(rec) + '\n', 'utf8');
  return rec;
}

// The same event may have multiple lawful projections, but builder-gate events
// deliberately have NO player projection. This is a guard against accidentally
// turning capacity, refusal grounds, blank assertions or self-use into player UI.
export function project(event, jurisdiction) {
  if (jurisdiction === BUILDER) return event;
  if (jurisdiction === 'player') return null;
  throw new Error(`unknown projection jurisdiction "${jurisdiction}"`);
}

// Marks are admissions. Same jurisdiction, same append-only discipline, its own
// file -- so `what has landed` is answerable without reading the refusal
// history, and so a bad month cannot bury it.
export const marks = (file = 'MARKS.jsonl') => ledger(file);

export function mark(obj, file = 'MARKS.jsonl') {
  if (typeof obj?.made !== 'string' || obj.made.trim().length < 3) {
    throw new Error('refused: a mark must name what it made possible (--made).');
  }
  return append({ kind: 'mark', ...obj, made: obj.made.trim() }, file);
}

export const t = (v) => (typeof v === 'number' ? v : Date.parse(v));
export const daysSince = (when, now = Date.now()) => (now - t(when)) / DAY;
export const iso = (ms) => new Date(ms).toISOString().slice(0, 10);
export const bytes = (f) => (existsSync(f) ? statSync(f).size : 0);

// ── verdicts ──────────────────────────────────────────────────────────────
// `checked` is the presence assertion. LEARNED 4: a blank screen passes every
// refusal test, so an ACTIVE instrument that examined nothing must never print
// green. HELD is different: a candidate mechanism exists but is not installed
// because its fork remains open.
export const PASS = (checked, note = '') => ({ status: 'pass', ok: true, checked, note });

export const REFUSE = (reason, returnInDays = 1, checked = 1) => ({
  status: 'refuse',
  ok: false,
  checked,
  reason,
  returnAt: iso(Date.now() + returnInDays * DAY),
});

export const VACUOUS = (reason) => ({
  status: 'vacuous',
  ok: false,
  vacuous: true,
  checked: 0,
  reason,
  returnAt: iso(Date.now() + DAY),
});

export const HOLD = (checked, note) => ({
  status: 'held',
  ok: null,
  held: true,
  checked,
  note,
});

// ADMIT is the fourth verdict, and the one the first build was missing.
//
// A gate assembled entirely out of a census of deaths can only ever reach zero:
// PASS does not mean anything landed, it means no refusal fired. There was no
// ledger entry anywhere for `this worked`, and an apparatus that can only say
// no is a wall rather than a gate.
//
// ADMIT carries the same mechanical weight as REFUSE. A refusal must state a
// ground and a return date; an admission must state WHAT IT MADE POSSIBLE --
// not what it prevented. That field name is the frame made structural: an
// admission written in the language of avoided harm cannot be filed here,
// because there is nowhere to put it.
export const ADMIT = (checked, made, note = '') => {
  if (typeof made !== 'string' || made.trim().length < 3) {
    throw new Error('an admission must name what it made possible; there is no field for what it prevented');
  }
  return { status: 'admit', ok: true, admitted: true, checked, made: made.trim(), note };
};

// ── cost declaration ──────────────────────────────────────────────────────
// Mirrors the seat-cost instrument: a parser cannot see what an organ costs,
// so each instrument states it in the first person and the runner checks only
// that it said something.
export const declaresCost = (mod) => typeof mod.cost === 'string' && /^I\s/.test(mod.cost.trim());
