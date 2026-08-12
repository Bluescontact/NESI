# Practitioner Worksheet — Asset Class

## What it is

A pattern variant where the labeled positions become **empty slots** the reader fills in for their own situation. Same geometric scaffold, faded visual treatment, with fillable prompts below the figure.

## When to produce

- Kit content (RI Kit, OSG, Genesis Seed)
- Workshop handouts
- Teaching contexts where the goal is *the reader picks up the lens and uses it on their own substrate*
- Any time the article describes a structure the reader could apply to themselves

This is the asset class most directly aligned with the article's own thesis: the lens travels because someone else picks it up and uses it on their own ground. The worksheet *is* the pickup mechanism.

## Canvas

**1240 × 1600** (portrait, ~letter at 150 DPI). Designed to print on letter paper or be filled in a PDF annotator.

- Top ~120px: title with " — worksheet" suffix + italic instruction line
- Middle ~800px: the figure (faded, with empty slots)
- Bottom ~640px: numbered fillable prompts with answer lines

## Construction — the figure half

Start from the source pattern. Apply these transformations:

1. **Fade the geometric scaffold:**
   - Ground lines: opacity 0.6 instead of 0.85
   - Threshold line: opacity 0.5 instead of 0.85
   - Arc/connecting paths: opacity 0.25, dashed (dasharray 4,5)

2. **Replace solid blooms with ghost outlines:**
   - Use `ghost_bloom` gradient (very low opacity gold radial)
   - Add stroked dashed outline: `stroke="#d4af6a" stroke-opacity="0.35" stroke-dasharray="3,4"`
   - Effect: the bloom's *position* and *size* are visible, but the bloom itself is empty — inviting fill

3. **Replace labels with slot prompts:**
   - Format: `[ slot name ]` in 18pt Cormorant, color `#9a8d76`, letter-spacing 3
   - Below the slot: italic descriptor (13pt) of what goes there

## Construction — the prompts half

Below the figure, at translate(0, ~940):

1. **"FILL IN YOUR OWN" header** — Cormorant 14pt, letter-spacing 6, color `#9a8d76`, centered. Divider line below.

2. **Numbered prompts**, one per slot in the figure:
   - Number in gold (`#f0c674`), bold-feeling via letter-spacing 3
   - Slot name in `#e8dcc4`, regular weight
   - Italic descriptor in `#9a8d76` after an em-dash
   - Two answer lines below: thin gray (`#3a3a3a`, stroke-width 0.6) for handwritten or typed entry
   - Vertical spacing: ~125px per prompt

3. **Closing line at bottom** — the article's signature line (e.g. *"the form is portable; the ground is yours"*) in italic.

## Slot conventions

- `{{TITLE}}` — pattern title + " — worksheet"
- `{{INSTRUCTION_LINE}}` — short italic prompt (e.g. *"map your own apparatus, form, and grounds"*)
- For each slot N: `{{SLOT_LABEL_n}}` (figure position), `{{PROMPT_NAME_n}}`, `{{PROMPT_DESC_n}}`
- `{{CLOSING_LINE}}` — the signature line

## Reference implementation

`recognition-threshold/whole_pattern_worksheet.svg` — 5 prompts mapping to the threshold pattern: your ground, your apparatus, the form, another ground, your recognition test.

## Prompt design — what makes them work

Good worksheet prompts share three properties:

1. **Specific to the reader's situation**, not the framework's terms. *"The substrate you build on (your field, role, lineage, lens)"* — not *"the substrate from which work emerges."*
2. **Answerable in 1-2 sentences**. If a prompt requires an essay, split it. If a prompt can be answered in one word, deepen it.
3. **Connected to action**. The recognition test prompt isn't *"what is recognition?"* — it's *"what would tell you the form was used, not just judged?"* — something the reader can watch for.

## Output

- **PDF (preferred for kit use)** — convert via Inkscape or browser-print-to-PDF
- **PNG (for digital sharing)** — produced via the rasterize.ps1 pipeline at 1240×1600

## What NOT to do

- Don't pre-fill any slots. The whole point is the reader does it.
- Don't add example answers. Examples shape what the reader writes; the worksheet should let their actual situation come through.
- Don't make the worksheet pretty at the cost of fillability. Plenty of white space on the answer lines. Clear, unambiguous prompts.
- Don't ship a worksheet for every article. Only when the article describes a structure the reader could apply. Diagnostic articles (this-is-what's-happening) don't usually need worksheets; instructional articles (here-is-the-move) do.
