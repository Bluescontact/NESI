extends Control
## GIVEN and FETCHED — the quarried-rock lane. One class, two kinds.
##
## External writing enters COARSE, not through the sentence cut. A whole block
## arrives as one stone; breaking it into gravel happens later, on the table,
## by Kevin's own click. Given carries who sent it. Fetched carries what was
## asked. Both ride the same one store as self, on the same write path.

var kind := "given"
var sheet: TextEdit
var name_line: LineEdit
var take_btn: Button


func _ready() -> void:
	var face := Label.new()
	if kind == "given":
		face.text = "GIVEN — paste what a person handed you.\nIt enters whole, as one rock.\nIt carries who sent it."
	else:
		face.text = "FETCHED — paste what an agent brought back.\nIt enters whole, as one rock.\nIt carries what was asked."
	face.position = Vector2(10, 6)
	face.add_theme_font_size_override("font_size", 12)
	face.add_theme_color_override("font_color", Look.STONE_LIT)
	add_child(face)

	sheet = TextEdit.new()
	sheet.position = Vector2(10, 66)
	sheet.size = Vector2(size.x - 20, size.y - 148)
	sheet.wrap_mode = TextEdit.LINE_WRAPPING_BOUNDARY
	add_child(sheet)

	name_line = LineEdit.new()
	name_line.position = Vector2(10, size.y - 74)
	name_line.size = Vector2(size.x - 20, 30)
	name_line.placeholder_text = "who sent it" if kind == "given" else "what was asked"
	add_child(name_line)

	take_btn = Button.new()
	take_btn.text = "TAKE IT IN — one rock, verbatim"
	take_btn.position = Vector2(10, size.y - 38)
	take_btn.pressed.connect(_take)
	add_child(take_btn)


func _take() -> void:
	var text := sheet.text
	if text.strip_edges().is_empty():
		return
	if kind == "given":
		WritingStore.bank_stone(text, "given", name_line.text, "", WritingStore.open_run())
	else:
		WritingStore.bank_stone(text, "fetched", "", name_line.text, WritingStore.open_run())
	sheet.text = ""
