/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import tomScene from '../../assets/Models/Tom.glb'

export default function Tom(props) {
    const group = useRef()
    const { nodes, materials, animations } = useGLTF(tomScene)
    const { actions } = useAnimations(animations, group)

    useEffect(() => {
        actions["Waving"].play()
    }, [])
    return (
        <group ref={group} {...props} dispose={null}>
            <group name="Scene">
                <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
                    <group name="Tom_Body">
                        <skinnedMesh
                            name="Mesh"
                            geometry={nodes.Mesh.geometry}
                            material={materials['01___Default']}
                            skeleton={nodes.Mesh.skeleton}
                        />
                        <skinnedMesh
                            name="Mesh_1"
                            geometry={nodes.Mesh_1.geometry}
                            material={materials['01___Default01']}
                            skeleton={nodes.Mesh_1.skeleton}
                        />
                        <skinnedMesh
                            name="Mesh_2"
                            geometry={nodes.Mesh_2.geometry}
                            material={materials['01___Default02']}
                            skeleton={nodes.Mesh_2.skeleton}
                        />
                        <skinnedMesh
                            name="Mesh_3"
                            geometry={nodes.Mesh_3.geometry}
                            material={materials['01___Default03']}
                            skeleton={nodes.Mesh_3.skeleton}
                        />
                        <skinnedMesh
                            name="Mesh_4"
                            geometry={nodes.Mesh_4.geometry}
                            material={materials['01___Default09']}
                            skeleton={nodes.Mesh_4.skeleton}
                        />
                        <skinnedMesh
                            name="Mesh_5"
                            geometry={nodes.Mesh_5.geometry}
                            material={materials['07___Default']}
                            skeleton={nodes.Mesh_5.skeleton}
                        />
                        <skinnedMesh
                            name="Mesh_6"
                            geometry={nodes.Mesh_6.geometry}
                            material={materials.fdfg}
                            skeleton={nodes.Mesh_6.skeleton}
                        />
                        <skinnedMesh
                            name="Mesh_7"
                            geometry={nodes.Mesh_7.geometry}
                            material={materials.wire_204204204}
                            skeleton={nodes.Mesh_7.skeleton}
                        />
                    </group>
                    <primitive object={nodes['Top-Body_Pelvis']} />
                    <primitive object={nodes['Top-Body_LPlatform']} />
                    <primitive object={nodes['Top-Body_RPlatform']} />
                    <primitive object={nodes['Top-Body_LIKTarget']} />
                    <primitive object={nodes['Top-Body_RIKTarget']} />
                </group>
            </group>
        </group>
    )
}

useGLTF.preload(tomScene)
