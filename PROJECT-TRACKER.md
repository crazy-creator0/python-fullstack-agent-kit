# Project Tracker

> Single entry point for current status, active work, roadmap, durable decisions, and work history.
> Last updated: 2026-10-22

## Current state

**Project:** Universal, IDE-agnostic AI software-development kit  
**Current repo name:** python-fullstack-agent-kit  
**Current phase:** Phase 0 — project governance and architecture planning  
**Overall status:** The cross-IDE kit and installer foundation exist. The broader project-partner experience below is a target roadmap, not a completed runtime feature.

### Existing repository foundation

- Shared agent instructions and platform adapters for multiple IDEs/coding assistants.
- Portable skills for engineering, security, debugging, testing/review, design taste discovery, and related topics.
- Reusable workflows for project setup, feature work, debugging, and deployment.
- A dependency-free Node.js CLI source, CLI tests, skill-sync utility, and GitHub Actions workflow.
- Optional design/codebase references, selected only when they fit the actual project.

Earlier CI runs passed for prior commits. **Re-check the latest workflow run before claiming this current revision passes.** npm registry publication remains pending; the owner must make the license decision and complete package-name/release checks first.

## Workstream tracker

Statuses: **DONE** = present and verified in the repository; **IN PROGRESS** = current work; **PLANNED** = accepted direction, implementation not complete; **BLOCKED** = needs an external decision/action.

| ID | Workstream | Status | Completion evidence / next step |
|---|---|---|---|
| GOV-01 | Durable tracker, architecture plan, decision record, and work log | DONE | This file plus docs/PROJECT-PLAN.md, docs/DECISIONS.md, and docs/WORKLOG.md |
| GOV-02 | Separate tracked project files from local secrets, scratch notes, and generated test output | DONE | Root .gitignore; review staged files before every commit |
| CORE-01 | Universal core that understands new vs. existing projects and routes tasks to relevant skills | PLANNED | Define behavior contracts and add representative scenario tests |
| PLAN-01 | Colleague-like planner with business value, costs, risks, assumptions, and NOW/NEXT/LATER | PLANNED | Create planning flow and persistence rules |
| UI-01 | Taste-first designer and visual planning workspace | PARTIAL | Taste-discovery and visual-reference guidance exist; interactive workspace/prototype generation is still planned |
| DOC-01 | Repository-aware documentation and beginner learning guide | PLANNED | Inspect real source, generate relevant docs/embedded SVG diagrams, validate details, and finish with evidence-based improvement suggestions |
| REVIEW-01 | Independent pre-push change-impact reviewer | PLANNED | Analyze the real Git diff/base, identify changed behavior and regression risk, report severity and evidence |
| OPS-01 | DevOps/release workflow | PARTIAL | Deployment workflow guidance exists; unified release gates, rollback and monitoring integration remain planned |
| TEST-01 | Regression, integration, security, and scenario tests for end-to-end agent behavior | PLANNED | Add tests per vertical slice; retain existing CLI tests |
| DIST-01 | npm package-name/license review and registry release | BLOCKED | Confirm license and name availability, inspect package, test clean install, then owner publishes |
| META-01 | Rename repository to match the broader product | PLANNED | Recommended candidate: universal-coding-agent-kit; owner should confirm before renaming |

## Near-term priority

1. Keep this governance state accurate.
2. Define the universal core's behavior contracts before implementing more specialist skills.
3. Implement one end-to-end vertical slice: inspect an existing project → propose a plan → get permission → produce validated documentation and SVG diagrams without changing source code in docs-only mode.
4. Add independent change-impact review and release controls.
5. Complete licensing, package checks, public README positioning, and repository rename after confirming the chosen name.

## Source-of-truth files

- **Scope, architecture, milestones, acceptance criteria:** docs/PROJECT-PLAN.md
- **Why decisions were made:** docs/DECISIONS.md
- **Chronological implementation record:** docs/WORKLOG.md
- **Current implementation details:** source files, tests, and Git history

## Maintenance rules

- Update this tracker when a workstream changes status or a major milestone is completed.
- Update the project plan when scope, phases, or acceptance criteria change.
- Add a decision record when a durable architectural, workflow, privacy, or product choice is made; include alternatives and rationale.
- Add a concise work-log entry after meaningful repository work, including what changed and what was actually verified.
- Do not dump raw chats or credentials here. Keep private notes in ignored local-only locations.
- Distinguish planned behavior from implemented behavior. Never mark a task done based only on an intention or a successful text edit.
- Actual tests belong in source control when they are part of reproducible project quality; generated test output and private test data do not.
- These maintainer documents are public in this public repository, but intentionally excluded from the npm installer's explicit package file allowlist. Re-check package contents before publishing.
