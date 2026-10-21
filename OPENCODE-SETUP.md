# OpenCode Setup Notes

## Discovery
- Root AGENTS.md provides repository instructions.
- .agents/skills/<name>/SKILL.md is a supported project-local skill location. Skills load on demand; they are not all executed for every message.
- .opencode/agents/<name>.md defines custom agents. Invoke them explicitly with @planner, @reviewer, or @verifier; do not assume they run automatically.

## Free models
This pack intentionally does not hard-code a model ID. Run opencode models or use /models to see available models through configured providers. Choose one with reliable tool calling and enough context for the repository. Free-tier availability and limits can change.

## Temperature
Planner/reviewer/verifier use temperature 0.1 for focused output. This is not a truth guarantee. Model/provider support varies. If the provider rejects the setting, remove it or use its documented option. Lower temperature does not eliminate hallucinations.

## Suggested loop
1. Ask the primary agent to inspect and plan.
2. Implement one small vertical slice.
3. Ask @reviewer to inspect the actual diff.
4. Ask @verifier to assess tests and unverified claims.
5. Run relevant checks and inspect their outputs.
6. Fix confirmed issues and verify again.

Agent roles and skills improve consistency; they do not guarantee correctness. Repository inspection, tests, independent review, and deployment checks remain necessary.

## Impeccable UI design checks
For frontend/UI projects, install Impeccable separately from the project root:

    npx impeccable install

Choose OpenCode and project scope in the installer, then reload OpenCode. In the agent chat, run /impeccable init. Full instructions and detector commands are in IMPECCABLE-SETUP.md.

Impeccable checks for known UI anti-patterns and design quality issues; it does not reliably detect whether code was authored by AI. Its deterministic detector can run without an LLM/API key:

    npx impeccable detect src/

Run this only if the project has the relevant UI source directory. For a running page, use its actual local URL, e.g. npx impeccable detect http://localhost:3000. Do not report success unless the command was actually run.
