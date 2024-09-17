import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const ParkPanorama = () => {
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const navigate = useNavigate();
    const handleMouseEnter = () => {
        setOverlayVisible(true); // Show overlay on hover
    };

    const handleMouseLeave = () => {
        setOverlayVisible(false); // Hide overlay when not hovering
    };

    return (
        <div className="w-full h-screen relative">
            <button
                className='absolute bottom-0 bg-blue-500 text-white p-2 rounded-md mb-4'
                onClick={() => navigate(-1)} // Go back to the last visited page
            >
                Go Back
            </button>
            <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/fqID1Nc228U" // Replace with your YouTube video ID
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>

            <button
                className="absolute top-0 left-0 z-20 bg-blue-500 text-white p-3 text-3xl hover:bg-blue-600"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                Read More
            </button>

            {isOverlayVisible && (
                <div className="absolute bottom-0 left-0 w-full bg-black/55 text-white p-4">
                    <div className="overlay-content">
                        <h2>Dummy Text</h2>
                        <p>This is some dummy text that appears when you hover over the "Read More" button.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ParkPanorama;
