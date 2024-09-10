import React, { useEffect, useRef } from 'react';

const AudioPlayer = ({ audio, isPlaying }) => {

    const audioRef = useRef(null);

    // Play or pause the audio when `isPlaying` changes
    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]); // Re-run when `isPlaying` changes

    return (
        <div>
            {/* Hidden Audio element */}
            <audio ref={audioRef} src={audio} className='hidden' />
        </div>
    );
};

export default AudioPlayer;
