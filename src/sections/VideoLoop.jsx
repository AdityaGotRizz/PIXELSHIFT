import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

const VideoLoop = () => {
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Auto-play on mount
        video.play().catch(error => {
            console.log('Autoplay prevented:', error);
        });

        // Setup Intersection Observer for scroll-based audio
        const observerOptions = {
            root: null, // use viewport
            threshold: 0.6 // unmute when 60% of video is visible
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (videoRef.current) {
                    if (entry.isIntersecting) {
                        // Unmute when visible (requires hasInteracted to be true for browser to allow)
                        videoRef.current.muted = isMuted; // Keep internal state
                        if (!isMuted) videoRef.current.muted = false;
                    } else {
                        // Always mute when scrolled away
                        videoRef.current.muted = true;
                    }
                }
            });
        }, observerOptions);

        observer.observe(video);

        return () => {
            if (video) observer.unobserve(video);
        };
    }, []);

    const toggleMute = () => {
        if (videoRef.current) {
            const newMuted = !videoRef.current.muted;
            videoRef.current.muted = newMuted;
            setIsMuted(newMuted);
            setHasInteracted(true);
        }
    };

    const handleMouseEnter = () => {
        if (videoRef.current && window.innerWidth > 1024) {
            videoRef.current.muted = false;
            setIsMuted(false);
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current && window.innerWidth > 1024) {
            videoRef.current.muted = true;
            setIsMuted(true);
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
        <section className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
            <video
                ref={videoRef}
                key="video-loop"
                autoPlay
                loop
                muted
                playsInline
                onClick={toggleMute}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onTimeUpdate={handleTimeUpdate}
                className="w-full h-full object-cover cursor-pointer transform-gpu"
                preload="metadata"
            >
                <source src="/From KlickPin CF Shape the Future [Video] _ Motion graphics inspiration Motion graphics design Motion design animation.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Audio Visual Indicator */}
            <div className="absolute bottom-10 right-10 z-30">
                <button
                    onClick={toggleMute}
                    className="p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all shadow-xl"
                >
                    {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6 animate-pulse" />}
                </button>
            </div>

            {/* Mobil Interaction Prompt */}
            {!hasInteracted && (
                <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
                        className="bg-black/60 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full flex items-center gap-3"
                    >
                        <div className="w-2 h-2 bg-[#8b0000] rounded-full animate-ping" />
                        <span className="font-pixel text-[10px] text-white uppercase tracking-widest">Tap for Experience</span>
                    </motion.div>
                </div>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-40 pointer-events-none" />
        </section>
    );
};

export default VideoLoop;
