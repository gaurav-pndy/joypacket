# Releasing joypacket

## One-time setup

1. Create the GitHub repository and push this project.
2. Package metadata (`author`, `repository`, `homepage`, `bugs`) is filled in
   for https://github.com/gaurav-pndy/joypacket. Put your full name in the
   `LICENSE` copyright line if you prefer.
3. Create an npm account, enable 2FA, then create an **automation** access
   token and add it to the repo as the secret `NPM_TOKEN`.
4. In the repo settings, set **Pages -> Source** to **GitHub Actions**.

## Every release

1. Move the `[Unreleased]` notes in `CHANGELOG.md` under a new version heading.
2. `npm version <patch|minor|major>` (updates `package.json` and tags).
3. `git push --follow-tags`.
4. Create a GitHub Release from the tag. The `Release` workflow runs the
   checks and publishes to npm with provenance.

To publish by hand instead: `npm login && npm publish`
(`prepublishOnly` runs typecheck, tests and the build first).

## Before the first publish

```bash
npm run typecheck && npm test && npm run build
npm publish --dry-run     # shows exactly which files go out
npm pack                  # try the tarball in a fresh app
```

## Versioning

While below 1.0.0, breaking changes bump the **minor** version.
