# Multi-Platform Setup Guide

This kit is built around reusable Markdown instructions and Agent Skills (SKILL.md), not around a single IDE. Each host has its own instruction discovery and agent configuration behavior, so use the adapter that matches your tool.

## Quick compatibility overview

| Platform / host | Instructions | Skills | Specialist agents |
|---|---|---|---|
| OpenAI Codex / Codex CLI | Root AGENTS.md | .agents/skills/ | Use host-specific agent support; shared workflows remain usable |
| Cursor | Root AGENTS.md and optional .cursor/rules/ | .agents/skills/ in supported versions | Use Cursor-native agent features or shared workflows |
| OpenCode | Root AGENTS.md | .agents/skills/ | .opencode/agents/ |
| GitHub Copilot | .github/copilot-instructions.md and supported AGENTS.md contexts | .agents/skills/ | Use Copilot custom agents where supported |
| Claude Code | CLAUDE.md | Check native skill discovery; .agents/skills/ is the source of truth | Use Claude Code subagents or shared workflows |
| Gemini CLI | GEMINI.md | .agents/skills/ in supported versions | Use Gemini CLI-supported subagent/workflow features |
| Windsurf / Cascade-compatible setups | .windsurf/rules/ and/or AGENTS.md, depending on version | Check host version; sync to native skill location if needed | Use shared workflows or host-native agent features |
| Other IDEs / agents | Use AGENTS.md if recognized; otherwise copy common rules into that host's instruction setting | Use Agent Skills if supported; otherwise open the relevant SKILL.md manually | Shared workflows are plain Markdown |

Host compatibility changes over time. This table is a starting point, not a claim that every feature is available in every version.

## Recommended setup

1. Clone or download this repository.
2. Copy the files you need into your application repository, or keep this repo open as a reference.
3. Preserve existing project-specific instructions. If AGENTS.md, CLAUDE.md, GEMINI.md, .github/copilot-instructions.md, or editor rules already exist, merge the kit's guidance instead of replacing the file.
4. Keep the shared skills and workflows under .agents/skills/ and .agents/workflows/ when your host discovers those locations.
5. Open the target IDE/agent and confirm its instructions are active before assigning code changes.
6. Ask the agent to inspect the actual project structure and scripts. Do not assume the example stack, test commands, or Cloudflare features exist in your application.

## Platform-specific details

### Codex and other AGENTS.md-compatible hosts

Use root AGENTS.md as the primary common instruction file. Portable skills live in .agents/skills/<skill-name>/SKILL.md. Ask the host to load a relevant skill when needed, or open that file manually if automatic discovery is unavailable.

### Cursor

Recent Cursor versions support root AGENTS.md as a straightforward alternative to project rules. The included .cursor/rules/python-fullstack-agent-kit.mdc is an adapter for versions or workflows that prefer native project rules. Avoid keeping two conflicting copies of the same rules.

### OpenCode

OpenCode can use AGENTS.md, skills under .agents/skills/, and optional project subagents under .opencode/agents/. See OPENCODE-SETUP.md. The planner/reviewer/verifier definitions are OpenCode-specific, not required for the core kit.

### GitHub Copilot

The included .github/copilot-instructions.md points Copilot at the common instructions. Skill discovery can depend on the Copilot surface and version; if the host does not automatically load a skill, read the selected SKILL.md directly.

### Claude Code

Use the included CLAUDE.md, which imports common instructions using Claude Code's @path import syntax. Claude Code versions may use their own skill discovery paths; consult current official docs or install/sync portable skills into a supported native location if automatic discovery does not occur.

### Gemini CLI

Use the included GEMINI.md, which imports the root instructions and the detailed mentoring guide. Confirm loaded context with the CLI's memory/context inspection feature for your installed version.

### Windsurf

Use the included rule under .windsurf/rules/ and/or root AGENTS.md according to your installed version. Rule discovery can change across releases; if a referenced file is not loaded, paste or copy the common guidance into a native workspace rule.

## Optional skills installer

If you have GitHub CLI with the gh skill feature installed, it can install skills into host-specific locations. Check gh skill install --help first, because supported agent identifiers and flags depend on your installed CLI version. The reusable skills are under the hidden .agents/skills/ path, so consult the CLI's hidden-directory options before installing from this repository.

Do not run third-party installation scripts automatically or overwrite existing skills without inspecting the diff and getting approval.

## Portable workflow files

The workflows in .agents/workflows/ are Markdown documents, not exclusive commands. Open them manually or adapt them into prompts, commands, or subagents in your preferred host:
- new-project.md
- feature-development.md
- bug-investigation.md
- production-deployment.md

## Verify installation

Ask the agent: “Before coding, tell me which project instruction files you loaded and list the relevant skills available. Do not modify files yet.”

Then confirm its answer by checking the host's visible context, loaded rules, skill listing, or supported equivalent. If it cannot automatically load a skill, ask it to read the exact relevant file, for example .agents/skills/python-engineering/SKILL.md.

## References

Platform file formats and discovery can change. Consult current official documentation:
- [Codex prompting guide](https://developers.openai.com/cookbook/examples/gpt-5/codex_prompting_guide)
- [Cursor rules](https://docs.cursor.com/context/rules-for-ai)
- [OpenCode rules](https://docs.opencode.ai/docs/rules/)
- [OpenCode skills](https://docs.opencode.ai/docs/skills/)
- [GitHub Copilot custom instructions](https://docs.github.com/en/copilot/concepts/prompting-and-context/custom-instructions)
- [GitHub Copilot agent skills](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills)
- [Claude Code memory and imports](https://docs.anthropic.com/en/docs/claude-code/memory)
- [Gemini CLI context files](https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/gemini-md.md)
- [GitHub CLI skill install](https://cli.github.com/manual/gh_skill_install)
