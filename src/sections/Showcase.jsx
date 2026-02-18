import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { slides } from '../data/slides';


const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768;

const Showcase = () => {
    const [width, setWidth] = useState(0);
    const [activeBg, setActiveBg] = useState(0);
    const carousel = useRef();

    useEffect(() => {
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);

        // Only auto-rotate on desktop to save resources on mobile
        if (isMobile()) return;

        const interval = setInterval(() => {
            setActiveBg((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative py-20 bg-dark-900 overflow-hidden text-white">
            {/* Dynamic Background Slideshow */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={slides[activeBg].id}
                        initial={{ opacity: 0, scale: isMobile() ? 1 : 1.1 }}
                        animate={{ opacity: 0.2, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        className="absolute inset-0 will-change-transform"
                    >
                        <img
                            src={slides[activeBg].image}
                            alt="Background"
                            loading="lazy"
                            className="w-full h-full object-cover md:filter md:blur-3xl md:contrast-125 md:saturate-150 opacity-20 md:opacity-100"
                        />
                        <div className="absolute inset-0 bg-dark-900/50 mix-blend-multiply" />
                    </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay hidden md:block" />
            </div>
            <div className="container mx-auto px-6 mb-12 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <div className="inline-block border border-accent-blue/30 px-3 py-1 rounded-full text-[10px] font-bold text-accent-blue uppercase tracking-widest mb-4 bg-accent-blue/5">
                            Selected Projects
                        </div>
                        <Link to="/work" className="block group w-fit">
                            <h2 className="text-4xl sm:text-5xl md:text-8xl font-black mb-2 text-white uppercase tracking-tighter leading-none group-hover:text-accent-blue transition-colors duration-300">
                                Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-white group-hover:text-white group-hover:bg-none">Work</span>
                                <span className="inline-block ml-4 text-2xl align-top opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-accent-blue">↗</span>
                            </h2>
                        </Link>
                    </div>
                    <p className="text-accent-blue font-bold text-[10px] uppercase tracking-[0.2em] mb-4 animate-pulse">
                        Swipe to explore &gt;&gt;
                    </p>
                </div>
            </div>

            <motion.div ref={carousel} className="relative z-10 cursor-grab active:cursor-grabbing overflow-hidden pl-6 md:pl-20">
                <motion.div
                    drag="x"
                    dragConstraints={{ right: 0, left: -width }}
                    className="flex gap-8"
                >
                    {slides.map((slide) => {
                        const SlideContent = (
                            <motion.div
                                key={slide.id}
                                className="relative min-w-[280px] h-[420px] sm:min-w-[320px] sm:h-[500px] md:min-w-[600px] md:h-[700px] overflow-hidden group border border-white/10 bg-dark-800"
                            >
                                {/* Image Layer */}
                                <div className="absolute inset-0 z-0">
                                    <img
                                        src={slide.image}
                                        alt={slide.title}
                                        loading="lazy"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:brightness-50 transform-gpu"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent opacity-90" />
                                </div>

                                {/* Content Layer */}
                                <div className="absolute inset-0 z-10 flex flex-col justify-between p-5 sm:p-8 md:p-12">
                                    {/* Top Tags */}
                                    <div className="flex justify-between items-start translate-y-[-20px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                        <div className="flex flex-wrap gap-2 max-w-[70%]">
                                            {slide.tags.map((tag, i) => (
                                                <span key={i} className="text-[10px] font-mono font-bold bg-white/10 px-2 py-1 rounded-none uppercase tracking-wider backdrop-blur-md border border-white/5">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="text-accent-blue font-bold font-wide text-sm bg-black/50 px-3 py-1 border border-accent-blue/50">
                                            {slide.metrics}
                                        </div>
                                    </div>

                                    {/* Bottom Info */}
                                    <div>
                                        <span className="text-secondary text-[10px] font-bold uppercase tracking-widest mb-3 block">
                                            {slide.category}
                                        </span>
                                        <h3 className="text-3xl md:text-5xl font-black text-white leading-[0.9] uppercase tracking-tighter mb-4 drop-shadow-xl group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-accent-blue transition-all duration-300">
                                            {slide.title}
                                        </h3>

                                        <div className="h-[1px] w-full bg-white/20 mb-6 group-hover:bg-accent-blue group-hover:w-1/2 transition-all duration-500" />

                                        <p className="text-gray-300 text-sm md:text-base font-medium leading-relaxed max-w-md opacity-80 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                            {slide.brief}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );

                        return slide.link ? (
                            <Link key={slide.id} to={slide.link} className="block">
                                {SlideContent}
                            </Link>
                        ) : (
                            <React.Fragment key={slide.id}>
                                {SlideContent}
                            </React.Fragment>
                        );
                    })}
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Showcase;
