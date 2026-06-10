/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#FDF8F4',
          blush: '#FCEDF0',
          cream: '#F7EEDF',
          ivory: '#FBF7F2',
          pearl: '#FBE9EC'
        },
        ink: {
          DEFAULT: '#1F2937',
          soft: '#5B4F5E'
        },
        accent: {
          DEFAULT: '#F9A8D4',
          soft: '#FBCFE8',
          rose: '#E8B4C8',
          champagne: '#E8D5B7'
        },
        brand: {
          purple: '#8E24AA',
          light: '#F3E5F5',
          dark: '#4A148C'
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
