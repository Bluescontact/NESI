#!/usr/bin/env node
/*
 * PHONE_CHECK — the seed-POST equivalent of refusal_check.js, standing
 * BEFORE the surface it lints exists. (The Seat, reconciled 2026-09-03:
 * "the phone is thin: a writing surface, a microphone, a POST to your
 * seed. It got heavier by a mic and no smarter.")
 *
 * refusal_check.js enforces the game's law: NO network primitive at all.
 * The phone page's law is one notch different and needs its own
 * instrument: EXACTLY ONE network path — a POST to the declared seed —
 * and nothing else. A page that grows a second call, a GET, an analytics
 * hook, or a model call has stopped being thin, and this lint fails it.
 *
 * JURISDICTION LINE, stated because the register asked for it in words:
 *   a transcriber is not a recognizer. The phone may carry audio and run
 *   transcription; transcription is mechanical rendering of speech into
 *   correctable text. It confers no authority to interpret, summarize,
 *   rank, or respond. Any construct on the phone surface that reads the
 *   transcript for meaning is out of jurisdiction, and the vocabulary
 *   list below catches the common spellings of that move.
 *
 * WHAT THIS CHECKS:
 *   - every network token (fetch/XHR/WebSocket/beacon) outside the single
 *     block marked  /* SEED-POST *​/ ... /* END SEED-POST *​/
 *   - more than one SEED-POST block (one path means one)
 *   - model/interpretation vocabulary anywhere (summarize, classify,
 *     sentiment, relevance, embedding, completion, prompt) — the
 *     transcriber-not-recognizer line, mechanized
 *   - scoring vocabulary, same list discipline as refusal_check
 *
 * WHAT THIS DOES NOT CHECK (silence is not a pass):
 *   - it cannot verify the POST body carries only the stone (audio,
 *     transcript, time, source) — that is a human read of the payload
 *   - it cannot verify the seed's own conduct; it lints the phone only
 *   - the token lists can go stale the way refusal_check's file list did
 *     on 2026-08-16 — a breach can ride through a list; the lists are an
 *     instrument, not the verification bar
 *
 * STANDING RULE: if the phone directory does not exist yet, this prints
 * ABSENT and exits 0 — absence of the surface is lawful; absence of the
 * lint once the surface exists would not have been. Point check_all here
 * the day the first phone file lands.
 *
 * Usage: node tools/phone_check.js [dir-or-file, default ../../../phone]
 * Exits 0 on PASS or ABSENT; exits 1 and lists every hit otherwise.
 */
"use strict";
const fs = require("fs");
const path = require("path");

const NET = /\b(fetch|XMLHttpRequest|WebSocket|EventSource|sendBeacon|navigator\.serviceWorker|importScripts)\b/g;
const INTERPRET = /\b(summariz|classif|sentiment|relevan|embedding|completion|prompt\b|inference|recogniz)\w*/gi;
const SCORE = /\b(score|streak|rank|leaderboard|achievement|xp)\b/gi;
const OPEN_MARK = "/* SEED-POST */";
const CLOSE_MARK = "/* END SEED-POST */";

const target = process.argv[2] || path.join(__dirname, "..", "..", "..", "phone");

function stripComments(src) {
  return src.replace(/\/\*[\s\S]*?\*\//g, m => (m === OPEN_MARK || m === CLOSE_MARK ? m : ""))
            .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

function listFiles(p) {
  const st = fs.statSync(p);
  if (st.isFile()) return [p];
  return fs.readdirSync(p, { withFileTypes: true }).flatMap(e => {
    const full = path.join(p, e.name);
    if (e.isDirectory()) return listFiles(full);
    return /\.(html|js|mjs|ts)$/.test(e.name) ? [full] : [];
  });
}

if (!fs.existsSync(target)) {
  console.log(`ABSENT — no phone surface at ${target}; lawful. The lint stands ready.`);
  process.exit(0);
}

const hits = [];
for (const file of listFiles(target)) {
  const raw = fs.readFileSync(file, "utf8");
  const src = stripComments(raw);

  const opens = src.split(OPEN_MARK).length - 1;
  const closes = src.split(CLOSE_MARK).length - 1;
  if (opens !== closes) hits.push(`${file}: unbalanced SEED-POST marks (${opens} open, ${closes} close)`);
  if (opens > 1) hits.push(`${file}: ${opens} SEED-POST blocks — one path means one`);

  // Excise the single sanctioned block, then no network token may remain.
  let outside = src;
  if (opens === 1 && closes === 1) {
    const a = src.indexOf(OPEN_MARK), b = src.indexOf(CLOSE_MARK);
    if (b > a) outside = src.slice(0, a) + src.slice(b + CLOSE_MARK.length);
  }
  for (const m of outside.matchAll(NET)) hits.push(`${file}: network token outside SEED-POST — "${m[0]}"`);
  for (const m of src.matchAll(INTERPRET)) hits.push(`${file}: interpretation vocabulary — "${m[0]}" (a transcriber is not a recognizer)`);
  for (const m of src.matchAll(SCORE)) hits.push(`${file}: scoring vocabulary — "${m[0]}"`);
}

if (hits.length) {
  console.error(`FAIL — ${hits.length} hit(s):`);
  for (const h of hits) console.error("  " + h);
  process.exit(1);
}
console.log("PASS — the phone is thin: one declared POST to the seed, no interpretation, no score.");
