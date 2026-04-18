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
      variant === 'dark'
        ? 'rounded-2xl bg-brand-purple text-white shadow-lg shadow-brand-purple/25'
        : 'glass-card',
      animation === 'float-up' ? 'animate-float-up' : 'animate-float-down'
    ]"
  >
    <div
      :class="[
        'flex h-9 w-9 items-center justify-center rounded-lg',
        variant === 'dark'
          ? 'bg-white/20 text-white'
          : 'bg-brand-light text-brand-purple'
      ]"
    >
      <slot name="icon" />
    </div>
    <div class="leading-tight">
      <p class="text-sm font-medium">{{ title }}</p>
      <p
        :class="[
          'text-xs',
          variant === 'dark' ? 'text-white/70' : 'text-gray-400'
        ]"
      >
        {{ subtitle }}
      </p>
    </div>
  </div>
</template>
