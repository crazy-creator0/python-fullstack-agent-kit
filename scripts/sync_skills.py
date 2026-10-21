#!/usr/bin/env python3
"""Copy shared Agent Skills into a coding host's native project skill directory.

Run this from any directory; the skill source is the .agents/skills directory
next to the script's repository root. Existing target skill folders are never
overwritten unless --force is supplied.
"""
from __future__ import annotations

import argparse
import shutil
import sys
from pathlib import Path


TARGETS = {
    "agents": Path(".agents/skills"),
    "opencode": Path(".opencode/skills"),
    "claude": Path(".claude/skills"),
    "copilot": Path(".github/skills"),
    "gemini": Path(".gemini/skills"),
    "windsurf": Path(".windsurf/skills"),
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Copy portable Agent Skills into a host's native project skill directory."
    )
    parser.add_argument(
        "--target",
        required=True,
        choices=(*TARGETS.keys(), "custom"),
        help="Skill directory convention to use, or 'custom' with --custom-dir.",
    )
    parser.add_argument(
        "--project-root",
        type=Path,
        default=Path.cwd(),
        help="Destination project root (default: current working directory).",
    )
    parser.add_argument(
        "--custom-dir",
        help="Relative skill-root path for --target custom, e.g. .my-agent/skills.",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Update files in existing skill folders. Without this flag, existing skills are skipped.",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Show planned copies without changing files.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    source_root = Path(__file__).resolve().parent.parent / ".agents" / "skills"
    project_root = args.project_root.expanduser().resolve()

    if args.target == "custom":
        if not args.custom_dir:
            print("Error: --target custom requires --custom-dir.", file=sys.stderr)
            return 2
        relative_destination = Path(args.custom_dir)
        if relative_destination.is_absolute():
            print("Error: --custom-dir must be relative to --project-root.", file=sys.stderr)
            return 2
    else:
        if args.custom_dir:
            print("Error: --custom-dir is only valid with --target custom.", file=sys.stderr)
            return 2
        relative_destination = TARGETS[args.target]

    if not source_root.is_dir():
        print(f"Error: shared skills source was not found: {source_root}", file=sys.stderr)
        return 2

    skill_dirs = sorted(
        path for path in source_root.iterdir()
        if path.is_dir() and (path / "SKILL.md").is_file()
    )
    if not skill_dirs:
        print(f"Error: no skill folders containing SKILL.md were found in {source_root}", file=sys.stderr)
        return 2

    destination_root = (project_root / relative_destination).resolve()

    # Avoid trying to copy a directory onto itself when this repository is the target project.
    if source_root.resolve() == destination_root:
        print(f"Skills already use the shared path: {source_root}")
        print(f"No copy needed ({len(skill_dirs)} skills found).")
        return 0

    copied = 0
    skipped = 0
    errors = 0

    for source in skill_dirs:
        destination = destination_root / source.name

        if destination.exists() and not args.force:
            print(f"SKIP existing: {destination} (use --force to update)")
            skipped += 1
            continue

        if args.dry_run:
            action = "UPDATE" if destination.exists() else "COPY"
            print(f"{action}: {source.name} -> {destination}")
            copied += 1
            continue

        try:
            destination_root.mkdir(parents=True, exist_ok=True)
            shutil.copytree(source, destination, dirs_exist_ok=True)
            print(f"{'UPDATED' if destination.exists() else 'COPIED'}: {source.name} -> {destination}")
            copied += 1
        except OSError as exc:
            print(f"ERROR copying {source.name}: {exc}", file=sys.stderr)
            errors += 1

    print(f"Summary: {copied} copied/updated, {skipped} skipped, {errors} errors.")
    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
