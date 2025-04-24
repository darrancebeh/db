"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import NetworkBackground from "./NetworkBackground";
// Import icons
import { FiDownload, FiLinkedin, FiGithub, FiX, FiMail } from "react-icons/fi";

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

export default function LandingPage() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };
    window.addEventListener("mousemove", moveCursor);
    if (cursorRef.current) {
        cursorRef.current.style.transform = 'translate3d(-100px, -100px, 0)';
    }
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  const handleMouseEnter = () => setIsHoveringInteractive(true);
  const handleMouseLeave = () => setIsHoveringInteractive(false);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)] text-center overflow-hidden bg-gradient-animate">
      <NetworkBackground />
      <div
        ref={cursorRef}
        className={`
          pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-50
          rounded-full
          bg-gray-200/30 shadow-[0_0_25px_8px_rgba(229,231,235,0.25)]
          transition-[width,height,box-shadow] duration-300 ease-out
        `}
        style={{
          width: isHoveringInteractive ? '16px' : '12px',
          height: isHoveringInteractive ? '16px' : '12px',
        }}
      />

      {/* Main Content */}
      <motion.main
        className="flex flex-col items-center gap-4 z-10 relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Alias */}
         <motion.span
          className="text-8xl font-extrabold tracking-tighter text-gray-500 font-[family-name:var(--font-geist-mono)] mb-2 transition-colors duration-300"
          variants={itemVariants}
          whileHover={{
            color: "#e5e7eb",
            scale: 1.05,
            textShadow: "0 0 8px rgba(229, 231, 235, 0.3)",
          }}
          transition={{ duration: 0.2 }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          db
        </motion.span>
        
        {/* Name */}
        <motion.h1
          className="text-6xl font-medium tracking-tight text-gray-100 transition-colors duration-300"
          variants={itemVariants}
           whileHover={{
            color: "#ffffff",
            scale: 1.03,
          }}
          transition={{ duration: 0.2 }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Darrance Beh Heng Shek
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p
          className="mt-4 text-xl text-gray-400 font-[family-name:var(--font-geist-mono)] transition-colors duration-300"
          variants={itemVariants}
          whileHover={{
            color: "#b0b0b0",
          }}
          transition={{ duration: 0.2 }}
        >
          AI & Machine Learning | Big Data & Data Science | Cybersecurity
        </motion.p>
        
        {/* Location */}
        <motion.p
          className="mt-2 text-lg text-gray-600 font-[family-name:var(--font-geist-mono)] transition-colors duration-300"
          variants={itemVariants}
           whileHover={{
            color: "#9ca3af",
          }}
          transition={{ duration: 0.2 }}
        >
          Based in Kuala Lumpur, Malaysia 🇲🇾
        </motion.p>

        {/* Buttons with Icons */}
        <motion.div className="flex gap-4 mt-10" variants={itemVariants}>
          {/* Resume/CV Button */}
          <motion.a
            href="/placeholder-resume.pdf"
            download
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-gray-300 border border-gray-600 rounded-md shadow-sm transition-colors duration-300 hover:border-gray-400 hover:text-gray-100"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <FiDownload className="w-4 h-4" />
            Resume/CV
          </motion.a>
          
          {/* LinkedIn Button */}
          <motion.a
            href="https://linkedin.com/in/darrance"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-gray-300 border border-gray-600 rounded-md shadow-sm transition-colors duration-300 hover:border-gray-400 hover:text-gray-100"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <FiLinkedin className="w-4 h-4" />
            LinkedIn
          </motion.a>
        </motion.div>
      </motion.main>

      {/* Footer for Social Media Icons and Info Text */}
      <footer className="absolute bottom-8 left-0 right-0 w-full z-10 px-4">
        {/* Social Icons */}
        <motion.div
          // Increase margin-bottom (e.g., from mb-4 to mb-6 or mb-8)
          className="flex justify-center gap-6 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {/* ... existing social icons ... */}
          <motion.a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="text-gray-500 transition-colors duration-300 hover:text-gray-300"
            whileHover={{ scale: 1.2, y: -2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.15 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <FiGithub className="w-6 h-6" />
          </motion.a>
          <motion.a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X Profile"
            className="text-gray-500 transition-colors duration-300 hover:text-gray-300"
            whileHover={{ scale: 1.2, y: -2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.15 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <FiX className="w-6 h-6" />
          </motion.a>
          <motion.a
            href="mailto:youremail@example.com"
            aria-label="Send Email"
            className="text-gray-500 transition-colors duration-300 hover:text-gray-300"
            whileHover={{ scale: 1.2, y: -2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.15 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
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
    </div>
  );
}