/* ── Written in Light · Type Definitions ── */

export interface PhotoEntry {
  /** Filename inside /public/photos/ */
  src: string;
  alt: string;
  caption?: string;
  /** Which memory-theme this photo belongs to */
  theme: 'motion' | 'quiet-light' | 'everyday' | 'people' | 'hero' | 'general';
  /** Which chapter section uses this */
  section?: 'hero' | 'writer' | 'story-motion' | 'story-quiet' | 'story-everyday' | 'story-people' | 'birthday' | 'finale';
}

export interface ChapterMeta {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
}

export interface EasterEggNote {
  id: string;
  trigger: 'click' | 'hover' | 'keyboard' | 'scroll';
  label: string;
  content: string;
}

export interface MemoryCard {
  id: string;
  title: string;
  body: string;
  icon?: string;
}

export interface StoryPanel {
  id: string;
  subchapter: 'motion' | 'quiet-light' | 'everyday' | 'people';
  heading: string;
  body: string;
  photos: string[]; // filenames in /public/photos/
}
