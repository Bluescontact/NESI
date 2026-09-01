#!/usr/bin/env python3
"""leaf_audit.py -- walk every terminal node (leaf) of the held-refusal page and
FAIL if any leaf contains an ask-affordance. This is the section 6.2 walk-test
made executable: the no-ask discipline is enforced by the build, not by vigilance.

A leaf is any element marked class="leaf" (its data-leaf attribute names it).
A leaf must terminate in completion, never in an ask. So a leaf FAILS if it
contains any interactive control (form, input, textarea, select, button, link),
a mailto: affordance, or ask-language (subscribe / share / support / thank /
follow / reply / come back / ...). Navigation controls that live OUTSIDE leaves
(the single "enter" door, branch buttons, the "back" control) are not leaves and
are not audited -- they carry no weight and ask nothing.

Standard library only. Usage:  python leaf_audit.py [index.html]
Exit 0 = every leaf terminates in completion, never an ask.
Exit 1 = at least one leaf solicits (named), or a page-wide ask-affordance exists.
"""
import sys
import re
from html.parser import HTMLParser

# interactive controls that create a way to act back / be acted upon
ASK_TAGS = {"form", "input", "textarea", "select", "button", "a"}

# soft asks, gratitude handles, changed-standing solicitations (section 8)
ASK_WORDS = [
    "subscribe", "sign up", "signup", "share this", "share it", "donate",
    "support the work", "support this", "support us", "follow", "get in touch",
    "contact us", "reply", "comment", "leave a", "tell me what you think",
    "let me know", "thank", "buy", "purchase", "pledge", "join", "register",
    "submit", "give back", "return the favor", "reach out", "stay in touch",
    "come back", "sign in", "log in", "login", "upvote", "like and", "rate this",
]
ASK_PATTERNS = [(re.compile(r"\b" + re.escape(w) + r"\b"), w) for w in ASK_WORDS]


def has_class_leaf(attrs):
    for k, v in attrs:
        if k == "class" and v and "leaf" in v.split():
            return True
    return False


def leaf_name(attrs):
    for k, v in attrs:
        if k == "data-leaf":
            return v
    return "(unnamed leaf)"


def is_mailto(attrs):
    for k, v in attrs:
        if k == "href" and v and v.strip().lower().startswith("mailto:"):
            return True
    return False


class LeafAudit(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []            # active leaf frames: {name, depth, hits}
        self.failures = []         # (name, sorted hits)
        self.leaf_count = 0
        self.mailto_global = False
        self.form_global = False

    def handle_starttag(self, tag, attrs):
        if tag == "form":
            self.form_global = True
        if is_mailto(attrs):
            self.mailto_global = True

        if has_class_leaf(attrs):
            self.leaf_count += 1
            self.stack.append({"name": leaf_name(attrs), "depth": 1, "hits": []})
            return

        if self.stack:
            frame = self.stack[-1]
            frame["depth"] += 1
            if tag in ASK_TAGS:
                frame["hits"].append("interactive <%s> element" % tag)
            if is_mailto(attrs):
                frame["hits"].append("mailto: link")

    def handle_startendtag(self, tag, attrs):
        # self-closing tag (e.g. <input/>): count it, then immediately unwind
        self.handle_starttag(tag, attrs)
        if self.stack and not has_class_leaf(attrs):
            self.stack[-1]["depth"] -= 1

    def handle_endtag(self, tag):
        if self.stack:
            frame = self.stack[-1]
            frame["depth"] -= 1
            if frame["depth"] <= 0:
                closed = self.stack.pop()
                if closed["hits"]:
                    self.failures.append((closed["name"], sorted(set(closed["hits"]))))

    def handle_data(self, data):
        if self.stack:
            low = data.lower()
            for pat, word in ASK_PATTERNS:
                if pat.search(low):
                    self.stack[-1]["hits"].append('ask-language: "%s"' % word)


def main():
    path = sys.argv[1] if len(sys.argv) > 1 else "index.html"
    try:
        with open(path, encoding="utf-8") as f:
            html = f.read()
    except OSError as e:
        print("leaf-audit: cannot read %s (%s)" % (path, e))
        sys.exit(2)

    p = LeafAudit()
    p.feed(html)

    problems = []
    if p.leaf_count == 0:
        problems.append("no leaves found (expected elements with class=\"leaf\")")
    if p.form_global:
        problems.append("a <form> exists on the page -- a form is an ask")
    if p.mailto_global:
        problems.append("a mailto: affordance exists on the page")
    for name, hits in p.failures:
        problems.append('leaf "%s" solicits -- %s' % (name, "; ".join(hits)))

    print("leaf-audit  -  %s" % path)
    print("leaves walked: %d" % p.leaf_count)
    if problems:
        print("RESULT: FAIL")
        for pr in problems:
            print("  x " + pr)
        print("\nOne soliciting leaf re-prices the whole tree as a funnel. Remove the ask.")
        sys.exit(1)
    print("RESULT: PASS -- every leaf terminates in completion, never an ask.")
    sys.exit(0)


if __name__ == "__main__":
    main()
