class_name HeliostatPanel
extends Station
## THE HELIOSTAT TABLE — physics: light.
##
## Light rises from the world below and strikes a mirror on the table. Turn the
## mirror by hand and the beam falls on one of three receivers, one per spire.
## Water given to the station rides the beam to whichever receiver is lit.
##
## The fail state is burn-too-far. A receiver held under the beam keeps taking
## heat, and past what it can carry it closes — scorched, and the beam passes
## through it doing nothing. Nothing counts the heat down for you: the receiver
## reddens and its aperture narrows, and reading that in time is the whole skill
## of the station.
##
## HOW LONG A SCORCH LASTS: IT OUTLIVES THE PANEL AND IT OUTLIVES THE PROGRAM.
## A receiver burnt shut is something the world lost, and law 12 — quitting
## loses nothing — governs it. Until 2026-08-09 `scorched` and `heat` were
## variables on this instance and `main.gd` frees the panel on esc, so closing
## the station un-burnt every receiver; that was the law being broken, not a
## design. They now go to `Store.stations` the moment a receiver shuts, and are
## read back when the station is opened. Law 8 is untouched: heat does not
## decay while the panel is closed and no receiver reopens on its own. It is
## frozen where it was left.

const MIRROR_R := 34.0
const BURN_AT := 3.4        ## seconds of continuous beam a receiver can carry

var aim := -PI / 2.0
var _dragging := false
var heat := [0.0, 0.0, 0.0]
var scorched := [false, false, false]


func station_title() -> String: return "THE HELIOSTAT TABLE"
func station_under() -> String: return "turn the mirror · the beam picks the spire"
func physics() -> String: return "light"


func act_ready() -> void:
	var data := Store.station_load("heliostat")
	if data.is_empty():
		return
	aim = float(data.get("aim", aim))
	var loaded_heat = data.get("heat", [])
	var loaded_scorched = data.get("scorched", [])
	for i in 3:
		if typeof(loaded_heat) == TYPE_ARRAY and i < loaded_heat.size():
			heat[i] = float(loaded_heat[i])
		if typeof(loaded_scorched) == TYPE_ARRAY and i < loaded_scorched.size():
			scorched[i] = bool(loaded_scorched[i])


func _save() -> void:
	Store.station_save("heliostat", {
		"aim": aim,
		"heat": [heat[0], heat[1], heat[2]],
		"scorched": [scorched[0], scorched[1], scorched[2]],
	})


func _centre() -> Vector2:
	return ACT.position + Vector2(ACT.size.x * 0.5, ACT.size.y * 0.54)


func _receiver(i: int) -> Vector2:
	var a := -PI / 2.0 + TAU * float(i) / 3.0 - PI / 6.0
	return _centre() + Vector2(cos(a), sin(a)) * 126.0


func act_process(delta: float) -> void:
	var lit := act_spire()
	for i in 3:
		if i == lit and not scorched[i]:
			heat[i] = heat[i] + delta
			if heat[i] >= BURN_AT and not scorched[i]:
				scorched[i] = true
				# the one consequence this station has. It is put down the
				# instant it happens, so a kill mid-session cannot un-burn it.
				_save()
		elif i != lit:
			heat[i] = maxf(heat[i] - delta * 0.7, 0.0)
	queue_redraw()


func act_input(event: InputEvent) -> bool:
	if event is InputEventMouseButton and event.button_index == MOUSE_BUTTON_LEFT:
		if event.pressed and held.is_empty() and ACT.has_point(event.position):
			_dragging = true
			aim = (event.position - _centre()).angle()
			return true
		if not event.pressed:
			if _dragging:
				_save()          # the mirror is left where the hand let go of it
			_dragging = false
	elif event is InputEventMouseMotion and _dragging:
		aim = (event.position - _centre()).angle()
		return true
	return false


## Whichever receiver the beam is on, unless it has been scorched shut.
func act_spire() -> int:
	var dir := Vector2(cos(aim), sin(aim))
	for i in 3:
		var to := (_receiver(i) - _centre()).normalized()
		if dir.dot(to) > 0.955:
			return -1 if scorched[i] else i
	return -1


func act_fails() -> bool:
	# a beam on a shut receiver, or on nothing at all, is not a fail — it simply
	# does not carry, and the water stays in the tray. The station has no way to
	# destroy what it is given.
	return false


func act_draw() -> void:
	var c := _centre()
	var f := font()
	var dir := Vector2(cos(aim), sin(aim))
	var lit := act_spire()

	# the light coming up through the glass from the world below
	for k in 7:
		var up := Look.WARM
		up.a = 0.05 * (1.0 - float(k) / 7.0) * (0.35 + 0.65 * Store.light())
		draw_rect(Rect2(ACT.position.x + 1, ACT.end.y - 12.0 - float(k) * 13.0,
				ACT.size.x - 2, 13.0), up)

	# the beam, from the mirror to wherever it is pointed
	var far := c + dir * 205.0
	var beam := Look.WARM
	beam.a = 0.10 + 0.16 * Store.light()
	draw_line(c, far, beam, 13.0, true)
	beam.a = 0.42 + 0.30 * Store.light()
	draw_line(c, far, beam, 2.2, true)

	# the three receivers
	for i in 3:
		var r := _receiver(i)
		var h: float = clampf(heat[i] / BURN_AT, 0.0, 1.0)
		if scorched[i]:
			# shut. Drawn as a closed, blackened aperture — never a message.
			draw_circle(r, 15.0, Color(0.13, 0.10, 0.09))
			draw_arc(r, 15.0, 0, TAU, 26, Color(0.55, 0.34, 0.28), 2.4, true)
			var x := Color(0.72, 0.44, 0.36)
			draw_line(r + Vector2(-8, -8), r + Vector2(8, 8), x, 2.4, true)
			draw_line(r + Vector2(8, -8), r + Vector2(-8, 8), x, 2.4, true)
		else:
			# the aperture narrows and reddens as it takes heat — a quality, and
			# never a bar or a number (law 2)
			var glow := Color(0.62, 0.66, 0.70).lerp(Color(0.86, 0.34, 0.20), h)
			draw_arc(r, 16.0 - 5.0 * h, 0, TAU, 26, glow, 2.0 + 1.6 * h, true)
			if i == lit:
				var hot := glow
				hot.a = 0.22 + 0.34 * h
				draw_circle(r, 26.0 - 6.0 * h, hot)
		draw_spire_mark(r + (r - c).normalized() * 40.0, i, 0.58)

	# the mirror itself
	var n := dir.orthogonal()
	draw_line(c - n * MIRROR_R, c + n * MIRROR_R, Color(0.86, 0.89, 0.94), 5.0, true)
	draw_line(c - n * MIRROR_R, c + n * MIRROR_R, Look.WARM, 2.0, true)
	draw_circle(c, 5.0, Look.LINE)

	draw_string(f, ACT.position + Vector2(14, 24), "drag to turn the mirror",
			HORIZONTAL_ALIGNMENT_LEFT, -1, 11, Color(0.58, 0.61, 0.66))
	var shut := 0
	for i in 3:
		if scorched[i]:
			shut += 1
	if shut > 0:
		draw_string(f, ACT.position + Vector2(16, ACT.size.y - 16),
				"burnt too far — that one is shut", HORIZONTAL_ALIGNMENT_LEFT, -1, 12,
				Color(0.80, 0.48, 0.38))
