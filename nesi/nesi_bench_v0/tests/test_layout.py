"""Stage 1 gate: region rects are well-formed and fixture positions actually
land inside the region each object claims (position is the only state
signal, so a fixture that lies about its own region would be a silent
contradiction the surface can't catch on its own)."""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from nesi_bench_v0.layout import REGION_RECTS, region_for_point, CANVAS_W, CANVAS_H
from nesi_bench_v0.regions import ALL_REGION_KEYS
from nesi_bench_v0.feed import load_mock_feed


def test_every_region_key_has_a_rect():
    assert set(REGION_RECTS.keys()) == set(ALL_REGION_KEYS)


def test_rects_stay_inside_canvas():
    for key, rect in REGION_RECTS.items():
        assert rect.x >= 0 and rect.y >= 0
        assert rect.x + rect.w <= CANVAS_W
        assert rect.y + rect.h <= CANVAS_H


def test_on_grain_rects_do_not_overlap():
    from nesi_bench_v0.regions import REGION_KEYS
    rects = [REGION_RECTS[k] for k in REGION_KEYS]
    for i, a in enumerate(rects):
        for b in rects[i + 1:]:
            overlap_x = a.x < b.x + b.w and b.x < a.x + a.w
            overlap_y = a.y < b.y + b.h and b.y < a.y + a.h
            assert not (overlap_x and overlap_y), "on-grain regions overlap"


def test_off_grain_rects_sit_outside_on_grain_band():
    from nesi_bench_v0.regions import REGION_KEYS, OFF_GRAIN_KEYS
    on_grain_bottom = max(REGION_RECTS[k].y + REGION_RECTS[k].h for k in REGION_KEYS)
    for key in OFF_GRAIN_KEYS:
        assert REGION_RECTS[key].y >= on_grain_bottom


def test_fixture_positions_land_in_their_declared_region():
    for obj in load_mock_feed():
        found = region_for_point(obj.position["x"], obj.position["y"])
        assert found == obj.region, (
            f"{obj.id} declares region {obj.region!r} but its fixture "
            f"position resolves to {found!r}"
        )


if __name__ == "__main__":
    test_every_region_key_has_a_rect()
    test_rects_stay_inside_canvas()
    test_on_grain_rects_do_not_overlap()
    test_off_grain_rects_sit_outside_on_grain_band()
    test_fixture_positions_land_in_their_declared_region()
    print("layout clean: rects well-formed, fixtures match their declared region")
