"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  SiFigma,
  SiPytorch,
  SiScikitlearn,
  SiPandas,
  SiHuggingface,
  SiDjango,
  SiPostgresql,
  SiTypescript,
  SiSolidity,
  SiRust,
} from "react-icons/si";
import { FaReact, FaGitAlt } from "react-icons/fa";

type CursorVariant = 'default' | 'interactive' | 'lightArea';

// This interface was duplicated, using the one with the correct props.
interface TechStackProps {
  setCursorVariant: (variant: CursorVariant) => void;
  onMouseEnterInteractive?: () => void;
  onMouseLeaveInteractive?: () => void;
}

// Define animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

// Curated tech stack data
const techStackData = [
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "Solidity", Icon: SiSolidity, color: "#363636" },
  { name: "React", Icon: FaReact, color: "#61DAFB" },
  {name: "Rust", Icon: SiRust, color: "#F74C00"},
  { name: "PyTorch", Icon: SiPytorch, color: "#EE4C2C" },
  { name: "Pandas", Icon: SiPandas, color: "#5A5B9F" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
  { name: "scikit-learn", Icon: SiScikitlearn, color: "#F7931E" },
  { name: "HuggingFace", Icon: SiHuggingface, color: "#FFD21E" },
  { name: "Django", Icon: SiDjango, color: "#44B78B" },
  { name: "Git", Icon: FaGitAlt, color: "#F05032" },
  { name: "Figma", Icon: SiFigma, color: "#A259FF" },
];

export default function TechStack({ onMouseEnterInteractive, onMouseLeaveInteractive }: TechStackProps) {
  return (
    // --- CORRECTION 2: Removed `overflow-hidden` ---
    <section className="relative flex flex-col items-center justify-center px-4 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24 bg-gradient-animate">
      <motion.div
        className="absolute top-[20%] left-[20%] w-40 h-40 bg-blue-500/20 rounded-full filter blur-xl"
        animate={{ x: [-25, 25, -25], y: [-15, 15, -15], rotate: [0, 180, 360] }}
        transition={{ duration: 25, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
      />
      <motion.div
        className="absolute bottom-[20%] right-[20%] w-48 h-48 bg-purple-500/20 rounded-xl filter blur-2xl"
        animate={{ x: [35, -35, 35], y: [20, -20, 20], rotate: [0, -180, -360] }}
        transition={{ duration: 30, ease: "easeInOut", repeat: Infinity, repeatType: "loop", delay: 5 }}
      />
       <motion.div
        className="absolute top-[30%] right-[15%] w-32 h-32 bg-pink-500/15 rounded-full filter blur-lg"
        animate={{ scale: [1, 1.3, 1], opacity: [0.9, 0.6, 0.9] }}
        transition={{ duration: 20, ease: "easeInOut", repeat: Infinity, repeatType: "loop", delay: 2 }}
      />

      <motion.h2
        className="relative z-10 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 mb-10 sm:mb-14 lg:mb-18 text-center"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }} // This is fine for a single element
        viewport={{ once: true }}
        transition={{ duration: 0.6, type: "spring", stiffness: 50 }}
      >
        My Tech Stack
      </motion.h2>

      {/* --- CORRECTION 1: Corrected Framer Motion props --- */}
      <motion.div
        className="relative z-10 flex flex-wrap justify-center items-center gap-4 sm:gap-6 w-full max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible" // Use the variant name string, not an object
        viewport={{ once: true, amount: 0.2 }} // amount ensures animation triggers when 20% is visible
      >
        {techStackData.map((tech) => {
          const hoverState = {
            y: -8,
            scale: 1.05,
            boxShadow: `0 20px 30px -10px rgba(0,0,0,0.3)`,
            borderColor: tech.color || 'rgba(255, 255, 255, 0.4)',
          };

          return (
            <motion.div
              key={tech.name}
              className="flex flex-col items-center justify-center p-4 sm:p-5 rounded-xl shadow-lg aspect-square w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36
                         bg-black/20 backdrop-blur-sm 
                         border border-white/20 
                         transition-colors duration-300"
              variants={itemVariants}
              whileHover={hoverState}
              onMouseEnter={onMouseEnterInteractive}
              onMouseLeave={onMouseLeaveInteractive}
            >
              <tech.Icon
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 lg:w-14 mb-2 sm:mb-3"
                style={{ color: tech.color || "#9ca3af" }}
              />
              <h3 className="text-sm sm:text-base font-semibold text-gray-200 text-center">
                {tech.name}
              </h3>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}