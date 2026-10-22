"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

test("shared instructions recover missing context before editing", () => {
  const instructions = read("AGENTS.md");
  assert.match(instructions, /pause before editing/i);
  assert.match(instructions, /recover evidence from current files/i);
  assert.match(instructions, /Do not create files merely to compensate for missing context/i);
});

test("shared agent rules require a context-loss recovery protocol", () => {
  const instructions = read(".agents/AGENTS.md");
  assert.match(instructions, /## Context-loss recovery/);
  assert.match(instructions, /Do not invent prior requirements/i);
  assert.match(instructions, /Before creating\/recreating persistent files/i);
  assert.match(instructions, /smallest reversible change/i);
});

test("anti-hallucination and anti-slop skills protect against guessed files", () => {
  const antiHallucination = read(".agents/skills/anti-hallucination/SKILL.md");
  const antiSlop = read(".agents/skills/anti-ai-slop/SKILL.md");
  assert.match(antiHallucination, /If the conversation or prior session summary is incomplete/i);
  assert.match(antiHallucination, /search for an existing equivalent/i);
  assert.match(antiSlop, /Never create files just to cover a guessed requirement/i);
});

test("analysis guide and generic IDE fallback document context recovery", () => {
  const guide = read("ANALYSIS-DEPTH-AND-LOOPHOLE-CHECKS.md");
  const generic = read("GENERIC-IDE-SETUP.md");
  assert.match(guide, /## When session context is missing or has drifted/);
  assert.match(guide, /Do not fill those gaps by inventing a plausible story/i);
  assert.match(generic, /If the previous session context, handoff, or memory is incomplete/i);
});
