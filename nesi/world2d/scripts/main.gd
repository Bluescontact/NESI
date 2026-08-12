extends Control
## NESI — the root. One window, two zones, always both visible.
##
## Build order of the children matters and is the screen's layering, bottom up:
##   world   the triangle, seen through the glass
##   field   the writing sheet, over the world and never over the room
##   room    the band, the tank, the four stations, the glass itself
##   panel   whatever a station or a dam has opened, over everything below it

## All four stations now have a game. The floor required the other three to say
## theirs was not built; they no longer say it because it no longer would be true.
const PANELS := {
	"filters": "res://scripts/filters_panel.gd",
	"water_table": "res://scripts/water_table.gd",
	"heliostat": "res://scripts/heliostat_panel.gd",
	"membrane": "res://scripts/membrane_panel.gd",
}

var world: WorldView
var field: FieldView
var room: RoomView
var panel: Control = null
var writing_btn: Button


func _ready() -> void:
	set_anchors_preset(Control.PRESET_FULL_RECT)

	var harness := ("--harness" in OS.get_cmdline_args()
			or "--harness" in OS.get_cmdline_user_args())
	if harness:
		# The eyes start from a world that has never cycled, so persistence is
		# proven by writing state and reading it back rather than by inheriting
		# it. Until 2026-08-10 this branch DELETED the live writing.txt and
		# world.json — a harness could reach a player's real words. It now
		# redirects the Store to a scratch pair and clears only those; the live
		# files are never opened on any harness path.
		Store.set_harness_store()

	world = WorldView.new()
	add_child(world)

	field = FieldView.new()
	add_child(field)

	room = RoomView.new()
	room.station_clicked.connect(_open_station)
	add_child(room)

	world.dam_clicked.connect(_open_dam)

	# THE DOOR BACK — the intake, where the program opens. The route restored
	# by the latent pass, 2026-08-10; without it the world was a one-way trip.
	writing_btn = Button.new()
	writing_btn.text = "THE INTAKE — the writing"
	writing_btn.position = Vector2(1030, 770)
	writing_btn.pressed.connect(_open_writing)
	add_child(writing_btn)

	# The eyes. Only ever attached on an explicit flag — the game a player opens
	# never has a harness in it. The Check guard mirrors writing_main's: when
	# the intake's harness rode a scene change here, a second pair of eyes
	# must not attach over it.
	if harness and not get_tree().root.has_node("Check"):
		var h: Node = load("res://tools/click.gd").new()
		h.set("main", self)
		add_child(h)

	# Criterion 2, proven the only way it can be: type mid-sentence, let the
	# autosave interval pass, and then kill the process outright — no close
	# notification, no chance to flush. A second run reads what survived.
	# The probe types machine text into the field, and the field saves to the
	# Store — so it may only run when the Store is on the harness scratch. On a
	# live store its sentence would land in the player's own file (that is the
	# machine fragment found at the end of the live writing.txt, 2026-08-10).
	if "--forcequit" in OS.get_cmdline_user_args():
		if harness:
			_force_quit_probe.call_deferred()
		else:
			push_error("main: --forcequit refused without --harness — the probe writes, and only the scratch store may receive it")


func _open_writing() -> void:
	get_tree().change_scene_to_file("res://scenes/writing.tscn")


func _force_quit_probe() -> void:
	field.edit.text = "the sentence that was being written when the power went ou"
	field._on_changed()
	await get_tree().create_timer(3.0).timeout
	print("[forcequit] killing the process now, mid-sentence, with no clean exit")
	OS.kill(OS.get_process_id())


func _unhandled_input(event: InputEvent) -> void:
	if not (event is InputEventKey) or not event.pressed or event.echo:
		return
	if event.keycode == KEY_ESCAPE:
		if panel != null:
			_close_panel()
		else:
			field.set_open(not field.is_open())
		get_viewport().set_input_as_handled()


func _open_station(key: String) -> void:
	_close_panel()
	# a panel opens over the world; the field lies aside while it is open
	if field.is_open():
		field.set_open(false)
	var p: Control = load(PANELS[key]).new()
	p.closed.connect(_close_panel)
	panel = p
	add_child(panel)
	move_child(panel, get_child_count() - 1)


func _open_dam(spire: int) -> void:
	if panel != null:
		return
	var d := DamChoice.new()
	d.spire = spire
	d.at = Look.spire_dam(spire)
	d.release.connect(func(s: int): Store.release_dam(s))
	d.closed.connect(_close_panel)
	panel = d
	add_child(panel)
	move_child(panel, get_child_count() - 1)


func _close_panel() -> void:
	if panel != null:
		panel.queue_free()
		panel = null
