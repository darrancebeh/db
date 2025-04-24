"use client";
import React from "react";
import { motion } from "framer-motion";
import NetworkBackground from "./NetworkBackground";
import { FiDownload, FiLinkedin, FiGithub, FiTwitter, FiMail } from "react-icons/fi";

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
  onMouseEnterInteractive: () => void;
  onMouseLeaveInteractive: () => void;
}

export default function LandingPage({ onMouseEnterInteractive, onMouseLeaveInteractive }: LandingPageProps) {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)] text-center overflow-hidden bg-gradient-animate">
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
          onMouseEnter={onMouseEnterInteractive}
          onMouseLeave={onMouseLeaveInteractive}
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
          onMouseEnter={onMouseEnterInteractive}
          onMouseLeave={onMouseLeaveInteractive}
        >
          Darrance Beh Heng Shek
        </motion.h1>

        {/* Subtitle - Item */}
        <motion.p
          className="mt-4 text-xl text-gray-400 font-[family-name:var(--font-geist-mono)] transition-colors duration-300"
          variants={itemVariants}
          whileHover={{ color: "#b0b0b0" }}
          transition={{ duration: 0.2 }}
        >
          AI & Machine Learning | Big Data & Data Science | Cybersecurity
        </motion.p>

        {/* Location - Item */}
        <motion.p
          className="mt-2 text-lg text-gray-600 font-[family-name:var(--font-geist-mono)] transition-colors duration-300"
          variants={itemVariants}
           whileHover={{ color: "#9ca3af" }}
           transition={{ duration: 0.2 }}
        >
          Based in Kuala Lumpur, Malaysia 🇲🇾
        </motion.p>

        {/* Buttons Container - Item */}
        <motion.div
          className="flex gap-4 mt-10 items-center"
          variants={itemVariants}
        >
          {/* Resume/CV Button (Borderless with Animated Underline) */}
          <motion.a
            href="/placeholder-resume.pdf"
            download
            // Added relative and group classes
            className="relative group inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-gray-300 rounded-md shadow-sm transition-colors duration-300 hover:text-gray-100"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={onMouseEnterInteractive}
            onMouseLeave={onMouseLeaveInteractive}
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
            // Kept border and hover background
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-gray-300 border border-gray-600 rounded-md shadow-sm transition-colors duration-300 hover:border-gray-400 hover:text-gray-100 hover:bg-gray-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={onMouseEnterInteractive}
            onMouseLeave={onMouseLeaveInteractive}
          >
            <FiLinkedin className="w-4 h-4" />
            LinkedIn
          </motion.a>
        </motion.div>
      </motion.main>

      {/* Footer (Has its own animation) */}
      <footer className="absolute bottom-8 left-0 right-0 w-full z-10 px-4">
        {/* Social Icons */}
        <motion.div
          className="flex justify-center gap-6 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }} // Delayed fade-in
        >
          {/* ... social icons ... */}
           <motion.a
            href="https://github.com/darrancebeh"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="text-gray-500 transition-colors duration-300 hover:text-gray-300"
            whileHover={{ scale: 1.2, y: -2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.15 }}
            onMouseEnter={onMouseEnterInteractive}
            onMouseLeave={onMouseLeaveInteractive}
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
            onMouseEnter={onMouseEnterInteractive}
            onMouseLeave={onMouseLeaveInteractive}
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
            onMouseEnter={onMouseEnterInteractive}
            onMouseLeave={onMouseLeaveInteractive}
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