# Frontier Towers service URL migration notes

The new catalogue is the public service architecture. Legacy pages remain in place temporarily so existing links do not become 404s while client redirect decisions are confirmed.

| Legacy URL | Recommended destination | Redirect status |
|---|---|---|
| `/services/managed-services.html` | `/services/flm-managed-services.html` | Likely safe; confirm with client before redirecting |
| `/services/engineering-services.html` | `/services.html` | No exact one-to-one replacement; directory is safest |
| `/services/renewable-energy.html` | `/services/solarization-installation.html` | Related but not identical; client confirmation needed |
| `/services/repair-return.html` | `/services.html` | No exact catalogue equivalent; do not redirect blindly |
| `/services/iot-solutions.html` | `/services/remote-monitoring-system.html` | Related but not identical; client confirmation needed |
| `/services/bpo-hr-payroll.html` | `/services.html` | No exact catalogue equivalent; client confirmation needed |

Do not add redirects until the client confirms the mapping and any indexed legacy URLs that should retain their current content.