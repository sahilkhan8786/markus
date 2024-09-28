import React, { useState, useEffect } from 'react';
import magnifierImage from '/magnifier.png';

const MagnifiedImageOverlay = ({ text, image, setMagnifiedImageOverlay, markerId, onReadMore }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [magnifierPos, setMagnifierPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        setShowDetails(false); // Reset details view when markerId changes
    }, [markerId]);

    const handleMouseMove = (e) => {
        const container = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX - container.left;
        const mouseY = e.clientY - container.top;

        const offsetX = (mouseX - container.width / 2) * 0.2; // Adjust sensitivity
        const offsetY = (mouseY - container.height / 2) * 0.2;

        setMagnifierPos({
            x: offsetX,
            y: offsetY,
        });
    };

    return (
        <div
            className='w-full h-screen absolute top-0 left-0 bg-black/45 backdrop-blur-sm z-50 overflow-hidden'
            onClick={() => setMagnifiedImageOverlay(false)}
            onMouseMove={handleMouseMove}
        >
            {/* Full-screen main image */}
            {/* <img
                src={image}
                alt=""
                className='w-full h-full object-cover' // Ensure the image covers the full screen
            /> */}

            {/* Clip path for magnifier effect */}

            <div
                className='absolute '
                style={{
                    top: `calc(50% + ${magnifierPos.y}px - 120px)`, // Adjust to center the clip path based on size
                    left: `calc(50% + ${magnifierPos.x}px + 120px)`,
                    width: '900px', // Size of the magnifier effect
                    height: '900px',
                    borderRadius: '50%', // Circular lens
                    overflow: 'hidden',
                    pointerEvents: 'none', // Prevent interaction
                    transform: 'translate(-50%, -50%)',
                    clipPath: 'circle(20%)', // Use a circle clip-path
                }}
            >
                <img
                    src={image}
                    alt=""
                    className='h-full w-full object-cover'
                    style={{
                        position: 'absolute',
                        top: `0%`, // Center the image
                        left: `0%`,
                        transform: `translate(${magnifierPos.x}px, ${magnifierPos.y}px)`, // Adjust position based on magnifier movement
                    }}
                />
            </div>

            {/* Magnifier glass icon */}
            <div className='relative flex items-center justify-center   w-[700px] h-[700px]  '
                style={{
                    top: `calc(50% + ${magnifierPos.y}px)`, // Center the magnifier icon
                    left: `calc(50% + ${magnifierPos.x}px)`, // Center the magnifier icon
                    transform: 'translate(-50%, -50%)',

                }}
            >

                <img
                    onClick={() => onReadMore()}

                    src={magnifierImage}
                    alt="Magnifier"
                    // style={{
                    //     top: `calc(50% + ${magnifierPos.y}px)`, // Center the magnifier icon
                    //     left: `calc(50% + ${magnifierPos.x}px)`, // Center the magnifier icon
                    //     transform: 'translate(-50%, -50%)',
                    // }}
                    className='cursor-pointer z-50 object-cover absolute ' // Adjust size as needed
                />
                <h1 className='z-50  absolute text-black font-mullish text-xl p-3 rounded-lg top-[40%] left-[48%] '
                //  style={{
                //     top: `calc(46% + ${magnifierPos.y}px)`, // Center the magnifier icon
                //     left: `calc(62% + ${magnifierPos.x}px)`, // Center the magnifier icon
                //     fontFamily: 'Mullish'
                // }}
                >Klicke um mehr zu
                    erfahren</h1>
                <p className='z-40 text-[#009ddb] bg-[#f4f5fa] absolute  w-1/2 text-4xl pr-12 p-3 rounded-lg top-10 left-0  rounded-br-full'
                //  style={{
                //     top: `calc(20% + ${magnifierPos.y}px)`, // Center the magnifier icon
                //     left: `calc(20% + ${magnifierPos.x}px)`, // Center the magnifier icon
                //     transform: 'translate(-50%, -50%)',

                // }}
                >{text}</p>

            </div>
        </div >
    );
};

export default MagnifiedImageOverlay;
