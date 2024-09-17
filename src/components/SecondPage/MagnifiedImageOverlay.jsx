import React, { useState, useEffect } from 'react';
import magnifierImage from '/magnifier.png'
const MagnifiedImageOverlay = ({ image, setMagnifiedImageOverlay, markerId, onReadMore }) => {
    const [showDetails, setShowDetails] = useState(false); // State for showing details

    useEffect(() => {
        setShowDetails(false); // Reset details view when markerId changes
    }, [markerId]);

    return (
        <div className='w-full h-screen absolute top-0 left-0 bg-black/45 backdrop-blur-sm flex items-center justify-center flex-col  z-50' onClick={() => setMagnifiedImageOverlay(false)}>
            <img onClick={() => onReadMore()} src={magnifierImage} alt="" className='size-[400px] cursor-pointer' />
            {/* <span
                className='absolute top-0 right-0 m-3 p-3 text-5xl hover:scale-125 transition-all cursor-pointer'
                
            >
                X
            </span> */}
            <img src={image} alt="" />
            {/* <button
                className='bg-green-600 p-3 border-2 border-transparent hover:bg-transparent transition-all hover:border-green-600 text-white cursor-pointer'
                onClick={() => onReadMore()} // Trigger navigation when "Read More" is clicked
            >
                Read More
            </button> */}
        </div>
    );
};

export default MagnifiedImageOverlay;
