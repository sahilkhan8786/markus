import React from 'react';
import { Html } from '@react-three/drei';
import { motion } from 'framer-motion'

const Marker = ({ rotation, position, markerSrc, setShowOverlay, id }) => {

    function showOverlayHandler(id) {
        setShowOverlay(id)
    }


    return (
        <Html position={position} rotation={rotation} transform >
            <motion.div
                onClick={() => showOverlayHandler(id)}
                className="relative  cursor-pointer bg-green-200 size-52 rounded-full"
                whileHover={{ scale: 1.05 }}
            >
                <motion.h1
                    className="text-6xl uppercase bg-green-200 absolute  whitespace-nowrap p-3"
                    initial={{ y: 40, x: 180 }}
                    whileHover={{ y: -30, x: 220 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                >
                    Click for Details
                </motion.h1>

                <motion.img
                    src={markerSrc}
                    alt="Magnified"
                    className="w-36 h-36 p-3 "
                    initial={{ y: 20 }}
                    animate={{ scale: [2, 2.5, 2] }} // Continuous rotation
                    transition={{
                        repeat: Infinity, // Infinite loop
                        duration: 1, // Rotation duration (5 seconds for one full rotation)
                        ease: "linear" // Linear easing for smooth rotation
                    }}
                />
            </motion.div>
        </Html>


    );
};

export default Marker;
