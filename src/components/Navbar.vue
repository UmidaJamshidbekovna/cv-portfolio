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
  Mail
} from 'lucide-vue-next'

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
  <nav class="sticky top-4 z-50 w-full px-4">
    <ul
      class="glass-card animate-fade-in-up mx-auto flex h-[60px] w-[900px] max-w-full items-center justify-between gap-2 !rounded-full px-4"
    >
      <li v-for="item in items" :key="item.id" class="shrink-0">
        <button
          @click="goTo(item)"
          :class="[
            'relative flex items-center gap-2 overflow-hidden rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ease-out',
            active === item.id
              ? 'text-white animate-pulse-soft'
              : 'text-gray-600 hover:-translate-y-0.5 hover:text-[#73007E]'
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
          <span class="hidden whitespace-nowrap md:inline">
            {{ item.label }}
          </span>
        </button>
      </li>
    </ul>
  </nav>
</template>
