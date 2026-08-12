#!/usr/bin/env python3
"""
NESI CORE — the loop/organ logic, importable. Standard library only.
No HTTP, no HTML, no browser — presentation lives elsewhere (nesi_app.py).

drop -> metabolize() underneath -> staged object (+lint) -> (Kevin's mark)

  Left pane  : nesi/inbox/    — drop a file here (Explorer drag IS the drop)
  Underneath : metabolize()   — THE ONE ENGINE SEAM. prompt in, structured
                                object out. Nothing else in the conductor
                                knows how the object gets made. Engines:
                                  stub        (engine #0 — running now)
                                  claude-cli  (claude -p, once installed)
                                Swapping engines = replacing one function
                                body. If a swap touches anything outside
                                metabolize(), the seam is misplaced — fix it.
  Lint       : lint_bridge.py — pattern library via tools/codex_index,
                                annotations attached to the object in place
  Right pane : nesi/staged/   — one JSON object per run, card on the surface
  The mark   : cross / hold / compost — Kevin's touch, recorded to
                nesi/marks/marks.jsonl. There is no approve verb and the
                conductor never marks on its own (gate law carried over).

Evidence lines: LOCAL-ONLY, Kevin's mark 2026-07-16. Verbatim raw text may
ride inside the staged object; every object carries raw_text_inside: true.
This organ never leaves the machine. Never wire it to anything that does.

Run:  python nesi/conductor/conductor.py              (watch + serve, port 8799)
      python nesi/conductor/conductor.py --once       (single poll pass)
      python nesi/conductor/conductor.py --no-engine  (detect+log only)
      set NESI_ENGINE=claude-cli                      (engine swap, body only)
"""

import json
import os
import shutil
import socket
import subprocess
import sys
import threading
import time
import uuid
import webbrowser
from datetime import datetime
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

# Frozen (PyInstaller) runs unpack to a temp dir — __file__ points there and
# vanishes between runs. Data must live somewhere persistent: next to the exe,
# which is placed in nesi/, so inbox/staged/marks are the SAME dirs as dev.
if getattr(sys, "frozen", False):
    NESI = Path(sys.executable).resolve().parent
else:
    NESI = Path(__file__).resolve().parents[1]
INBOX     = NESI / "inbox"
STAGED    = NESI / "staged"
MARKS     = NESI / "marks"
CONDUCTOR = NESI / "conductor"
LOG       = CONDUCTOR / "conductor_log.jsonl"
SEEN      = CONDUCTOR / "seen.json"
ORGAN     = NESI / "bench" / "metabolizer" / "SKILL.md"
MARKLOG   = MARKS / "marks.jsonl"
LINT      = CONDUCTOR / "lint_bridge.py"
DSS       = NESI.parent                      # nesi/ sits inside DSS content
CANON     = DSS / "patterns"                 # the pattern library — the surface plate
FOLDED    = CANON / "_folded"                # existing compost home; un-cross lands here
INDEXER   = DSS / "tools" / "codex_index" / "build_index.py"

PORT           = 8799
POLL_SECONDS   = 2
ENGINE_TIMEOUT = 420
CLAUDE_EXE     = Path.home() / ".local" / "bin" / "claude.exe"


def _find_claude():
    """The engine binary, wherever it answers from — PATH first, then the
    known install home (PATH broadcasts don't reach already-running parents)."""
    return shutil.which("claude") or (str(CLAUDE_EXE) if CLAUDE_EXE.exists() else None)


def current_engine():
    """Runtime engine selection — the socket picks the best available engine.
    NESI_ENGINE overrides; else the LOCAL model when its engine is registered
    (Ollama/hermes3 — no login, no cloud); else CLI if installed; else stub.
    Never silent: every staged object records which engine actually produced it."""
    forced = os.environ.get("NESI_ENGINE")
    if forced:
        return forced
    if "local" in _ARTICULATE_ENGINES:          # local model, no login, no cloud
        return "local"
    return "claude-cli" if _find_claude() else "stub"

for d in (INBOX, STAGED, MARKS, CONDUCTOR):
    d.mkdir(parents=True, exist_ok=True)


def now():
    return datetime.now().isoformat(timespec="seconds")


def log(event, **fields):
    entry = {"ts": now(), "event": event, **fields}
    with open(LOG, "a", encoding="utf-8") as f:
        f.write(json.dumps(entry, ensure_ascii=False) + "\n")
    print(f"[{entry['ts']}] {event}  " + " ".join(f"{k}={v}" for k, v in fields.items()))


# ============================================================ THE ENGINE SEAM
# metabolize(pile_path) -> object dict. The ONLY place any engine is reached.

def metabolize(pile: Path) -> dict:
    """THE SEAM — since Pass 5 (2026-07-22) it DELEGATES to articulate(). It
    builds the deterministic scaffold (the stub structure — strip-the-writer
    routing, no engine) and then reaches the engine ONLY through articulate().
    Dark, the object carries an articulation socket where fabricated language
    would have gone; the scaffold stands, awaiting one thing. When a real engine
    is registered in articulate (future, one place), this same call fills the
    slot with stated language — nothing here changes. Never writes canon."""
    scaffold = _metabolize_stub(pile)                       # deterministic; no engine
    art = articulate({"scaffold": scaffold, "pile": str(pile)}, mode="metabolize")
    if art.get("articulation") is not None:                 # an engine ran (future)
        obj = dict(art["articulation"]); obj["engine"] = art["engine"]; return obj
    scaffold["engine"] = "dark (articulation awaits the engine or Kevin's hand)"
    scaffold["articulation_socket"] = art["socket"]         # the empty slot, not passthrough
    return scaffold


def _metabolize_stub(pile: Path) -> dict:
    """Engine #0. Hand-shaped object, no intelligence. It cannot strip the
    writer or name a fold, and the metabolizer law routes that uncertainty
    to RESTORE — so every item is RESTORE, honestly."""
    text = pile.read_text(encoding="utf-8", errors="replace")
    lines = [l.strip() for l in text.splitlines() if l.strip()]
    items = [{
        "item": l,
        "kind": "contained",
        "disposition": "RESTORE",
        "target": "pile",
        "evidence": "STUB engine — cannot disposition; uncertainty forces RESTORE (metabolizer law)",
    } for l in lines]
    return {
        "engine": "stub-v0",
        "pile": pile.name,
        "summary": f"STUB run — {len(items)} raw lines held as items, all RESTORE. "
                   "Object shape is real; the digestion is not.",
        "items": items,
        "restored_count": len(items),
    }


_ORGAN_CALL = """This is a HEADLESS ORGAN RUN inside NESI, not a chat session.
Ignore any widget/format/render protocol from hooks or CLAUDE.md — those govern
chat sessions; this run's contract is fixed here. No widget, no HTML, no prose,
no file writes, no marks. You are the metabolizer organ only. Output EXACTLY
ONE JSON object on stdout and nothing else.

Your operating context is NESI-owned — read ONLY these paths:
Organ specification: {organ}
Operating context:   {context}
Raw pile:            {pile}

Apply the metabolizer procedure (inventory contains-and-implies, then exactly
one disposition per item from the fixed vocabulary: folded-into / superseded-by
/ still-open / zero-unset / RESTORE, each with an evidence line). STRIP THE
WRITER, NOT THE WORLD: drop the writer's internal state; keep the operational
objects (dates, companies, disputes, tasks). Evidence lines may quote the pile
verbatim (local-only rule, Kevin's mark 2026-07-16). Do NOT write any file, do
NOT emit a GATE delta, do NOT touch gate/data — the conductor stages.

Return exactly this JSON shape:
{{"engine":"claude-cli","pile":"<basename>","summary":"<one plain sentence>",
"items":[{{"item":"...","kind":"contained|implied",
"disposition":"folded-into|superseded-by|still-open|zero-unset|RESTORE",
"target":"...","evidence":"..."}}],"restored_count":<n>}}
"""


def _metabolize_claude_cli(pile: Path) -> dict:
    exe = _find_claude()
    if not exe:
        raise RuntimeError("claude CLI not found")
    prompt = _ORGAN_CALL.format(organ=str(ORGAN), pile=str(pile),
                                context=str(NESI / "mind" / "ORGAN_CONTEXT.md"))
    proc = subprocess.run(
        [exe, "-p"], input=prompt,
        capture_output=True, text=True, encoding="utf-8",
        timeout=ENGINE_TIMEOUT, cwd=str(NESI),
    )
    out = proc.stdout.strip()
    start, end = out.find("{"), out.rfind("}")
    if start == -1 or end == -1:
        raise ValueError(f"engine returned no JSON (rc={proc.returncode}): {out[:400]}")
    return json.loads(out[start:end + 1])


ENGINES = {"stub": _metabolize_stub, "claude-cli": _metabolize_claude_cli}
# ========================================================== /THE ENGINE SEAM


# =========================================================== ARTICULATION SEAM
# Pass 5 (2026-07-22, Kevin's mark). Before this the engine attached through TWO
# seams — metabolize(pile) and bench.invoke(op) — each touching current_engine()
# and its own registry directly. articulate() is now THE SINGLE point where
# stated language enters the tool: every operation verb reaches the engine ONLY
# through here (metabolize and bench.invoke delegate to it). Dark, it returns the
# empty-articulation socket as a Candidate — the scaffold is real, the language
# is an open slot; never fabricated, never RESTORE-everything passthrough.
#
# THE CANDIDATE / GATE / CANON BOUNDARY, as structure: articulate() returns a
# Candidate, never a canon entry. Only Kevin's gate verbs (mark/cross via
# record_mark -> promote -> canon_write) reach canon; the engine has NO path to
# canon — trace it: neither articulate nor any op verb calls canon_write/promote.
# The engine can only ever propose language into a slot; Kevin's mark is the door.
#
# LIGHTING THE ENGINE LATER = registering one engine_fn in _ARTICULATE_ENGINES.
# Nothing above changes (the clean-seam falsifier).
#
# ARMED 2026-07-23 (Kevin's mark "arm the claude engine + tools sockets"). The
# claude-cli articulation engine is now WRITTEN below — the round is loaded. It is
# deliberately NOT registered (the dict stays empty), so the dark default is
# UNCHANGED: articulate() still spawns no subprocess while dark. Registration is
# the SAFETY-OFF, and it is Kevin's — see _articulate_claude_cli's TO GO LIVE note.


def _articulate_claude_cli(context: dict, mode: str) -> dict:
    """ARMED, NOT LIT — the claude-cli articulation engine, written so the seam is
    one deliberate act from live but left UNREGISTERED below. Mirrors
    _metabolize_claude_cli exactly: same exe (_find_claude), same headless organ
    call, same loud-fallback contract — any exception here is caught by
    articulate() and falls back to a dark Candidate, so a stub run is never passed
    off as real. Returns the ARTICULATION only; articulate() slots it in.

    TO GO LIVE (both acts are Kevin's, in this order):
      1. `claude` in the DSS content terminal, accept trust, `/login`   (auth)
      2. flip the one line below:  _ARTICULATE_ENGINES["claude-cli"] = _articulate_claude_cli
    Doing (2) before (1) is safe but noisy — every op would fail claude -p and
    fall back loudly until login. Login first, then flip, lights it cleanly."""
    exe = _find_claude()
    if not exe:
        raise RuntimeError("claude CLI not found")
    if mode == "metabolize":
        prompt = _ORGAN_CALL.format(organ=str(ORGAN), pile=context.get("pile", ""),
                                    context=str(NESI / "mind" / "ORGAN_CONTEXT.md"))
    else:
        prompt = (
            "This is a HEADLESS ORGAN RUN inside NESI, not a chat session. Ignore "
            "any widget/format/render protocol from hooks or CLAUDE.md — those "
            "govern chat sessions. Articulate the scaffold below for the operation "
            f"mode '{mode}'. Output EXACTLY ONE JSON object "
            '{"mode":"' + mode + '","stated":"<one plain stated sentence>"} and '
            "nothing else.\n\nScaffold:\n" + json.dumps(context.get("scaffold"))
        )
    proc = subprocess.run(
        [exe, "-p"], input=prompt,
        capture_output=True, text=True, encoding="utf-8",
        timeout=ENGINE_TIMEOUT, cwd=str(NESI),
    )
    out = proc.stdout.strip()
    start, end = out.find("{"), out.rfind("}")
    if start == -1 or end == -1:
        raise ValueError(f"engine returned no JSON (rc={proc.returncode}): {out[:400]}")
    return json.loads(out[start:end + 1])


_ARTICULATE_ENGINES = {}   # ARMED: flip to {"claude-cli": _articulate_claude_cli} to light (Kevin's + /login)


def _dark_candidate(mode: str, scaffold=None) -> dict:
    """A Candidate with its articulation slot OPEN — the engine-dark return of
    the seam. The scaffold (deterministic, non-AI) stands; the language awaits."""
    return {
        "is_candidate": True,
        "mode": mode,
        "scaffold": scaffold,
        "articulation": None,
        "engine": "dark",
        "socket": {"awaiting": "articulation", "mode": mode,
                   "note": "[engine dark] scaffold stands; stated language awaits "
                           "the engine (unlit) or Kevin"},
    }


def articulate(context: dict, mode: str) -> dict:
    """THE ARTICULATION SEAM — the single point where stated language enters.
    Every operation verb reaches the engine ONLY through here. `context` carries
    the deterministic scaffold + what the call needs; `mode` names the kind of
    articulation. Returns a Candidate. Dark (no registered engine), the Candidate
    carries an empty-articulation socket. Never writes canon — only Kevin's mark
    promotes a Candidate toward canon."""
    eng = current_engine()
    if eng not in _ARTICULATE_ENGINES:          # dark: the sole, honest default
        return _dark_candidate(mode, context.get("scaffold"))
    try:
        stated = _ARTICULATE_ENGINES[eng](context, mode)     # a real engine, when wired
        c = _dark_candidate(mode, context.get("scaffold"))
        c["articulation"] = stated
        c["engine"] = eng
        c["socket"] = None                       # slot filled
        return c
    except Exception as e:
        log("articulate-fallback", engine=eng, mode=mode, error=str(e)[:160])
        return _dark_candidate(mode, context.get("scaffold"))
# ========================================================== /ARTICULATION SEAM


def load_seen():
    return json.loads(SEEN.read_text(encoding="utf-8")) if SEEN.exists() else {}


def save_seen(seen):
    SEEN.write_text(json.dumps(seen, indent=2), encoding="utf-8")


def capture_paste(text: str) -> Path:
    """The intake drop's write path — a pasted page becomes a real file
    in INBOX, timestamped, so the existing watcher (poll_once, above)
    picks it up on its next pass exactly like an Explorer-dropped file.
    No new pipeline: this is the SAME drop the left pane has always
    watched, just fed from a paste instead of a file manager. Capture
    only — staging/lint/metabolize still happen underneath, unchanged."""
    text = (text or "").strip()
    if not text:
        raise ValueError("nothing to capture — empty paste")
    stamp = datetime.now().strftime("%Y-%m-%d_%H%M%S")
    p = INBOX / f"paste_{stamp}.md"
    n = 2
    while p.exists():
        p = INBOX / f"paste_{stamp}_{n}.md"
        n += 1
    p.write_text(text, encoding="utf-8")
    log("paste-captured", pile=p.name, bytes=len(text.encode("utf-8")))
    return p


def is_pile(p: Path):
    n = p.name
    return p.is_file() and not (n.startswith("_") or n.startswith(".") or n.startswith("~"))


def stable(p: Path):
    s1 = p.stat().st_size
    time.sleep(0.5)
    return p.stat().st_size == s1


def stage(pile: Path, obj: dict, error: str = None) -> Path:
    sid = f"{datetime.now():%Y-%m-%d}_{pile.stem}_{uuid.uuid4().hex[:6]}"
    staged_obj = {
        "id": sid,
        "pile": pile.name,
        "pile_path": str(pile),
        "raw_text_inside": True,   # local-only rule: verbatim text may ride here
        "run": {"finished": now(), "engine": obj.get("engine", current_engine()) if obj else current_engine(), "error": error},
        "object": obj,
        "lint": None,
        "mark": {"verdict": None, "at": None},
    }
    path = STAGED / f"{sid}.json"
    path.write_text(json.dumps(staged_obj, indent=2, ensure_ascii=False), encoding="utf-8")
    return path


def _python_for_lint():
    """Frozen exe: sys.executable IS the exe (re-running it would fork NESI,
    not run a script) — find a system python instead, or skip lint."""
    if not getattr(sys, "frozen", False):
        return sys.executable
    return shutil.which("python") or shutil.which("py")


def lint(staged_path: Path):
    py = _python_for_lint()
    if py is None or not LINT.exists():
        raise RuntimeError("no system python / lint_bridge for lint (frozen run)")
    proc = subprocess.run([py, str(LINT), str(staged_path)],
                          capture_output=True, text=True, timeout=300)
    if proc.returncode != 0:
        raise RuntimeError(f"lint failed: {proc.stderr[:300]}")


def poll_once(seen, engine=True):
    for p in sorted(INBOX.iterdir()):
        if not is_pile(p):
            continue
        key = f"{p.name}:{p.stat().st_mtime_ns}"
        if key in seen:
            continue
        if not stable(p):
            continue
        log("drop-detected", pile=p.name, bytes=p.stat().st_size)
        seen[key] = {"detected": now(), "staged": None}
        if engine:
            try:
                log("organ-run-start", pile=p.name, engine=current_engine())
                obj = metabolize(p)                       # the seam
                staged_path = stage(p, obj)
                seen[key]["staged"] = staged_path.name
                log("organ-run-done", pile=p.name, staged=staged_path.name,
                    items=len(obj.get("items", [])))
                try:
                    lint(staged_path)
                    log("lint-done", staged=staged_path.name)
                except Exception as e:
                    log("lint-error", staged=staged_path.name, error=str(e)[:200])
            except Exception as e:
                staged_path = stage(p, {}, error=str(e)[:500])
                seen[key]["staged"] = staged_path.name
                log("organ-run-error", pile=p.name, error=str(e)[:200])
        save_seen(seen)


# ============================================================== THE CROSSING
# cross -> the staged object becomes library material the lint reads against.
# Fires ONLY on Kevin's explicit touch — never automatic, never batched.
# Reversible: un-cross moves the file to patterns/_folded/ (SUBTRACTION law:
# status change, never hard-delete) and the index is rebuilt both ways.
# Membrane note: the Membrane Controller holds exclusive write authority at
# Promote-Ready -> Library. This path writes only on Kevin's own gesture —
# the gate stays his body — but it IS a second write path; the amendment
# recognizing it is staged for his mark, face-up, not assumed.

def promote(obj: dict) -> str:
    """Write the crossed object into patterns/ with full lineage.

    Two-state model (Rebuild pass 3, 2026-07-22): a spawned descendant carries
    its own finished markdown in object.body_markdown (a copy of a frozen canon
    pattern, edited, with an EXTENDS line to the ancestor). Cross it and that
    body IS the new canon version, written verbatim — no metabolizer template.
    Everything else still crosses through the template path below."""
    fname = f"crossed_{Path(obj['pile']).stem}_{obj['id'][-6:]}.md"
    body_markdown = (obj.get("object") or {}).get("body_markdown")
    if body_markdown:
        return canon_write(fname, body_markdown,
                           via="cross-supersede" if obj.get("supersedes") else "cross")
    items = obj.get("object", {}).get("items", [])
    lines = [f"# Crossed: {obj['pile']}", "",
             "**Provenance — this entered canon by Kevin's cross at the NESI conductor.**",
             f"- origin pile: `{obj['pile']}` (raw text local-only in nesi/inbox/)",
             f"- staged object: `{obj['id']}.json`",
             f"- engine of the run: {obj['run'].get('engine')}",
             f"- crossed at: {now()}",
             f"- reversal path: un-cross moves this file to patterns/_folded/",
             "", "---", "",
             f"## What this is", "",
             obj.get("object", {}).get("summary", ""), "",
             "## Operational content", ""]
    for it in items:
        lines.append(f"- **{it.get('item','')}**")
        lines.append(f"  - disposition at staging: {it.get('disposition')} → {it.get('target')}")
        lines.append(f"  - evidence: {it.get('evidence','')}")
    return canon_write(fname, "\n".join(lines) + "\n", via="cross")


# ===================================================== THE HARD CANON GUARD
# Kevin's mark 2026-07-22 ("install the hard guard against off-path canon
# writes"). Canon is immutable in place; the ONLY sanctioned way a canon file
# comes to exist is a lawful cross/supersede through canon_write(), which
# records the write's sha in the sanction log. guard_audit() then holds the
# floor: every patterns/*.md must trace to a lawful write — its sha in the
# codex manifest (the built cache) OR in the sanction log. Anything else was
# written OFF-PATH (a stray tool, a hand-edit, a botched test — exactly the
# Step-1 incident) and the guard fails CLOSED: the cross path refuses to build
# on a canon it can't vouch for, and the window surfaces the breach.

import hashlib as _hashlib

SANCTION_LOG = MARKS / "canon_sanction.jsonl"
MANIFEST = DSS / "tools" / "codex_index" / "db" / "index_manifest.json"


def _sanction(fname: str, sha: str, via: str) -> None:
    MARKS.mkdir(parents=True, exist_ok=True)
    with open(SANCTION_LOG, "a", encoding="utf-8") as f:
        f.write(json.dumps({"ts": now(), "file": fname, "sha": sha, "via": via},
                           ensure_ascii=False) + "\n")


def canon_write(fname: str, text: str, via: str = "cross") -> str:
    """THE ONLY sanctioned way to write a canon file. Writes patterns/<fname>
    as exact bytes (no newline translation — the Step-1 lesson) and records the
    write's sha so guard_audit() can tell a lawful write from an off-path one."""
    if not text.endswith("\n"):
        text += "\n"
    data = text.encode("utf-8")
    (CANON / fname).write_bytes(data)
    _sanction(fname, _hashlib.sha256(data).hexdigest(), via)
    return fname


def _sanctioned_shas() -> set:
    if not SANCTION_LOG.exists():
        return set()
    out = set()
    for line in SANCTION_LOG.read_text(encoding="utf-8").splitlines():
        try:
            out.add(json.loads(line)["sha"])
        except Exception:
            pass
    return out


def guard_audit() -> dict:
    """Fail-closed canon guard. Returns {clean, offpath[], checked}. A canon
    file is lawful iff its current sha is in the codex manifest OR the sanction
    log. offpath lists any that are neither — written outside the lawful path."""
    manifest_shas = set()
    try:
        m = json.loads(MANIFEST.read_text(encoding="utf-8"))
        manifest_shas = {e.get("content_sha") for e in m.get("entries", {}).values()}
    except Exception:
        pass
    lawful = manifest_shas | _sanctioned_shas()
    offpath, checked = [], 0
    if CANON.exists():
        for p in sorted(CANON.glob("*.md")):
            checked += 1
            if _hashlib.sha256(p.read_bytes()).hexdigest() not in lawful:
                offpath.append(p.name)
    return {"clean": not offpath, "offpath": offpath, "checked": checked}
# =================================================== /THE HARD CANON GUARD


def rebuild_index_sync():
    """Refresh the codex index NOW. Raises on any failure — the caller must
    roll its canon write back. SYNC-LOUD invariant: folder and index always
    agree, or the operation failed and said so. (NESI_BREAK_REBUILD=1 is a
    test hook that simulates failure.)"""
    if os.environ.get("NESI_BREAK_REBUILD"):
        raise RuntimeError("rebuild failure simulated (NESI_BREAK_REBUILD)")
    py = _python_for_lint()
    if py is None or not INDEXER.exists():
        raise RuntimeError("no system python / indexer available for rebuild")
    proc = subprocess.run([py, str(INDEXER)], capture_output=True,
                          text=True, timeout=600, cwd=str(DSS))
    if proc.returncode != 0:
        raise RuntimeError(f"index rebuild failed rc={proc.returncode}: "
                           f"{(proc.stderr or proc.stdout)[-300:]}")
    log("index-rebuilt")


def uncross(sid: str) -> dict:
    """Pull a mistaken cross back out of the library. As inspectable as the
    cross, and sync-loud the same way: if the rebuild fails, the fold reverts."""
    path = STAGED / f"{sid}.json"
    obj = json.loads(path.read_text(encoding="utf-8"))
    crossed = obj.get("crossed")
    if not crossed or obj.get("uncrossed"):
        return obj
    src = CANON / crossed["pattern_file"]
    FOLDED.mkdir(exist_ok=True)
    if src.exists():
        src.rename(FOLDED / crossed["pattern_file"])
    # Read-time freshness (Step 3): the fold touches files only; the next
    # semantic read rebuilds the cache when check_drift sees the file is gone.
    # No write-time index push, so no rollback window.
    obj["uncrossed"] = {"at": now(), "moved_to": f"_folded/{crossed['pattern_file']}"}
    path.write_text(json.dumps(obj, indent=2, ensure_ascii=False), encoding="utf-8")
    with open(MARKLOG, "a", encoding="utf-8") as f:
        f.write(json.dumps({"ts": now(), "id": sid, "pile": obj["pile"],
                            "verdict": "uncross"}, ensure_ascii=False) + "\n")
    log("uncrossed", id=sid, folded=crossed["pattern_file"])
    return obj


def _fold_superseded(ancestor_slug: str, new_fname: str) -> None:
    """Retire a canon pattern that a freshly-crossed descendant supersedes.
    SUBTRACTION law: move it to patterns/_folded/, never hard-delete, and leave
    a lineage line so the compost is legible — the ancestor is kept, marked as
    superseded_by the new version. Idempotent: a missing ancestor is a no-op
    (already folded, or the slug didn't resolve to a canon file)."""
    src = CANON / f"{ancestor_slug}.md"
    if not src.exists():
        log("supersede-skip", ancestor=ancestor_slug, reason="no canon file")
        return
    FOLDED.mkdir(exist_ok=True)
    dst = FOLDED / f"{ancestor_slug}.md"
    body = src.read_text(encoding="utf-8", errors="replace").rstrip("\n")
    body += (f"\n\n---\n\n> **Superseded {now()}** — folded from canon; a "
             f"descendant that EXTENDS this version was crossed as "
             f"`{new_fname}`. Kept as lineage, not deleted.\n")
    dst.write_text(body, encoding="utf-8")
    src.unlink()
    with open(MARKLOG, "a", encoding="utf-8") as f:
        f.write(json.dumps({"ts": now(), "annotation": "superseded",
                            "ancestor": ancestor_slug, "by": new_fname},
                           ensure_ascii=False) + "\n")
    log("superseded", ancestor=ancestor_slug, by=new_fname)


# ================================================================ THE SURFACE
VERDICTS = ("cross", "hold", "compost")   # the three forward verbs. no approve verb.
# uncross is the RATIFIED fourth verb (Kevin's mark 2026-07-19: "keep undo,
# update the rules") — a Kevin-only rollback with its own path (uncross(), below),
# deliberately not routed through record_mark. A ledger "correction" line is an
# annotation, not a mark; no code writes or reads it.


def record_mark(sid: str, verdict: str, condition: str = None) -> dict:
    """condition (holds only, Mark 5 seam 2026-07-19): an optional anchor tag
    in the return circuit's two-shape grammar — 'until YYYY-MM-DD' or
    'when file:<dss-relative-path> exists'. Blank = a felt hold, untouched by
    the circuit (Move B territory). The tag is stored verbatim; nothing here
    validates or interprets it — the return circuit alone decides if it ever
    anchors true. Never prompted beyond the hold gesture itself."""
    if verdict not in VERDICTS:
        raise ValueError("unknown verdict")
    path = STAGED / f"{sid}.json"
    obj = json.loads(path.read_text(encoding="utf-8"))
    if obj["mark"]["verdict"]:
        return obj   # marks record an act; they don't get silently rewritten
    if verdict == "cross":
        # Hard guard (Kevin's mark 2026-07-22): fail closed if canon has any
        # off-path writes — never build a cross onto a library we can't vouch for.
        breach = guard_audit()
        if not breach["clean"]:
            raise RuntimeError(
                "canon guard: off-path write(s) detected — refusing to cross. "
                f"Reconcile first: {', '.join(breach['offpath'][:5])}"
                + (" …" if len(breach["offpath"]) > 5 else ""))
        # Read-time freshness (Rebuild pass 3, Step 3, 2026-07-22): the index is
        # a DERIVED CACHE rebuilt on the next semantic read when check_drift sees
        # the new file. The cross touches the .md only — no write-time index push,
        # so there is nothing to roll back and no half-promotion window.
        fname = promote(obj)
        if obj.get("supersedes"):
            # Two-state supersession: a crossed descendant retires the ancestor
            # it EXTENDS. The ancestor composts (folds) with a lineage line —
            # no in-place canon edit ever happened; the frozen version stays
            # frozen, retired, and kept.
            _fold_superseded(obj["supersedes"], fname)
        obj["crossed"] = {"pattern_file": fname, "at": now()}
        if obj.get("supersedes"):
            obj["crossed"]["supersedes"] = obj["supersedes"]
    obj["mark"] = {"verdict": verdict, "at": now()}
    if verdict == "hold" and condition:
        obj["mark"]["condition"] = condition.strip()
    path.write_text(json.dumps(obj, indent=2, ensure_ascii=False), encoding="utf-8")
    entry = {"ts": now(), "id": sid, "pile": obj["pile"], "verdict": verdict}
    if obj["mark"].get("condition"):
        entry["condition"] = obj["mark"]["condition"]
    with open(MARKLOG, "a", encoding="utf-8") as f:
        f.write(json.dumps(entry, ensure_ascii=False) + "\n")
    log("mark-recorded", id=sid, verdict=verdict)
    return obj


def unmark(sid: str) -> dict:
    """Reverse a mark — Kevin's toggle (his mark 2026-07-19: 'my mark should be
    easily reversible. Keep undo, and update the rules'). Never a silent
    rewrite: the old mark moves to mark_history on the object and the ledger
    gets an ANNOTATION line ({'annotation':'unmark', ...}) — annotations are
    not marks (ratified vocabulary, 2026-07-19); no reader treats them as one.
    A crossed object routes through uncross() first, so the canon fold keeps
    its full sync-loud discipline; then the mark clears and the verbs return."""
    path = STAGED / f"{sid}.json"
    obj = json.loads(path.read_text(encoding="utf-8"))
    old = (obj.get("mark") or {})
    if not old.get("verdict"):
        return obj
    if obj.get("crossed") and not obj.get("uncrossed"):
        obj = uncross(sid)          # fold canon first, sync-loud; raises on failure
    obj.setdefault("mark_history", []).append({**old, "reversed_at": now()})
    obj["mark"] = {"verdict": None, "at": None}
    path.write_text(json.dumps(obj, indent=2, ensure_ascii=False), encoding="utf-8")
    with open(MARKLOG, "a", encoding="utf-8") as f:
        f.write(json.dumps({"ts": now(), "id": sid, "pile": obj["pile"],
                            "annotation": "unmark", "was": old.get("verdict")},
                           ensure_ascii=False) + "\n")
    log("unmarked", id=sid, was=old.get("verdict"))
    return obj


def state():
    inbox = [{"name": p.name, "bytes": p.stat().st_size}
             for p in sorted(INBOX.iterdir()) if is_pile(p)]
    staged = []
    for p in sorted(STAGED.glob("*.json"), reverse=True):
        try:
            staged.append(json.loads(p.read_text(encoding="utf-8")))
        except Exception:
            pass
    return {"ts": now(), "engine": current_engine(), "inbox": inbox, "staged": staged}


# === LOCAL ENGINE — persisted 2026-07-23 (Kevin's mark: "persist the socket into the exe") ===
# Registers the no-login local model (Ollama / hermes3, over stdlib HTTP) into the
# articulation seam, so the window runs a real engine by default with no /login and
# no cloud. Imported by NAME so PyInstaller bundles it as a sibling module (same
# posture as core/bench/room). If it is unavailable (module missing, Ollama down at
# call time, import error), NESI falls back to the claude-cli/stub default and, at
# call time, articulate() falls back LOUDLY to a dark Candidate — a local run is
# never passed off as real if it didn't actually run. Registration failing here
# never breaks the loop. TO REVERT: delete engine_local.py and this block.
try:
    import engine_local as _engine_local
    _engine_local.register(sys.modules[__name__])
    log("local-engine-registered", engine="local", model=_engine_local.LOCAL_MODEL)
except Exception as _e:  # noqa: BLE001 — registration must never break import
    try:
        log("local-engine-register-failed", error=str(_e)[:160])
    except Exception:
        pass


