// src/components/EventHorizon/Singularity.tsx

"use client";
import React from 'react';

const Singularity: React.FC = () => {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      {/* Restored to its final, light-absorbing black color */}
      <meshBasicMaterial color={0x000000} />
    </mesh>
  );
};

export default Singularity;