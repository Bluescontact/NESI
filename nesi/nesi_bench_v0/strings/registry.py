"""The versioned NESI bench string registry (guardrails #50, #51).

Every user-facing string in the bench must be looked up here. Inline literal
UI strings are prohibited in application code (guardrail #50) -- the
build-time lint in strings/lint.py fails a release that contains one.

Each entry is classed as exactly one of the eight lawful categories from
guardrail #51. A string with no class, or a class that doesn't fit, fails
review.
"""

VERSION = "0.2.0"

CLASS_STRUCTURAL_NOUN = "structural_noun"
CLASS_HUMAN_OPERATION = "human_operation"
CLASS_PROVENANCE_RECORD = "provenance_record"
CLASS_MACHINE_ORIGIN_DISCLOSURE = "machine_origin_disclosure"
CLASS_OPERATION_FAILURE = "operation_failure"
CLASS_UNCHANGED_STATE = "unchanged_state_declaration"
CLASS_SUMMONED_TECHNICAL_FACT = "explicitly_summoned_technical_fact"
# CLASS_EXACT_OBJECT_CONTENT is not represented here -- it is literal
# user-authored content, never a registry entry.

LAWFUL_CLASSES = {
    CLASS_STRUCTURAL_NOUN,
    CLASS_HUMAN_OPERATION,
    CLASS_PROVENANCE_RECORD,
    CLASS_MACHINE_ORIGIN_DISCLOSURE,
    CLASS_OPERATION_FAILURE,
    CLASS_UNCHANGED_STATE,
    CLASS_SUMMONED_TECHNICAL_FACT,
}

# id -> {text, class}
STRINGS = {
    # structural nouns -- region and link-state names, exposed on touch only
    "region.intake": {"text": "intake", "class": CLASS_STRUCTURAL_NOUN},
    "region.staging": {"text": "staging", "class": CLASS_STRUCTURAL_NOUN},
    "region.break": {"text": "break", "class": CLASS_STRUCTURAL_NOUN},
    "region.gate": {"text": "gate", "class": CLASS_STRUCTURAL_NOUN},
    "region.landing": {"text": "landing", "class": CLASS_STRUCTURAL_NOUN},
    "region.held-bay": {"text": "held-bay", "class": CLASS_STRUCTURAL_NOUN},
    "region.compost": {"text": "compost", "class": CLASS_STRUCTURAL_NOUN},
    "link.proposed": {"text": "proposed", "class": CLASS_STRUCTURAL_NOUN},
    "link.pending-ratification": {"text": "pending-ratification", "class": CLASS_STRUCTURAL_NOUN},
    "link.ratified": {"text": "ratified", "class": CLASS_STRUCTURAL_NOUN},
    "link.uncommitted": {"text": "uncommitted", "class": CLASS_STRUCTURAL_NOUN},
    # link *type* names (distinct from link *state* above), shown only on
    # deliberate attention to an object carrying that relation (v1 Sec 8
    # occasion C -- a concealed structural fact, named on touch, no advice)
    "link.type.coherent-tension": {"text": "coherent-tension", "class": CLASS_STRUCTURAL_NOUN},
    "link.type.derived-from": {"text": "derived-from", "class": CLASS_STRUCTURAL_NOUN},

    # human operations -- exact operation nouns/verbs only, no rationale
    "op.cross": {"text": "cross", "class": CLASS_HUMAN_OPERATION},
    "op.uncross": {"text": "uncross", "class": CLASS_HUMAN_OPERATION},
    "op.hold": {"text": "hold", "class": CLASS_HUMAN_OPERATION},
    "op.compost": {"text": "compost", "class": CLASS_HUMAN_OPERATION},
    "op.felt-read": {"text": "felt-read", "class": CLASS_HUMAN_OPERATION},
    "op.provenance": {"text": "provenance", "class": CLASS_HUMAN_OPERATION},
    "op.relations": {"text": "relations", "class": CLASS_HUMAN_OPERATION},

    # provenance records -- object-centered, past-tense, no second person
    "provenance.moved-to": {"text": "object · {region}", "class": CLASS_PROVENANCE_RECORD},
    "provenance.crossed": {"text": "crossed · {timestamp}", "class": CLASS_PROVENANCE_RECORD},
    "provenance.returned-from": {"text": "returned-from · {region} · {timestamp}", "class": CLASS_PROVENANCE_RECORD},

    # machine-origin disclosures -- documentary, never evaluative
    "disclosure.proposed-thread": {"text": "proposed thread · engine · unmarked", "class": CLASS_MACHINE_ORIGIN_DISCLOSURE},
    "disclosure.this-touches": {"text": "this-touches · proposed", "class": CLASS_MACHINE_ORIGIN_DISCLOSURE},

    # operation failures -- loud, exact, three parts: failed / didn't occur / unchanged
    "failure.write-not-recorded": {"text": "WRITE FAILED · movement not recorded · object remains in {region}", "class": CLASS_OPERATION_FAILURE},
    "failure.mark-not-written": {"text": "MARK NOT WRITTEN · {operation} did not occur · object unchanged", "class": CLASS_OPERATION_FAILURE},
    "failure.engine-dark": {"text": "ENGINE DARK · no proposal produced · object unchanged", "class": CLASS_OPERATION_FAILURE},

    # unchanged-state declarations
    "state.recovered-snapshot": {"text": "RECOVERED SNAPSHOT · written · {timestamp}", "class": CLASS_UNCHANGED_STATE},
    "state.unsaved-buffer-found": {"text": "UNSAVED BUFFER FOUND · not restored", "class": CLASS_UNCHANGED_STATE},

    # explicitly summoned technical facts -- inspection surface only, never ambient
    "tech.zero-matches": {"text": "0 matches", "class": CLASS_SUMMONED_TECHNICAL_FACT},
    "tech.co-moved-count": {"text": "co-moved · {n}", "class": CLASS_SUMMONED_TECHNICAL_FACT},
    "tech.co-opened-count": {"text": "co-opened · {n}", "class": CLASS_SUMMONED_TECHNICAL_FACT},
    "tech.filter-active": {"text": "filter active · {filter_name}", "class": CLASS_SUMMONED_TECHNICAL_FACT},
    "tech.not-in-horizon": {"text": "not in current horizon", "class": CLASS_SUMMONED_TECHNICAL_FACT},
    "tech.excluded-by-filter": {"text": "excluded by filter · {filter_name}", "class": CLASS_SUMMONED_TECHNICAL_FACT},
}


def get(string_id: str) -> str:
    entry = STRINGS.get(string_id)
    if entry is None:
        raise KeyError(f"unregistered string id: {string_id!r}")
    return entry["text"]


def all_ids():
    return list(STRINGS.keys())
