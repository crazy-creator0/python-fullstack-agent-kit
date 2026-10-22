# Shared Universal Coding Agent Kit

Follow the root `AGENTS.md` for shared coding rules and read `.agents/AGENTS.md` for the mentoring and engineering guidance before substantial changes.

For a coding task, inspect the project and use only relevant `.agents/skills/<name>/SKILL.md` files. If a skill isn't loaded automatically by the active agent, read it directly or use the host's documented skill mechanism. Do not assume OpenCode-specific commands or subagents are available in Junie.

Keep changes focused, avoid circular imports and unnecessary abstractions, protect secrets, and report only checks actually performed.
