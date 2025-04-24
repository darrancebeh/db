// filepath: src/app/page.tsx
"use client";
import React, { useState, useEffect, useRef } from "react"; // Add useEffect, useRef
import LandingPage from "../components/LandingPage";
import TechStack from "../components/TechStack";
// Import motion if you want the cursor div to have animations (optional)
// import { motion } from "framer-motion";

export default function Home() {
  // --- Lifted Cursor Logic ---
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      // Ensure cursorRef.current exists before accessing style
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    // Add listener
    window.addEventListener("mousemove", moveCursor);

    // Initial position off-screen (optional, helps prevent flash at 0,0)
    if (cursorRef.current) {
      cursorRef.current.style.transform = 'translate3d(-100px, -100px, 0)';
    }

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleMouseEnter = () => setIsHoveringInteractive(true);
  const handleMouseLeave = () => setIsHoveringInteractive(false);
  // --- End Lifted Cursor Logic ---


  // Simple scrolling single page application
  return (
    <main className="relative"> {/* Ensure main is relative if cursor is absolute */}
      {/* --- Lifted Cursor Element --- */}
      <div
        ref={cursorRef}
        className={`
          pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-50
          rounded-full
          bg-gray-200/30 shadow-[0_0_25px_8px_rgba(229,231,235,0.25)]
          transition-[width,height,box-shadow] duration-300 ease-out
          hidden md:block /* Optionally hide on smaller screens */
        `}
        style={{
          width: isHoveringInteractive ? '16px' : '12px',
          height: isHoveringInteractive ? '16px' : '12px',
        }}
      />
      {/* --- End Lifted Cursor Element --- */}

      {/* Pass handlers down to children that need them */}
      <LandingPage
        onMouseEnterInteractive={handleMouseEnter}
        onMouseLeaveInteractive={handleMouseLeave}
      />
      <TechStack
        // Pass handlers if TechStack has elements that should affect the cursor
        // onMouseEnterInteractive={handleMouseEnter}
        // onMouseLeaveInteractive={handleMouseLeave}
      />
      {/* <ContactMe
        onMouseEnterInteractive={handleMouseEnter}
        onMouseLeaveInteractive={handleMouseLeave}
      /> */}
      {/* ... other sections ... */}
    </main>
  );

  /* Alternative: For more complex navigation between sections
  // ... (conditional rendering logic - cursor logic would still be here) ...
  */
}