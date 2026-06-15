<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { Phone, Github, Linkedin, Send, Code2, Zap } from 'lucide-vue-next'
import ProfileCard from './ProfileCard.vue'
import BadgeFloat from './BadgeFloat.vue'

const firstName = 'Umida'
const lastName = 'Rakhimova'
const fullName = `${firstName} ${lastName}`
const typed = ref('')

const typedFirst = computed(() => typed.value.slice(0, firstName.length))
const typedSpace = computed(() => (typed.value.length > firstName.length ? ' ' : ''))
const typedLast = computed(() =>
  typed.value.length > firstName.length + 1
    ? typed.value.slice(firstName.length + 1)
    : ''
)
let timer = null

onMounted(() => {
  let i = 0
  let phase = 'typing'

  const tick = () => {
    if (phase === 'typing') {
      if (i < fullName.length) {
        typed.value = fullName.slice(0, i + 1)
        i++
        timer = setTimeout(tick, 110)
      } else {
        phase = 'holding'
        timer = setTimeout(tick, 1800)
      }
    } else if (phase === 'holding') {
      phase = 'deleting'
      timer = setTimeout(tick, 60)
    } else if (phase === 'deleting') {
      if (i > 0) {
        typed.value = fullName.slice(0, i - 1)
        i--
        timer = setTimeout(tick, 55)
      } else {
        phase = 'typing'
        timer = setTimeout(tick, 500)
      }
    }
  }

  tick()
})

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
})
</script>

<template>
  <section
    id="home"
    class="relative flex min-h-screen items-center overflow-hidden px-6 py-16 lg:px-20"
  >
    <span class="bg-glow right-[-120px] top-[80px]"></span>

    <div
      class="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-2"
    >
      <div class="order-2 lg:order-1">
        <p
          class="mb-2 text-sm text-gray-500"
          data-aos="fade-right"
          data-aos-delay="100"
        >
          Salom, men —
        </p>

        <h1
          class="font-display text-6xl font-bold leading-tight lg:text-7xl"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          <span class="text-[#782E87]">{{ typedFirst }}</span><span>{{ typedSpace }}</span><span class="text-[#36003B]">{{ typedLast }}</span>
          <span class="sr-only">Umida Rakhimova</span>
          <span
            class="ml-1 inline-block h-[0.85em] w-[3px] translate-y-[0.12em] bg-[#73007E] align-middle animate-caret"
            aria-hidden="true"
          ></span>
        </h1>

        <p
          class="mt-2 text-xl text-gray-600"
          data-aos="fade-right"
          data-aos-delay="300"
        >
          Frontend Developer (Vue.js / React)
        </p>

        <span
          class="mt-4 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-700"
          data-aos="fade-right"
          data-aos-delay="350"
        >
          <span class="relative flex h-2 w-2">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
            <span class="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
          </span>
          Ish takliflariga ochiq · Remote / Full-time
        </span>

        <p
          class="mt-4 max-w-sm text-sm leading-relaxed text-gray-500"
          data-aos="fade-right"
          data-aos-delay="400"
        >
          Zamonaviy veb-ilovalar yaratish bo'yicha 3+ yillik tajribaga egaman.
          Foydalanuvchi tajribasiga e'tibor qaratgan holda sifatli kod yozaman.
        </p>

        <div
          class="mt-8 flex flex-wrap gap-4"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          <a href="#projects" class="btn-primary">
            Loyihalarni ko'rish →
          </a>
          <a href="#contact" class="btn-ghost">
            <Phone class="h-4 w-4" />
            Bog'lanish
          </a>
        </div>

        <div
          class="mt-8 flex items-center gap-3"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <span class="text-sm text-gray-400">Ijtimoiy:</span>
          <a
            v-for="(social, i) in [
              { icon: Github, href: 'https://github.com/UmidaJamshidbekovna', label: 'GitHub' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/umida-rakhimova-08b037222/', label: 'LinkedIn' },
              { icon: Send, href: 'https://t.me/Umida_Raximova34', label: 'Telegram' }
            ]"
            :key="i"
            :href="social.href"
            :aria-label="social.label"
            target="_blank"
            rel="noopener noreferrer"
            class="flex h-9 w-9 items-center justify-center rounded-full border border-white/60 bg-white/70 text-gray-500 shadow-md shadow-brand-purple/10 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-brand-purple hover:text-brand-purple hover:shadow-lg hover:shadow-brand-purple/25"
          >
            <component :is="social.icon" class="h-4 w-4" />
          </a>
        </div>
      </div>

      <div class="order-1 flex justify-center lg:order-2 lg:justify-end">
        <div class="relative">
          <ProfileCard />

          <div
            class="absolute -left-4 top-8 hidden sm:-left-16 sm:block"
            data-aos="fade-right"
            data-aos-delay="500"
          >
            <BadgeFloat
              title="Clean Code"
              subtitle="Best practices"
              animation="float-up"
            >
              <template #icon>
                <Code2 class="h-4 w-4" />
              </template>
            </BadgeFloat>
          </div>

          <div
            class="absolute -right-4 bottom-4 hidden sm:-right-8 sm:block"
            data-aos="fade-left"
            data-aos-delay="600"
          >
            <BadgeFloat
              variant="dark"
              title="Fast Coding"
              subtitle="On time"
              animation="float-down"
            >
              <template #icon>
                <Zap class="h-4 w-4" />
              </template>
            </BadgeFloat>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
