'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { HER_NAME, SITE_TITLE } from '@/data/birthday-content';

interface PreludeProps {
  onComplete: () => void;
}

export default function Prelude({ onComplete }: PreludeProps) {
  const [phase, setPhase] = useState<'cursor' | 'name' | 'title' | 'exit'>('cursor');

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('name'), 1200),
      setTimeout(() => setPhase('title'), 3200),
      setTimeout(() => setPhase('exit'), 5400),
      setTimeout(() => onComplete(), 6400),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'exit' ? null : null}
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        animate={phase === 'exit' ? { opacity: 0, y: -20 } : { opacity: 1 }}
        transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Paper grain on prelude */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '256px 256px',
          }}
        />

        {/* Blinking cursor phase */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'cursor' ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute"
        >
          <span className="cursor-blink !h-8 !w-[3px] !bg-gold" />
        </motion.div>

        {/* Her name forming */}
        <AnimatePresence>
          {(phase === 'name' || phase === 'title') && (
            <motion.h2
              className="font-serif text-3xl md:text-5xl text-ivory tracking-wide"
              initial={{ opacity: 0, letterSpacing: '0.3em' }}
              animate={{
                opacity: phase === 'title' ? 0.4 : 1,
                letterSpacing: '0.15em',
                y: phase === 'title' ? -30 : 0,
                scale: phase === 'title' ? 0.85 : 1,
              }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {HER_NAME.split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h2>
          )}
        </AnimatePresence>

        {/* Title reveal */}
        <AnimatePresence>
          {phase === 'title' && (
            <motion.div
              className="text-center mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <p className="font-serif text-lg md:text-2xl text-gold/80 italic tracking-widest">
                {SITE_TITLE}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Decorative envelope line */}
        <motion.div
          className="absolute bottom-1/3 left-1/2 -translate-x-1/2"
          initial={{ width: 0, opacity: 0 }}
          animate={{
            width: phase !== 'cursor' ? 120 : 0,
            opacity: phase !== 'cursor' ? 0.3 : 0,
          }}
          transition={{ duration: 1.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
