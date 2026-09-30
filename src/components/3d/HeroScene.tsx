"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Particles } from "./Particles";
import { SceneLights } from "./SceneLights";

export function HeroScene() {
  return (
    <div className="fixed inset-0 w-full h-full -z-50 pointer-events-none opacity-90">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 60 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          <SceneLights />
          <Particles count={130} />
        </Suspense>
      </Canvas>
    </div>
  );
}
