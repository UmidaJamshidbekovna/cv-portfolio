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

// Hide the pre-mount loader once the app is ready, then remove it from the DOM.
const preloader = document.getElementById('preloader')
if (preloader) {
  requestAnimationFrame(() => {
    preloader.classList.add('is-hidden')
    preloader.addEventListener('transitionend', () => preloader.remove(), {
      once: true
    })
  })
}
