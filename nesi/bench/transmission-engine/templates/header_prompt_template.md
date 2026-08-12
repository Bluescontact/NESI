# Header Image Prompt — Imagen 4 / Gemini Calibration

## How to use

Imagen 4 responds best to dense, descriptive prose prompts under ~80 words that name **subject, atmosphere, composition, lighting, color palette, style references, and aspect ratio**. Avoid lists of tags. Avoid asking for text in the image — Imagen renders text poorly; any title overlay should be added in post.

For Kevin's register, every prompt must include the locked aesthetic block (see below) and vary only the **subject + mood** slot.

---

## Prompt structure

```
{{SUBJECT_AND_MOOD}}. {{LOCKED_AESTHETIC_BLOCK}}. {{COMPOSITION_NOTE}}. Aspect ratio 16:9.
```

### Locked aesthetic block (do not vary)

> Deep black field with subtle warm shadow, atmospheric and contemplative, single luminous gold geometric form as focal point, soft radial glow at vertices, painterly negative space, minimalist composition with generous emptiness around the form, no text or lettering, no people, no faces, refined and austere, in the spirit of Hilma af Klint's geometric work and Agnes Martin's quiet lines, photographed in a darkened gallery, museum-quality lighting

### Subject and mood slot — fill from Stage 1 read

Describe the article's *geometric substrate* in image-able terms, plus the mood adjectives from Stage 1.

**Mapping by geometry type:**

- **threshold** → "a single luminous horizontal line dividing darkness, a faint gold boundary across deep black space, the suggestion of crossing from one side to the other"
- **distinction** → "two distinct luminous points held apart in dark space, twin gold nodes facing each other across a contemplative void"
- **circuit / loop** → "a closed luminous ring of soft gold light suspended in darkness, the suggestion of a circuit completing"
- **source-and-emanation** → "a single bright source emanating soft gold light outward into surrounding darkness, faint radiating lines"
- **tetrahedron / minimum system** → "a four-vertex luminous tetrahedron suspended in dark space, glowing edges in warm gold"
- **vertex-mapped** → "a geometric figure with N luminous vertices in warm gold, suspended in deep black space"
- **layered substrate** → "horizontal strata of luminous gold lines at varying depths, the suggestion of layers beneath a surface"
- **filter** → "a luminous boundary or membrane with light passing through, the suggestion of refinement"

### Composition note slot

Choose one based on the article's tone:

- *quiet:* "centered composition, equal negative space, formal balance"
- *load-bearing:* "off-center figure with strong negative space on one side, sense of weight and resolution"
- *threshold-quiet:* "horizontal composition with figure at the midline, equal stillness above and below"
- *generative:* "asymmetric composition with the figure drifting upward or outward into space"

---

## Example — fully filled prompt (recognition-threshold piece)

> A single luminous horizontal line dividing darkness, a faint gold boundary across deep black space, the suggestion of crossing from one side to the other, austere and threshold-quiet. Deep black field with subtle warm shadow, atmospheric and contemplative, single luminous gold geometric form as focal point, soft radial glow at vertices, painterly negative space, minimalist composition with generous emptiness around the form, no text or lettering, no people, no faces, refined and austere, in the spirit of Hilma af Klint's geometric work and Agnes Martin's quiet lines, photographed in a darkened gallery, museum-quality lighting. Horizontal composition with figure at the midline, equal stillness above and below. Aspect ratio 16:9.

---

## Where to paste

- **Gemini app** (gemini.google.com) — paste prompt, select Imagen 4 model if offered, request 16:9.
- **Google AI Studio** — Imagen 4 endpoint directly.
- **ImageFX** (labs.google) — paste prompt, set aspect to 16:9.

Run 4 generations per prompt. Pick the one that holds the register most cleanly. If none do, the prompt's subject-and-mood block is the lever — adjust there, never weaken the locked aesthetic block.
