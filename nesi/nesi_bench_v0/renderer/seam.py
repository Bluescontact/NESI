"""The renderer seam (master Sec 5, v1 Sec 12).

The renderer is a held decision -- pywebview is recommended, not marked. This
seam exists so the choice stays swappable: application code talks to
Renderer, never to pywebview or any other windowing library directly.

Every renderer implementation must satisfy the same law: local render only,
no port opened, no network touched (spine law 8). NullRenderer exists for
headless smoke tests where no display is available.
"""

from __future__ import annotations

from abc import ABC, abstractmethod
from pathlib import Path


class Renderer(ABC):
    """A local, no-network rendering surface for the bench."""

    @abstractmethod
    def open(self, html_path: Path, title: str) -> None:
        """Open the surface. Must not bind a network port or socket."""

    @abstractmethod
    def close(self) -> None:
        """Close the surface."""

    @property
    @abstractmethod
    def opened_network_port(self) -> bool:
        """Must always be False for a lawful renderer (spine law 8)."""


class NullRenderer(Renderer):
    """Headless renderer for smoke tests -- opens nothing, records intent."""

    def __init__(self):
        self._open = False
        self.last_html_path = None
        self.last_title = None

    def open(self, html_path: Path, title: str) -> None:
        self._open = True
        self.last_html_path = html_path
        self.last_title = title

    def close(self) -> None:
        self._open = False

    @property
    def opened_network_port(self) -> bool:
        return False

    @property
    def is_open(self) -> bool:
        return self._open
