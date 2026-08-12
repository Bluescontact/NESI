---
name: feedback-chassis-full-copy
description: "Widget render broke 2026-07-15 because the <style> block got dropped when filling chassis slots — the fix is copy-then-slice, never hand-reconstruct"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 82c62ff3-9175-432f-ac5c-4a80e0316c0b
---

Always copy the chassis file's full contents (doctype/style/script included) and edit only inside the marked SLOT regions — never hand-type a fragment containing just the slot HTML.

**Why:** On 2026-07-15 the widget rendered broken because only the HEADER/WHERE-YOU-ARE/CARDS content was written out — the chassis `<style>` block (the 23 CSS tokens, `.card`, `.sbtn`, `.mfp` classes, etc.) was silently dropped. Every class in the markup existed with no rule backing it. This happened in both the persistent file (`latest_<slug>.html`) and the `show_widget` fragment — reconstructing "just the important part" from memory instead of copying the source is what caused the loss.

**How to apply:**
- Persistent file (`_widgets/latest_<slug>.html`): write the *entire* chassis document — `<!DOCTYPE html>` through `</html>` — with only the SLOT regions edited. Read `_chassis_v4.html` fresh each time rather than trusting a remembered shape of it.
- `show_widget` fragment (no doctype/html/head/body allowed there): still include the full `<style>` block as a literal `<style>` tag inside the fragment, scoped under one wrapper class (e.g. `.dsswrap`) so it doesn't leak into the host page — copy the CSS rules verbatim from the chassis file, don't re-derive or trim them from memory.
- Before calling `show_widget`, sanity-check: does the fragment define every class its own markup references? If a class like `.card` or `.sbtn` appears in the HTML with no matching rule in the embedded `<style>`, that's the exact failure mode — catch it before sending.

Related: [[feedback_widget_rendering]], [[feedback_open_grammar_surface]].
