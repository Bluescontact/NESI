"""Stage 0 gate: region keys are functional-only; display names default to them."""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from nesi_bench_v0.regions import ALL_REGION_KEYS, DISPLAY_NAMES, display_name


def test_display_names_default_to_functional_key():
    for key in ALL_REGION_KEYS:
        assert DISPLAY_NAMES[key] == key, f"{key} has a hardened name before Kevin's mark"


def test_display_name_rejects_unknown_key():
    try:
        display_name("nonexistent-region")
    except ValueError:
        pass
    else:
        raise AssertionError("expected ValueError for unknown region key")


if __name__ == "__main__":
    test_display_names_default_to_functional_key()
    test_display_name_rejects_unknown_key()
    print("regions clean: functional keys only, no hardened names")
