# Chassis v7 — capacity, locator, read/decide zones (candidate, 2026-07-25)

**Status:** candidate, not canonical. v5 remains operative per PROTOCOLS.md; v6 and v7 both sit un-adopted until a separate mark promotes one. Files: `nesi/mind/_chassis_v7.html`, mirrored at `_widgets/_chassis_v7.html`.

## Where this came from

Built from a full derailment inventory across ~40 feedback memories (~30 named incidents), audited down to six root mechanisms, then dreamed/developed/converged to three buildable additions. v6 (same day) fixed wayfinding *within* one widget. v7 fixes the layer above it: how much gets surfaced at all, and whether continuity across turns becomes Kevin's job to hold.

## The three additions

1. **Locator** — one line above L0, regenerated every fill, stating where the whole thread stands. Answers the sharpest correction found in the audit: *"I have no way to locate myself... I'm actively refusing each turn"* — accumulation across turns must never become something Kevin reconstructs himself.

2. **Capacity strip** — a persistent, always-visible, three-way control (one decision / a few / you drive) that Kevin sets, never the AI infers. Guarded directly by the rule that a cap the AI infers is itself the failure mode (an AI safety that can silently give less at the moment more is needed). Verified in-browser: switching modes actually hides/shows the L1 card section via JS, and the choice persists in `localStorage` across reloads — a real mechanism, not a promise.

3. **Read/decide zones** — v6's threshold divider becomes two visually distinct, labeled regions (a tinted "reading" box, a differently-tinted "deciding" box) instead of a single line between them, at both L0 and every L1 card.

## Hard rule (content, not code)

No card, locator line, or manifest text may direct Kevin's body, rest, sleep, food, or physical day — this cannot be enforced by CSS/JS, so it's stated as a chassis-level authoring rule instead, guarding directly against the recurring correction *"you keep directing my outside... you've been applying a force to the user."*

## What was deliberately left out

Two root mechanisms from the audit (mechanical interface friction, build-without-checking-corpus) are process disciplines, not chassis features, and don't belong in this file. Standing-consent autorun (infrastructure that runs without per-instance approval) is likewise a process/automation change, not something a widget chassis can carry.

## Crossing to canonical

A separate mark, same as v6 — this build only produced the candidate and this rationale.

## Falsifier

If a future thread still requires Kevin to reconstruct what's already been decided, or the capacity dial still gets guessed at instead of set, the additions didn't hold.
