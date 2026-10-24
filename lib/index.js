/**
 * Host half of the surface color and element-shape controls.
 *
 * Each field is ordinary volatile plugin config, so the existing settings
 * service persists it through the profile patch and exposes it to the browser
 * through `ctx.configForms`. `auto: false` keeps the generated Plugins form
 * off — the browser half owns its own Customize rows.
 */
import z from '@deepseek-ai/schemastery'
import { CONFIG_FIELDS } from './manifest.js'

const colorFields = Object.fromEntries(
  CONFIG_FIELDS.map((field) => [field, z.string().default('').volatile()]),
)

/** Durable color fields plus shape settings; `''` means "inherit the active theme". */
export const Config = z.object({
  ...colorFields,
  radiusMode: z.union(['default', 'half', 'none']).default('default').volatile(),
  palette: z.union(['bluish', 'olive', 'ember', 'plum', 'charcoal', 'solarized', 'cyan-oled', 'neon-yellow', 'acid']).default('bluish').volatile(),
  semanticTheme: z.boolean().default(false).volatile(),
  syntaxTheme: z.string().default('default').volatile(),
  spectrumSelection: z.boolean().default(false).volatile(),
  preset: z.string().default('custom').volatile(),
})

export { CONFIG_FIELDS }

/**
 * Keep the plugin running without the settings service and opt its config out
 * of the generated form when settings is available.
 * @param ctx - host plugin context.
 */
export function apply(ctx) {
  ctx.inject(['settings'], (child) => {
    child.effect(() => child.settings.configure({ auto: false }, ctx.fiber))
  })
}
