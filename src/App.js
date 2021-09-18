import "./styles.css";
import {
  Canvas,
  useLoader,
  useFrame
  // extend,
  // useThree
} from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import Model from "./Model";

// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// extend({ OrbitControls });

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

  //'Ship' with box body and 2 'ears' that move together.
  // function MickeyMouseEarsBoxShip() {
  //   return (
  //     <mesh ref={ship}>
  //       <mesh onClick={() => console.log(ship.current, shipPosition)}>
  //         <boxBufferGeometry args={[1, 1, 1]} />
  //         <meshStandardMaterial color={"#D90368"} />
  //       </mesh>
  //       {ship.current && (
  //         <mesh>
  //           <mesh
  //             position={[
  //               ship.current.position.x - 2,
  //               ship.current.position.y + 2,
  //               ship.current.position.z - 5
  //             ]}
  //           >
  //             <sphereBufferGeometry args={[1, 16, 16]} />
  //             <meshLambertMaterial attach="material" color={"green"} />
  //           </mesh>
  //           <mesh
  //             position={[
  //               ship.current.position.x + 2,
  //               ship.current.position.y + 2,
  //               ship.current.position.z - 5
  //             ]}
  //           >
  //             <sphereBufferGeometry args={[1, 16, 16]} />
  //             <meshLambertMaterial attach="material" color={"green"} />
  //           </mesh>
  //         </mesh>
  //       )}
  //     </mesh>
  //   );
  // }

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

// const CameraControls = () => {
//   const { camera, gl: { domElement } } = useThree();
//   const controls = useRef();
//   useFrame(state => controls.current.update());
//   return <orbitControls ref={controls} args={[camera, domElement]} />;
// };

//environment presetd: sunset, dawn, night, warehouse, forest, apartment, studio, city, park, lobby
// <Environment preset="sunset" background />
// <Environment preset="forest" background />
// <OrbitControls />
export default function App() {
  return (
    <div className="App">
      <Canvas style={{ background: "#171717" }}>
        <OrbitControls
          enableZoom={false}
          maxAzimuthAngle={Math.PI / 4}
          maxPolarAngle={Math.PI}
          minAzimuthAngle={-Math.PI / 4}
          minPolarAngle={0}
        />

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
