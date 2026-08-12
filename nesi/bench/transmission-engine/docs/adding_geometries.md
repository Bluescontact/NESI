# Adding a New Geometry

When an article comes through the engine and none of the existing geometries fit, add a new one. This document walks the steps.

## The eight current geometries

```
threshold           two sides of a boundary
distinction         two terms held apart
circuit             closed loop, gift completing
source_emanation    central source radiating outward
tetrahedron         four irreducible vertices
vertex_mapped       N positions on a named figure
layered             horizontal strata, surface and depth
filter              input → criteria → output
```

## When to add a new one (not just stretch an existing template)

Add a new geometry when:

- The article's load-path genuinely doesn't fit any of the eight (not just "doesn't fit perfectly" — *genuinely doesn't*)
- Stretching one of the eight would force the article into a shape that misrepresents its argument
- The new geometry is likely to recur in at least 2-3 future articles (one-off shapes belong in custom SVGs, not in the template library)

Examples of geometries worth adding when they show up:

- **spiral / recursion** — the argument returns to itself at a higher resolution
- **nested** — same shape at multiple scales
- **braid** — two threads weaving without merging
- **lens** — convergent focus
- **scaffold** — temporary structure that enables a permanent one
- **echo** — same form repeated with decay
- **fold** — a shape that turns back on itself, inside becoming outside

## Steps

### 1. Identify the geometry precisely

Write one sentence naming what the figure represents. *"Spiral: an argument that returns to its starting point at a higher resolution, accumulating depth on each pass."* If you can't write that sentence cleanly, the geometry isn't ready to template yet.

### 2. Sketch the SVG

Open `templates/threshold.svg` as a reference. Draw the new figure in SVG keeping these locked:

- Viewport: `viewBox="0 0 1600 900"`
- Background: `<rect width="1600" height="900" fill="url(#field_flat)"/>` (or `field` for atmospheric)
- Title: top, Cormorant Garamond, letter-spacing 6, fill `#e8dcc4`
- Vertices/nodes: `circle` with `fill="url(#glow)"` + small bright center
- Lines: `stroke="#d4af6a"` at 1.5px, or use one of the line gradients from defs
- Subtitle: bottom, italic, fill `#9a8d76`

**Never use `<use>` to repeat geometry — inline it.** If your figure instances the same shape more than once (small-multiples, a grid, four matching nodes), do NOT define it once and reference it via `<use href="#id">`. The rasterizer here is ImageMagick, and magick's SVG renderer silently drops `<use>` — the instanced shape renders blank in the PNG with no error. Write the geometry out in full at each position, e.g. `<g transform="translate(...)">…literal children…</g>`. (`fill="url(#…)"` and `filter="url(#…)"` references are fine; only `<use>` fails. Inkscape/rsvg would handle it, but they're not installed.)

### 3. Use defs from the asset library

DO NOT define your own gradients/filters inline. Reference the ids from `assets/defs.svg`:

- Glows: `url(#glow)`, `url(#point_bright)`, `url(#halo_wide)`, `url(#glow_dim)`
- Lines: `url(#line_threshold)`, `url(#line_boundary)`
- Fields: `url(#field)`, `url(#field_flat)`
- Filters: `url(#grain)`, `url(#mist)`, `url(#softblur)`
- Overlays: `url(#vignette)`

If the new geometry genuinely needs a def that doesn't exist, add it to `assets/defs.svg` first (see `assets/README.md`).

### 4. Define slot placeholders

Mark every text element the engine should fill with `{{SLOT_NAME}}`. Use the same conventions as existing templates:

- `{{TITLE}}` — always
- `{{SUBTITLE}}` — always
- Geometry-specific: `{{VERTEX_1}}`, `{{LEFT_TERM}}`, `{{NODE_1}}`, etc.

Document the slots in a comment at the top of the SVG.

### 5. Save and register

Save as `templates/<geometry_name>.svg`.

Update three places:

1. `SKILL.md` — add the geometry to the list in Stage 1, with a one-line description
2. `templates/header_prompt_template.md` — add a "Mapping by geometry type" line for the new geometry
3. This file (`docs/adding_geometries.md`) — move it from the "examples of geometries worth adding" list to the "current geometries" list

### 6. Test

Run the engine against an article that fits the new geometry. Check:

- Does the pattern read in 5 seconds?
- Does it sit cleanly next to the Minimum System 7-pack?
- Does the rasterizer produce a clean PNG?

If any check fails, iterate on the template, not on the article.

## What not to do

- **Don't add geometries speculatively.** Wait for an article that needs one. The library should be evidence-based, not predictive.
- **Don't add more than one geometry per session.** Each new geometry is a register commitment; review it the next morning before adding another.
- **Don't refactor existing geometries to "share more."** They're already sharing via the asset library. Templates being readable as standalone files is more valuable than maximum DRY.
