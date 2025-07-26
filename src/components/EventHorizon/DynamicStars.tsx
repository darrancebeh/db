// src/components/EventHorizon/DynamicStars.tsx

"use client";
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  attribute float size;
  varying float vSize;
  void main() {
    vSize = size;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  varying float vSize;
  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    
    float brightness = smoothstep(0.0, 1.5, vSize);
    vec3 finalColor = uColor * brightness;
    float alpha = 1.0 - smoothstep(0.4, 0.5, dist);
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

interface DynamicStarsProps {
  color: string;
}

const DynamicStars: React.FC<DynamicStarsProps> = ({ color }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const starCount = 5000;

  // --- CORRECTION ---
  // The 'vertices' variable has been correctly renamed to 'positions'.
  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(starCount * 3); // Initialized here
    const sizes = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 100;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      // All instances now correctly refer to 'positions'
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      sizes[i] = Math.random() * 1.5;
    }
    return { positions, sizes };
  }, []);

  const colorObject = useMemo(() => new THREE.Color(), []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02;
    }
    if (materialRef.current) {
      materialRef.current.uniforms.uColor.value.set(color);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uColor: { value: colorObject.set(color) },
        }}
        transparent={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export default DynamicStars;