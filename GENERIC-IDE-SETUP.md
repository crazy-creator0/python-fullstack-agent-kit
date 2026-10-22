# Universal Setup for Any Coding IDE or AI Agent

This guide is the fallback for an IDE, editor, extension, terminal agent, or hosted coding environment that is not named in this repository's platform list.

**The IDE does not need to be listed here.** The shared instructions and skills are plain text. What varies is whether the tool automatically reads project instruction files or supports Agent Skills.

## Option 1: The tool reads project instruction files

1. Copy the shared kit files into your project root, or keep this kit accessible to the coding agent.
2. Preserve existing project rules. Merge instructions rather than replacing important files.
3. Ask the agent to read `AGENTS.md` and `.agents/AGENTS.md` before a substantial task.
4. Ask it to open only the relevant file from `.agents/skills/<skill-name>/SKILL.md`.
5. Verify that the agent actually read the files before allowing it to change code.

## Option 2: The tool has a custom instructions / system prompt setting

Open the IDE's documented project instructions, workspace rules, agent profile, or custom prompt setting. Paste the following text. If the setting supports file references, link or attach the referenced Markdown files using the syntax documented by that IDE.

### Copy-paste universal instructions

```text
You are working with the Universal Coding Agent Kit. First inspect the actual project and read the contents of AGENTS.md and .agents/AGENTS.md if they are available. Do not assume that a file was read simply because it was mentioned.

For every coding task:
1. Inspect the existing repository, architecture, dependencies, and available tests before planning edits.
2. Identify the smallest relevant skills under .agents/skills/<name>/SKILL.md. Read only the skills relevant to the task. If you cannot access project files, ask the user to attach or paste the specific instruction/skill file; do not pretend it was loaded.
3. Follow the repository's existing patterns and make the smallest coherent change. Avoid unnecessary dependencies, abstractions, circular imports, unrelated refactors, boilerplate, and fake tests.
4. Protect secrets and private data. Never ask the user to expose passwords, tokens, cookies, private keys, or production credentials.
5. Distinguish observed facts from assumptions and hypotheses. Never invent files, APIs, commands, test results, or deployment status.
6. Run relevant checks only when tools and environment access are available. Report exactly what was run and what remains unverified.
7. Before finishing, summarize changed files, reasoning, actual verification results, and any risks or next steps.

Use the user's preferred language and skill level. Explain unfamiliar concepts clearly and mentor rather than encouraging blind copy-paste. Ask a focused question only when a missing fact materially affects the solution. For a vague greeting, ask what help is needed and do not modify files.
```

## Option 3: The tool only supports chat and file attachments

At the start of a new coding conversation:

1. Attach or open `AGENTS.md` and `.agents/AGENTS.md`.
2. Send the universal instructions above (or save them in the tool's reusable prompt library if it has one).
3. Attach only the skill relevant to the current task. Common examples:
   - Python task: `.agents/skills/python-engineering/SKILL.md`
   - API task: `.agents/skills/backend-api/SKILL.md`
   - UI task: `.agents/skills/frontend-engineering/SKILL.md`
   - Bug: `.agents/skills/debugging/SKILL.md` plus the relevant implementation skill
   - Security review: `.agents/skills/application-security/SKILL.md`
   - Test/review: `.agents/skills/testing-and-code-review/SKILL.md`
   - Cloudflare: `.agents/skills/cloudflare-operations/SKILL.md`

Do not attach every skill to every task. Smaller, relevant context is easier to use and review.

## If the IDE has its own skill directory

The canonical skills are under `.agents/skills/`. If the host requires a different directory, run the sync script from this kit repository:

```bash
python scripts/sync_skills.py --target custom --custom-dir .your-agent/skills --project-root /path/to/your/project
```

Replace `.your-agent/skills` with the folder documented by your IDE. Preview first by adding `--dry-run`. Existing skill folders are skipped by default; only use `--force` when you intentionally want to update existing copies.

If the host uses a proprietary skill format, do not assume copying a `SKILL.md` is enough. Follow its official instructions and adapt or reference the content accordingly.

## How to verify

Ask the agent to do a **read-only setup check**:

> Do not edit files. Tell me which instruction files you actually read, which relevant skill files you can access, and which project checks are available. If you cannot access a path, say so explicitly.

Confirm the answer in the IDE's visible context, rule list, file references, or tool logs. If it cannot demonstrate file access, manually attach the files or put the shared rules in its documented instructions setting.

## Important limitation

This fallback makes the kit usable with an unlisted IDE when that tool can read pasted instructions or project files. It cannot force a proprietary tool to support automatic instruction discovery, native skills, subagents, terminal access, or every integration. When those features do not exist, use the shared Markdown manually and verify behavior in that environment.
