import React, { useEffect, useRef } from 'react';

const AudioPlayer = ({ audio, isPlaying }) => {

    const audioRef = useRef(null);

    // Play or pause the audio when `isPlaying` changes
    useEffect(() => {
        audioRef.current.play().then(() => {
            // Unmute the audio after a delay or on some user interaction.
            setTimeout(() => {
                audioRef.current.muted = false;
            }, 1000);
        }).catch(error => {
            console.log(error)
            console.log('Autoplay is blocked');
        });
    }, [isPlaying]);// Re-run when `isPlaying` changes

    return (
        <div>
            {/* Hidden Audio element */}
            <audio ref={audioRef} src={audio} className='hidden' />
        </div>
    );
};

export default AudioPlayer;
