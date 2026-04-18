'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useState, useCallback, useRef, useEffect } from 'react';
import { easterEggs, memoryCards } from '@/data/birthday-content';
import { useKeyboardEasterEgg } from '@/hooks/useKeyboardEasterEgg';

export default function ChapterEasterEggs() {
  const [revealedEggs, setRevealedEggs] = useState<Set<string>>(new Set());
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [inkRevealed, setInkRevealed] = useState(false);
  const [writeRevealed, setWriteRevealed] = useState(false);
  const [ripplePos, setRipplePos] = useState<{ x: number; y: number } | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // 3PM light beam scroll effect
  const [lightBeamOpacity, setLightBeamOpacity] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = 1 - (rect.top / vh);
      if (progress > 0.3 && progress < 0.8) {
        setLightBeamOpacity(Math.sin((progress - 0.3) * Math.PI / 0.5) * 0.12);
      } else {
        setLightBeamOpacity(0);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const revealEgg = useCallback((id: string) => {
    setRevealedEggs((prev) => new Set(prev).add(id));
    setActiveNote(id);
  }, []);

  // Keyboard easter eggs
  useKeyboardEasterEgg('INK', useCallback(() => {
    setInkRevealed(true);
    revealEgg('keyboard-ink');
  }, [revealEgg]));

  useKeyboardEasterEgg('WRITE', useCallback(() => {
    setWriteRevealed(true);
    revealEgg('keyboard-write');
  }, [revealEgg]));

  const getEggContent = (id: string) =>
    easterEggs.find((e) => e.id === id)?.content ?? '';

  // Ripple effect handler
  const handleRipple = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setRipplePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setTimeout(() => setRipplePos(null), 1200);
  };

  return (
    <section
      id="easter-eggs"
      ref={sectionRef}
      className="relative min-h-screen section-midnight py-24 md:py-32 overflow-hidden"
      onClick={handleRipple}
    >
      {/* 3PM light beam effect */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        style={{
          opacity: lightBeamOpacity,
          background: 'linear-gradient(135deg, transparent 30%, rgba(201, 169, 110, 0.3) 50%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Ripple effect (water/river reference) */}
      <AnimatePresence>
        {ripplePos && (
          <motion.div
            className="absolute pointer-events-none"
            style={{ left: ripplePos.x, top: ripplePos.y }}
            initial={{ width: 0, height: 0, opacity: 0.4 }}
            animate={{ width: 200, height: 200, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <div className="w-full h-full -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/30" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Chapter header */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-serif text-sm tracking-[0.4em] uppercase text-gold/50">
            Chapter III
          </span>
          <h2 className="mt-6 font-serif text-4xl md:text-5xl text-ivory font-light">
            Hidden Pages
          </h2>
          <p className="mt-4 font-sans text-sm text-ivory/40 tracking-wide">
            Some things are only found by those who look
          </p>
          <div className="mt-6 mx-auto w-8 h-px bg-gold/30" />
        </motion.div>

        {/* Interactive area */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">

          {/* Fountain pen easter egg */}
          <motion.div
            className="relative p-8 bg-ink/30 rounded-sm border border-gold/10 cursor-pointer group"
            whileHover={{ borderColor: 'rgba(201, 169, 110, 0.3)' }}
            onClick={(e) => { e.stopPropagation(); revealEgg('fountain-pen'); }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
              🖊
            </div>
            <p className="font-serif text-ivory/60 italic text-sm">
              A fountain pen left on the desk...
            </p>
            <p className="mt-2 font-sans text-ivory/30 text-xs">
              {revealedEggs.has('fountain-pen') ? '✓ Note found' : 'Click to look closer'}
            </p>
          </motion.div>

          {/* Hoverable word with marginalia */}
          <motion.div
            className="relative p-8 bg-ink/30 rounded-sm border border-gold/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p className="font-serif text-lg text-ivory/70 leading-relaxed">
              Every{' '}
              <span
                className="relative cursor-pointer group/word"
                onMouseEnter={() => revealEgg('margin-hover')}
              >
                <span className="border-b border-dashed border-gold/40 group-hover/word:border-gold group-hover/word:text-gold transition-colors duration-300">
                  marginalia
                </span>
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/word:opacity-100 transition-opacity duration-300 whitespace-nowrap bg-ink border border-gold/20 px-3 py-1 rounded font-sans text-xs text-gold/80">
                  n. — the notes that reveal what you really meant
                </span>
              </span>{' '}
              tells a truth the sentence tried to hide.
            </p>
            <p className="mt-4 font-sans text-ivory/30 text-xs">
              {revealedEggs.has('margin-hover') ? '✓ Marginalia revealed' : 'Hover over the underlined word'}
            </p>
          </motion.div>

          {/* Floating paper scrap */}
          <motion.div
            className="relative p-8 bg-ink/30 rounded-sm border border-gold/10 cursor-pointer group"
            whileHover={{ borderColor: 'rgba(201, 169, 110, 0.3)' }}
            onClick={(e) => { e.stopPropagation(); revealEgg('paper-scrap'); }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="text-2xl mb-4"
              animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              📜
            </motion.div>
            <p className="font-serif text-ivory/60 italic text-sm">
              A scrap of paper, drifting...
            </p>
            <p className="mt-2 font-sans text-ivory/30 text-xs">
              {revealedEggs.has('paper-scrap') ? '✓ Poem found' : 'Catch it'}
            </p>
          </motion.div>

          {/* Blinking cursor */}
          <motion.div
            className="relative p-8 bg-ink/30 rounded-sm border border-gold/10 cursor-pointer group"
            whileHover={{ borderColor: 'rgba(201, 169, 110, 0.3)' }}
            onClick={(e) => { e.stopPropagation(); revealEgg('blinking-cursor'); }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="mb-4 flex items-center gap-1">
              <span className="font-serif text-ivory/40 text-lg">_</span>
              <span className="cursor-blink !bg-gold/70" />
            </div>
            <p className="font-serif text-ivory/60 italic text-sm">
              A cursor, blinking patiently...
            </p>
            <p className="mt-2 font-sans text-ivory/30 text-xs">
              {revealedEggs.has('blinking-cursor') ? '✓ Message found' : 'What is it waiting for?'}
            </p>
          </motion.div>
        </div>

        {/* Desk drawer — memory cards */}
        <motion.div
          className="relative mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="w-full p-6 bg-ink/40 border border-gold/10 hover:border-gold/30 rounded-sm transition-colors duration-300 text-center cursor-pointer"
          >
            <span className="font-serif text-ivory/60 italic">
              {drawerOpen ? 'Close the drawer' : 'Open the desk drawer'}
            </span>
            <motion.span
              className="ml-2 inline-block text-gold/50"
              animate={{ rotate: drawerOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              ↓
            </motion.span>
          </button>

          <AnimatePresence>
            {drawerOpen && (
              <motion.div
                className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {memoryCards.map((card, i) => (
                  <motion.div
                    key={card.id}
                    className="p-5 bg-warm-white/5 border border-gold/10 rounded-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <div className="text-2xl mb-3">{card.icon}</div>
                    <h4 className="font-serif text-gold/80 text-sm mb-2">{card.title}</h4>
                    <p className="font-sans text-ivory/50 text-xs leading-relaxed">{card.body}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Keyboard hints */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="font-sans text-ivory/20 text-xs tracking-widest">
            Not everything is visible. Try typing something.
          </p>
        </motion.div>

        {/* Keyboard easter egg reveals */}
        <AnimatePresence>
          {inkRevealed && (
            <motion.div
              className="mt-8 p-8 bg-gold/5 border border-gold/20 rounded-sm text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-serif text-gold/80 italic leading-relaxed">
                {getEggContent('keyboard-ink')}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {writeRevealed && (
            <motion.div
              className="mt-4 p-8 bg-gold/5 border border-gold/20 rounded-sm text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-serif text-gold/80 italic leading-relaxed">
                {getEggContent('keyboard-write')}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hidden presence message (no-elsewhere reference) */}
        <motion.p
          className="mt-16 text-center font-serif text-xs text-gold/15 italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 1 }}
        >
          There is no elsewhere. Only here.
        </motion.p>
      </div>

      {/* Active note modal */}
      <AnimatePresence>
        {activeNote && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveNote(null)}
          >
            <div className="absolute inset-0 bg-ink/80" />
            <motion.div
              className="relative max-w-md w-full p-8 bg-ink border border-gold/20 rounded-sm"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveNote(null)}
                className="absolute top-4 right-4 text-ivory/30 hover:text-ivory/60 transition-colors text-sm cursor-pointer"
              >
                ✕
              </button>
              <p className="font-serif text-ivory/80 italic leading-relaxed whitespace-pre-line">
                {getEggContent(activeNote)}
              </p>
              <div className="mt-6 w-8 h-px bg-gold/30" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
