# Explanatory Rendering — the second altitude

The engine today renders every output at one altitude: **maximum compression.** The
recognition pattern, the header, the quote cards — all run the same move, *compress to
a single named shape grasped in five seconds.* The register is built for it: dark field,
minimal text, one concept, no labels. It is deliberately anti-explanatory. It serves a
reader who is ready to recognize, or whom you want to pull toward recognizing.

It does **not** serve a reader who doesn't get it yet. That reader needs the opposite
move: **decompression to comprehension** — labels, sequence, parts named, one concrete
instance, the common misread corrected. That is an infographic, and its learning-style
variants are just different *ways of decompressing the same structure.*

This document specs that second altitude. It is **not** a new layer above the v2 stack
(Layers 6–8 are generation / composition / ledger — orthogonal). It is a second output
*altitude* that reuses the existing stack plus one sibling register.

But "altitude" is only one of the engine's degrees of freedom, and not even the governing
one. The full structure is a tetrahedron — see *The transmission tetrahedron* below. The
short version: the engine today varies output along the **geometry** axis (*what shape*).
The cold-reader gap exposes three more axes it never varied — **altitude** (*how
compressed*), **stance** (*where the reader stands*), and **modality** (*what channel it
lands through*). Stage 1's read is independent of all three: it finds the structure once;
rendering then picks altitude, stance, and modality — and **stance is the input that
governs the rest.**

---

## The altitude ladder

The same Stage 1 read renders at three altitudes. The middle rung already exists — it's
the bridge that shows the move is sound.

| Altitude | Asset | Job | Reader | Status |
|---|---|---|---|---|
| **0 — Glyph** | `pattern.svg` | Recognition in 5s | already gets it / wants to | **shipped (v1)** |
| **1 — Annotated glyph** | `whole_pattern_annotated.svg` | Recognition + named parts | half-knows it | **shipped (`templates/annotated_diagram.md`)** |
| **2 — Infographic** | `teach.<style>.svg` | Comprehension from zero | **cold reader** | **this spec** |

Altitude 1 (annotated diagram) is glyph-plus-labels — it presupposes the figure and
points at its parts. Altitude 2 does *not* presuppose the figure. It builds the concept
for someone seeing it for the first time. That's the new work.

---

## What Stage 1 must additionally produce

The recognition altitude needs: distinction, geometry, pull-quotes, naming phrase, mood.
The teaching altitude needs four more reads. These are cheap to extract during the same
end-to-end read and write to a new `teaching-notes.md`:

1. **Decomposition** — the named parts / steps / terms a cold reader must hold. The glyph
   *hides* these (that's its compression); the infographic must *name* them. 3–7 items.
2. **Reading order** — the sequence in which a cold reader builds the concept. Not always
   the article's order. This drives sequential and reveal styles.
3. **One concrete instance** — a cold reader learns an abstract pattern through one
   example. This is the **publish-instance-not-model discipline rendered visually**: the
   teaching visual carries one instance *beside* the pattern, never as a model to copy.
   (Often Kevin's own life, written as his instance — same rule as the prose.)
4. **The misread** — what a cold reader wrongly assumes, that the visual must correct. The
   negative example. RI already runs a negative-example discipline; this is its visual
   form. One per article, rendered as a struck-through "not this" beside the "this."
5. **Stances served** — which reader positions this article needs an asset for (cold /
   practitioner / recognizer — see the tetrahedron's Stance axis). This is the *governing*
   read: it selects altitude and biases modality for every other output. Most articles
   need 1–2 stances, not all three.

If an article yields no clean instance or no sharp misread, note it — those styles get
skipped for that article rather than faked.

---

## The transmission tetrahedron — the four axes

Transmission — getting a structure from Kevin's head into someone else's — has exactly
four irreducible degrees of freedom. The test is collapse: drop any one and there is no
transmission. They form a minimum system.

| Vertex | Axis | *What it varies* | Drop it and… |
|---|---|---|---|
| **Geometry** | what structure | threshold · circuit · tetra · distinction · … | nothing to transmit |
| **Altitude** | how compressed | glyph → annotated → infographic | can't meet a reader not at your grasp |
| **Stance** | where the reader stands | cold · practitioner · recognizer | transmitting into the void |
| **Modality** | what channel it lands through | see · follow · use · feel | structure never leaves your head |

These are **independent** (geometry doesn't fix stance; altitude doesn't fix modality) and
**complete** (no fifth: register is a function of stance+modality; timing is a modality;
the gift-frame is the ground the engine sits on, not an axis of the act). The engine today
varies only **Geometry**. The cold-reader gap is the **Stance** vertex never being located —
the engine makes glyphs and hopes someone is standing at the threshold.

### The 6 edges — where the design intelligence lives

The four are not free knobs; they are held by six couplings. This is the real logic of the
selection rule.

1. **Geometry × Altitude** — not every shape decompresses every way *(the fit-matrix, below)*
2. **Geometry × Modality** — a circuit wants to be *used*; a threshold wants *sequence*; a tetrahedron wants *space*
3. **Geometry × Stance** — a cold reader can't receive a tetrahedron cold; needs a threshold/distinction first
4. **Altitude × Stance** — **the load-bearing edge: stance *governs* altitude** *(see selection rule)*
5. **Altitude × Modality** — compressed → still glyph; decompressed → sequence or interactive tool
6. **Stance × Modality** — cold → guided sequence; practitioner → a tool/worksheet they *use*; recognizer → a glyph they can *send onward*

### The 4 faces — the failure-mode diagnostic

Each face is the triangle that *omits one vertex* — one way transmission fails. Use as a QA
checklist on any output:

- **Omit Stance** → beautiful artifact transmitting to no one *(the engine's current face)*
- **Omit Altitude** → right reader, wrong grasp — one compression for everyone
- **Omit Modality** → understood in principle, never lands — stays abstract
- **Omit Geometry** → well-delivered emptiness — style with nothing inside

---

## Stance governs the render — the selection rule

The first version of this spec drove style selection off **geometry**. That is the wrong
primary input. **Stance is the input; everything else is downstream.** The cold-reader
decision is a *stance* selection that then determines low altitude and biases modality
toward sequence/example.

```
fn select_render(stance, geometry, has_instance, has_misread):
    altitude = ALTITUDE_FOR[stance]          # cold→infographic · practitioner→worksheet · recognizer→glyph
    modality = MODALITY_BIAS[stance]          # cold→follow · practitioner→use · recognizer→see
    styles   = [s for s in STYLES if geometry in s.fits and s.altitude == altitude]
    if has_instance: styles += [example_pair]            # fits any geometry; carries the instance
    if has_misread and comparative not in styles: styles += [comparative]
    return { altitude, modality, styles: dedup(styles)[:2] }   # cap 2 — more is a deck, not a transmission
```

Run `select_render` once per stance the article serves (Stage 1 read #5).

### Modality is a real axis — this opens "tools, not pages"

`see / follow / use / feel` is not cosmetic. The **use** channel means some structures
should not be *read* at all — they should be rendered as a small interactive the reader
operates (a circuit you complete, a filter you pass an input through). That is the same
move as the OSG tool-building thread: *the tool IS the demonstration.* Modality formalizes
when transmission should leave the page entirely. Build visual modalities first
(see/follow); treat **use** (interactive) and **feel** (embodied/worksheet) as their own
later stages — but the axis is named now so the engine knows what it isn't yet doing.

### The learning-style transforms (the Altitude × Modality surface)

A style is **not** a template. It's a *transform* that takes
`{geometry + decomposition + reading-order + instance + misread}` and decompresses it one
way, at the altitude stance selected.

| Style | Decompresses by… | Reads best with geometry | Modality | Drives off |
|---|---|---|---|---|
| **Sequential** | numbered path, 1→2→3 | threshold, circuit, filter | follow | reading-order |
| **Systems map** | labeled parts + flows on one figure | tetrahedron, vertex-mapped, source-emanation | see | decomposition |
| **Comparative** | two columns, A vs B / before–after | distinction, threshold | see | the misread |
| **Example-pair** | abstract pattern beside one concrete instance | any | see | the instance |
| **Cross-section** | surface → depth, seen vs under | layered, source-emanation | see | decomposition |

**Not every cell is worth building.** The fit-matrix gates it — a `distinction` as a
`systems map` is forced; a `tetrahedron` as `comparative` flattens it. `select_render`
already filters to fitting styles and caps at two.

---

## The teaching register — a sibling, never a replacement

The recognition register (dark-gold, monochrome, minimal text) is genuinely *wrong* for
teaching. Comprehension needs more text, a label system, and **category color** — the
recognition register is deliberately one-color; teaching needs a second/third hue to code
parts. This wants its **own register file**, kept strictly separate so the recognition
register stays pure.

- **New asset file:** `assets/teaching_defs.svg` — sibling to `assets/defs.svg`. Holds the
  teaching palette, label-box styles, callout system, a lighter optional field for
  slides/print, larger legend type. **Never edit `defs.svg` for teaching needs.**
- **New register doc:** `templates/teaching_register.md` — the teaching counterpart to
  `visual_register.md`. Spells out: permitted text density, the 2–3 category colors and
  what they may encode, label typography, light-field variant rules.
- **Rhyme worth honoring:** this is the same lesson as the OSG `v5-visual` thread — the
  framework register is not the only register, and life-forward / teaching work earns its
  own. Design the teaching register and the OSG warm register in conversation with each
  other; they may share DNA. (Cross-link, don't merge.)

> Open calibration zero for Kevin: the teaching register's **base palette**. Warm-light
> (slide/print, approachable) vs. dark-with-color-coding (continuous with recognition
> register, screen-native)? This is a felt-read, not a spec decision. Mark it before pixels.

---

## Where it slots in the stack

No new numbered layer. The change touches three existing layers:

```
Layer 5  Orchestration   →  extend Stage 1 (5 new reads incl. stance); add Stage 2b (explanatory render)
Layer 4  Templates       →  add templates/teach_<style>.svg  (one per built style)
Layer 3  Asset library   →  add assets/teaching_defs.svg + templates/teaching_register.md
```

### Stage 2b — Explanatory rendering (new)

Runs after Stage 2 (symbolic distillation), consumes the same Stage 1 read. **Stance-first:**

1. For each **stance** the article serves (read #5), call `select_render(stance, …)` → it
   returns `{ altitude, modality, styles }`. Stance is the input; altitude and modality fall
   out of it, not out of geometry.
2. For each selected style: load `templates/teach_<style>.svg`, inline from
   `teaching_defs.svg`, substitute decomposition / order / instance / misread slots.
3. Rasterize via existing `bin/rasterize.ps1` (canvas wider than glyph — legends need room;
   follow the annotated-diagram precedent of 1800×1100).
4. **Inline all repeated geometry — never `<use>`.** Same ImageMagick constraint as Stage 2.
5. **Face-check before finalizing:** does the output drop a vertex? (no located stance / one
   compression for all / no real channel / no structure inside) — the 4-faces diagnostic.

### Output additions

```
<article-slug>/
  teaching-notes.md        # the 4 new reads (Kevin's review surface)
  teach.<style>.svg/.png   # 1–2 explanatory visuals
```

---

## The comprehension test — the new gate

The glyph's gate is *"does this tell the shape in five seconds?"* That gate is **wrong** for
teaching — it rewards compression, which is the disease here. The teaching altitude needs
its own falsifier:

> **Could someone who has never read the article reconstruct the core distinction from this
> visual alone?**

If no, the visual failed — regenerate or drop it. And the honest version of this test is
*run it on an actual cold reader*, not imagined. One real person who hasn't read the piece,
asked to say back what it means. That's the only real measurement, and it's worth building
the first one against a live reader rather than self-grading.

---

## Build sequence

1. **One stance, one style, one article, one cold reader.** Fix the stance first — **cold** —
   which selects altitude (infographic) and modality (follow). Pick a shipped article with a
   clean geometry and a real instance (recognition-threshold has both). Build **example-pair**
   first — it carries the instance discipline and fits any geometry. Hand-build the SVG,
   no template yet. Test it on one person who hasn't read the piece. Does the comprehension
   test pass?
2. **Lock the teaching register** from what that first visual needed — *after* seeing it
   work, not before. Write `teaching_defs.svg` + `teaching_register.md`. Get Kevin's palette
   mark here.
3. **Templatize** example-pair into `templates/teach_example_pair.svg` with slots.
4. **Add the second style** the fit-matrix recommends most across the existing corpus
   (likely sequential or systems-map). Templatize.
5. **Wire Stage 1 extension + Stage 2b + `pick_styles()`** into `SKILL.md`. Now it's
   automatic per article.
6. **Stop at two styles** until a real article demands a third. Resist building the full
   five-by-eight matrix on spec.

---

## What NOT to build

- **The teaching register bleeding into the recognition register.** Separate files,
  separate docs, enforced. The glyph stays pure.
- **"Infographics" that are just glyphs with more words.** That's the annotated diagram —
  it already exists at Altitude 1. Altitude 2 builds the concept for someone who *doesn't*
  have the figure yet. If a draft presupposes the glyph, it's not a teaching visual.
- **Every geometry × style cell.** The fit-matrix exists to *not* build the forced ones.
- **A learning-style taxonomy for its own sake.** Five styles is already generous. Cold
  readers don't need ten formats; they need one that passes the comprehension test.
- **Auto-generation before the register is locked** — same lesson as Layer 6: premature
  automation locks in a register that isn't dialed.
- **All four modalities at once.** Build `see`/`follow` (still + sequential visuals) first.
  `use` (interactive) and `feel` (embodied) are real vertices but their own later stages —
  naming the axis ≠ building it now.
- **Selecting render off geometry.** Stance is the input. If you find code picking altitude
  or style from geometry alone, it has the tetrahedron's load-bearing edge backwards.

---

## Why this is the right gap to close

The engine's job is *transmission* — getting a structure from Kevin's head into someone
else's. The recognition glyph transmits to readers already near the threshold. The cold
reader — the person furthest from recognition, who needs the work most — has had no asset
built for them. That gap is not a missing feature; it is a **missing vertex**. The engine
has been rendering on the *omit-Stance* face — varying geometry, holding altitude/stance/
modality fixed — making artifacts that transmit to whoever already happens to be at the
threshold.

Completing the tetrahedron means the engine locates the reader (Stance), meets their grasp
(Altitude), and picks their channel (Modality) — from the structure it already reads
(Geometry). Four axes, one read, each output pure in its own register. The cold-reader
infographic is just the first face that lights up when the missing vertex is added.
