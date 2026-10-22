# UCA Kit (Universal Coding Agent Kit) — Agent Layout

This folder contains platform-neutral mentoring instructions, reusable Agent Skills, and engineering workflows used by UCA Kit.

## Shared source of truth
- `.agents/AGENTS.md` — mentoring style, general full-stack engineering, project-tracking boundaries, and safe workflows.
- `.agents/skills/<skill-name>/SKILL.md` — focused reusable skills using the Agent Skills format.
- `.agents/workflows/` — workflows that can be opened manually or adapted into native prompts, commands, or subagents.
- `AGENT-SKILL-MAP.md` — role-to-skill/tool routing, specialist activation and context-budget guidance.
- `USAGE-PRIVACY.md` and `scripts/uca-usage.cjs` — local aggregate usage ledger and budget guard, with explicit host-integration limitations.

## Skill areas
- Python engineering
- Frontend engineering and design-taste discovery
- Backend/API engineering
- Database engineering
- Application security
- Cloudflare operations
- Debugging
- Testing and code review
- Anti-slop engineering and anti-hallucination
- Progressive skill-gap routing

## Portability
Multiple coding agents support the `.agents/skills/` convention, but discovery and invocation vary by product and version. If a host does not discover a skill automatically, read its `SKILL.md` directly or follow `PLATFORM-SETUP.md` to use the host's native location. Avoid keeping conflicting copies without a clear sync process.

## Rules of use
Inspect the real project first, choose only relevant guidance, verify claims with actual output, protect existing behavior, and ask before adding third-party dependencies or overwriting persistent files.
