# Universal Coding Agent Kit — JetBrains AI Assistant

Before making substantial changes, read the root `AGENTS.md` and `.agents/AGENTS.md`. Treat them as the shared engineering guidance. Inspect the actual project structure and conventions before editing.

For coding tasks, select only relevant skills from `.agents/skills/<name>/SKILL.md`. If this assistant or selected agent supports the Agent Skills standard, use its documented discovery path; otherwise open the specific SKILL.md file as context. Do not assume all assistants in this IDE support identical skill or subagent behavior.

Prefer focused changes, avoid unnecessary dependencies and circular imports, protect secrets, and report only checks actually performed. Do not overwrite existing project rules without reviewing and merging them.
