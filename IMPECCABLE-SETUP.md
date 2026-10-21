# Impeccable setup (OpenCode)

Impeccable is **not an AI-authorship detector**. It is a frontend design skill plus a deterministic UI anti-pattern detector. It flags known patterns such as generic AI-looking design defaults, contrast/accessibility problems, overflow, and design-system drift. It cannot reliably prove whether a human or AI wrote code.

## Install it in this project
From the project root (the folder containing package.json / src/), run:

    npx impeccable install

Choose **OpenCode** and **project** scope in the installer, then reload/reopen OpenCode. In OpenCode chat, run:

    /impeccable init

This captures product/audience context. For an existing project, review its design direction before asking for a redesign.

## Commands to use
Use the command names and syntax supported by the installed version:

    /impeccable
    /impeccable critique the current page
    /impeccable audit the current page
    /impeccable polish the current page
    /impeccable distill the current page

## Run the deterministic detector (no LLM required)

    npx impeccable detect src/

Or scan a running local page:

    npx impeccable detect http://localhost:3000

For mobile layout checks:

    npx impeccable detect --viewport 390x844 http://localhost:3000

Use the actual dev-server URL and source directory that exist in this project. Do not claim a scan passed unless you ran it and saw its result. Review each finding; do not blindly remove intentional brand choices just to get zero findings.

## Suggested project workflow
1. Implement the requested UI with the existing stack and design system.
2. Run the project's lint/typecheck/tests that are available.
3. Run npx impeccable detect <actual-target> for UI changes.
4. Fix valid findings, document intentional exceptions with a reason, and re-run the detector.
5. Report the actual result, including unresolved findings.

## Boundaries
- The detector is a design quality / known-pattern detector, not an AI-writing detector or plagiarism checker.
- Deterministic checks can run without an LLM/API key, but /impeccable design guidance still uses the coding agent/model.
- A clean scan does not prove a page is perfect; a finding does not automatically mean the design is wrong.
- Do not invent commands, detector results, browser observations, or tool support.
- Official docs: https://impeccable.style/docs/detector/ and https://impeccable.style/docs/hooks/
