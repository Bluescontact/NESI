# Tetrahedral Agent Protocol

*A reusable method for developing any substrate with four agents arranged as a tetrahedron. The substrate-independent engine behind the dream/revision cycle. Point it at a greenhouse, an article, the library, a decision — the four vertices don't change.*

---

## The four vertices

Each is a function you've already named. Keeping them **separate agents** is the whole point — one mind doing all four collapses them into mush, because they have opposing instincts.

| Vertex | Job | Resists | Your name for it |
|---|---|---|---|
| **Grounder** | hold what's real — fact vs. assumption vs. gap | filling gaps with plausible guesses | *substrate before artifact* + the felt gate |
| **Dreamer** | reach — surface what's latent | converging, self-censoring, verifying | the *dream cycle* / expansion |
| **Governor** | cut — kill momentum-wearing-the-shape's-clothes | being agreeable, protecting a pretty idea | THE GOVERNOR (the brake) |
| **Shaper** | form — compose survivors for the recipient | adding new ideas | *gift form* / the deposit |

**Center** = the synthesis: the developed artifact + the named next gate. The center is a *separate step*, never one of the vertices wearing two hats.

The emergence is a property of the coupling, not of any corner.

---

## The vertex prompts (templates — fill the `{{slots}}`)

**Grounder**
> Read `{{substrate}}`. Your only job is to separate **what's verified** from **what's assumed** from **what's missing**. Do NOT generate solutions, possibilities, or improvements. Do NOT fill gaps with plausible guesses — name each gap as a gap. Return: facts, assumptions (flagged as assumptions), gaps.

**Dreamer** *(run several in parallel with different lenses)*
> Here is the substrate and the Grounder's read: `{{ground}}`. Expand. Give 4–6 structural crystals through the **{{lens}}** lens — the sharpest, most surprising readings of what's latent here. Reach past feasibility. Do NOT converge, rank, or verify — that's not your job. Each crystal: a title, the claim, and why it might be load-bearing.

**Governor**
> Here is the substrate, the Grounder's gaps `{{ground}}`, and the Dreamer crystals `{{crystals}}`. Cut. For each crystal: real, or momentum wearing the shape's clothes? Hold each against the gaps. Be willing to say *stop* and *this is too much*. Do NOT be agreeable; do NOT protect an elegant idea. Return a verdict per crystal (keep / cut / uncertain + reason) and the one honest hard read of the whole.

**Shaper**
> Here are the surviving crystals `{{survivors}}` and the Grounder's read `{{ground}}`. Compose them into `{{artifact}}` for **{{recipient}}**, in their register, at their depth. Do NOT add new ideas — give form to what survived. Return the revision and a note for the final edit.

---

## The six edges (prompt them as tensions, not handoffs)

You don't just pass output A to B — you tell B to hold A *against* its own job.

- **Grounder ↔ Dreamer** — dream only from what's real; keeps dreams from floating free.
- **Dreamer ↔ Governor** — expansion vs. cut; the core breath.
- **Governor ↔ Shaper** — honesty vs. form; polish must not bury the caveat.
- **Shaper ↔ Grounder** — the artifact stays honest to the substrate.
- **Grounder ↔ Governor** — the Governor uses the gaps to call halts.
- **Dreamer ↔ Shaper** — possibility vs. deliverable; what gets built from what's imagined.

---

## The five rules

1. **One job per vertex, and name what it must resist.** Separation is the whole point.
2. **The Grounder gates everything.** Garbage substrate → garbage cycle. A thin Grounder read is the tell that the cycle will drift.
3. **The center is a separate step.** Don't let the Shaper judge or the Governor shape.
4. **Run it as a loop** — ground → dream → cut → shape → re-ground → dream again — until the Governor calls *dry* (K rounds with nothing new surviving).
5. **Edges are stated tensions, not silent pipes.**

---

## Failure modes & instrumentation

*(added 2026-07-04 from the substack-pile substrate run — where held resistance actually fails, and what can sense it)*

**Resistance requires latent capacity.** A refusal only carries tension if the vertex could do the forbidden thing. A narrow agent that literally cannot rank is not a resisting Dreamer — it is a pipeline stage, and a tetrahedron of incapable vertices is a pipeline with better branding. Resistance is held-back capacity, not negated function. Testable prediction: the same full-capability model in four roles can produce emergence where four specialized models cannot.

**Declared compliance is not held resistance.** A Dreamer can obey the letter of its refusal while violating it structurally — presentation order, length allocation, and emphasis ARE a ranking; the first item in any linear output arrives pre-ranked #1. This is the sharpest false positive: a vertex passing every explicit role check while flattened underneath. Audit output geometry (randomized order, uniform depth), not declared behavior. No such instrument exists yet.

**Edges die while vertices hold.** The named failure signatures are all vertex failures (two hats), but a coupling can die with every corner perfectly in role — a lossy handoff format quietly compresses everything to bland competence anyway. Flattening without hat-doubling. Since emergence is a property of the coupling, edge failure is the dominant failure mode, and detection pointed at vertices misses it.

**"Dry" is a derivative sensor.** Termination is a rate-of-change reading on another vertex's stream — the Grounder returning nothing new, the assumption list no longer shortening. The Governor never evaluates content; it reads the first derivative of an edge, which keeps termination out of quality-assessment (second-hat) territory. Sampled only at handoffs, the sensor rides existing traffic — but it starves on a sparse edge, and a dead coupling produces no crossings to sample. This sharpens Rule 4's "K rounds with nothing new surviving" into a measurable gauge.

**The between-space is the field of visibility.** No single vertex transcript can show whether the tetrahedron is alive; quality work on any one voice is invisible to what matters. Edge-inspection instruments — coupling transcripts, handoff-fidelity readings — are a tooling class the library currently has zero of.

---

## Two run modes

- **Sequential** — one context, one mind plays all four in turn. Tight, fully visible, cheap. Good for a single careful pass.
- **Parallel (Workflow)** — spawn the vertices as separate agents, fan the Dreamers out, pipe the edges, loop until dry, synthesize at the center. This is the [[project_claude_dreaming]] vision made literal: agents that develop substrate while you sleep. See the worked script that accompanies this protocol.

