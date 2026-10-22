"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const {
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
    "AGENT-SKILL-MAP.md",
    "USAGE-PRIVACY.md",
    "scripts/uca-usage.cjs",
    "ADAPTIVE-SKILLS.md",
    "PLATFORM-SETUP.md",
    "GENERIC-IDE-SETUP.md",
    "IMPECCABLE-SETUP.md",
    ".cursor/rules/universal-coding-agent-kit.mdc",
    "CLAUDE.md",
    "GEMINI.md",
    ".github/copilot-instructions.md",
    "OPENCODE-SETUP.md",
    ".opencode/agents/reviewer.md",
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
