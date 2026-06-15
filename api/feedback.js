// Vercel serverless funksiya — tashrif buyuruvchilar qoldirgan fikr-mulohazalar.
// Ma'lumotlar Upstash Redis (REST) da `feedback` hash sifatida saqlanadi:
//   field = id,  value = JSON ({ id, name, role, text, ts }).
//
//   GET    -> barcha fikrlar (yangi -> eski tartibda)
//   POST   -> yangi fikr qo'shadi  { name, role?, text }   (hamma yubora oladi)
//   DELETE -> ?id=<id>  +  "Authorization: Bearer <FEEDBACK_ADMIN_TOKEN>"  (faqat egasi)
//
// Kerakli env o'zgaruvchilar (Vercel -> Settings -> Environment Variables):
//   UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN  — Upstash bazasidan
//   FEEDBACK_ADMIN_TOKEN                               — o'zingiz tanlagan maxfiy parol

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN
const ADMIN_TOKEN = process.env.FEEDBACK_ADMIN_TOKEN
const KEY = 'feedback'

// Upstash REST API'ga bitta buyruq yuboramiz: ["HSET", "feedback", id, json] kabi.
async function redis(command) {
  const r = await fetch(REDIS_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(command)
  })
  if (!r.ok) throw new Error(`Upstash javobi: ${r.status}`)
  const data = await r.json()
  return data.result
}

function clean(value, max) {
  return String(value == null ? '' : value)
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max)
}

export default async function handler(req, res) {
  if (!REDIS_URL || !REDIS_TOKEN) {
    res.status(500).json({ error: 'Upstash sozlanmagan (env yo\'q).' })
    return
  }

  try {
    // --- Barcha fikrlarni o'qish ---
    if (req.method === 'GET') {
      const flat = (await redis(['HGETALL', KEY])) || []
      const items = []
      for (let i = 0; i < flat.length; i += 2) {
        try {
          items.push(JSON.parse(flat[i + 1]))
        } catch {
          // buzilgan yozuvni e'tiborsiz qoldiramiz
        }
      }
      items.sort((a, b) => (b.ts || 0) - (a.ts || 0))
      res.setHeader('Cache-Control', 'no-store')
      res.status(200).json({ items })
      return
    }

    // --- Yangi fikr qo'shish (hamma yubora oladi) ---
    if (req.method === 'POST') {
      const body =
        typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
      const name = clean(body.name, 60)
      const role = clean(body.role, 80)
      const text = clean(body.text, 500)

      if (name.length < 2 || text.length < 5) {
        res.status(400).json({ error: 'Ism va fikr matni to\'liqroq bo\'lishi kerak.' })
        return
      }

      const id = `${Date.now().toString(36)}-${Math.round(Math.random() * 1e6).toString(36)}`
      const item = { id, name, role, text, ts: Date.now() }
      await redis(['HSET', KEY, id, JSON.stringify(item)])
      res.status(201).json({ item })
      return
    }

    // --- Fikrni o'chirish (faqat admin token bilan) ---
    if (req.method === 'DELETE') {
      const auth = req.headers.authorization || ''
      const token = auth.replace(/^Bearer\s+/i, '')
      if (!ADMIN_TOKEN || token !== ADMIN_TOKEN) {
        res.status(401).json({ error: 'Ruxsat yo\'q.' })
        return
      }
      const id = (req.query && req.query.id) || ''
      if (!id) {
        res.status(400).json({ error: 'id kerak.' })
        return
      }
      await redis(['HDEL', KEY, id])
      res.status(200).json({ ok: true })
      return
    }

    res.status(405).json({ error: 'Method not allowed' })
  } catch (e) {
    res.status(500).json({ error: String(e.message || e) })
  }
}
