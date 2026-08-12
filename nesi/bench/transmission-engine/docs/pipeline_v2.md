# Pipeline v2 — Planned Architecture

The engine today (v1) produces hand-built SVG plus a prompt Kevin pastes into Gemini. v2 closes that loop and adds two layers above it. This document is the spec for getting there, written so a future session (Claude or Kevin) can implement it without re-thinking.

## Layers being added

```
Layer 8  Publication ledger
Layer 7  Composition
Layer 6  Generation models
```

Each is independently useful. They do not have to ship together.

---

## Layer 6 — Generation models

**Problem:** the engine writes a great Imagen 4 prompt but cannot call Imagen 4. Kevin pastes manually. Friction per article.

**Solution:** model registry + dispatcher. Engine knows which models exist, what they're good at, calls one (or several in parallel), saves results.

### Model registry — `models/registry.md`

A table of models with: name, MCP tool name, what it's good at, cost per generation, output type (raster/vector), aspect-ratio support.

| Model | MCP | Best for | Cost | Output |
|---|---|---|---|---|
| Flux Pro | Replicate | Photographic, atmospheric | ~$0.04 | Raster |
| Flux Dev | Replicate | Cheaper iteration | ~$0.003 | Raster |
| Imagen 4 | Gemini API | Gallery-quality, register-aligned | ~$0.04 | Raster |
| Imagen 3 | Replicate | Same family, cheaper, accessible via single MCP | ~$0.02 | Raster |
| Recraft V3 | Replicate or Recraft API | **Vector AI** — editable SVG output | ~$0.04 | Vector (SVG) |
| Ideogram | Replicate | Strong text-in-image | ~$0.01 | Raster |
| SDXL | Replicate | Open, controllable, fastest iteration | ~$0.002 | Raster |

### Dispatch logic — `bin/generate_header.ps1` (new)

Pseudocode:

```
fn generate_header(prompt, style_hints, models=['flux_pro']):
    for model in models:
        result = call_mcp(model.mcp_tool, prompt, aspect='16:9')
        save_to(<article-slug>/header.<model>.png)
    if multiple models: present all for selection
    else: save chosen as header.png
```

### When to add

After ~5 articles run through v1, when the prompt template is dialed in. Premature automation locks in a bad prompt and you pay per generation.

### First model to add

**Replicate.** Single connector covers Flux, Recraft, Imagen 3, Ideogram, SDXL. Highest leverage per setup minute.

---

## Layer 7 — Composition

**Problem:** generated images are atmospheric backgrounds. They have no typography. Kevin currently composes title-over-image manually in his head (or in Substack's editor, which has limited control).

**Solution:** programmatic compositing layer. Take generated raster + typography spec → produce final composed image with title in correct register, correctly positioned, correctly readable against the variable background.

### Implementation options

**a) Cloudinary MCP** — cloud-based image transformation. Upload generated image, apply text overlay via URL parameters. Pros: handles font hosting, scaling, optimization. Cons: per-transformation cost, requires Cloudinary account.

**b) Local — Sharp via Node, or PIL via Python** — script in `bin/compose.ps1` or `bin/compose.py` that wraps a real image library. Pros: free, fast, no network. Cons: more setup, requires Node or Python runtime.

**c) Hybrid — Inkscape composition** — generate an SVG that embeds the raster image as `<image>` element, then overlays SVG text, then rasterize. Pros: uses existing infrastructure (Inkscape already there for Layer 1). Cons: limited text rendering control vs. real image libraries.

### Recommendation

Start with **c)** — uses existing infrastructure, no new dependencies. Move to **b)** if and when control limits bite.

---

## Layer 8 — Publication ledger

**Problem:** the engine produces artifacts but nothing tracks where they ship, when, what propagated. The recognition-threshold article literally argued for instrumenting this.

**Solution:** a single `DSS content/publications.md` (or `.json`) file that records every published artifact with: article slug, date, channels published to (Substack URL, X posts, LinkedIn), pull-quotes used where, recognition events received.

### Lightweight v1 spec

Append-only markdown table:

```markdown
## recognition-threshold (2026-05-25)
- substack: <URL>
- x: <URL>, <URL>
- linkedin: <URL>
- pull-quotes used: #1 (X), #5 (LinkedIn)
- recognition: 2026-05-27, builder X (described as "this names what we've been doing")
```

The engine creates an empty entry when artifacts are generated. Kevin (or a future "publish" skill) fills in URLs as they go live. A "recognition" sub-section accumulates instances over time — the article's own thesis becomes the engine's own dataset.

### Why this matters

Without instrumentation, Kevin can't tell which essays travel and which sit. With it, after a year, there's a real corpus of "what reached recognition vs. what got validation only" — which becomes new substrate for the framework itself.

---

## Build sequence (recommended)

1. **Now:** Layers 1-3 (rasterization, fonts, asset library) — shipped today
2. **Next:** install Inkscape alongside ImageMagick — Layer 1 gets better fidelity
3. **After 5 articles:** add **Replicate MCP**, build `bin/generate_header.ps1`, test Flux Pro and Recraft V3 against the recognition-threshold prompt
4. **After that works:** add Layer 7 via Inkscape compositing (no new dependency)
5. **In parallel with #3-4:** start the `publications.md` ledger manually, even before automation — the data is the value
6. **Eventually:** wrap Layer 8 in a `publish` skill that reads the ledger, posts to channels, updates URLs

---

## What NOT to build

- **Canva/Adobe Express MCPs** — wrong register for the work
- **Midjourney integration** — Discord-only, no clean API
- **A custom image model fine-tuned on the Minimum System pack** — interesting, but the prompt template + Recraft V3 vector output gets 90% of the value at 1% of the effort
- **A web-based public version of the engine** — premature; build the personal tool first, expose later if value is proven
