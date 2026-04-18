<script setup>
import {
  MessageSquare,
  Heart,
  GraduationCap,
  Home,
  Megaphone,
  Smartphone
} from 'lucide-vue-next'
import ProjectCard from './ProjectCard.vue'

const projects = [
  {
    title: 'Zamonaviy SMS Platforma',
    description:
      'Professional business UI for a modern bulk-messaging platform with analytics and campaign management.',
    tags: ['Vue 3', 'Pinia', 'TailwindCSS'],
    thumbClass: 'bg-brand-purple text-white',
    icon: MessageSquare
  },
  {
    title: 'Sovchi.app',
    description:
      'Modern matchmaking platform with smooth onboarding, profile matching and secure messaging.',
    tags: ['Nuxt 3', 'SSR', 'REST API'],
    thumbClass: 'bg-brand-light text-brand-purple',
    icon: Heart
  },
  {
    title: 'Farobiy International School',
    description:
      'Educational landing page presenting programs, admissions and campus life with clean typography.',
    tags: ['Vue 3', 'Landing', 'SEO'],
    thumbClass: 'bg-brand-dark text-brand-light',
    icon: GraduationCap
  },
  {
    title: 'Houz',
    description:
      'Property design selection platform — browse, compare and customize interior design packages.',
    tags: ['Vue 3', 'TailwindCSS', 'UI/UX'],
    thumbClass: 'bg-accent-soft text-brand-dark',
    icon: Home
  },
  {
    title: 'Marketing Agency Landing',
    description:
      'Creative dark/light themed agency site with animated sections and case-study showcase.',
    tags: ['Next.js', 'Animations', 'Theme'],
    thumbClass: 'bg-ink text-brand-light',
    icon: Megaphone
  },
  {
    title: 'Sovchi.app — Mobile',
    description:
      'Mobile-first Telegram mini-app version of Sovchi.app, tuned for touch interactions.',
    tags: ['Telegram WebApp', 'Mobile-first'],
    thumbClass: 'bg-accent text-brand-dark',
    icon: Smartphone
  }
]
</script>

<template>
  <section id="projects" class="relative px-6 pt-16 lg:px-20">
    <span class="bg-glow right-[-100px] top-40"></span>

    <div class="mx-auto max-w-7xl">
      <div class="max-w-2xl" data-aos="fade-up">
        <p class="text-sm font-medium uppercase tracking-wider text-brand-purple">
          Portfolio
        </p>
        <h2 class="mt-2 text-3xl font-bold text-ink sm:text-4xl">
          Loyihalar
        </h2>
        <p class="mt-3 text-base text-gray-600">
          Mening so‘nggi loyihalarimdan tanlov — biznes platformalardan tortib
          mobil ilovalargacha.
        </p>
      </div>

      <div
        class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <ProjectCard
          v-for="(project, index) in projects"
          :key="project.title"
          v-bind="project"
          data-aos="fade-up"
          :data-aos-delay="100 + index * 80"
        />
      </div>
    </div>
  </section>
</template>
