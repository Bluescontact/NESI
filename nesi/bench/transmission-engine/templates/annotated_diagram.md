# Annotated Diagram — Asset Class

## What it is

A variant of any existing pattern with **numbered callouts** pointing to each significant element, plus a **legend panel** mapping numbers to names and brief descriptions. Same geometry as the source pattern — but readable to someone seeing it cold.

## When to produce

- Workshop slides, kit documentation, onboarding contexts
- Posts written for audiences who haven't read the supporting prose
- Anywhere the figure needs to teach itself

Skip when the pattern is appearing inline with the article that defines it — the prose does the annotation.

## Canvas

**1800 × 1100** (16:11 — wider than standard to accommodate the legend panel).
- Left ~1180px: the figure
- Right ~500px: the legend panel
- Top ~80px: title (with " — annotated" suffix)
- Bottom ~60px: subtitle (typically the closing line of the article)

## Construction

Start from the source pattern's SVG. Apply these transformations:

1. **Expand viewBox to 1800×1100.**
2. **Compress the figure** to fit in the left 1180px (translate/scale the geometry — usually a 0.75–0.85 scale of the original).
3. **Add numbered callout circles** next to each significant element:
   - Circle radius 20, fill `#0a0a0a`, stroke `#f0c674` width 1.5
   - Number inside, Cormorant Garamond 20pt, fill `#f0c674`
   - Position 30–50px outside the element it references
4. **Build the legend panel** on the right, starting at translate(1240, 140):
   - "READING THE FIGURE" header, Cormorant 18pt letter-spacing 5, color `#9a8d76`
   - Divider line below header
   - For each numbered item: small circle (radius 18) + number + ALL-CAPS name (Cormorant 22pt) + italic description (Cormorant 16pt color `#9a8d76`)
   - Vertical spacing: 100px per item
5. **Add a "reading order" note** at the bottom of the legend panel — a 2–4 line italic prose summary in `#7a6d56` explaining how to walk through the numbers.

## Slot conventions

When parametrizing for the engine:

- `{{TITLE}}` — pattern title + " — annotated"
- `{{SUBTITLE}}` — closing line / share-caption
- `{{N_CALLOUTS}}` — typically 5–7 (more than 8 overcrowds)
- For each callout: `{{LABEL_n}}`, `{{DESC_n}}`
- `{{READING_NOTE}}` — 2–4 line italic explanation

## Reference implementation

`recognition-threshold/whole_pattern_annotated.svg` — 6 callouts mapping to the threshold-with-arc geometry. Use as the model for any new annotated diagram.

## What NOT to do

- Don't annotate aesthetic decoration (the grain, the vignette, the field gradient). Only annotate **structural elements** — things the reader needs to identify to understand the argument.
- Don't write long descriptions in the legend. One italic line per item. The description teaches the *what*; the article teaches the *why*.
- Don't replace the original pattern with the annotated version. They serve different purposes. Ship both.
