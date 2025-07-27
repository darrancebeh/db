// src/components/EventHorizon/AccretionDisk.tsx

"use client";
import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { HorizonVisualParams } from '@/types/marketData'; // Import the new type

// --- MODIFIED: The vertex shader is unchanged ---
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// --- MODIFIED: The fragment shader now has new uniforms ---
const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;         // NEW: For the disk's base color
  uniform float uVelocity;      // NEW: For animation speed
  uniform float uTurbulence;    // NEW: For noise intensity

  varying vec2 vUv;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.y * u.x;
  }

  void main() {
    // Velocity now controls the overall speed of the animation
    float time = uTime * uVelocity * 0.2;
    
    float d = distance(vUv, vec2(0.5));
    float mask = smoothstep(0.5, 0.48, d) * smoothstep(0.25, 0.27, d);

    // Turbulence now controls the intensity of the noise effect
    float turbulence = noise(vUv * 5.0 - time) * uTurbulence;
    turbulence += noise(vUv * 10.0 + time) * 0.5 * uTurbulence;

    float angle = atan(vUv.y - 0.5, vUv.x - 0.5);
    float streaks = sin(angle * 15.0 - time * 3.0) * 0.1 + 0.9;
    
    float finalNoise = turbulence * streaks;
    
    // The base color is now controlled by the uColor uniform
    vec3 color = uColor * finalNoise;
    float alpha = finalNoise * mask;

    gl_FragColor = vec4(color, alpha);
  }
`;

// --- MODIFIED: The component now accepts props ---
interface AccretionDiskProps {
  visualParams: HorizonVisualParams;
}

const AccretionDisk: React.FC<AccretionDiskProps> = ({ visualParams }) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  // --- NEW: Memoize the color object for efficient updates ---
  const diskColorObject = useMemo(() => new THREE.Color(), []);

  useFrame(({ clock }, delta) => {
    if (meshRef.current) {
      // The disk's orbital rotation speed is now driven by the velocity prop
      meshRef.current.rotation.z += delta * visualParams.diskVelocity * 0.1;
    }

    if (materialRef.current) {
      // Update all uniforms on every frame with the latest prop values
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
      materialRef.current.uniforms.uColor.value.set(diskColorObject.set(visualParams.diskColor));
      materialRef.current.uniforms.uVelocity.value = visualParams.diskVelocity;
      materialRef.current.uniforms.uTurbulence.value = visualParams.diskTurbulence;
    }
  });
  
  // Memoize the shader arguments to avoid re-creation
  const shaderArgs = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      // Initialize the new uniforms
      uColor: { value: new THREE.Color(visualParams.diskColor) },
      uVelocity: { value: visualParams.diskVelocity },
      uTurbulence: { value: visualParams.diskTurbulence },
    },
    vertexShader,
    fragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), [visualParams.diskColor, visualParams.diskVelocity, visualParams.diskTurbulence]); // Re-create if initial values change

  return (
    <mesh ref={meshRef} rotation-x={-Math.PI / 2.2}>
      <ringGeometry args={[1.5, 3.5, 128]} />
      <shaderMaterial ref={materialRef} args={[shaderArgs]} />
    </mesh>
  );
};

export default AccretionDisk;