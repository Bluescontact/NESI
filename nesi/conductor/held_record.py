#!/usr/bin/env python3
"""
held_record.py — one held-record for any held thing (Rebuild pass 3, Step 5,
2026-07-22). Standard library only. No engine call anywhere.

Before this, a hold was a thin thing: a staged object's mark carried
{verdict, at, condition?}, and condition could only be a date or a file
anchor. That holds a *pattern* waiting on a computable event. It cannot hold a
*latent capacity* — a thing you might be able to do, waiting on resourcing,
that you'll only know is real once you try it resourced.

This module is the generalized record. It carries EITHER (in the existing mark
path, unchanged) a pattern-hold, OR (here) a capacity-hold with the full shape
the Reimagine design named:

    entry_ref · kind · condition · clock · latency_type · falsifier · status

The third condition anchor the two-regex return circuit lacked is a RESOURCING
event — and, per Kevin's OM5 mark, it is an EVENT KEVIN MARKS, not one the
system computes. `mark_resourced()` is that event. The system never decides
that resourcing happened or that a capacity became real; Kevin marks it (the
second read, Step 6). This module only holds the record and the marked flags.

Reuses the compost path: a composted capacity keeps its record with
status='composted' — nothing is hard-deleted (SUBTRACTION law).
"""

import json
import sys
from datetime import datetime
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import core

HELD = core.NESI / "held"

# The vocabulary for WHY a held capacity isn't live. Each names a different
# missing condition, so a falsifier can be attached to the right one.
LATENCY_TYPES = ("unresourced", "undemanded", "unpracticed", "unroomed", "unrecognized")

# status lifecycle: held → (Kevin marks resourced) → eligible → (second read)
#   → live (capability) | aspiration ; or → composted at any point.
STATUSES = ("held", "eligible", "live", "aspiration", "composted")


def _rec_path(cid):
    return HELD / f"{cid}.json"


def hold_capacity(name, condition=None, latency_type=None, falsifier=None,
                  clock=None, first_read=None):
    """Open a capacity-hold. name = the capacity in Kevin's words; first_read =
    the baseline ('can't do X now'); latency_type names why it isn't live;
    falsifier = the condition under which 'it wasn't real'; clock may be a
    persisted, optionally recurring anchor (e.g. {'every': 'P30D'})."""
    if latency_type and latency_type not in LATENCY_TYPES:
        raise ValueError(f"unknown latency_type {latency_type!r}; one of {LATENCY_TYPES}")
    HELD.mkdir(parents=True, exist_ok=True)
    cid = f"{datetime.now():%Y-%m-%d_%H%M%S%f}_cap"
    rec = {
        "id": cid, "kind": "capacity", "entry_ref": name,
        "condition": (condition or "").strip() or None,
        "clock": clock,
        "latency_type": latency_type,
        "falsifier": (falsifier or "").strip() or None,
        "status": "held",
        "first_read": (first_read or "").strip() or None,
        "resourced": False,          # the resourcing EVENT — Kevin marks it
        "second_read": None,         # filled by Step 6, always Kevin's words
        "at": core.now(),
    }
    _rec_path(cid).write_text(json.dumps(rec, indent=2, ensure_ascii=False),
                              encoding="utf-8")
    return rec


def list_capacities(status=None):
    if not HELD.exists():
        return []
    out = []
    for p in sorted(HELD.glob("*_cap.json")):
        try:
            r = json.loads(p.read_text(encoding="utf-8"))
        except Exception:
            continue
        if status and r.get("status") != status:
            continue
        out.append(r)
    return out


def mark_resourced(cid):
    """Kevin's resourcing EVENT (OM5 default: a marked event). Flips the
    resourcing anchor true and moves a held capacity to 'eligible' — ready for
    the second read. The system does not compute that resourcing happened."""
    p = _rec_path(cid)
    if not p.exists():
        return {"error": f"no capacity {cid}"}
    r = json.loads(p.read_text(encoding="utf-8"))
    r["resourced"] = True
    r["resourced_at"] = core.now()
    if r["status"] == "held":
        r["status"] = "eligible"
    p.write_text(json.dumps(r, indent=2, ensure_ascii=False), encoding="utf-8")
    return r


def eligible_for_second_read():
    """Capacities Kevin has marked resourced and that await his second read —
    surfaced to the gate as a question (Step 6 records the verdict)."""
    return [r for r in list_capacities()
            if r.get("resourced") and r.get("status") == "eligible"]


def second_read(cid, verdict, note=None):
    """Kevin's SECOND READ (Step 6). After he marked a capacity resourced, he
    reads whether it moved. verdict is HIS mark, never computed:
      'capability' → it moved; status → live.
      'aspiration' → unmoved though resourced; a gap now named, not suspected.
    Refuses unless the capacity is eligible (resourced, awaiting the read)."""
    if verdict not in ("capability", "aspiration"):
        raise ValueError("verdict must be 'capability' or 'aspiration'")
    p = _rec_path(cid)
    if not p.exists():
        return {"error": f"no capacity {cid}"}
    r = json.loads(p.read_text(encoding="utf-8"))
    if r.get("status") != "eligible":
        return {"error": f"{cid} is '{r.get('status')}', not eligible for a second read"}
    r["second_read"] = {"verdict": verdict, "at": core.now(),
                        "note": (note or "").strip() or None}
    r["status"] = "live" if verdict == "capability" else "aspiration"
    p.write_text(json.dumps(r, indent=2, ensure_ascii=False), encoding="utf-8")
    return r


def rehold_aspiration(cid, condition=None, latency_type=None, falsifier=None,
                      clock=None):
    """Circuit 2 terminal (Pass 4) — the aspiration route that RE-ARMS. A second
    read that returned 'aspiration' (resourced but unmoved) is a named gap, not a
    dead end: Kevin re-holds it as a KNOWN gap with a fresh condition, and it
    returns to 'held' — the loop re-arms (resourced flips false; the resourcing
    anchor must fire again). The other aspiration terminal is compost_capacity
    (with a reason). Both are Kevin's mark; the system never re-holds on its own.
    This closes C2's falsifier: a second read now routes to exactly one reachable
    terminal — live (capability), re-held (aspiration→re-arm), or composted."""
    if latency_type and latency_type not in LATENCY_TYPES:
        raise ValueError(f"unknown latency_type {latency_type!r}; one of {LATENCY_TYPES}")
    p = _rec_path(cid)
    if not p.exists():
        return {"error": f"no capacity {cid}"}
    r = json.loads(p.read_text(encoding="utf-8"))
    if r.get("status") != "aspiration":
        return {"error": f"{cid} is '{r.get('status')}', not an aspiration to re-hold"}
    r["status"] = "held"
    r["resourced"] = False
    r.pop("resourced_at", None)
    if condition is not None:
        r["condition"] = (condition or "").strip() or None
    if latency_type is not None:
        r["latency_type"] = latency_type
    if falsifier is not None:
        r["falsifier"] = (falsifier or "").strip() or None
    if clock is not None:
        r["clock"] = clock
    r.setdefault("reholds", []).append(
        {"at": core.now(), "from": "aspiration",
         "prior_read": r.get("second_read")})
    r["second_read"] = None            # the read is spent; a fresh one awaits
    p.write_text(json.dumps(r, indent=2, ensure_ascii=False), encoding="utf-8")
    return r


def compost_capacity(cid, reason=None):
    """Reuse the compost path: keep the record, mark it composted, keep a
    reason line. Nothing hard-deleted."""
    p = _rec_path(cid)
    if not p.exists():
        return {"error": f"no capacity {cid}"}
    r = json.loads(p.read_text(encoding="utf-8"))
    r["status"] = "composted"
    r["composted_at"] = core.now()
    if reason:
        r["compost_reason"] = reason.strip()
    p.write_text(json.dumps(r, indent=2, ensure_ascii=False), encoding="utf-8")
    return r


if __name__ == "__main__":
    print("latency types:", LATENCY_TYPES)
    print("held capacities:", len(list_capacities()))
