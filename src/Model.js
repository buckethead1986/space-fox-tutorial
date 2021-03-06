/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const [modelPosition, setModelPosition] = useState();
  const model = useRef();
  const { nodes, materials } = useGLTF("/Poimandres.gltf");
  // useFrame(() => {
  //   model.current.rotation.y += 0.004;
  // });

  useFrame(({ mouse }) => {
    setModelPosition({
      position: { x: mouse.x * 6, y: mouse.y * 2 },
      rotation: { z: -mouse.x * 0.5, x: -mouse.x * 0.5, y: -mouse.y * 0.2 }
    });
  });

  useFrame(() => {
    if (modelPosition) {
      model.current.rotation.z = modelPosition.rotation.z;
      model.current.rotation.y = modelPosition.rotation.x;
      model.current.rotation.x = modelPosition.rotation.y;
      model.current.position.y = modelPosition.position.y;
      model.current.position.x = modelPosition.position.x;
    }
  });

  return (
    <group ref={model} {...props} dispose={null} scale={0.4}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curve007_1.geometry}
        material={materials["Material.001"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curve007_2.geometry}
        material={materials["Material.002"]}
      />
    </group>
  );
}
// export default function Model(props) {
//   const group = useRef();
//   const { nodes, materials } = useGLTF("/Ship.gltf");
//   return (
//     <group ref={group} {...props} dispose={null} scale={0.4}>
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Cube.geometry}
//         material={materials["LowPolyColours"]}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Cube.geometry}
//         material={materials["LowPolyGlow"]}
//       />
//     </group>
//   );
// }

useGLTF.preload("/Poimandres.gltf");
