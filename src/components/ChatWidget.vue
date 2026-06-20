<script setup>
import { ref, reactive, nextTick, h } from 'vue'
import { MessageCircle, X, Send, Sparkles } from 'lucide-vue-next'

/**
 * Gibrid chat:
 *  - Standart "ai" rejim: savollarga Claude (AI) /api/chat orqali javob beradi.
 *  - "contact" rejim: foydalanuvchi Umida bilan bog'lanmoqchi bo'lsa, xabar + kontaktni
 *    /api/contact orqali Telegramga (@BintuJamshidbek_aloqa_bot) yetkazadi.
 *
 * Ikkala uch/oxirgi nuqta ham Vercel serverless funksiyalari — kalitlar (Anthropic API,
 * Telegram token) faqat server tomonida, frontend'da ko'rinmaydi.
 *
 * Lokal `npm run dev`da /api/* mavjud emas — chat fallback xabar ko'rsatadi; production
 * (Vercel)da to'liq ishlaydi.
 */
const FALLBACK_USERNAME = 'Umida_Raximova34' // Telegram fallback uchun

const TelegramIcon = {
  render() {
    return h(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': 2,
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      },
      [
        h('path', { d: 'M21.5 4.5 2.5 11.5l6 2.5 2 6 3.5-4 5.5 4 2-15.5z' }),
        h('path', { d: 'm8.5 14 8-7' })
      ]
    )
  }
}

const open = ref(false)
const input = ref('')
const sending = ref(false)
const scroller = ref(null)

// 'ai' — AI bilan suhbat; 'contact' — Umidaga xabar yetkazish oqimi
const mode = ref('ai')
const contact = ref('')
const awaitingContact = ref(false)
const pendingMessage = ref('')

const messages = reactive([
  {
    from: 'bot',
    text: 'Salom! 👋 Men Umidaning virtual yordamchisiman. Uning ko‘nikmalari, loyihalari yoki tajribasi haqida bemalol so‘rang — yoki Umida bilan to‘g‘ridan-to‘g‘ri bog‘laning.'
  }
])

const quickReplies = [
  { label: 'Loyihalar', section: 'projects' },
  { label: 'Ko‘nikmalar', section: 'skills' },
  { label: 'Tajriba', section: 'experience' }
]

const scrollToBottom = async () => {
  await nextTick()
  if (scroller.value) scroller.value.scrollTop = scroller.value.scrollHeight
}

const toggle = async () => {
  open.value = !open.value
  if (open.value) scrollToBottom()
}

const onQuickReply = (q) => {
  const el = document.getElementById(q.section)
  if (el) {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    messages.push({
      from: 'bot',
      text: `«${q.label}» bo‘limiga o‘tdik. Yana savolingiz bo‘lsa, shu yerga yozing.`
    })
    scrollToBottom()
  }
}

// "Umida bilan bog'lanish" — Telegram oqimini boshlaydi
const startContact = () => {
  mode.value = 'contact'
  awaitingContact.value = false
  pendingMessage.value = ''
  messages.push({
    from: 'bot',
    text: 'Marhamat, Umidaga yetkazmoqchi bo‘lgan xabaringizni yozing 👇'
  })
  scrollToBottom()
}

// ---------- AI suhbat (/api/chat) ----------
const askAI = async () => {
  sending.value = true
  messages.push({ from: 'bot', typing: true, text: '' })
  scrollToBottom()

  // Tarixni AI uchun tayyorlaymiz (navigatsiya/typing xabarlarisiz oxirgi 12 ta)
  const history = messages
    .filter((m) => !m.typing)
    .slice(-12)
    .map((m) => ({ role: m.from === 'user' ? 'user' : 'assistant', content: m.text }))

  const removeTyping = () => {
    const i = messages.findIndex((m) => m.typing)
    if (i !== -1) messages.splice(i, 1)
  }

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: history })
    })
    if (!res.ok) throw new Error('chat xatosi')
    const data = await res.json()
    removeTyping()
    messages.push({ from: 'bot', text: data.reply || 'Kechirasiz, javob topa olmadim.' })
  } catch {
    removeTyping()
    messages.push({
      from: 'bot',
      text:
        'Kechirasiz, hozir javob bera olmadim 😔 Birozdan keyin urinib ko‘ring yoki «Umida bilan bog‘lanish» tugmasini bosing.'
    })
  } finally {
    sending.value = false
    scrollToBottom()
  }
}

// ---------- Telegramga yetkazish (/api/contact) ----------
const deliverToTelegram = async (text, who) => {
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source: 'Chat widget', contact: who, message: text })
    })
    if (res.ok) return 'sent'
  } catch {
    /* endpoint yo'q / tarmoq — fallback */
  }
  try {
    await navigator.clipboard.writeText(`${who ? who + '\n' : ''}${text}`)
  } catch {
    /* clipboard yo'q bo'lsa ham davom etamiz */
  }
  window.open(`https://t.me/${FALLBACK_USERNAME}`, '_blank', 'noopener')
  return 'opened'
}

const dispatchContact = async (text, who) => {
  sending.value = true
  scrollToBottom()
  try {
    const result = await deliverToTelegram(text, who)
    messages.push({
      from: 'bot',
      text:
        result === 'sent'
          ? 'Rahmat! ✅ Xabaringiz va kontaktingiz Umidaga yetkazildi. U tez orada siz bilan bog‘lanadi. Yana savol bo‘lsa, yozavering.'
          : 'Xabaringiz nusxalandi va Telegram ochildi — uni Umidaga joylab yuboring. 💜'
    })
  } catch {
    messages.push({
      from: 'bot',
      text: 'Kechirasiz, hozir yuborib bo‘lmadi. Iltimos, Telegram orqali yozing.'
    })
  } finally {
    sending.value = false
    mode.value = 'ai' // bog'lanish tugadi — AI rejimga qaytamiz
    scrollToBottom()
  }
}

const handleContactFlow = async (text) => {
  if (awaitingContact.value) {
    // Bu xabar — bog'lanish ma'lumoti
    contact.value = text
    awaitingContact.value = false
    const msg = pendingMessage.value
    pendingMessage.value = ''
    await dispatchContact(msg, contact.value)
    return
  }
  // Birinchi xabar — saqlab, kontakt so'raymiz
  pendingMessage.value = text
  awaitingContact.value = true
  messages.push({
    from: 'bot',
    text:
      'Sizga qanday bog‘lansin? Telegram (@username), telefon yoki email qoldiring 👇'
  })
  scrollToBottom()
}

// ---------- Yagona yuborish ----------
const send = async () => {
  const text = input.value.trim()
  if (!text || sending.value) return

  messages.push({ from: 'user', text })
  input.value = ''
  scrollToBottom()

  if (mode.value === 'contact') {
    await handleContactFlow(text)
  } else {
    await askAI()
  }
}
</script>

<template>
  <div>
    <!-- Suzuvchi tugma -->
    <Transition name="chat-fab">
      <button
        v-show="!open"
        type="button"
        @click="toggle"
        aria-label="Chatni ochish"
        class="btn-primary fixed bottom-6 right-4 z-50 h-14 w-14 !rounded-full !p-0 sm:bottom-8 sm:right-8"
      >
        <MessageCircle class="h-6 w-6" :stroke-width="2" />
        <span
          class="absolute right-0 top-0 flex h-3.5 w-3.5 -translate-y-0.5 translate-x-0.5"
        >
          <span
            class="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-rose opacity-75"
          ></span>
          <span
            class="relative inline-flex h-3.5 w-3.5 rounded-full bg-accent-rose"
          ></span>
        </span>
      </button>
    </Transition>

    <!-- Chat paneli -->
    <Transition name="chat-panel">
      <div
        v-show="open"
        role="dialog"
        aria-label="Chat oynasi"
        class="glass-card fixed bottom-6 right-4 z-50 flex h-[28rem] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden !rounded-3xl p-0 sm:bottom-8 sm:right-8"
      >
        <!-- Sarlavha -->
        <header
          class="flex items-center justify-between gap-3 border-b border-brand-light/70 bg-white/40 px-4 py-3 dark:border-white/10 dark:bg-white/[0.04]"
        >
          <div class="flex items-center gap-3">
            <span
              class="flex h-9 w-9 items-center justify-center rounded-full bg-brand-purple text-white"
            >
              <Sparkles class="h-4 w-4" :stroke-width="2" />
            </span>
            <div class="leading-tight">
              <p class="text-sm font-semibold text-ink">Umidaning yordamchisi</p>
              <p class="flex items-center gap-1 text-xs text-gray-500">
                <span class="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                AI · Onlayn
              </p>
            </div>
          </div>
          <button
            type="button"
            @click="toggle"
            aria-label="Chatni yopish"
            class="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition hover:bg-brand-light hover:text-brand-purple"
          >
            <X class="h-5 w-5" :stroke-width="2" />
          </button>
        </header>

        <!-- Xabarlar -->
        <div ref="scroller" class="flex-1 space-y-3 overflow-y-auto px-4 py-4">
          <div
            v-for="(m, i) in messages"
            :key="i"
            class="flex"
            :class="m.from === 'user' ? 'justify-end' : 'justify-start'"
          >
            <!-- "Yozyapti" animatsiyasi -->
            <div
              v-if="m.typing"
              class="flex items-center gap-1 rounded-2xl rounded-bl-md bg-white/70 px-3.5 py-3 shadow-sm dark:bg-white/[0.06]"
            >
              <span class="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-purple/70 [animation-delay:-0.3s]"></span>
              <span class="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-purple/70 [animation-delay:-0.15s]"></span>
              <span class="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-purple/70"></span>
            </div>
            <div
              v-else
              class="max-w-[80%] whitespace-pre-line rounded-2xl px-3.5 py-2 text-sm leading-relaxed shadow-sm"
              :class="
                m.from === 'user'
                  ? 'rounded-br-md bg-brand-purple text-white'
                  : 'rounded-bl-md bg-white/70 text-ink dark:bg-white/[0.06]'
              "
            >
              {{ m.text }}
            </div>
          </div>

          <!-- Tezkor tugmalar -->
          <div class="flex flex-wrap gap-2 pt-1">
            <button
              v-for="q in quickReplies"
              :key="q.section"
              type="button"
              @click="onQuickReply(q)"
              class="rounded-full border border-brand-light bg-white/60 px-3 py-1.5 text-xs font-medium text-brand-purple transition hover:-translate-y-0.5 hover:bg-brand-purple hover:text-white dark:bg-white/[0.04]"
            >
              {{ q.label }}
            </button>
            <button
              type="button"
              @click="startContact"
              class="rounded-full bg-brand-purple px-3 py-1.5 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-dark"
            >
              💬 Umida bilan bog‘lanish
            </button>
          </div>
        </div>

        <!-- Kiritish -->
        <form
          @submit.prevent="send"
          class="flex items-center gap-2 border-t border-brand-light/70 bg-white/40 px-3 py-3 dark:border-white/10 dark:bg-white/[0.04]"
        >
          <input
            v-model="input"
            type="text"
            :disabled="sending"
            :placeholder="mode === 'contact' ? 'Xabaringizni yozing…' : 'Savolingizni yozing…'"
            aria-label="Xabar matni"
            class="min-w-0 flex-1 rounded-full border border-brand-light bg-white/80 px-4 py-2.5 text-sm text-ink placeholder-gray-400 transition focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-light dark:bg-white/[0.04]"
          />
          <button
            type="submit"
            :disabled="sending || !input.trim()"
            aria-label="Yuborish"
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-purple text-white transition hover:bg-brand-dark disabled:opacity-50"
          >
            <component
              :is="mode === 'contact' ? TelegramIcon : Send"
              class="h-4 w-4"
              :class="sending ? 'animate-pulse' : ''"
              :stroke-width="2"
            />
          </button>
        </form>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.chat-fab-enter-active,
.chat-fab-leave-active,
.chat-panel-enter-active,
.chat-panel-leave-active {
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.chat-fab-enter-from,
.chat-fab-leave-to {
  opacity: 0;
  transform: translateY(16px) scale(0.85);
}
.chat-panel-enter-from,
.chat-panel-leave-to {
  opacity: 0;
  transform: translateY(24px) scale(0.92);
}
@media (prefers-reduced-motion: reduce) {
  .chat-fab-enter-active,
  .chat-fab-leave-active,
  .chat-panel-enter-active,
  .chat-panel-leave-active {
    transition: opacity 0.2s ease;
  }
  .chat-fab-enter-from,
  .chat-fab-leave-to,
  .chat-panel-enter-from,
  .chat-panel-leave-to {
    transform: none;
  }
}
</style>
