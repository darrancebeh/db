"use client";
import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import type { Container, Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim"; // Using slim bundle

const NetworkBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {},
    []
  );

  const options = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          // Apply multiple modes on hover
          mode: ["bubble", "connect", "slow"],
        },
        resize: true,
      },
      modes: {
        bubble: {
          distance: 250, // Area of effect for bubble
          size: 8.5, // Size particles expand to
          duration: 3, // Duration of the bubble effect
          opacity: 0.8, // Opacity during bubble
          color: "#ffffff", // Color during bubble
        },

        // Connect effect configuration (draws lines between particles in hover area)
        connect: {
          distance: 100, // Max distance between particles to connect
          links: {
            opacity: 0.6, // Opacity of the connection lines
          },
          radius: 150, // Area of effect for connection
        },

        // Slow effect configuration (particles slow down in hover area)
        slow: {
          factor: 2, // Slowdown factor (higher means slower)
          radius: 200, // Area of effect for slowdown
        },
      },
    },
    particles: {
      color: {
        value: "#9ca3af", // Base particle color
      },
      links: {
        color: "#6b7280", // Default link color
        distance: 150,
        enable: true, // Enable default links between particles
        opacity: 0.1, // Make default links very subtle
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce", // Keep particles on screen
        },
        random: true,
        speed: 0.7, // Speed of particles
        straight: false,
        
        // Add trail effect to moving particles
        trail: {
          enable: false,
          fill: { color: "#1f2937" }, // Trail color (dark gray)
          length: 10, // Length of the trail
        },
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80, // Total particle count
      },
      opacity: {
        value: { min: 0.1, max: 0.5 }, // Opacity variation
        animation: {
          enable: true,
          speed: 0.8,
          minimumValue: 0.1,
          sync: false,
        },
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 4 },
        animation: {
          enable: true,
          speed: 3,
          minimumValue: 1,
          sync: false,
        },
      },
    },
    detectRetina: true,
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={options as any}
      className="absolute top-0 left-0 w-full h-full z-0" // Ensure it's behind content
    />
  );
};

export default NetworkBackground;