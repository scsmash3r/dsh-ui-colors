# dsh-ui-colors documentation

Current-state notes for developing and extending `dsh-ui-colors`. These replace the local `.mnemon/` working memory as the public reference.

| Document | Covers |
| --- | --- |
| [Architecture](architecture.md) | Host/client split, token layers, state, caching, UI wiring |
| [Token policy](token-policy.md) | Token coverage categories, audits, fixtures, adding a policy |
| [Adding themes](adding-themes.md) | Spectra, color presets, Shiki syntax presets, tests |
| [Install and troubleshoot](install.md) | npm/bundle install, restart rules, uninstall, common failures |
| [Visual color test](visual-test.md) | Paste-ready Markdown for checking surfaces, links, tildes, selection, and Shiki tokens |
| [Accessibility audit](accessibility.md) | Source-level findings, fixed issues, test coverage, and remaining gaps |

All UI copy is available in English and Simplified Chinese and follows the DSH locale setting.

The plugin currently exposes six Customize rows: Palette, Syntax highlighter, Colors, Neutral, Borders, and Border radius. The palette has nine spectra and six named color presets plus Custom and Clean. The syntax row has six Shiki token presets.
