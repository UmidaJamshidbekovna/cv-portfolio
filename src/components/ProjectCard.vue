<script setup>
import { ArrowUpRight, ExternalLink, Github, Lock } from 'lucide-vue-next'

defineProps({
  title: { type: String, required: true },
  thumbClass: {
    type: String,
    default: 'bg-brand-light text-brand-purple'
  },
  icon: { type: [Object, Function], default: null },
  image: { type: String, default: '' },
  logo: { type: String, default: '' },
  liveUrl: { type: String, default: '' },
  repoUrl: { type: String, default: '' },
  private: { type: Boolean, default: false }
})
</script>

<template>
  <article
    class="glass-card glass-3d shine-sweep group relative flex h-full flex-col p-6"
  >
    <div
      :class="[
        'relative mb-5 flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-xl',
        thumbClass
      ]"
    >
      <img
        v-if="image"
        :src="image"
        :alt="title"
        loading="lazy"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div
        v-else-if="logo"
        class="flex h-full w-full items-center justify-center p-6 transition-transform duration-500 group-hover:scale-105 [&>svg]:h-full [&>svg]:w-full [&>svg]:max-h-full [&>svg]:max-w-full"
        v-html="logo"
      />
      <component
        :is="icon"
        v-else-if="icon"
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
      <div
        v-if="private && !liveUrl && !repoUrl"
        class="mt-auto flex border-t border-white/50 pt-4"
      >
        <span
          class="inline-flex items-center gap-1.5 rounded-full bg-brand-light px-3.5 py-1.5 text-xs font-medium text-brand-dark"
        >
          <Lock class="h-3.5 w-3.5" />
          Maxfiy loyiha
        </span>
      </div>

      <div
        v-if="liveUrl || repoUrl"
        class="mt-auto flex flex-wrap gap-2.5 border-t border-white/50 pt-4"
      >
        <a
          v-if="liveUrl"
          :href="liveUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 rounded-full bg-brand-purple px-3.5 py-1.5 text-xs font-medium text-white transition-transform hover:-translate-y-0.5"
        >
          <ExternalLink class="h-3.5 w-3.5" />
          Ko'rish
        </a>
        <a
          v-if="repoUrl"
          :href="repoUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 rounded-full border border-brand-purple/30 px-3.5 py-1.5 text-xs font-medium text-brand-dark transition-colors hover:border-brand-purple hover:text-brand-purple"
        >
          <Github class="h-3.5 w-3.5" />
          Kod
        </a>
      </div>
    </div>
  </article>
</template>
