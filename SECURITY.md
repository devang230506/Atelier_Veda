# Security review

Review date: 28 October 2026

## Scope and findings

- Reviewed the Next.js routes, shared components, project content, form behavior, runtime configuration, and dependency manifest.
- No authentication, API routes, server actions, file uploads, database writes, or persisted form submissions are present in this demo. The contact form only shows a local confirmation and clears its fields.
- Added a Content Security Policy and standard browser security headers in `next.config.ts`. The policy allows only the app itself plus the Google Fonts and Unsplash hosts used by the current design. Development mode allows `unsafe-eval` for the development toolchain; production does not.
- Added automated type-check, production build, npm vulnerability audit, CodeQL, and pull-request dependency review workflows in `.github/workflows/ci-security.yml`. CodeQL and dependency review run on public repositories; private repositories need GitHub Advanced Security before those upload/report actions can run.
- `npm audit` completed against the npm advisory registry: 0 known vulnerabilities across 142 dependency entries at review time. This result will age, so the CI audit and weekly Dependabot updates are the ongoing checks.
- Checked the current Next.js maintainer advisories separately. The pinned `next@16.4.3` is newer than the fixed `16.4.1` for the October critical advisories; the app also has no `images.remotePatterns`, which the maintainer lists as the SSRF exposure condition. This does not replace a full npm audit of transitive dependencies.

## Non-security runtime note

- The browser console reports a `THREE.Clock` deprecation from the installed `@react-three/fiber@9.8.2`. The room still builds and renders. The current library release uses the deprecated Three.js clock internally; do not patch or suppress the vendor warning. Recheck this when a stable compatible Fiber release migrates to `THREE.Timer`.

## Before enabling production deploys

1. Push the project to GitHub and protect `main`. Require the successful quality/security checks shown in the Actions UI before merging.
2. In GitHub repository settings, add the `production` environment. Add approval rules if deployments need a human release check.
3. Add the `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` repository secrets.
4. Set the repository variable `ENABLE_VERCEL_DEPLOY` to `true` to enable production deployment after successful CI and CodeQL checks.
5. Use one deployment owner. If Vercel Git integration already deploys the `main` branch, disable one of the two deployment paths to avoid duplicate releases.
6. Run a dependency audit in CI and resolve any high or critical findings before release. Also enable GitHub secret scanning and push protection if the repository plan supports them.

Dependabot is configured to propose weekly npm and GitHub Actions updates. Review and merge those updates to keep pinned application dependencies and workflow actions current.

## Remaining launch risks

- Images and font styles are requested from Unsplash and Google Fonts. Those providers receive normal browser requests. Self-host approved media and fonts if the launch privacy requirements need fewer third-party requests.
- The contact form is intentionally a demo and does not transmit enquiries. Before connecting a provider, add server-side validation, abuse limits, spam protection, and a privacy notice that matches the actual data flow.
- Replace illustrative project copy and confirm the legal operator, contact details, and policy wording before treating the site as a live studio service.
- HTTP security headers are application-level controls. The hosting account, custom domain, DNS, TLS, environment variables, access controls, backups, and production monitoring still need an owner-side review.
