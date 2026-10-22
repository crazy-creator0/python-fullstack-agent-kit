# Analysis Depth, Loophole Checks, and Honest Token Usage

This guide explains what UCA Kit is designed to do for a task, how it checks for likely gaps, and what it can honestly report about tokens and cost.

## The honest promise

UCA Kit provides a repeatable process, task-specific skill guidance, and verification habits. It does **not** make every model smarter, guarantee exhaustive analysis, or prove that every instruction file was loaded just because it exists.

A capable model can do excellent analysis without a skill. A skill cannot guarantee a perfect result. The practical benefit is that relevant skills make useful checks more explicit and repeatable, while the routing rules reduce unnecessary context, unrelated specialists, and wasted work.

**Page count is not a measure of analysis depth.** A focused answer can be correct in one page; a long answer can still miss the important failure mode. Depth should be judged by evidence inspected, risks evaluated, and checks performed.

## How deep should the analysis go?

Use the lightest level that meets the risk and scope. These levels are a routing guide, not a claim that the host automatically enforces a fixed workflow.

| Level | Typical task | Expected approach |
|---|---|---|
| **D0 — Conversation** | Greeting, vague request, simple explanation | Reply normally or ask what help is needed. Do not scan the project, load skills, or dispatch agents without a task. |
| **D1 — Focused** | Small typo, isolated question, one-file change | Inspect the relevant context, make a focused response/change, and run a proportionate check if applicable. |
| **D2 — Feature / bug** | New feature, bug fix, API/UI change | Trace the relevant code path and dependencies, read only relevant skills, check requirements and edge cases, assess regressions, and run applicable tests. |
| **D3 — Cross-cutting / high risk** | Auth, permissions, sensitive data, schema migration, payment, release, major architecture | Trace system boundaries and failure paths; use the relevant security/data/reliability skills; review rollback and compatibility; test high-risk scenarios; add independent review only when it provides real value. |
| **D4 — Explicit audit** | User asks for a security, architecture, reliability, or broad loophole audit | Define the audited scope, inspect it systematically, classify findings by severity and evidence, document exclusions and unknowns, and state what was not tested. Do not imply the entire system was audited if only part was accessible. |

Move up a level when evidence reveals more risk or a broader dependency. Move down or stop when the task is narrow and acceptance checks are met. Do not inflate a greeting or a simple question into a repository audit.

## The analysis loop

For substantial work, the lead agent should use this loop and repeat only the steps needed to resolve a real issue:

1. **Frame the outcome.** Restate the goal, constraints, acceptance criteria, and what is out of scope. Resolve important ambiguity or state a reasonable assumption.
2. **Inspect the actual project.** Identify the stack, relevant files, architecture, dependencies, existing patterns, and available tests. Start with relevant paths; broaden inspection only when the dependency graph or risk calls for it.
3. **Route skills deliberately.** Consult [the agent/skill routing map](AGENT-SKILL-MAP.md). Tell the user which skills are relevant before substantial work, then actually read those `SKILL.md` files. Add a skill when a newly discovered domain needs it; do not load the entire catalogue.
4. **Trace the change.** Follow likely entry points, data flow, interfaces, configuration, persistence, permissions, external services, and downstream callers. Separate what source code proves from assumptions.
5. **Check likely loopholes.** Use the checklist below as a prompt, not as proof that each category was fully audited.
6. **Rank findings.** Record evidence, triggering scenario, impact, severity, confidence, and a practical mitigation. Prioritize issues that can cause harm or break acceptance criteria.
7. **Change and verify.** Make the smallest coherent change, inspect the diff, and run relevant tests or checks where the environment supports them.
8. **Close the loop.** If a check fails or exposes a gap, investigate and repeat the affected portion. Finish with checks actually run, remaining risks, and unresolved unknowns.

Use one accountable lead by default. A cross-functional task can use at most two specialist agents by default; use more only when scope and risk justify the added cost. If the host cannot dispatch real subagents, perform specialist work sequentially. A file defining an agent is not proof that the agent ran.

## When session context is missing or has drifted

A new session may not contain earlier decisions, constraints, file edits, or user preferences. **Do not fill those gaps by inventing a plausible story.** The current repository and verifiable artifacts are the source of truth for repository state; prior chat is only evidence when it is actually available.

Use this recovery protocol before making meaningful changes after a context reset, summary handoff, or a contradiction between memory and the workspace:

1. **Pause edits.** Do not immediately "continue where we left off" based on a vague recollection.
2. **Recover durable evidence.** Inspect the current branch and working-tree status where available; examine the relevant files and their current contents; review recent diffs/commits and existing README, issue, plan, decision log, tracker, or work log when those already exist and are relevant.
3. **Rebuild the task state.** Separate confirmed facts, decisions supported by durable records, assumptions, and unknowns. Do not treat an earlier model-generated summary as stronger than the current source or an explicit user instruction.
4. **Check before creating files.** Search for an existing equivalent, inspect naming/layout conventions, confirm the task requires a new persistent file, and state the intended path and purpose in the plan. A remembered filename is not proof the file is missing, needed, or safe to recreate.
5. **Handle important missing decisions safely.** If the missing detail affects architecture, destructive edits, data integrity, privacy/security, cost, or acceptance criteria, ask one focused question. If it is low impact, state a conservative assumption and continue with the smallest reversible change.
6. **Plan the smallest change.** List the intended files and why each must change. Do not create extra plans, helpers, docs, migrations, or components merely to compensate for uncertainty.
7. **Verify after recovery.** Re-check the diff and generated files, run relevant available tests, and report what was recovered from evidence versus assumed or left unknown.

If the working tree has user changes or files disappeared unexpectedly, do not overwrite, delete, or recreate them to make the project match an old summary. First investigate the discrepancy. Treat current user edits as intentional unless there is evidence otherwise.

### Practical context-recovery note

A concise update to the user may say: "I don't have reliable evidence for the earlier decision. I'll inspect the current files and recent changes first; I'll ask before making any irreversible or scope-changing assumption." Do not repeatedly ask the user to restate details that can be recovered from the repository.

## Loophole checklist

Select the categories that apply to the task. A tiny documentation correction does not need a full security audit; a permission change does.

| Area | Questions to check when relevant |
|---|---|
| Requirements and scope | Are acceptance criteria testable? Are assumptions, exclusions, and ambiguous terms clear? |
| Inputs and boundaries | What happens with empty, malformed, oversized, duplicated, or unexpected input? Are inputs validated at the correct boundary? |
| Error paths | What if a file, API, database, model, or external dependency is missing, slow, unavailable, or returns an error? Are errors actionable and safe? |
| Auth and security | Can an unauthorized user reach the operation? Are permissions checked server-side? Are secrets, injection, trust boundaries, and unsafe defaults considered? |
| Privacy | Is sensitive information logged, stored, exposed to the model, or sent to a third party? Are retention and access appropriate? |
| Data and migrations | Are constraints, data integrity, existing records, backfills, rollback, and schema compatibility covered? |
| State and concurrency | Could retries, duplicate requests, parallel operations, race conditions, partial writes, or non-idempotent actions create problems? |
| Dependencies and integrations | Are API contracts, versions, timeouts, rate limits, authentication, and degraded behavior handled? |
| UI and accessibility | Are loading, empty, error, and success states covered? Is keyboard/screen-reader behavior relevant? Does responsive behavior matter? |
| Performance and cost | Is there evidence of a bottleneck? Could loops, queries, retries, model calls, or payload growth multiply cost? Do not invent performance numbers. |
| Tests and regressions | Do tests cover the changed behavior and realistic failure cases? Could existing callers or behavior break? |
| Operations | Are logs/metrics useful without leaking secrets? Are deployment, rollback, backups, alerts, and recovery relevant? |
| Documentation and usability | Can the next person understand the change, assumptions, setup, limitations, and recovery steps? |

### Reporting a suspected loophole

Use this compact structure:

- **Finding:** what may be wrong and where it occurs.
- **Evidence:** file/line, observed behavior, test output, or source supporting the claim.
- **Scenario and impact:** how it could fail and who/what is affected.
- **Severity:** Critical / High / Medium / Low, with a short reason.
- **Confidence:** Confirmed / Likely / Needs verification.
- **Mitigation and check:** the smallest useful fix and how to test it.

Do not label a hypothetical risk as a confirmed bug. Do not manufacture findings merely to fill every checklist row. State “not checked” or “not applicable” where appropriate.

## What does “all loopholes checked” actually mean?

It does **not** mean every conceivable problem is found. The model can miss code paths, hidden runtime behavior, undocumented requirements, concurrency bugs, provider behavior, or flaws that only appear in production. A test suite can also be incomplete or pass while a requirement is still wrong.

A responsible report distinguishes:

- **Verified:** backed by inspected source, reproducible behavior, or actual test/check output.
- **Likely risk:** a credible failure mode that needs a targeted test or more evidence.
- **Unknown / not checked:** the necessary environment, logs, access, data, or test was unavailable.
- **Out of scope:** intentionally not reviewed for this task.

An audit is only as broad as the files, requirements, environment, and checks that were actually in scope. For a high-impact deployment or security review, use independent testing and appropriate human review rather than relying on the model alone.

## Will UCA Kit analyse more deeply than a quick answer without skills?

Potentially, and more consistently—but there is no guaranteed multiplier in depth or quality.

Without routing/skills, a model may answer directly based on the prompt and available context. It may still perform a deep analysis, or it may omit checks the prompt did not make salient. With UCA Kit, the task is routed to relevant checklists and project evidence, likely risk categories are made explicit, and the final report is expected to distinguish verified results from unknowns. Actual behavior still depends on the model, host, project access, prompt, and whether the files were truly loaded and followed.

UCA Kit should not automatically read every file or invoke every agent. That would waste context and could actually obscure the important details. It should expand inspection only when the scope, evidence, or risk requires it.

## Honest token and cost reporting

There is no truthful universal token count for “a feature”, “a two-page answer”, or “using one skill.” Token usage depends on the model and provider, prompt and source size, conversation history, tool results, skill contents, context reuse/caching, output length, and whether specialist calls occur. Skills themselves consume context when read; agents and extra review can add usage. Avoiding irrelevant skills and redundant agents can reduce waste, but the total may still be higher than a direct one-shot answer because meaningful verification takes work.

### What can be reported?

| Metric | Honest reporting rule |
|---|---|
| Input/output tokens | Report as **host-reported/exact** only if the active host exposes the number for the relevant usage. “Exact” means supplied by that host; UCA Kit does not independently audit the provider's internal accounting. |
| Tokens without usage metadata | Say **unknown**. A rough estimate must be labelled estimated and must not be presented as an observed count. |
| Dollar cost | Use the provider/host-reported value with its source and caveat, or mark it estimated/unknown. It is not necessarily an invoice amount. UCA Kit does not guess the model, rate, caching discount, plan credits, or exchange rate. |
| Agent calls, skill reads, tool calls | Report only counts actually observed by the integration or entered manually. A count is not itself a token count. |
| Context-window occupancy | Do not infer it from cumulative token totals; these are different measures. |
| Budget enforcement | Claim a hard block only if the active host actually calls the guard before the relevant operation and honors the result. Otherwise it is a warning/manual check. |

### Current UCA Kit integration status

- **Local usage ledger:** `scripts/uca-usage.cjs` stores aggregate counters in `~/.uca-kit/usage.json` by default. It does not know about unreported provider usage.
- **OpenCode:** the included plugin records supported finalized-message token metadata, keeps the host-reported `info.cost` in the **estimated** cost bucket, and checks configured budgets before supported task/subagent calls. The event behavior is simulated in CI; a real installed OpenCode session still needs verification.
- **Other IDEs:** automatic capture is not currently provided by this generic ledger. Use a host-specific integration where available or enter measured values manually; otherwise report usage as unknown.
- **Budget guard:** planned agent usage/cost are reservation assumptions, not guarantees. A guard cannot intercept a host that never calls it, and concurrent unreserved calls can race.
- **Privacy:** the ledger is local-only and records aggregate counters, not prompts or source code. This does not stop a hosted AI provider from receiving the prompt/code sent to it. See [USAGE-PRIVACY.md](USAGE-PRIVACY.md).

Commands from an installed project:

```bash
# View only what the local ledger has recorded
node scripts/uca-usage.cjs show

# Record host-exposed numbers as exact token counts; cost remains separately marked estimated here
node scripts/uca-usage.cjs record --source exact --input-tokens 1200 --output-tokens 350 --cost-source estimated --cost-usd 0.015

# Record a clearly labelled approximation if no exact usage event is available
node scripts/uca-usage.cjs record --source estimated --input-tokens 1500 --output-tokens 400
```

The example numbers above are illustrative only, not a benchmark or a prediction of UCA Kit's real token consumption. Do not run an example record as if it were actual usage.

## Completion report template

For a substantial task, conclude with a report like this—fill it only with observed facts:

```text
Analysis depth: D1 / D2 / D3 / D4
Scope inspected: [paths, flows, or components actually checked]
Skills actually read: [names, or none]
Agents actually used: [names, sequential roles, or none]
Likely loopholes checked: [applicable categories]
Findings: [confirmed / likely / unknown / none found in checked scope]
Verification run: [commands/tests and actual result]
Not verified / out of scope: [specific limitations]
Usage: [host-reported input/output tokens, or unknown/estimated]
Cost: [source-reported, estimated, or unknown]
Follow-up: [only if needed]
```

“No findings in the checked scope” is a more accurate claim than “no loopholes exist.” Report exact usage only when a source exposed it; otherwise say unknown or estimate clearly.