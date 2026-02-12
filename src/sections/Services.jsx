import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import sailboatGlitch from '../assets/images/cosmic-sailboat-glitch.jpg';
import industrialGlitch from '../assets/images/industrial-glitch-large.jpg';
import aestheticFrame from '../assets/images/aesthetic-frame.jpg';
import { servicesData } from '../data/services';


const services = servicesData;

const Services = () => {
    const [viewMode, setViewMode] = useState('services'); // 'services' | 'profile'

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0,
            scale: 0.95
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 }
            }
        },
        exit: (direction) => ({
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0,
            scale: 0.95,
            transition: {
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 }
            }
        })
    };

    return (
        <section id="services" className="relative py-40 overflow-hidden bg-[#050510]">
            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#020617] via-[#0f172a] to-[#020617]" />

                <AnimatePresence mode="wait">
                    {viewMode === 'services' ? (
                        <motion.div
                            key="services-bg"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black"
                        />
                    ) : (
                        <motion.div
                            key="profile-bg"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 mix-blend-screen scale-100"
                        >
                            <div className="absolute inset-0 z-0 overflow-hidden bg-black">
                                {/* Red Grid Overlay */}
                                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8b0000_1px,transparent_1px),linear-gradient(to_bottom,#8b0000_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.1]" />

                                {/* Radial Gradient for Depth */}
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] opacity-80" />

                                {/* Scanlines */}
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />

                                {/* Decorative Elements */}
                                <div className="absolute top-20 right-[15%] w-48 h-48 bg-[#8b0000]/20 blur-3xl animate-pulse" />
                                <div className="absolute bottom-40 left-[10%] w-64 h-32 border border-[#8b0000]/20 -rotate-12 backdrop-blur-sm" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1)_0%,transparent_70%)]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header & Toggle */}
                <div className="flex flex-col items-center mb-24">
                    <div className="flex items-center gap-4 mb-8">
                        <motion.button
                            onClick={() => setViewMode('services')}
                            className={`px-8 py-6 rounded-none font-pixel text-sm uppercase tracking-widest border-2 transition-all ${viewMode === 'services'
                                ? 'bg-white text-black border-white shadow-[4px_4px_0px_0px_rgba(139,0,0,1)]'
                                : 'bg-transparent text-white/50 border-white/20 hover:border-white/40'
                                }`}
                        >
                            [ SERVICES_GRID ]
                        </motion.button>
                        <div className="w-8 h-[2px] bg-white/10" />
                        <motion.button
                            onClick={() => setViewMode('profile')}
                            className={`px-8 py-6 rounded-none font-pixel text-sm uppercase tracking-widest border-2 transition-all ${viewMode === 'profile'
                                ? 'bg-[#8b0000] text-white border-[#8b0000] shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]'
                                : 'bg-transparent text-white/50 border-white/20 hover:border-white/40'
                                }`}
                        >
                            [ MEET OUR TEAM ]
                        </motion.button>
                    </div>

                    <AnimatePresence mode="wait">
                        {viewMode === 'services' ? (
                            <motion.div
                                key="services-header"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="text-center"
                            >
                                <div className="inline-block border border-primary/30 px-4 py-1 rounded-full text-[10px] font-pixel text-primary uppercase tracking-[0.3em] mb-6 bg-primary/5 backdrop-blur-sm">
                                    Node_Map_v7.0 // Portal_Active
                                </div>
                                <h2 className="text-4xl md:text-8xl font-wide font-bold text-white uppercase tracking-tighter">
                                    Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent-cyan to-secondary italic">Capabilities</span>
                                </h2>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="profile-header"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="text-center"
                            >
                                <div className="inline-block border border-[#8b0000]/50 px-4 py-1 rounded-full text-[10px] font-pixel text-[#8b0000] uppercase tracking-[0.3em] mb-6 bg-[#8b0000]/10 backdrop-blur-sm">
                                    IDENTITY_FILE // ALPHA_001
                                </div>
                                <h2 className="text-4xl md:text-8xl font-wide font-bold text-white uppercase tracking-tighter">
                                    System <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b0000] to-white italic">Architect</span>
                                </h2>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Main Content Area */}
                <div className="relative min-h-[600px]">
                    <AnimatePresence mode="wait" custom={viewMode === 'services' ? -1 : 1}>
                        {viewMode === 'services' ? (
                            <motion.div
                                key="services-grid"
                                custom={-1}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                            >
                                {services.map((service, index) => (
                                    <motion.div
                                        key={index}
                                        className="group relative p-8 rounded-none bg-[#fdfaf6] text-black border-4 border-black box-shadow-pixel hover:-translate-y-2 hover:translate-x-1 transition-all duration-300 h-[360px] flex flex-col justify-center items-center text-center cursor-pointer overflow-hidden"
                                    >
                                        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                                            <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]" />
                                            <div className="absolute bottom-4 left-4 font-mono text-[8px] tracking-widest text-black/40">
                                                ESTA_1859 // NODE_{index + 105}
                                            </div>
                                        </div>
                                        <div className="absolute top-4 right-4 w-12 h-12 opacity-80 group-hover:rotate-90 transition-transform duration-700">
                                            <svg viewBox="0 0 100 100" className="w-full h-full fill-[#8b0000]">
                                                <path d="M50 0 L55 45 L100 50 L55 55 L50 100 L45 55 L0 50 L45 45 Z" />
                                                <circle cx="50" cy="50" r="15" fill="none" stroke="#8b0000" strokeWidth="2" />
                                                <text x="50" y="55" fontSize="12" textAnchor="middle" fill="white" fontStyle="italic">P</text>
                                            </svg>
                                        </div>
                                        <div className="relative z-10 flex flex-col items-center">
                                            <div className="mb-6 p-4 border-2 border-black bg-white group-hover:bg-[#8b0000] group-hover:text-white transition-all duration-300 transform group-hover:rotate-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                                {service.icon}
                                            </div>
                                            <h3 className="text-2xl font-wide font-bold uppercase tracking-tight leading-none mb-2">{service.title}</h3>
                                            <div className="h-1 w-12 bg-[#8b0000] mb-4" />
                                            <div className="font-pixel text-[10px] opacity-60">
                                                {" >> "}SYSTEM_MODULE_{index + 5}.0
                                            </div>
                                        </div>
                                        <div className="absolute inset-0 z-20 bg-black/95 scale-0 group-hover:scale-100 transition-transform duration-500 p-8 flex flex-col justify-center items-center">
                                            <h4 className="text-xl font-wide font-bold text-white mb-6 uppercase tracking-widest">{service.title}</h4>
                                            <ul className="space-y-4 font-pixel text-[10px] text-white/90 text-left w-full border-l-2 border-[#8b0000] pl-6 ml-4">
                                                {service.subItems.map((item, i) => (
                                                    <li key={i} className="flex items-center gap-3 hover:text-primary"><span className="text-[#8b0000] font-bold">#</span>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="profile-slide"
                                custom={1}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="grid grid-cols-1 md:grid-cols-3 gap-8"
                            >
                                {/* David */}
                                <div className="group/profile relative border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                                    <div className="aspect-[4/5] relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-80" />
                                        <img src="/david-portrait.png" className="w-full h-full object-cover grayscale brightness-50 contrast-125 group-hover/profile:grayscale-0 group-hover/profile:brightness-100 transition-all duration-700" alt="David" />
                                    </div>
                                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
                                        <div className="text-[#8b0000] font-pixel text-[10px] uppercase tracking-widest mb-2">
                                            LEAD_DEV_01
                                        </div>
                                        <h3 className="text-3xl font-black font-wide text-white uppercase tracking-tighter mb-1">
                                            DAVID
                                        </h3>
                                        <div className="h-1 w-12 bg-[#8b0000] mb-4 group-hover/profile:w-full transition-all duration-500" />
                                        <p className="text-xs text-white/60 font-mono uppercase tracking-widest">
                                            FULL_STACK_ARCHITECT
                                        </p>
                                    </div>
                                </div>

                                {/* Aditya */}
                                <div className="group/profile relative border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                                    <div className="aspect-[4/5] relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-80" />
                                        <img src={industrialGlitch} className="w-full h-full object-cover grayscale brightness-50 contrast-125 group-hover/profile:grayscale-0 group-hover/profile:brightness-100 transition-all duration-700" alt="Aditya" />
                                    </div>
                                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
                                        <div className="text-[#8b0000] font-pixel text-[10px] uppercase tracking-widest mb-2">
                                            HEAD_OPS_02
                                        </div>
                                        <h3 className="text-3xl font-black font-wide text-white uppercase tracking-tighter mb-1">
                                            ADITYA
                                        </h3>
                                        <div className="h-1 w-12 bg-[#8b0000] mb-4 group-hover/profile:w-full transition-all duration-500" />
                                        <p className="text-xs text-white/60 font-mono uppercase tracking-widest">
                                            SYSTEM_OPERATIONS
                                        </p>
                                    </div>
                                </div>

                                {/* Max Larson */}
                                <div className="group/profile relative border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                                    <div className="aspect-[4/5] relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-80" />
                                        <img src="/MAX 1.png" className="w-full h-full object-cover grayscale brightness-50 contrast-125 group-hover/profile:grayscale-0 group-hover/profile:brightness-100 transition-all duration-700" alt="Max" />
                                    </div>
                                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
                                        <div className="text-[#8b0000] font-pixel text-[10px] uppercase tracking-widest mb-2">
                                            HEAD_DESIGN_00
                                        </div>
                                        <h3 className="text-3xl font-black font-wide text-white uppercase tracking-tighter mb-1">
                                            MAX
                                        </h3>
                                        <div className="h-1 w-12 bg-[#8b0000] mb-4 group-hover/profile:w-full transition-all duration-500" />
                                        <p className="text-xs text-white/60 font-mono uppercase tracking-widest">
                                            CREATIVE_DIRECTOR
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Services;
