'use client';

import { motion } from 'motion/react';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { finaleLetter, getPhotosBySection } from '@/data/birthday-content';

interface FinaleProps {
  onRestart: () => void;
}

export default function Finale({ onRestart }: FinaleProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const finalePhoto = getPhotosBySection('finale')[0];

  // GSAP line-by-line reveal on scroll
  useEffect(() => {
    let ctx: ReturnType<typeof import('gsap')['default']['context']> | undefined;

    const initGsap = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      ctx = gsap.context(() => {
        const lines = sectionRef.current!.querySelectorAll('.letter-line');
        lines.forEach((line, i) => {
          gsap.fromTo(
            line,
            { opacity: 0, y: 25 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: line,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            },
          );
        });
      }, sectionRef);
    };

    initGsap();
    return () => { ctx?.revert(); };
  }, []);

  return (
    <section
      id="finale"
      ref={sectionRef}
      className="relative min-h-screen section-dark py-24 md:py-32 overflow-hidden"
    >
      {/* Subtle background image */}
      {finalePhoto && (
        <div className="absolute inset-0 z-0 opacity-[0.06]">
          <Image
            src={`/photos/${finalePhoto.src}`}
            alt={finalePhoto.alt}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      )}

      <div className="relative z-10 max-w-2xl mx-auto px-6">
        {/* Chapter label */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-serif text-sm tracking-[0.4em] uppercase text-gold/50">
            The Letter
          </span>
          <div className="mt-4 mx-auto w-8 h-px bg-gold/30" />
        </motion.div>

        {/* Letter content */}
        <div className="space-y-8">
          {/* Salutation */}
          <p className="letter-line font-serif text-2xl md:text-3xl text-ivory/90 italic">
            {finaleLetter.salutation}
          </p>

          {/* Paragraphs */}
          {finaleLetter.paragraphs.map((para, i) => (
            <p
              key={i}
              className="letter-line font-sans text-base md:text-lg text-ivory/65 leading-[2]"
            >
              {para}
            </p>
          ))}

          {/* Closing line */}
          <div className="letter-line pt-8">
            <div className="w-12 h-px bg-gold/30 mb-8" />
            <p className="font-serif text-lg text-ivory/80 italic">
              {finaleLetter.closing}
            </p>
          </div>

          {/* Signature */}
          <p className="letter-line font-serif text-2xl text-gold/70 italic mt-4">
            {finaleLetter.signature}
          </p>

          {/* P.S. */}
          <p className="letter-line font-sans text-sm text-ivory/30 italic mt-8">
            {finaleLetter.ps}
          </p>
        </div>

        {/* Final CTAs */}
        <motion.div
          className="mt-24 flex flex-col sm:flex-row items-center justify-center gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button
            onClick={onRestart}
            className="group relative font-serif text-base italic text-gold/60 hover:text-gold transition-colors duration-500 cursor-pointer"
          >
            <span className="relative">
              Read it again
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-500" />
            </span>
          </button>

          <span className="text-ivory/10">·</span>

          <button
            onClick={() => {
              const el = document.getElementById('easter-eggs');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative font-serif text-base italic text-gold/60 hover:text-gold transition-colors duration-500 cursor-pointer"
          >
            <span className="relative">
              Open the hidden notes
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-500" />
            </span>
          </button>
        </motion.div>

        {/* Final decorative mark */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <span className="font-serif text-gold/20 text-2xl">∞</span>
        </motion.div>
      </div>
    </section>
  );
}
