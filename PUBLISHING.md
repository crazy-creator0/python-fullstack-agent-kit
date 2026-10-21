# Publishing the npx Installer

The CLI package source lives in this repository. Public npm publishing has **not** been performed by this repository update; it needs the package owner's npm account and authentication. Do not tell users that the `npx` command is live until the registry shows a published version.

## Package details

- Package name: `create-python-fullstack-agent-kit`
- Initial version in `package.json`: `0.1.0`
- Binary command: `create-python-fullstack-agent-kit`
- Runtime dependencies: none
- Minimum Node.js version: 18
- Public repository: https://github.com/crazy-creator0/python-fullstack-agent-kit

## Before publishing

1. **Confirm package-name availability** in npm. Run `npm view create-python-fullstack-agent-kit name`. If the package already exists, inspect its ownership and choose another name or scoped package; do not overwrite another owner's package.
2. Decide and add an explicit project license if this kit is intended to be used as open-source software. The GitHub repo currently has no license specified; don't assume MIT or any other license without the owner's decision.
3. Review all template files, package contents, and npm metadata. Do not include private keys, secrets, private project content, or unreviewed files.
4. Use Node.js 18+ and npm. Run:

   ```bash
   npm run check
   npm pack --dry-run
   ```

5. Install the produced tarball into a clean temporary project and exercise at least the generic and one platform-specific profile. Confirm that existing project instructions are preserved by default.
6. Review the output and version one last time. A published version cannot be overwritten with different contents.

## Publish manually

On the package owner's machine, after name/license/metadata review:

```bash
npm login
npm whoami
npm publish --access public
```

Complete any authentication or 2FA challenge in the owner's terminal. Never share an npm password, token, OTP, or `.npmrc` with an assistant.

The package's `prepublishOnly` script runs checks before publishing. After publication, verify the registry entry:

```bash
npm view create-python-fullstack-agent-kit version
```

Then test the user experience from a disposable project:

```bash
npx create-python-fullstack-agent-kit@latest init . --platform generic --dry-run
npx create-python-fullstack-agent-kit@latest init . --platform generic
```

The package has to be published successfully before these public `npx` commands can work by package name.

## Versioning

- Bug fixes and small compatible installer changes: increment patch version.
- Compatible new features: increment minor version.
- Breaking CLI or template behavior: increment major version.

Never reuse a published `name@version`. Run the tests, inspect `npm pack --dry-run`, update the version, and publish a new version.

## Recommended release verification

Verify all of the following after publishing:
- npm shows the expected repository URL, package version, and license metadata.
- The package tarball contains the expected CLI, root instructions, platform adapters, all intended skills, and workflows.
- `npx create-python-fullstack-agent-kit@latest --help` works on a clean machine.
- `npx create-python-fullstack-agent-kit@latest init /tmp/example --dry-run` reports the expected actions without writing.
- A real install into a disposable project preserves pre-existing files and writes the chosen platform adapter.
