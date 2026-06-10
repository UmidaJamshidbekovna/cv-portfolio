<script setup>
</script>

<template>
  <div
    aria-hidden="true"
    class="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
  >
    <svg
      class="absolute inset-0 h-full w-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="og-base" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FBF7FB" />
          <stop offset="35%" stop-color="#FDF8F4" />
          <stop offset="70%" stop-color="#FBF5F7" />
          <stop offset="100%" stop-color="#F3E5F5" />
        </linearGradient>

        <radialGradient id="og-violet" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stop-color="#C77DFF" stop-opacity="0.35" />
          <stop offset="55%" stop-color="#E9A8F8" stop-opacity="0.18" />
          <stop offset="100%" stop-color="#F3E5F5" stop-opacity="0" />
        </radialGradient>

        <radialGradient id="og-magenta" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stop-color="#E96EF8" stop-opacity="0.22" />
          <stop offset="60%" stop-color="#F0C4F5" stop-opacity="0.12" />
          <stop offset="100%" stop-color="#FBF7FB" stop-opacity="0" />
        </radialGradient>

        <radialGradient id="og-lilac" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stop-color="#B388EB" stop-opacity="0.3" />
          <stop offset="55%" stop-color="#D9BFF0" stop-opacity="0.15" />
          <stop offset="100%" stop-color="#F3E5F5" stop-opacity="0" />
        </radialGradient>

        <radialGradient id="og-blush" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stop-color="#F9A8D4" stop-opacity="0.3" />
          <stop offset="60%" stop-color="#FBCFE8" stop-opacity="0.15" />
          <stop offset="100%" stop-color="#FBF7FB" stop-opacity="0" />
        </radialGradient>

        <filter id="og-soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="40" />
        </filter>
      </defs>

      <rect width="1440" height="900" fill="url(#og-base)" />

      <g filter="url(#og-soft)">
        <path
          class="origin-center animate-drift-a"
          d="M 1080 -120 C 1340 -80 1520 120 1480 340 C 1440 540 1240 600 1040 520 C 860 448 820 240 920 80 C 980 -20 1040 -120 1080 -120 Z"
          fill="url(#og-violet)"
        />

        <path
          class="origin-center animate-drift-b"
          d="M -80 60 C 160 0 360 120 380 300 C 400 460 240 560 60 520 C -100 488 -160 340 -140 220 C -128 150 -100 100 -80 60 Z"
          fill="url(#og-lilac)"
        />

        <path
          class="origin-center animate-drift-c"
          d="M 160 640 C 340 580 500 680 520 820 C 540 940 380 1000 220 960 C 80 924 -40 820 20 720 C 60 680 120 660 160 640 Z"
          fill="url(#og-blush)"
        />

        <path
          class="origin-center animate-drift-d"
          d="M 1240 560 C 1440 520 1560 660 1520 820 C 1480 980 1280 1020 1140 940 C 1020 872 1020 700 1140 620 C 1180 592 1220 572 1240 560 Z"
          fill="url(#og-magenta)"
        />

        <ellipse
          class="origin-center animate-drift-b"
          cx="720"
          cy="420"
          rx="320"
          ry="180"
          fill="url(#og-lilac)"
          opacity="0.5"
        />
      </g>

      <g>
        <circle class="animate-twinkle" cx="860" cy="180" r="3" fill="#8E24AA" />
        <circle class="animate-twinkle [animation-delay:1.2s]" cx="280" cy="720" r="2.5" fill="#E96EF8" />
        <circle class="animate-twinkle [animation-delay:2.4s]" cx="1120" cy="760" r="2" fill="#8E24AA" />
        <circle class="animate-twinkle [animation-delay:0.6s]" cx="420" cy="240" r="2" fill="#B388EB" />
      </g>
    </svg>
  </div>
</template>
