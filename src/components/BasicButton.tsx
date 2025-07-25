"use client";
import React from 'react';
import { motion } from 'framer-motion';

interface BasicButtonProps {
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  children: React.ReactNode;
  className?: string;
}

const BasicButton: React.FC<BasicButtonProps> = ({
  onClick,
  onMouseEnter,
  onMouseLeave,
  children,
  className = "",
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
        px-8 py-4 text-lg font-medium
        text-white bg-blue-600/20 
        border border-blue-500/30 rounded-lg
        backdrop-blur-sm
        transition-all duration-300 ease-out
        hover:bg-blue-600/30 hover:border-blue-400/50
        focus:outline-none focus:ring-2 focus:ring-blue-400/50
        ${className}
      `}
      whileHover={{
        scale: 1.05,
        y: -2,
        boxShadow: "0 10px 25px rgba(59, 130, 246, 0.15)",
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.button>
  );
};

export default BasicButton;
