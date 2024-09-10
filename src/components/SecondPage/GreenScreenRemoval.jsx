import React, { useEffect, useRef } from 'react';

const GreenScreenRemoval = ({ videoSrc }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const onOpenCvReady = () => {
            video.addEventListener('play', () => {
                const processFrame = () => {
                    if (video.paused || video.ended) return;

                    // Set canvas size to video size
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;

                    // Draw video frame onto canvas
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                    // Get image data from canvas
                    const src = cv.imread(canvas);
                    const dst = new cv.Mat();
                    const hsv = new cv.Mat();
                    const mask = new cv.Mat();

                    // Convert BGR to HSV
                    cv.cvtColor(src, hsv, cv.COLOR_BGR2HSV);

                    // Define green color range in HSV
                    const lowerGreen = new cv.Mat(hsv.rows, hsv.cols, hsv.type(), [35, 50, 50, 0]); // Lower bound for green color
                    const upperGreen = new cv.Mat(hsv.rows, hsv.cols, hsv.type(), [85, 255, 255, 255]); // Upper bound for green color

                    // Create a mask for the green screen
                    cv.inRange(hsv, lowerGreen, upperGreen, mask);

                    // Invert mask to keep only non-green parts
                    cv.bitwise_not(mask, mask);
                    cv.bitwise_and(src, src, src, mask);

                    // Show the result on canvas
                    cv.imshow(canvas, src);

                    // Release resources
                    src.delete();
                    hsv.delete();
                    mask.delete();
                    lowerGreen.delete();
                    upperGreen.delete();

                    requestAnimationFrame(processFrame);
                };

                processFrame();
            });
        };

        // Ensure OpenCV.js is loaded
        if (typeof cv !== 'undefined') {
            onOpenCvReady();
        } else {
            const script = document.createElement('script');
            script.src = 'https://docs.opencv.org/4.x/opencv.js';
            script.async = true;
            script.onload = onOpenCvReady;
            document.body.appendChild(script);
        }

        // Cleanup on unmount
        return () => {
            video.removeEventListener('play', () => { });
        };
    }, [videoSrc]);

    return (
        <div>
            <video ref={videoRef} src={videoSrc} width="640" height="360" autoPlay />
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        </div>
    );
};

export default GreenScreenRemoval;
