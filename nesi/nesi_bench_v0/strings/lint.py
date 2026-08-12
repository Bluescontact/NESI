"""Build-time string lint (guardrails #50-53, #75).

Two checks:
  1. registry lint  -- every registry string obeys the verbal constitution:
     no first/second person, no praise/persuasion vocabulary, class is one
     of the seven lawful classes.
  2. source lint     -- no application file outside the registry itself
     contains a literal quoted string that looks like user-facing prose.
     A component that carries default microcopy of its own is a lint
     failure, not a UI convention (guardrail #50).

Both checks are pure functions returning a list of violation strings; the
lint has failed iff the list is non-empty. tests/test_lint.py wires this
into a real build-time test.
"""

from __future__ import annotations

import re
from pathlib import Path

from .registry import STRINGS, LAWFUL_CLASSES

# guardrail #52 -- prohibited-person grammar
PRONOUN_PATTERN = re.compile(
    r"\b(i|i'm|i'll|i've|we|we're|we'll|you|you're|you'll|your|yours)\b",
    re.IGNORECASE,
)

# guardrail #53 -- praise/persuasion lint. Phrases, not just words, because a
# lawful structural term (e.g. "strengthens") becomes unlawful only when
# turned into persuasion ("strengthen this before crossing").
PRAISE_WORDS = (
    "great", "good", "ready", "helpful", "important", "meaningful",
    "consider", "try", "should", "next", "improve", "strengthen this",
    "successfully", "please", "welcome back", "almost done", "nice work",
    "well done", "congrat",
)

APOLOGY_WORDS = ("sorry", "don't worry", "your work is safe", "please try again")

REGISTRY_FILE = Path(__file__).resolve()
PROJECT_ROOT = REGISTRY_FILE.parent.parent  # nesi_bench_v0/

# files the source lint is permitted to skip: the registry itself (it is the
# one place literal text is lawful), tests (which assert against literal
# expected strings), and fixtures (mock object content, not UI copy).
SOURCE_LINT_EXCLUDE_DIRS = {"tests", "__pycache__", ".git"}
# the registry is the one lawful place literal Bench-surface text lives.
# lint.py itself carries the prohibited-vocabulary lists this module checks
# against -- scanning it against its own pattern is a false positive, not a
# UI breach. Both are developer-facing source, not the Bench's user surface.
SOURCE_LINT_EXCLUDE_FILES = {"registry.py", "fixtures.json", "lint.py"}

# a quoted literal counts as suspect prose if it contains a space and at
# least one lowercase letter followed by another word -- i.e. looks like a
# sentence fragment rather than an identifier, path, or format code.
#
# Single- and double-quoted literals are matched separately, each disallowing
# its OWN delimiter character inside the body. A shared character class that
# allowed both `'` and `"` inside either quote type let the match jump the
# gap between two adjacent single-quoted JS string literals (e.g.
# `'class', 'gate-seam'`) and report one fused, meaningless "violation"
# spanning both -- fixed in Stage 4 alongside the docstring/assignment gap.
SUSPECT_STRING_PATTERN = re.compile(
    r"""'([A-Za-z][A-Za-z0-9 ,.!?-]{3,}[A-Za-z0-9.!?])'"""
    r"""|"([A-Za-z][A-Za-z0-9 ,.!?-]{3,}[A-Za-z0-9.!?])\""""
)
IDENTIFIER_LIKE = re.compile(r"^[a-z0-9_./\\-]+$")

# the scan targets Bench-surface UI copy, not developer-facing source: Python
# docstrings, raised-exception messages (seen only by a developer reading a
# traceback, never rendered on the Bench face), and argparse CLI help/
# description text (the CLI is a developer entry point, not the Bench
# surface itself) are out of scope.
#
# Stage-1/2 gap, fixed in Stage 4: a real docstring is always a bare
# expression statement -- never the right-hand side of an assignment. A
# triple-quoted constant like `HTML_TEMPLATE = """..."""` IS an assignment,
# so it is scanned like any other string, not silently treated as prose-free
# developer commentary. The distinction is made structurally (is the
# triple-quote preceded by `=`?), not by a filename exemption.
TRIPLE_QUOTE_PATTERN = re.compile(r'("""|\'\'\')(?:(?!\1).)*\1', re.DOTALL)
DEV_SURFACE_LINE_PATTERN = re.compile(
    r"^\s*(raise\b|.*\bargparse\b|.*add_argument\(|.*ArgumentParser\()"
)


def _strip_real_docstrings(text: str) -> str:
    """Remove only genuine docstrings (module/class/function-level bare
    triple-quoted strings), leaving triple-quoted assignments like
    `HTML_TEMPLATE = \"\"\"...\"\"\"` in place so their contents are scanned
    for stray UI strings same as any other literal."""
    out = []
    pos = 0
    for match in TRIPLE_QUOTE_PATTERN.finditer(text):
        preceding = text[pos:match.start()]
        out.append(preceding)
        is_assignment = preceding.rstrip().endswith("=")
        out.append(text[match.start():match.end()] if is_assignment else "")
        pos = match.end()
    out.append(text[pos:])
    return "".join(out)


def lint_registry() -> list[str]:
    violations = []
    for string_id, entry in STRINGS.items():
        text = entry.get("text", "")
        klass = entry.get("class")
        if klass not in LAWFUL_CLASSES:
            violations.append(f"{string_id}: unlawful or missing class {klass!r}")
        if PRONOUN_PATTERN.search(text):
            violations.append(f"{string_id}: contains prohibited pronoun grammar: {text!r}")
        lowered = text.lower()
        for phrase in PRAISE_WORDS:
            if phrase in lowered:
                violations.append(f"{string_id}: contains praise/persuasion phrase {phrase!r}: {text!r}")
        for phrase in APOLOGY_WORDS:
            if phrase in lowered:
                violations.append(f"{string_id}: contains apology/reassurance phrase {phrase!r}: {text!r}")
    return violations


def lint_source_tree(root: Path | None = None) -> list[str]:
    root = root or PROJECT_ROOT
    violations = []
    for path in root.rglob("*.py"):
        if any(part in SOURCE_LINT_EXCLUDE_DIRS for part in path.parts):
            continue
        if path.name in SOURCE_LINT_EXCLUDE_FILES:
            continue
        text = path.read_text(encoding="utf-8")
        text = _strip_real_docstrings(text)
        # JS/CSS text embedded in a template constant may carry `//`
        # comments -- developer commentary about the code, never rendered
        # UI copy (Python has no `//` operator, so this is a no-op on plain
        # Python source and only trims embedded-template comments).
        text = "\n".join(line.split("//", 1)[0] for line in text.split("\n"))
        lines = text.split("\n")
        # a raise statement's message often continues onto the next
        # line/paren before the string literal; drop the raise line and the
        # one following it from the scan so the developer-error exemption
        # covers a wrapped raise ...Error(\n    "message"\n) form too.
        skipping = False
        kept_lines = []
        for line in lines:
            if skipping:
                if ")" in line:
                    skipping = False
                continue
            if DEV_SURFACE_LINE_PATTERN.match(line):
                if "(" in line and ")" not in line:
                    skipping = True
                continue
            kept_lines.append(line)
        text = "\n".join(kept_lines)

        for match in SUSPECT_STRING_PATTERN.finditer(text):
            literal = match.group(1) or match.group(2)
            if IDENTIFIER_LIKE.match(literal):
                continue
            if " " not in literal:
                continue
            rel = path.relative_to(root)
            violations.append(f"{rel}: unregistered literal string: {literal!r}")
    return violations


def run_all(root: Path | None = None) -> list[str]:
    return lint_registry() + lint_source_tree(root)
