class_name FiltersPanel
extends Control
## THE FILTERS — the one station whose game is built.
##
## Law 5 — the operator's hand runs the filter. Nothing here sorts, scores,
## classifies or suggests. The three fractions of every charge are laid out
## already separated by their own physics; which one goes where is entirely the
## hand's, and the panel has no opinion about it.
##
## Law 1 — three outputs, and all three are on screen at once, always:
##   send it down a spire (and choose which)
##   drop it to the lake
##   set it down
##
## Law 6 — set-it-down has no destination, no animation and no confirmation.
## The mote leaves the tray and nothing happens. That absence is deliberate and
## is the reason there is no `_flash` or `_toast` anywhere in this file.

signal closed

const PANEL := Rect2(88, 232, 1104, 508)
const TRAY := Rect2(120, 348, 448, 364)
const EXITS_X := 624.0
const EXITS_W := 536.0

var _font: Font
var _grab: Dictionary = {}          ## {charge:int, kind:String} while in hand
var _mouse := Vector2.ZERO
var _hot_target := ""


func _ready() -> void:
	_font = ThemeDB.fallback_font
	set_anchors_preset(Control.PRESET_FULL_RECT)
	# A Control draws outside its rect but is only HIT inside it. The anchors
	# above resolve a frame later, so the size is stated here as well —
	# without it the surface renders perfectly and receives no input at all.
	position = Vector2.ZERO
	size = Vector2(Look.W, Look.H)
	mouse_filter = Control.MOUSE_FILTER_STOP
	Store.changed.connect(queue_redraw)


# ── where things are ──────────────────────────────────────────────────────────

func _motes() -> Array:
	## One entry per fraction still in the tank, in tank order. Recomputed every
	## frame so that taking one cannot leave a stale handle behind.
	var out := []
	var row := 0
	for ci in Store.tank.size():
		var charge: Dictionary = Store.tank[ci]
		var col := 0
		for kind in ["suspended", "dissolved", "bedload"]:
			for _n in int(charge.get(kind, 0)):
				out.append({"charge": ci, "kind": kind})
				col += 1
		row += 1
	# laid out afterwards so a full tank — twelve charges, thirty-six fractions —
	# still fits inside the tray
	for k in out.size():
		out[k]["pos"] = TRAY.position + Vector2(
			34.0 + float(k % 8) * 52.0,
			32.0 + float(k / 8) * 44.0)
	return out


func _exit_rects() -> Dictionary:
	var y := 330.0
	return {
		"spire": Rect2(EXITS_X, y, EXITS_W, 168.0),
		"lake": Rect2(EXITS_X, y + 186.0, EXITS_W, 96.0),
		"down": Rect2(EXITS_X, y + 300.0, EXITS_W, 96.0),
	}


func _spire_rects() -> Array:
	var r: Rect2 = _exit_rects()["spire"]
	var w := (r.size.x - 32.0) / 3.0
	var out := []
	for i in 3:
		out.append(Rect2(r.position.x + 8.0 + float(i) * (w + 8.0), r.position.y + 62.0, w, 88.0))
	return out


# ── the hand ──────────────────────────────────────────────────────────────────

func _gui_input(event: InputEvent) -> void:
	if event is InputEventMouseMotion:
		_mouse = event.position
		_hot_target = _target_at(_mouse)
		queue_redraw()
		return

	if not (event is InputEventMouseButton) or event.button_index != MOUSE_BUTTON_LEFT:
		return

	if event.pressed:
		if not PANEL.has_point(event.position):
			closed.emit()
			return
		for m in _motes():
			if event.position.distance_to(m["pos"]) < 22.0:
				_grab = {"charge": int(m["charge"]), "kind": String(m["kind"])}
				_mouse = event.position
				queue_redraw()
				return
	else:
		if _grab.is_empty():
			return
		var target := _target_at(event.position)
		var ci := int(_grab["charge"])
		var kind := String(_grab["kind"])
		_grab = {}
		match target:
			"spire0": Store.send_to_spire(ci, kind, 0)
			"spire1": Store.send_to_spire(ci, kind, 1)
			"spire2": Store.send_to_spire(ci, kind, 2)
			"lake": Store.drop_to_lake(ci, kind)
			"down": Store.set_it_down(ci, kind)
			_: pass          # released over nothing: it stays in the tray
		queue_redraw()


func _target_at(p: Vector2) -> String:
	var sr := _spire_rects()
	for i in 3:
		if sr[i].has_point(p):
			return "spire%d" % i
	var er := _exit_rects()
	if er["lake"].has_point(p):
		return "lake"
	if er["down"].has_point(p):
		return "down"
	return ""


# ── drawing ───────────────────────────────────────────────────────────────────

func _draw() -> void:
	draw_rect(Rect2(0, Look.WORLD_TOP, Look.W, Look.H - Look.WORLD_TOP), Color(0.03, 0.035, 0.05, 0.72))
	draw_rect(PANEL, Color(0.085, 0.09, 0.115, 0.985))
	draw_rect(PANEL, Look.LINE, false, 1.6)

	draw_string(_font, PANEL.position + Vector2(32, 44), "THE FILTERS",
			HORIZONTAL_ALIGNMENT_LEFT, -1, 20, Look.PAPER)
	draw_string(_font, PANEL.position + Vector2(32, 66), "your hand does the work",
			HORIZONTAL_ALIGNMENT_LEFT, -1, 12, Color(0.62, 0.65, 0.70))
	draw_string(_font, Vector2(PANEL.end.x - 92, PANEL.position.y + 44), "esc",
			HORIZONTAL_ALIGNMENT_LEFT, -1, 13, Color(0.62, 0.65, 0.70))

	_draw_tray()
	_draw_exits()

	if not _grab.is_empty():
		Look.draw_fraction(self, String(_grab["kind"]), _mouse, 9.0, 0.95)


func _draw_tray() -> void:
	draw_rect(TRAY, Color(0, 0, 0, 0.20))
	draw_rect(TRAY, Look.LINE_SOFT, false, 1.0)
	draw_string(_font, TRAY.position + Vector2(2, -14), "WHAT THE TANK IS HOLDING",
			HORIZONTAL_ALIGNMENT_LEFT, -1, 11, Color(0.66, 0.68, 0.73))

	var motes := _motes()
	if motes.is_empty():
		# nothing waiting is a lawful state and is not nagged at
		draw_string(_font, TRAY.position + Vector2(24, 48), "nothing waiting",
				HORIZONTAL_ALIGNMENT_LEFT, -1, 13, Color(0.52, 0.55, 0.60))
		return

	for m in motes:
		var kind := String(m["kind"])
		var p: Vector2 = m["pos"]
		var grabbed := (not _grab.is_empty()
				and int(_grab["charge"]) == int(m["charge"])
				and String(_grab["kind"]) == kind)
		Look.draw_fraction(self, kind, p, 9.0, 0.30 if grabbed else 1.0)
	# the words live in a standing legend now that the motes are too many to
	# label one by one — law 10 is carried there instead of on each mote
	var lg := Vector2(TRAY.position.x + 16, TRAY.end.y - 82)
	draw_line(lg + Vector2(-8, -14), lg + Vector2(TRAY.size.x - 24, -14),
			Color(Look.LINE_SOFT.r, Look.LINE_SOFT.g, Look.LINE_SOFT.b, 0.7), 1.0, true)
	var n := 0
	for kind2 in ["suspended", "dissolved", "bedload"]:
		var lp := lg + Vector2(8, 10 + float(n) * 24.0)
		Look.draw_fraction(self, kind2, lp, 7.0, 1.0)
		draw_string(_font, lp + Vector2(18, 4), Look.fraction_name(kind2),
				HORIZONTAL_ALIGNMENT_LEFT, -1, 10, Color(0.82, 0.84, 0.88, 0.92))
		draw_string(_font, lp + Vector2(112, 4), Look.fraction_says(kind2),
				HORIZONTAL_ALIGNMENT_LEFT, -1, 9, Color(0.58, 0.61, 0.66, 0.88))
		n += 1


func _draw_exits() -> void:
	var er := _exit_rects()

	# ── exit one ──────────────────────────────────────────────────────────────
	var sp: Rect2 = er["spire"]
	_exit_frame(sp, "SEND IT DOWN A SPIRE", "choose which", _hot_target.begins_with("spire"))
	var names := ["THE LEFT EDGE", "THE BASE", "THE RIGHT EDGE"]
	var sr := _spire_rects()
	for i in 3:
		var r: Rect2 = sr[i]
		var hot := _hot_target == "spire%d" % i
		draw_rect(r, Color(0.13, 0.16, 0.20, 0.95) if hot else Color(0.10, 0.11, 0.14, 0.9))
		draw_rect(r, Look.WATER if hot else Look.LINE_SOFT, false, 1.6 if hot else 1.0)
		# a small figure of the triangle with this edge lit — position, not colour
		var c := r.position + Vector2(r.size.x * 0.5, 34)
		var tri := [c + Vector2(0, -18), c + Vector2(-20, 16), c + Vector2(20, 16)]
		for k in 3:
			var a: Vector2 = tri[k]
			var b: Vector2 = tri[(k + 1) % 3]
			draw_line(a, b, Look.WATER if k == i else Look.LINE_SOFT, 3.0 if k == i else 1.0, true)
		draw_string(_font, r.position + Vector2(10, r.size.y - 14), names[i],
				HORIZONTAL_ALIGNMENT_LEFT, -1, 10, Color(0.82, 0.85, 0.90))

	# ── exit two ──────────────────────────────────────────────────────────────
	var lk: Rect2 = er["lake"]
	_exit_frame(lk, "DROP IT TO THE LAKE", "it goes to the centre", _hot_target == "lake")
	draw_circle(lk.position + Vector2(lk.size.x - 56, 48), 15.0,
			Color(Look.LAKE.r, Look.LAKE.g, Look.LAKE.b, 0.85))

	# ── exit three ────────────────────────────────────────────────────────────
	var dn: Rect2 = er["down"]
	_exit_frame(dn, "SET IT DOWN", "", _hot_target == "down")
	# nothing is drawn on this one. There is no destination to picture.


func _exit_frame(r: Rect2, title: String, under: String, hot: bool) -> void:
	draw_rect(r, Color(0.115, 0.125, 0.155, 0.95) if hot else Color(0.075, 0.08, 0.105, 0.9))
	draw_rect(r, Look.WARM if hot else Look.LINE_SOFT, false, 1.6 if hot else 1.0)
	draw_string(_font, r.position + Vector2(16, 30), title,
			HORIZONTAL_ALIGNMENT_LEFT, -1, 14, Look.PAPER)
	if under != "":
		draw_string(_font, r.position + Vector2(16, 48), under,
				HORIZONTAL_ALIGNMENT_LEFT, -1, 11, Color(0.60, 0.63, 0.68))
