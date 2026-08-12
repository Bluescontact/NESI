#!/usr/bin/env python3
"""
NESI CONVERSATIONAL FRONT v0 — the plain-language way in. Stdlib only.

Terminal Law made real: daily defaults to conversational; the framework
(organs, patterns, marks) runs UNDERNEATH — Kevin never has to speak it.
Three moves per input, and only three: ROUTE (deterministic verb table) →
ASSEMBLE (build the organ's input) → RETURN (the organ's result in plain
words). The front has NO BRAIN by design: it never answers, never marks,
never decides a verdict. If it starts answering instead of routing, it has
grown a second engine seam — cut it.

This is NOT THE DOOR. Inward only. Outward intent (send/publish/transmit)
hits a plain-language wall: the membrane line is unratified, the door is
not open. The front enforces that at the entrance.

Routing floor is deterministic (Kevin's mark: "verb table stands"). The
semantic upgrade is ONE stubbed op ("classify") on the existing socket —
bench.invoke — not a new engine-call pattern. On a keyword miss the front
ASKS; it never guesses. Confirm boundary per Kevin's escalation rule:
silent route on the unambiguous low-stakes case; one-line confirm when the
intent is ambiguous, multi-matched, or carries commitment beyond the
moment.
"""

import re
import sys
from datetime import datetime
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import bench
import continuity
import core
import interrogator
import return_circuit

# the routing floor — Kevin's table, marked standing 2026-07-17. Editable
# here; surfaced at every close as his §6 mark.
ROUTES = [
    ("bench", ["write", "draft", "letter", "gift", "make", "compose", "build me"]),
    ("interrogator", ["what am i missing", "help me see", "what's off",
                      "whats off", "read this", "break this", "the catch",
                      "check this"]),
    ("metabolizer", ["capture", "hold onto", "remember this", "log this",
                     "here's a pile", "heres a pile", "take this down"]),
    ("return_circuit", ["what's come back", "whats come back", "what's waiting",
                        "whats waiting", "what's due", "whats due", "anything back"]),
    ("continuity", ["where was i", "what's open", "whats open", "resume",
                    "catch me up", "where am i"]),
]

OUTWARD = ["send ", "publish", "transmit", "put this out", "post this",
           "put it out", "share this publicly", "push this out"]

# commitment-beyond-the-moment markers — the escalation rule applied one
# layer up, to the front's own routing
COMMITMENT = ["promise", "commit", "schedule", "deadline", "by monday",
              "every day", "every week", "monthly", "ongoing", "contract"]

WALL_LINE = ("That points outward — sending, publishing, putting out. The door "
             "isn't open: the membrane line is still unratified, so nothing "
             "leaves the machine yet. What you make stays here, held, until "
             "that mark lands.")


def _now():
    return datetime.now().isoformat(timespec="seconds")


def route(text: str) -> dict:
    """Deterministic classification. Returns organ, or why not."""
    low = " " + (text or "").lower().strip() + " "
    if not low.strip():
        return {"kind": "empty"}
    if any(m in low for m in OUTWARD):
        return {"kind": "wall"}
    hits = [name for name, kws in ROUTES if any(k in low for k in kws)]
    commitment = any(m in low for m in COMMITMENT)
    if len(hits) == 1 and not commitment:
        return {"kind": "route", "organ": hits[0]}
    if len(hits) == 1 and commitment:
        return {"kind": "confirm", "organ": hits[0],
                "why": "this carries commitment past the moment"}
    if len(hits) > 1:
        return {"kind": "confirm", "organ": hits[0], "options": hits,
                "why": "it matches more than one organ"}
    # miss — try the semantic upgrade through the ONE socket (always stub
    # this session), then ask; never guess.
    sem = bench.invoke("classify", {"intent": text})
    return {"kind": "ask", "stub_note": sem["output"].get("note", "")}


def assemble_and_run(organ: str, text: str) -> dict:
    """ASSEMBLE the organ's input and RETURN its result as plain lines.
    Framework vocabulary stays underneath; provenance rides in 'under'."""
    lines, under, obj = [], f"organ: {organ}", None

    if organ == "bench":
        obj = bench.new_object(text)
        pats = [p["title"] for p in obj["pulled"]]
        lines.append(f"Opened a working object for that — reads as a {obj['type']}.")
        lines.append("What bears on it from your library: "
                     + (" · ".join(pats) if pats else "nothing matched yet."))
        lines.append("The draft is placeholder until the engine is wired — "
                     "the bench tab holds it for break, refine, and landing.")
        # PIPE wiring (Kevin's mark, session 2026-07-20 §4): the front stays
        # plain-text-only by design (no HTML here, ever) — it names what the
        # Composer already rendered underneath, in bench.new_object()'s
        # obj["composed"], rather than re-describing the object itself.
        cstat = obj.get("composed", {}).get("diagram_status", "unknown")
        lines.append(f"Rendered in the locked register (Composer) — diagram: {cstat}. "
                     "Full card is on the bench object, not shown in this plain-text line.")
        under += f" · type: {obj['type']} · {len(pats)} patterns pulled · engine: {obj['engine']} · composed: {cstat}"

    elif organ == "interrogator":
        qs = interrogator.check_drop(text)
        if not qs:
            lines.append("Nothing tripped — none of your named conditions "
                         "match this. Quiet is the honest answer.")
        for q in qs:
            tag = " (a standing request of yours)" if q.get("standing") else ""
            lines.append(q["question"] + tag)
        under += f" · {len(qs)} condition(s) fired"

    elif organ == "metabolizer":
        slug = re.sub(r"[^a-z0-9]+", "_", text.lower()).strip("_")[:36] or "capture"
        name = f"front_{_now()[:10]}_{slug}.md"
        (core.INBOX / name).write_text(text, encoding="utf-8")
        lines.append("Held. It's in the intake now — the loop will digest it "
                     "and it will appear in the queue for your mark.")
        under += f" · inbox pile: {name}"

    elif organ == "return_circuit":
        rs = return_circuit.scan()
        if not rs:
            lines.append("Nothing has come back — no held thing's condition "
                         "has anchored true yet.")
        for r in rs:
            lines.append(f"Back at the gate: {r['title']} — {r['question']}")
        under += f" · {len(rs)} return(s)"

    elif organ == "continuity":
        snap = continuity.resume()
        if not snap:
            lines.append("Nothing to pick up — this is a fresh start.")
        else:
            lines.append(f"You closed {snap.get('closed_at','?')} — "
                         f"{snap.get('where_it_closed','')}.")
            if snap.get("open_threads"):
                lines.append("Awaiting your mark: "
                             + " · ".join(t["pile"] for t in snap["open_threads"][:4]))
            if snap.get("inbox"):
                lines.append("Still undigested: " + " · ".join(snap["inbox"][:4]))
            lines.append(f"Hold pile {snap.get('held_count','?')} · "
                         f"felt-read queue {snap.get('felt_read_count','?')}.")
        under += " · resume board"

    return {"lines": lines, "under": under, "obj": obj}


PLAIN_ORGAN = {"bench": "making something", "interrogator": "a read-back",
               "metabolizer": "holding it for you",
               "return_circuit": "checking what's come back",
               "continuity": "picking up where you were"}


def _reach_lines(text: str, skip_drop: bool = False) -> list:
    """Move B + Move C, wired to every live drop through the front — Kevin's
    written escalation conditions and the pattern-library floor run
    underneath regardless of which organ the text routes to (session
    2026-07-20). skip_drop avoids double-asking when the text also routed to
    the interrogator organ itself, which already runs check_drop() on it.
    Deterministic only, same silence law: nothing trips, nothing returns."""
    lines = []
    if not skip_drop:
        try:
            for q in interrogator.check_drop(text):
                tag = " (a standing request of yours)" if q.get("standing") else ""
                lines.append(q["question"] + tag)
        except Exception:
            pass
    try:
        for q in interrogator.check_absence(text):
            lines.append(q["question"])
    except Exception:
        pass
    return lines


def handle(text: str, pending: str | None = None) -> dict:
    """One front turn. `pending` carries a confirm-in-waiting organ; 'yes'
    routes it. Returns {kind, lines, under?, obj?, pending?}."""
    t = (text or "").strip()
    if pending and t.lower() in ("yes", "y", "go", "do it"):
        r = assemble_and_run(pending, "")
        r["kind"] = "result"
        return r
    v = route(t)
    if v["kind"] == "empty":
        return {"kind": "empty", "lines": []}
    reach = _reach_lines(t, skip_drop=(v.get("organ") == "interrogator"))
    if v["kind"] == "wall":
        return {"kind": "wall", "lines": [WALL_LINE] + reach}
    if v["kind"] == "confirm":
        opts = v.get("options")
        what = (" or ".join(PLAIN_ORGAN[o] for o in opts) if opts
                else PLAIN_ORGAN[v["organ"]])
        return {"kind": "confirm", "pending": v["organ"],
                "lines": [f"Before I move it — {v['why']}. This sounds like "
                          f"{what}. Say yes, or say it differently."] + reach}
    if v["kind"] == "ask":
        return {"kind": "ask",
                "lines": ["I don't want to guess where that goes. Is it "
                          "something to make, something to hold, or something "
                          "you want read back to you?"] + reach,
                "under": v.get("stub_note", "")}
    r = assemble_and_run(v["organ"], t)
    r["kind"] = "result"
    r["lines"] = r["lines"] + reach
    return r


if __name__ == "__main__":
    for probe in ["help me write to Frank about the well pump",
                  "what am I missing here, I promised the writeup by monday",
                  "hold onto this: the inverter manual is in the gray bin",
                  "what's waiting", "where was I",
                  "publish this to substack", "the sky is heavy today"]:
        out = handle(probe)
        print(f"\n> {probe}\n  [{out['kind']}] " + " | ".join(out["lines"])[:220])
