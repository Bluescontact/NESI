extends Control
## SELF — the band. One sentence at a time, into the one store.
##
## THE CUT, exactly as ordered:
##   - punctuation ( . ! ? … ) fires it
##   - a bare "." or "..." with no letter or digit is not a sentence
##   - a period between two digits is not an ending
##   - Enter is the override and drops what is held, finished or not
##   - Enter on an empty band closes the run
##
## Punctuation is inspected for ONE purpose — to find where a sentence ends.
## Nothing else about the text is parsed, scored, or classified.
##
## TWO VIEWS, both this same band and the same store path:
##   blind — each sentence leaves as it is finished; nothing accumulates in
##           view and nothing is said
##   tiles — each sentence its own tile on the table, grouped in written order
##
## The band's unfinished text rides the store's two-second save, so a
## force-quit mid-sentence loses nothing — and nothing on screen says so.

signal view_changed

var view := "blind"
var band: LineEdit
var paper_btn: Button
var table_btn: Button
var sheet_btn: Button
var _run := 0
var _pending := false


func _ready() -> void:
	var face := Label.new()
	face.text = "SELF — write here. Punctuation ends a sentence and it leaves. Enter drops what is held, finished or not. Enter on an empty bar closes the run."
	face.position = Vector2(14, 8)
	face.add_theme_font_size_override("font_size", 13)
	face.add_theme_color_override("font_color", Look.STONE_LIT)
	add_child(face)

	band = LineEdit.new()
	band.position = Vector2(14, 34)
	band.size = Vector2(920, 40)
	band.add_theme_font_size_override("font_size", 18)
	band.text = WritingStore.held_text
	band.caret_column = band.text.length()
	band.text_changed.connect(_on_changed)
	band.text_submitted.connect(_on_done)
	add_child(band)

	paper_btn = Button.new()
	paper_btn.text = "BLIND — each sentence leaves as it is finished; nothing accumulates"
	paper_btn.position = Vector2(950, 2)
	paper_btn.pressed.connect(func(): _set_view("blind"))
	add_child(paper_btn)

	table_btn = Button.new()
	table_btn.text = "TILES — each sentence its own tile, in written order"
	table_btn.position = Vector2(950, 32)
	table_btn.pressed.connect(func(): _set_view("tiles"))
	add_child(table_btn)

	# The fourth face. The opposite of blind and the same words: everything
	# stays on the page, visible, in the order typed, and nothing leaves
	# until he says so. No sentence cut fires there.
	sheet_btn = Button.new()
	sheet_btn.text = "SEQUENTIAL — the page; nothing leaves until you say so"
	sheet_btn.position = Vector2(950, 62)
	sheet_btn.pressed.connect(func(): _set_view("page"))
	add_child(sheet_btn)

	_run = WritingStore.open_run()
	band.grab_focus()


func _set_view(name: String) -> void:
	view = name
	emit_signal("view_changed")


func _on_changed(text: String) -> void:
	WritingStore.set_held_text(text)
	if _pending:
		return
	_pending = true
	take_band()
	_pending = false


## Enter. The override, or the close of the run.
func _on_done(text: String) -> void:
	if text.strip_edges().is_empty():
		_run += 1
		band.text = ""
		WritingStore.set_held_text("")
		return
	_bank(text)
	band.text = ""
	WritingStore.set_held_text("")


func _bank(text: String) -> void:
	WritingStore.bank_stone(text, "self", "", "", _run)


## The cut. Walks the band; when a sentence has ended, it leaves.
func take_band() -> void:
	var text: String = band.text
	var left := 0
	var moved := true
	while moved:
		moved = false
		for i in range(left, text.length()):
			var ch := text[i]
			if ch != "." and ch != "!" and ch != "?" and ch != "…":
				continue
			# a period between two digits is inside a number, not an ending
			if ch == "." and i > 0 and i + 1 < text.length() \
					and text[i - 1].is_valid_int() and text[i + 1].is_valid_int():
				continue
			# take the whole trailing punctuation cluster ( "word..." leaves whole )
			var right := i
			while right + 1 < text.length() and (text[right + 1] == "." or text[right + 1] == "!" or text[right + 1] == "?" or text[right + 1] == "…"):
				right += 1
			var held := text.substr(0, right + 1)
			# a bare "." or "..." with no letter or digit is not a sentence
			var did := false
			for k in held.length():
				var hc := held[k]
				if hc.is_valid_int() or hc.to_lower() != hc.to_upper():
					did = true
					break
			if not did:
				left = right + 1
				moved = true
				break
			_bank(held.strip_edges())
			text = text.substr(right + 1).strip_edges()
			left = 0
			moved = true
			break
	if text != band.text:
		band.text = text
		band.caret_column = text.length()
		WritingStore.set_held_text(text)
