#!/usr/bin/env node
// route-server.mjs — the smallest bridge between a browser seat and the
// builder's gate.
//
// THE GAP THIS CLOSES: 02-selfuse reads route events from LEDGER.jsonl, and
// the only way to write one has been `node instruments/02-selfuse.mjs route
// <organ>`, typed by hand. Nothing in tank.html or ascent.html — the actual
// pages a hand plays — has ever called it. A browser page has no filesystem
// access and cannot append to LEDGER.jsonl itself; it can only ask something
// that does. This is that something: the smallest local HTTP server that
// does nothing but accept `{organ}` and call the exact same `append()` the
// CLI already calls, so 02-selfuse needs no change to read it.
//
// Honesty, stated once: if this process is not running, route events are not
// recorded. The pages degrade silently (fetch wrapped in try/catch, fire-
// and-forget) rather than pretending an offline gate is a working one.
//
//     node gate/route-server.mjs
//
// listens on 127.0.0.1:8791 (override with GATE_ROUTE_PORT).

import { createServer } from 'node:http';
import { append, lines } from './lib.mjs';

const PORT = Number(process.env.GATE_ROUTE_PORT) || 8791;

function cors(res, origin) {
  // file:// pages send Origin: null; a local static server sends its own
  // origin. Either way this is a loopback-only dev bridge, not a public API,
  // so it echoes whatever origin asked rather than gatekeeping one.
  res.setHeader('Access-Control-Allow-Origin', origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

const server = createServer((req, res) => {
  const origin = req.headers.origin;
  cors(res, origin);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('gate route-server — POST /route {organ} to record a seat arrival\n');
    return;
  }

  if (req.method === 'POST' && req.url === '/route') {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => {
      let organ;
      try {
        organ = String(JSON.parse(body || '{}').organ || '').trim().toUpperCase();
      } catch {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: 'body was not valid JSON' }));
        return;
      }
      const organs = lines('ORGANS.txt');
      if (!organ || !organs.includes(organ)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: `"${organ}" is not a seat named in ORGANS.txt` }));
        return;
      }
      const rec = append({ kind: 'route', organ, via: 'route-server' });
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, rec }));
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ ok: false, error: 'not found' }));
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`[route-server] listening on http://127.0.0.1:${PORT} — POST /route {organ}`);
});
