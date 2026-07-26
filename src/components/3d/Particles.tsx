"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMousePosition } from "@/hooks/useMousePosition";

export function Particles({ count = 100 }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { x, y } = useMousePosition();

  // Create random points in a sphere/box
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = [];
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 10;
      vel.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        )
      );
    }
    return [pos, vel];
  }, [count]);

  // Pre-allocate a buffer for lines (max possible connections)
  const maxLines = count * count;
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);

  useFrame(() => {
    if (!pointsRef.current || !linesRef.current) return;

    const posAttr = pointsRef.current.geometry.attributes.position;
    const array = posAttr.array as Float32Array;

    // Update particle positions based on velocity
    for (let i = 0; i < count; i++) {
      array[i * 3] += velocities[i].x;
      array[i * 3 + 1] += velocities[i].y;
      array[i * 3 + 2] += velocities[i].z;

      // Bounce off invisible boundaries
      if (Math.abs(array[i * 3]) > 20) velocities[i].x *= -1;
      if (Math.abs(array[i * 3 + 1]) > 20) velocities[i].y *= -1;
      if (array[i * 3 + 2] < -20 || array[i * 3 + 2] > 0) velocities[i].z *= -1;
    }
    posAttr.needsUpdate = true;

    // Connect close particles with lines
    let lineIndex = 0;
    const connectDistance = 6.0;

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = array[i * 3] - array[j * 3];
        const dy = array[i * 3 + 1] - array[j * 3 + 1];
        const dz = array[i * 3 + 2] - array[j * 3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < connectDistance * connectDistance) {
          linePositions[lineIndex++] = array[i * 3];
          linePositions[lineIndex++] = array[i * 3 + 1];
          linePositions[lineIndex++] = array[i * 3 + 2];

          linePositions[lineIndex++] = array[j * 3];
          linePositions[lineIndex++] = array[j * 3 + 1];
          linePositions[lineIndex++] = array[j * 3 + 2];
        }
      }
    }

    // Update lines geometry
    const lineGeom = linesRef.current.geometry;
    lineGeom.attributes.position.needsUpdate = true;
    lineGeom.setDrawRange(0, lineIndex / 3);

    // Subtle parallax effect on the whole group
    const targetX = (x / window.innerWidth) * 2 - 1;
    const targetY = -(y / window.innerHeight) * 2 + 1;

    pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, targetY * 0.1, 0.05);
    pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, targetX * 0.1, 0.05);
    linesRef.current.rotation.x = pointsRef.current.rotation.x;
    linesRef.current.rotation.y = pointsRef.current.rotation.y;
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          color="#A78BFA"
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#7C3AED"
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}
