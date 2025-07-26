// src/components/EventHorizon/AccretionDisk.tsx

"use client";
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// GLSL code for our custom shader
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;

  // 2D Random function
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  // 2D Noise function
  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.y * u.x;
  }

  void main() {
    vec2 uv = vUv;
    float time = uTime * 0.1;

    // Create a circular mask to make the disk shape
    float d = distance(uv, vec2(0.5));
    float mask = smoothstep(0.5, 0.48, d); // Inner edge
    mask *= smoothstep(0.2, 0.5, d);      // Outer edge

    // Create turbulent noise for the gas effect
    float turbulence = noise(uv * 5.0 - time * 0.5);
    turbulence += noise(uv * 10.0 + time * 0.2) * 0.5;

    // Create radial lines/streaks
    float angle = atan(uv.y - 0.5, uv.x - 0.5);
    float streaks = sin(angle * 20.0 + time * 2.0) * 0.1 + 0.9;
    
    // Combine effects
    float finalNoise = turbulence * streaks;
    
    // Final color and alpha
    vec3 color = vec3(0.8, 0.9, 1.0) * finalNoise; // Cool blue/white glow
    float alpha = finalNoise * mask;

    gl_FragColor = vec4(color, alpha);
  }
`;

const AccretionDisk: React.FC = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // useFrame hook to update the uTime uniform for animation
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
    },
    vertexShader,
    fragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false, // Important for correct blending
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      {/* A flat ring for the disk geometry */}
      <ringGeometry args={[1.5, 3.5, 64]} />
      <primitive object={shaderMaterial} ref={materialRef} />
    </mesh>
  );
};

export default AccretionDisk;