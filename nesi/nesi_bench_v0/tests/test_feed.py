"""Stage 0 gate: the mock feed loads and every fixture object sits in a
lawful region -- no engine call, no network read involved."""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from nesi_bench_v0.feed import load_mock_feed
from nesi_bench_v0.regions import ALL_REGION_KEYS


def test_mock_feed_loads_and_regions_are_lawful():
    objects = load_mock_feed()
    assert len(objects) > 0
    for obj in objects:
        assert obj.region in ALL_REGION_KEYS


def test_mock_feed_touches_no_network():
    import nesi_bench_v0.feed.mock_feed as mf
    source = Path(mf.__file__).read_text(encoding="utf-8")
    for forbidden in ("requests", "urllib", "http.client", "socket"):
        assert forbidden not in source


if __name__ == "__main__":
    test_mock_feed_loads_and_regions_are_lawful()
    test_mock_feed_touches_no_network()
    print("feed clean: loads locally, lawful regions, no network")
