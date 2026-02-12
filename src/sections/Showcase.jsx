import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { slides } from '../data/slides';


const Showcase = () => {
    const [width, setWidth] = useState(0);
    const [activeBg, setActiveBg] = useState(0);
    const carousel = useRef();

    useEffect(() => {
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);

        // Auto-rotate background every 5 seconds
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
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 0.2, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <img
                            src={slides[activeBg].image}
                            alt="Background"
                            className="w-full h-full object-cover filter blur-3xl contrast-125 saturate-150"
                        />
                        <div className="absolute inset-0 bg-dark-900/50 mix-blend-multiply" />
                    </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
            </div>
            <div className="container mx-auto px-6 mb-12 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <div className="inline-block border border-accent-blue/30 px-3 py-1 rounded-none text-[10px] font-pixel text-accent-blue uppercase tracking-widest mb-4 bg-accent-blue/5">
                            Project_Index_2025
                        </div>
                        <Link to="/work" className="block group w-fit">
                            <h2 className="text-3xl sm:text-5xl md:text-8xl font-black mb-2 text-white uppercase italic tracking-tighter leading-none group-hover:text-accent-blue transition-colors duration-300">
                                Recent_<span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-white group-hover:text-white group-hover:bg-none">Work</span>
                                <span className="inline-block ml-4 text-2xl align-top opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-accent-blue">↗</span>
                            </h2>
                        </Link>
                    </div>
                    <p className="text-accent-blue font-mono text-xs uppercase tracking-widest mb-4 animate-pulse">
                        [ SCROLL_TO_NAVIGATE &gt;&gt; ]
                    </p>
                </div>
            </div>

            <motion.div ref={carousel} className="relative z-10 cursor-grab active:cursor-grabbing overflow-hidden pl-6 md:pl-20">
                <motion.div
                    drag="x"
                    dragConstraints={{ right: 0, left: -width }}
                    className="flex gap-8"
                >
                    {slides.map((slide) => (
                        <motion.div
                            key={slide.id}
                            className="relative min-w-[280px] h-[420px] sm:min-w-[320px] sm:h-[500px] md:min-w-[600px] md:h-[700px] overflow-hidden group border border-white/10 bg-dark-800"
                        >
                            {/* Image Layer */}
                            <div className="absolute inset-0 z-0">
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:brightness-50"
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
                                    <span className="text-secondary text-[10px] font-mono font-bold uppercase tracking-widest mb-3 block">
                                        // CATEGORY: {slide.category}
                                    </span>
                                    <h3 className="text-3xl md:text-5xl font-black text-white leading-[0.9] uppercase italic tracking-tighter mb-4 drop-shadow-xl group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-accent-blue transition-all duration-300">
                                        {slide.title}
                                    </h3>

                                    <div className="h-[1px] w-full bg-white/20 mb-6 group-hover:bg-accent-blue group-hover:w-1/2 transition-all duration-500" />

                                    <p className="text-gray-300 text-sm md:text-base font-medium leading-relaxed max-w-md opacity-80 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                        {slide.brief}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Showcase;
