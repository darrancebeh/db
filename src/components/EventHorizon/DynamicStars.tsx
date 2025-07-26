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
    
    // Mix the uniform color with white for some variation
    vec3 color = mix(uColor, vec3(1.0), 0.5);

    gl_FragColor = vec4(color, 1.0 - smoothstep(0.4, 0.5, dist));
  }
`;

interface DynamicStarsProps {
  color: string;
}

const DynamicStars: React.FC<DynamicStarsProps> = ({ color }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const starCount = 5000;

  const positions = useMemo(() => {
    const vertices = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 100;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      vertices[i3] = radius * Math.sin(phi) * Math.cos(theta);
      vertices[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      vertices[i3 + 2] = radius * Math.cos(phi);
    }
    return vertices;
  }, []);

  const sizes = useMemo(() => {
    const sizes = new Float32Array(starCount);
    for (let i = 0; i < starCount; i++) {
      sizes[i] = Math.random() * 1.5;
    }
    return sizes;
  }, []);

  const uniforms = useMemo(() => ({
    uColor: { value: new THREE.Color(color) }
  }), [color]);

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
        uniforms={uniforms}
        transparent={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export default DynamicStars;