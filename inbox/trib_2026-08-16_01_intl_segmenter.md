# TRIBUTARY · Intl.Segmenter — sentence boundaries the writer would recognise

Brought to the gate 2026-08-16. Running elsewhere, unjoined.
This card orders nothing. Mark it, or leave it — blank is a complete state.

**What it is** — the runtime already knows where a sentence ends. The build asks
a regex instead, and the regex cuts inside abbreviations and ellipses. This is
the water already in the pipe, unused.

**That it runs** — verified in this session, not claimed. Node v22.22.3 on this
machine; ICU segmentation, same engine the browser uses. No install, no package,
no version to track. License: it is part of the language.

```
input:  Dr. Smith went home. He e.g. slept. Is it 3.5 miles? Yes... it is.

REGEX  (7)  |Dr.| |Smith went home.| |He e.g.| |slept.|
            |Is it 3.5 miles?| |Yes...| |it is.|

SEGMENTER (5) |Dr.| |Smith went home.| |He e.g. slept.|
              |Is it 3.5 miles?| |Yes... it is.|
```

**Honest limit, stated rather than buried:** the segmenter still splits `Dr.`
It fixes two of three defect classes — the abbreviation-mid-sentence (`e.g.`)
and the ellipsis (`Yes... it is.`) — and does not fix the leading title. It is
better, not correct. A hand that writes `Dr.` will still see the cut.

**The lens**
- LIGHT/HEAVY — heavy layer held by: **nobody**. It is in the runtime. Survives loss of network: **yes**
- RETENTION   — vendorable: **n/a, nothing to vendor**. If abandoned tomorrow: it cannot be; it is the language
- TISSUE      — **standard/API**, not a framework. Adapter size: one expression
- SEED        — runs today on node v22.22.3 and every current browser: evidence above, run in this session

**The mouth** — `nesi/game2d/ascent.html :: line 696` — `split(/(?<=[.!?])\s+/)`
is the only sentence-boundary call in the build. `daily.html:310` and
`ascent.html:500 / 1468 / 1769` are `split(/\s+/)` — word splits, a different
job, and out of scope for this card.

**Shortest slice**
```
way in      → open daily.html and write a sentence containing "e.g." or an ellipsis
act         → keep writing until the sentence completes and banks
consequence → the stone holds the whole sentence, and the watermark retreats to
              a real boundary instead of mid-phrase
```

**What it displaces** — WANTED item W2, traced to a recorded defect: the
watermark clamped mid-sentence and banked `"hree sentence here."`
(`BUILD_RECORD.md`, the two faults found and fixed during the daily-surface
build). The clamp was repaired; the boundary rule that caused it was not.
If marked, no sentence-boundary code needs writing.

**The cost of carrying it** — near zero. No dependency, no build step, no first
package. What Kevin now has to understand: that `Dr.` still cuts, and that
segmentation is locale-sensitive, so the locale is now a thing the build states
rather than assumes.

**Reading** — capacity M · routing effort L · confidence H

────────────────────────────────────────

Your mark:
