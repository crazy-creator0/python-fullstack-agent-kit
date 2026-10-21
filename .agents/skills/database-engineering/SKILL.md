---
name: database-engineering
description: Design safe schemas, migrations, transactions, constraints, indexes, and reliable data access.
---

# Database Engineering

## Design
- Inspect the existing database, ORM, schema conventions, and migrations before changing data structures.
- Model entities and relationships from actual requirements; avoid speculative tables and fields.
- Use appropriate primary keys, foreign keys, nullability, uniqueness, and check constraints.
- Normalize by default; denormalize only for a measured and explained reason.
- Represent money, time zones, and identifiers with suitable types. Store times consistently and make display conversions explicit.

## Queries and transactions
- Use the project's ORM safely or parameterized SQL; never concatenate untrusted input into SQL.
- Inspect query count and execution plans when performance is a concern.
- Add indexes for measured or predictable access patterns while considering write cost.
- Use transactions for operations that must succeed or fail together.
- Plan concurrency behavior and use constraints/locking/atomic updates when races matter.
- Paginate unbounded result sets and avoid N+1 query patterns.

## Migrations and operations
- Make migrations reviewable, reversible where practical, and compatible with deployment order.
- For destructive changes, confirm backups, rollback strategy, and explicit approval.
- Never test destructive migration steps against production data without authorization.
- Keep credentials out of code and logs; use least-privilege database accounts.
- Verify migrations against a disposable or staging database when available.

## Report
Explain schema choices, data-loss risks, query behavior, migration steps, checks actually run, and anything not verified.
