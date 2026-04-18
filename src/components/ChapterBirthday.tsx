'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { birthdayCopy, getPhotosBySection } from '@/data/birthday-content';
import TextReveal from './TextReveal';
import GoldenParticles from './GoldenParticles';

export default function ChapterBirthday() {
  const birthdayPhoto = getPhotosBySection('birthday')[0];

  return (
    <section
      id="birthday"
      className="relative min-h-screen flex items-center justify-center section-ivory py-24 md:py-32 overflow-hidden"
    >
      {/* Golden particles */}
      <GoldenParticles count={35} />

      {/* Background photo treatment */}
      {birthdayPhoto && (
        <div className="absolute inset-0 z-0">
          <Image
            src={`/photos/${birthdayPhoto.src}`}
            alt={birthdayPhoto.alt}
            fill
            className="object-cover photo-warm opacity-10"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ivory via-ivory/90 to-ivory" />
        </div>
      )}

      {/* Vignette */}
      <div className="absolute inset-0 vignette z-[1]" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        {/* Chapter label */}
        <motion.span
          className="font-serif text-sm tracking-[0.4em] uppercase text-gold/60 block mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {birthdayCopy.preHeading}
        </motion.span>

        {/* Large "35" */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <span className="font-serif text-[8rem] md:text-[12rem] lg:text-[16rem] font-light leading-none text-gold/20 select-none">
            35
          </span>
        </motion.div>

        {/* Main heading */}
        <TextReveal
          text={birthdayCopy.heading}
          as="h2"
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-light text-ink leading-tight"
          delay={0.3}
          stagger={0.12}
        />

        {/* Sublines */}
        <div className="mt-10 space-y-4">
          {birthdayCopy.sublines.map((line, i) => (
            <motion.p
              key={i}
              className="font-serif text-lg md:text-xl text-charcoal/60 italic"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 + i * 0.2 }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Line */}
        <motion.div
          className="mt-12 mx-auto"
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 1.4 }}
        >
          <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        </motion.div>

        {/* Birthday message card */}
        <motion.div
          className="mt-16 mx-auto max-w-xl p-8 md:p-12 bg-warm-white/80 backdrop-blur-sm border border-gold/10 rounded-sm"
          initial={{ opacity: 0, y: 40, rotateX: 5 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            delay: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <p className="font-serif text-base md:text-lg text-charcoal/80 leading-[1.9] italic">
            {birthdayCopy.message}
          </p>
          <div className="mt-8 w-8 h-px bg-gold/40 mx-auto" />
        </motion.div>
      </div>
    </section>
  );
}
