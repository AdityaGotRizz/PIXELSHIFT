import React from 'react';
import { motion } from 'framer-motion';
import { slides } from '../data/slides';
import PageTransition from '../components/PageTransition';

const Work = () => {
    return (
        <PageTransition>
            <section className="min-h-screen bg-dark-900 text-white py-32 px-6 relative overflow-hidden">
                {/* Background Details */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-accent-blue/10 to-transparent opacity-30" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                </div>

                <div className="container mx-auto relative z-10">
                    {/* Header */}
                    <div className="mb-20 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="inline-block border border-accent-blue/30 px-3 py-1 rounded-none text-[10px] font-pixel text-accent-blue uppercase tracking-widest mb-4 bg-accent-blue/5"
                        >
                            Complete_Project_Index
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-5xl md:text-8xl font-black mb-6 text-white uppercase italic tracking-tighter leading-none"
                        >
                            All_<span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-white">Work</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base font-mono"
                        >
                            Explore our comprehensive portfolio of digital innovations, AI integrations, and creative solutions.
                        </motion.p>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {slides.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative aspect-[4/5] overflow-hidden border border-white/10 bg-dark-800 cursor-pointer"
                            >
                                {/* Image */}
                                <div className="absolute inset-0 z-0 bg-dark-900">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-50"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/20 to-transparent opacity-80" />
                                </div>

                                {/* Content */}
                                <div className="absolute inset-0 z-10 flex flex-col justify-between p-8">
                                    <div className="flex justify-between items-start translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                        <div className="text-[10px] font-mono font-bold bg-white/10 px-2 py-1 uppercase backdrop-blur-md border border-white/5">
                                            {project.category}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-2 group-hover:text-accent-blue transition-colors duration-300">
                                            {project.title}
                                        </h3>
                                        <div className="h-[1px] w-full bg-white/20 mb-4 group-hover:bg-accent-blue group-hover:w-1/2 transition-all duration-500" />
                                        <p className="text-gray-300 text-xs font-medium leading-relaxed opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 pb-2">
                                            {project.brief}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                                            {project.tags.slice(0, 3).map((tag, i) => (
                                                <span key={i} className="text-[8px] font-mono text-accent-blue border border-accent-blue/30 px-1.5 py-0.5 rounded-none">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </PageTransition>
    );
};

export default Work;
