# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server on http://localhost:5173 (auto-opens browser via `vite.config.js`).
- `npm run build` — production build to `dist/`.
- `npm run preview` — serve the production build locally.

No test runner, linter, or type-checker is configured. There are no scripts for those — do not invent commands.

## Stack

Vue 3 (Composition API, `<script setup>`) + Vite 6 + TailwindCSS 3. Icons come from `lucide-vue-next`. Scroll animations come from `aos` (initialized once in `src/main.js`). No router, no state library, no backend — this is a static single-page portfolio.

UI copy is primarily in Uzbek (`<html lang="uz">`). Keep that locale when editing user-facing text; mixing in English for tech/proper nouns is the established style (see `ProjectsSection.vue`, `ExperienceSection.vue`).

## Architecture

The whole page is a single vertical stack assembled in `src/App.vue`:

```
OrganicBackground (fixed -z-10 animated SVG)
Navbar (sticky pill, IntersectionObserver-driven active state)
HeroSection → AboutSection → SkillsSection → ProjectsSection
  → ExperienceSection → TestimonialsSection → BlogSection → ContactSection
footer
```

Two coupling points to keep in sync when adding/removing a section:

1. **`src/App.vue`** — import and render the section.
2. **`src/components/Navbar.vue`** — add an entry to the `items` array with an `id` that matches the section's `id="…"` attribute. `Navbar` builds its IntersectionObserver from those `id`s and uses `scrollIntoView` to navigate. The CSS `scroll-margin-top: 100px` on `section[id]` (in `style.css`) compensates for the floating navbar.

Sections are self-contained: each one owns its own data arrays (projects, experiences, skills, channels, etc.) at the top of `<script setup>`. There is no shared store and no JSON content layer — copy edits happen inside the component that renders them. Small reusable pieces (`ProjectCard`, `TimelineItem`, `BadgeFloat`, `ProfileCard`) are consumed by their parent section.

## Styling system

- **Theme tokens** live in `tailwind.config.js` under `theme.extend.colors`: `brand.{purple,light,dark}`, `surface.{blush,cream,ivory,pearl}`, `ink.{DEFAULT,soft}`, `accent.{DEFAULT,soft,rose,champagne}`. Prefer these over raw hex. Fonts are `font-display` (Plus Jakarta Sans, headings) and `font-body` (Inter, body) — applied automatically to `h1–h6` and `body` in `style.css`'s `@layer base`.
- **Reusable component classes** live in `src/style.css` under `@layer components`: `.glass-card` (frosted panel — translucent white + blur + soft shadow), `.btn-primary` (the deep-purple button with the sheen sweep on hover/focus/`is-active`). The `.bg-glow` utility renders a radial pink blur halo and is positioned per-use with absolute placement classes. Reach for these before inventing new card/button styles.
- **Custom keyframes** (`drift-a`/`b`/`c`/`d`, `float-up`/`down`, `fade-in-up`, `scale-in`, `pulse-soft`, `gradient-flow`, `twinkle`, `caret`) are defined in `tailwind.config.js` and exposed as `animate-*` utilities. Reuse them rather than adding new keyframes for similar effects.

## Animation conventions

- **AOS (scroll-in)**: add `data-aos="fade-up|fade-left|fade-right"` and stagger via `data-aos-delay="100"`, `200`, ... on the elements you want to animate in. AOS is initialized with `once: true, offset: 60` in `src/main.js`, so animations fire only on first reveal — design around that.
- **Continuous loops** (drifting blobs, pulsing nav pill, blinking caret): use the `animate-*` utilities from the Tailwind config.

The hero name effect in `HeroSection.vue` is a hand-rolled typing/deleting loop driven by `setTimeout` + a `phase` state machine; the `firstName`/`lastName` split colors the two halves separately. If renaming, update both constants and the `sr-only` fallback.

## Conventions / gotchas

- All Vue files use `<script setup>` — keep that style.
- Lucide icons are imported by name from `lucide-vue-next` and bound through `<component :is="…">` when iterating lists (see `Navbar.vue`, `HeroSection.vue` socials). For non-Lucide icons (e.g., the Telegram glyph in `ContactSection.vue`), inline a `render()`-based component using `h()` rather than pulling in another icon pack.
- Skill icons in `SkillsSection.vue` are stored as raw SVG strings and rendered via `v-html` — intentional to avoid per-brand icon dependencies. Sanitization is fine here because the strings are author-controlled.
- `index.html` preconnects Plus Jakarta Sans + Inter from Google Fonts; do not switch font sources without updating both the `<head>` link and `tailwind.config.js`'s `fontFamily`.
- `.claude/` is gitignored — local Claude Code state stays out of commits.
