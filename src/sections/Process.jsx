import React from 'react';
import { motion } from 'framer-motion';
import techTexture from '../assets/images/tech-texture.jpg';

const steps = [
    {
        number: "01",
        title: "Neural Calibration",
        subtitle: "Discovery Phase",
        description: "We align with your operational frequency to map out high-impact vectors.",
        details: ["Needs Analysis", "Data Audit", "Scope Matrix"]
    },
    {
        number: "02",
        title: "Architecture Design",
        subtitle: "Strategy Phase",
        description: "Designing the blueprint for your digital ecosystem with precision.",
        details: ["Stack Selection", "Model Training", "UI Blueprints"]
    },
    {
        number: "03",
        title: "Core Synthesis",
        subtitle: "Implementation",
        description: "Deploying the codebase and integrating neural pathways for automation.",
        details: ["Development", "API Integration", "Rigorous Testing"]
    },
    {
        number: "04",
        title: "Hyper-Growth",
        subtitle: "Scale Phase",
        description: "Continuous optimization loops to ensure system evolution.",
        details: ["Optimization", "Monitoring", "Iteration"]
    }
];

const Process = () => {
    return (
        <section id="process" className="relative py-40 overflow-hidden bg-white text-black">
            {/* Background Decorations */}
            <div className="absolute inset-0 z-0 opacity-5">
                <div className="absolute top-10 left-10 w-40 h-40 border-2 border-dashed border-black rounded-full" />
                <div className="absolute bottom-10 right-10 w-60 h-60 border-2 border-dotted border-black rotate-45" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="mb-24 flex flex-col items-center text-center">
                    <div className="border border-black px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] mb-4 bg-black/5">
                        Execution_Model_v4.0
                    </div>
                    <h2 className="text-4xl md:text-7xl font-wide font-bold mb-8 uppercase tracking-tighter leading-none">
                        Execution <span className="text-primary italic">Protocol</span>
                    </h2>
                    <p className="font-script text-2xl text-primary -rotate-2 -mt-4">
                        (Systematic approach to digital evolution)
                    </p>
                </div>

                <div className="relative">
                    {/* Timeline Line (Desktop) */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-black/10 -translate-x-1/2" />

                    <div className="space-y-24">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className={`flex flex-col md:flex-row gap-10 md:gap-20 items-center ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
                            >
                                {/* Number / Icon Side */}
                                <div className="md:w-1/2 flex justify-center md:justify-end relative">
                                    <div className={`w-24 h-24 border-2 border-black bg-white flex items-center justify-center font-wide font-bold text-3xl z-10 relative group hover:bg-black hover:text-white transition-all duration-300 ${index % 2 === 0 ? 'md:mr-[-3rem]' : 'md:ml-[-3rem] md:order-last'}`}>
                                        {step.number}
                                        <div className="absolute top-[-4px] right-[-4px] w-2 h-2 bg-primary" />
                                        <div className="absolute bottom-[-4px] left-[-4px] w-2 h-2 bg-black" />
                                    </div>
                                </div>

                                {/* Content Side */}
                                <div className={`md:w-1/2 text-center md:text-left ${index % 2 !== 0 ? 'md:text-right' : ''}`}>
                                    <div className={`inline-block font-mono text-[10px] uppercase tracking-widest text-black/50 mb-2 border-b border-black/10 pb-1 ${index % 2 !== 0 ? 'md:ml-auto' : ''}`}>
                                        // {step.subtitle}
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-wide font-bold mb-4 uppercase tracking-tight">
                                        {step.title}
                                    </h3>
                                    <p className="text-lg leading-relaxed text-black/70 max-w-md mx-auto md:mx-0 mb-6 font-medium">
                                        {step.description}
                                    </p>

                                    {/* Technical Details List */}
                                    <ul className={`flex flex-wrap gap-x-4 gap-y-2 justify-center md:justify-start ${index % 2 !== 0 ? 'md:justify-end' : ''}`}>
                                        {step.details.map((detail, i) => (
                                            <li key={i} className="bg-black/5 px-3 py-1 rounded-none text-xs font-mono font-bold uppercase tracking-wider text-black/80 flex items-center gap-2">
                                                <span className="w-1 h-1 bg-primary rounded-full" />
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Process;
