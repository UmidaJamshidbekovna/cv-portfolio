<script setup>
import { Phone, Github, Linkedin, Send, Code2, Zap } from 'lucide-vue-next'
import ProfileCard from './ProfileCard.vue'
import BadgeFloat from './BadgeFloat.vue'
</script>

<template>
  <section
    class="relative flex min-h-screen items-center overflow-hidden px-6 py-16 lg:px-20"
  >
    <span class="bg-glow right-[-120px] top-[80px]"></span>

    <div
      class="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-2"
    >
      <div class="order-2 lg:order-1">
        <p
          class="mb-2 text-sm text-gray-500"
          data-aos="fade-right"
          data-aos-delay="100"
        >
          Salom, men —
        </p>

        <h1
          class="font-display text-6xl font-bold leading-tight text-ink lg:text-7xl"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          Umida Rahimova
        </h1>

        <p
          class="mt-2 text-xl text-gray-600"
          data-aos="fade-right"
          data-aos-delay="300"
        >
          Full Stack Developer
        </p>

        <p
          class="mt-4 max-w-sm text-sm leading-relaxed text-gray-500"
          data-aos="fade-right"
          data-aos-delay="400"
        >
          Zamonaviy veb-ilovalar yaratish bo'yicha 3+ yillik tajribaga egaman.
          Foydalanuvchi tajribasiga e'tibor qaratgan holda sifatli kod yozaman.
        </p>

        <div
          class="mt-8 flex flex-wrap gap-4"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          <button class="btn-primary">
            Loyihalarni ko'rish →
          </button>
          <button
            class="flex items-center gap-2 rounded-xl border border-brand-light bg-white/70 px-6 py-3 text-gray-700 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-brand-purple hover:text-brand-purple"
          >
            <Phone class="h-4 w-4" />
            Bog'lanish
          </button>
        </div>

        <div
          class="mt-8 flex items-center gap-3"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <span class="text-sm text-gray-400">Ijtimoiy:</span>
          <a
            v-for="(social, i) in [
              { icon: Github, href: '#' },
              { icon: Linkedin, href: '#' },
              { icon: Send, href: '#' }
            ]"
            :key="i"
            :href="social.href"
            class="flex h-8 w-8 items-center justify-center rounded-full border border-brand-light bg-white/70 text-gray-500 backdrop-blur-sm transition-all hover:border-brand-purple hover:text-brand-purple"
          >
            <component :is="social.icon" class="h-4 w-4" />
          </a>
        </div>
      </div>

      <div class="order-1 flex justify-center lg:order-2 lg:justify-end">
        <div class="relative">
          <ProfileCard />

          <div
            class="absolute -left-4 top-8 hidden sm:-left-16 sm:block"
            data-aos="fade-right"
            data-aos-delay="500"
          >
            <BadgeFloat
              title="Clean Code"
              subtitle="Best practices"
              animation="float-up"
            >
              <template #icon>
                <Code2 class="h-4 w-4" />
              </template>
            </BadgeFloat>
          </div>

          <div
            class="absolute -right-4 bottom-4 hidden sm:-right-8 sm:block"
            data-aos="fade-left"
            data-aos-delay="600"
          >
            <BadgeFloat
              variant="dark"
              title="Fast Coding"
              subtitle="On time"
              animation="float-down"
            >
              <template #icon>
                <Zap class="h-4 w-4" />
              </template>
            </BadgeFloat>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
