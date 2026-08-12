# Crossing-log render pattern — complete/held/denied with condition rows

**What:** A static HTML log surface where each crossing entry carries a left-border status colour, a header row, a label/value grid, and a bordered conditions table of pass/held/locked rows — a finished visual grammar for gated passage.

**Source:** `membrane/CROSSING_LOG_v1_2026-06-28.html`
**When:** 2026-06-28

**Evidence (verbatim):**
> .crossing.complete{border-left:3px solid var(--grn)} .crossing.held{border-left:3px solid var(--yel)} .crossing.denied{border-left:3px solid var(--red)} ... .cond-row{display:grid;grid-template-columns:110px 1fr auto;...}

**Capacity:** A ready 2D rendering pattern for anything that passes a gate in the game: status carried by border+tag+behaviour, conditions as rows, no numbers; colour redundant per Law 10.

**Unrouted because:** Lives as a one-off membrane-controller log; the game has no log/ledger surface using it.

**Shortest routing:** Reuse the entry/condition-row grammar for any station's record surface — only if a record surface is lawful there.

**Reading:** capacity L · effort L · confidence M

---
This card orders nothing. It waits for Kevin's mark. Blank is a complete state.
