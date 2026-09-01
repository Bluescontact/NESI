"""
grounder.py — structured Grounder pass using instructor + ollama.

Returns a typed GrounderResult instead of free text:
  verified, assumed, missing, verdict, reason, condition

Requires ollama running locally (http://localhost:11434).
Falls back to a parse-only path if instructor/openai is unavailable.

Usage:
  from tools.codex_index.grounder import run_grounder
  result = run_grounder(text)
  print(result.verdict, result.reason)
"""

import os
import sys
from typing import Literal, Optional
from pydantic import BaseModel, Field

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))

OLLAMA_BASE = "http://localhost:11434/v1"
OLLAMA_MODEL = "hermes3:8b"


class GrounderResult(BaseModel):
    verified: list[str] = Field(description="Claims the text explicitly states with evidence")
    assumed: list[str] = Field(description="Claims that appear to be taken for granted but are not proven")
    missing: list[str] = Field(description="What's absent that would be needed to fully evaluate this")
    verdict: Literal["PROMOTE", "HOLD", "PASS", "COMPOST"] = Field(
        description="PROMOTE=new pattern candidate; HOLD=conditional; PASS=no pattern content; COMPOST=redundant or folds into existing"
    )
    reason: str = Field(description="One sentence naming the pattern axis or why it routes as it does")
    condition: Optional[str] = Field(
        default=None,
        description="For HOLD only: the exact condition that makes it decidable"
    )


GROUNDER_PROMPT = """\
You are a Grounder agent for a personal pattern library called Recognition Infrastructure.

Your job is to separate what this text VERIFIES (explicitly stated with evidence),
what it ASSUMES (taken for granted), and what is MISSING (needed to evaluate it fully).
Then assign a routing verdict.

ROUTING:
- PROMOTE: introduces a genuinely new pattern axis not in the existing library
- HOLD: not yet decidable, but you can name the EXACT condition that resolves it
- PASS: no pattern content — procedural, reference, or external material
- COMPOST: restates, illustrates, or folds into something already named

TEXT:
---
{text}
---

Return a structured response with: verified, assumed, missing, verdict, reason, condition.
"""


def run_grounder(text: str, max_chars: int = 2000) -> GrounderResult:
    """Run structured Grounder pass on text. Returns GrounderResult."""
    truncated = text[:max_chars]
    prompt = GROUNDER_PROMPT.format(text=truncated)

    try:
        import instructor
        from openai import OpenAI

        client = instructor.from_openai(
            OpenAI(base_url=OLLAMA_BASE, api_key="ollama"),
            mode=instructor.Mode.JSON,
        )
        result = client.chat.completions.create(
            model=OLLAMA_MODEL,
            messages=[{"role": "user", "content": prompt}],
            response_model=GrounderResult,
            max_retries=2,
        )
        return result

    except Exception as e:
        # fallback: parse the free-text output manually
        return _fallback_grounder(text, str(e))


def _fallback_grounder(text: str, error: str) -> GrounderResult:
    """Minimal fallback when instructor/ollama is unavailable."""
    return GrounderResult(
        verified=[],
        assumed=["[fallback mode — ollama or instructor unavailable]"],
        missing=["[run with ollama active for full Grounder pass]"],
        verdict="HOLD",
        reason=f"Grounder unavailable: {error[:120]}",
        condition="Retry with ollama running and instructor installed",
    )


def format_grounder_card(result: GrounderResult) -> str:
    """Format a GrounderResult as a readable card for the Dispatcher brief."""
    lines = [
        f"Verdict: {result.verdict}",
        f"Reason: {result.reason}",
    ]
    if result.condition:
        lines.append(f"Condition: {result.condition}")
    if result.verified:
        lines.append("Verified:")
        lines.extend(f"  + {v}" for v in result.verified)
    if result.assumed:
        lines.append("Assumed:")
        lines.extend(f"  ~ {a}" for a in result.assumed)
    if result.missing:
        lines.append("Missing:")
        lines.extend(f"  ? {m}" for m in result.missing)
    return "\n".join(lines)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python grounder.py <text or file path>")
        sys.exit(1)

    arg = " ".join(sys.argv[1:])
    if os.path.isfile(arg):
        with open(arg, encoding="utf-8", errors="replace") as f:
            text = f.read()
        label = os.path.basename(arg)
    else:
        text = arg
        label = text[:50]

    print(f"\nGrounder pass: {label}\n")
    result = run_grounder(text)
    print(format_grounder_card(result))
    print()
