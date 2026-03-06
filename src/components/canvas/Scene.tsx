"use client";

import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import Starfield from "./Starfield";
import CameraController from "./CameraController";
import ProjectNode from "./ProjectNode";
import Synapses from "./Synapses";
import CameraRig from "./CameraRig";
import PlaceholderNode from "./PlaceholderNode";
import { projects } from "@/lib/data";

interface SceneProps {
  introFinished: boolean;
}

export default function Scene({ introFinished }: SceneProps) {
  return (
    <Canvas className="w-full h-full block">
      <color attach="background" args={["#020617"]} />

      {/* Scroll Controls with 5 pages of scrollable content */}
      <ScrollControls pages={5} damping={0.2}>
        {/* Camera Controller handles the "Pilot" flight and "Warp" intro */}
        {/* startZ: 20 -> baseZ: 10. Scroll moves to -10. */}
        <CameraController active={introFinished} startZ={20} baseZ={10} />

        {/* Parallax Rig wrapping the world content */}
        <CameraRig>
          <Starfield />
          <Synapses />

          {/* Placeholder Nodes (Wireframe Spheres) */}
          <PlaceholderNode position={[-4, 0, 0]} />
          <PlaceholderNode position={[0, 0, 0]} />
          <PlaceholderNode position={[4, 0, 0]} />

          {/* Project Nodes */}
          {projects.map((project) => (
            <ProjectNode
              key={project.id}
              project={project}
              onSelect={(p) => console.log("Selected:", p.title)}
            />
          ))}
        </CameraRig>
      </ScrollControls>

      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
    </Canvas>
  );
}
