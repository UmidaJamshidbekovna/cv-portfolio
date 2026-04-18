<script setup>
import { Briefcase } from 'lucide-vue-next'

defineProps({
  company: { type: String, required: true },
  period: { type: String, required: true },
  role: { type: String, required: true },
  stack: { type: String, default: '' },
  tasks: { type: Array, default: () => [] },
  icon: { type: [Object, Function], default: () => Briefcase },
  isLast: { type: Boolean, default: false }
})
</script>

<template>
  <div class="relative pl-12 sm:pl-16">
    <span
      v-if="!isLast"
      class="absolute left-4 top-10 bottom-0 w-px bg-gradient-to-b from-brand-purple/40 via-brand-light to-transparent sm:left-6"
      aria-hidden="true"
    />

    <span
      class="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-brand-purple shadow-md shadow-brand-purple/30 ring-4 ring-white/80 sm:left-2 sm:h-9 sm:w-9"
    >
      <component :is="icon" class="h-4 w-4 text-white" :stroke-width="2" />
    </span>

    <div class="glass-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-purple/15">
      <div class="flex flex-wrap items-baseline justify-between gap-2">
        <h3 class="text-lg font-semibold text-ink">{{ company }}</h3>
        <span
          class="rounded-full bg-brand-light px-3 py-1 text-xs font-medium text-brand-dark"
        >
          {{ period }}
        </span>
      </div>

      <p class="mt-1 text-sm font-medium text-brand-purple">{{ role }}</p>
      <p v-if="stack" class="mt-0.5 text-xs text-gray-500">{{ stack }}</p>

      <ul v-if="tasks.length" class="mt-4 space-y-2">
        <li
          v-for="task in tasks"
          :key="task"
          class="flex gap-2 text-sm leading-relaxed text-gray-700"
        >
          <span
            class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-purple"
            aria-hidden="true"
          />
          <span>{{ task }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
