# Visual Register — Kevin Mears / Recognition Infrastructure

Anchored to the Minimum System 7-pack at `DSS content/frameworks/minimum-system/`. Output from this engine must be indistinguishable from work in that pack — in the correct register for the medium.

---

## Dual Register

The visual register is split at the membrane boundary. The tincture tells the reader which side they're on.

- **Authoring register** — dark field. The author works in a controlled environment. For: DSS instruments, THE_GOVERNOR, state_view, internal reference, this workspace.
- **Transmission register** — light field. The work has crossed into the public reading space. For: Substack, share cards, pull-quote cards, print, header images.

Same geometry. Same palette relationship. Different ground. The geometry, proportions, and visual DNA are identical between registers. The ground flips.

---

## Tincture Register Specification

### Authoring register

For: DSS instruments, internal reference, THE_GOVERNOR, state_view, this workspace.

```
Field:    #1a1408  (deep ground)
Charge:   #c8a84b  (luminous gold)
Text:     #f0e8d0  (warm light)
Sub-text: #9a8d76  (muted khaki)
Contrast: high in controlled screen light
Fails:    daylight, auto-brightness, print
```

### Transmission register

For: Substack articles, share cards, pull-quote cards, header images, public-facing artifacts.

```
Field:    #f7f5f0  (warm off-white — same as DSS --bg)
Charge:   #3a3020  (deep earth — same as DSS --g)
          #7a6840  (warm gold — same as DSS --gd)
Text:     #1a1408  (deep ground — same as DSS --gb)
Sub-text: #7a6840  (warm gold)
Contrast: holds across full ambient light range
Passes:   daylight, phone, auto-brightness, print
```

### Medium declaration → tincture assignment

| Medium | Register | Field | Charge |
|---|---|---|---|
| Substack (web, mobile) | Transmission | #f7f5f0 | #3a3020 / #7a6840 |
| Social share card | Transmission | #f7f5f0 | #3a3020 / #7a6840 |
| Pull-quote card | Transmission | #f7f5f0 | #3a3020 / #7a6840 |
| Header image (Imagen 4) | Transmission | light warm ground | dark earth geometry |
| Print / PDF | Transmission | #f7f5f0 | #3a3020 / #7a6840 |
| DSS instruments | Authoring | #1a1408 | #c8a84b |
| Internal reference | Authoring | #1a1408 | #c8a84b |

---

## Typography

- **Headings:** an elegant serif or refined sans-serif. Acceptable: `Cinzel`, `Cormorant Garamond`, `Crimson Text`, or system serif fallback. Tracking: +1 to +3.
- **Sub-text / labels:** light-weight sans-serif. Acceptable: `Inter Light`, `Helvetica Neue Light`, or system sans fallback.
- **Capitalization:** primary terms in ALL CAPS with letter-spacing. Sub-text in sentence case or italic.
- **Never:** display fonts, script fonts, decorative fonts, mixed colors in type.

## Composition

- **Centered figure** — geometric form sits in optical center, generous negative space on all sides.
- **One named concept** per image. Never two. If the article has two distinctions, pick the load-bearing one for the pattern; the other appears as sub-text or in pull-quotes.
- **Minimal text** — title above or below the figure, optional one-line subtitle. No paragraphs, no lists, no captions on the figure itself.
- **Luminous vertices** — where lines meet, add a small soft glow (radial gradient; gold-to-transparent in authoring register; deep-earth-to-transparent in transmission register). This is the signature move.
- **Title placement:** centered, above the figure. Subtitle in sub-text tone below, in italic, one line max.

## Aspect ratios

- **Pattern (recognition aid):** 1600 × 900 (16:9). Works as Substack social card and embedded image.
- **Header image (Imagen output):** 1600 × 900 (16:9). Same.
- **Square variant for IG / share:** optional 1080 × 1080. Engine produces only 16:9 by default.

## Anti-register (do not produce)

- Bright colors, gradients beyond the register-specific spectrum
- Sans-serif heavy weights, bold display fonts
- Multiple concepts in one frame
- Stock-photo aesthetics, realistic illustrations as primary
- Drop shadows, bevels, 3D effects, skeuomorphism
- Text-heavy layouts
- Emoji, icons from icon sets, clipart
- **Dark field for transmission-register artifacts** — this is the most common register error

## Headers — atmospheric exception

On **atmospheric header images only** (never on pattern figures), a *subtle* film grain and/or low-opacity atmospheric mist is acceptable. In transmission register: keep grain overlay opacity ≤ ~0.06 and any mist faint. A gentle vignette / field-falloff is acceptable if it uses the field color at ≤ 0.3 opacity. **Pattern figures stay clean vector** — no grain, mist, or vignette.

## Reference files

Look at these before producing output:

- `DSS content/frameworks/minimum-system/00_main_minimum_system.png` — canonical example (authoring register)
- `DSS content/frameworks/minimum-system/03_why_four.png` — geometric variant
- `DSS content/frameworks/minimum-system/04_emergent_result.png` — luminous treatment

For transmission-register output: apply the same geometry with inverted ground (light field, dark charge). Same proportions, same structure, different tincture.
