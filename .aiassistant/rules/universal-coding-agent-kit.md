# UCA Kit (Universal Coding Agent Kit) — JetBrains AI Assistant

Before substantial changes, read root `AGENTS.md` as the canonical shared guidance. Use `.agents/AGENTS.md` only if the root file is unavailable. Inspect the actual project structure and conventions before editing.

For coding tasks, select only relevant skills from `.agents/skills/<name>/SKILL.md`. If this assistant or selected agent supports the Agent Skills standard, use its documented discovery path; otherwise open the specific SKILL.md file as context. Do not assume all assistants in this IDE support identical skill or subagent behavior. Consult `HOST-CAPABILITY-FALLBACK.md` when native instructions, skills, subagents or usage hooks are missing: use the selected agent's documented mechanisms, read only relevant skills directly, and perform specialist work sequentially where needed. Never claim automatic usage metering without verified support.

Prefer focused changes, avoid unnecessary dependencies and circular imports, protect secrets, and report only checks actually performed. Do not overwrite existing project rules without reviewing and merging them.
