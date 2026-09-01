"""
query.py - query the Codex index; return top pattern matches with verdicts.

When the index was built with structural fingerprints (run fingerprint_workflow.js
then build_index.py), matches reflect mechanism/register proximity rather than
vocabulary proximity. The [fp] marker in output indicates fingerprinted patterns.

Usage (from project root):
  python tools/codex_index/query.py "text to match"
  python tools/codex_index/query.py path/to/file.md

Import:
  import sys, os; sys.path.insert(0, ".")
  from tools.codex_index.query import match, match_file
  results = match("some situation text")
"""

import json
import os
import subprocess
import sys
import chromadb
from sentence_transformers import SentenceTransformer

THIS_DIR = os.path.dirname(os.path.abspath(__file__))
FINGERPRINTS_DIR = os.path.join(THIS_DIR, "fingerprints")
DB_PATH = os.path.join(THIS_DIR, "db")
COLLECTION_NAME = "patterns"
MODEL_NAME = "all-MiniLM-L6-v2"

FOLD_THRESHOLD = 0.25
HOLD_THRESHOLD = 0.50

_model = None
_collection = None


def _load():
    global _model, _collection
    if _model is None:
        _model = SentenceTransformer(MODEL_NAME)
    if _collection is None:
        if not os.path.isdir(DB_PATH):
            raise RuntimeError(
                f"Codex index not found at {DB_PATH}.\n"
                "Run: python tools/codex_index/build_index.py"
            )
        client = chromadb.PersistentClient(path=DB_PATH)
        _collection = client.get_collection(COLLECTION_NAME)


def _load_fingerprint(slug):
    """Load fingerprint JSON for a slug, if it exists."""
    fp_path = os.path.join(FINGERPRINTS_DIR, slug + ".json")
    if os.path.isfile(fp_path):
        with open(fp_path, encoding="utf-8") as f:
            return json.load(f)
    return None


def ensure_fresh():
    """Rebuild-on-read (Rebuild pass 3, Step 3, 2026-07-22). The vector store is
    a DERIVED CACHE of patterns/*.md, never a second truth. Before serving a
    query, compare the cache to the files (check_drift, stdlib, cheap); if any
    file was edited / added / removed, rebuild the store fully from disk, then
    reopen it. This replaces the old write-time rebuild push: writers now touch
    files only, and freshness is guaranteed here, at the moment of a read.

    Loud on failure: if a needed rebuild cannot complete, raise — a stale cache
    must never be served silently (that was exactly R2)."""
    global _collection
    try:
        from check_drift import check
    except ImportError:
        from tools.codex_index.check_drift import check
    report = check()
    if report.get("clean"):
        return
    build = os.path.join(THIS_DIR, "build_index.py")
    proc = subprocess.run([sys.executable, build], cwd=THIS_DIR,
                          capture_output=True, text=True, timeout=900)
    if proc.returncode != 0:
        raise RuntimeError("codex rebuild-on-read failed, refusing to serve a "
                           f"stale cache: {(proc.stderr or proc.stdout)[-300:]}")
    _collection = None   # force reopen against the freshly rebuilt store


def match(text, n=3):
    """
    Match text against the codex. Returns list of:
      { pattern, distance, verdict, fingerprint }
      verdict: FOLD | HOLD | PASS
      fingerprint: dict or None (present when the match was indexed by fingerprint)
    """
    ensure_fresh()
    _load()
    embedding = _model.encode([text]).tolist()
    results = _collection.query(query_embeddings=embedding, n_results=n,
                                include=["distances", "metadatas"])
    hits = []
    for pid, dist, meta in zip(results["ids"][0], results["distances"][0],
                                results["metadatas"][0]):
        if dist < FOLD_THRESHOLD:
            verdict = "FOLD"
        elif dist < HOLD_THRESHOLD:
            verdict = "HOLD"
        else:
            verdict = "PASS"
        fp = _load_fingerprint(pid) if meta.get("fingerprinted") == "True" else None
        hits.append({
            "pattern": pid,
            "distance": round(dist, 4),
            "verdict": verdict,
            "fingerprinted": meta.get("fingerprinted") == "True",
            "fingerprint": fp,
        })
    return hits


def match_file(path, n=3):
    with open(path, encoding="utf-8", errors="replace") as f:
        text = f.read(800)
    return match(text, n=n)


def disposition(results):
    """Return a one-line disposition string from match results."""
    if not results:
        return "PASS - empty codex or no results"
    top = results[0]
    fp_note = " [fp]" if top.get("fingerprinted") else ""
    if top["verdict"] == "FOLD":
        return f"FOLD -> folds into `{top['pattern']}`{fp_note} (distance {top['distance']})"
    if top["verdict"] == "HOLD":
        return f"HOLD -> review against `{top['pattern']}`{fp_note} (distance {top['distance']})"
    return "PASS - no close codex match"


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python query.py <text or file path>")
        sys.exit(1)

    arg = " ".join(sys.argv[1:])
    if os.path.isfile(arg):
        results = match_file(arg)
        label = f"file: {os.path.basename(arg)}"
    else:
        results = match(arg)
        label = f"text: {arg[:60]}"

    print(f"\nCodex match - {label}\n")
    for r in results:
        flag = "*** " if r["verdict"] == "FOLD" else "--- " if r["verdict"] == "HOLD" else "    "
        fp_tag = "[fp] " if r.get("fingerprinted") else "     "
        print(f"{flag}{fp_tag}{r['pattern']:<40} d={r['distance']}  [{r['verdict']}]")
        if r.get("fingerprint"):
            fp = r["fingerprint"]
            print(f"       mechanism: {fp.get('mechanism', '')[:100]}")
            print(f"       register:  {fp.get('register', '')[:80]}")
    print(f"\n-> {disposition(results)}\n")
