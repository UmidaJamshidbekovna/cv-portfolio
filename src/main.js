import { createApp } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './style.css'
import App from './App.vue'

AOS.init({
  duration: 800,
  easing: 'ease-out-cubic',
  once: true,
  offset: 60
})

createApp(App).mount('#app')
