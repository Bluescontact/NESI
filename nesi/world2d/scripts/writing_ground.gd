extends Control
## THE TARP — the sorting surface. Eight regions at the rim: four edges, four
## corners. The centre is the unprocessed pile.
##
## Movement is centre to rim, outward only, by his hand. Nothing returns to
## the centre — a landed stone does not lift again. Single pass.
##
## A REGION HAS NO NAME UNTIL SOMETHING LANDS IN IT. When the first stone
## lands, a naming line appears at that region, and the name is typed by
## Kevin's hand or left empty. The machine never names a region and never
## proposes one.
##
## Folding the tarp goes back to the table. It commits nothing and says
## nothing — the landings are already in the store the moment they happen.

signal closed

const STONE_W := 120.0
const STONE_H := 64.0
const RIM := 170.0

var close_btn: Button
var _hot := -1                 ## the stone under his hand, mid-drag
var _hot_pos := Vector2.ZERO
var _grab := Vector2.ZERO
var _rim_names: Dictionary = {}     ## region -> LineEdit, made on first landing


func _ready() -> void:
	close_btn = Button.new()
	close_btn.text = "FOLD THE TARP — back to the table"
	close_btn.position = Vector2(12, 6)
	close_btn.pressed.connect(func(): emit_signal("closed"))
	add_child(close_btn)
	WritingStore.changed.connect(queue_redraw)


func rim_rects() -> Array:
	var w := size.x
	var h := size.y
	return [
		Rect2(0, 0, RIM, RIM),                              ## corners
		Rect2(w - RIM, 0, RIM, RIM),
		Rect2(0, h - RIM, RIM, RIM),
		Rect2(w - RIM, h - RIM, RIM, RIM),
		Rect2(RIM, 0, w - 2 * RIM, RIM),                    ## edges
		Rect2(RIM, h - RIM, w - 2 * RIM, RIM),
		Rect2(0, RIM, RIM, h - 2 * RIM),
		Rect2(w - RIM, RIM, RIM, h - 2 * RIM),
	]


## Centre-pile places, deterministic before his hand moves anything.
func _centre_pos(k: int) -> Vector2:
	var mid := size * 0.5
	return Vector2(mid.x - 200 + (k % 3) * (STONE_W + 12),
			mid.y - 120 + (k / 3) * (STONE_H + 10))


func _held() -> Array:
	var out := []
	for s in WritingStore.stone_bank:
		if str(s.get("stage", "")) == "held":
			out.append(s)
	return out


func _draw() -> void:
	draw_rect(Rect2(Vector2.ZERO, size), Color(0.10, 0.10, 0.11))
	var font := get_theme_default_font()
	draw_string(font, Vector2(280, 22),
			"THE TARP — a single pass. Drag a stone from the centre pile outward. Nothing returns to the centre.",
			HORIZONTAL_ALIGNMENT_LEFT, size.x - 300.0, 12, Look.STONE_LIT)

	var rects := rim_rects()
	for r in rects:
		draw_rect(r, Color(0.14, 0.14, 0.15))
		draw_rect(r, Look.LINE_SOFT, false, 1.0)

	var landed := {}
	var k := 0
	for s in _held():
		var region := int(s.get("region", -1))
		var at: Vector2
		if int(s["n"]) == _hot:
			at = _hot_pos
		elif region >= 0:
			var j := int(landed.get(region, 0))
			landed[region] = j + 1
			var rr: Rect2 = rects[region]
			at = rr.position + Vector2(8 + (j % 2) * (STONE_W * 0.4), 26 + (j / 2) * 24)
		else:
			at = _centre_pos(k)
		if region < 0:
			k += 1
		_draw_stone(s, at, region >= 0)

	for region in landed:
		if not _rim_names.has(region):
			_name_line(region)


func _draw_stone(s: Dictionary, at: Vector2, flat: bool) -> void:
	var col := Color(0.92, 0.90, 0.85) if not flat else Color(0.72, 0.70, 0.64)
	draw_rect(Rect2(at, Vector2(STONE_W, STONE_H)), col)
	draw_rect(Rect2(at, Vector2(STONE_W, STONE_H)), Look.LINE_SOFT, false, 1.0)
	var font := get_theme_default_font()
	draw_multiline_string(font, at + Vector2(5, 13), str(s.get("text", "")),
			HORIZONTAL_ALIGNMENT_LEFT, STONE_W - 10.0, 10, 3, Look.INK)
	draw_string(font, at + Vector2(5, STONE_H - 5), str(s.get("kind", "")),
			HORIZONTAL_ALIGNMENT_LEFT, STONE_W - 10.0, 9, Color(0.35, 0.30, 0.20))


## The naming line, born of the first landing. Kevin's hand or nothing.
func _name_line(region: int) -> void:
	var rects := rim_rects()
	var line := LineEdit.new()
	line.placeholder_text = "name this region, or leave it"
	line.text = str(WritingStore.region_names.get(str(region), ""))
	var rr: Rect2 = rects[region]
	line.position = rr.position + Vector2(6, rr.size.y - 34)
	line.size = Vector2(minf(rr.size.x - 12, 200), 28)
	line.text_submitted.connect(func(text): WritingStore.name_region(region, text))
	add_child(line)
	_rim_names[region] = line


func _gui_input(event: InputEvent) -> void:
	var mb := event as InputEventMouseButton
	if mb != null and mb.button_index == MOUSE_BUTTON_LEFT:
		if mb.pressed:
			var k := 0
			for s in _held():
				if int(s.get("region", -1)) >= 0:
					continue
				var at := _centre_pos(k)
				k += 1
				if Rect2(at, Vector2(STONE_W, STONE_H)).has_point(mb.position):
					_hot = int(s["n"])
					_grab = mb.position - at
					_hot_pos = at
					break
		else:
			if _hot >= 0:
				var rects := rim_rects()
				for i in rects.size():
					if rects[i].has_point(mb.position):
						WritingStore.ground_stone(_hot, i)
						break
				_hot = -1
				queue_redraw()
		accept_event()
	var mm := event as InputEventMouseMotion
	if mm != null and _hot >= 0:
		_hot_pos = mm.position - _grab
		queue_redraw()
		accept_event()
