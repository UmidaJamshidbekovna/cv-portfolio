<script setup>
import { ref } from 'vue'
import {
  Home,
  FolderKanban,
  BookOpen,
  User,
  Briefcase,
  Sparkles,
  Mail
} from 'lucide-vue-next'

const items = [
  { label: 'Bosh sahifa', icon: Home },
  { label: 'Loyihalar', icon: FolderKanban },
  { label: 'Blog', icon: BookOpen },
  { label: 'Haqimda', icon: User },
  { label: 'Tajriba', icon: Briefcase },
  { label: "Ko'nikmalar", icon: Sparkles },
  { label: "Bog'lanish", icon: Mail }
]

const active = ref('Bosh sahifa')
</script>

<template>
  <nav class="sticky top-4 z-50 w-full px-4">
    <ul
      class="glass-card mx-auto flex h-[60px] w-[900px] max-w-full items-center justify-between gap-2 rounded-full px-4"
    >
      <li v-for="item in items" :key="item.label" class="shrink-0">
        <button
          @click="active = item.label"
          :class="[
            'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300',
            active === item.label
              ? 'bg-[#36003B] text-white shadow-md shadow-[#36003B]/30'
              : 'text-gray-600 hover:text-[#73007E]'
          ]"
        >
          <component :is="item.icon" class="h-4 w-4 shrink-0" />
          <span class="hidden whitespace-nowrap md:inline">
            {{ item.label }}
          </span>
        </button>
      </li>
    </ul>
  </nav>
</template>
