# Adding themes

All colors are declarative data. The browser bundle currently mirrors the Host manifest, so update both sides and let the drift tests catch mistakes.

## Add a spectrum

A spectrum is a Palette choice. It can be a normal static remap or an always-on full semantic theme.

1. Add an entry to `PALETTE_OPTIONS` in `lib/client.js` with `id`, `label`, and `swatch`.
2. Add the id to the `palette` union in `lib/index.js`.
3. Choose the mode:
   - **Always full:** add the id to `ALWAYS_FULL_PALETTES` and add a `paletteSeed()` branch with light/dark accent and neutral values. No `SPECTRA` entry is needed.
   - **Toggleable:** add a `SPECTRA` entry with the static neutral-bluish, blue, and deepseek scales. `paletteSeed()` derives the full theme from `deepseek-600` (light) and `deepseek-400` (dark).
4. Add tests for the option count, label, swatch, and either the full-theme layer or the static layer.
5. Add `spectrum.<id>` to both `en` and `zh` in `lib/client.js`.
6. Document the spectrum in the README.

An always-full spectrum locks the Full semantic theme switch. Do not add it to `SPECTRA`; the palette layer uses the generated full theme.

## Add a color preset

A color preset is a named set of surface, border, and neutral values. It is not a spectrum and does not change the palette, full theme, syntax theme, or radius.

1. Add an object to `PRESETS` in `lib/client.js`:

```js
{
  id: "my-preset",
  label: "My Preset",
  colors: { main: { light: "#ffffffff", dark: "#111111ff" } },
  borders: { l1: { light: "#0000001a", dark: "#ffffff1f" } },
  neutrals: { "500": { light: "#777777ff", dark: "#888888ff" } },
}
```

2. Mirror the object in `PRESETS` in `lib/manifest.js`. The smoke test compares both lists.
3. A preset only writes the fields it defines; unlisted fields keep their current state. Use all eight surfaces, four borders, and the 16 neutral steps for a complete scheme.
4. The picker preview samples Neutral `500` for Light and Dark, so give those values enough contrast to identify the preset.
5. Add tests for the Preset option count and labels, the two preview colors, the written fields, and the selected preset id.
6. Add `preset.<id>` to both `en` and `zh` in `lib/client.js`.
7. Add a README table row.

Applying a preset sets the dropdown to that id. A manual edit in Colors, Neutral, or Borders sets it to Custom. Clean clears all surface, border, and neutral values.

## Add a Shiki syntax preset

Shiki uses nine `--shiki-token-*` CSS variables. A syntax preset supplies all nine colors for both appearances.

1. Add an object to `SHIKI_PRESETS` in `lib/client.js` with `id`, `label`, `light`, and `dark`.
2. Use exactly these keys: `comment`, `constant`, `function`, `keyword`, `link`, `parameter`, `punctuation`, `string`, `string-expression`.
3. Do not set `--shiki-background` or `--shiki-foreground`; they stay tied to the Code blocks surface and the active theme.
4. `Default` uses `values: null` and disposes the `ui-colors-shiki` layer.
5. Add the option to the UI tests and verify the layer values and Default disposal.
6. The token-policy `syntax` category already covers all nine tokens.

## Verification

```bash
npm install
npm test
npm run audit:tokens
```

Then install the package, enable the bundle, and restart DSH when a Host field or schema changed:

```bash
dsh plugin --profile web add /path/to/dsh-ui-colors
# enable dsh-ui-colors in Plugins, then restart dsh web
```

A browser reload is enough for browser-only changes. Host `Config` changes need a restart.
