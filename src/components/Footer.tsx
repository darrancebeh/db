"use client"; // Ensure this is a client component if using hooks/event handlers

import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';
import { Dispatch, SetStateAction } from 'react';

// Define the possible cursor variants type (should match the one in page.tsx)
type CursorVariant = 'default' | 'interactive' | 'lightArea';

// Define props for the Footer component
interface FooterProps {
  setCursorVariant: Dispatch<SetStateAction<CursorVariant>>;
}

const Footer: React.FC<FooterProps> = ({ setCursorVariant }) => {
  const currentYear = new Date().getFullYear();

  // Define handlers using setCursorVariant
  const handleMouseEnterInteractive = () => setCursorVariant('interactive');
  const handleMouseLeaveDefault = () => setCursorVariant('default');

  return (
    <motion.footer
      className="w-full py-8 px-4 sm:px-8 bg-opacity-50 text-gray-400 text-sm font-[family-name:var(--font-geist-mono)] border-t border-gray-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      // Apply default cursor logic to the whole footer section
      onMouseEnter={handleMouseLeaveDefault} // Use default within the footer background
      onMouseLeave={handleMouseLeaveDefault} // Reset to default when leaving footer
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
        {/* Social Links */}
        <div className="flex gap-5">
          <motion.a
            href="https://github.com/darrancebeh"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="transition-colors duration-300 hover:text-gray-200"
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={handleMouseEnterInteractive}
            onMouseLeave={handleMouseLeaveDefault} // Revert to default when leaving icon
          >
            <FiGithub className="w-5 h-5" />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/darrancebeh"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="transition-colors duration-300 hover:text-gray-200"
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={handleMouseEnterInteractive}
            onMouseLeave={handleMouseLeaveDefault}
          >
            <FiLinkedin className="w-5 h-5" />
          </motion.a>
          <motion.a
            href="https://x.com/quant_in_my"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X Profile"
            className="transition-colors duration-300 hover:text-gray-200"
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={handleMouseEnterInteractive}
            onMouseLeave={handleMouseLeaveDefault}
          >
            <FiTwitter className="w-5 h-5" />
          </motion.a>
          <motion.a
            href="mailto:darrancebeh@gmail.com"
            aria-label="Send Email"
            className="transition-colors duration-300 hover:text-gray-200"
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={handleMouseEnterInteractive}
            onMouseLeave={handleMouseLeaveDefault}
          >
            <FiMail className="w-5 h-5" />
          </motion.a>
        </div>

        {/* Copyright */}
        <div className="text-center sm:text-right">
          <p>&copy; {currentYear} Darrance Beh Heng Shek. All Rights Reserved.</p>
          <p className="text-xs text-gray-500 mt-1">
            Built with Next.js, React, TypeScript, and Tailwind CSS.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
