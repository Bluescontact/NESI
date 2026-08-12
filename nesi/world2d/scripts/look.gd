class_name Look
extends RefCounted
## The one place colour, measure and geometry are decided.
##
## Law 10 â€” colour is never the only carrier of a distinction. Every fraction
## here has a SHAPE and a BEHAVIOUR before it has a colour, and the colour is
## redundant to both. `fraction_shape` and `fraction_fall` are the carriers;
## `fraction_colour` is the echo.

# â”€â”€ the two zones â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const W := 1280.0
const H := 800.0
const ROOM_H := 188.0        ## the upper band
const GLASS_TOP := 188.0
const GLASS_H := 16.0
const WORLD_TOP := 204.0

# â”€â”€ the world triangle: point up, a point at its centre â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const APEX := Vector2(640, 262)
const LEFT := Vector2(350, 758)
const RIGHT := Vector2(930, 758)

## Counter-clockwise walk. Each region's outer edge is a spire, and each spire's
## head is the vertex the walk starts from â€” three heads, three distinct places.
const SPIRE_EDGES := [
	[APEX, LEFT],    ## spire 0 â€” the left edge
	[LEFT, RIGHT],   ## spire 1 â€” the base
	[RIGHT, APEX],   ## spire 2 â€” the right edge
]
const DAM_AT := 0.46         ## how far down the spire the dam sits

# â”€â”€ colour â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const INK := Color(0.055, 0.06, 0.075)
const STONE := Color(0.155, 0.16, 0.185)
const STONE_LIT := Color(0.62, 0.60, 0.55)
const LINE := Color(0.42, 0.45, 0.52)
const LINE_SOFT := Color(0.26, 0.28, 0.34)
const GLASS := Color(0.55, 0.72, 0.80)
const WATER := Color(0.50, 0.74, 0.86)
const LAKE := Color(0.30, 0.52, 0.66)
const SILT := Color(0.46, 0.39, 0.30)
const PAPER := Color(0.93, 0.91, 0.86)
const WARM := Color(0.83, 0.74, 0.55)


static func centre() -> Vector2:
	return (APEX + LEFT + RIGHT) / 3.0


# ── the net — the unfolded cuboctahedron, read from the store ─────────────────
## data/net.json is the persisted run of nesi/net/make_net.py (session 87c5c4fc
## geometry, sited on Kevin's mark 2026-08-11): the 14 faces of the two-cupola
## net in exact plane coordinates, with the seam join edge. Loaded once, fitted
## to the world band below the glass. ABSENT FILE = the world draws without the
## net, silently and honestly, and says so once in the log — waters.gd's posture.
static var _net_face_arr: Array = []
static var _net_seam: Array = []
static var _net_loaded := false

static func net_face_arr() -> Array:
	if not _net_loaded:
		_load_net()
	return _net_face_arr

static func net_seam() -> Array:
	if not _net_loaded:
		_load_net()
	return _net_seam

static func _load_net() -> void:
	_net_loaded = true
	var f := FileAccess.open("res://data/net.json", FileAccess.READ)
	if f == null:
		print("[look] no data/net.json — the world draws without the net")
		return
	var parsed: Variant = JSON.parse_string(f.get_as_text())
	if typeof(parsed) != TYPE_DICTIONARY or not parsed.has("faces"):
		print("[look] data/net.json unreadable — the world draws without the net")
		return
	var lo := Vector2(INF, INF)
	var hi := Vector2(-INF, -INF)
	for face in parsed["faces"]:
		for p in face["polygon_2d"]:
			lo = lo.min(Vector2(p[0], p[1]))
			hi = hi.max(Vector2(p[0], p[1]))
	var sz := hi - lo
	if sz.x <= 0.0 or sz.y <= 0.0:
		return
	# fit into the band below the glass, centred, with a margin
	var band_top := WORLD_TOP + 14.0
	var band := Rect2(Vector2(24.0, band_top), Vector2(W - 48.0, H - band_top - 14.0))
	var s: float = min(band.size.x / sz.x, band.size.y / sz.y)
	var o := band.position + (band.size - sz * s) * 0.5 - lo * s
	var landed := {}
	for face in parsed["faces"]:
		var pts := PackedVector2Array()
		for p in face["polygon_2d"]:
			pts.append(Vector2(p[0], p[1]) * s + o)
		_net_face_arr.append({"pts": pts, "kind": face["kind"], "half": face["cupola"]})
		landed[int(face["id"])] = pts
	# the seam join edge — the one fold that holds the two halves together
	if parsed.has("seam_join_edge") and parsed["seam_join_edge"].size() == 2:
		var ia := int(parsed["seam_join_edge"][0])
		var ib := int(parsed["seam_join_edge"][1])
		if landed.has(ia) and landed.has(ib):
			_net_seam = [landed[ia], landed[ib]]
	print("[look] net loaded — ", _net_face_arr.size(), " faces from data/net.json")



static func spire_head(i: int) -> Vector2:
	return SPIRE_EDGES[i][0]


static func spire_dam(i: int) -> Vector2:
	return SPIRE_EDGES[i][0].lerp(SPIRE_EDGES[i][1], DAM_AT)


## The ground sits inside the region, below the dam â€” between the dam and the
## centre, nearer the edge than the middle.
static func ground_at(i: int) -> Vector2:
	return spire_dam(i).lerp(centre(), 0.42)


static func region_points(i: int) -> PackedVector2Array:
	return PackedVector2Array([SPIRE_EDGES[i][0], SPIRE_EDGES[i][1], centre()])


# â”€â”€ the three fractions â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
# Behaviour first. Shape second. Colour last and redundant to both.

## How fast it falls, and how straight. Bedload sinks fast and true; suspended
## hangs and wanders; dissolved slips through quickest of all but leaves nothing.
static func fraction_fall(kind: String) -> float:
	match kind:
		"bedload": return 1.9
		"suspended": return 0.55
		_: return 1.15


static func fraction_wander(kind: String) -> float:
	match kind:
		"suspended": return 7.0
		"dissolved": return 2.0
		_: return 0.0


static func fraction_colour(kind: String) -> Color:
	match kind:
		"bedload": return Color(0.58, 0.50, 0.40)
		"suspended": return Color(0.66, 0.72, 0.70)
		_: return Color(0.52, 0.78, 0.88)


## The shape is a carrier, not decoration.
##   bedload    a hard diamond â€” angular, filled, opaque
##   suspended  a soft disc â€” filled, cloudy, no outline
##   dissolved  a ring â€” outline only, nothing inside it to see
static func draw_fraction(c: CanvasItem, kind: String, at: Vector2, r: float, a: float = 1.0) -> void:
	var col := fraction_colour(kind)
	col.a = a
	match kind:
		"bedload":
			var pts := PackedVector2Array([
				at + Vector2(0, -r), at + Vector2(r * 0.78, 0),
				at + Vector2(0, r), at + Vector2(-r * 0.78, 0),
			])
			c.draw_colored_polygon(pts, col)
		"suspended":
			var soft := col
			soft.a = a * 0.35
			c.draw_circle(at, r * 1.55, soft)
			c.draw_circle(at, r * 0.85, col)
		_:
			c.draw_arc(at, r, 0, TAU, 24, col, 1.6, true)


static func fraction_name(kind: String) -> String:
	match kind:
		"bedload": return "BEDLOAD"
		"suspended": return "SUSPENDED"
		_: return "DISSOLVED"


## What each one does when it lands. Said in words at the filters, so the
## distinction never rests on colour alone even for a reader who cannot see it.
static func fraction_says(kind: String) -> String:
	match kind:
		"bedload": return "sinks fast Â· goes to the deep"
		"suspended": return "hangs Â· becomes ground"
		_: return "passes through Â· unseen"
