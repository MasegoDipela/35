'use client';

import { motion } from 'motion/react';
import { chapters } from '@/data/birthday-content';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const [activeChapter, setActiveChapter] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show nav after hero section
    const handleScroll = () => {
      const hero = document.getElementById('hero');
      if (hero) {
        const rect = hero.getBoundingClientRect();
        setIsVisible(rect.bottom < 0);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active chapter via Intersection Observer
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const navChapters = chapters.filter((c) => c.id !== 'prelude');
    navChapters.forEach((chapter) => {
      const el = document.getElementById(chapter.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveChapter(chapter.id);
          }
        },
        { threshold: 0.3 },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const navItems = chapters.filter((c) => c.id !== 'prelude');

  return (
    <motion.nav
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-3"
      initial={{ opacity: 0, x: 20 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : 20,
      }}
      transition={{ duration: 0.5 }}
      aria-label="Chapter navigation"
    >
      {navItems.map((chapter) => {
        const isActive = activeChapter === chapter.id;
        return (
          <button
            key={chapter.id}
            onClick={() => {
              const el = document.getElementById(chapter.id);
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group flex items-center gap-3 cursor-pointer"
            aria-label={`Go to ${chapter.title}`}
            aria-current={isActive ? 'true' : undefined}
          >
            {/* Label appears on hover */}
            <span
              className={`font-serif text-xs italic tracking-wide transition-all duration-300 ${
                isActive
                  ? 'text-gold opacity-100'
                  : 'text-charcoal/0 group-hover:text-charcoal/60 opacity-0 group-hover:opacity-100'
              }`}
            >
              {chapter.title}
            </span>

            {/* Dot */}
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-2 h-2 bg-gold'
                  : 'w-1.5 h-1.5 bg-charcoal/20 group-hover:bg-charcoal/40'
              }`}
            />
          </button>
        );
      })}
    </motion.nav>
  );
}
