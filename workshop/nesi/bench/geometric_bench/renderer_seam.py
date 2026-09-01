"""Renderer seam — the swappable boundary between the bench's object state
and whatever draws it on screen. This module has zero third-party imports
on purpose: it is not allowed to know pywebview exists. The concrete
implementation lives in pywebview_renderer.py; a future swap (a different
local-window toolkit, or nothing at all) means writing a new module that
satisfies this interface, not touching bench_geo.py's call site or the
region/motion logic in renderer/app.js.
"""

from abc import ABC, abstractmethod


class RendererSeam(ABC):
    @abstractmethod
    def open(self, title, html_path, api, width=1000, height=820):
        """Open a local window rendering html_path, blocking until the
        window is closed. `api` is an object whose public methods become
        callable from the page's own JS (the bench's only bridge back to
        Python — used for seeding the mock feed and recording a dry-run
        gate mark). Must not open a network port or make any outbound
        call; local render only.
        """
        raise NotImplementedError
