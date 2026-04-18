/* ─────────────────────────────────────────────────────────
   Written in Light · Content Data Layer
   ─────────────────────────────────────────────────────────
   Edit this file to swap photos, change captions,
   reorder sections, or personalise every line of copy.
   ───────────────────────────────────────────────────────── */

import type { PhotoEntry, ChapterMeta, EasterEggNote, MemoryCard, StoryPanel } from '@/types';

/* ── Her name (displayed throughout the site) ── */
export const HER_NAME = 'My Love';

/* ── Site meta ── */
export const SITE_TITLE = 'Written in Light';
export const SITE_DESCRIPTION = 'A birthday letter, told in chapters.';

/* ── Photos ──
   Map every image to its metadata.
   To swap a photo, just change the `src` filename.
   All images live in /public/photos/                      */
export const photos: PhotoEntry[] = [
  {
    src: '2daf466d-10f5-48c5-8120-0c8e73f9ba31.JPG',
    alt: 'Us together on a walk',
    caption: 'Every step beside you rewrites the map.',
    theme: 'motion',
    section: 'story-motion',
  },
  {
    src: '798dcf04-28fa-458e-858e-7f9acebe4ff7.JPG',
    alt: 'Marathon medal moment',
    caption: 'The finish line was never the point.',
    theme: 'motion',
    section: 'story-motion',
  },
  {
    src: 'IMG_1438.png',
    alt: 'Together at golden hour',
    caption: 'Light finds you before it finds anyone else.',
    theme: 'quiet-light',
    section: 'hero',
  },
  {
    src: 'IMG_1905.png',
    alt: 'A quiet candid moment',
    caption: 'Even stillness tells a story when you\'re in it.',
    theme: 'quiet-light',
    section: 'story-quiet',
  },
  {
    src: 'IMG_2043.png',
    alt: 'Sunset on the trail',
    caption: 'Some evenings remember themselves.',
    theme: 'quiet-light',
    section: 'story-quiet',
  },
  {
    src: 'IMG_2304.JPG',
    alt: 'Gym mirror selfie together',
    caption: 'Strength looks good on you — always has.',
    theme: 'motion',
    section: 'story-motion',
  },
  {
    src: 'IMG_2606.png',
    alt: 'Family celebration',
    caption: 'In every room you walk into, belonging follows.',
    theme: 'people',
    section: 'story-people',
  },
  {
    src: 'IMG_5753.png',
    alt: 'Building something together',
    caption: 'Hands that write worlds also build them.',
    theme: 'everyday',
    section: 'story-everyday',
  },
  {
    src: 'IMG_6139.png',
    alt: 'Outdoor adventure together',
    caption: 'The trail doesn\'t end — it just turns.',
    theme: 'motion',
    section: 'story-motion',
  },
  {
    src: 'IMG_7345.png',
    alt: 'Quiet moment in the garden',
    caption: 'You tend things the way you tend people — gently, stubbornly, beautifully.',
    theme: 'everyday',
    section: 'story-everyday',
  },
  {
    src: 'IMG_7940.png',
    alt: 'Together smiling',
    caption: 'This is what presence looks like.',
    theme: 'people',
    section: 'story-people',
  },
  {
    src: 'IMG_8312.png',
    alt: 'Close-up at dusk',
    caption: 'There is a frequency only you carry.',
    theme: 'quiet-light',
    section: 'birthday',
  },
  {
    src: 'IMG_9052.png',
    alt: 'Us — a favourite frame',
    caption: 'If I could choose any paragraph to live inside, it would be this one.',
    theme: 'general',
    section: 'finale',
  },
];

/* ── Helper to get photos by section ── */
export function getPhotosBySection(section: PhotoEntry['section']): PhotoEntry[] {
  return photos.filter((p) => p.section === section);
}

export function getPhotosByTheme(theme: PhotoEntry['theme']): PhotoEntry[] {
  return photos.filter((p) => p.theme === theme);
}

/* ── Chapter metadata ── */
export const chapters: ChapterMeta[] = [
  { id: 'prelude', number: '◌', title: 'Prelude' },
  { id: 'hero', number: '○', title: 'The Reveal' },
  { id: 'writer', number: 'I', title: 'Her Words' },
  { id: 'story', number: 'II', title: 'The Story of Us' },
  { id: 'easter-eggs', number: 'III', title: 'Hidden Pages' },
  { id: 'birthday', number: 'IV', title: 'The Becoming' },
  { id: 'finale', number: '∞', title: 'The Letter' },
];

/* ── Hero copy ── */
export const heroCopy = {
  heading: 'For the woman who turns life into language.',
  subheading: 'A letter in seven chapters, for your thirty-fifth year.',
  cta: 'Open the letter',
};

/* ── Chapter I — Writer ── */
export const writerCopy = {
  epigraph: 'She lives where sentences begin — in the breath before the word lands.',
  paragraphs: [
    'You do not write to decorate silence. You write to honour it — to give it a name, a room, a window facing south-east where the 3 PM light arrives without knocking.',
    'Your pages carry the weight of restoration. Every draft is an act of recalibration — not a correction, but a returning. A compass finding true north.',
    'Some people collect memories. You translate them. You take the afternoon, the harbour, the river, the way a room felt before anyone spoke — and you hold those things inside language until they breathe on their own.',
    'This is not your hobby. This is the architecture of who you are. Every sentence you write is a small act of courage — a refusal to live on the surface.',
  ],
  marginNotes: [
    { text: 'first draft — always the bravest', x: 85, y: 20 },
    { text: 'revision is devotion', x: 10, y: 45 },
    { text: 'the word you almost deleted was the truest one', x: 80, y: 70 },
    { text: 'unfinished doesn\'t mean unfinished', x: 15, y: 88 },
  ],
  typedLines: [
    'She opens the notebook.',
    'The pen is already warm.',
    'Somewhere between the margin and the edge of the page,',
    'she finds what she came to say.',
  ],
};

/* ── Chapter II — Story of Us ── */
export const storyPanels: StoryPanel[] = [
  {
    id: 'in-motion',
    subchapter: 'motion',
    heading: 'In Motion',
    body: 'We run. We walk. We chase the trail until the light changes and our legs remember they are temporary. But we keep going — because the rhythm of us is not a straight line; it is a long, honest road with no shortcuts.',
    photos: ['2daf466d-10f5-48c5-8120-0c8e73f9ba31.JPG', '798dcf04-28fa-458e-858e-7f9acebe4ff7.JPG', 'IMG_2304.JPG', 'IMG_6139.png'],
  },
  {
    id: 'in-quiet-light',
    subchapter: 'quiet-light',
    heading: 'In Quiet Light',
    body: 'Some of our best conversations happened without words — in the pause between sunset and dark, in the soft collapse of an evening that didn\'t need to be anything more than what it was.',
    photos: ['IMG_1905.png', 'IMG_2043.png'],
  },
  {
    id: 'in-the-everyday',
    subchapter: 'everyday',
    heading: 'In the Everyday',
    body: 'You build things with your hands the way you build things with your words: patiently, precisely, with an attention to detail that most people reserve for their best self. But this is just your self. Every day.',
    photos: ['IMG_5753.png', 'IMG_7345.png'],
  },
  {
    id: 'in-our-people',
    subchapter: 'people',
    heading: 'In Our People',
    body: 'To watch you with the people you love is to understand belonging as a verb. You don\'t just occupy space in someone\'s life — you hold it steady. You make it feel like home.',
    photos: ['IMG_2606.png', 'IMG_7940.png'],
  },
];

/* ── Chapter III — Easter Eggs ── */
export const easterEggs: EasterEggNote[] = [
  {
    id: 'fountain-pen',
    trigger: 'click',
    label: '🖊',
    content: 'Every writer has a secret shelf of sentences they wrote but never showed anyone. This one is yours: you are extraordinary — and you are only beginning.',
  },
  {
    id: 'margin-hover',
    trigger: 'hover',
    label: 'hover over the underlined word',
    content: 'Marginalia: n. — the notes you leave in the margins that reveal what you were really thinking.',
  },
  {
    id: 'keyboard-ink',
    trigger: 'keyboard',
    label: 'Type "INK"',
    content: 'You found the hidden ink. Here is a secret: the person who made this website thinks about you the way light thinks about a window — constantly, quietly, and from every angle.',
  },
  {
    id: 'keyboard-write',
    trigger: 'keyboard',
    label: 'Type "WRITE"',
    content: 'A bonus chapter appears: "She writes the way some people pray — with her whole body, and with no guarantee anyone is listening. But she writes anyway."',
  },
  {
    id: 'paper-scrap',
    trigger: 'click',
    label: 'Floating paper',
    content: 'A small poem found tucked between the pages:\n\nYou are the sentence\nI keep revising —\nnot because it\'s wrong,\nbut because it\'s worth\ngetting exactly right.',
  },
  {
    id: 'blinking-cursor',
    trigger: 'click',
    label: 'Cursor',
    content: 'Happy birthday to the woman who taught me that words are not decorations — they are doors.',
  },
];

export const memoryCards: MemoryCard[] = [
  {
    id: 'card-1',
    title: 'The Notebook',
    body: 'The one you carry everywhere. Dog-eared, full of half-thoughts and whole truths.',
    icon: '📓',
  },
  {
    id: 'card-2',
    title: 'The Song',
    body: 'The one that was playing that time, in the car, when everything made sense.',
    icon: '♫',
  },
  {
    id: 'card-3',
    title: 'The Morning',
    body: 'That one Tuesday morning when the light hit the kitchen counter and neither of us said anything and it was enough.',
    icon: '☼',
  },
  {
    id: 'card-4',
    title: 'The Run',
    body: 'When you said you couldn\'t go any further, and then you did.',
    icon: '↗',
  },
  {
    id: 'card-5',
    title: 'The Draft',
    body: 'The one you almost threw away. The bravest thing you ever wrote.',
    icon: '✎',
  },
];

/* ── Chapter IV — Birthday lines ── */
export const birthdayCopy = {
  preHeading: 'Chapter IV',
  heading: '35 looks like grace.',
  sublines: [
    'This year belongs to your becoming.',
    'To the woman whose words carry worlds.',
    'To the quiet strength, the open notebook, the unfinished sentence that will change everything.',
  ],
  message: 'Happy birthday, my love. You are not one year older — you are one year deeper. One year braver. One year more luminous in every room you enter. I am endlessly proud of the person you are and the writer you are becoming.',
};

/* ── Finale — The Letter ── */
export const finaleLetter = {
  salutation: 'My dearest,',
  paragraphs: [
    'If I could write the way you write, I would find exactly the right words for this. But I can\'t — so I built you a place instead. A small room made of light and code and memory, where the things I want to say can live.',
    'I want to say: you make the world more legible. You take the ordinary — an afternoon, a walk, a conversation — and you turn it into something someone will remember.',
    'I want to say: watching you write is like watching someone pray. It is private, and sacred, and I am grateful every time you let me be in the room.',
    'I want to say: thirty-five looks extraordinary on you. Not because of the number, but because of the woman wearing it — someone who is brave enough to look at the world honestly and tender enough to still be moved by it.',
    'I want to say: there is no elsewhere. Only here. Only us. Only this.',
    /* ── ADD YOUR OWN PARAGRAPHS BELOW ── */
    // 'Your personal paragraph here...',
    // 'Another personal paragraph...',
  ],
  closing: 'With everything I have, and everything I am learning to give —',
  signature: 'Yours, Masego',
  ps: 'P.S. — I hid some things in these pages. Keep looking.',
};

/* ── Palette (for reference — also defined in globals.css) ── */
export const palette = {
  ivory: '#FAF6F1',
  ink: '#1A1A1A',
  charcoal: '#2D2D2D',
  gold: '#C9A96E',
  sepia: '#D4C5B2',
  blush: '#E8D5C4',
  midnight: '#1B2838',
  warmWhite: '#F5F0EA',
};
