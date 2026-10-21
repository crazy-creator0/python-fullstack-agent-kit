# Agent Kit Layout

This folder contains platform-neutral mentoring instructions, Agent Skills, and reusable workflows.

## Shared source of truth
- `.agents/AGENTS.md` — mentoring style and engineering principles.
- `.agents/skills/<skill-name>/SKILL.md` — focused reusable skills using the Agent Skills format.
- `.agents/workflows/` — workflow documents that can be opened manually or adapted into native prompts, commands, or subagents.

## Skill areas
- Python engineering
- Backend/API engineering
- Frontend engineering
- Database engineering
- Application security
- Cloudflare operations
- Debugging
- Testing and code review
- Anti-AI-slop engineering
- Anti-hallucination
- Progressive skill-gap routing

## Portability
Multiple coding agents support the `.agents/skills/` convention, but support and invocation vary by product, feature, and version. If a host does not discover a skill automatically, read that skill's `SKILL.md` directly or follow `PLATFORM-SETUP.md` to use the host's native location. Avoid keeping conflicting copies of shared skills without a clear sync process.

## Rules of use
Inspect the project first, select only relevant guidance, verify claims with actual output, and ask before installing or overwriting third-party or persistent skill files.
