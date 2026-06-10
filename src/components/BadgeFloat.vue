<script setup>
defineProps({
  variant: {
    type: String,
    default: 'light'
  },
  title: String,
  subtitle: String,
  animation: {
    type: String,
    default: 'float-up'
  }
})
</script>

<template>
  <div
    :class="[
      'flex items-center gap-3 px-4 py-3',
      variant === 'dark' ? 'glass-dark' : 'glass-card',
      animation === 'float-up' ? 'animate-float-up' : 'animate-float-down'
    ]"
  >
    <div
      :class="[
        'flex h-9 w-9 items-center justify-center rounded-lg shadow-sm',
        variant === 'dark'
          ? 'bg-white/15 text-white ring-1 ring-white/25 shadow-black/20'
          : 'bg-brand-light text-brand-purple ring-1 ring-white/60 shadow-brand-purple/15'
      ]"
    >
      <slot name="icon" />
    </div>
    <div class="leading-tight">
      <p class="text-sm font-medium">{{ title }}</p>
      <p
        :class="[
          'text-xs',
          variant === 'dark' ? 'text-white/75' : 'text-gray-500'
        ]"
      >
        {{ subtitle }}
      </p>
    </div>
  </div>
</template>
