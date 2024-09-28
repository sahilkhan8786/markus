import React from 'react';
import { motion } from 'framer-motion';
import { FirstPageDetais } from '../constant';
import { childVariants, containerVariants } from '../lib/animation';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
const DetailsPage = () => {
    const { details: markerId } = useParams(); // Retrieve markerId from the URL
    const navigate = useNavigate();
    return (
        <section className="  flex items-start justify-end  px-4 ">
            <div className='w-full bg-white text-black py-6'>

                <button
                    className='bg-blue-500 text-white p-2 rounded-md mb-4'
                    onClick={() => navigate(-1)} // Go back to the last visited page
                >
                    Zurück
                </button>
                {FirstPageDetais.filter(el => el.id === markerId).map(el => (
                    <motion.div
                        key={el.id}
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className='flex flex-col gap-2 '
                    >
                        {el?.heading && (
                            <h1 className=' font-semibold sm:text-4xl uppercase text-center my-5 underline text-3xl text-[#679fda]'>
                                {el.heading}
                            </h1>
                        )}
                        {el?.videoURL && (
                            <motion.div variants={childVariants} className='bg-[#91a1cc]'>
                                <iframe
                                    className=' aspect-video mx-auto max-w-screen-2xl w-full md:w-[60%]'
                                    src={`https://www.youtube.com/embed/${el.videoURL}?autoplay=1&loop=1&playlist=${el.videoURL}&mute=1`}
                                    title="YouTube player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </motion.div>
                        )}
                        {el?.title &&
                            <motion.p variants={childVariants} className=' md:w-[60%] mx-auto max-w-screen-2xl w-full text-left  font-mullish font-bold mt-4'>
                                {el.title}
                            </motion.p>
                        }
                        {el?.detailBeforeVideo &&
                            <motion.p variants={childVariants} className=' md:w-[60%] mx-auto max-w-screen-2xl w-full text-left  font-mullish mt-4'>
                                {el.detailBeforeVideo}
                            </motion.p>
                        }
                        {el?.para1 &&
                            <motion.p variants={childVariants} className=' md:w-[60%] mx-auto max-w-screen-2xl w-full text-left  font-mullish  my-4'>
                                {el.para1}
                            </motion.p>
                        }
                        {el?.para2 &&
                            <motion.p variants={childVariants} className=' md:w-[60%] mx-auto max-w-screen-2xl w-full text-left  font-mullish  my-4'>
                                {el.para2}
                            </motion.p>
                        }
                        <div>

                            {el?.paraInnerHeading1 &&
                                <motion.p variants={childVariants} className=' md:w-[60%] mx-auto max-w-screen-2xl w-full text-left  font-mullish  '>
                                    {el.paraInnerHeading1}
                                </motion.p>
                            }
                            {el?.para3 &&
                                <motion.p variants={childVariants} className=' md:w-[60%] mx-auto max-w-screen-2xl w-full text-left  font-mullish d mb-4'>
                                    {el.para3}
                                </motion.p>
                            }
                        </div>
                        {el?.para4 &&
                            <motion.p variants={childVariants} className=' md:w-[60%] mx-auto max-w-screen-2xl w-[full text-left  font-mullish  my-4'>
                                {el.para4}
                            </motion.p>
                        }
                        {el?.innerHeading &&
                            <motion.p variants={childVariants} className=' md:w-[60%] mx-auto max-w-screen-2xl w-full text-left  font-mullish font-bold mt-4'>
                                {el?.innerHeading}
                            </motion.p>
                        }
                        <div className={`flex flex-col  ${el?.paraInnerHeading2 && 'my-3'}`}>

                            {el?.paraInnerHeading2 &&
                                <motion.p variants={childVariants} className=' md:w-[60%] mx-auto max-w-screen-2xl w-full text-left  font-mullish font-bold '>
                                    {el?.paraInnerHeading2}
                                </motion.p>
                            }
                            {el?.paraInnerHeading2Details &&
                                <motion.p variants={childVariants} className=' md:w-[60%] mx-auto max-w-screen-2xl w-full text-left  font-mullish '>
                                    {el?.paraInnerHeading2Details}
                                </motion.p>
                            }
                        </div>
                        <div className={`flex flex-col  ${el?.paraInnerHeading3 && 'my-3'}`}>

                            {el?.paraInnerHeading3 &&
                                <motion.p variants={childVariants} className=' md:w-[60%] mx-auto max-w-screen-2xl w-full text-left  font-mullish font-bold '>
                                    {el?.paraInnerHeading3}
                                </motion.p>
                            }
                            {el?.paraInnerHeading3Details &&
                                <motion.p variants={childVariants} className=' md:w-[60%] mx-auto max-w-screen-2xl w-full text-left  font-mullish '>
                                    {el?.paraInnerHeading3Details}
                                </motion.p>
                            }
                        </div>

                        <div className={`flex flex-col  ${el?.paraInnerHeading4 && 'my-3'}`}>

                            {el?.paraInnerHeading4 &&
                                <motion.p variants={childVariants} className=' md:w-[60%] mx-auto max-w-screen-2xl w-full text-left  font-mullish font-bold '>
                                    {el?.paraInnerHeading4}
                                </motion.p>
                            }
                            {el?.paraInnerHeading4Details &&
                                <motion.p variants={childVariants} className=' md:w-[60%] mx-auto max-w-screen-2xl w-full text-left  font-mullish '>
                                    {el?.paraInnerHeading4Details}
                                </motion.p>
                            }
                        </div>


                        {el?.detailsAfterVideo &&
                            <motion.p variants={childVariants} className=' md:w-[60%] mx-auto max-w-screen-2xl w-[60%] text-left  font-mullish'>
                                {el.detailsAfterVideo}
                            </motion.p>
                        }

                        {el?.moreDetailsAfterVideo &&
                            <motion.p variants={childVariants} className=' md:w-[60%] mx-auto max-w-screen-2xl w-[60%] text-left  font-mullish'>
                                {el?.moreDetailsAfterVideo}
                            </motion.p>
                        }
                        {el?.innerHeading1 &&
                            <motion.p variants={childVariants} className=' md:w-[60%] mx-auto max-w-screen-2xl w-[60%] text-left  font-mullish font-bold mb-6'>
                                {el?.innerHeading1}
                            </motion.p>
                        }

                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default DetailsPage;
