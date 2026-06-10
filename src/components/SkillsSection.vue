<script setup>
import { ref } from 'vue'

// Brend logolari simple-icons CDN'dan (to'g'ri ranglar bilan) keladi.
// `slug` yo'q yoki logo yuklanmasa — avtomatik harf-monogram ko'rsatiladi.
const skills = [
  { name: 'HTML5', slug: 'html5', color: 'E34F26' },
  { name: 'CSS3', slug: 'css3', color: '1572B6' },
  { name: 'JavaScript', slug: 'javascript', color: 'F7DF1E' },
  { name: 'jQuery', slug: 'jquery', color: '0769AD' },
  { name: 'Bootstrap', slug: 'bootstrap', color: '7952B3' },
  { name: 'TailwindCSS', slug: 'tailwindcss', color: '06B6D4' },
  { name: 'Sass', slug: 'sass', color: 'CC6699' },
  { name: 'Vue.js', slug: 'vuedotjs', color: '4FC08D' },
  { name: 'Nuxt.js', slug: 'nuxtdotjs', color: '00DC82' },
  { name: 'Vite', slug: 'vite', color: '646CFF' },
  { name: 'TypeScript', slug: 'typescript', color: '3178C6' },
  { name: 'REST API', mono: 'API', color: '6B21A8' },
  { name: 'React', slug: 'react', color: '61DAFB' },
  { name: 'Next.js', slug: 'nextdotjs', color: '111111' },
  { name: 'Redux', slug: 'redux', color: '764ABC' },
  { name: 'Pinia', slug: 'pinia', color: 'FFD859' },
  { name: 'SEO', mono: 'SEO', color: '16A34A' },
  { name: 'AI', mono: 'AI', color: '9333EA' },
  { name: 'Git', slug: 'git', color: 'F05032' },
  { name: 'GitHub', slug: 'github', color: '181717' },
  { name: 'Netlify', slug: 'netlify', color: '00C7B7' },
  { name: 'Vercel', slug: 'vercel', color: '111111' },
  { name: 'Figma', slug: 'figma', color: 'F24E1E' },
  { name: 'Claude Code', slug: 'claude', color: 'D97757' },
  { name: 'Claude Code Design', slug: 'claude', color: 'D97757' }
]

const failed = ref([])
function onError(name) {
  if (!failed.value.includes(name)) failed.value.push(name)
}
function monogram(skill) {
  return (
    skill.mono ||
    skill.name.replace(/[^A-Za-z0-9]/g, '').slice(0, 2).toUpperCase()
  )
}
</script>

<template>
  <section id="skills" class="relative px-6 py-16 lg:px-20">
    <span class="bg-glow left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></span>

    <div class="mx-auto max-w-7xl">
      <h2
        class="text-3xl font-bold text-ink"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        Ko'nikmalar
      </h2>
      <p
        class="mt-1 text-sm text-gray-400"
        data-aos="fade-up"
        data-aos-delay="150"
      >
        Foydalanayotgan texnologiyalar va vositalar
      </p>

      <div
        class="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
      >
        <div
          v-for="(skill, index) in skills"
          :key="skill.name"
          class="glass-card glass-3d shine-sweep group flex cursor-pointer items-center gap-3 px-4 py-4"
          data-aos="fade-up"
          :data-aos-delay="100 + (index % 6) * 60"
        >
          <img
            v-if="skill.slug && !failed.includes(skill.name)"
            :src="`https://cdn.simpleicons.org/${skill.slug}/${skill.color}`"
            :alt="skill.name"
            loading="lazy"
            class="h-8 w-8 shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
            @error="onError(skill.name)"
          />
          <span
            v-else
            class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-transform duration-500 group-hover:scale-110"
            :style="{ color: `#${skill.color}`, backgroundColor: `#${skill.color}1a` }"
          >
            {{ monogram(skill) }}
          </span>
          <span class="truncate text-base font-medium text-ink">{{ skill.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
