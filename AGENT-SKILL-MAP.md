# UCA Kit Agent and Skill Routing Map

**Purpose:** select the smallest set of roles, skills, and optional tools that can complete the user's actual task well. This is a shared routing policy, not a claim that every IDE can spawn agents automatically.

## Routing contract

For every meaningful task:

1. Understand the user's outcome, project context, scope, constraints, and whether "service" means a business/service offering or a software service.
2. Choose one accountable lead agent. Add specialists only for distinct work that improves the result.
3. Select only the relevant canonical skills in `.agents/skills/<name>/SKILL.md`. Read the selected files before relying on them. A name in a table is a route, not evidence that a skill was loaded.
4. Before substantial work, briefly tell the user which skills are selected and why, plus any optional tool worth considering. Do not expose a long internal plan for a trivial question or small fix.
5. If the task changes, re-route only the delta. Do not reload all skills or resend the entire conversation.
6. Before finishing, report skills actually read, tools actually used, verification actually run, and important unknowns.

## Role-to-skill map

| Role / responsibility | Primary skills | Conditional skills or tools |
|---|---|---|
| Lead / Task Router | `skill-gap-router`; apply `anti-hallucination` and `anti-ai-slop` guardrails | Add one specialist only when a separate domain is genuinely required |
| Product / UX Designer | `design-taste-discovery` | `frontend-engineering` when shaping implementable UI; service/product strategy has no dedicated canonical skill yet, so use an explicit task brief rather than claiming one exists |
| UI / Visual Designer | `design-taste-discovery`, `frontend-visuals-and-3d` | Optional Impeccable audit; Aceternity UI for a compatible React/Next.js component; Canvas UI for a real canvas/shader effect; Spline for a real 3D scene; VGPU for actual custom GPU/WebGPU work |
| Design Engineer / Frontend Engineer | `frontend-engineering` | `design-taste-discovery` for visual work; `frontend-visuals-and-3d` for justified advanced visuals; `testing-and-code-review` for meaningful changes |
| Python Engineer / Backend API | `python-engineering`, `backend-api` | `database-engineering` for persistence; `application-security` when auth, sensitive data, or trust boundaries change |
| Database Engineer | `database-engineering` | `backend-api` and `application-security` when API or permissions/data privacy are in scope |
| Security Engineer | `application-security` | Relevant domain skill plus `testing-and-code-review`; use approved scanners only when available |
| QA / Code Reviewer | `testing-and-code-review` plus the skill for the changed domain | `debugging` for a reproduced failure; use an independent verifier only when host support and risk justify it |
| DevOps / Release Engineer | `testing-and-code-review`; `application-security` for release/secret/access risks | `cloudflare-operations` only for a Cloudflare system; check actual CI, hosting, rollback and monitoring setup |
| Debugging / Incident Responder | `debugging` plus the affected domain skill | `cloudflare-operations` for relevant Cloudflare incidents; security skill if abuse or compromise is plausible |
| Documentation / Codebase Guide | `anti-hallucination` plus relevant domain skills | `frontend-visuals-and-3d` only if a codebase visualization tool genuinely helps; diagrams must be grounded in inspected source |
| Service / Business Strategist | No dedicated canonical business-strategy skill currently | Use a bounded task-specific framework: customer/problem, offer, delivery, costs, assumptions, risks, MVP and validation. Label estimates and assumptions. Propose a reusable skill separately if the capability becomes recurring |
| Repository / Architecture Explorer | `anti-hallucination` plus relevant domain skills | Understand Anything is an optional external codebase map, not proof; verify graph conclusions against source |

## Choosing how many agents to activate

- **Default: one lead agent.** It owns task understanding, user communication, skill selection, and final synthesis.
- **One specialist** when a distinct domain adds value (for example, visual design plus service strategy).
- **At most two specialist agents by default** for a cross-functional task. The lead is not counted in this specialist budget.
- Add a separate reviewer/verifier only for high-risk changes, release/security work, or when independent verification materially reduces risk.
- Parallelize only independent work, only when the active host supports real subagents, and only when parallelism saves more time/cost than it adds.
- Never claim a named agent was triggered when the host only supports one conversation or does not expose subagent dispatch. In that case, perform the role sequentially in the lead agent.
- Never create nested or recursive agents by default. No speculative "agent swarm".

## Upfront skill/tool suggestion

For substantial work, use a concise user-visible note, adapted to the user's language:

> **Skills selected:** `skill-name` — reason; `second-skill` — reason.
>
> **Optional tool:** tool name only if it solves a concrete part of the task; explain why and what simpler alternative exists.
>
> I’ll read these skills, inspect the project, and then proceed within the agreed scope.

Ask for approval before installing or persistently adding a third-party skill, plugin, package, or external service. Mentioning a tool in this map does not mean it is installed or run.

## Example: "Let's plan design and a service"

1. Clarify from context whether "service" means the business/customer offering or a software/API service. Do not ask again when the conversation already establishes the meaning.
2. If business/service offering: select `design-taste-discovery` for UI direction and a task-specific service strategy brief. On OpenCode, route to `@designer` and `@service-strategist`; on Cursor, use the native `.cursor/agents/designer.md` and `.cursor/agents/service-strategist.md` definitions so its Agent can delegate from the task and descriptions without the user typing `@`. If the host cannot dispatch, the lead performs both workstreams sequentially. Verify actual invocation; do not claim both agents ran simply because their files exist. Do not trigger backend, DevOps, QA or security specialists unless the scope needs them.
3. If backend service architecture: select `backend-api` and relevant `python-engineering` / `database-engineering`; bring the Designer in only if a UI is also requested.
4. Consider Impeccable/Canvas UI/Spline/VGPU only if their specific job is needed. Do not offer the whole tool list.
5. Produce a concise plan with requirements, assumptions, NOW/NEXT/LATER scope, acceptance checks, and estimated cost/benefit only where assumptions are explicit.

## Context and budget rules

- Read one relevant skill first; add another only when the task requires it.
- Do not inject every skill, full tool catalog, or entire chat history into every specialist. Send a compact brief with goal, decisions, constraints, relevant paths, deliverable and checks.
- Cache/reuse already-read skill content when the host permits. Do not reread unchanged files in the same task.
- Before optional subagent calls, use the local usage budget guard when configured and available. If the budget would be exceeded, stop optional calls and summarize the current state. Do not skip essential safety checks for token savings.
- Actual context-window occupancy and model token usage are available only when the active host/provider exposes them. Otherwise report unknown or a clearly labeled local estimate; never invent exact values.

## Canonical skill inventory

Currently present:
`anti-ai-slop`, `anti-hallucination`, `application-security`, `backend-api`, `cloudflare-operations`, `database-engineering`, `debugging`, `design-taste-discovery`, `frontend-engineering`, `frontend-visuals-and-3d`, `python-engineering`, `skill-gap-router`, `testing-and-code-review`.

Optional external resources/tools are not canonical installed skills by default.
