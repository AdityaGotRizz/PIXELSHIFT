import React, { useRef, useEffect } from 'react';

const VideoLoop = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Force play and ensure it's muted for autoplay policy
        video.muted = true;
        const playPromise = video.play();

        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log('Autoplay prevented:', error);
            });
        }
    }, []);

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.muted = false;
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.muted = true;
        }
    };

    return (
        <section className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
            <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="w-full h-full object-cover cursor-pointer transform-gpu"
                style={{ filter: 'brightness(0.9)' }}
            >
                <source src="/From KlickPin CF Shape the Future [Video] _ Motion graphics inspiration Motion graphics design Motion design animation.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Subtle Overlay to make text legible elsewhere if needed */}
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        </section>
    );
};

export default VideoLoop;
