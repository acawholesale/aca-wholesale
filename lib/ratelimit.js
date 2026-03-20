import redis from './redis.js'

/**
 * Simple sliding-window rate limiter using Upstash Redis.
 *
 * @param {string} ip        - Client IP address
 * @param {string} endpoint  - Short name for the route (e.g. "cart-save")
 * @param {object} opts
 * @param {number} opts.limit  - Max requests per window (default 10)
 * @param {number} opts.window - Window size in seconds (default 60)
 * @returns {{ success: boolean, remaining: number }}
 */
export async function rateLimit(ip, endpoint, { limit = 10, window = 60 } = {}) {
  const key = `rl:${endpoint}:${ip}`
  try {
    // INCR atomically increments (creates key at 0 first if missing)
    const count = await redis._cmd('INCR', key)
    // Only set expiry on the first request so the window doesn't keep resetting
    if (count === 1) {
      await redis._cmd('EXPIRE', key, window)
    }
    return { success: count <= limit, remaining: Math.max(0, limit - count) }
  } catch {
    // If Redis is unreachable, fail open so the site keeps working
    return { success: true, remaining: limit }
  }
}
