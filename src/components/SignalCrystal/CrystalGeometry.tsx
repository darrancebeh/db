// src/components/CrystalGeometry.tsx

"use client";
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CrystalVisualParams } from '@/types/marketData';

// --- MODIFIED ---
// Props now accept specific visual parameters
interface CrystalGeometryProps {
  mousePosition: { x: number; y: number };
  visualParams: CrystalVisualParams;
}

const CrystalGeometry: React.FC<CrystalGeometryProps> = ({ 
  mousePosition, 
  visualParams 
}) => {
  const { coreColor, coreIntensity, pulseFrequency, agitation } = visualParams;
  
  const crystalRef = useRef<THREE.Group>(null);
  const coreLightRef = useRef<THREE.PointLight>(null);
  const coreGlowRef = useRef<THREE.Mesh>(null);

  // --- NEW: Memoize color objects for performance ---
  const dynamicCoreColor = useMemo(() => new THREE.Color(coreColor), [coreColor]);

  // Create crystal geometry (No changes here, original logic is sound)
  const crystalGeometry = useMemo(() => {
    const mainGeometry = new THREE.DodecahedronGeometry(1.2, 0);
    const vertices = mainGeometry.attributes.position.array as Float32Array;
    for (let i = 0; i < vertices.length; i += 3) {
      const heightFactor = vertices[i + 1] > 0 ? 1.1 : 0.9;
      const radialScale = 0.9 + Math.random() * 0.15;
      vertices[i] *= radialScale;
      vertices[i + 1] *= heightFactor;
      vertices[i + 2] *= radialScale;
      vertices[i] += (Math.random() - 0.5) * 0.05;
      vertices[i + 1] += (Math.random() - 0.5) * 0.05;
      vertices[i + 2] += (Math.random() - 0.5) * 0.05;
    }
    mainGeometry.attributes.position.needsUpdate = true;
    mainGeometry.computeVertexNormals();
    return {
      main: mainGeometry,
      upperPyramid: new THREE.ConeGeometry(0.65, 1.0, 8),
      lowerPyramid: new THREE.ConeGeometry(0.5, 0.8, 6),
      shard1: new THREE.ConeGeometry(0.12, 0.65, 6),
      shard2: new THREE.OctahedronGeometry(0.2, 0),
      shard3: new THREE.CylinderGeometry(0.08, 0.15, 0.5, 8),
      shard4: new THREE.TetrahedronGeometry(0.25, 0),
    };
  }, []);

  // Crystal materials (No changes here)
  const crystalMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({ color: 0x9bb5ff, transparent: true, opacity: 0.22, roughness: 0.05, metalness: 0.1, clearcoat: 1.0, clearcoatRoughness: 0.0, transmission: 0.88, thickness: 0.6, ior: 1.45, envMapIntensity: 1.8, side: THREE.DoubleSide }), []);
  const pyramidMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({ color: 0xaac5ff, transparent: true, opacity: 0.18, roughness: 0.02, metalness: 0.05, clearcoat: 1.0, clearcoatRoughness: 0.0, transmission: 0.9, thickness: 0.4, ior: 1.4, envMapIntensity: 1.5, side: THREE.DoubleSide }), []);
  
  // --- MODIFIED: Core glow material color is now dynamic ---
  const coreGlowMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: dynamicCoreColor,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide,
    });
  }, [dynamicCoreColor]);

  useFrame((state, delta) => {
    if (crystalRef.current) {
      crystalRef.current.rotation.y += delta * 0.1;
      crystalRef.current.rotation.x += delta * 0.05;

      const mouseInfluence = 0.3;
      crystalRef.current.rotation.y += mousePosition.x * mouseInfluence * delta;
      crystalRef.current.rotation.x += mousePosition.y * mouseInfluence * delta;
      
      // --- NEW: Agitation effect ---
      const agitationAmount = agitation * 0.1;
      crystalRef.current.rotation.z += (Math.sin(state.clock.elapsedTime * 20) * agitationAmount * delta);
      crystalRef.current.position.x += (Math.cos(state.clock.elapsedTime * 15) * agitationAmount * delta);

      crystalRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }

    // --- MODIFIED: Animate with dynamic params ---
    if (coreLightRef.current) {
      const basePulse = Math.sin(state.clock.elapsedTime * pulseFrequency) * 0.4 + 0.8;
      coreLightRef.current.intensity = basePulse * coreIntensity * 3.0;
    }

    if (coreGlowRef.current) {
      const glowPulse = Math.sin(state.clock.elapsedTime * pulseFrequency) * 0.3 + 0.9;
      coreGlowRef.current.scale.setScalar(0.12 + glowPulse * 0.06);
      
      const material = coreGlowRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = glowPulse * coreIntensity * 0.9;
    }
  });

  return (
    <group ref={crystalRef} position={[0, 0, 0]}>
      <mesh geometry={crystalGeometry.main} material={crystalMaterial} />
      <mesh geometry={crystalGeometry.upperPyramid} material={pyramidMaterial} position={[0, 1.4, 0]} rotation={[0, 0, 0]} />
      <mesh geometry={crystalGeometry.lowerPyramid} material={pyramidMaterial} position={[0, -1.3, 0]} rotation={[Math.PI, 0, 0]} />
      <mesh geometry={crystalGeometry.shard1} material={crystalMaterial} position={[0.9, 0.65, 0.25]} rotation={[0.3, 0.8, 0.2]} />
      <mesh geometry={crystalGeometry.shard2} material={crystalMaterial} position={[-0.75, -0.3, 0.5]} rotation={[1.1, -0.4, 0.3]} />
      <mesh geometry={crystalGeometry.shard3} material={pyramidMaterial} position={[0.3, -0.9, -0.4]} rotation={[-0.2, 1.2, -0.6]} />
      <mesh geometry={crystalGeometry.shard4} material={crystalMaterial} position={[-0.5, 1.0, -0.3]} rotation={[0.7, -0.3, 1.1]} />

      {/* --- MODIFIED: Core light color is now dynamic --- */}
      <pointLight
        ref={coreLightRef}
        position={[0, 0, 0]}
        color={dynamicCoreColor}
        intensity={3.0}
        distance={12}
        decay={2}
      />

      <mesh ref={coreGlowRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <primitive object={coreGlowMaterial} />
      </mesh>
    </group>
  );
};

export default CrystalGeometry;