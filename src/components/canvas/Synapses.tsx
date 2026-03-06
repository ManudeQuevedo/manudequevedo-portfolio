"use client";

import { useMemo } from "react";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { projects, Project } from "@/lib/data";

export default function Synapses() {
  const connections = useMemo(() => {
    const lines: { start: THREE.Vector3; end: THREE.Vector3; color: string }[] =
      [];

    // Group projects by category
    const byCategory: Record<string, Project[]> = {};
    projects.forEach((p) => {
      if (!byCategory[p.category]) byCategory[p.category] = [];
      byCategory[p.category].push(p);
    });

    // Create lines between all nodes in the same category (fully connected graph for now, or sequential?)
    // Let's do a simple sequential path for cleaner visuals: 1 -> 2 -> 3
    Object.entries(byCategory).forEach(([cat, projs]) => {
      // Sort by Z position to connect them in order of depth roughly
      projs.sort((a, b) => b.position[2] - a.position[2]);

      const color =
        cat === "web" ? "#06b6d4" : cat === "mobile" ? "#a855f7" : "#ec4899"; // cyan, purple, pink

      for (let i = 0; i < projs.length - 1; i++) {
        lines.push({
          start: new THREE.Vector3(...projs[i].position),
          end: new THREE.Vector3(...projs[i + 1].position),
          color,
        });
      }
    });

    return lines;
  }, []);

  return (
    <group>
      {connections.map((line, i) => (
        <Line
          key={i}
          points={[line.start, line.end]}
          color={line.color}
          lineWidth={1}
          transparent
          opacity={0.3}
        />
      ))}
    </group>
  );
}
