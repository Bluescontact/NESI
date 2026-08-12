---
name: feedback-data-discipline
description: "Widget stays full; data gate fires only on off-machine calls (web/agents), not HTML size"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 0ae6463e-d1fa-458a-a3fa-89426a39468d
---

Widget format stays full — HTML size is not the data cost. Stripping the widget strips Kevin's comprehension and consent while saving almost nothing.

**Why:** The real data cost is API context length and off-machine calls (web search, multi-agent workflows, WebFetch). A full widget is ~50-80 KB — noise compared to a single web research swarm (~5-15 MB). Kevin needs the full widget to see, understand, and decide with informed consent.

**How to apply:** Gate fires before any off-machine call — web search, WebFetch, multi-agent Workflow, deep-research. Show the manifest, stop, wait for consent. Everything local runs free without a gate: file reads/writes, Miro MCP, gate.py commands, local edits. This rule holds until Kevin explicitly changes it.
