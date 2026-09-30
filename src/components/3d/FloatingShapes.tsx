"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float, Icosahedron, TorusKnot, Sphere } from "@react-three/drei";

export function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    // Interactive 3D cursor tilt with spring dampening
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouseRef.current.y * 0.12,
      0.04
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouseRef.current.x * 0.18,
      0.04
    );
  });

  return (
    <group ref={groupRef}>
      {/* Abstract Wireframe Diamond */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2} position={[-7, 4, -10]}>
        <Icosahedron args={[1.8, 0]} rotation={[0, Math.PI / 4, 0]}>
          <meshPhysicalMaterial
            color="#a78bfa"
            emissive="#5b21b6"
            emissiveIntensity={0.6}
            roughness={0.1}
            metalness={0.8}
            wireframe={true}
          />
        </Icosahedron>
      </Float>

      {/* Premium Glass Torus Knot */}
      <Float speed={1.5} rotationIntensity={2} floatIntensity={2} position={[8, -2, -12]}>
        <TorusKnot args={[1.6, 0.45, 128, 32]} rotation={[Math.PI / 6, 0, 0]}>
          <meshPhysicalMaterial
            color="#ffffff"
            transmission={0.92}
            opacity={0.85}
            transparent={true}
            metalness={0.2}
            roughness={0.08}
            ior={1.5}
            thickness={2.2}
            envMapIntensity={1.2}
            clearcoat={1}
          />
        </TorusKnot>
      </Float>

      {/* Frosted Purple Sphere */}
      <Float speed={2.5} rotationIntensity={0.5} floatIntensity={1.5} position={[-9, -5, -14]}>
        <Sphere args={[1.6, 64, 64]} rotation={[0, Math.PI / 4, 0]}>
          <meshPhysicalMaterial
            color="#7c3aed"
            transmission={0.75}
            opacity={0.7}
            transparent={true}
            metalness={0.3}
            roughness={0.2}
            ior={1.4}
            thickness={1.8}
            clearcoat={0.6}
          />
        </Sphere>
      </Float>
      
      {/* Distant Small Glass Icosahedron */}
      <Float speed={1} rotationIntensity={2} floatIntensity={1} position={[9, 6, -18]}>
        <Icosahedron args={[2.2, 1]}>
          <meshPhysicalMaterial
            color="#c4b5fd"
            transmission={0.88}
            opacity={0.75}
            transparent={true}
            metalness={0.2}
            roughness={0.1}
            ior={1.35}
            thickness={1.5}
          />
        </Icosahedron>
      </Float>
    </group>
  );
}
