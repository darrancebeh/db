// src/components/SignalCrystal/SignalCrystal.tsx

"use client";
import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import CrystalGeometry from './CrystalGeometry';
import SimpleDataMoteSystem from './SimpleDataMoteSystem';
import { useMarketData } from '@/hooks/useMarketData';
import { mapMarketDataToVisualParams } from '@/utils/visualDataMapping';
import { CrystalVisualParams } from '@/types/marketData';

interface SignalCrystalProps {
  mousePosition: { x: number; y: number };
  className?: string;
}

const defaultVisualParams: CrystalVisualParams = {
  coreColor: '#aabbee',
  moteColor: '#aabbee',
  coreIntensity: 0.3, // Dimmer default intensity
  pulseFrequency: 0.5, // Slower default pulse
  agitation: 0.0,
  moteCount: 1500, // This will now only be used if the API fails
  flowIntensity: 1.0,
};

// Scene component that contains the crystal and lighting
function CrystalScene({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  // --- MODIFICATION ---
  // Re-introduce `isLoading` to manage the loading state.
  const { marketData, isLoading } = useMarketData();
  const visualParams = mapMarketDataToVisualParams(marketData);

  // The crystal will always be visible, using default params while loading.
  const crystalParams = visualParams || defaultVisualParams;
  
  return (
    <>
      <ambientLight intensity={0.2} color={0x404060} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color={0xffffff} />
      <directionalLight position={[-5, -5, 5]} intensity={0.3} color={0x6666ff} />

      <Environment preset="night" />

      {/* The CrystalGeometry is always rendered, using defaults during load */}
      <CrystalGeometry 
        mousePosition={mousePosition}
        visualParams={crystalParams}
      />
      
      {/* --- MODIFICATION ---
          Conditionally render the mote system. It will only be mounted to the scene
          AFTER isLoading is false AND we have valid visualParams. This prevents
          the "bombardment" effect on load.
      */}
      {!isLoading && visualParams && (
        <SimpleDataMoteSystem {...visualParams} />
      )}
    </>
  );
}

// No changes to the main SignalCrystal component structure
const SignalCrystal: React.FC<SignalCrystalProps> = ({ 
  mousePosition, 
  className = "" 
}) => {
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      if (!canvas.getContext('webgl') && !canvas.getContext('experimental-webgl')) {
        setIsWebGLSupported(false);
      }
    } catch {
      setIsWebGLSupported(false);
    }
  }, []);

  if (!isWebGLSupported) {
    return (
      <div 
        className={`flex items-center justify-center text-center ${className}`}
        style={{ 
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle, rgba(102, 170, 255, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          border: '1px solid rgba(102, 170, 255, 0.2)',
        }}
      >
        <div>
          <div className="text-4xl mb-2">💎</div>
          <div className="text-sm text-blue-300">Signal Crystal</div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`${className} w-full h-full`}
      style={{ 
        aspectRatio: '1/1',
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ fov: 45, position: [0, 0, 7.5] }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <CrystalScene mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
};

export default SignalCrystal;