# UCA Kit (Universal Coding Agent Kit) — Shared Agent Instructions

Import the common engineering instructions and mentoring guidance:

@./AGENTS.md

Use only task-relevant skills from `.agents/skills/<name>/SKILL.md`; read a workflow only when it matches the task. Gemini CLI supports the `.agents/skills/` workspace alias; use `/skills list` to verify discovery. If your installed version does not discover this location, use the documented native `.gemini/skills/` directory or run `python scripts/sync_skills.py --target gemini --project-root .`.

Keep platform-specific agent definitions optional. Do not assume OpenCode subagents or commands exist in Gemini CLI. When an expected native feature is missing, follow `HOST-CAPABILITY-FALLBACK.md`: verify Gemini's current supported path, read only the needed `SKILL.md` if skill discovery fails, and perform specialist work sequentially if delegation is unavailable. Report unknown usage metadata honestly.
