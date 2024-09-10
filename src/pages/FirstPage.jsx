import React, { Suspense, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import image from '../assets/background/Air1.png';
import Lola from '../components/Models/Lola';
import { PanoramaViewer } from '../components/PanoramaViewer';
import Text3D from '../components/Text3D';
import Tom from '../components/Models/Tom';
import { DataLola, DataTom, FirstPageDetais } from '../constant';
import DetailsOverlay from '../components/DetailsOverlay';
import { motion } from 'framer-motion';
import { childVariants, containerVariants } from '../lib/animation';
import LogoModal from '../components/LogoModal';
import audio from '../assets/audios/park.mp3';
import GreenScreenRemoval from '../components/SecondPage/GreenScreenRemoval';

function FirstPage() {
    const [showOverlay, setShowOverlay] = useState(null);
    const pageRef = useRef(null);

    // Toggle fullscreen mode
    const handleFullScreen = () => {
        if (pageRef.current) {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                pageRef.current.requestFullscreen();
            }
        }
    };

    // Reverse rotation direction in OrbitControls


    return (
        <Suspense fallback={<div className='flex items-center justify-center w-full h-screen'>Loading...</div>}>
            <div ref={pageRef} className="relative w-screen h-screen select-none">
                <Canvas className='z-20'>
                    {/* Panorama Background */}
                    <PanoramaViewer src={image} position={[0, 1.41, 16]} setShowOverlay={setShowOverlay} />
                    <ambientLight intensity={2} />
                    {/* Orbit Controls */}
                    <OrbitControls autoRotate={true} autoRotateSpeed={0.05} reverseOrbit={true} maxDistance={12} minDistance={10} maxPolarAngle={Math.PI} minPolarAngle={0} enablePan={false} enableDamping={true} />
                    {/* 3D Models and Text */}
                    <Lola scale={[12, 12, 12]} position={[-8, -12, -20]} rotation={[-0.1, 0, 0]} />
                    <Text3D
                        position={[10, 1.2, -18]}
                        scale={[2.5, 2.5, 2.5]}
                        data={DataLola}
                        heading={"(hustet) Lola hustet... Puh, die Abgase der Autos verschmutzt die Luft. Es stinkt und ich bekomme kaum Luft!"}
                    />
                    {/* <Tom position={[8, -12, 50]} scale={[12, 12, 12]} rotation={[0, 3, 0]} /> */}
                    {/* <Text3D
                        position={[25, 2, 45]}
                        scale={[3, 3, 3]}
                        rotation={[0, Math.PI, 0]}
                        data={DataTom}
                        heading={"Hallo Kinder! Ich bin Tom von den RAKUNS und hier erfahrt ihr etwas über Luft und warum diese für alle Lebewesen wichtig ist."}
                    /> */}

                </Canvas>
                <div className='absolute top-0 left-0 z-50'>
                    <video src={'06.webm'} width="640" height="360" loop autoPlay />

                </div>

                {showOverlay !== null && (
                    <section className="w-full h-screen absolute inset-0 z-50 overflow-y-scroll flex items-start justify-end" onClick={() => setShowOverlay(null)}>
                        <div className='xl:w-1/2 w-full bg-black xl:bg-black/70 py-6 h-screen'>
                            <DetailsOverlay setShowOverlay={setShowOverlay}>
                                {FirstPageDetais.filter(el => el.id === showOverlay).map(el => (
                                    <motion.div
                                        key={el.id}
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="show"
                                        className='flex flex-col gap-2'
                                    >
                                        {el?.heading && <h1 className='text-2xl font-semibold sm:text-4xl uppercase text-center my-5'>{el.heading}</h1>}
                                        {el?.detailBeforeVideo?.split(',').map(para => (
                                            <motion.p variants={childVariants} key={para}>{para}</motion.p>
                                        ))}
                                        {el.videoURL && (
                                            <motion.div variants={childVariants} className="">
                                                <iframe
                                                    className='w-full aspect-video h-full'
                                                    src={`https://www.youtube.com/embed/${el.videoURL}`}
                                                    title="YouTube video player"
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                ></iframe>
                                            </motion.div>
                                        )}
                                        {el?.detailsAfterVideo.split(',').map(para => (
                                            <motion.p variants={childVariants} key={para}>{para}</motion.p>
                                        ))}
                                    </motion.div>
                                ))}
                            </DetailsOverlay>
                        </div>
                    </section>
                )}
            </div>
            <LogoModal audio={audio} handleFullScreen={handleFullScreen} />
        </Suspense>
    );
}

export default FirstPage;
