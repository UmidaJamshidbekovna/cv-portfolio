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
          class="glass-card h-72 w-72 border-2 border-brand-light lg:h-80 lg:w-80"
          data-aos="fade-right"
          data-aos-delay="100"
        ></div>
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
          class="mt-4 space-y-1 text-sm leading-relaxed text-gray-500"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          <p>Men Full Stack dasturchiman va 3 yildan ortiq vaqt davomida</p>
          <p>veb-ilovalar yaratish bilan shug'ullanaman. Asosan vue/js, Node/js,</p>
          <p>va typeScript texnologiyalari bilan ishlayman/</p>
          <p>Har bir loyiha uchun eng yaxshi yechimni topishga harakat qilaman</p>
          <p>Yangi texnologiyalarni o'rganish va tajribamni boshqalar bilan</p>
          <p>bo'lishishni yaxshi ko'raman/Ochiq kodli loyihalarga hissa</p>
          <p>qo'shaman va texnik maqolalar yozaman</p>
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
              class="glass-card px-4 py-2"
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
