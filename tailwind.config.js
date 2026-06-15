/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        // Theme tokens are driven by CSS variables (see :root / html.dark in
        // src/style.css) so light/dark swap automatically without per-component
        // dark: variants. <alpha-value> keeps opacity modifiers (e.g. text-ink/70) working.
        surface: {
          DEFAULT: 'rgb(var(--surface) / <alpha-value>)',
          blush: 'rgb(var(--surface-blush) / <alpha-value>)',
          cream: 'rgb(var(--surface-cream) / <alpha-value>)',
          ivory: 'rgb(var(--surface-ivory) / <alpha-value>)',
          pearl: 'rgb(var(--surface-pearl) / <alpha-value>)'
        },
        ink: {
          DEFAULT: 'rgb(var(--ink) / <alpha-value>)',
          soft: 'rgb(var(--ink-soft) / <alpha-value>)'
        },
        accent: {
          DEFAULT: '#F9A8D4',
          soft: '#FBCFE8',
          rose: '#E8B4C8',
          champagne: '#E8D5B7'
        },
        brand: {
          purple: 'rgb(var(--brand-purple) / <alpha-value>)',
          light: 'rgb(var(--brand-light) / <alpha-value>)',
          dark: '#4A148C'
        },
        // Neutral scale is variable-driven too, so the many text-gray-* utilities
        // scattered across sections become legible in dark mode automatically.
        gray: {
          50: 'rgb(var(--gray-50) / <alpha-value>)',
          100: 'rgb(var(--gray-100) / <alpha-value>)',
          200: 'rgb(var(--gray-200) / <alpha-value>)',
          300: 'rgb(var(--gray-300) / <alpha-value>)',
          400: 'rgb(var(--gray-400) / <alpha-value>)',
          500: 'rgb(var(--gray-500) / <alpha-value>)',
          600: 'rgb(var(--gray-600) / <alpha-value>)',
          700: 'rgb(var(--gray-700) / <alpha-value>)',
          800: 'rgb(var(--gray-800) / <alpha-value>)',
          900: 'rgb(var(--gray-900) / <alpha-value>)',
          950: 'rgb(var(--gray-950) / <alpha-value>)'
        }
      },
      backgroundImage: {
        'soft-gradient':
          'radial-gradient(circle, rgba(233, 110, 248, 0.15) 0%, rgba(255,255,255,0) 70%)'
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      boxShadow: {
        glass: '0 1px 0 rgba(255,255,255,0.9) inset, 0 -1px 0 rgba(255,255,255,0.22) inset, 0 20px 40px -18px rgba(54,0,59,0.18), 0 8px 20px -10px rgba(115,0,126,0.12)',
        'glass-hover': '0 1px 0 rgba(255,255,255,1) inset, 0 -1px 0 rgba(255,255,255,0.32) inset, 0 32px 60px -22px rgba(54,0,59,0.32), 0 18px 36px -18px rgba(115,0,126,0.22)',
        'glass-deep': '0 1px 0 rgba(255,255,255,0.95) inset, 0 40px 80px -24px rgba(54,0,59,0.35), 0 22px 44px -18px rgba(115,0,126,0.28)'
      },
      keyframes: {
        'float-up': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        'float-down': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' }
        },
        'tilt-breath': {
          '0%, 100%': { transform: 'perspective(1000px) rotateX(0) rotateY(0)' },
          '50%': { transform: 'perspective(1000px) rotateX(1.5deg) rotateY(-2deg)' }
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.94)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        'pulse-soft': {
          '0%, 100%': { 'box-shadow': '0 0 0 0 rgba(54, 0, 59, 0.45)' },
          '70%': { 'box-shadow': '0 0 0 14px rgba(54, 0, 59, 0)' }
        },
        'drift-a': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(30px, -20px) scale(1.05)' }
        },
        'drift-b': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-25px, 25px) scale(1.04)' }
        },
        'drift-c': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(20px, 30px) scale(1.06)' }
        },
        'drift-d': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-30px, -15px) scale(1.03)' }
        },
        'gradient-flow': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' }
        },
        'twinkle': {
          '0%, 100%': { opacity: '0.2', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.4)' }
        },
        'caret': {
          '0%, 50%': { opacity: '1' },
          '50.01%, 100%': { opacity: '0' }
        }
      },
      animation: {
        'float-up': 'float-up 3s ease-in-out infinite',
        'float-down': 'float-down 3s ease-in-out infinite 1.5s',
        'tilt-breath': 'tilt-breath 8s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.9s ease-out both',
        'scale-in': 'scale-in 0.7s ease-out both',
        'pulse-soft': 'pulse-soft 2.5s ease-out infinite',
        'drift-a': 'drift-a 18s ease-in-out infinite',
        'drift-b': 'drift-b 22s ease-in-out infinite',
        'drift-c': 'drift-c 26s ease-in-out infinite',
        'drift-d': 'drift-d 20s ease-in-out infinite',
        'gradient-flow': 'gradient-flow 8s ease infinite',
        'twinkle': 'twinkle 3.5s ease-in-out infinite',
        'caret': 'caret 1.1s step-end infinite'
      }
    }
  },
  plugins: []
}
