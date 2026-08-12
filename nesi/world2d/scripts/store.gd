extends Node
## Store — the only thing in this project that touches disk.
##
## Two files, both local, both plain (law 11: nothing reaches outward):
##   user://writing.txt   the player's words, verbatim, nothing else in the file
##   user://world.json    everything the world is holding
##
## Law 12 — quitting mid-sentence loses nothing, and nothing on screen says so.
## The autosave runs on a two-second timer and on close. It emits no signal that
## any view could turn into a "saved" indicator, and there is deliberately no
## `last_saved_at` field for one to read.

signal changed          ## any world state moved — views redraw
signal water_arrived    ## an interval of writing became water

const WRITING_PATH := "user://writing.txt"
const WORLD_PATH := "user://world.json"
const SAVE_INTERVAL := 2.0

## The paths actually used. A harness redirects these to scratch files via
## use_harness_store() and NEVER touches the two live files above. Until
## 2026-08-10, main.gd DELETED the live files on --harness — the live
## writing.txt was found holding 16,923 bytes of machine filler where a
## player's words would have been destroyed the same way.
var writing_path := WRITING_PATH
var world_path := WORLD_PATH


## Called by main.gd on --harness, before any view exists. Every read and write
## from here on goes to the scratch pair; the scratch is cleared so persistence
## is proven by writing state and reading it back, never by inheriting it —
## and never by deleting a live store.
func set_harness_store() -> void:
	writing_path = "user://harness_writing.txt"
	world_path = "user://harness_world.json"
	for f in [writing_path, world_path]:
		if FileAccess.file_exists(f):
			DirAccess.remove_absolute(ProjectSettings.globalize_path(f))
	text = ""
	words_banked = 0
	tank = []
	spires = [[], [], []]
	grounds = [0.0, 0.0, 0.0]
	lake = 0.0
	cycles = 0
	stations = {}
	_dirty = false

## Law 4: the composition of a charge is FIXED. It is never derived from what
## the player wrote — no parsing, no inference, no categories read out of the
## words. Every interval yields the same three fractions in the same measure.
## The words are counted only to know that an interval passed, and that count
## never reaches the screen (law 2).
##
## THE DRAW — THIS LINE IS THE AUTHORITY. Four values were live across four
## files (100 here · 200 in `_world_template.html` and `THE_WORLD.html` · 550 in
## the 3D `waters.gd`/`spires.gd` pair · 1000 in `export_waters.py`) because
## four files were written separately. That is a collision, not a fork, and one
## authority with everything else derived from it is already the standing rule.
## The 2D ruling of 2026-08-07 retired the 3D world, and the HTML worlds are not
## the game — so this file is the only live one, and it is the authority.
## Nothing here is stated to the player: law 2 keeps the number off the screen,
## so no value in this constant is visible from inside the game.
const WORDS_PER_INTERVAL := 100
const TANK_CAPACITY := 12

enum { HEAD, DAM }

var text: String = ""
var words_banked: int = 0

## Each charge is one interval of writing. Its three fractions are separated by
## hand at the filters; nothing here sorts them.
var tank: Array = []            ## Array[Dictionary] {dissolved:int, suspended:int, bedload:int}

## Parcels on the three spires. A parcel is ONE fraction placed by hand.
##   {kind:String, stage:int, t:float}   t = travel progress, transient
var spires: Array = [[], [], []]

## What the three grounds have received. Thickness only — never shown as a number.
var grounds: Array = [0.0, 0.0, 0.0]
var lake: float = 0.0

## Completed journeys. Drives the room's light (light rises, water falls).
## Never rendered as a count.
var cycles: int = 0

## What each station is holding between openings, keyed by station.
##
## Law 12 governs this: quitting mid-sentence loses nothing, and a receiver you
## burnt shut is something the world lost — closing the panel used to un-burn it,
## which is the law being broken rather than a choice being made. Law 8 is not
## touched: nothing in here advances while the panel is shut or the program is
## not running. It is frozen where it was left, never simulated forward.
##
## Only plain values live here — floats, bools, arrays of them — because this
## dictionary goes through JSON verbatim.
var stations: Dictionary = {}

var _save_accum := 0.0
var _dirty := false
var _recount_accum := 0.0
var _recount_pending := false


func _ready() -> void:
	process_mode = Node.PROCESS_MODE_ALWAYS
	load_all()


func _process(delta: float) -> void:
	# The word count is debounced, never run per keystroke. _word_count walks the
	# whole document, so on a long piece of writing doing it on every key made
	# the field lock up under the hand — the one thing law 12 exists to prevent.
	# A third of a second late is imperceptible; a scan per keypress is not.
	if _recount_pending:
		_recount_accum += delta
		if _recount_accum >= 0.35:
			_recount_accum = 0.0
			_recount_pending = false
			_bank_intervals()

	_save_accum += delta
	if _save_accum >= SAVE_INTERVAL:
		_save_accum = 0.0
		if _dirty:
			save_all()


func _notification(what: int) -> void:
	if what == NOTIFICATION_WM_CLOSE_REQUEST or what == NOTIFICATION_PREDELETE:
		if _dirty:
			save_all()


# ── writing ───────────────────────────────────────────────────────────────────

func set_text(t: String) -> void:
	text = t
	_dirty = true
	_recount_pending = true


## Every WORDS_PER_INTERVAL words puts one charge in the tank. Deleting text does
## not un-bank water that already arrived — water that has crossed is crossed.
##
## A FULL TANK STOPS TAKING WATER. The interval still passes and is still banked,
## so nothing bursts later; the water simply does not arrive while there is no
## room for it. Without this the tank grew without bound and the stations became
## unusable after a long piece of writing. A full tank is a lawful state and is
## not announced — the vessel is simply full to the brim.
func _bank_intervals() -> void:
	var count := _word_count(text)
	while count - words_banked >= WORDS_PER_INTERVAL:
		words_banked += WORDS_PER_INTERVAL
		if tank.size() < TANK_CAPACITY:
			tank.append({"dissolved": 1, "suspended": 1, "bedload": 1})
			emit_signal("water_arrived")
			emit_signal("changed")


static func _word_count(s: String) -> int:
	var n := 0
	var inside := false
	for i in s.length():
		var c := s[i]
		var space := c == " " or c == "\n" or c == "\t" or c == "\r"
		if space:
			inside = false
		elif not inside:
			inside = true
			n += 1
	return n


## 0.0 → 1.0. Law 2: this is the only reading the tank ever exposes, and no view
## may render it as a number, a percentage, or a count of charges.
func tank_level() -> float:
	return clampf(float(tank.size()) / float(TANK_CAPACITY), 0.0, 1.0)


# ── the hand's moves ──────────────────────────────────────────────────────────

## Exit one: send a fraction down a spire. It arrives at the spire's HEAD and
## descends to the dam on its own.
func send_to_spire(charge_index: int, kind: String, spire: int) -> void:
	if not _take(charge_index, kind):
		return
	spires[spire].append({"kind": kind, "stage": HEAD, "t": 0.0})
	_dirty = true
	emit_signal("changed")


## Exit two: drop it to the lake.
func drop_to_lake(charge_index: int, kind: String) -> void:
	if not _take(charge_index, kind):
		return
	lake = minf(lake + 0.04, 1.0)
	_dirty = true
	emit_signal("changed")


## Exit three: set it down. Law 6 — no destination, no animation, no
## confirmation. It leaves the tank and goes nowhere. The absence is the
## feedback, so this function deliberately does nothing else: no counter is
## incremented, no signal beyond the redraw the emptied tank already needs.
func set_it_down(charge_index: int, kind: String) -> void:
	if not _take(charge_index, kind):
		return
	_dirty = true
	emit_signal("changed")


## What a station's fail state costs. It is NOT set-it-down: it has a
## destination — the deep — and it is allowed feedback, because the absence that
## makes set-it-down what it is would be a lie here.
func lose_to_the_deep(charge_index: int, kind: String) -> void:
	if not _take(charge_index, kind):
		return
	_dirty = true
	emit_signal("changed")


func _take(charge_index: int, kind: String) -> bool:
	if charge_index < 0 or charge_index >= tank.size():
		return false
	var charge: Dictionary = tank[charge_index]
	if int(charge.get(kind, 0)) <= 0:
		return false
	charge[kind] = int(charge[kind]) - 1
	if int(charge["dissolved"]) + int(charge["suspended"]) + int(charge["bedload"]) == 0:
		tank.remove_at(charge_index)
	return true


## The dam. The one place the operator governs rather than handles. Holding is
## the default and costs nothing — a parcel that arrives simply stays, and
## nothing asks about it (law 7). Releasing is the only act.
func release_dam(spire: int) -> void:
	var released := false
	for p in spires[spire]:
		if int(p["stage"]) == DAM:
			p["stage"] = -1     # travelling to the ground; transient
			p["t"] = 0.0
			released = true
	if released:
		_dirty = true
		emit_signal("changed")


func held_at_dam(spire: int) -> int:
	var n := 0
	for p in spires[spire]:
		if int(p["stage"]) == DAM:
			n += 1
	return n


## Called by the world view when a released parcel completes its journey.
## Suspended becomes ground. Bedload goes to the deep, which never renders.
## Dissolved passes through to the river and the lake, invisible.
func arrive_at_ground(spire: int, kind: String) -> void:
	match kind:
		"suspended":
			grounds[spire] = minf(grounds[spire] + 0.055, 1.0)
		"dissolved":
			lake = minf(lake + 0.03, 1.0)
		"bedload":
			pass                # the deep. Law 9: it never renders.
	cycles += 1
	_dirty = true
	emit_signal("changed")


## A station puts down what it is holding. Called on the acts that have a
## consequence — a lean or an aim let go of, a receiver burnt shut, a sheet torn
## — never on every frame, and it emits nothing: there is no signal here for a
## view to turn into a "saved" indicator (law 12).
func station_save(station: String, data: Dictionary) -> void:
	stations[station] = data
	_dirty = true


## What a station finds when it opens. An empty dictionary means a station that
## has never been used, and every station reads its own defaults from that.
func station_load(station: String) -> Dictionary:
	var data = stations.get(station, {})
	return data if typeof(data) == TYPE_DICTIONARY else {}


## Light rises. The room's brightness is a function of completed cycles, and a
## world that has never cycled is nearly dark.
func light() -> float:
	return clampf(1.0 - exp(-float(cycles) / 9.0), 0.0, 1.0)


# ── disk ──────────────────────────────────────────────────────────────────────

func save_all() -> void:
	var f := FileAccess.open(writing_path, FileAccess.WRITE)
	if f:
		f.store_string(text)      # verbatim, nothing added
		f.close()

	var clean_spires := []
	for s in spires:
		var arr := []
		for p in s:
			# A parcel mid-travel is written down at the place it last rested.
			var stage := int(p["stage"])
			arr.append({"kind": p["kind"], "stage": HEAD if stage == HEAD else DAM})
		clean_spires.append(arr)

	var data := {
		"words_banked": words_banked,
		"tank": tank,
		"spires": clean_spires,
		"grounds": grounds,
		"lake": lake,
		"cycles": cycles,
		"stations": stations,
	}
	var g := FileAccess.open(world_path, FileAccess.WRITE)
	if g:
		g.store_string(JSON.stringify(data, "  "))
		g.close()
	_dirty = false


func load_all() -> void:
	if FileAccess.file_exists(writing_path):
		var f := FileAccess.open(writing_path, FileAccess.READ)
		if f:
			text = f.get_as_text()
			f.close()

	if not FileAccess.file_exists(world_path):
		return
	var g := FileAccess.open(world_path, FileAccess.READ)
	if g == null:
		return
	var parsed = JSON.parse_string(g.get_as_text())
	g.close()
	if typeof(parsed) != TYPE_DICTIONARY:
		return

	words_banked = int(parsed.get("words_banked", 0))
	tank = []
	for c in parsed.get("tank", []):
		tank.append({
			"dissolved": int(c.get("dissolved", 0)),
			"suspended": int(c.get("suspended", 0)),
			"bedload": int(c.get("bedload", 0)),
		})
	spires = [[], [], []]
	var loaded_spires: Array = parsed.get("spires", [])
	for i in mini(loaded_spires.size(), 3):
		for p in loaded_spires[i]:
			spires[i].append({
				"kind": String(p.get("kind", "suspended")),
				"stage": int(p.get("stage", DAM)),
				"t": 0.0,
			})
	grounds = [0.0, 0.0, 0.0]
	var loaded_grounds: Array = parsed.get("grounds", [])
	for i in mini(loaded_grounds.size(), 3):
		grounds[i] = float(loaded_grounds[i])
	lake = float(parsed.get("lake", 0.0))
	cycles = int(parsed.get("cycles", 0))
	stations = {}
	var loaded_stations = parsed.get("stations", {})
	if typeof(loaded_stations) == TYPE_DICTIONARY:
		stations = loaded_stations
