"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const {
  findExistingConflicts,
  installKit,
  parseArgs,
  printHelp
} = require("../bin/cli.cjs");

function makeKit(root) {
  const files = [
    "AGENTS.md",
    ".agents/AGENTS.md",
    ".agents/README.md",
    ".agents/skills/python-engineering/SKILL.md",
    ".agents/workflows/new-project.md",
    ".agents/workflows/stack-migration.md",
    "AGENT-SKILL-MAP.md",
    "HOST-CAPABILITY-FALLBACK.md",
    "USAGE-PRIVACY.md",
    "scripts/uca-usage.cjs",
    "GENERIC-IDE-SETUP.md",
    "PLATFORM-SETUP.md",
    "IMPECCABLE-SETUP.md",
    ".cursor/rules/universal-coding-agent-kit.mdc",
    ".cursor/agents/designer.md",
    ".cursor/agents/service-strategist.md",
    "CLAUDE.md",
    "GEMINI.md",
    ".github/copilot-instructions.md",
    "OPENCODE-SETUP.md",
    ".opencode/agents/planner.md",
    ".opencode/agents/reviewer.md",
    ".opencode/agents/verifier.md",
    ".opencode/agents/designer.md",
    ".opencode/agents/service-strategist.md",
    ".opencode/plugins/uca-usage.mjs",
    ".devin/rules/universal-coding-agent-kit.md",
    ".windsurf/rules/universal-coding-agent-kit.md",
    ".junie/rules/universal-coding-agent-kit.md",
    ".aiassistant/rules/universal-coding-agent-kit.md"
  ];
  for (const relative of files) {
    const fullPath = path.join(root, relative);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, `template:${relative}\n`, "utf8");
  }
}

function withFixture(run) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "agent-kit-test-"));
  const kitRoot = path.join(root, "kit");
  const projectRoot = path.join(root, "project");
  fs.mkdirSync(kitRoot, { recursive: true });
  fs.mkdirSync(projectRoot, { recursive: true });
  makeKit(kitRoot);
  try {
    run({ kitRoot, projectRoot });
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

test("parses platform, directory, and safety flags", () => {
  assert.deepEqual(parseArgs(["init", "../app", "--platform", "cursor", "--dry-run"]), {
    dir: "../app",
    platform: "cursor",
    yes: false,
    force: false,
    dryRun: true,
    help: false,
    version: false
  });
});

test("rejects unknown platform names", () => {
  assert.throws(() => parseArgs(["--platform", "unknown-editor"]), /Unknown platform/);
});

test("help describes generic fallback and preservation behavior", () => {
  const help = printHelp();
  assert.match(help, /UCA Kit/);
  assert.match(help, /unlisted IDEs/);
  assert.match(help, /preserved by default/);
  assert.match(help, /keep existing files, override them, or cancel the install/i);
  assert.match(help, /Cancel leaves the project unchanged/i);
});

test("generic profile installs only the generic fallback guide from setup docs", () => {
  withFixture(({ kitRoot, projectRoot }) => {
    const summary = installKit({ packageRoot: kitRoot, projectRoot, platform: "generic" });
    assert.equal(summary.errors, 0);
    assert.ok(fs.existsSync(path.join(projectRoot, "GENERIC-IDE-SETUP.md")));
    assert.equal(fs.existsSync(path.join(projectRoot, "PLATFORM-SETUP.md")), false);
    assert.equal(fs.existsSync(path.join(projectRoot, "IMPECCABLE-SETUP.md")), false);
    assert.equal(fs.existsSync(path.join(projectRoot, ".agents/README.md")), false);
  });
});

test("installs shared core and selected Cursor adapter", () => {
  withFixture(({ kitRoot, projectRoot }) => {
    const summary = installKit({
      packageRoot: kitRoot,
      projectRoot,
      platform: "cursor"
    });
    assert.equal(summary.errors, 0);
    assert.equal(
      fs.readFileSync(path.join(projectRoot, "AGENTS.md"), "utf8"),
      "template:AGENTS.md\n"
    );
    assert.equal(
      fs.readFileSync(path.join(projectRoot, ".cursor/rules/universal-coding-agent-kit.mdc"), "utf8"),
      "template:.cursor/rules/universal-coding-agent-kit.mdc\n"
    );
    assert.equal(
      fs.readFileSync(path.join(projectRoot, ".agents/skills/python-engineering/SKILL.md"), "utf8"),
      "template:.agents/skills/python-engineering/SKILL.md\n"
    );
    for (const relative of ["AGENT-SKILL-MAP.md", "HOST-CAPABILITY-FALLBACK.md", ".agents/workflows/stack-migration.md", "USAGE-PRIVACY.md", "scripts/uca-usage.cjs", ".cursor/agents/designer.md", ".cursor/agents/service-strategist.md"]) {
      assert.ok(fs.existsSync(path.join(projectRoot, relative)), `Expected routing/usage file missing: ${relative}`);
    }
  });
});

test("preserves existing files by default while adding new files", () => {
  withFixture(({ kitRoot, projectRoot }) => {
    fs.writeFileSync(path.join(projectRoot, "AGENTS.md"), "my existing rules\n", "utf8");
    const summary = installKit({ packageRoot: kitRoot, projectRoot, platform: "generic" });
    assert.equal(summary.errors, 0);
    assert.equal(
      fs.readFileSync(path.join(projectRoot, "AGENTS.md"), "utf8"),
      "my existing rules\n"
    );
    assert.ok(summary.skipped >= 1);
    assert.ok(fs.existsSync(path.join(projectRoot, ".agents/skills/python-engineering/SKILL.md")));
  });
});

test("detects conflicts without changing the project", () => {
  withFixture(({ kitRoot, projectRoot }) => {
    fs.writeFileSync(path.join(projectRoot, "AGENTS.md"), "user-owned instructions\n", "utf8");
    fs.mkdirSync(path.join(projectRoot, ".agents/skills/python-engineering"), { recursive: true });
    fs.writeFileSync(
      path.join(projectRoot, ".agents/skills/python-engineering/SKILL.md"),
      "user-owned skill\n",
      "utf8"
    );

    const entries = require("../bin/cli.cjs").CORE_ENTRIES;
    const conflicts = findExistingConflicts(
      projectRoot,
      require("../bin/cli.cjs").collectFiles(kitRoot, entries)
    );

    assert.ok(conflicts.includes("AGENTS.md"));
    assert.ok(conflicts.includes(".agents/skills/python-engineering/SKILL.md"));
    assert.equal(fs.existsSync(path.join(projectRoot, ".agents/workflows/new-project.md")), false);
    assert.equal(
      fs.readFileSync(path.join(projectRoot, "AGENTS.md"), "utf8"),
      "user-owned instructions\n"
    );
  });
});

test("cancel on conflict leaves existing files intact and creates no UCA Kit files", () => {
  withFixture(({ kitRoot, projectRoot }) => {
    fs.writeFileSync(path.join(projectRoot, "AGENTS.md"), "user-owned instructions\n", "utf8");
    const summary = installKit({
      packageRoot: kitRoot,
      projectRoot,
      platform: "generic",
      conflictMode: "cancel"
    });

    assert.equal(summary.cancelled, true);
    assert.equal(summary.errors, 0);
    assert.deepEqual(fs.readdirSync(projectRoot), ["AGENTS.md"]);
    assert.equal(
      fs.readFileSync(path.join(projectRoot, "AGENTS.md"), "utf8"),
      "user-owned instructions\n"
    );
    assert.equal(fs.existsSync(path.join(projectRoot, ".agents/skills/python-engineering/SKILL.md")), false);
  });
});

test("explicit conflict override replaces matching files but keeps unrelated user skills", () => {
  withFixture(({ kitRoot, projectRoot }) => {
    fs.writeFileSync(path.join(projectRoot, "AGENTS.md"), "old rules\n", "utf8");
    fs.mkdirSync(path.join(projectRoot, ".agents/skills/my-custom-skill"), { recursive: true });
    fs.writeFileSync(path.join(projectRoot, ".agents/skills/my-custom-skill/SKILL.md"), "my own skill\n", "utf8");
    const summary = installKit({
      packageRoot: kitRoot,
      projectRoot,
      platform: "generic",
      conflictMode: "overwrite"
    });

    assert.equal(summary.errors, 0);
    assert.equal(summary.overwritten, 1);
    assert.equal(fs.readFileSync(path.join(projectRoot, "AGENTS.md"), "utf8"), "template:AGENTS.md\n");
    assert.equal(
      fs.readFileSync(path.join(projectRoot, ".agents/skills/my-custom-skill/SKILL.md"), "utf8"),
      "my own skill\n"
    );
  });
});

test("force updates existing files explicitly", () => {
  withFixture(({ kitRoot, projectRoot }) => {
    fs.writeFileSync(path.join(projectRoot, "AGENTS.md"), "old rules\n", "utf8");
    const summary = installKit({
      packageRoot: kitRoot,
      projectRoot,
      platform: "generic",
      force: true
    });
    assert.equal(summary.errors, 0);
    assert.equal(summary.overwritten, 1);
    assert.equal(
      fs.readFileSync(path.join(projectRoot, "AGENTS.md"), "utf8"),
      "template:AGENTS.md\n"
    );
  });
});

test("dry-run reports intended changes without writing", () => {
  withFixture(({ kitRoot, projectRoot }) => {
    const messages = [];
    const summary = installKit({
      packageRoot: kitRoot,
      projectRoot,
      platform: "generic",
      dryRun: true,
      log: (message) => messages.push(message)
    });
    assert.equal(summary.errors, 0);
    assert.ok(summary.copied > 0);
    assert.ok(messages.some((message) => message.startsWith("COPY:")));
    assert.equal(fs.existsSync(path.join(projectRoot, "AGENTS.md")), false);
  });
});


test("refuses to write through a symlinked directory", () => {
  withFixture(({ kitRoot, projectRoot }) => {
    const outside = path.join(path.dirname(projectRoot), "outside");
    fs.mkdirSync(outside, { recursive: true });
    const sentinel = path.join(outside, "AGENTS.md");
    fs.writeFileSync(sentinel, "keep private rules\\n", "utf8");
    fs.symlinkSync(outside, path.join(projectRoot, ".agents"), "dir");

    const summary = installKit({ packageRoot: kitRoot, projectRoot, platform: "generic" });
    assert.ok(summary.errors > 0);
    assert.equal(fs.readFileSync(sentinel, "utf8"), "keep private rules\\n");
  });
});


test("refuses to write through a broken file symlink", () => {
  withFixture(({ kitRoot, projectRoot }) => {
    const outside = path.join(path.dirname(projectRoot), "outside");
    fs.mkdirSync(outside, { recursive: true });
    const target = path.join(outside, "should-not-be-created.md");
    fs.symlinkSync(target, path.join(projectRoot, "AGENTS.md"), "file");

    const summary = installKit({ packageRoot: kitRoot, projectRoot, platform: "generic" });
    assert.ok(summary.errors > 0);
    assert.equal(fs.existsSync(target), false);
  });
});

test("Claude profile copies skills into the native skill directory", () => {
  withFixture(({ kitRoot, projectRoot }) => {
    const summary = installKit({ packageRoot: kitRoot, projectRoot, platform: "claude" });
    assert.equal(summary.errors, 0);
    assert.ok(fs.existsSync(path.join(projectRoot, "CLAUDE.md")));
    assert.equal(
      fs.readFileSync(path.join(projectRoot, ".claude/skills/python-engineering/SKILL.md"), "utf8"),
      "template:.agents/skills/python-engineering/SKILL.md\n"
    );
  });
});


test("OpenCode profile installs specialist agents and local usage plugin", () => {
  withFixture(({ kitRoot, projectRoot }) => {
    const summary = installKit({ packageRoot: kitRoot, projectRoot, platform: "opencode" });
    assert.equal(summary.errors, 0);
    for (const relative of [
      ".opencode/agents/designer.md",
      ".opencode/agents/service-strategist.md",
      ".opencode/agents/planner.md",
      ".opencode/plugins/uca-usage.mjs",
      "scripts/uca-usage.cjs",
      "AGENT-SKILL-MAP.md",
      "USAGE-PRIVACY.md"
    ]) {
      assert.ok(fs.existsSync(path.join(projectRoot, relative)), `Expected OpenCode/routing/usage file missing: ${relative}`);
    }
  });
});

test("Devin profile copies its own adapter", () => {
  withFixture(({ kitRoot, projectRoot }) => {
    const summary = installKit({ packageRoot: kitRoot, projectRoot, platform: "devin" });
    assert.equal(summary.errors, 0);
    assert.ok(fs.existsSync(path.join(projectRoot, ".devin/rules/universal-coding-agent-kit.md")));
    assert.equal(fs.existsSync(path.join(projectRoot, ".windsurf/rules/universal-coding-agent-kit.md")), false);
  });
});

test("Windsurf profile copies its own adapter, not the Devin adapter", () => {
  withFixture(({ kitRoot, projectRoot }) => {
    const summary = installKit({ packageRoot: kitRoot, projectRoot, platform: "windsurf" });
    assert.equal(summary.errors, 0);
    assert.ok(fs.existsSync(path.join(projectRoot, ".windsurf/rules/universal-coding-agent-kit.md")));
    assert.equal(fs.existsSync(path.join(projectRoot, ".devin/rules/universal-coding-agent-kit.md")), false);
  });
});
