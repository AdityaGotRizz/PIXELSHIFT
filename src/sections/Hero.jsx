import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import Button from '../components/ui/Button';
import { ArrowRight, Play } from 'lucide-react';
import heroBg from '../assets/images/hero-bg.jpg';
import techTexture from '../assets/images/tech-texture.jpg';
import { slides } from '../data/slides';

const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768;

const Hero = () => {
    const ref = useRef(null);
    const [activeBg, setActiveBg] = useState(0);

    // Auto-rotate background every 5 seconds
    useEffect(() => {
        // Only run auto-rotate on desktop to save resources on mobile
        if (isMobile()) return;

        const interval = setInterval(() => {
            setActiveBg((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    // Scroll parallax for the "drop" effect
    const { scrollY } = useScroll();
    // Translate Y: Move down faster than scroll to simulate "dropping" deep into the next sections
    const dropY = useTransform(scrollY, [0, 500], [0, 400]); // Reduced range since Transition layer is gone
    const dropOpacity = useTransform(scrollY, [0, 500], [1, 1]); // Keep opaque longer
    // Actually, user wants "graph drop into water". Let's keep graph opaque and move it deep.

    // Mouse movement logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e) => {
        const { clientX, clientY, currentTarget } = e;
        const { width, height } = currentTarget.getBoundingClientRect();
        const xPct = clientX / width - 0.5;
        const yPct = clientY / height - 0.5;

        mouseX.set(xPct);
        mouseY.set(yPct);
    };

    const x = useSpring(mouseX, { stiffness: 200, damping: 30 });
    const y = useSpring(mouseY, { stiffness: 200, damping: 30 });

    const moveX = useTransform(x, [-0.5, 0.5], ["-2%", "2%"]);
    const moveY = useTransform(y, [-0.5, 0.5], ["-2%", "2%"]);

    return (
        <section
            ref={ref}
            onMouseMove={handleMouseMove}
            className="relative min-h-screen md:min-h-[120vh] flex flex-col items-center pt-20"
        >
            {/* Background Wrapper */}
            <div className="absolute inset-0 w-full h-full overflow-hidden z-0 bg-dark-950">
                {/* Dynamic Background Slideshow */}
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={slides[activeBg].id}
                        initial={{ opacity: 0, scale: isMobile() ? 1 : 1.1 }}
                        animate={{ opacity: 0.3, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        className="absolute inset-0 will-change-transform"
                    >
                        <img
                            src={slides[activeBg].image}
                            alt="Background"
                            className="w-full h-full object-cover md:filter md:blur-[80px] md:contrast-125 md:saturate-150 opacity-40 md:opacity-100"
                        />
                        <div className="absolute inset-0 bg-dark-950/40 mix-blend-multiply" />
                    </motion.div>
                </AnimatePresence>

                {/* Animated Mesh Background */}
                <div className="absolute inset-0 bg-mesh opacity-20 md:blur-[100px] md:animate-mesh will-change-[background-position,content]" />

                {/* Subtle Grain or Pattern Overlay */}
                <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none hidden md:block"
                    style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }} />
            </div>

            <div className="container mx-auto px-6 relative z-30 text-center flex-1 flex flex-col justify-center">
                <motion.div
                    style={{ opacity: dropOpacity }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block py-1 px-4 rounded-full bg-accent-lime text-black text-[10px] font-bold mb-6 tracking-widest uppercase">
                        Designing the Future
                    </span>

                    <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-4 md:mb-6 leading-none tracking-tighter uppercase transform-gpu">
                        Scale Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent-cyan to-secondary">
                            Creative Vision
                        </span>
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed font-medium">
                        We empower businesses to scale with AI-driven content. From high-end <span className="text-white">product photography</span> to <span className="text-white">automated marketing workflows</span>, we build the future of your brand.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-10 md:mb-20">
                        <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />} className="shadow-[0_0_20px_rgba(107,33,168,0.5)] hover:shadow-[0_0_30px_rgba(107,33,168,0.7)] w-full sm:w-auto justify-center">
                            Explore Services
                        </Button>
                        <Button variant="secondary" size="lg" icon={<Play className="w-5 h-5 fill-current" />} className="w-full sm:w-auto justify-center">
                            Watch Showreel
                        </Button>
                    </div>
                </motion.div>

                {/* Dropping Dashboard Mockup */}
                <motion.div
                    style={{ y: isMobile() ? 0 : dropY, perspective: '1000px' }}
                    className="mx-auto max-w-5xl relative z-20 hidden sm:block"
                >
                    <div className="w-full h-auto rounded-xl border border-white/20 bg-white/5 backdrop-blur-md p-2 shadow-2xl shadow-primary/30">
                        <div className="w-full aspect-[16/9] rounded-lg bg-dark-800 overflow-hidden relative group">
                            {/* Mockup content */}
                            <div className="absolute inset-0 overflow-hidden">
                                <img src={techTexture} className="w-full h-full object-cover opacity-40 mix-blend-overlay" alt="" />
                                <div className="absolute inset-0 bg-gradient-to-br from-dark-950 to-accent-blue/20 flex flex-col items-center justify-center p-8">
                                    <p className="text-accent-blue font-bold text-xs mb-2 tracking-widest uppercase">System Analytics</p>
                                    <div className="w-full h-[1px] bg-accent-blue/20 mb-8" />
                                    <p className="text-white text-3xl md:text-5xl font-black tracking-tighter uppercase">Growth Active</p>
                                </div>
                            </div>

                            {/* Simulated Graph Lines */}
                            <svg className="absolute bottom-0 left-0 w-full h-[50%] opacity-50" viewBox="0 0 100 20" preserveAspectRatio="none">
                                <path d="M0,20 L0,10 C10,15 20,5 30,12 C40,18 50,8 60,15 C70,10 80,18 90,5 L100,15 L100,20 Z" fill="url(#grad1)" />
                                <defs>
                                    <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.5 }} />
                                        <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 0 }} />
                                    </linearGradient>
                                </defs>
                            </svg>

                            <div className="absolute top-4 left-4 right-4 h-6 flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
