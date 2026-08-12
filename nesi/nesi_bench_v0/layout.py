"""Stage 1 -- the grain's spatial layout (v1 Sec 2 Axis A, Sec 3 table).

Region identity comes from position alone (guardrail #10-11): this module
is the single source of truth for "which rectangle is which region," so
nothing else in the codebase invents region boundaries independently.

held-bay and compost are off-grain (master Sec 4) -- placed outside the
directional intake-to-landing flow, not merely styled differently.
"""

from __future__ import annotations

from dataclasses import dataclass

from .regions import REGION_KEYS, OFF_GRAIN_KEYS, ALL_REGION_KEYS

# canvas is a fixed logical size in Stage 1; surface.html scales it to the
# viewport. Rects are (x, y, w, h) in logical units.
CANVAS_W = 960
CANVAS_H = 640

_ON_GRAIN_BAND_H = 460
_ON_GRAIN_Y = 30


@dataclass(frozen=True)
class Rect:
    x: float
    y: float
    w: float
    h: float

    def contains(self, px: float, py: float) -> bool:
        return self.x <= px < self.x + self.w and self.y <= py < self.y + self.h

    def as_dict(self):
        return {"x": self.x, "y": self.y, "w": self.w, "h": self.h}


def _on_grain_rects() -> dict:
    n = len(REGION_KEYS)
    band_w = CANVAS_W / n
    return {
        key: Rect(x=i * band_w, y=_ON_GRAIN_Y, w=band_w, h=_ON_GRAIN_BAND_H)
        for i, key in enumerate(REGION_KEYS)
    }


def _off_grain_rects() -> dict:
    # off-grain sits below the flow band, spatially separate -- not a
    # seventh/eighth column in the same directional line (master Sec 4).
    y = _ON_GRAIN_Y + _ON_GRAIN_BAND_H + 30
    h = CANVAS_H - y - 20
    n = len(OFF_GRAIN_KEYS)
    band_w = CANVAS_W / n
    return {
        key: Rect(x=i * band_w, y=y, w=band_w, h=h)
        for i, key in enumerate(OFF_GRAIN_KEYS)
    }


REGION_RECTS: dict = {**_on_grain_rects(), **_off_grain_rects()}

assert set(REGION_RECTS.keys()) == set(ALL_REGION_KEYS)


def region_for_point(px: float, py: float) -> str | None:
    """The region whose rect contains (px, py), or None if the point sits
    in the gap between regions -- position alone decides state, so an
    ambiguous point is genuinely ambiguous, not resolved by nearest-rect
    guessing (guardrail #14: no boundary is a machine call)."""
    for key, rect in REGION_RECTS.items():
        if rect.contains(px, py):
            return key
    return None


def rects_as_dict() -> dict:
    return {key: rect.as_dict() for key, rect in REGION_RECTS.items()}
