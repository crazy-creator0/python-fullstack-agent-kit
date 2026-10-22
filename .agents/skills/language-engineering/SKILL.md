---
name: language-engineering
description: Apply maintainable engineering practices to the repository's detected language and stack; use for coding tasks when no obvious specialist skill is a better fit.
---

# Language-Neutral Engineering

Use this as a reusable baseline for `{Lang}`; do not treat the placeholder as a literal language name. Infer the actual language and stack from the task and repository evidence.

## Inspect first
- Inspect nearby source, project configuration, dependency manifests, build scripts, tests, and existing conventions before choosing an implementation.
- Identify the language(s), framework(s), runtime/version constraints, package manager, and available verification commands. Polyglot repositories may require more than one stack.
- Follow established project conventions; do not assume a tool or skill exists just because it is familiar.

## Implementation
- Prefer the smallest clear change that solves the requested problem.
- Use idioms and standard library features appropriate to the detected language and version.
- Keep names clear, responsibilities cohesive, and control flow straightforward. Avoid speculative abstractions, unnecessary dependencies, and unrelated refactors.
- Handle expected failures explicitly; do not swallow errors or fabricate successful defaults.
- Respect API compatibility, security boundaries, secrets, and user-owned changes.
- Use language-specific typing, memory/resource management, error handling, formatting, and packaging practices when relevant to the detected stack.

## Verify
- Derive checks from the repository's actual toolchain: focused tests first, then relevant broader tests, lint, type checks, builds, or static analysis when available.
- If a command or toolchain is unavailable, investigate a reliable alternative when useful and state the limitation honestly.
- Report only checks actually run and their observed outcomes.

## Specialist guidance
Load a language- or framework-specific skill only when it adds concrete guidance beyond this baseline and is relevant to the task. A missing specialist skill never means the language is unsupported. Do not load this skill and a specialist skill that merely repeats the same baseline; use the specialist as an addition where appropriate.
