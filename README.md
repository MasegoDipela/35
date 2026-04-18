# Written in Light

A cinematic birthday microsite — a love letter told in chapters, margins, and hidden pages.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Where to Customise

### Photos

Place all photos in `/public/photos/`. Edit `/src/data/birthday-content.ts` to map each photo to its section, caption, and alt text.

| Field     | Meaning                                                     |
|-----------|-------------------------------------------------------------|
| `src`     | Filename inside `/public/photos/`                           |
| `alt`     | Accessible description                                      |
| `caption` | Poetic caption displayed alongside the photo                |
| `theme`   | `motion` / `quiet-light` / `everyday` / `people` / `hero`  |
| `section` | Which chapter uses this photo                               |

### Text & Copy

All copy lives in `/src/data/birthday-content.ts`. Key exports:

| Export          | What it controls                                  |
|-----------------|---------------------------------------------------|
| `HER_NAME`      | Her name shown in the prelude                     |
| `heroCopy`      | Hero heading, subtitle, CTA                       |
| `writerCopy`    | Chapter I paragraphs, margin notes, typed lines   |
| `storyPanels`   | Chapter II — memory subchapters & photos          |
| `easterEggs`    | Chapter III — hidden note content                 |
| `memoryCards`   | Desk drawer memory cards                          |
| `birthdayCopy`  | Chapter IV heading, sublines, birthday message    |
| `finaleLetter`  | The final letter — salutation, paragraphs, P.S.   |

### Colours

Palette is defined in both `/src/data/birthday-content.ts` (for reference) and `/src/app/globals.css` (as CSS custom properties via Tailwind `@theme`).

Primary palette:
- Ivory `#FAF6F1` — warm paper background
- Ink `#1A1A1A` — primary text
- Gold `#C9A96E` — accent, highlights
- Sepia `#D4C5B2` — muted tones
- Midnight `#1B2838` — dark dramatic sections

### Fonts

- **Serif** (headings, emotional lines): Cormorant Garamond — loaded in `layout.tsx`
- **Sans** (body, UI): Inter — loaded in `layout.tsx`

To swap fonts, edit the imports in `/src/app/layout.tsx`.

### Easter Eggs

Built-in easter eggs:

1. **Fountain pen** — click to reveal a hidden note
2. **Marginalia** — hover over the underlined word
3. **Floating paper** — click the drifting scrap for a poem
4. **Blinking cursor** — click for a hidden birthday message
5. **Desk drawer** — click to open and find 5 memory cards
6. **Type "INK"** — anywhere on the page reveals a secret panel
7. **Type "WRITE"** — reveals a bonus chapter quote
8. **3PM light beam** — a golden shaft of light crosses the Easter Egg section on scroll
9. **Ripple effect** — click anywhere in the Easter Egg section for a water ripple

Hidden in the HTML source:
- `<!-- Chapter ∅ — "The best stories are the ones someone builds for you in secret." -->`
- CSS comment: `/* Chapter ∅ — "She does not look for the light. She is the light — arriving." */`

## Architecture

```
src/
├── app/
│   ├── layout.tsx       ← Root layout, fonts, metadata
│   ├── page.tsx         ← Main page assembling all chapters
│   └── globals.css      ← Global styles, animations, textures
├── components/
│   ├── Prelude.tsx      ← Loading/intro sequence
│   ├── Hero.tsx         ← Full-screen hero reveal
│   ├── ChapterWriter.tsx    ← Ch. I — Her as a Writer
│   ├── ChapterStory.tsx     ← Ch. II — Story of Us (GSAP ScrollTrigger)
│   ├── ChapterEasterEggs.tsx ← Ch. III — Interactive hidden elements
│   ├── ChapterBirthday.tsx  ← Ch. IV — Birthday climax
│   ├── Finale.tsx       ← The Letter (GSAP scroll reveal)
│   ├── Navigation.tsx   ← Chapter nav dots
│   ├── ScrollProgress.tsx ← Ink-stroke reading progress bar
│   ├── TextReveal.tsx   ← Reusable text animation components
│   ├── ImageReveal.tsx  ← Reusable image mask reveal
│   └── GoldenParticles.tsx ← Canvas-based particle effect
├── data/
│   └── birthday-content.ts ← ALL content, photos, copy
├── hooks/
│   ├── useReducedMotion.ts
│   └── useKeyboardEasterEgg.ts
└── types/
    └── index.ts
```

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS 4**
- **Motion** (framer-motion successor) — UI animations
- **GSAP + ScrollTrigger** — scroll-driven storytelling

## Accessibility

- Respects `prefers-reduced-motion`
- Semantic HTML throughout
- Meaningful alt text on all images
- Scroll progress has ARIA role
- Keyboard navigable

## Build for Production

```bash
npm run build
npm start
```
