"use client";
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SimpleDataMoteSystemProps {
  flowIntensity?: number;
  crystalPosition?: THREE.Vector3;
}

const SimpleDataMoteSystem: React.FC<SimpleDataMoteSystemProps> = ({
  flowIntensity = 1.0,
  crystalPosition = new THREE.Vector3(0, 0, 0)
}) => {
  const motesRef = useRef<THREE.Points>(null);
  const moteCount = 80;

  // Create initial positions and properties
  const { positions, colors, sizes, velocities } = useMemo(() => {
    const positions = new Float32Array(moteCount * 3);
    const colors = new Float32Array(moteCount * 3);
    const sizes = new Float32Array(moteCount);
    const velocities = new Float32Array(moteCount * 3);
    
    for (let i = 0; i < moteCount; i++) {
      // Random spawn position around crystal
      const angle = (i / moteCount) * Math.PI * 2 + Math.random() * 0.5;
      const radius = 5 + Math.random() * 2;
      const height = (Math.random() - 0.5) * 3;
      
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
      
      // Blue to white color
      colors[i * 3] = 0.3 + Math.random() * 0.4;     // R
      colors[i * 3 + 1] = 0.6 + Math.random() * 0.4; // G
      colors[i * 3 + 2] = 1.0;                       // B
      
      sizes[i] = 0.02 + Math.random() * 0.03;
      
      // Velocity towards crystal center
      const direction = new THREE.Vector3(
        crystalPosition.x - positions[i * 3],
        crystalPosition.y - positions[i * 3 + 1],
        crystalPosition.z - positions[i * 3 + 2]
      ).normalize();
      
      velocities[i * 3] = direction.x * (0.5 + Math.random() * 0.3);
      velocities[i * 3 + 1] = direction.y * (0.5 + Math.random() * 0.3);
      velocities[i * 3 + 2] = direction.z * (0.5 + Math.random() * 0.3);
    }
    
    return { positions, colors, sizes, velocities };
  }, [moteCount, crystalPosition]);

  // Animation loop
  useFrame((state, delta) => {
    if (!motesRef.current) return;

    const positionAttribute = motesRef.current.geometry.attributes.position;
    const colorAttribute = motesRef.current.geometry.attributes.color;
    const sizeAttribute = motesRef.current.geometry.attributes.size;
    
    const positions = positionAttribute.array as Float32Array;
    const colors = colorAttribute.array as Float32Array;
    const sizes = sizeAttribute.array as Float32Array;

    for (let i = 0; i < moteCount; i++) {
      const i3 = i * 3;
      
      // Update position
      positions[i3] += velocities[i3] * delta * flowIntensity;
      positions[i3 + 1] += velocities[i3 + 1] * delta * flowIntensity;
      positions[i3 + 2] += velocities[i3 + 2] * delta * flowIntensity;
      
      // Check if reached crystal center
      const distanceToCenter = Math.sqrt(
        positions[i3] * positions[i3] +
        positions[i3 + 1] * positions[i3 + 1] +
        positions[i3 + 2] * positions[i3 + 2]
      );
      
      // Reset mote if too close to center
      if (distanceToCenter < 1.0) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 5 + Math.random() * 2;
        const height = (Math.random() - 0.5) * 3;
        
        positions[i3] = Math.cos(angle) * radius;
        positions[i3 + 1] = height;
        positions[i3 + 2] = Math.sin(angle) * radius;
        
        // Recalculate velocity
        const direction = new THREE.Vector3(
          crystalPosition.x - positions[i3],
          crystalPosition.y - positions[i3 + 1],
          crystalPosition.z - positions[i3 + 2]
        ).normalize();
        
        velocities[i3] = direction.x * (0.5 + Math.random() * 0.3);
        velocities[i3 + 1] = direction.y * (0.5 + Math.random() * 0.3);
        velocities[i3 + 2] = direction.z * (0.5 + Math.random() * 0.3);
      }
      
      // Update color based on distance (closer = brighter)
      const progress = Math.max(0, (7 - distanceToCenter) / 7);
      colors[i3] = 0.2 + progress * 0.8;     // R: blue to white
      colors[i3 + 1] = 0.5 + progress * 0.5; // G: blue to white
      colors[i3 + 2] = 1.0;                   // B: stay blue
      
      // Pulsing size effect
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2 + i * 0.1) * 0.3;
      sizes[i] = (0.03 + Math.random() * 0.02) * pulse * (1 + progress);
    }

    // Mark attributes as needing update
    positionAttribute.needsUpdate = true;
    colorAttribute.needsUpdate = true;
    sizeAttribute.needsUpdate = true;
  });

  return (
    <points ref={motesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors={true}
        transparent={true}
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
        alphaTest={0.001}
      />
    </points>
  );
};

export default SimpleDataMoteSystem;
