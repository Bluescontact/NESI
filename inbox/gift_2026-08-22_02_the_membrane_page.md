# GIFT · the-membrane.html — a finished sixth face, built and never committed

Brought to the gate 2026-08-22, unrouted-gifts pass against oursharedgifts.org.
This card orders nothing. Mark it, or leave it — blank is a complete state.

**What it is** — A complete, finished HTML page, "The Membrane — Our Shared Gifts," styled to match the live v6 site exactly (same nav bar, same `style.css`, same scarcity-bar) and slotted as the sixth face alongside The Light / The Door / The Machine / The Field / The Engine. Its content: "What the circuit declines" — the structural forms of exchange the gift circuit cannot run, stated as mechanism rather than judgment.

**Where it came from**
> `<title>The Membrane — Our Shared Gifts</title>` ... `<li><a href="the-membrane.html" class="active">The Membrane</a></li>` ... "The circuit closes on giving. That isn't preference — it's the mechanism the whole thing runs on."
— `oursharedgifts-deploy/the-membrane.html` (130 lines, complete page)

**Latent capacity** — Completes the five-face v6 site to six; gives the circuit an explicit refusals layer that currently exists nowhere on the live faces (The Light/Door/Machine/Field/Engine carry no page saying what the circuit won't do).

**Why it went unrouted** — Confirmed unrouted two ways: (1) `git log --all -- the-membrane.html` in the deploy clone returns nothing — the file was never committed, let alone pushed; `git status` shows it sitting untracked (`??`) in the working tree right now. (2) None of the five live nav pages (`index.html`, `the-light.html`, `the-door.html`, `the-machine.html`, `the-field.html`, `the-engine.html`) link to it — the nav-faces list stops at The Engine.

**Shortest routing** — Way in: add `<li><a href="the-membrane.html">The Membrane</a></li>` to the shared nav across the five existing pages, `git add` + commit + push. Act: a visitor clicks The Membrane. Consequence: the circuit's declines are stated in public for the first time.

**Reading** — capacity H · routing effort L · confidence H

────────────────────────────────────────

Your mark:
