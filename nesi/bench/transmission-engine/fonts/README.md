# Fonts — transmission-engine

The SVG templates reference three typefaces. When these are not installed at the OS level, browsers fall back to system defaults (Garamond → some serif; Inter → some sans). The visual register drifts. Rasterized output looks subtly wrong without these installed.

## Required typefaces

| Family | Role | Where it appears |
|--------|------|------------------|
| **Cormorant Garamond** | Primary serif | Titles, subtitles, italic body text in patterns |
| **Cinzel** | Display serif (alternate) | Reserved for very-large display contexts; not currently used by default but available |
| **Inter** | Sans-serif | Labels, sub-text, vertex names |

## Install on Windows

1. Run `..\bin\verify_fonts.ps1` to see what's missing.
2. Download each missing family from Google Fonts (links in the verify output, or here):
   - [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond)
   - [Cinzel](https://fonts.google.com/specimen/Cinzel)
   - [Inter](https://fonts.google.com/specimen/Inter)
3. For each: download the .zip, extract, select all `.ttf` files, right-click → **Install for all users**.
4. Re-run `verify_fonts.ps1` — should report `All required fonts present.`

## Notes

- Weights matter less than the family being present. The templates use Regular (400) for everything; Cormorant Garamond Regular + Italic + Light cover all current uses.
- If you swap fonts in the templates, update both `templates/visual_register.md` and the `$required` list in `bin/verify_fonts.ps1`.
- Web rendering (the Substack post itself, the `preview.html` files) uses web-font fallbacks, so missing system fonts there are only a problem at export time.
