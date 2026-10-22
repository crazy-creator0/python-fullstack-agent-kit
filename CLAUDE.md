# UCA Kit (Universal Coding Agent Kit) — Shared Agent Instructions

The shared engineering rules and mentoring guidance are defined in these files. Keep this adapter small so the project does not grow conflicting copies of the same rules.

@AGENTS.md

For task-specific guidance, load only the relevant `.agents/skills/<name>/SKILL.md` and matching workflow. Do not load all skills. Claude Code's native project skill directory is `.claude/skills/`; use `python scripts/sync_skills.py --target claude --project-root .` to copy the shared skill set here when this repository is the destination project.

OpenCode-specific subagent definitions under `.opencode/agents/` are not Claude Code subagents. Do not assume platform-specific commands, permissions, or tool integrations transfer between coding agents. If a Claude-native agent/skill/hook is missing, follow `HOST-CAPABILITY-FALLBACK.md`: use documented Claude Code mechanisms where available, otherwise read only relevant skills directly and perform specialist work sequentially. Do not claim usage metering unless a tested host integration exposes the needed counters.
