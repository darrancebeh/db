"use client";
import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import CrystalGeometry from './CrystalGeometry';

interface SignalCrystalProps {
  mousePosition: { x: number; y: number };
  className?: string;
}

// Scene component that contains the crystal and lighting
function CrystalScene({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  return (
    <>
      {/* Enhanced lighting setup */}
      <ambientLight intensity={0.2} color={0x404060} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={0.8} 
        color={0xffffff}
        castShadow
      />
      <directionalLight 
        position={[-5, -5, -5]} 
        intensity={0.3} 
        color={0x6666ff}
      />

      {/* HDR environment for realistic reflections */}
      <Environment preset="night" />

      {/* The crystal itself */}
      <CrystalGeometry 
        mousePosition={mousePosition}
        coreIntensity={1.0}
      />

      {/* Optional: Orbit controls for development (can be removed later) */}
      {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
    </>
  );
}

const SignalCrystal: React.FC<SignalCrystalProps> = ({ 
  mousePosition, 
  className = "" 
}) => {
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);

  // Check WebGL support
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!context) {
        setIsWebGLSupported(false);
      }
    } catch {
      setIsWebGLSupported(false);
    }
  }, []);

  // Fallback for non-WebGL environments
  if (!isWebGLSupported) {
    return (
      <div 
        className={`flex items-center justify-center ${className}`}
        style={{ 
          width: '100%',
          height: '100%',
          maxWidth: '300px',
          maxHeight: '300px',
          background: 'radial-gradient(circle, rgba(102, 170, 255, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          border: '1px solid rgba(102, 170, 255, 0.2)',
          aspectRatio: '1/1',
        }}
      >
        <div className="text-blue-300 text-center">
          <div className="text-4xl mb-2">💎</div>
          <div className="text-sm">Signal Crystal</div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`${className} w-full h-full max-w-[350px] max-h-[350px] min-w-[250px] min-h-[250px]`}
      style={{ 
        aspectRatio: '1/1',
        pointerEvents: 'none', // Maintain existing page interactions
      }}
    >
      <Canvas
        camera={{ 
          fov: 45, 
          position: [0, 0, 3.8],
          near: 0.1,
          far: 100
        }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          alpha: true,
          preserveDrawingBuffer: true,
          powerPreference: "high-performance"
        }}
        style={{ 
          background: 'transparent',
          width: '100%',
          height: '100%'
        }}
      >
        <CrystalScene mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
};

export default SignalCrystal;
