"use client";

import { Environment } from "@react-three/drei";

export function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.2} color="#4C1D95" />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#A78BFA" />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#6D28D9" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        color="#7C3AED"
        castShadow
      />
      <Environment preset="city" />
    </>
  );
}
