"use client";
import "./LandingPage.css";
import React from "react";
import { motion } from "framer-motion";
import NetworkBackground from "./NetworkBackground";
import { FiDownload, FiLinkedin, FiGithub, FiTwitter, FiMail } from "react-icons/fi";
import { Dispatch, SetStateAction } from 'react';
import GlassmorphismButton from "./GlassmorphismButton";
import AnimatedSubtitle from "./AnimatedSubtitle";

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

  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)] text-center overflow-hidden bg-gradient-animate"
      onMouseEnter={handleMouseEnterInteractive}
      onMouseLeave={handleMouseLeaveDefault}
    >
      <NetworkBackground />

      {/* Main Content - Container for staggered animation */}
      <motion.main
        className="flex flex-col items-center gap-4 z-10 relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Alias - Item */}
        <motion.span
          className="text-8xl font-extrabold tracking-tighter text-gray-500 font-[family-name:var(--font-geist-mono)] mb-2 transition-colors duration-300"
          variants={itemVariants}
          whileHover={{
            color: "#e5e7eb",
            scale: 1.05,
            textShadow: "0 0 8px rgba(229, 231, 235, 0.3)",
          }}
          transition={{ duration: 0.2 }}
          onMouseEnter={handleMouseEnterInteractive}
          onMouseLeave={handleMouseEnterInteractive}
        >
          db
        </motion.span>

        {/* Name - Item */}
        <motion.h1
          className="text-6xl font-medium tracking-tight text-gray-100 transition-colors duration-300"
          variants={itemVariants}
          whileHover={{
            color: "#ffffff",
            scale: 1.03,
          }}
          transition={{ duration: 0.2 }}
          onMouseEnter={handleMouseEnterInteractive}
          onMouseLeave={handleMouseEnterInteractive}
        >
          Darrance Beh Heng Shek
        </motion.h1>

        {/* Subtitle - Item */}
        <motion.div
          className="mt-4 w-full flex justify-center"
          variants={itemVariants}
        >
          <AnimatedSubtitle className="text-2xl md:text-4xl lg:text-5xl font-medium font-[family-name:var(--font-geist-mono)] transition-colors duration-300 tracking-wide md:tracking-wider lg:tracking-widest px-2 md:px-6 lg:px-12" />
        </motion.div>

        {/* Location - Item */}
        <motion.p
          className="mt-2 text-lg text-gray-600 font-[family-name:var(--font-geist-mono)] transition-colors duration-300"
          variants={itemVariants}
          whileHover={{ color: "#9ca3af" }}
          transition={{ duration: 0.2 }}
          onMouseEnter={handleMouseEnterInteractive}
          onMouseLeave={handleMouseEnterInteractive}
        >
          Based in Kuala Lumpur, Malaysia 🇲🇾
        </motion.p>

        {/* Glassmorphism Button - Centered above buttons container */}
        <motion.div
          className="flex flex-col items-center justify-center w-full mt-6 mb-2"
          variants={itemVariants}
        >
          <GlassmorphismButton
            onMouseEnter={handleMouseEnterInteractive}
            onMouseLeave={handleMouseEnterInteractive}
            className="mx-auto"
            onClick={() => {
              // Try both 'projects' and 'portfolio-section' for scroll target
              let el = document.getElementById('projects');
              if (!el) {
                el = document.querySelector('.portfolio-section');
              }
              if (el) {
                // If projects is on another page, redirect
                if (el instanceof HTMLAnchorElement && el.href) {
                  window.location.href = el.href;
                } else {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              } else {
                // Fallback: try window.location.hash
                window.location.hash = '#projects';
              }
            }}
          >
            Explore Tech Stack
          </GlassmorphismButton>
        </motion.div>

        {/* Buttons Container - Item */}
        <motion.div
          className="flex gap-4 mt-10 items-center"
          variants={itemVariants}
        >
          {/* Resume/CV Button (Borderless with Animated Underline) */}
          <motion.a
            href="/files/Resume_DarranceBehHengShek_Mar2025.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="relative group inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-gray-300 rounded-md shadow-sm transition-colors duration-300 hover:text-gray-100"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={handleMouseEnterInteractive}
            onMouseLeave={handleMouseEnterInteractive}
          >
            <FiDownload className="w-4 h-4" />
            <span>Resume/CV</span>
            {/* Animated Underline Span */}
            <motion.span
              className="absolute bottom-0 left-0 right-0 h-px bg-gray-100 origin-center transform scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
            />
          </motion.a>

          {/* LinkedIn Button (Kept Bordered Design) */}
          <motion.a
            href="https://linkedin.com/in/darrancebeh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-gray-300 border border-gray-600 rounded-md shadow-sm transition-colors duration-300 hover:border-gray-400 hover:text-gray-100 hover:bg-gray-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={handleMouseEnterInteractive}
            onMouseLeave={handleMouseEnterInteractive}
          >
            <FiLinkedin className="w-4 h-4" />
            LinkedIn
          </motion.a>
        </motion.div>
      </motion.main>

      {/* Footer (Has its own animation) */}
      <footer className="absolute bottom-8 left-0 right-0 w-full z-10 px-4">
        {/* Social Icons - Hidden on mobile (default), shown from sm breakpoint up */}
        <motion.div
          className="hidden sm:flex justify-center gap-6 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.a
            href="https://github.com/darrancebeh"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="text-gray-500 transition-colors duration-300 hover:text-gray-300"
            whileHover={{ scale: 1.2, y: -2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.15 }}
            onMouseEnter={handleMouseEnterInteractive}
            onMouseLeave={handleMouseEnterInteractive}
          >
            <FiGithub className="w-6 h-6" />
          </motion.a>
          <motion.a
            href="https://x.com/quant_in_my"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X Profile"
            className="text-gray-500 transition-colors duration-300 hover:text-gray-300"
            whileHover={{ scale: 1.2, y: -2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.15 }}
            onMouseEnter={handleMouseEnterInteractive}
            onMouseLeave={handleMouseEnterInteractive}
          >
            <FiTwitter className="w-6 h-6" />
          </motion.a>
          <motion.a
            href="mailto:darrancebeh@gmail.com"
            aria-label="Send Email"
            className="text-gray-500 transition-colors duration-300 hover:text-gray-300"
            whileHover={{ scale: 1.2, y: -2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.15 }}
            onMouseEnter={handleMouseEnterInteractive}
            onMouseLeave={handleMouseEnterInteractive}
          >
            <FiMail className="w-6 h-6" />
          </motion.a>
        </motion.div>

        {/* Info Text */}
        <motion.div
          className="text-center text-xs text-gray-600 space-y-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          <p>Background Design Emulates Astral Constellations | Best Viewed on Desktop</p>
        </motion.div>
      </footer>
    </section>
  );
}