import React, { useRef, useEffect } from 'react';

const NightclubVideo = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
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
        <section className="relative w-full h-screen bg-black overflow-hidden">
            <video
                ref={videoRef}
                key="nightclub-video"
                autoPlay
                loop
                muted
                playsInline
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="w-full h-full object-cover cursor-pointer"
            >
                <source src="/nightclub-elements.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </section>
    );
};

export default NightclubVideo;
