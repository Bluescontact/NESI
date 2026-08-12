---
name: transmission-engine
description: Take a finished article (markdown) and produce a folder of transmission-ready artifacts — a blazon string (the generative specification), a symbolic recognition pattern (SVG + PNG), a header-image prompt calibrated for Imagen 4 / Gemini, and 3-5 standalone pull-quote share-cards. Use whenever Kevin says "run this through the engine," "make a recognition pattern for this," "build artifacts for this post," or asks for a Substack-ready package from a markdown draft. Built for Kevin Mears's Recognition Infrastructure work; dual-register: authoring register (dark field, luminous gold) for DSS instruments; transmission register (warm off-white field, dark earth geometry) for all public-facing artifacts.
---

# Transmission Engine

Pipeline that converts a finished article into a transmission-ready artifact set. The article goes in; a folder comes out. The blazon string is the generative specification — it travels with the artifact set and is the source of truth for all downstream artifacts. A cold operator with only the blazon string and artifacts (no article, no author) should be able to recover the exact pattern and recognize a new instance in a different situation.

**Anchoring principle:** the recognition pattern is not decoration. It IS the structure of the piece, rendered so a reader can grasp the shape in five seconds and want to send it to someone. If the pattern fails the cold verification test, regenerate it.

## Architecture — the infrastructure stack

```
Layer 8  Publication ledger          (track what's shipped, where, what propagated)   [planned]
Layer 7  Composition                 (typography over generated images)                [planned]
Layer 6  Generation models           (Replicate / Gemini / Recraft via MCP)            [planned]
─────────────────────────────────────────  v2 frontier
Layer 5  Orchestration               this SKILL.md
Layer 4  Templates                   templates/*.svg + header_prompt_template.md
Layer 3  Asset library               assets/defs.svg (gradients, filters, glows)
Layer 2  Fonts                       fonts/README.md + bin/verify_fonts.ps1
Layer 1  Rasterization               bin/rasterize.ps1 (ImageMagick / Inkscape / fallback)
Layer 0  Filesystem convention       <article-dir>/<article-slug>/
```

Each layer depends on the ones below. Never skip layers or duplicate their responsibilities — change the visual register in `assets/defs.svg`, not in individual templates; change rasterization behavior in `bin/rasterize.ps1`, not inline.

**Visual register:** see `templates/visual_register.md`. The register is dual: authoring (dark field) for DSS instruments, transmission (light field) for all public artifacts. Never use authoring register for Substack, share cards, or print.

---

## Inputs

- Path to a finished article markdown file (e.g. `recognition-threshold.md`).
- Optional: a one-line steer if Kevin wants to emphasize a particular angle.

## Outputs

A new folder at `<article-dir>/<article-slug>/` containing:

```
<article-slug>/
  blazon.md                # Generative specification (travels with the artifact set)
  pattern.svg              # The recognition pattern — vector, transmission register
  pattern.png              # Rasterized 1600x900 (via bin/rasterize.ps1)
  pattern.square.png       # 1080x1080 social variant (optional)
  pattern.card.png         # 1200x675 X/Twitter card (optional)
  header.svg               # Atmospheric header image, transmission register
  header.png               # Rasterized header
  header-prompt.md         # Imagen 4 prompt (for painterly alternative)
  preview.html             # Browser preview of both visuals stacked
  pull-quotes.md           # 3-5 standalone share-cards (markdown)
  read-notes.md            # Engine's structural read (for Kevin's review)
  README.md                # Publication sequence + file index
```

---

## Preflight

Before generating anything, run `bin/verify_fonts.ps1 -Quiet`. If fonts are missing, surface a warning in the final report — generation proceeds, but rasterized output will fall back to system defaults and the register will drift.

---

## Pipeline — seven stages

### Stage 0 — Ground declaration

Before touching the article's content: declare the field.

Not "what is this article about?" — but "what is the somatic register this article was written from, and what is the ground without which none of its charges can be read?"

Declare two grounds:

- **Source ground G1** — register operative when the article was written. Named from the texture and register of the writing itself (e.g. *constraint-adjacent, scarcity-adjacent survival ground, gift-saturated, threshold-quiet*).
- **Transmission ground G2** — register operative now, at extraction.

The gap between G1 and G2 is the legibility condition. If the gap is small (article just written, ground hasn't shifted) — flag it. The tincture rule applies: the engine may not be ready to blaze yet. Name this condition explicitly; do not suppress it.

**Gap signals:**
- **Large gap** → contrast condition strong; transmission has force. Proceed.
- **Small gap** → flag. The blazon may still be author-anchored. Consider holding. Engine proceeds only with Kevin's mark.

### Stage 1 — Blazon generation

Produce the blazon string before any artifact work. This string is the source of truth for all downstream artifacts and travels with the artifact set as the generative specification.

Read the article end-to-end and produce both the blazon string and the internal read-notes.

**Blazon format:**

```
Field: [ground declared — what the pattern stands on]
Charge: [pattern named — what stands on that ground]
Register: [PASS — source register ≠ transmission register, gap is legible] OR [HOLD — gap too small, name it]
Falsifier: [what this pattern is NOT — the negative space that allows cold verification]
```

**If the blazon string cannot be written** — field unclear, or charge cannot be distinguished from field — the engine stops here and returns the gap as forward instruction. A named gap is more useful than a low-contrast artifact.

**Example (from "Setting the Floor"):**

```
Field: scarcity-adjacent survival ground
Charge: governance floor as liberation from accumulation imperative
Register: PASS — source (constraint) ≠ transmission (stability); gap is legibility
Falsifier: not financial planning, not minimalism, not anti-ambition —
          the structural condition that makes giving without counting possible
```

Also produce internal `read-notes.md` with:

1. **Load-bearing distinction(s)** — the conceptual hinge(s). What two things does the piece insist are not the same?
2. **Underlying geometry** — what shape is the argument? Pick the closest match from the geometry library:
   - **threshold** — two sides of a boundary, crossing in one direction or both
   - **distinction** — two terms held apart (often A vs. B)
   - **circuit / loop** — gift form, completing return, closure
   - **source-and-emanation** — capacity vs. deposit, root vs. expression
   - **tetrahedron / minimum system** — four irreducible functions
   - **vertex-mapped** — N positions on a named figure
   - **layered substrate** — depths beneath a surface
   - **filter / sieve** — input passing through criteria
3. **Three to five pull-quote candidates** — lines that work standalone, in Kevin's register, no context needed. At least one must carry the falsifier.
4. **The naming phrase** — the single phrase that names the pattern. Usually but not always the article's title.
5. **Mood / tonal substrate** — three to five adjectives describing the atmosphere. Feeds Stage 5.

Write `blazon.md` and `read-notes.md` to the output folder before proceeding.

### Stage 2 — Tincture check

Three checks before any rendering:

**1. Register contrast** — charge register ≠ field register. Same-register combinations are unutterable. If the pattern and its ground are indistinguishable in tonal register, stop and name the tincture violation explicitly. Do not produce a low-contrast artifact.

**2. Medium declaration** — declare which register all downstream artifacts will use:

| Medium | Register |
|---|---|
| Substack (web, mobile) | Transmission |
| Social share card | Transmission |
| Pull-quote card | Transmission |
| Header image (Imagen 4) | Transmission |
| Print / PDF | Transmission |
| DSS instruments / internal reference | Authoring |

For all articles going to publication, declare **Transmission**. This governs tincture for all downstream artifacts (see `templates/visual_register.md` for register specifications).

**3. Falsifier present** — the negative space is named in the blazon string. If absent: the artifact cannot be self-verified by a stranger. Return to Stage 1 and complete the falsifier before proceeding.

If any check fails, report the failure mode precisely and stop. Do not proceed to artifact generation until all three pass.

### Stage 3 — Recognition pattern SVG

Select the SVG template from `templates/` that matches the geometry identified in Stage 1. **Template selection rule:** use `<geometry>_tx.svg` when medium declaration is Transmission; use `<geometry>.svg` when medium declaration is Authoring.

| Medium | Template suffix |
|---|---|
| Transmission (Substack, share cards, print) | `_tx.svg` — light field, dark earth geometry |
| Authoring (DSS instruments, internal) | `.svg` — dark field, luminous gold geometry |

The SVG renders the blazon — not just a symbolic form but a visual enactment of field-charge relationship.

- **Field is visually present** as the ground the charge stands on
- **Geometry is ground-first:** field tincture first, charge placed on it
- **Tincture drawn from Stage 2 medium declaration** — transmission register (warm off-white field, dark earth geometry) for all publication artifacts; see `templates/visual_register.md`
- A stranger should be able to read: here is what the pattern stands on, here is the pattern itself

Build the SVG by:
1. Starting from the template
2. Inlining the relevant `<defs>` from `assets/defs.svg` (gradients, filters, glows the template references)
3. Substituting article-specific terms into the `{{SLOT}}` placeholders
4. Applying transmission-register tincture
5. Saving as `<article-slug>/pattern.svg`

**INLINE all repeated geometry — never use `<use>`.** The rasterizer on this machine is ImageMagick (Inkscape/rsvg are not installed), and magick's SVG renderer silently drops the `<use>` element: any shape defined once (e.g. `<g id="tetra">`) and instanced via `<use href="#tetra">` renders blank in the PNG, with no error. If a pattern repeats a figure (small-multiples, four tetrahedra, a grid), write the geometry out in full at each position — typically `<g transform="translate(...)">…literal children…</g>`, which renders correctly. `fill="url(#gradient)"` and `filter="url(#id)"` references are fine; only `<use>` cross-references fail. See `bin/rasterize.ps1` header.

After SVG is written, rasterize:

```powershell
& "$PSScriptRoot\..\bin\rasterize.ps1" -InputSvg "<article-slug>\pattern.svg" -SocialVariants
```

This produces `pattern.png` (1600×900) plus `pattern.square.png` (1080×1080) and `pattern.card.png` (1200×675) for cross-platform sharing. If no rasterizer is installed, rasterize.ps1 emits a clear message and the engine continues with SVG only.

Also emit a `preview.html` file that displays the SVG at full 1600×900 — gives Kevin both visual confirmation and a one-right-click PNG export path as a fallback.

**Recognition test:** before finalizing, ask — does this pattern, looked at alone for five seconds, tell a reader what shape of argument the article is making? If no, regenerate.

### Stage 4 — Pull-quote selection

From Stage 1 candidates, finalize 3-5 standalone share-cards.

**Selection criterion:** which sentences make the pattern's distinction from its ground most visible to a reader who does not share the author's context?

**Required:** at least one pull-quote must carry the falsifier — the sentence that names what the pattern is NOT. This is the negative space that allows cold verification without the author present.

Each must:

- Stand alone without context
- Be in Kevin's register (no padding, no "thread time", no emoji)
- Run 1-3 sentences max
- Render well as text-only on a light field (transmission register)

Save as `pull-quotes.md`, one per section.

### Stage 5 — Header image

Two outputs:

**a) Engine-produced atmospheric header (`header.svg` + `header.png`).** Generate an in-register atmospheric SVG using the same asset library. Use transmission register (warm off-white ground, dark earth geometry and text). Always produce this — it's the reliable fallback that's guaranteed to match the register.

**b) Imagen 4 prompt (`header-prompt.md`).** Fill the template at `templates/header_prompt_template.md` with the article's blazon field-charge specification and mood/tonal substrate from Stage 1. The prompt renders the blazon (field-charge relationship), not the article's topic. For painterly/photographic header alternatives via Gemini/Imagen. Always produce; Kevin chooses which to publish with.

Rasterize the header SVG via `bin/rasterize.ps1`.

### Stage 6 — Cold verification

Before delivering the output set: ask the generative specification question.

"Could an independent operator — with only the blazon string and these artifacts, no article, no author — recover the exact pattern and recognize a new instance of it in a different situation?"

Name where the engine can guarantee yes and where it cannot. Where it cannot, name the specific author-anchored contrast the current output still relies on — so Kevin knows exactly where his presence is still load-bearing in the transmission chain.

The cold verification note is included in the output set. It is not a quality score; it is a map of what's self-verifying and what isn't.

---

## Invocation

When Kevin invokes this skill:

1. Confirm the article path. If ambiguous, ask.
2. Run Preflight; warn if fonts missing.
3. Read the article in full.
4. Run Stage 0 (ground declaration). If gap is small, flag and wait for Kevin's mark before continuing.
5. Run Stage 1 (blazon + read-notes). If blazon string cannot be written, stop and return the gap.
6. Run Stage 2 (tincture check). If any check fails, stop and name the failure.
7. Run Stages 3-6 (artifacts).
8. Write all outputs to `<article-dir>/<article-slug>/`.
9. Report: blazon string, geometry chosen, medium declared, rasterizer used (or fallback), ls of the output folder, cold verification note. Surface anything the engine wasn't sure about so Kevin can adjust before publication.

Do not pad outputs. Do not add commentary to the artifacts themselves. The artifacts are deposits; the blazon string is the generative specification; this skill is the apparatus.

---

## Maintenance

| When you want to... | Edit this |
|---|---|
| Change any visual register element (either register) | `templates/visual_register.md` |
| Change the tincture specification for a register | `templates/visual_register.md` → Tincture Register Specification |
| Add a new geometry | `templates/<name>.svg` + add to Stage 1 list + document in `docs/adding_geometries.md` |
| Change rasterization behavior (DPI, output sizes, backend priority) | `bin/rasterize.ps1` |
| Change required fonts | `bin/verify_fonts.ps1` (`$required` array) + `fonts/README.md` |
| Change the Imagen 4 prompt structure | `templates/header_prompt_template.md` |
| Produce an **annotated** variant of a pattern | `templates/annotated_diagram.md` |
| Produce a **sequential-reveal stack** from a pattern | `templates/sequential_reveal.md` |
| Produce a **practitioner worksheet** from a pattern | `templates/worksheet.md` |
| Add a new generation model (Replicate, Gemini, Recraft) | see `docs/pipeline_v2.md` |

## Asset classes the engine produces

| Class | Job | Template |
|---|---|---|
| **Blazon** (generative spec) | The field-charge-falsifier specification; source of truth for all artifacts | Stage 1 output |
| **Pattern** (structural) | Compress an argument into a single recognition-test figure | `templates/<geometry>.svg` |
| **Header** (atmospheric) | Carry the article's mood as a Substack header | engine generates inline or via Imagen prompt |
| **Quote card** | Pull-quote as standalone share-card; at least one carries the falsifier | `templates/quote_card.svg` |
| **Annotated diagram** | Teach the figure to a cold reader | `templates/annotated_diagram.md` (guide) |
| **Sequential reveal** | Walk through the figure step by step | `templates/sequential_reveal.md` (guide) |
| **Practitioner worksheet** | Let the reader use the lens on their own substrate | `templates/worksheet.md` (guide) |

The first four are auto-generated for every article. The last three are produced on request (or when an article's purpose clearly calls for them — e.g. workshop-bound articles get worksheets).
