import React, { useEffect } from 'react';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';
import Marker from './Marker';
import magnifierImage from '../assets/magnifier.png'
import CycleCard from './CycleCard';

export const PanoramaViewer = ({ src, position, setShowOverlay }) => {
    const texture = useTexture(src);

    return (
        <group >
            {/* Panorama Background */}
            <mesh scale={[55, 55, 55]} position={position}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial map={texture} side={THREE.BackSide} />
            </mesh>

            {/* Markers */}
            {/* MARKER TREE */}
            <Marker
                id="TREE"
                setShowOverlay={setShowOverlay}
                position={[-38, 25, 25]}
                rotation={[0, Math.PI / 2, 0]}
                markerSrc={magnifierImage}

                scale={[4, 4, 4]} />
            {/* MARKER CAR */}
            <Marker
                id="CAR"
                setShowOverlay={setShowOverlay}
                position={[-60, 8, 20]}
                rotation={[0, Math.PI / 2, 0]}
                markerSrc={magnifierImage}
                scale={[2, 2, 2]} />

            {/* MARKER SKY -1 LEFT */}
            <Marker
                id="SKY"
                setShowOverlay={setShowOverlay}
                position={[60, 35, 20]}
                rotation={[0, -Math.PI / 2, 0]}
                markerSrc={magnifierImage}
                scale={[2, 2, 2]} />

            {/* MARKER SKY-2 RIGHT */}
            <Marker
                id="GALAXY"
                setShowOverlay={setShowOverlay}
                position={[-40, 50, 90]}
                rotation={[0, -Math.PI, 0]}
                markerSrc={magnifierImage}
                scale={[2, 2, 2]} />

            <CycleCard
                id="CYCLE"
                setShowOverlay={setShowOverlay}
            />


        </group>
    );
};
