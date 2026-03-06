"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import * as THREE from "three";

interface StarfieldLayerProps {
  count: number;
  speedMultiplier: number;
  color: string;
  size: number;
  opacityFactor: number;
  radius: number;
}

function StarfieldLayer({
  count,
  speedMultiplier,
  color,
  size,
  opacityFactor,
  radius,
}: StarfieldLayerProps) {
  const mesh = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    const extra = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Random positions inside a large cylinder/box volume along Z
      const x = (Math.random() - 0.5) * radius;
      const y = (Math.random() - 0.5) * radius;
      const z = (Math.random() - 0.5) * radius;

      temp[i * 3] = x;
      temp[i * 3 + 1] = y;
      temp[i * 3 + 2] = z;

      extra[i * 3] = Math.random(); // size variation
      extra[i * 3 + 1] = Math.random(); // speed variation
      extra[i * 3 + 2] = Math.random(); // alpha variation
    }
    return { positions: temp, extra };
  }, [count, radius]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSpeed: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uBaseSize: { value: size },
      uOpacityFactor: { value: opacityFactor },
    }),
    [color, size, opacityFactor]
  );

  const scroll = useScroll();

  useFrame((state) => {
    if (mesh.current && mesh.current.material instanceof THREE.ShaderMaterial) {
      mesh.current.material.uniforms.uTime.value = state.clock.elapsedTime;

      const targetSpeed = scroll ? scroll.delta * 20 * speedMultiplier : 0;

      mesh.current.material.uniforms.uSpeed.value = THREE.MathUtils.lerp(
        mesh.current.material.uniforms.uSpeed.value,
        targetSpeed,
        0.1
      );
    }
  });

  const vertexShader = `
    uniform float uTime;
    uniform float uSpeed;
    uniform float uBaseSize;
    uniform float uOpacityFactor;
    attribute vec3 aExtra;
    varying float vAlpha;
    
    void main() {
      vec3 pos = position;
      
      // Z movement loop
      // Slower base movement + speed boost
      float zOffset = (uTime * 1.0 + uSpeed * 50.0) * (0.5 + aExtra.y);
      pos.z = mod(pos.z + zOffset + 50.0, 100.0) - 50.0;
      
      // Stretch warp
      // float stretch = 1.0 + (uSpeed * 5.0);
      
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      
      gl_PointSize = (uBaseSize * (0.5 + aExtra.x) + uSpeed * 10.0) * (1.0 / -mvPosition.z);
      
      gl_Position = projectionMatrix * mvPosition;
      
      // Fog/Fade edges
      float dist = abs(pos.z);
      vAlpha = (1.0 - smoothstep(30.0, 50.0, dist)) * aExtra.z * uOpacityFactor;
    }
  `;

  const fragmentShader = `
    uniform vec3 uColor;
    varying float vAlpha;
    
    void main() {
      vec2 center = gl_PointCoord - 0.5;
      float dist = length(center);
      if (dist > 0.5) discard;
      
      float glow = 1.0 - (dist * 2.0);
      
      gl_FragColor = vec4(uColor, vAlpha * glow);
    }
  `;

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
          args={[particles.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aExtra"
          count={particles.extra.length / 3}
          array={particles.extra}
          itemSize={3}
          args={[particles.extra, 3]}
        />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function Starfield() {
  return (
    <group>
      {/* Layer 1: Distant, many, white/grey */}
      <StarfieldLayer
        count={3000}
        radius={100}
        size={30.0}
        speedMultiplier={1.0}
        color="#cbd5e1" // slate-300
        opacityFactor={0.5}
      />
      {/* Layer 2: Close, fewer, blue/purple/cyan */}
      <StarfieldLayer
        count={500}
        radius={80}
        size={60.0}
        speedMultiplier={1.5}
        color="#818cf8" // indigo-400
        opacityFactor={0.8}
      />
    </group>
  );
}
