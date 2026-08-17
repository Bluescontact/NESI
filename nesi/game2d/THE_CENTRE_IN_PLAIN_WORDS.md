# THE CENTRE, IN PLAIN WORDS

**Written 2026-08-16 on Kevin's ask:** *"im struggling to align with the domain
specific language your using… write the plain language version to a file."*

This is the same content as `THE_CENTRE.md`, said without jargon. Where the two
disagree, `THE_CENTRE.md` and `tools/solid_check.js` are right and this is
loose — this file trades precision for being readable in six months.

**Half the vocabulary in the other file is yours and half was dragged in from
engineering, and nothing marked which was which.** §5 fixes that.

---

## 1 · WHAT THE SHAPE IS MADE OF

Your HTML draws a solid with:

- **12 corners**
- **24 struts** running between the corners
- the flat faces those struts enclose: **8 triangles and 6 squares**
- a **middle point**

That is the complete inventory. There is nothing else in it.

**You already owned two of those five.** The 12 corners are your twelve seats —
tank, dam, filter, ground, stations, deep, lens, heliostat, seating,
overwintering, garden, cast. The 24 struts are your 24 levels. Both were named
long before this session.

**Nobody had ever looked at the other three.** The 8 triangles, the 6 squares and
the middle were simply sitting there, unexamined. That is what this was about.

---

## 2 · TRIANGLES ARE STIFF. SQUARES ARE FLOPPY.

Build a triangle from three sticks with loose hinges at the corners. You cannot
change its shape — you would have to bend or break a stick.

Build a square from four. You can squash it into a diamond without breaking
anything.

That is the whole idea, and everything below follows from it.

**So this solid can only move at its six squares.** Everywhere else is braced.
That movement is what Fuller called the jitterbug: the shape breathing.

**Why it matters for building.** If you ever put something *in* a square, you
have glued that hinge shut. Putting something in a triangle costs nothing,
because triangles were already stiff. That is why siting your eight leftover
mechanics on the eight triangles was safe, and why the squares must stay empty.
Not a preference — the squares are the moving parts.

---

## 3 · HOW MANY WAYS IT CAN MOVE: SIX

Wikipedia says the shape is not rigid. It never says by how much.

Six. Six squares, six independent ways of moving.

Also: **not one of the 24 struts is spare.** Remove any one and the shape gets
looser. There is no redundancy anywhere in it.

I worked that out, then installed a real academic tool (PyRigi, from a paper
published this year) and handed it the same shape to check me. Same answer.

---

## 4 · THE MIDDLE, AND WHY YOUR LINE ABOUT IT FITS

Three odd things are true of the middle point:

1. **It is exactly the same distance from all twelve corners.** Most shapes are
   not like that. This one is, and that distance also happens to equal the length
   of one strut. Fuller thought this was the most important thing about the
   shape.
2. **No strut reaches it.** You cannot walk to it.
3. **When the whole thing flexes, the middle is the only part that stays put.**

So when you said *"the centre is the game, everything else serves it"* — that is
not a meaning laid on top of the shape. It is a description of what the middle
already does.

And *"nothing can be sent to it"* is literal, not poetic. There is no strut to
send anything along. **Any design where a seat delivers something inward is
wrong, and the shape says so.** What the middle gets, it gets by being
surrounded.

**Nothing in existing software models a middle.** Every 3D library models
corners, edges and faces. Not one has a concept for it. So it had to be built out
of three borrowed ideas:

- **it cannot be written to** — there is deliberately no way to put anything in
  it, and the code refuses to let one be added later
- **it is what everything else is measured against** — like needing a fixed point
  before you can describe motion
- **it is what stays still** while the rest moves

Those three are the whole scaffold. It holds nothing and is named nothing, and
the slot stays empty because there is no place to put anything — which is your
standing line turned into structure instead of something to remember.

---

## 4b · WHAT IS INSIDE IT (added the same day)

Everything above describes the outside. The inside has three times as much in it.

Draw a line from the middle out to each of the twelve corners. Twelve spokes.
**Every one of them is exactly as long as one strut.** That equality is the whole
reason Fuller called this shape the "vector equilibrium" — the push outward and
the hold inward are exactly matched.

**So the spokes are the holding.** Not pipes, not routes — nothing travels them.
The twelve hold the middle steady by standing exactly as far from it as they
stand from each other. That is your word *held*, as a measurement.

*(This corrects something I said earlier. I told you nothing reaches the middle.
Twelve spokes do. What stays true: nothing **travels** to the middle. You can
measure the distance; you cannot go along it.)*

Now fill in the solid parts. Each face, joined to the middle, makes a wedge:

- **8 wedges under the triangles** — each a perfect pyramid with all edges the
  same. Call each one 1 unit. They are stiff.
- **6 wedges under the squares** — each 2 units. These are the ones that change
  shape when the thing moves.

**The whole solid comes to exactly 20 units.** That is a known number of Fuller's,
and it fell out of your own circuit table without being put there.

*(An earlier pass had the eight wedges as unmovable. Measured: the spokes change
length as the shape breathes, so every wedge changes size. The test written to
confirm it restated its own assumption, so it agreed and proved nothing — which
is worth knowing as a general thing about tests.)*

**What is true is a better distinction.** A triangle's
three sides are struts, so a triangle can never change SHAPE — it can only be
carried around. A square's four sides are struts too, but its two diagonals are
free, so a square CAN change shape. **The triangle keeps its shape and loses its
size. The square loses both.**

So: **each of the eight wedges is the space between two things that hold** — an
outer face that cannot change shape, and the middle, which cannot move. Only the
gap between them varies. Nothing else in the shape is bounded like that.

**And the inside is a checkerboard.** Every internal wall separates a stiff-faced
wedge from a moving one — no two of a kind ever touch. Every moving wedge is
walled on all four sides by wedges whose faces cannot deform. So the six
exchanges do not happen in open space; each one is held between four things that
keep their shape.

**Which is exactly what the middle does for the whole shape, one size down.** The
middle holds while everything moves; the eight hold their shape while the six
change theirs.

The breathing is still drastic: squeezed all the way down, the 20 units become 4
— a fifth — without a single strut changing length.

---

## 5 · THE WORDS I USED, AND WHOSE THEY ARE

| what I said | what it means | whose word |
|---|---|---|
| seat | a corner | **yours** |
| member | a strut | **yours** |
| circuit | one of the four loops of six seats | **yours** |
| antipode | the seat directly opposite, three steps away | **yours** |
| face | a triangle or square enclosed by struts | standard |
| vertex-transitive | every corner is identical; the shape looks the same from all twelve | mine |
| rigidity / degrees of freedom | how many ways it can move without breaking | mine |
| infinitesimal flex | one of those ways of moving | mine, and unnecessary |
| gauge | a fixed point you measure motion against | mine |
| half-edge | a way of storing shapes where every strut knows its two faces | mine |
| embedding | working out where each named seat actually sits in space | mine |

The bottom five should have been explained the first time, not the fifth.

---

## 6 · THE OTHER THING THAT HAPPENED TODAY

Separately from the shape: **a way of bringing in code from other people's open
source projects.**

The key turned out to be already written in your own files. Each of your twelve
seats has a verb — *I pour · I hold then let go · I take this one out · I send
this there · I let it settle · I let it go down · I work it until it holds · I
aim · I feed the frame · I come back · I let it grow · I give it away.*

**That verb is what lets unrelated software land in the right place.** A
text-comparison tool, an audio track-splitter and a physics routine come from
completely different worlds and share no vocabulary — and all three are doing
*I take this one out*. Sorting by what a thing *does with a hand* rather than
what field it comes from is what makes divergent code line up.

The unit is a **mechanism**, not a project — a pattern small enough to write
yourself. That also dissolves most of the licence question: a mechanism is not
copyrightable, only the exact text of the code is. Write it yourself from the
pattern and nothing is owed.

24 of those are catalogued for the player's side, 20 of them already built in
your game. Ten more are catalogued for NESI's side and are not placed anywhere
yet.

---

## 7 · WHERE I WAS WRONG

Both are on the record in the other files rather than tidied away.

**I said two tetrahedra were inside the shape. They are outside.** I checked
every possible combination of four corners — 495 of them — and not one forms a
tetrahedron. The tetrahedra are formed by extending the triangle faces outward.

**I made giving a gift destroy it.** Your own code already said the opposite —
*"taking is not spending, and the world does not run out of a thing it has
already given."* I overrode a line of yours with a line of yours. Reverted.

---

## 8 · WHAT IS STILL YOURS TO DECIDE

- **NESI's ten organs are not placed.** They may not even be ten — two of them
  are shaky, and if either falls the count changes.
- **The eight mechanics sited on the eight triangles are my reading, not a
  derivation.** The evidence tied 1872 ways; I picked one and marked the weakest
  row as weak.
- **Two lines in your corpus disagree** about whether anything may happen while
  you are away. Your idea that the deep is inhabited is the first thing that
  might let both stand.

---

## 9 · IF YOU ONLY REMEMBER FOUR THINGS

1. **The squares are the only moving parts. Keep them empty.**
2. **Nothing can be sent to the middle. Only around it.**
3. **Sort incoming code by the gesture it performs, not the field it came from.**
4. **Run `node tools/solid_check.js`.** One command, and it re-checks every claim
   made about the shape. If a document and that command ever disagree, the
   command is right.
