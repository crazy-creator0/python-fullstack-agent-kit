# Universal Coding Agent Kit

<p align="center">
  <strong>Written by Crazy Creators</strong><br>
  <em>One reusable AI coding-agent toolkit. Multiple IDEs. Clearer engineering workflows.</em>
</p>

<p align="center">
  <a href="https://github.com/crazy-creator0/universal-coding-agent-kit/actions/workflows/npm-cli.yml"><img alt="CI" src="https://github.com/crazy-creator0/universal-coding-agent-kit/actions/workflows/npm-cli.yml/badge.svg"></a>
  <a href="https://github.com/crazy-creator0/universal-coding-agent-kit/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/crazy-creator0/universal-coding-agent-kit?style=social"></a>
</p>

**Universal Coding Agent Kit** is an IDE-agnostic toolkit for AI coding assistants. It provides reusable agent instructions, portable skills, engineering workflows, platform adapters, and a lightweight installer so you can use consistent development guidance across supported coding tools.

It is designed to help developers plan before coding, understand unfamiliar code, make focused changes, test carefully, protect existing behavior, and learn the reasoning behind engineering decisions.

[Quick start](#quick-start) · [Features](#what-is-included) · [Supported tools](#supported-coding-tools) · [Generic IDE setup](GENERIC-IDE-SETUP.md) · [Platform guide](PLATFORM-SETUP.md)

## Quick start

**Requirements:** Node.js 18 or newer, npm, and Git.

Run the installer from GitHub in the root of your project:

```bash
npx --yes github:crazy-creator0/universal-coding-agent-kit init . --platform generic
```

For an interactive platform selection, omit `--platform`:

```bash
npx --yes github:crazy-creator0/universal-coding-agent-kit init .
```

Preview the files before writing:

```bash
npx --yes github:crazy-creator0/universal-coding-agent-kit init . --platform cursor --dry-run
```

Choose a specific profile when you already know your coding assistant:

```bash
npx --yes github:crazy-creator0/universal-coding-agent-kit init . --platform claude
npx --yes github:crazy-creator0/universal-coding-agent-kit init . --platform copilot
npx --yes github:crazy-creator0/universal-coding-agent-kit init . --platform windsurf
npx --yes github:crazy-creator0/universal-coding-agent-kit init . --platform devin
```

The installer preserves existing files by default. Use `--dry-run` to preview and `--force` only when you explicitly intend to overwrite files. After installation, verify that your coding assistant actually loads the relevant instructions and skills; support differs by product and version.

> **npm registry note:** The package source is in this repository, but the public npm release is not yet confirmed. After the package name is confirmed available, a license is chosen, and the package is published, the intended short command will be `npx create-universal-coding-agent-kit@latest init .`.

## What is included

- **Shared agent instructions** — consistent engineering principles, mentoring, safe editing, and verification guidance.
- **13 portable skills** — Python engineering, frontend engineering and visual design discovery, backend APIs, databases, security, debugging, testing and review, and more.
- **Reusable workflows** — new project setup, feature development, bug investigation, and production deployment.
- **Cross-IDE adapters** — configuration guidance for Cursor, Claude Code, Gemini CLI, GitHub Copilot, OpenCode, Windsurf, Devin, JetBrains tools, and unlisted IDEs using the generic setup.
- **Lightweight CLI** — dependency-free Node.js installer with platform selection, dry-run support, safe path checks, and preserve-existing-files behavior.
- **Skill sync utility** — optional Python script to copy canonical skills into supported native locations.
- **Quality checks** — Node.js tests and GitHub Actions checks, including a check that maintainer-only files and test source do not leak into the npm package.

## Supported coding tools

The kit aims for broad compatibility, not identical behavior in every tool. Follow the [platform setup guide](PLATFORM-SETUP.md), and use the [generic IDE guide](GENERIC-IDE-SETUP.md) when your assistant is not listed.

| Tool | Getting started |
|---|---|
| OpenAI Codex / Codex CLI | Root `AGENTS.md`; use skills where supported |
| Cursor | Root `AGENTS.md` and optional `.cursor/rules/` adapter |
| Claude Code | `CLAUDE.md` and supported skill locations |
| Gemini CLI | `GEMINI.md` and supported skill locations |
| GitHub Copilot | `.github/copilot-instructions.md` and supported skills |
| OpenCode | `AGENTS.md` plus optional OpenCode agents |
| Windsurf / Cascade | Root instructions and optional `.windsurf/rules/` adapter |
| Devin | Root instructions and optional `.devin/rules/` adapter |
| JetBrains Junie / AI Assistant | Optional platform-specific rule files |
| Other IDEs and coding assistants | Start with `GENERIC-IDE-SETUP.md` |

## How it works

1. Install or copy the common rules without overwriting your existing project guidance blindly.
2. Let the agent inspect your real project, stack, test commands, and conventions.
3. Ask it to load only the relevant skills for the task.
4. Work in small, verifiable steps and review the actual diff before accepting changes.
5. Verify behavior in your own IDE and environment; host capabilities vary.

## Roadmap

The following are **planned capabilities, not claims about features already implemented**:

- A colleague-like project planner that maintains NOW / NEXT / LATER priorities and explains trade-offs.
- A visual planning workspace using source-backed SVG diagrams, user journeys, architecture maps, and UI previews.
- Repository-aware beginner documentation with embedded diagrams and evidence-based improvement suggestions.
- An independent pre-push change-impact review to surface possible changes to existing logic and regression risks.
- Stronger integrated DevOps guidance for CI, deployment, monitoring, and rollback.

## Security and safe use

- Never commit API keys, access tokens, passwords, private datasets, or customer data.
- Review `git status` and staged changes before committing. `.gitignore` does not remove files that are already tracked.
- Inspect third-party skills and packages before installing them.
- Treat suggested commands as project-specific; verify them against your actual configuration.
- The kit does not guarantee that every AI assistant automatically discovers every instruction or skill.

## Project history

- **Portable foundation:** shared Markdown instructions, reusable `SKILL.md` files, and workflows that do not require a single IDE.
- **Cross-IDE expansion:** adapters and setup guidance for multiple coding assistants, plus a generic fallback for unlisted tools.
- **Installer and checks:** a dependency-free Node.js CLI, dry-run and file-preservation behavior, automated tests, and GitHub Actions verification.
- **Universal rebrand:** the repository is now called Universal Coding Agent Kit; package metadata, commands, adapters, and setup links use the broader cross-IDE identity.
- **Current direction:** a universal coding-agent toolkit with stronger planning, beginner-friendly documentation, visual explanation, change-impact review, and release safety. These newer orchestration capabilities remain on the roadmap until implemented and verified.

## Contributing and support

Bug reports and focused improvements are welcome through [GitHub Issues](https://github.com/crazy-creator0/universal-coding-agent-kit/issues). Please include reproducible steps, relevant environment details, and the checks you ran; do not post secrets or private project data.

Before contributing, run:

```bash
npm run check
npm pack --dry-run
```

**Written by Crazy Creators.**
