#!/usr/bin/env python3
"""
NESI INTERROGATOR v0 — the organ that reaches back. Standard library only.

DETERMINISTIC BY LAW: no engine call anywhere in this module. It reads files
and matches rules. It works with the login gate still closed — that is the
point. If you are adding a model call here, you are building the wrong thing.

Two moves (v0, Kevin's mark 2026-07-17):
  Move A — check_drop(text): match a live drop against the escalation
           conditions loaded from nesi/mind/ESCALATION_CONDITIONS.md
           (NESI-side authority, extracted with provenance). Keyword-based,
           misses quietly, never fabricates a trip. Output is QUESTIONS in
           Kevin's terms, tagged with which condition fired and whether it
           is a standing request.
  Move B — proprioception(): read NESI's own state (marks.jsonl, gate_data
           staging_tray + felt_read_queue) and ask about drift. Ages come
           from a first-seen ledger this organ keeps itself (Kevin's mark:
           accrue forward, no archaeology, no guessed trips). Thresholds
           live in nesi/interrogator/config.json — Kevin-editable, re-read
           every run.

Move C (absence against the pattern library) is BUILT this session, deter-
ministic-floor only: keyword_pull() is the same tag/field-match the bench
already uses for its pull (patterns carry no tags/frontmatter — audited
2026-07-17 — so title/thesis keyword overlap IS the field match). A pattern
that bears on the drop's words and isn't named in the drop's own text is
surfaced. The semantic "should bear" read (meaning, not keywords) is the one
stubbed socket op (bench.invoke("bearing_semantic", ...)) — always empty
while the engine is dark, silently gains a layer at login, no code above the
socket changes.

The interrogator does not mark. It asks and releases. Silence is default:
no trip = empty list = nothing shown.

Session 2026-07-20 (§ NESI SESSION 1/3): the interrogator reaches back on
open. open_reach() is Move A wired to speak first — same proprioception
read, reduced to one plain line by default (config: open_surface_mode,
flippable to 'full_panel'). check_absence() is Move C, built. Both stay
inside the deterministic-by-law discipline above: no engine call in this
module outside the one stubbed socket op.
"""

import json
import re
import sys
from datetime import datetime
from pathlib import Path

if getattr(sys, "frozen", False):
    NESI = Path(sys.executable).resolve().parent
else:
    NESI = Path(__file__).resolve().parents[1]
DSS          = NESI.parent
CONDITIONS   = NESI / "mind" / "ESCALATION_CONDITIONS.md"
CONFIG       = NESI / "interrogator" / "config.json"
FIRST_SEEN   = NESI / "interrogator" / "first_seen.json"
GATE_DATA    = DSS / "gate" / "data" / "gate_data.json"
MARKLOG      = NESI / "marks" / "marks.jsonl"
CONT_HISTORY = NESI / "continuity" / "history"

sys.path.insert(0, str(Path(__file__).resolve().parent))
import bench   # the one socket — bench.invoke(); bench imports only core, no cycle

DEFAULTS = {"held_weeks_threshold": 3,
            "held_pile_threshold": 24,
            "felt_read_threshold": 15,
            "open_aging_days": 14,
            "open_surface_mode": "one_line"}


def _now():
    return datetime.now().isoformat(timespec="seconds")


def load_config() -> dict:
    """Kevin-editable thresholds. Missing/broken file falls back to marked
    defaults — loudly, via the 'config_fallback' key the surface can show."""
    try:
        cfg = json.loads(CONFIG.read_text(encoding="utf-8"))
        return {**DEFAULTS, **{k: v for k, v in cfg.items() if k in DEFAULTS}}
    except Exception:
        return {**DEFAULTS, "config_fallback": True}


def load_conditions() -> list:
    """Parse ONLY the fenced json block of ESCALATION_CONDITIONS.md.
    If the file or block is missing, raise — Move A must not run against
    invented conditions."""
    text = CONDITIONS.read_text(encoding="utf-8")
    m = re.search(r"```json\s*(.*?)```", text, re.DOTALL)
    if not m:
        raise RuntimeError(f"no machine block in {CONDITIONS.name} — Move A refuses to guess")
    return json.loads(m.group(1))


# ------------------------------------------------------------------- Move A

def check_drop(text: str) -> list:
    """Deterministic conditions check. Lowercase substring match on each
    condition's markers. Returns question dicts; empty list = silence."""
    if not text or not text.strip():
        return []
    low = " " + text.lower() + " "
    out = []
    for c in load_conditions():
        hits = [mk for mk in c["markers"] if mk in low]
        if hits:
            out.append({
                "move": "A",
                "condition": c["condition"],
                "question": c["question"],
                "standing": bool(c.get("standing")),
                "provenance": f"condition {c['id']} · matched: {', '.join(hits[:3])}",
            })
    return out


# ------------------------------------------------------------------- Move B

def _load_first_seen() -> dict:
    try:
        return json.loads(FIRST_SEEN.read_text(encoding="utf-8"))
    except Exception:
        return {}


def _condition_named(note: str) -> bool:
    """A held item counts as having a named condition only if its note says
    so in so many words. Narrow on purpose — a miss is quiet, a fabricated
    trip is a law violation."""
    low = (note or "").lower()
    return any(k in low for k in
               ("condition:", "re-screen when", "rescreen when", "until ",
                "wakes when", "clears when", "when kevin"))


def proprioception() -> list:
    """System-state questions. Reads gate_data.json + marks.jsonl, stamps
    never-seen held titles into the first-seen ledger (the only write this
    organ ever makes, and only to its own ledger), and asks only about
    computable drift. Empty list = the system senses nothing worth asking."""
    cfg = load_config()
    questions = []
    if cfg.get("config_fallback"):
        questions.append({
            "move": "B", "condition": "config unreadable",
            "question": "The threshold config would not load; marked defaults are running. Fix the file, or is this fine?",
            "standing": False, "provenance": str(CONFIG)})

    try:
        gate = json.loads(GATE_DATA.read_text(encoding="utf-8"))
    except Exception as e:
        questions.append({
            "move": "B", "condition": "state unreadable",
            "question": f"gate_data.json would not read ({str(e)[:80]}). The system cannot sense itself — look?",
            "standing": False, "provenance": str(GATE_DATA)})
        return questions

    held = [t for t in gate.get("staging_tray", []) if t.get("status") == "held"]
    felt = gate.get("felt_read_queue", [])

    # first-seen ledger — age accrues forward from first sight, never guessed
    seen = _load_first_seen()
    today = _now()[:10]
    changed = False
    for t in held:
        key = t.get("title", "")
        if key and key not in seen:
            seen[key] = today
            changed = True
    if changed:
        FIRST_SEEN.parent.mkdir(parents=True, exist_ok=True)
        FIRST_SEEN.write_text(json.dumps(seen, ensure_ascii=False, indent=1),
                              encoding="utf-8")

    # held past threshold with no condition named
    limit_days = cfg["held_weeks_threshold"] * 7
    for t in held:
        key = t.get("title", "")
        stamp = seen.get(key)
        if not stamp or _condition_named(t.get("note", "")):
            continue
        age = (datetime.now() - datetime.fromisoformat(stamp)).days
        if age >= limit_days:
            wk = age // 7
            questions.append({
                "move": "B", "condition": "held, stale, no condition named",
                "question": f"“{key[:70]}” — held {wk} weeks, no condition. Look, or is the hold the answer?",
                "standing": False,
                "provenance": f"first seen {stamp} · threshold {cfg['held_weeks_threshold']}w"})

    # pile sizes
    if len(held) >= cfg["held_pile_threshold"]:
        questions.append({
            "move": "B", "condition": "held pile grown",
            "question": f"{len(held)} items sit in hold (threshold {cfg['held_pile_threshold']}). Is the pile holding material, or holding you?",
            "standing": False, "provenance": "staging_tray count"})
    unresolved_felt = [f for f in felt if f.get("status") != "marked"]
    if len(felt) >= cfg["felt_read_threshold"]:
        questions.append({
            "move": "B", "condition": "felt-read queue grown",
            "question": f"The felt-read queue holds {len(felt)} ({len(unresolved_felt)} unmarked; threshold {cfg['felt_read_threshold']}). Movement, or accumulation?",
            "standing": False, "provenance": "felt_read_queue count"})

    return questions


# ------------------------------------------------------------------- Move C

def check_absence(text: str) -> list:
    """Deterministic floor: patterns whose title/thesis words overlap the
    drop's words (bench.keyword_pull — same field-match the bench pull uses)
    and whose title Kevin hasn't already named in his own text. Load-bearing,
    untouched — that's the trip. Misses quietly: no overlap, no fabricated
    bearing. The semantic 'should bear' read is the one stubbed socket op;
    on the stub it always returns no patterns, so this floor stands alone
    until the engine is wired — same silence law as Move A/B."""
    if not text or not text.strip():
        return []
    low = text.lower()
    out = []
    for h in bench.keyword_pull(text, limit=6):
        if h["title"].lower() in low:
            continue   # already named — not an absence
        out.append({
            "move": "C", "condition": "load-bearing pattern not named",
            "question": f"This touches “{h['title']}” and it isn't named. "
                        f"Look, or does it not bear here?",
            "standing": False,
            "provenance": f"keyword floor · overlap: {', '.join(h['overlap'][:4])} · {h['file']}",
        })
    sem = bench.invoke("bearing_semantic", {"intent": text})
    for p in sem["output"].get("patterns", []):
        out.append({"move": "C", "condition": "load-bearing pattern (semantic)",
                    "question": p.get("question", ""), "standing": False,
                    "provenance": f"semantic bearing · {p.get('file', '')}"})
    return out


# ------------------------------------------------------------- open-reach
# Move A, wired to speak first (2026-07-20). Same proprioception ground —
# marks.jsonl-derived first-seen ages, the hold queue, the felt-read queue —
# reduced to ONE plain line by default so the window doesn't open onto a
# report. 'open_surface_mode':'full_panel' in interrogator/config.json flips
# it to the whole proprioception() list; both are Kevin's marks, flippable.

def _last_close_held_count():
    """The most recent closed sitting's held_count — continuity's own record,
    read-only. No history yet, or unreadable = None (silence on this check,
    not a fabricated delta)."""
    try:
        snaps = sorted(CONT_HISTORY.glob("close_*.json"))
        if not snaps:
            return None
        return json.loads(snaps[-1].read_text(encoding="utf-8")).get("held_count")
    except Exception:
        return None


def open_reach() -> dict:
    """One deterministic pass, one line out (default). Priority, most
    load-bearing first: stale-no-condition helds, then hold-queue movement
    since the last close, then the standing pile/felt-read thresholds.
    Returns {'mode', 'lines'} — lines is [] when nothing is worth saying;
    that silence is enforced the same as everywhere else in this organ."""
    cfg = load_config()
    if cfg.get("open_surface_mode") == "full_panel":
        return {"mode": "full_panel", "lines": [q["question"] for q in proprioception()]}

    try:
        gate = json.loads(GATE_DATA.read_text(encoding="utf-8"))
    except Exception as e:
        return {"mode": "one_line",
                "lines": [f"gate_data.json would not read ({str(e)[:80]}) "
                          "— the system cannot sense itself right now."]}

    held = [t for t in gate.get("staging_tray", []) if t.get("status") == "held"]

    # accrue first-seen the same way proprioception() does — one shared ledger
    seen = _load_first_seen()
    today = _now()[:10]
    changed = False
    for t in held:
        key = t.get("title", "")
        if key and key not in seen:
            seen[key] = today
            changed = True
    if changed:
        FIRST_SEEN.parent.mkdir(parents=True, exist_ok=True)
        FIRST_SEEN.write_text(json.dumps(seen, ensure_ascii=False, indent=1),
                              encoding="utf-8")

    aging_days = cfg["open_aging_days"]
    stale = []
    for t in held:
        key = t.get("title", "")
        stamp = seen.get(key)
        if not stamp or _condition_named(t.get("note", "")):
            continue
        age = (datetime.now() - datetime.fromisoformat(stamp)).days
        if age >= aging_days:
            stale.append(key)
    if stale:
        return {"mode": "one_line", "lines": [
            f"{len(stale)} of {len(held)} helds are past {aging_days} days "
            f"with no condition named — look, or is the hold the answer?"]}

    prior = _last_close_held_count()
    if prior is not None and prior != len(held):
        delta = len(held) - prior
        return {"mode": "one_line", "lines": [
            f"hold queue moved since last close: {prior} → {len(held)} "
            f"({'+' if delta > 0 else ''}{delta})."]}

    felt = gate.get("felt_read_queue", [])
    if len(felt) >= cfg["felt_read_threshold"]:
        return {"mode": "one_line", "lines": [
            f"felt-read queue holds {len(felt)} (threshold "
            f"{cfg['felt_read_threshold']}) — movement, or accumulation?"]}
    if len(held) >= cfg["held_pile_threshold"]:
        return {"mode": "one_line", "lines": [
            f"{len(held)} items sit in hold (threshold "
            f"{cfg['held_pile_threshold']}) — is the pile holding material, "
            "or holding you?"]}

    return {"mode": "one_line", "lines": []}


# --------------------------------------------------------------- the reader
# Session 2026-07-20 (§ NESI SESSION 3/3): the shared structural reader
# (reader.py) is called from here too — the same instance bench.run_break()
# calls, per S2's reader-sharing default reaffirmed by name in S3. A bare
# front-drop carries no pile/pulled-patterns provenance, so the drift and
# load-path checks inside reader.py degrade to silence on their own; only
# the passive-voice check and the (always-empty-while-dark) socket read
# apply to raw text. That's correct, not a shortfall — nothing here fakes
# provenance a plain drop doesn't have.

def check_reader(text: str) -> list:
    if not text or not text.strip():
        return []
    import reader
    r = reader.read({"draft": text})
    return [{"move": "D", "condition": "structural read", "question": line,
             "standing": False, "provenance": f"reader · engine: {r['engine']}"}
            for line in r["lines"]]


if __name__ == "__main__":
    # headless check: python interrogator.py ["drop text"]
    if len(sys.argv) > 1:
        qs = check_drop(" ".join(sys.argv[1:]))
    else:
        qs = proprioception()
    print(json.dumps(qs, ensure_ascii=False, indent=1) if qs else "(silence — nothing tripped)")
