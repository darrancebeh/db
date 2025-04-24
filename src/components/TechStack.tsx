"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  SiFigma,
  SiTensorflow,
  SiPytorch,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiHuggingface,
  SiTableau,
  SiExpress,
  SiDjango,
  SiTailwindcss,
  SiPostgresql,
} from "react-icons/si";
// Add FaNodeJs back
import { FaReact, FaNodeJs, FaGitAlt, FaPython } from "react-icons/fa";
import { VscSymbolMisc } from "react-icons/vsc";
import { TbMathFunction } from "react-icons/tb";
import { BiLineChart } from "react-icons/bi";


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


// Updated and reordered tech stack data (18 items)
const techStackData = [
  // AI / ML / Data Science
  { name: "TensorFlow", description: "AI/ML Framework", Icon: SiTensorflow, color: "#FF6F00" },
  { name: "PyTorch", description: "AI/ML Framework", Icon: SiPytorch, color: "#EE4C2C" },
  { name: "scikit-learn", description: "ML Algorithm Library", Icon: SiScikitlearn, color: "#F7931E" },
  { name: "HuggingFace", description: "NLP Library", Icon: SiHuggingface, color: "#FFD21E" }, // Updated description
  { name: "NLTK", description: "Natural Language Processing", Icon: FaPython, color: "#3776AB" }, // Re-added NLTK
  { name: "Pandas", description: "Data Manipulation & Analysis", Icon: SiPandas, color: "#5A5B9F" }, // Lighter color
  { name: "NumPy", description: "Data Cleaning & Aggregation", Icon: SiNumpy, color: "#4D77CF" }, // Lighter color
  { name: "Tableau", description: "Data Visualization", Icon: SiTableau, color: "#E97627" },
  { name: "Matplotlib", description: "Data Visualization", Icon: BiLineChart, color: "#11557c" },
  { name: "QuantLib", description: "Quant Library", Icon: TbMathFunction, color: "#888888" },

  // Backend
  { name: "Django", description: "Backend Development", Icon: SiDjango, color: "#44B78B" }, // Lighter color
  { name: "Node.js", description: "Developer Environment", Icon: FaNodeJs, color: "#339933" }, // Re-added Node.js
  { name: "Express.js", description: "Backend Development", Icon: SiExpress, color: "#FFFFFF" },

  // Frontend
  { name: "React", description: "Frontend Development", Icon: FaReact, color: "#61DAFB" },
  { name: "Tailwind", description: "CSS Framework", Icon: SiTailwindcss, color: "#06B6D4" },

  // Database
  { name: "PostgreSQL", description: "Relational Database", Icon: SiPostgresql, color: "#4169E1" },

  // Tools
  { name: "Git", description: "Version Control", Icon: FaGitAlt, color: "#F05032" },

  // Design
  { name: "Figma", description: "Design Tool", Icon: SiFigma, color: "#A259FF" },
];

// Props interface (if needed for handlers)
interface TechStackProps {
  onMouseEnterInteractive?: () => void;
  onMouseLeaveInteractive?: () => void;
}

export default function TechStack({ onMouseEnterInteractive, onMouseLeaveInteractive }: TechStackProps) {
  return (
    // **** ADDED relative and overflow-hidden ****
    <section className="relative flex flex-col items-center justify-center px-4 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24 bg-gradient-animate overflow-hidden">

      {/* **** UPDATED Background Decorative Shapes (More Obvious) **** */}
      <motion.div
        // Increased size, opacity, reduced blur
        className="absolute top-[20%] left-[20%] w-40 h-40 bg-blue-500/20 rounded-full filter blur-xl" // Opacity /20, blur-xl
        animate={{
          x: [-25, 25, -25], // Slightly larger movement
          y: [-15, 15, -15],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 25,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}
      />
      <motion.div
        // Increased size, opacity, reduced blur
        className="absolute bottom-[20%] right-[20%] w-48 h-48 bg-purple-500/20 rounded-xl filter blur-2xl" // Opacity /20, blur-2xl
        animate={{
          x: [35, -35, 35], // Slightly larger movement
          y: [20, -20, 20],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 30,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
          delay: 5,
        }}
      />
       <motion.div
        // Increased size, opacity, reduced blur
        className="absolute top-[30%] right-[15%] w-32 h-32 bg-pink-500/15 rounded-full filter blur-lg" // Opacity /15, blur-lg
        animate={{
          scale: [1, 1.3, 1], // Slightly larger scale change
          opacity: [0.9, 0.6, 0.9], // Higher opacity range
        }}
        transition={{
          duration: 20,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
          delay: 2,
        }}
      />
      {/* **** End Background Shapes **** */}


      {/* Title ( **** ADDED relative z-10 **** ) */}
      <motion.h2
        className="relative z-10 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 mb-10 sm:mb-14 lg:mb-18 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 50 }}
      >
        My Tech Stack
      </motion.h2>

      {/* Grid ( **** ADDED relative z-10 **** ) */}
      <motion.div
        className="relative z-10 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 sm:gap-6 w-full max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {techStackData.map((tech) => {
          // Define the hover state dynamically
          const hoverState = {
            y: -5,
            scale: 1.03,
            boxShadow: `0 10px 20px rgba(0,0,0,0.3), 0 0 25px ${tech.color || 'rgba(156, 163, 175, 0.3)'}aa`,
          };

          return (
            <motion.div
              key={tech.name}
              // Adjusted padding for responsiveness
              className="flex flex-col items-center justify-center p-4 sm:p-5 bg-gray-900/60 backdrop-blur-md border border-gray-700/50 rounded-xl shadow-lg aspect-square transition-colors duration-200 hover:bg-gray-800/70"
              variants={itemVariants}
              whileHover={hoverState}
              onMouseEnter={onMouseEnterInteractive}
              onMouseLeave={onMouseLeaveInteractive}
            >
              {/* Adjusted icon size for responsiveness */}
              <tech.Icon
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 lg:w-14 mb-2 sm:mb-3"
                style={{ color: tech.color || "#9ca3af" }}
              />
              {/* Adjusted text size for responsiveness */}
              <h3 className="text-xs sm:text-base md:text-lg font-semibold text-gray-100 text-center mb-1 sm:mb-1.5">
                {tech.name}
              </h3>
              <p className="text-[10px] sm:text-xs md:text-sm text-gray-400 text-center leading-tight">
                {tech.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}