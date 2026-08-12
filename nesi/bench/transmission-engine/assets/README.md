# Asset Library

This directory holds the canonical visual register definitions that templates inherit.

## Files

- **`defs.svg`** — gradients, filters, glow defs. The engine inlines the contents of `<defs>` into each generated SVG at build time. Single source of truth for the register.

## Available defs (by id)

### Backgrounds
- `field` — dark warm field with subtle radial center (use in atmospheric/header contexts)
- `field_flat` — flatter near-black field (use in patterns where the figure carries everything)

### Glows
- `glow` — standard vertex glow (warm gold → transparent)
- `point_bright` — bright central point (threshold midpoints, source nodes)
- `halo_wide` — wide soft halo (atmospheric headers)
- `glow_dim` — dimmer emanation glow (secondary/emanated nodes)

### Lines
- `line_threshold` — threshold line (fades in from edges, peaks at center)
- `line_boundary` — strong boundary line (atmospheric headers, brightest at midline)

### Filters
- `grain` — subtle film grain overlay
- `mist` — soft mist drift (large-scale organic atmospheric texture)
- `softblur` — Gaussian blur for bloom

### Overlays
- `vignette` — edge-darkening vignette

## Adding new defs

If a new geometry needs a def that doesn't exist:

1. Add it to `defs.svg` inside the `<defs>` element.
2. Document it in this README under the appropriate section.
3. Update `templates/visual_register.md` if it represents a register expansion (new gradient direction, new filter style).

Do NOT duplicate defs inside individual templates. The library is the single source so the register stays locked.

## Why this matters

Without a central asset library, changing the gold tone or grain intensity means editing every template separately and re-checking they all still match. With it, change `defs.svg` once and every artifact the engine produces afterward inherits the new register. This is the layer that makes the visual register *enforced* rather than aspirational.
