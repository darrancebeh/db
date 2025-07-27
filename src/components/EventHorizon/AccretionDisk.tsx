// src/components/EventHorizon/AccretionDisk.tsx

"use client";
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

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
    float time = uTime * 0.2;
    float d = distance(vUv, vec2(0.5));
    
    // Create a soft-edged ring mask
    float mask = smoothstep(0.5, 0.48, d) * smoothstep(0.25, 0.27, d);

    float turbulence = noise(vUv * 5.0 - time);
    turbulence += noise(vUv * 10.0 + time) * 0.5;

    float angle = atan(vUv.y - 0.5, vUv.x - 0.5);
    float streaks = sin(angle * 15.0 - time * 3.0) * 0.1 + 0.9;
    
    float finalNoise = turbulence * streaks;
    
    vec3 color = vec3(0.7, 0.8, 1.0) * finalNoise;
    float alpha = finalNoise * mask;

    gl_FragColor = vec4(color, alpha);
  }
`;

const AccretionDisk: React.FC = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });
  
  const shaderArgs = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
    },
    vertexShader,
    fragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), []);

  return (
    // Rotate the disk to lay it flat on the XZ plane
    <mesh rotation-x={-Math.PI / 2.2}> {/* Slightly less than 90 degrees for perspective */}
      <ringGeometry args={[1.5, 3.5, 128]} />
      <shaderMaterial ref={materialRef} args={[shaderArgs]} />
    </mesh>
  );
};

export default AccretionDisk;