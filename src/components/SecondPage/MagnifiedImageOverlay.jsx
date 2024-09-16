import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DetailsOverlay from '../DetailsOverlay';
import { FirstPageDetais } from '../../constant';
import { childVariants, containerVariants } from '../../lib/animation';


const MagnifiedImageOverlay = ({ image, setMagnifiedImageOverlay, markerId }) => {
    const [showOverlay, setShowOverlay] = useState(false); // State for showing the overlay
    const [showDetails, setShowDetails] = useState(false); // State for showing details

    useEffect(() => {
        // Reset the details view whenever the markerId changes
        setShowDetails(false);
    }, [markerId]);

    return (
        <div className='w-full h-screen absolute top-0 left-0 bg-white/5 flex items-center justify-center flex-col backdrop-blur-lg z-50'>
            <span
                className='absolute top-0 right-0 m-3 p-3 text-5xl hover:scale-125 transition-all cursor-pointer'
                onClick={() => setMagnifiedImageOverlay(false)}
            >
                X
            </span>
            <img src={image} alt="" />
            <button
                className='bg-green-600 p-3 border-2 border-transparent hover:bg-transparent transition-all hover:border-green-600 text-white cursor-pointer'
                onClick={() => setShowDetails(true)} // Show details overlay when clicked
            >
                Read More
            </button>

            {showDetails && (
                <section className="w-full absolute inset-0 z-50 overflow-y-scroll flex items-start justify-end" onClick={() => setShowDetails(false)}>
                    <div className='w-full bg-white text-black py-6'>
                        <DetailsOverlay setShowOverlay={setShowDetails}>
                            {FirstPageDetais.filter(el => el.id === markerId).map(el => (
                                <motion.div
                                    key={el.id}
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="show"
                                    className='flex flex-col gap-2'
                                >
                                    {el?.heading && (
                                        <h1 className='text-2xl font-semibold sm:text-4xl uppercase text-center my-5'>
                                            {el.heading}
                                        </h1>
                                    )}
                                    {el?.detailBeforeVideo?.split(',').map(para => (
                                        <motion.p variants={childVariants} key={para}>
                                            {para}
                                        </motion.p>
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
                                        <motion.p variants={childVariants} key={para}>
                                            {para}
                                        </motion.p>
                                    ))}
                                </motion.div>
                            ))}
                        </DetailsOverlay>
                    </div>
                </section>
            )}
        </div>
    );
};

export default MagnifiedImageOverlay;
