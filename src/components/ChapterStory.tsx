'use client';

import { motion } from 'motion/react';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { storyPanels } from '@/data/birthday-content';

export default function ChapterStory() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamically import GSAP to avoid SSR issues
    let ctx: ReturnType<typeof import('gsap')['default']['context']> | undefined;

    const initGsap = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (!containerRef.current) return;

      ctx = gsap.context(() => {
        // Animate each story panel
        const panels = containerRef.current!.querySelectorAll('.story-panel');
        panels.forEach((panel, i) => {
          const img = panel.querySelector('.story-image');
          const text = panel.querySelector('.story-text');

          // Image parallax
          if (img) {
            gsap.fromTo(
              img,
              { y: 60, opacity: 0, scale: 1.1 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1.2,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: panel,
                  start: 'top 80%',
                  end: 'top 20%',
                  toggleActions: 'play none none reverse',
                },
              },
            );
          }

          // Text slide
          if (text) {
            gsap.fromTo(
              text,
              { y: 40, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 1.0,
                delay: 0.3,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: panel,
                  start: 'top 75%',
                  end: 'top 20%',
                  toggleActions: 'play none none reverse',
                },
              },
            );
          }
        });
      }, containerRef);
    };

    initGsap();

    return () => {
      ctx?.revert();
    };
  }, []);

  const revealStyles = [
    'ink-bloom',
    'slide-up',
    'wipe-left',
    'fade',
  ] as const;

  return (
    <section id="story" className="relative section-ivory">
      {/* Chapter header */}
      <div className="py-24 md:py-32 text-center px-6">
        <motion.span
          className="font-serif text-sm tracking-[0.4em] uppercase text-gold/60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Chapter II
        </motion.span>
        <motion.h2
          className="mt-6 font-serif text-4xl md:text-5xl lg:text-6xl text-ink font-light"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.2 }}
        >
          The Story of Us
        </motion.h2>
        <motion.div
          className="mt-6 mx-auto"
          initial={{ width: 0 }}
          whileInView={{ width: 64 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.4 }}
        >
          <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        </motion.div>
      </div>

      {/* Story panels */}
      <div ref={containerRef} className="pb-24">
        {storyPanels.map((panel, panelIdx) => (
          <div
            key={panel.id}
            className="story-panel relative py-16 md:py-24"
          >
            {/* Alternating layout */}
            <div
              className={`max-w-6xl mx-auto px-6 flex flex-col ${
                panelIdx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } gap-12 md:gap-16 items-center`}
            >
              {/* Images */}
              <div className="story-image w-full md:w-1/2 relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                  {panel.photos[0] && (
                    <Image
                      src={`/photos/${panel.photos[0]}`}
                      alt={panel.heading}
                      fill
                      className="object-cover photo-warm"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/10 to-transparent" />
                </div>

                {/* Secondary image peek */}
                {panel.photos[1] && (
                  <motion.div
                    className={`hidden md:block absolute -bottom-8 ${
                      panelIdx % 2 === 0 ? '-right-8' : '-left-8'
                    } w-32 h-40 rounded-sm overflow-hidden shadow-xl`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    <Image
                      src={`/photos/${panel.photos[1]}`}
                      alt=""
                      fill
                      className="object-cover photo-warm"
                      sizes="128px"
                    />
                  </motion.div>
                )}
              </div>

              {/* Text */}
              <div className="story-text w-full md:w-1/2 max-w-lg">
                <span className="font-serif text-xs tracking-[0.3em] uppercase text-gold/50 block mb-4">
                  {panel.subchapter === 'motion' && '↗ In Motion'}
                  {panel.subchapter === 'quiet-light' && '◌ In Quiet Light'}
                  {panel.subchapter === 'everyday' && '∎ In the Everyday'}
                  {panel.subchapter === 'people' && '♡ In Our People'}
                </span>

                <h3 className="font-serif text-3xl md:text-4xl text-ink font-light mb-6">
                  {panel.heading}
                </h3>

                <p className="font-sans text-base md:text-lg text-charcoal/70 leading-[1.9]">
                  {panel.body}
                </p>

                {/* Decorative line */}
                <div className="mt-8 w-12 h-px bg-gold/30" />
              </div>
            </div>

            {/* Panel divider */}
            {panelIdx < storyPanels.length - 1 && (
              <div className="max-w-xs mx-auto mt-20">
                <div className="h-px bg-gradient-to-r from-transparent via-sepia/30 to-transparent" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
