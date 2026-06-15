<script setup>
import OrganicBackground from './components/OrganicBackground.vue'
import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import EducationSection from './components/EducationSection.vue'
import TestimonialsSection from './components/TestimonialsSection.vue'
import BlogSection from './components/BlogSection.vue'
import ContactSection from './components/ContactSection.vue'
</script>

<template>
  <div class="relative min-h-screen overflow-x-clip text-ink">
    <OrganicBackground />

    <Navbar />
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <ProjectsSection />
    <ExperienceSection />
    <EducationSection />
    <TestimonialsSection />
    <BlogSection />
    <ContactSection />

    <footer
      class="mt-24 border-t border-brand-light bg-white/50 px-6 py-10 text-center text-sm text-gray-500 backdrop-blur-sm"
    >
      © {{ new Date().getFullYear() }} Umida Rakhimova — Built with Vue 3, Vite & TailwindCSS.
    </footer>
  </div>
</template>
