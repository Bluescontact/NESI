---
name: automate-state-view-after-mark
description: "After every membrane mark sequence closes, run update_state_view.py automatically — never ask Kevin to do it manually"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: fc957513-21d4-4de7-826e-c360d9c836f7
---

At the end of every membrane mark sequence, run this before rendering the completion widget:

```
python "C:\Users\KMEAR\OneDrive\Desktop\DSS content\tools\launcher\update_state_view.py"
```

**Why:** Kevin flagged manual state_view updates as cost-shifting. The script is idempotent — safe to run always.

**How to apply:** In the membrane mark completion step (after final candidate is marked), call the script via PowerShell before rendering the summary widget. Also call it after any session that marks files CANON, COMPOST, or changes pipeline counts.

**What the script updates:** date (today), DEVELOPED count, PROMOTE-READY count — from _INTAKE/developed/ actual file statuses.

**What it does NOT touch:** CANON count (global total across all sessions — must be set manually when patterns are written into patterns/ library).
