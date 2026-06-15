// Vercel serverless funksiya.
// Telegram ochiq kanal sahifasini (t.me/s/<channel>) o'qib, oxirgi postlarni JSON qaytaradi.
// Kanalda yangi post chiqsa, sayt qayta deploy qilinmasdan avtomatik yangilanadi.

const CHANNEL = 'bintuJamshidbek'
const MONTHS_UZ = [
  'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
  'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'
]

// Faqat texnik/kasbiy postlar CV blogida ko'rinsin.
// Quyidagi kalit so'zlardan biri post matnida bo'lsa — texnik post hisoblanadi.
const TECH_KEYWORDS = [
  'vue', 'nuxt', 'react', 'next', 'javascript', 'typescript', 'ts', 'js',
  'css', 'html', 'tailwind', 'sass', 'scss', 'frontend', 'front-end',
  'backend', 'api', 'rest', 'pinia', 'vuex', 'redux', 'state', 'ssr',
  'performance', 'lcp', 'optimization', 'optimizatsiya', 'komponent',
  'component', 'code', 'kod', 'dasturlash', 'developer', 'dasturchi',
  'web', 'veb', 'git', 'github', 'deploy', 'vite', 'spa', 'seo',
  'algoritm', 'pattern', 'arxitektura', 'architecture', 'database',
  'ma\'lumotlar bazasi', 'framework', 'library', 'kutubxona', 'debug'
]

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// Kalit so'zni butun so'z sifatida tekshiramiz — "js" so'zi "lots" ichidan,
// "github" esa URL ichidan tasodifan topilib qolmasligi uchun.
function isTechnical(text) {
  const t = text.toLowerCase()
  return TECH_KEYWORDS.some((kw) => {
    const re = new RegExp(`(^|[^a-z0-9])${escapeRegExp(kw)}([^a-z0-9]|$)`, 'i')
    return re.test(t)
  })
}

// URL, t.me havolalari va @username larni matndan olib tashlaymiz.
// Shunda "shunchaki link tashlangan" postlar texnik deb hisoblanmaydi va
// sarlavhada xom URL ko'rinmaydi.
function stripLinks(s) {
  return s
    .replace(/https?:\/\/\S+/gi, ' ')
    .replace(/(?:www\.|t\.me\/)\S+/gi, ' ')
    .replace(/@[\w_]+/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .trim()
}

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

      // Har bir qatordan URL/@handle larni olib tashlab, faqat mazmunli matnni qoldiramiz.
      const lines = rawText
        .split('\n')
        .map((l) => stripLinks(l))
        .map((l) => l.trim())
        .filter(Boolean)
      const meaningful = lines.join(' ')

      // Faqat link yoki "Assalomu alaykum, link qoldiryapman" kabi mazmunsiz
      // postlarni o'tkazib yuboramiz (yetarli matn bo'lmasa — chiqarmaymiz).
      const letters = meaningful.replace(/[^a-zA-Z0-9]/g, '')
      if (letters.length < 25) continue
      if (!isTechnical(meaningful)) continue // shaxsiy postlarni CV blogida ko'rsatmaymiz

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

      const title = (lines[0] || 'Post').slice(0, 80)
      const excerpt = (lines.slice(1).join(' ') || lines[0] || '').slice(0, 160)

      const words = meaningful.split(/\s+/).filter(Boolean).length
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
