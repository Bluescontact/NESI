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


if __name__ == "__main__":
    import json
    print(json.dumps({"law": law_summary(), "registers": registers(),
                      "gap": trickster_detector()}, indent=2, ensure_ascii=False))
