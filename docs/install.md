# Install and troubleshoot

## Requirements

- A DSH Web profile under `$DSH_HOME/profiles/web`.
- The `dsh` CLI and `pnpm` available.
- Node.js 20 or newer for development.

## Install

From npm:

```bash
dsh plugin --profile web add dsh-ui-colors@alpha
```

Then open the DSH Web **Plugins** page and enable **dsh-ui-colors**. The package declares `dsh.bundle`, so the package's `cordis.patch.yml` is applied by the bundle. Do not also add a manual `ui-colors` patch entry.

For local development from a checkout:

```bash
dsh plugin --profile web add /path/to/dsh-ui-colors
```

Enable the bundle in **Plugins** and restart `dsh web` if needed. Moving the checkout requires adding the new path again.

## Restart or reload

| Change | Action |
| --- | --- |
| Browser-only UI, CSS, preset, spectrum, or Shiki data | Reload the Web page |
| New or renamed Host `Config` field | Restart `dsh web` |
| Package or bundle selection change | Restart `dsh web` |

A browser reload cannot update the Host schema. A checkbox or select whose new field is missing from the running Host will revert after the form write.

## Uninstall

1. Remove the `- insert:` block containing `id: ui-colors` from `cordis.patch.yml`.
2. Run `dsh plugin --profile web remove dsh-ui-colors`.
3. Restart `dsh web`.

## Troubleshooting

### `Cannot find package 'dsh-ui-colors'`

The bundle is selected, but its dependency is missing or points to a moved checkout. Re-run the install command for the current package path or registry version, then restart `dsh web`.

### A new checkbox or picker will not stay selected

The browser bundle is current but the running Host schema is old. Restart `dsh web`; a reload is not enough.

### The section does not appear

Check that **dsh-ui-colors** is enabled in **Plugins**, its dependency resolves, and the plugin loaded without an activation warning.

### Scoped surface styling is missing

The main, sidebar, and right-panel rules depend on CSS-module suffixes. If DSH renamed them, token overrides still apply but the scoped container rule can fall back. This is a known best-effort bridge; see [Architecture](architecture.md).
