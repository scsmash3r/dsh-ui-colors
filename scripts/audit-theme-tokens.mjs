#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs'
import { auditTokens } from '../test/token-policy.mjs'
import { extractThemeTokens, findThemeClient, readFixture } from './theme-tokens.mjs'

const args = process.argv.slice(2)
const writeFixture = args.includes('--write-fixture')
const themeArg = args.find((arg) => arg.startsWith('--theme='))?.slice('--theme='.length)
const themePath = themeArg ?? findThemeClient()

if (themePath === undefined) {
  console.error('No theme bundle found. Set DSH_THEME_CLIENT=/path/to/ui-theme/lib/client.js.')
  process.exit(1)
}

const tokens = extractThemeTokens(readFileSync(themePath, 'utf8'))
if (writeFixture) {
  writeFileSync(new URL('../test/fixtures/theme-tokens.json', import.meta.url), `${JSON.stringify(tokens, null, 2)}\n`)
}

const fullTheme = new Set(readFixture('full-theme-tokens.json'))
const report = auditTokens(tokens, fullTheme)
console.log(`theme: ${themePath}`)
console.log(`tokens: ${tokens.length}`)
console.log(
  `policy: owned ${report.counts.owned}, derived ${report.counts.derived}, syntax ${report.counts.syntax}, host ${report.counts.host}, ignored ${report.counts.ignored}`,
)

for (const entry of report.unmatched) {
  console.error(`UNMATCHED ${entry.token} (${entry.policies.join(', ') || 'no policy'})`)
}
for (const token of report.missingOwned) {
  console.error(`MISSING OWNED ${token}`)
}
for (const entry of report.unexpectedOwned) {
  console.error(`UNEXPECTED OVERRIDE ${entry.token} (${entry.policy})`)
}
for (const token of report.staleOwned) {
  console.error(`STALE FULL-THEME TOKEN ${token}`)
}

if (
  report.unmatched.length > 0 ||
  report.missingOwned.length > 0 ||
  report.unexpectedOwned.length > 0 ||
  report.staleOwned.length > 0
) {
  process.exit(1)
}
console.log('token policy: ok')
