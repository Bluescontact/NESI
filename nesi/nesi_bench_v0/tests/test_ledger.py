"""The dry-run gate ledger (v1 Sec 12): appends real events, fails loud on a
real write failure, never invents a timestamp or a network call."""

import sys
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from nesi_bench_v0.ledger import record, read_all, LedgerWriteError


def test_record_appends_and_read_all_returns_it():
    tmp = Path(tempfile.mkdtemp()) / "dry_run.jsonl"
    entry = record("cross", {"object": "obj-001", "region": "landing"}, path=tmp)
    assert entry["event"] == "cross"
    entries = read_all(path=tmp)
    assert len(entries) == 1
    assert entries[0]["detail"]["object"] == "obj-001"


def test_read_all_on_missing_ledger_is_empty_not_an_error():
    tmp = Path(tempfile.mkdtemp()) / "never_written.jsonl"
    assert read_all(path=tmp) == []


def test_multiple_records_append_in_order():
    tmp = Path(tempfile.mkdtemp()) / "dry_run.jsonl"
    record("hold", {"object": "obj-002"}, path=tmp)
    record("compost", {"object": "obj-003"}, path=tmp)
    entries = read_all(path=tmp)
    assert [e["event"] for e in entries] == ["hold", "compost"]


def test_write_failure_raises_loudly_never_swallowed():
    # a path whose parent cannot be created (a file where a directory is
    # expected) forces a real OSError -- confirms the failure surfaces as
    # LedgerWriteError rather than vanishing silently.
    tmp_dir = Path(tempfile.mkdtemp())
    blocker = tmp_dir / "blocker_file"
    blocker.write_text("not a directory", encoding="utf-8")
    bad_path = blocker / "dry_run.jsonl"  # parent is a file, not a dir
    try:
        record("cross", {}, path=bad_path)
        raised = False
    except LedgerWriteError:
        raised = True
    assert raised


def test_no_timestamp_invented_and_no_clock_or_network_primitive():
    # module-level source check, same discipline as test_foreclosures.py's
    # static/structural proxies -- no live-DOM harness needed for pure
    # Python, but the "no invented provenance" claim is worth checking
    # directly against the source rather than just the docstring's promise.
    src = Path(__file__).resolve().parents[1].joinpath("ledger.py").read_text(encoding="utf-8")
    for forbidden in ("datetime.now()", "time.time()", "requests.", "urllib.", "socket."):
        assert forbidden not in src, f"ledger.py should carry no clock/network primitive: {forbidden!r}"


if __name__ == "__main__":
    test_record_appends_and_read_all_returns_it()
    test_read_all_on_missing_ledger_is_empty_not_an_error()
    test_multiple_records_append_in_order()
    test_write_failure_raises_loudly_never_swallowed()
    test_no_timestamp_invented_and_no_clock_or_network_primitive()
    print("ledger clean: appends real events, fails loud, invents nothing")
