# UCA Kit Task-to-Skill Map

Use only when routing is ambiguous or work crosses domains. For an obvious small task, skip the map and open the relevant skill directly. Core rules live in root `AGENTS.md`.

| Task | Read first | Add only when relevant |
|---|---|---|
| Greeting/simple question | None | Ask what help is needed; no project scan or edits |
| Python change | `python-engineering` | Backend/database/security if affected |
| Backend/API | `backend-api` | `python-engineering`, `database-engineering`, `application-security` by boundary |
| Frontend/UI | `frontend-engineering` | `design-taste-discovery` for visual decisions; `frontend-visuals-and-3d` only for real advanced 3D/canvas/GPU work |
| Bug | `debugging` | Skill for the affected domain |
| Database/schema | `database-engineering` | Backend/security for API, access, or privacy boundaries |
| Auth/security/privacy | `application-security` | Relevant implementation skill + `testing-and-code-review` |
| Review/testing | `testing-and-code-review` | Affected domain skill; independent reviewer only if risk justifies it |
| Release/deployment | `testing-and-code-review` | `application-security`; `cloudflare-operations` only for Cloudflare |
| Existing-stack migration | `.agents/workflows/stack-migration.md` | `anti-hallucination`, `anti-ai-slop`, `testing-and-code-review`, plus affected domain skills |
| Ambiguous task or missing capability | `skill-gap-router` | Only the relevant domain skills |
| Design + business/service offer | `design-taste-discovery` | Task-specific strategy brief; there is no dedicated canonical business-strategy skill |
| Documentation/codebase explanation | `anti-hallucination` | Domain skill only when source behavior needs analysis |

Actually open each selected `.agents/skills/<name>/SKILL.md` before relying on it. A path or mention does not prove a skill was loaded. Do not invent capabilities when a skill/host feature is absent.

## Agent and context budget
- One lead by default. At most two specialists by default for genuinely distinct cross-functional work; no agent swarm/nested agents.
- Delegate or parallelize only if the active host supports it and the benefit outweighs cost. Otherwise work sequentially.
- Give specialists a short brief: goal, constraints, relevant paths, deliverable and checks. Reuse conclusions; do not send all skills or the entire chat history.
- For substantial work, briefly tell the user which skills were selected and why. Report only skills/agents actually used.

## Conditional guidance
- Context loss: recover current files and durable project records; never invent missing decisions or create files merely to fill memory gaps.
- Host feature uncertain: consult `HOST-CAPABILITY-FALLBACK.md` only then.
- Usage/privacy: exact values require host/provider metadata; otherwise mark unknown/estimated. Consult `USAGE-PRIVACY.md` when needed.
- Existing stack change: inspect current state, compare keeping/changing/incremental alternatives, plan compatibility/data/operations/rollback, and obtain approval for high-impact scope unless explicitly authorized. Use the migration workflow.
- Optional tools/third-party skills are not assumed installed. Inspect and ask before persistent installs.

Canonical skills: `anti-ai-slop`, `anti-hallucination`, `application-security`, `backend-api`, `cloudflare-operations`, `database-engineering`, `debugging`, `design-taste-discovery`, `frontend-engineering`, `frontend-visuals-and-3d`, `python-engineering`, `skill-gap-router`, `testing-and-code-review`.
