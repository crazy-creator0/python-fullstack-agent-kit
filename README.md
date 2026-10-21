# Python Full-Stack Agent Kit

A beginner-friendly, production-minded AI coding-agent kit that is not tied to one IDE. Use it with compatible coding assistants in editors, terminals, and hosted coding environments. Shared rules and skills are plain Markdown; lightweight adapter files help specific platforms discover them.

## Start here

**[Download ZIP](https://github.com/crazy-creator0/python-fullstack-agent-kit/archive/refs/heads/main.zip)** · **[Browse repository](https://github.com/crazy-creator0/python-fullstack-agent-kit)** · **[Platform setup guide](PLATFORM-SETUP.md)**

1. Download or clone this repository.
2. Choose your coding assistant in PLATFORM-SETUP.md.
3. Copy or merge the relevant files into your project root. Do not overwrite existing instruction files blindly; merge the guidance if your project already has its own rules.
4. Open the project in your IDE/agent and confirm that its instruction file and skills are actually being loaded.
5. Ask it to inspect the project first, then work on one small, testable change.

## What is included

- AGENTS.md — common engineering rules and task workflow.
- .agents/AGENTS.md — mentoring style and full-stack guidance.
- .agents/skills/ — portable SKILL.md skills for Python, frontend, backend APIs, databases, security, Cloudflare, debugging, testing/review, anti-slop, anti-hallucination, and adaptive skill routing.
- .agents/workflows/ — reusable workflows for projects, features, debugging, and deployment.
- CLAUDE.md, GEMINI.md, .github/copilot-instructions.md, .cursor/rules/, .windsurf/rules/ — small platform adapters that point back to the shared rules.
- .opencode/agents/ — optional OpenCode-specific planner, reviewer, and verifier subagents.
- PLATFORM-SETUP.md — platform guidance and limitations.
- IMPECCABLE-SETUP.md — optional frontend design quality checks.
- OPENCODE-SETUP.md — extra setup notes for OpenCode users.

## Core principles

- Teach the developer to understand decisions rather than blindly copy code.
- Inspect before editing; choose the smallest coherent change.
- Load only relevant skills where the host supports them.
- Keep platform-specific features optional; core instructions and workflows remain plain Markdown.
- Avoid unnecessary dependencies, abstractions, circular imports, boilerplate, fake tests, and unrelated refactors.
- Never claim a test, documentation check, build, or deployment succeeded unless it was actually verified.

## Compatibility note

This kit aims for broad compatibility; it cannot guarantee identical behavior in every IDE, model, version, or hosted coding service. Instruction and skill discovery differs by host. Use the platform-specific setup notes and verify discovery in your own environment. Specialist subagents under .opencode/agents/ run only on compatible OpenCode setups; other platforms can use the shared workflow files or their own subagent formats.

## Download

- [Download the current main-branch ZIP](https://github.com/crazy-creator0/python-fullstack-agent-kit/archive/refs/heads/main.zip)
- [Open platform setup instructions](PLATFORM-SETUP.md)
- [Browse all files](https://github.com/crazy-creator0/python-fullstack-agent-kit)
