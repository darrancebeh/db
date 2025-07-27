"use client";
import React from 'react';
import { motion } from 'framer-motion';

interface GlassmorphismButtonProps {
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  children: React.ReactNode;
  className?: string;
  borderColor?: string;
}

const GlassmorphismButton: React.FC<GlassmorphismButtonProps> = ({
  onClick,
  onMouseEnter,
  onMouseLeave,
  children,
  className = "",
  borderColor = "#93c5fd",
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Default behavior: scroll to next section
      const nextSection = document.querySelector('[data-section="tech-stack"]') || document.querySelector('section:nth-child(2)');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.button
      className={`
        relative inline-flex items-center justify-center
        px-10 py-5 text-lg font-semibold
        text-white
        rounded-2xl
        backdrop-blur-xl
        border-2
        transition-all duration-400 ease-out
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent
        overflow-hidden
        group
        ${className}
      `}
      style={{
        background: 'rgba(255, 255, 255, 0.08)',
        borderColor: borderColor,
        boxShadow: `0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
      }}
      whileHover={{
        scale: 1.08,
        y: -6,
        rotateX: 8,
        boxShadow: `0 20px 40px rgba(0, 0, 0, 0.2), 0 0 30px ${borderColor}40, inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
      }}
      whileTap={{
        scale: 1.02,
        y: -2,
      }}
      transition={{
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      }}
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{
          background: `linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.1) 100%)`,
        }}
      />
      
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        initial={{ x: '-100%' }}
        whileHover={{
          x: '100%',
          transition: {
            duration: 1.2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 2,
          }
        }}
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
          width: '50%',
          height: '100%',
          transform: 'skewX(-20deg)',
        }}
      />
      
      {/* Button content */}
      <span className="relative z-10 font-medium tracking-wide">
        {children}
      </span>
      
      {/* Border glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{
          background: 'transparent',
          border: `2px solid ${borderColor}`,
          filter: `drop-shadow(0 0 20px ${borderColor}60)`,
        }}
      />
    </motion.button>
  );
};

export default GlassmorphismButton;
