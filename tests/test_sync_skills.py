"""Standard-library tests for the cross-platform skill sync utility."""
from __future__ import annotations

import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


class SyncSkillsTests(unittest.TestCase):
    def setUp(self) -> None:
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.kit = self.root / "kit"
        self.project = self.root / "project"
        self.script = self.kit / "scripts" / "sync_skills.py"
        source_skill = self.kit / ".agents" / "skills" / "python-engineering"
        source_skill.mkdir(parents=True)
        (source_skill / "SKILL.md").write_text("version = source\n", encoding="utf-8")
        (self.script.parent).mkdir(parents=True, exist_ok=True)
        # Copy the implementation file under test into the synthetic kit.
        current_repo_script = Path(__file__).resolve().parents[1] / "scripts" / "sync_skills.py"
        self.script.write_text(current_repo_script.read_text(encoding="utf-8"), encoding="utf-8")
        self.project.mkdir()

    def run_sync(self, *args: str) -> subprocess.CompletedProcess[str]:
        return subprocess.run(
            [sys.executable, str(self.script), "--project-root", str(self.project), *args],
            check=False,
            capture_output=True,
            text=True,
        )

    def test_copies_skill_to_native_folder(self) -> None:
        result = self.run_sync("--target", "claude")
        self.assertEqual(result.returncode, 0, result.stderr)
        copied = self.project / ".claude" / "skills" / "python-engineering" / "SKILL.md"
        self.assertEqual(copied.read_text(encoding="utf-8"), "version = source\n")

    def test_existing_skill_is_not_overwritten_without_force(self) -> None:
        target = self.project / ".github" / "skills" / "python-engineering"
        target.mkdir(parents=True)
        skill_file = target / "SKILL.md"
        skill_file.write_text("keep existing\n", encoding="utf-8")

        result = self.run_sync("--target", "copilot")
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(skill_file.read_text(encoding="utf-8"), "keep existing\n")
        self.assertIn("SKIP existing", result.stdout)

    def test_force_updates_existing_skill(self) -> None:
        target = self.project / ".gemini" / "skills" / "python-engineering"
        target.mkdir(parents=True)
        skill_file = target / "SKILL.md"
        skill_file.write_text("old content\n", encoding="utf-8")

        result = self.run_sync("--target", "gemini", "--force")
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(skill_file.read_text(encoding="utf-8"), "version = source\n")

    def test_custom_target_requires_custom_dir(self) -> None:
        result = self.run_sync("--target", "custom")
        self.assertEqual(result.returncode, 2)
        self.assertIn("--custom-dir", result.stderr)


if __name__ == "__main__":
    unittest.main()
