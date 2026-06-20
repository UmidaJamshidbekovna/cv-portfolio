<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ArrowUp } from 'lucide-vue-next'

const visible = ref(false)

const onScroll = () => {
  visible.value = window.scrollY > 400
}

const toTop = () => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <Transition name="to-top">
    <button
      v-show="visible"
      type="button"
      @click="toTop"
      aria-label="Tepaga qaytish"
      class="glass-card fixed bottom-24 right-4 z-50 flex h-12 w-12 items-center justify-center !rounded-full text-brand-purple transition-transform duration-300 ease-out hover:-translate-y-1 sm:bottom-28 sm:right-8"
    >
      <ArrowUp class="h-5 w-5" />
    </button>
  </Transition>
</template>

<style scoped>
.to-top-enter-active,
.to-top-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.to-top-enter-from,
.to-top-leave-to {
  opacity: 0;
  transform: translateY(16px) scale(0.85);
}
</style>
