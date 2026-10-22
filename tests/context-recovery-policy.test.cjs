"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

test("canonical root instructions recover missing context and avoid speculative files", () => {
  const instructions = read("AGENTS.md");
  assert.match(instructions, /recover from current files/i);
  assert.match(instructions, /Separate facts, recorded decisions, assumptions, and unknowns/i);
  assert.match(instructions, /Search for existing functionality before adding files/i);
});

test("compatibility shim does not duplicate core policy", () => {
  const instructions = read(".agents/AGENTS.md");
  assert.match(instructions, /Canonical project policy: root `AGENTS.md`/);
  assert.ok(instructions.length < 1200, "Compatibility shim should remain compact.");
});

test("anti-hallucination and anti-slop skills protect against guessed files", () => {
  const antiHallucination = read(".agents/skills/anti-hallucination/SKILL.md");
  const antiSlop = read(".agents/skills/anti-ai-slop/SKILL.md");
  assert.match(antiHallucination, /If the conversation or prior session summary is incomplete/i);
  assert.match(antiHallucination, /search for an existing equivalent/i);
  assert.match(antiSlop, /Never create files just to cover a guessed requirement/i);
});
