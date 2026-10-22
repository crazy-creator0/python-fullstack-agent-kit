---
name: frontend-engineering
description: Build accessible, responsive frontends with robust API integration, clear states, and measured performance.
---

# Frontend Engineering

## Inspect first
Identify the actual framework, routing, component and styling conventions, design system, package scripts, test setup, and API contracts. Keep the current stack unless a change is justified.

## Implementation
1. Confirm user-visible behavior and acceptance criteria.
2. Inspect existing components, styles, routing, package scripts, and test setup.
3. Build one vertical slice with loading, success, empty, and error states as relevant.
4. Keep UI components focused; move shared behavior into hooks/utilities only when useful.
5. Validate inputs on the client for usability, but never treat client validation as server-side security.
6. Handle asynchronous operations, cancellation/races, and duplicate submissions where relevant.
7. Use semantic HTML, keyboard access, visible focus, labels, and appropriate contrast.
8. Avoid unnecessary dependencies and global state.
9. Test important behavior and verify responsive layouts.

## API integration
- Use explicit API base configuration per environment.
- Handle non-2xx responses, network failures, and malformed responses.
- Do not put server secrets in browser-exposed variables or bundles.
- Align request/response types with the backend contract.
- Treat CORS as a server/browser policy, not authentication.

## Performance and design quality
Measure before optimizing. Inspect bundle size, large assets, unnecessary renders, waterfall requests, caching, and rendering strategy. Avoid premature memoization. For UI changes, use the existing design system and, if installed, Impeccable for critique/audit and deterministic checks. Do not claim a detector was run unless its output was actually observed.

When the task specifically calls for advanced UI components, canvas effects, 3D, WebGPU, or large-codebase visualization, read `.agents/skills/frontend-visuals-and-3d/SKILL.md` and `UI-AND-CODEBASE-TOOLS.md`. Choose one appropriate resource rather than adding every tool. Never install a third-party package or persistent skill automatically.

## Review checklist
Correct states, accessibility, responsive behavior, type safety, API failure handling, secret exposure, tests, and maintainability.
