"use client";

import { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface CameraRigProps {
  children: React.ReactNode;
}

// CameraRig adds mouse parallax or idle drift to the full 3D world group.
export default function CameraRig({ children }: CameraRigProps) {
  const group = useRef<THREE.Group>(null);
  const { camera } = useThree();

  // Mouse position
  const mouse = useRef({ x: 0, y: 0 });
  const isMobile = useRef(false);

  // Drift for mobile/idle
  const driftRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize to -1 to 1
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    // Simple mobile detection
    isMobile.current = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;

    // Mobile/Idle "Drift"
    driftRef.current += delta * 0.05;
    const driftX = Math.sin(driftRef.current) * 0.1;
    const driftY = Math.cos(driftRef.current * 0.8) * 0.1;

    if (isMobile.current) {
      // Just drift
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        driftX,
        0.05
      );
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        driftY,
        0.05
      );
    } else {
      // Desktop Parallax
      // Reverse Parallax: Mouse goes UP (positive Y), Camera rotates DOWN (negative X)
      // Group rotation is opposite to camera movement feel

      const targetRotX = -mouse.current.y * 0.1;
      const targetRotY = -mouse.current.x * 0.1;

      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        targetRotX,
        0.05
      );
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        targetRotY,
        0.05
      );
    }
  });

  return <group ref={group}>{children}</group>;
}
