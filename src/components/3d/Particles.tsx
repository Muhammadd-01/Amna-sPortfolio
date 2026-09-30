"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  strength: number;
  speed: number;
  active: boolean;
}

export function Particles({ count = 120 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { viewport } = useThree();

  // Mouse coordinate refs
  const mouseScreenRef = useRef({ x: 0, y: 0, vx: 0, vy: 0 });
  const mouseWorldRef = useRef({ x: 0, y: 0 });
  const smoothedMouseRef = useRef({ x: 0, y: 0 });
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const shockwavesRef = useRef<Shockwave[]>([]);

  // 1. Create procedural circular glow texture for particles
  const particleTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.25, "rgba(192, 132, 252, 0.85)");
      gradient.addColorStop(0.6, "rgba(124, 58, 237, 0.35)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(32, 32, 32, 0, Math.PI * 2);
      ctx.fill();
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  // 2. Window-level pointer listener (works even when canvas is pointer-events-none)
  useEffect(() => {
    let lastTime = performance.now();

    const handlePointerMove = (e: PointerEvent) => {
      const now = performance.now();
      const dt = Math.max((now - lastTime) / 1000, 0.001);
      lastTime = now;

      const vx = (e.clientX - lastMousePosRef.current.x) / dt;
      const vy = (e.clientY - lastMousePosRef.current.y) / dt;

      mouseScreenRef.current.x = e.clientX;
      mouseScreenRef.current.y = e.clientY;
      mouseScreenRef.current.vx = vx;
      mouseScreenRef.current.vy = vy;

      lastMousePosRef.current.x = e.clientX;
      lastMousePosRef.current.y = e.clientY;
    };

    const handlePointerDown = (e: PointerEvent) => {
      // Create a 3D shockwave on click
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      const x3d = normX * (viewport.width / 2);
      const y3d = normY * (viewport.height / 2);

      shockwavesRef.current.push({
        x: x3d,
        y: y3d,
        radius: 0.1,
        maxRadius: 18,
        strength: 0.7,
        speed: 22,
        active: true,
      });

      // Keep maximum 3 concurrent shockwaves for top performance
      if (shockwavesRef.current.length > 3) {
        shockwavesRef.current.shift();
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [viewport.width, viewport.height]);

  // 3. Initialize Particle Data (Background Cosmic Field + Cursor Stardust Tail)
  const stardustCount = 30;
  const totalCount = count + stardustCount;

  const {
    positions,
    colors,
    velocities,
    baseData,
  } = useMemo(() => {
    const pos = new Float32Array(totalCount * 3);
    const col = new Float32Array(totalCount * 3);
    const vel: { x: number; y: number; z: number }[] = [];
    const base: {
      x: number;
      y: number;
      z: number;
      speed: number;
      phase: number;
      r: number;
      g: number;
      b: number;
      isStardust: boolean;
    }[] = [];

    // Color palettes
    const palette = [
      new THREE.Color("#7C3AED"), // Deep violet
      new THREE.Color("#8B5CF6"), // Brand purple
      new THREE.Color("#A855F7"), // Bright neon violet
      new THREE.Color("#C084FC"), // Soft lavender
      new THREE.Color("#6366F1"), // Indigo
    ];

    // Background cosmic particles
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 44;
      const y = (Math.random() - 0.5) * 36;
      const z = (Math.random() - 0.5) * 20 - 5;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;

      vel.push({ x: 0, y: 0, z: 0 });
      base.push({
        x,
        y,
        z,
        speed: 0.3 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
        r: c.r,
        g: c.g,
        b: c.b,
        isStardust: false,
      });
    }

    // Cursor Stardust Tail particles
    const cyan = new THREE.Color("#06B6D4");
    for (let i = count; i < totalCount; i++) {
      pos[i * 3] = 0;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = 0;

      col[i * 3] = cyan.r;
      col[i * 3 + 1] = cyan.g;
      col[i * 3 + 2] = cyan.b;

      vel.push({ x: 0, y: 0, z: 0 });
      base.push({
        x: 0,
        y: 0,
        z: 0,
        speed: 1.5 + Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2,
        r: cyan.r,
        g: cyan.g,
        b: cyan.b,
        isStardust: true,
      });
    }

    return { positions: pos, colors: col, velocities: vel, baseData: base };
  }, [count, totalCount]);

  // 4. Pre-allocate buffer for dynamic constellation connection lines
  const maxLines = 450;
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);
  const lineColors = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);

  // 5. Physics & WebGL Render Loop
  useFrame((state, delta) => {
    if (!pointsRef.current || !linesRef.current) return;

    const time = state.clock.getElapsedTime();
    const posAttr = pointsRef.current.geometry.attributes.position;
    const colAttr = pointsRef.current.geometry.attributes.color;
    const posArray = posAttr.array as Float32Array;
    const colArray = colAttr.array as Float32Array;

    // Convert screen mouse to 3D world space at z = 0
    if (typeof window !== "undefined") {
      const normX = (mouseScreenRef.current.x / window.innerWidth) * 2 - 1;
      const normY = -(mouseScreenRef.current.y / window.innerHeight) * 2 + 1;
      mouseWorldRef.current.x = normX * (viewport.width / 2);
      mouseWorldRef.current.y = normY * (viewport.height / 2);
    }

    // Smooth cursor movement with fluid lerp
    smoothedMouseRef.current.x = THREE.MathUtils.lerp(
      smoothedMouseRef.current.x,
      mouseWorldRef.current.x,
      0.15
    );
    smoothedMouseRef.current.y = THREE.MathUtils.lerp(
      smoothedMouseRef.current.y,
      mouseWorldRef.current.y,
      0.15
    );

    const mouseX = smoothedMouseRef.current.x;
    const mouseY = smoothedMouseRef.current.y;

    // Advance active shockwaves
    for (let s = 0; s < shockwavesRef.current.length; s++) {
      const sw = shockwavesRef.current[s];
      if (sw.active) {
        sw.radius += sw.speed * delta;
        if (sw.radius >= sw.maxRadius) {
          sw.active = false;
        }
      }
    }

    const INFLUENCE_RADIUS = 7.5;
    const INFLUENCE_RADIUS_SQ = INFLUENCE_RADIUS * INFLUENCE_RADIUS;

    // Update Background Cosmic Particles
    for (let i = 0; i < count; i++) {
      const base = baseData[i];
      const px = posArray[i * 3];
      const py = posArray[i * 3 + 1];
      const pz = posArray[i * 3 + 2];

      const dx = px - mouseX;
      const dy = py - mouseY;
      const distSq = dx * dx + dy * dy;

      // Cursor Proximity Interaction (Vortex Swirl & Repulsion)
      if (distSq < INFLUENCE_RADIUS_SQ) {
        const dist = Math.sqrt(distSq);
        const factor = 1 - dist / INFLUENCE_RADIUS;

        // Repulsion away from cursor
        const repelForce = factor * factor * 0.45;
        velocities[i].x += (dx / (dist + 0.001)) * repelForce;
        velocities[i].y += (dy / (dist + 0.001)) * repelForce;

        // Tangential orbital vortex swirl around cursor
        const swirlForce = factor * 0.32;
        velocities[i].x += (-dy / (dist + 0.001)) * swirlForce;
        velocities[i].y += (dx / (dist + 0.001)) * swirlForce;

        // Shift color towards vibrant neon cyan (#06B6D4) and white
        colArray[i * 3] = THREE.MathUtils.lerp(base.r, 0.05, factor);
        colArray[i * 3 + 1] = THREE.MathUtils.lerp(base.g, 0.85, factor);
        colArray[i * 3 + 2] = THREE.MathUtils.lerp(base.b, 1.0, factor);
      } else {
        // Return to natural cyber purple base color
        colArray[i * 3] = THREE.MathUtils.lerp(colArray[i * 3], base.r, 0.05);
        colArray[i * 3 + 1] = THREE.MathUtils.lerp(colArray[i * 3 + 1], base.g, 0.05);
        colArray[i * 3 + 2] = THREE.MathUtils.lerp(colArray[i * 3 + 2], base.b, 0.05);
      }

      // Check Shockwave Waves
      for (let s = 0; s < shockwavesRef.current.length; s++) {
        const sw = shockwavesRef.current[s];
        if (sw.active) {
          const swDx = px - sw.x;
          const swDy = py - sw.y;
          const swDist = Math.sqrt(swDx * swDx + swDy * swDy);
          const diff = Math.abs(swDist - sw.radius);

          if (diff < 2.5) {
            const shockIntensity = (1 - diff / 2.5) * sw.strength;
            velocities[i].x += (swDx / (swDist + 0.001)) * shockIntensity;
            velocities[i].y += (swDy / (swDist + 0.001)) * shockIntensity;

            // Flash to electric magenta/white on impact
            colArray[i * 3] = 1.0;
            colArray[i * 3 + 1] = 0.3;
            colArray[i * 3 + 2] = 0.9;
          }
        }
      }

      // Floating natural harmonic drift target
      const targetX = base.x + Math.sin(time * base.speed + base.phase) * 1.6;
      const targetY = base.y + Math.cos(time * base.speed * 0.8 + base.phase) * 1.6;
      const targetZ = base.z + Math.sin(time * 0.4 + base.phase) * 1.0;

      // Spring physics returning particle back to position
      velocities[i].x += (targetX - px) * 0.035;
      velocities[i].y += (targetY - py) * 0.035;
      velocities[i].z += (targetZ - pz) * 0.035;

      // Damping friction
      velocities[i].x *= 0.91;
      velocities[i].y *= 0.91;
      velocities[i].z *= 0.91;

      posArray[i * 3] += velocities[i].x;
      posArray[i * 3 + 1] += velocities[i].y;
      posArray[i * 3 + 2] += velocities[i].z;
    }

    // Update Cursor Stardust Comet Trail (particles count to totalCount)
    for (let k = 0; k < stardustCount; k++) {
      const idx = count + k;
      const angle = time * 2.8 + k * ((Math.PI * 2) / stardustCount);
      const orbitRad = 0.45 + (k % 4) * 0.35;

      const targetX = mouseX + Math.cos(angle) * orbitRad;
      const targetY = mouseY + Math.sin(angle) * orbitRad;
      const targetZ = Math.sin(angle * 2) * 0.8;

      posArray[idx * 3] = THREE.MathUtils.lerp(posArray[idx * 3], targetX, 0.25);
      posArray[idx * 3 + 1] = THREE.MathUtils.lerp(posArray[idx * 3 + 1], targetY, 0.25);
      posArray[idx * 3 + 2] = THREE.MathUtils.lerp(posArray[idx * 3 + 2], targetZ, 0.25);

      // Sparkling stardust colors (alternating cyan & neon purple)
      const isCyan = k % 2 === 0;
      colArray[idx * 3] = isCyan ? 0.15 : 0.85;
      colArray[idx * 3 + 1] = isCyan ? 0.95 : 0.45;
      colArray[idx * 3 + 2] = 1.0;
    }

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;

    // Connect close background particles with energy constellation lines
    let lineIdx = 0;
    const connectDistance = 5.2;
    const connectDistSq = connectDistance * connectDistance;

    for (let i = 0; i < count && lineIdx < maxLines; i++) {
      const p1x = posArray[i * 3];
      const p1y = posArray[i * 3 + 1];
      const p1z = posArray[i * 3 + 2];

      for (let j = i + 1; j < count && lineIdx < maxLines; j++) {
        const dx = p1x - posArray[j * 3];
        const dy = p1y - posArray[j * 3 + 1];
        const dz = p1z - posArray[j * 3 + 2];
        const dSq = dx * dx + dy * dy + dz * dz;

        if (dSq < connectDistSq) {
          const lPtr = lineIdx * 6;

          linePositions[lPtr] = p1x;
          linePositions[lPtr + 1] = p1y;
          linePositions[lPtr + 2] = p1z;

          linePositions[lPtr + 3] = posArray[j * 3];
          linePositions[lPtr + 4] = posArray[j * 3 + 1];
          linePositions[lPtr + 5] = posArray[j * 3 + 2];

          // Check if close to cursor to ignite energetic glow
          const mouseDistSq = Math.min(
            (p1x - mouseX) ** 2 + (p1y - mouseY) ** 2,
            (posArray[j * 3] - mouseX) ** 2 + (posArray[j * 3 + 1] - mouseY) ** 2
          );

          if (mouseDistSq < INFLUENCE_RADIUS_SQ) {
            // Bright electric cyan line near cursor
            lineColors[lPtr] = 0.1;
            lineColors[lPtr + 1] = 0.9;
            lineColors[lPtr + 2] = 1.0;
            lineColors[lPtr + 3] = 0.1;
            lineColors[lPtr + 4] = 0.9;
            lineColors[lPtr + 5] = 1.0;
          } else {
            // Ambient deep violet line
            lineColors[lPtr] = 0.45;
            lineColors[lPtr + 1] = 0.15;
            lineColors[lPtr + 2] = 0.9;
            lineColors[lPtr + 3] = 0.45;
            lineColors[lPtr + 4] = 0.15;
            lineColors[lPtr + 5] = 0.9;
          }

          lineIdx++;
        }
      }
    }

    const lineGeom = linesRef.current.geometry;
    lineGeom.attributes.position.needsUpdate = true;
    if (lineGeom.attributes.color) {
      lineGeom.attributes.color.needsUpdate = true;
    }
    lineGeom.setDrawRange(0, lineIdx * 2);

    // Global subtle camera parallax
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(
      pointsRef.current.rotation.x,
      -mouseY * 0.015,
      0.04
    );
    pointsRef.current.rotation.y = THREE.MathUtils.lerp(
      pointsRef.current.rotation.y,
      mouseX * 0.015,
      0.04
    );
    linesRef.current.rotation.x = pointsRef.current.rotation.x;
    linesRef.current.rotation.y = pointsRef.current.rotation.y;
  });

  return (
    <group>
      {/* 3D Cosmic Particle Nodes with Vertex Colors & Radial Glow */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.28}
          vertexColors
          transparent
          opacity={0.88}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          map={particleTexture || undefined}
        />
      </points>

      {/* Dynamic Energy Constellation Strands */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}
