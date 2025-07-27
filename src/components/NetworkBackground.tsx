"use client";
import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

// Accept a color prop for dynamic particle color
interface NetworkBackgroundProps {
  particleColor?: string;
}

const NetworkBackground: React.FC<NetworkBackgroundProps> = ({ particleColor = "#9ca3af" }) => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async () => {}, []);

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
          mode: ["bubble", "connect", "slow"],
        },
        resize: true,
      },
      modes: {
        bubble: {
          distance: 250,
          size: 8.5,
          duration: 3,
          opacity: 0.8,
          color: particleColor,
        },

        connect: {
          distance: 100,
          links: {
            opacity: 0.6,
          },
          radius: 150,
        },

        slow: {
          factor: 2,
          radius: 200,
        },
      },
    },
    particles: {
      color: {
        value: particleColor,
      },
      links: {
        color: particleColor,
        distance: 150,
        enable: true,
        opacity: 0.1,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: true,
        speed: 0.7,
        straight: false,

        trail: {
          enable: false,
          fill: { color: "#1f2937" },
          length: 10,
        },
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80,
      },
      opacity: {
        value: { min: 0.1, max: 0.5 },
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      options={options as any}
      className="absolute top-0 left-0 w-full h-full z-0"
    />
  );
};

export default NetworkBackground;