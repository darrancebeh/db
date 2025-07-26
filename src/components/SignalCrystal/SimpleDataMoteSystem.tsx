// src/components/SignalCrystal/SimpleDataMoteSystem.tsx

"use client";
import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CrystalVisualParams } from '@/types/marketData';

const SimpleDataMoteSystem: React.FC<CrystalVisualParams> = ({
  moteCount,
  moteColor,
  flowIntensity,
  agitation
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  
  // --- MODIFICATION: Staggered Initialization ---
  // We now also store life and maxLife per-mote to create a continuous flow from frame one.
  const { positions, colors, sizes, velocities, life, maxLife } = useMemo(() => {
    const positions = new Float32Array(moteCount * 3);
    const colors = new Float32Array(moteCount * 3);
    const sizes = new Float32Array(moteCount);
    const velocities = new Float32Array(moteCount * 3);
    const life = new Float32Array(moteCount);
    const maxLife = new Float32Array(moteCount);
    
    const crystalPosition = new THREE.Vector3(0, 0, 0);

    for (let i = 0; i < moteCount; i++) {
      const i3 = i * 3;
      
      const angle = Math.random() * Math.PI * 2;
      const radius = 5 + Math.random() * 2;
      const height = (Math.random() - 0.5) * 3;
      
      const spawnPos = new THREE.Vector3(Math.cos(angle) * radius, height, Math.sin(angle) * radius);
      
      const direction = new THREE.Vector3().subVectors(crystalPosition, spawnPos).normalize();
      const speed = 0.5 + Math.random() * 0.3;
      
      velocities[i3] = direction.x * speed;
      velocities[i3 + 1] = direction.y * speed;
      velocities[i3 + 2] = direction.z * speed;

      // Give each particle a random starting age.
      maxLife[i] = 4.0 + Math.random() * 3.0; // 4-7 second lifetime
      life[i] = Math.random() * maxLife[i];

      // Pre-simulate its position based on its random age.
      const travelTime = maxLife[i] - life[i];
      positions[i3] = spawnPos.x + velocities[i3] * travelTime;
      positions[i3 + 1] = spawnPos.y + velocities[i3 + 1] * travelTime;
      positions[i3 + 2] = spawnPos.z + velocities[i3 + 2] * travelTime;

      sizes[i] = 0.02 + Math.random() * 0.03;
    }
    
    return { positions, colors, sizes, velocities, life, maxLife };
  }, [moteCount]);

  const geometryRef = useRef<THREE.BufferGeometry>(null);

  useEffect(() => {
    if (geometryRef.current) {
      geometryRef.current.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometryRef.current.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometryRef.current.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    }
  }, [positions, colors, sizes]);


  const baseColor = useMemo(() => new THREE.Color(moteColor), [moteColor]);

  useFrame((state, delta) => {
    if (!geometryRef.current) return;

    const posAttr = geometryRef.current.attributes.position as THREE.BufferAttribute;
    const colAttr = geometryRef.current.attributes.color as THREE.BufferAttribute;
    const sizeAttr = geometryRef.current.attributes.size as THREE.BufferAttribute;

    for (let i = 0; i < moteCount; i++) {
      const i3 = i * 3;
      
      // Decrease life
      life[i] -= delta;
      
      // Respawn if dead
      if (life[i] <= 0) {
        life[i] = maxLife[i];

        const angle = Math.random() * Math.PI * 2;
        const radius = 5 + Math.random() * 2;
        const height = (Math.random() - 0.5) * 3;
        posAttr.setXYZ(i, Math.cos(angle) * radius, height, Math.sin(angle) * radius);
      }
      
      // Update position
      const agitationVectorX = (Math.random() - 0.5) * agitation;
      const agitationVectorY = (Math.random() - 0.5) * agitation;
      const agitationVectorZ = (Math.random() - 0.5) * agitation;

      posAttr.array[i3] += velocities[i3] * delta * flowIntensity + agitationVectorX * delta;
      posAttr.array[i3 + 1] += velocities[i3 + 1] * delta * flowIntensity + agitationVectorY * delta;
      posAttr.array[i3 + 2] += velocities[i3 + 2] * delta * flowIntensity + agitationVectorZ * delta;
      
      // Update color and size based on life
      const lifeRatio = Math.max(0, life[i] / maxLife[i]);
      const progress = 1 - lifeRatio;

      const finalColor = baseColor.clone().lerp(new THREE.Color(0xffffff), progress * 0.8);
      colAttr.setXYZ(i, finalColor.r, finalColor.g, finalColor.b);
      
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2 + i * 0.1) * 0.3;
      // Fade in and out based on life
      const fadeIn = Math.min(1.0, (maxLife[i] - life[i]) * 2);
      const fadeOut = Math.min(1.0, life[i] * 4);
      const alpha = fadeIn * fadeOut;
      sizeAttr.setX(i, sizes[i] * pulse * (1 + progress) * alpha);
    }

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;
    sizeAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geometryRef} />
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

export default SimpleDataMoteSystem;