import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { TOKEN_POLICY, auditTokens, classifyToken } from './token-policy.mjs'
import { extractThemeTokens, findThemeClient, readFixture } from '../scripts/theme-tokens.mjs'

const liveTheme = findThemeClient()
const tokens = liveTheme === undefined
  ? readFixture('theme-tokens.json')
  : extractThemeTokens(readFileSync(liveTheme, 'utf8'))
const fullTheme = new Set(readFixture('full-theme-tokens.json'))
const report = auditTokens(tokens, fullTheme)

assert.deepEqual(report.unmatched, [], 'every theme token must match exactly one policy')
assert.deepEqual(report.missingOwned, [], 'owned tokens must be present in the full-theme layer')
assert.deepEqual(report.unexpectedOwned, [], 'derived/host/ignored tokens must not be directly overridden')
assert.deepEqual(report.staleOwned, [], 'the full-theme layer must not retain removed theme tokens')
assert.equal(
  report.counts.owned + report.counts.derived + report.counts.syntax + report.counts.host + report.counts.ignored,
  tokens.length,
  'every token must be counted once',
)

for (const rule of TOKEN_POLICY) {
  if (rule.policy !== 'derived') continue
  for (const source of rule.derivedFrom) {
    const sourceRules = classifyToken(source)
    assert.equal(sourceRules.length, 1, `derived source must have one policy: ${source}`)
    assert.ok(
      sourceRules[0].policy === 'owned' || sourceRules[0].policy === 'derived',
      `derived source must be owned or derived: ${source}`,
    )
  }
}

console.log(
  `token-policy: ok · ${tokens.length} tokens · owned ${report.counts.owned}, derived ${report.counts.derived}, syntax ${report.counts.syntax}, host ${report.counts.host}, ignored ${report.counts.ignored}`,
)
