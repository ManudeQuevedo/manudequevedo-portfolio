"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

interface CameraControllerProps {
  startZ?: number;
  baseZ?: number;
  active?: boolean;
}

export default function CameraController({
  startZ = 20,
  baseZ = 8,
  active = false,
}: CameraControllerProps) {
  const { camera } = useThree();
  const scroll = useScroll();

  // Ref to track if intro is done for smooth transition
  const introProgress = useRef(0);

  useFrame((state, delta) => {
    // Current scroll progress (0 to 1)
    const r1 = scroll.range(0, 1);

    // Pilot Flight Logic: Scroll Down = Move Forward (Negative Z)
    // Range: Starts at baseZ (10) and moves 20 units forward to (10 - 20 = -10)
    const targetZ = -r1 * 20;

    // Intro Animation
    // If NOT active, we stay at startZ (or interpolate there)
    // If active, we interpolate to baseZ + scroll

    let desiredZ = startZ;

    if (active) {
      // Lerp functionality
      introProgress.current = THREE.MathUtils.lerp(
        introProgress.current,
        1,
        delta * 0.8
      );

      // Blend between startZ and (baseZ + targetZ)
      desiredZ = THREE.MathUtils.lerp(
        startZ,
        baseZ + targetZ,
        introProgress.current
      );
    } else {
      introProgress.current = 0;
      desiredZ = startZ;
    }

    // Apply position
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, desiredZ, 0.1);
  });

  return null;
}
