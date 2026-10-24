import { existsSync, readFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'

const THEME_RELATIVE = 'node_modules/@deepseek-ai/dsh-client-ui-theme/lib/client.js'

/** Locate the installed UI theme bundle without adding it as a dependency. */
export function findThemeClient() {
  const dshHome = process.env.DSH_HOME ?? join(homedir(), '.dsh')
  const candidates = [
    process.env.DSH_THEME_CLIENT,
    join(dshHome, 'profiles/web', THEME_RELATIVE),
    '/usr/local/lib/node_modules/@deepseek-ai/dsh/node_modules/@deepseek-ai/dsh-client-ui-theme/lib/client.js',
  ]
  return candidates.find((candidate) => candidate !== undefined && existsSync(candidate))
}

/** Extract unique --dsw/--shiki/--dsh custom properties from a theme bundle. */
export function extractThemeTokens(source) {
  return [...new Set(source.match(/--(?:dsw|shiki|dsh)-[a-z0-9-]+(?=\s*:)/g) ?? [])].sort()
}

export function readFixture(name) {
  return JSON.parse(readFileSync(new URL(`../test/fixtures/${name}`, import.meta.url), 'utf8'))
}
