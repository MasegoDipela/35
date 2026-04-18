'use client';

import { useState, useCallback } from 'react';
import Prelude from '@/components/Prelude';
import Hero from '@/components/Hero';
import ChapterWriter from '@/components/ChapterWriter';
import ChapterStory from '@/components/ChapterStory';
import ChapterEasterEggs from '@/components/ChapterEasterEggs';
import ChapterBirthday from '@/components/ChapterBirthday';
import Finale from '@/components/Finale';
import Navigation from '@/components/Navigation';
import ScrollProgress from '@/components/ScrollProgress';

export default function Home() {
  const [preludeComplete, setPreludeComplete] = useState(false);

  const handlePreludeComplete = useCallback(() => {
    setPreludeComplete(true);
  }, []);

  const handleEnter = useCallback(() => {
    const writer = document.getElementById('writer');
    writer?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleRestart = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      {/* Loading / Prelude */}
      {!preludeComplete && <Prelude onComplete={handlePreludeComplete} />}

      {/* Scroll progress indicator */}
      <ScrollProgress />

      {/* Chapter navigation */}
      <Navigation />

      {/* Main content */}
      <main>
        {/* Hero */}
        <Hero onEnter={handleEnter} />

        {/* Chapter I — Her as a Writer */}
        <ChapterWriter />

        {/* Chapter II — The Story of Us */}
        <ChapterStory />

        {/* Chapter III — Hidden Easter Eggs */}
        <ChapterEasterEggs />

        {/* Chapter IV — The Birthday Moment */}
        <ChapterBirthday />

        {/* Finale — The Letter */}
        <Finale onRestart={handleRestart} />
      </main>

      {/* Hidden HTML comment easter egg */}
      {/* "The woman who reads this is the same woman who makes language feel like home." */}
    </>
  );
}
