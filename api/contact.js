// Vercel serverless funksiya — "Bog'lanish" formasidagi xabarlarni
// Telegram bot orqali yuboradi (@BintuJamshidbek_aloqa_bot).
//
//   POST  { name, email, subject, message }  -> Telegram'ga sendMessage
//
// Bot token frontend'da KO'RINMAYDI — u faqat shu yerda, server tomonida ishlatiladi.
//
// Kerakli env o'zgaruvchilar (Vercel -> Settings -> Environment Variables):
//   TELEGRAM_BOT_TOKEN  — @BotFather bergan token (masalan 123456:ABC-...)
//   TELEGRAM_CHAT_ID    — xabar tushadigan chat ID (sizning shaxsiy ID yoki kanal/guruh)

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const CHAT_ID = process.env.TELEGRAM_CHAT_ID

function clean(value, max) {
  return String(value == null ? '' : value)
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max)
}

// Telegram HTML parse_mode uchun maxsus belgilarni xavfsiz qilamiz.
function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }
  if (!BOT_TOKEN || !CHAT_ID) {
    res.status(500).json({ error: 'Telegram sozlanmagan (env yo\'q).' })
    return
  }

  try {
    const body =
      typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
    const name = clean(body.name, 80)
    const email = clean(body.email, 120)
    const subject = clean(body.subject, 120)
    const message = clean(body.message, 2000)
    // Chat widget'dan keladigan qo'shimcha maydonlar
    const source = clean(body.source, 40)
    const contact = clean(body.contact, 160)

    // Bog'lanish uchun kamida bittasi bo'lsin: to'g'ri email yoki erkin "contact".
    const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)
    if (message.length < 5) {
      res.status(400).json({ error: 'Xabar matni to\'liqroq bo\'lishi kerak.' })
      return
    }
    if (!emailOk && !contact) {
      res.status(400).json({ error: 'Bog\'lanish ma\'lumoti (email yoki kontakt) kerak.' })
      return
    }
    if (email && !emailOk) {
      res.status(400).json({ error: 'Email manzili noto\'g\'ri.' })
      return
    }

    const lines = ['📩 <b>Yangi xabar — portfolio sayti</b>']
    if (source) lines.push(`📍 <b>Manba:</b> ${esc(source)}`)
    lines.push('')
    if (name) lines.push(`👤 <b>Ism:</b> ${esc(name)}`)
    if (email) lines.push(`✉️ <b>Email:</b> ${esc(email)}`)
    if (contact) lines.push(`📞 <b>Bog'lanish:</b> ${esc(contact)}`)
    if (subject) lines.push(`📌 <b>Mavzu:</b> ${esc(subject)}`)
    lines.push('')
    lines.push(`💬 ${esc(message)}`)
    const text = lines.join('\n')

    const tg = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true
      })
    })
    const data = await tg.json()
    if (!tg.ok || !data.ok) {
      throw new Error(data.description || `Telegram javobi: ${tg.status}`)
    }

    res.status(200).json({ ok: true })
  } catch (e) {
    res.status(500).json({ error: String(e.message || e) })
  }
}
