---
name: project-the-field
description: "THE_FIELD.html - the fifth locatable, built 2026-08-06 as an editable tree. An edge is {to, rel} where the RELATION IS THE NAMING. Staging only; the page never writes."
metadata:
  node_type: memory
  type: project
---

**Kevin's naming, 2026-08-06:** *"The decisions create a field... i should be able to see and edit every descision in a tree and field. **The relationships are the naming that underlies the process in the world of unnamed words.**"*

**That sentence changed what an edge is.** An edge was going to be metadata - A blocks B. It is not. **Naming the relation IS the act of naming a process that has no word yet.** So an edge is `{to, rel}` and `rel` is **free text Kevin writes**. There is deliberately **no vocabulary offered** - a menu of relation words would be the machine pre-naming the thing this exists to let him name. In the tree, the relation word is the branch label.

**`tools/field_view.py` (collect) -> `field_render.py` (tree) -> `field_page.py` (shell) -> `THE_FIELD.html`.** A SURFACE in the container registry: derived, holds nothing of its own. ~527 items across MARKS_LOG, OPEN_GATES, DECISIONS_OFFERED and the container check - the first time all four sit in one place.

**Two tabs:** TREE (what has been named; empty until Kevin writes words, and it says so - *"an honest blank, not an empty graph"*) and FIELD (everything, ledger order).

**Editing STAGES; it never writes.** Click one thing, click another, name what holds between them. Click a decision's option chip to answer it. Everything accumulates as **real commands** he copies and runs. The page is a sandboxed iframe and cannot reach the ledgers - **and that constraint is doing real work: a surface that wrote would be a surface that acts.**

**NO RANKING, EVER.** Ledger order, no sort, no score, no highlight, no suggested-next. Age is printed as a fact and says so. Items with no relation sit in THE UNRELATED - an honest statement that little has been named, never a judgment about worth. **Falsifier: if this surface ever orders, scores, highlights or recommends, delete it rather than adjust it.**

**THE LESSON THAT COST THE MOST.** The page was verified by grepping its generated HTML - markup correct, relation word present, nesting present - and declared working. Then a browser opened it and clicked: **every handler on the page was the dead fragment `pick(`**. `json.dumps` returns a double-quoted string and it terminated the `onclick` attribute at the first inner quote. The whole surface was inert and looked perfect. A second bug hid the same way: 38 items silently vanished from the lookup table on key collisions (marks sharing a timestamp to the second). **Reading the output is not running it** - [[feedback_definition_of_done]] rule 2, earning its place.

Related: [[project_locatable_move]] - [[feedback_run_ahead_rate]] - [[project_compost_window]]
