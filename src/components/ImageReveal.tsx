'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

interface ImageRevealProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  /** Type of reveal animation */
  reveal?: 'ink-bloom' | 'slide-up' | 'fade' | 'wipe-left';
  priority?: boolean;
}

export default function ImageReveal({
  src,
  alt,
  width = 800,
  height = 600,
  className = '',
  reveal = 'fade',
  priority = false,
}: ImageRevealProps) {
  const variants = {
    'ink-bloom': {
      initial: { clipPath: 'circle(0% at 50% 50%)', opacity: 0 },
      whileInView: { clipPath: 'circle(75% at 50% 50%)', opacity: 1 },
    },
    'slide-up': {
      initial: { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
      whileInView: { clipPath: 'inset(0% 0 0 0)', opacity: 1 },
    },
    fade: {
      initial: { opacity: 0, scale: 1.05 },
      whileInView: { opacity: 1, scale: 1 },
    },
    'wipe-left': {
      initial: { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
      whileInView: { clipPath: 'inset(0 0% 0 0)', opacity: 1 },
    },
  };

  const v = variants[reveal];

  return (
    <motion.div
      initial={v.initial}
      whileInView={v.whileInView}
      transition={{
        duration: 1.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      viewport={{ once: true, margin: '-10%' }}
      className={`overflow-hidden ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="photo-warm object-cover w-full h-full"
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
      />
    </motion.div>
  );
}
