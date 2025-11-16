import { Canvas, useFrame } from "@react-three/fiber";
import { SpotLight, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

export default function Scene() {
  const lightRef = useRef<THREE.SpotLight>(null!);

  // Track mouse pos
  const mouse = { x: 0, y: 0 };

  const onMouseMove = (e: MouseEvent) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  };

  useFrame(() => {
    if (lightRef.current) {
      // map mouse coords to a nice movement range
      lightRef.current.position.x = mouse.x * 2 + 2;
      lightRef.current.position.y = 3;
      lightRef.current.position.z = mouse.y * 2 + 2;

      lightRef.current.target.position.set(0, 0, 0);
      lightRef.current.target.updateMatrixWorld();
    }
  });

  // Listen for mouse movement once
  if (typeof window !== "undefined") {
    window.addEventListener("mousemove", onMouseMove);
  }

  return (
    <Canvas shadows camera={{ position: [3, 2, 6], fov: 50 }}>
      {/* Grey wall */}
      <mesh position={[0, 1, -2]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#d0d3d6" />
      </mesh>

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#d0d3d6" />
      </mesh>

      {/* Spotlight */}
      <spotLight
        ref={lightRef}
        intensity={5}
        angle={0.6}
        penumbra={0.3}
        position={[2, 3, 2]}
        castShadow
      />

      <ambientLight intensity={0.1} />

      {/* Optional camera controls */}
      <OrbitControls />
    </Canvas>
  );
}
