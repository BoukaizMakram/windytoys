"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Center,
  ContactShadows,
  Float,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import { Box3, Vector3, type Group } from "three";

const MODEL_URL = "/rcvolare.glb";
/** Envergure cible en unités monde, calée sur l'ancienne maquette. */
const TARGET_WINGSPAN = 4.6;

function Plane() {
  const ref = useRef<Group>(null);
  const { scene, animations } = useGLTF(MODEL_URL);
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    Object.values(actions).forEach((action) => action?.reset().play());
  }, [actions]);

  const scale = useMemo(() => {
    const size = new Box3().setFromObject(scene).getSize(new Vector3());
    return TARGET_WINGSPAN / Math.max(size.x, size.y, size.z, 0.001);
  }, [scene]);

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
    <group ref={ref} position={[-0.12, -0.05, 0]} rotation={[0.06, -0.55, 0]}>
      <Center>
        {/* Export Blender : nez vers -Z, on l'oriente vers +X comme l'ancienne maquette. */}
        <group rotation={[0, -Math.PI / 2, 0]} scale={scale}>
          <primitive object={scene} />
        </group>
      </Center>
    </group>
  );
}

useGLTF.preload(MODEL_URL);

export default function PlaneScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.85, 8.4], fov: 42 }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      style={{ touchAction: "pan-y" }}
    >
      <hemisphereLight intensity={0.8} groundColor="#dde3fa" />
      <directionalLight position={[4, 6, 3]} intensity={1.6} />
      <directionalLight position={[-4, 2, -3]} intensity={0.4} />
      <Suspense fallback={null}>
        <Float speed={1.6} rotationIntensity={0.3} floatIntensity={0.9}>
          <Plane />
        </Float>
        <ContactShadows
          position={[0, -1.7, 0]}
          opacity={0.25}
          scale={9}
          blur={2.8}
          far={3}
          color="#1b2c88"
        />
      </Suspense>
    </Canvas>
  );
}
