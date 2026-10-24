/**
 * Every theme token must match exactly one policy.
 *
 * owned    - the full-theme layer must override it.
 * derived  - no direct override; it resolves through owned tokens.
 * syntax   - controlled by the Syntax highlighter preset, host by default.
 * host     - intentionally left to DSH (status scales, depth).
 * ignored  - not a color token (typography, geometry, filters).
 */
const owned = (reason, match) => ({ policy: "owned", reason, match })
const derived = (reason, tokens, derivedFrom) => ({ policy: "derived", reason, tokens, derivedFrom })
const host = (reason, match) => ({ policy: "host", reason, match })
const ignored = (reason, match) => ({ policy: "ignored", reason, match })

export const TOKEN_POLICY = [
  owned("semantic surface and label aliases", /^--dsw-alias-/),
  owned("surface-specific fills and strokes", /^--dsw-specific-/),
  owned("palette-tinted neutral scales", /^--dsw-static-neutral-/),
  owned("palette-tinted blue scale", /^--dsw-static-blue-/),
  owned("palette-tinted deepseek accent scale", /^--dsw-static-deepseek-/),
  owned("focus and menu color roles", /^(?:--dsw-focus-ring-color|--dsw-menu-surface-fill)$/),

  derived("code syntax background and foreground follow aliases", ["--shiki-background", "--shiki-foreground"], ["--dsw-alias-markdown-code-block", "--dsw-alias-label-primary"]),
  derived("scrollbar colors follow scrollbar aliases", ["--dsh-scrollbar-thumb", "--dsh-scrollbar-thumb-hover"], ["--dsw-alias-scrollbar-bg-l1", "--dsw-alias-scrollbar-hover-l1"]),
  derived("elevation stroke follows border aliases", ["--dsw-elevation-stroke", "--dsw-elevation-stroke-color"], ["--dsw-alias-border-l3", "--dsw-alias-border-l4"]),

  { policy: "syntax", reason: "controlled by the Syntax highlighter presets", match: /^--shiki-token-/ },
  host("status scales keep semantic success/error/warning hues", /^--dsw-static-(?:green|red|amber)-/),
  host("onboarding decoration is intentionally host-owned", /^--dsw-gradient-onboarding-/),
  host("thinking fades are intentionally host-owned", /^--dsw-linear-(?:gradient-think|think-select)$/),
  host("depth shadows are neutral, not palette identity", /^--dsw-shadow-/),
  host("elevation shadows include host black-alpha depth", /^--dsw-elevation-(?:panel|prominent|soft)$/),

  ignored("typography tokens", /^--dsw-font-/),
  ignored("host typography tokens", /^--dsh-.*font/),
  ignored("geometry and scrollbar sizing", /^(?:--dsw-corner-shape|--dsw-focus-ring-width|--dsw-radius-|--dsh-scrollbar-(?:thumb-border|track-margin|width)$)/),
  ignored("blur and backdrop filters", /^(?:--dsw-mask-blur|--dsw-menu-backdrop-filter)$/),
]

function matches(rule, token) {
  if (rule.tokens !== undefined) return rule.tokens.includes(token)
  return rule.match.test(token)
}

export function classifyToken(token) {
  return TOKEN_POLICY.filter((rule) => matches(rule, token))
}

/**
 * @param {string[]} tokens
 * @param {Set<string>} [fullThemeTokens]
 */
export function auditTokens(tokens, fullThemeTokens) {
  const counts = { owned: 0, derived: 0, syntax: 0, host: 0, ignored: 0 }
  const unmatched = []
  const missingOwned = []
  const unexpectedOwned = []
  const staleOwned = fullThemeTokens === undefined
    ? []
    : [...fullThemeTokens].filter((token) => !tokens.includes(token)).sort()

  for (const token of tokens) {
    const rules = classifyToken(token)
    if (rules.length !== 1) {
      unmatched.push({ token, policies: rules.map((rule) => rule.policy) })
      continue
    }
    const rule = rules[0]
    counts[rule.policy] += 1
    if (fullThemeTokens !== undefined) {
      if (rule.policy === "owned" && !fullThemeTokens.has(token)) missingOwned.push(token)
      if (rule.policy !== "owned" && fullThemeTokens.has(token)) {
        unexpectedOwned.push({ token, policy: rule.policy })
      }
    }
  }

  return { counts, unmatched, missingOwned, unexpectedOwned, staleOwned }
}
