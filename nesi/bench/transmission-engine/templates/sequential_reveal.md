# Sequential Reveal — Asset Class

## What it is

A pattern shown across **N frames**, each frame adding one significant element. The same final figure builds up progressively, so a viewer who watches the sequence walks the argument step by step.

## When to produce

- Twitter/X threads (each frame = one tweet with image)
- LinkedIn carousel posts
- Workshop / talk slides
- Click-through teaching content
- Any context where the figure is too dense for a first viewing

Skip when the pattern is simple enough to read at-a-glance — sequential reveal is for figures with 4+ load-bearing elements.

## Canvas

**1600 × 900** per frame (same as source pattern). Each frame is a complete standalone image.

Default: **5 frames.** Use 3 for simpler patterns, 6–7 only when the geometry genuinely requires it.

## Construction

Decompose the source pattern into N additive layers, ordered from foundational substrate to event.

For the canonical threshold-with-arc pattern, the decomposition is:

| Frame | Adds | Frame title | Subtitle |
|---|---|---|---|
| 1 | Just the two grounds + threshold | "THE TERRAIN" | *two grounds, one threshold* |
| 2 | + The source/apparatus rooted on one ground | "THE APPARATUS" | *rooted on your ground* |
| 3 | + The arc + crossing point lit | "THE FORM" | *arcing across, crossing the threshold* |
| 4 | + The reception flash on the other ground | "RECOGNITION" | *lit on another ground* |
| 5 | + Propagation ghost-arcs + closing line | "PROPAGATION" | *the gift completing its circuit* |

For other geometries, find the analogous progression — start with the static substrate, add agents, add motion, add the event, add what generalizes.

## Per-frame structure

Each frame is a complete 1600×900 SVG with:

- **Title at top** (38pt, letter-spacing 8) — names what's being added in this frame
- **Italic subtitle** (18pt, letter-spacing 3) — one-line description
- **Step indicator at bottom** — "STEP N OF 5" in tracked-out italic, color `#6a5d46`
- **All elements from previous frames** carried forward (the reveal is additive — never remove)
- **Same defs, same colors, same positions** as the source pattern

## Slot conventions

- `{{FRAME_TITLE_n}}` and `{{FRAME_SUBTITLE_n}}` per frame
- `{{N_FRAMES}}` for the step indicator denominator
- `{{ELEMENTS_THROUGH_n}}` — the set of SVG elements that should appear in frame N

## Reference implementation

`recognition-threshold/whole_pattern_step1.svg` through `whole_pattern_step5.svg`. Five frames, additive build, identical geometry across frames with one new element per frame.

## Output formats

- **5 separate 1600×900 PNGs** — primary output, for thread posting and slide use
- **Optional: contact sheet** — all 5 frames in a single image (vertical stack at 1600×4500, or 2×3 grid at 3200×2700). Skip unless explicitly requested.
- **Optional: animated GIF/MP4** — sequential frames with ~2sec hold each. Defer until needed; out of scope for v1 of this asset class.

## What NOT to do

- Don't change the geometry between frames. Each frame is a strict subset of the next — additive only, never re-positioned.
- Don't add narration text *inside* the figure. The title and subtitle do that work.
- Don't compress too tightly. If the article needs 7 elements, use 7 frames — don't force-fit into 5.
- Don't produce reveals for patterns simpler than 4 elements. Single-pattern figures don't benefit from sequencing.
