# UCA Kit (Universal Coding Agent Kit) — GitHub Copilot Instructions

Use the repository's root `AGENTS.md` and `.agents/AGENTS.md` as the common engineering guidance. If their contents are not already present in context, open them before making substantial code changes.

For coding tasks, choose only relevant skills from `.agents/skills/<name>/SKILL.md`. Copilot supports project skills in `.agents/skills/` in supported surfaces; confirm skill discovery in the specific Copilot CLI or IDE version being used. If a selected skill is not listed/loaded, read its file directly. Do not assume OpenCode-specific agents or commands are available in Copilot.

Inspect before editing, avoid circular imports and unnecessary abstractions, protect secrets, run relevant checks when available, and report only verification actually performed.
