import logo from '../assets/pages-logo.png';
import vrLogo from '../assets/vr-logo.png';
import fullScreenLogo from '../assets/full-screen-logo.png';
import audioStill from '../assets/audio-still.png';
import audioGif from '../assets/audio.gif';

import { useState } from 'react';
import AudioPlayer from './AudioPlyer';

function LogoModal({ audio, handleFullScreen }) {
    const [isPlaying, setIsPlaying] = useState(true);
    // Ref to the container for fullscreen


    // Toggle fullscreen mode



    return (
        <div className="absolute bottom-0 py-3 left-0 bg-white z-40 w-64 flex flex-col gap-2">
            {/* Audio player component */}
            <AudioPlayer audio={audio} setIsPlaying={setIsPlaying} isPlaying={isPlaying} />

            <img src={logo} alt='logo' />

            <div className='flex justify-center items-center gap-4 p-2'>
                <span className='hover:bg-gray-200 cursor-pointer p-2'>
                    <img src={vrLogo} alt="VR logo" className='size-12 object-cover' />
                </span>
                |
                {/* Play/Pause button for audio */}
                <span
                    className='hover:bg-gray-200 cursor-pointer p-2'
                    onClick={() => setIsPlaying(prev => !prev)}
                >
                    <img
                        src={isPlaying ? audioGif : audioStill}
                        alt="audio control"
                        className='size-12 object-cover'
                    />
                </span>
                |
                <span className='hover:bg-gray-200 cursor-pointer p-2' onClick={handleFullScreen}>
                    <img src={fullScreenLogo} alt="fullscreen logo" className='size-12 object-cover' />
                </span>
            </div>
        </div>
    );
}

export default LogoModal;