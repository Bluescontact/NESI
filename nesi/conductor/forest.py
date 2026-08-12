#!/usr/bin/env python3
"""
THE FOREST — the gift library, where the warm ones grow.

NESI v2, pass 2. Composted substrate (from the soil) grows into gifts. The gifts —
"the warm ones" (name pending Kevin's pick: Embers / Sparks / Coals / his own) —
live here as GROWN THINGS YOU PICK UP, not documents you read. A grove: things
stand where they grew, and you walk among them.

Two laws, enforced here:
  1. The mechanic never does the recognizing — the forest never scores, ranks, or
     orders gifts by worth. There is no "best" gift, no leaderboard, no featured.
     Order is arrival/lexical only, never valuation.
  2. Show the shape, speak plainly — a gift is a plain grown thing; the geometry
     (the grove) is the visible layer, the framework word "grove" need not appear.

Gift lifecycle (from the recognition work): a gift completes ON GIVING and leaves
no debt (§ the Held-Refusal / gift law). pick_up() hands one over; handing it over
does not obligate the receiver and does not diminish the grove.

Stdlib only. Self-contained store at nesi/forest/. Run:  python forest.py
"""
import json
import sys
import re
from pathlib import Path

if getattr(sys, "frozen", False):
    NESI = Path(sys.executable).resolve().parent
else:
    NESI = Path(__file__).resolve().parents[1]

FOREST = NESI / "forest"

# the display word for a gift — Kevin's pick, 2026-07-25: EMBER.
# A small carried heat you hand over to start another fire. (Was placeholder.)
WARM_ONE_NAME = "ember"

_slug_re = re.compile(r"[^a-z0-9]+")


def _slug(s, n=44):
    return _slug_re.sub("-", str(s).strip().lower()).strip("-")[:n] or "gift"


def grow(substrate, *, now_iso, write=True):
    """Grow a gift from a piece of substrate (a soil record). The gift is a grown
    thing: it carries the true text and where it grew from, and nothing else — no
    score, no rank. Returns the gift record."""
    if not isinstance(substrate, dict) or substrate.get("status") != "substrate":
        raise ValueError("a gift grows only from composted substrate")

    text = str(substrate.get("text", "")).strip()
    gift = {
        "kind": WARM_ONE_NAME,           # placeholder name; the shape is what shows
        "true_thing": text,              # the one small true thing, grown
        "grew_from": substrate.get("from", "soil"),
        "grown_at": now_iso,
        "given": False,                  # completes on giving; no debt either way
        # law 1: NO score / rank / worth / featured field, by construction.
    }
    if write:
        FOREST.mkdir(parents=True, exist_ok=True)
        name = f"{_slug(now_iso)}_{_slug(text)}.json"
        (FOREST / name).write_text(json.dumps(gift, ensure_ascii=False, indent=2),
                                   encoding="utf-8")
        gift["_grew_as"] = name
    return gift


def grove(gifts):
    """Return the gifts as a grove you walk among — NOT ranked. Order is by when
    they grew (stable), never by worth. This function exists to guarantee the
    no-ranking law: it will not sort by any score, because gifts carry none."""
    # stable order by grown_at then text — arrival, not valuation.
    return sorted(gifts, key=lambda g: (g.get("grown_at", ""), g.get("true_thing", "")))


def pick_up(gift):
    """Hand a gift over. It completes on giving and leaves no debt; the grove is
    not diminished (a gift given is still grown). Returns the given gift; the
    receiver owes nothing. There is no return-affordance here (the no-convert law)."""
    given = dict(gift)
    given["given"] = True
    # no 'owes', no 'thank_prompt', no 'return_requested' — by construction.
    return given


def _selftest():
    now = "2026-07-25T00:00:00"
    passed, failed = 0, 0

    def check(name, cond):
        nonlocal passed, failed
        if cond:
            passed += 1; print(f"  PASS  {name}")
        else:
            failed += 1; print(f"  FAIL  {name}")

    sub = {"status": "substrate", "from": "kevin",
           "text": "showed a stranger the floor, and it held"}
    g = grow(sub, now_iso=now, write=False)
    check("a gift grows from substrate", g["true_thing"].startswith("showed a stranger"))
    check("gift carries NO score/rank field (law 1)",
          not any(k in g for k in ("score", "rank", "worth", "featured")))
    check("gift uses the placeholder name (pending Kevin)", g["kind"] == WARM_ONE_NAME)

    # grove never ranks by worth — only arrival order
    a = grow({"status": "substrate", "from": "kevin", "text": "b thing"}, now_iso="2026-01-02T00:00:00", write=False)
    b = grow({"status": "substrate", "from": "kevin", "text": "a thing"}, now_iso="2026-01-01T00:00:00", write=False)
    ordered = grove([a, b])
    check("grove orders by arrival, not worth", ordered[0]["grown_at"] < ordered[1]["grown_at"])

    # a gift that grows only from real substrate
    try:
        grow({"status": "fallow"}, now_iso=now, write=False)
        check("no gift from a fallow (empty) compost", False)
    except ValueError:
        check("no gift from a fallow (empty) compost", True)

    # pick up = given, no debt, no return-affordance
    given = pick_up(g)
    check("pick_up marks given", given["given"] is True)
    check("given gift creates no debt / no return-affordance",
          not any(k in given for k in ("owes", "thank_prompt", "return_requested")))

    print(f"\nRESULT: {passed} passed, {failed} failed")
    return 0 if failed == 0 else 1


if __name__ == "__main__":
    sys.exit(_selftest())
