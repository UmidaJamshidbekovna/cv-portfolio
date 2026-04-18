<script setup>
import { ArrowUpRight } from 'lucide-vue-next'

defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: Array, default: () => [] },
  thumbClass: {
    type: String,
    default: 'bg-brand-light text-brand-purple'
  },
  icon: { type: [Object, Function], default: null }
})
</script>

<template>
  <article
    class="glass-card group relative flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-purple/15"
  >
    <div
      :class="[
        'relative mb-5 flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-xl',
        thumbClass
      ]"
    >
      <component
        :is="icon"
        v-if="icon"
        class="h-14 w-14 transition-transform duration-500 group-hover:scale-110"
        :stroke-width="1.5"
      />
    </div>

    <div class="flex flex-1 flex-col">
      <div class="flex items-start justify-between gap-3">
        <h3 class="text-lg font-semibold text-ink">{{ title }}</h3>
        <ArrowUpRight
          class="h-5 w-5 shrink-0 text-gray-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-purple"
        />
      </div>
      <p class="mt-2 text-sm leading-relaxed text-gray-600">{{ description }}</p>

      <div v-if="tags.length" class="mt-4 flex flex-wrap gap-2">
        <span
          v-for="tag in tags"
          :key="tag"
          class="rounded-full bg-brand-light px-2.5 py-0.5 text-xs font-medium text-brand-dark"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </article>
</template>
