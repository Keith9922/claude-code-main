/**
 * Bridge MINIMAX_* variables onto the existing Anthropic-compatible pathway.
 *
 * This project already supports Anthropic-compatible gateways via
 * ANTHROPIC_BASE_URL + ANTHROPIC_AUTH_TOKEN. Minimax can ride the exact same
 * path, so we only alias env vars when Anthropic-compatible vars are absent.
 */

function assignIfMissing(targetKey: string, sourceValue: string | undefined): void {
  if (!process.env[targetKey] && sourceValue) {
    process.env[targetKey] = sourceValue
  }
}

export function applyMinimaxCompatEnv(): void {
  assignIfMissing('ANTHROPIC_BASE_URL', process.env.MINIMAX_BASE_URL)
  assignIfMissing('ANTHROPIC_MODEL', process.env.MINIMAX_MODEL)
  assignIfMissing(
    'ANTHROPIC_DEFAULT_SONNET_MODEL',
    process.env.MINIMAX_DEFAULT_SONNET_MODEL || process.env.MINIMAX_MODEL,
  )
  assignIfMissing(
    'ANTHROPIC_DEFAULT_OPUS_MODEL',
    process.env.MINIMAX_DEFAULT_OPUS_MODEL || process.env.MINIMAX_MODEL,
  )
  assignIfMissing(
    'ANTHROPIC_DEFAULT_HAIKU_MODEL',
    process.env.MINIMAX_DEFAULT_HAIKU_MODEL || process.env.MINIMAX_MODEL,
  )

  if (!process.env.ANTHROPIC_AUTH_TOKEN && !process.env.ANTHROPIC_API_KEY) {
    assignIfMissing(
      'ANTHROPIC_AUTH_TOKEN',
      process.env.MINIMAX_AUTH_TOKEN || process.env.MINIMAX_API_KEY,
    )
  }
}
