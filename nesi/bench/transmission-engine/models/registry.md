# Model Registry — Layer 6 (generation)

The dispatcher (`bin/generate_image.ps1`) calls Replicate. One token covers the whole
family below. Auth: `REPLICATE_API_TOKEN` in the environment (never in a file, never in git).

## Spend governance (Kevin's brake, 2026-06-08)

Two-part, non-negotiable:

1. **Manual authorization per paid call.** Claude does NOT run any generation without
   Kevin's explicit go-ahead for that specific run, and must state the estimated cost first.
   No batch-firing on assumed permission.
2. **Hard $20 cap, wired in.** `generate_image.ps1` reads `.spend_ledger.csv`, sums prior
   spend, and **aborts (exit 3) before calling Replicate** if this run would cross `-Cap`
   (default $20.00). Every successful run appends its cost; the running total prints after.
   This is the backstop *under* the manual-auth rule, not a replacement for it.

Per-call costs are in the table below. Check `.spend_ledger.csv` for the running total
before proposing any run.

## Models

| Key | Replicate id | Best for | Output | ~Cost | Aspect |
|---|---|---|---|---|---|
| **flux-pro** *(default)* | `black-forest-labs/flux-1.1-pro` | Painterly, surreal, atmospheric L0 grounds | 1 PNG (url) | ~$0.04 | aspect_ratio |
| **flux-dev** | `black-forest-labs/flux-dev` | Cheap iteration while dialing a prompt | PNG[] (urls) | ~$0.003 | aspect_ratio |
| **recraft** | `recraft-ai/recraft-v3-svg` | Editable **vector** illustration (composites cleanly with the geometry layer) | SVG (url) | ~$0.04 | size |
| **imagen** | `google/imagen-4` | Gallery-quality, register-aligned headers | PNG (url) | ~$0.04 | aspect_ratio |
| **ideogram** | `ideogram-ai/ideogram-v3-turbo` | When legible text must sit *inside* the image | PNG (url) | ~$0.01 | aspect_ratio |

Default to **flux-pro** for teaching L0 grounds. Use **flux-dev** to iterate cheaply, then
promote the winning prompt to flux-pro. Use **recraft** when the ground must stay editable
vector (rare — usually the ground is raster atmosphere and the geometry rides on top in SVG).

## The two registers — never cross them

- **Recognition ground** (glyph headers): dark field, luminous gold geometry, austere.
  Anchored to `templates/header_prompt_template.md`.
- **Teaching ground** (cold-reader L0): **warm, light, painterly, luminous.** This is the
  register Kevin marked. Atmosphere a structural read can sit legibly *on top of* —
  *beauty in the ground, clarity in the figure.* Prompt preset below.

## The surreal dial (set per piece — Kevin's call, 2026-06-08)

The illustration register is not global. Each render picks a point on the dial; it maps to
prompt language, not a flag:

| Dial | Prompt language | When |
|---|---|---|
| **luminous-restrained** | "soft volumetric afternoon light, painterly, dreamlike but legible, atmospheric, no hard symbolism" | concepts that need the reader oriented (most teaching grounds) |
| **mid** | "quietly surreal, one impossible element, symbolic light, Tarkovsky-still" | concepts with a single uncanny hinge |
| **full-surreal** | "Dalí-grade surrealism, melting boundaries, impossible space, symbolic and uncanny, oil-painterly" | concepts whose felt truth *is* the distortion |

The structural/teaching layers (geometry + labels) always ride on top in crisp SVG, so even
full-surreal grounds stay readable. The dial governs the **ground only.**

## Teaching-ground prompt preset

```
<subject — the felt scene, concrete>, <surreal-dial language>,
warm light register: cream and amber and soft gold, low warm interior light,
luminous translucent forms, fine canvas grain, painterly depth, gentle vignette,
negative space left and center for overlaid geometry, no text, no lettering,
16:9, editorial illustration, crafted, unhurried.
```

Fill `<subject>` from the article's instance + decomposition (Stage-1 reads). Leave deliberate
negative space where the engine will composite the membrane/geometry layer (Layer 7).
