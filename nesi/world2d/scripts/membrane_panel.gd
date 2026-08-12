class_name MembranePanel
extends Station
## THE MEMBRANE — physics: tension.
##
## A sheet stretched across three anchors, one per spire. Pull the sheet with
## your hand and a well forms under the pull; water dropped on it rolls into the
## well and leaves by whichever anchor the well has been drawn toward.
##
## Tension here is OBEYED, not simulated. There is no solver — the sheet's shape
## is a rule: depth falls off with distance from the pull, and strain is the
## pull's reach. That is the whole of it, and it is the standing assumption of
## THE_FLOOR_2D rather than a decision this station makes.
##
## The fail state is the tear. Pull past what the sheet will take and it opens;
## a torn membrane holds nothing, so anything dropped on it goes straight down
## to the deep. It closes again on its own, in its own time, and nothing asks
## you to wait.

const REACH := 150.0        ## how far the pull can travel before it opens
const RELAX := 7.0          ## seconds a tear takes to close

var pull := Vector2.ZERO
var _dragging := false
var torn := 0.0             ## seconds of tear left


func station_title() -> String: return "THE MEMBRANE"
func station_under() -> String: return "pull the sheet · water rolls into the well"
func physics() -> String: return "tension"


## The pull and the tear outlive the panel and the program — law 12. A sheet
## torn open is found torn open, with the same time left in it. Law 8 holds:
## `torn` counts down only in `act_process`, so a tear does not close while the
## station is shut or the program is not running. It waits.
func act_ready() -> void:
	var data := Store.station_load("membrane")
	var loaded_pull = data.get("pull", [])
	if typeof(loaded_pull) == TYPE_ARRAY and loaded_pull.size() >= 2:
		pull = Vector2(float(loaded_pull[0]), float(loaded_pull[1]))
	torn = float(data.get("torn", 0.0))


func _save() -> void:
	Store.station_save("membrane", {"pull": [pull.x, pull.y], "torn": torn})


func _centre() -> Vector2:
	return ACT.position + ACT.size * 0.5


func _anchor(i: int) -> Vector2:
	var a := -PI / 2.0 + TAU * float(i) / 3.0
	return _centre() + Vector2(cos(a), sin(a)) * 150.0


func act_process(delta: float) -> void:
	if torn > 0.0:
		torn = maxf(torn - delta, 0.0)
		if torn == 0.0:
			pull = Vector2.ZERO
			# a tear that has closed while you watched must not be found open
			# again on the next opening
			_save()
		queue_redraw()


func act_input(event: InputEvent) -> bool:
	if event is InputEventMouseButton and event.button_index == MOUSE_BUTTON_LEFT:
		if event.pressed and held.is_empty() and ACT.has_point(event.position):
			_dragging = true
			_pull_to(event.position)
			return true
		if not event.pressed:
			if _dragging:
				_save()          # the sheet holds where the hand let go of it
			_dragging = false
	elif event is InputEventMouseMotion and _dragging:
		_pull_to(event.position)
		return true
	return false


func _pull_to(p: Vector2) -> void:
	pull = p - _centre()
	if pull.length() > REACH * 1.45:
		pull = pull.normalized() * REACH * 1.45
	if pull.length() > REACH and torn == 0.0:
		torn = RELAX
		# the tear is put down the instant it opens, so a kill cannot heal it
		_save()
	queue_redraw()


## The anchor the well has been drawn toward. A sheet at rest has its well in
## the middle, touching no anchor, and sends nothing anywhere.
func act_spire() -> int:
	if torn > 0.0 or pull.length() < 34.0:
		return -1
	var best := -1
	var best_d := 1e9
	for i in 3:
		var d := (_centre() + pull).distance_to(_anchor(i))
		if d < best_d:
			best_d = d
			best = i
	return best


func act_fails() -> bool:
	return torn > 0.0


func act_draw() -> void:
	var c := _centre()
	var f := font()
	var well := c + pull
	var strain: float = clampf(pull.length() / REACH, 0.0, 1.6)

	# the sheet, as a grid pulled toward the well. The displacement is the rule,
	# not a simulation: it falls off with distance and nothing iterates.
	var cols := 15
	var rows := 13
	var w := ACT.size.x - 40.0
	var h := ACT.size.y - 74.0
	var o := ACT.position + Vector2(20, 54)
	var col := Look.LINE_SOFT if torn == 0.0 else Color(0.42, 0.26, 0.24)
	for r in rows:
		var line := PackedVector2Array()
		for cx in cols:
			line.append(_sheet_point(o, w, h, cols, rows, cx, r, well, strain))
		draw_polyline(line, col, 1.0, true)
	for cx in cols:
		var line2 := PackedVector2Array()
		for r in rows:
			line2.append(_sheet_point(o, w, h, cols, rows, cx, r, well, strain))
		draw_polyline(line2, col, 1.0, true)

	# the well itself
	if torn == 0.0 and pull.length() > 6.0:
		var wl := Look.WATER
		wl.a = 0.16 + 0.18 * minf(strain, 1.0)
		draw_circle(well, 20.0 + 26.0 * minf(strain, 1.0), wl)
		draw_arc(well, 20.0 + 26.0 * minf(strain, 1.0), 0, TAU, 32, Look.WATER, 1.4, true)

	# the three anchors
	var lit := act_spire()
	for i in 3:
		var a := _anchor(i)
		draw_circle(a, 6.0, Look.WATER if i == lit else Look.LINE)
		draw_spire_mark(a + (a - c).normalized() * 30.0, i, 0.62)

	if torn > 0.0:
		# the tear. It is drawn as an opening, and nothing counts down beside it.
		var t := Look.SILT
		t.a = 0.30 + 0.45 * (torn / RELAX)
		var rip := PackedVector2Array()
		for k in 9:
			var u := float(k) / 8.0
			var q := c.lerp(c + pull, u) + Vector2(sin(u * 12.0) * 9.0, 0)
			q.y = clampf(q.y, ACT.position.y + 56.0, ACT.end.y - 30.0)
			rip.append(q)
		draw_polyline(rip, Color(0.72, 0.42, 0.34, 0.85), 3.0, true)
		draw_circle(c + pull * 0.5, 16.0 * (torn / RELAX), t)
		draw_string(f, ACT.position + Vector2(16, ACT.size.y - 16),
				"the sheet is open — it holds nothing", HORIZONTAL_ALIGNMENT_LEFT, -1, 12,
				Color(0.78, 0.52, 0.44))

	draw_string(f, ACT.position + Vector2(14, 24), "drag to pull the sheet",
			HORIZONTAL_ALIGNMENT_LEFT, -1, 11, Color(0.58, 0.61, 0.66))


func _sheet_point(o: Vector2, w: float, h: float, cols: int, rows: int,
		cx: int, r: int, well: Vector2, strain: float) -> Vector2:
	var p := o + Vector2(w * float(cx) / float(cols - 1), h * float(r) / float(rows - 1))
	if torn > 0.0:
		return p
	var d := p.distance_to(well)
	var fall: float = exp(-d / 78.0)
	return p + (well - p).normalized() * fall * 26.0 * minf(strain, 1.2)
