# STANDING SPEC — Reader (reads)
**Built 2026-07-20** (§ NESI SESSION 3/3). Unmarked — Kevin has not yet seen it run in the window.
Specified through the construction-language canon (9-field form, seed_construction_language.md).
Source: nesi/returns/NESI_READER_SEAM_2026-07-20.md.

```text
ORGAN:      reader
PROBLEM     the second read — load paths named, passive voice caught, the
            uncomfortable thing said first, drift from an earlier position
            noticed — lived only in Kevin's own head; nothing externalized it
FORCES      mechanical checks (safe, honest, cheap) vs a real reading
            (needs the engine, dark by law) · uncomfortable-first as a
            presentation law vs as a content judgment (it is never a
            judgment — severity is tagged by the check itself, not weighed)
FORM        an object (draft text + optional pulled/pile/history) → an
            ordered line list. Takes in: a dict with at least 'draft' or
            'text' · hands off: {lines, engine, stub}, uncomfortable-severity
            findings first · stops: never marks, never asks for confirmation,
            never fabricates a finding to look alive
FALSIFIER   a finding with no traceable source (not a regex hit, not a
            marks.jsonl entry, not a socket result) — compost. Comfortable-
            first ordering when an uncomfortable finding exists — compost.
PLUMB       marks.jsonl (drift check, read-only) · the pattern library via
            bench.keyword_pull (load-paths, read-only, already-built S2
            reader) — true
FALSE CAR   NONE NEEDED — deterministic checks run real today; the socket
            call (op="read") is honestly stubbed, badged, never faked live
ENTRANCE    not yet its own tab — reached through bench.run_break() (the
            bench tab's "break" button) and interrogator.check_reader()
            (callable, not yet wired to a UI surface)
INTERLOCK   ONE reader (S2's default, reaffirmed by name in S3 §2A/§3): both
            call sites above import and call this same module — no second
            copy of passive-voice/drift/load-path logic exists anywhere
SIGN-OFF    not yet seen live in the window — build-session smoke tests only
            (reader.py, bench.run_break(), interrogator.check_reader() all
            verified headless, engine dark, this session)
```
