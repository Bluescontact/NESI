class_name WorldView
extends Control
## The lower field — the world, seen through the glass.
##
## One equilateral triangle, point up, with a point at its centre. Three lines
## from centre to the vertices make three regions. Each region's outer edge is a
## spire; each spire has a dam partway down; below each dam, inside the region,
## is that spire's ground; a river runs from each ground to the lake at the
## centre. Below the lake, off the bottom of the screen, is the deep — law 9,
## it never renders, and there is no code here that draws it.

signal dam_clicked(spire: int)

const DESCENT := 3.4      ## seconds head → dam. Slow, so the head is seen.
const RUNOUT := 2.2       ## seconds dam → ground

var _t := 0.0


func _ready() -> void:
	Store.changed.connect(queue_redraw)
	set_anchors_preset(Control.PRESET_FULL_RECT)
	# A Control draws outside its rect but is only HIT inside it. The anchors
	# above resolve a frame later, so the size is stated here as well —
	# without it the surface renders perfectly and receives no input at all.
	position = Vector2.ZERO
	size = Vector2(Look.W, Look.H)
	mouse_filter = Control.MOUSE_FILTER_PASS


func _process(delta: float) -> void:
	_t += delta
	var moved := false
	for i in 3:
		var done := []
		for p in Store.spires[i]:
			var stage := int(p["stage"])
			if stage == Store.HEAD:
				p["t"] = float(p["t"]) + delta / DESCENT * Look.fraction_fall(p["kind"])
				if float(p["t"]) >= 1.0:
					p["stage"] = Store.DAM
					p["t"] = 0.0
				moved = true
			elif stage == -1:
				p["t"] = float(p["t"]) + delta / RUNOUT * Look.fraction_fall(p["kind"])
				if float(p["t"]) >= 1.0:
					done.append(p)
				moved = true
		for p in done:
			Store.spires[i].erase(p)
			Store.arrive_at_ground(i, p["kind"])
	if moved:
		queue_redraw()


func _gui_input(event: InputEvent) -> void:
	if event is InputEventMouseButton and event.pressed and event.button_index == MOUSE_BUTTON_LEFT:
		for i in 3:
			if Store.held_at_dam(i) > 0 and event.position.distance_to(Look.spire_dam(i)) < 26.0:
				dam_clicked.emit(i)
				accept_event()
				return


func _draw() -> void:
	var c := Look.centre()

	# the net — the unfolded cuboctahedron the world sits within, read from the
	# store and drawn first, beneath everything. Faces are told apart by shape
	# (triangle / square) before tint, law 10; the seam join is the one warmer
	# fold. No labels, no numbers.
	for face in Look.net_face_arr():
		var pts: PackedVector2Array = face["pts"]
		var body := Look.STONE
		body.a = 0.30 if face["half"] == "A" else 0.42
		draw_colored_polygon(pts, body)
		var rim := Look.LINE_SOFT
		rim.a = 0.55
		var arr := PackedVector2Array(pts)
		arr.append(pts[0])
		draw_polyline(arr, rim, 1.2, true)
	var seam: Array = Look.net_seam()
	if seam.size() == 2:
		# the shared fold between the two joined faces — the edge both carry
		for i in seam[0].size():
			var a: Vector2 = seam[0][i]
			var b: Vector2 = seam[0][(i + 1) % seam[0].size()]
			for j in seam[1].size():
				var q: Vector2 = seam[1][j]
				var r: Vector2 = seam[1][(j + 1) % seam[1].size()]
				if (a.distance_to(r) < 0.5 and b.distance_to(q) < 0.5) \
						or (a.distance_to(q) < 0.5 and b.distance_to(r) < 0.5):
					var warm := Look.WARM
					warm.a = 0.5
					draw_line(a, b, warm, 2.6, true)

	# the three regions, each a flat projection of one inner face
	for i in 3:
		var fill := Color(
			Look.STONE.r * (0.82 + 0.10 * i),
			Look.STONE.g * (0.82 + 0.10 * i),
			Look.STONE.b * (0.82 + 0.10 * i), 1.0)
		draw_colored_polygon(Look.region_points(i), fill)

	# what each ground has received — the region takes on the colour of silt
	for i in 3:
		var g: float = Store.grounds[i]
		if g > 0.001:
			var silt := Look.SILT
			silt.a = 0.60 * g
			draw_colored_polygon(Look.region_points(i), silt)

	# the three centre-to-vertex lines
	for v in [Look.APEX, Look.LEFT, Look.RIGHT]:
		draw_line(c, v, Look.LINE_SOFT, 1.6, true)

	# the rivers — each ground inward to the lake
	for i in 3:
		draw_line(Look.ground_at(i), c, Color(Look.LAKE.r, Look.LAKE.g, Look.LAKE.b, 0.45), 2.4, true)

	# the three spires — the outer edges
	for i in 3:
		var a: Vector2 = Look.SPIRE_EDGES[i][0]
		var b: Vector2 = Look.SPIRE_EDGES[i][1]
		draw_line(a, b, Look.LINE, 5.0, true)
		draw_line(a, b, Color(Look.WATER.r, Look.WATER.g, Look.WATER.b, 0.16), 11.0, true)

	# the lake at the centre
	var lake_c := Look.LAKE
	lake_c.a = 0.35 + 0.5 * Store.lake
	draw_circle(c, 15.0 + 16.0 * Store.lake, lake_c)
	draw_arc(c, 15.0 + 16.0 * Store.lake, 0, TAU, 40, Look.LINE, 1.4, true)

	# the dams
	for i in 3:
		_draw_dam(i)

	# the ground itself — a triangular deposit below the dam, inside the region,
	# thickening only from what has arrived, and never labelled
	for i in 3:
		_draw_ground(i)

	# the heads, and everything travelling
	for i in 3:
		_draw_head(i)
		_draw_parcels(i)


func _draw_dam(i: int) -> void:
	var d := Look.spire_dam(i)
	var a: Vector2 = Look.SPIRE_EDGES[i][0]
	var b: Vector2 = Look.SPIRE_EDGES[i][1]
	var n := (b - a).normalized().orthogonal()
	var held := Store.held_at_dam(i)
	var col := Look.LINE if held == 0 else Look.WARM
	draw_line(d - n * 13.0, d + n * 13.0, col, 3.4, true)
	if held > 0:
		# A held dam is lawful and is not nagged at. It is simply lit, and the
		# ring is the affordance that it can be released — never a count.
		var glow := Look.WARM
		glow.a = 0.30 + 0.16 * sin(_t * 2.0)
		draw_arc(d, 19.0, 0, TAU, 28, glow, 2.0, true)


func _draw_ground(i: int) -> void:
	var gp := Look.ground_at(i)
	var g: float = Store.grounds[i]
	var r := 9.0 + 38.0 * g
	# pointing back up the spire it came from, so each ground faces its own dam
	var up := (Look.spire_dam(i) - gp).normalized()
	var side := up.orthogonal()
	var pts := PackedVector2Array([
		gp + up * r,
		gp - up * r * 0.55 + side * r * 0.92,
		gp - up * r * 0.55 - side * r * 0.92,
	])
	var body := Look.SILT
	body.a = 0.42 + 0.50 * g
	draw_colored_polygon(pts, body)
	var edge := Look.SILT
	edge.a = 0.75
	draw_polyline(PackedVector2Array([pts[0], pts[1], pts[2], pts[0]]), edge, 1.2, true)


func _draw_head(i: int) -> void:
	var h := Look.spire_head(i)
	var waiting := 0
	for p in Store.spires[i]:
		if int(p["stage"]) == Store.HEAD:
			waiting += 1
	var col := Look.LINE
	if waiting > 0:
		col = Look.WATER
	draw_arc(h, 9.0, 0, TAU, 24, col, 2.0, true)
	if waiting > 0:
		var pulse := Look.WATER
		pulse.a = 0.22 + 0.14 * sin(_t * 3.0)
		draw_circle(h, 15.0, pulse)


func _draw_parcels(i: int) -> void:
	var head := Look.spire_head(i)
	var dam := Look.spire_dam(i)
	var ground := Look.ground_at(i)
	var slot := 0
	for p in Store.spires[i]:
		var stage := int(p["stage"])
		var kind: String = p["kind"]
		var pos: Vector2
		var alpha := 1.0
		match stage:
			Store.HEAD:
				pos = head.lerp(dam, float(p["t"]))
			Store.DAM:
				# resting at the dam, fanned so several are legible without a count
				var n := (dam - head).normalized().orthogonal()
				pos = dam - (dam - head).normalized() * 15.0 + n * (float(slot) - 1.0) * 11.0
				slot += 1
			_:
				var t := float(p["t"])
				pos = dam.lerp(ground, t)
				if kind == "bedload" and t > 0.72:
					# it goes to the deep. It fades out of the world rather than
					# being drawn anywhere below it. Law 9.
					alpha = 1.0 - (t - 0.72) / 0.28
				elif kind == "dissolved":
					alpha = 0.85 - 0.55 * t
		# the wander is part of how the fractions are told apart
		var w := Look.fraction_wander(kind)
		if w > 0.0 and stage != Store.DAM:
			pos += Vector2(sin(_t * 1.7 + float(slot) + float(i)) * w, 0)
		Look.draw_fraction(self, kind, pos, 5.5, alpha)
