class_name Station
extends Control
## The chassis every station panel is built on.
##
## The grammar is the same at all four and is not re-decided per station: pick a
## fraction out of the tray by hand, then do this station's act with it. What
## differs is only the act, and the act's whole job is to choose WHICH SPIRE.
##
## Law 1 — three outputs, always all three, always on screen:
##   the act itself → a spire (the act is how you choose which)
##   the lake plate → the lake
##   the bare plate → set it down
##
## Law 5 — the hand runs it. Nothing here computes a result, scores an attempt,
## or corrects an aim. A station may FAIL, and its fail state is its own; but no
## station ever decides for the operator.
##
## Law 2 — nothing on any station may render a number, a bar, a meter or a
## count. Where a station needs to show something accumulating, it shows it as
## heat, depth, tilt or strain — a quality, never a quantity.

signal closed

const PANEL := Rect2(88, 232, 1104, 508)
const TRAY := Rect2(120, 348, 336, 364)
const ACT := Rect2(492, 300, 452, 412)
const PLATE_X := 972.0
const PLATE_W := 188.0

var _font: Font
var held: Dictionary = {}          ## {charge:int, kind:String} — the one in hand
var mouse := Vector2.ZERO
var _hot := ""


func _ready() -> void:
	_font = ThemeDB.fallback_font
	set_anchors_preset(Control.PRESET_FULL_RECT)
	position = Vector2.ZERO
	size = Vector2(Look.W, Look.H)
	mouse_filter = Control.MOUSE_FILTER_STOP
	Store.changed.connect(queue_redraw)
	act_ready()


func _process(delta: float) -> void:
	act_process(delta)


# ── to be answered by each station ────────────────────────────────────────────

func station_title() -> String: return "A STATION"
func station_under() -> String: return ""
func physics() -> String: return ""
func act_ready() -> void: pass
func act_process(_delta: float) -> void: pass
func act_draw() -> void: pass
## Return the spire this act is currently pointing at, or -1 for none.
func act_spire() -> int: return -1
## Return true if the act consumed the event.
func act_input(_event: InputEvent) -> bool: return false
## Is the station in its fail state? A QUESTION — it must not change anything,
## because the harness and the renderer both ask it freely.
func act_fails() -> bool: return false
## Called once when a delivery has actually been lost to the fail state. This is
## where a station may react; act_fails() is not.
func act_did_fail() -> void: pass


# ── the tray ──────────────────────────────────────────────────────────────────

func motes() -> Array:
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
	# laid out afterwards, so the grid stays inside the tray however many there
	# are — a full tank is twelve charges and thirty-six fractions
	for k in out.size():
		out[k]["pos"] = TRAY.position + Vector2(
			34.0 + float(k % 6) * 48.0,
			30.0 + float(k / 6) * 40.0)
	return out


func plate_lake() -> Rect2:
	return Rect2(PLATE_X, 366, PLATE_W, 130)


func plate_down() -> Rect2:
	return Rect2(PLATE_X, 528, PLATE_W, 130)


# ── input ─────────────────────────────────────────────────────────────────────

func _gui_input(event: InputEvent) -> void:
	if event is InputEventMouseMotion:
		mouse = event.position
		_hot = ""
		if plate_lake().has_point(mouse): _hot = "lake"
		elif plate_down().has_point(mouse): _hot = "down"
		act_input(event)
		queue_redraw()
		return

	if not (event is InputEventMouseButton) or event.button_index != MOUSE_BUTTON_LEFT:
		return

	if event.pressed:
		if not PANEL.has_point(event.position):
			closed.emit()
			return
		# picking up out of the tray always wins over the act, so a mote resting
		# on top of the act surface can still be taken back
		for m in motes():
			if event.position.distance_to(m["pos"]) < 20.0:
				held = {"charge": int(m["charge"]), "kind": String(m["kind"])}
				mouse = event.position
				queue_redraw()
				return
		act_input(event)
		queue_redraw()
	else:
		if held.is_empty():
			act_input(event)
			queue_redraw()
			return
		var ci := int(held["charge"])
		var kind := String(held["kind"])
		if plate_lake().has_point(event.position):
			held = {}
			Store.drop_to_lake(ci, kind)
		elif plate_down().has_point(event.position):
			held = {}
			Store.set_it_down(ci, kind)
		elif ACT.has_point(event.position):
			held = {}
			if act_fails():
				act_did_fail()
				Store.lose_to_the_deep(ci, kind)
			else:
				var s := act_spire()
				if s >= 0:
					Store.send_to_spire(ci, kind, s)
				else:
					pass          # the act is pointing nowhere: it stays in the tray
		else:
			held = {}             # released over nothing
		act_input(event)
		queue_redraw()


# ── drawing ───────────────────────────────────────────────────────────────────

func _draw() -> void:
	draw_rect(Rect2(0, Look.WORLD_TOP, Look.W, Look.H - Look.WORLD_TOP), Color(0.03, 0.035, 0.05, 0.72))
	draw_rect(PANEL, Color(0.085, 0.09, 0.115, 0.985))
	draw_rect(PANEL, Look.LINE, false, 1.6)

	draw_string(_font, PANEL.position + Vector2(32, 44), station_title(),
			HORIZONTAL_ALIGNMENT_LEFT, -1, 20, Look.PAPER)
	draw_string(_font, PANEL.position + Vector2(32, 66), station_under(),
			HORIZONTAL_ALIGNMENT_LEFT, -1, 12, Color(0.62, 0.65, 0.70))
	if physics() != "":
		draw_string(_font, Vector2(PANEL.end.x - 260, PANEL.position.y + 44),
				"physics · " + physics(), HORIZONTAL_ALIGNMENT_LEFT, -1, 11,
				Color(0.58, 0.61, 0.66))
	draw_string(_font, Vector2(PANEL.end.x - 62, PANEL.position.y + 44), "esc",
			HORIZONTAL_ALIGNMENT_LEFT, -1, 13, Color(0.62, 0.65, 0.70))

	_draw_tray()

	draw_rect(ACT, Color(0.045, 0.05, 0.065, 0.9))
	draw_rect(ACT, Look.LINE_SOFT, false, 1.0)
	act_draw()

	_draw_plates()

	if not held.is_empty():
		Look.draw_fraction(self, String(held["kind"]), mouse, 9.0, 0.95)


func _draw_tray() -> void:
	draw_rect(TRAY, Color(0, 0, 0, 0.20))
	draw_rect(TRAY, Look.LINE_SOFT, false, 1.0)
	draw_string(_font, TRAY.position + Vector2(2, -14), "WHAT THE TANK IS HOLDING",
			HORIZONTAL_ALIGNMENT_LEFT, -1, 11, Color(0.66, 0.68, 0.73))

	var ms := motes()
	if ms.is_empty():
		draw_string(_font, TRAY.position + Vector2(20, 44), "nothing waiting",
				HORIZONTAL_ALIGNMENT_LEFT, -1, 13, Color(0.52, 0.55, 0.60))
		return
	for m in ms:
		var kind := String(m["kind"])
		var p: Vector2 = m["pos"]
		var grabbed := (not held.is_empty()
				and int(held["charge"]) == int(m["charge"])
				and String(held["kind"]) == kind)
		Look.draw_fraction(self, kind, p, 8.0, 0.30 if grabbed else 1.0)
	draw_legend(Vector2(TRAY.position.x + 16, TRAY.end.y - 78))


## The three fractions, named and described, standing permanently under the tray.
## This is what carries law 10 once the motes are too small to label one by one:
## the shape is in the legend beside its own name and its own behaviour.
func draw_legend(at: Vector2) -> void:
	draw_line(at + Vector2(-8, -14), at + Vector2(TRAY.size.x - 24, -14),
			Color(Look.LINE_SOFT.r, Look.LINE_SOFT.g, Look.LINE_SOFT.b, 0.7), 1.0, true)
	var k := 0
	for kind in ["suspended", "dissolved", "bedload"]:
		var p := at + Vector2(8, 8 + float(k) * 22.0)
		Look.draw_fraction(self, kind, p, 7.0, 1.0)
		draw_string(_font, p + Vector2(18, 4), Look.fraction_name(kind),
				HORIZONTAL_ALIGNMENT_LEFT, -1, 10, Color(0.82, 0.84, 0.88, 0.92))
		draw_string(_font, p + Vector2(108, 4), Look.fraction_says(kind),
				HORIZONTAL_ALIGNMENT_LEFT, -1, 9, Color(0.58, 0.61, 0.66, 0.88))
		k += 1


func _draw_plates() -> void:
	_plate(plate_lake(), "THE LAKE", "it goes to the centre", _hot == "lake", true)
	# nothing is drawn on this one and nothing happens when it is used
	_plate(plate_down(), "SET IT DOWN", "", _hot == "down", false)


func _plate(r: Rect2, title: String, under: String, hot: bool, lake: bool) -> void:
	draw_rect(r, Color(0.115, 0.125, 0.155, 0.95) if hot else Color(0.07, 0.075, 0.10, 0.9))
	draw_rect(r, Look.WARM if hot else Look.LINE_SOFT, false, 1.6 if hot else 1.0)
	draw_string(_font, r.position + Vector2(14, 28), title,
			HORIZONTAL_ALIGNMENT_LEFT, -1, 13, Look.PAPER)
	if under != "":
		draw_string(_font, r.position + Vector2(14, 46), under,
				HORIZONTAL_ALIGNMENT_LEFT, -1, 10, Color(0.60, 0.63, 0.68))
	if lake:
		draw_circle(r.position + Vector2(r.size.x * 0.5, 92), 15.0,
				Color(Look.LAKE.r, Look.LAKE.g, Look.LAKE.b, 0.85))


## The three spires drawn as a small figure with one edge lit — the same figure
## the filters use, so "which spire" reads identically at every station.
func draw_spire_mark(at: Vector2, lit: int, scale: float = 1.0) -> void:
	var tri := [at + Vector2(0, -18) * scale, at + Vector2(-20, 16) * scale, at + Vector2(20, 16) * scale]
	for k in 3:
		var a: Vector2 = tri[k]
		var b: Vector2 = tri[(k + 1) % 3]
		draw_line(a, b, Look.WATER if k == lit else Look.LINE_SOFT,
				(3.0 if k == lit else 1.0) * scale, true)


func font() -> Font:
	return _font
