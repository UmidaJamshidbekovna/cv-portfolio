<script setup>
import { Download } from 'lucide-vue-next'

const stats = [
  { value: '15+', label: 'Loyihalar', pill: false },
  { value: '3+', label: 'Yillik tajriba', pill: false },
  { value: '10+', label: 'Mijozlar', pill: true },
  { value: '100%', label: 'Mamnuniyat', pill: true }
]
</script>

<template>
  <section id="about" class="relative px-6 py-24 lg:px-20">
    <span class="bg-glow left-[-120px] top-[40%]"></span>

    <div class="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
      <div class="flex justify-center lg:justify-start">
        <div
          class="glass-card glass-3d shine-sweep relative flex h-72 w-72 items-center justify-center overflow-hidden lg:h-80 lg:w-80"
          data-aos="fade-right"
          data-aos-delay="100"
        >
          <span class="bg-glow !h-full !w-full !left-0 !top-0 opacity-70"></span>
          <span class="relative font-display text-7xl font-bold text-brand-purple/30 lg:text-8xl">UR</span>
        </div>
      </div>

      <div>
        <h2
          class="text-3xl font-bold text-ink"
          data-aos="fade-left"
          data-aos-delay="100"
        >
          Haqimda
        </h2>

        <div
          class="mt-4 space-y-4 text-sm leading-relaxed text-gray-500"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          <p>
            Vue.js ekosistemasi bo'yicha ixtisoslashgan, 3+ yillik tajribaga ega
            Full Stack dasturchiman. Yuqori unumdorlikdagi veb-ilovalar yaratish,
            performance optimizatsiyasi (LCP &lt; 1.5s) va modulli arxitektura
            bo'yicha kuchli tajribaga egaman. Hozirda Mimsoft'da Frontend Lead
            sifatida ishlayman.
          </p>
          <p>
            Har bir loyihada toza, qayta ishlatiladigan kod va sifatli
            foydalanuvchi tajribasiga e'tibor qarataman. Yangi texnologiyalarni
            o'rganishni, ochiq kodli loyihalarga hissa qo'shishni va texnik
            maqolalar yozishni yaxshi ko'raman.
          </p>
          <p class="text-xs italic text-gray-400">
            Frontend Lead specializing in the Vue.js ecosystem — high-performance
            SPAs, performance tuning (LCP &lt; 1.5s), and scalable, modular
            architecture.
          </p>
        </div>

        <button
          class="btn-primary mt-6"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <Download class="h-4 w-4" />
          CV yuklash
        </button>

        <div
          class="mt-8 flex flex-wrap items-center gap-8"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <template v-for="stat in stats" :key="stat.label">
            <div
              v-if="stat.pill"
              class="glass-card glass-3d shine-sweep group px-4 py-2"
            >
              <p class="text-2xl font-bold text-ink">{{ stat.value }}</p>
              <p class="text-xs text-gray-400">{{ stat.label }}</p>
            </div>
            <div v-else>
              <p class="text-2xl font-bold text-ink">{{ stat.value }}</p>
              <p class="text-xs text-gray-400">{{ stat.label }}</p>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>
