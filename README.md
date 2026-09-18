# Frontier Towers Website

## Tech Stack
- HTML5
- CSS3
- Vanilla JavaScript

## Running Locally

Open the project in VS Code.

Recommended:
VS Code Live Server extension.

Then open:
http://127.0.0.1:5500/

## Branches

main = production branch

This branch, `feature/production-readiness-hardening`, contains the client-readiness hardening pass. It is intentionally not merged to `main`.

Create feature branches for development.

Examples:
- feature/careers
- feature/services
- fix/mobile-menu
- fix/responsive

## Workflow

1. Pull latest `main`
2. Create a scoped feature or fix branch
3. Make changes and verify the complete navigation flow
4. Test the site at desktop and mobile widths
5. Commit and push the branch
6. Open a Pull Request for review
7. Confirm client-owned values in `CLIENT_CONFIRMATION.md`
8. Merge only after content, form routing, map pin and logo permissions are approved

## Content and integrations

- `site-data.js` is the single place for public contact values and the optional form endpoint.
- With no form endpoint configured, the contact form prepares an honest email draft rather than claiming a submission.
- The homepage service catalogue is a native horizontal scroller; its buttons are progressive-enhancement controls and each card is a normal anchor.
- The contact service select has static fallback options and is synchronized from `services-data.js` when JavaScript is available.
- `404.html`, `robots.txt` and `sitemap.xml` are included for launch hygiene.
- Current imagery remains externally hosted on Unsplash; preserve those URLs unless a technical defect requires a non-content change.
- Vercel production behavior should be verified after deployment, including the HTTP 404 response for `404.html`.

## Services architecture

The current catalogue contains exactly 20 public service offerings. The canonical ordered data model is [services-data.js](services-data.js); static HTML cards remain in `index.html` and `services.html` so the catalogue works without JavaScript.

1. FLM Managed Services
2. Operations & Maintenance
3. Site Security Services
4. DG Overhauling Services
5. Rental DG Services
6. Solarization & End-to-End Installation
7. Commercial Power Services
8. EPA & Jurisdiction Approvals
9. Site Dismantling
10. Supply Chain Management
11. Telecom Implementation
12. Technical Site Audit Services
13. Site Construction Services
14. Site Development
15. Civil Works & Implementation
16. Technical Installations
17. Installation & Data Connectivity
18. Network Expansions
19. Commissioning & Integration
20. Remote Monitoring System

The homepage uses native horizontal scrolling with calculated previous/next buttons. The directory page provides a complete responsive grid, and each service lives at `services/<slug>.html` with breadcrumbs, metadata, structured data, related links and a contact CTA. See [MIGRATION_NOTES.md](MIGRATION_NOTES.md) before changing legacy service URLs.

To add a service, update `services-data.js`, add the static homepage and directory anchors, create a matching detail page, update the sitemap, and add any unresolved business details to `CLIENT_CONFIRMATION.md`.

## Deployment and maintenance

- Keep the production domain and sitemap reference in `robots.txt` aligned with `https://frontiertowers.com.pk/`.
- Review [MIGRATION_NOTES.md](MIGRATION_NOTES.md) before redirecting legacy service URLs.
- Keep public contact values in `site-data.js` synchronized with the crawlable HTML footer/contact copy.
- Verify the real email-client mailto flow, external Google Maps behavior, image/font loading and Vercel custom-domain status in production.
