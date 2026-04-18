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
      keyframes: {
        'float-up': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        'float-down': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' }
        }
      },
      animation: {
        'float-up': 'float-up 3s ease-in-out infinite',
        'float-down': 'float-down 3s ease-in-out infinite 1.5s'
      }
    }
  },
  plugins: []
}
