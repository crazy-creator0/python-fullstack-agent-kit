---
trigger: always_on
description: Shared UCA Kit coding-agent constraints and safe implementation workflow
---

Use root `AGENTS.md` as the single canonical policy; use `.agents/AGENTS.md` only if the root file is unavailable. Inspect the actual repository before making changes.

Choose only relevant skills from `.agents/skills/<name>/SKILL.md`. If a skill is not automatically discovered by this host/version, read it directly or use the native skills folder documented for your host. Prefer focused changes, avoid unnecessary dependencies and circular imports, protect secrets, and report only checks actually run. Do not assume OpenCode-specific commands or subagents are available. Consult `HOST-CAPABILITY-FALLBACK.md` only for missing or uncertain capabilities: verify the current host/version's documented skill/agent support, read only relevant skill files directly if needed, and keep specialist work sequential if real delegation is unavailable. Do not claim usage metering unless supported hooks expose real data.
