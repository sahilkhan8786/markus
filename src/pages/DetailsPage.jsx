import React from 'react';
import { motion } from 'framer-motion';
import { FirstPageDetais } from '../constant';
import { childVariants, containerVariants } from '../lib/animation';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
const DetailsPage = () => {
    const { details: markerId } = useParams(); // Retrieve markerId from the URL
    const navigate = useNavigate();
    return (
        <section className="mx-auto max-w-screen-2xl  flex items-start justify-end">
            <div className='w-full bg-white text-black py-6'>

                <button
                    className='bg-blue-500 text-white p-2 rounded-md mb-4'
                    onClick={() => navigate(-1)} // Go back to the last visited page
                >
                    Go Back
                </button>
                {FirstPageDetais.filter(el => el.id === markerId).map(el => (
                    <motion.div
                        key={el.id}
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className='flex flex-col gap-2'
                    >
                        {el?.heading && (
                            <h1 className=' font-semibold sm:text-4xl uppercase text-center my-5 underline text-3xl'>
                                {el.heading}
                            </h1>
                        )}
                        {el?.detailBeforeVideo?.split(',').map(para => (
                            <motion.p variants={childVariants} key={para}>
                                {para}
                            </motion.p>
                        ))}
                        {el?.videoURL && (
                            <motion.div variants={childVariants}>
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
                        {el.detailsAfterVideo?.split(',').map(para => (
                            <motion.p variants={childVariants} key={para}>
                                {para}
                            </motion.p>
                        ))}
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default DetailsPage;
