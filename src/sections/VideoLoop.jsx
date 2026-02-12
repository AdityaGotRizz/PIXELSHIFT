import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const VideoLoop = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        // Ensure video plays when component mounts
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

    const handleTimeUpdate = () => {
        if (typeof window !== 'undefined' && window.innerWidth < 768) return; // Disable expensive loop check on mobile
        if (videoRef.current) {
            // Trim the last 9 seconds (Total duration ~52.65s, loop at 43.65s)
            if (videoRef.current.currentTime >= 43.65) {
                videoRef.current.currentTime = 0;
                videoRef.current.play();
            }
        }
    };

    return (
        <section className="relative w-full h-screen bg-black overflow-hidden">
            <video
                ref={videoRef}
                key="video-loop"
                autoPlay
                loop
                muted
                playsInline
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onTimeUpdate={handleTimeUpdate}
                className="w-full h-full object-cover cursor-pointer transform-gpu"
                preload="metadata"
            >
                <source src="/From KlickPin CF Shape the Future [Video] _ Motion graphics inspiration Motion graphics design Motion design animation.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </section>
    );
};

export default VideoLoop;
