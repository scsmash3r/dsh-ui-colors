# Security Policy

## Supported versions

| Version | Supported |
| --- | --- |
| `0.32.x` alpha | Yes |
| Earlier versions | No |

Only the latest published alpha is supported with security fixes. The plugin is a client-side DSH Web plugin; it does not run a server or accept remote input.

## Reporting a vulnerability

Do not open a public issue for a security problem. Use the repository's **Security → Advisories → Report a vulnerability** flow on GitHub when the repository is public. If that flow is unavailable, contact the maintainer through the private contact listed on the repository profile.

Please include:

- the affected `dsh-ui-colors` version;
- the DSH version (`dsh --version`);
- the browser and operating system;
- a short reproduction, including the relevant settings;
- the expected and actual behavior;
- any impact on confidentiality, integrity, or availability.

Do not include real secrets, credentials, private conversation content, or production profile files. Redact paths and tokens.

## Scope

In scope:

- CSS injection through a color, preset, or configuration field;
- unexpected code execution or privilege escalation;
- exposure of local files, profile configuration, or secrets;
- denial of service caused by the plugin's rendering or stylesheet handling;
- an install or update path that writes outside the intended DSH profile.

Out of scope:

- visual contrast preferences or theme aesthetics;
- third-party plugins that render inside the same DSH surface;
- vulnerabilities in DSH itself, Shiki, or the browser;
- issues that require an already-compromised local profile;
- social-engineering or physical-access scenarios.

## Disclosure

The maintainer will acknowledge a report as soon as practical, investigate it privately, and coordinate a fix and disclosure. Please allow time for a patched release before publishing details. Credit is available on request.
