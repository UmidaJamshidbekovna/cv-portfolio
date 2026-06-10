// Vercel serverless funksiya.
// Telegram ochiq kanal sahifasini (t.me/s/<channel>) o'qib, oxirgi postlarni JSON qaytaradi.
// Kanalda yangi post chiqsa, sayt qayta deploy qilinmasdan avtomatik yangilanadi.

const CHANNEL = 'bintuJamshidbek'
const MONTHS_UZ = [
  'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
  'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'
]

function clean(str) {
  return str
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
    .replace(/[ \t]+/g, ' ')
    .trim()
}

export default async function handler(req, res) {
  try {
    const r = await fetch(`https://t.me/s/${CHANNEL}`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; PortfolioBot/1.0)' }
    })
    if (!r.ok) throw new Error(`Telegram javobi: ${r.status}`)
    const html = await r.text()

    const blocks = html.split('tgme_widget_message_wrap').slice(1)
    const posts = []

    for (const block of blocks) {
      const textMatch = block.match(
        /class="tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>/
      )
      const rawText = textMatch ? clean(textMatch[1]) : ''
      if (!rawText) continue // matnsiz (faqat rasm) postlarni o'tkazib yuboramiz

      const postMatch = block.match(/data-post="([^"]+)"/)
      const link = postMatch
        ? `https://t.me/${postMatch[1]}`
        : `https://t.me/${CHANNEL}`

      const dateMatch = block.match(/datetime="([^"]+)"/)
      let date = ''
      if (dateMatch) {
        const d = new Date(dateMatch[1])
        date = `${d.getFullYear()} · ${MONTHS_UZ[d.getMonth()]}`
      }

      const imgMatch = block.match(
        /tgme_widget_message_photo_wrap[^"]*"[^>]*background-image:url\('([^']+)'\)/
      )
      const image = imgMatch ? imgMatch[1] : null

      const lines = rawText.split('\n').map((l) => l.trim()).filter(Boolean)
      const title = (lines[0] || 'Post').slice(0, 80)
      const excerpt = (lines.slice(1).join(' ') || lines[0] || '').slice(0, 160)

      const words = rawText.split(/\s+/).length
      const readTime = `${Math.max(1, Math.round(words / 200))} daqiqa`

      posts.push({ title, excerpt, date, readTime, link, image })
    }

    // Telegram sahifasi eski → yangi tartibda. Yangi postlar tepada bo'lsin.
    posts.reverse()

    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=86400')
    res.status(200).json({ posts: posts.slice(0, 6) })
  } catch (e) {
    // Xatolik bo'lsa bo'sh massiv — sayt fallback (qo'lda yozilgan) postlarni ko'rsatadi.
    res.status(200).json({ posts: [], error: String(e.message || e) })
  }
}
