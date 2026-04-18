<script setup>
const techTags = [
  { label: 'Vue.js', class: 'bg-brand-light text-brand-dark' },
  { label: 'Nuxt', class: 'bg-brand-light text-brand-dark' },
  { label: 'TypeScript', class: 'bg-brand-light text-brand-dark' },
  { label: 'Node.js', class: 'bg-brand-light text-brand-dark' }
]

const stats = [
  { value: '3+', label: 'Yillik tajriba' },
  { value: '15+', label: 'Loyihalar' },
  { value: '10+', label: 'Texnologiya' }
]
</script>

<template>
  <div
    class="glass-card w-72 p-8"
    data-aos="fade-left"
    data-aos-delay="300"
  >
    <div class="flex flex-col items-center">
      <div class="relative">
        <div
          class="flex h-20 w-20 items-center justify-center rounded-full bg-brand-purple text-2xl font-bold text-white shadow-lg shadow-brand-purple/30"
        >
          U
        </div>
        <span
          class="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-green-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="h-3 w-3 text-white"
          >
            <path
              fill-rule="evenodd"
              d="M16.704 5.29a1 1 0 010 1.42l-8 8a1 1 0 01-1.42 0l-4-4a1 1 0 111.42-1.42L8 12.58l7.29-7.29a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </div>

      <h3 class="mt-4 text-center font-semibold text-ink">Umida Rahimova</h3>
      <p class="text-center text-sm text-brand-purple">Full Stack Developer</p>

      <div class="mt-4 flex flex-wrap justify-center gap-2">
        <span
          v-for="tag in techTags"
          :key="tag.label"
          :class="['rounded-full px-3 py-1 text-xs font-medium', tag.class]"
        >
          {{ tag.label }}
        </span>
      </div>

      <div class="mt-6 grid w-full grid-cols-3 gap-4 text-center">
        <div v-for="stat in stats" :key="stat.label">
          <p class="text-xl font-bold text-ink">{{ stat.value }}</p>
          <p class="text-xs text-gray-400">{{ stat.label }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
