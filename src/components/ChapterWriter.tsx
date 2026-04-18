'use client';

import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { writerCopy } from '@/data/birthday-content';
import { TypewriterText } from './TextReveal';

export default function ChapterWriter() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-20%' });
  const [showTypewriter, setShowTypewriter] = useState(false);

  useEffect(() => {
    if (isInView) {
      const t = setTimeout(() => setShowTypewriter(true), 800);
      return () => clearTimeout(t);
    }
  }, [isInView]);

  return (
    <section
      id="writer"
      ref={sectionRef}
      className="relative min-h-screen section-dark py-24 md:py-32 overflow-hidden"
    >
      {/* Floating pages in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-ivory/[0.03] rounded-sm"
            style={{
              width: `${60 + i * 20}px`,
              height: `${80 + i * 25}px`,
              left: `${10 + i * 18}%`,
              top: `${15 + i * 12}%`,
              rotate: `${-5 + i * 3}deg`,
            }}
            animate={{
              y: [0, -20 - i * 5, 0],
              rotate: [`${-5 + i * 3}deg`, `${-3 + i * 2}deg`, `${-5 + i * 3}deg`],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Chapter heading */}
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        {/* Chapter number */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-serif text-sm tracking-[0.4em] uppercase text-gold/50">
            Chapter I
          </span>
          <div className="mt-4 mx-auto w-8 h-px bg-gold/30" />
        </motion.div>

        {/* Epigraph */}
        <motion.blockquote
          className="font-serif text-2xl md:text-4xl text-ivory/90 italic text-center leading-relaxed mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.2 }}
        >
          &ldquo;{writerCopy.epigraph}&rdquo;
        </motion.blockquote>

        {/* Paragraphs with margin notes */}
        <div className="relative">
          {/* Margin notes (desktop only) */}
          {writerCopy.marginNotes.map((note, i) => (
            <motion.span
              key={i}
              className="margin-note hidden lg:block"
              style={{ left: `${note.x}%`, top: `${note.y}%` }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.5 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 + i * 0.3 }}
            >
              {note.text}
            </motion.span>
          ))}

          {/* Main paragraphs */}
          {writerCopy.paragraphs.map((para, i) => (
            <motion.p
              key={i}
              className="font-sans text-base md:text-lg text-ivory/70 leading-[1.9] mb-8 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
            >
              {para}
            </motion.p>
          ))}
        </div>

        {/* Decorative ink line */}
        <motion.div
          className="my-16 mx-auto"
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: 100, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent w-full" />
        </motion.div>

        {/* Typewriter section */}
        <div className="min-h-[200px] py-8">
          {showTypewriter && (
            <TypewriterText
              lines={writerCopy.typedLines}
              className="text-ivory/60 pl-4 border-l border-gold/20"
              speed={60}
              lineDelay={1000}
            />
          )}
          {!showTypewriter && (
            <div className="h-8 flex items-center pl-4 border-l border-gold/20">
              <span className="cursor-blink !bg-gold/60" />
            </div>
          )}
        </div>

        {/* Underline decoration */}
        <motion.p
          className="mt-12 font-serif text-sm text-gold/40 italic text-center tracking-widest"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          — end of first draft —
        </motion.p>
      </div>
    </section>
  );
}
