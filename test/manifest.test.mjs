import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import {
  SECTIONS,
  SECTION_BY_ID,
  MANIFEST_ITEMS,
  CONFIG_FIELDS,
  PRESETS,
} from '../lib/manifest.js'
import { Config } from '../lib/index.js'

const hex = /^#[0-9a-f]{8}$/i
const extraFields = ['radiusMode', 'palette', 'semanticTheme', 'syntaxTheme', 'spectrumSelection', 'preset']

// Every item has a unique field pair, section id, and valid placeholder.
const sectionIds = new Set()
const itemIds = new Set()
const fieldOwners = new Set()
for (const section of SECTIONS) {
  assert.equal(sectionIds.has(section.id), false, `duplicate section: ${section.id}`)
  sectionIds.add(section.id)
  assert.ok(section.label.length > 0, `missing section label: ${section.id}`)
  for (const item of section.items) {
    const key = `${section.id}:${item.id}`
    assert.equal(itemIds.has(key), false, `duplicate item: ${key}`)
    itemIds.add(key)
    for (const mode of ['light', 'dark']) {
      assert.ok(item.fields[mode].length > 0, `missing ${mode} field: ${key}`)
      assert.equal(fieldOwners.has(item.fields[mode]), false, `duplicate field: ${item.fields[mode]}`)
      fieldOwners.add(item.fields[mode])
      assert.match(item.placeholders[mode], hex, `bad ${mode} placeholder: ${key}`)
    }
  }
}

// The flattened field list is exactly the schema's color fields.
const flattened = MANIFEST_ITEMS.flatMap((item) => [item.fields.light, item.fields.dark])
assert.deepEqual(CONFIG_FIELDS, flattened)
assert.deepEqual(Object.keys(Config.dict), [...CONFIG_FIELDS, ...extraFields])

// Bundle metadata points at a real patch, and the client declares its locale dependency.
const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))
assert.equal(pkg.dsh.bundle.patch, './cordis.patch.yml')
assert.ok(existsSync(new URL('../cordis.patch.yml', import.meta.url)))
assert.ok(pkg.dsh.client.inject.includes('@deepseek-ai/dsh-client-locale'))
const bundlePatch = readFileSync(new URL('../cordis.patch.yml', import.meta.url), 'utf8')
assert.match(bundlePatch, /id:\s*ui-colors/)
assert.match(bundlePatch, /name:\s*dsh-ui-colors/)

// Presets only reference known sections, items, modes, and colors.
const groupSection = { colors: 'colors', borders: 'borders', neutrals: 'neutral' }
const presetIds = new Set()
for (const preset of PRESETS) {
  assert.equal(presetIds.has(preset.id), false, `duplicate preset: ${preset.id}`)
  presetIds.add(preset.id)
  assert.ok(preset.label.length > 0, `missing preset label: ${preset.id}`)
  for (const [group, values] of Object.entries(preset)) {
    if (group === 'id' || group === 'label') continue
    const sectionId = groupSection[group]
    assert.ok(sectionId, `unknown preset group: ${preset.id}.${group}`)
    const section = SECTION_BY_ID[sectionId]
    assert.ok(section, `unknown section for: ${preset.id}.${group}`)
    for (const [itemId, modes] of Object.entries(values)) {
      const item = section.items.find((entry) => entry.id === itemId)
      assert.ok(item, `unknown item: ${preset.id}.${group}.${itemId}`)
      for (const [mode, value] of Object.entries(modes)) {
        assert.ok(mode === 'light' || mode === 'dark', `bad mode: ${preset.id}.${group}.${itemId}.${mode}`)
        assert.match(value, hex, `bad value: ${preset.id}.${group}.${itemId}.${mode}`)
      }
    }
  }
}

console.log('manifest: ok')
