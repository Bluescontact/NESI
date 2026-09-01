"""ENGINE 1 — the world-from-substrate engine (2026-07-31, the keeper's mark).

The world is never stored. Every call to world_state() re-derives it from the
real ledgers: the schema gives the bones, the corpus gives the flesh.
  - density        <- MARKS_LOG.jsonl, classified per point
  - landmarks      <- nexi_data.json: any body >= N folds name as carrier
  - encounters     <- nexi_data.json still_open, seated deterministically on roads
  - gates          <- OPEN_GATES.jsonl, standing at the Gate House
  - offers         <- membrane_outbox/, stacked at the membrane
  - road brightness<- walked density of each road's two endpoints
The engine reflects; it never rates (the recognition law). Nothing here writes.
"""
import os, json, re, hashlib

BASE = os.path.dirname(os.path.abspath(__file__))
SCHEMA_PATH = os.path.join(BASE, "world_schema.json")

def load_schema():
    with open(SCHEMA_PATH, encoding="utf-8") as f:
        return json.load(f)

def _seat(text, ax, ay, bx, by):
    """Deterministically seat an encounter along a road (no randomness — stable across loads)."""
    h = int(hashlib.sha1(text.encode("utf-8")).hexdigest(), 16)
    t = 0.25 + (h % 1000) / 2000.0          # 0.25..0.75 along the road
    off = ((h >> 16) % 21) - 10             # small perpendicular scatter
    return round(ax + (bx - ax) * t + off), round(ay + (by - ay) * t + off)

def landmarks(nexi, schema):
    """A body cited as carrier by >= N folded bodies has proven it holds load — it stands on the map."""
    min_cites = schema["rules"]["landmark_min_fold_citations"]
    cites, point_of = {}, {}
    for point, d in nexi["points"].items():
        for k in d["kept"]:
            point_of[k["name"]] = point
        for f in d["folded"]:
            m = re.search(r"([A-Za-z0-9_\-]+\.md)", f.get("into", ""))
            if m:
                cites[m.group(1)] = cites.get(m.group(1), 0) + 1
    out = []
    for name, n in sorted(cites.items(), key=lambda kv: -kv[1]):
        if n < min_cites: continue
        point = point_of.get(name, "field")
        p = schema["places"][point]
        h = int(hashlib.sha1(name.encode()).hexdigest(), 16)
        ang, dist = (h % 628) / 100.0, 52 + (h >> 8) % 30
        out.append({"name": name.replace(".md", "").replace("_", " "),
                    "file": name, "point": point, "carries": n,
                    "x": round(p["x"] + dist * __import__("math").cos(ang)),
                    "y": round(p["y"] + dist * 0.6 * __import__("math").sin(ang))})
    return out

def encounters(nexi, schema):
    """Every still-open thread sits on a road, seated by hash — the field's own unfinished business, met while walking."""
    roads = list(schema["roads"].keys())
    out = []
    for i, text in enumerate(nexi.get("still_open", [])):
        pair = roads[int(hashlib.sha1(text.encode("utf-8")).hexdigest(), 16) % len(roads)]
        a, b = pair.split(",")
        A, B = schema["places"][a], schema["places"][b]
        x, y = _seat(text, A["x"], A["y"], B["x"], B["y"])
        out.append({"text": text, "road": schema["roads"][pair], "x": x, "y": y})
    return out

def road_brightness(density, schema):
    """A road brightens with the walked density of its endpoints — reflection, not reward."""
    peak = max(1, max(density.get(p, 0) for pair in schema["roads"] for p in pair.split(",")))
    out = {}
    for pair in schema["roads"]:
        a, b = pair.split(",")
        out[pair] = round(min(1.0, (density.get(a, 0) + density.get(b, 0)) / (2.0 * peak)), 2)
    return out

def world_state(nexi, density, gates, offers):
    schema = load_schema()
    return {
        "places": schema["places"],
        "roads": schema["roads"],
        "density": density,
        "landmarks": landmarks(nexi, schema),
        "encounters": encounters(nexi, schema),
        "brightness": road_brightness(density, schema),
        "gates": gates,
        "offers": offers,
    }
