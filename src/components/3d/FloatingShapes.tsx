import { Float, Icosahedron, TorusKnot, Sphere } from "@react-three/drei";

export function FloatingShapes() {
  return (
    <>
      {/* Abstract Wireframe Diamond */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2} position={[-6, 3, -12]}>
        <Icosahedron args={[1.8, 0]} rotation={[0, Math.PI / 4, 0]}>
          <meshPhysicalMaterial
            color="#a78bfa"
            emissive="#5b21b6"
            emissiveIntensity={0.5}
            roughness={0.1}
            metalness={0.8}
            wireframe={true}
          />
        </Icosahedron>
      </Float>

      {/* Premium Glass Torus Knot */}
      <Float speed={1.5} rotationIntensity={2} floatIntensity={2} position={[7, -2, -15]}>
        <TorusKnot args={[1.5, 0.4, 128, 32]} rotation={[Math.PI / 6, 0, 0]}>
          <meshPhysicalMaterial
            color="#ffffff"
            transmission={0.95}
            opacity={1}
            transparent={true}
            metalness={0.1}
            roughness={0.05}
            ior={1.5}
            thickness={2}
            envMapIntensity={1}
            clearcoat={1}
          />
        </TorusKnot>
      </Float>

      {/* Frosted Purple Sphere */}
      <Float speed={2.5} rotationIntensity={0.5} floatIntensity={1.5} position={[-8, -5, -18]}>
        <Sphere args={[1.5, 64, 64]} rotation={[0, Math.PI / 4, 0]}>
          <meshPhysicalMaterial
            color="#7c3aed"
            transmission={0.8}
            opacity={1}
            transparent={true}
            metalness={0.3}
            roughness={0.2}
            ior={1.4}
            thickness={1.5}
            clearcoat={0.5}
          />
        </Sphere>
      </Float>
      
      {/* Distant Small Glass Icosahedron */}
      <Float speed={1} rotationIntensity={2} floatIntensity={1} position={[8, 5, -25]}>
        <Icosahedron args={[2, 1]}>
          <meshPhysicalMaterial
            color="#c4b5fd"
            transmission={0.9}
            opacity={1}
            transparent={true}
            metalness={0.2}
            roughness={0.1}
            ior={1.3}
            thickness={1}
          />
        </Icosahedron>
      </Float>
    </>
  );
}
