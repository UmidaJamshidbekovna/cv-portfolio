<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import {
  Home,
  FolderKanban,
  BookOpen,
  User,
  Briefcase,
  GraduationCap,
  Sparkles,
  Mail,
  Sun,
  Moon
} from 'lucide-vue-next'
import { useTheme } from '../composables/useTheme'

const { isDark, toggle } = useTheme()

const items = [
  { id: 'home',        label: 'Bosh sahifa',  icon: Home },
  { id: 'projects',    label: 'Loyihalar',    icon: FolderKanban },
  { id: 'blog',        label: 'Blog',         icon: BookOpen },
  { id: 'about',       label: 'Haqimda',      icon: User },
  { id: 'experience',  label: 'Tajriba',      icon: Briefcase },
  { id: 'education',   label: "Ta'lim",       icon: GraduationCap },
  { id: 'skills',      label: "Ko'nikmalar",  icon: Sparkles },
  { id: 'contact',     label: "Bog'lanish",   icon: Mail }
]

const active = ref('home')
let observer = null

const goTo = (item) => {
  active.value = item.id
  const el = document.getElementById(item.id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

onMounted(() => {
  const sections = items
    .map((i) => document.getElementById(i.id))
    .filter(Boolean)

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          active.value = entry.target.id
        }
      })
    },
    { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
  )

  sections.forEach((s) => observer.observe(s))
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<template>
  <nav class="sticky top-4 z-50 flex w-full justify-center px-4">
    <ul
      class="glass-card animate-fade-in-up flex h-[60px] w-fit max-w-full items-center justify-center gap-1 overflow-x-auto !rounded-full px-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:gap-2 lg:px-4"
    >
      <li v-for="item in items" :key="item.id" class="shrink-0">
        <button
          @click="goTo(item)"
          :aria-label="item.label"
          :aria-current="active === item.id ? 'true' : undefined"
          :class="[
            'relative flex items-center gap-2 overflow-hidden rounded-full px-3 py-2 text-sm font-medium transition-all duration-300 ease-out lg:px-4',
            active === item.id
              ? 'text-white animate-pulse-soft'
              : 'text-gray-600 hover:-translate-y-0.5 hover:text-[#73007E] dark:hover:text-[#C77DFF]'
          ]"
          :style="active === item.id ? {
            background: 'linear-gradient(135deg, #4A148C 0%, #36003B 100%)',
            boxShadow: '0 1px 0 rgba(255,255,255,0.3) inset, 0 -1px 0 rgba(0,0,0,0.25) inset, 0 12px 24px -8px rgba(54,0,59,0.55), 0 6px 14px -6px rgba(115,0,126,0.4)'
          } : null"
        >
          <component
            :is="item.icon"
            class="h-4 w-4 shrink-0 transition-transform duration-300 ease-out"
            :class="active === item.id ? 'scale-110 drop-shadow-[0_2px_4px_rgba(255,255,255,0.5)]' : ''"
          />
          <span class="hidden whitespace-nowrap lg:inline">
            {{ item.label }}
          </span>
        </button>
      </li>
    </ul>
  </nav>

  <button
    type="button"
    @click="toggle"
    :aria-label="isDark ? 'Yorug‘ rejimga o‘tish' : 'Tungi rejimga o‘tish'"
    :aria-pressed="isDark"
    class="glass-card fixed right-4 top-4 z-50 flex h-11 w-11 items-center justify-center !rounded-full text-ink transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:text-brand-purple"
  >
    <Transition name="theme-icon" mode="out-in">
      <Moon v-if="!isDark" key="moon" class="h-5 w-5" />
      <Sun v-else key="sun" class="h-5 w-5" />
    </Transition>
  </button>
</template>

<style scoped>
.theme-icon-enter-active,
.theme-icon-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.theme-icon-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.6);
}
.theme-icon-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.6);
}
</style>
