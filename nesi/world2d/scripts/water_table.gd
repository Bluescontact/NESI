class_name WaterTablePanel
extends Station
## THE WATER TABLE — physics: water.
##
## A shallow tray with three spouts, one per spire. Water finds its own level,
## so the act is not aiming: it is TILTING. Drag the table's rim and the whole
## surface leans; whichever spout is lowest is the one the water will leave by.
##
## The fail state is the physics being obeyed rather than fought. Tilt past the
## rim and the water does not run to a spout — it slops over the edge and is
## gone to the deep. The table gives no warning line and no permitted-range
## marker; you read the lean, which is what a real table would give you.

const R := 132.0          ## the table's radius on screen
const RIM := 1.0          ## tilt beyond this and it goes over the edge
const SPOUT_ANGLE := [-PI / 2.0, PI / 6.0, PI * 5.0 / 6.0]

var tilt := Vector2.ZERO
var _dragging := false
var _slop := 0.0          ## how recently it slopped over — fades, never counts


func station_title() -> String: return "THE WATER TABLE"
func station_under() -> String: return "lean the table · water leaves by the lowest spout"
func physics() -> String: return "water"


## The lean outlives the panel and the program — law 12. A table left leaning is
## found leaning. `_slop` is not kept: it is a fade, feedback on something that
## already happened, and nothing is owed to it once the screen has shown it.
func act_ready() -> void:
	var data := Store.station_load("water_table")
	var loaded_tilt = data.get("tilt", [])
	if typeof(loaded_tilt) == TYPE_ARRAY and loaded_tilt.size() >= 2:
		tilt = Vector2(float(loaded_tilt[0]), float(loaded_tilt[1]))


func _save() -> void:
	Store.station_save("water_table", {"tilt": [tilt.x, tilt.y]})


func _centre() -> Vector2:
	return ACT.position + ACT.size * 0.5


func act_process(delta: float) -> void:
	if _slop > 0.0:
		_slop = maxf(_slop - delta * 0.8, 0.0)
		queue_redraw()


func act_input(event: InputEvent) -> bool:
	var c := _centre()
	if event is InputEventMouseButton and event.button_index == MOUSE_BUTTON_LEFT:
		if event.pressed and held.is_empty() and event.position.distance_to(c) < R + 26.0:
			_dragging = true
			_lean_to(event.position)
			return true
		if not event.pressed:
			if _dragging:
				_save()          # the table is left leaning where the hand let go
			_dragging = false
	elif event is InputEventMouseMotion and _dragging:
		_lean_to(event.position)
		return true
	return false


func _lean_to(p: Vector2) -> void:
	# the lean is the drag, unclamped — going over the rim has to be possible or
	# the fail state is not a fail state, it is a guard rail
	tilt = (p - _centre()) / R
	if tilt.length() > 1.6:
		tilt = tilt.normalized() * 1.6
	queue_redraw()


## The lowest spout, and only if the table is leaning at all. A level table
## sends nothing anywhere — water sits, which is a lawful state.
func act_spire() -> int:
	if tilt.length() < 0.22:
		return -1
	var best := -1
	var best_dot := -2.0
	for i in 3:
		var dir := Vector2(cos(SPOUT_ANGLE[i]), sin(SPOUT_ANGLE[i]))
		var d := dir.dot(tilt.normalized())
		if d > best_dot:
			best_dot = d
			best = i
	return best


func act_fails() -> bool:
	return tilt.length() > RIM


func act_did_fail() -> void:
	_slop = 1.0


func act_draw() -> void:
	var c := _centre()
	var f := font()

	# the tray, leaning: an ellipse squashed along the tilt axis is what a
	# leaning disc looks like, so the lean is read from the shape, not a label
	var lean := tilt.length()
	var axis := tilt.normalized() if lean > 0.001 else Vector2.RIGHT
	var pts := PackedVector2Array()
	for k in 48:
		var a := TAU * float(k) / 48.0
		var p := Vector2(cos(a), sin(a))
		var along := p.dot(axis)
		# the far rim rises, the near rim drops
		var q := c + p * R + axis * along * lean * 26.0
		q.y += along * lean * 16.0
		pts.append(q)
	draw_colored_polygon(pts, Color(0.10, 0.13, 0.16, 0.92))
	draw_polyline(pts, Look.LINE, 1.6, true)
	pts.append(pts[0])

	# where the water lies on it — pooled downhill, and that is the whole readout
	var pool := c + tilt.normalized() * lean * R * 0.55 if lean > 0.001 else c
	var w := Look.WATER
	w.a = 0.30
	draw_circle(pool, R * (0.62 - 0.22 * minf(lean, 1.0)), w)
	w.a = 0.55
	draw_circle(pool, R * (0.34 - 0.12 * minf(lean, 1.0)), w)

	# the three spouts, one per spire
	var lit := act_spire()
	for i in 3:
		var dir := Vector2(cos(SPOUT_ANGLE[i]), sin(SPOUT_ANGLE[i]))
		var sp := c + dir * (R + 16.0)
		var col := Look.WATER if i == lit else Look.LINE_SOFT
		draw_line(c + dir * (R - 6.0), sp, col, 4.0 if i == lit else 2.0, true)
		draw_spire_mark(sp + dir * 22.0, i, 0.72)

	# the rim, and the hand on it
	if lean > RIM:
		var over := Look.SILT
		over.a = 0.55
		draw_arc(c, R + 6.0, 0, TAU, 56, over, 2.4, true)
	if _slop > 0.0:
		# it went over the edge. This is allowed feedback: a fail state has a
		# destination, unlike setting something down.
		var sl := Look.SILT
		sl.a = 0.55 * _slop
		draw_circle(c + tilt.normalized() * (R + 30.0), 26.0 * _slop, sl)
		draw_string(f, ACT.position + Vector2(16, ACT.size.y - 16),
				"it went over the rim", HORIZONTAL_ALIGNMENT_LEFT, -1, 12,
				Color(Look.SILT.r + 0.25, Look.SILT.g + 0.2, Look.SILT.b + 0.15, _slop))

	draw_string(f, ACT.position + Vector2(14, 24), "drag the table to lean it",
			HORIZONTAL_ALIGNMENT_LEFT, -1, 11, Color(0.58, 0.61, 0.66))
