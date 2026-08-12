extends Node
## The intake, walked. Real key events into the band, real clicks on the
## faces, real drags on the tarp — then screenshots.
##
##   ..\..\tools\godot\Godot_v4.7.1-stable_win64_console.exe --path . --harness
##
## Loaded by writing_main.gd on the --harness door only — the game a player
## opens never has this in it. Attached at the root so it survives the scene
## reloads it drives.
##
## IT NEVER OPENS KEVIN'S STORE. The first act is set_harness_store to a
## scratch under .shots/ — the step-0 guard pattern. Every print reports on
## THIS script's own sample, never on his writing.

const OUT_DIR := "res://.shots"
const PAD_STORE := "res://.shots/writing_scratch.json"

var _store: Node


func _ready() -> void:
	_run()


func _run() -> void:
	DirAccess.make_dir_recursive_absolute(ProjectSettings.globalize_path(OUT_DIR))

	_store = get_tree().root.get_node("/root/WritingStore")
	_store.call("set_harness_store", PAD_STORE)

	# rebuild the surface clean, from the scratch store
	get_tree().change_scene_to_file("res://scenes/writing.tscn")
	await _settle(12)

	# ---- blind: the sentence leaves, nothing accumulates -------------------
	await _hand("the first stone lands unseen.")
	var bank: Array = _store.get("stone_bank")
	print("check: blind — the sample left the band: %s" % str(
		bank.size() >= 1 and str(bank[bank.size() - 1]["text"]) == "the first stone lands unseen."))
	print("check: blind — the band is empty again: %s" % str(_band().text.is_empty()))
	print("check: blind — the table is hidden: %s" % str(not _table().visible))
	await _shot("01_blind")

	# ---- tiles: written order, and Enter closes the run --------------------
	await _click(_btn("TILES"))
	await _hand("A second stone arrives. And a third lands!")
	await _hand("\n")                       ## Enter on the empty band: the run closes
	bank = _store.get("stone_bank")
	print("check: tiles — three of the harness's stones are held: %s" % str(bank.size() == 3))
	print("check: tiles — the table shows: %s" % str(_table().visible))
	await _shot("02_tiles")

	# ---- given: coarse in, one rock, then gravel ---------------------------
	var sheet_a: TextEdit = _pane_sheet(0)
	sheet_a.text = "A coarse rock from a friend.\nIt came in two pieces."
	_pane_name(0).text = "ren"
	await _click(_btn("TAKE IT IN"))
	bank = _store.get("stone_bank")
	var parcel: Dictionary = bank[bank.size() - 1]
	print("check: given — the rock is whole, kind given, who carried: %s" % str(
		str(parcel["kind"]) == "given" and str(parcel["who"]) == "ren" and str(parcel["text"]).contains("\n")))
	await _click_stone(int(parcel["n"]))
	await _click(_btn("BREAK IT DOWN"))
	bank = _store.get("stone_bank")
	print("check: given — the rock became two gravel stones, source kept: %s" % str(
		bank.size() == 6 and str(bank[4]["kind"]) == "given" and str(bank[4]["who"]) == "ren"
		and str(parcel["stage"]) == "dropped"))

	# ---- fetched: coarse in, asked carried ---------------------------------
	var sheet_b: TextEdit = _pane_sheet(1)
	sheet_b.text = "What the agent brought back."
	_pane_name(1).text = "tarps"
	await _click(_btn("TAKE IT IN", 1))
	bank = _store.get("stone_bank")
	print("check: fetched — kind and asked carried: %s" % str(
		str(bank[bank.size() - 1]["kind"]) == "fetched" and str(bank[bank.size() - 1]["asked"]) == "tarps"))
	await _shot("03_sources")

	# ---- the tarp: centre to rim, outward only -----------------------------
	await _click(_btn("THE TARP"))
	await _settle(6)
	var ground: Control = _ground()
	var mid: Vector2 = ground.call("_centre_pos", 0)
	var rects: Array = ground.call("rim_rects")
	var rr: Rect2 = rects[0]
	await _drag(ground.global_position + mid + Vector2(30, 30),
			ground.global_position + rr.get_center())
	bank = _store.get("stone_bank")
	var landed := false
	for s in bank:
		if int(s.get("region", -1)) == 0:
			landed = true
	print("check: tarp — one stone landed at the rim: %s" % str(landed))
	await _shot("04_tarp")
	await _click(_btn("FOLD THE TARP"))
	await _settle(6)
	print("check: tarp — folded back to the table: %s" % str(_ground() == null))
	await _shot("04b_folded")

	# ---- a second run of the process reads the same scratch ----------------
	get_tree().change_scene_to_file("res://scenes/writing.tscn")
	await _settle(12)
	await _click(_btn("TILES"))
	print("check: hold — the stones are still there after a reload: %s" % str(
		Array(_store.get("stone_bank")).size() >= 6))
	await _shot("05_hold")

	# ---- the merge: one tile DRAGGED ONTO another (the rebuild, 2026-08-11;
	# ---- MERGE/JOIN are retired) — still written order, seams still kept ---
	var bank2: Array = _store.get("stone_bank")
	var mid_a: Vector2 = _stone_mid(2)     ## third written, the tile CARRIED
	var mid_b: Vector2 = _stone_mid(1)     ## second written, landed on
	await _drag(mid_a, mid_b)
	bank2 = _store.get("stone_bank")
	var pool_data: Dictionary = bank2[bank2.size() - 1]
	var parts_data: Array = pool_data.get("seams", [])
	print("check: merge — written order despite reverse picks: %s" % str(
		str(pool_data["text"]) == "A second stone arrives.\nAnd a third lands!"))
	print("check: merge — the seams held in the data: %s" % str(
		parts_data.size() == 2 and int(parts_data[0]["n"]) == 1 and int(parts_data[1]["n"]) == 2
		and str(parts_data[0]["text"]) == "A second stone arrives."))
	print("check: merge — shared source carried whole: %s" % str(str(pool_data["kind"]) == "self"))
	var parts_held := 0
	for s in bank2:
		if str(s.get("stage", "")) == "merged":
			parts_held += 1
	print("check: merge — both parts kept in the bank, staged merged: %s" % str(parts_held == 2))
	await _shot("06_pool")

	# ---- the seams, opened: reading only (shipped-build pass, step 3) ------
	await _click_stone(int(pool_data["n"]))
	await _click(_btn("OPEN THE SEAMS"))
	var bank3: Array = _store.get("stone_bank")
	print("check: seams — opened and the store did not change: %s" % str(
		bank3.size() == bank2.size()))
	await _shot("06b_the_seams_open")
	await _click(_btn("CLOSE THE SEAMS"))
	await _click(_btn("CLOSE"))

	# ---- sequential: the page holds; the deposit is his act ----------------
	await _click(_btn("SEQUENTIAL"))
	var sheet: TextEdit = get_tree().current_scene.get("sheet")
	await _hand("The page holds everything. Nothing leaves yet", sheet)
	bank2 = _store.get("stone_bank")
	print("check: sheet — typing fired no cut, nothing left the page: %s" % str(
		bank2.size() == 8 and sheet.text.contains("Nothing leaves yet")))
	await _shot("07_sheet")

	var hot := InputEventKey.new()
	hot.pressed = true
	hot.keycode = KEY_ENTER
	hot.physical_keycode = KEY_ENTER
	hot.ctrl_pressed = true
	Input.parse_input_event(hot)
	await _settle(6)
	bank2 = _store.get("stone_bank")
	var sheet_all := 0
	for s in bank2:
		if bool(s.get("sheet", false)):
			sheet_all += 1
	print("check: sheet — Ctrl+Enter cut the page into two stones: %s" % str(sheet_all == 2))
	print("check: sheet — the page is never cleared: %s" % str(
		sheet.text.contains("Nothing leaves yet")))
	Input.parse_input_event(hot.duplicate())
	await _settle(6)
	bank2 = _store.get("stone_bank")
	sheet_all = 0
	for s in bank2:
		if bool(s.get("sheet", false)):
			sheet_all += 1
	print("check: sheet — a second deposit doubles nothing: %s" % str(sheet_all == 2))
	await _click(_btn("TILES"))
	await _shot("08_landed")

	# ---- the held arrival: an edit is held, shown, and taken by hand -------
	await _click_stone(0)
	var pane_edit: TextEdit = _table().get("edit_sheet")
	pane_edit.text = "the first stone lands unseen, edited."
	await _click(_btn("KEEP"))
	var bank4: Array = _store.get("stone_bank")
	var stone0: Dictionary = {}
	for s in bank4:
		if int(s.get("n", -1)) == 0:
			stone0 = s
	print("check: arrival — the edit is HELD, the standing text unchanged: %s" % str(
		str(stone0["text"]) == "the first stone lands unseen."
		and str(stone0.get("arrival", {}).get("text", "")) == "the first stone lands unseen, edited."))
	await _click(_btn("CLOSE"))
	await _shot("11_the_arrival_held")
	await _click(_btn("SEQUENTIAL"))
	await _shot("12_the_sheet_shows_the_arrival")
	# taken on the face it arrived at — the page — never on the origin face
	await _click(_btn("TAKE THE ARRIVED EDIT"))
	await _click(_btn("TILES"))
	bank4 = _store.get("stone_bank")
	for s in bank4:
		if int(s.get("n", -1)) == 0:
			stone0 = s
	print("check: arrival — taken by hand, the body settles, nothing else waits: %s" % str(
		str(stone0["text"]) == "the first stone lands unseen, edited."
		and not stone0.has("arrival")))

	# ---- the pull: his selection leaves the tile onto its own stone --------
	await _click_stone(0)
	pane_edit = _table().get("edit_sheet")
	pane_edit.grab_focus()
	await _settle(2)
	pane_edit.select(0, 0, 0, 9)
	await _settle(2)
	print("check: pull — the selection reads back before the click: %s" % str(
		pane_edit.get_selected_text() == "the first"))
	await _click(_btn("PULL"))
	bank4 = _store.get("stone_bank")
	var pull_data: Dictionary = bank4[bank4.size() - 1]
	for s in bank4:
		if int(s.get("n", -1)) == 0:
			stone0 = s
	print("check: pull — the selection is its own stone, source carried: %s" % str(
		str(pull_data["text"]) == "the first" and str(pull_data["kind"]) == "self"))
	print("check: pull — the rest stands where it was: %s" % str(
		str(stone0["text"]) == "stone lands unseen, edited."))
	await _shot("13_the_pull")

	# ---- the route: intake to world and back (the latent pass, step 0) -----
	await _click(_btn("THE WORLD"))
	await _settle(12)
	print("check: route — the world reached from the intake: %s" % str(
		get_tree().current_scene.name == "Main"))
	await _shot("09_the_world_reached")
	await _click(_btn("THE INTAKE"))
	await _settle(12)
	print("check: route — the intake reached back from the world: %s" % str(
		get_tree().current_scene.name == "Writing"))
	await _shot("10_the_intake_again")

	print("check: done. shots in %s" % OUT_DIR)
	get_tree().quit(0)


# ── finding the faces ────────────────────────────────────────────────────────

func _band() -> LineEdit:
	return _check_kind(get_tree().current_scene, "LineEdit")


func _table() -> Control:
	return get_tree().current_scene.get("table")


func _ground() -> Control:
	return get_tree().current_scene.get("ground")


func _pane_sheet(k: int) -> TextEdit:
	var pane: Control = get_tree().current_scene.get("pane_a") if k == 0 else get_tree().current_scene.get("pane_b")
	return pane.get("sheet")


func _pane_name(k: int) -> LineEdit:
	var pane: Control = get_tree().current_scene.get("pane_a") if k == 0 else get_tree().current_scene.get("pane_b")
	return pane.get("name_line")


func _btn(part: String, land: int = 0) -> Button:
	var out: Array = []
	_check_btn(get_tree().root, part, out)
	if out.is_empty():
		push_error("writing_check: no face says '%s'" % part)
		get_tree().quit(1)
		return null
	return out[mini(land, out.size() - 1)]


func _check_btn(at: Node, part: String, out: Array) -> void:
	if at is Button and (at as Button).text.begins_with(part) and at.is_visible_in_tree():
		out.append(at)
	for c in at.get_children():
		_check_btn(c, part, out)


func _check_kind(at: Node, kind: String) -> Node:
	if at.get_class() == kind:
		return at
	for c in at.get_children():
		var hot := _check_kind(c, kind)
		if hot != null:
			return hot
	return null


func _stone_mid(n: int) -> Vector2:
	var table: Control = _table()
	for c in table.get_children():
		if c.get("data") != null and int(c.get("data").get("n", -1)) == n:
			return c.get_global_rect().get_center()
	push_error("writing_check: no tile for stone %d" % n)
	get_tree().quit(1)
	return Vector2.ZERO


func _click_stone(n: int) -> void:
	var table: Control = _table()
	for c in table.get_children():
		if c.get("data") != null and int(c.get("data").get("n", -1)) == n:
			await _click(c)
			return
	push_error("writing_check: no tile for stone %d" % n)
	get_tree().quit(1)


# ── the hands ────────────────────────────────────────────────────────────────

func _click(at: Control) -> void:
	if at == null:
		return
	var mid := at.get_global_rect().get_center()
	var down := InputEventMouseButton.new()
	down.button_index = MOUSE_BUTTON_LEFT
	down.pressed = true
	down.position = mid
	down.global_position = mid
	Input.parse_input_event(down)
	await _settle(2)
	var up := InputEventMouseButton.new()
	up.button_index = MOUSE_BUTTON_LEFT
	up.pressed = false
	up.position = mid
	up.global_position = mid
	Input.parse_input_event(up)
	await _settle(4)


func _drag(a: Vector2, b: Vector2) -> void:
	var down := InputEventMouseButton.new()
	down.button_index = MOUSE_BUTTON_LEFT
	down.pressed = true
	down.position = a
	down.global_position = a
	Input.parse_input_event(down)
	await _settle(2)
	for i in 8:
		var mm := InputEventMouseMotion.new()
		mm.position = a.lerp(b, (i + 1) / 8.0)
		mm.global_position = mm.position
		# the held button rides every motion — without the mask the gui never
		# captures the drag to the pressed tile, and a real hand always has it
		mm.button_mask = MOUSE_BUTTON_MASK_LEFT
		Input.parse_input_event(mm)
		await _settle(1)
	var up := InputEventMouseButton.new()
	up.button_index = MOUSE_BUTTON_LEFT
	up.pressed = false
	up.position = b
	up.global_position = b
	Input.parse_input_event(up)
	await _settle(4)


func _hand(s: String, at: Control = null) -> void:
	if at != null:
		at.grab_focus()
	else:
		_band().grab_focus()
	await _settle(2)
	for i in s.length():
		var ch := s[i]
		var down := InputEventKey.new()
		down.pressed = true
		if ch == "\n":
			down.keycode = KEY_ENTER
			down.physical_keycode = KEY_ENTER
		else:
			down.unicode = ch.unicode_at(0)
		Input.parse_input_event(down)
		await _settle(1)
		var up := InputEventKey.new()
		up.pressed = false
		if ch == "\n":
			up.keycode = KEY_ENTER
		else:
			up.unicode = ch.unicode_at(0)
		Input.parse_input_event(up)
		await _settle(1)


func _settle(n: int) -> void:
	for i in n:
		await get_tree().process_frame


func _shot(label: String) -> void:
	await _settle(4)
	await RenderingServer.frame_post_draw
	var img := get_tree().root.get_texture().get_image()
	img.save_png(ProjectSettings.globalize_path("%s/%s.png" % [OUT_DIR, label]))
	print("check: wrote %s.png" % label)
