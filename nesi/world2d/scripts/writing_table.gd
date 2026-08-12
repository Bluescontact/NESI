extends Control
## THE TABLE — the merged surface. Every source together, source legible on
## every tile, and the tile stays where his hand leaves it.
##
## THE MACHINE NEVER MOVES A TILE except on his click. Arrival is the one
## machine placement: held stones with no hand position lie in written order,
## grouped by run. The moment his hand drags one, its place is his and is kept.
##
## The tile's acts, all by hand, all named on the pane: edit (his words, his
## edit) · discard · label · link · the three dispositions. Source is drawn on
## every face and no act can touch it.
##
## NOTHING IS COUNTED. No total, no tally, nothing numeric on any face.

const STONE_W := 150.0
const STONE_H := 96.0

var pane: Panel = null
var pane_n := -1
var line_hot := -1        ## a link waits: first tile chosen, face says so
var edit_sheet: TextEdit
var mark_line: LineEdit

## THE MERGE — drag one tile onto another (Kevin's mark, 2026-08-11; the
## MERGE/JOIN buttons are retired). The join is still written order
## regardless of which tile was carried, and the store still keeps the seams.

## THE SEAMS, OPENED (the shipped-build pass, step 3). A merged stone keeps
## every part in its data; this pane shows them, in written order, verbatim,
## and closes again. READING ONLY: opening changes nothing, records nothing,
## says nothing. No unmerge control — that stays unmarked. No machine ever
## decides which sentences are attempts at the same sentence — that fork is
## not entered and not defaulted.
var parts_pane: Panel = null


class Stone:
	extends Control
	var data: Dictionary
	var table: Control
	var _grab := Vector2.ZERO
	var _dragging := false
	var _moved := false

	func _draw() -> void:
		draw_rect(Rect2(Vector2.ZERO, size), Color(0.92, 0.90, 0.85))
		# A HELD ARRIVAL from another face renders the tile highlighted — the
		# standing text stays the body; the arrival rides attached below it.
		# Nothing here settles anything; taking it is his click in the pane.
		var arrived: Dictionary = data.get("arrival", {})
		if not arrived.is_empty() and str(arrived.get("face", "")) != "table":
			draw_rect(Rect2(Vector2.ZERO, size), Look.WATER, false, 3.0)
		else:
			draw_rect(Rect2(Vector2.ZERO, size), Look.LINE_SOFT, false, 1.0)
		var kind := str(data.get("kind", ""))
		var face := kind
		if data.has("seams"):
			face = "merged · " + kind
		if kind == "given" and str(data.get("who", "")) != "":
			face = "given · from " + str(data.get("who", ""))
		if kind == "fetched" and str(data.get("asked", "")) != "":
			face = "fetched · " + str(data.get("asked", ""))
		if str(data.get("mark", "")) != "":
			face += "   [" + str(data.get("mark", "")) + "]"
		var font := get_theme_default_font()
		var body := str(data.get("text", ""))
		var says := face
		if not arrived.is_empty():
			if str(arrived.get("face", "")) == "table":
				body = str(arrived.get("text", ""))
				says = face + " · edit held, arrives on the other faces"
			else:
				says = face + " · an edit arrived, held"
		draw_multiline_string(font, Vector2(6, 16), body,
				HORIZONTAL_ALIGNMENT_LEFT, size.x - 12.0, 12, 3, Look.INK)
		if not arrived.is_empty() and str(arrived.get("face", "")) != "table":
			draw_multiline_string(font, Vector2(6, size.y - 42), str(arrived.get("text", "")),
					HORIZONTAL_ALIGNMENT_LEFT, size.x - 12.0, 11, 2, Look.WATER)
		draw_string(font, Vector2(6, size.y - 6), says,
				HORIZONTAL_ALIGNMENT_LEFT, size.x - 12.0, 10, Color(0.35, 0.30, 0.20))

	func _gui_input(event: InputEvent) -> void:
		var mb := event as InputEventMouseButton
		if mb != null and mb.button_index == MOUSE_BUTTON_LEFT:
			if mb.pressed:
				_dragging = true
				_moved = false
				_grab = mb.global_position - global_position
			else:
				_dragging = false
				if _moved:
					# THE DRAG-MERGE (Kevin's mark, 2026-08-11): a tile dropped
					# with its centre inside another tile joins it — written
					# order, seams kept, same store act as ever. Anywhere else
					# the drop is placement and stays where his hand left it.
					# Centre-in is the guard against a graze; no unmerge
					# exists, and that stays unmarked.
					var mid := position + size * 0.5
					var under: Control = null
					for c in table.get_children():
						if c != self and c is Control and c.get("data") != null \
								and Rect2(c.position, c.size).has_point(mid):
							under = c
							break
					if under != null:
						WritingStore.pool_stone([int(under.get("data")["n"]), int(data["n"])])
					else:
						WritingStore.set_stone_pos(int(data["n"]), position)
				else:
					table.call("open_stone", int(data["n"]))
			accept_event()
		var mm := event as InputEventMouseMotion
		if mm != null and _dragging:
			# the event's own position, never the device cursor — the same
			# arithmetic for a real hand and for the harness's hand
			position = mm.global_position - table.global_position - _grab
			position = position.clamp(Vector2.ZERO, table.size - size)
			_moved = true
			table.queue_redraw()
			accept_event()


func _ready() -> void:
	WritingStore.changed.connect(_fill)
	_fill()


func _fill() -> void:
	for c in get_children():
		if c is Stone:
			c.queue_free()
	var row := {}
	for s in WritingStore.stone_bank:
		if str(s.get("stage", "")) != "held":
			continue
		var sv := Stone.new()
		sv.data = s
		sv.table = self
		sv.size = Vector2(STONE_W, STONE_H)
		var pos = s.get("pos")
		if pos is Array and pos.size() == 2:
			sv.position = Vector2(float(pos[0]), float(pos[1]))
		else:
			# arrival: written order, grouped by run. One machine placement,
			# before any hand has touched it.
			var run := int(s.get("run", 0))
			var k := int(row.get(run, 0))
			row[run] = k + 1
			sv.position = Vector2(12 + (k % 5) * (STONE_W + 10),
					40 + run * (STONE_H + 26) + (k / 5) * (STONE_H + 6))
		add_child(sv)
	queue_redraw()


func _draw() -> void:
	var face := "THE TABLE — every source together. Drag a tile and it stays; drop it onto another and they merge, in written order, seams kept. Click a tile to edit, discard, label, link, or send it on."
	if line_hot >= 0:
		face = "LINK — click the other tile to tie them."
	draw_string(get_theme_default_font(), Vector2(12, 22), face,
			HORIZONTAL_ALIGNMENT_LEFT, size.x - 24.0, 12, Look.STONE_LIT)
	for s in WritingStore.stone_bank:
		for t in s.get("lines", []):
			var a := _stone_mid(int(s["n"]))
			var b := _stone_mid(int(t))
			if a != Vector2.INF and b != Vector2.INF:
				draw_line(a, b, Look.LINE, 1.0)


func _stone_mid(n: int) -> Vector2:
	for c in get_children():
		if c is Stone and int(c.data.get("n", -1)) == n:
			return c.position + c.size * 0.5
	return Vector2.INF


func open_stone(n: int) -> void:
	if line_hot >= 0:
		WritingStore.line_stone(line_hot, n)
		line_hot = -1
		queue_redraw()
		return
	close_pane()
	pane_n = n
	var s: Dictionary = {}
	for row in WritingStore.stone_bank:
		if int(row.get("n", -1)) == n:
			s = row
			break
	if s.is_empty():
		return
	pane = Panel.new()
	pane.position = Vector2(size.x - 320, 30)
	pane.size = Vector2(300, 430)
	add_child(pane)

	var face := Label.new()
	var kind := str(s.get("kind", ""))
	face.text = "the tile · source: " + kind + "  (source is not editable)"
	face.position = Vector2(10, 8)
	face.add_theme_font_size_override("font_size", 11)
	pane.add_child(face)

	edit_sheet = TextEdit.new()
	# the PULL reads the selection AFTER the button click takes focus — without
	# this the selection dies on the way to the button and the pull grabs air
	edit_sheet.deselect_on_focus_loss_enabled = false
	edit_sheet.text = str(s.get("text", ""))
	edit_sheet.position = Vector2(10, 30)
	edit_sheet.size = Vector2(280, 130)
	edit_sheet.wrap_mode = TextEdit.LINE_WRAPPING_BOUNDARY
	pane.add_child(edit_sheet)

	# The edit is HELD, not asserted (Kevin's amendment, 2026-08-11): keeping
	# it here makes it an arrival on the other faces, highlighted and waiting;
	# nothing propagates until his hand takes it on a face it arrived at.
	var edit_btn := Button.new()
	edit_btn.text = "KEEP — your edit; it arrives held on the other faces"
	edit_btn.position = Vector2(10, 166)
	edit_btn.pressed.connect(func(): WritingStore.arrive_stone(pane_n, edit_sheet.text, "table"))
	pane.add_child(edit_btn)

	# THE PULL — his selection leaves the tile onto its own stone.
	var pull_btn := Button.new()
	pull_btn.text = "PULL — the selection off, onto its own tile"
	pull_btn.position = Vector2(10, 196)
	pull_btn.pressed.connect(func():
		var text := edit_sheet.get_selected_text()
		if text != "":
			var held_n := pane_n
			close_pane()
			WritingStore.pull_stone(held_n, text))
	pane.add_child(pull_btn)

	# An edit that arrived from another face: shown whole above, taken only
	# by this click, never by rule. Until then both readings stand.
	var arrived: Dictionary = s.get("arrival", {})
	if not arrived.is_empty() and str(arrived.get("face", "")) != "table":
		var take_arrived_btn := Button.new()
		take_arrived_btn.text = "TAKE THE ARRIVED EDIT — it becomes the sentence here too"
		take_arrived_btn.position = Vector2(10, 226)
		take_arrived_btn.pressed.connect(func():
			var held_n := pane_n
			close_pane()
			WritingStore.take_arrived(held_n))
		pane.add_child(take_arrived_btn)

	mark_line = LineEdit.new()
	mark_line.text = str(s.get("mark", ""))
	mark_line.placeholder_text = "a label, by hand"
	mark_line.position = Vector2(10, 200)
	mark_line.size = Vector2(190, 30)
	pane.add_child(mark_line)

	var mark_btn := Button.new()
	mark_btn.text = "LABEL"
	mark_btn.position = Vector2(206, 200)
	mark_btn.pressed.connect(func(): WritingStore.mark_stone(pane_n, mark_line.text))
	pane.add_child(mark_btn)

	var line_btn := Button.new()
	line_btn.text = "LINK — then click the other tile"
	line_btn.position = Vector2(10, 236)
	line_btn.pressed.connect(func():
		line_hot = pane_n
		close_pane()
		queue_redraw())
	pane.add_child(line_btn)

	if kind != "self":
		var release_btn := Button.new()
		release_btn.text = "BREAK IT DOWN — the rock becomes gravel"
		release_btn.position = Vector2(10, 268)
		release_btn.pressed.connect(func(): _release(pane_n))
		pane.add_child(release_btn)

	var send_btn := Button.new()
	send_btn.text = "SEND — marks it sent; nothing downstream is built yet"
	send_btn.position = Vector2(10, 306)
	send_btn.pressed.connect(func(): _stage("sent"))
	pane.add_child(send_btn)

	var drop_btn := Button.new()
	drop_btn.text = "DISCARD — it leaves the table, kept in the store"
	drop_btn.position = Vector2(10, 336)
	drop_btn.pressed.connect(func(): _stage("dropped"))
	pane.add_child(drop_btn)

	var down_btn := Button.new()
	down_btn.text = "SET IT DOWN — sent nowhere"
	down_btn.position = Vector2(10, 366)
	down_btn.pressed.connect(func(): _stage("down"))
	pane.add_child(down_btn)

	var close_btn := Button.new()
	close_btn.text = "CLOSE"
	close_btn.position = Vector2(10, 398)
	close_btn.pressed.connect(close_pane)
	pane.add_child(close_btn)

	if s.has("seams"):
		pane.size = Vector2(300, 470)
		var parts_btn := Button.new()
		parts_btn.text = "OPEN THE SEAMS — the parts, read only"
		parts_btn.position = Vector2(10, 432)
		parts_btn.pressed.connect(func(): _open_parts(s))
		pane.add_child(parts_btn)


func _stage(stage: String) -> void:
	var n := pane_n
	close_pane()
	WritingStore.stage_stone(n, stage)


## The break-down. His click; the machine only splits on the paragraph seam.
## The rock is marked dropped; the gravel arrives held, same source carried.
func _release(n: int) -> void:
	var s: Dictionary = {}
	for row in WritingStore.stone_bank:
		if int(row.get("n", -1)) == n:
			s = row
			break
	if s.is_empty():
		return
	var run: int = WritingStore.open_run()
	close_pane()
	for p in str(s.get("text", "")).split("\n", false):
		if p.strip_edges().is_empty():
			continue
		WritingStore.bank_stone(p, str(s.get("kind", "")), str(s.get("who", "")), str(s.get("asked", "")), run)
	WritingStore.stage_stone(n, "dropped")


## The seams pane. Every part of the merged stone, in written order, verbatim,
## its source under it. Nothing here writes, stages, or marks anything.
func _open_parts(s: Dictionary) -> void:
	_close_parts()
	parts_pane = Panel.new()
	parts_pane.position = Vector2(200, 40)
	parts_pane.size = Vector2(560, 600)
	add_child(parts_pane)

	var face := Label.new()
	face.text = "THE SEAMS — the parts of this stone, in the order they were written. Reading only: opening this changes nothing."
	face.position = Vector2(12, 8)
	face.size = Vector2(536, 34)
	face.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	face.add_theme_font_size_override("font_size", 11)
	parts_pane.add_child(face)

	var top := 48.0
	for part in s.get("seams", []):
		var body := Label.new()
		body.text = str(part.get("text", ""))
		body.position = Vector2(12, top)
		body.size = Vector2(536, 10)
		body.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
		body.add_theme_font_size_override("font_size", 13)
		parts_pane.add_child(body)
		top += maxf(22.0, body.get_minimum_size().y + 6.0)

		var under := Label.new()
		var says := str(part.get("kind", ""))
		if str(part.get("who", "")) != "":
			says += " · from " + str(part.get("who", ""))
		if str(part.get("asked", "")) != "":
			says += " · " + str(part.get("asked", ""))
		under.text = says
		under.position = Vector2(12, top)
		under.add_theme_font_size_override("font_size", 9)
		under.add_theme_color_override("font_color", Color(0.45, 0.40, 0.28))
		parts_pane.add_child(under)
		top += 26.0

	var shut_btn := Button.new()
	shut_btn.text = "CLOSE THE SEAMS"
	shut_btn.position = Vector2(12, minf(top + 8.0, 560.0))
	shut_btn.pressed.connect(_close_parts)
	parts_pane.add_child(shut_btn)


func _close_parts() -> void:
	if parts_pane != null:
		parts_pane.queue_free()
		parts_pane = null


func close_pane() -> void:
	if pane != null:
		pane.queue_free()
		pane = null
	_close_parts()
	pane_n = -1
