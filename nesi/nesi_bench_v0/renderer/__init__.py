from .seam import Renderer, NullRenderer

__all__ = ["Renderer", "NullRenderer", "PywebviewRenderer"]


def __getattr__(name):
    # deferred import: pywebview may not be installed in a headless/CI
    # environment, and this package must still import cleanly there.
    if name == "PywebviewRenderer":
        from .pywebview_renderer import PywebviewRenderer
        return PywebviewRenderer
    raise AttributeError(name)
