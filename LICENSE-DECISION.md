# License Decision Before npm Release

The public GitHub repository currently does not declare a license. Before publishing a distributable npm package, the repository owner should decide and add the intended license.

Do not assume MIT, Apache-2.0, or another license without the owner's decision. A public GitHub repository is not, by itself, a grant of broad reuse rights.

Once selected:
1. Add the complete standard license text as a root `LICENSE` file.
2. Set the matching `license` field in `package.json`.
3. Verify all contributed and third-party materials are compatible with that license.
4. Run `npm pack --dry-run` and confirm the license is in the tarball.
5. Publish only after the owner approves the final package.
