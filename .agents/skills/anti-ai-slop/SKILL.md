---
name: anti-ai-slop
description: Prevent unnecessary abstractions, generic boilerplate, overengineering, and unverified code changes.
---

# Anti-AI-Slop Engineering

Code quality means satisfying real requirements with understandable, verifiable code—not maximizing code volume or architectural complexity.

## Before coding
1. Restate the specific behavior or defect.
2. Inspect relevant files and conventions.
3. Identify the smallest change that satisfies the requirement.
4. State assumptions and acceptance criteria.
5. Ask only when a missing fact materially changes the solution.

## When context is incomplete
1. Pause before editing when previous decisions or task scope are missing or contradictory.
2. Inspect current files, working-tree status, recent diffs/commits, and relevant durable project records before reconstructing intent.
3. Search for existing files or equivalent functionality before adding a file, duplicate abstraction, plan, or helper.
4. Make an explicit known / assumption / unknown distinction. Ask one targeted question when uncertainty changes architecture, risk, destructive behavior, or acceptance.
5. Never create files just to cover a guessed requirement, and never recreate missing files without evidence the user wants them restored.

## Reject
- Factories, registries, managers, wrappers, layers, or design patterns without a demonstrated use case.
- New dependencies for problems the existing stack can solve simply.
- Unrelated rewrites or reformatting.
- One-use helpers that obscure rather than clarify.
- Comments that merely repeat the code.
- Empty catches, fake retries, broad exception swallowing, and meaningless fallbacks.
- Placeholder features presented as production-ready.
- Fake tests that only assert a value exists or mock the behavior under test.
- Speculative scalability or microservices without evidence.

## Decision test
For every new abstraction, dependency, file, or service, answer: Which requirement needs it? What complexity does it remove? Is there a simpler option? How will it be tested? If the benefit cannot be explained, do not add it.

Follow existing patterns, keep diffs focused, preserve compatibility unless told otherwise, add meaningful regression tests, run relevant checks, and inspect the final diff.

## Completion
Summarize behavior changed, why the solution is sufficient, tests actually run, and remaining limitations. Never call something production-ready without a defined scope and evidence.
