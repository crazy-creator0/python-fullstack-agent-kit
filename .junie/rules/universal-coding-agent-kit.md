# Shared UCA Kit (Universal Coding Agent Kit)

Follow root `AGENTS.md` as the canonical engineering and mentoring policy. Use `.agents/AGENTS.md` only if the root file is unavailable.

For a coding task, inspect the project and use only relevant `.agents/skills/<name>/SKILL.md` files. If a skill isn't loaded automatically by the active agent, read it directly or use the host's documented skill mechanism. Do not assume OpenCode-specific commands or subagents are available in Junie. Consult `HOST-CAPABILITY-FALLBACK.md` when native instructions, skills, delegation or usage hooks are missing: read only relevant skills directly and perform specialist work sequentially when separate agents are unavailable. Never claim automatic metering without verified host support.

Keep changes focused, avoid circular imports and unnecessary abstractions, protect secrets, and report only checks actually performed.
