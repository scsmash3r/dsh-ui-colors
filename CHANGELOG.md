# Changelog

Notable changes to `dsh-ui-colors`. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow [Semantic Versioning](https://semver.org/).

## [Unreleased]

First public alpha. Planned tag: `v0.32.0-alpha.1`.

### Added

- **Settings → Customize** section with Palette, Syntax highlighter, Colors, Neutral, Borders, and Border radius rows.
- Nine spectra: Bluish, Olive, Ember, Midnight Plum, Deep Charcoal, Solarized, Cyan OLED, Neon Yellow, and Acid Hacker Green.
- Mode-aware **Full semantic theme** with generated Light and Dark token sets.
- Named color presets: Pitch Black, Copper Patina, Gruvbox, High Contrast, Yellow Blood, and Nord, plus Custom and Clean.
- Six Shiki syntax presets: Default, GitHub, Nord, Dracula, Solarized, and Monokai.
- **Apply spectrum to ::selection**, independent of the full-theme switch.
- English and Simplified Chinese dictionaries; the section follows the DSH locale.
- **Customize** navigation label and icon bridge in both languages.
- Executable token-policy audit with live-theme and checked-in fixture modes.
- Explicit documentation set under `docs/`, including a paste-ready visual color test.
- MIT license.

### Changed

- The Host `Config` is generated from `lib/manifest.js` instead of hand-listed fields.
- Client state is a single snapshot committed through `commit(patch, status)`.
- Palette, color, radius, syntax, and selection layers are applied only when their inputs change.
- A full semantic theme rebuilds palette and color layers together to preserve layer precedence.
- The local installer registers the checkout as a link dependency instead of copying it into the profile.
- Shiki syntax token colors are controlled by a separate `ui-colors-shiki` layer; code block background and foreground remain tied to the Code blocks surface.

### Accessibility

- Added Arrow/Home/End/Escape navigation and focus return to the custom Palette, Preset, and Syntax pickers.
- Added `aria-controls`, listbox option state, and `tabIndex` management.
- Changed row titles to `h3` headings and added explicit `:focus-visible` outlines.
- Added `role="status"` to settings feedback and increased clear-button targets to 24×24.

### Fixed

- Full-theme colors reverting after a preset and Neutral edit.
- Tooltip text becoming unreadable in full themes and in Acid Hacker Green.
- Acid Hacker Green absolute neutral anchors.
- Neutral `00`/`1000` anchors no longer flip with the appearance.
- Stale form snapshots overwriting a newer pending selection.

### Known limitations

- DSH-specific: the plugin depends on current DSH token names, CSS-module suffixes, and profile behavior. A DSH update can require a plugin update.
- Not yet published to npm; installation is currently a local link plus a profile patch entry.
- Main, Sidebar, and Right panel scoped rules depend on CSS-module suffixes and can fall back if DSH renames them.
- Border colors are configurable, but border widths and styles remain component-owned. There is no border-width control.
- Only the sidebar derives a contrast-safe text palette from its fill. Other surfaces keep the theme text colors, so unusual fills can reduce readability.
- Shiki token colors are preset-based; individual token editing and syntax background/foreground overrides are not exposed.
- Raw status scales, gradients, and shadow materials remain host-owned in full themes.
- Border radius affects tokenized radii only. Hardcoded component radii and circles keep their values; the Automation tasks bridge is best-effort.
- Presets are fixed snapshots of the current DSH scale and do not update automatically.
- Localization is English and Simplified Chinese only. A new visible string must be added to both dictionaries.
- `::selection` changes the background only; it keeps the element's text color.
- Color fields accept `#RRGGBBAA` text, not a native color picker. Invalid or partial values revert.
- The Settings navigation icon is applied by a CSS mask based on the localized section label. If the label changes, the icon bridge needs updating.
- No automated browser axe/Lighthouse or manual screen-reader audit has been completed; a source-level review is in `docs/accessibility.md`.

No earlier public releases.
