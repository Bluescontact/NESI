# DREAM · recognitions — the game-craft vertex (THE PLAYER'S HAND)

2026-08-11 · Where great craft ALREADY STANDS unnamed in the build. Each entry: what stands, where (verbatim quote + path), which craft school it belongs to, and why it needs nothing added. These are readings, not proposals; the freeze is untouched by every line here.

---

## 1 · The hang — feel doing law's work
**What stands:** an unworked stone dragged toward descent stops at the node and hangs. No text refuses the player; the object simply will not carry.
**Where:** `if(!st.worked&&py>600){py=600} /* an unworked stone hangs — it will not carry past the node */` — nesi/game2d/nesi.html:256; ruled in BUILD_RECORD T4: *"The gate is structural: an unworked stone hangs at the node and will not carry past it (behaviour as the carrier, law 10 — no text refuses him)."*
**School:** game feel (Swink's line — the hand knows before the mind does) crossed with the immersive-sim rule that the world, not the UI, says no.
**Why nothing is needed:** the refusal is already in the physics of the drag itself. Any addition — a shake, a sound, a tint — would move the message from the hand to the eye and weaken it.

## 2 · Fail states as the system's own physics
**What stands:** a scorched receiver and a torn membrane don't error, block, or punish — they simply stop being able to hold, and water routed at them passes to the deep.
**Where:** `/* a scorched receiver passes it through, doing nothing it can keep */` and `/* a torn membrane holds nothing */` — nesi/game2d/nesi.html:798–799.
**School:** roguelike honesty — loss legible as fair, consequence as physics obeyed, never a guard rail and never a scolding.
**Why nothing is needed:** the fail state is the material behaving as damaged material. The scorch persisting (*"nothing reopens on its own"*) is the field's hardest lesson about consequence, already stated as conduct.

## 3 · The museum caption
**What stands:** teaching that names the world and never the player — captions on rest, panels that name their own act, and a hard boundary written into the code itself.
**Where:** *"The captions name the world and its mechanics — they never advise, never score, never read or mention what he wrote. A museum caption, not a coach."* — nesi/game2d/nesi.html:890–891 (comment above `say()`); ruled in BUILD_RECORD, "The teaching."
**School:** World 1-1 — the lesson no one notices — held inside Ico's restraint. Most of the field never finds this line; it either coaches or goes mute. This build found the third thing.
**Why nothing is needed:** the boundary is complete and self-describing. The only work it ever needs is defense.

## 4 · Persistence as trust, silence as the proof
**What stands:** state lands the moment the hand lets go; nothing on screen ever says saved.
**Where:** BUILD_RECORD law 12 check: *"Quitting mid-sentence loses nothing — state lands the moment the hand lets go… autosave covers the text. ✓ (nothing on screen says so. ✓)"* — nesi/game2d/BUILD_RECORD.md; also *"no saved indicator, no last-saved field"* (carried list).
**School:** the save-system school (the field's hardest-won lesson, bought in lost hours across three decades) — with the rare second step: trust so complete it doesn't announce itself. Most games earn trust and then spend it on a toast.
**Why nothing is needed:** a saved-indicator is an apology for save systems that failed. This one doesn't fail, so it owes no apology.

## 5 · The bare plate — the strongest juice is none
**What stands:** set-it-down does nothing, renders nothing, confirms nothing — and that absence is load-bearing.
**Where:** `if(dest==="set"){(stones||[]).forEach(st=>st.stage="down");save();return} /* the absence is the feedback */` — nesi/game2d/nesi.html:516.
**School:** the subtraction school (Ico / Journey / INSIDE) at its logical end point. Where the whole industry adds a chime, this build's one comment names the design: the absence IS the feedback.
**Why nothing is needed:** law 6 already guards it, and the code comment means the next hand in the file is told why the nothing is there. A refusal that documents itself is finished craft.

## 6 · The front door is one keystroke deep
**What stands:** the game opens in a writing field with nothing before it, and the first finished sentence is the first consequence — the arrival is the keystroke itself.
**Where:** *"(1) opens in a writing field, nothing precedes ✓"* (BUILD_RECORD, acceptance criteria); *"The sentence is the arrival: finish one and it banks as one stone, live, at the keystroke"* (BUILD_RECORD, the supersession).
**School:** onboarding-as-first-experience — the distance from open to first meaningful consequence, counted in gestures. Here it is: zero clicks, one sentence. Almost nothing shipped anywhere is this short.
**Why nothing is needed:** the supersession already removed the last piece of machinery (the 100-word clock) standing between the hand and the consequence. The door cannot get shorter without removing the sentence.

## 7 · Pick-up speaks the words
**What stands:** grasping a stone shows the player his own verbatim text for exactly as long as he holds it — the object's identity is its words, in the hand, then gone.
**Where:** `g.addEventListener("pointerdown",e=>{…say(st.text.slice(0,90))});` and on release `say("")` — nesi/game2d/nesi.html:252, 258.
**School:** diegetic identity (the object carries its own label only while touched) — the same instinct behind the best inventory design in the field, arrived at here without an inventory.
**Why nothing is needed:** it uses the teaching strip, so it inherits the museum-caption boundary; it is verbatim, so law 4 is clean; it lasts exactly the duration of the grasp, so nothing lingers to become UI.

## 8 · The world stops when you leave
**What stands:** a hidden window freezes; no timer advances state while away; scorch, tear, and lean persist exactly as left. There is no catch-up, no decay-while-gone, no reason to come back except wanting to.
**Where:** BUILD_RECORD law 8 check: *"Runs while you're in it, stops when you leave — no timers advance state while away; scorch/tear/lean persist as they were; a hidden window freezes (rAF stops). ✓"* — nesi/game2d/BUILD_RECORD.md.
**School:** this is the field's whole re-engagement industry — idle games, daily streaks, withering crops — refused in one clause. The craft here is negative space: the strongest statement in the build about what a game owes a life is the absence of a clock.
**Why nothing is needed:** law 7 and law 8 together already close every door a retention mechanic could enter by. One exception stands lawfully and correctly: the tear heals on wall clock — real time, because a wound in the material is the world's business, not a hook.

## 9 · The tear heals in its own time, and nothing asks you to wait
**What stands:** a torn membrane heals over seven real seconds; the panel quietly restores itself at the moment of healing; no countdown, no prompt, no progress ring.
**Where:** `const torn=Date.now()-S.tornAt<RELAX; /* wall clock: a saved tear heals on real time, not session time */` — nesi/game2d/nesi.html:741; the self-restore at 755; BUILD_RECORD: *"heals in its own time, 7 s, and nothing asks you to wait."*
**School:** patience-as-physics (Shadow of the Colossus's grip, the fishing-game cast) — with the timer readout subtracted. The player who tears learns the sheet's rhythm by living it once, which is how a body actually learns rhythm.
**Why nothing is needed:** a countdown would convert a material fact into a demand. The dashed sheet is legible as torn; time does the rest; the panel's self-restore is the world resuming, not the game speaking.

## 10 · The deep never renders — the off-screen as world
**What stands:** the deep is a real destination with real one-way consequence, and it is never drawn. Bedload's runout exits the frame; deep-routed water is removed with no picture.
**Where:** `if(dest==="deep"){(stones||[]).forEach(st=>st.stage="deep");save();return} /* has a destination; never renders */` — nesi/game2d/nesi.html:517; law 9 in BUILD_RECORD: *"bedload's runout exits the frame; deep-routed fractions are removed with no drawing."*
**School:** negative-space world-building (INSIDE's dark, Journey's mountain interior, the ocean under every raft game) — the place the game refuses to show is the place the player believes in most.
**Why nothing is needed:** the deep's power is exactly its unrenderability. The code comment — *has a destination; never renders* — is a four-word design document; the field has shipped hundred-page ones that say less.

---
Read by the DREAM vertex, game-craft counsel, THE PLAYER'S HAND. These stand already; the recognition adds nothing to the build and asks nothing of it.
