<script setup>
import { ref } from 'vue'

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

const cardEl = ref(null)
const tilt = ref({ x: 0, y: 0 })

const onMove = (e) => {
  const el = cardEl.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const px = (e.clientX - rect.left) / rect.width  // 0..1
  const py = (e.clientY - rect.top) / rect.height // 0..1
  const maxTilt = 10
  tilt.value = {
    x: (px - 0.5) * (maxTilt * 2),
    y: -(py - 0.5) * (maxTilt * 2)
  }
}

const onLeave = () => {
  tilt.value = { x: 0, y: 0 }
}
</script>

<template>
  <div
    data-aos="fade-left"
    data-aos-delay="300"
    class="[perspective:1100px]"
  >
    <div
      ref="cardEl"
      @mousemove="onMove"
      @mouseleave="onLeave"
      :style="{
        '--tx': `${tilt.x}deg`,
        '--ty': `${tilt.y}deg`
      }"
      class="glass-card glass-tilt w-72 p-8"
    >
      <div class="flex flex-col items-center [transform-style:preserve-3d]">
        <div class="relative pop-z-3">
          <img
            src="/image.png"
            alt="Umida Rakhimova"
            class="h-20 w-20 rounded-full object-cover shadow-lg shadow-brand-purple/40 ring-4 ring-white/60"
          />
          <span
            class="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-green-500 shadow-md shadow-green-500/40"
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

        <h3 class="mt-4 text-center font-semibold text-ink pop-z-2">Umida Rakhimova</h3>
        <p class="text-center text-sm text-brand-purple pop-z-2">Frontend Developer</p>

        <div class="mt-4 flex flex-wrap justify-center gap-2 pop-z-1">
          <span
            v-for="tag in techTags"
            :key="tag.label"
            :class="[
              'rounded-full px-3 py-1 text-xs font-medium shadow-sm shadow-brand-purple/10',
              tag.class
            ]"
          >
            {{ tag.label }}
          </span>
        </div>

        <div class="mt-6 grid w-full grid-cols-3 gap-2 text-center pop-z-1">
          <div v-for="stat in stats" :key="stat.label" class="min-w-0">
            <p class="text-xl font-bold text-ink">{{ stat.value }}</p>
            <p class="text-[11px] leading-tight text-gray-400">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
