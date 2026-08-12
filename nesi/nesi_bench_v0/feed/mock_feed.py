"""Mock object feed (v1 Sec 12) -- fixture-backed, engine dark.

Loads feed/fixtures.json into plain BenchObject records. This is the only
object source in v0: no engine call, no network read, no real intake path.
"""

from __future__ import annotations

import json
from dataclasses import dataclass, field
from pathlib import Path

from ..regions import ALL_REGION_KEYS

FIXTURES_PATH = Path(__file__).resolve().parent / "fixtures.json"


@dataclass
class BenchLink:
    type: str
    target: str
    state: str  # proposed | pending-ratification | ratified


@dataclass
class BenchObject:
    id: str
    region: str
    position: dict
    content: str
    links: list = field(default_factory=list)

    def __post_init__(self):
        if self.region not in ALL_REGION_KEYS:
            raise ValueError(f"object {self.id!r} placed in unknown region {self.region!r}")
        self.links = [
            link if isinstance(link, BenchLink) else BenchLink(**link)
            for link in self.links
        ]


def load_mock_feed(path: Path | None = None) -> list[BenchObject]:
    path = path or FIXTURES_PATH
    raw = json.loads(path.read_text(encoding="utf-8"))
    return [BenchObject(**obj) for obj in raw["objects"]]
