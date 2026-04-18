<script setup>
import { reactive, ref, h } from 'vue'
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Send
} from 'lucide-vue-next'

const channels = [
  {
    label: 'Email',
    value: 'umidarakhimova@gmail.com',
    href: 'mailto:umidarakhimova@gmail.com',
    icon: Mail
  },
  {
    label: 'Telefon',
    value: '+998 94 123 45 67',
    href: 'tel:+998941234567',
    icon: Phone
  },
  {
    label: 'Manzil',
    value: 'Toshkent, O‘zbekiston',
    href: '#',
    icon: MapPin
  }
]

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

const socials = [
  { label: 'GitHub', href: 'https://github.com', icon: Github },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
  { label: 'Telegram', href: 'https://t.me/', icon: TelegramIcon }
]

const form = reactive({ name: '', email: '', subject: '', message: '' })
const sending = ref(false)
const sent = ref(false)

const submit = async () => {
  sending.value = true
  await new Promise((r) => setTimeout(r, 700))
  sending.value = false
  sent.value = true
  Object.assign(form, { name: '', email: '', subject: '', message: '' })
  setTimeout(() => (sent.value = false), 2500)
}
</script>

<template>
  <section id="contact" class="relative px-6 pt-16 lg:px-20">
    <span class="bg-glow right-10 top-20"></span>

    <div class="mx-auto max-w-7xl">
      <div class="max-w-2xl" data-aos="fade-up">
        <p class="text-sm font-medium uppercase tracking-wider text-brand-purple">
          Contact
        </p>
        <h2 class="mt-2 text-3xl font-bold text-ink sm:text-4xl">
          Bog‘lanish
        </h2>
        <p class="mt-3 text-base text-gray-600">
          Loyiha yoki g‘oyangiz haqida gaplashaylik.
        </p>
      </div>

      <div class="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div class="space-y-4" data-aos="fade-up" data-aos-delay="100">
          <a
            v-for="c in channels"
            :key="c.label"
            :href="c.href"
            class="glass-card group flex items-center gap-4 p-5 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-purple/15"
          >
            <span
              class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-light text-brand-purple transition-colors group-hover:bg-brand-purple group-hover:text-white"
            >
              <component :is="c.icon" class="h-5 w-5" :stroke-width="2" />
            </span>
            <div class="min-w-0">
              <p class="text-xs font-medium uppercase tracking-wider text-gray-500">
                {{ c.label }}
              </p>
              <p
                class="truncate text-sm font-semibold text-ink group-hover:text-brand-purple"
              >
                {{ c.value }}
              </p>
            </div>
          </a>

          <div class="glass-card p-5">
            <p class="text-xs font-medium uppercase tracking-wider text-gray-500">
              Ijtimoiy tarmoqlar
            </p>
            <div class="mt-3 flex items-center gap-3">
              <a
                v-for="s in socials"
                :key="s.label"
                :href="s.href"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="s.label"
                class="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-light text-brand-purple transition-all hover:-translate-y-0.5 hover:bg-brand-purple hover:text-white hover:shadow-md hover:shadow-brand-purple/25"
              >
                <component :is="s.icon" class="h-5 w-5" :stroke-width="2" />
              </a>
            </div>
          </div>
        </div>

        <form
          @submit.prevent="submit"
          class="glass-card p-6 sm:p-8"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label for="name" class="text-sm font-medium text-ink">
                Ismingiz
              </label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                placeholder="Ismingizni kiriting"
                class="mt-1.5 w-full rounded-xl border border-brand-light bg-white/80 px-4 py-2.5 text-sm text-ink placeholder-gray-400 transition focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-light"
              />
            </div>
            <div>
              <label for="email" class="text-sm font-medium text-ink">
                Email
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                placeholder="you@example.com"
                class="mt-1.5 w-full rounded-xl border border-brand-light bg-white/80 px-4 py-2.5 text-sm text-ink placeholder-gray-400 transition focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-light"
              />
            </div>
          </div>

          <div class="mt-4">
            <label for="subject" class="text-sm font-medium text-ink">
              Mavzu
            </label>
            <input
              id="subject"
              v-model="form.subject"
              type="text"
              required
              placeholder="Loyiha haqida qisqacha"
              class="mt-1.5 w-full rounded-xl border border-brand-light bg-white/80 px-4 py-2.5 text-sm text-ink placeholder-gray-400 transition focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-light"
            />
          </div>

          <div class="mt-4">
            <label for="message" class="text-sm font-medium text-ink">
              Xabar
            </label>
            <textarea
              id="message"
              v-model="form.message"
              rows="5"
              required
              placeholder="Loyihangiz yoki g‘oyangiz haqida yozing…"
              class="mt-1.5 w-full resize-none rounded-xl border border-brand-light bg-white/80 px-4 py-2.5 text-sm text-ink placeholder-gray-400 transition focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-light"
            />
          </div>

          <button
            type="submit"
            :disabled="sending"
            class="btn-primary mt-6 w-full"
          >
            <Send class="h-4 w-4" :stroke-width="2" />
            {{ sending ? 'Yuborilmoqda…' : sent ? 'Yuborildi ✓' : 'Yuborish' }}
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
