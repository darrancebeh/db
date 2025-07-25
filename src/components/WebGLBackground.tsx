"use client";
import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Particle system component
function Particles({ 
  mousePosition, 
  particleColor = "#60a5fa" 
}: { 
  mousePosition: { x: number; y: number };
  particleColor?: string;
}) {
  const points = useRef<THREE.Points>(null);
  const particleCount = 1200;
  const colorRef = useRef(particleColor);

  // Generate particle positions
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15; // z
    }
    
    return positions;
  }, []);

  // Update particle color when prop changes
  useEffect(() => {
    if (points.current && points.current.material && colorRef.current !== particleColor) {
      const material = points.current.material as THREE.PointsMaterial;
      material.color.set(particleColor);
      colorRef.current = particleColor;
    }
  }, [particleColor]);

  // Animation loop
  useFrame((state, delta) => {
    if (points.current) {
      const positions = points.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // More pronounced floating motion
        positions[i3 + 1] += Math.sin(state.clock.elapsedTime * 0.5 + i * 0.1) * 0.005;
        positions[i3] += Math.cos(state.clock.elapsedTime * 0.3 + i * 0.05) * 0.002;
        
        // Enhanced mouse interaction
        const mouseInfluence = 0.3;
        const mouseDistanceX = mousePosition.x * 12 - positions[i3];
        const mouseDistanceY = mousePosition.y * 12 - positions[i3 + 1];
        const distance = Math.sqrt(mouseDistanceX * mouseDistanceX + mouseDistanceY * mouseDistanceY);
        
        if (distance < 5) {
          const force = (5 - distance) / 5;
          positions[i3] += mouseDistanceX * force * mouseInfluence * delta;
          positions[i3 + 1] += mouseDistanceY * force * mouseInfluence * delta;
        }
      }
      
      points.current.geometry.attributes.position.needsUpdate = true;
      
      // Gentle rotation
      points.current.rotation.y += delta * 0.02;
      points.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particlePositions}
          itemSize={3}
          args={[particlePositions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color={particleColor}
        transparent
        opacity={0.7}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Background gradient mesh
function BackgroundMesh() {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (mesh.current && mesh.current.material) {
      const material = mesh.current.material as THREE.ShaderMaterial;
      material.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0.0 },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec2 resolution;
        varying vec2 vUv;
        
        // Aurora-like color function
        vec3 aurora(vec2 uv, float t) {
          // Create flowing aurora patterns
          float wave1 = sin(uv.x * 3.0 + t * 0.5) * sin(uv.y * 2.0 + t * 0.3);
          float wave2 = sin(uv.x * 4.0 - t * 0.4) * cos(uv.y * 3.0 + t * 0.6);
          float wave3 = cos(uv.x * 2.0 + t * 0.7) * sin(uv.y * 4.0 - t * 0.2);
          
          // Combine waves for aurora effect
          float intensity = (wave1 + wave2 + wave3) * 0.3 + 0.5;
          intensity = smoothstep(0.2, 0.8, intensity);
          
          // Aurora colors: blue to purple to pink
          vec3 color1 = vec3(0.2, 0.4, 0.8); // Blue
          vec3 color2 = vec3(0.6, 0.2, 0.8); // Purple  
          vec3 color3 = vec3(0.8, 0.3, 0.6); // Pink
          
          // Mix colors based on position and time
          float colorMix1 = sin(uv.x * 2.0 + t * 0.3) * 0.5 + 0.5;
          float colorMix2 = cos(uv.y * 1.5 - t * 0.4) * 0.5 + 0.5;
          
          vec3 mixedColor = mix(color1, color2, colorMix1);
          mixedColor = mix(mixedColor, color3, colorMix2);
          
          return mixedColor * intensity;
        }
        
        void main() {
          vec2 uv = vUv;
          
          // Base dark background
          vec3 bgColor = vec3(0.02, 0.02, 0.05);
          
          // Add aurora effect
          vec3 auroraColor = aurora(uv, time);
          
          // Add some subtle noise for texture
          float noise = sin(uv.x * 50.0) * sin(uv.y * 50.0) * 0.02;
          
          // Combine everything
          vec3 finalColor = bgColor + auroraColor * 0.4 + noise;
          
          // Add vignette effect
          float vignette = 1.0 - length(uv - 0.5) * 0.8;
          finalColor *= vignette;
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
    });
  }, []);

  return (
    <mesh ref={mesh} position={[0, 0, -5]}>
      <planeGeometry args={[50, 50]} />
      <primitive object={shaderMaterial} />
    </mesh>
  );
}

// Main Scene component
function Scene({ 
  mousePosition, 
  particleColor = "#60a5fa" 
}: { 
  mousePosition: { x: number; y: number };
  particleColor?: string;
}) {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(0, 0, 5);
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.1} />
      <BackgroundMesh />
      <Particles mousePosition={mousePosition} particleColor={particleColor} />
    </>
  );
}

// Main WebGL Background component
const WebGLBackground: React.FC<{ particleColor?: string }> = ({ particleColor = "#60a5fa" }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);

  // Check WebGL support
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!context) {
        setIsWebGLSupported(false);
      }
    } catch {
      setIsWebGLSupported(false);
    }
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Fallback to CSS gradient if WebGL is not supported
  if (!isWebGLSupported) {
    console.log('WebGL not supported, using CSS fallback');
    return (
      <div 
        className="absolute top-0 left-0 w-full h-full bg-gradient-animate"
        style={{ 
          pointerEvents: 'none',
          zIndex: 1
        }}
      />
    );
  }

  console.log('WebGL supported, loading 3D background');

  return (
    <div 
      className="absolute top-0 left-0 w-full h-full"
      style={{ 
        pointerEvents: 'none',
        zIndex: 1,
        background: '#020203' // Fallback dark background
      }}
    >
      <Canvas
        camera={{ fov: 75, position: [0, 0, 5] }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          alpha: true,
          preserveDrawingBuffer: true
        }}
        style={{ 
          background: 'transparent',
          width: '100%',
          height: '100%'
        }}
      >
        <Scene mousePosition={mousePosition} particleColor={particleColor} />
      </Canvas>
    </div>
  );
};

export default WebGLBackground;
