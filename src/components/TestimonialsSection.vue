<script setup>
import { ref, onMounted } from 'vue'
import { Quote, Send, Trash2, MessageSquarePlus, X, Loader2 } from 'lucide-vue-next'

// Baza bo'sh bo'lsa yoki API ishlamasa (masalan lokal `vite dev`da) ko'rsatiladigan
// namuna fikrlar. Vercel'da haqiqiy fikrlar kelganda ular o'rnini egallaydi.
const fallback = [
  {
    name: 'Jasur Karimov',
    role: 'CEO, Mimsoft',
    text: 'Umida frontend arxitekturamizni butunlay yangiladi — sahifalar yuklanishi sezilarli tezlashdi.'
  },
  {
    name: 'Dilnoza A.',
    role: 'Product Manager',
    text: 'Dizayn detallariga e’tibori va muloqot qilish uslubi jamoa bilan ishlashni yoqimli qiladi.'
  },
  {
    name: 'Akbar R.',
    role: 'Tech Lead',
    text: 'Pinia va modulli arxitektura bo‘yicha qarorlari loyihamizni scale qilishga yordam berdi.'
  }
]

const items = ref(fallback)
const usingFallback = ref(true)

const showForm = ref(false)
const form = ref({ name: '', role: '', text: '' })
const submitting = ref(false)
const message = ref(null) // { type: 'ok' | 'err', text }

// Admin (moderatsiya) rejimi: saytga `?admin=<token>` bilan kirilsa, o'chirish
// tugmalari paydo bo'ladi. Token brauzerda eslab qolinadi.
const adminToken = ref('')

async function load() {
  try {
    const res = await fetch('/api/feedback')
    if (!res.ok) return
    const data = await res.json()
    if (Array.isArray(data.items) && data.items.length) {
      items.value = data.items
      usingFallback.value = false
    }
  } catch {
    // tarmoq xatosi — namuna fikrlar qoladi
  }
}

onMounted(() => {
  try {
    const url = new URL(window.location.href)
    const t = url.searchParams.get('admin')
    if (t) {
      adminToken.value = t
      localStorage.setItem('fb_admin', t)
    } else {
      adminToken.value = localStorage.getItem('fb_admin') || ''
    }
  } catch {
    // SSR / URL bo'lmasa — e'tiborsiz
  }
  load()
})

async function submit() {
  const name = form.value.name.trim()
  const text = form.value.text.trim()
  if (name.length < 2 || text.length < 5) {
    message.value = { type: 'err', text: 'Iltimos, ism va fikringizni to‘liqroq yozing.' }
    return
  }
  submitting.value = true
  message.value = null
  try {
    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, role: form.value.role.trim(), text })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Xatolik')

    // Darhol ko'rinsin — namuna fikrlarni almashtiramiz.
    if (usingFallback.value) {
      items.value = []
      usingFallback.value = false
    }
    items.value = [data.item, ...items.value]
    form.value = { name: '', role: '', text: '' }
    showForm.value = false
    message.value = { type: 'ok', text: 'Rahmat! Fikringiz qo‘shildi.' }
  } catch {
    message.value = {
      type: 'err',
      text: 'Yuborib bo‘lmadi. Iltimos, keyinroq qayta urinib ko‘ring.'
    }
  } finally {
    submitting.value = false
  }
}

async function remove(item) {
  if (!item.id || !adminToken.value) return
  if (!window.confirm('Bu fikr o‘chirilsinmi?')) return
  try {
    const res = await fetch(`/api/feedback?id=${encodeURIComponent(item.id)}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${adminToken.value}` }
    })
    if (!res.ok) throw new Error()
    items.value = items.value.filter((x) => x.id !== item.id)
    if (!items.value.length) {
      items.value = fallback
      usingFallback.value = true
    }
  } catch {
    message.value = { type: 'err', text: 'O‘chirib bo‘lmadi (token noto‘g‘rimi?).' }
  }
}
</script>

<template>
  <section id="testimonials" class="relative px-6 pt-16 lg:px-20">
    <span class="bg-glow left-[-100px] top-20"></span>

    <div class="mx-auto max-w-7xl">
      <div class="flex flex-wrap items-end justify-between gap-4" data-aos="fade-up">
        <div class="max-w-2xl">
          <p class="text-sm font-medium uppercase tracking-wider text-brand-purple">
            Testimonials
          </p>
          <h2 class="mt-2 text-3xl font-bold text-ink sm:text-4xl">
            Fikr-mulohazalar
          </h2>
          <p class="mt-3 text-base text-gray-600">
            Mijozlar va hamkasblar fikri. Siz ham fikr qoldira olasiz.
          </p>
        </div>

        <button
          type="button"
          @click="showForm = !showForm"
          class="btn-ghost group !rounded-full !py-2 !px-4 text-sm"
        >
          <component :is="showForm ? X : MessageSquarePlus" class="h-4 w-4 text-brand-purple" />
          {{ showForm ? 'Yopish' : 'Fikr qoldirish' }}
        </button>
      </div>

      <!-- Fikr qoldirish formasi -->
      <form
        v-if="showForm"
        @submit.prevent="submit"
        class="glass-card glass-3d mt-8 grid gap-4 p-6 sm:grid-cols-2"
        data-aos="fade-up"
      >
        <div>
          <label class="mb-1 block text-xs font-medium text-gray-500" for="fb-name">Ismingiz *</label>
          <input
            id="fb-name"
            v-model="form.name"
            type="text"
            maxlength="60"
            required
            placeholder="Masalan: Jasur Karimov"
            class="w-full rounded-xl border border-white/60 bg-white/70 px-4 py-2.5 text-sm text-ink outline-none transition focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20"
          />
        </div>
        <div>
          <label class="mb-1 block text-xs font-medium text-gray-500" for="fb-role">Lavozim / kompaniya</label>
          <input
            id="fb-role"
            v-model="form.role"
            type="text"
            maxlength="80"
            placeholder="Masalan: CEO, Mimsoft"
            class="w-full rounded-xl border border-white/60 bg-white/70 px-4 py-2.5 text-sm text-ink outline-none transition focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20"
          />
        </div>
        <div class="sm:col-span-2">
          <label class="mb-1 block text-xs font-medium text-gray-500" for="fb-text">Fikringiz *</label>
          <textarea
            id="fb-text"
            v-model="form.text"
            rows="3"
            maxlength="500"
            required
            placeholder="Umida bilan ishlash tajribangiz haqida yozing..."
            class="w-full resize-none rounded-xl border border-white/60 bg-white/70 px-4 py-2.5 text-sm text-ink outline-none transition focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20"
          ></textarea>
        </div>

        <div class="flex items-center gap-3 sm:col-span-2">
          <button type="submit" class="btn-primary" :disabled="submitting">
            <component :is="submitting ? Loader2 : Send" class="h-4 w-4" :class="submitting ? 'animate-spin' : ''" />
            {{ submitting ? 'Yuborilmoqda...' : 'Yuborish' }}
          </button>
          <p
            v-if="message"
            :class="['text-sm', message.type === 'ok' ? 'text-green-600' : 'text-red-500']"
          >
            {{ message.text }}
          </p>
        </div>
      </form>

      <p
        v-else-if="message && message.type === 'ok'"
        class="mt-4 text-sm text-green-600"
      >
        {{ message.text }}
      </p>

      <div class="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(t, index) in items"
          :key="t.id || t.name + index"
          class="glass-card glass-3d shine-sweep group relative flex h-full flex-col p-6"
          data-aos="fade-up"
          :data-aos-delay="100 + (index % 3) * 80"
        >
          <button
            v-if="adminToken && t.id"
            type="button"
            @click="remove(t)"
            aria-label="Fikrni o'chirish"
            class="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/70 text-gray-400 opacity-0 shadow-sm backdrop-blur transition-all hover:bg-red-500 hover:text-white group-hover:opacity-100"
          >
            <Trash2 class="h-4 w-4" />
          </button>

          <Quote class="h-7 w-7 text-brand-purple/70" :stroke-width="1.5" />
          <p class="mt-3 flex-1 text-sm leading-relaxed text-gray-700">
            “{{ t.text }}”
          </p>
          <div class="mt-6 flex items-center gap-3">
            <span
              class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-purple to-brand-dark text-sm font-semibold text-white shadow-md shadow-brand-purple/40 ring-2 ring-white/60"
            >
              {{ (t.name || '?').charAt(0) }}
            </span>
            <div>
              <p class="text-sm font-semibold text-ink">{{ t.name }}</p>
              <p v-if="t.role" class="text-xs text-gray-500">{{ t.role }}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
