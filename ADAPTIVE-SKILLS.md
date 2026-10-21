# Adaptive skills workflow

This pack includes skill-gap-router, a reusable OpenCode skill for just-in-time skill selection and safe skill gap handling.

## Expected behavior
1. Understand the task and inspect the project.
2. Load only relevant installed skills.
3. If something is missing, explain the capability gap.
4. Prefer official/trusted skill sources; inspect content before installation.
5. Ask the user before installing or overwriting third-party or persistent skills.
6. Validate the OpenCode SKILL.md path and frontmatter, then reload OpenCode if needed.
7. Never claim a skill was installed or a check was run unless verified.

OpenCode discovers skills from supported locations including .agents/skills/<name>/SKILL.md; skills are loaded on demand. See https://docs.opencode.ai/docs/skills/.
