# The crystal lattice self-layout renderer

**What:** A working self-contained renderer: DOM-positioned facet chips around a hex-clip-path nucleus, with JS that measures the live layout each resize and draws SVG bezier bonds nucleus-to-facet plus an enclosing rhombus.

**Source:** `osg_organ/crystal_v1.html (v0 beside it)`
**When:** 2026-07-31

**Evidence (verbatim):**
> parts+='<path d="M'+cx+' '+cy+' C '+mx+' '+cy+' '+mx+' '+ey+' '+ex+' '+ey+'" fill="none" stroke="'+col+'" stroke-width="1"/>' ; nucleus gem via clip-path:polygon(50% 0,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%)

**Capacity:** A reusable measure-DOM-then-draw-SVG-bonds technique for rendering a geometric figure that derives its lines from wherever content actually sits — useful for the net's faces and fold-edges without hand-placed coordinates.

**Unrouted because:** Built as a one-off doctrine page inside osg_organ; never extracted as a mechanic.

**Shortest routing:** Reuse the pattern to render the unfolded net: faces as positioned elements, edges drawn live between them.

**Reading:** capacity M · effort L · confidence M

---
This card orders nothing. It waits for Kevin's mark. Blank is a complete state.
