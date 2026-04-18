'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState, useCallback } from 'react';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  /** Reveal word-by-word instead of character-by-character */
  byWord?: boolean;
  /** Stagger between each unit in seconds */
  stagger?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export default function TextReveal({
  text,
  className = '',
  delay = 0,
  byWord = true,
  stagger = 0.08,
  as: Tag = 'p',
}: TextRevealProps) {
  const units = byWord ? text.split(' ') : text.split('');

  return (
    <Tag className={className} aria-label={text}>
      {units.map((unit, i) => (
        <motion.span
          key={`${unit}-${i}`}
          initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 0.6,
            delay: delay + i * stagger,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          viewport={{ once: true, margin: '-10%' }}
          className="inline-block"
        >
          {unit}
          {byWord && i < units.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </Tag>
  );
}

/* ── Typewriter-style text reveal ── */
interface TypewriterProps {
  lines: string[];
  className?: string;
  speed?: number; // ms per character
  lineDelay?: number; // ms between lines
  startDelay?: number;
}

export function TypewriterText({
  lines,
  className = '',
  speed = 50,
  lineDelay = 800,
  startDelay = 0,
}: TypewriterProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [started, setStarted] = useState(false);
  const [displayLines, setDisplayLines] = useState<string[]>([]);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!started || currentLine >= lines.length) return;

    if (currentChar < lines[currentLine].length) {
      const t = setTimeout(() => {
        setDisplayLines((prev) => {
          const updated = [...prev];
          updated[currentLine] = lines[currentLine].slice(0, currentChar + 1);
          return updated;
        });
        setCurrentChar((c) => c + 1);
      }, speed);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
        setDisplayLines((prev) => [...prev, '']);
      }, lineDelay);
      return () => clearTimeout(t);
    }
  }, [started, currentLine, currentChar, lines, speed, lineDelay]);

  return (
    <div className={className} role="presentation">
      {displayLines.map((line, i) => (
        <p key={i} className="font-serif text-lg md:text-xl leading-relaxed min-h-[1.75rem]">
          {line}
          {i === currentLine && currentLine < lines.length && (
            <span className="cursor-blink" />
          )}
        </p>
      ))}
    </div>
  );
}

/* ── Line-by-line scroll reveal ── */
interface LineRevealProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
}

export function LineByLineReveal({ lines, className = '', lineClassName = '' }: LineRevealProps) {
  return (
    <div className={className}>
      {lines.map((line, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: i * 0.15,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          viewport={{ once: true, margin: '-5%' }}
          className={lineClassName}
        >
          {line}
        </motion.p>
      ))}
    </div>
  );
}
