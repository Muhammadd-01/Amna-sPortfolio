"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Particles } from "./Particles";
import { SceneLights } from "./SceneLights";

export function HeroScene() {
  return (
    <div className="fixed inset-0 w-full h-full -z-50 pointer-events-none opacity-80">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 60 }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <SceneLights />
          <Particles count={80} />
        </Suspense>
      </Canvas>
    </div>
  );
}
