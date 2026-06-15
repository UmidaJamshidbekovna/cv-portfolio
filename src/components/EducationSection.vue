<script setup>
import { GraduationCap, Award, ExternalLink } from 'lucide-vue-next'

const education = [
  {
    school: 'Inha University in Tashkent',
    degree: 'Computer Science / Software Engineering',
    period: '2019 — 2025',
    icon: GraduationCap,
    note: 'Dasturlash asoslari, algoritmlar va zamonaviy veb-texnologiyalar.'
  }
]

const certificates = [
  {
    name: 'Cybersecurity',
    issuer: 'IT Study',
    url: 'https://itstudy.uz/certificate?id=f73d88de-f58a-4192-2388-08de943b044d'
  },
  {
    name: 'Introduction to Generative AI',
    issuer: 'Coursera',
    url: 'https://www.coursera.org/account/accomplishments/verify/AIZIM34VQCMG'
  },
  {
    name: 'JavaScript Algorithms and Data Structures',
    issuer: 'freeCodeCamp',
    url: 'https://www.freecodecamp.org/certification/umidarakhimova09/javascript-v9'
  }
]
</script>

<template>
  <section id="education" class="relative px-6 pt-16 lg:px-20">
    <span class="bg-glow left-[-80px] top-32"></span>

    <div class="mx-auto max-w-5xl">
      <div class="max-w-2xl" data-aos="fade-up">
        <p class="text-sm font-medium uppercase tracking-wider text-brand-purple">
          Education
        </p>
        <h2 class="mt-2 text-3xl font-bold text-ink sm:text-4xl">
          Ta'lim va sertifikatlar
        </h2>
        <p class="mt-3 text-base text-gray-600">
          Akademik ta'lim va kasbiy malaka oshirish.
        </p>
      </div>

      <div class="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div
          v-for="(item, index) in education"
          :key="item.school"
          class="glass-card glass-3d shine-sweep p-6"
          data-aos="fade-up"
          :data-aos-delay="100 + index * 80"
        >
          <div class="flex items-start gap-4">
            <span
              class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-purple shadow-md shadow-brand-purple/30 ring-4 ring-white/80"
            >
              <component :is="item.icon" class="h-5 w-5 text-white" :stroke-width="2" />
            </span>
            <div class="min-w-0">
              <h3 class="text-lg font-semibold text-ink">{{ item.school }}</h3>
              <p class="mt-0.5 text-sm font-medium text-brand-purple">
                {{ item.degree }}
              </p>
              <p class="mt-0.5 text-xs text-gray-500">{{ item.period }}</p>
              <p v-if="item.note" class="mt-3 text-sm leading-relaxed text-gray-600">
                {{ item.note }}
              </p>
            </div>
          </div>
        </div>

        <div
          v-if="certificates.length"
          class="glass-card glass-3d shine-sweep p-6"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <h3 class="flex items-center gap-2 text-lg font-semibold text-ink">
            <Award class="h-5 w-5 text-brand-purple" :stroke-width="2" />
            Sertifikatlar
          </h3>
          <ul class="mt-4 space-y-3">
            <li
              v-for="cert in certificates"
              :key="cert.name"
              class="flex items-baseline justify-between gap-3 text-sm"
            >
              <span class="text-gray-700">
                <a
                  v-if="cert.url"
                  :href="cert.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1 font-medium text-ink transition-colors hover:text-brand-purple"
                >
                  {{ cert.name }}
                  <ExternalLink class="h-3.5 w-3.5 shrink-0 text-gray-400" />
                </a>
                <span v-else class="font-medium text-ink">{{ cert.name }}</span>
                <span class="text-gray-400">· {{ cert.issuer }}</span>
              </span>
              <span v-if="cert.year" class="shrink-0 text-xs text-gray-400">{{ cert.year }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
