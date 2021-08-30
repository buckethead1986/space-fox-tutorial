import "./styles.css";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import Model from "./Model";

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

//  function Model() {
//   const group = useRef();
//   const { nodes, materials } = useGLTF("/Poimandres.gltf");
//   useFrame(() => {
//     console.log("working");
//   });
//
//   return (
//     <group ref={group} {...props} dispose={null} scale={0.4}>
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Curve007_1.geometry}
//         material={materials["Material.001"]}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Curve007_2.geometry}
//         material={materials["Material.002"]}
//       />
//     </group>
//   );
// }

// <Environment preset="sunset" background />
export default function App() {
  return (
    <div className="App">
      <Canvas style={{ background: "#171717" }}>
        <directionalLight intensity={0.5} />
        <Suspense fallback={<Loading />}>
          <Model />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
}
