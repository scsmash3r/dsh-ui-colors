import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import {
  SURFACES as MANIFEST_SURFACES,
  BORDERS as MANIFEST_BORDERS,
  NEUTRALS as MANIFEST_NEUTRALS,
  PRESETS as MANIFEST_PRESETS,
} from '../lib/manifest.js'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const code = readFileSync(join(root, 'lib/client.js'), 'utf8')

let loaded
const window = {
  __ModuleLoader__: {
    load: (descriptor) => {
      loaded = descriptor
    },
  },
}

// Execute the bundle exactly as the browser module loader would.
new Function('window', 'require', code)(window, () => {
  throw new Error('unexpected top-level require')
})

assert.equal(loaded.id, 'dsh-ui-colors')
assert.equal(typeof loaded.factory, 'function')

const overrides = []
const registered = []
const writes = []
const unsets = []
const vars = {}
const removed = []
const bodyAttrs = new Set()
const disposed = []

const values = {
  sidebarLight: '#11223380',
  sidebarDark: '#445566ff',
  mainLight: '#223344cc',
  mainDark: '#334455ff',
  layer1Light: '#9aa0a8ff',
  layer1Dark: '#14181cff',
  secondaryLight: '#c0c8d0ff',
  secondaryDark: '#101418ff',
  composerLight: '#445566ff',
  composerDark: '#556677ff',
  panelLight: '#667788ff',
  panelDark: '#778899ff',
  bubbleLight: '#8899aaff',
  bubbleDark: '#99aabbff',
  codeLight: '#aabbccff',
  codeDark: '#bbccddff',
  borderL1Light: '#0000000a',
  borderL1Dark: '#ffffff0f',
  borderL2Light: '#ff000080',
  borderL2Dark: '#00ff0040',
  borderL3Light: '#11223344',
  borderL3Dark: '#55667788',
  borderL4Light: '',
  borderL4Dark: '',
  neutral400Light: '#12345680',
  neutral400Dark: '#abcdef40',
  radiusMode: 'default',
  palette: 'olive',
  semanticTheme: false,
}

const formListeners = []
const form = {
  getSnapshot: () => ({ status: 'ready', value: values }),
  subscribe: (listener) => {
    formListeners.push(listener)
    return () => {}
  },
  set: (field, value) => {
    writes.push([field, value])
    return Promise.resolve(true)
  },
  unset: (field) => {
    unsets.push(field)
    return Promise.resolve(true)
  },
}

const ctx = {
  theme: {
    overrideTokens: (source, tokens) => {
      overrides.push({ source, tokens })
      return () => {
        disposed.push(source)
      }
    },
  },
  configForms: { get: () => form },
  effect: (fn) => {
    fn()
  },
  slots: {
    inject: (_name, factory) => factory(),
    register: (options, component) => {
      registered.push({ options, component })
      return () => {}
    },
  },
}

const style = { id: '', textContent: '', remove: () => removed.push(true) }
const element = () => {
  const attrs = new Set()
  return {
    attrs,
    textContent: '',
    hasAttribute: (name) => attrs.has(name),
    setAttribute: (name) => attrs.add(name),
  }
}
const sidebarEl = element()
const centerEl = element()
const panelEl = element()
const sectionButton = element()
sectionButton.textContent = 'Customize'
const settingsModal = {
  querySelectorAll: (selector) => (selector === 'button' ? [sectionButton] : []),
}

const body = {
  style: {
    setProperty: (name, value) => {
      vars[name] = value
    },
    removeProperty: (name) => {
      delete vars[name]
    },
  },
  setAttribute: (name) => bodyAttrs.add(name),
  removeAttribute: (name) => bodyAttrs.delete(name),
  hasAttribute: (name) => bodyAttrs.has(name),
}

globalThis.document = {
  head: { appendChild: () => {} },
  body,
  createElement: () => style,
  getElementById: () => null,
  querySelector: (selector) => (selector === '[data-shortcut-modal="settings"]' ? settingsModal : null),
  querySelectorAll: (selector) => {
    if (selector.includes('sidebarCol')) return [sidebarEl]
    if (selector.includes('centerCol')) return [centerEl]
    if (selector.includes('rightbarCol')) return [panelEl]
    return []
  },
}
globalThis.MutationObserver = class {
  observe() {}
  disconnect() {}
}
globalThis.requestAnimationFrame = (callback) => { callback(); return 1 }
globalThis.cancelAnimationFrame = () => {}

const store = { handle: true }
let nextDraft
const requireStub = (name) => {
  if (name === 'react') {
    return {
      createElement: (type, props, ...children) => ({ type, props, children }),
      useState: (value) => [value, (next) => { nextDraft = next }],
      useEffect: () => {},
    }
  }
  if (name === '@deepseek-ai/dsh-client-store') {
    return { defineStore: () => store }
  }
  throw new Error(`unexpected require: ${name}`)
}

const exports = loaded.factory(requireStub)
assert.equal(typeof exports.apply, 'function')

const manifestSurfaceData = MANIFEST_SURFACES.map(({ id, label, fields, placeholders }) => ({
  id,
  label,
  light: fields.light,
  dark: fields.dark,
  placeholder: placeholders,
}))
const manifestBorderData = MANIFEST_BORDERS.map(({ id, label, fields, placeholders, apply }) => ({
  id,
  label,
  token: apply.token,
  light: fields.light,
  dark: fields.dark,
  placeholder: placeholders,
}))
const manifestNeutralData = MANIFEST_NEUTRALS.map(({ id, label, fields, placeholders, apply }) => ({
  id,
  label,
  token: apply.token,
  light: fields.light,
  dark: fields.dark,
  placeholder: placeholders,
}))
assert.deepEqual(exports.__inspect.surfaces, manifestSurfaceData)
assert.deepEqual(exports.__inspect.borders, manifestBorderData)
assert.deepEqual(exports.__inspect.neutrals, manifestNeutralData)
assert.deepEqual(exports.__inspect.presets, MANIFEST_PRESETS)
const locales = exports.__inspect.locales
assert.deepEqual(Object.keys(locales.en).sort(), Object.keys(locales.zh).sort())
assert.equal(locales.zh['palette.title'], '调色板')
assert.equal(locales.zh['syntax.heading'], '语法高亮')
assert.deepEqual(exports.inject, ['theme', 'slots', 'configForms', 'locale', 'remote'])

exports.apply(ctx)

const colorLayer = overrides.filter((entry) => entry.source === 'ui-colors').at(-1).tokens
const radiusLayer = overrides.filter((entry) => entry.source === 'ui-colors-radius').at(-1).tokens
assert.deepEqual(colorLayer['--dsw-specific-sidebar-fill'], {
  light: '#11223380',
  dark: '#445566ff',
})
assert.deepEqual(colorLayer['--dsw-alias-bg-layer-1'], {
  light: '#9aa0a8ff',
  dark: '#14181cff',
})
assert.deepEqual(colorLayer['--dsw-alias-bg-layer-2'], {
  light: '#c0c8d0ff',
  dark: '#101418ff',
})
assert.deepEqual(colorLayer['--dsw-specific-input-major'], {
  light: '#445566ff',
  dark: '#556677ff',
})
assert.deepEqual(colorLayer['--dsw-specific-bubble'], {
  light: '#8899aaff',
  dark: '#99aabbff',
})
assert.deepEqual(colorLayer['--dsw-alias-markdown-code-block'], {
  light: '#aabbccff',
  dark: '#bbccddff',
})
assert.deepEqual(colorLayer['--dsw-alias-border-l1'], {
  light: '#0000000a',
  dark: '#ffffff0f',
})
assert.deepEqual(colorLayer['--dsw-alias-border-l2'], {
  light: '#ff000080',
  dark: '#00ff0040',
})
assert.deepEqual(colorLayer['--dsw-alias-border-l3'], {
  light: '#11223344',
  dark: '#55667788',
})
assert.equal(colorLayer['--dsw-alias-border-l4'], undefined)
assert.deepEqual(colorLayer['--dsw-static-neutral-400'], {
  light: '#12345680',
  dark: '#abcdef40',
})
assert.equal(colorLayer['--dsw-static-neutral-500'], undefined)
assert.equal(colorLayer['--dsw-alias-bg-base'], undefined, 'Main is scoped to the center column')
assert.deepEqual(radiusLayer, {
  '--dsw-radius-xs': { light: '4px', dark: '4px' },
  '--dsw-radius-sm': { light: '8px', dark: '8px' },
  '--dsw-radius-md': { light: '12px', dark: '12px' },
  '--dsw-radius-lg': { light: '16px', dark: '16px' },
  '--dsw-radius-xl': { light: '20px', dark: '20px' },
  '--dsw-radius-panel': { light: '28px', dark: '28px' },
})
const paletteLayer = overrides.filter((entry) => entry.source === 'ui-colors-palette').at(-1).tokens
assert.equal(paletteLayer['--dsw-static-neutral-bluish-50'].light, '#fafaf5')
assert.equal(paletteLayer['--dsw-static-blue-500'].light, '#908e00')
assert.equal(paletteLayer['--dsw-static-deepseek-500'].light, '#868300')

assert.ok(bodyAttrs.has('data-dsh-ui-colors-sidebar'))
assert.ok(bodyAttrs.has('data-dsh-ui-colors-main'))
assert.ok(bodyAttrs.has('data-dsh-ui-colors-panel'))
assert.equal(vars['--dsh-ui-colors-text-light'], '#f7f8fa')
assert.equal(vars['--dsh-ui-colors-text-dark'], '#f7f8fa')
assert.equal(vars['--dsh-ui-colors-panel-light'], '#667788ff')
assert.equal(vars['--dsh-ui-colors-panel-dark'], '#778899ff')
assert.equal(vars['--dsh-ui-colors-main-light'], '#223344cc')
assert.equal(vars['--dsh-ui-colors-main-dark'], '#334455ff')

assert.ok(sidebarEl.attrs.has('data-dsh-colors-sidebar'))
assert.ok(centerEl.attrs.has('data-dsh-colors-main'))
assert.ok(panelEl.attrs.has('data-dsh-colors-panel'))
assert.ok(sectionButton.attrs.has('data-dsh-ui-colors-section'))

assert.equal(registered.length, 1)
const registration = registered[0]
assert.equal(registration.options.name, 'settings.section')
assert.equal(registration.options.id, 'customize')
assert.equal(registration.options.order, 5)
assert.equal(registration.options.label(), 'Customize')
assert.equal(registration.options.store, store)
assert.equal(typeof registration.component, 'function')

const syncedStates = []
const actions = { sync: (state) => syncedStates.push(state) }
const injected = registration.options.inject(actions)
assert.equal(typeof injected.setColor, 'function')
assert.equal(typeof injected.clearColor, 'function')
assert.equal(typeof injected.setBorder, 'function')
assert.equal(typeof injected.clearBorder, 'function')
assert.equal(typeof injected.setNeutral, 'function')
assert.equal(typeof injected.clearNeutral, 'function')
assert.equal(typeof injected.applyPreset, 'function')
assert.equal(typeof injected.reset, 'function')
assert.equal(typeof injected.resetBorders, 'function')
assert.equal(typeof injected.resetNeutrals, 'function')
assert.equal(typeof injected.setRadiusMode, 'function')
assert.equal(typeof injected.setPalette, 'function')
assert.equal(typeof injected.setSemanticTheme, 'function')
assert.equal(typeof injected.setSyntaxTheme, 'function')
assert.equal(typeof injected.setSpectrumSelection, 'function')

const layerCounts = () => ({
  palette: overrides.filter((entry) => entry.source === 'ui-colors-palette').length,
  colors: overrides.filter((entry) => entry.source === 'ui-colors').length,
  radius: overrides.filter((entry) => entry.source === 'ui-colors-radius').length,
  syntax: overrides.filter((entry) => entry.source === 'ui-colors-shiki').length,
})
const lastLayerIndex = (source) => overrides.reduce(
  (last, entry, index) => (entry.source === source ? index : last),
  -1,
)

const beforeSyntax = layerCounts()
injected.setSyntaxTheme('github')
assert.deepEqual(writes.at(-1), ['syntaxTheme', 'github'])
assert.equal(syncedStates.at(-1).syntaxTheme, 'github')
const syntaxLayer = overrides.filter((entry) => entry.source === 'ui-colors-shiki').at(-1).tokens
assert.deepEqual(syntaxLayer['--shiki-token-keyword'], { light: '#cf222e', dark: '#ff7b72' })
assert.deepEqual(syntaxLayer['--shiki-token-string'], { light: '#0a3069', dark: '#a5d6ff' })
const afterSyntax = layerCounts()
assert.equal(afterSyntax.syntax, beforeSyntax.syntax + 1)
assert.equal(afterSyntax.palette, beforeSyntax.palette)
assert.equal(afterSyntax.colors, beforeSyntax.colors)
assert.equal(afterSyntax.radius, beforeSyntax.radius)

const beforeDefaultSyntax = layerCounts()
injected.setSyntaxTheme('default')
assert.deepEqual(writes.at(-1), ['syntaxTheme', 'default'])
assert.equal(syncedStates.at(-1).syntaxTheme, 'default')
assert.ok(disposed.includes('ui-colors-shiki'))
assert.equal(layerCounts().syntax, beforeDefaultSyntax.syntax)

injected.setSpectrumSelection(true)
assert.deepEqual(writes.at(-1), ['spectrumSelection', true])
assert.equal(syncedStates.at(-1).spectrumSelection, true)
assert.ok(bodyAttrs.has('data-dsh-ui-colors-selection'))
assert.ok(vars['--dsh-ui-colors-selection-light'])
assert.ok(vars['--dsh-ui-colors-selection-dark'])
injected.setSpectrumSelection(false)
assert.deepEqual(writes.at(-1), ['spectrumSelection', false])
assert.equal(syncedStates.at(-1).spectrumSelection, false)
assert.ok(!bodyAttrs.has('data-dsh-ui-colors-selection'))
assert.equal(vars['--dsh-ui-colors-selection-light'], undefined)
assert.equal(vars['--dsh-ui-colors-selection-dark'], undefined)

const beforeColor = layerCounts()
injected.setColor('main', 'light', '#abcdef')
const afterColor = layerCounts()
assert.equal(afterColor.colors, beforeColor.colors + 1)
assert.equal(afterColor.palette, beforeColor.palette)
assert.equal(afterColor.radius, beforeColor.radius)
assert.deepEqual(writes.at(-1), ['mainLight', '#abcdefff'])
assert.ok(syncedStates.length > 0)
assert.equal(syncedStates.at(-1).preset, 'custom')
assert.equal(syncedStates.at(-1).status, 'ready')
assert.ok(syncedStates.at(-1).colors.main.light)
assert.ok(syncedStates.at(-1).revision > 0)

injected.clearColor('main', 'light')
assert.deepEqual(unsets, ['mainLight'])
assert.deepEqual(writes.at(-1), ['mainLight', '#abcdefff'])
unsets.length = 0

injected.setBorder('l4', 'light', '#abcdef80')
assert.deepEqual(writes.at(-1), ['borderL4Light', '#abcdef80'])
assert.deepEqual(
  overrides.filter((entry) => entry.source === 'ui-colors').at(-1).tokens['--dsw-alias-border-l4'],
  { light: '#abcdef80', dark: '#ffffff33' },
)
injected.clearBorder('l4', 'light')
assert.deepEqual(unsets, ['borderL4Light'])
assert.equal(
  overrides.filter((entry) => entry.source === 'ui-colors').at(-1).tokens['--dsw-alias-border-l4'],
  undefined,
)
unsets.length = 0

injected.setNeutral('400', 'light', '#010203ff')
assert.deepEqual(writes.at(-1), ['neutral400Light', '#010203ff'])
assert.deepEqual(
  overrides.filter((entry) => entry.source === 'ui-colors').at(-1).tokens['--dsw-static-neutral-400'],
  { light: '#010203ff', dark: '#abcdef40' },
)
injected.clearNeutral('400', 'light')
assert.deepEqual(unsets, ['neutral400Light'])
assert.deepEqual(
  overrides.filter((entry) => entry.source === 'ui-colors').at(-1).tokens['--dsw-static-neutral-400'],
  { light: '#a2a4a6ff', dark: '#abcdef40' },
)
unsets.length = 0

injected.reset()
assert.deepEqual(unsets, [
  'sidebarLight', 'sidebarDark',
  'mainLight', 'mainDark',
  'layer1Light', 'layer1Dark',
  'secondaryLight', 'secondaryDark',
  'composerLight', 'composerDark',
  'panelLight', 'panelDark',
  'bubbleLight', 'bubbleDark',
  'codeLight', 'codeDark',
])
unsets.length = 0

injected.resetBorders()
assert.deepEqual(unsets, [
  'borderL1Light', 'borderL1Dark',
  'borderL2Light', 'borderL2Dark',
  'borderL3Light', 'borderL3Dark',
  'borderL4Light', 'borderL4Dark',
])
unsets.length = 0

injected.resetNeutrals()
assert.equal(unsets.length, 32)
assert.equal(unsets[0], 'neutral00Light')
assert.equal(unsets.at(-1), 'neutral1000Dark')
unsets.length = 0

injected.setColor('sidebar', 'light', '#112233ff')
injected.applyPreset('pitch-black')
assert.deepEqual(writes.at(-1), ['preset', 'pitch-black'])
assert.equal(syncedStates.at(-1).preset, 'pitch-black')
assert.equal(syncedStates.at(-1).borders.l1.dark, '#ffffff05')
assert.equal(syncedStates.at(-1).neutrals['00'].dark, '#7f8287ff')
assert.equal(writes.slice(-28).length, 28)
const presetWrites = new Map(writes.slice(-28))
assert.equal(presetWrites.get('sidebarDark'), '#000000ff')
assert.equal(presetWrites.get('mainDark'), '#000000ff')
assert.equal(presetWrites.get('codeDark'), '#000000ff')
assert.equal(presetWrites.get('borderL1Dark'), '#ffffff05')
assert.equal(presetWrites.get('borderL2Dark'), '#ffffff15')
assert.equal(presetWrites.get('borderL3Dark'), '#ffffff07')
assert.equal(presetWrites.get('borderL4Dark'), '#ffffff12')
assert.equal(presetWrites.get('neutral00Dark'), '#7f8287ff')
assert.equal(presetWrites.get('neutral600Dark'), '#0f0f0fff')
assert.equal(presetWrites.get('neutral900Dark'), '#030303ff')
assert.equal(presetWrites.has('neutral1000Dark'), false)
assert.equal(presetWrites.has('sidebarLight'), false)
const presetLayer = overrides.filter((entry) => entry.source === 'ui-colors').at(-1).tokens
assert.deepEqual(presetLayer['--dsw-specific-sidebar-fill'], {
  light: '#112233ff',
  dark: '#000000ff',
})
assert.deepEqual(presetLayer['--dsw-alias-bg-layer-1'], {
  light: '#ffffffff',
  dark: '#000000ff',
})
assert.deepEqual(presetLayer['--dsw-alias-border-l1'], {
  light: '#0000000a',
  dark: '#ffffff05',
})
assert.deepEqual(presetLayer['--dsw-alias-border-l4'], {
  light: '#00000029',
  dark: '#ffffff12',
})
assert.deepEqual(presetLayer['--dsw-static-neutral-00'], {
  light: '#ffffffff',
  dark: '#7f8287ff',
})
assert.deepEqual(presetLayer['--dsw-static-neutral-900'], {
  light: '#0f0f0fff',
  dark: '#030303ff',
})
assert.equal(presetLayer['--dsw-static-neutral-1000'], undefined)

injected.setColor('main', 'light', '#112233ff')
assert.deepEqual(writes.at(-1), ['preset', 'custom'])
assert.equal(
  overrides.filter((entry) => entry.source === 'ui-colors').at(-1).tokens['--dsw-specific-sidebar-fill'].dark,
  '#000000ff',
)

injected.applyPreset('copper-patina')
assert.deepEqual(writes.at(-1), ['preset', 'copper-patina'])
assert.equal(writes.slice(-57).length, 57)
const copperWrites = new Map(writes.slice(-57))
assert.equal(copperWrites.get('sidebarLight'), '#f1e5d5ff')
assert.equal(copperWrites.get('sidebarDark'), '#0e1a18ff')
assert.equal(copperWrites.get('borderL1Light'), '#9a5b2e14')
assert.equal(copperWrites.get('borderL4Dark'), '#e08a4e5c')
assert.equal(copperWrites.get('neutral00Light'), '#fffaf3ff')
assert.equal(copperWrites.get('neutral1000Dark'), '#090706ff')
const copperLayer = overrides.filter((entry) => entry.source === 'ui-colors').at(-1).tokens
assert.deepEqual(copperLayer['--dsw-specific-sidebar-fill'], {
  light: '#f1e5d5ff',
  dark: '#0e1a18ff',
})
assert.deepEqual(copperLayer['--dsw-alias-border-l4'], {
  light: '#9a5b2e47',
  dark: '#e08a4e5c',
})
assert.deepEqual(copperLayer['--dsw-static-neutral-1000'], {
  light: '#18110dff',
  dark: '#090706ff',
})

injected.applyPreset('gruvbox')
assert.deepEqual(writes.at(-1), ['preset', 'gruvbox'])
assert.equal(writes.slice(-57).length, 57)
const gruvboxWrites = new Map(writes.slice(-57))
assert.equal(gruvboxWrites.get('mainLight'), '#fbf1c7ff')
assert.equal(gruvboxWrites.get('mainDark'), '#282828ff')
assert.equal(gruvboxWrites.get('borderL2Light'), '#7c6f6424')
assert.equal(gruvboxWrites.get('borderL2Dark'), '#a8998433')
assert.equal(gruvboxWrites.get('neutral500Dark'), '#3c3836ff')
const gruvboxLayer = overrides.filter((entry) => entry.source === 'ui-colors').at(-1).tokens
assert.deepEqual(gruvboxLayer['--dsw-alias-bg-layer-1'], {
  light: '#fbf1c7ff',
  dark: '#32302fff',
})
assert.deepEqual(gruvboxLayer['--dsw-static-neutral-1000'], {
  light: '#0d0e0fff',
  dark: '#060708ff',
})

injected.applyPreset('high-contrast')
assert.deepEqual(writes.at(-1), ['preset', 'high-contrast'])
const highContrastWrites = new Map(writes.slice(-57))
assert.equal(highContrastWrites.get('mainLight'), '#ffffffff')
assert.equal(highContrastWrites.get('mainDark'), '#000000ff')
assert.equal(highContrastWrites.get('borderL4Light'), '#000000cc')
assert.equal(highContrastWrites.get('borderL4Dark'), '#ffffffd9')
assert.equal(highContrastWrites.get('neutral500Light'), '#666666ff')
assert.equal(highContrastWrites.get('neutral500Dark'), '#999999ff')

injected.applyPreset('yellow-blood')
assert.deepEqual(writes.at(-1), ['preset', 'yellow-blood'])
const yellowBloodWrites = new Map(writes.slice(-57))
assert.equal(yellowBloodWrites.get('mainLight'), '#fffbe0ff')
assert.equal(yellowBloodWrites.get('mainDark'), '#120707ff')
assert.equal(yellowBloodWrites.get('bubbleDark'), '#4a0b0bff')
assert.equal(yellowBloodWrites.get('borderL1Dark'), '#f5d90a33')
assert.equal(yellowBloodWrites.get('borderL3Dark'), '#ff2e2e99')
assert.equal(yellowBloodWrites.get('neutral500Light'), '#9c6f14ff')
assert.equal(yellowBloodWrites.get('neutral500Dark'), '#4a260cff')

injected.applyPreset('nord')
assert.deepEqual(writes.at(-1), ['preset', 'nord'])
const nordWrites = new Map(writes.slice(-57))
assert.equal(nordWrites.get('mainLight'), '#eceff4ff')
assert.equal(nordWrites.get('mainDark'), '#2e3440ff')
assert.equal(nordWrites.get('codeDark'), '#2e3440ff')
assert.equal(nordWrites.get('borderL4Dark'), '#d8dee9cc')
assert.equal(nordWrites.get('neutral500Light'), '#5e6f8aff')
assert.equal(nordWrites.get('neutral500Dark'), '#81a1c1ff')

injected.applyPreset('clean')
assert.deepEqual(writes.at(-1), ['preset', 'clean'])
assert.equal(unsets.length, 56)
assert.equal(unsets[0], 'sidebarLight')
assert.equal(unsets.at(-1), 'neutral1000Dark')
assert.ok(unsets.includes('borderL1Light'))
assert.ok(unsets.includes('neutral00Light'))
assert.ok(disposed.includes('ui-colors'))

const beforeRadius = layerCounts()
injected.setRadiusMode('half')
assert.deepEqual(writes.at(-1), ['radiusMode', 'half'])
const afterRadius = layerCounts()
assert.equal(afterRadius.radius, beforeRadius.radius + 1)
assert.equal(afterRadius.palette, beforeRadius.palette)
assert.equal(afterRadius.colors, beforeRadius.colors)
assert.deepEqual(overrides.filter((entry) => entry.source === 'ui-colors-radius').at(-1).tokens, {
  '--dsw-radius-xs': { light: '2px', dark: '2px' },
  '--dsw-radius-sm': { light: '4px', dark: '4px' },
  '--dsw-radius-md': { light: '6px', dark: '6px' },
  '--dsw-radius-lg': { light: '8px', dark: '8px' },
  '--dsw-radius-xl': { light: '10px', dark: '10px' },
  '--dsw-radius-panel': { light: '14px', dark: '14px' },
})
injected.setRadiusMode('none')
assert.deepEqual(writes.at(-1), ['radiusMode', 'none'])
assert.deepEqual(overrides.filter((entry) => entry.source === 'ui-colors-radius').at(-1).tokens, {
  '--dsw-radius-xs': { light: '0px', dark: '0px' },
  '--dsw-radius-sm': { light: '0px', dark: '0px' },
  '--dsw-radius-md': { light: '0px', dark: '0px' },
  '--dsw-radius-lg': { light: '0px', dark: '0px' },
  '--dsw-radius-xl': { light: '0px', dark: '0px' },
  '--dsw-radius-panel': { light: '0px', dark: '0px' },
})
injected.setRadiusMode('default')
assert.deepEqual(writes.at(-1), ['radiusMode', 'default'])

const beforePalette = layerCounts()
injected.setPalette('ember')
assert.deepEqual(writes.at(-1), ['palette', 'ember'])
const afterPalette = layerCounts()
assert.equal(afterPalette.palette, beforePalette.palette + 1)
assert.equal(afterPalette.colors, beforePalette.colors)
assert.equal(afterPalette.radius, beforePalette.radius)
assert.equal(
  overrides.filter((entry) => entry.source === 'ui-colors-palette').at(-1).tokens['--dsw-static-deepseek-500'].light,
  '#d24636',
)
// A stale form snapshot must not overwrite the pending selection.
for (const listener of formListeners) listener()
assert.equal(
  overrides.filter((entry) => entry.source === 'ui-colors-palette').at(-1).tokens['--dsw-static-deepseek-500'].light,
  '#d24636',
)
injected.setPalette('plum')
assert.deepEqual(writes.at(-1), ['palette', 'plum'])
assert.equal(
  overrides.filter((entry) => entry.source === 'ui-colors-palette').at(-1).tokens['--dsw-static-deepseek-500'].light,
  '#9e62ab',
)
injected.setPalette('charcoal')
assert.deepEqual(writes.at(-1), ['palette', 'charcoal'])
assert.equal(
  overrides.filter((entry) => entry.source === 'ui-colors-palette').at(-1).tokens['--dsw-static-deepseek-500'].light,
  '#6080a1',
)
injected.setPalette('solarized')
assert.deepEqual(writes.at(-1), ['palette', 'solarized'])
assert.equal(
  overrides.filter((entry) => entry.source === 'ui-colors-palette').at(-1).tokens['--dsw-static-deepseek-500'].light,
  '#268bd2',
)
injected.setPalette('cyan-oled')
assert.deepEqual(writes.at(-1), ['palette', 'cyan-oled'])
const cyanLayer = overrides.filter((entry) => entry.source === 'ui-colors-palette').at(-1).tokens
assert.equal(cyanLayer['--dsw-alias-link'].light, '#0891b2')
assert.equal(cyanLayer['--dsw-alias-link'].dark, '#22d3ee')
assert.equal(cyanLayer['--dsw-static-deepseek-500'].light, '#0891b2')
assert.equal(cyanLayer['--dsw-static-deepseek-500'].dark, '#22d3ee')
assert.notEqual(cyanLayer['--dsw-alias-bg-base'].light, '#000000')
assert.equal(cyanLayer['--dsw-alias-bg-base'].dark, '#000000')
assert.equal(Object.keys(cyanLayer).length, 178)
injected.setPalette('neon-yellow')
assert.deepEqual(writes.at(-1), ['palette', 'neon-yellow'])
const neonYellowLayer = overrides.filter((entry) => entry.source === 'ui-colors-palette').at(-1).tokens
assert.equal(neonYellowLayer['--dsw-alias-link'].light, '#a67c00')
assert.equal(neonYellowLayer['--dsw-alias-link'].dark, '#f5e900')
assert.equal(neonYellowLayer['--dsw-static-deepseek-500'].light, '#a67c00')
assert.equal(neonYellowLayer['--dsw-static-deepseek-500'].dark, '#f5e900')
assert.notEqual(neonYellowLayer['--dsw-alias-bg-base'].light, '#000000')
assert.equal(neonYellowLayer['--dsw-alias-bg-base'].dark, '#000000')
assert.ok(bodyAttrs.has('data-dsh-ui-colors-full-theme'))
injected.setPalette('acid')
assert.deepEqual(writes.at(-1), ['palette', 'acid'])
const fullThemeLayer = overrides.filter((entry) => entry.source === 'ui-colors-palette').at(-1).tokens
assert.notEqual(fullThemeLayer['--dsw-alias-bg-base'].light, '#000000')
assert.equal(fullThemeLayer['--dsw-alias-bg-base'].dark, '#000000')
assert.notEqual(fullThemeLayer['--dsw-alias-label-primary'].light, '#ccffcc')
assert.equal(fullThemeLayer['--dsw-alias-label-primary'].dark, '#ccffcc')
assert.equal(fullThemeLayer['--dsw-static-deepseek-500'].light, '#008f25')
assert.equal(fullThemeLayer['--dsw-static-deepseek-500'].dark, '#00ff41')
assert.equal(fullThemeLayer['--dsw-static-neutral-bluish-00'].light, '#ffffff')
assert.equal(fullThemeLayer['--dsw-static-neutral-bluish-00'].dark, '#ffffff')
assert.equal(fullThemeLayer['--dsw-alias-tooltip-bg'].dark, '#0a120a')
assert.equal(fullThemeLayer['--dsw-alias-border-l1'].light, '#0000000a')
assert.equal(fullThemeLayer['--dsw-alias-border-l1'].dark, '#00000033')
assert.equal(fullThemeLayer['--dsw-alias-border-l4'].light, '#00000029')
assert.equal(fullThemeLayer['--dsw-alias-border-l4'].dark, '#000000')
assert.ok(bodyAttrs.has('data-dsh-ui-colors-full-theme'))
assert.ok(!style.textContent.includes('border:1px solid #000000'))
assert.ok(!style.textContent.includes('--dsh-ui-colors-accent'))
assert.ok(!style.textContent.includes('color-scheme'))
injected.setPalette('bluish')
assert.deepEqual(writes.at(-1), ['palette', 'bluish'])
assert.ok(disposed.includes('ui-colors-palette'))
assert.ok(!bodyAttrs.has('data-dsh-ui-colors-full-theme'))

// The switch derives independent light and dark themes from the selected spectrum.
injected.setSemanticTheme(true)
assert.deepEqual(writes.at(-1), ['semanticTheme', true])
const bluishFull = overrides.filter((entry) => entry.source === 'ui-colors-palette').at(-1).tokens
assert.notEqual(bluishFull['--dsw-alias-bg-base'].light, '#000000')
assert.equal(bluishFull['--dsw-alias-bg-base'].dark, '#000000')
assert.equal(bluishFull['--dsw-alias-link'].light, '#4868b2')
assert.equal(bluishFull['--dsw-alias-link'].dark, '#7aaaff')
assert.equal(bluishFull['--dsw-static-deepseek-500'].light, '#4868b2')
assert.equal(bluishFull['--dsw-static-deepseek-500'].dark, '#7aaaff')
assert.equal(bluishFull['--dsw-alias-border-l4'].light, '#00000029')
assert.equal(bluishFull['--dsw-alias-border-l4'].dark, '#ffffff33')
assert.equal(bluishFull['--dsw-alias-state-success-primary'].light, '#0f7a2e')
assert.equal(bluishFull['--dsw-alias-state-success-primary'].dark, '#00ff41')
assert.equal(Object.keys(bluishFull).length, 178)
assert.ok(bodyAttrs.has('data-dsh-ui-colors-full-theme'))

injected.setPalette('olive')
assert.deepEqual(writes.at(-1), ['palette', 'olive'])
const oliveFull = overrides.filter((entry) => entry.source === 'ui-colors-palette').at(-1).tokens
assert.equal(oliveFull['--dsw-alias-link'].light, '#717100')
assert.equal(oliveFull['--dsw-alias-link'].dark, '#b0b240')
assert.equal(oliveFull['--dsw-static-deepseek-500'].light, '#717100')
assert.equal(oliveFull['--dsw-static-deepseek-500'].dark, '#b0b240')
assert.notEqual(oliveFull['--dsw-alias-label-primary'].light, oliveFull['--dsw-alias-label-primary'].dark)
assert.equal(bluishFull['--dsw-static-neutral-bluish-00'].light, '#ffffff')
assert.equal(bluishFull['--dsw-static-neutral-bluish-00'].dark, '#ffffff')
assert.equal(bluishFull['--dsw-static-neutral-bluish-1000'].light, '#0f1115')
assert.equal(bluishFull['--dsw-static-neutral-bluish-1000'].dark, '#0f1115')
assert.notEqual(bluishFull['--dsw-alias-tooltip-bg'].light, '#ffffff')
assert.notEqual(bluishFull['--dsw-alias-tooltip-bg'].dark, '#ffffff')
assert.equal(oliveFull['--dsw-static-neutral-1000'].light, '#000000')
assert.equal(oliveFull['--dsw-static-neutral-1000'].dark, '#000000')
assert.equal(oliveFull['--dsw-static-neutral-00'].light, '#ffffff')
assert.equal(oliveFull['--dsw-static-neutral-00'].dark, '#ffffff')
// Full theme, preset, then clear a neutral: the theme must stay active and
// the color layer must remain above the rebuilt palette layer.
injected.applyPreset('copper-patina')
assert.equal(syncedStates.at(-1).semanticTheme, true)
const paletteBeforeNeutralClear = layerCounts().palette
injected.clearNeutral('500', 'light')
assert.equal(syncedStates.at(-1).semanticTheme, true)
assert.equal(layerCounts().palette, paletteBeforeNeutralClear + 1)
assert.ok(bodyAttrs.has('data-dsh-ui-colors-full-theme'))
assert.ok(lastLayerIndex('ui-colors') > lastLayerIndex('ui-colors-palette'))
assert.ok(
  overrides.filter((entry) => entry.source === 'ui-colors-palette').at(-1).tokens['--dsw-alias-link'],
)

injected.setSemanticTheme(false)
assert.deepEqual(writes.at(-1), ['semanticTheme', false])
assert.ok(!bodyAttrs.has('data-dsh-ui-colors-full-theme'))
assert.equal(
  overrides.filter((entry) => entry.source === 'ui-colors-palette').at(-1).tokens['--dsw-alias-link'],
  undefined,
)

const allColors = {
  sidebar: { light: '#11223380', dark: '#445566ff' },
  main: { light: '#223344cc', dark: '#334455ff' },
  layer1: { light: '#9aa0a8ff', dark: '#14181cff' },
  secondary: { light: '#c0c8d0ff', dark: '#101418ff' },
  composer: { light: '#445566ff', dark: '#556677ff' },
  panel: { light: '#667788ff', dark: '#778899ff' },
  bubble: { light: '#8899aaff', dark: '#99aabbff' },
  code: { light: '#aabbccff', dark: '#bbccddff' },
}
const allBorders = {
  l1: { light: '#0000000a', dark: '#ffffff0f' },
  l2: { light: '#ff000080', dark: '#00ff0040' },
  l3: { light: '#11223344', dark: '#55667788' },
  l4: { light: '', dark: '' },
}
const neutralIds = ['00', '50', '100', '150', '200', '250', '300', '400', '500', '550', '600', '700', '800', '850', '900', '1000']
const allNeutrals = Object.fromEntries(neutralIds.map((id) => [id, { light: '', dark: '' }]))
allNeutrals['400'] = { light: '#12345680', dark: '#abcdef40' }
const tree = registration.component({
  useStore: (selector) => selector({ colors: allColors, borders: allBorders, neutrals: allNeutrals, preset: 'custom', radiusMode: 'half', palette: 'olive', semanticTheme: false, status: 'ready', revision: 0 }),
  setColor: injected.setColor,
  clearColor: injected.clearColor,
  setBorder: injected.setBorder,
  clearBorder: injected.clearBorder,
  setNeutral: injected.setNeutral,
  clearNeutral: injected.clearNeutral,
  applyPreset: injected.applyPreset,
  reset: injected.reset,
  resetBorders: injected.resetBorders,
  resetNeutrals: injected.resetNeutrals,
  setRadiusMode: injected.setRadiusMode,
  setPalette: injected.setPalette,
  setSemanticTheme: injected.setSemanticTheme,
  setSyntaxTheme: injected.setSyntaxTheme,
  setSpectrumSelection: injected.setSpectrumSelection,
})
assert.equal(tree.type, 'div')
assert.equal(tree.props.className, 'dsh-ui-colors-section')

const nodes = []
const walk = (node) => {
  if (!node || typeof node !== 'object') return
  if (Array.isArray(node)) {
    for (const child of node) walk(child)
    return
  }
  if (typeof node.type === 'function') {
    walk(node.type(node.props))
    return
  }
  nodes.push(node)
  for (const child of node.children ?? []) walk(child)
}
walk(tree)

const titleNodes = nodes.filter((node) => node.props?.className === 'dsh-ui-colors-title')
assert.ok(titleNodes.every((node) => node.type === 'h3'))
const titles = titleNodes.map((node) => node.children[0])
assert.deepEqual(titles, ['Palette', 'Syntax highlighter', 'Colors', 'Neutral', 'Borders', 'Border radius'])
const descriptions = nodes
  .filter((node) => node.props?.className === 'dsh-ui-colors-desc')
  .map((node) => node.children[0])
assert.deepEqual(descriptions, [
  'Recolors the shared neutral-bluish and blue/deepseek scales, applies the full semantic theme, or loads a named preset.',
  'Shiki CSS-variable token colors for fenced code blocks. Default keeps the host theme; code block background and foreground stay with Code blocks.',
  'Set a #RRGGBBAA fill per surface; an empty mode keeps its theme default. Only the sidebar adjusts its text.',
  'Set a #RRGGBBAA value for each pure neutral static step; empty keeps the active theme value.',
  'Set a #RRGGBBAA border color per level; empty keeps the theme default. Border 4 also feeds some dividers and strong strokes.',
])

const statusNode = nodes.find((node) => node.props?.className === 'dsh-ui-colors-status')
assert.equal(statusNode?.props.role, 'status')
const disclosures = nodes.filter((node) => node.props?.className === 'dsh-ui-colors-disclosure')
assert.equal(disclosures.length, 2)
assert.equal(disclosures[0].props.open, undefined)
assert.equal(disclosures[1].props.open, undefined)
const summaries = nodes.filter((node) => node.props?.className === 'dsh-ui-colors-summary')
assert.equal(summaries.length, 2)
assert.equal(summaries[0].children[0].children[0], 'Show neutral inputs')
assert.equal(summaries[1].children[0].children[0], 'Show border inputs')
assert.equal(nodes.filter((node) => node.props?.className === 'dsh-ui-colors-grid').length, 3)

const cells = nodes.filter((node) => node.props?.className === 'dsh-ui-colors-cell')
assert.equal(cells.length, 28)
const cellTitles = nodes
  .filter((node) => node.props?.className === 'dsh-ui-colors-cell-title')
  .map((node) => node.children[0])
assert.deepEqual(cellTitles, [
  'Sidebar', 'Main', 'Raised Surface', 'Secondary Main', 'Composer', 'Right panel', 'User bubble', 'Code blocks',
  ...neutralIds.map((id) => `Neutral ${id}`),
  'Border 1', 'Border 2', 'Border 3', 'Border 4',
])

const inputs = nodes.filter((node) => node.type === 'input').map((node) => node.props)
const textInputs = inputs.filter((input) => input.type === 'text')
const radios = inputs.filter((input) => input.type === 'radio')
assert.equal(textInputs.length, 56)
for (const input of textInputs) {
  assert.equal(input.maxLength, 9)
  assert.equal(input.pattern, '#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?')
}

const sidebarLight = textInputs.find((input) => input['aria-label'] === 'Sidebar Light RGBA hex color')
assert.ok(sidebarLight)
sidebarLight.onChange({ target: { value: '11223380' } })
assert.equal(nextDraft.sidebar.light, '#11223380')
sidebarLight.onChange({ target: { value: '#GG1234' } })
assert.equal(nextDraft.sidebar.light, '#1234')
sidebarLight.onChange({ target: { value: '' } })
assert.equal(nextDraft.sidebar.light, '')

const mainDark = textInputs.find((input) => input['aria-label'] === 'Main Dark RGBA hex color')
assert.ok(mainDark)
mainDark.onChange({ target: { value: '8899aaff' } })
assert.equal(nextDraft.main.dark, '#8899aaff')

const neutralFourHundredLight = textInputs.find((input) => input['aria-label'] === 'Neutral 400 Light RGBA hex color')
assert.ok(neutralFourHundredLight)
assert.equal(neutralFourHundredLight.value, '#12345680')
neutralFourHundredLight.onChange({ target: { value: 'abcdef00' } })
assert.equal(nextDraft['400'].light, '#abcdef00')

const borderTwoLight = textInputs.find((input) => input['aria-label'] === 'Border 2 Light RGBA hex color')
assert.ok(borderTwoLight)
assert.equal(borderTwoLight.value, '#ff000080')
borderTwoLight.onChange({ target: { value: '00ff00ff' } })
assert.equal(nextDraft.l2.light, '#00ff00ff')

const clearButtons = nodes.filter((node) => node.props?.className === 'dsh-ui-colors-clear')
assert.equal(clearButtons.length, 56)
for (const button of clearButtons) {
  assert.equal(button.type, 'button')
  assert.equal(button.children[0], '×')
}
const borderFourLightClear = clearButtons.find((button) => button.props['aria-label'] === 'Clear Border 4 Light color')
assert.ok(borderFourLightClear)
assert.equal(borderFourLightClear.props.disabled, true)
const neutralZeroClear = clearButtons.find((button) => button.props['aria-label'] === 'Clear Neutral 00 Light color')
assert.ok(neutralZeroClear)
assert.equal(neutralZeroClear.props.disabled, true)
const neutralFourHundredClear = clearButtons.find((button) => button.props['aria-label'] === 'Clear Neutral 400 Light color')
assert.ok(neutralFourHundredClear)
assert.equal(neutralFourHundredClear.props.disabled, false)
neutralFourHundredClear.props.onClick()
assert.equal(nextDraft['400'].light, '')
const mainLightClear = clearButtons.find((button) => button.props['aria-label'] === 'Clear Main Light color')
assert.ok(mainLightClear)
mainLightClear.props.onClick()
assert.equal(nextDraft.main.light, '')

const partialColors = {
  ...allColors,
  main: { light: '#223344ff', dark: '' },
}
const partialTree = registration.component({
  useStore: (selector) => selector({ colors: partialColors, borders: allBorders, neutrals: allNeutrals, preset: 'custom', radiusMode: 'half', palette: 'olive', semanticTheme: false, status: 'ready', revision: 0 }),
  setColor: injected.setColor,
  clearColor: injected.clearColor,
  setBorder: injected.setBorder,
  clearBorder: injected.clearBorder,
  setNeutral: injected.setNeutral,
  clearNeutral: injected.clearNeutral,
  applyPreset: injected.applyPreset,
  reset: injected.reset,
  resetBorders: injected.resetBorders,
  resetNeutrals: injected.resetNeutrals,
  setRadiusMode: injected.setRadiusMode,
  setPalette: injected.setPalette,
  setSemanticTheme: injected.setSemanticTheme,
})
const partialNodes = []
const walkPartial = (node) => {
  if (!node || typeof node !== 'object') return
  if (Array.isArray(node)) {
    for (const child of node) walkPartial(child)
    return
  }
  if (typeof node.type === 'function') {
    walkPartial(node.type(node.props))
    return
  }
  partialNodes.push(node)
  for (const child of node.children ?? []) walkPartial(child)
}
walkPartial(partialTree)
const mainDarkClear = partialNodes.find(
  (node) => node.props?.className === 'dsh-ui-colors-clear' && node.props['aria-label'] === 'Clear Main Dark color',
)
assert.ok(mainDarkClear)
assert.equal(mainDarkClear.props.disabled, true)

const resetButtons = nodes.filter((node) => node.props?.className === 'dsh-ui-colors-reset')
assert.equal(resetButtons.length, 3)
assert.equal(resetButtons[0].props.disabled, false)
assert.equal(resetButtons[1].props.disabled, false)
assert.equal(resetButtons[2].props.disabled, false)

const paletteButton = nodes.find((node) => node.type === 'button' && node.props['aria-label'] === 'Palette spectrum')
assert.ok(paletteButton)
assert.equal(paletteButton.props['aria-controls'], 'palette-listbox')
const paletteMenu = nodes.find((node) => node.props?.role === 'listbox' && node.props.id === 'palette-listbox')
assert.ok(paletteMenu)
assert.equal(paletteButton.props['aria-expanded'], false)
const pickerLabel = nodes.find((node) => node.props?.className === 'dsh-ui-colors-picker-label')
assert.ok(pickerLabel)
assert.equal(pickerLabel.children[0], 'Olive')
const pickerMenu = nodes.find((node) => node.props?.className === 'dsh-ui-colors-menu')
assert.ok(pickerMenu)
assert.equal(pickerMenu.props.hidden, true)

const paletteOptions = nodes.filter(
  (node) => node.type === 'button' && node.props['data-dsh-picker'] === 'palette',
)
assert.equal(paletteOptions.length, 9)
const paletteLabels = paletteOptions.map((node) => node.children[0].children[0])
assert.deepEqual(paletteLabels, ['Bluish (default)', 'Olive', 'Ember', 'Midnight Plum', 'Deep Charcoal', 'Solarized', 'Cyan OLED', 'Neon Yellow', 'Acid Hacker Green'])
const focused = []
const fakeOptions = paletteOptions.map((_, index) => ({ focus: () => focused.push(index) }))
const fakeMenu = { querySelectorAll: () => fakeOptions }
const fakePicker = { querySelector: (selector) => selector === '[role="listbox"]' ? fakeMenu : null }
const fakeTrigger = { closest: () => fakePicker }
paletteButton.props.onClick({ currentTarget: fakeTrigger })
assert.deepEqual(focused, [1])
const oliveOption = paletteOptions.find((node) => node.children[0].children[0] === 'Olive')
assert.ok(oliveOption)
assert.ok(String(oliveOption.props.className).includes('dsh-ui-colors-option-active'))
assert.equal(oliveOption.children[1].children[0].props.style.color, '#b0b240')
const emberOption = paletteOptions.find((node) => node.children[0].children[0] === 'Ember')
assert.ok(emberOption)
assert.equal(emberOption.children[1].children[0].props.style.color, '#f38877')
const cyanOption = paletteOptions.find((node) => node.children[0].children[0] === 'Cyan OLED')
assert.ok(cyanOption)
assert.equal(cyanOption.children[1].children[0].props.style.color, '#22d3ee')
emberOption.props.onClick()
assert.deepEqual(writes.at(-1), ['palette', 'ember'])

const syntaxButton = nodes.find((node) => node.type === 'button' && node.props['aria-label'] === 'Syntax theme')
assert.ok(syntaxButton)
assert.equal(syntaxButton.props['aria-expanded'], false)
assert.equal(syntaxButton.props['aria-controls'], 'syntax-listbox')
assert.equal(typeof syntaxButton.props.onKeyDown, 'function')
const syntaxMenu = nodes.find((node) => node.props?.role === 'listbox' && node.props.id === 'syntax-listbox')
assert.ok(syntaxMenu)
const syntaxOptions = nodes.filter(
  (node) => node.type === 'button' && node.props['data-dsh-picker'] === 'syntax',
)
assert.equal(syntaxOptions.length, 6)
assert.ok(syntaxOptions.every((node) => node.props.role === 'option'))
assert.ok(syntaxOptions.every((node) => node.props.tabIndex === -1))
assert.ok(syntaxOptions.every((node) => typeof node.props.onKeyDown === 'function'))
const syntaxLabels = syntaxOptions.map((node) => node.children[0].children[0])
assert.deepEqual(syntaxLabels, ['Default', 'GitHub', 'Nord', 'Dracula', 'Solarized', 'Monokai'])
const githubSyntaxOption = syntaxOptions.find((node) => node.children[0].children[0] === 'GitHub')
assert.ok(githubSyntaxOption)
assert.deepEqual(
  githubSyntaxOption.children[1].children.map((node) => node.props.style.color),
  ['#8b949e', '#ff7b72', '#a5d6ff', '#d2a8ff'],
)
githubSyntaxOption.props.onClick()
assert.deepEqual(writes.at(-1), ['syntaxTheme', 'github'])

const presetButton = nodes.find((node) => node.type === 'button' && node.props['aria-label'] === 'Color preset')
assert.ok(presetButton)
assert.equal(presetButton.props['aria-expanded'], false)
const presetOptions = nodes.filter(
  (node) => node.type === 'button' && node.props['data-dsh-picker'] === 'preset',
)
assert.equal(presetOptions.length, 8)
const presetLabels = presetOptions.map((node) => node.children[0].children[0])
assert.deepEqual(presetLabels, ['Custom', 'Pitch Black', 'Copper Patina', 'Gruvbox', 'High Contrast', 'Yellow Blood', 'Nord', 'Clean'])
const pitchBlackOption = presetOptions.find((node) => node.children[0].children[0] === 'Pitch Black')
assert.ok(pitchBlackOption)
assert.deepEqual(
  pitchBlackOption.children[1].children.map((node) => node.props.style.color),
  ['#7f8287ff', '#181818ff'],
)
const copperOption = presetOptions.find((node) => node.children[0].children[0] === 'Copper Patina')
assert.ok(copperOption)
assert.deepEqual(
  copperOption.children[1].children.map((node) => node.props.style.color),
  ['#a88b6eff', '#564738ff'],
)
const gruvboxOption = presetOptions.find((node) => node.children[0].children[0] === 'Gruvbox')
assert.ok(gruvboxOption)
assert.deepEqual(
  gruvboxOption.children[1].children.map((node) => node.props.style.color),
  ['#665c54ff', '#3c3836ff'],
)
const highContrastOption = presetOptions.find((node) => node.children[0].children[0] === 'High Contrast')
assert.ok(highContrastOption)
assert.deepEqual(
  highContrastOption.children[1].children.map((node) => node.props.style.color),
  ['#666666ff', '#999999ff'],
)
highContrastOption.props.onClick()
assert.deepEqual(writes.at(-1), ['preset', 'high-contrast'])
const yellowBloodOption = presetOptions.find((node) => node.children[0].children[0] === 'Yellow Blood')
assert.ok(yellowBloodOption)
assert.deepEqual(
  yellowBloodOption.children[1].children.map((node) => node.props.style.color),
  ['#9c6f14ff', '#4a260cff'],
)
yellowBloodOption.props.onClick()
assert.deepEqual(writes.at(-1), ['preset', 'yellow-blood'])
const nordOption = presetOptions.find((node) => node.children[0].children[0] === 'Nord')
assert.ok(nordOption)
assert.deepEqual(
  nordOption.children[1].children.map((node) => node.props.style.color),
  ['#5e6f8aff', '#81a1c1ff'],
)
nordOption.props.onClick()
assert.deepEqual(writes.at(-1), ['preset', 'nord'])
pitchBlackOption.props.onClick()
assert.deepEqual(writes.at(-1), ['preset', 'pitch-black'])

const checkboxes = inputs.filter((input) => input.type === 'checkbox')
assert.equal(checkboxes.length, 2)
const fullThemeCheckbox = checkboxes.find((input) => input['aria-label'] === 'Full semantic theme')
assert.ok(fullThemeCheckbox)
assert.equal(fullThemeCheckbox.checked, false)
assert.equal(fullThemeCheckbox.disabled, false)
fullThemeCheckbox.onChange({ target: { checked: true } })
assert.deepEqual(writes.at(-1), ['semanticTheme', true])
const selectionCheckbox = checkboxes.find((input) => input['aria-label'] === 'Apply spectrum to ::selection')
assert.ok(selectionCheckbox)
assert.equal(selectionCheckbox.checked, false)
selectionCheckbox.onChange({ target: { checked: true } })
assert.deepEqual(writes.at(-1), ['spectrumSelection', true])

const shapeCells = nodes.filter((node) => String(node.props?.className ?? '').startsWith('dsh-ui-shapes-cell'))
assert.equal(shapeCells.length, 3)
assert.equal(radios.length, 3)
assert.equal(radios.filter((input) => input.checked).length, 1)
assert.equal(radios.find((input) => input.checked).value, 'half')
const noneRadio = radios.find((input) => input.value === 'none')
assert.ok(noneRadio)
noneRadio.onChange()
assert.deepEqual(writes.at(-1), ['radiusMode', 'none'])

// Acid selects the full theme directly and locks the switch.
const acidTree = registration.component({
  useStore: (selector) => selector({ colors: allColors, borders: allBorders, neutrals: allNeutrals, preset: 'custom', radiusMode: 'half', palette: 'acid', semanticTheme: false, status: 'ready', revision: 0 }),
  setColor: injected.setColor,
  clearColor: injected.clearColor,
  setBorder: injected.setBorder,
  clearBorder: injected.clearBorder,
  setNeutral: injected.setNeutral,
  clearNeutral: injected.clearNeutral,
  applyPreset: injected.applyPreset,
  reset: injected.reset,
  resetBorders: injected.resetBorders,
  resetNeutrals: injected.resetNeutrals,
  setRadiusMode: injected.setRadiusMode,
  setPalette: injected.setPalette,
  setSemanticTheme: injected.setSemanticTheme,
})
nodes.length = 0
walk(acidTree)
const acidCheckbox = nodes.find((node) => node.type === 'input' && node.props?.type === 'checkbox')
assert.ok(acidCheckbox)
assert.equal(acidCheckbox.props.checked, true)
assert.equal(acidCheckbox.props.disabled, true)

// Cyan OLED also locks the full theme on.
const cyanTree = registration.component({
  useStore: (selector) => selector({ colors: allColors, borders: allBorders, neutrals: allNeutrals, preset: 'custom', radiusMode: 'half', palette: 'cyan-oled', semanticTheme: false, status: 'ready', revision: 0 }),
  setColor: injected.setColor,
  clearColor: injected.clearColor,
  setBorder: injected.setBorder,
  clearBorder: injected.clearBorder,
  setNeutral: injected.setNeutral,
  clearNeutral: injected.clearNeutral,
  applyPreset: injected.applyPreset,
  reset: injected.reset,
  resetBorders: injected.resetBorders,
  resetNeutrals: injected.resetNeutrals,
  setRadiusMode: injected.setRadiusMode,
  setPalette: injected.setPalette,
  setSemanticTheme: injected.setSemanticTheme,
})
nodes.length = 0
walk(cyanTree)
const cyanCheckbox = nodes.find((node) => node.type === 'input' && node.props?.type === 'checkbox')
assert.ok(cyanCheckbox)
assert.equal(cyanCheckbox.props.checked, true)
assert.equal(cyanCheckbox.props.disabled, true)

// Neon Yellow also locks the full theme on.
const neonTree = registration.component({
  useStore: (selector) => selector({ colors: allColors, borders: allBorders, neutrals: allNeutrals, preset: 'custom', radiusMode: 'half', palette: 'neon-yellow', semanticTheme: false, status: 'ready', revision: 0 }),
  setColor: injected.setColor,
  clearColor: injected.clearColor,
  setBorder: injected.setBorder,
  clearBorder: injected.clearBorder,
  setNeutral: injected.setNeutral,
  clearNeutral: injected.clearNeutral,
  applyPreset: injected.applyPreset,
  reset: injected.reset,
  resetBorders: injected.resetBorders,
  resetNeutrals: injected.resetNeutrals,
  setRadiusMode: injected.setRadiusMode,
  setPalette: injected.setPalette,
  setSemanticTheme: injected.setSemanticTheme,
})
nodes.length = 0
walk(neonTree)
const neonCheckbox = nodes.find((node) => node.type === 'input' && node.props?.type === 'checkbox')
assert.ok(neonCheckbox)
assert.equal(neonCheckbox.props.checked, true)
assert.equal(neonCheckbox.props.disabled, true)

// The same component render path accepts a Chinese translator.
const zhTranslate = (key, params) => {
  const template = locales.zh[key] ?? key
  return params === undefined
    ? template
    : template.replace(/\{(\w+)\}/g, (match, name) => params[name] === undefined ? match : String(params[name]))
}
const zhTree = registration.component({
  useStore: (selector) => selector({ colors: allColors, borders: allBorders, neutrals: allNeutrals, preset: 'custom', radiusMode: 'half', palette: 'olive', semanticTheme: false, syntaxTheme: 'default', spectrumSelection: false, status: 'ready', revision: 0 }),
  t: zhTranslate,
  setColor: injected.setColor,
  clearColor: injected.clearColor,
  setBorder: injected.setBorder,
  clearBorder: injected.clearBorder,
  setNeutral: injected.setNeutral,
  clearNeutral: injected.clearNeutral,
  applyPreset: injected.applyPreset,
  reset: injected.reset,
  resetBorders: injected.resetBorders,
  resetNeutrals: injected.resetNeutrals,
  setRadiusMode: injected.setRadiusMode,
  setPalette: injected.setPalette,
  setSemanticTheme: injected.setSemanticTheme,
  setSyntaxTheme: injected.setSyntaxTheme,
  setSpectrumSelection: injected.setSpectrumSelection,
})
nodes.length = 0
walk(zhTree)
const zhTitles = nodes
  .filter((node) => node.props?.className === 'dsh-ui-colors-title')
  .map((node) => node.children[0])
assert.deepEqual(zhTitles, ['调色板', '语法高亮', '颜色', '中性色', '边框', '边框圆角'])
assert.ok(nodes.some((node) => node.props?.['aria-label'] === '调色板光谱'))
assert.ok(nodes.some((node) => node.props?.['aria-label'] === '将光谱应用于 ::selection'))

console.log('smoke: ok')
