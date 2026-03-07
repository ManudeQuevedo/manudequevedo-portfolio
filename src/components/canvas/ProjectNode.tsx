"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Html } from "@react-three/drei";
import * as THREE from "three";
import { Project } from "@/lib/data";

interface ProjectNodeProps {
  project: Project;
  onSelect: (project: Project) => void;
}

function getProjectSeed(project: Project) {
  return project.id * 17.173 + project.position[0] * 3.11 + project.position[2];
}

// ProjectNode is the interactive 3D representation for a project inside the experimental scene.
export default function ProjectNode({ project, onSelect }: ProjectNodeProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  // Seed the motion from project metadata so it remains deterministic.
  const offset = useRef(getProjectSeed(project));

  useFrame((state) => {
    if (!mesh.current) return;

    // Idle Animation: Bobbing
    const t = state.clock.elapsedTime + offset.current;
    mesh.current.position.y = project.position[1] + Math.sin(t * 0.5) * 0.5;

    // Rotation
    mesh.current.rotation.x = t * 0.1;
    mesh.current.rotation.y = t * 0.15;
  });

  return (
    <group position={new THREE.Vector3(...project.position)}>
      {/* Connector Line (Synapse) stub - extending downwards or to center? 
          For now just the node itself. 
      */}

      <mesh
        ref={mesh}
        onPointerOver={() => {
          document.body.style.cursor = "pointer";
          setHover(true);
        }}
        onPointerOut={() => {
          document.body.style.cursor = "default";
          setHover(false);
        }}
        onClick={() => onSelect(project)}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={hovered ? "#06b6d4" : "#e2e8f0"} // cyan-500 : slate-200
          emissive={hovered ? "#06b6d4" : "#000000"}
          emissiveIntensity={hovered ? 2 : 0}
          roughness={0.2}
          metalness={0.8}
          wireframe={!hovered}
        />
      </mesh>

      {/* Floating Label */}
      <Html
        position={[0, -1.5, 0]}
        center
        distanceFactor={15}
        className="pointer-events-none">
        <div
          className={`
            px-4 py-2 rounded-full border 
            transition-all duration-300 backdrop-blur-md
            ${
              hovered
                ? "bg-cyan-500/20 border-cyan-500 text-cyan-200 scale-110"
                : "bg-slate-900/50 border-slate-700 text-slate-400"
            }
        `}>
          <span className="text-sm font-bold tracking-widest uppercase">
            {project.title}
          </span>
        </div>
      </Html>
    </group>
  );
}
