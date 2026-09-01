# NO BLUR — the formatting discipline for compounded gift-writing

Named 2026-08-20, in the keeper's own words: the trimtab boundary is "a locating,
coordination, and calibration tool to be able to identify and place
structural load-bearing writing as an input, weaving other authors' work
together into a compounded gift without blur. My gift and words, and their
gifts and words, are always held separately."

This is the formatting-discipline half of that: how a compounded piece is
built so the separation is structural, not a matter of the writer
remembering to be careful.

## The rules

1. **Another author's words live inside a marked block, never inline.**
   A blockquote (`> ...`), never merged into a sentence you are writing.

2. **Every marked block carries its attribution touching it.**
   Immediately before or after the block, one line naming who, what it's
   from, and when — never left to float elsewhere in the piece where a
   reader has to go hunting for whose words those were.

3. **Your own words never continue a quoted sentence.**
   A quote ends where it ends. Your next sentence starts fresh, visibly
   yours — it never picks up their clause, finishes their thought, or
   drifts into paraphrase that reads as continuation.

4. **A boundary ledger stands apart from the flow.**
   One place — top or bottom of the piece — listing every author drawn on
   and what of theirs appears. The compounded piece can be audited at a
   glance without rereading the whole thing.

5. **Your own prior writing gets the same treatment as anyone else's.**
   Reusing an earlier piece of your own as an input — the way the trimtab
   pattern names doing for another author's dormant work — is marked and
   attributed to that earlier self, not silently absorbed as "current you."

## What this refuses

- No silent paraphrase-blend. If a passage started as someone else's and
  you reshaped its wording, it is still theirs, still marked, still in the
  ledger — reshaping the words is not the same as originating them.
- No attribution buried in a footnote system disconnected from the block
  it belongs to. Adjacency is the rule, not a link, not a number.
- No ledger that undercounts. Every marked block's author appears in the
  ledger; the ledger is a checkable claim, not a courtesy gesture.

## What this does not decide

This discipline governs form, not selection. It has nothing to say about
which passages are actually load-bearing enough to belong in the piece —
that's the locating half of the trimtab boundary tool, and it is not built
here. This is the boundary-keeping half only: once something is going in,
this is how it goes in without blurring.

`blur_check.js` in this folder checks a draft against rules 1, 2, and 4 by
shape — markdown structure, never content judgment. Rules 3 and 5 need a
human read; a script cannot tell whether a sentence quietly finishes
someone else's thought.
