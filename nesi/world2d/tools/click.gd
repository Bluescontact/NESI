extends Node
## click.gd — the 2D eyes.
##
## The 3D build verified itself with tools/walk.gd, which drives an avatar
## through a world. There is no avatar in 2D, so that organ cannot see this
## build at all. This is its replacement: it runs inside the real scene, types
## real text into the real field, clicks the real stations, takes each of the
## three exits, releases a real dam, and writes a PNG at every stop.
##
## The PNGs are the evidence. A clean exit code is not.
##
##   godot --path . -- --harness
##
## Frames land in res://.shots/.

const SHOTS := "res://.shots/"

var main: Node
var shot_n := 0


func _ready() -> void:
	DirAccess.make_dir_recursive_absolute(ProjectSettings.globalize_path(SHOTS))
	run_pass.call_deferred()


# ── the harness ───────────────────────────────────────────────────────────────

func settle(frames: int = 4) -> void:
	for i in frames:
		await get_tree().process_frame


func shot(name: String) -> void:
	await settle(3)
	await RenderingServer.frame_post_draw
	var img := get_viewport().get_texture().get_image()
	var path := SHOTS + "%02d_%s.png" % [shot_n, name]
	img.save_png(ProjectSettings.globalize_path(path))
	print("[shot] ", path)
	shot_n += 1


## A face-finder for the door ride: the first visible button whose face
## begins with the given words. The same search writing_check.gd uses.
func _face(part: String, from: Node = null) -> Button:
	if from == null:
		from = get_tree().root
	if from is Button and (from as Button).text.begins_with(part) and from.is_visible_in_tree():
		return from
	for c in from.get_children():
		var hot := _face(part, c)
		if hot != null:
			return hot
	return null


func click(at: Vector2) -> void:
	var m := InputEventMouseMotion.new()
	m.position = at
	m.global_position = at
	Input.parse_input_event(m)
	await get_tree().process_frame
	for pressed in [true, false]:
		var e := InputEventMouseButton.new()
		e.button_index = MOUSE_BUTTON_LEFT
		e.button_mask = MOUSE_BUTTON_MASK_LEFT if pressed else 0
		e.pressed = pressed
		e.position = at
		e.global_position = at
		Input.parse_input_event(e)
		await get_tree().process_frame
	await settle(2)


func drag(from: Vector2, to: Vector2) -> void:
	var m := InputEventMouseMotion.new()
	m.position = from
	m.global_position = from
	Input.parse_input_event(m)
	await get_tree().process_frame

	var down := InputEventMouseButton.new()
	down.button_index = MOUSE_BUTTON_LEFT
	down.button_mask = MOUSE_BUTTON_MASK_LEFT
	down.pressed = true
	down.position = from
	down.global_position = from
	Input.parse_input_event(down)
	await get_tree().process_frame

	for k in 6:
		var mid := from.lerp(to, float(k + 1) / 6.0)
		var mm := InputEventMouseMotion.new()
		mm.position = mid
		mm.global_position = mid
		mm.button_mask = MOUSE_BUTTON_MASK_LEFT
		Input.parse_input_event(mm)
		await get_tree().process_frame

	var up := InputEventMouseButton.new()
	up.button_index = MOUSE_BUTTON_LEFT
	up.pressed = false
	up.position = to
	up.global_position = to
	Input.parse_input_event(up)
	await settle(3)


func esc() -> void:
	for pressed in [true, false]:
		var e := InputEventKey.new()
		e.keycode = KEY_ESCAPE
		e.physical_keycode = KEY_ESCAPE
		e.pressed = pressed
		Input.parse_input_event(e)
		await get_tree().process_frame
	await settle(2)


## One fraction, taken by hand from the tray to a named exit. Verified by the
## tray actually shrinking — a drag that silently did nothing is the failure
## this harness exists to catch, so it is retried once and then reported.
func take(panel, to: Vector2, what: String) -> void:
	for attempt in 2:
		var motes: Array = panel._motes()
		if motes.is_empty():
			print("[take] nothing in the tray for ", what)
			return
		var before := motes.size()
		await drag(motes[0]["pos"], to)
		await settle(3)
		if panel._motes().size() < before:
			print("[take] ", motes[0]["kind"], " -> ", what)
			return
	print("[take] FAILED -> ", what)


func words(n: int) -> String:
	var parts := PackedStringArray()
	for i in n:
		parts.append("word%d" % i)
	return " ".join(parts)


# ── the four stations ─────────────────────────────────────────────────────────

## Pick a fraction out of the tray and put it somewhere. Verified by the tray
## shrinking, because a drag that silently did nothing is exactly the failure
## this harness exists to catch.
func hand(panel, to: Vector2, what: String) -> bool:
	for attempt in 2:
		var ms: Array = panel.motes()
		if ms.is_empty():
			print("[hand] nothing in the tray for ", what)
			return false
		var before := ms.size()
		await drag(ms[0]["pos"], to)
		await settle(3)
		if panel.motes().size() < before:
			print("[hand] ", ms[0]["kind"], " -> ", what)
			return true
	print("[hand] FAILED -> ", what)
	return false


func open_station(i: int):
	await click(main.room.station_rect(i).get_center())
	await settle(4)
	return main.panel


## Every station is checked the same way: the act moves and picks a spire, the
## fail state actually fires, and all three outputs are reachable.
func check_station(i: int, name: String, drag_to: Callable, fail_to: Callable) -> void:
	print("
=== ", name)
	var p = await open_station(i)
	if p == null:
		print("[station] FAILED — did not open")
		return
	await shot(name + "_opens")

	# the act — drag it somewhere that points at a spire, then give it water
	await drag(p.ACT.get_center(), drag_to.call(p))
	await settle(4)
	var s: int = p.act_spire()
	print("[act] pointing at spire ", s)
	await shot(name + "_act_aimed")
	var before_spire: int = Store.spires[maxi(s, 0)].size()
	await hand(p, p.ACT.get_center(), "the act (spire %d)" % s)
	var landed: bool = s >= 0 and Store.spires[s].size() > before_spire
	print("[act] water reached spire ", s, ": ", landed)
	await shot(name + "_water_sent")

	# the fail state
	if fail_to.is_valid():
		await drag(p.ACT.get_center(), fail_to.call(p))
		await settle(6)
		print("[fail] the station is in its fail state: ", p.act_fails(),
				"  (spire now: ", p.act_spire(), ")")
		await shot(name + "_fail_state")

	# the other two outputs
	await hand(p, p.plate_lake().get_center(), "the lake")
	await hand(p, p.plate_down().get_center(), "set it down")
	await shot(name + "_three_outputs")
	await esc()


# ── the pass ──────────────────────────────────────────────────────────────────

func run_pass() -> void:
	# THE DOOR RIDE — step 1c of the shipped-build pass. When these eyes are
	# attached on the intake side (--harness-world), main is not set yet: the
	# stores are redirected FIRST (neither of Kevin's files is ever opened),
	# then the same door a hand would use is clicked, and the walk continues
	# unchanged on the other side. Nothing about the door's behaviour changes.
	if main == null:
		WritingStore.call("set_harness_store", "res://.shots/writing_scratch.json")
		Store.set_harness_store()
		await settle(10)
		var world_face := _face("THE WORLD")
		if world_face == null:
			push_error("click: no face says THE WORLD — the door is missing")
			get_tree().quit(1)
			return
		await click(world_face.get_global_rect().get_center())
		await settle(14)
		main = get_tree().current_scene
		if main == null or main.name != "Main":
			push_error("click: the door did not reach the world")
			get_tree().quit(1)
			return
		print("[ride] the eyes rode the door from the intake side")
		await shot("rode_the_door_from_the_intake")

	await settle(8)
	await shot("opens_in_the_field")

	# the tank, filled by writing. The cap is 12 charges, so ask for plenty.
	main.field.edit.text = words(2000)
	main.field._on_changed()
	await settle(45)          # the count is debounced now, so give it time
	print("[tank] charges: ", Store.tank.size(), " (cap ", Store.TANK_CAPACITY, ")")
	await shot("tank_full")

	await esc()
	await shot("the_world")

	# THE FILTERS — the hand sorts, unchanged from the floor
	print("
=== the_filters")
	var fp = await open_station(3)
	await shot("the_filters_opens")
	var sr: Array = fp._spire_rects()
	var er: Dictionary = fp._exit_rects()
	for target in [sr[0].get_center(), er["lake"].get_center(), er["down"].get_center()]:
		var ms: Array = fp._motes()
		if ms.size() > 0:
			await drag(ms[0]["pos"], target)
			await settle(3)
	print("[filters] three outputs taken; tray now ", fp._motes().size())
	await shot("the_filters_three_outputs")
	await esc()

	# THE WATER TABLE — lean it. Fail: over the rim.
	await check_station(0, "the_water_table",
		func(p): return p.ACT.get_center() + Vector2(0, -p.R * 0.7),
		func(p): return p.ACT.get_center() + Vector2(0, -p.R * 1.45))

	# THE MEMBRANE — pull it. Fail: the tear.
	await check_station(2, "the_membrane",
		func(p): return p._anchor(0),
		func(p): return p.ACT.get_center() + Vector2(0, p.REACH * 1.4))

	# THE HELIOSTAT — turn the mirror. Fail: burn it too far.
	print("
=== the_heliostat")
	var hp = await open_station(1)
	await shot("the_heliostat_opens")
	await drag(hp.ACT.get_center(), hp._receiver(0))
	await settle(4)
	print("[act] beam on spire ", hp.act_spire())
	await shot("the_heliostat_act_aimed")
	var b0: int = Store.spires[0].size()
	await hand(hp, hp.ACT.get_center(), "the beam (spire 0)")
	print("[act] water rode the beam to spire 0: ", Store.spires[0].size() > b0)
	await shot("the_heliostat_water_sent")
	# hold the beam past what the receiver carries
	await settle(260)
	print("[fail] receiver 0 scorched: ", hp.scorched[0], " — beam now points at ", hp.act_spire())
	await shot("the_heliostat_burnt")
	await hand(hp, hp.plate_lake().get_center(), "the lake")
	await hand(hp, hp.plate_down().get_center(), "set it down")
	await shot("the_heliostat_three_outputs")
	await esc()

	# STATION STATE — law 12. The panel has just been freed. A receiver burnt
	# shut is something the world lost, so opening the station again must find
	# it still shut. Before 2026-08-09 this printed false.
	hp = await open_station(1)
	print("[station] receiver 0 still shut after the panel was closed: ", hp.scorched[0])
	await shot("the_heliostat_still_shut")
	await esc()

	# the world, with everything the four stations sent to it
	await shot("the_world_after_four_stations")
	await settle(500)
	for i in 3:
		if Store.held_at_dam(i) > 0:
			await click(Look.spire_dam(i))
			var dd = main.panel
			if dd != null and dd is DamChoice:
				await click(dd._btn(0).get_center())
	await settle(320)
	await shot("the_ground_has_changed")
	print("
[state] cycles=", Store.cycles, " grounds=", Store.grounds,
			" lake=", snappedf(Store.lake, 0.001), " light=", snappedf(Store.light(), 0.001))

	# persistence, unchanged
	main.field.set_open(true)
	main.field.edit.text = words(2000) + " and this sentence is cut off mid-"
	main.field._on_changed()
	await settle(40)
	Store.save_all()
	var before := {
		"text": Store.text, "tank": Store.tank.size(),
		"spires": [Store.spires[0].size(), Store.spires[1].size(), Store.spires[2].size()],
		"grounds": Store.grounds.duplicate(), "lake": Store.lake, "cycles": Store.cycles,
	}
	Store.text = ""
	Store.tank = []
	Store.spires = [[], [], []]
	Store.grounds = [0.0, 0.0, 0.0]
	Store.lake = 0.0
	Store.cycles = 0
	Store.stations = {}
	Store.load_all()
	# what the stations were holding has to come back off disk with everything
	# else, or law 12 only half holds
	var heliostat_data := Store.station_load("heliostat")
	print("[persist] heliostat off disk: scorched=", heliostat_data.get("scorched", []),
			" aim=", snappedf(float(heliostat_data.get("aim", 0.0)), 0.001))
	print("[persist] water table off disk: tilt=", Store.station_load("water_table").get("tilt", []))
	print("[persist] membrane off disk: torn=", Store.station_load("membrane").get("torn", 0.0))
	var ok: bool = (Store.text == before["text"]
			and Store.tank.size() == int(before["tank"])
			and Store.spires[0].size() == int(before["spires"][0])
			and Store.spires[1].size() == int(before["spires"][1])
			and Store.spires[2].size() == int(before["spires"][2])
			and is_equal_approx(Store.grounds[0], float(before["grounds"][0]))
			and is_equal_approx(Store.lake, float(before["lake"]))
			and Store.cycles == int(before["cycles"]))
	print("[persist] round trip identical: ", ok)
	main.field.edit.text = Store.text
	main.field.set_open(false)
	Store.changed.emit()
	await settle(6)
	await shot("after_reopen")

	print("[done] shots in ", ProjectSettings.globalize_path(SHOTS))
	get_tree().quit(0)
