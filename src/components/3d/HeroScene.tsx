"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { FloatingObject } from "./FloatingObject";
import { Particles } from "./Particles";
import { SceneLights } from "./SceneLights";
import { Float } from "@react-three/drei";

export function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]} // Support high-DPI displays but limit to 2 for performance
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <SceneLights />
          
          <Float 
            speed={2} 
            rotationIntensity={0.5} 
            floatIntensity={1} 
            floatingRange={[-0.5, 0.5]}
          >
            <FloatingObject />
          </Float>
          
          <Particles count={150} />
          
          {/* Subtle fog to blend with the background */}
          <fog attach="fog" args={["#000000", 5, 15]} />
        </Suspense>
      </Canvas>
    </div>
  );
}
