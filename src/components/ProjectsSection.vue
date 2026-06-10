<script setup>
import {
  MessageSquare,
  Heart,
  GraduationCap,
  Home,
  Megaphone,
  Smartphone,
  LayoutDashboard
} from 'lucide-vue-next'
import ProjectCard from './ProjectCard.vue'

const textupLogo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 220" width="100%" height="100%">
  <defs>
    <style>
      .tx-bg-bubble { fill: #6A38B3; }
      .tx-fg-bubble { fill: #B18CFE; fill-opacity: 0.85; }
      .tx-dot { fill: #000000; }
      .tx-text-brand { font-family: 'Arial Black', 'Impact', sans-serif; font-weight: 900; fill: #8247E5; }
    </style>
  </defs>
  <g>
    <path class="tx-bg-bubble" d="M 40,20 L 190,20 A 30,30 0 0,1 220,50 L 220,130 A 30,30 0 0,1 190,160 L 70,160 L 40,160 A 30,30 0 0,1 10,130 L 10,50 A 30,30 0 0,1 40,20 Z" />
    <path class="tx-fg-bubble" d="M 80,45 L 230,45 A 25,25 0 0,1 255,70 L 255,150 A 25,25 0 0,1 230,175 L 235,215 L 195,175 L 80,175 A 25,25 0 0,1 55,150 L 55,70 A 25,25 0 0,1 80,45 Z" />
    <circle class="tx-dot" cx="105" cy="110" r="11" />
    <circle class="tx-dot" cx="155" cy="110" r="11" />
    <circle class="tx-dot" cx="205" cy="110" r="11" />
    <text x="290" y="140" font-size="82" letter-spacing="-2" class="tx-text-brand">TEXTUP</text>
  </g>
</svg>`

const houzLogo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <filter id="hz-drop-shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.12"/>
    </filter>
    <linearGradient id="hz-sky-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#76A5D9"/>
      <stop offset="60%" stop-color="#B3D1F2"/>
      <stop offset="100%" stop-color="#E1ECF7"/>
    </linearGradient>
    <linearGradient id="hz-wood-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#A67C52"/>
      <stop offset="50%" stop-color="#D9A066"/>
      <stop offset="100%" stop-color="#8C6239"/>
    </linearGradient>
  </defs>
  <style>
    .hz-font-sans { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
    .hz-title-dark { font-weight: 800; fill: #111111; font-size: 26px; }
    .hz-title-light { font-weight: 400; fill: #777777; font-size: 26px; }
    .hz-desc-text { font-size: 10px; fill: #666666; text-anchor: middle; font-weight: 400; }
    .hz-nav-text { font-size: 11px; font-weight: 600; fill: #222222; }
    .hz-nav-inactive { font-size: 11px; font-weight: 500; fill: #888888; }
    .hz-btn-text { font-size: 10px; font-weight: 600; fill: #111111; text-anchor: middle; }
    .hz-logo-text { font-size: 14px; font-weight: 800; fill: #111111; }
    .hz-logo-sub { font-size: 6px; font-weight: 400; fill: #555555; letter-spacing: 1px; }
  </style>
  <g filter="url(#hz-drop-shadow)">
    <rect x="20" y="20" width="760" height="460" rx="12" fill="#FFFFFF"/>
    <path d="M 20,20 L 780,20 A 12,12 0 0,1 780,45 L 20,45 A 0,0 0 0,1 20,20 Z" fill="#F3F4F6"/>
    <circle cx="40" cy="32" r="5" fill="#EF4444"/>
    <circle cx="56" cy="32" r="5" fill="#F59E0B"/>
    <circle cx="72" cy="32" r="5" fill="#10B981"/>
  </g>
  <g transform="translate(50, 75)">
    <text x="0" y="0" class="hz-font-sans hz-logo-text">hou.uz</text>
    <text x="0" y="8" class="hz-font-sans hz-logo-sub">ARCHITECTS</text>
  </g>
  <g transform="translate(670, 70)">
    <rect x="0" y="0" width="80" height="28" rx="4" fill="none" stroke="#111111" stroke-width="1"/>
    <text x="40" y="17" class="hz-font-sans hz-btn-text">Contacts</text>
  </g>
  <g transform="translate(400, 115)">
    <text x="0" y="0" text-anchor="middle" class="hz-font-sans">
      <tspan class="hz-title-dark">Landscape </tspan>
      <tspan class="hz-title-light">design</tspan>
    </text>
  </g>
  <g transform="translate(400, 140)">
    <text x="0" y="0" class="hz-font-sans hz-desc-text">Welcome to "Hou.uz Architects"! We specialize in creating unique architectural solutions and interior design. Our</text>
    <text x="0" y="14" class="hz-font-sans hz-desc-text">team of professionals unites experienced architects, designers and engineers to realize projects of any complexity.</text>
    <text x="0" y="28" class="hz-font-sans hz-desc-text">We offer an integrated approach to each project, starting with the concept and ending with realization.</text>
  </g>
  <g transform="translate(400, 195)" text-anchor="middle">
    <text x="-60" y="0" class="hz-font-sans hz-nav-text">Show all</text>
    <line x1="-83" y1="6" x2="-37" y2="6" stroke="#111111" stroke-width="1.5"/>
    <text x="5" y="0" class="hz-font-sans hz-nav-inactive">Exterior</text>
    <text x="65" y="0" class="hz-font-sans hz-nav-inactive">Interior</text>
  </g>
  <g transform="translate(50, 220)">
    <g>
      <clipPath id="hz-clip-left">
        <rect x="0" y="0" width="310" height="235" rx="4"/>
      </clipPath>
      <g clip-path="url(#hz-clip-left)">
        <rect x="0" y="0" width="310" height="235" fill="#EADCC9"/>
        <path d="M -20,250 C 40,150 20,50 60,0 L 90,0 C 50,50 70,150 10,250 Z" fill="url(#hz-wood-grad)" opacity="0.8"/>
        <path d="M 30,250 C 90,150 70,50 110,0 L 140,0 C 100,50 120,150 60,250 Z" fill="url(#hz-wood-grad)" opacity="0.9"/>
        <path d="M 80,250 C 140,150 120,50 160,0 L 190,0 C 150,50 170,150 110,250 Z" fill="url(#hz-wood-grad)"/>
        <path d="M 130,250 C 190,150 170,50 210,0 L 240,0 C 200,50 220,150 160,250 Z" fill="url(#hz-wood-grad)" opacity="0.85"/>
        <path d="M 180,250 C 240,150 220,50 260,0 L 290,0 C 250,50 270,150 210,250 Z" fill="url(#hz-wood-grad)" opacity="0.75"/>
        <path d="M 170,235 L 170,150 L 270,150 L 270,235 Z" fill="#333333"/>
        <rect x="185" y="165" width="40" height="70" fill="#444444" rx="2"/>
      </g>
    </g>
    <g transform="translate(325, 0)">
      <clipPath id="hz-clip-center">
        <rect x="0" y="0" width="180" height="235" rx="4"/>
      </clipPath>
      <g clip-path="url(#hz-clip-center)">
        <rect x="0" y="0" width="180" height="80" fill="url(#hz-sky-grad)"/>
        <rect x="0" y="60" width="180" height="175" fill="#E5E7EB"/>
        <rect x="10" y="40" width="160" height="150" fill="#FFFFFF" stroke="#D1D5DB"/>
        <rect x="20" y="65" width="15" height="125" fill="#C5A059" opacity="0.7"/>
        <rect x="45" y="65" width="15" height="125" fill="#C5A059" opacity="0.7"/>
        <rect x="120" y="65" width="15" height="125" fill="#C5A059" opacity="0.7"/>
        <rect x="145" y="65" width="15" height="125" fill="#C5A059" opacity="0.7"/>
        <rect x="68" y="75" width="44" height="20" fill="#222222" rx="2"/>
        <text x="90" y="87" fill="#C5A059" font-size="5" font-weight="bold" text-anchor="middle" font-family="sans-serif" letter-spacing="0.5">TRILLIANT</text>
        <path d="M 10,165 L 25,155 L 65,155 L 75,165 L 80,173 L 10,173 Z" fill="#1F2937"/>
        <circle cx="25" cy="173" r="6" fill="#111111"/>
        <circle cx="25" cy="173" r="3" fill="#9CA3AF"/>
        <circle cx="63" cy="173" r="6" fill="#111111"/>
        <circle cx="63" cy="173" r="3" fill="#9CA3AF"/>
        <rect x="0" y="179" width="180" height="56" fill="#4B5563"/>
      </g>
    </g>
    <g transform="translate(520, 0)">
      <clipPath id="hz-clip-right">
        <rect x="0" y="0" width="180" height="235" rx="4"/>
      </clipPath>
      <g clip-path="url(#hz-clip-right)">
        <rect x="0" y="0" width="180" height="235" fill="url(#hz-sky-grad)"/>
        <path d="M 30,80 Q 40,65 55,75 Q 70,60 85,75 Q 95,70 100,80 Q 110,85 100,95 L 30,95 Z" fill="#FFFFFF" opacity="0.85"/>
        <path d="M 90,120 Q 100,110 110,115 Q 125,105 135,118 Q 145,115 148,123 Q 155,128 145,135 L 90,135 Z" fill="#FFFFFF" opacity="0.75"/>
        <rect x="0" y="210" width="180" height="25" fill="#EAE5DA"/>
        <rect x="10" y="218" width="8" height="5" fill="#7E7A72"/>
        <rect x="24" y="218" width="8" height="5" fill="#7E7A72"/>
        <rect x="38" y="218" width="8" height="5" fill="#7E7A72"/>
        <rect x="52" y="218" width="8" height="5" fill="#7E7A72"/>
        <rect x="66" y="218" width="8" height="5" fill="#7E7A72"/>
        <rect x="80" y="218" width="8" height="5" fill="#7E7A72"/>
      </g>
    </g>
  </g>
</svg>`

const projects = [
  {
    title: 'Sovchi.app — Landing',
    thumbClass: 'bg-brand-light text-brand-purple',
    icon: Heart,
    image: '/sovchiapp.jpg',
    liveUrl: 'https://sovchi.app/',
    repoUrl: ''
  },
  {
    title: 'Sovchi.app — Telegram Mini App',
    thumbClass: 'bg-accent text-brand-dark',
    icon: Smartphone,
    image: '/sovchiapp.jpg',
    liveUrl: 'https://t.me/sovchiapp_bot',
    repoUrl: ''
  },
  {
    title: 'Sovchi.app — Admin Panel',
    thumbClass: 'bg-brand-dark text-brand-light',
    icon: LayoutDashboard,
    image: '/sovchiapp.jpg',
    liveUrl: '',
    repoUrl: '',
    private: true
  },
  {
    title: 'Zamonaviy SMS Platforma',
    thumbClass: 'bg-white',
    icon: MessageSquare,
    logo: textupLogo,
    liveUrl: 'https://textup.uz/',
    repoUrl: ''
  },
  {
    title: 'Farobiy International School',
    thumbClass: 'bg-brand-dark text-brand-light',
    icon: GraduationCap,
    liveUrl: 'https://farobiy-red.vercel.app/',
    repoUrl: ''
  },
  {
    title: 'Houz',
    thumbClass: 'bg-white',
    icon: Home,
    logo: houzLogo,
    liveUrl: 'https://ho.uz/',
    repoUrl: ''
  },
  {
    title: 'Folio-agency',
    thumbClass: 'bg-ink text-brand-light',
    icon: Megaphone,
    liveUrl: 'https://serene-lamington-7ff9dc.netlify.app/',
    repoUrl: ''
  },
  {
    title: 'laCafe & 6sekund — Admin Panel',
    thumbClass: 'bg-brand-purple text-white',
    icon: LayoutDashboard,
    liveUrl: '',
    repoUrl: '',
    private: true
  }
]
</script>

<template>
  <section id="projects" class="relative px-6 pt-16 lg:px-20">
    <span class="bg-glow right-[-100px] top-40"></span>

    <div class="mx-auto max-w-7xl">
      <div class="max-w-2xl" data-aos="fade-up">
        <p class="text-sm font-medium uppercase tracking-wider text-brand-purple">
          Portfolio
        </p>
        <h2 class="mt-2 text-3xl font-bold text-ink sm:text-4xl">
          Loyihalar
        </h2>
        <p class="mt-3 text-base text-gray-600">
          Mening so‘nggi loyihalarimdan tanlov — biznes platformalardan tortib
          mobil ilovalargacha.
        </p>
      </div>

      <div
        class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <ProjectCard
          v-for="(project, index) in projects"
          :key="project.title"
          v-bind="project"
          data-aos="fade-up"
          :data-aos-delay="100 + index * 80"
        />
      </div>
    </div>
  </section>
</template>
