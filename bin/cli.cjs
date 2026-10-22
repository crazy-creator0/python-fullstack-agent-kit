#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const readline = require("node:readline/promises");

const CORE_ENTRIES = [
  { source: "AGENTS.md", destination: "AGENTS.md" },
  { source: ".agents/AGENTS.md", destination: ".agents/AGENTS.md" },
  { source: ".agents/skills", destination: ".agents/skills" },
  { source: ".agents/workflows", destination: ".agents/workflows" },
  { source: "AGENT-SKILL-MAP.md", destination: "AGENT-SKILL-MAP.md" },
  { source: "HOST-CAPABILITY-FALLBACK.md", destination: "HOST-CAPABILITY-FALLBACK.md" },
  { source: "USAGE-PRIVACY.md", destination: "USAGE-PRIVACY.md" },
  { source: "scripts/uca-usage.cjs", destination: "scripts/uca-usage.cjs" },
];

const PLATFORM_ENTRIES = {
  generic: [
    { source: "GENERIC-IDE-SETUP.md", destination: "GENERIC-IDE-SETUP.md" }
  ],
  codex: [],
  cursor: [
    { source: ".cursor/rules/universal-coding-agent-kit.mdc", destination: ".cursor/rules/universal-coding-agent-kit.mdc" },
    { source: ".cursor/agents/designer.md", destination: ".cursor/agents/designer.md" },
    { source: ".cursor/agents/service-strategist.md", destination: ".cursor/agents/service-strategist.md" }
  ],
  claude: [
    { source: "CLAUDE.md", destination: "CLAUDE.md" },
    { source: ".agents/skills", destination: ".claude/skills" }
  ],
  gemini: [
    { source: "GEMINI.md", destination: "GEMINI.md" },
    { source: ".agents/skills", destination: ".gemini/skills" }
  ],
  copilot: [
    { source: ".github/copilot-instructions.md", destination: ".github/copilot-instructions.md" },
    { source: ".agents/skills", destination: ".github/skills" }
  ],
  opencode: [
    { source: "OPENCODE-SETUP.md", destination: "OPENCODE-SETUP.md" },
    { source: ".opencode/agents", destination: ".opencode/agents" },
    { source: ".opencode/plugins/uca-usage.mjs", destination: ".opencode/plugins/uca-usage.mjs" }
  ],
  devin: [
    { source: ".devin/rules/universal-coding-agent-kit.md", destination: ".devin/rules/universal-coding-agent-kit.md" }
  ],
  windsurf: [
    { source: ".windsurf/rules/universal-coding-agent-kit.md", destination: ".windsurf/rules/universal-coding-agent-kit.md" },
    { source: ".agents/skills", destination: ".windsurf/skills" }
  ],
  junie: [
    { source: ".junie/rules/universal-coding-agent-kit.md", destination: ".junie/rules/universal-coding-agent-kit.md" }
  ],
  jetbrains: [
    { source: ".aiassistant/rules/universal-coding-agent-kit.md", destination: ".aiassistant/rules/universal-coding-agent-kit.md" }
  ]
};

function printHelp() {
  return `create-universal-coding-agent-kit — UCA Kit installer for shared coding-agent rules

Usage:
  npx create-universal-coding-agent-kit
  npx create-universal-coding-agent-kit init [directory] [options]

Options:
  --dir, --project-root <path>   Destination project (default: current directory)
  --platform <name>              generic, codex, cursor, claude, gemini, copilot,
                                 opencode, devin, windsurf, junie, jetbrains
  --yes, -y                      Skip the platform prompt (defaults to generic)
  --force                        Overwrite existing files without prompting (use carefully)
  --dry-run                      Preview changes without writing files
  --help, -h                     Show this help
  --version                      Show package version

Examples:
  npx create-universal-coding-agent-kit init .
  npx create-universal-coding-agent-kit init . --platform cursor
  npx create-universal-coding-agent-kit init ../my-app --platform claude
  npx create-universal-coding-agent-kit init . --platform generic --dry-run

Existing files are preserved by default. In an interactive terminal, detected
conflicts prompt you to keep existing files, override them, or cancel the install.
Cancel leaves the project unchanged. --force explicitly overrides without prompting.
The generic option also works with unlisted IDEs: use GENERIC-IDE-SETUP.md for
manual instruction setup.
`;
}

function parseArgs(argv) {
  const options = {
    dir: ".",
    platform: null,
    yes: false,
    force: false,
    dryRun: false,
    help: false,
    version: false
  };
  let positionalDirSeen = false;

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "init") continue;
    if (arg === "--help" || arg === "-h") {
      options.help = true;
      continue;
    }
    if (arg === "--version") {
      options.version = true;
      continue;
    }
    if (arg === "--yes" || arg === "-y") {
      options.yes = true;
      continue;
    }
    if (arg === "--force") {
      options.force = true;
      continue;
    }
    if (arg === "--dry-run") {
      options.dryRun = true;
      continue;
    }
    if (arg === "--dir" || arg === "--project-root") {
      const value = argv[index + 1];
      if (!value || value.startsWith("--")) {
        throw new Error(`Option ${arg} requires a path.`);
      }
      options.dir = value;
      positionalDirSeen = true;
      index += 1;
      continue;
    }
    if (arg === "--platform") {
      const value = argv[index + 1];
      if (!value || value.startsWith("--")) {
        throw new Error("Option --platform requires a platform name.");
      }
      if (!Object.hasOwn(PLATFORM_ENTRIES, value)) {
        throw new Error(`Unknown platform "${value}". Choose: ${Object.keys(PLATFORM_ENTRIES).join(", ")}.`);
      }
      options.platform = value;
      index += 1;
      continue;
    }
    if (arg.startsWith("-")) {
      throw new Error(`Unknown option: ${arg}`);
    }
    if (!positionalDirSeen) {
      options.dir = arg;
      positionalDirSeen = true;
      continue;
    }
    throw new Error(`Unexpected extra argument: ${arg}`);
  }

  return options;
}

function safeResolve(root, relativePath) {
  if (path.isAbsolute(relativePath)) {
    throw new Error(`Refusing absolute path: ${relativePath}`);
  }
  const resolvedRoot = path.resolve(root);
  const resolved = path.resolve(resolvedRoot, relativePath);
  const relative = path.relative(resolvedRoot, resolved);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    throw new Error(`Refusing path outside root: ${relativePath}`);
  }
  return resolved;
}

function assertNoSymlinkParents(projectRoot, destination) {
  const relative = path.relative(projectRoot, destination);
  const parts = relative.split(path.sep).slice(0, -1);
  let current = projectRoot;

  for (const part of parts) {
    current = path.join(current, part);
    let stat;
    try {
      stat = fs.lstatSync(current);
    } catch (error) {
      if (error.code === "ENOENT") break;
      throw error;
    }
    if (stat.isSymbolicLink()) {
      throw new Error(`Refusing to write through a symbolic-link directory: ${current}`);
    }
    if (!stat.isDirectory()) {
      throw new Error(`Destination parent is not a directory: ${current}`);
    }
  }
}

function listSourceFiles(sourcePath) {
  const stat = fs.lstatSync(sourcePath);
  if (stat.isSymbolicLink()) {
    throw new Error(`Refusing to follow a template symlink: ${sourcePath}`);
  }
  if (stat.isFile()) return [sourcePath];
  if (!stat.isDirectory()) {
    throw new Error(`Unsupported template entry: ${sourcePath}`);
  }

  const files = [];
  for (const child of fs.readdirSync(sourcePath).sort()) {
    files.push(...listSourceFiles(path.join(sourcePath, child)));
  }
  return files;
}

function collectFiles(packageRoot, entries) {
  const root = path.resolve(packageRoot);
  const planned = [];
  for (const entry of entries) {
    const sourceRoot = safeResolve(root, entry.source);
    if (!fs.existsSync(sourceRoot)) {
      throw new Error(`Required template not found: ${entry.source}`);
    }

    for (const sourceFile of listSourceFiles(sourceRoot)) {
      const relativeInsideSource = path.relative(sourceRoot, sourceFile);
      const destinationRelative = fs.statSync(sourceRoot).isDirectory()
        ? path.join(entry.destination, relativeInsideSource)
        : entry.destination;
      planned.push({
        source: sourceFile,
        destination: destinationRelative
      });
    }
  }
  return planned;
}

function findExistingConflicts(projectRoot, files) {
  const root = path.resolve(projectRoot);
  const conflicts = [];

  for (const item of files) {
    const destination = safeResolve(root, item.destination);
    assertNoSymlinkParents(root, destination);
    let stat;
    try {
      stat = fs.lstatSync(destination);
    } catch (error) {
      if (error.code === "ENOENT") continue;
      throw error;
    }
    if (stat.isSymbolicLink()) {
      throw new Error(`Refusing to replace a symbolic link: ${destination}`);
    }
    if (!stat.isFile()) {
      throw new Error(`Destination exists but is not a regular file: ${destination}`);
    }
    conflicts.push(path.relative(root, destination));
  }

  return conflicts;
}

async function chooseConflictMode(conflicts) {
  const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  try {
    console.log(`\nFound ${conflicts.length} existing file conflict(s):`);
    for (const relative of conflicts.slice(0, 12)) console.log(`  - ${relative}`);
    if (conflicts.length > 12) console.log(`  ... and ${conflicts.length - 12} more`);
    console.log("\nChoose how to handle conflicts:");
    console.log("  1. Keep existing files (skip those UCA Kit files)");
    console.log("  2. Override existing files with UCA Kit versions");
    console.log("  3. Cancel installation (leave the project unchanged)");
    while (true) {
      const answer = (await terminal.question("Choose 1, 2, or 3 [1]: ")).trim();
      if (!answer || answer === "1") return "skip";
      if (answer === "2") return "overwrite";
      if (answer === "3") return "cancel";
      console.log("Please enter 1, 2, or 3.");
    }
  } finally {
    terminal.close();
  }
}

function installKit({
  packageRoot,
  projectRoot,
  platform = "generic",
  force = false,
  dryRun = false,
  conflictMode = null,
  log = () => {}
}) {
  if (!Object.hasOwn(PLATFORM_ENTRIES, platform)) {
    throw new Error(`Unknown platform "${platform}". Choose: ${Object.keys(PLATFORM_ENTRIES).join(", ")}.`);
  }

  const resolvedPackageRoot = path.resolve(packageRoot);
  const resolvedProjectRoot = path.resolve(projectRoot);
  const entries = [...CORE_ENTRIES, ...PLATFORM_ENTRIES[platform]];
  const files = collectFiles(resolvedPackageRoot, entries);
  const summary = { copied: 0, overwritten: 0, skipped: 0, errors: 0, cancelled: false };
  const mode = conflictMode || (force ? "overwrite" : "skip");

  if (!["skip", "overwrite", "cancel"].includes(mode)) {
    throw new Error(`Unknown conflict mode "${mode}". Choose skip, overwrite, or cancel.`);
  }
  if (mode === "cancel") {
    const conflicts = findExistingConflicts(resolvedProjectRoot, files);
    if (conflicts.length > 0) {
      summary.cancelled = true;
      summary.conflicts = conflicts;
      log("Installation cancelled. No files were changed.");
      return summary;
    }
  }

  for (const item of files) {
    let destination;
    try {
      destination = safeResolve(resolvedProjectRoot, item.destination);
      assertNoSymlinkParents(resolvedProjectRoot, destination);
      let exists = false;
      try {
        const destinationStat = fs.lstatSync(destination);
        exists = true;
        if (destinationStat.isSymbolicLink()) {
          throw new Error(`Refusing to replace a symbolic link: ${destination}`);
        }
        if (!destinationStat.isFile()) {
          throw new Error(`Destination exists but is not a regular file: ${destination}`);
        }
      } catch (error) {
        if (error.code !== "ENOENT") throw error;
      }

      if (exists && mode !== "overwrite") {
        log(`SKIP existing: ${path.relative(resolvedProjectRoot, destination)}`);
        summary.skipped += 1;
        continue;
      }

      if (dryRun) {
        log(`${exists ? "OVERWRITE" : "COPY"}: ${path.relative(resolvedProjectRoot, destination)}`);
        if (exists) summary.overwritten += 1;
        else summary.copied += 1;
        continue;
      }

      fs.mkdirSync(path.dirname(destination), { recursive: true });
      fs.copyFileSync(item.source, destination);
      log(`${exists ? "UPDATED" : "COPIED"}: ${path.relative(resolvedProjectRoot, destination)}`);
      if (exists) summary.overwritten += 1;
      else summary.copied += 1;
    } catch (error) {
      summary.errors += 1;
      log(`ERROR: ${item.destination}: ${error.message}`);
    }
  }

  return summary;
}

async function choosePlatform() {
  const labels = [
    ["generic", "Unknown IDE / universal manual setup (recommended for unlisted tools)"],
    ["codex", "OpenAI Codex"],
    ["cursor", "Cursor"],
    ["claude", "Claude Code"],
    ["gemini", "Gemini CLI"],
    ["copilot", "GitHub Copilot"],
    ["opencode", "OpenCode"],
    ["devin", "Devin"],
    ["windsurf", "Windsurf / Cascade"],
    ["junie", "JetBrains Junie"],
    ["jetbrains", "JetBrains AI Assistant"]
  ];
  const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  try {
    console.log("\nWhich coding tool do you use?");
    labels.forEach(([key, description], index) => {
      console.log(`  ${index + 1}. ${description} [${key}]`);
    });
    const answer = await terminal.question("Choose a number (default 1): ");
    if (!answer.trim()) return "generic";
    const choice = Number.parseInt(answer.trim(), 10);
    if (!Number.isInteger(choice) || choice < 1 || choice > labels.length) {
      throw new Error(`Please enter a number from 1 to ${labels.length}.`);
    }
    return labels[choice - 1][0];
  } finally {
    terminal.close();
  }
}

async function main(argv = process.argv.slice(2)) {
  let options;
  try {
    options = parseArgs(argv);
  } catch (error) {
    console.error(`Error: ${error.message}\n\nRun with --help for usage.`);
    return 2;
  }

  const packageRoot = path.resolve(__dirname, "..");
  if (options.help) {
    console.log(printHelp());
    return 0;
  }
  if (options.version) {
    const manifest = JSON.parse(fs.readFileSync(path.join(packageRoot, "package.json"), "utf8"));
    console.log(manifest.version);
    return 0;
  }

  if (!options.platform) {
    if (process.stdin.isTTY && process.stdout.isTTY && !options.yes) {
      try {
        options.platform = await choosePlatform();
      } catch (error) {
        console.error(`Error: ${error.message}`);
        return 2;
      }
    } else {
      options.platform = "generic";
    }
  }

  const projectRoot = path.resolve(process.cwd(), options.dir);
  let conflictMode = options.force ? "overwrite" : "skip";
  if (!options.force && !options.yes && !options.dryRun && process.stdin.isTTY && process.stdout.isTTY) {
    try {
      const plannedEntries = [...CORE_ENTRIES, ...PLATFORM_ENTRIES[options.platform]];
      const plannedFiles = collectFiles(packageRoot, plannedEntries);
      const conflicts = findExistingConflicts(projectRoot, plannedFiles);
      if (conflicts.length > 0) {
        conflictMode = await chooseConflictMode(conflicts);
        if (conflictMode === "cancel") {
          console.log("\nInstallation cancelled. No files were changed.");
          return 0;
        }
      }
    } catch (error) {
      console.error(`Cannot safely check installation conflicts: ${error.message}`);
      return 1;
    }
  }
  console.log(`\nInstalling UCA Kit (Universal Coding Agent Kit) into: ${projectRoot}`);
  console.log(`Platform profile: ${options.platform}`);
  if (options.force) {
    console.warn("Warning: --force may overwrite existing instruction and skill files.");
  } else if (conflictMode === "overwrite") {
    console.warn("You chose to override conflicting files; review the copied files and diffs.");
  } else {
    console.log("Existing files will be preserved; conflicts will be skipped.");
  }
  if (options.dryRun) console.log("Dry-run enabled; no files will be changed.\n");
  else console.log("");

  let summary;
  try {
    summary = installKit({
      packageRoot,
      projectRoot,
      platform: options.platform,
      force: options.force,
      dryRun: options.dryRun,
      conflictMode,
      log: (message) => console.log(`  ${message}`)
    });
  } catch (error) {
    console.error(`Install failed: ${error.message}`);
    return 1;
  }

  if (summary.cancelled) {
    console.log("\nInstallation cancelled. No files were changed.");
    return 0;
  }
  console.log(
    `\nSummary: ${summary.copied} copied, ${summary.overwritten} overwritten, ${summary.skipped} skipped, ${summary.errors} errors.`
  );
  if (summary.errors > 0) return 1;
  if (options.platform === "generic") {
    console.log("\nNext step: open GENERIC-IDE-SETUP.md and add its copy-paste instructions to your IDE.");
  } else {
    console.log("\nNext step: open the project in your IDE and verify its rules/skills are loaded.");
  }
  console.log("Review the copied files before committing them.");
  return 0;
}

if (require.main === module) {
  main().then((code) => {
    process.exitCode = code;
  }).catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}

module.exports = {
  CORE_ENTRIES,
  PLATFORM_ENTRIES,
  collectFiles,
  findExistingConflicts,
  installKit,
  parseArgs,
  printHelp
};
