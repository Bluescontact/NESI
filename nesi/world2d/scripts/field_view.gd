class_name FieldView
extends Control
## The writing field. The program opens here and nothing precedes it.
##
## It lies over the world, not over the room, so both zones stay visible: the
## room band is never covered, and the triangle shows around and behind the
## sheet. Esc lays it aside; Esc brings it back.
##
## Law 4 — the words are never rewritten. Nothing in this file reads the text
## for meaning. It hands the string to the Store, which counts words only to
## know an interval passed, and the count never reaches the screen (law 2).
## There is no prompt, no title, no placeholder telling the player what to write.

const PAD := Vector2(120, 58)

var edit: TextEdit
var _font: Font
var _open := true


func _ready() -> void:
	_font = ThemeDB.fallback_font
	set_anchors_preset(Control.PRESET_FULL_RECT)
	# A Control draws outside its rect but is only HIT inside it. The anchors
	# above resolve a frame later, so the size is stated here as well —
	# without it the surface renders perfectly and receives no input at all.
	position = Vector2.ZERO
	size = Vector2(Look.W, Look.H)
	# IGNORE, not PASS: PASS would still consume the hit and forward it to the
	# parent, and this sheet covers the whole world — the dams underneath it
	# would never be clickable. The TextEdit child takes its own events.
	mouse_filter = Control.MOUSE_FILTER_IGNORE

	edit = TextEdit.new()
	edit.position = Vector2(PAD.x, Look.WORLD_TOP + PAD.y)
	edit.size = Vector2(Look.W - PAD.x * 2.0, Look.H - Look.WORLD_TOP - PAD.y * 2.0)
	edit.wrap_mode = TextEdit.LINE_WRAPPING_BOUNDARY
	edit.scroll_fit_content_height = false
	edit.caret_blink = true
	edit.add_theme_color_override("font_color", Look.PAPER)
	edit.add_theme_color_override("caret_color", Look.WARM)
	edit.add_theme_color_override("background_color", Color(0, 0, 0, 0))
	edit.add_theme_color_override("selection_color", Color(Look.WARM.r, Look.WARM.g, Look.WARM.b, 0.24))
	edit.add_theme_font_size_override("font_size", 17)
	var empty := StyleBoxEmpty.new()
	edit.add_theme_stylebox_override("normal", empty)
	edit.add_theme_stylebox_override("focus", empty)
	add_child(edit)

	edit.text = Store.text
	edit.set_caret_line(edit.get_line_count() - 1)
	edit.set_caret_column(edit.get_line(edit.get_line_count() - 1).length())
	edit.text_changed.connect(_on_changed)

	call_deferred("grab_writing_focus")


func grab_writing_focus() -> void:
	if _open:
		edit.grab_focus()


func _on_changed() -> void:
	Store.set_text(edit.text)


func is_open() -> bool:
	return _open


func set_open(v: bool) -> void:
	_open = v
	edit.visible = v
	if v:
		edit.grab_focus()
	else:
		edit.release_focus()
	queue_redraw()


func _draw() -> void:
	if not _open:
		# laid aside: one quiet line, no prompt and nothing asking for a return
		draw_string(_font, Vector2(PAD.x, Look.H - 26), "esc — the field",
				HORIZONTAL_ALIGNMENT_LEFT, -1, 12, Color(0.62, 0.64, 0.70, 0.55))
		return

	var r := Rect2(PAD.x - 34.0, Look.WORLD_TOP + PAD.y - 36.0,
			Look.W - (PAD.x - 34.0) * 2.0, Look.H - Look.WORLD_TOP - (PAD.y - 36.0) - 40.0)
	# a sheet: opaque enough to write on, with the world still there behind it
	draw_rect(r, Color(0.085, 0.09, 0.112, 0.955))
	draw_rect(r, Color(Look.PAPER.r, Look.PAPER.g, Look.PAPER.b, 0.14), false, 1.2)
	# a warm hairline along the top edge, where the light from below reaches it
	var lip := Look.WARM
	lip.a = 0.10 + 0.22 * Store.light()
	draw_line(r.position, Vector2(r.end.x, r.position.y), lip, 1.4, true)
	# the margin the text sits against — the only mark on an empty field
	draw_line(Vector2(PAD.x - 12.0, r.position.y + 16.0),
			Vector2(PAD.x - 12.0, r.end.y - 16.0),
			Color(Look.PAPER.r, Look.PAPER.g, Look.PAPER.b, 0.10), 1.0, true)
	draw_string(_font, Vector2(PAD.x, Look.H - 26), "esc — the world",
			HORIZONTAL_ALIGNMENT_LEFT, -1, 12, Color(0.62, 0.64, 0.70, 0.55))
