"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PlaceholderNodeProps {
  position: [number, number, number];
}

function getPositionSeed([x, y, z]: [number, number, number]) {
  return Math.abs(x * 12.9898 + y * 78.233 + z * 37.719) % 100;
}

// PlaceholderNode fills depth in the legacy scene with lightweight animated geometry.
export default function PlaceholderNode({ position }: PlaceholderNodeProps) {
  const mesh = useRef<THREE.Mesh>(null);

  // Use a deterministic seed so the motion stays stable across re-renders.
  const offset = useRef(getPositionSeed(position));

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime + offset.current;

    // Rotate
    mesh.current.rotation.x = t * 0.2;
    mesh.current.rotation.y = t * 0.3;

    // Bob
    mesh.current.position.y = position[1] + Math.sin(t * 0.5) * 0.2;
  });

  return (
    <mesh ref={mesh} position={position}>
      <icosahedronGeometry args={[1.5, 1]} />
      <meshStandardMaterial
        color="#ffffff"
        wireframe
        transparent
        opacity={0.1}
        roughness={0.5}
        metalness={1}
      />
    </mesh>
  );
}
