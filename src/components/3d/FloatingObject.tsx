"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMousePosition } from "@/hooks/useMousePosition";

export function FloatingObject() {
  const groupRef = useRef<THREE.Group>(null);
  const { x, y } = useMousePosition();

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Base floating rotation
    groupRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
    groupRef.current.rotation.y = Math.cos(time * 0.3) * 0.15;
    
    // Continuous rotation based on scroll for the "3d movement on the scroller" effect
    const scrollY = window.scrollY;
    // Rotate the whole coding symbol around the Y and Z axis based on scroll
    groupRef.current.rotation.y += scrollY * 0.005;
    groupRef.current.rotation.z = scrollY * 0.002;

    // Mouse interaction (subtle parallax)
    const targetX = (x / window.innerWidth) * 2 - 1;
    const targetY = -(y / window.innerHeight) * 2 + 1;

    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX * 1.5, 0.05);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY * 1.5, 0.05);
  });

  const materialProps = {
    color: "#6D28D9",
    emissive: "#2D1450",
    emissiveIntensity: 0.5,
    roughness: 0.2,
    metalness: 0.8,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
  };

  const wireframeProps = {
    color: "#A78BFA",
    wireframe: true,
    transparent: true,
    opacity: 0.3,
  };

  return (
    <group ref={groupRef} scale={0.8}>
      
      {/* Left Bracket < */}
      <group position={[-2, 0, 0]}>
        {/* Top branch */}
        <mesh position={[0, 0.7, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[2, 0.3, 0.3]} />
          <meshPhysicalMaterial {...materialProps} />
        </mesh>
        <mesh position={[0, 0.7, 0]} rotation={[0, 0, Math.PI / 4]} scale={1.1}>
          <boxGeometry args={[2, 0.3, 0.3]} />
          <meshBasicMaterial {...wireframeProps} />
        </mesh>
        
        {/* Bottom branch */}
        <mesh position={[0, -0.7, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[2, 0.3, 0.3]} />
          <meshPhysicalMaterial {...materialProps} />
        </mesh>
        <mesh position={[0, -0.7, 0]} rotation={[0, 0, -Math.PI / 4]} scale={1.1}>
          <boxGeometry args={[2, 0.3, 0.3]} />
          <meshBasicMaterial {...wireframeProps} />
        </mesh>
      </group>

      {/* Slash / */}
      <group position={[0, 0, 0]}>
        <mesh rotation={[0, 0, -Math.PI / 6]}>
          <boxGeometry args={[0.3, 3.5, 0.3]} />
          <meshPhysicalMaterial {...materialProps} color="#8B5CF6" emissive="#4C1D95" />
        </mesh>
        <mesh rotation={[0, 0, -Math.PI / 6]} scale={1.1}>
          <boxGeometry args={[0.3, 3.5, 0.3]} />
          <meshBasicMaterial {...wireframeProps} />
        </mesh>
      </group>

      {/* Right Bracket > */}
      <group position={[2, 0, 0]}>
        {/* Top branch */}
        <mesh position={[0, 0.7, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[2, 0.3, 0.3]} />
          <meshPhysicalMaterial {...materialProps} />
        </mesh>
        <mesh position={[0, 0.7, 0]} rotation={[0, 0, -Math.PI / 4]} scale={1.1}>
          <boxGeometry args={[2, 0.3, 0.3]} />
          <meshBasicMaterial {...wireframeProps} />
        </mesh>

        {/* Bottom branch */}
        <mesh position={[0, -0.7, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[2, 0.3, 0.3]} />
          <meshPhysicalMaterial {...materialProps} />
        </mesh>
        <mesh position={[0, -0.7, 0]} rotation={[0, 0, Math.PI / 4]} scale={1.1}>
          <boxGeometry args={[2, 0.3, 0.3]} />
          <meshBasicMaterial {...wireframeProps} />
        </mesh>
      </group>

    </group>
  );
}
