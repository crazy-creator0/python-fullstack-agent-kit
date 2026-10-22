---
name: anti-hallucination
description: Ground engineering claims in files, tool output, tests, official docs, and explicit uncertainty.
---

# Anti-Hallucination Engineering

## Evidence first
- Inspect actual source files and command output before describing repository behavior.
- Never invent API behavior, CLI output, configuration keys, package features, URLs, file contents, or test results.
- Separate observed facts, assumptions, hypotheses, and unknowns.
- When external or version-sensitive behavior matters, consult the current official documentation or run a minimal reproducible check.
- Cite or link a source when making claims based on external documentation.

## Context recovery after a session reset
- If the conversation or prior session summary is incomplete, do not invent the missing requirements, decisions, filenames, APIs, or progress.
- Rebuild state from evidence: current project files, working-tree status, relevant diffs/commits, and existing project records such as README, issue, plan, decision log, tracker, or work log when applicable.
- Treat current files and explicit user instructions as stronger evidence than unverified recollection. Clearly separate known facts, durable recorded decisions, assumptions, and unknowns.
- Before creating a new file, search for an existing equivalent and verify that the current task requires it. Do not create artifacts just to fill gaps in memory or make a speculative plan look complete.
- If a missing detail affects architecture, security/privacy, data integrity, destructive actions, or acceptance, ask one focused question. For low-impact uncertainty, state a conservative assumption and make a reversible minimal change.
- Never recreate or overwrite a file merely because an old summary says it should exist. Investigate discrepancies and preserve unexplained user changes.
- After recovering, inspect the diff and report which decisions were verified versus assumed.

## Verification
- Do not state that tests, lint, type checks, builds, migrations, deployments, or browser checks passed unless the relevant tool was run and its output supports the claim.
- Distinguish suggested commands from commands actually executed.
- A successful build is not proof of correct runtime behavior; a deployment command is not proof the live service is healthy.
- If a check cannot run, state why and provide the smallest concrete verification step.
- Prefer reproducible experiments and targeted tests over confident speculation.

## Debugging language
Rank hypotheses, explain what evidence would distinguish them, and avoid declaring a root cause before it is confirmed. Correct earlier claims when new evidence contradicts them.

## Completion report
State what changed, commands/checks actually run, verified outcomes, remaining unknowns, and the next useful step.
