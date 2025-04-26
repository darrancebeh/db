"use client";
import React, { useState, useEffect, useRef } from "react";
import LandingPage from "../components/LandingPage";
import TechStack from "../components/TechStack";
import AboutMe from "../components/AboutMe";
import ProjectPortfolio from "../components/ProjectPortfolio";

// Define the possible cursor variants
type CursorVariant = 'default' | 'interactive' | 'lightArea';

export default function Home() {
  // --- Lifted Cursor Logic ---
  const cursorRef = useRef<HTMLDivElement>(null);
  // State for cursor visibility
  const [isCursorVisible, setIsCursorVisible] = useState(true); // State for visibility
  // State for cursor appearance variant
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        requestAnimationFrame(() => {
          if (cursorRef.current) {
             cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
          }
        });
      }
    };

    const handleMouseEnterBody = () => {
      setIsCursorVisible(true); // Set state to true
    };

    const handleMouseLeaveBody = () => {
       setIsCursorVisible(false); // Set state to false
       setCursorVariant('default'); // Reset variant when leaving window
    };

    // Initial position off-screen
    if (cursorRef.current) {
      cursorRef.current.style.transform = 'translate3d(-100px, -100px, 0)';
    }

    // Add listeners
    window.addEventListener("mousemove", moveCursor);
    document.body.addEventListener("mouseenter", handleMouseEnterBody);
    document.body.addEventListener("mouseleave", handleMouseLeaveBody);

    // Cleanup listeners
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.body.removeEventListener("mouseenter", handleMouseEnterBody);
      document.body.removeEventListener("mouseleave", handleMouseLeaveBody);
    };
  }, []);

  // --- End Lifted Cursor Logic ---

  // Determine styles based on variant
  const getCursorStyles = () => {
    let styles = {
      width: '14px',
      height: '14px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      boxShadow: '0 0 15px 5px rgba(255, 255, 255, 0.5)',
    };

    switch (cursorVariant) {
      case 'interactive':
        styles = {
          ...styles,
          width: '18px',
          height: '18px',
          backgroundColor: 'rgba(255, 255, 255, 1)',
          boxShadow: '0 0 20px 7px rgba(255, 255, 255, 0.6)',
        };
        break;
      case 'lightArea':
        styles = {
          ...styles,
          width: '18px',
          height: '18px',
          backgroundColor: 'rgba(55, 65, 81, 0.8)', // Dark gray, semi-transparent (Tailwind gray-600)
          boxShadow: '0 0 15px 5px rgba(55, 65, 81, 0.4)',
        };
        break;
    }
    return styles;
  };


  return (
    <main className="relative">
      {/* --- Lifted Cursor Element --- */}
      <div
        ref={cursorRef}
        className={`
          pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-[9999]
          rounded-full
          transition-[width,height,box-shadow,opacity,background-color] duration-300 ease-out
          hidden md:block
        `}
        style={{
          opacity: isCursorVisible ? 1 : 0, // Control opacity via state
          ...getCursorStyles(),
        }}
      />
      {/* --- End Lifted Cursor Element --- */}

      {/* Pass setCursorVariant down to children */}
      <LandingPage
        setCursorVariant={setCursorVariant}
      />
      <TechStack
        setCursorVariant={setCursorVariant}
      />
      <AboutMe
        setCursorVariant={setCursorVariant}
      />
      <ProjectPortfolio
        setCursorVariant={setCursorVariant}
      />
    </main>
  );
}