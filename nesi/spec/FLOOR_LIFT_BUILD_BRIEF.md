# FLOOR LIFT — BUILD BRIEF FOR THE OVERNIGHT RUN

**Authorized by Kevin 2026-08-05 15:11, single approval, caught in MARKS_LOG.jsonl before any work began.**

Every builder on this run reads, in order, before touching a file:

1. `nesi/mind/PROTOCOLS.md` — the session law.
2. `nesi/spec/FLOOR_LIFT_OVERNIGHT_2026-08-05.md` — **the authorization. This is the contract. Do not exceed it.**
3. `nesi/world3d/HARNESS.md` — how to actually run Godot here. The engine is in `tools/godot/`, NOT in Program Files.

---

## THE HARD RULES ON THIS RUN

**Write scope.** `nesi/world3d/` and `tools/` only. Nothing else. No `patterns/`, no ledgers, no membrane, no publishing, no deleting, no git.

**The halt rule.** If a lane turns out to need one of the twelve unmarked dependencies (b4, b5, b6, d1, d2, d3, **d5**, f1, k5, w3, s1/p0, p3), **that lane stops.** Write what you found into the report and move on. Do not proceed and explain later. A build that proceeds on an unmarked dependency makes BUILD_SPEC_v1 §6 decoration.

**The machine never does the recognizing.** Nothing built tonight may report a state about Kevin. No score, no counter, no percentage, no gauge keyed to anything but water. No chime, no sting, no acknowledgment cue. No highlight, outline, or waypoint on anything the system thinks matters. If a thing feels good because it tells Kevin something mattered, it goes, however good it feels.

**Nothing directs the body.** No text anywhere in the world or the report may direct Kevin's body, rest, food, or physical day.

**No imported art assets.** Everything procedural, from primitives, generated in-engine. A downloaded model is a fifth input and there is no fifth input.

**Definition of Done, per lane.** Read source in full before changing it. Run it — a real headless scene, actually executed — never eyeball it. Prove the round-trip if it writes state. **Split the two claims:** "the mechanism works" is yours to state; "this does what Kevin needed" is never yours and never appears. Name the edge of what you checked.

---

## THE COMMANDS (from DSS root, verbatim)

Re-import after any new `class_name`:
```
tools\godot\Godot_v4.7.1-stable_win64_console.exe --headless --path nesi\world3d --import
```

Run a headless test scene:
```
tools\godot\Godot_v4.7.1-stable_win64_console.exe --headless --path nesi\world3d --quit-after 600 scenes\test_<name>.tscn
```

Re-export web (path MUST be absolute; delete any `index.pck*.tmp` before retrying):
```
tools\godot\Godot_v4.7.1-stable_win64_console.exe --headless --path nesi\world3d --export-release "Web" C:\Users\KMEAR\OneDrive\Desktop\DSS content\nesi\world3d\export\web\index.html
```

After export, check: `index.pck` timestamp moved · `grep -c "nesi-tetra" index.html` ≥ 43 · `grep -o '\$GODOT_[A-Z_]*' index.html` returns nothing.

---

## TEST DISCIPLINE

Every lane that changes the world ships **its own headless test scene** `scenes/test_<lane>.tscn` + `scripts/test_<lane>.gd`, following the existing pattern in `test_regions.gd` / `test_bedrock.gd`: assert concrete numbers, print PASS/FAIL lines, exit non-zero on failure. A lane with no executed test is reported as **unverified**, not as done.

---

## THE REPORT

Append to `nesi/world3d/FLOOR_LIFT_REPORT_2026-08-05.md`. One section per lane:

- **What ran** — the scene executed, the assertions that passed, the timestamps that moved.
- **The edge** — where verification stopped.
- **What only Kevin can say** — one line, always the same shape: whether this made the world a place he wants to be in. Never answered by the builder.

If a lane halted, say which unmarked dependency stopped it and exactly where.
