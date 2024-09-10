import { Html } from '@react-three/drei';
import React, { useState } from 'react';
import { motion } from "framer-motion"
export default function Text3D({ heading, data, ...props }) {
    // Example array of objects for the accordion content


    // State to manage the active section
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <mesh position={props.position} scale={props.scale} rotation={props.rotation}>
            <group>
                <Html transform>
                    <div
                        className=" p-4 rounded-xl w-[300px] shadow-xl select-none flex flex-col gap-2 text-xs "


                    >
                        <motion.h1
                            initial={{ y: 5 }}
                            whileHover={{
                                y: 0,
                                transition: {
                                    duration: 0.2,
                                    type: 'spring',
                                    stiffness: 400,
                                    repeat: Infinity
                                }
                            }}
                            className=" bg-white p-2 rounded-xl cursor-pointer">
                            {heading}
                        </motion.h1>
                        {data?.map((item, index) => (
                            <motion.div
                                initial={{ scale: 1 }}
                                whileHover={{
                                    scale: 1.2,
                                    transition: {
                                        duration: 0.2,
                                        type: 'spring',
                                        stiffness: 400,
                                        repeat: Infinity
                                    }
                                }}
                                key={item.id} className="bg-white rounded-xl    px-3 py-1 cursor-pointer  ">
                                <div
                                    className=" mb-2"
                                    onClick={() => toggleAccordion(index)}


                                >
                                    <h3>{item.title}</h3>
                                </div>
                                {activeIndex === index && (
                                    <div className="p-3 rounded-xl bg-gray-200">
                                        <p>{item.content}</p>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </Html>
            </group>
        </mesh>
    );
}
