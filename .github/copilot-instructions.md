# UCA Kit (Universal Coding Agent Kit) — GitHub Copilot Instructions

Use root `AGENTS.md` as the canonical engineering guidance. Use `.agents/AGENTS.md` only as a compatibility fallback if the root file is unavailable.

For coding tasks, choose only relevant skills from `.agents/skills/<name>/SKILL.md`. Copilot supports project skills in `.agents/skills/` in supported surfaces; confirm skill discovery in the specific Copilot CLI or IDE version being used. If a selected skill is not listed/loaded, read its file directly. Do not assume OpenCode-specific agents or commands are available in Copilot. Consult `HOST-CAPABILITY-FALLBACK.md` only when a feature is missing or uncertain: use the documented Copilot-native instructions/skills/tools if available, otherwise read only the relevant `SKILL.md` directly and perform specialist roles sequentially. Do not claim the OpenCode plugin, Cursor subagents, usage hooks, or exact metering are supported by the current Copilot client unless verified.

Inspect before editing, avoid circular imports and unnecessary abstractions, protect secrets, run relevant checks when available, and report only verification actually performed.
