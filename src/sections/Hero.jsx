import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import Button from '../components/ui/Button';
import { ArrowRight, Play } from 'lucide-react';
import heroBg from '../assets/images/hero-bg.jpg';
import techTexture from '../assets/images/tech-texture.jpg';
import { slides } from '../data/slides';

const Hero = () => {
    const ref = useRef(null);
    const [activeBg, setActiveBg] = useState(0);

    // Auto-rotate background every 5 seconds
    useEffect(() => {
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
            className="relative min-h-[120vh] flex flex-col items-center pt-20"
        >
            {/* Background Wrapper */}
            <div className="absolute inset-0 w-full h-full overflow-hidden z-0 bg-dark-950">
                {/* Dynamic Background Slideshow */}
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={slides[activeBg].id}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 0.3, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <img
                            src={slides[activeBg].image}
                            alt="Background"
                            className="w-full h-full object-cover filter blur-[80px] contrast-125 saturate-150"
                        />
                        <div className="absolute inset-0 bg-dark-950/40 mix-blend-multiply" />
                    </motion.div>
                </AnimatePresence>

                {/* Animated Mesh Background */}
                <div className="absolute inset-0 bg-mesh opacity-20 blur-[100px] animate-mesh" />

                {/* Subtle Grain or Pattern Overlay */}
                <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
                    style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }} />
            </div>

            <div className="container mx-auto px-6 relative z-30 text-center flex-1 flex flex-col justify-center">
                <motion.div
                    style={{ opacity: dropOpacity }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block py-1 px-3 rounded-sm bg-accent-lime text-black text-[10px] font-mono font-bold mb-6 tracking-tighter uppercase">
                        [ SYSTEM_STATUS: OPERATIONAL ]
                    </span>

                    <h1 className="text-6xl md:text-9xl font-black mb-6 leading-[0.85] tracking-tighter uppercase italic">
                        Accelerate <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent-cyan to-secondary drop-shadow-[0_0_20px_rgba(167,139,250,0.5)]">
                            Evolution
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-400 max-w-4xl mx-auto mb-10 leading-relaxed font-light">
                        We help businesses Scale by Integrating <span className="text-white font-medium">AI-powered Marketing Content</span> for E-Commerce, Brands, Influencers & Local Businesses.
                        <br className="hidden md:block" />
                        <span className="text-primary/80">Product photography | Marketing videos | Social Media Content, Commercial Ads</span>.
                        <br className="hidden md:block" />
                        From Website Generation to Automated Workflows, We build the Future AND Much More.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-20">
                        <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />} className="shadow-[0_0_20px_rgba(107,33,168,0.5)] hover:shadow-[0_0_30px_rgba(107,33,168,0.7)]">
                            Explore Services
                        </Button>
                        <Button variant="secondary" size="lg" icon={<Play className="w-5 h-5 fill-current" />}>
                            Watch Showreel
                        </Button>
                    </div>
                </motion.div>

                {/* Dropping Dashboard Mockup */}
                <motion.div
                    style={{ y: dropY, perspective: '1000px' }}
                    className="mx-auto max-w-5xl relative z-20"
                >
                    <div className="w-full h-auto rounded-xl border border-white/20 bg-white/5 backdrop-blur-md p-2 shadow-2xl shadow-primary/30">
                        <div className="w-full aspect-[16/9] rounded-lg bg-dark-800 overflow-hidden relative group">
                            {/* Mockup content */}
                            <div className="absolute inset-0 overflow-hidden">
                                <img src={techTexture} className="w-full h-full object-cover opacity-40 mix-blend-overlay" alt="" />
                                <div className="absolute inset-0 bg-gradient-to-br from-dark-950 to-accent-blue/20 flex flex-col items-center justify-center p-8">
                                    <p className="text-accent-blue font-mono text-xs mb-2 tracking-widest uppercase">Encryption Mesh V2.0</p>
                                    <div className="w-full h-[2px] bg-accent-blue/30 mb-8" />
                                    <p className="text-white font-mono text-3xl md:text-5xl font-black tracking-tighter uppercase italic">DATA_CORE_ACTIVE</p>
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
