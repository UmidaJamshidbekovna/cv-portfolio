import { ref } from 'vue'

// Module-level singleton so every component shares one reactive theme state.
// The initial `dark` class is applied by the no-flash script in index.html
// (runs before Vue mounts), so we just read it back here.
const isDark = ref(
  typeof document !== 'undefined' &&
    document.documentElement.classList.contains('dark')
)

function apply(dark) {
  isDark.value = dark
  document.documentElement.classList.toggle('dark', dark)
  try {
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  } catch {
    // localStorage may be unavailable (private mode) — theme still works for the session.
  }
}

export function useTheme() {
  const toggle = () => apply(!isDark.value)
  return { isDark, toggle }
}
