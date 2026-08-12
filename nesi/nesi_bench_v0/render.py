"""Stage 1-2 -- builds the rendered grain + graph surface.

Reads the mock feed, the region layout, physics.config.json, and the graph
edges, and writes a single self-contained HTML file (no remote resources,
no server) that the renderer seam opens. Position is the only state signal
on the object face (guardrail #10): no badge, no subtitle, no label renders
by default. A region key becomes visible only via an explicit local
inspection toggle ('i'), which is technical inspection, not ambient
narration (guardrail #10, #54).

Stage 2 adds the graph layer: tethers render only on deliberate attention
(hover) to one object -- never at rest (guardrail #29) -- desaturating the
rest of the surface while that object's immediate edges light up (v1 Sec
7). Ratified edges pull their non-dragged endpoint via a damped spring
(secondary-node motion, v1 Sec 5.1); coherent-tension edges hold a fixed
rest distance as a Strut that is never allowed to collapse toward zero
(guardrail #34); proposed edges apply no force at all (guardrail #31) and
only change their own visual slack as they stretch.

Stage 4 closed a logged gap from Stages 1-2: strings/lint.py's docstring
stripper used to treat any triple-quoted block as a docstring, including
the HTML_TEMPLATE assignment below, so the JS/HTML text embedded here went
unscanned. It now distinguishes a genuine docstring (a bare statement) from
a triple-quoted assignment (this template) and scans the latter like any
other literal -- verified by temporarily injecting a fake UI string into
this file and confirming the lint caught it before reverting.
"""

from __future__ import annotations

import json
from pathlib import Path

from .feed import load_mock_feed
from .layout import REGION_RECTS, CANVAS_W, CANVAS_H
from .regions import OFF_GRAIN_KEYS, ALL_REGION_KEYS
from .graph import edges_from_objects, is_strut
from .gate import gate_seam_x
from .strings import get as get_string

PHYSICS_CONFIG_PATH = Path(__file__).resolve().parent / "physics.config.json"
OUTPUT_PATH = Path(__file__).resolve().parent / "renderer" / "surface_rendered.html"

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>NESI</title>
<style>
  html,body{{margin:0;padding:0;width:100%;height:100%;background:#f2efe6;overflow:hidden;font-family:Georgia,serif}}
  #bench{{position:relative;width:{canvas_w}px;height:{canvas_h}px;margin:0 auto}}
  .region{{position:absolute;border:1px solid #cfc9b8;box-sizing:border-box;transition:none}}
  .region.off-grain{{border-style:dashed}}
  .region-tag{{position:absolute;top:4px;left:6px;font-size:10px;letter-spacing:1px;color:#8a8368;display:none;font-family:monospace}}
  .region.inspect .region-tag{{display:block}}
  .region.dim{{filter:saturate(0.35)}}
  .obj{{position:absolute;width:150px;min-height:44px;padding:8px 10px;background:#fdfcf8;border:1px solid #b9b190;box-shadow:1px 1px 0 rgba(0,0,0,0.05);font-size:12px;line-height:1.4;color:#2a2618;cursor:grab;user-select:none;transition:none}}
  .obj.dragging{{cursor:grabbing;z-index:10}}
  .obj.dim{{filter:saturate(0.3);opacity:0.75}}
  .obj[data-straddle="uncommitted"]{{border-style:dashed;border-width:2px}}
  #tethers{{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none}}
  .tether{{opacity:0;transition:none}}
  .tether.lit{{opacity:1}}
  .tether-ratified{{stroke:#6b5d3f;stroke-width:1.6}}
  .tether-proposed{{stroke:#8a8368;stroke-width:1;stroke-dasharray:3 5}}
  .tether-proposed.stretched{{stroke-dasharray:2 8;stroke-width:0.75}}
  .tether-strut{{stroke:#4a4230;stroke-width:2.2;stroke-dasharray:1 0}}
  .gate-seam{{stroke:#8a8368;stroke-width:1;stroke-dasharray:2 4;display:none}}
  .gate-seam.inspect{{display:block}}
  #disclosure{{position:absolute;left:0;bottom:0;padding:5px 10px;font-size:10px;font-family:monospace;letter-spacing:0.5px;color:#5a5238;background:transparent;display:none;transition:none}}
  #disclosure.on{{display:block}}
</style>
</head>
<body>
<!-- guardrail A1-A3: silent open. no generated text, no greeting, no counts. -->
<div id="bench">
  <svg id="tethers"></svg>
  <div id="disclosure"></div>
</div>
<script id="bench-data" type="application/json">{data_json}</script>
<script>
(function(){{
  const DATA = JSON.parse(document.getElementById('bench-data').textContent);
  const bench = document.getElementById('bench');
  const svg = document.getElementById('tethers');
  svg.setAttribute('viewBox', '0 0 ' + {canvas_w} + ' ' + {canvas_h});
  const rects = DATA.regions;
  const physics = DATA.physics;
  let inspecting = false;

  function regionForPoint(px, py) {{
    for (const key in rects) {{
      const r = rects[key];
      if (px >= r.x && px < r.x + r.w && py >= r.y && py < r.y + r.h) return key;
    }}
    return null;
  }}

  for (const key in rects) {{
    const r = rects[key];
    const el = document.createElement('div');
    el.className = 'region' + (DATA.offGrain.includes(key) ? ' off-grain' : '');
    el.style.left = r.x + 'px'; el.style.top = r.y + 'px';
    el.style.width = r.w + 'px'; el.style.height = r.h + 'px';
    const tag = document.createElement('div');
    tag.className = 'region-tag';
    tag.textContent = DATA.strings['region.' + key];
    el.appendChild(tag);
    el.dataset.regionKey = key;
    bench.appendChild(el);
  }}

  function objectMass(obj) {{
    const ratified = obj.links.filter(l => l.state === 'ratified').length;
    const proposed = obj.links.filter(l => l.state === 'proposed').length;
    return physics.staging_base_mass
      + physics.w_ratified * ratified
      + physics.w_proposed * proposed
      + physics.char_count_weight * obj.content.length;
  }}

  // -- object elements + physics state (position, velocity, mass) --
  const els = {{}};      // id -> DOM element
  const state = {{}};    // id -> {{x,y,vx,vy,mass,dragging}}

  DATA.objects.forEach(obj => {{
    const el = document.createElement('div');
    el.className = 'obj';
    el.style.left = obj.position.x + 'px';
    el.style.top = obj.position.y + 'px';
    el.textContent = obj.content;
    el.dataset.id = obj.id;
    el.dataset.region = obj.region;
    bench.appendChild(el);
    els[obj.id] = el;
    state[obj.id] = {{
      x: obj.position.x, y: obj.position.y, vx: 0, vy: 0,
      mass: objectMass(obj), dragging: false,
    }};
  }});

  // -- Stage 2: the graph. edges are pre-computed server-side (graph.py) --
  const EDGES = DATA.edges.map(e => ({{
    ...e,
    restLength: null,   // set on first physics tick from initial layout
    el: null,           // SVG line element
  }}));

  EDGES.forEach(e => {{
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    let cls = 'tether ';
    if (e.isStrut) cls += 'tether-strut';
    else if (e.state === 'ratified') cls += 'tether-ratified';
    else cls += 'tether-proposed';
    line.setAttribute('class', cls);
    svg.appendChild(line);
    e.el = line;
  }});

  function center(id) {{
    const el = els[id];
    return {{ x: parseFloat(el.style.left) + el.offsetWidth / 2,
              y: parseFloat(el.style.top) + el.offsetHeight / 2 }};
  }}

  function edgesTouching(id) {{
    return EDGES.filter(e => e.a === id || e.b === id);
  }}

  // -- Stage 3: the gate carry. X_GATE is the seam between gate and
  // landing (gate.py owns the boundary; this is the same number). A
  // technical-inspection-only guide line, shown solely under the 'i'
  // toggle -- never ambient (guardrail #10, #54).
  const X_GATE = DATA.gateSeamX;
  const gateLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  gateLine.setAttribute('class', 'gate-seam');
  gateLine.setAttribute('x1', X_GATE); gateLine.setAttribute('y1', 0);
  gateLine.setAttribute('x2', X_GATE); gateLine.setAttribute('y2', {canvas_h});
  svg.appendChild(gateLine);

  // continuous sweep: does the object's box, travelling from prevCx to
  // currCx, cross X_GATE at any point along that travel? (guardrail: a
  // fast flick must not skip the seam via frame-by-frame point checks.)
  function sweptCrossesGate(prevCx, currCx, halfW) {{
    const lo = Math.min(prevCx, currCx) - halfW;
    const hi = Math.max(prevCx, currCx) + halfW;
    return lo <= X_GATE && X_GATE <= hi;
  }}

  // per-link geometric test: does THIS edge's own connecting vector (not
  // the object's box) cross X_GATE within the dragged object's current
  // Y-bounds? (v1 Sec 6 -- "its connecting vector intersects X_gate within
  // the Y-bounds of the object's collision box during the crossing window.")
  function segmentCrossesGate(x1, y1, x2, y2, yMin, yMax) {{
    if ((x1 < X_GATE) === (x2 < X_GATE)) return false;
    const t = (X_GATE - x1) / (x2 - x1);
    const yAt = y1 + t * (y2 - y1);
    return yAt >= yMin && yAt <= yMax;
  }}

  // -- surface/depth: tethers + neighbors light only on deliberate
  // attention to one object; everything else desaturates. releasing
  // recedes instantly -- no fade, no lingering glow (v1 Sec 7).
  //
  // The disclosure line is Stage 4's occasion (B)/(C) speech: naming a
  // proposal's status, or a concealed structural fact (a strut, a typed
  // relation), only while attention is held -- every word sourced from
  // DATA.strings, nothing hardcoded here (guardrail #50).
  const disclosureEl = document.getElementById('disclosure');

  function attend(id) {{
    const touching = edgesTouching(id);
    const neighborIds = new Set([id]);
    touching.forEach(e => {{ neighborIds.add(e.a); neighborIds.add(e.b); }});

    Object.keys(els).forEach(oid => {{
      els[oid].classList.toggle('dim', !neighborIds.has(oid));
    }});
    EDGES.forEach(e => {{
      e.el.classList.toggle('lit', touching.includes(e));
    }});

    const lines = [];
    touching.forEach(e => {{
      if (e.isStrut) {{
        lines.push(DATA.strings['link.type.coherent-tension']);
      }} else if (e.state === 'proposed') {{
        lines.push(DATA.strings['disclosure.proposed-thread']);
      }} else {{
        const typeString = DATA.strings['link.type.' + e.type];
        if (typeString) lines.push(typeString);
      }}
    }});
    if (lines.length) {{
      disclosureEl.textContent = lines.join(' / ');
      disclosureEl.classList.add('on');
    }}
  }}

  function releaseAttention() {{
    Object.values(els).forEach(el => el.classList.remove('dim'));
    EDGES.forEach(e => e.el.classList.remove('lit'));
    disclosureEl.classList.remove('on');
    disclosureEl.textContent = '';
  }}

  DATA.objects.forEach(obj => {{
    const el = els[obj.id];
    const s = state[obj.id];

    let offX = 0, offY = 0;
    let downX = 0, downY = 0;
    let breakawayDone = false;
    let shearAnchorX = null;    // gate shear: X pinned here while frozen
    let shearReleased = false;  // gate shear: true once this carry cleared the threshold
    let startRegion = null;     // region at the start of this carry
    let prevCx = null;          // for the swept-gate test between frames

    el.addEventListener('pointerenter', () => attend(obj.id));
    el.addEventListener('pointerleave', () => {{ if (!s.dragging) releaseAttention(); }});

    el.addEventListener('pointerdown', ev => {{
      // Stage 5 foreclosure (guardrail #72): a script-dispatched pointer
      // event has isTrusted === false. The carry -- and therefore every
      // mark it can produce (cross, uncross, ratify, sever) -- never
      // starts for anything but a real, browser-originated gesture. This
      // is incapacity, not a rejected attempt: no drag state is entered,
      // no attend() fires, nothing downstream ever sees a fake carry.
      if (!ev.isTrusted) return;
      s.dragging = true;
      breakawayDone = false;
      shearAnchorX = null;
      shearReleased = false;
      el.classList.add('dragging');
      attend(obj.id);
      const rect = el.getBoundingClientRect();
      offX = ev.clientX - rect.left;
      offY = ev.clientY - rect.top;
      downX = ev.clientX; downY = ev.clientY;
      el.setPointerCapture(ev.pointerId);

      // Stage 3: reset the crossing window for every edge touching this
      // object. Nothing here decides eligibility -- it just clears last
      // carry's flags so this carry starts from "hasn't crossed yet."
      startRegion = el.dataset.region;
      prevCx = s.x + el.offsetWidth / 2;
      edgesTouching(obj.id).forEach(e => {{ e._crossed = false; }});
    }});

    el.addEventListener('pointermove', ev => {{
      if (!s.dragging) return;
      const benchRect = bench.getBoundingClientRect();
      let targetX = ev.clientX - benchRect.left - offX;
      let targetY = ev.clientY - benchRect.top - offY;
      const region = el.dataset.region;

      if (region === 'break') {{
        // static breakaway: no motion until accumulated pointer travel
        // clears the threshold, then a velocity-capped follow (v1 Sec 5.2).
        const traveled = Math.hypot(ev.clientX - downX, ev.clientY - downY);
        if (!breakawayDone && traveled < physics.break_static_threshold * 4) {{
          return;
        }}
        breakawayDone = true;
        const dx = targetX - s.x, dy = targetY - s.y;
        const dist = Math.hypot(dx, dy) || 1;
        const capped = Math.min(dist, dist * physics.break_viscous_coeff);
        targetX = s.x + dx * (capped / dist);
        targetY = s.y + dy * (capped / dist);
      }} else if (region === 'gate' || region === 'landing') {{
        // gate shear (v1 Sec 5.2): resistance PERPENDICULAR to the seam
        // only -- X_GATE is a vertical line, so the resisted axis is
        // horizontal (X); vertical (Y) motion is never touched. While the
        // object's estimated center sits within the shear zone around the
        // seam, X freezes at the point it entered the zone (a hold, not a
        // block -- Y keeps tracking the pointer) and accumulates
        // perpendicular travel; once that travel clears
        // physics.gate_shear_threshold the freeze releases for the rest of
        // this carry and X snaps free to follow the pointer again, same
        // "static-then-free" shape as break's breakaway, scoped to the seam
        // zone instead of the whole region. Leaving the zone without
        // releasing re-arms the freeze for the next approach.
        const halfWEst = el.offsetWidth / 2;
        const estCx = targetX + halfWEst;
        const inShearZone = Math.abs(estCx - X_GATE) <
          (physics.gate_intersection_padding + physics.gate_shear_threshold);
        if (inShearZone && !shearReleased) {{
          if (shearAnchorX === null) shearAnchorX = s.x;
          const perpTravel = Math.abs(targetX - shearAnchorX);
          if (perpTravel < physics.gate_shear_threshold) {{
            targetX = shearAnchorX;
          }} else {{
            shearReleased = true;
          }}
        }} else if (!inShearZone) {{
          shearAnchorX = null;
        }}
      }}
      // all other regions: the grabbed object stays pinned 1:1 to the
      // pointer (v1 Sec 5.1 core rule) -- mass/inertia express through
      // connected secondary nodes in the physics loop below, never as
      // input lag on the card actually in hand.

      s.x = targetX; s.y = targetY;
      el.style.left = targetX + 'px';
      el.style.top = targetY + 'px';

      // Stage 3: the carry. Continuous sweep between last and current
      // center-x catches a fast flick that would otherwise skip the seam.
      const halfW = el.offsetWidth / 2, halfH = el.offsetHeight / 2;
      const cx = targetX + halfW, cy = targetY + halfH;
      el.toggleAttribute('data-straddle', false);
      if (isStraddling(cx, halfW)) el.dataset.straddle = 'uncommitted';
      else el.removeAttribute('data-straddle');

      if (prevCx !== null && sweptCrossesGate(prevCx, cx, halfW)) {{
        const yMin = targetY, yMax = targetY + el.offsetHeight;
        edgesTouching(obj.id).forEach(e => {{
          const otherId = e.a === obj.id ? e.b : e.a;
          const p = center(otherId);
          if (segmentCrossesGate(cx, cy, p.x, p.y, yMin, yMax)) e._crossed = true;
        }});
      }}
      prevCx = cx;
    }});

    function isStraddling(cx, halfW) {{
      return (cx - halfW) < X_GATE && X_GATE < (cx + halfW);
    }}

    function endDrag() {{
      if (!s.dragging) return;
      s.dragging = false;
      el.classList.remove('dragging');
      el.removeAttribute('data-straddle');
      const cx = s.x + el.offsetWidth / 2;
      const cy = s.y + el.offsetHeight / 2;
      const found = regionForPoint(cx, cy);
      // ambiguous release point (between regions): stays in its prior
      // region rather than a machine-guessed nearest one (guardrail #14).
      if (found) el.dataset.region = found;
      const endRegion = el.dataset.region;

      // Stage 3: resolve the carry. Only a gate<->landing transition is a
      // crossing at all; everything else leaves every edge untouched.
      const forward = startRegion !== 'landing' && endRegion === 'landing';
      const backward = startRegion === 'landing' && endRegion !== 'landing';
      if (forward || backward) {{
        edgesTouching(obj.id).forEach(e => {{
          if (forward && e.state === 'proposed') {{
            if (e._crossed) ratifyEdge(e); else severEdge(e);
          }} else if (backward && e.state === 'ratified') {{
            if (e._crossed) revertEdge(e); else severEdge(e);
          }}
        }});
      }}

      if (el.dataset.region === 'intake') {{
        s.vx = 0; s.vy = 0; // zero inertia: no coast after release.
      }}
      // staging's kinetic mass now expresses through the tether spring on
      // connected nodes (below) rather than a self-coast -- the mass value
      // computed in objectMass() feeds the spring response, not a throw.
    }}
    el.addEventListener('pointerup', endDrag);
    el.addEventListener('pointercancel', endDrag);
  }});

  // -- Stage 3 edge-state transitions. No confirmation, no praise, no
  // "successfully crossed" -- the spatial fact (a taut line where there
  // was a slack one, or the line's absence) is the only acknowledgment
  // (guardrail #20). A severed edge stops existing, both in the model and
  // on screen; it does not linger as a faded or dashed reminder.
  function retagEdgeClass(e) {{
    let cls = 'tether ';
    if (e.isStrut) cls += 'tether-strut';
    else if (e.state === 'ratified') cls += 'tether-ratified';
    else cls += 'tether-proposed';
    e.el.setAttribute('class', cls);
  }}
  function ratifyEdge(e) {{ e.state = 'ratified'; e.restLength = null; retagEdgeClass(e); }}
  function revertEdge(e) {{ e.state = 'proposed'; e.restLength = null; retagEdgeClass(e); }}
  function severEdge(e) {{
    const i = EDGES.indexOf(e);
    if (i >= 0) EDGES.splice(i, 1);
    if (e.el && e.el.parentNode) e.el.parentNode.removeChild(e.el);
  }}

  // -- Stage 2 physics tick: ratified links pull their non-dragged
  // endpoint via a damped spring (secondary-node motion). coherent-tension
  // struts hold a fixed rest distance -- corrected toward, never collapsed
  // to zero, never fully resolved. proposed links apply no force; only
  // their own stretched/slack visual class changes (guardrail #31, #34).
  function physicsTick() {{
    EDGES.forEach(e => {{
      const ca = center(e.a), cb = center(e.b);
      const dx = cb.x - ca.x, dy = cb.y - ca.y;
      const dist = Math.hypot(dx, dy) || 0.0001;
      if (e.restLength === null) e.restLength = dist;

      if (e.isStrut) {{
        const err = dist - e.restLength;
        const nx = dx / dist, ny = dy / dist;
        const correction = err * 0.5; // split the correction between ends
        applyCorrection(e.a, nx * correction, ny * correction);
        applyCorrection(e.b, -nx * correction, -ny * correction);
      }} else if (e.state === 'ratified') {{
        const stretch = dist - e.restLength;
        const nx = dx / dist, ny = dy / dist;
        const k = physics.tether_spring_stiffness / Math.max(1, state[e.a].mass + state[e.b].mass);
        const force = stretch * k * 0.001;
        applySpring(e.a, nx * force, ny * force);
        applySpring(e.b, -nx * force, -ny * force);
      }} else {{
        // proposed: no force. purely visual -- mark as stretched past the
        // configured max, never pulling either endpoint toward the other.
        e.el.classList.toggle('stretched', dist > physics.tether_max_stretch);
      }}

      e.el.setAttribute('x1', ca.x); e.el.setAttribute('y1', ca.y);
      e.el.setAttribute('x2', cb.x); e.el.setAttribute('y2', cb.y);
    }});
    requestAnimationFrame(physicsTick);
  }}

  function applyCorrection(id, dx, dy) {{
    const s = state[id];
    if (s.dragging) return; // never override the hand
    s.x += dx; s.y += dy;
    els[id].style.left = s.x + 'px';
    els[id].style.top = s.y + 'px';
  }}

  function applySpring(id, fx, fy) {{
    const s = state[id];
    if (s.dragging) return; // the grabbed card is never pulled by tension
    s.vx = (s.vx + fx) * (1 - physics.tether_damping * 0.01);
    s.vy = (s.vy + fy) * (1 - physics.tether_damping * 0.01);
    s.x += s.vx; s.y += s.vy;
    els[id].style.left = s.x + 'px';
    els[id].style.top = s.y + 'px';
  }}

  requestAnimationFrame(physicsTick);

  window.addEventListener('keydown', ev => {{
    if (ev.key === 'i') {{
      inspecting = !inspecting;
      document.querySelectorAll('.region').forEach(r => r.classList.toggle('inspect', inspecting));
    }}
  }});
}})();
</script>
</body>
</html>
"""


def build_surface_html(output_path: Path | None = None) -> Path:
    objects = load_mock_feed()
    physics = json.loads(PHYSICS_CONFIG_PATH.read_text(encoding="utf-8"))
    edges = edges_from_objects(objects)

    data = {
        "regions": {key: rect.as_dict() for key, rect in REGION_RECTS.items()},
        "offGrain": list(OFF_GRAIN_KEYS),
        "physics": physics,
        "gateSeamX": gate_seam_x(),
        "strings": {
            **{f"region.{key}": get_string(f"region.{key}") for key in ALL_REGION_KEYS},
            "disclosure.proposed-thread": get_string("disclosure.proposed-thread"),
            "link.type.coherent-tension": get_string("link.type.coherent-tension"),
            "link.type.derived-from": get_string("link.type.derived-from"),
        },
        "objects": [
            {
                "id": o.id,
                "region": o.region,
                "position": o.position,
                "content": o.content,
                "links": [{"type": l.type, "target": l.target, "state": l.state} for l in o.links],
            }
            for o in objects
        ],
        "edges": [
            {"a": e.a, "b": e.b, "type": e.type, "state": e.state, "isStrut": is_strut(e)}
            for e in edges
        ],
    }

    html = HTML_TEMPLATE.format(
        canvas_w=CANVAS_W,
        canvas_h=CANVAS_H,
        data_json=json.dumps(data),
    )

    out = output_path or OUTPUT_PATH
    out.write_text(html, encoding="utf-8")
    return out


if __name__ == "__main__":
    path = build_surface_html()
    print(f"wrote {path}")
