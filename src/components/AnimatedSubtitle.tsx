"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTypewriter } from '../hooks/useTypewriter';
import { titleArray, getColorForTitle } from '../utils/colorTransitions';

interface AnimatedSubtitleProps {
  onColorChange?: (colors: { particle: string; text: string; border: string }) => void;
  className?: string;
}

const AnimatedSubtitle: React.FC<AnimatedSubtitleProps> = ({ 
  onColorChange, 
  className = "" 
}) => {
  const { displayText, currentWordIndex } = useTypewriter({
    words: titleArray,
    typeSpeed: 80,
    deleteSpeed: 40,
    delayBetweenWords: 2500,
    loop: true,
  });

  const [showCursor, setShowCursor] = useState(true);
  const currentTitle = titleArray[currentWordIndex];
  const colors = getColorForTitle(currentTitle);

  // Notify parent of color changes
  useEffect(() => {
    if (onColorChange) {
      onColorChange({
        particle: colors.particle,
        text: colors.text,
        border: colors.border,
      });
    }
  }, [currentWordIndex, onColorChange, colors]);

  // Cursor blinking animation
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <motion.h2
        className="text-xl md:text-2xl lg:text-3xl font-medium font-[family-name:var(--font-geist-mono)] relative"
        style={{ color: colors.text }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={`${currentWordIndex}-${displayText.length}`}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.8 }}
            transition={{ duration: 0.1 }}
          >
            {displayText}
          </motion.span>
        </AnimatePresence>
        
        {/* Animated cursor */}
        <motion.span
          className="inline-block w-0.5 h-7 md:h-8 lg:h-9 ml-1 bg-current"
          animate={{
            opacity: showCursor ? 1 : 0,
          }}
          transition={{
            duration: 0.1,
            ease: "easeInOut",
          }}
          style={{
            transform: 'translateY(1px)',
          }}
        />
      </motion.h2>
      
      {/* Subtle glow effect */}
      <motion.div
        className="absolute inset-0 -z-10 blur-xl opacity-20"
        style={{
          background: `radial-gradient(ellipse at center, ${colors.text}, transparent 70%)`,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default AnimatedSubtitle;
