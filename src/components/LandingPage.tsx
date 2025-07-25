"use client";
import "./LandingPage.css";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import WebGLBackground from './WebGLBackground';
import AnimatedSubtitle from './AnimatedSubtitle';
import GlassmorphismButton from './GlassmorphismButton';
import SignalCrystal from './SignalCrystal/SignalCrystal';
import { Dispatch, SetStateAction } from 'react';

// Define the possible cursor variants type (can be imported from page.tsx if needed)
type CursorVariant = 'default' | 'interactive' | 'lightArea';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

interface LandingPageProps {
  setCursorVariant: Dispatch<SetStateAction<CursorVariant>>;
  // Keep original props if they were used elsewhere
}

export default function LandingPage({ setCursorVariant }: LandingPageProps) {
  // Define handlers using setCursorVariant
  const handleMouseEnterInteractive = () => setCursorVariant('interactive');
  const handleMouseLeaveDefault = () => setCursorVariant('default');

  // State for color coordination
  const [currentColors, setCurrentColors] = useState({
    particle: '#60a5fa',
    text: '#60a5fa',
    border: '#93c5fd'
  });

  // State for mouse position (for crystal interaction)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleColorChange = (colors: { particle: string; text: string; border: string }) => {
    setCurrentColors(colors);
  };

  // Mouse tracking for crystal interaction
  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    setMousePosition({ x, y });
  };

  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)] text-center overflow-hidden"
      style={{ backgroundColor: '#020203' }}
      onMouseEnter={handleMouseLeaveDefault}
      onMouseLeave={handleMouseLeaveDefault}
      onMouseMove={handleMouseMove}
    >
      {/* WebGL Background with dynamic particle color */}
      <WebGLBackground particleColor={currentColors.particle} />

      {/* Signal Crystal - Centerpiece */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none px-4 py-8"
        style={{ zIndex: 5 }}
      >
        <SignalCrystal 
          mousePosition={mousePosition}
          className="opacity-95"
        />
      </div>

      {/* Main Content - Container for staggered animation */}
      <motion.main
        className="flex flex-col items-center gap-8 z-10 relative max-w-4xl mx-auto"
        style={{ zIndex: 10 }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Name - Main H1 */}
        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white transition-colors duration-300 hero-content"
          variants={itemVariants}
          whileHover={{
            scale: 1.02,
            textShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
          }}
          transition={{ duration: 0.3 }}
        >
          Darrance Beh Heng Shek
        </motion.h1>

        {/* Animated Subtitle */}
        <motion.div variants={itemVariants}>
          <AnimatedSubtitle 
            onColorChange={handleColorChange}
            className="hero-content"
          />
        </motion.div>

        {/* Call to Action Button */}
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