# Anatomy Is Not the Cockpit

**The constitutional-function layer and the operator-room layer stay distinct — many-to-many, never forced 1:1.**

---

## The pattern in one move

A machine that holds you has two layers that must never be flattened into each other. Underneath is its **anatomy** — the constitutional functions it performs to hold you. On top is the **cockpit** — the rooms you actually walk into each day. One room can run on several functions at once; one function can surface in several rooms, or in none. Pretending the relation is one-function-per-room turns a living body into a menu.

```
Name the machine's organs. Do not make each organ a button.
```

---

## Why this pattern exists

When you name a machine's parts, the seductive next move is to hand the operator one screen per part — it feels tidy, complete, faithful. It is a trap. The anatomy is *how the machine works*; the cockpit is *what the operator needs in front of them*. These are different questions with different answers. A daily surface built as a mirror of the anatomy forces the operator to navigate the architecture every time they need support — which is exactly when they have the least capacity to.

NESI made this concrete. Its seven constitutional organs — scaffold, recognition lens, cognitive heliostat, lint, decision space, guide rails, nanobot workshop — are how it performs holding. But the daily cockpit needs only: where am I · is the floor standing · what's ripe · what is this session for · what is its cap. The organs are the anatomy behind that surface, not the surface itself.

---

## The two layers

```
ANATOMY  (constitutional functions)   —  how the machine holds
          scaffold · recognition lens · heliostat · lint ·
          decision space · guide rails · nanobot workshop

                    ⇅  many-to-many, never 1:1

COCKPIT  (operator rooms)             —  what the operator walks into
          home · floor · governor · roster · gate · marks · decision surface
```

The mapping is genuinely many-to-many:
- The **home screen** runs on scaffold + recognition lens + heliostat together.
- The **Decision Surface** room runs on lint + decision space.
- The **Governor** room runs on guide rails.
- The **Gate** is a *law spanning many organs*, not any single one of the seven.
- The **Nanobot Workshop** is a dev/repair environment — not a daily room at all.

---

## The rule it sets

Every build decision keeps the two layers distinct and may **not** render one organ as one room, or one room as one organ. When a room is designed, name which functions it runs on (possibly several). When a function is placed, allow it to appear in more than one room — or in none. The anatomy is reached through a deliberate **Anatomy / Machine view**, never through the daily home.

---

## Falsifier

The pattern is being violated if a NESI interface ships in which **the daily cockpit is the seven-organ ring itself**, or in which **any surface presents a clean seven-organs → seven-rooms table**. Either is the flattening this pattern exists to prevent — the anatomy has been forced onto the surface.

---

## Lineage

EXTENDS `ai_constitutional_stack` (which separates constitutional function from action/mark) and composes with `layout_as_state_encoding` (which governs the operator surface) — but neither names the *mapping between* the two layers, nor forbids forcing it 1:1. That mapping law is this pattern's addition. Promoted 2026-07-15 from the NESI development chain (disposition D1); already honored in the Day-1 NESI shell, where the home carries the floor-lights + ripe decisions and an "anatomy" affordance opens the master map separately. Governs all downstream NESI-OS build days.
