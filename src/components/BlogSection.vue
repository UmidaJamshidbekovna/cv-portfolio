<script setup>
import { ref, onMounted } from 'vue'
import { ArrowRight, CalendarDays, Clock } from 'lucide-vue-next'

const CHANNEL_URL = 'https://t.me/bintuJamshidbek'
const covers = ['bg-brand-purple', 'bg-brand-light', 'bg-brand-dark']

// Telegram'dan o'qib bo'lmasa ko'rsatiladigan zaxira (fallback) postlar.
const fallbackPosts = [
  {
    title: 'Vue 3 Composition API: amaliy qo‘llanma',
    excerpt:
      'Reactivity, composables va katta loyihalarda kodni qanday qilib qayta ishlatiladigan qismlarga ajratish.',
    date: '2026 · Mart',
    readTime: '6 daqiqa',
    coverClass: 'bg-brand-purple',
    image: null,
    link: CHANNEL_URL
  },
  {
    title: 'LCP ni 1.5s dan past tutish',
    excerpt:
      'Lazy loading, code-splitting va image optimization bo‘yicha production amaliyotlari.',
    date: '2026 · Fevral',
    readTime: '8 daqiqa',
    coverClass: 'bg-brand-light',
    image: null,
    link: CHANNEL_URL
  },
  {
    title: 'Pinia bilan scalable state management',
    excerpt:
      'Store larni modul qilib ajratish, typed actions va SSR bilan ishlashdagi nyanslar.',
    date: '2026 · Yanvar',
    readTime: '5 daqiqa',
    coverClass: 'bg-brand-dark',
    image: null,
    link: CHANNEL_URL
  }
]

const posts = ref(fallbackPosts)

// Telegram kanaldagi oxirgi postlarni /api/blog orqali olib kelamiz.
// (Lokal `vite dev` da /api ishlamaydi — fallback postlar ko'rinadi. Vercel'da avtomatik ishlaydi.)
onMounted(async () => {
  try {
    const res = await fetch('/api/blog')
    if (!res.ok) return
    const data = await res.json()
    if (Array.isArray(data.posts) && data.posts.length) {
      posts.value = data.posts.map((p, i) => ({
        title: p.title,
        excerpt: p.excerpt,
        date: p.date,
        readTime: p.readTime,
        coverClass: covers[i % covers.length],
        image: p.image,
        link: p.link
      }))
    }
  } catch {
    // tarmoq xatosi — fallback postlar qoladi
  }
})
</script>

<template>
  <section id="blog" class="relative px-6 pt-16 lg:px-20">
    <span class="bg-glow right-[-80px] top-32"></span>

    <div class="mx-auto max-w-7xl">
      <div class="flex flex-wrap items-end justify-between gap-4" data-aos="fade-up">
        <div class="max-w-2xl">
          <p class="text-sm font-medium uppercase tracking-wider text-brand-purple">
            Blog
          </p>
          <h2 class="mt-2 text-3xl font-bold text-ink sm:text-4xl">Blog</h2>
          <p class="mt-3 text-base text-gray-600">Maqolalar va tajribalar.</p>
        </div>

        <a
          href="https://t.me/bintuJamshidbek"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-ghost group !rounded-full !py-2 !px-4 text-sm"
        >
          Barchasi
          <ArrowRight class="h-4 w-4 text-brand-purple transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>

      <div class="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <a
          v-for="(post, index) in posts"
          :key="post.title"
          :href="post.link"
          target="_blank"
          rel="noopener noreferrer"
          class="glass-card glass-3d shine-sweep group flex h-full flex-col overflow-hidden"
          data-aos="fade-up"
          :data-aos-delay="100 + index * 80"
        >
          <img
            v-if="post.image"
            :src="post.image"
            :alt="post.title"
            loading="lazy"
            class="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div
            v-else
            :class="[
              'aspect-[16/9] w-full transition-transform duration-500 group-hover:scale-[1.03]',
              post.coverClass
            ]"
          />
          <div class="flex flex-1 flex-col p-6">
            <div class="flex items-center gap-4 text-xs text-gray-500">
              <span class="inline-flex items-center gap-1">
                <CalendarDays class="h-3.5 w-3.5" />
                {{ post.date }}
              </span>
              <span class="inline-flex items-center gap-1">
                <Clock class="h-3.5 w-3.5" />
                {{ post.readTime }}
              </span>
            </div>
            <h3
              class="mt-3 text-lg font-semibold text-ink transition-colors group-hover:text-brand-purple"
            >
              {{ post.title }}
            </h3>
            <p class="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
              {{ post.excerpt }}
            </p>
            <span
              class="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-purple"
            >
              O‘qish
              <ArrowRight
                class="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              />
            </span>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>
