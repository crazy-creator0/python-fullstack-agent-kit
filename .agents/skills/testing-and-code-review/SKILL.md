---
name: testing-and-code-review
description: Design meaningful tests and review code for correctness, security, performance, readability, and maintainability.
---

# Testing and Code Review

## Testing strategy
Choose tests according to risk:
- Unit tests for isolated business rules.
- API tests for contracts, validation, auth, and error responses.
- Integration tests for database and external boundaries.
- Component tests for UI behavior.
- End-to-end tests for critical user journeys.

Test meaningful edge cases: empty input/results, malformed data, duplicate requests, unauthorized access, missing resources, timeouts, failed dependencies, and concurrent updates where relevant.

## Review checklist
1. Correctness and acceptance criteria.
2. Simplicity, naming, and readability.
3. Security, authorization, and data privacy.
4. Error handling and edge cases.
5. Database correctness and query behavior.
6. Performance based on evidence.
7. Test quality and regression coverage.
8. Accessibility and UX where relevant.
9. Observability and operational impact.
10. Maintainability and documentation.

## Severity
- Critical: exploitable security issue, severe data-loss risk, or major outage risk.
- High: broken core behavior or significant security/reliability defect.
- Medium: meaningful correctness, maintainability, or performance issue.
- Low: minor cleanup or optional improvement.

For each finding, provide location, evidence, impact, fix, and verification. Do not invent findings.

## Honest reporting
Separate tests that were run from tests that are recommended but not run. Never say "all tests pass" without actual results. Explain the scope and limitations of the test suite.
