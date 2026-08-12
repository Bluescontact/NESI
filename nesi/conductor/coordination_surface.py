#!/usr/bin/env python3
"""
THE SHARED COORDINATION SURFACE — the way into NESI from outside.

NESI v2, pass 1. The outward membrane: it lets other people drop intake into
Kevin's NESI without Kevin having to negotiate person-to-person. It is the
Held-Refusal doctrine (held_refusal/DOCTRINE.md) made executable — the law of
the membrane. Because the membrane runs the law, NESI *is* the boundary.

Governing laws (both enforced here):
  1. The mechanic never does the recognizing — this surface never scores, ranks,
     or judges a sender or an offer. It sorts by structure, never by worth.
  2. Show the shape, speak plainly — no framework words leak to a sender; a drop
     is plain fields, not a form about the architecture.

The Held-Refusal play, as code (section numbers from DOCTRINE.md):
  §13 three instruments, never blended — every drop MUST self-tag gift | mutual |
      exchange. Untagged is refused (mandatory, never defaulted).
  §14 the field design law — receiving never converts into a prompt to give. This
      module has NO return-affordance: it only routes inward. It cannot ask the
      sender for anything back, cannot rank senders, cannot count generosity.
  §15 reciprocity as rhythm — a recurring/mutual loop opens ONLY when BOTH Kevin
      and the sender have independently marked openness. A loop is never inferred
      from history. Prior gifts are never repriced as deposits.
  §16 minimal disclosure — the surface asks only what the immediate crossing needs
      (who, which instrument, the offer). It never demands a full account of the
      sender's interior.
  E2  negative space — the sender's OWN boundary is optional, authored only by them.
      Absent = an unfilled, respected space, never "no boundary." NESI never fills
      it for them (no ventriloquized no).

Kevin's gate (the one thing this module will NOT do):
  Nothing external ENTERS Kevin's NESI on its own. A valid drop is STAGED as
  'pending_gate'. Only Kevin's explicit mark admits it (routes it to the soil to
  compost). This module builds the surface and its law; it never opens the door
  to a person. That decision stays Kevin's.

Stdlib only (NESI discipline). Self-contained: writes staged drops to
nesi/inbox_external/. Wiring seam to the soil/pulse is marked ENGINE SEAM below.
Run directly for the self-test:  python coordination_surface.py
"""
import json
import sys
import re
from pathlib import Path

# frozen-aware root (matches core.py / continuity.py)
if getattr(sys, "frozen", False):
    NESI = Path(sys.executable).resolve().parent
else:
    NESI = Path(__file__).resolve().parents[1]

EXTERNAL_INBOX = NESI / "inbox_external"

INSTRUMENTS = ("gift", "mutual", "exchange")   # §13 — never defaulted

# a slug for the staged filename; never a score, just an id
_slug_re = re.compile(r"[^a-z0-9]+")


def _slug(s, n=40):
    return _slug_re.sub("-", str(s).strip().lower()).strip("-")[:n] or "drop"


class RefusedAtMembrane(Exception):
    """A drop that the law refuses. Refusal is structural, never a judgment of the
    sender (law 1). The message names the missing structure, nothing about worth."""


def validate(drop, *, now_iso):
    """Apply the Held-Refusal law to a raw drop. Returns a normalized record or
    raises RefusedAtMembrane naming the missing structure. Pure — no writes."""
    if not isinstance(drop, dict):
        raise RefusedAtMembrane("a drop must be a set of plain fields")

    # §16 minimal disclosure — only what the crossing needs. `sender` may be a
    # bare handle; we never require identity, history, or an interior account.
    sender = str(drop.get("sender", "")).strip()
    if not sender:
        raise RefusedAtMembrane("a drop needs a name to answer to (a handle is enough)")

    # §13 instrument tag — mandatory, never defaulted, never blended.
    instrument = str(drop.get("instrument", "")).strip().lower()
    if instrument not in INSTRUMENTS:
        raise RefusedAtMembrane(
            "a drop must say what it is: one of gift, mutual, exchange "
            "(untagged is refused — an exchange must not borrow a gift's cover)"
        )

    offer = str(drop.get("offer", "")).strip()
    if not offer:
        raise RefusedAtMembrane("a drop needs an offer — the actual thing being brought")

    # E2 negative space — the sender's OWN edges are optional and theirs alone.
    # Absent => unfilled, respected. We record presence, never synthesize content.
    sender_edges = drop.get("sender_edges")
    if sender_edges is None:
        edges_state = "unfilled_respected"     # NOT "no boundary"
        sender_edges = []
    else:
        if not isinstance(sender_edges, list):
            sender_edges = [str(sender_edges)]
        edges_state = "filled_by_sender"

    # §15 loop — a single-sided openness mark is recorded but NEVER opens a loop.
    sender_open_to_loop = bool(drop.get("open_to_loop", False))

    return {
        "sender": sender,
        "instrument": instrument,
        "offer": offer,
        "expires": str(drop.get("expires", "")).strip() or None,
        "sender_edges": sender_edges,
        "edges_state": edges_state,
        "sender_open_to_loop": sender_open_to_loop,
        "received_at": now_iso,
        "status": "pending_gate",   # Kevin's gate — never auto-admitted
        # law 1: no score/rank/worth field exists, by construction.
    }


def receive(drop, *, now_iso, write=True):
    """Validate a drop and STAGE it pending Kevin's gate. Returns the staged
    record. Never admits to the soil, never answers the sender (§14: no
    return-affordance). `now_iso` is passed in (no clock here — keeps it testable
    and matches NESI's no-ambient-time discipline in frozen runs)."""
    record = validate(drop, now_iso=now_iso)
    if write:
        EXTERNAL_INBOX.mkdir(parents=True, exist_ok=True)
        name = f"{_slug(now_iso)}_{_slug(record['sender'])}_{_slug(record['offer'])}.json"
        (EXTERNAL_INBOX / name).write_text(
            json.dumps(record, ensure_ascii=False, indent=2), encoding="utf-8"
        )
        record["_staged_as"] = name
    return record


def loop_opens(kevin_open, sender_open):
    """§15 — a mutual/recurring loop opens ONLY when BOTH sides have independently
    marked openness. Never inferred from usage; prior gifts never counted in."""
    return bool(kevin_open) and bool(sender_open)


# ENGINE SEAM (pass 2): admit(record) — called ONLY by Kevin's gate mark — will
# route an admitted drop into the SOIL (core.py metabolizer / compost). Kept out
# of pass 1 on purpose: nothing can enter the soil until the soil is built AND
# Kevin marks admit. def admit(record): ...  # wires to core.stage / soil.compost


def _selftest():
    now = "2026-07-25T00:00:00"   # fixed — no ambient clock
    passed, failed = 0, 0

    def check(name, cond):
        nonlocal passed, failed
        if cond:
            passed += 1; print(f"  PASS  {name}")
        else:
            failed += 1; print(f"  FAIL  {name}")

    def refuses(drop, needle):
        try:
            receive(drop, now_iso=now, write=False)
            return False
        except RefusedAtMembrane as e:
            return needle in str(e).lower()

    # a clean gift drop stages, pending the gate — never admitted
    rec = receive({"sender": "ana", "instrument": "gift",
                   "offer": "two extra dinners tue, pickup 6-7"},
                  now_iso=now, write=False)
    check("clean gift stages pending Kevin's gate", rec["status"] == "pending_gate")
    check("no score/worth field exists (law 1)",
          not any(k in rec for k in ("score", "rank", "worth", "value_rating")))

    # §13 — untagged / mis-tagged is refused
    check("untagged drop refused (mandatory instrument)",
          refuses({"sender": "ana", "offer": "x"}, "gift, mutual, exchange"))
    check("bad instrument refused",
          refuses({"sender": "ana", "instrument": "donation", "offer": "x"}, "untagged"))

    # §16 — needs a handle and an offer, nothing more
    check("no handle refused", refuses({"instrument": "gift", "offer": "x"}, "name"))
    check("no offer refused", refuses({"sender": "ana", "instrument": "gift"}, "offer"))

    # E2 — absent sender edges = unfilled/respected, not "no boundary"
    check("absent sender edges => unfilled_respected", rec["edges_state"] == "unfilled_respected")
    rec2 = receive({"sender": "ana", "instrument": "mutual", "offer": "cowork thu",
                    "sender_edges": ["no phone calls", "mornings only"]},
                   now_iso=now, write=False)
    check("present sender edges => filled_by_sender (theirs)", rec2["edges_state"] == "filled_by_sender")

    # §15 — loop opens only on two independent marks
    check("loop closed on one-sided openness", loop_opens(True, False) is False)
    check("loop closed when neither", loop_opens(False, False) is False)
    check("loop opens only when both mark", loop_opens(True, True) is True)

    # §14 — the record carries no return-affordance / no prompt-to-give
    check("no return-affordance in record (no-convert)",
          not any(k in rec for k in ("owes", "return_requested", "thank_prompt", "pay_it_forward")))

    print(f"\nRESULT: {passed} passed, {failed} failed")
    return 0 if failed == 0 else 1


if __name__ == "__main__":
    sys.exit(_selftest())
