"""Stage 2 gate: the graph reads the feed's declared links faithfully and
invents nothing -- no edge exists that the fixture didn't declare, and a
mutually-declared coherent-tension pair collapses to one Edge, not two."""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from nesi_bench_v0.feed import load_mock_feed
from nesi_bench_v0.graph import edges_from_objects, is_strut, edges_touching, other_end, STRUT_TYPE


def test_mutually_declared_strut_collapses_to_one_edge():
    objects = load_mock_feed()
    edges = edges_from_objects(objects)
    strut_edges = [e for e in edges if e.type == STRUT_TYPE]
    assert len(strut_edges) == 1, "obj-003/obj-004 both declare the same tension; expected exactly one edge"
    assert is_strut(strut_edges[0])


def test_proposed_edge_from_fixture_present():
    objects = load_mock_feed()
    edges = edges_from_objects(objects)
    proposed = [e for e in edges if e.state == "proposed"]
    assert len(proposed) == 1
    assert proposed[0].type == "derived-from"


def test_edges_touching_and_other_end():
    objects = load_mock_feed()
    edges = edges_from_objects(objects)
    touching = edges_touching(edges, "obj-003")
    assert len(touching) == 1
    assert other_end(touching[0], "obj-003") == "obj-004"


def test_no_edge_invented_beyond_the_fixture():
    objects = load_mock_feed()
    edges = edges_from_objects(objects)
    declared_pairs = set()
    for obj in objects:
        for link in obj.links:
            declared_pairs.add(tuple(sorted((obj.id, link.target))) + (link.type,))
    found_pairs = {tuple(sorted((e.a, e.b))) + (e.type,) for e in edges}
    assert found_pairs == declared_pairs


if __name__ == "__main__":
    test_mutually_declared_strut_collapses_to_one_edge()
    test_proposed_edge_from_fixture_present()
    test_edges_touching_and_other_end()
    test_no_edge_invented_beyond_the_fixture()
    print("graph clean: edges match the fixture exactly, strut deduped, no invented relation")
