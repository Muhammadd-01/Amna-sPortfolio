"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { useMousePosition } from "@/hooks/useMousePosition";

const CODE_SNIPPETS = [
  "const", "let", "=>", "{ }", "[ ]", "( )", "< />", "import", 
  "export", "return", "async", "await", "function", "true", "false", 
  "null", "undefined", "if", "else", "for", "while"
];

export function Particles({ count = 40 }) {
  const groupRef = useRef<THREE.Group>(null);
  const { x, y } = useMousePosition();

  // Create initial state for each code snippet
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        text: CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)],
        x: (Math.random() - 0.5) * 25,
        y: (Math.random() - 0.5) * 25,
        z: (Math.random() - 0.5) * 15 - 5,
        speed: 0.01 + Math.random() * 0.03,
        scale: 0.2 + Math.random() * 0.5,
        opacity: 0.1 + Math.random() * 0.3,
        rotationSpeed: (Math.random() - 0.5) * 0.02
      });
    }
    return temp;
  }, [count]);

  const particleRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(() => {
    if (!groupRef.current) return;

    // Mouse parallax for the entire group
    const targetX = (x / window.innerWidth) * 2 - 1;
    const targetY = -(y / window.innerHeight) * 2 + 1;

    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX * -2, 0.05);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY * -2, 0.05);
    
    // Continuous upward animation for each text element
    particleRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const p = particles[i];
      
      mesh.position.y += p.speed;
      mesh.rotation.z += p.rotationSpeed;

      // Reset to bottom if it goes too high
      if (mesh.position.y > 15) {
        mesh.position.y = -15;
        mesh.position.x = (Math.random() - 0.5) * 25;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <Text
          key={i}
          ref={(el) => {
            particleRefs.current[i] = el;
          }}
          position={[p.x, p.y, p.z]}
          scale={p.scale}
          color="#A78BFA"
          fillOpacity={p.opacity}
          anchorX="center"
          anchorY="middle"
        >
          {p.text}
        </Text>
      ))}
    </group>
  );
}
