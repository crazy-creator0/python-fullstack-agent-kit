# Optional UI, 3D, WebGPU, and Codebase Tools

This guide records the references shown in the kit's design inspiration examples. They are **optional resources**, not mandatory dependencies. The coding agent must inspect the project's framework, requirements, performance budget, licensing needs, and browser targets before recommending one.

## Tool selector

| Tool | Best fit | Official starting point |
|---|---|---|
| Aceternity UI | React/Next.js interfaces needing polished components, landing-page sections, motion, cards, and visual effects | https://ui.aceternity.com/components |
| Canvas UI | Canvas-based visual effects, shader effects, fluid/ripple/particle treatments, and WebGL/WebGPU experiments across frameworks | https://canvasui.dev/docs |
| Spline | Interactive 3D scenes, 3D hero visuals, model animation, and event-driven web experiences | https://docs.spline.design/ |
| VGPU (Vercel Labs) | Lower-level TypeScript/WebGPU rendering, WGSL module composition, custom shader/compute work, and headless rendering/testing | https://vgpu.labs.vercel.dev/ |
| Understand Anything | Exploring a large or unfamiliar codebase as an interactive knowledge graph, with search and architecture explanations | https://github.com/Egonex-AI/Understand-Anything |

## Selection rules

### Aceternity UI
Choose it when the existing app is already React/Next.js and the requested component matches the design direction. Prefer small, focused component additions over adopting an entire template. Check component prerequisites (such as Tailwind CSS and Motion), copy the actual source, inspect the resulting code, and preserve accessibility, responsive behavior, and the current design system. Review license/pricing terms for any paid blocks or templates before using them.

### Canvas UI
Choose it for an effect that genuinely benefits from canvas rendering or shader-based distortion. Prefer a simpler CSS/SVG solution when that meets the brief. The docs describe both WebGL and WebGPU builds. Some html-in-canvas effects rely on an experimental browser capability; read the current browser-compatibility and fallback notes, preserve usable semantic HTML, and test a non-supporting browser path before shipping.

### Spline
Choose it when the design calls for a designed, animated 3D scene or interactive 3D element rather than a static illustration. Inspect the scene's asset weight, loading behavior, licensing/export constraints, mobile performance, reduced-motion behavior, keyboard/touch usability, and fallback. Use the official Spline docs or React integration docs for the stack actually in the project. Do not add the Spline runtime unless a real scene is being used.

Official React integration: https://github.com/splinetool/react-spline

### VGPU
Choose it when there is a concrete need for programmable WebGPU rendering, WGSL modules, compute work, or GPU-focused tests—not simply because a website could look more modern. Consult the docs for the current package version and browser/Node support. WebGPU availability, GPU adapters, shader validation, and runtime support are not universal; design and test a graceful fallback.

Official source: https://github.com/vercel-labs/vgpu

The VGPU maintainers publish an optional agent skill. If the project needs that integration, inspect the current skill source and install it only after the user approves the persistent change. The upstream docs currently advertise:

```bash
npx skills add vercel-labs/vgpu
```

Do not run that install automatically; check the official docs and current command flags first.

### Understand Anything
Treat this as an optional codebase-understanding tool for large, unfamiliar, or architecturally complex repositories. It is not a UI component library and is not required for ordinary tasks. It can help surface component relationships and architecture, but its generated graph is a map—not proof. Confirm conclusions by reading the actual source files and running relevant checks.

Official source and install options: https://github.com/Egonex-AI/Understand-Anything

Review the current official installer, prerequisites, supported agent platforms, permissions, and files it creates before using it. Do not automatically pipe a remote script to a shell, replace user configuration, or install its agents/skills without explicit approval.

## Use them in this order

1. **Inspect:** identify the actual framework, dependencies, design system, tests, accessibility requirements, and browser targets.
2. **Match:** select the smallest relevant resource above. Do not suggest all five for every UI task.
3. **Verify:** read official documentation/source for the current versions, install commands, compatibility, and license terms.
4. **Ask before adding:** explain the package or persistent skill being added and the files it will change. Do not install third-party code without approval.
5. **Implement a small slice:** integrate one component/effect/scene, with loading and fallback states where applicable.
6. **Measure and review:** check bundle impact, runtime performance, reduced motion, accessibility, supported browsers, and tests.
7. **Report honestly:** state what was added, the source, checks actually run, and remaining compatibility risks.

## No framework lock-in

If the app is not React/Next.js, do not force Aceternity into it. Canvas UI documents React, Solid, Preact, Vue, Svelte, and vanilla TypeScript choices. Spline offers multiple web integration paths. Choose based on the existing stack and current docs, not on which demo looks the flashiest.

## Protect the product design

These visual references are inspiration and optional tools, not permission to copy an entire site or abandon the user's design system. Build a consistent experience for the product and its audience. Motion and 3D should support the content, remain responsive, and degrade gracefully.
