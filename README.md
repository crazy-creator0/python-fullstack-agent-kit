# Python Full-Stack Agent Kit

A beginner-friendly, production-minded AI coding-agent kit that is not tied to one IDE. Use it with compatible coding assistants in editors, terminals, and hosted coding environments. Shared rules and skills are plain Markdown; lightweight adapters and a native-skill sync utility help platforms discover the same guidance.

## Start here

**[Download ZIP](https://github.com/crazy-creator0/python-fullstack-agent-kit/archive/refs/heads/main.zip)** · **[Browse repository](https://github.com/crazy-creator0/python-fullstack-agent-kit)** · **[Platform setup guide](PLATFORM-SETUP.md)** · **[Unknown IDE? Start here](GENERIC-IDE-SETUP.md)**

1. Download or clone this repository.
2. Choose your coding assistant in `PLATFORM-SETUP.md`.
3. Copy or merge the relevant files into your project root. Do not overwrite existing instruction files blindly; merge the guidance if your project already has its own rules.
4. Open the project in your IDE/agent and confirm that its instruction file and skills are actually being loaded.
5. Ask it to inspect the project first, then work on one small, testable change.

## One-command installer (npm)

The repository now includes an npm CLI package named `create-python-fullstack-agent-kit`. **It is not yet available from the public npm registry**; until it is published, use the ZIP/clone instructions above. Once the owner publishes it, users will be able to run:

```bash
npx create-python-fullstack-agent-kit init .
```

The CLI prompts for an IDE profile in interactive terminals, supports `--platform <name>` for automation, and offers a generic fallback for unlisted IDEs. It preserves existing files by default; `--force` explicitly allows overwriting. Preview changes first with `--dry-run`.

Examples:

```bash
npx create-python-fullstack-agent-kit init . --platform cursor --dry-run
npx create-python-fullstack-agent-kit init ../my-app --platform claude
npx create-python-fullstack-agent-kit init . --platform generic
```

See [npm publishing guide](https://github.com/crazy-creator0/python-fullstack-agent-kit/blob/main/PUBLISHING.md) for the steps needed to check the npm name and publish it.

## What is included

- `AGENTS.md` — common engineering rules and task workflow.
- `.agents/AGENTS.md` — mentoring style and full-stack guidance.
- `.agents/skills/` — 11 portable `SKILL.md` skills for Python, frontend, backend APIs, databases, security, Cloudflare, debugging, testing/review, anti-slop, anti-hallucination, and adaptive skill routing.
- `.agents/workflows/` — reusable workflows for projects, features, debugging, and deployment.
- `CLAUDE.md`, `GEMINI.md`, `.github/copilot-instructions.md`, `.cursor/rules/`, `.devin/rules/`, `.windsurf/rules/`, `.junie/rules/`, `.aiassistant/rules/` — platform adapters where relevant.
- `scripts/sync_skills.py` — optional Python utility to sync canonical skills to host-native folders.
- `package.json` and `bin/cli.cjs` — dependency-free Node.js installer for `npx`; it preserves existing files unless `--force` is passed.
- `tests/cli.test.cjs` — CLI behavior tests.
- `.opencode/agents/` — optional OpenCode-specific planner, reviewer, and verifier subagents.
- `PLATFORM-SETUP.md` — platform guidance, setup steps, and limitations.
- `GENERIC-IDE-SETUP.md` — universal fallback for unlisted IDEs or agents.
- `IMPECCABLE-SETUP.md` — optional frontend design quality checks.
- `OPENCODE-SETUP.md` — additional notes for OpenCode users.

## Sync skills to another platform

The shared skills remain under `.agents/skills/`. If your host expects a native directory, run the script from this kit repository:

```bash
python scripts/sync_skills.py --target claude --project-root /path/to/your/project
python scripts/sync_skills.py --target copilot --project-root /path/to/your/project
python scripts/sync_skills.py --target gemini --project-root /path/to/your/project
python scripts/sync_skills.py --target opencode --project-root /path/to/your/project
python scripts/sync_skills.py --target windsurf --project-root /path/to/your/project
```

Use `--dry-run` to preview changes. Existing skill folders are skipped by default; pass `--force` only when you intend to update existing copies. Other hosts can use `--target custom --custom-dir .your-agent/skills`. Run the Node.js CLI tests with `npm test` (Node.js 18 or newer). See [PLATFORM-SETUP.md](PLATFORM-SETUP.md) for paths and limitations, or [GENERIC-IDE-SETUP.md](GENERIC-IDE-SETUP.md) if your IDE is not listed.

## Core principles

- Teach developers to understand decisions rather than blindly copy code.
- Inspect before editing; choose the smallest coherent change.
- Load only relevant skills where the host supports them.
- Keep platform-specific features optional; core instructions and workflows remain plain Markdown.
- Avoid unnecessary dependencies, abstractions, circular imports, boilerplate, fake tests, and unrelated refactors.
- Never claim a test, documentation check, build, or deployment succeeded unless it was actually verified.

## Compatibility note

This kit aims for broad compatibility; it cannot guarantee identical behavior in every IDE, model, version, or hosted coding service. Instruction and skill discovery differs by host, so use platform-specific setup notes and verify discovery in your own environment. Specialist subagents under `.opencode/agents/` run only on compatible OpenCode setups; other platforms can use the shared workflow files or their native subagent formats.

## Download

- [Download the current main-branch ZIP](https://github.com/crazy-creator0/python-fullstack-agent-kit/archive/refs/heads/main.zip)
- [npm publishing guide](PUBLISHING.md)
- [Open platform setup instructions](PLATFORM-SETUP.md)
- [Universal setup for any IDE](GENERIC-IDE-SETUP.md)
- [Browse all files](https://github.com/crazy-creator0/python-fullstack-agent-kit)
