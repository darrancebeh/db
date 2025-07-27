// src/components/EventHorizon/EventHorizon.tsx

"use client";
import React from 'react';
import { Canvas } from '@react-three/fiber';
import Singularity from './Singularity';
import DynamicStars from './DynamicStars';
import AccretionDisk from './AccretionDisk';
import { useMarketData } from '@/hooks/useMarketData'; // Import the data hook
import { mapMarketDataToHorizonParams } from '@/utils/visualDataMapping'; // Import the mapping utility
import { HorizonVisualParams } from '@/types/marketData'; // Import the params type

interface EventHorizonProps {
  starColor: string;
}

// --- NEW: Default parameters for the loading/error state ---
// This ensures the scene looks good even before live data arrives.
const defaultHorizonParams: HorizonVisualParams = {
  diskColor: '#ffffff', // Default to a neutral white
  diskVelocity: 0.75,   // A calm, slow default speed
  diskTurbulence: 0.2,  // A low, gentle default turbulence
  lensingStrength: 0.0,
};

function Scene({ starColor }: EventHorizonProps) {
  // --- NEW: Data fetching and mapping logic ---
  const { marketData, isLoading } = useMarketData();
  const visualParams = mapMarketDataToHorizonParams(marketData);

  // Use the live, calculated params if they exist, otherwise use the defaults.
  const currentParams = visualParams || defaultHorizonParams;
  
  return (
    <>
      <DynamicStars color={starColor} />
      <Singularity />
      
      {/* --- MODIFICATION --- */}
      {/* 
        Pass the final `currentParams` object to the AccretionDisk.
        We wrap it in a check to ensure it doesn't render on the very first frame
        before defaults are ready, preventing any potential flashes.
      */}
      {currentParams && (
        <AccretionDisk visualParams={currentParams} />
      )}
    </>
  );
}

// The main component remains unchanged
const EventHorizon: React.FC<EventHorizonProps> = ({ starColor }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full z-10">
      <Canvas
        camera={{ fov: 75, position: [0, 4, 5] }}
        dpr={[1, 2]}
        style={{ background: '#020203' }}
      >
        <ambientLight intensity={0.1} />
        <Scene starColor={starColor} />
      </Canvas>
    </div>
  );
};

export default EventHorizon;