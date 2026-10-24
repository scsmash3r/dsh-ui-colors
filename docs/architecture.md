# Architecture

`dsh-ui-colors` has two halves that run in different environments.

| Half | File | Runtime | Role |
| --- | --- | --- | --- |
| Host | `lib/index.js` | Node / DSH Host | Declares the persistent `Config` fields |
| Shared model | `lib/manifest.js` | Host and tests | Sections, field names, placeholders, preset data |
| Browser | `lib/client.js` | DSH Web GUI | Settings UI, state, token layers, scoped CSS |

## Host configuration

`lib/index.js` builds `Config` from `CONFIG_FIELDS` in `lib/manifest.js`. The current schema has 62 fields:

- 56 color fields: 8 surfaces, 16 neutral steps, and 4 border levels, each with light and dark.
- `radiusMode`, `palette`, `semanticTheme`, `syntaxTheme`, `spectrumSelection`, and `preset`.

All fields are volatile plugin config. The settings service persists them through the profile patch and exposes them to the browser through `ctx.configForms`.

`lib/manifest.js` is the single source for the color-row model. The browser bundle still carries a copy of the surface, border, neutral, and preset data because it is a standalone module. `test/smoke.mjs` compares that copy with the manifest, and `test/manifest.test.mjs` compares the Host schema and presets with it. This is a temporary duplication protected by tests, not two independent models.

## Token layers

The plugin uses `ctx.theme.overrideTokens(source, { token: { light, dark } })`. Layers compose in call order: a later layer wins for the same token. Replacing the same source replaces that source's layer.

| Source | Contents | Applied when |
| --- | --- | --- |
| `ui-colors-palette` | Selected spectrum, or the full semantic theme | Palette or `semanticTheme` changes; rebuilt alongside colors in full-theme mode |
| `ui-colors` | Explicit surface, border, and neutral colors | Their values change, or the palette layer is re-stacked |
| `ui-colors-radius` | Shared radius scale | `radiusMode` changes |
| `ui-colors-shiki` | Nine Shiki `--shiki-token-*` colors | `syntaxTheme` changes |

The palette layer is the base. The explicit color layer is applied after it so **Colors**, **Neutral**, and **Borders** win over spectrum and full-theme values.

When a full semantic theme is active, palette and color layers are rebuilt together. Rebuilding only the palette would put its new layer above the existing color layer and reverse precedence. A palette change also re-applies the color layer even when its values are unchanged, for the same reason.

`ui-colors-shiki` is independent of the palette. It changes token colors only; `--shiki-background` and `--shiki-foreground` stay tied to the **Code blocks** surface and the active theme.

## State and application

The browser keeps one `currentState` snapshot:

```js
{
  colors, borders, neutrals, preset, radiusMode,
  palette, semanticTheme, syntaxTheme, spectrumSelection,
  status, revision,
}
```

`commit(patch, status)` merges a patch into the snapshot, increments `revision`, synchronizes the slot store with one object, and applies only the layers whose keys changed:

- palette key: `palette:semanticTheme`
- color key: JSON of `colors`, `borders`, `neutrals`
- radius key: `radiusMode`
- syntax key: `syntaxTheme`
- selection key: `palette:spectrumSelection`

The form write path uses `pendingWrites` to suppress reads until queued writes settle. `readForm()` parses the Host snapshot, normalizes colors, and commits the resulting patch.

### Selection

`spectrumSelection` is independent of the full theme. When enabled, `applySelection` sets:

```text
data-dsh-ui-colors-selection
--dsh-ui-colors-selection-light
--dsh-ui-colors-selection-dark
```

The stylesheet uses those variables for `::selection`. Disabling the option removes the attribute and both variables.

## Settings UI

The browser registers one section, `settings.section` with id `customize`, order 5. Its store mirrors the client snapshot. `CustomizeSection` renders:

- `PaletteRow`: spectrum, color preset, full-theme switch, selection switch
- `SyntaxRow`: Shiki preset picker
- `ColorsRow`, `NeutralsRow`, `BordersRow`: color grids
- `ShapesRow`: radius presets

The six rows are ordered Palette, Syntax highlighter, Colors, Neutral, Borders, Border radius.

## Localization

The client registers an `dsh-ui-colors` locale namespace:

```js
ctx.locale.register("dsh-ui-colors", { zh, en })
const t = ctx.locale.bind("dsh-ui-colors")
```

The `settings.section` registration sets `locale: "dsh-ui-colors"`, so the section component receives `t` and re-renders when the DSH language changes. The navigation label is a function, `() => t("nav")`. The nav icon bridge recognizes both `Customize` and `自定义`.

`en` and `zh` must keep identical key sets. The smoke test checks key parity and renders the section with the Chinese dictionary. A missing key falls back to the key itself, so add both dictionaries when adding a label.

Data labels (`spectrum.*`, `preset.*`, `syntax.*`, `surface.*`, `border.*`, and `radius.*`) are translated at render time; stored config keeps stable ids, not translated text.

## Scoped surfaces

The sidebar, main column, and right panel use CSS-module suffix bridges (`*_sidebarCol`, `*_centerCol`, `*_rightbarCol`). `tagTargets()` adds marker attributes, and scoped rules use those markers. The body also receives flags for surfaces that need CSS variables.

This is best-effort: if DSH renames a container class, the token part still applies but the scoped container styling falls back to the theme. See [Install and troubleshoot](install.md).
