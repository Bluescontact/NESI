// visit-writer.js — 2026-08-22, Kevin's mark: automatic write on every seat
// arrival, no repeated prompt per visit.
//
// WHAT THIS IS NOT: not a network call. This never touches fetch, XHR,
// WebSocket, or any loopback server — an earlier attempt at recording seat
// arrivals used a loopback HTTP POST from ascent.html and correctly tripped
// tools/refusal_check.js (law 3/11) and tools/zero_dependencies_check.js
// (K3), and was reverted. This module writes to a local FILE the browser has
// been granted a handle to, entirely offline, via the File System Access API
// (showSaveFilePicker → FileSystemFileHandle → createWritable). No dependency,
// no remote script, nothing outward — the same law those two checks enforce.
//
// THE ONE UNAVOIDABLE COST: a browser will not grant file-write access
// without a real user gesture. The FIRST connection is a small, clearly
// labeled button — there is no way around that and this file does not try
// to fake one. After that one click, the granted FileSystemFileHandle is
// persisted in IndexedDB, and every later `recordVisit(seat)` call —
// including on the next page load, once queryPermission confirms the grant
// still stands — writes silently. No dialog, no toast, no confirm().
//
// KNOWN, NAMED LIMITATIONS (do not paper over these):
//   - Chromium only (Chrome, Edge, Opera, etc.) as of this writing. Firefox
//     and Safari do not implement showSaveFilePicker at all. On those
//     browsers `supported` is false below and every call in this file is a
//     silent no-op — seat navigation is never affected either way.
//   - Requires a secure context (https, or http://localhost) OR a plain
//     file:// origin — Chromium currently allows the File System Access API
//     on file:// pages, which is how this project is actually opened per its
//     own serving docs, but that is a Chromium implementation detail, not a
//     spec guarantee, and could change.
//   - The browser's own save dialog, not this file, decides where the file
//     lands. There is no API to force a starting folder to an arbitrary
//     project path (only a small set of well-known folders, or a handle
//     already used before) — this file only *suggests* the name
//     "seat-visits.json". Point the picker at nesi/game2d/ (the same folder
//     as this page) by hand on first connect, or gate/derive_routes.mjs will
//     not find the file at its default expected path.
//   - A permission grant can lapse (browser policy, profile change, moved
//     file). When that happens this file falls back to a small "reconnect"
//     button rather than silently failing forever — it does not re-prompt on
//     every seat arrival, only surfaces one small control once.
//
// Exposed as window.VisitWriter = { supported, isConnected, connect, recordVisit }.

(function () {
  "use strict";

  var SUPPORTED =
    typeof window !== "undefined" && typeof window.showSaveFilePicker === "function";

  var DB_NAME = "nesi-visit-writer";
  var DB_VERSION = 1;
  var STORE = "handles";
  var HANDLE_KEY = "seat-visits";
  var SUGGESTED_NAME = "seat-visits.json";

  var handle = null;
  var connected = false;
  var btn = null;

  // ── tiny promise-based IndexedDB helpers, no library ──────────────────
  function idbOpen() {
    return new Promise(function (resolve, reject) {
      if (!("indexedDB" in window)) { reject(new Error("no indexedDB")); return; }
      var req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = function () {
        if (!req.result.objectStoreNames.contains(STORE)) req.result.createObjectStore(STORE);
      };
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () { reject(req.error); };
    });
  }
  function idbGet(key) {
    return idbOpen().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction(STORE, "readonly");
        var r = tx.objectStore(STORE).get(key);
        r.onsuccess = function () { resolve(r.result || null); };
        r.onerror = function () { reject(r.error); };
      });
    });
  }
  function idbSet(key, val) {
    return idbOpen().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction(STORE, "readwrite");
        tx.objectStore(STORE).put(val, key);
        tx.oncomplete = function () { resolve(); };
        tx.onerror = function () { reject(tx.error); };
      });
    });
  }

  // ── the one-time UI, plain DOM, no framework, never a repeated prompt ──
  function hideButton() {
    if (btn && btn.parentNode) btn.parentNode.removeChild(btn);
    btn = null;
  }
  function showButton(label, onClick) {
    hideButton();
    btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = label;
    btn.style.cssText =
      "position:fixed;right:14px;bottom:14px;z-index:30;" +
      "font:11px ui-monospace,Consolas,'SF Mono',monospace;letter-spacing:.03em;" +
      "padding:8px 12px;border:1px solid rgba(238,236,226,.3);border-radius:3px;" +
      "background:rgba(20,24,28,.92);color:rgba(238,236,226,.75);cursor:pointer;";
    btn.addEventListener("click", function () {
      onClick().catch(function () { /* never surface a browser-permission error to the player */ });
    });
    document.body.appendChild(btn);
  }

  function markConnected(h) {
    handle = h;
    connected = true;
    hideButton();
  }

  function offerConnect() {
    if (!SUPPORTED) return;
    showButton("connect a local file to track seat visits", connect);
  }

  async function connect() {
    if (!SUPPORTED) return;
    var h = await window.showSaveFilePicker({
      suggestedName: SUGGESTED_NAME,
      types: [{ description: "JSON", accept: { "application/json": [".json"] } }],
    });
    try { await idbSet(HANDLE_KEY, h); } catch (e) { /* handle still usable this session even if IDB fails */ }
    markConnected(h);
  }

  async function tryReconnectSilently() {
    var h;
    try { h = await idbGet(HANDLE_KEY); } catch (e) { offerConnect(); return; }
    if (!h) { offerConnect(); return; }
    var perm;
    try { perm = await h.queryPermission({ mode: "readwrite" }); } catch (e) { offerConnect(); return; }
    if (perm === "granted") { markConnected(h); return; }
    // Permission lapsed. queryPermission never needs a gesture; requestPermission
    // does, so this is one small reconnect control, never an automatic re-ask.
    showButton("reconnect local visit file", async function () {
      var p2 = await h.requestPermission({ mode: "readwrite" });
      if (p2 === "granted") markConnected(h);
    });
  }

  async function recordVisit(seat) {
    if (!SUPPORTED || !connected || !handle) return; // silent no-op — degrade, never throw
    try {
      var perm = await handle.queryPermission({ mode: "readwrite" });
      if (perm !== "granted") return;
      var data = {};
      try {
        var file = await handle.getFile();
        var text = await file.text();
        if (text) data = JSON.parse(text) || {};
      } catch (e) { data = {}; }
      if (!data || typeof data !== "object") data = {};
      data[String(seat).toUpperCase()] = new Date().toISOString();
      var w = await handle.createWritable();
      await w.write(JSON.stringify(data, null, 2));
      await w.close();
    } catch (e) { /* fire-and-forget: seat navigation must never depend on this */ }
  }

  if (SUPPORTED) {
    tryReconnectSilently().catch(function () { offerConnect(); });
  }

  window.VisitWriter = {
    supported: SUPPORTED,
    isConnected: function () { return connected; },
    connect: connect,
    recordVisit: recordVisit,
  };
})();
