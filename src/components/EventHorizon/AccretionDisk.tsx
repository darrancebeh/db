// src/components/EventHorizon/AccretionDisk.tsx

"use client";
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { HorizonVisualParams } from '@/types/marketData';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// --- CORRECTED FRAGMENT SHADER ---
const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uVelocity;
  uniform float uTurbulence;

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
    float time = uTime * uVelocity * 0.2;

    // The UV-based radial mask logic is correct.
    float radialMask = pow(1.0 - vUv.x, 2.0);

    float baseNoise = noise(vUv * 2.0 - time);
    baseNoise += noise(vUv * 4.0 + time) * 0.5;
    float turbulence = pow(baseNoise, 1.5) * (uTurbulence + 0.5);

    // --- SYNTAX CORRECTION ---
    // The constant for PI must be a float literal in GLSL.
    // The previous JavaScript syntax was invalid.
    float angle = vUv.y * 2.0 * 3.14159265359;
    float streaks = sin(angle * 5.0 - time * 1.5) * 0.05 + 0.95;
    
    float finalNoise = turbulence * streaks;
    float remappedNoise = smoothstep(0.1, 0.8, finalNoise);

    vec3 color = uColor * remappedNoise;
    float alpha = remappedNoise * radialMask;

    gl_FragColor = vec4(color, alpha);
  }
`;

interface AccretionDiskProps {
  visualParams: HorizonVisualParams;
}

const AccretionDisk: React.FC<AccretionDiskProps> = ({ visualParams }) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const diskColorObject = useMemo(() => new THREE.Color(), []);

  useFrame(({ clock }, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * visualParams.diskVelocity * 0.1;
    }
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
      materialRef.current.uniforms.uColor.value.set(diskColorObject.set(visualParams.diskColor));
      materialRef.current.uniforms.uVelocity.value = visualParams.diskVelocity;
      materialRef.current.uniforms.uTurbulence.value = visualParams.diskTurbulence;
    }
  });
  
  const shaderArgs = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(visualParams.diskColor) },
      uVelocity: { value: visualParams.diskVelocity },
      uTurbulence: { value: visualParams.diskTurbulence },
    },
    vertexShader,
    fragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), [visualParams.diskColor, visualParams.diskVelocity, visualParams.diskTurbulence]);

  return (
    <mesh ref={meshRef} rotation-x={-Math.PI / 2.2}>
      <ringGeometry args={[1.1, 2.5, 128]} />
      <shaderMaterial ref={materialRef} args={[shaderArgs]} />
    </mesh>
  );
};

export default AccretionDisk;