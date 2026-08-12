---
name: reference-claude-login-loop-fix
description: "The Claude Code /login loop (sign in → asks again) is caused by the persistent ANTHROPIC_BASE_URL user env var pointing at the local router; clear it and use a NEW terminal."
metadata:
  type: reference
---

**Symptom:** open a terminal, run `claude`, `/login` opens a browser, sign in — and it just asks to sign in again. A loop. Recurred across weeks (seen 2026-07-17 and 2026-07-23).

**Root cause (diagnosed 2026-07-23):** a **persistent Windows USER environment variable** `ANTHROPIC_BASE_URL = http://localhost:8787`, set by `tools/router/wire_claude_code.bat` (`setx`, persists across reboots) during the old hybrid-router experiment. It points every fresh terminal's `claude` at the local router instead of `https://api.anthropic.com`, so the OAuth handshake never reaches Anthropic and no token is ever persisted (confirmed: no `~/.claude/.credentials.json`, no credential-manager entry, no token in `~/.claude.json` — only desktop-app-written `oauthAccount` profile metadata). This session's own `claude` works because the harness overrides the base URL in-process; Kevin's fresh terminals inherit the persistent localhost value.

**Fix:**
1. Clear it: `powershell [Environment]::SetEnvironmentVariable('ANTHROPIC_BASE_URL',$null,'User')` (or `setx ANTHROPIC_BASE_URL ""`). Done 2026-07-23.
2. **Open a NEW terminal** (env changes only reach new processes).
3. `claude` → `/login`. If the browser redirect loops, use the paste-code flow: copy the code from the browser and paste it into the waiting terminal.

**To restore the router later (if ever wanted):** `setx ANTHROPIC_BASE_URL "http://localhost:8787"`. NESI's engine needs real Anthropic auth, so leave it cleared for v1.0. Related: [[project_nesi]], [[project_autonomous_tools]] (the router).
