class_name DamChoice
extends Control
## The dam. The only place the operator governs rather than handles.
##
## Law 7 — held is lawful. Holding is the default and costs no click: water that
## arrives simply stays, and nothing ever asks about it. This surface only opens
## when the dam is touched, and HOLD closes it without doing anything, because
## holding is not an action.

signal release(spire: int)
signal closed

var spire := 0
var at := Vector2.ZERO
var _font: Font


func _ready() -> void:
	_font = ThemeDB.fallback_font
	set_anchors_preset(Control.PRESET_FULL_RECT)
	# A Control draws outside its rect but is only HIT inside it. The anchors
	# above resolve a frame later, so the size is stated here as well —
	# without it the surface renders perfectly and receives no input at all.
	position = Vector2.ZERO
	size = Vector2(Look.W, Look.H)
	mouse_filter = Control.MOUSE_FILTER_STOP


func rect() -> Rect2:
	var p := at + Vector2(28, -46)
	p.x = clampf(p.x, 12.0, Look.W - 244.0)
	p.y = clampf(p.y, Look.WORLD_TOP + 12.0, Look.H - 116.0)
	return Rect2(p, Vector2(232, 104))


func _btn(i: int) -> Rect2:
	var r := rect()
	return Rect2(r.position.x + 14.0 + float(i) * 104.0, r.position.y + 54.0, 96.0, 34.0)


func _gui_input(event: InputEvent) -> void:
	if event is InputEventMouseMotion:
		queue_redraw()
		return
	if event is InputEventMouseButton and event.pressed and event.button_index == MOUSE_BUTTON_LEFT:
		if _btn(0).has_point(event.position):
			release.emit(spire)
		# Button 1 is HOLD, and it does nothing but close. That is the point.
		closed.emit()


func _draw() -> void:
	var r := rect()
	draw_rect(r, Color(0.085, 0.09, 0.115, 0.99))
	draw_rect(r, Look.WARM, false, 1.4)
	draw_string(_font, r.position + Vector2(14, 26), "THE DAM",
			HORIZONTAL_ALIGNMENT_LEFT, -1, 14, Look.PAPER)
	draw_string(_font, r.position + Vector2(14, 44), "water is standing here",
			HORIZONTAL_ALIGNMENT_LEFT, -1, 11, Color(0.62, 0.65, 0.70))

	var m := get_local_mouse_position()
	var labels := ["RELEASE", "HOLD"]
	for i in 2:
		var b := _btn(i)
		var hot := b.has_point(m)
		draw_rect(b, Color(0.15, 0.16, 0.20) if hot else Color(0.11, 0.12, 0.15))
		draw_rect(b, Look.WATER if (hot and i == 0) else Look.LINE_SOFT, false, 1.4 if hot else 1.0)
		draw_string(_font, b.position + Vector2(14, 23), labels[i],
				HORIZONTAL_ALIGNMENT_LEFT, -1, 12, Color(0.88, 0.90, 0.94))
