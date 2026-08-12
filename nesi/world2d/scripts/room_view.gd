class_name RoomView
extends Control
## The upper band — the room, and the glass it sits on.
##
## Holds the supply tank and four station objects. Clicking a station opens a
## panel over the world; closing it returns.
##
## Light rises. The room's brightness is a function of completed cycles, and a
## world that has never cycled is nearly dark. That is the only readout of how
## much has happened, and it is a quality of light, never a number (law 2).

signal station_clicked(key: String)

const STATIONS := [
	{"key": "water_table", "name": "THE WATER TABLE", "physics": "water"},
	{"key": "heliostat", "name": "THE HELIOSTAT TABLE", "physics": "light"},
	{"key": "membrane", "name": "THE MEMBRANE", "physics": "tension"},
	{"key": "filters", "name": "THE FILTERS", "physics": "frequency"},
]

const TANK_RECT := Rect2(58, 40, 78, 112)

var _t := 0.0
var _hover := -1
var _font: Font


func _ready() -> void:
	_font = ThemeDB.fallback_font
	Store.changed.connect(queue_redraw)
	set_anchors_preset(Control.PRESET_TOP_WIDE)
	custom_minimum_size = Vector2(Look.W, Look.WORLD_TOP)
	size = Vector2(Look.W, Look.WORLD_TOP)
	mouse_filter = Control.MOUSE_FILTER_PASS


func _process(delta: float) -> void:
	_t += delta
	queue_redraw()


func station_rect(i: int) -> Rect2:
	return Rect2(300 + i * 232, 44, 196, 104)


func _gui_input(event: InputEvent) -> void:
	if event is InputEventMouseMotion:
		var was := _hover
		_hover = -1
		for i in STATIONS.size():
			if station_rect(i).has_point(event.position):
				_hover = i
		if was != _hover:
			queue_redraw()
	elif event is InputEventMouseButton and event.pressed and event.button_index == MOUSE_BUTTON_LEFT:
		for i in STATIONS.size():
			if station_rect(i).has_point(event.position):
				station_clicked.emit(STATIONS[i]["key"])
				accept_event()
				return


func _draw() -> void:
	var lit: float = Store.light()

	# the room's stone, brightening only with completed cycles
	var stone := Look.STONE.lerp(Look.STONE_LIT, lit * 0.62)
	draw_rect(Rect2(0, 0, Look.W, Look.GLASS_TOP), stone)

	# a low warmth from below, because the light comes up through the glass
	for k in 5:
		var band := Look.WARM
		band.a = (0.030 + 0.075 * lit) * (1.0 - float(k) / 5.0)
		draw_rect(Rect2(0, Look.GLASS_TOP - 46.0 + float(k) * 9.0, Look.W, 9.0), band)

	_draw_tank()

	for i in STATIONS.size():
		_draw_station(i, lit)

	_draw_glass(lit)


func _draw_tank() -> void:
	var r := TANK_RECT
	var level: float = Store.tank_level()

	# the vessel
	draw_rect(r, Color(0, 0, 0, 0.22))
	draw_rect(r, Look.LINE, false, 1.6)

	# what is in it — a level, never a number and never a count of charges
	if level > 0.0:
		var h := r.size.y * level
		var body := Rect2(r.position.x + 2.0, r.position.y + r.size.y - h + 2.0, r.size.x - 4.0, h - 4.0)
		var w := Look.WATER
		w.a = 0.72
		draw_rect(body, w)
		# a moving surface, so a full tank and an empty one are told apart by
		# motion as well as by height
		var sy := body.position.y
		var pts := PackedVector2Array()
		for k in 17:
			var x := body.position.x + body.size.x * float(k) / 16.0
			pts.append(Vector2(x, sy + sin(_t * 1.6 + float(k) * 0.7) * 1.8))
		draw_polyline(pts, Color(1, 1, 1, 0.42), 1.4, true)

	draw_string(_font, r.position + Vector2(-2, -10), "THE TANK",
			HORIZONTAL_ALIGNMENT_LEFT, -1, 11, Color(0.72, 0.74, 0.78, 0.85))


func _draw_station(i: int, lit: float) -> void:
	var r := station_rect(i)
	var s: Dictionary = STATIONS[i]
	var hot := _hover == i

	var face := Color(0.10, 0.11, 0.135).lerp(Color(0.30, 0.29, 0.26), lit * 0.5)
	if hot:
		face = face.lightened(0.10)
	draw_rect(r, face)
	draw_rect(r, Look.LINE, false, 1.6)

	# the object itself — each station is a different thing on the table, so the
	# four are told apart by shape before they are told apart by their label
	var c := r.position + Vector2(r.size.x * 0.5, 46)
	var ink := Color(0.80, 0.82, 0.86, 0.92)
	match s["key"]:
		"water_table":
			draw_rect(Rect2(c.x - 30, c.y - 12, 60, 24), ink, false, 1.6)
			draw_line(c + Vector2(-30, 4), c + Vector2(30, 4), ink, 1.2)
		"heliostat":
			draw_arc(c, 15, PI, TAU, 24, ink, 1.6, true)
			for k in 5:
				var a := PI + PI * float(k) / 4.0
				draw_line(c + Vector2(cos(a), sin(a)) * 17.0, c + Vector2(cos(a), sin(a)) * 25.0, ink, 1.2)
		"membrane":
			var pts := PackedVector2Array()
			for k in 25:
				var x := -30.0 + 60.0 * float(k) / 24.0
				pts.append(c + Vector2(x, sin(float(k) * 0.55) * 8.0))
			draw_polyline(pts, ink, 1.6, true)
		"filters":
			for k in 3:
				var y := c.y - 12.0 + float(k) * 12.0
				draw_line(Vector2(c.x - 28, y), Vector2(c.x + 28, y), ink, 1.6)
			draw_line(Vector2(c.x, c.y - 22), Vector2(c.x, c.y + 20), ink, 1.0)

	draw_string(_font, r.position + Vector2(12, 84), String(s["name"]),
			HORIZONTAL_ALIGNMENT_LEFT, -1, 12, Color(0.90, 0.91, 0.94, 0.95))
	draw_string(_font, r.position + Vector2(12, 98), String(s["physics"]),
			HORIZONTAL_ALIGNMENT_LEFT, -1, 10, Color(0.62, 0.64, 0.68, 0.8))


func _draw_glass(lit: float) -> void:
	var g := Rect2(0, Look.GLASS_TOP, Look.W, Look.GLASS_H)
	var pane := Look.GLASS
	pane.a = 0.10 + 0.13 * lit
	draw_rect(g, pane)
	var edge := Look.GLASS
	edge.a = 0.34 + 0.30 * lit
	draw_line(Vector2(0, Look.GLASS_TOP), Vector2(Look.W, Look.GLASS_TOP), edge, 1.4, true)
	draw_line(Vector2(0, Look.WORLD_TOP), Vector2(Look.W, Look.WORLD_TOP), edge, 1.4, true)
	# a slow travelling sheen, so the boundary reads as a surface rather than a rule
	var x := fmod(_t * 46.0, Look.W + 300.0) - 150.0
	for k in 9:
		var sheen := Look.GLASS
		sheen.a = (0.06 + 0.05 * lit) * (1.0 - absf(float(k) - 4.0) / 4.0)
		draw_rect(Rect2(x + float(k) * 14.0, Look.GLASS_TOP, 14.0, Look.GLASS_H), sheen)
