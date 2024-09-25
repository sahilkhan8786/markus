import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const ParkPanorama = () => {
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const navigate = useNavigate();
    const handleMouseEnter = () => {
        setOverlayVisible(prev => !prev); // Show overlay on hover
    };


    return (
        <div className="w-full h-screen relative">
            <button
                className='absolute bottom-20 bg-blue-500 text-white p-2 rounded-md m-4 right-0 text-3xl hover:bg-blue-600'
                onClick={() => navigate(-1)} // Go back to the last visited page
            >
                Zurück
            </button>
            <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/fqID1Nc228U?autoplay=1" // Replace with your YouTube video ID
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>

            <button
                className="absolute bottom-0 right-0 z-20 bg-blue-500 text-white p-3 text-3xl m-4 hover:bg-blue-600 rounded-lg"
                onClick={handleMouseEnter}

            >
                Weitere Infos
            </button>

            {isOverlayVisible && (
                <div className="absolute bottom-0 left-0 w-full bg-black/55 text-white p-4 h-1/2 ">
                    <div className="max-w-screen-lg mx-auto leading-loose text-2xl tracking-wide">

                        <p> Während wir hier so gemütlich durch den Park radeln, fällt euch bestimmt die frische Luft auf, oder? Das ist kein Zufall! Wisst ihr, Autos brauchen Benzin zum Fahren und Stoßen dabei Abgase aus, die unsere Luft verschmutzen. Das ist schlecht für uns und die Natur. Fahrräder sind da ganz anders! Wir brauchen nur unsere eigene Energie und pusten keine schädlichen Abgase in die Luft. Wenn wir also öfter Fahrrad fahren, schützen wir die Luft und halten sie sauber. Und ganz nebenbei macht Fahrradfahren auch noch richtig viel Spaß, findet ihr nicht?</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ParkPanorama;
