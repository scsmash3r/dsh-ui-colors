# Token policy

DSH exposes more CSS custom properties than this plugin should own. `test/token-policy.mjs` assigns every token in the installed UI theme exactly one policy so a future DSH update cannot add an unclassified color token silently.

## Categories

| Policy | Meaning |
| --- | --- |
| `owned` | The full-theme layer must override it. |
| `derived` | No direct override; it resolves through owned tokens. |
| `syntax` | Controlled by the Syntax highlighter preset; host-owned on Default. |
| `host` | Intentionally left to DSH, such as status scales and depth shadows. |
| `ignored` | Not a color token, such as typography, geometry, and filters. |

Current inventory: **425 tokens**.

| Owned | Derived | Syntax | Host | Ignored |
| ---: | ---: | ---: | ---: | ---: |
| 178 | 6 | 9 | 31 | 201 |

## Main decisions

- **Owned:** semantic aliases, surface-specific tokens, the neutral / neutral-bluish / blue / deepseek scales, the focus color, and the menu surface.
- **Syntax:** the nine `--shiki-token-*` colors. Default removes the override; a preset supplies all nine for both appearances.
- **Derived:** Shiki background/foreground, scrollbar colors, and elevation stroke colors. They resolve through aliases or geometry rather than needing duplicate overrides.
- **Host:** raw green/red/amber status scales, onboarding and thinking gradients, depth shadows, and three elevation shadows.
- **Ignored:** typography, radius, focus width, blur, backdrop filters, and scrollbar sizing.

Status scales and thinking gradients remain host-owned. If their overrides land, change those rules to `owned` and add the tokens to the full-theme map.

## Running the audit

```bash
npm test
npm run audit:tokens
npm run audit:tokens:update
```

- `npm test` includes the policy test.
- The test uses the live installed theme when it can find it; otherwise it uses `test/fixtures/theme-tokens.json`.
- The audit reports policy counts and fails on unmatched, missing, unexpected, or stale tokens.
- `audit:tokens:update` refreshes the token fixture. `full-theme-tokens.json` is a separate coverage fixture.

## Failure meanings

| Output | Meaning |
| --- | --- |
| `UNMATCHED` | A token matches no rule or more than one rule. Add or narrow a policy. |
| `MISSING OWNED` | An `owned` token is not present in the full-theme layer. Add the override or change the policy. |
| `UNEXPECTED OVERRIDE` | A derived/host/ignored token appears in the full-theme layer. Remove it or change the policy. |
| `STALE FULL-THEME TOKEN` | The full-theme map contains a token the theme no longer defines. Remove it. |

When adding a rule, prefer a family pattern over a long exact list, but do not make a pattern so broad that a future color token is silently classified as `ignored`.
