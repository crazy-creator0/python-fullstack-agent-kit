# Universal Coding Agent Kit — Shared Agent Instructions

Import the common engineering instructions and mentoring guidance:

@./AGENTS.md

@./.agents/AGENTS.md

Use only task-relevant skills from `.agents/skills/<name>/SKILL.md`. Gemini CLI supports the `.agents/skills/` workspace alias; use `/skills list` to verify discovery. If your installed version does not discover this location, use the documented native `.gemini/skills/` directory or run `python scripts/sync_skills.py --target gemini --project-root .`.

Keep platform-specific agent definitions optional. Do not assume OpenCode subagents or commands exist in Gemini CLI.
