<script setup>
import { Heart, Rocket, Briefcase, GraduationCap, Code2 } from 'lucide-vue-next'
import TimelineItem from './TimelineItem.vue'

const experiences = [
  {
    company: 'Sovchi.app',
    period: 'Fev 2026 — Hozirgacha',
    role: 'Frontend Developer',
    stack: 'Nuxt.js · Vue.js · TypeScript',
    icon: Heart,
    tasks: [
      'Nuxt 3 va SSR yordamida tezkor, SEO-friendly sahifalar bilan tanishtiruv platformasini ishlab chiqyapman.',
      'Qayta ishlatiladigan Vue 3 komponentlarini yarataman va holatni Pinia bilan boshqaraman.',
      'Profil mosligi va xavfsiz xabar almashish uchun REST API integratsiyasini amalga oshiraman.'
    ]
  },
  {
    company: 'Mimsoft Company',
    period: 'May 2025 — Dek 2025',
    role: 'Frontend Lead',
    stack: 'React.js · Next.js · Vue.js · Nuxt.js',
    icon: Rocket,
    tasks: [
      'Vue 3 va Composition API yordamida yuqori unumdorlikdagi SPA-lar yaratdim.',
      'Lazy loading va code-splitting joriy etib, LCP ni 1.5s dan past ushlab turdim.',
      'Mikroservislar uchun modulli frontend arxitekturasini loyihaladim.',
      'Kengaytiriladigan ma\'lumot oqimi uchun Pinia bilan holat boshqaruvini optimallashtirdim.'
    ]
  },
  {
    company: 'Upwork (Freelancer)',
    period: 'Sen 2024 — Apr 2025',
    role: 'Frontend Developer',
    stack: 'Vue.js · React · JavaScript',
    icon: Briefcase,
    tasks: [
      'Xalqaro mijozlar uchun freelancer sifatida responsive veb-ilovalar va landing sahifalar ishlab chiqdim.',
      'Vue.js va React yordamida mijoz talablariga mos qayta ishlatiladigan UI komponentlarini yaratdim.',
      'Loyihalarni o\'z vaqtida yetkazib berib, yuqori mijoz mamnuniyati va ijobiy baholarni saqlab qoldim.'
    ]
  },
  {
    company: 'MARS IT SCHOOL',
    period: 'Mar 2024 — Sen 2024',
    role: 'Frontend Mentor (8–16 yosh)',
    stack: 'HTML · CSS · JavaScript',
    icon: GraduationCap,
    tasks: [
      '20+ o\'quvchiga HTML/CSS/JS yordamida interaktiv o\'yinlar yaratishda yo\'l-yo\'riq ko\'rsatdim.',
      'Yosh o\'quvchilarda muammolarni hal qilish va algoritmik fikrlash ko\'nikmasini rivojlantirdim.',
      'Dastur davomida 85% loyiha yakunlash ko\'rsatkichini saqlab qoldim.'
    ]
  },
  {
    company: 'Uzcard',
    period: 'Fev 2023 — Mar 2024',
    role: 'Frontend Developer (Intern)',
    stack: 'JavaScript · Vue.js · React',
    icon: Code2,
    tasks: [
      'Vue.js va React bilan production veb-ilovalar uchun qayta ishlatiladigan UI komponentlarini yaratdim va qo\'llab-quvvatladim.',
      'REST API integratsiyasi hamda mavjud funksiyalar uchun responsive, cross-browser layoutlar tayyorladim.',
      'Senior dasturchilar bilan code review orqali hamkorlik qilib, kod sifati va izchilligini oshirdim.'
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
