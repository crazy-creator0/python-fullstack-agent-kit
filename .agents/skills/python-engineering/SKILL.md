---
name: python-engineering
description: Write maintainable Python that fits the existing project, with clear imports, typing, errors, tests, and packaging.
---

# Python Engineering

## Inspect first
Read the nearby modules, public APIs, dependency files, formatter/linter/type-check settings, and tests before choosing a pattern. Preserve project conventions.

## Implementation
- Prefer clear names, small cohesive functions, and straightforward control flow.
- Add type hints where they improve public contracts and maintainability; do not add noisy types that conceal uncertainty.
- Use context managers for managed resources and standard library features before adding dependencies.
- Handle expected errors specifically. Do not swallow exceptions or return fake defaults for failures.
- Keep secrets and environment-specific configuration outside source control.
- Avoid mutable default arguments, hidden global state, unnecessary metaprogramming, and premature abstraction.
- Do not create a utility module just to move a few lines elsewhere.
- Inspect imports before refactoring. Avoid circular dependencies and preserve a clear dependency direction; do not hide a cycle with local imports without a justified, documented need.
- Follow the project's Python version and packaging conventions.

## Testing and quality
Test behavior, edge cases, and regression risks. Use mocks at external boundaries, not as a substitute for testing the behavior itself. Run focused tests first, then relevant full-suite, lint, and type checks if available. Report actual results.
