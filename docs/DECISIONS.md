# Decision Records

> Record durable choices and why they were made. This is not a raw chat transcript.
> Status: accepted unless stated otherwise.
> Last updated: 2026-10-22

## ADR-001 — Make the kit IDE-agnostic

- **Status:** Accepted
- **Decision:** Keep portable behavior in shared Markdown rules, skills, and workflows; use thin adapters for individual IDEs.
- **Why:** Users work across different editors and coding assistants, and feature support varies by host.
- **Consequences:** Avoid claiming identical behavior everywhere. Detect or document platform limitations and provide a generic fallback.

## ADR-002 — Plan before broad or high-impact changes

- **Status:** Accepted
- **Decision:** For substantial features, architecture changes, major refactors, destructive operations, new services/dependencies, and production-impacting work, inspect first, present a coherent plan, and obtain appropriate approval before execution.
- **Why:** The user wants to discuss and approve major direction rather than discover an unapproved rewrite afterward.
- **Consequence:** Small, safe, reversible changes can proceed within the request; do not create friction with unnecessary questions for every small task.

## ADR-003 — Preserve NOW / NEXT / LATER priorities

- **Status:** Accepted
- **Decision:** Treat user-defined NOW, NEXT, and LATER as persistent planning boundaries. Keep future ideas visible but do not silently move them into current scope.
- **Why:** A colleague-like project partner should protect focus, dependencies, and business priorities.
- **Consequence:** Update the tracker when priorities or dependencies materially change.

## ADR-004 — “Pick the best” delegates selection, not unlimited permission

- **Status:** Accepted
- **Decision:** Compare plausible choices internally and recommend one best fit based on requirements, project evidence, user preferences, cost, risk, maintainability, and performance. Explain the reason and key trade-offs briefly.
- **Why:** The user wants a decisive colleague rather than an overload of choices.
- **Safety boundary:** This does not authorize destructive, irreversible, costly, or production-impacting actions without appropriate approval.

## ADR-005 — Discover design taste before selecting UI tools

- **Status:** Accepted
- **Decision:** Inspect existing UI and any supplied references first. Ask one concise taste question only if the direction is unclear. Recommend optional design libraries, canvas, 3D, or GPU tools only when they match the project and visual goal.
- **Why:** A component/tool catalogue should not dictate the visual direction.
- **Consequence:** Prefer the existing stack or simpler HTML/CSS/SVG when sufficient; explain performance, accessibility, license, and maintenance trade-offs where relevant.

## ADR-006 — Visualize the plan and final documentation with source-backed diagrams

- **Status:** Accepted
- **Decision:** Use SVG for scalable static diagrams such as architecture, module relationships, data flow, user journey, and roadmap. Use a live HTML/CSS prototype or actual screenshot where that better fits the need. Embed SVGs using relative Markdown paths.
- **Why:** Visual explanations make unfamiliar systems and planned changes easier to understand.
- **Truthfulness boundary:** Diagrams must reflect inspected evidence. Label illustrative mockups clearly and never present a mockup as a screenshot of a running application.

## ADR-007 — Documentation-only mode must not change application code

- **Status:** Accepted
- **Decision:** When a user asks for documentation only, inspect and update documentation without modifying source code, configuration, or business logic. Report implementation bugs separately.
- **Why:** Documentation work must not become an unrequested code change.
- **Consequence:** Validate commands and descriptions against the real code where possible; mark unverified details.

## ADR-008 — Put evidence-based improvement suggestions at the end of documentation

- **Status:** Accepted
- **Decision:** Finish project documentation with an **Improvement Opportunities & Recommended Roadmap** section, grouped into NOW / NEXT / LATER.
- **Why:** A learner should finish understanding the project and then see practical next steps.
- **Consequence:** Each item should state evidence, expected benefit, effort/risk and verification where available. Never invent numeric ROI or performance gains.

## ADR-009 — Review real changes before push and include DevOps/release thinking

- **Status:** Accepted
- **Decision:** Add an independent, read-only change-impact review of the actual Git diff before push, with explicit warnings for intentional, accidental, or uncertain behavior changes. Pair local guidance with CI/PR gates where possible. Include release, monitoring, rollback, and infrastructure cost guidance when relevant.
- **Why:** Tests can miss behavior regressions and local Git hooks can be bypassed.
- **Consequence:** Findings should include severity, file/line evidence, impact, and suggested tests. Review does not silently rewrite the author's patch.

## ADR-010 — Keep a small, durable project memory instead of raw chat logs

- **Status:** Accepted
- **Decision:** Maintain the tracker, project plan, decision log, and work log for substantial/ongoing efforts. Keep them concise, linked, and synchronized after meaningful changes.
- **Why:** Future work should remember current status and the reason behind choices instead of repeating questions or re-proposing rejected options.
- **Privacy boundary:** Tracked files in this public repository are public. Secrets, private customer data, and private personal notes must never be added. Keep local-only notes in ignored locations and inspect staged files before commit.

## ADR-011 — Track reproducible test source, ignore generated test output

- **Status:** Accepted
- **Decision:** Keep tests needed for repeatable QA/CI in version control. Ignore generated reports, coverage, caches, temporary data, private fixtures, and local test artifacts. Use the package allowlist to prevent maintainer-only planning files from shipping with the installable CLI.
- **Why:** Ignoring all test source would weaken public quality assurance; generated outputs and secrets do not belong in commits or release tarballs.
- **Consequence:** .gitignore is not a secret scanner and does not untrack files already committed. Check Git status, review staged changes, and inspect npm pack --dry-run before release.

## ADR-012 — Use a universal core, optional skill packs, and thin adapters

- **Status:** Accepted
- **Decision:** Organize future capabilities into a portable core, task/stack-specific skills and workflows, host adapters, visual/document artifacts, and quality/release gates.
- **Why:** It keeps the product extensible without forcing every user or task to load every capability.
- **Consequence:** Share the same project plan and decisions across roles; avoid duplicating whole instructions across IDE-specific files.
