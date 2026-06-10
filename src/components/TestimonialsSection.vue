<script setup>
import { ArrowRight, Quote } from 'lucide-vue-next'

const testimonials = [
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
            Mijozlar va hamkasblar fikri.
          </p>
        </div>

        <a href="#contact" class="btn-ghost group !rounded-full !py-2 !px-4 text-sm">
          Fikr qoldirish
          <ArrowRight class="h-4 w-4 text-brand-purple transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>

      <div class="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(t, index) in testimonials"
          :key="t.name"
          class="glass-card glass-3d shine-sweep group relative flex h-full flex-col p-6"
          data-aos="fade-up"
          :data-aos-delay="100 + index * 80"
        >
          <Quote class="h-7 w-7 text-brand-purple/70" :stroke-width="1.5" />
          <p class="mt-3 flex-1 text-sm leading-relaxed text-gray-700">
            “{{ t.text }}”
          </p>
          <div class="mt-6 flex items-center gap-3">
            <span
              class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-purple to-brand-dark text-sm font-semibold text-white shadow-md shadow-brand-purple/40 ring-2 ring-white/60"
            >
              {{ t.name.charAt(0) }}
            </span>
            <div>
              <p class="text-sm font-semibold text-ink">{{ t.name }}</p>
              <p class="text-xs text-gray-500">{{ t.role }}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
