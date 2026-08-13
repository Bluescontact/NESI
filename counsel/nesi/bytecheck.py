#!/usr/bin/env python3
"""Falsifier (a): byte-exactness verifier for a NESI return.

Reads a file of candidate quoted strings (one per line, blank lines and lines
starting with # ignored) and searches the corpus for a byte-exact occurrence of
each. Reports HIT with the first file:line, or MISS.

MISS is the finding. Nothing here judges the return; it only says whether the
bytes are in the corpus.
"""
import os
import sys

ROOT = r"C:\Users\KMEAR\OneDrive\Desktop\DSS content"
SKIP_DIRS = {".git", "node_modules", "__pycache__", ".walk", "_widgets"}
EXTS = {".md", ".jsonl", ".html", ".txt", ".json", ".js", ".py", ".gd"}


def corpus_files():
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for fn in filenames:
            if os.path.splitext(fn)[1].lower() in EXTS:
                yield os.path.join(dirpath, fn)


def load_corpus():
    docs = []
    for path in corpus_files():
        try:
            with open(path, "r", encoding="utf-8", errors="replace") as fh:
                docs.append((path, fh.read()))
        except OSError:
            continue
    return docs


def find(needle, docs):
    for path, text in docs:
        idx = text.find(needle)
        if idx != -1:
            line = text.count("\n", 0, idx) + 1
            return os.path.relpath(path, ROOT).replace("\\", "/"), line
    return None


def main():
    if len(sys.argv) < 2:
        print("usage: bytecheck.py <candidates-file>")
        return 2
    with open(sys.argv[1], "r", encoding="utf-8") as fh:
        cands = [l.rstrip("\n") for l in fh]
    cands = [c for c in cands if c.strip() and not c.startswith("#")]

    docs = load_corpus()
    print(f"[corpus] {len(docs)} files loaded")
    hits = misses = 0
    for c in cands:
        got = find(c, docs)
        if got:
            hits += 1
            print(f"HIT   {got[0]}:{got[1]}  <<{c[:70]}>>")
        else:
            misses += 1
            print(f"MISS  ----  <<{c[:70]}>>")
    print(f"\n[result] {hits} hit / {misses} MISS of {len(cands)} candidates")
    return 0


if __name__ == "__main__":
    sys.exit(main())
