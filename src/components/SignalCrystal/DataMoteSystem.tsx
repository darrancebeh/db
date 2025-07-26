"use client";
import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DataMoteSystemProps {
  flowIntensity?: number;
  crystalPosition?: THREE.Vector3;
}

interface DataMote {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  life: number;
  maxLife: number;
  size: number;
  curve: THREE.CatmullRomCurve3;
  curveProgress: number;
  id: number;
}

const DataMoteSystem: React.FC<DataMoteSystemProps> = ({
  flowIntensity = 1.0,
  crystalPosition = new THREE.Vector3(0, 0, 0)
}) => {
  const motesRef = useRef<THREE.Points>(null);
  const moteCount = Math.floor(120 * flowIntensity);
  const motes = useRef<DataMote[]>([]);
  const geometryRef = useRef<THREE.BufferGeometry>(null);

  // Create initial mote data
  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(moteCount * 3);
    const colors = new Float32Array(moteCount * 3);
    const sizes = new Float32Array(moteCount);
    
    // Initialize arrays (will be updated in animation loop)
    for (let i = 0; i < moteCount; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;
      
      colors[i * 3] = 0.4;     // R
      colors[i * 3 + 1] = 0.7; // G  
      colors[i * 3 + 2] = 1.0; // B
      
      sizes[i] = 0.02;
    }
    
    return { positions, colors, sizes };
  }, [moteCount]);

  // Generate spawn point around scene perimeter
  const generateSpawnPoint = (): THREE.Vector3 => {
    const angle = Math.random() * Math.PI * 2;
    const radius = 6 + Math.random() * 3; // Spawn closer for better visibility
    const height = (Math.random() - 0.5) * 4; // Reduced height range
    
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      height,
      Math.sin(angle) * radius
    );
  };

  // Create curved path from spawn point to crystal
  const createCurvePath = (startPos: THREE.Vector3, targetPos: THREE.Vector3): THREE.CatmullRomCurve3 => {
    // Add intermediate control points for natural curve
    const midPoint1 = new THREE.Vector3(
      startPos.x * 0.7 + targetPos.x * 0.3,
      startPos.y * 0.5 + targetPos.y * 0.5 + Math.random() * 2 - 1,
      startPos.z * 0.7 + targetPos.z * 0.3
    );
    
    const midPoint2 = new THREE.Vector3(
      startPos.x * 0.3 + targetPos.x * 0.7,
      startPos.y * 0.3 + targetPos.y * 0.7 + Math.random() * 1.5 - 0.75,
      startPos.z * 0.3 + targetPos.z * 0.7
    );

    return new THREE.CatmullRomCurve3([
      startPos,
      midPoint1,
      midPoint2,
      targetPos
    ]);
  };

  // Initialize or respawn a mote
  const initializeMote = (index: number): DataMote => {
    const spawnPos = generateSpawnPoint();
    const targetPos = crystalPosition.clone().add(
      new THREE.Vector3(
        (Math.random() - 0.5) * 0.4,
        (Math.random() - 0.5) * 0.4,
        (Math.random() - 0.5) * 0.4
      )
    );
    
    const curve = createCurvePath(spawnPos, targetPos);
    const maxLife = 4.0 + Math.random() * 2.0; // 4-6 seconds lifetime
    
    return {
      position: spawnPos.clone(),
      velocity: new THREE.Vector3(),
      life: maxLife,
      maxLife: maxLife,
      size: 0.015 + Math.random() * 0.02,
      curve: curve,
      curveProgress: 0,
      id: index
    };
  };

  // Initialize all motes
  useEffect(() => {
    const initMote = (index: number): DataMote => {
      const spawnPos = generateSpawnPoint();
      const targetPos = crystalPosition.clone().add(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.4,
          (Math.random() - 0.5) * 0.4,
          (Math.random() - 0.5) * 0.4
        )
      );
      
      const curve = createCurvePath(spawnPos, targetPos);
      const maxLife = 4.0 + Math.random() * 2.0; // 4-6 seconds lifetime
      
      return {
        position: spawnPos.clone(),
        velocity: new THREE.Vector3(),
        life: maxLife,
        maxLife: maxLife,
        size: 0.015 + Math.random() * 0.02,
        curve: curve,
        curveProgress: 0,
        id: index
      };
    };

    motes.current = Array.from({ length: moteCount }, (_, i) => initMote(i));
  }, [moteCount, crystalPosition]);

  // Animation loop
  useFrame((state, delta) => {
    if (!motesRef.current || !geometryRef.current) return;

    const positions = geometryRef.current.attributes.position.array as Float32Array;
    const colors = geometryRef.current.attributes.color.array as Float32Array;
    const sizes = geometryRef.current.attributes.size.array as Float32Array;

    motes.current.forEach((mote, index) => {
      // Update mote life
      mote.life -= delta;
      
      // Respawn if dead
      if (mote.life <= 0) {
        const newMote = initializeMote(index);
        motes.current[index] = newMote;
        mote = newMote;
      }

      // Update position along curve
      const speed = 0.15 + Math.sin(state.clock.elapsedTime + mote.id) * 0.05;
      mote.curveProgress += delta * speed * flowIntensity;
      mote.curveProgress = Math.min(mote.curveProgress, 1);

      // Get position from curve
      const curvePosition = mote.curve.getPoint(mote.curveProgress);
      mote.position.copy(curvePosition);

      // Calculate life-based effects
      const fadeIn = Math.min(1, (mote.maxLife - mote.life) * 2); // Fade in over first 0.5s
      const fadeOut = Math.min(1, mote.life * 4); // Fade out in last 0.25s
      const alpha = Math.min(fadeIn, fadeOut) * 0.8;

      // Update buffer arrays
      const i3 = index * 3;
      positions[i3] = mote.position.x;
      positions[i3 + 1] = mote.position.y;
      positions[i3 + 2] = mote.position.z;

      // Color based on progress (blue to white as approaching crystal)
      const progress = mote.curveProgress;
      colors[i3] = 0.4 + progress * 0.6;     // R: blue to white
      colors[i3 + 1] = 0.7 + progress * 0.3; // G: blue to white  
      colors[i3 + 2] = 1.0;                   // B: stay blue

      // Size based on life and progress
      const pulseSize = 1 + Math.sin(state.clock.elapsedTime * 3 + mote.id) * 0.3;
      sizes[index] = mote.size * alpha * pulseSize;
    });

    // Mark attributes as needing update
    geometryRef.current.attributes.position.needsUpdate = true;
    geometryRef.current.attributes.color.needsUpdate = true;
    geometryRef.current.attributes.size.needsUpdate = true;
  });

  // Custom shader material for data motes
  const moteMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vSize;
        
        void main() {
          vColor = color;
          vSize = size;
          
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vSize;
        
        void main() {
          // Create circular particle with soft edges
          vec2 center = gl_PointCoord - 0.5;
          float dist = length(center);
          
          if (dist > 0.5) discard;
          
          // Soft circular falloff
          float alpha = 1.0 - smoothstep(0.2, 0.5, dist);
          
          // Add subtle glow effect
          float glow = 1.0 - smoothstep(0.0, 0.3, dist);
          vec3 finalColor = vColor + glow * 0.3;
          
          gl_FragColor = vec4(finalColor, alpha * 0.8);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);

  return (
    <points ref={motesRef}>
      <bufferGeometry ref={geometryRef}>
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
      <primitive object={moteMaterial} />
    </points>
  );
};

export default DataMoteSystem;
