// src/components/EventHorizon/PhotonRing.tsx

"use client";
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PhotonRing: React.FC = () => {
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);

  // --- NEW: Animation Hook ---
  // We use useFrame to create the flickering effect.
  useFrame(({ clock }) => {
    if (materialRef.current) {
      // A high-frequency sine wave oscillates the opacity.
      // Math.sin(...) returns a value between -1 and 1.
      // We map this to a small opacity range (e.g., 0.8 to 1.0)
      const flicker = Math.sin(clock.getElapsedTime() * 10) * 0.1 + 0.9;
      materialRef.current.opacity = flicker;
    }
  });

  // --- NEW: Memoize the final material to avoid re-creation ---
  const ringMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    // A very bright, slightly blue-tinted white for an energetic look
    color: new THREE.Color(0xddeeff), 
    side: THREE.DoubleSide,
    // AdditiveBlending is crucial for the glow effect. The bright pixels
    // will add their color to the pixels behind them.
    blending: THREE.AdditiveBlending,
    // We need transparency to be able to modulate the opacity for the flicker.
    transparent: true,
    // Start with a base opacity
    opacity: 0.9,
  }), []);

  return (
    <mesh rotation-x={-Math.PI / 2.2}>
      <torusGeometry args={[1.01, 0.0075, 64, 128]} />
      {/* Use the new, memoized material */}
      <primitive object={ringMaterial} ref={materialRef} />
    </mesh>
  );
};

export default PhotonRing;