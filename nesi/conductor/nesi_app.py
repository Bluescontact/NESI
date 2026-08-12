#!/usr/bin/env python3
"""
NESI — native self-contained window (tkinter, stdlib only).

One process, one window, no web anywhere: the loop (core.py) is called
directly, the two panes are native widgets. Kevin's mark 2026-07-16:
"the surface becomes a true native window, no web layer."

  Left pane  : inbox — piles in nesi\\inbox\\ (Explorer drag IS the drop)
  Underneath : core.poll_once on a worker thread (organ calls NEVER run on
               the UI thread — that's the freeze bug; results marshaled back
               via a queue polled with after())
  Right pane : mark queue — one card per staged object: summary, engine,
               RAW TEXT INSIDE · LOCAL ONLY badge, lint, cross/hold/compost.
  The mark   : buttons call the verbs directly (no HTTP). Cross keeps the
               sync-loud discipline; failures alert red and roll back.

Engine, crossing, canon, persistence: core.py, untouched.
"""

import ctypes
import queue
import threading
import tkinter as tk
from tkinter import messagebox, simpledialog, ttk

import bench
import annotations
import core
import continuity
import deepdive
import front
import glance
import held
import held_record
import interrogator
import library
import return_circuit

# single-instance guard — 2026-07-17, after a re-click pile-up crashed the
# laptop: the exe is slow to open (onefile self-extraction) with no feedback
# that it's already launching, so a second double-click (or third, or tenth)
# looked like nothing happened and just stacked another full process. A named
# Windows mutex costs nothing to hold and is cleaned up by the OS even if the
# process dies hard — no stale-lock-file bookkeeping needed.
_MUTEX_NAME = "Global\\NESI_DSS_SingleInstance"


def _acquire_single_instance():
    """Returns the mutex handle if this is the only instance, else None."""
    ERROR_ALREADY_EXISTS = 183
    handle = ctypes.windll.kernel32.CreateMutexW(None, False, _MUTEX_NAME)
    if ctypes.windll.kernel32.GetLastError() == ERROR_ALREADY_EXISTS:
        return None
    return handle

# DSS palette — light only
BG, SF, SF2 = "#f7f5f0", "#eeebe3", "#e6e2d8"
G, GB, GD, GF = "#3a3020", "#1a1408", "#7a6840", "#a89870"
BDR = "#ccc5b0"
GRN, GRN_BG = "#2a6a1a", "#e8f2e4"
RED, RED_BG = "#8a2010", "#f5e8e6"
YEL, YEL_BG = "#7a5a10", "#f5f0e0"
MONO = ("Courier New", 9)
MONO_B = ("Courier New", 9, "bold")

# The four organ report panes (drift/brier/falsifier/metamorphic) composted
# 2026-07-17 on Kevin's mark — anatomy-scaffold, no hand-role. Code archived
# at nesi\_compost\organ_panes_2026-07-17.py.txt; the scripts in
# tools\recognition\ remain live for the chat-side skills.


class NesiApp:
    def __init__(self, root: tk.Tk):
        self.root = root
        root.title("NESI — drop · digest · mark · glance · library · room")
        root.geometry("1060x680")
        root.configure(bg=BG)
        self.results = queue.Queue()      # worker -> UI marshaling
        self.busy = set()                 # staged ids with a mark in flight

        hdr = tk.Frame(root, bg=BG)
        hdr.pack(fill="x", padx=14, pady=(10, 4))
        tk.Label(hdr, text="NESI · THE RUNNING LOOP", font=("Courier New", 7),
                 fg=GF, bg=BG).pack(anchor="w")
        self.sub = tk.Label(hdr, text="", font=MONO, fg=GD, bg=BG)
        self.sub.pack(anchor="w")
        # preflight (session 3, 2026-07-20) — the two-sign-off seam-clean
        # check, structural only, no live call anywhere in it. Runs once on
        # boot, off the UI thread, so the answer is on screen before Kevin's
        # hand ever reaches /login — not a gate, a render.
        self.preflight_label = tk.Label(hdr, text="", font=("Courier New", 7),
                                        fg=GF, bg=BG)
        self.preflight_label.pack(anchor="w")
        self.preflight_queue = queue.Queue()
        threading.Thread(target=self._preflight_worker, daemon=True).start()
        self.root.after(400, self._drain_preflight)

        # continuity — the resume board. Rendered on open from the last
        # sitting's persisted state; a render, not a control (no buttons,
        # nothing to operate). First run: no state file, no board, no error.
        self._resume_board(root)

        # return circuit — render-only strip under the resume board. Scans
        # on open and again whenever gate_data.json changes; a return is a
        # question handed back to the gate, never a control: no buttons,
        # nothing moves, Kevin marks through his existing channel.
        self.returns_frame = tk.Frame(root, bg=BG)
        self.returns_frame.pack(fill="x", padx=14)
        self._gate_mtime = None
        self.returns_queue = queue.Queue()   # worker -> UI, threading law
        self.root.after(600, self._rescan_returns)
        self.root.after(700, self._drain_returns)

        style = ttk.Style()
        style.theme_use(style.theme_use())
        style.configure("Nesi.TNotebook", background=BG, borderwidth=0)
        style.configure("Nesi.TNotebook.Tab", background=SF, foreground=GD,
                         font=MONO, padding=(10, 5))
        style.map("Nesi.TNotebook.Tab",
                  background=[("selected", SF2)], foreground=[("selected", GB)])

        notebook = ttk.Notebook(root, style="Nesi.TNotebook")
        notebook.pack(fill="both", expand=True, padx=14, pady=8)
        self.notebook = notebook

        self._build_glance_tab(notebook)  # the daily door — first, selected
        self._build_front_tab(notebook)
        metabolizer_tab = tk.Frame(notebook, bg=BG)
        notebook.add(metabolizer_tab, text="metabolizer")
        self._build_bench_tab(notebook)
        self._build_library_tab(notebook)
        # interrogator demoted from a tab to a quiet voice at the room's
        # margin (Kevin's mark 2026-07-23, the plumb line of the one-surface
        # dev cycle). _build_interrogator_tab is kept defined but no longer
        # added to the notebook — a reversible relocation, not a deletion.
        self._build_room_tab(notebook)
        self._build_held_tab(notebook)
        self._build_deepdive_tab(notebook)
        notebook.select(0)

        panes = tk.PanedWindow(metabolizer_tab, orient="horizontal", bg=BDR, sashwidth=4)
        panes.pack(fill="both", expand=True)

        # left — inbox
        left = tk.Frame(panes, bg=BG)
        tk.Label(left, text="INBOX — THE DROP", font=MONO_B, fg=GB, bg=BG
                 ).pack(anchor="w", pady=(0, 4))
        tk.Label(left, text=f"drop files into:\n{core.INBOX}", font=("Courier New", 8),
                 fg=GD, bg=SF, justify="left", padx=8, pady=6
                 ).pack(fill="x", pady=(0, 6))
        self.inbox_list = tk.Listbox(left, font=MONO, bg=SF, fg=GB,
                                     highlightthickness=1, highlightbackground=BDR,
                                     relief="flat", activestyle="none")
        self.inbox_list.pack(fill="both", expand=True)

        # Step 4 — the intake drop: a real paste field, same drop the
        # Explorer-file watcher already handles (core.capture_paste writes
        # a timestamped file straight into core.INBOX; poll_once picks it
        # up on its own next pass, no separate pipeline). Engine-dark: this
        # writes a file and nothing else — metabolize/lint/mark are all the
        # same downstream path a dragged-in file already goes through.
        tk.Label(left, text="PASTE A PAGE — the drop, without Explorer",
                 font=MONO_B, fg=GB, bg=BG).pack(anchor="w", pady=(10, 4))
        self.paste_box = tk.Text(left, font=MONO, bg="white", fg=GB, height=6,
                                 wrap="word", relief="flat", highlightthickness=1,
                                 highlightbackground=BDR)
        self.paste_box.pack(fill="x")
        prow = tk.Frame(left, bg=BG)
        prow.pack(fill="x", pady=4)
        tk.Button(prow, text="capture", font=MONO_B, fg=GD, bg="white",
                  relief="flat", padx=12, highlightthickness=1,
                  highlightbackground=BDR, command=self._capture_paste
                  ).pack(side="left")
        self.paste_status = tk.Label(prow, text="", font=("Courier New", 7),
                                     fg=GF, bg=BG)
        self.paste_status.pack(side="left", padx=10)
        panes.add(left, width=300)

        # right — mark queue (scrollable card column)
        right = tk.Frame(panes, bg=BG)
        tk.Label(right, text="MARK QUEUE — STAGED OBJECTS", font=MONO_B, fg=GB,
                 bg=BG).pack(anchor="w", pady=(0, 4))
        canvas = tk.Canvas(right, bg=BG, highlightthickness=0)
        sb = tk.Scrollbar(right, orient="vertical", command=canvas.yview)
        self.cards = tk.Frame(canvas, bg=BG)
        self.cards.bind("<Configure>",
                        lambda e: canvas.configure(scrollregion=canvas.bbox("all")))
        self.cards_window = canvas.create_window((0, 0), window=self.cards, anchor="nw")
        canvas.bind("<Configure>",
                    lambda e: canvas.itemconfigure(self.cards_window, width=e.width))
        canvas.configure(yscrollcommand=sb.set)
        canvas.pack(side="left", fill="both", expand=True)
        sb.pack(side="right", fill="y")
        self._wheelable(canvas)
        panes.add(right)

        # the loop, off the UI thread — non-negotiable
        threading.Thread(target=self._watch, daemon=True).start()
        self.root.after(300, self._refresh)
        self.root.after(200, self._drain)

    # -------------------------------------------------- continuity (v0)
    # Derived view only — sources of truth untouched. Checkpoints ride the
    # existing refresh loop (change-detected, so quiet cycles write nothing);
    # the close write hooks WM_DELETE_WINDOW in main(). Zero new gesture.
    def _resume_board(self, root):
        snap = continuity.resume()
        if not snap:
            return
        board = tk.Frame(root, bg=SF, highlightthickness=1,
                         highlightbackground=BDR)
        board.pack(fill="x", padx=14, pady=(2, 0))
        tk.Label(board, text=f"WHERE YOU WERE — closed {snap.get('closed_at','?')}",
                 font=("Courier New", 7, "bold"), fg=GF, bg=SF
                 ).pack(anchor="w", padx=10, pady=(6, 0))
        tk.Label(board, text=snap.get("where_it_closed", ""), font=MONO_B,
                 fg=GB, bg=SF, anchor="w", wraplength=980, justify="left"
                 ).pack(fill="x", padx=10)
        threads = snap.get("open_threads", [])
        inbox = snap.get("inbox", [])
        if threads:
            names = " · ".join(t["pile"] for t in threads[:4])
            more = f" (+{len(threads)-4} more)" if len(threads) > 4 else ""
            tk.Label(board, text=f"awaiting your mark: {names}{more}",
                     font=MONO, fg=YEL, bg=SF, anchor="w", wraplength=980,
                     justify="left").pack(fill="x", padx=10)
        if inbox:
            tk.Label(board, text=f"in the inbox, undigested: {' · '.join(inbox[:4])}",
                     font=MONO, fg=GD, bg=SF, anchor="w", wraplength=980,
                     justify="left").pack(fill="x", padx=10)
        held = snap.get("held_count")
        felt = snap.get("felt_read_count")
        gauge = (f"hold pile {held if held is not None else 'unreadable'} · "
                 f"felt-read queue {felt if felt is not None else 'unreadable'}")
        if not threads and not inbox:
            gauge = "floor was clean · " + gauge
        tk.Label(board, text=gauge, font=("Courier New", 8), fg=GF, bg=SF,
                 anchor="w").pack(fill="x", padx=10, pady=(0, 6))

    # ------------------------------------------------------ preflight (v0)
    def _preflight_worker(self):
        try:
            import preflight
            r = preflight.check()
        except Exception as e:
            r = {"overall_ok": False, "metabolizer": {"ok": False, "detail": [str(e)[:160]]},
                 "bench": {"ok": False, "detail": []}}
        self.preflight_queue.put(r)

    def _drain_preflight(self):
        try:
            while True:
                r = self.preflight_queue.get_nowait()
                if r.get("overall_ok"):
                    self.preflight_label.config(
                        text="preflight: both sign-offs seam-clean (metabolizer + bench) — "
                             "structural check only, no live call made", fg=GF)
                else:
                    bad = [k for k in ("metabolizer", "bench") if not r.get(k, {}).get("ok")]
                    self.preflight_label.config(
                        text=f"preflight: NOT seam-clean — {', '.join(bad)} — see conductor_log.jsonl",
                        fg=RED)
                    core.log("preflight-failed", report=r)
        except queue.Empty:
            pass
        self.root.after(2000, self._drain_preflight)

    # -------------------------------------------------- the front (v0)
    # Plain words at the door, framework underneath. The front only routes,
    # assembles, and returns — it never marks, never answers. Organ panes
    # stay behind it as the full form. Worker-threaded per the law.
    def _build_front_tab(self, notebook):
        frame = tk.Frame(notebook, bg=BG)
        notebook.add(frame, text="nesi")
        self.front_results = queue.Queue()
        self.front_pending = None

        self.front_log = tk.Text(frame, font=MONO, bg=SF, fg=G, wrap="word",
                                 relief="flat", highlightthickness=1,
                                 highlightbackground=BDR, state="disabled")
        self.front_log.pack(fill="both", expand=True, padx=14, pady=(10, 4))
        self.front_log.tag_configure("kev", foreground=GB,
                                     font=("Courier New", 9, "bold"))
        self.front_log.tag_configure("nesi", foreground=G)
        self.front_log.tag_configure("under", foreground=GF,
                                     font=("Courier New", 7))

        row = tk.Frame(frame, bg=BG)
        row.pack(fill="x", padx=14, pady=(0, 10))
        self.front_in = tk.Entry(row, font=MONO, bg="white", fg=GB,
                                 relief="flat", highlightthickness=1,
                                 highlightbackground=BDR)
        self.front_in.pack(side="left", fill="x", expand=True, ipady=5)
        self.front_in.bind("<Return>", lambda e: self._front_send())
        tk.Button(row, text="say it", font=MONO_B, fg=GD, bg="white",
                  relief="flat", padx=14, highlightthickness=1,
                  highlightbackground=BDR, command=self._front_send
                  ).pack(side="left", padx=(8, 0))
        self._front_line("say what you want in your own words — the organs "
                         "run underneath. (the tabs behind hold the full form.)",
                         "under")
        self.root.after(300, self._drain_front)

        # Move A, wired to speak first (2026-07-20): the interrogator reads
        # its own state on open, off the UI thread, and — if anything is
        # actually worth saying — says it before Kevin has typed a word.
        # Silence stays silence: a quiet system puts nothing on the queue.
        threading.Thread(target=self._open_reach_worker, daemon=True).start()

    def _open_reach_worker(self):
        try:
            r = interrogator.open_reach()
        except Exception as e:
            r = {"lines": [f"the interrogator could not reach back on open: "
                           f"{str(e)[:160]}"]}
        lines = r.get("lines", [])
        if not lines:
            return   # nothing tripped — nothing rendered, same law as everywhere else
        self.front_results.put({"lines": lines, "under": "proprioception · on open"})

    def _front_line(self, text, tag):
        self.front_log.config(state="normal")
        self.front_log.insert("end", text + "\n", tag)
        self.front_log.see("end")
        self.front_log.config(state="disabled")

    def _front_send(self):
        text = self.front_in.get().strip()
        if not text:
            return
        self.front_in.delete(0, "end")
        self._front_line("you: " + text, "kev")
        pending, self.front_pending = self.front_pending, None
        def run():
            try:
                self.front_results.put(front.handle(text, pending))
            except Exception as e:
                self.front_results.put({"kind": "error",
                                        "lines": [f"that didn't land: {str(e)[:160]}"]})
        threading.Thread(target=run, daemon=True).start()

    def _drain_front(self):
        try:
            while True:
                r = self.front_results.get_nowait()
                for line in r.get("lines", []):
                    self._front_line("nesi: " + line, "nesi")
                if r.get("under"):
                    self._front_line("      " + r["under"], "under")
                if r.get("kind") == "confirm":
                    self.front_pending = r.get("pending")
                if r.get("obj"):
                    # a made object — hand it to the bench pane so the full
                    # loop (break/refine/land) is one tab away, not retyped
                    self.bench_results.put(("ok", r["obj"], "drafted"))
        except queue.Empty:
            pass
        self.root.after(350, self._drain_front)

    # -------------------------------------------------------- bench (v0)
    # The production surface, internal-complete: pattern -> object, into the
    # PRIVATE organ. Every generative op goes through bench.invoke — one
    # socket, stubbed loudly until the engine is wired. Landing writes a
    # staged object (origin=made, no crossing-eligibility); Kevin's existing
    # verbs in the mark queue take it from there. Light and gestural, not an
    # IDE. All bench work runs on worker threads (the threading law).
    def _build_bench_tab(self, notebook):
        frame = tk.Frame(notebook, bg=BG)
        notebook.add(frame, text="bench")
        self.bench_results = queue.Queue()
        self.bench_obj = None

        panes = tk.PanedWindow(frame, orient="horizontal", bg=BDR, sashwidth=4)
        panes.pack(fill="both", expand=True, padx=14, pady=10)

        left = tk.Frame(panes, bg=BG)
        tk.Label(left, text="INTENT — what are you making?", font=MONO_B,
                 fg=GB, bg=BG).pack(anchor="w", pady=(0, 4))
        self.bench_intent = tk.Text(left, font=MONO, bg="white", fg=GB,
                                    height=4, wrap="word", relief="flat",
                                    highlightthickness=1, highlightbackground=BDR)
        self.bench_intent.pack(fill="x")
        tk.Button(left, text="pull patterns + draft", font=MONO_B, fg=GD,
                  bg="white", relief="flat", padx=12, highlightthickness=1,
                  highlightbackground=BDR, command=self._bench_start
                  ).pack(anchor="w", pady=4)
        tk.Label(left, text="BEARING PATTERNS — deterministic pull",
                 font=MONO_B, fg=GB, bg=BG).pack(anchor="w", pady=(8, 4))
        self.bench_pulled = tk.Text(left, font=("Courier New", 8), bg=SF,
                                    fg=G, wrap="word", relief="flat",
                                    highlightthickness=1,
                                    highlightbackground=BDR, state="disabled")
        self.bench_pulled.pack(fill="both", expand=True)
        panes.add(left, width=340)

        right = tk.Frame(panes, bg=BG)
        hdr = tk.Frame(right, bg=BG)
        hdr.pack(fill="x", pady=(0, 4))
        tk.Label(hdr, text="WORKING OBJECT", font=MONO_B, fg=GB, bg=BG
                 ).pack(side="left")
        self.bench_type_badge = tk.Label(hdr, text="", font=("Courier New", 7, "bold"),
                                         fg=GD, bg=SF2)
        self.bench_type_badge.pack(side="left", padx=(10, 0))
        self.bench_badge = tk.Label(hdr, text="", font=("Courier New", 7, "bold"),
                                    fg=RED, bg=RED_BG)
        self.bench_badge.pack(side="left", padx=10)
        self.bench_draft = tk.Text(right, font=MONO, bg=SF, fg=G, wrap="word",
                                   relief="flat", highlightthickness=1,
                                   highlightbackground=BDR, state="disabled")
        self.bench_draft.pack(fill="both", expand=True)
        row = tk.Frame(right, bg=BG)
        row.pack(fill="x", pady=4)
        for label, cmd in (("break", self._bench_break),
                           ("refine", self._bench_refine),
                           ("land on the bench", self._bench_land)):
            tk.Button(row, text=label, font=MONO_B, fg=GD, bg="white",
                      relief="flat", padx=12, highlightthickness=1,
                      highlightbackground=BDR, command=cmd
                      ).pack(side="left", padx=(0, 8))
        self.bench_status = tk.Label(right, text="state an intent to begin — "
                                     "everything made here stays in the private organ",
                                     font=("Courier New", 8), fg=GF, bg=BG,
                                     anchor="w")
        self.bench_status.pack(fill="x")

        # COMPOSED — the Composer's render of this same object (session
        # 2026-07-20, §4/mark: pipe wired, bench-tab UI next). NATIVE, not a
        # web view — Kevin's ratified law (2026-07-16, this file's own
        # header): "the surface becomes a true native window, no web layer."
        # composed.card_html/svg are never parsed as HTML here; the status
        # line and diagram are redrawn with plain tkinter primitives from
        # composed.diagram_status and composed.dsl.
        comp_hdr = tk.Frame(right, bg=BG)
        comp_hdr.pack(fill="x", pady=(10, 2))
        tk.Label(comp_hdr, text="COMPOSED — locked register", font=MONO_B,
                 fg=GB, bg=BG).pack(side="left")
        self.composed_status = tk.Label(comp_hdr, text="", font=("Courier New", 7),
                                        fg=GF, bg=BG)
        self.composed_status.pack(side="left", padx=(10, 0))
        self.composed_canvas = tk.Canvas(right, width=300, height=150, bg=BG,
                                         highlightthickness=1,
                                         highlightbackground=BDR)
        self.composed_canvas.pack(fill="x")
        self._draw_composed(None)
        panes.add(right)

        self.root.after(300, self._drain_bench)

    def _bench_work(self, fn, done_msg):
        def run():
            try:
                self.bench_results.put(("ok", fn(), done_msg))
            except Exception as e:
                self.bench_results.put(("err", None, str(e)[:200]))
        threading.Thread(target=run, daemon=True).start()

    def _bench_start(self):
        intent = self.bench_intent.get("1.0", "end").strip()
        if not intent:
            return
        self.bench_status.config(text="pulling + drafting…", fg=YEL)
        self._bench_work(lambda: bench.new_object(intent), "drafted")

    def _bench_break(self):
        if not self.bench_obj:
            return
        self.bench_status.config(text="breaking…", fg=YEL)
        self._bench_work(lambda: bench.run_break(self.bench_obj), "broken")

    def _bench_refine(self):
        if not self.bench_obj:
            return
        self.bench_status.config(text="refining…", fg=YEL)
        self._bench_work(lambda: bench.run_refine(self.bench_obj), "refined")

    def _bench_land(self):
        if not self.bench_obj:
            return
        self.bench_status.config(text="landing…", fg=YEL)
        obj = self.bench_obj
        self._bench_work(lambda: bench.land(obj), "landed")

    def _drain_bench(self):
        try:
            while True:
                status, result, msg = self.bench_results.get_nowait()
                if status == "err":
                    self.bench_status.config(text=f"did not land: {msg}", fg=RED)
                    continue
                if msg == "landed":
                    self.bench_obj = None
                    self.bench_status.config(
                        text=f"landed in the private organ as {result} — "
                             "your mark takes it from the queue", fg=GRN)
                    self._set_text(self.bench_draft, "")
                    self._set_text(self.bench_pulled, "")
                    self.bench_badge.config(text="")
                    self.bench_type_badge.config(text="")
                    self._draw_composed(None)
                    continue
                self.bench_obj = result
                self.bench_type_badge.config(text=f" type: {result.get('type', 'object')} ")
                badge = ("STUB — engine not wired; shape real, content placeholder"
                         if result.get("stub") else result.get("engine", ""))
                self.bench_badge.config(text=f" {badge} ")
                self._set_text(self.bench_draft, result.get("draft", "")
                               + ("\n\nBREAK NOTES:\n" + "\n".join(
                                   result.get("break_notes", []))
                                  if result.get("break_notes") else ""))
                self._set_text(self.bench_pulled, "\n\n".join(
                    f"{p['title']}\n  {p['file']}\n  overlap: {', '.join(p['overlap'])}"
                    for p in result.get("pulled", [])) or "(no bearing patterns found)")
                self.bench_status.config(text=f"{msg} · engine: {result.get('engine','')}",
                                         fg=GD)
                self._draw_composed(result.get("composed"))
        except queue.Empty:
            pass
        self.root.after(400, self._drain_bench)

    def _set_text(self, widget, text):
        widget.config(state="normal")
        widget.delete("1.0", "end")
        widget.insert("1.0", text)
        widget.config(state="disabled")

    def _draw_composed(self, composed):
        """Native tkinter redraw of the Composer's card-size diagram — no
        HTML/SVG parsing, no web view. Same primitives as composer.py's
        render_diagram_svg(dsl, 'card'): boundary band drawn first (the
        symbol-law inversion, enforced here too — substrate as figure),
        nodes/edges layered on top, flat ink only. Mirrors that function's
        layout math so the two stay visually the same shape; not imported
        from it directly (tkinter Canvas calls, not SVG strings, so it is a
        parallel implementation of the same DSL, not a shared code path)."""
        c = self.composed_canvas
        c.delete("all")
        W, H = 300, 150
        if not composed:
            self.composed_status.config(text="", fg=GF)
            c.create_text(W / 2, H / 2, text="(no object yet)",
                          font=("Courier New", 8), fill=GF)
            return
        status = composed.get("diagram_status", "unknown")
        self.composed_status.config(
            text=f"diagram: {status}",
            fg=(GRN if status == "present" else GF))
        dsl = composed.get("dsl")
        if status != "present" or not dsl or not dsl.get("nodes"):
            c.create_rectangle(4, 4, W - 4, H - 4, outline=BDR)
            c.create_text(W / 2, H / 2, width=W - 30, justify="center",
                          text="[ diagram missing — no DSL for this object; "
                               "flagged, not fabricated ]",
                          font=("Courier New", 7), fill=GF)
            return
        nodes = dsl.get("nodes", [])
        edges = dsl.get("edges", [])
        boundary = dsl.get("boundary", {}) or {}
        leverage = dsl.get("leverage", {}) or {}
        n = len(nodes)
        margin = 48
        node_y = H * 0.32
        pos = {}
        for i, node in enumerate(nodes):
            x = margin if n <= 1 else margin + (W - 2 * margin) * i / (n - 1)
            pos[node.get("id")] = (x, node_y)
        # substrate band FIRST — the figure everything else rests on
        band_y, band_h = H * 0.60, H * 0.32
        c.create_rectangle(2, band_y, W - 2, band_y + band_h, outline=G, dash=(2, 2))
        between = boundary.get("between", [])
        if between:
            c.create_text(W / 2, band_y + band_h / 2 - 4,
                         text=" / ".join(between).upper(),
                         font=("Courier New", 7), fill=GD)
        if boundary.get("marker"):
            c.create_text(W / 2, band_y + band_h - 10, width=W - 20,
                         text=boundary["marker"], font=("Courier New", 6), fill=GF)
        dash_for = {"drain": (4, 3), "feed": None, "loop": (2, 3), "block": (1, 3)}
        for e in edges:
            if e.get("from") not in pos or e.get("to") not in pos:
                continue
            x1, y1 = pos[e["from"]]
            x2, y2 = pos[e["to"]]
            kw = {"fill": G, "width": 1, "arrow": "last"}
            d = dash_for.get(e.get("kind"))
            if d:
                kw["dash"] = d
            c.create_line(x1, y1, x2, y2, **kw)
        for node in nodes:
            x, y = pos.get(node.get("id"), (0, 0))
            c.create_rectangle(x - 26, y - 13, x + 26, y + 13, fill=BG, outline=G)
            c.create_text(x, y, text=node.get("label", node.get("id", "")),
                         font=("Courier New", 7), fill=GB)
        on = leverage.get("on")
        if on and on in pos:
            x, y = pos[on]
            c.create_text(x, y - 22, text="▲ ONE MOVE", font=("Courier New", 7, "bold"), fill=GB)

    # ------------------------------------------------------------ room (v0)
    # Stage 5 BUILD of the Composer Cycle. The living render surface — one
    # room, all staged objects at once, bands instead of a single fixed
    # canvas. NATIVE only (this file's own standing law: no web layer).
    # Read-only: this tab never marks, crosses, or writes; refresh is
    # explicit (a button), not a background poll — the room renders what's
    # already true, it does not go looking for more to do.
    def _import_room(self):
        """Lazy import, same posture as bench.py's own _import_composer() —
        avoids a load-time cycle since room.py itself imports bench.

        Frozen-exe fix (2026-07-21, build 6): try the bundled-module import
        first (room.py is bundled by name via --paths at build time, not at
        a __file__-relative sibling dir inside sys._MEIPASS); fall back to
        the dev-mode disk path only when unfrozen."""
        try:
            import room
            return room
        except ImportError:
            pass
        import sys
        from pathlib import Path
        rdir = str(Path(__file__).resolve().parents[1] / "bench" / "composer")
        if rdir not in sys.path:
            sys.path.insert(0, rdir)
        import room
        return room

    def _build_room_tab(self, notebook):
        frame = tk.Frame(notebook, bg=BG)
        notebook.add(frame, text="room")
        self.room_results = queue.Queue()

        hdr = tk.Frame(frame, bg=BG)
        hdr.pack(fill="x", padx=14, pady=(10, 4))
        tk.Label(hdr, text="THE ROOM — every staged object, one space",
                 font=MONO_B, fg=GB, bg=BG).pack(side="left")
        tk.Button(hdr, text="refresh", font=MONO_B, fg=GD, bg="white",
                  relief="flat", padx=12, highlightthickness=1,
                  highlightbackground=BDR, command=self._room_refresh
                  ).pack(side="left", padx=10)
        self.room_status = tk.Label(hdr, text="", font=("Courier New", 7),
                                    fg=GF, bg=BG)
        self.room_status.pack(side="left")

        self.room_canvas = tk.Canvas(frame, width=860, height=480, bg=BG,
                                     highlightthickness=1,
                                     highlightbackground=BDR)
        self.room_canvas.pack(fill="both", expand=True, padx=14, pady=(0, 10))
        tk.Label(frame, text="bands: staged / held / canon / compost · "
                 "edges: object → pattern, applied=feed · held=loop · "
                 "composted=drain · blocked=block · a missing cable is a "
                 "real gap, not an error · drag a node — layout saves to "
                 "room_layout.json · double-click a node → deepdive chamber",
                 font=("Courier New", 7), fg=GF,
                 bg=BG, anchor="w").pack(fill="x", padx=14, pady=(0, 8))

        # the voice at the margin — the interrogator, demoted from a tab to a
        # quiet strip at the room's edge (Kevin's mark 2026-07-23). Fed by the
        # organ's own open_reach() lines; no new mechanism, no engine. Silence
        # renders one faint "quiet" line so the channel is felt-readable as
        # present-and-quiet, never a fabricated trip.
        self.room_margin_results = queue.Queue()
        self.room_margin = tk.Frame(frame, bg=SF, highlightthickness=1,
                                    highlightbackground=BDR)
        self.room_margin.pack(fill="x", padx=14, pady=(0, 10))
        self.root.after(550, self._drain_room_margin)

        # Step 7 — the node space: drag a node, its position persists to
        # disk. Bound once on the "draggable" TAG (not per-item), so it
        # keeps working across every _room_refresh redraw without rebinding
        # — tag_bind applies to any item carrying the tag, present or future.
        self._room_drag = {"id": None, "x": 0, "y": 0, "moved": False}
        self.room_canvas.tag_bind("draggable", "<ButtonPress-1>", self._room_drag_start)
        self.room_canvas.tag_bind("draggable", "<B1-Motion>", self._room_drag_move)
        self.room_canvas.tag_bind("draggable", "<ButtonRelease-1>", self._room_drag_end)
        self.room_canvas.tag_bind("draggable", "<Double-Button-1>", self._room_open_deepdive)

        self.root.after(500, self._drain_room)
        self._room_refresh()   # once on open, same posture as preflight/resume

    def _room_open_deepdive(self, event):
        item = self.room_canvas.find_closest(event.x, event.y)
        if not item:
            return
        tag = self._room_node_tag(item[0])
        if not tag:
            return
        self._open_deepdive("staged", tag[len("n::"):], "canon")

    def _room_node_tag(self, item):
        for t in self.room_canvas.gettags(item):
            if t.startswith("n::"):
                return t
        return None

    def _room_drag_start(self, event):
        item = self.room_canvas.find_closest(event.x, event.y)
        if not item:
            return
        tag = self._room_node_tag(item[0])
        if not tag:
            return
        # `moved` gates the save: a plain click (press+release, no motion) is
        # NOT a drag — it must leave the canvas untouched so <Double-Button-1>
        # can fire cleanly into the deepdive chamber. Saving+refreshing on
        # every click (the earlier bug) redrew the canvas mid-double-click and
        # ate the second press.
        self._room_drag = {"id": tag, "x": event.x, "y": event.y, "moved": False}

    def _room_drag_move(self, event):
        tag = self._room_drag.get("id")
        if not tag:
            return
        dx, dy = event.x - self._room_drag["x"], event.y - self._room_drag["y"]
        self.room_canvas.move(tag, dx, dy)
        self._room_drag["x"], self._room_drag["y"] = event.x, event.y
        self._room_drag["moved"] = True

    def _room_drag_end(self, event):
        tag = self._room_drag.get("id")
        moved = self._room_drag.get("moved")
        self._room_drag = {"id": None, "x": 0, "y": 0, "moved": False}
        if not tag or not moved:
            return   # a click that never moved — leave it for the double-click handler
        node_id = tag[len("n::"):]
        bbox = self.room_canvas.bbox(tag)
        if not bbox:
            return
        cx, cy = (bbox[0] + bbox[2]) / 2, (bbox[1] + bbox[3]) / 2
        self.room_status.config(text="saving position…", fg=YEL)

        def run():
            try:
                room = self._import_room()
                room.set_node_position(node_id, cx, cy)
            except Exception:
                pass
            self.root.after(0, self._room_refresh)
        threading.Thread(target=run, daemon=True).start()

    def _room_refresh(self):
        self._room_margin_refresh()
        self.room_status.config(text="reading…", fg=YEL)

        def run():
            try:
                room = self._import_room()
                idx = room.build_index()
                edges = room.derive_edges(idx)
                layout = room.load_layout()
                self.room_results.put(("ok", room, idx, edges, layout))
            except Exception as e:
                self.room_results.put(("err", None, None, str(e)[:200], None))
        threading.Thread(target=run, daemon=True).start()

    def _drain_room(self):
        try:
            while True:
                status, room, idx, edges, layout = self.room_results.get_nowait()
                if status == "err":
                    self.room_status.config(text=f"could not read: {edges}", fg=RED)
                    continue
                room.render_room_canvas(idx, edges, self.room_canvas,
                                        width=860, height=480, layout=layout)
                self.room_status.config(
                    text=f"{len(idx)} object(s) · {len(edges)} edge(s)", fg=GF)
        except queue.Empty:
            pass
        self.root.after(600, self._drain_room)

    # -------------------------------- the voice at the margin (2026-07-23)
    # The interrogator, demoted from a tab to a quiet voice at the room's
    # edge. Fed by the organ's own open_reach() (Move B proprioception) — the
    # same lines it already produces, no new path, no engine. Silence stays
    # silence in spirit: nothing tripped renders one faint line so the margin
    # is felt-readable as present-and-quiet. It never marks.
    def _room_margin_refresh(self):
        threading.Thread(target=self._room_margin_worker, daemon=True).start()

    def _room_margin_worker(self):
        try:
            r = interrogator.open_reach()
            lines = r.get("lines", [])
        except Exception as e:
            lines = [f"the margin could not reach back: {str(e)[:140]}"]
        self.room_margin_results.put(lines)

    def _drain_room_margin(self):
        try:
            while True:
                self._render_room_margin(self.room_margin_results.get_nowait())
        except queue.Empty:
            pass
        self.root.after(700, self._drain_room_margin)

    def _render_room_margin(self, lines):
        for w in self.room_margin.winfo_children():
            w.destroy()
        tk.Label(self.room_margin, text="VOICE AT THE MARGIN",
                 font=("Courier New", 7, "bold"), fg=GF, bg=SF
                 ).pack(anchor="w", padx=10, pady=(5, 0))
        if not lines:
            tk.Label(self.room_margin, text="· quiet — nothing tripped ·",
                     font=("Courier New", 8), fg=GF, bg=SF, anchor="w"
                     ).pack(fill="x", padx=10, pady=(0, 5))
            return
        for ln in lines:
            tk.Label(self.room_margin, text=ln, font=MONO, fg=G, bg=SF,
                     anchor="w", wraplength=820, justify="left"
                     ).pack(fill="x", padx=10, pady=(2, 4))

    # ------------------------------------------------ return circuit (v0)
    def _rescan_returns(self):
        mt = return_circuit.gate_mtime()
        if mt != self._gate_mtime:
            self._gate_mtime = mt
            threading.Thread(target=self._scan_returns_worker,
                             daemon=True).start()
        self.root.after(3000, self._rescan_returns)

    def _scan_returns_worker(self):
        try:
            returns = return_circuit.scan()
        except Exception:
            returns = []   # a broken scan renders silence, never a guess
        self.returns_queue.put(returns)   # marshal via queue — never touch tk here

    def _drain_returns(self):
        try:
            while True:
                self._render_returns(self.returns_queue.get_nowait())
        except queue.Empty:
            pass
        self.root.after(500, self._drain_returns)

    def _render_returns(self, returns):
        for w in self.returns_frame.winfo_children():
            w.destroy()
        if not returns:
            return   # silence is the default, enforced
        for r in returns:
            c = tk.Frame(self.returns_frame, bg=YEL_BG, highlightthickness=1,
                         highlightbackground=BDR)
            c.pack(fill="x", pady=(4, 0))
            tk.Label(c, text="RETURNED TO THE GATE", font=("Courier New", 7, "bold"),
                     fg=YEL, bg=YEL_BG).pack(anchor="w", padx=10, pady=(6, 0))
            tk.Label(c, text=r["title"], font=MONO_B, fg=GB, bg=YEL_BG,
                     anchor="w", wraplength=980, justify="left"
                     ).pack(fill="x", padx=10)
            tk.Label(c, text=r["question"], font=MONO, fg=G, bg=YEL_BG,
                     anchor="w", wraplength=980, justify="left"
                     ).pack(fill="x", padx=10)
            tk.Label(c, text=r["evidence"], font=("Courier New", 7), fg=GD,
                     bg=YEL_BG, anchor="w").pack(fill="x", padx=10, pady=(0, 6))

    # ------------------------------------------------- interrogator (v0)
    # The organ that reaches back. Deterministic — no engine call anywhere in
    # its path (interrogator.py, file-reads + rule-match only). It never
    # marks. Silence is the default, enforced: no trip = the question area
    # stays empty. Proprioception (Move B) runs once on open, then quiet.
    def _build_interrogator_tab(self, notebook):
        frame = tk.Frame(notebook, bg=BG)
        notebook.add(frame, text="interrogator")
        self.gator_results = queue.Queue()

        tk.Label(frame, text="THE DROP — free text; the organ checks it against "
                 "your own conditions", font=MONO_B, fg=GB, bg=BG
                 ).pack(anchor="w", padx=14, pady=(10, 4))
        self.gator_in = tk.Text(frame, font=MONO, bg="white", fg=GB, height=5,
                                wrap="word", relief="flat", highlightthickness=1,
                                highlightbackground=BDR)
        self.gator_in.pack(fill="x", padx=14)
        row = tk.Frame(frame, bg=BG)
        row.pack(fill="x", padx=14, pady=4)
        tk.Button(row, text="check the drop", font=MONO_B, fg=GD, bg="white",
                  relief="flat", padx=12, highlightthickness=1,
                  highlightbackground=BDR, command=self._gator_check
                  ).pack(side="left")
        tk.Label(row, text="deterministic · no engine · it asks, you answer — "
                 "it never marks", font=("Courier New", 7), fg=GF, bg=BG
                 ).pack(side="left", padx=10)

        tk.Label(frame, text="QUESTIONS — empty means nothing tripped",
                 font=MONO_B, fg=GB, bg=BG).pack(anchor="w", padx=14, pady=(8, 4))
        self.gator_out = tk.Frame(frame, bg=BG)
        self.gator_out.pack(fill="both", expand=True, padx=14, pady=(0, 10))

        self.root.after(250, self._drain_gator)
        # proprioception on open, once, off the UI thread
        threading.Thread(target=lambda: self.gator_results.put(
            ("proprioception", self._gator_safe(interrogator.proprioception))),
            daemon=True).start()

    def _gator_safe(self, fn, *a):
        try:
            return fn(*a)
        except Exception as e:
            return [{"move": "?", "condition": "organ error",
                     "question": f"The interrogator could not run: {str(e)[:160]}",
                     "standing": False, "provenance": "interrogator.py"}]

    def _gator_check(self):
        text = self.gator_in.get("1.0", "end").strip()
        threading.Thread(target=lambda: self.gator_results.put(
            ("drop", self._gator_safe(interrogator.check_drop, text))),
            daemon=True).start()

    def _drain_gator(self):
        try:
            while True:
                kind, qs = self.gator_results.get_nowait()
                if kind == "drop":
                    for w in self.gator_out.winfo_children():
                        w.destroy()
                if not qs and kind == "drop":
                    tk.Label(self.gator_out, text="(silence — nothing tripped)",
                             font=MONO, fg=GF, bg=BG).pack(anchor="w", pady=4)
                for q in qs:
                    c = tk.Frame(self.gator_out, bg=SF, highlightthickness=1,
                                 highlightbackground=BDR)
                    c.pack(fill="x", pady=4)
                    tk.Label(c, text=q["question"], font=MONO_B, fg=GB, bg=SF,
                             anchor="w", wraplength=880, justify="left"
                             ).pack(fill="x", padx=10, pady=(7, 0))
                    tag = f"move {q['move']} · {q['condition']} · {q['provenance']}"
                    if q.get("standing"):
                        tag += "  ·  STANDING REQUEST — you asked for this one always"
                    tk.Label(c, text=tag, font=("Courier New", 7),
                             fg=YEL if q.get("standing") else GF, bg=SF,
                             anchor="w", wraplength=880, justify="left"
                             ).pack(fill="x", padx=10, pady=(0, 7))
        except queue.Empty:
            pass
        self.root.after(400, self._drain_gator)

    # ------------------------------------------------------- glance (v0)
    # Step 3 — the daily door. Proprioception made visible: every project
    # and idea shown at its stage of development, read entirely from local
    # state (glance.py: gate_data.json, marks.jsonl, patterns/). Click a
    # card to open it to full detail; nothing here writes, marks, or
    # generates. First tab, selected on open — the light surface before
    # anything heavier.
    def _build_glance_tab(self, notebook):
        frame = tk.Frame(notebook, bg=BG)
        notebook.add(frame, text="glance")
        self.glance_results = queue.Queue()
        self.glance_open = None

        hdr = tk.Frame(frame, bg=BG)
        hdr.pack(fill="x", padx=14, pady=(10, 4))
        tk.Label(hdr, text="THE GLANCE — everything, at its stage",
                 font=MONO_B, fg=GB, bg=BG).pack(side="left")
        tk.Button(hdr, text="refresh", font=MONO_B, fg=GD, bg="white",
                  relief="flat", padx=12, highlightthickness=1,
                  highlightbackground=BDR, command=self._glance_refresh
                  ).pack(side="left", padx=10)
        self.glance_status = tk.Label(hdr, text="", font=("Courier New", 7),
                                      fg=GF, bg=BG)
        self.glance_status.pack(side="left")

        canvas = tk.Canvas(frame, bg=BG, highlightthickness=0)
        sb = tk.Scrollbar(frame, orient="vertical", command=canvas.yview)
        self.glance_cards = tk.Frame(canvas, bg=BG)
        self.glance_cards.bind("<Configure>",
                               lambda e: canvas.configure(scrollregion=canvas.bbox("all")))
        gwin = canvas.create_window((0, 0), window=self.glance_cards, anchor="nw")
        canvas.bind("<Configure>", lambda e: canvas.itemconfigure(gwin, width=e.width))
        canvas.configure(yscrollcommand=sb.set)
        canvas.pack(side="left", fill="both", expand=True, padx=(14, 0), pady=(0, 10))
        sb.pack(side="right", fill="y", pady=(0, 10))
        self._wheelable(canvas)

        self.root.after(500, self._drain_glance)
        self._glance_refresh()

    def _glance_refresh(self):
        self.glance_status.config(text="reading…", fg=YEL)

        def run():
            try:
                d = glance.build_index()
                self.glance_results.put(("ok", d))
            except Exception as e:
                self.glance_results.put(("err", str(e)[:200]))
        threading.Thread(target=run, daemon=True).start()

    def _drain_glance(self):
        try:
            while True:
                status, d = self.glance_results.get_nowait()
                if status == "err":
                    self.glance_status.config(text=f"could not read: {d}", fg=RED)
                    continue
                self._render_glance(d["items"])
                self.glance_status.config(text=f"{len(d['items'])} item(s)", fg=GF)
        except queue.Empty:
            pass
        self.root.after(2500, self._drain_glance)

    def _render_glance(self, items):
        for w in self.glance_cards.winfo_children():
            w.destroy()
        by_stage = {}
        for it in items:
            by_stage.setdefault(it["stage"], []).append(it)
        for stage in glance.STAGE_ORDER:
            group = by_stage.get(stage, [])
            if not group:
                continue
            tk.Label(self.glance_cards, text=glance.STAGE_LABEL.get(stage, stage),
                     font=MONO_B, fg=GB, bg=BG, anchor="w"
                     ).pack(fill="x", pady=(10, 2))
            for i, it in enumerate(group):
                self._glance_card(it, f"{stage}:{i}")

    def _glance_card(self, item, key):
        c = tk.Frame(self.glance_cards, bg=SF, highlightthickness=1,
                     highlightbackground=BDR)
        c.pack(fill="x", pady=2)
        hd = tk.Frame(c, bg=SF)
        hd.pack(fill="x")
        title = tk.Label(hd, text=item["title"][:110], font=MONO_B, fg=GB, bg=SF,
                         anchor="w", wraplength=760, justify="left", cursor="hand2")
        title.pack(fill="x", padx=10, pady=6, side="left", expand=True)
        body = tk.Frame(c, bg=SF)

        def toggle(e=None):
            if body.winfo_ismapped():
                body.pack_forget()
            else:
                body.pack(fill="x", padx=10, pady=(0, 8))
        title.bind("<Button-1>", toggle)
        tk.Label(body, text=item["detail"], font=("Courier New", 9), fg=G, bg=SF,
                 anchor="w", wraplength=760, justify="left").pack(fill="x")
        tk.Label(body, text=item["source"], font=("Courier New", 7), fg=GF, bg=SF,
                 anchor="w").pack(fill="x", pady=(4, 0))
        # held/crossed items carry a real staged id in their title (glance.py
        # reads it straight from marks.jsonl) — the only glance stages with a
        # concrete object to open. staging/ripe items are gate_data text with
        # no file reference; no deepdive link is fabricated for those.
        if item["stage"] in ("held", "crossed") and (core.STAGED / f"{item['title']}.json").exists():
            tk.Button(body, text="deepdive →", font=MONO_B, fg=GD, bg="white",
                     relief="flat", padx=8, highlightthickness=1, highlightbackground=BDR,
                     command=lambda sid=item["title"]: self._open_deepdive("staged", sid, "canon")
                     ).pack(anchor="w", pady=(6, 4))

    # ------------------------------------------------------ library (v0)
    # Step 5 — the pattern library, first-class: every pattern on disk
    # (library.py), searchable, filterable canon/folded, click to read,
    # EXTENDS lineage as clickable jumps to the parent pattern. Pure local
    # data, read-only — no dependency on any other tab.
    def _build_library_tab(self, notebook):
        frame = tk.Frame(notebook, bg=BG)
        notebook.add(frame, text="library")
        self.lib_index = []

        panes = tk.PanedWindow(frame, orient="horizontal", bg=BDR, sashwidth=4)
        panes.pack(fill="both", expand=True, padx=14, pady=10)

        left = tk.Frame(panes, bg=BG)
        hdr = tk.Frame(left, bg=BG)
        hdr.pack(fill="x")
        tk.Label(hdr, text="PATTERN LIBRARY", font=MONO_B, fg=GB, bg=BG
                 ).pack(anchor="w")
        self.lib_status = tk.Label(hdr, text="", font=("Courier New", 7), fg=GF, bg=BG)
        self.lib_status.pack(anchor="w")
        self.lib_search = tk.Entry(left, font=MONO, bg="white", fg=GB, relief="flat",
                                   highlightthickness=1, highlightbackground=BDR)
        self.lib_search.pack(fill="x", pady=(6, 2), ipady=4)
        self.lib_search.bind("<KeyRelease>", lambda e: self._lib_filter())
        frow = tk.Frame(left, bg=BG)
        frow.pack(fill="x", pady=(0, 6))
        self.lib_state = tk.StringVar(value="all")
        for label, val in (("all", "all"), ("canon", "canon"), ("folded", "folded")):
            tk.Radiobutton(frow, text=label, variable=self.lib_state, value=val,
                          font=("Courier New", 8), fg=GD, bg=BG, selectcolor=SF,
                          command=self._lib_filter).pack(side="left")
        self.lib_list = tk.Listbox(left, font=MONO, bg=SF, fg=GB,
                                   highlightthickness=1, highlightbackground=BDR,
                                   relief="flat", activestyle="none")
        self.lib_list.pack(fill="both", expand=True)
        self.lib_list.bind("<<ListboxSelect>>", lambda e: self._lib_open_selected())
        panes.add(left, width=340)

        right = tk.Frame(panes, bg=BG)
        thd = tk.Frame(right, bg=BG)
        thd.pack(fill="x")
        self.lib_title = tk.Label(thd, text="(select a pattern)", font=MONO_B,
                                  fg=GB, bg=BG, anchor="w", wraplength=460, justify="left")
        self.lib_title.pack(side="left", fill="x", expand=True)
        self.lib_deepdive_btn = tk.Button(thd, text="deepdive →", font=MONO_B, fg=GD,
                                          bg="white", relief="flat", padx=10,
                                          highlightthickness=1, highlightbackground=BDR,
                                          state="disabled", command=self._lib_open_deepdive)
        self.lib_deepdive_btn.pack(side="right")
        # Step 4 / Step 2b: the lawful path to change a frozen canon pattern —
        # spawn a working descendant. Enabled only for canon; disabled otherwise.
        self.lib_spawn_btn = tk.Button(thd, text="spawn descendant →", font=MONO_B,
                                       fg=GRN, bg="white", relief="flat", padx=10,
                                       highlightthickness=1, highlightbackground=BDR,
                                       state="disabled", command=self._lib_spawn)
        self.lib_spawn_btn.pack(side="right", padx=(0, 6))
        # Step 8 — the daily-light act on a standing pattern: annotate (sidecar,
        # canon untouched) and re-lint (the live LINT use), no deepdive needed.
        self.lib_annotate_btn = tk.Button(thd, text="annotate", font=MONO_B, fg=GD,
                                          bg="white", relief="flat", padx=10,
                                          highlightthickness=1, highlightbackground=BDR,
                                          state="disabled", command=self._lib_annotate)
        self.lib_annotate_btn.pack(side="right", padx=(0, 6))
        self.lib_relint_btn = tk.Button(thd, text="re-lint", font=MONO_B, fg=GD,
                                        bg="white", relief="flat", padx=10,
                                        highlightthickness=1, highlightbackground=BDR,
                                        state="disabled", command=self._lib_relint)
        self.lib_relint_btn.pack(side="right", padx=(0, 6))
        self.lib_lineage = tk.Frame(right, bg=BG)
        self.lib_lineage.pack(fill="x", pady=(2, 4))
        # Step 4 — the local self-legible shape of the pattern in hand.
        self.lib_shape = tk.Frame(right, bg=BG)
        self.lib_shape.pack(fill="x", pady=(0, 6))
        self.lib_text = tk.Text(right, font=MONO, bg=SF, fg=G, wrap="word",
                                relief="flat", highlightthickness=1,
                                highlightbackground=BDR, state="disabled")
        self.lib_text.pack(fill="both", expand=True)
        panes.add(right)

        self._lib_load()

    def _lib_load(self):
        self.lib_status.config(text="reading…", fg=YEL)

        def run():
            try:
                idx = library.build_index()
                self.root.after(0, lambda: self._lib_loaded(idx))
            except Exception as e:
                self.root.after(0, lambda: self.lib_status.config(
                    text=f"could not read: {str(e)[:160]}", fg=RED))
        threading.Thread(target=run, daemon=True).start()

    def _lib_loaded(self, idx):
        self.lib_index = idx
        canon = sum(1 for e in idx if e["state"] == "canon")
        folded = sum(1 for e in idx if e["state"] == "folded")
        try:
            s = library.shape_summary(idx)
            cov = s["coverage"]
            self.lib_status.config(
                text=f"{canon} canon · {folded} folded · "
                     f"{cov['fingerprinted']} fp/{cov['raw']} raw · "
                     f"{s['true_orphans']} orphans", fg=GF)
        except Exception:
            self.lib_status.config(text=f"{canon} canon · {folded} folded", fg=GF)
        # The hard guard, surfaced where Kevin stands: any off-path canon write
        # turns the status line into a loud breach banner (fail-closed spirit).
        try:
            breach = core.guard_audit()
            if not breach["clean"]:
                self.lib_status.config(
                    text=f"⚠ CANON GUARD BREACH — off-path write(s): "
                         f"{', '.join(breach['offpath'][:4])} — crossing is refused "
                         f"until reconciled", fg=RED)
        except Exception:
            pass
        self._lib_filter()

    def _lib_filter(self):
        q = self.lib_search.get()
        state = self.lib_state.get()
        results = library.search(self.lib_index, q, state)
        self._lib_shown = results
        self.lib_list.delete(0, "end")
        for e in results:
            tag = "canon" if e["state"] == "canon" else "FOLDED"
            self.lib_list.insert("end", f"[{tag}] {e['title']}")

    def _lib_open_selected(self):
        sel = self.lib_list.curselection()
        if not sel or not getattr(self, "_lib_shown", None):
            return
        entry = self._lib_shown[sel[0]]
        self._lib_open(entry["slug"], entry["state"])

    def _lib_open(self, slug, state):
        entry = library.find_by_slug(self.lib_index, slug)
        if not entry:
            return
        self.lib_title.config(text=f"{entry['title']}  ·  {entry['state']}  ·  {entry['file']}")
        self.lib_deepdive_btn.config(state="normal")
        self.lib_annotate_btn.config(state="normal")
        self.lib_relint_btn.config(state="normal")
        self._lib_selected = entry
        for w in self.lib_lineage.winfo_children():
            w.destroy()
        if entry["extends"]:
            tk.Label(self.lib_lineage, text="EXTENDS:", font=("Courier New", 7),
                     fg=GF, bg=BG).pack(side="left")
            for parent_slug in entry["extends"]:
                parent = library.find_by_slug(self.lib_index, parent_slug)
                label = parent["title"] if parent else f"{parent_slug} (not found)"
                btn = tk.Label(self.lib_lineage, text=label, font=("Courier New", 8, "underline"),
                              fg=GD, bg=BG, cursor="hand2")
                btn.pack(side="left", padx=(6, 0))
                if parent:
                    btn.bind("<Button-1>", lambda e, s=parent_slug, st=parent["state"]:
                            self._lib_open(s, st))
        # Step 4 — the local self-legible shape of the pattern in hand.
        self._lib_render_shape(slug)
        # spawn is the lawful way to change a frozen canon pattern (Step 2b).
        self.lib_spawn_btn.config(state=("normal" if state == "canon" else "disabled"))
        text = library.read_pattern(slug, state)
        self._set_text(self.lib_text, text)

    def _lib_render_shape(self, slug):
        for w in self.lib_shape.winfo_children():
            w.destroy()
        try:
            n = library.neighborhood(slug, self.lib_index)
        except Exception as e:
            tk.Label(self.lib_shape, text=f"(shape unavailable: {str(e)[:80]})",
                     font=("Courier New", 7), fg=GF, bg=BG).pack(anchor="w")
            return
        if "error" in n:
            return
        badge = tk.Frame(self.lib_shape, bg=BG)
        badge.pack(fill="x")
        tk.Label(badge, text=("lint: structural" if n["fingerprinted"] else "lint: vocabulary"),
                 font=("Courier New", 7), fg=(GRN if n["fingerprinted"] else YEL),
                 bg=BG).pack(side="left", padx=(0, 10))
        if n["drift"]:
            tk.Label(badge, text=f"cache: {n['drift']}", font=("Courier New", 7),
                     fg=(RED if n["drift"] == "stale" else GF), bg=BG).pack(side="left", padx=(0, 10))
        n_up = len(n["lineage_up"])
        n_down = len(n["lineage_down"])
        if n["is_orphan"]:
            tk.Label(badge, text="ORPHAN — no lineage either way", font=("Courier New", 7, "bold"),
                     fg=RED, bg=BG).pack(side="left")
        elif n_down >= 8:
            tk.Label(badge, text=f"HUB — {n_down} descend/link here", font=("Courier New", 7, "bold"),
                     fg=GRN, bg=BG).pack(side="left")
        else:
            tk.Label(badge, text=f"{n_up} up · {n_down} down", font=("Courier New", 7),
                     fg=GF, bg=BG).pack(side="left")

        def _links(label, items, cap=6):
            if not items:
                return
            row = tk.Frame(self.lib_shape, bg=BG)
            row.pack(fill="x", pady=(2, 0))
            tk.Label(row, text=label, font=("Courier New", 7), fg=GF, bg=BG).pack(side="left")
            for it in items[:cap]:
                # hard EXTENDS vs soft wikilink — both lineage (Kevin's mark),
                # marked so the distinction stays legible: = extends, · wikilink
                mark = "=" if it.get("rel") == "extends" else "·"
                b = tk.Label(row, text=f"{mark} {it['title']}", font=("Courier New", 8, "underline"),
                             fg=GD, bg=BG, cursor="hand2")
                b.pack(side="left", padx=(6, 0))
                b.bind("<Button-1>", lambda e, s=it["slug"], st=it["state"]: self._lib_open(s, st))
            if len(items) > cap:
                tk.Label(row, text=f"+{len(items) - cap} more", font=("Courier New", 7),
                         fg=GF, bg=BG).pack(side="left", padx=(6, 0))
        _links("lineage ↑:", n["lineage_up"])
        _links("lineage ↓:", n["lineage_down"])

        # Step 7 — sockets: unmet conditions rendered as awaiting-slots (derived).
        try:
            socks = library.sockets(slug, self.lib_index)
        except Exception:
            socks = []
        for s in socks:
            tk.Label(self.lib_shape,
                     text=f"◇ awaiting: {s['label']} — {s['awaiting']}",
                     font=("Courier New", 7), fg=YEL, bg=BG, anchor="w",
                     justify="left", wraplength=440).pack(anchor="w", pady=(2, 0))
        # Step 8 — annotations (sidecar; canon body never touched).
        try:
            notes = annotations.get_annotations(slug)
        except Exception:
            notes = []
        if notes:
            tk.Label(self.lib_shape, text=f"notes ({len(notes)}):", font=("Courier New", 7),
                     fg=GF, bg=BG).pack(anchor="w", pady=(3, 0))
            for a in notes[-3:]:
                tk.Label(self.lib_shape, text=f"  · {a.get('note','')[:80]}",
                         font=("Courier New", 7), fg=GD, bg=BG, anchor="w",
                         justify="left", wraplength=440).pack(anchor="w")

    def _lib_spawn(self):
        entry = getattr(self, "_lib_selected", None)
        if not entry or entry["state"] != "canon":
            return
        res = deepdive.spawn_descendant(entry["slug"])
        if "error" in res:
            self.lib_status.config(text=res["error"][:160], fg=RED)
            return
        self.lib_status.config(
            text=f"spawned descendant of {entry['slug']} — edit it, "
                 f"then cross to supersede", fg=GRN)
        # open the working copy in the deepdive chamber — the spawn → edit loop,
        # in one place (cross happens through the normal staged mark path).
        self._open_deepdive("descendant", res["ref"])

    def _lib_open_deepdive(self):
        entry = getattr(self, "_lib_selected", None)
        if not entry:
            return
        self._open_deepdive("pattern", entry["slug"], entry["state"])

    def _lib_annotate(self):
        # Step 8 daily-light act: a note in passing, to the sidecar — canon
        # body is never touched (OM6 default).
        entry = getattr(self, "_lib_selected", None)
        if not entry:
            return
        note = simpledialog.askstring("Annotate (sidecar — canon untouched)",
                                      f"A note on {entry['slug']}:", parent=self)
        if not note:
            return
        annotations.annotate(entry["slug"], note)
        self._lib_render_shape(entry["slug"])

    def _lib_relint(self):
        # Step 8 / three-use surface: LINT live and re-runnable. Re-screen the
        # pattern's own text against the library (codex) — engine-external.
        entry = getattr(self, "_lib_selected", None)
        if not entry:
            return
        self.lib_status.config(text="re-linting… (rebuilds the cache if it drifted)", fg=YEL)
        slug, state = entry["slug"], entry["state"]

        def run():
            try:
                sys.path.insert(0, str(core.DSS / "tools" / "codex_index"))
                from query import match
                text = library.read_pattern(slug, state)[:800]
                hits = match(text, n=2)
                if hits:
                    top = hits[0]
                    msg = (f"re-lint {slug}: nearest {top['pattern']} "
                           f"d={top['distance']} [{top['verdict']}]")
                else:
                    msg = f"re-lint {slug}: no close codex match [PASS]"
                self.root.after(0, lambda: self.lib_status.config(text=msg, fg=GF))
            except Exception as e:
                self.root.after(0, lambda: self.lib_status.config(
                    text=f"re-lint unavailable: {str(e)[:120]}", fg=RED))
        threading.Thread(target=run, daemon=True).start()

    # --------------------------------------------------------- held (v0)
    # Step 8 — every hold, its gap named. held.py combines Kevin's own
    # marks.jsonl holds with the standing structural gaps (engine dark,
    # Trickster Detector, brief-only holds, the shared missing register,
    # unread briefs). A hold whose gap can't be named renders flagged —
    # never a fabricated-sounding gap filled in to look complete.
    def _build_held_tab(self, notebook):
        frame = tk.Frame(notebook, bg=BG)
        notebook.add(frame, text="held")
        self.held_results = queue.Queue()

        hdr = tk.Frame(frame, bg=BG)
        hdr.pack(fill="x", padx=14, pady=(10, 4))
        tk.Label(hdr, text="HELD — every gap, named or flagged",
                 font=MONO_B, fg=GB, bg=BG).pack(side="left")
        tk.Button(hdr, text="refresh", font=MONO_B, fg=GD, bg="white",
                  relief="flat", padx=12, highlightthickness=1,
                  highlightbackground=BDR, command=self._held_refresh
                  ).pack(side="left", padx=10)
        self.held_status = tk.Label(hdr, text="", font=("Courier New", 7),
                                    fg=GF, bg=BG)
        self.held_status.pack(side="left")

        # Step 5/6 — the capacities surface: hold a latent capacity, mark it
        # resourced (your event), then perform the second read (moved =
        # capability, unmoved = named aspiration). The verdict is always your
        # mark, never computed.
        caprow = tk.Frame(frame, bg=BG)
        caprow.pack(fill="x", padx=14, pady=(2, 2))
        tk.Label(caprow, text="CAPACITIES — held things that aren't patterns",
                 font=("Courier New", 8, "bold"), fg=GB, bg=BG).pack(side="left")
        tk.Button(caprow, text="+ hold a capacity", font=("Courier New", 8), fg=GRN,
                  bg="white", relief="flat", padx=8, highlightthickness=1,
                  highlightbackground=BDR, command=self._cap_hold).pack(side="left", padx=8)
        self.cap_panel = tk.Frame(frame, bg=BG)
        self.cap_panel.pack(fill="x", padx=14, pady=(0, 6))
        self._render_capacities()

        canvas = tk.Canvas(frame, bg=BG, highlightthickness=0)
        sb = tk.Scrollbar(frame, orient="vertical", command=canvas.yview)
        self.held_cards = tk.Frame(canvas, bg=BG)
        self.held_cards.bind("<Configure>",
                             lambda e: canvas.configure(scrollregion=canvas.bbox("all")))
        hwin = canvas.create_window((0, 0), window=self.held_cards, anchor="nw")
        canvas.bind("<Configure>", lambda e: canvas.itemconfigure(hwin, width=e.width))
        canvas.configure(yscrollcommand=sb.set)
        canvas.pack(side="left", fill="both", expand=True, padx=(14, 0), pady=(0, 10))
        sb.pack(side="right", fill="y", pady=(0, 10))
        self._wheelable(canvas)

        self.root.after(500, self._drain_held)
        self._held_refresh()

    def _render_capacities(self):
        for w in self.cap_panel.winfo_children():
            w.destroy()
        try:
            caps = [c for c in held_record.list_capacities() if c.get("status") != "composted"]
        except Exception as e:
            tk.Label(self.cap_panel, text=f"(capacities unavailable: {str(e)[:60]})",
                     font=("Courier New", 7), fg=GF, bg=BG).pack(anchor="w")
            return
        if not caps:
            tk.Label(self.cap_panel, text="(none held — '+ hold a capacity' to open one)",
                     font=("Courier New", 7), fg=GF, bg=BG).pack(anchor="w")
            return
        for c in caps:
            row = tk.Frame(self.cap_panel, bg=SF, highlightthickness=1, highlightbackground=BDR)
            row.pack(fill="x", pady=2)
            st = c.get("status")
            col = {"held": GD, "eligible": YEL, "live": GRN, "aspiration": RED}.get(st, GD)
            tk.Label(row, text=f"[{st}]", font=("Courier New", 7, "bold"), fg=col,
                     bg=SF, padx=6).pack(side="left")
            tk.Label(row, text=str(c.get("entry_ref", c["id"]))[:56], font=("Courier New", 8),
                     fg=GB, bg=SF).pack(side="left", padx=(2, 6))
            if c.get("latency_type"):
                tk.Label(row, text=c["latency_type"], font=("Courier New", 7),
                         fg=GF, bg=SF).pack(side="left")
            cid = c["id"]
            if st == "held":
                tk.Button(row, text="mark resourced", font=("Courier New", 7), fg=YEL,
                          bg="white", relief="flat", padx=6, highlightthickness=1,
                          highlightbackground=BDR,
                          command=lambda i=cid: self._cap_resourced(i)).pack(side="right", padx=4)
            elif st == "eligible":
                tk.Button(row, text="aspiration", font=("Courier New", 7), fg=RED,
                          bg="white", relief="flat", padx=6, highlightthickness=1,
                          highlightbackground=BDR,
                          command=lambda i=cid: self._cap_second_read(i, "aspiration")
                          ).pack(side="right", padx=4)
                tk.Button(row, text="capability", font=("Courier New", 7), fg=GRN,
                          bg="white", relief="flat", padx=6, highlightthickness=1,
                          highlightbackground=BDR,
                          command=lambda i=cid: self._cap_second_read(i, "capability")
                          ).pack(side="right", padx=4)

    def _cap_hold(self):
        name = simpledialog.askstring("Hold a capacity",
                                      "What can you maybe do? (the capacity, in your words)",
                                      parent=self)
        if not name:
            return
        first = simpledialog.askstring("First read (baseline, optional)",
                                       "Where is it now? e.g. 'can't sustain it yet'",
                                       parent=self) or None
        lt = simpledialog.askstring("Latency type (optional)",
                                    "Why isn't it live? one of:\n"
                                    + " / ".join(held_record.LATENCY_TYPES),
                                    parent=self) or None
        if lt and lt not in held_record.LATENCY_TYPES:
            messagebox.showwarning("Capacity", f"'{lt}' is not a latency type — leaving it unset.")
            lt = None
        fals = simpledialog.askstring("Falsifier (optional)",
                                      "What would tell you it wasn't real, even resourced?",
                                      parent=self) or None
        try:
            held_record.hold_capacity(name, condition="when resourced",
                                      latency_type=lt, falsifier=fals, first_read=first)
        except Exception as e:
            messagebox.showerror("Capacity", str(e)[:200])
        self._render_capacities()

    def _cap_resourced(self, cid):
        held_record.mark_resourced(cid)
        self._render_capacities()

    def _cap_second_read(self, cid, verdict):
        note = simpledialog.askstring("Second read",
                                      f"Recording your read: {verdict}. A note (optional):",
                                      parent=self) or None
        r = held_record.second_read(cid, verdict, note=note)
        if isinstance(r, dict) and r.get("error"):
            messagebox.showwarning("Second read", r["error"])
        self._render_capacities()

    def _held_refresh(self):
        self.held_status.config(text="reading…", fg=YEL)

        def run():
            try:
                idx = held.build_index()
                self.held_results.put(("ok", idx))
            except Exception as e:
                self.held_results.put(("err", str(e)[:200]))
        threading.Thread(target=run, daemon=True).start()

    def _drain_held(self):
        try:
            while True:
                status, idx = self.held_results.get_nowait()
                if status == "err":
                    self.held_status.config(text=f"could not read: {idx}", fg=RED)
                    continue
                self._render_held(idx)
                flagged = sum(1 for e in idx if e["flagged"])
                self.held_status.config(text=f"{len(idx)} held · {flagged} flagged (no gap named)", fg=GF)
        except queue.Empty:
            pass
        self.root.after(2500, self._drain_held)

    def _render_held(self, idx):
        for w in self.held_cards.winfo_children():
            w.destroy()
        if not idx:
            tk.Label(self.held_cards, text="nothing held", font=MONO, fg=GF, bg=BG
                     ).pack(anchor="w", pady=8)
            return
        for e in idx:
            flagged = e["flagged"]
            bg = RED_BG if flagged else SF
            c = tk.Frame(self.held_cards, bg=bg, highlightthickness=1,
                         highlightbackground=BDR)
            c.pack(fill="x", pady=3)
            tk.Label(c, text=("⚑ FLAGGED — no gap named  ·  " if flagged else "") + e["title"],
                     font=MONO_B, fg=(RED if flagged else GB), bg=bg, anchor="w",
                     wraplength=880, justify="left").pack(fill="x", padx=10, pady=(7, 0))
            tk.Label(c, text=e["gap"], font=("Courier New", 9), fg=G, bg=bg,
                     anchor="w", wraplength=880, justify="left").pack(fill="x", padx=10, pady=(2, 0))
            tk.Label(c, text=f"{e['kind']} · {e['source']}", font=("Courier New", 7),
                     fg=GF, bg=bg, anchor="w").pack(fill="x", padx=10, pady=(2, 7))

    # --------------------------------------------------------- deepdive (v0)
    # The Composer Bench Deepdive — the deep review chamber. Entered from a
    # node (room), a pattern (library), or a mark (glance); leaving returns
    # to that exact tab. Language layer throughout: LIBRARY/GOVERNOR/CENTER
    # render as three distinct attributed lines, never merged; the status
    # word is always the fixed vocabulary text, never color-only; edges/
    # lineage render as chips (the geometry-lite version — real position/
    # grouping in the room tab is the fuller geometry register; here the
    # chip IS the relation, clickable, not prose describing it); every
    # control states its cost before it's pressed (Save/Undo/verb labels
    # are the cost). Reading (sections, full text, open) and deciding (the
    # DECISIONS block at the very bottom) never mix in one visual block.
    def _build_deepdive_tab(self, notebook):
        frame = tk.Frame(notebook, bg=BG)
        notebook.add(frame, text="deepdive")
        self.dd_tab_index = notebook.index("end") - 1
        self.dd_results = queue.Queue()
        self.dd_origin = None
        self.dd_current = None
        self.dd_compare = None
        self.dd_section_widgets = {}
        self.dd_compare_widgets = {}
        self.dd_after = {}

        hdr = tk.Frame(frame, bg=BG)
        hdr.pack(fill="x", padx=14, pady=(10, 4))
        tk.Button(hdr, text="← return", font=MONO_B, fg=GD, bg="white",
                  relief="flat", padx=10, highlightthickness=1,
                  highlightbackground=BDR, command=self._dd_return
                  ).pack(side="left")
        self.dd_title = tk.Label(hdr, text="(nothing open — enter from library, "
                                 "room, or a held/crossed glance card)",
                                 font=MONO_B, fg=GB, bg=BG)
        self.dd_title.pack(side="left", padx=12)
        self.dd_undo_btn = tk.Button(hdr, text="↺ undo (whole file)", font=MONO,
                                     fg=GD, bg="white", relief="flat", padx=10,
                                     highlightthickness=1, highlightbackground=BDR,
                                     command=self._dd_undo, state="disabled")
        self.dd_undo_btn.pack(side="right")
        self.dd_note = tk.Label(frame, text="", font=("Courier New", 8), fg=GF, bg=BG)
        self.dd_note.pack(anchor="w", padx=14)

        self.dd_lineage = tk.Frame(frame, bg=BG)
        self.dd_lineage.pack(fill="x", padx=14, pady=(4, 4))

        verd = tk.Frame(frame, bg=SF, highlightthickness=1, highlightbackground=BDR)
        verd.pack(fill="x", padx=14, pady=(2, 4))
        self.dd_v_library = tk.Label(verd, text="", font=("Courier New", 9), fg=G,
                                     bg=SF, anchor="w", wraplength=940, justify="left")
        self.dd_v_governor = tk.Label(verd, text="", font=("Courier New", 9), fg=G,
                                      bg=SF, anchor="w", wraplength=940, justify="left")
        self.dd_v_center = tk.Label(verd, text="", font=("Courier New", 9, "bold"), fg=GB,
                                    bg=SF, anchor="w", wraplength=940, justify="left")
        for w in (self.dd_v_library, self.dd_v_governor, self.dd_v_center):
            w.pack(fill="x", padx=10, pady=(5, 0))
        tk.Frame(verd, bg=SF, height=5).pack()

        self.dd_gaps = tk.Frame(frame, bg=BG)
        self.dd_gaps.pack(fill="x", padx=14)

        panes = tk.PanedWindow(frame, orient="horizontal", bg=BDR, sashwidth=4)
        panes.pack(fill="both", expand=True, padx=14, pady=(6, 4))

        left = tk.Frame(panes, bg=BG)
        lcanvas = tk.Canvas(left, bg=BG, highlightthickness=0)
        lsb = tk.Scrollbar(left, orient="vertical", command=lcanvas.yview)
        self.dd_left_body = tk.Frame(lcanvas, bg=BG)
        self.dd_left_body.bind("<Configure>",
                               lambda e: lcanvas.configure(scrollregion=lcanvas.bbox("all")))
        lwin = lcanvas.create_window((0, 0), window=self.dd_left_body, anchor="nw")
        lcanvas.bind("<Configure>", lambda e: lcanvas.itemconfigure(lwin, width=e.width))
        lcanvas.configure(yscrollcommand=lsb.set)
        lcanvas.pack(side="left", fill="both", expand=True)
        lsb.pack(side="right", fill="y")
        self._wheelable(lcanvas)
        panes.add(left, width=560)

        right = tk.Frame(panes, bg=BG)
        rhdr = tk.Frame(right, bg=BG)
        rhdr.pack(fill="x")
        tk.Label(rhdr, text="COMPARE — read-only", font=MONO_B, fg=GB, bg=BG
                 ).pack(side="left")
        tk.Button(rhdr, text="✕ close compare", font=("Courier New", 8), fg=GD,
                  bg="white", relief="flat", command=self._dd_close_compare
                  ).pack(side="left", padx=10)
        rcanvas = tk.Canvas(right, bg=BG, highlightthickness=0)
        rsb = tk.Scrollbar(right, orient="vertical", command=rcanvas.yview)
        self.dd_right_body = tk.Frame(rcanvas, bg=BG)
        self.dd_right_body.bind("<Configure>",
                                lambda e: rcanvas.configure(scrollregion=rcanvas.bbox("all")))
        rwin = rcanvas.create_window((0, 0), window=self.dd_right_body, anchor="nw")
        rcanvas.bind("<Configure>", lambda e: rcanvas.itemconfigure(rwin, width=e.width))
        rcanvas.configure(yscrollcommand=rsb.set)
        rcanvas.pack(side="left", fill="both", expand=True)
        rsb.pack(side="right", fill="y")
        self._wheelable(rcanvas)
        panes.add(right)
        tk.Label(right, text="(nothing to compare — click ⇄ next to a lineage chip)",
                 font=("Courier New", 8), fg=GF, bg=BG).pack(anchor="w", pady=6)

        self.root.after(400, self._drain_dd)
        # persistence — reopen whatever was open when the app last closed
        ui = deepdive.load_ui_state()
        if ui.get("kind") and ui.get("ref"):
            self.dd_origin = ui.get("origin_index", 0)
            self.root.after(600, lambda: self._open_deepdive(
                ui["kind"], ui["ref"], ui.get("state", "canon"),
                origin_index=self.dd_origin, restore=True))

    def _open_deepdive(self, kind, ref, state="canon", origin_index=None, restore=False):
        if not restore:
            self.dd_origin = (origin_index if origin_index is not None
                              else self.notebook.index(self.notebook.select()))
            deepdive.save_ui_state({"kind": kind, "ref": ref, "state": state,
                                    "origin_index": self.dd_origin})
        self.dd_current = {"kind": kind, "ref": ref, "state": state}
        self.dd_compare = None
        self.notebook.select(self.dd_tab_index)
        self.dd_title.config(text="loading…")
        self._dd_load(kind, ref, state, tag="main")

    def _dd_return(self):
        if self.dd_origin is not None:
            self.notebook.select(self.dd_origin)

    def _dd_load(self, kind, ref, state, tag):
        def run():
            try:
                g = deepdive.load_chamber(kind, ref, state)
            except Exception as e:
                g = {"error": str(e)[:200]}
            self.dd_results.put((tag, g))
        threading.Thread(target=run, daemon=True).start()

    def _drain_dd(self):
        try:
            while True:
                tag, g = self.dd_results.get_nowait()
                if tag == "main":
                    self._dd_render(g)
                elif tag == "compare":
                    self._dd_render_compare(g)
        except queue.Empty:
            pass
        self.root.after(400, self._drain_dd)

    def _dd_clear(self, parent):
        for w in parent.winfo_children():
            w.destroy()

    def _dd_render(self, g):
        if g.get("error"):
            self.dd_title.config(text=f"could not open: {g['error']}")
            return
        self.dd_title.config(text=f"{g['title']}   ·   {g['slug']}   ·   {g['kind']}"
                             + (f" ({self.dd_current.get('state')})" if g['kind'] == "pattern" else ""))
        self.dd_note.config(text=g.get("note", ""))
        self.dd_undo_btn.config(state=("normal" if g.get("can_undo") else "disabled"))

        self._dd_clear(self.dd_lineage)
        if g["extends"]:
            tk.Label(self.dd_lineage, text="EXTENDS:", font=("Courier New", 7),
                     fg=GF, bg=BG).pack(side="left")
            for parent_slug in g["extends"]:
                chip = tk.Frame(self.dd_lineage, bg=SF2, highlightthickness=1,
                               highlightbackground=BDR)
                chip.pack(side="left", padx=(6, 0), pady=2)
                lbl = tk.Label(chip, text=parent_slug, font=("Courier New", 8, "underline"),
                              fg=GD, bg=SF2, cursor="hand2", padx=6, pady=2)
                lbl.pack(side="left")
                lbl.bind("<Button-1>", lambda e, s=parent_slug: self._open_deepdive(
                    "pattern", s, "canon", origin_index=self.dd_origin))
                cmp_btn = tk.Label(chip, text="⇄", font=("Courier New", 8, "bold"),
                                   fg=GD, bg=SF2, cursor="hand2", padx=6)
                cmp_btn.pack(side="left")
                cmp_btn.bind("<Button-1>", lambda e, s=parent_slug: self._dd_open_compare(
                    "pattern", s, "canon"))
        else:
            tk.Label(self.dd_lineage, text="EXTENDS: (none)", font=("Courier New", 7),
                     fg=GF, bg=BG).pack(side="left")

        v = g["verdicts"]
        self.dd_v_library.config(text=f"LIBRARY  ·  {v['library']}")
        self.dd_v_governor.config(text=f"GOVERNOR  ·  {v['governor']}")
        self.dd_v_center.config(text=f"CENTER  ·  {v['center']}")

        self._dd_clear(self.dd_gaps)
        for gap in g.get("gaps", []):
            tk.Label(self.dd_gaps, text=f"⚑ GAP — {gap}", font=("Courier New", 8),
                     fg=RED, bg=RED_BG, anchor="w", wraplength=940, justify="left"
                     ).pack(fill="x", pady=2)

        self._dd_clear(self.dd_left_body)
        self.dd_section_widgets = {}
        kind, ref = g["kind"], g["ref"]
        for sec in g["sections"]:
            self._dd_section_block(self.dd_left_body, g, sec, editable=not sec.get("readonly"))

        self._dd_instruments_block(self.dd_left_body, g)
        self._dd_decision_block(self.dd_left_body, g)

    def _dd_section_block(self, parent, g, sec, editable):
        kind, ref = g["kind"], g["ref"]
        key = sec["key"]
        box = tk.Frame(parent, bg=BG)
        box.pack(fill="x", pady=(4, 10))
        hd = tk.Frame(box, bg=BG)
        hd.pack(fill="x")
        tk.Label(hd, text=sec["heading"].upper(), font=MONO_B, fg=GB, bg=BG
                 ).pack(side="left")
        if not editable:
            tk.Label(hd, text="read-only", font=("Courier New", 7), fg=GF, bg=BG
                     ).pack(side="left", padx=8)
        pending = sec.get("draft_pending")
        if pending is not None:
            tk.Label(hd, text="unsaved draft restored", font=("Courier New", 7),
                     fg=YEL, bg=BG).pack(side="left", padx=8)
        text = tk.Text(box, font=MONO, bg=("white" if editable else SF), fg=GB,
                       wrap="word", height=6, relief="flat", highlightthickness=1,
                       highlightbackground=BDR, state=("normal" if editable else "disabled"))
        text.pack(fill="x")
        body = pending if pending is not None else sec["body"]
        if not editable:
            text.config(state="normal")
        text.insert("1.0", body)
        if not editable:
            text.config(state="disabled")
        else:
            self.dd_section_widgets[key] = text
            text.bind("<KeyRelease>", lambda e, k=key: self._dd_schedule_draft(kind, ref, k))
            row = tk.Frame(box, bg=BG)
            row.pack(fill="x", pady=(3, 0))
            status = tk.Label(row, text="LIGHT — writes the real file on this Save; "
                              "reversible with the ↺ undo button above", font=("Courier New", 7),
                              fg=GF, bg=BG)
            status.pack(side="left")
            tk.Button(row, text="save this section", font=MONO_B, fg=GD, bg="white",
                      relief="flat", padx=10, highlightthickness=1, highlightbackground=BDR,
                      command=lambda k=key: self._dd_save_section(kind, ref, k)
                      ).pack(side="right")

    def _dd_schedule_draft(self, kind, ref, key):
        tag = (kind, ref, key)
        if tag in self.dd_after:
            self.root.after_cancel(self.dd_after[tag])
        def fire():
            w = self.dd_section_widgets.get(key)
            if w:
                text = w.get("1.0", "end-1c")
                threading.Thread(target=lambda: deepdive.save_draft(kind, ref, key, text),
                                 daemon=True).start()
        self.dd_after[tag] = self.root.after(700, fire)

    def _dd_save_section(self, kind, ref, key):
        w = self.dd_section_widgets.get(key)
        if not w:
            return
        body = w.get("1.0", "end-1c")

        def run():
            g = deepdive.save_section(kind, ref, key, body)
            self.dd_results.put(("main", g))
        threading.Thread(target=run, daemon=True).start()

    def _dd_undo(self):
        if not self.dd_current:
            return
        kind, ref = self.dd_current["kind"], self.dd_current["ref"]

        def run():
            g = deepdive.undo(kind, ref)
            self.dd_results.put(("main", g))
        threading.Thread(target=run, daemon=True).start()

    def _dd_instruments_block(self, parent, g):
        box = tk.Frame(parent, bg=BG, highlightthickness=1, highlightbackground=BDR)
        box.pack(fill="x", pady=(4, 10))
        tk.Label(box, text="LOCAL INSTRUMENTS — deterministic, no engine", font=MONO_B,
                 fg=GB, bg=BG).pack(anchor="w", padx=10, pady=(8, 4))
        out = tk.Text(box, font=("Courier New", 8), bg=SF, fg=G, wrap="word",
                      height=6, relief="flat", highlightthickness=1,
                      highlightbackground=BDR, state="disabled")
        row = tk.Frame(box, bg=BG)
        row.pack(fill="x", padx=10, pady=(0, 6))
        current_text = (g["sections"][0]["body"] if g["sections"] else "")

        def run_instr(fn, *a):
            def run():
                try:
                    r = fn(*a)
                except Exception as e:
                    r = {"name": "error", "measured": "", "not_measured": "",
                         "results": [str(e)[:200]]}
                self.root.after(0, lambda: self._dd_show_instrument(out, r))
            threading.Thread(target=run, daemon=True).start()

        tk.Button(row, text="absence check", font=MONO, fg=GD, bg="white", relief="flat",
                  padx=8, highlightthickness=1, highlightbackground=BDR,
                  command=lambda: run_instr(deepdive.instrument_absence, current_text)
                  ).pack(side="left", padx=(0, 6))
        tk.Button(row, text="structural read", font=MONO, fg=GD, bg="white", relief="flat",
                  padx=8, highlightthickness=1, highlightbackground=BDR,
                  command=lambda: run_instr(deepdive.instrument_structural, {"draft": current_text})
                  ).pack(side="left", padx=(0, 6))
        tk.Button(row, text="lineage depth", font=MONO, fg=GD, bg="white", relief="flat",
                  padx=8, highlightthickness=1, highlightbackground=BDR,
                  command=lambda: run_instr(deepdive.instrument_lineage_depth, g["slug"])
                  ).pack(side="left")
        out.pack(fill="x", padx=10, pady=(0, 8))

    def _dd_show_instrument(self, out, r):
        out.config(state="normal")
        out.delete("1.0", "end")
        out.insert("end", f"{r['name']}\nmeasured: {r['measured']}\n"
                          f"not measured: {r['not_measured']}\n\n")
        results = r.get("results", [])
        if not results:
            out.insert("end", "(no results)")
        for item in results:
            out.insert("end", f"- {item}\n")
        out.config(state="disabled")

    def _dd_decision_block(self, parent, g):
        tk.Frame(parent, bg=BDR, height=1).pack(fill="x", pady=(6, 0))
        box = tk.Frame(parent, bg=YEL_BG, highlightthickness=1, highlightbackground=BDR)
        box.pack(fill="x", pady=(8, 20))
        tk.Label(box, text="DECISIONS — separate from reading", font=MONO_B, fg=GB,
                 bg=YEL_BG).pack(anchor="w", padx=10, pady=(8, 6))

        kind, ref = g["kind"], g["ref"]
        word = g["status"]["word"]
        row = tk.Frame(box, bg=YEL_BG)
        row.pack(fill="x", padx=10, pady=(0, 6))

        if kind == "staged":
            if word == "STAGED":
                for v, fg, bg in (("cross", GRN, GRN_BG), ("hold", YEL, YEL_BG),
                                  ("compost", RED, RED_BG)):
                    tk.Button(row, text=f"{v}  (writes core.record_mark)", font=MONO_B,
                             fg=fg, bg=bg, relief="flat", padx=10, highlightthickness=1,
                             highlightbackground=BDR,
                             command=lambda vv=v: self._dd_fire_mark(ref, vv)
                             ).pack(side="left", padx=(0, 8))
            elif word in ("HELD", "COMPOSTED"):
                tk.Button(row, text="↺ un-mark  (reverses the verdict, keeps the object staged)",
                         font=MONO, fg=GD, bg="white", relief="flat", padx=10,
                         highlightthickness=1, highlightbackground=BDR,
                         command=lambda: self._dd_fire_unmark(ref, crossed=False)
                         ).pack(side="left")
            elif word == "RATIFIED":
                tk.Button(row, text="↺ uncross  (folds the pattern to _folded/, rebuilds the lint)",
                         font=MONO, fg=RED, bg="white", relief="flat", padx=10,
                         highlightthickness=1, highlightbackground=BDR,
                         command=lambda: self._dd_fire_uncross(ref)
                         ).pack(side="left")
        else:  # pattern
            state = self.dd_current.get("state", "canon")
            if state == "canon":
                sid = deepdive.find_staged_id_for_pattern(g["slug"])
                if sid:
                    tk.Button(row, text=f"↺ uncross  (via staged record {sid})", font=MONO,
                             fg=RED, bg="white", relief="flat", padx=10,
                             highlightthickness=1, highlightbackground=BDR,
                             command=lambda s=sid: self._dd_fire_uncross(s)
                             ).pack(side="left")
                else:
                    tk.Label(row, text="uncross unavailable — no staged record found for "
                             "this pattern; can't roll back blind", font=("Courier New", 8),
                             fg=RED, bg=YEL_BG).pack(side="left")
            else:
                tk.Label(row, text="no re-cross verb defined yet — folded patterns have no "
                         "documented path back to canon (named gap, not built)",
                         font=("Courier New", 8), fg=GD, bg=YEL_BG).pack(side="left")

        crow = tk.Frame(box, bg=YEL_BG)
        crow.pack(fill="x", padx=10, pady=(4, 10))
        tk.Label(crow, text="correction (ledger annotation — names a discrepancy, "
                 "no code acts on it):", font=("Courier New", 7), fg=GF, bg=YEL_BG
                 ).pack(anchor="w")
        crow2 = tk.Frame(box, bg=YEL_BG)
        crow2.pack(fill="x", padx=10, pady=(0, 10))
        cnote = tk.Entry(crow2, font=MONO, bg="white", fg=GB, relief="flat",
                         highlightthickness=1, highlightbackground=BDR)
        cnote.pack(side="left", fill="x", expand=True, ipady=3)
        tk.Button(crow2, text="add correction", font=MONO, fg=GD, bg="white", relief="flat",
                  padx=10, highlightthickness=1, highlightbackground=BDR,
                  command=lambda: self._dd_add_correction(kind, ref, cnote)
                  ).pack(side="left", padx=(8, 0))

    def _dd_fire_mark(self, sid, verdict):
        self._mark_async(sid, verdict)
        self.root.after(900, lambda: self._dd_load(*self._dd_args()))

    def _dd_fire_unmark(self, sid, crossed):
        self._unmark_async(sid, crossed=crossed)
        self.root.after(900, lambda: self._dd_load(*self._dd_args()))

    def _dd_fire_uncross(self, sid):
        self._uncross_async(sid)
        self.root.after(900, lambda: self._dd_load(*self._dd_args()))

    def _dd_args(self):
        c = self.dd_current
        return (c["kind"], c["ref"], c.get("state", "canon"), "main")

    def _dd_add_correction(self, kind, ref, entry_widget):
        note = entry_widget.get().strip()
        if not note:
            return
        entry_widget.delete(0, "end")

        def run():
            try:
                deepdive.add_correction(kind, ref, note)
                self.dd_results.put(("main", deepdive.load_chamber(
                    kind, ref, self.dd_current.get("state", "canon"),
                    note="correction added")))
            except Exception as e:
                self.dd_results.put(("main", {"error": str(e)[:200]}))
        threading.Thread(target=run, daemon=True).start()

    # --------------------------------------------------------------- compare
    def _dd_open_compare(self, kind, ref, state):
        self.dd_compare = {"kind": kind, "ref": ref, "state": state}
        self._dd_load(kind, ref, state, tag="compare")

    def _dd_close_compare(self):
        self.dd_compare = None
        self._dd_clear(self.dd_right_body)
        tk.Label(self.dd_right_body, text="(nothing to compare — click ⇄ next to a "
                 "lineage chip)", font=("Courier New", 8), fg=GF, bg=BG
                 ).pack(anchor="w", pady=6)

    def _dd_render_compare(self, g):
        self._dd_clear(self.dd_right_body)
        if g.get("error"):
            tk.Label(self.dd_right_body, text=f"could not open: {g['error']}",
                     font=MONO, fg=RED, bg=BG).pack(anchor="w", padx=8, pady=8)
            return
        tk.Label(self.dd_right_body, text=f"{g['title']}  ·  {g['slug']}", font=MONO_B,
                 fg=GB, bg=BG, wraplength=380, justify="left").pack(anchor="w", padx=8, pady=(8, 2))
        tk.Label(self.dd_right_body, text=f"EXTENDS: {', '.join(g['extends']) or '(none)'}",
                 font=("Courier New", 7), fg=GF, bg=BG, wraplength=380, justify="left"
                 ).pack(anchor="w", padx=8, pady=(0, 4))
        v = g["verdicts"]
        for line in (f"LIBRARY · {v['library']}", f"GOVERNOR · {v['governor']}",
                    f"CENTER · {v['center']}"):
            tk.Label(self.dd_right_body, text=line, font=("Courier New", 8), fg=G, bg=SF,
                     anchor="w", wraplength=380, justify="left").pack(fill="x", padx=8, pady=1)
        for sec in g["sections"]:
            tk.Label(self.dd_right_body, text=sec["heading"].upper(), font=MONO_B, fg=GB,
                     bg=BG).pack(anchor="w", padx=8, pady=(8, 2))
            t = tk.Text(self.dd_right_body, font=("Courier New", 8), bg=SF, fg=G,
                       wrap="word", height=5, relief="flat", highlightthickness=1,
                       highlightbackground=BDR)
            t.insert("1.0", sec["body"])
            t.config(state="disabled")
            t.pack(fill="x", padx=8, pady=(0, 4))

    # ---------------------------------------------------------- worker side
    def _watch(self):
        seen = core.load_seen()
        while True:
            try:
                core.poll_once(seen, engine=True)
            except Exception as e:
                core.log("watch-error", error=str(e)[:200])
            import time
            time.sleep(core.POLL_SECONDS)

    def _capture_paste(self):
        text = self.paste_box.get("1.0", "end").strip()
        if not text:
            self.paste_status.config(text="nothing to capture — paste text first", fg=YEL)
            return
        self.paste_status.config(text="capturing…", fg=YEL)

        def run():
            try:
                p = core.capture_paste(text)
                self.results.put(("ok-paste", p.name, "captured", None))
            except Exception as e:
                self.results.put(("err-paste", None, "captured", str(e)[:200]))
        threading.Thread(target=run, daemon=True).start()
        self.paste_box.delete("1.0", "end")

    def _mark_async(self, sid, verdict):
        if sid in self.busy:
            return
        if verdict == "cross":
            if not messagebox.askokcancel(
                    "Cross into canon",
                    "This writes the object into patterns\\ and rebuilds the lint "
                    "(takes about a minute).\n\nReminder: the membrane line is not "
                    "yet ratified — real material should wait on that mark.\n\nCross?"):
                return
        condition = None
        if verdict == "hold":
            # Mark 5 seam (2026-07-19): a hold MAY carry an anchor tag so the
            # return circuit can bring it back. Blank/cancel = felt hold,
            # exactly as before — one optional field, never a second prompt.
            condition = simpledialog.askstring(
                "Hold — optional anchor",
                "Anchor tag, or leave blank for a felt hold:\n"
                "    until 2026-08-01\n"
                "    when file:patterns\\x.md exists",
                parent=self)
        self.busy.add(sid)
        self._refresh()

        def run():
            try:
                core.record_mark(sid, verdict, condition=condition)
                self.results.put(("ok", sid, verdict, None))
            except Exception as e:
                self.results.put(("err", sid, verdict, str(e)[:300]))
        threading.Thread(target=run, daemon=True).start()

    def _unmark_async(self, sid, crossed=False):
        """Reverse a mark — the toggle. Hold/compost reverse instantly (the
        reversal itself is recorded, so no confirm gate is needed); a crossed
        card keeps the canon-fold confirm because un-marking it folds the
        pattern out of the library and rebuilds the lint."""
        if sid in self.busy:
            return
        if crossed:
            if not messagebox.askokcancel(
                    "Un-mark a crossed card",
                    "This folds the pattern out of the canon (to patterns\\_folded\\, "
                    "kept not deleted), rebuilds the lint, and returns the card to "
                    "unmarked. Reverse the cross?"):
                return
        self.busy.add(sid)
        self._refresh()

        def run():
            try:
                core.unmark(sid)
                self.results.put(("ok", sid, "unmark", None))
            except Exception as e:
                self.results.put(("err", sid, "unmark", str(e)[:300]))
        threading.Thread(target=run, daemon=True).start()

    def _uncross_async(self, sid):
        if sid in self.busy:
            return
        if not messagebox.askokcancel(
                "Un-cross", "Pull this back out of the canon? It moves to "
                "patterns\\_folded\\ (kept, not deleted) and the lint rebuilds."):
            return
        self.busy.add(sid)
        self._refresh()

        def run():
            try:
                core.uncross(sid)
                self.results.put(("ok", sid, "uncross", None))
            except Exception as e:
                self.results.put(("err", sid, "uncross", str(e)[:300]))
        threading.Thread(target=run, daemon=True).start()

    # -------------------------------------------------------------- UI side
    def _drain(self):
        try:
            while True:
                status, sid, verdict, err = self.results.get_nowait()
                if status == "ok-paste":
                    self.paste_status.config(text=f"captured — {sid} in the inbox", fg=GRN)
                    continue
                if status == "err-paste":
                    self.paste_status.config(text=f"did not capture: {err}", fg=RED)
                    continue
                self.busy.discard(sid)
                if status == "err":
                    messagebox.showerror(
                        "DID NOT LAND — rolled back",
                        f"{verdict} on {sid} failed loudly; canon and lint "
                        f"unchanged.\n\n{err}")
        except queue.Empty:
            pass
        self.root.after(400, self._drain)

    def _refresh(self):
        try:
            st = core.state()
        except Exception as e:
            self.sub.config(text=f"state read error: {e}")
            self.root.after(2000, self._refresh)
            return
        self.sub.config(text=f"engine: {st['engine']} · {st['ts']} · "
                             "the mark is yours; nothing acts without your touch")
        # continuity checkpoint-on-mutation: a cheap key over the loop's own
        # state gates the write, so quiet refresh cycles cost nothing
        key = ([p["name"] for p in st["inbox"]],
               [(o.get("id"), (o.get("mark") or {}).get("verdict"),
                 bool(o.get("crossed"))) for o in st["staged"]])
        if key != getattr(self, "_cont_key", None):
            self._cont_key = key
            if continuity.load_config()["checkpoint_on_mutation"]:
                threading.Thread(target=continuity.checkpoint, args=(st,),
                                 daemon=True).start()
        self.inbox_list.delete(0, "end")
        for p in st["inbox"]:
            self.inbox_list.insert("end", f"{p['name']}  ({p['bytes']} b)")
        for w in self.cards.winfo_children():
            w.destroy()
        if not st["staged"]:
            tk.Label(self.cards, text="nothing staged yet — drop a file to begin",
                     font=MONO, fg=GF, bg=BG).pack(anchor="w", padx=4, pady=8)
        for o in st["staged"]:
            self._card(o)
        self.root.after(2500, self._refresh)

    def _wheelable(self, canvas):
        """Hover-scoped mousewheel scroll for a scrollable canvas. Binds
        <MouseWheel> only while the pointer is over this canvas (via
        Enter/Leave), so multiple scrollable tabs each scroll under the
        cursor instead of one global bind_all capturing every wheel event
        for a single canvas — the earlier bug where only the metabolizer
        column scrolled and glance/held/deepdive were stuck."""
        canvas.bind("<Enter>", lambda e: canvas.bind_all(
            "<MouseWheel>",
            lambda ev: canvas.yview_scroll(-1 * (ev.delta // 120), "units")))
        canvas.bind("<Leave>", lambda e: canvas.unbind_all("<MouseWheel>"))

    def _badge(self, parent, text, fg, bg):
        tk.Label(parent, text=f" {text} ", font=("Courier New", 7, "bold"),
                 fg=fg, bg=bg, highlightthickness=1, highlightbackground=BDR
                 ).pack(side="left", padx=(0, 5))

    def _verb_slider(self, parent, sid):
        """Step 6 — the verbs as one segmented track (the DSS widget
        chassis's slider pattern, brought into the native surface, same
        law as the room's dashed bands: reuse, not reinvention). Three
        segments sharing one border, no gaps between them; click a
        segment and it fires _mark_async immediately — one click, no
        typing, no blanket approve. Purely a presentation change: the
        write path underneath (core.record_mark via _mark_async) is the
        one cross/hold/compost has always used."""
        track = tk.Frame(parent, highlightthickness=1, highlightbackground=BDR)
        track.pack(side="left")
        segs = (("cross", GRN, GRN_BG), ("hold", YEL, YEL_BG), ("compost", RED, RED_BG))
        for i, (v, fg, bg) in enumerate(segs):
            lbl = tk.Label(track, text=v, font=MONO_B, fg=fg, bg=bg, padx=14, pady=4,
                          cursor="hand2")
            lbl.grid(row=0, column=i, sticky="nsew",
                     padx=(0, 1) if i < len(segs) - 1 else 0)
            lbl.bind("<Button-1>", lambda e, s=sid, vv=v: self._mark_async(s, vv))

    def _card(self, o):
        c = tk.Frame(self.cards, bg=SF, highlightthickness=1,
                     highlightbackground=BDR)
        c.pack(fill="x", pady=5, padx=2)
        tk.Label(c, text=o["pile"], font=MONO_B, fg=GB, bg=SF, anchor="w"
                 ).pack(fill="x", padx=10, pady=(8, 0))
        summary = (o.get("object") or {}).get("summary", "")
        if summary:
            tk.Label(c, text=summary, font=MONO, fg=GD, bg=SF, anchor="w",
                     wraplength=620, justify="left").pack(fill="x", padx=10)
        row = tk.Frame(c, bg=SF)
        row.pack(fill="x", padx=10, pady=4)
        eng = (o.get("run") or {}).get("engine", "?")
        self._badge(row, f"engine: {eng}",
                    RED if eng.startswith("stub") else GRN,
                    RED_BG if eng.startswith("stub") else GRN_BG)
        if o.get("raw_text_inside"):
            self._badge(row, "RAW TEXT INSIDE · LOCAL ONLY", YEL, YEL_BG)
        lint = o.get("lint")
        if lint:
            self._badge(row, f"lint: {lint['folds']} fold · {lint['holds']} hold · "
                             f"{lint['passes']} pass", GD, SF2)
        err = (o.get("run") or {}).get("error")
        if err:
            tk.Label(c, text=f"run error: {err}", font=MONO, fg=RED, bg=RED_BG,
                     anchor="w", wraplength=620, justify="left"
                     ).pack(fill="x", padx=10, pady=2)
        items = (o.get("object") or {}).get("items", [])
        for it in items[:5]:
            line = f"• {it.get('item','')[:90]}"
            li = it.get("lint")
            if li and li.get("read"):
                line += f"   [{li['read']}"
                if li.get("nearest"):
                    line += f" · {li['nearest']}"
                line += "]"
            tk.Label(c, text=line, font=("Courier New", 8), fg=G, bg=SF,
                     anchor="w", wraplength=640, justify="left"
                     ).pack(fill="x", padx=16)
            tk.Label(c, text=f"   {it.get('disposition')} → {it.get('target')}",
                     font=("Courier New", 7), fg=GF, bg=SF, anchor="w"
                     ).pack(fill="x", padx=16)
        if len(items) > 5:
            tk.Label(c, text=f"… and {len(items)-5} more items", font=("Courier New", 8),
                     fg=GF, bg=SF, anchor="w").pack(fill="x", padx=16)

        sid = o["id"]
        foot = tk.Frame(c, bg=SF)
        foot.pack(fill="x", padx=10, pady=(4, 8))
        if sid in self.busy:
            tk.Label(foot, text="working — writing the mark…", font=MONO,
                     fg=YEL, bg=YEL_BG).pack(side="left")
        elif o.get("crossed") and not o.get("uncrossed"):
            tk.Label(foot, text=f"CANON · patterns\\{o['crossed']['pattern_file']}",
                     font=MONO_B, fg=GRN, bg=GRN_BG).pack(side="left")
            tk.Button(foot, text="↺ un-mark", font=MONO, fg=RED, bg="white",
                      relief="flat", highlightthickness=1, highlightbackground=BDR,
                      command=lambda s=sid: self._unmark_async(s, crossed=True)
                      ).pack(side="left", padx=8)
        elif (o.get("mark") or {}).get("verdict"):
            # the mark as a toggle — Kevin's mark 2026-07-19: "my mark should be
            # easily reversible." One click reverses it (recorded, never silent)
            # and the three verbs come back on the next refresh.
            m = o["mark"]
            tk.Label(foot, text=f"marked: {m['verdict']} · {m['at']}", font=MONO_B,
                     fg=YEL if m["verdict"] == "hold" else RED, bg=SF
                     ).pack(side="left")
            tk.Button(foot, text="↺ un-mark", font=MONO, fg=GD, bg="white",
                      relief="flat", highlightthickness=1, highlightbackground=BDR,
                      command=lambda s=sid: self._unmark_async(s)
                      ).pack(side="left", padx=8)
        elif not err:
            self._verb_slider(foot, sid)


def main():
    handle = _acquire_single_instance()
    if handle is None:
        # already running somewhere — say so fast and get out, instead of
        # piling another heavy process on top of the one that's opening.
        root = tk.Tk()
        root.withdraw()
        messagebox.showinfo(
            "NESI is already open",
            "NESI takes a few seconds to open — check your taskbar before "
            "clicking again. This click did nothing else.")
        root.destroy()
        return
    root = tk.Tk()
    NesiApp(root)

    def on_close():
        # continuity's close write — silent, never traps the window open
        try:
            continuity.close_snapshot(core.state())
        except Exception:
            pass
        root.destroy()
    root.protocol("WM_DELETE_WINDOW", on_close)
    root.mainloop()


if __name__ == "__main__":
    main()
