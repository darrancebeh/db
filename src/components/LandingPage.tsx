// LandingPage.tsx

"use client";
import "./LandingPage.css";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSubtitle from './AnimatedSubtitle';
import GlassmorphismButton from './GlassmorphismButton';
import EventHorizon from './EventHorizon/EventHorizon';
import { Dispatch, SetStateAction } from 'react';

type CursorVariant = 'default' | 'interactive' | 'lightArea';

// ... (containerVariants and itemVariants remain the same)
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };

interface LandingPageProps {
  setCursorVariant: Dispatch<SetStateAction<CursorVariant>>;
}

export default function LandingPage({ setCursorVariant }: LandingPageProps) {
  const handleMouseEnterInteractive = () => setCursorVariant('interactive');
  const handleMouseLeaveDefault = () => setCursorVariant('default');

  // This state now drives the entire page's theme
  const [currentColors, setCurrentColors] = useState({
    particle: '#60a5fa', // This will be our star color
    text: '#60a5fa',
    border: '#93c5fd'
  });

  const handleColorChange = (colors: { particle: string; text: string; border: string }) => {
    setCurrentColors(colors);
  };
  
  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)] text-center"
      style={{ backgroundColor: '#020203' }}
      onMouseEnter={handleMouseLeaveDefault}
      onMouseLeave={handleMouseLeaveDefault}
    >
      {/* --- MODIFICATION --- */}
      {/* Pass the dynamic color down to the EventHorizon component */}
      <EventHorizon starColor={currentColors.particle} />
      
      <motion.main
        className="flex flex-col items-center gap-8 z-10 relative max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white transition-colors duration-300 hero-content"
          variants={itemVariants}
        >
          Darrance Beh Heng Shek
        </motion.h1>

        <motion.div variants={itemVariants}>
          {/* The subtitle component now acts as the "driver" of the color theme */}
          <AnimatedSubtitle 
            onColorChange={handleColorChange}
            className="hero-content"
          />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-8"
        >
          <GlassmorphismButton
            onMouseEnter={handleMouseEnterInteractive}
            onMouseLeave={handleMouseLeaveDefault}
            borderColor={currentColors.border}
          >
            View My Work
          </GlassmorphismButton>
        </motion.div>
      </motion.main>
    </section>
  );
}