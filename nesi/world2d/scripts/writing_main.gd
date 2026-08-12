extends Control
## THE INTAKE — the opening surface. Nothing precedes it.
##
## One continuous surface, four sources on it: SELF (the band, top), GIVEN and
## FETCHED (the quarried-rock panes, left), and THE TABLE (the merged surface,
## everything together, source legible on every tile). The layout is the
## reversible half; the sources are not.
##
## BLIND hides everything below the band — each sentence leaves as it is
## finished and nothing accumulates in view. TILES shows the table.
##
## THE TARP opens over the table as the sorting surface and folds back.
##
## Not built here, on the order: levels 2–4 · any level-condition display ·
## any ordering proposed from the words themselves · the world, the water,
## the stations, the geometry. The world scene is on disk at scenes/main.tscn;
## one door on this surface reaches it (the latent pass, 2026-08-10 — the
## intake still opens first, nothing precedes it, and the world has a door
## back). Held is lawful: the door asks nothing and says nothing.

var field: Control
var pane_a: Control
var pane_b: Control
var table: Control
var ground: Control = null
var ground_btn: Button
var world_btn: Button
var sheet: TextEdit = null
var sheet_face: Label = null
var sheet_body: VBoxContainer = null


func _ready() -> void:
	set_anchors_preset(Control.PRESET_FULL_RECT)

	var bg := ColorRect.new()
	bg.color = Look.INK
	bg.set_anchors_preset(Control.PRESET_FULL_RECT)
	add_child(bg)

	field = load("res://scripts/writing_field.gd").new()
	field.position = Vector2(0, 0)
	field.size = Vector2(1280, 96)
	field.connect("view_changed", _on_view)
	add_child(field)

	pane_a = load("res://scripts/writing_pane.gd").new()
	pane_a.set("kind", "given")
	pane_a.position = Vector2(0, 96)
	pane_a.size = Vector2(300, 352)
	add_child(pane_a)

	pane_b = load("res://scripts/writing_pane.gd").new()
	pane_b.set("kind", "fetched")
	pane_b.position = Vector2(0, 448)
	pane_b.size = Vector2(300, 352)
	add_child(pane_b)

	table = load("res://scripts/writing_table.gd").new()
	table.position = Vector2(300, 96)
	table.size = Vector2(980, 704)
	add_child(table)

	ground_btn = Button.new()
	ground_btn.text = "THE TARP — lay the pile for a single pass"
	ground_btn.position = Vector2(990, 136)
	ground_btn.pressed.connect(_open_ground)
	add_child(ground_btn)

	# THE FOURTH FACE — sequential, rebuilt on the one-writing marks
	# (2026-08-11). The page is now DERIVED from the one stone bank: every
	# stone, in written order, verbatim — blind fills this space the moment a
	# sentence leaves the band. An edit held on another face shows here
	# attached to its sentence, named in words as well as colour, and is
	# taken only on its tile — never by a rule. Below the derived body, the
	# open strip is the same page as ever: nothing leaves it, Ctrl+Enter cuts
	# it into stones and leaves it whole.
	sheet_face = Label.new()
	sheet_face.text = "SEQUENTIAL — the page. Everything, in the order it was written. An edit made on another face shows against its sentence, held, until you take it on its tile. The strip below is yours to write on: Ctrl+Enter cuts it into stones and leaves the page whole."
	sheet_face.position = Vector2(14, 102)
	sheet_face.size = Vector2(1250, 20)
	sheet_face.add_theme_font_size_override("font_size", 12)
	sheet_face.add_theme_color_override("font_color", Look.STONE_LIT)
	add_child(sheet_face)

	sheet_body = VBoxContainer.new()
	sheet_body.position = Vector2(14, 128)
	sheet_body.size = Vector2(1252, 384)
	add_child(sheet_body)
	WritingStore.changed.connect(_fill_sheet_body)
	_fill_sheet_body()

	sheet = TextEdit.new()
	sheet.position = Vector2(14, 530)
	sheet.size = Vector2(1252, 258)
	sheet.wrap_mode = TextEdit.LINE_WRAPPING_BOUNDARY
	sheet.add_theme_font_size_override("font_size", 16)
	sheet.text = WritingStore.sheet_text
	sheet.text_changed.connect(func(): WritingStore.set_sheet_text(sheet.text))
	add_child(sheet)

	# THE DOOR — the world, below the glass. The route restored by the latent
	# pass: the intake still opens first, and this is the one way through.
	world_btn = Button.new()
	world_btn.text = "THE WORLD — through the glass"
	world_btn.position = Vector2(990, 770)
	world_btn.pressed.connect(_open_world)
	add_child(world_btn)

	_on_view()

	# The eyes, on the explicit flag only — the game a player opens never has
	# a harness in it. Attached at the root so it survives the scene reloads
	# it drives; a reload finds it already there and does not add a second.
	var harness := ("--harness" in OS.get_cmdline_args()
			or "--harness" in OS.get_cmdline_user_args())
	if harness and not get_tree().root.has_node("Check"):
		var h: Node = load("res://tools/writing_check.gd").new()
		h.name = "Check"
		get_tree().root.add_child.call_deferred(h)

	# The world's own eyes, riding the door from this side (--harness-world,
	# the shipped-build pass step 1c). Same laws: explicit flag only, attached
	# at the root so it survives the scene change it is about to cause, and
	# click.gd redirects both stores before it touches anything.
	var harness_world := ("--harness-world" in OS.get_cmdline_args()
			or "--harness-world" in OS.get_cmdline_user_args())
	if harness_world and not get_tree().root.has_node("Check"):
		var check_world: Node = load("res://tools/click.gd").new()
		check_world.name = "Check"
		get_tree().root.add_child.call_deferred(check_world)


## BLIND: the band alone. TILES: the table and the lanes. PAGE: the sheet.
func _on_view() -> void:
	var open: bool = field.get("view") == "tiles"
	var side: bool = field.get("view") == "page"
	pane_a.visible = open
	pane_b.visible = open
	table.visible = open
	ground_btn.visible = open
	sheet.visible = side
	sheet_face.visible = side
	if sheet_body != null:
		sheet_body.visible = side
	if side:
		sheet.grab_focus()
	if not open and ground != null:
		_close_ground()


## Ctrl+Enter, caught before the sheet sees it so the newline never lands in
## the writing — the same catch the 3D intake uses (intake.gd, slice 02).
func _input(event: InputEvent) -> void:
	if sheet == null or not sheet.visible:
		return
	var k := event as InputEventKey
	if k == null or not k.pressed or k.echo:
		return
	if not k.ctrl_pressed:
		return
	if k.keycode != KEY_ENTER and k.keycode != KEY_KP_ENTER:
		return
	get_viewport().set_input_as_handled()
	take_sheet()


## THE PORT — world3d/scripts/intake/deposit.gd's cut, character for
## character where it can be: lines split first, then the sentence rule
## [^.!?…]+[.!?…]*, trimmed, kept if longer than one character. Idempotent by
## content through WritingStore.bank_sheet; arrival order; no per-stone
## timestamp; THE PAGE IS NEVER CLEARED.
func take_sheet() -> void:
	var parts: Array = []
	var line := RegEx.new()
	line.compile("[^.!?…]+[.!?…]*")
	for block in sheet.text.split("\n", false):
		for m in line.search_all(block):
			var v: String = m.get_string().strip_edges()
			if v.length() > 1:
				parts.append(v)
	WritingStore.bank_sheet(parts)


## The page body, derived. Written order by stone number; merged parts do not
## double (their words live in the merged stone). An arrival renders under its
## sentence in words — "an edit arrived, held" — with colour redundant.
func _fill_sheet_body() -> void:
	if sheet_body == null:
		return
	for c in sheet_body.get_children():
		c.queue_free()
	var all: Array = WritingStore.stone_bank.duplicate()
	all.sort_custom(func(a, b): return int(a.get("n", 0)) < int(b.get("n", 0)))
	for s in all:
		if str(s.get("stage", "")) == "merged":
			continue
		var body := Label.new()
		body.text = str(s.get("text", ""))
		body.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
		body.custom_minimum_size = Vector2(1240, 0)
		body.add_theme_font_size_override("font_size", 16)
		body.add_theme_color_override("font_color", Color(0.90, 0.88, 0.82))
		sheet_body.add_child(body)
		if s.has("arrival"):
			var held := Label.new()
			held.text = "an edit arrived, held → " + str(s["arrival"].get("text", ""))
			held.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
			held.custom_minimum_size = Vector2(1240, 0)
			held.add_theme_font_size_override("font_size", 13)
			held.add_theme_color_override("font_color", Look.WATER)
			sheet_body.add_child(held)
			# taken HERE, on a face it arrived at — his click, never a rule
			var take_btn := Button.new()
			take_btn.text = "TAKE THE ARRIVED EDIT — it becomes the sentence here too"
			take_btn.size_flags_horizontal = Control.SIZE_SHRINK_BEGIN
			var held_n := int(s.get("n", -1))
			take_btn.pressed.connect(func(): WritingStore.take_arrived(held_n))
			sheet_body.add_child(take_btn)


func _open_world() -> void:
	get_tree().change_scene_to_file("res://scenes/main.tscn")


func _open_ground() -> void:
	if ground != null:
		return
	ground = load("res://scripts/writing_ground.gd").new()
	ground.position = Vector2(0, 96)
	ground.size = Vector2(1280, 704)
	ground.connect("closed", _close_ground)
	add_child(ground)


func _close_ground() -> void:
	if ground != null:
		ground.queue_free()
		ground = null
