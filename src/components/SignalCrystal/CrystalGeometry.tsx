"use client";
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CrystalGeometryProps {
  mousePosition: { x: number; y: number };
  coreIntensity?: number;
}

const CrystalGeometry: React.FC<CrystalGeometryProps> = ({ 
  mousePosition, 
  coreIntensity = 1.0 
}) => {
  const crystalRef = useRef<THREE.Group>(null);
  const coreLightRef = useRef<THREE.PointLight>(null);
  const coreGlowRef = useRef<THREE.Mesh>(null);

  // Create crystal geometry using Ethereum-inspired angular design
  const crystalGeometry = useMemo(() => {
    // Main crystal body - modified dodecahedron for more angular faces (Ethereum-inspired)
    const mainGeometry = new THREE.DodecahedronGeometry(1.2, 0);
    
    // Create additional angular segments to mimic Ethereum's faceted structure
    const upperPyramid = new THREE.ConeGeometry(0.65, 1.0, 8);
    const lowerPyramid = new THREE.ConeGeometry(0.5, 0.8, 6);
    
    // Modify main geometry vertices for more angular, crystalline structure
    const vertices = mainGeometry.attributes.position.array as Float32Array;
    for (let i = 0; i < vertices.length; i += 3) {
      // Less randomness, more geometric precision (Ethereum-style)
      const heightFactor = vertices[i + 1] > 0 ? 1.1 : 0.9; // Taper toward bottom
      const radialScale = 0.9 + Math.random() * 0.15; // Subtle variation
      
      vertices[i] *= radialScale;
      vertices[i + 1] *= heightFactor;
      vertices[i + 2] *= radialScale;
      
      // Minimal distortion to maintain clean geometric lines
      vertices[i] += (Math.random() - 0.5) * 0.05;
      vertices[i + 1] += (Math.random() - 0.5) * 0.05;
      vertices[i + 2] += (Math.random() - 0.5) * 0.05;
    }
    mainGeometry.attributes.position.needsUpdate = true;
    mainGeometry.computeVertexNormals();

    // Angular crystal growths - more geometric, less organic
    const shard1 = new THREE.ConeGeometry(0.12, 0.65, 6); // Tall angular shard
    const shard2 = new THREE.OctahedronGeometry(0.2, 0); // Clean octahedron
    const shard3 = new THREE.CylinderGeometry(0.08, 0.15, 0.5, 8); // Angular column
    const shard4 = new THREE.TetrahedronGeometry(0.25, 0); // Sharp tetrahedron

    return {
      main: mainGeometry,
      upperPyramid: upperPyramid,
      lowerPyramid: lowerPyramid,
      shard1: shard1,
      shard2: shard2,
      shard3: shard3,
      shard4: shard4,
    };
  }, []);

  // Crystal material with Ethereum-inspired glass properties
  const crystalMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: 0x9bb5ff, // Slightly more purple-blue (Ethereum-inspired)
      transparent: true,
      opacity: 0.22,
      roughness: 0.05, // Slight roughness for more realistic surfaces
      metalness: 0.1, // Tiny bit of metallic quality
      clearcoat: 1.0,
      clearcoatRoughness: 0.0,
      transmission: 0.88,
      thickness: 0.6,
      ior: 1.45, // Slightly higher refraction for more dramatic effect
      envMapIntensity: 1.8,
      side: THREE.DoubleSide,
    });
  }, []);

  // Secondary material for pyramid segments (slightly different tint)
  const pyramidMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: 0xaac5ff, // Lighter blue for variation
      transparent: true,
      opacity: 0.18,
      roughness: 0.02,
      metalness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.0,
      transmission: 0.9,
      thickness: 0.4,
      ior: 1.4,
      envMapIntensity: 1.5,
      side: THREE.DoubleSide,
    });
  }, []);

  // Core glow material
  const coreGlowMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: 0x66aaff,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide,
    });
  }, []);

  // Animation loop
  useFrame((state, delta) => {
    if (crystalRef.current) {
      // Base rotation
      crystalRef.current.rotation.y += delta * 0.1;
      crystalRef.current.rotation.x += delta * 0.05;

      // Mouse interaction - subtle rotation influence
      const mouseInfluence = 0.3;
      crystalRef.current.rotation.y += mousePosition.x * mouseInfluence * delta;
      crystalRef.current.rotation.x += mousePosition.y * mouseInfluence * delta;

      // Gentle floating motion
      crystalRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }

    // Animate core light intensity
    if (coreLightRef.current) {
      const basePulse = Math.sin(state.clock.elapsedTime * 2.0) * 0.4 + 0.8;
      coreLightRef.current.intensity = basePulse * coreIntensity * 3.0;
    }

    // Animate core glow
    if (coreGlowRef.current) {
      const glowPulse = Math.sin(state.clock.elapsedTime * 2.0) * 0.3 + 0.9;
      coreGlowRef.current.scale.setScalar(0.12 + glowPulse * 0.06);
      
      const material = coreGlowRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = glowPulse * coreIntensity * 0.9;
    }
  });

  return (
    <group ref={crystalRef} position={[0, 0, 0]}>
      {/* Main crystal body */}
      <mesh geometry={crystalGeometry.main} material={crystalMaterial} />
      
      {/* Upper pyramid segment */}
      <mesh 
        geometry={crystalGeometry.upperPyramid} 
        material={pyramidMaterial}
        position={[0, 1.4, 0]}
        rotation={[0, 0, 0]}
      />
      
      {/* Lower pyramid segment */}
      <mesh 
        geometry={crystalGeometry.lowerPyramid} 
        material={pyramidMaterial}
        position={[0, -1.3, 0]}
        rotation={[Math.PI, 0, 0]}
      />

      {/* Angular crystal shards (Ethereum-inspired) */}
      <mesh 
        geometry={crystalGeometry.shard1} 
        material={crystalMaterial}
        position={[0.9, 0.65, 0.25]}
        rotation={[0.3, 0.8, 0.2]}
      />
      <mesh 
        geometry={crystalGeometry.shard2} 
        material={crystalMaterial}
        position={[-0.75, -0.3, 0.5]}
        rotation={[1.1, -0.4, 0.3]}
      />
      <mesh 
        geometry={crystalGeometry.shard3} 
        material={pyramidMaterial}
        position={[0.3, -0.9, -0.4]}
        rotation={[-0.2, 1.2, -0.6]}
      />
      <mesh 
        geometry={crystalGeometry.shard4} 
        material={crystalMaterial}
        position={[-0.5, 1.0, -0.3]}
        rotation={[0.7, -0.3, 1.1]}
      />

      {/* Core light source */}
      <pointLight
        ref={coreLightRef}
        position={[0, 0, 0]}
        color={0x66aaff}
        intensity={3.0}
        distance={12}
        decay={2}
      />

      {/* Core glow sphere */}
      <mesh ref={coreGlowRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <primitive object={coreGlowMaterial} />
      </mesh>
    </group>
  );
};

export default CrystalGeometry;
