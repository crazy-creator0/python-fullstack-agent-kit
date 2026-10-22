# Universal AI Developer Kit — Project Plan

**Status:** Accepted product direction; phased implementation pending  
**Last updated:** 2026-10-22  
**Current implementation baseline:** Cross-IDE instructions, skills, adapters, workflow examples, CLI source/tests, and CI already exist. The interactive planner, repository-learning documentation flow, and end-to-end team orchestration described below are not yet complete runtime features.

## 1. Product vision

Build an IDE-agnostic AI software-development partner that behaves like a thoughtful colleague. It helps users understand unfamiliar codebases, decide what to do now versus later, choose a suitable approach, learn the system, implement approved changes, catch regressions before pushing, and release safely.

The kit must work through the best supported capabilities of each coding host rather than assuming every IDE has identical subagents, hooks, visualizations, or skill discovery.

## 2. Core experience

### A. First conversation and project understanding

For a new project, discover the goal, users, constraints, and definition of success. Recommend a fitting stack rather than forcing one default stack.

For an existing project, begin with a read-only inspection. Identify the project's purpose, framework, entry points, modules, dependencies, tests, documentation, and important risks before suggesting changes. Ask what the user wants to do only when the intent is not already clear.

Classify requests into relevant modes: understand/learn, documentation-only, feature, bug fix, improvement, security review, architecture, design, testing/review, or deployment.

### B. Colleague-like planning

- Maintain **NOW / NEXT / LATER** priorities and do not silently pull future ideas into the current task.
- Understand the user's business goal; compare options on value, cost, effort, risk, maintenance, and time where relevant.
- If asked to **“pick the best,”** choose one best-fit recommendation based on the evidence and stated constraints, briefly explain why and the important trade-offs, and avoid unnecessary follow-up questions.
- Make estimates only with stated assumptions and confidence. Do not invent ROI, savings, timelines, or performance gains.
- Small, safe, reversible tasks may proceed within the user's request. Broad architectural rewrites, destructive changes, new services/dependencies, production-impacting work, and irreversible actions require an explicit plan and appropriate approval.

### C. Taste-first product and visual design

Before substantial UI work, inspect existing UI, framework, requirements, and user-provided references. Ask one concise question about visual taste only if it is not clear from the user's brief or examples.

Translate the user's taste into a design direction and recommend only fitting tools/skills. Existing-stack CSS, HTML, and SVG may be better than a new library. Aceternity UI, Canvas UI, Spline, VGPU, or codebase-visualization tools are optional choices, never an automatic bundle.

### D. Visual planning workspace

Make plans easier to understand through appropriate visual artifacts:
- SVG diagrams for architecture, module dependencies, data flow, user flows, timelines, and learning roadmaps.
- Wireframes and HTML/CSS prototypes for screen-level UI layout and interactions.
- Mermaid or equivalent source-based diagrams where they are more maintainable.
- Actual application screenshots only when captured from a real running build; illustrative mockups must be labelled as mockups.

Prefer readable, labeled, accessible diagrams that cite the code/configuration they represent. Embed SVGs in Markdown with relative paths under a documented assets folder. Never invent system components to make the drawing look complete.

### E. Documentation and beginner learning mode

When documentation is requested, inspect the repository first and choose the relevant documents instead of generating every document by default. Potential outputs include:
- Plain-language project overview.
- Setup/run/test and troubleshooting instructions.
- Architecture, module map, data flow, API, and database references where supported by the code.
- Beginner learning guide and glossary.
- User guide or developer guide depending on the intended audience.
- Embedded, source-backed SVG diagrams.
- A final **Improvement Opportunities & Recommended Roadmap** section grouping evidence-based suggestions into NOW / NEXT / LATER.

Validate commands, file paths, API contracts, dependency declarations, and behaviors against the real project where possible. Clearly mark anything not verified. Do not claim a test, build, command, or deployment succeeded unless it actually ran and produced evidence.

**Documentation-only boundary:** When the user requests documentation only, do not modify application source code, configuration, or business logic. Report discovered bugs or inconsistencies separately; ask permission before fixing code.

### F. Specialist roles and hand-offs

Use specialist skills/roles as needed rather than spawning separate agents for every small task:
- Product/business planner.
- Product/UX designer.
- UI/visual designer and design engineer.
- Software architect.
- Stack-appropriate engineers (frontend, backend, database, ML/other domain skills).
- QA/testing specialist.
- Independent pre-push change-impact reviewer.
- DevOps/release engineer.
- Documentation and learning guide.

All roles must share one plan, one set of accepted decisions, and the same source-of-truth about existing behavior.

### G. Independent change-impact review

Before pushing, inspect the actual Git diff against its intended base. Classify changed, removed, and added behavior as intentional, accidental, or uncertain. Pay special attention to public APIs, shared utilities, data/schema contracts, auth, business rules, error handling, performance-sensitive paths, and test coverage.

Output findings with severity, file/line evidence, potential regression, and suggested tests. Do not silently rewrite the engineer's changes during read-only review. Critical or high-impact findings must be surfaced before push; user-visible behavior changes should be made explicit.

A local Git hook is a convenience, not a complete safeguard because hooks can be bypassed. Complement it with CI/PR review checks and branch protection where available.

### H. DevOps and release

For release-related work, cover branch/PR flow, CI checks, packaging, environment/configuration validation, deployment, monitoring, rollback, and infrastructure cost where relevant. Choose platform-specific commands only after inspecting the target environment and checking current official docs when details may have changed.

## 3. Layered architecture

1. **Universal core:** task classification, context gathering, decision/approval boundaries, source-of-truth tracking, verification standards, and hand-offs.
2. **Portable skill/workflow packs:** general engineering plus optional stack/domain packs loaded only when relevant.
3. **IDE adapters:** thin host-specific instruction/skill mappings. Shared behavior lives in the portable core; do not duplicate whole policies in every adapter.
4. **Visual and document artifacts:** project plans, SVG diagrams, documentation and learning guides based on repository evidence.
5. **Quality/release gates:** tests, independent diff review, security checks, CI/PR verification, and deployment safeguards.
6. **Distribution:** the existing CLI and future package release after license/name/package-content checks.

## 4. Persistent project memory

Use existing project conventions first. For an ongoing or multi-step effort, maintain concise project artifacts rather than raw chat transcripts:
- PROJECT-TRACKER.md: current state, active work, blockers and next steps.
- docs/PROJECT-PLAN.md: target architecture, phases and acceptance criteria.
- docs/DECISIONS.md: durable decisions and reasons.
- docs/WORKLOG.md: chronological work done and verified outcomes.

For an ordinary one-line fix, do not create a large paperwork system if one is not useful. Never store passwords, access tokens, private customer data, or sensitive user information in these documents. A Git-tracked file in a public repository is public even if its name says “private”; check Git status and staging before committing.

## 5. Phased roadmap and acceptance criteria

### Phase 0 — Repository governance (current)

- [x] Add tracker, plan, decision record, and work log.
- [x] Add baseline ignores for secrets, local-only files, caches, and generated test output.
- [x] Confirm latest CI run after governance updates — [run 39738547856 passed](https://github.com/crazy-creator0/python-fullstack-agent-kit/actions/runs/39738547856).
- [ ] Confirm public repository description/topics and decide final repository/package naming.
- [ ] Choose the software license before registry publication.

**Exit criteria:** Current state is honestly documented; public-vs-local artifact boundaries are clear; package/license/name blockers are visible.

### Phase 1 — Universal core and request routing

- [ ] Inspect new/existing projects safely and summarize evidence.
- [ ] Route requests to relevant modes/skills without loading everything on every task.
- [ ] Preserve user goals, constraints, decisions, and NOW/NEXT/LATER.
- [ ] Define when the agent can safely proceed and when it must request approval.
- [ ] Add scenario tests for explicit and ambiguous requests.

**Exit criteria:** Representative scenarios lead to the right workflow, avoid redundant questions, and respect permission boundaries.

### Phase 2 — Business-aware planning

- [ ] Summarize user goal, current state, choices, recommendation, risk, dependencies, verification and deliverables.
- [ ] Include costs/ROI only where an estimate is useful, showing assumptions and confidence.
- [ ] Implement the “pick the best” behavior: one reasoned recommendation, not an unnecessary list.
- [ ] Persist accepted plan changes and rejected alternatives where they affect future decisions.

**Exit criteria:** The user can understand what happens now, what is deferred, why the recommendation fits, and what approval is needed.

### Phase 3 — Taste-first design and visual workspace

- [x] Add guidance to discover visual taste before choosing UI libraries.
- [ ] Create a visual plan/architecture artifact flow using SVG/Mermaid where suitable.
- [ ] Generate screen wireframes/prototypes where useful; distinguish mockups from real screenshots.
- [ ] Ensure diagrams are based on the inspected project and embedded with portable relative links.

**Exit criteria:** A beginner can follow a proposed flow visually; design tools are chosen for fit, not trend.

### Phase 4 — Repository documentation and learning

- [ ] Inspect the codebase and produce a project-specific document inventory.
- [ ] Create the relevant overview, setup, module/API/data-flow references, glossary, and beginner guide.
- [ ] Embed validated SVG diagrams in Markdown.
- [ ] Finish documentation with evidence-based NOW/NEXT/LATER improvement suggestions.
- [ ] Enforce docs-only scope and validate commands/claims against actual code and execution evidence.

**Exit criteria:** A new learner can orient themselves, set up the project, understand main flows, and find sensible next learning tasks without unapproved source edits.

### Phase 5 — Engineering, independent review, and DevOps

- [ ] Implement approved changes in small, testable slices with relevant stack packs.
- [ ] Run relevant tests and inspect the final diff.
- [ ] Review the actual diff independently for changes to existing behavior and regressions.
- [ ] Add local pre-push guidance plus CI/PR gates where host capabilities permit.
- [ ] Add release runbooks for CI, environments, deploy, monitoring, and rollback.

**Exit criteria:** High-impact behavior changes are surfaced before push; claims match test evidence; release steps are repeatable and reversible where possible.

### Phase 6 — Packaging and adoption

- [ ] Review README, quick start, examples, license, package metadata, and package allowlist.
- [ ] Confirm package-name availability and compatibility with the final repo name.
- [ ] Test CLI from a clean disposable project on supported environments.
- [x] Add a package-list test that verifies npm pack --dry-run excludes maintainer trackers/docs, tests, local files, and the root .gitignore; latest CI passed. Secrets still require staged-file review and must never be committed.
- [ ] Have the package owner authenticate and publish; verify the actual registry entry afterward.

**Exit criteria:** New users can discover, install, run, test, and understand the kit without misleading claims.

## 6. Definition of done for every meaningful change

- Goal and affected files are understood.
- Scope and existing behavior changes are stated.
- Relevant tests/checks were run, and outputs are recorded accurately.
- The real diff has been reviewed.
- Documentation and tracker are updated when behavior or durable state changes.
- Decisions are recorded when the rationale should not be lost.
- No secrets/private content or accidental generated artifacts are staged.
- Final report distinguishes completed, not tested, blocked, and next work.
