#!/usr/bin/env python3
"""surface.py — one call that deposits and renders. The daily surface.

Kevin's mark, 2026-08-07 (session 289f75e7): build the light daily surface;
B3's crash-test is SESSION-SCOPED, not whole-ledger.

THE INVERSION THIS IS. Until now the deposit-before-render law lived in step 2 of a
six-step protocol that the model had to obey, and step 5 existed to check it hadn't
skipped. A rule can be broken; a missing organ can't. There is now one entry point,
and depositing is not a step inside it that could be skipped — it is the only path to
a surface. No flag disables it. Because of that, `decisions.py verify` is no longer in
the daily path. It stays on disk, unchanged, for the deep-review chamber.

WHAT IT DOES, IN THIS ORDER, INTERNALLY:
  1. validate the payload against the schema (specific errors, never a generic reject)
  2. deposit every decision to DECISIONS_OFFERED.jsonl, via decisions.py itself
  3. read the floor live — marks.py status + gates.py status — and compose the line
  4. fill nesi/mind/DS_LITE.html
  5. return the fragment on stdout and write _widgets/latest_<slug>.html

THREE BOUNDARIES ARE SCHEMA CONSTRAINTS HERE, NOT INSTRUCTIONS:
  B1     every tile carries >=1 exit. Kevin never has to type to leave.
  B2-ext a cross must be `verified: true` or carry a non-empty `gap` that renders on
         the button face. A wall visible from the door is a gate; one found after
         walking is a dead end.
  B3     the payload may not carry fewer tiles than this session's live open
         decisions. Fewer shown than live is a breach, so it is a crash.

CARRYING IS NOT ASKING (Kevin's mark, 2026-08-07). B3 governs DISCLOSURE; the rate brake
in decisions.py governs ASKING. Both were implemented on the tiles array, so a tile that
merely re-rendered a still-unanswered decision was counted as a new demand — and B3
required that tile while the brake refused it. A tile whose one_liner and option texts
are IDENTICAL to a live unanswered offer on the same surface is now a CARRY: it renders,
it stays markable at depth zero, and it does not deposit. Change one word and it is a
revision, which is an ask, which deposits and faces the brake. B3 itself is unaltered.

WHY B3 IS SESSION-SCOPED (Kevin's ruling, 2026-08-07). Read whole-ledger, "live" was
97 open gates plus 305 unanswered offers against a 4-tile cap in decisions.py — a
crash that fires on every possible payload is not a boundary, it is a dead tool. The
breach B3 was written against is an author quietly showing 2 of the 5 things he found
today. So the reference set is what THIS SESSION put on the record: its own live
unanswered offers, and the gates it opened. Both are read from disk, never supplied by
the caller — there is nothing here for an author to narrow.

USAGE
  python tools/surface.py --payload p.json --session <slug>
  python tools/surface.py --payload p.json --session <slug> --out _widgets/x.html
  python tools/surface.py --payload p.json --session <slug> --quiet   (file only)

PAYLOAD
  {"title": str, "context": str, "tiles": [
     {"id": str, "grounding": "grounded"|"reached", "reading": str,
      "exits": [str, ...],                                   # >=1, required
      "cross": {"label": str, "mark": str,                   # optional block
                "verified": true, "gap": ""}}]}
The floor line is NOT a field. It is derived.
"""
from __future__ import annotations

import argparse
import hashlib
import html
import json
import os
import re
import subprocess
import sys
import tempfile
from pathlib import Path
from types import SimpleNamespace

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "tools"))

import decisions  # noqa: E402  — imported, not shelled out (Phase 1 finding 1)

CHASSIS = ROOT / "nesi" / "mind" / "DS_LITE.html"
GATES_LOG = ROOT / "OPEN_GATES.jsonl"

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")


class SurfaceError(Exception):
    """A refusal with a reason. Never a generic reject."""


# --------------------------------------------------------------------------- schema
GROUNDING = ("grounded", "reached")


def validate(payload) -> dict:
    if not isinstance(payload, dict):
        raise SurfaceError("payload must be a JSON object with title / context / tiles")
    for field in ("title", "context"):
        if not isinstance(payload.get(field), str) or not payload[field].strip():
            raise SurfaceError(f"payload.{field} must be a non-empty string")
    tiles = payload.get("tiles")
    if not isinstance(tiles, list):
        raise SurfaceError("payload.tiles must be a list (an empty list is legal — a "
                           "reading-only surface is always allowed)")

    seen = set()
    for i, t in enumerate(tiles):
        at = f"tiles[{i}]"
        if not isinstance(t, dict):
            raise SurfaceError(f"{at} must be an object")
        tid = t.get("id")
        if not isinstance(tid, str) or not re.fullmatch(r"[A-Za-z0-9_]+", tid or ""):
            raise SurfaceError(f"{at}.id must be a non-empty string of [A-Za-z0-9_] — "
                               f"decisions.py's TILE_RE cannot see any other shape")
        if tid in seen:
            raise SurfaceError(f"{at}.id {tid!r} is used twice; tile ids must be unique")
        seen.add(tid)
        at = f"tiles[{i}]({tid})"
        if t.get("grounding") not in GROUNDING:
            raise SurfaceError(f"{at}.grounding must be exactly 'grounded' or 'reached' "
                               f"— binary and qualitative, never a number or a score")
        if not isinstance(t.get("reading"), str) or not t["reading"].strip():
            raise SurfaceError(f"{at}.reading must be a non-empty string — the plain-words "
                               f"object of the decision, which renders above the control")

        # ---- B1 · pre-authored exits
        exits = t.get("exits")
        if not isinstance(exits, list) or not exits:
            raise SurfaceError(
                f"B1 BREACH — {at} has no exits. Every tile needs an 'exits' array with at "
                f"least one entry, pre-written at authoring time. A surface that requires "
                f"Kevin to type in order to leave is a build failure.")
        for j, e in enumerate(exits):
            if not isinstance(e, str) or not e.strip():
                raise SurfaceError(f"{at}.exits[{j}] must be a non-empty string")

        # ---- B2-ext · no dead-end crosses
        cross = t.get("cross")
        if cross is not None:
            if not isinstance(cross, dict):
                raise SurfaceError(f"{at}.cross must be an object or absent")
            for field in ("label", "mark"):
                if not isinstance(cross.get(field), str) or not cross[field].strip():
                    raise SurfaceError(f"{at}.cross.{field} must be a non-empty string")
            gap = cross.get("gap") or ""
            if not isinstance(gap, str):
                raise SurfaceError(f"{at}.cross.gap must be a string")
            if cross.get("verified") is not True and not gap.strip():
                raise SurfaceError(
                    f"B2-ext BREACH — {at}.cross carries neither \"verified\": true nor a "
                    f"non-empty \"gap\". A CROSS may only render if its preconditions were "
                    f"verified in the same turn, or its own button face names the gap "
                    f"before the click. A wall found after walking is a dead end.")
    return payload


# ------------------------------------------------------- B3 · the session's own live
def gate_id(text: str) -> str:
    """A gate has no tile id, so it gets a deterministic one. Same text -> same id,
    every run, so the crash can name exactly which tile is missing."""
    return "g_" + hashlib.sha256(text.encode("utf-8")).hexdigest()[:8]


def session_live(session: str) -> list[tuple[str, str]]:
    """(required tile id, what it is) for everything THIS session put on the record and
    has not resolved. Read from disk. Nothing here is supplied by the caller."""
    live: list[tuple[str, str]] = []

    ledger = decisions.read_ledger()
    for (surface, tile), rec in decisions.live_offers(ledger).items():
        if rec.get("session") == session and tile:
            one = str(rec.get("one_liner", ""))[:90]
            live.append((tile, f"offer on {str(surface).split('/')[-1]} — {one}"))

    if GATES_LOG.exists():
        latest: dict = {}
        for line in GATES_LOG.read_text(encoding="utf-8", errors="replace").splitlines():
            line = line.strip()
            if not line:
                continue
            try:
                r = json.loads(line)
            except json.JSONDecodeError:
                continue
            if r.get("gate"):
                latest[r["gate"]] = r
        for gate, r in latest.items():
            if r.get("event") == "open" and r.get("source") == session:
                live.append((gate_id(gate), f"gate opened by this session — {gate[:90]}"))

    return live


def check_b3(payload: dict, session: str) -> None:
    shown = {t["id"] for t in payload["tiles"]}
    missing = [(i, w) for i, w in session_live(session) if i not in shown]
    if missing:
        lines = "\n".join(f"    {i}  ·  {w}" for i, w in missing)
        raise SurfaceError(
            f"B3 BREACH — this session has {len(missing)} live open decision(s) that the "
            f"payload does not carry. The decision list is derived, never authored; fewer "
            f"shown than live is a breach. Omitted:\n{lines}\n"
            f"  Carry each as a tile with that exact id, or resolve it first "
            f"(decisions.py answer / supersede, gates.py close).")


# ---------------------------------------------------- the mark text, computed ONCE
def mark_texts(tile: dict) -> dict:
    """{option key -> the exact text that click copies}. ONE source of truth.

    Built for both the deposit and the render, because `decisions.py answer` promises
    that `--option <key>` resolves to *the identical text the clipboard would have
    carried*. The first cut of this file stored the bare exit string on the ledger while
    the button copied a composed mark — so a three-word answer would have written a
    different mark than the button. Found in Phase 3 verification, 2026-08-07.

    The composed shape has a second effect: a bare exit like "hold" is a 4-character
    probe, and `decisions.py open` reports a decision answered when a probe of its option
    text appears anywhere in MARKS_LOG. Short exits therefore read as answered the moment
    any mark contains the word. Prefixing the tile id and the reading makes every probe
    unique, so `open` counts this surface honestly.
    """
    out = {f"exit{n}": f"[{tile['id']}] {tile['reading']}\n→ {e}"
           for n, e in enumerate(tile["exits"])}
    if tile.get("cross"):
        out["cross"] = tile["cross"]["mark"]
    return out


# ------------------------------------------------- 2. deposit · CARRYING IS NOT ASKING
def split_carries(payload: dict, surface_rel: str) -> tuple[list[dict], list[str]]:
    """Split the payload's tiles into what is being ASKED and what is only CARRIED.

    KEVIN'S MARK, 2026-08-07: "fix the boundary upstream of the tool deadlock."

    THE DEADLOCK, AS FOUND BY RUNNING IT. B3 refuses a surface carrying fewer decisions
    than are live, so it required h4 — one unanswered offer from earlier in the session —
    to appear as a tile. The rate brake then refused the surface *because* it carried a
    tile while h4 stood unanswered. The brake's own docstring says it "cannot deadlock a
    session … a surface may carry zero tiles and be pure reading" — but B3 rejects a
    zero-tile payload in exactly the state that escape hatch was written for. Two
    boundaries, each correct alone, with no state satisfying both.

    THE BOUNDARY UPSTREAM, AND IT IS A CONFLATION. B3 and the brake were both
    implemented on the same object — the tiles array — because a tile does two jobs at
    once. It DISCLOSES a live decision, and it ASKS for a mark.

      · B3 is a non-concealment law. Its named breach is "an author quietly showing 2 of
        the 5 things he found today." It governs disclosure.
      · The brake is a load law. Its named breach is 316 offered against 1 answered. It
        governs asking.

    Re-rendering a decision Kevin has already been offered discloses without asking: it
    adds no new demand, it is the same demand still standing. The brake was counting it
    as a new ask. That is the whole defect, and it is one line of law:

        CARRYING IS NOT ASKING.

    So B3 is UNCHANGED — it was doing its job and it caught a real omission. What changes
    is that a tile which merely re-renders a live unanswered offer no longer deposits,
    and therefore never reaches the brake. Depth-zero survives intact: a carried tile
    still renders open and markable, because it is still a tile.

    THE SMUGGLE GUARD, LOAD-BEARING. A carry must be IDENTICAL — same one_liner, same
    option texts, byte for byte. Change one word of the reading or one exit and it is a
    revision, which is a new ask, which deposits and faces the brake. Without this, an
    author could re-word a decision every turn and never once pay the brake, which is
    precisely the run-ahead it exists to stop.

    Returns (records to deposit, tile ids carried).
    """
    live = decisions.live_offers(decisions.read_ledger())
    records, carried = [], []
    for t in payload["tiles"]:
        rec = {"tile": t["id"], "one_liner": t["reading"][:200],
               "options": mark_texts(t)}
        prior = live.get((surface_rel, t["id"]))
        if (prior is not None
                and str(prior.get("one_liner", "")) == rec["one_liner"]
                and prior.get("options") == rec["options"]):
            carried.append(t["id"])
            continue
        records.append(rec)
    return records, carried


def deposit(payload: dict, surface_rel: str, session: str) -> None:
    """Runs BEFORE the surface is written. No flag disables it.

    Goes through decisions.cmd_offer rather than decisions.append so the generation /
    revision / prior_sha logic — and the rate brake — stay exactly as they are. That
    brake is the machine's limit on how much it asks Kevin; bypassing it here would be
    the run-ahead the brake was built to stop. Carries do not bypass it — they never
    constitute an ask, so there is nothing for it to weigh."""
    if not payload["tiles"]:
        print("[surface] no tiles — reading-only surface, nothing to deposit", file=sys.stderr)
        return
    records, carried = split_carries(payload, surface_rel)
    if carried:
        print(f"[surface] carrying {len(carried)} unanswered decision(s) unchanged, not "
              f"re-asking: {', '.join(carried)}", file=sys.stderr)
    if not records:
        print("[surface] nothing new asked — every tile is a carry, no deposit",
              file=sys.stderr)
        return
    with tempfile.NamedTemporaryFile("w", suffix=".json", delete=False,
                                     encoding="utf-8") as fh:
        json.dump(records, fh, ensure_ascii=False)
        tmp = fh.name
    try:
        rc = decisions.cmd_offer(SimpleNamespace(
            surface=surface_rel, session=session, json=tmp,
            backfill=False, blocks=None, no_brake=False))
    finally:
        Path(tmp).unlink(missing_ok=True)
    if rc != 0:
        raise SurfaceError("decisions.py refused the deposit (see its DENY above). No "
                           "surface is written — the deposit is the only path to a render.")


# --------------------------------------------------------------------------- 3. floor
def _first_line(cmd: list[str]) -> str:
    # PYTHONIOENCODING is not optional: marks.py does not reconfigure its stdout, so a
    # captured (non-tty) run emits the console codepage and every em-dash arrives as
    # U+FFFD. The floor line is the one place Kevin reads to know whether a mark took —
    # it does not get to be mojibake. Found in Phase 3 verification, 2026-08-07.
    env = dict(os.environ, PYTHONIOENCODING="utf-8")
    try:
        out = subprocess.run(cmd, cwd=str(ROOT), capture_output=True, timeout=30, env=env)
    except (OSError, subprocess.SubprocessError) as exc:
        return f"(unreadable: {exc})"
    text = out.stdout.decode("utf-8", errors="replace")
    for line in text.splitlines():
        if line.strip():
            return line.strip()
    return "(no output)"


def floor_line() -> str:
    """Derived live, every render. Never stored, never a payload field. Kevin never
    guesses whether a mark took."""
    py = sys.executable or "python"
    marks = _first_line([py, "tools/marks.py", "status"])
    gates = _first_line([py, "tools/gates.py", "status"])
    marks = re.sub(r"^\[floor\]\s*", "", marks)
    gates = re.sub(r"^\[gates\]\s*", "", gates)
    return html.escape(f"{marks} · {gates}")


# -------------------------------------------------------------------------- 4. render
def _tpl(chassis: str, name: str) -> str:
    m = re.search(rf"<!--TPL:{name}\n(.*?)\nTPL:{name}-->", chassis, re.S)
    if not m:
        raise SurfaceError(f"DS_LITE.html is missing its TPL:{name} block")
    return m.group(1)


def _fill(tpl: str, **kw) -> str:
    for k, v in kw.items():
        tpl = tpl.replace("{{" + k + "}}", v)
    return tpl


def render(payload: dict, floor: str) -> str:
    chassis = CHASSIS.read_text(encoding="utf-8")
    t_tile, t_exit = _tpl(chassis, "TILE"), _tpl(chassis, "EXIT")
    t_cross, t_gap = _tpl(chassis, "CROSS"), _tpl(chassis, "GAP")
    body = re.sub(r"<!--TPL:[A-Z]+\n.*?\nTPL:[A-Z]+-->\n?", "", chassis, flags=re.S)
    # The chassis's own provenance header is for whoever opens DS_LITE.html; it is dead
    # weight in every rendered fragment, and the fragment is the thing that gets paid for
    # twice (written, then passed to show_widget).
    body = re.sub(r"\A<!--DS_LITE.*?-->\n", "", body, flags=re.S)

    tiles_html, cards = [], {}
    for t in payload["tiles"]:
        tid = t["id"]
        card = mark_texts(t)          # the same dict the ledger received
        exits = [_fill(t_exit, id=tid, key=f"exit{n}", label=html.escape(e))
                 for n, e in enumerate(t["exits"])]
        cross_html = ""
        if t.get("cross"):
            gap = (t["cross"].get("gap") or "").strip()
            cross_html = _fill(
                t_cross, id=tid, label=html.escape(t["cross"]["label"]),
                gap=_fill(t_gap, gap=html.escape(gap)) if gap else "")
        cards[tid] = card
        tiles_html.append(_fill(
            t_tile, id=tid, grounding=t["grounding"],
            reading=html.escape(t["reading"]),
            exits="".join(exits), cross=cross_html))

    return _fill(body,
                 TITLE=html.escape(payload["title"]),
                 CONTEXT=html.escape(payload["context"]),
                 FLOOR=floor,
                 TILES="\n".join(tiles_html),
                 CARDS=json.dumps(cards, ensure_ascii=False, indent=1))


# ----------------------------------------------------------------------------- entry
def build(payload: dict, session: str, out: str | None = None) -> tuple[str, Path]:
    validate(payload)
    target = Path(out) if out else (ROOT / "_widgets" / f"latest_{session}.html")
    if not target.is_absolute():
        target = ROOT / target
    surface_rel = decisions.rel(str(target))

    check_b3(payload, session)          # derived, before anything is written
    deposit(payload, surface_rel, session)   # deposit precedes render, always
    fragment = render(payload, floor_line())

    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(fragment, encoding="utf-8")
    return fragment, target


def main() -> int:
    ap = argparse.ArgumentParser(description="Render the light daily surface.")
    ap.add_argument("--payload", required=True, help="path to the payload json")
    ap.add_argument("--session", required=True, help="session slug (8 chars)")
    ap.add_argument("--out", help="override the output path")
    ap.add_argument("--quiet", action="store_true",
                    help="write the file, do not echo the fragment on stdout")
    args = ap.parse_args()

    try:
        payload = json.loads(Path(args.payload).read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        print(f"[surface] DENY — cannot read payload: {exc}", file=sys.stderr)
        return 1
    try:
        fragment, target = build(payload, args.session, args.out)
    except SurfaceError as exc:
        print(f"[surface] DENY — {exc}", file=sys.stderr)
        return 1

    print(f"[surface] written · {decisions.rel(str(target))} · "
          f"{len(payload['tiles'])} tile(s)", file=sys.stderr)
    if not args.quiet:
        sys.stdout.write(fragment)
    return 0


if __name__ == "__main__":
    sys.exit(main())
