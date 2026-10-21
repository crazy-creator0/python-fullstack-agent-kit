# Impeccable UI quality checks — multi-platform setup

Impeccable is an optional UI design skill and deterministic checker for known frontend design and usability issues. It is **not an AI-authorship detector** and cannot reliably prove whether a human or AI wrote code.

## Install for your coding tool

Impeccable supports multiple coding tools, including Claude Code, Codex, Cursor, GitHub Copilot, Gemini CLI, and OpenCode. The installer selects an integration for the tool and scope you choose. Check the current official docs for the latest supported tools and prerequisites.

From your application project root, run:

```bash
npx impeccable install
```

Follow the prompts to select your coding tool and whether to install for this project or all projects, then reload/restart the tool. If it asks to modify existing skill files, review the proposed changes before accepting them.

Alternative options:
- **GitHub Copilot app:** Impeccable may be built in for supported app versions; enable it in Settings → Experimental, then follow its project setup instructions.
- **Claude Code plugin:** follow the official Impeccable instructions in its current docs, or use the supported Agent Skills install workflow.
- **Agent Skills-compatible host:** `npx skills add pbakaus/impeccable` installs the shared skill; the Impeccable CLI installer is preferred when you need host-specific integrations and hooks.

Official setup guide: https://impeccable.style/tutorials/getting-started/

## Give it project context

In most supported coding agents, use:

```text
/impeccable init
```

For Codex, the command prefix is commonly `$impeccable`. Follow the selected tool's own interface and current instructions. Initialization reads project context and records audience/goals in project documentation; review generated content before committing it.

## Use the design guidance

Examples (command syntax depends on the host):

- Ask Impeccable to critique a real existing page before redesigning it.
- Ask it to polish a focused UI problem while preserving existing product decisions.
- Use it to audit accessibility, responsiveness, layout, visual hierarchy, and design-system consistency.
- For a new UI, state users, purpose, product constraints, and acceptance criteria first.

Review findings rather than applying them blindly. Intentional design choices may be appropriate exceptions.

## Deterministic detector

If the installed version provides the detector, it can check source files or a running page without asking an LLM to make the findings:

```bash
npx impeccable detect src/
npx impeccable detect http://localhost:3000
npx impeccable detect --viewport 390x844 http://localhost:3000
```

Use the real UI source directory or local URL for your project and confirm the current CLI syntax. A successful detector run is not proof the UI is perfect; a detected pattern is a finding to review. Do not claim the detector ran or passed unless you actually ran it and inspected the output.

## Suggested quality gate

1. Inspect the current framework, design system, components, and project scripts.
2. Implement the requested UI with loading, empty, error, and success states as applicable.
3. Run the project's actual lint, type, build, and UI tests where available.
4. Run Impeccable's supported critique/audit and deterministic checks for the actual UI.
5. Fix valid issues, document intentional exceptions, and re-run relevant checks.
6. Report exactly which checks ran and what remains unverified.

Keep this optional integration out of non-UI tasks. Impeccable support, commands, hooks, and configuration vary by tool and version.

Official references:
- Getting started: https://impeccable.style/tutorials/getting-started/
- Detector: https://impeccable.style/docs/detector/
- Automatic checks/hooks: https://impeccable.style/docs/hooks/
