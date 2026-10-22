---
trigger: always_on
description: UCA Kit full-stack engineering constraints and safe implementation workflow
---

Use the common engineering rules in root `AGENTS.md` and the mentoring guidance in `.agents/AGENTS.md` as the source of truth. Inspect the actual repository before making changes.

Choose only relevant skills from `.agents/skills/<name>/SKILL.md`. If a skill is not automatically discovered by this host/version, read it directly or use the native skills folder documented for your host. Prefer focused changes, avoid unnecessary dependencies and circular imports, protect secrets, and report only checks actually run. Do not assume OpenCode-specific commands or subagents are available.
