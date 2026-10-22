# UCA Kit

<p align="center">
  <strong>Written by Crazy Creators</strong><br>
  <em>UCA Kit — One reusable AI coding-agent toolkit. Multiple IDEs. Clearer engineering workflows.</em>
</p>

<p align="center">
  <a href="https://github.com/crazy-creator0/universal-coding-agent-kit/actions/workflows/npm-cli.yml"><img alt="CI" src="https://github.com/crazy-creator0/universal-coding-agent-kit/actions/workflows/npm-cli.yml/badge.svg"></a>
  <a href="https://github.com/crazy-creator0/universal-coding-agent-kit/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/crazy-creator0/universal-coding-agent-kit?style=social"></a>
</p>

**UCA Kit (Universal Coding Agent Kit)** is an IDE-agnostic toolkit for AI coding assistants. It provides reusable agent instructions, portable skills, engineering workflows, platform adapters, and a lightweight installer so you can use consistent development guidance across supported coding tools.

It is designed to help developers plan before coding, understand unfamiliar code, make focused changes, test carefully, protect existing behavior, and learn the reasoning behind engineering decisions.

[Quick start](#quick-start) · [Features](#what-is-included) · [Agent/skill routing](AGENT-SKILL-MAP.md) · [Host capability fallback](HOST-CAPABILITY-FALLBACK.md) · [Local usage meter](#local-usage-meter-and-budget-guard) · [Supported tools](#supported-coding-tools) · [License](#license) · [Generic IDE setup](GENERIC-IDE-SETUP.md) · [Platform guide](PLATFORM-SETUP.md)

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

> **npm registry note:** The source and MIT license are in this repository, but a public npm release is not yet confirmed. Verify the package name is available and the packed files are correct before publishing. Until then, use the GitHub-based commands above. After the public release is verified, the intended short command will be `npx create-universal-coding-agent-kit@latest init .`.

## What is included

- **Shared agent instructions** — consistent engineering principles, mentoring, safe editing, and verification guidance.
- **13 portable skills** — Python engineering, frontend engineering and visual design discovery, backend APIs, databases, security, debugging, testing and review, and more.
- **Reusable workflows** — new project setup, feature development, bug investigation, and production deployment.
- **Cross-IDE adapters** — configuration guidance for Cursor, Claude Code, Gemini CLI, GitHub Copilot, OpenCode, Windsurf, Devin, JetBrains tools, and unlisted IDEs using the generic setup.
- **Lightweight CLI** — dependency-free Node.js installer with platform selection, dry-run support, safe path checks, and preserve-existing-files behavior.
- **Skill sync utility** — optional Python script to copy canonical skills into supported native locations.
- **Role-to-skill routing** — a shared map for selecting the relevant specialist roles, canonical skills, optional tools, and verification steps without loading everything.
- **Host capability fallback** — platform-agnostic rules to detect supported features and fall back to direct skill reading or sequential specialist work when an IDE lacks native agents/hooks.
- **Local usage meter and budget guard** — an opt-in local ledger for aggregate usage counters, warning thresholds, and pre-call budget checks; see `USAGE-PRIVACY.md` for accuracy and privacy limits.
- **Quality checks** — Node.js tests and GitHub Actions checks, including a check that maintainer-only files and test source do not leak into the npm package.

## Supported coding tools

The kit aims for broad compatibility, not identical behavior in every tool. Follow the [platform setup guide](PLATFORM-SETUP.md), and use the [generic IDE guide](GENERIC-IDE-SETUP.md) when your assistant is not listed.

| Tool | Getting started |
|---|---|
| OpenAI Codex / Codex CLI | Root `AGENTS.md`; use skills where supported |
| Cursor | Root `AGENTS.md`, `.cursor/rules/`, and native `.cursor/agents/` specialists |
| Claude Code | `CLAUDE.md` and supported skill locations |
| Gemini CLI | `GEMINI.md` and supported skill locations |
| GitHub Copilot | `.github/copilot-instructions.md` and supported skills |
| OpenCode | `AGENTS.md`, skills, specialist subagents, and local usage plugin |
| Windsurf / Cascade | Root instructions and optional `.windsurf/rules/` adapter |
| Devin | Root instructions and optional `.devin/rules/` adapter |
| JetBrains Junie / AI Assistant | Optional platform-specific rule files |
| Other IDEs and coding assistants | Start with `GENERIC-IDE-SETUP.md` |

## Local usage meter and budget guard

After installation, you can track usage counters that your host exposes, or numbers you enter yourself:

```bash
# Configure local caps (example values)
node scripts/uca-usage.cjs budget --max-total-tokens 20000 --max-agent-calls 4 --max-cost-usd 0.50 --planned-agent-tokens 1500 --planned-agent-cost-usd 0.03

# Record aggregate usage; use exact only for host/provider-reported or explicitly measured values
node scripts/uca-usage.cjs record --source exact --input-tokens 1200 --output-tokens 350 --agent-calls 1 --skill-reads 2 --tool-calls 3 --cost-source estimated --cost-usd 0.015

# View summary, guard an optional call, or reset counters
node scripts/uca-usage.cjs show
node scripts/uca-usage.cjs guard --planned-tokens 900 --planned-agent-calls 1
node scripts/uca-usage.cjs reset
```

The ledger is local by default at `~/.uca-kit/usage.json`; set `UCA_USAGE_FILE` to use another path. The utility has no telemetry/network client and stores aggregate counters only—not prompts, source code, credentials, or chat transcripts. The OpenCode profile includes a host plugin for supported completed-message usage metadata and pre-checks for optional task/subagent calls; other IDEs still require a separate integration or manual recording. Budget checks use explicit per-call reservations when token/cost limits are enabled. Without host support, the ledger may undercount usage. Provider-reported cost is not necessarily an invoice amount. See [USAGE-PRIVACY.md](USAGE-PRIVACY.md).

## How it works

1. Install or copy the common rules without overwriting your existing project guidance blindly.
2. Let the agent inspect your real project, stack, test commands, and conventions.
3. Ask it to load only the relevant skills for the task.
4. Work in small, verifiable steps and review the actual diff before accepting changes.
5. Verify behavior in your own IDE and environment; host capabilities vary.
6. For substantial tasks, consult [the agent/skill routing map](AGENT-SKILL-MAP.md), suggest relevant skills up front, read only those skill files, and activate specialists only where the host supports them and the task benefits.
7. When the local usage script is installed, use its budget guard before optional specialist calls when the host integration supports it; never skip essential safety checks to save tokens.

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

## License

This project is licensed under the [MIT License](LICENSE). The license applies to this repository's original project materials; check any third-party skills, assets, or dependencies for their own license terms before reuse.

## Project history

- **Portable foundation:** shared Markdown instructions, reusable `SKILL.md` files, and workflows that do not require a single IDE.
- **Cross-IDE expansion:** adapters and setup guidance for multiple coding assistants, plus a generic fallback for unlisted tools.
- **Installer and checks:** a dependency-free Node.js CLI, dry-run and file-preservation behavior, automated tests, and GitHub Actions verification.
- **UCA Kit branding:** UCA Kit is the short product name. The existing GitHub repository URL, npm package identifier, CLI command, and adapter filenames remain unchanged so current setup instructions keep working.
- **Current direction:** a universal coding-agent toolkit with stronger planning, beginner-friendly documentation, visual explanation, change-impact review, and release safety. These newer orchestration capabilities remain on the roadmap until implemented and verified.

## Contributing and support

Bug reports and focused improvements are welcome through [GitHub Issues](https://github.com/crazy-creator0/universal-coding-agent-kit/issues). Please include reproducible steps, relevant environment details, and the checks you ran; do not post secrets or private project data.

Before contributing, run:

```bash
npm run check
npm pack --dry-run
```

**Written by Crazy Creators.**
