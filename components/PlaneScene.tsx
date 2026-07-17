"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows } from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";

function Propeller() {
  const ref = useRef<Group>(null);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.x += delta * 18;
  });

  return (
    <group ref={ref} position={[2.08, 0, 0]}>
      <mesh>
        <boxGeometry args={[0.05, 1.7, 0.15]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.05, 1.7, 0.15]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
    </group>
  );
}

function Plane() {
  const ref = useRef<Group>(null);

  useFrame((state) => {
    const g = ref.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const targetZ = state.pointer.y * 0.18 + Math.sin(t * 0.6) * 0.07;
    const targetY = -0.55 + state.pointer.x * 0.25;
    g.rotation.z += (targetZ - g.rotation.z) * 0.05;
    g.rotation.y += (targetY - g.rotation.y) * 0.05;
  });

  return (
    <group ref={ref} position={[-0.12, -0.05, 0]} rotation={[0.06, -0.55, 0]} scale={0.82}>
      {/* Fuselage */}
      <mesh rotation={[0, 0, -Math.PI / 2]}>
        <cylinderGeometry args={[0.42, 0.26, 3.1, 32]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>
      {/* Capot moteur */}
      <mesh position={[1.78, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <cylinderGeometry args={[0.38, 0.45, 0.5, 32]} />
        <meshStandardMaterial color="#f97316" />
      </mesh>
      {/* Cône d'hélice */}
      <mesh position={[2.2, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.16, 0.34, 24]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      {/* Verrière */}
      <mesh position={[0.55, 0.38, 0]} scale={[0.6, 0.32, 0.4]}>
        <sphereGeometry args={[1, 24, 16]} />
        <meshStandardMaterial color="#0f172a" roughness={0.15} metalness={0.4} />
      </mesh>
      {/* Ailes hautes avec léger dièdre */}
      <mesh position={[0.25, 0.52, 1.15]} rotation={[-0.05, 0, 0]}>
        <boxGeometry args={[1.15, 0.09, 2.3]} />
        <meshStandardMaterial color="#38bdf8" />
      </mesh>
      <mesh position={[0.25, 0.52, -1.15]} rotation={[0.05, 0, 0]}>
        <boxGeometry args={[1.15, 0.09, 2.3]} />
        <meshStandardMaterial color="#38bdf8" />
      </mesh>
      {/* Saumons d'aile */}
      <mesh position={[0.25, 0.63, 2.38]} rotation={[-0.05, 0, 0]}>
        <boxGeometry args={[1.0, 0.09, 0.2]} />
        <meshStandardMaterial color="#f97316" />
      </mesh>
      <mesh position={[0.25, 0.63, -2.38]} rotation={[0.05, 0, 0]}>
        <boxGeometry args={[1.0, 0.09, 0.2]} />
        <meshStandardMaterial color="#f97316" />
      </mesh>
      {/* Empennage */}
      <mesh position={[-1.45, 0.05, 0]}>
        <boxGeometry args={[0.55, 0.07, 1.5]} />
        <meshStandardMaterial color="#38bdf8" />
      </mesh>
      <mesh position={[-1.5, 0.45, 0]}>
        <boxGeometry args={[0.5, 0.75, 0.07]} />
        <meshStandardMaterial color="#f97316" />
      </mesh>
      {/* Train d'atterrissage */}
      <mesh position={[0.5, -0.45, 0.4]} rotation={[0.3, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.5, 12]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
      <mesh position={[0.5, -0.45, -0.4]} rotation={[-0.3, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.5, 12]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
      <mesh position={[0.5, -0.7, 0.48]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.09, 24]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      <mesh position={[0.5, -0.7, -0.48]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.09, 24]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      <Propeller />
    </group>
  );
}

export default function PlaneScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.85, 8.4], fov: 42 }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      style={{ touchAction: "pan-y" }}
    >
      <hemisphereLight intensity={0.8} groundColor="#dbeafe" />
      <directionalLight position={[4, 6, 3]} intensity={1.6} />
      <directionalLight position={[-4, 2, -3]} intensity={0.4} />
      <Float speed={1.6} rotationIntensity={0.3} floatIntensity={0.9}>
        <Plane />
      </Float>
      <ContactShadows
        position={[0, -1.7, 0]}
        opacity={0.25}
        scale={9}
        blur={2.8}
        far={3}
        color="#0c4a6e"
      />
    </Canvas>
  );
}
