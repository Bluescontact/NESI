extends Node
## THE ONE STORE of the intake — one file, one write path, every law enforced
## here and nowhere else.
##
## Every piece of writing is a stone. A stone's keys, from the first line:
##   text    verbatim, the machine never changes it — only edit_stone, which is
##           wired to Kevin's own hand and to nothing else
##   kind    "self" | "given" | "fetched" — where it came from. Stored at entry,
##           NEVER editable by anything, always drawn on the face.
##   who     given only — the person it came from, as typed
##   asked   fetched only — what was asked, as typed
##   run     which sitting of consecutive sentences it belongs to
##   stage   "held" | "sent" | "dropped" | "down" — the three dispositions plus
##           unprocessed. A data state, not a UI feature. "down" is set-down-
##           and-sent-nowhere and gets no destination, ever.
##   mark    Kevin's own label, by hand, or ""
##   lines   hand-made lines to other stones — a list of stone numbers
##   pos     where his hand left it on the table, or null (arrival layout)
##   region  which tarp region it landed in, or -1 (the centre pile)
##
## NOTHING IS COUNTED to the player. No total ever reaches a face.
## NOTHING SAYS "SAVED". The save emits nothing a view could turn into a
## confirmation. Writing survives a force-quit: every bank writes at once,
## and the band's unfinished text rides along on a two-second timer.

signal changed

const STORE_NAME := "user://writing_stones.json"
const SAVE_SPACE := 2.0

## A harness sets this to a scratch file, and only a harness. Same law as the
## 3D tree's overrides and this project's set_harness_store: a tool, test or
## walk can never open the live store. Step-0 guard, 2026-08-10.
var harness_path := ""

var stone_bank: Array = []
var region_names: Dictionary = {}     ## tarp region names, typed by Kevin's hand
var held_text := ""              ## the band's unfinished writing
var sheet_text := ""             ## the sequential page — nothing leaves it
var _dirty := false
var _accum := 0.0


func _ready() -> void:
	process_mode = Node.PROCESS_MODE_ALWAYS
	load_all()


func _process(dt: float) -> void:
	_accum += dt
	if _accum >= SAVE_SPACE:
		_accum = 0.0
		if _dirty:
			save_all()


func _notification(what: int) -> void:
	if what == NOTIFICATION_WM_CLOSE_REQUEST or what == NOTIFICATION_PREDELETE:
		if _dirty:
			save_all()


func store_path() -> String:
	if harness_path != "":
		return ProjectSettings.globalize_path(harness_path)
	return ProjectSettings.globalize_path(STORE_NAME)


## The harness door. Points every read and write at scratch and starts empty.
func set_harness_store(scratch: String) -> void:
	harness_path = scratch
	var path := store_path()
	if FileAccess.file_exists(path):
		DirAccess.remove_absolute(path)
	stone_bank = []
	region_names = {}
	held_text = ""
	_dirty = false
	emit_signal("changed")


# ── the acts. Every one is wired to a hand; nothing here fires on its own. ────

## Stone numbers only ever go up — a sheet re-deposit removes rows, so size()
## would hand out a number twice and break every line and seam that names it.
func _top_n() -> int:
	var top := -1
	for s in stone_bank:
		top = maxi(top, int(s.get("n", -1)))
	return top + 1


func bank_stone(text: String, kind: String, who: String, asked: String, run: int) -> void:
	stone_bank.append({
		"n": _top_n(),
		"text": text,                 ## VERBATIM — typos kept
		"kind": kind,                 ## never touched again by anything
		"who": who,
		"asked": asked,
		"run": run,
		"stage": "held",
		"mark": "",
		"lines": [],
		"pos": null,
		"region": -1,
	})
	save_all()
	emit_signal("changed")


## A stone's number is its name, not its place in the bank — the sheet
## re-deposit removes rows, so the two diverge. Every act looks up by number.
func _row_n(n: int) -> int:
	for i in stone_bank.size():
		if int(stone_bank[i].get("n", -1)) == n:
			return i
	return -1


func stage_stone(n: int, stage: String) -> void:
	var i := _row_n(n)
	if i < 0:
		return
	stone_bank[i]["stage"] = stage
	save_all()
	emit_signal("changed")


## Kevin may edit his own words. The machine may not — nothing calls this but
## the pane his hand types into. kind/who/asked are deliberately unreachable.
func edit_stone(n: int, text: String) -> void:
	var i := _row_n(n)
	if i < 0:
		return
	stone_bank[i]["text"] = text
	save_all()
	emit_signal("changed")


## THE HELD ARRIVAL (Kevin's amendment, 2026-08-11). An edit made on one face
## does not silently become the sentence everywhere. It is held on the stone
## as an offer — the face it was made on shows it as its reading; every other
## face shows the standing text with the arrival highlighted and attached.
## TAKING it is his click on another face, and only that click settles the
## body. No timer, no auto-accept, no machine acknowledgement — an arrival
## that is never taken simply stays held, because held is lawful.
## (The words this mechanism wanted — "offer", "keep" — are not on the
## lexicon; recorded in LEXICON_CANDIDATES. Built from "arrive" and "take".)
func arrive_stone(n: int, text: String, face: String) -> void:
	var i := _row_n(n)
	if i < 0:
		return
	if text == str(stone_bank[i]["text"]):
		if stone_bank[i].has("arrival"):
			stone_bank[i].erase("arrival")
	else:
		stone_bank[i]["arrival"] = {"text": text, "face": face}
	save_all()
	emit_signal("changed")


func take_arrived(n: int) -> void:
	var i := _row_n(n)
	if i < 0 or not stone_bank[i].has("arrival"):
		return
	stone_bank[i]["text"] = stone_bank[i]["arrival"]["text"]
	stone_bank[i].erase("arrival")
	save_all()
	emit_signal("changed")


## THE PULL — his selection leaves the tile onto its own stone. His select,
## his click; the machine only carries what the hand chose. Source carried.
func pull_stone(n: int, text: String) -> void:
	var i := _row_n(n)
	if i < 0 or text.strip_edges().is_empty():
		return
	var body := str(stone_bank[i]["text"])
	var at := body.find(text)
	if at < 0:
		return
	stone_bank[i]["text"] = (body.substr(0, at) + body.substr(at + text.length())).strip_edges()
	bank_stone(text.strip_edges(), str(stone_bank[i]["kind"]),
			str(stone_bank[i].get("who", "")), str(stone_bank[i].get("asked", "")), open_run())


func mark_stone(n: int, mark: String) -> void:
	var i := _row_n(n)
	if i < 0:
		return
	stone_bank[i]["mark"] = mark
	save_all()
	emit_signal("changed")


func line_stone(a: int, b: int) -> void:
	var i := _row_n(a)
	if i < 0 or _row_n(b) < 0 or a == b:
		return
	var line_data: Array = stone_bank[i]["lines"]
	if not line_data.has(b):
		line_data.append(b)
	save_all()
	emit_signal("changed")


func set_stone_pos(n: int, pos: Vector2) -> void:
	var i := _row_n(n)
	if i < 0:
		return
	stone_bank[i]["pos"] = [pos.x, pos.y]
	save_all()


## The tarp. Centre to region, once. A landed stone never returns.
func ground_stone(n: int, region: int) -> void:
	var i := _row_n(n)
	if i < 0:
		return
	if int(stone_bank[i]["region"]) != -1:
		return
	stone_bank[i]["region"] = region
	save_all()
	emit_signal("changed")


func name_region(region: int, name: String) -> void:
	region_names[str(region)] = name
	save_all()


## THE MERGE — the first move of level 2 and the only one. Two or more stones
## become one, verbatim, IN WRITTEN ORDER — by their numbers, never by the
## order they were picked. THE SEAMS ARE KEPT IN THE DATA: every part is
## snapshotted on the merged stone AND stays in the bank, staged "merged", so
## a merge could be taken apart later. No unmerge control exists — whether a
## merge can be undone is unmarked and is Kevin's; preserving the option
## costs nothing, deciding it is not this file's.
##
## Source: one shared source is carried; differing sources are ALL carried,
## visibly, joined on the face — never one picked, never blanked.
func pool_stone(picks: Array) -> void:
	if picks.size() < 2:
		return
	var parts: Array = []
	for s in stone_bank:
		if picks.has(int(s.get("n", -1))) and str(s.get("stage", "")) == "held":
			parts.append(s)
	if parts.size() < 2:
		return
	# written order — as it came, never as it was picked
	parts.sort_custom(func(a, b): return int(a["n"]) < int(b["n"]))

	var body := ""
	var kind_all: Array = []
	var name_all := ""
	var target_all := ""
	var parts_data: Array = []
	for p in parts:
		if body != "":
			body += "\n"
		body += str(p["text"])                        ## VERBATIM, joined only
		if not kind_all.has(str(p["kind"])):
			kind_all.append(str(p["kind"]))
		if str(p.get("who", "")) != "" and not name_all.contains(str(p["who"])):
			name_all += (" · " if name_all != "" else "") + str(p["who"])
		if str(p.get("asked", "")) != "" and not target_all.contains(str(p["asked"])):
			target_all += (" · " if target_all != "" else "") + str(p["asked"])
		parts_data.append({
			"n": int(p["n"]),
			"text": str(p["text"]),
			"kind": str(p["kind"]),
			"who": str(p.get("who", "")),
			"asked": str(p.get("asked", "")),
		})
		p["stage"] = "merged"

	var kind := " · ".join(kind_all)          ## all sources, visible on the face
	stone_bank.append({
		"n": _top_n(),
		"text": body,
		"kind": kind,
		"who": name_all,
		"asked": target_all,
		"run": int(parts[0].get("run", 0)),
		"stage": "held",
		"mark": "",
		"lines": [],
		"pos": parts[0].get("pos"),
		"region": -1,
		"seams": parts_data,
	})
	save_all()
	emit_signal("changed")


## THE SHEET DEPOSIT — ported from world3d/scripts/intake/deposit.gd, which
## states its own provenance (the cut rule of nesi/_world_template.html D5,
## the Shore's store, the 2026-08-02 mark). Idempotent by content: this
## replaces the sheet's previous stones — held ones only, so an act already
## taken on one is never undone — and THE PAGE IS NEVER CLEARED. Arrival
## order, no per-stone timestamp.
func bank_sheet(cut: Array) -> void:
	var held_all: Array = []
	for s in stone_bank:
		if bool(s.get("sheet", false)) and str(s.get("stage", "")) == "held":
			continue
		held_all.append(s)
	stone_bank = held_all
	var run := open_run()
	for text in cut:
		stone_bank.append({
			"n": _top_n(),
			"text": str(text),
			"kind": "self",
			"who": "",
			"asked": "",
			"run": run,
			"stage": "held",
			"mark": "",
			"lines": [],
			"pos": null,
			"region": -1,
			"sheet": true,
		})
	save_all()
	emit_signal("changed")


func set_sheet_text(text: String) -> void:
	sheet_text = text
	_dirty = true


func set_held_text(text: String) -> void:
	held_text = text
	_dirty = true


func open_run() -> int:
	var top := -1
	for s in stone_bank:
		top = maxi(top, int(s.get("run", 0)))
	return top + 1


# ── disk. The one writer. Same discipline as the 3D intake: pad, read check_data, ──
# ── compare, and only then replace. A bad write never destroys a good file. ──

func save_all() -> void:
	var body := JSON.stringify({
		"stone_bank": stone_bank,
		"region_names": region_names,
		"held": held_text,
		"sheet": sheet_text,
	}, " ")
	var path := store_path()
	DirAccess.make_dir_recursive_absolute(path.get_base_dir())
	var pad := path + ".pad"

	var f := FileAccess.open(pad, FileAccess.WRITE)
	if f == null:
		push_error("[writing] could not open %s (err %d) — the store is untouched" % [pad, FileAccess.get_open_error()])
		return
	f.store_string(body)
	f.close()

	var check := FileAccess.open(pad, FileAccess.READ)
	if check == null:
		push_error("[writing] wrote %s but could not read it again — the store is untouched" % pad)
		return
	var check_data := check.get_as_text()
	check.close()
	if check_data != body:
		push_error("[writing] %s did not round-trip — the store is untouched" % pad)
		return

	if FileAccess.file_exists(path):
		DirAccess.remove_absolute(path)
	if DirAccess.rename_absolute(pad, path) != OK:
		push_error("[writing] could not move %s onto %s — the text is in the .pad" % [pad, path])
		return
	_dirty = false


func load_all() -> void:
	var path := store_path()
	if not FileAccess.file_exists(path):
		return
	var f := FileAccess.open(path, FileAccess.READ)
	if f == null:
		push_error("[writing] could not read %s — refusing to write over it" % path)
		set_process(false)
		return
	var parsed = JSON.parse_string(f.get_as_text())
	f.close()
	if typeof(parsed) != TYPE_DICTIONARY:
		return
	stone_bank = parsed.get("stone_bank", [])
	var loaded = parsed.get("region_names", {})
	region_names = loaded if typeof(loaded) == TYPE_DICTIONARY else {}
	held_text = str(parsed.get("held", ""))
	sheet_text = str(parsed.get("sheet", ""))
