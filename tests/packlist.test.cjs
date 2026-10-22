"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const path = require("node:path");

test("npm installer package excludes maintainer planning and test files", () => {
  const repoRoot = path.resolve(__dirname, "..");
  const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
  const packed = spawnSync(npmCommand, ["pack", "--dry-run", "--json"], {
    cwd: repoRoot,
    encoding: "utf8",
    timeout: 60_000
  });

  assert.equal(
    packed.status,
    0,
    `npm pack --dry-run failed:\n${packed.stderr || packed.stdout}`
  );

  let report;
  try {
    report = JSON.parse(packed.stdout);
  } catch (error) {
    assert.fail(`Could not parse npm pack JSON: ${error.message}\n${packed.stdout}`);
  }

  assert.ok(Array.isArray(report) && report[0] && Array.isArray(report[0].files),
    "Expected npm pack --dry-run --json to return a package file list.");

  const paths = report[0].files.map((file) => file.path);
  const forbidden = paths.filter((file) =>
    /^(?:tests?|docs)\//i.test(file) ||
    /^(?:PROJECT-TRACKER\.md|PROJECT-PLAN\.md|DECISIONS\.md|WORKLOG\.md|LICENSE-DECISION\.md|\.gitignore)$/.test(file) ||
    /^\.github\/workflows\//.test(file)
  );

  assert.deepEqual(
    forbidden,
    [],
    `Maintainer-only or test artifacts leaked into the npm package: ${forbidden.join(", ")}`
  );

  for (const required of ["LICENSE", "bin/cli.cjs", "AGENTS.md", ".agents/AGENTS.md", "package.json"]) {
    assert.ok(paths.includes(required), `Expected installer file missing from package: ${required}`);
  }

  const packageJson = require(path.join(repoRoot, "package.json"));
  assert.equal(packageJson.license, "MIT", "Package metadata should declare the MIT license.");
});
