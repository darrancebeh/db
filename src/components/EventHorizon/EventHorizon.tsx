// src/components/EventHorizon/EventHorizon.tsx

"use client";
import React from 'react';
import { Canvas } from '@react-three/fiber';
import Singularity from './Singularity';
import DynamicStars from './DynamicStars';
import AccretionDisk from './AccretionDisk';
import PhotonRing from './PhotonRing';
import { useMarketData } from '@/hooks/useMarketData';
import { mapMarketDataToHorizonParams } from '@/utils/visualDataMapping';
import { HorizonVisualParams } from '@/types/marketData';

interface EventHorizonProps {
  starColor: string;
}

// Restore the real default params object for loading/error states
const defaultHorizonParams: HorizonVisualParams = {
  diskColor: '#ffffff',
  diskVelocity: 0.75,
  diskTurbulence: 0.2,
  lensingStrength: 0.0,
};

function Scene({ starColor }: EventHorizonProps) {
  // Restore the live data fetching and mapping logic
  const { marketData } = useMarketData();
  const visualParams = mapMarketDataToHorizonParams(marketData);
  const currentParams = visualParams || defaultHorizonParams;
  
  return (
    <>
      <DynamicStars color={starColor} />
      <Singularity />
      <PhotonRing />
      {/* The AccretionDisk now receives the live (or default) visualParams */}
      {currentParams && (
        <AccretionDisk visualParams={currentParams} />
      )}
    </>
  );
}

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