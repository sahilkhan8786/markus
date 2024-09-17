import React, { useEffect, useRef, useState } from 'react';
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import image from '../assets/background/Air1.png';
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
import "@photo-sphere-viewer/markers-plugin/index.css";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// AUDIO FILES
import introAudio from '/tom-intro-audio.mp3'
import tom1Audio from '/tom-audio-1.mp3'
import tom2Audio from '/tom-audio-2.mp3'
import tom3Audio from '/tom-audio-3.mp3'
import parkAudio from '/park.mp3'

// VIDEO FILES
import tomWaving from '/Tom Waving550x500.mp4'
import tomTalkin from '/Tom Talkin550x500.mp4'
import MagnifiedImageOverlay from '../components/SecondPage/MagnifiedImageOverlay';
import LogoModal from '../components/LogoModal';


const SecondPage = () => {
    const [showTomMarkers, setShowTomMarkers] = useState(false);
    const [tomVideo, setTomVideo] = useState(tomWaving)
    const [magnifiedImageOverlay, setMagnifiedImageOverlay] = useState(false)
    const [overlayImage, setOverlayImage] = useState(null);
    const [interactionTimeout, setInteractionTimeout] = useState(null);
    const [markerId, setMarkerId] = useState(null);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [currentAudioSrc, setCurrentAudioSrc] = useState(null);

    const viewerRef = useRef(null);
    const markersPluginRef = useRef(null);
    const audioRef = useRef(null);
    const navigate = useNavigate();


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


    const markerImages = {
        'html-marker-galaxy': '/path/to/galaxy-image.jpg',
        'html-marker-sky': '/path/to/sky-image.jpg',
        'html-marker-tree': '/path/to/tree-image.jpg',
        'html-marker-car': '/path/to/car-image.jpg',
        'html-plus-icon': '/path/to/plus-icon-image.jpg',
        'html-message-icon': '/path/to/message-icon-image.jpg',
        // Add more if needed
    };

    // Markers configuration
    const baseMarkers = [
        {
            id: 'video-greenscreen',
            videoLayer: tomVideo,
            position: { yaw: -0.6, pitch: 0 },
            chromaKey: {
                enabled: true,
                color: '#0ed006',
                similarity: 0.1,
                smoothness: 0.1
            },
            size: { width: 500 * 1.5, height: 550 * 1.5 },
        },
        {
            id: 'html-marker-galaxy',
            html: '<img class="gifs" src="/plus.gif"  />',
            position: { yaw: 0.4, pitch: 0.32 },
            size: { width: 50, height: 50 },
            anchor: 'bottom center',

        }, {
            id: 'html-marker-sky',
            html: '<img class="gifs" src="/plus.gif"  />',
            position: { yaw: -2.4, pitch: 0.3 },
            size: { width: 50, height: 50 },
            anchor: 'bottom center',

        },
        {
            id: 'html-marker-tree',
            html: '<img class="gifs"  src="/plus.gif"  />',
            position: { yaw: -1.5, pitch: 0.3 },
            size: { width: 50, height: 50 },
            anchor: 'bottom center',

        },
        {
            id: 'html-marker-car',
            html: '<img class="gifs" src="/plus.gif"  />',
            position: { yaw: -3.12, pitch: -0.08 },
            size: { width: 50, height: 50 },
            anchor: 'bottom center',

        },

        {
            id: 'html-message-icon',
            html: '<img class="gifs"  src="/speech-bubble.gif"  />',
            position: { yaw: -0.3, pitch: 0 },
            size: { width: 50, height: 50 },
            anchor: 'bottom center',


        },
        {
            id: 'html-bike-icon',
            html: '<img class="gifs"  src="/bike.gif"  />',
            position: { yaw: -2, pitch: -0.1 },
            size: { width: 150, height: 150 },
            anchor: 'bottom center',
            tooltip: `
                <div class="custom-tooltip">
                <img src="/cycle.jpeg" alt="Bike Tour Image" class="cycle-image" />
                    <p>Wir fahren mit dem Fahrrad! Kleine VR Tour mit dem Fahrrad. Umweltfreundlich, gesund und gut für die Luft!</p>
                </div>
            `,
            trigger: "click"


        },

        // Other static markers...
    ];

    const additionalMarkers = [

        // Additional markers that appear based on state {
        {
            id: 'marker-text-tom-intro',
            html: `
                <h1 class='character-intro scene-text'>
Hallo Kinder! Ich bin Tom von den RAKUNS und hier erfahrt ihr etwas über Luft und warum diese für alle Lebewesen wichtig ist

                    
                </h1>
            `,
            position: { yaw: -0.1, pitch: 0.25 },
            size: { width: 500, height: 100 },
            anchor: 'bottom left',

        },
        {
            id: 'marker-text-tom-1',
            html: `
               <p class='scene-text'>
          Warum benötigen Lebewesen Luft?
        </p>
            `,
            position: { yaw: -0.1, pitch: 0 },
            size: { width: 500, height: 100 },
            anchor: 'bottom left',
            zoom: [0.5, 1],
        },
        {
            id: 'marker-text-tom-2',
            html: `
                <p class='scene-text'>
                Wo sind wir hier?
                 
                </p>
            `,
            position: { yaw: -0.1, pitch: -0.12 },
            size: { width: 500, height: 100 },
            anchor: 'bottom left',
            zoom: [0.5, 1],
        },
        {
            id: 'marker-text-tom-3',
            html: `
                <p class='scene-text'>

             Was kann ich hier erkunden?
                 
                
                </p>
            `,
            position: { yaw: -0.1, pitch: -0.24 },
            size: { width: 500, height: 100 },
            anchor: 'bottom left',
            zoom: [0.5, 1],
        }
    ];



    const markerAudio = {
        'html-message-icon': introAudio,
        'marker-text-tom-intro': introAudio,
        'marker-text-tom-1': tom1Audio,
        'marker-text-tom-2': tom2Audio,
        'marker-text-tom-3': tom3Audio,
    };


    // Function to start the inactivity timer when additional markers are shown

    const animateToMarker = (pitch, yaw, duration = 500) => {
        return new Promise((resolve) => {
            const viewer = viewerRef.current;

            if (viewer) {
                viewer.animate({
                    pitch: pitch,
                    yaw: yaw,
                    speed: '40rpm',
                });

                setTimeout(() => {
                    resolve();
                }, duration);
            } else {
                resolve(); // Resolve immediately if viewer is not available
            }
        });
    };




    const handleMarkerClick = async (markerId) => {
        setMarkerId(markerId); // Set the marker ID

        const overlayElement = document.getElementById('overlay');
        if (overlayElement) {
            // Apply fade-in class to trigger opacity animation
            overlayElement.classList.add('fade-in');
            // Trigger reflow to apply the class
            overlayElement.offsetHeight; // Trigger reflow
            overlayElement.classList.add('fade-in-active');
        }

        // Animate to the marker position and wait for the animation to complete
        await animateToMarker(0, -0.5);

        if (markerId === 'html-message-icon') {
            // Start showing Tom markers and switch video
            setShowTomMarkers(true);
            setTomVideo(tomTalkin);

            if (markersPluginRef.current) {
                markersPluginRef.current.setMarkers([...baseMarkers, ...additionalMarkers]);
            }

            // Set a timeout to hide Tom markers later
            if (interactionTimeout) {
                clearTimeout(interactionTimeout);
            }

            const timeout = setTimeout(() => {
                setShowTomMarkers(false);
            }, 20000);

            setInteractionTimeout(timeout);
        } else if (markerId === 'html-bike-icon') {
            navigate('/park-panorama');
        } else if (markerImages[markerId]) {
            setOverlayImage(markerImages[markerId]);
            setMagnifiedImageOverlay(true);
        } else {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }

            const audioSrc = markerAudio[markerId];
            if (audioSrc) {
                const newAudio = new Audio(audioSrc);
                newAudio.play().then(() => {
                    setIsAudioPlaying(true); // Audio starts playing
                    setCurrentAudioSrc(audioSrc); // Track the current audio source
                });

                newAudio.addEventListener('ended', () => {
                    setIsAudioPlaying(false); // Audio has ended
                    setCurrentAudioSrc(null); // Reset current audio source
                    setTomVideo(tomWaving); // Ensure the correct video path
                });

                audioRef.current = newAudio;
            } else {
                setIsAudioPlaying(false); // No audio to play
                setCurrentAudioSrc(null); // Reset current audio source
                setTomVideo(tomWaving);
            }
        }
    };


    useEffect(() => {
        if (markersPluginRef.current) {
            const markersPlugin = markersPluginRef.current;
            const allMarkers = [...baseMarkers];

            if (showTomMarkers) {
                allMarkers.push(...additionalMarkers);
            }

            markersPlugin.setMarkers(allMarkers);
        }
    }, [showTomMarkers]);

    useEffect(() => {
        if (isAudioPlaying && currentAudioSrc && currentAudioSrc !== parkAudio) {
            setTomVideo(tomTalkin);
        } else if (!isAudioPlaying) {
            setTomVideo(tomWaving);
        }
    }, [isAudioPlaying, currentAudioSrc]);

    useEffect(() => {
        const initializeViewer = () => {
            const viewer = viewerRef.current;
            if (viewer) {
                const markersPlugin = viewer.getPlugin(MarkersPlugin);
                if (markersPlugin) {
                    markersPluginRef.current = markersPlugin;

                    markersPlugin.addEventListener('select-marker', (e) => {
                        const markerId = e.marker.config.id;


                        handleMarkerClick(markerId);
                    });

                    return () => markersPlugin.removeEventListener('select-marker');
                } else {
                    console.error('MarkersPlugin is not initialized.');
                }
            } else {
                console.error('Viewer ref is not initialized.');
            }
        };

        const timer = setTimeout(initializeViewer, 1000);
        return () => {
            clearTimeout(timer);
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };
    }, []);

    useEffect(() => {
        if (markersPluginRef.current) {
            const markersPlugin = markersPluginRef.current;
            const allMarkers = [...baseMarkers];

            if (showTomMarkers) {
                allMarkers.push(...additionalMarkers);
            }

            markersPlugin.setMarkers(allMarkers);
        }
    }, [showTomMarkers, tomVideo]);

    return (
        <div ref={pageRef}>
            <ReactPhotoSphereViewer
                src={image}
                height={"100vh"}
                width={"100%"}
                defaultZoomLvl={0.8}
                minFov={10}
                maxFov={90}
                defaultYaw={-0.5}
                defaultPitch={0}
                moveSpeed={0.5}
                plugins={[[MarkersPlugin, { markers: baseMarkers }]]}
                ref={viewerRef}
            />
            <div id="overlay" className="fade-in">
                {/* Your overlay content */}
            </div>
            {magnifiedImageOverlay && (
                <MagnifiedImageOverlay
                    image={overlayImage}
                    setMagnifiedImageOverlay={setMagnifiedImageOverlay}
                    markerId={markerId} // Pass markerId as a prop
                    onReadMore={() => navigate(`/learn/${markerId}`)} // Redirect on "Read More" click
                />
            )}
            <LogoModal handleFullScreen={handleFullScreen} audio={parkAudio} />
        </div>
    );


};

export default SecondPage;