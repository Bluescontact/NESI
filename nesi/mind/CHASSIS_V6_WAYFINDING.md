# Chassis v6 — wayfinding over v5 (candidate, 2026-07-25)

**Status:** candidate, not canonical. v5 remains the operative chassis (per PROTOCOLS.md) until Kevin marks v6 to replace it. File: `nesi/mind/_chassis_v6.html`, mirrored at `_widgets/_chassis_v6.html`.

## The diagnosis this answers

Kevin named the widget system sending him down rabbit holes — he couldn't locate the ask or the terrain, and wasn't recovering. The first-pass read (shrink the widget) was wrong. Kevin corrected it: there are two different kinds of load —

- **Load-of-volume** — how much complexity is present.
- **Load-of-navigation** — whether you know where you are, where the ask is, and how to get back.

The largest, most-unfolding widgets were the most useful ones, because they held complexity externally instead of making Kevin carry it. Shrinking a widget doesn't remove that complexity — it removes the surface that was holding it *for* him, and the complexity becomes something he has to hold in his head instead. That's the **embodied debt**: complexity that lost its external holder.

v5 (chassis, 2026-07-22) solved *what* is shown at each depth — L0/L1/L2/L3, one decision per card, never padded. It did not solve *how you don't get lost once you're in it*. That gap — not the size of the widget — is what turned depth into a hole.

## The four boundaries (upstream of any single widget's content)

1. **Persistent anchor.** The ask should be reachable from any depth, not just visible at L0 before you scroll or open anything. v6 adds a "◆ back to the ask" link inside every opened card and every opened depth panel — same wording, same behavior, everywhere. Deliberately a DOM link, not `position:sticky`/`fixed`: this chassis lives in a sandboxed iframe and a per-session file, and CSS positioning has broken before (fixed collapsed the visualize iframe, 2026-07-22). An explicit link is more robust than a CSS trick in this environment.

2. **Symmetric expand/collapse.** Opening four cards one at a time and having to close each one individually is asymmetric — expansion is cheap, contraction is expensive. v6 adds one "▲ collapse everything · back to L0" control beside the L0 label. It's invisible when nothing is open and appears the moment anything is, so it never clutters a simple read but is always there once depth accumulates.

3. **Legible threshold.** In v5, the plain-words explanation and the slider control sit in the same undivided block — reading and deciding are visually the same zone. v6 inserts a thin labeled divider ("— now choosing —") between them, at L0 and inside every L2 card. Wandering through the explanation should never silently become standing at the control.

4. **State never silently resets.** Already true of v5's JS (no auto-collapse, no timers, opening one card doesn't close another) — v6 states it as a frozen rule so a future edit can't quietly add one. Complexity that's been externalized should stay externalized until Kevin, not the interface, closes it.

## What did not change

Every v5 mechanic is carried verbatim: the segmented slider, the refuse/NO-verb (write-to-sink, latching), hold/deposit to the marks ledger, copy-only send (a mark copies, the widget never sends), the 23 design tokens, light-background-only, no `position:fixed`, per-session file naming. v6 is additive — three new pieces of chassis, nothing removed.

## What crossing this to canonical would require

A separate mark. This build only produced the candidate file and this rationale. Wiring it into PROTOCOLS.md as the default chassis — replacing the v5 reference in the render protocol — is a distinct decision with its own stakes (every future session's widgets change shape), not implied by building the candidate.

## Falsifier

If a future widget author using v6 still has to remember to add a way back, or still can't tell reading from deciding without checking, the boundaries didn't hold and this was ceremony, not structure.
