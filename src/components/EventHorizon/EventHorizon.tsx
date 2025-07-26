// src/components/EventHorizon/EventHorizon.tsx

"use client";
import React from 'react';
import { Canvas } from '@react-three/fiber';
import Singularity from './Singularity';
import AccretionDisk from './AccretionDisk';
import DynamicStars from './DynamicStars'; // Import our new component

interface EventHorizonProps {
  starColor: string;
}

function Scene({ starColor }: EventHorizonProps) {
  return (
    <>
      <DynamicStars color={starColor} />
      <Singularity />
      <AccretionDisk />
    </>
  );
}

const EventHorizon: React.FC<EventHorizonProps> = ({ starColor }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full z-10">
      <Canvas
        camera={{ fov: 75, position: [0, 0, 5] }}
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