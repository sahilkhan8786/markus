import { useEffect, useRef } from 'react';

export default function ChromaKeyVideo({ videoUrl }) {
    const canvasRef = useRef(null);
    const videoRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const video = videoRef.current;

        // Function to apply chroma keying
        const applyChromaKey = () => {
            if (!video.paused && !video.ended) {
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const frame = context.getImageData(0, 0, canvas.width, canvas.height);
                const data = frame.data;

                // Iterate over each pixel
                for (let i = 0; i < data.length; i += 4) {
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];

                    // Chroma key color is '#01b140'
                    if (r > 0 && g > 175 && b < 60) {
                        // Replace green pixels with transparent
                        data[i + 3] = 0;
                    }
                }

                // Update the canvas with new image data
                context.putImageData(frame, 0, 0);
                requestAnimationFrame(applyChromaKey);
            }
        };

        video.addEventListener('play', applyChromaKey);

        // Cleanup on component unmount
        return () => {
            video.removeEventListener('play', applyChromaKey);
        };
    }, [videoUrl]);

    return (
        <div>
            <video
                ref={videoRef}
                src={videoUrl}
                crossOrigin="Anonymous"
                loop
                muted
                autoPlay
                style={{ display: 'none' }}
            />
            <canvas
                className='bg-red-400'
                ref={canvasRef}
                width="640" // Adjust canvas size as needed
                height="360" // Adjust canvas size as needed
            />
        </div>
    );
}
