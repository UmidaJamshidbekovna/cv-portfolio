<script setup>
import { Rocket, GraduationCap, Code2 } from 'lucide-vue-next'
import TimelineItem from './TimelineItem.vue'

const experiences = [
  {
    company: 'Mimsoft Company',
    period: 'May 2025 — Present',
    role: 'Frontend Lead',
    stack: 'React.js · Next.js · Vue.js · Nuxt.js',
    icon: Rocket,
    tasks: [
      'Engineered high-performance SPAs using Vue 3 and the Composition API.',
      'Implemented lazy loading and code-splitting, keeping LCP under 1.5s.',
      'Designed a modular frontend architecture for microservices.',
      'Optimized state management with Pinia for scalable data flows.'
    ]
  },
  {
    company: 'MARS IT SCHOOL',
    period: 'March 2024 — Sep 2024',
    role: 'Frontend Mentor for Young Learners (Ages 8–16)',
    stack: 'HTML · CSS · JavaScript',
    icon: GraduationCap,
    tasks: [
      'Guided 20+ students in creating interactive games with HTML/CSS/JS.',
      'Fostered problem-solving and algorithmic thinking in young learners.',
      'Maintained an 85% project completion rate across the program.'
    ]
  },
  {
    company: 'Uzcard',
    period: 'February 2023 — March 2024',
    role: 'Frontend Developer Intern',
    stack: 'JavaScript · Vue.js · React',
    icon: Code2,
    tasks: [
      'Learned fundamental design patterns used in production codebases.',
      'Collaborated with senior developers on feature delivery and reviews.',
      'Gained hands-on experience with modern frontend frameworks.'
    ]
  }
]
</script>

<template>
  <section id="experience" class="px-6 pt-16 lg:px-20">
    <div class="mx-auto max-w-5xl">
      <div class="max-w-2xl" data-aos="fade-up">
        <p class="text-sm font-medium uppercase tracking-wider text-brand-purple">
          Career
        </p>
        <h2 class="mt-2 text-3xl font-bold text-ink sm:text-4xl">
          Ish tajribasi
        </h2>
        <p class="mt-3 text-base text-gray-600">
          Frontend yo‘nalishida o‘sish yo‘lim — mentorlikdan jamoa yetakchiligigacha.
        </p>
      </div>

      <div class="mt-12 space-y-10">
        <TimelineItem
          v-for="(item, index) in experiences"
          :key="item.company"
          v-bind="item"
          :is-last="index === experiences.length - 1"
          data-aos="fade-up"
          :data-aos-delay="100 + index * 100"
        />
      </div>
    </div>
  </section>
</template>
