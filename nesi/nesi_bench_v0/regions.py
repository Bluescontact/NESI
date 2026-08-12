"""Region keys for the NESI bench grain (v1 spec Sec 3).

Functional keys are the only thing code may reference. Display names are a
separate, swappable, unmarked layer -- defaulting to the functional key so
the surface never hardens a name Kevin hasn't marked (v1 Sec 3, master Sec 5).
"""

REGION_KEYS = (
    "intake",
    "staging",
    "break",
    "gate",
    "landing",
)

OFF_GRAIN_KEYS = (
    "held-bay",
    "compost",
)

ALL_REGION_KEYS = REGION_KEYS + OFF_GRAIN_KEYS

LINK_STATE_KEYS = (
    "proposed",
    "pending-ratification",
    "ratified",
)

# display_names: functional key -> shown label. Every value defaults to the
# functional key itself. This map is the ONLY place a felt-name may ever be
# substituted in, and only after Kevin's mark -- never inferred, never guessed
# at build time (v1 Sec 3 round-3 convergence table is a candidate list, not
# a mark).
DISPLAY_NAMES = {key: key for key in ALL_REGION_KEYS}


def display_name(region_key: str) -> str:
    if region_key not in DISPLAY_NAMES:
        raise ValueError(f"unknown region key: {region_key!r}")
    return DISPLAY_NAMES[region_key]
