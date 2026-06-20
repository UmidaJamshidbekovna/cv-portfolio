// Vercel serverless funksiya — portfolio chatboti.
// Tashrif buyuruvchining savollariga Claude (Anthropic) AI orqali javob beradi.
//
//   POST { messages: [{ role: 'user' | 'assistant', content: string }, ...] }
//     -> { reply: string }
//
// API kalit frontend'da KO'RINMAYDI — u faqat shu yerda, server tomonida ishlatiladi.
//
// Kerakli env o'zgaruvchi (Vercel -> Settings -> Environment Variables):
//   ANTHROPIC_API_KEY — console.anthropic.com dan olinadi.

import Anthropic from '@anthropic-ai/sdk'

// Model: arzon va tez bo'lgani uchun Haiku portfolio chatboti uchun tavsiya etiladi.
// Eng yuqori sifat uchun 'claude-opus-4-8' ga o'zgartiring (qimmatroq).
const MODEL = 'claude-haiku-4-5'

// Botning shaxsiyati va Umida haqidagi ma'lumotlar.
const SYSTEM_PROMPT = `Sen — Rakhimova Umidaning shaxsiy portfolio saytidagi do'stona virtual yordamchisisan.
Vazifang: tashrif buyuruvchilarning Umida haqidagi savollariga qisqa, samimiy va foydali javob berish.

Umida haqida ma'lumot:
- To'liq ism: Rakhimova Umida (Umida Rakhimova).
- Kasb: Frontend Developer, 3+ yillik tajriba. Asosiy yo'nalishi — Vue.js va Nuxt.js ekosistemasi; shuningdek React, Next.js va TypeScript.
- Hozir: Sovchi.app loyihasida Frontend Developer.
- Joylashuv: Toshkent, O'zbekiston.
- Ko'nikmalar: Vue 3, Nuxt 3, TypeScript, Pinia, TailwindCSS, SSR, REST API, performance optimizatsiyasi (LCP < 1.5s), pixel-perfect va responsive UI.
- Loyihalar: Sovchi.app (Landing, Telegram Mini App, Admin Panel), TextUp zamonaviy SMS platformasi, va shu portfolio sayti (Vue 3 + Vite + TailwindCSS).
- Statistika: 15+ loyiha, 3+ yil tajriba, 10+ mijoz.
- Bog'lanish: Email rakhimovaumida34@gmail.com, Telefon +998 94 149 30 34, Telegram @Umida_Raximova34, GitHub UmidaJamshidbekovna.

Qoidalar:
- Standart til — o'zbek tili. Agar foydalanuvchi boshqa tilda yozsa (rus, ingliz), o'sha tilda javob ber.
- Javoblaring qisqa bo'lsin (1–3 jumla), do'stona va tabiiy.
- Faqat yuqorida berilgan ma'lumotlarga tayan. Bilmagan narsangni O'YLAB TOPMA — buning o'rniga foydalanuvchiga Umidaning o'zi bilan bog'lanishni taklif qil.
- Agar foydalanuvchi Umida bilan shaxsan bog'lanmoqchi bo'lsa, hamkorlik yoki ish taklif qilsa, yoki xabar qoldirmoqchi bo'lsa — unga chatdagi «Umida bilan bog'lanish» tugmasini bosishni yoki Telegram (@Umida_Raximova34) orqali yozishni ayt.
- Sen Umidaning o'rnida emas, balki uning yordamchisi sifatida gapir ("Umida ...", "U ...").`

// Telegram parse_mode kabi maxsus formatlash yo'q — oddiy matn.
function clean(value, max) {
  return String(value == null ? '' : value).slice(0, max)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    res.status(500).json({ error: 'AI sozlanmagan (ANTHROPIC_API_KEY yo\'q).' })
    return
  }

  try {
    const body =
      typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}

    // Faqat to'g'ri rollarni qoldirib, oxirgi 12 ta xabarni olamiz.
    const incoming = Array.isArray(body.messages) ? body.messages : []
    let messages = incoming
      .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && m.content)
      .slice(-12)
      .map((m) => ({ role: m.role, content: clean(m.content, 2000) }))

    // Anthropic API'da birinchi xabar 'user' bo'lishi shart — boshidagi
    // 'assistant' xabarlarni (salomlashuv kabi) olib tashlaymiz.
    while (messages.length && messages[0].role === 'assistant') {
      messages.shift()
    }

    if (!messages.length) {
      res.status(400).json({ error: 'Xabar bo\'sh.' })
      return
    }

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const message = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages
    })

    const reply = message.content
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('\n')
      .trim()

    res.status(200).json({ reply: reply || 'Kechirasiz, javob topa olmadim.' })
  } catch (e) {
    res.status(500).json({ error: String(e?.message || e) })
  }
}
