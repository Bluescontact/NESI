"""Stage 0 gate: the string registry and source tree must pass lint clean.

Wires guardrails #50-53 and the microcopy audit (#75) into an actual
build-time test rather than a philosophical review of each screen.
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from nesi_bench_v0.strings.lint import lint_registry, lint_source_tree


def test_registry_lint_clean():
    violations = lint_registry()
    assert violations == [], "\n".join(violations)


def test_source_tree_lint_clean():
    violations = lint_source_tree()
    assert violations == [], "\n".join(violations)


if __name__ == "__main__":
    v = lint_registry() + lint_source_tree()
    if v:
        print("\n".join(v))
        raise SystemExit(1)
    print("lint clean")
