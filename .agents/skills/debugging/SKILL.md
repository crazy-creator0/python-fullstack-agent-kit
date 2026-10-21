---
name: debugging
description: Investigate bugs using reproducible evidence, ranked hypotheses, root-cause analysis, and regression prevention.
---

# Debugging Playbook

Always follow:

**Symptom → Investigate → Hypothesis → Evidence → Root cause → Fix → Prevention**

## 1. Symptom
Write expected versus actual behavior, reproduction steps, frequency, scope, and impact.

## 2. Investigate
Request the smallest useful evidence: relevant code, sanitized logs/traceback, browser console/network details, HTTP status, environment and versions, recent changes, and reproduction steps. Never ask for secrets.

## 3. Hypothesis
List plausible causes in priority order. For each, state what evidence would support or reject it.

## 4. Evidence
Use a minimal reproduction, targeted logging, a test, or one controlled change at a time. Inspect the actual outputs.

## 5. Root cause
Separate observed facts from inference. If not confirmed, say "root cause not yet confirmed" and identify the next experiment.

## 6. Fix
Prefer the smallest durable correction. Explain why it addresses the cause and what trade-offs it introduces.

## 7. Prevention
Add a regression test, validation, monitoring, safer configuration, or documentation as appropriate. Re-run the original reproduction and relevant tests.

## Trace by layer
Browser/UI → router → client API → network/DNS/TLS → backend route → middleware → auth → validation → service → database → response → rendering.
Use only layers that exist. For Cloudflare-related failures, separately examine DNS/proxy, edge rules/cache/Worker, origin connectivity/TLS, application logs, and database health.

## Output format
- Symptom
- Evidence available / missing
- Ranked hypotheses
- Investigation steps
- Root cause status
- Fix
- Verification results
- Prevention

Do not recommend random config changes, blanket cache purges, disabling TLS/security, or broad rewrites without evidence.
