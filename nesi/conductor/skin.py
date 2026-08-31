#!/usr/bin/env python3
"""
NESI SKIN v0 — the boundary/immune layer. Standard library only.
Built session 2026-07-21, stage 4 of the pass-3 rewrite
(_INTAKE/RETURN_rebuild_pass3_2026-07-21.md).

The Extractor's law: "load never rests on the vulnerable node." Whatever
the adversary can attack — the form's inhabitability, or the actor's
person — carries none of the weight. This module names the three registers
that law runs in and where the skin is currently whole vs gapped. It does
not perform anything: no engine call, no marks, no decisions. It is a
reference surface, callable from anywhere that wants to state the law
plainly (front lines, a future UI panel, a RETURN write-up).

REGISTERS (self-erasure discipline, same move, valence set by register):
  offering — the gift register. complete-on-giving, catalysis_without_claim,
             no-surplus-to-self. Removing the self from the load path as a
             gift discipline.
  defense  — the adversarial register. Displaced Load: in a contested
             outcome, weight rests on environmental authority already
             present or the counterparty's own record, never the actor.
             CROSSED 2026-07-21 as patterns/load_off_the_vulnerable_node.md.
  absence  — the anti-pattern register. Removing the self reads as a wound
             ("to be seen"), not strength — the SAME move, opposite valence.
             Named as a failure mode, not built as a defense.

THE SKIN'S OPEN GAP — named, not filled, per this pass's own discipline
("held items get homes, not builds"):
  Trickster Detector — form-side member, HOLD since 2026-07-01. The
  membrane that would make extraction structurally uninhabitable by the
  form itself, so the Displaced Load reflex would rarely need to fire.
  Status here is HELD — calling trickster_detector() returns the hold,
  never a real detection.
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

REGISTERS = {
    "offering": {
        "label": "offering — the gift register",
        "law": "the self is removed from the load path as a gift discipline",
        "canon": ["complete-on-giving", "catalysis_without_claim", "no-surplus-to-self"],
        "status": "standing",
    },
    "defense": {
        "label": "defense — the adversarial register",
        "law": "in a contested outcome, weight rests on environmental authority "
               "already present or the counterparty's own record, never the actor",
        "canon": ["patterns/load_off_the_vulnerable_node.md"],
        "status": "crossed 2026-07-21",
    },
    "absence": {
        "label": "absence — the anti-pattern register",
        "law": "removing the self reads as a wound (\"to be seen\"), not strength — "
               "the same move, opposite valence",
        "canon": [],
        "status": "named as failure mode, not a defense",
    },
}


def registers() -> dict:
    """The three registers, as-is. Read-only reference — nothing computed."""
    return REGISTERS


def trickster_detector() -> dict:
    """The skin's one open gap. Deliberately returns a HOLD, never a real
    detection — the form-side member (making extraction structurally
    uninhabitable by the form itself) is not built. Displaced Load (the
    actor-side reflex) is built and crossed; this function is not that."""
    return {
        "member": "Infrastructure as Trickster Detector",
        "side": "form",
        "status": "HOLD",
        "since": "2026-07-01",
        "note": "not built — placeholder only. The actor-side reflex "
                "(Displaced Load) is built and crossed as "
                "patterns/load_off_the_vulnerable_node.md; this member is not.",
    }


def law_summary() -> str:
    return ('load never rests on the vulnerable node — whatever the adversary '
            'can attack (the form\'s inhabitability, or the actor\'s person) '
            'carries none of the weight')


# ---------------------------------------------------------------- SKIN v1
# Kevin's naming, 2026-08-30: "the skin is the boundary of whats contained..
# It's job is kinda link washing dishes, and excreting metabolites that are
# in excess, and retaining, and routing nutrients to where they serve."
# His mark, same session: "run full development, build, and route the membrane."
#
# metabolism() is the boundary's live reading — a compose over the organs that
# already own each verb, one authority per fact, pointers never copies:
#   excrete — tools/decisions.py owns the ledger, the window, and the compost
#   retain  — held_map.held_map() IS the register; carried as a pointer
#   route   — tension_table's nutrient category + each nutrient's own declared
#             EXTENDS edges (parsed data). Shared-thread neighbor-finding is
#             HELD, not computed: it would take combinatorial selection over
#             the canon, and tension_table's own charter closes that
#             ("Membrane-seeds are un-searchable by combinatorics; found only
#             by play" — the module's charter prose, standing on Kevin's
#             2026-07-24 mark: "Build the graft before any self-organizing
#             forest").
#   wash    — the necrotic promote_ready/ folder, read through held_map's own
#             constant.
#
# No write, no refusal, no mark. Each register names the actuator that already
# owns the act, so acting is one command away — and the acting hand stays
# Kevin's. Whether skin ever gets a refusing verb is HIS open fork (his naming
# contains no deny verb; RETURN_skin_regather_2026-08-30.md §5) — not
# defaulted here. Every read is guarded; an unreadable organ reports itself
# "unread", never a fake zero.

def _read_excess() -> dict:
    """The excrete register — via decisions.py's OWN functions (one authority
    per fact: its ledger read, its window, its clock, its due arithmetic)."""
    from datetime import datetime
    try:
        # appended, not front-inserted, and only once — tools/ carries generic
        # names (surface, marks, ledger) that must never shadow conductor modules
        tools_dir = str(Path(__file__).resolve().parents[2] / "tools")
        if tools_dir not in sys.path:
            sys.path.append(tools_dir)
        import decisions
        ledger = decisions.read_ledger()
        live = decisions.live_offers(ledger)
        rate = decisions.compost_rate(ledger)
        started = decisions.compost_start(ledger)
        now_dt = datetime.now()
        past = None
        if started is not None:
            past = 0
            for r in live.values():
                offered = decisions.parse_ts(r.get("ts"))
                if offered is None:
                    continue
                # same arithmetic as cmd_compost: measured from the later of
                # (offered) and (when the rule began)
                if (now_dt - max(offered, started)).days >= rate:
                    past += 1
        return {
            "readable": True,
            "open": len(live),
            "past_window": past,   # None = the clock has never started
            "window_days": rate if started is not None else None,
            "clock": started.isoformat(timespec="seconds") if started else "not started",
            "actuator": "python tools/decisions.py compost  "
                        "(its own DENY / --dry-run rules apply; the rate is Kevin's)",
        }
    except Exception:
        return {"readable": False, "note": "decision ledger unread"}


def _read_wash() -> dict:
    """The wash register — necrotic tissue, read through held_map's own
    PROMOTE_READY constant (one authority for the path)."""
    from datetime import datetime
    try:
        import held_map as _hm
        pr = _hm.PROMOTE_READY
        files = [f for f in pr.glob("*") if f.is_file()] if pr.exists() else []
        oldest = None
        if files:
            oldest = (datetime.now()
                      - datetime.fromtimestamp(min(f.stat().st_mtime
                                                   for f in files))).days
        return {
            "readable": True,
            "necrotic": bool(files),
            "files": len(files),
            "oldest_days": oldest,
            "actuator": "Kevin's hand — held_map already marks it compost, "
                        "low-risk, cleared or deferred at his convenience",
        }
    except Exception:
        return {"readable": False, "note": "promote_ready unread"}


def _read_retained() -> dict:
    """The retain register — a POINTER to held_map, never a copy of it."""
    out = {"register": "held_map.held_map()", "items": None}
    try:
        import held_map as _hm
        out["items"] = len(_hm.held_map())
    except Exception:
        out["note"] = "held_map unread"
    return out


def _read_nutrients() -> dict:
    """The route register — each nutrient-category pattern with its own
    declared EXTENDS edges, verbatim. The category is tension_table's
    provisional keyword floor; category_proposal carries through unchanged
    (Kevin's felt read is the authority on placement, and on any graft)."""
    try:
        import tension_table
        idx = tension_table.build_index()
        entries = [{"slug": r["slug"], "extends": r["extends"],
                    "category_proposal": True}
                   for r in idx if r.get("category") == "nutrient"]
        return {
            "readable": True,
            "count": len(entries),
            "with_edges": sum(1 for e in entries if e["extends"]),
            "entries": entries,
            "held": "shared-thread neighbor routing — found only by play "
                    "(tension_table's own charter, standing on Kevin's "
                    "2026-07-24 mark); not computed here",
        }
    except Exception:
        return {"readable": False, "note": "canon unread"}


def metabolism() -> dict:
    """SKIN v1 — one metabolic reading at the boundary. Read-only compose;
    consumed live by v2_board_data._signs() -> the board (its one wired
    viewer, wired the same day this was built)."""
    excess = _read_excess()
    wash = _read_wash()
    retained = _read_retained()
    nutrients = _read_nutrients()

    bits = []
    if excess.get("readable"):
        if excess["clock"] == "not started":
            bits.append(f"{excess['open']} asks standing, compost clock not started")
        else:
            bits.append(f"{excess['open']} asks standing, "
                        f"{excess['past_window']} past the {excess['window_days']}d window")
    else:
        bits.append("decision ledger unread")
    if wash.get("readable"):
        if wash.get("necrotic"):
            bits.append(f"promote_ready holds {wash['files']} file(s), "
                        f"oldest {wash['oldest_days']}d — wash")
    else:
        bits.append("promote_ready unread")
    if nutrients.get("readable"):
        bits.append(f"{nutrients['count']} nutrient(s), "
                    f"{nutrients['with_edges']} with declared graft edges")
    else:
        bits.append("canon unread")
    line = ("the membrane reads — " + " · ".join(bits)) if bits else ""

    return {"excess": excess, "wash": wash, "retained": retained,
            "nutrients": nutrients, "line": line}


if __name__ == "__main__":
    import json
    print(json.dumps({"law": law_summary(), "registers": registers(),
                      "gap": trickster_detector(),
                      "metabolism": metabolism()},
                     indent=2, ensure_ascii=False))
