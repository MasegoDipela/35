'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { heroCopy, getPhotosBySection } from '@/data/birthday-content';
import TextReveal from './TextReveal';

interface HeroProps {
  onEnter: () => void;
}

export default function Hero({ onEnter }: HeroProps) {
  const heroPhoto = getPhotosBySection('hero')[0];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden section-ivory"
    >
      {/* Background image with ink-bloom reveal */}
      {heroPhoto && (
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ clipPath: 'circle(0% at 50% 50%)', opacity: 0 }}
          animate={{ clipPath: 'circle(80% at 50% 50%)', opacity: 0.15 }}
          transition={{ duration: 2.5, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Image
            src={`/photos/${heroPhoto.src}`}
            alt={heroPhoto.alt}
            fill
            className="object-cover photo-warm"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-ivory/80" />
        </motion.div>
      )}

      {/* Vignette */}
      <div className="absolute inset-0 vignette z-[1]" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Small ornamental line */}
        <motion.div
          className="mx-auto mb-8"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 64, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        </motion.div>

        {/* Main heading */}
        <TextReveal
          text={heroCopy.heading}
          as="h1"
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-light leading-[1.15] tracking-tight text-ink"
          delay={0.5}
          stagger={0.1}
        />

        {/* Subtitle */}
        <motion.p
          className="mt-8 font-sans text-sm md:text-base tracking-[0.2em] uppercase text-charcoal/60"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.0 }}
        >
          {heroCopy.subheading}
        </motion.p>

        {/* CTA */}
        <motion.button
          onClick={onEnter}
          className="mt-12 group relative inline-flex items-center gap-3 font-serif text-lg italic text-gold hover:text-ink transition-colors duration-500 cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative">
            {heroCopy.cta}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-500" />
          </span>
          <motion.span
            className="text-xs"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            ↓
          </motion.span>
        </motion.button>
      </div>

      {/* Margin decorations */}
      <motion.span
        className="absolute top-8 right-8 font-serif text-xs text-gold/30 italic tracking-widest hidden lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3 }}
      >
        vol. XXXV
      </motion.span>

      <motion.span
        className="absolute bottom-8 left-8 font-serif text-xs text-gold/30 italic hidden lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3.2 }}
      >
        written in light
      </motion.span>
    </section>
  );
}
