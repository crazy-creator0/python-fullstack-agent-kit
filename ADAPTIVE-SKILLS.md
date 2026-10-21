# Adaptive skills workflow

The `skill-gap-router` skill provides a portable approach to just-in-time skill selection and safe skill-gap handling. It is stored at `.agents/skills/skill-gap-router/SKILL.md` using the Agent Skills `SKILL.md` format.

## Expected behavior

1. Understand the task and inspect the project.
2. Load only relevant skills; do not apply every skill to every task.
3. Use the active host's native skill loader if it supports one.
4. If a skill is missing or not discovered, explain the gap and read the relevant `SKILL.md` directly when that is practical.
5. Prefer official/trusted sources and inspect proposed skill content before use.
6. Ask before installing or overwriting third-party/persistent skills.
7. Check the active host's documented skill location and metadata; do not assume every product discovers the same directories.
8. Report truthfully whether a skill was found, copied, loaded, or verified.

## Canonical skill location

Shared source skills live under `.agents/skills/<name>/SKILL.md`. Several hosts support that location; other hosts require native directories. Use `scripts/sync_skills.py` to copy the source skills into supported targets, for example:

```bash
python scripts/sync_skills.py --target claude --project-root /path/to/project
python scripts/sync_skills.py --target copilot --project-root /path/to/project
```

Existing skill folders are skipped unless `--force` is supplied. See [PLATFORM-SETUP.md](PLATFORM-SETUP.md) for target paths and official references. Always verify discovery in the active coding tool.
