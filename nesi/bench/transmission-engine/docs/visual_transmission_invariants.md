# Visual Transmission Invariants — a tetrahedral knowledge document

*The engine's design-knowledge layer. Not a style guide — styles change. These are the
things that hold true for **any** visual that successfully moves meaning from one mind to
another, regardless of register, medium, or fashion. Built by research + synthesis, June
2026, to develop the skill the engine was missing: making real infographics, not wireframes.*

> **Why this exists:** the engine could generate illustration (flux) and draw flat diagrams
> (SVG), but couldn't make an *infographic* — the fusion. The diagnosis below shows the gap
> precisely: the flat diagrams sat on the **omit-Resonance face**. They were structured,
> legible, even guided — and *dead*. This document is the correction.

---

## The minimum system — four invariants

A visual that transmits must answer four questions. Drop any one and transmission fails —
that's the test of irreducibility. These are the four vertices.

| Vertex | The question it answers | Governs | Fails as |
|---|---|---|---|
| **STRUCTURE** | *What is it saying?* | the information's shape — hierarchy, grouping, relationships made spatial | noise |
| **LEGIBILITY** | *Can it be read at all?* | decodability — contrast, type, signal-to-noise, data-ink | a blur |
| **GUIDANCE** | *Where do I look, in what order?* | the eye's path — emphasis, entry point, flow, pre-attentive cues | a flat wall |
| **RESONANCE** | *Does it land and stay?* | memory + feeling — meaningful imagery, metaphor, the picture that sticks | a dead diagram |

### STRUCTURE — the shape of the meaning
The argument has a geometry; the visual makes it spatial. Grounded in **Gestalt grouping**
(proximity, similarity, closure, continuity — the eye assembles related marks into wholes)
and **Tufte's graphical excellence** (complex ideas communicated with clarity and
precision). Group with proximity; bound sections; let the layout *be* the logic. Without
structure, a visual is decoration with nothing underneath.

### LEGIBILITY — the perceptual floor
Can a human decode it? **Tufte's data-ink ratio** and **chartjunk**: every mark that isn't
carrying meaning is competing with the marks that are — strip it. Contrast, type size, and
clean figure/ground are non-negotiable. This is the floor; nothing above it matters if the
viewer can't read it.

### GUIDANCE — the path of attention
The eye needs an entry point and an order. **Visual hierarchy** built from *size, color,
position* (bigger / brighter / higher / first = more important). **Pre-attentive
attributes** (a single bright element, a lone different shape) are seen *before* conscious
attention — use them to plant the entry point. The classic technique: three levels of
emphasis, varied by scale/weight, not by adding fonts. Without guidance, even a clear,
legible visual is a wall the viewer bounces off.

### RESONANCE — the part the engine was missing
Does it stick? **Dual-coding theory** (Paivio) + the **picture superiority effect**: images
are encoded twice — visually *and* verbally — so a meaningful picture is remembered far
better than words alone, and a picture *with* integrated words beats either (Mayer's
multimedia learning). The catch from the research: pictures help most when they are
**meaningful, distinctive, relevant, and well-integrated** — not decorative. Resonance is
the illustration/metaphor layer that makes a structure *felt and memorable*. **A diagram
with no resonance is decoded and forgotten.** This is the vertex flat SVG omits.

---

## The 6 edges — where the craft lives

The four aren't free knobs; they're held by six couplings. This is the operational core.

1. **Structure × Legibility** — *strip to the shape.* Chartjunk obscures structure; the
   data-ink discipline is how structure becomes legible. Maximize meaning-per-mark.
2. **Structure × Guidance** — *hierarchy.* The structure's importance-order must drive the
   eye's path: encode rank in size/color/position. Visual hierarchy = structure made salient.
3. **Structure × Resonance** — *the right metaphor.* Choose a visual form that *matches the
   meaning* (a circuit for a loop, a ladder for compounding, a membrane for a boundary). The
   correct geometry is itself the mnemonic. Wrong metaphor = memorable but misleading.
4. **Legibility × Guidance** — *the contrast budget.* Contrast is the attention tool; spend
   it. Emphasize everything and nothing leads. One thing loudest, then the rest.
5. **Legibility × Resonance** — *the scrim.* Illustration must not destroy readability. A
   gradient wash / scrim / contrast pass under text-over-image is the bridge. *(This is
   exactly what the composition-layer demo discovered empirically — the framework predicts it.)*
6. **Guidance × Resonance** — *the hook hands off.* The resonant image is also the entry
   point: the picture pulls the eye in first (picture superiority), then passes it to the
   structure. The illustration is both the hook and the memory anchor.

---

## The 4 faces — failure-mode diagnostic

Each face omits one vertex. This is the QA checklist — and the diagnosis of past misses.

- **Omit Structure → "decoration."** Beautiful, readable, eye-catching, sticky — and says
  nothing. A pretty picture pretending to be information. (Flux-alone lands here.)
- **Omit Legibility → "the unreadable masterpiece."** Structured, emphasized, gorgeous,
  illegible. Low contrast, tiny type, busy ground.
- **Omit Guidance → "the flat wall."** Clear, legible, meaningful — no entry point, no
  order. The viewer doesn't know where to start. (Dense diagrams and over-even layouts.)
- **Omit Resonance → "the clinical diagram."** Structured, legible, guided — and *dead*.
  Decoded and forgotten; moves no one. **This is the face the engine's flat SVG sat on.
  Kevin's "you don't have that capacity yet" = the omit-Resonance face named.**

---

## How the invariants build the composition layer

The four vertices map directly onto the four composition layers — this is why the
composition layer is the right architecture, and how to wield it:

| Composition layer | Carries the invariant | Rule of thumb |
|---|---|---|
| **0 · Illustration** (generated) | **Resonance** | meaningful + relevant, never decorative; the metaphor matching the meaning |
| **1 · Scrim** (gradient/wash) | **Legibility × Resonance edge** | only as dark as legibility demands; protect the image |
| **2 · Structure** (vector) | **Structure + Guidance** | the shape + the eye's path; strip to meaning-bearing marks |
| **3 · Type** (HTML text) | **Legibility + the verbal half of dual coding** | three emphasis levels; integrate words *with* the picture, not beside it |

**Operating sequence when making one:** (1) name the *structure* (what shape is the
argument); (2) choose the *resonant metaphor/illustration* that matches it; (3) set the
*entry point* and reading order (guidance); (4) protect *legibility* (scrim + contrast +
three type levels); (5) run the face-check — did I drop a vertex? The most likely drop, for
this engine, is Resonance (going flat) or Guidance (going to a wall of even elements).

---

## Part 2 — the local infrastructure stack (watts yes, money no)

Constraint set by Kevin 2026-06-08: **no money** (so Replicate's per-image cost is out for
ongoing work) but **watts available**, provided a run **doesn't lock the laptop more than
5–10 minutes**. So the engine's generation backend should become **local**, feeding the
(already-local, free) browser composition layer.

### The reality (researched June 2026)
- **ComfyUI is the standard** local host — node-based, widest model support, best VRAM
  efficiency, dynamic memory management (can run SDXL on 6 GB).
- **Fast, low-VRAM models that fit a laptop in minutes:**
  - **Flux.1 schnell** — distilled, **4 steps** (vs 20+); fast, strong quality. GGUF Q4/Q5
    runs on tight VRAM.
  - **SDXL-Turbo** — blazing fast, lower fidelity; good for iteration.
  - **Z-Image Turbo** (Alibaba) — competitive quality in ~9 steps, GGUF down to **6 GB**.
  - **PixArt-Sigma (0.6B)** — good results under 8 GB.
  - **Flux.1 dev FP8** — near-dev quality in 12–16 GB if the laptop has it.
- **Laptop GPUs:** discrete NVIDIA ≥6 GB (RTX 3060/4060/4070 mobile) work; expect slower
  than desktop (thermals). 8 GB + good cooling ≈ near-desktop.
- **Upscaling** (the SeedVR2 step in Kevin's forum graph) gives crisp/print-ready output but
  the 7B upscaler is **heavy** — likely too slow for the 5–10 min laptop budget. Prefer a
  light upscaler (or skip; the composition layer renders crisp vector/type on top anyway,
  so the illustration base can be modest-res).

### The build (what to wire, in order)
1. **Identify the laptop's GPU + VRAM** — this picks the model tier. *(Open question for
   Kevin — what's the machine?)*
2. **Install ComfyUI + one fast model** matched to that VRAM (likely **Flux.1 schnell GGUF**
   or **Z-Image Turbo** for the 5–10 min, ≤8 GB target).
3. **Headless call path** — drive ComfyUI via its API (`/prompt` endpoint, a workflow JSON)
   from a local script, mirroring `generate_image.ps1` but pointed at `localhost`, not
   Replicate. **Zero dollars, zero cloud.** Same `-Out` contract so the composition layer is
   unchanged.
4. **Keep Replicate as the rare-finals fallback only** (under the $20 brake) when local
   quality won't do — but local is the default.
5. **Composition layer** stays exactly as built (browser-composited, PNG via screenshot).

The split that makes this work: **generation (Resonance layer) goes local on watts;
composition (Structure/Guidance/Legibility/Type) is browser-side and already free.** No
ongoing cost, laptop-bounded, fully owned. Same shape as the rest of Kevin's economy — own
what you depend on.

---

## Sources (research grounding)
- Infographic hierarchy & principles — University of Hull LibGuides; Piktochart; PRINT Magazine
- Tufte (data-ink ratio, chartjunk, graphical excellence) & Gestalt — UofT Map & Data Library; Tufte readers
- Dual-coding theory (Paivio) & picture superiority; Mayer's multimedia learning — Wikipedia; Neurosity; LXD
- Local generation 2026 (ComfyUI, Flux schnell, SDXL-Turbo, Z-Image Turbo, PixArt-Sigma, VRAM tiers) — Awesome Agents; Local AI Master; RunAIHome; BentoML
