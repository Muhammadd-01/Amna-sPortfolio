"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Environment } from "@react-three/drei";

export function SceneLights() {
  const cursorLightRef = useRef<THREE.PointLight>(null);
  const { viewport } = useThree();
  const mouseWorldRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseWorldRef.current.x = normX * (viewport.width / 2);
      mouseWorldRef.current.y = normY * (viewport.height / 2);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [viewport.width, viewport.height]);

  useFrame(() => {
    if (!cursorLightRef.current) return;
    cursorLightRef.current.position.x = THREE.MathUtils.lerp(
      cursorLightRef.current.position.x,
      mouseWorldRef.current.x,
      0.12
    );
    cursorLightRef.current.position.y = THREE.MathUtils.lerp(
      cursorLightRef.current.position.y,
      mouseWorldRef.current.y,
      0.12
    );
  });

  return (
    <>
      <ambientLight intensity={0.35} color="#3B0764" />
      <directionalLight position={[12, 12, 6]} intensity={1.2} color="#A78BFA" />
      <pointLight position={[-12, -12, -6]} intensity={0.6} color="#6D28D9" />
      
      {/* Dynamic 3D Cursor Light that follows user pointer and casts specular violet glow */}
      <pointLight
        ref={cursorLightRef}
        position={[0, 0, 4]}
        intensity={3.5}
        distance={22}
        decay={2}
        color="#C084FC"
      />
      
      <Environment preset="city" />
    </>
  );
}
