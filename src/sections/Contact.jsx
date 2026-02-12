import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import Button from '../components/ui/Button';


const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        projectType: 'Website Generation',
        message: ''
    });
    const [status, setStatus] = useState('idle');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('loading');
        setTimeout(() => {
            setStatus('success');
            setFormData({ name: '', email: '', projectType: 'Website Generation', message: '' });
            setTimeout(() => setStatus('idle'), 3000);
        }, 1500);
    };

    return (
        <section id="contact" className="py-20 md:py-40 bg-[#08081a] text-white relative overflow-hidden">
            {/* Dark Industrial Glitch Collage Background */}
            {/* Tech Grid Background - Dark/Red Theme */}
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

                {/* Large Background Text */}
                <div className="absolute bottom-10 left-10 flex-col items-start opacity-10 select-none pointer-events-none hidden md:flex">
                    <span className="text-9xl font-wide font-bold italic tracking-tighter leading-none text-[#8b0000]">ESTA</span>
                    <span className="text-6xl font-pixel -mt-4 text-white/50">1859.AX</span>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-block bg-[#8b0000] text-white px-6 py-2 mb-8 font-wide font-bold text-sm skew-x-[-12deg] tracking-[0.4em] shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
                        ESTA_1859 // OVERRIDE_ACCESS
                    </div>
                    <h2 className="text-3xl sm:text-5xl md:text-9xl font-wide font-bold mb-4 md:mb-6 uppercase tracking-tighter leading-none text-white">
                        Access <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b0000] to-primary italic">_Protocol</span>
                    </h2>
                    <p className="font-script text-xl sm:text-3xl text-[#8b0000] -rotate-2">
                        (Establishing secure infrastructure link...)
                    </p>
                </div>

                <motion.form
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    onSubmit={handleSubmit}
                    className="bg-[#050510]/80 backdrop-blur-xl p-4 sm:p-6 md:p-16 border-2 border-white/10 shadow-[10px_10px_0px_0px_rgba(139,0,0,0.1)] md:shadow-[40px_40px_0px_0px_rgba(139,0,0,0.1)] relative overflow-hidden"
                >
                    {/* Form Background Pattern */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                        <div className="space-y-4">
                            <label className="text-[10px] font-pixel text-white/40 uppercase tracking-[0.2em]">IDENT_NAME</label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white font-wide outline-none focus:border-[#8b0000] focus:bg-white/10 transition-all duration-300 placeholder:text-white/10"
                                placeholder="[ INPUT_NAME ]"
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] font-pixel text-white/40 uppercase tracking-[0.2em]">SECURE_AUTH_MAIL</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white font-wide outline-none focus:border-[#8b0000] focus:bg-white/10 transition-all duration-300 placeholder:text-white/10"
                                placeholder="MAIL@SECURE_NODE.SYS"
                            />
                        </div>
                    </div>

                    <div className="space-y-4 mb-10">
                        <label className="text-[10px] font-pixel text-white/40 uppercase tracking-[0.2em]">SELECT_CAPABILITY_MODULE</label>
                        <select
                            name="projectType"
                            value={formData.projectType}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white font-wide outline-none focus:border-[#8b0000] focus:bg-white/10 transition-all duration-300 appearance-none"
                        >
                            <option className="bg-black text-white" value="AI Website Generation">WEB_GENERATION_SYS</option>
                            <option className="bg-black text-white" value="Custom Image Gen">IMAGE_GENERATION_CORE</option>
                            <option className="bg-black text-white" value="Video Editing">VIDEO_EDITING_SUITE</option>
                            <option className="bg-black text-white" value="AI Automation">AUTOMATION_PIPELINE</option>
                            <option className="bg-black text-white" value="Brand Campaigns">BRAND_CAMPAIGN_NEXUS</option>
                            <option className="bg-black text-white" value="UI/UX Design">UI_UX_PROTOCOLS</option>
                            <option className="bg-black text-white" value="Other">OTHER_INQUIRY</option>
                        </select>
                    </div>

                    <div className="space-y-4 mb-12">
                        <label className="text-[10px] font-pixel text-white/40 uppercase tracking-[0.2em]">BRIEFING_BUFFER</label>
                        <textarea
                            name="message"
                            required
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white font-wide outline-none focus:border-[#8b0000] focus:bg-white/10 transition-all duration-300 resize-none mb-2 placeholder:text-white/10"
                            placeholder="INITIALIZE_MISSION_PARAMETERS..."
                        ></textarea>
                        <div className="text-[9px] font-mono text-white/20 uppercase animate-pulse flex items-center gap-2">
                            <span className="w-1 h-1 bg-[#8b0000] rounded-full" />
                            Status: Waiting for satellite handshake...
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="w-full md:w-auto font-pixel text-xl rounded-none py-6 bg-[#8b0000] hover:bg-white hover:text-black border-none transition-all duration-500 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                            disabled={status === 'loading'}
                        >
                            {status === 'loading' ? (
                                "UPLOADING_BUFFER..."
                            ) : status === 'success' ? (
                                "UPLOAD_SUCCESSFUL!"
                            ) : (
                                "INITIATE_HANDSHAKE >>"
                            )}
                        </Button>
                    </div>
                </motion.form>

                {/* Technical Coordinates Decor */}
                <div className="mt-24 flex flex-col items-center gap-6">
                    <div className="flex justify-center gap-1">
                        {Array.from({ length: 24 }).map((_, i) => (
                            <div key={i} className="w-1.5 h-1.5 bg-[#8b0000]" style={{ opacity: 1 - i * 0.04 }} />
                        ))}
                    </div>
                    <div className="font-mono text-[8px] text-white/20 tracking-[1em] uppercase">
                        COORD_AX_77.92 // LAT_SYS_993.1
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
