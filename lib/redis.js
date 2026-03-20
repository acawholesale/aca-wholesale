// Upstash Redis REST API — aucune dépendance npm requise
const redis = {
  async _cmd(...args) {
    const res = await fetch(process.env.UPSTASH_REDIS_REST_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args),
    })
    if (!res.ok) throw new Error(`Redis HTTP error: ${await res.text()}`)
    const data = await res.json()
    return data.result
  },

  // SET key value [EX seconds]
  async set(key, value, exSeconds = null) {
    const args = ['SET', key, JSON.stringify(value)]
    if (exSeconds) args.push('EX', exSeconds)
    return this._cmd(...args)
  },

  // GET key → objet JS ou null
  async get(key) {
    const val = await this._cmd('GET', key)
    return val ? JSON.parse(val) : null
  },

  // DEL key
  async del(key) {
    return this._cmd('DEL', key)
  },

  // KEYS pattern → tableau de clés
  async keys(pattern) {
    return this._cmd('KEYS', pattern)
  },
}

export default redis
