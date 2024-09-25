import React, { useEffect, useRef, useState } from 'react';
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import image from '../assets/background/Air1.png';
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
import "@photo-sphere-viewer/markers-plugin/index.css";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// AUDIO FILES
import introAudioTom from '/tom-intro-audio.mp3'
import tom1Audio from '/tom-audio-1.mp3'
import tom2Audio from '/tom-audio-2.mp3'
import tom3Audio from '/tom-audio-3.mp3'
import parkAudio from '/park.mp3'
import treeAudio from '/html-marker-tree.mp3'
import carAudio from '/html-marker-car.mp3'
import skyAudio from '/html-marker-sky.mp3'
import galaxyAudio from '/html-marker-galaxy.mp3'
import introAudioLola from '/lola-intro-audio.mp3'

// VIDEO FILES
import tomWaving from '/Tom Waving550x500.mp4'
import tomTalkin from '/Tom Talkin550x500.mp4'
import lolaWaving from '/Lola Waving.mp4'
import lolaTalkin from '/Lola Talking.mp4'
import LogoModal from '../components/LogoModal';
import MagnifiedImageOverlay from '../components/MagnifiedImageOverlay';



const SecondPage = () => {
    const [showTomMarkers, setShowTomMarkers] = useState(false);
    const [tomVideo, setTomVideo] = useState(tomWaving)
    const [lolaVideo, setlolaVideo] = useState(lolaWaving)
    const [magnifiedImageOverlay, setMagnifiedImageOverlay] = useState(false)
    const [overlayImage, setOverlayImage] = useState(null);
    const [interactionTimeout, setInteractionTimeout] = useState(null);
    const [markerId, setMarkerId] = useState(null);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [currentAudioSrc, setCurrentAudioSrc] = useState(null);
    const [clickedMarkers, setClickedMarkers] = useState([]); // Track clicked markers

    const viewerRef = useRef(null);
    const markersPluginRef = useRef(null);
    const audioRef = useRef(null);
    const navigate = useNavigate();


    const excludedMarkers = ['video-greenscreen-tom', 'video-greenscreen-lola', 'html-message-icon-tom', 'html-message-icon-lola'];



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

    const baseMarkersPark = [
        {
            id: 'video-greenscreen-tom',
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
            id: 'video-greenscreen-lola',
            videoLayer: lolaVideo,
            position: { yaw: 2, pitch: 0 },
            chromaKey: {
                enabled: true,
                color: '#0ed006',
                similarity: 0.1,
                smoothness: 0.1
            },
            size: { width: 500, height: 550 },
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
            id: 'html-message-icon-tom',
            html: '<img class="gifs"  src="/speech-bubble.gif"  />',
            position: { yaw: -0.3, pitch: 0 },
            size: { width: 50, height: 50 },
            anchor: 'bottom center',


        },
        {
            id: 'html-message-icon-lola',
            html: '<img class="gifs"  src="/speech-bubble.gif"  />',
            position: { yaw: -4, pitch: 0 },
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

    const additionalMarkersPark = [

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
            id: 'marker-text-lola-intro',
            html: `
                <h1 class='character-intro scene-text'>
(hustet) Lola hustet... Puh, die Abgase der Autos verschmutzt die Luft. Es stinkt und ich bekomme kaum Luft!
                </h1>
            `,
            position: { yaw: 2.5, pitch: 0.25 },
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
            id: 'marker-text-lola-1',
            html: `
               <p class='scene-text'>
          Warum musst du so husten?
        </p>
            `,
            position: { yaw: 2.5, pitch: 0 },
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
            id: 'marker-text-lola-2',
            html: `
                <p class='scene-text'>
               Lass uns das Gelernte einmal zusammenfassen!
                 
                </p>
            `,
            position: { yaw: 2.5, pitch: -0.12 },
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




    const markerImages = {
        'html-marker-galaxy': '/html-marker-galaxy.jpg',
        'html-marker-sky': '/html-marker-sky.jpg',
        'html-marker-tree': '/html-marker-tree.png',
        'html-marker-car': '/html-marker-car.jpg',

        // Add more if needed
    };

    // Markers configuration


    // Combine baseMarkers and additionalMarkers, then filter out excluded ones
    const allMarkers = [...baseMarkersPark, ...additionalMarkersPark];

    const validMarkers = allMarkers.filter(marker => !excludedMarkers.includes(marker.id));


    const markerAudio = {
        'marker-text-tom-intro': introAudioTom,
        'marker-text-lola-intro': introAudioLola,
        'marker-text-tom-1': tom1Audio,
        'marker-text-tom-2': tom2Audio,
        'marker-text-tom-3': tom3Audio,
        'html-marker-tree': treeAudio,
        'html-marker-car': carAudio,
        'html-marker-galaxy': galaxyAudio,
        'html-marker-sky': skyAudio,
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


    // Stop current audio if playing
    const stopAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            audioRef.current = null; // Reset the audio reference
            setIsAudioPlaying(false); // Audio has ended
            setCurrentAudioSrc(null); // Reset current audio source
            setTomVideo(tomWaving); // Ensure the correct video path
            setlolaVideo(lolaWaving)
        }
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

        // Handle specific marker actions
        switch (markerId) {
            case 'html-message-icon-tom':
                await animateToMarker(0, -0.5);
                setShowTomMarkers(true);
                if (markersPluginRef.current) {
                    markersPluginRef.current.setMarkers([...baseMarkersPark, ...additionalMarkersPark]);
                }

                // Set a timeout to hide Tom markers later
                clearTimeout(interactionTimeout);
                const timeout = setTimeout(() => {
                    setShowTomMarkers(false);
                }, 20000);
                setInteractionTimeout(timeout);
                break;


            case 'html-message-icon-lola':
                await animateToMarker(0, -3.8);
                setShowTomMarkers(true);
                if (markersPluginRef.current) {
                    markersPluginRef.current.setMarkers([...baseMarkersPark, ...additionalMarkersPark]);
                }

                // Set a timeout to hide Tom markers later
                clearTimeout(interactionTimeout);
                const timeout2 = setTimeout(() => {
                    setShowTomMarkers(false);
                }, 20000);
                setInteractionTimeout(timeout2);
                break;

            case 'html-bike-icon':
                navigate('/park-panorama');
                break;

            // Check if the markerId is an additional marker
            case 'marker-text-tom-intro':
            case 'marker-text-lola-intro':
            case 'marker-text-tom-1':
            case 'marker-text-lola-1':
            case 'marker-text-tom-2':
            case 'marker-text-lola-2':
            case 'marker-text-tom-3':
                // Stop audio if playing
                stopAudio();

                const audioSrc = markerAudio[markerId];
                if (audioSrc) {
                    const newAudio = new Audio(audioSrc);
                    newAudio.play().catch((error) => {
                        console.error("Error playing audio:", error);
                    });

                    audioRef.current = newAudio;
                    setIsAudioPlaying(true);
                    setCurrentAudioSrc(audioSrc); // Track the current audio source

                    newAudio.addEventListener('ended', stopAudio);
                }
                // Do not set overlay image and do not show magnified overlay for additional markers
                break;

            default:
                stopAudio(); // Stop any currently playing audio

                const defaultAudioSrc = markerAudio[markerId];
                if (defaultAudioSrc) {
                    const newAudio = new Audio(defaultAudioSrc);
                    newAudio.play().catch((error) => {
                        console.error("Error playing audio:", error);
                    });

                    audioRef.current = newAudio;
                    setIsAudioPlaying(true);
                    setCurrentAudioSrc(defaultAudioSrc); // Track the current audio source

                    newAudio.addEventListener('ended', stopAudio);
                } else {
                    setTomVideo(tomWaving); // Ensure the correct video path
                    setlolaVideo(lolaWaving); // Ensure the correct video path
                }

                // Set overlay image and show magnified overlay for other markers
                if (!excludedMarkers.includes(markerId)) {
                    setOverlayImage(markerImages[markerId]);
                    setMagnifiedImageOverlay(true);
                }
                break;
        }
        if (!excludedMarkers.includes(markerId) && !clickedMarkers.includes(markerId)) {
            setClickedMarkers(prevState => [...prevState, markerId]); // Add clicked marker to the state
        }
    };


    // Stop audio when overlay is closed
    useEffect(() => {
        if (!magnifiedImageOverlay) {
            stopAudio();
        }
    }, [magnifiedImageOverlay]);



    useEffect(() => {
        if (markersPluginRef.current) {
            const markersPlugin = markersPluginRef.current;
            const allMarkers = [...baseMarkersPark];

            if (showTomMarkers) {
                allMarkers.push(...additionalMarkersPark);
            }

            markersPlugin.setMarkers(allMarkers);
        }
    }, [showTomMarkers]);

    useEffect(() => {
        if (isAudioPlaying && currentAudioSrc && currentAudioSrc !== parkAudio) {
            setTomVideo(tomTalkin);
            setlolaVideo(lolaTalkin);
        } else if (!isAudioPlaying) {
            setTomVideo(tomWaving);
            setlolaVideo(lolaWaving);
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
            const allMarkers = [...baseMarkersPark];

            if (showTomMarkers) {
                allMarkers.push(...additionalMarkersPark);
            }

            markersPlugin.setMarkers(allMarkers);
        }
    }, [showTomMarkers, tomVideo, lolaVideo]);

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
                plugins={[[MarkersPlugin, { markers: baseMarkersPark }]]}
                ref={viewerRef}
            />
            <div id="overlay" className="fade-in">
                {/* Your overlay content */}
            </div>


            {/* Display Progress */}
            <div className="progress-container">
                <p>{`Markers clicked: ${clickedMarkers.length} / ${validMarkers.length}`}</p>
                <progress value={clickedMarkers.length} max={validMarkers.length}></progress>
            </div>
            {magnifiedImageOverlay && (
                <MagnifiedImageOverlay
                    image={overlayImage}
                    setMagnifiedImageOverlay={setMagnifiedImageOverlay}
                    markerId={markerId} // Pass markerId as a prop
                    onReadMore={() => navigate(`/learn/${markerId}`)}
                />
            )}
            <LogoModal handleFullScreen={handleFullScreen} audio={parkAudio} />
        </div>
    );


};

export default SecondPage;