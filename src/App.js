import "./styles.css";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import Model from "./Model";

const GROUND_HEIGHT = -50;

function Loading() {
  return (
    <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        opacity={0.6}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}

function BoxShip() {
  const [shipPosition, setShipPosition] = useState();

  const ship = useRef();
  useFrame(({ mouse }) => {
    setShipPosition({
      position: { x: mouse.x * 6, y: mouse.y * 2 },
      rotation: { z: -mouse.x * 0.5, x: -mouse.x * 0.5, y: -mouse.y * 0.2 }
    });
  });
  // Update the ships position from the updated state.
  useFrame(() => {
    if (shipPosition) {
      ship.current.rotation.z = shipPosition.rotation.z;
      ship.current.rotation.y = shipPosition.rotation.x;
      ship.current.rotation.x = shipPosition.rotation.y;
      ship.current.position.y = shipPosition.position.y;
      ship.current.position.x = shipPosition.position.x;
    }
  });
  return (
    <mesh ref={ship} onClick={() => console.log(ship.current, shipPosition)}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"#D90368"} />
    </mesh>
  );
}

function Terrain() {
  const terrain = useRef();

  useFrame(() => {
    terrain.current.position.z += 0.4;
  });
  return (
    <mesh
      visible
      position={[0, GROUND_HEIGHT, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      ref={terrain}
    >
      <planeBufferGeometry attach="geometry" args={[5000, 5000, 128, 128]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        roughness={1}
        metalness={0}
        wireframe
      />
    </mesh>
  );
}

//environment presetd: sunset, dawn, night, warehouse, forest, apartment, studio, city, park, lobby
// <Environment preset="sunset" background />
// <Environment preset="forest" background />
// <OrbitControls />
export default function App() {
  return (
    <div className="App">
      <Canvas style={{ background: "#171717" }}>
        <directionalLight intensity={0.5} />
        <Suspense fallback={<Loading />}>
          <BoxShip />
          <Model />
        </Suspense>
        <Terrain />
      </Canvas>
    </div>
  );
}
