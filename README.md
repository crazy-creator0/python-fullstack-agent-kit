# Python Full-Stack Agent Kit for OpenCode

A beginner-friendly, production-minded OpenCode agent kit for Python full-stack development. It combines COSTAR-style mentorship, just-in-time skill discovery, security and testing practices, Cloudflare operations guidance, anti-hallucination checks, and UI quality guidance with Impeccable.

## What's included

- `AGENTS.md` — root instructions: read the detailed agent guide first, inspect the codebase, verify claims, avoid unnecessary abstractions, and prevent circular imports.
- `.agents/AGENTS.md` — mentoring approach and engineering rules.
- `.agents/skills/` — focused skills for Python, frontend, API/backend, databases, security, Cloudflare, debugging, testing/review, anti-slop, anti-hallucination, and adaptive skill routing.
- `.agents/workflows/` — feature development, new project, bug investigation, and production deployment workflows.
- `.opencode/agents/` — planner, reviewer, and verifier subagents.
- `OPENCODE-SETUP.md` — setup and suggested workflow.
- `IMPECCABLE-SETUP.md` — optional frontend design quality checks.
- `ADAPTIVE-SKILLS.md` — how just-in-time skill selection works.

## Install / use

1. Download the repository ZIP or clone this repo.
2. Copy the contents into the root of your project. Keep `AGENTS.md`, `.agents/`, and `.opencode/` at the project root.
3. Start OpenCode in that project. The root `AGENTS.md` tells the agent to immediately read `.agents/AGENTS.md`.
4. For a coding task, the agent should inspect the project and load only relevant skills from `.agents/skills/`.
5. Use `@planner`, `@reviewer`, and `@verifier` when their specialist roles are useful; they are not assumed to run automatically.
6. For UI work, follow `IMPECCABLE-SETUP.md` if you choose to install Impeccable.

## Design principles

- Mentor the developer instead of encouraging blind copy-paste.
- Inspect before editing; make the smallest coherent change.
- Never claim tests, documentation checks, or deployments happened unless verified.
- Load skills just in time instead of applying every skill to every task.
- Ask before adding or overwriting persistent third-party skills.
- Avoid unnecessary dependencies, circular imports, generic boilerplate, fake tests, and unrelated refactors.

## Important note

This is an instruction and skill pack, not a guarantee of correct generated code. Review the output, run the repository's actual checks, and validate behavior in your environment. The pack has been structurally inspected as an archive; runtime behavior in OpenCode has not been independently validated here.

## Download

- [Download ZIP from GitHub](https://github.com/crazy-creator0/python-fullstack-agent-kit/archive/refs/heads/main.zip)
- [Browse files](https://github.com/crazy-creator0/python-fullstack-agent-kit)
