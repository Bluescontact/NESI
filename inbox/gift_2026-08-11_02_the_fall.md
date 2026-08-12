# GIFT · THE FALL - dam.gd's power/head physics

Routed to the gate 2026-08-11 by the unrouted-gifts extraction.
This card orders nothing. Mark it, or leave it — blank is a complete state.

**What it is** — The three pure laws that make a dam's position on the spire mean something: flow through the opening, head above tailwater, power = flow x head.

**Where it came from** — nesi/world3d/scripts/dam.gd (116-142) - 2026-08-05 FLOOR LIFT L6
> dam.gd:129 'POWER COMES FROM THE FALL. Zero if nothing is moving; zero if nothing is falling. Holding is not producing, and volume at no height does no work.'

**Latent capacity** — nesi.html has DAM_AT/GROUND_AT as bare constants. These laws make the dam's height a real variable: release from high carries further and settles wider. A second decision - not just when, but from what height - with zero new vocabulary.

**Why it went unrouted** — river.gd never found a throat; dam.gd never instantiated (STATE_MAP N-018: '20 KB of gate physics... Never instantiated - no throat'). The 2D deposit carried the concept, left the physics.

**Shortest routing** — Way in: make DAM_AT per-spire and draggable along the spire line. Act: drag the dam higher or lower before release. Consequence: runout distance and ground gain scale with the fall; a dam dragged to the ground releases and nothing spreads.

**Reading** — capacity H - effort L - confidence H

────────────────────────────────────────

Your mark:
