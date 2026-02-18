import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import Button from '../components/ui/Button';
import { supabase } from '../lib/supabaseClient';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        projectType: 'Website Generation',
        message: ''
    });
    const [status, setStatus] = useState('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const { error } = await supabase
                .from('contacts')
                .insert([
                    {
                        name: formData.name,
                        email: formData.email,
                        project_type: formData.projectType,
                        message: formData.message
                    }
                ]);

            if (error) throw error;

            setStatus('success');
            setFormData({ name: '', email: '', projectType: 'Website Generation', message: '' });
            setTimeout(() => setStatus('idle'), 5000);

        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
            setErrorMessage('Something went wrong. Please try again.');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <section id="contact" className="py-20 md:py-40 bg-[#08081a] text-white relative overflow-hidden">
            {/* Dark Industrial Glitch Collage Background */}
            {/* Tech Grid Background - Dark/Red Theme */}
            <div className="absolute inset-0 z-0 overflow-hidden bg-black">
                {/* Subtle Radial Gradient for Depth */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] opacity-80" />

                {/* Simplified Decorative Elements */}
                <div className="absolute top-20 right-[15%] w-48 h-48 bg-[#8b0000]/10 blur-3xl" />
                <div className="absolute bottom-40 left-[10%] w-64 h-32 border border-white/5 -rotate-12" />

                {/* Large Background Text */}
                <div className="absolute bottom-10 left-10 flex-col items-start opacity-10 select-none pointer-events-none hidden md:flex">
                    <span className="text-9xl font-wide font-bold italic tracking-tighter leading-none text-[#8b0000]">ESTA</span>
                    <span className="text-6xl font-pixel -mt-4 text-white/50">1859.AX</span>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-block bg-[#8b0000] text-white px-6 py-1 mb-8 font-wide font-bold text-xs tracking-widest uppercase">
                        Get In Touch
                    </div>
                    <h2 className="text-4xl sm:text-6xl md:text-8xl font-wide font-black mb-6 uppercase tracking-tighter leading-none text-white">
                        Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b0000] to-primary italic">Us</span>
                    </h2>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
                        Ready to start your next big project? We're here to help you scale.
                    </p>
                </div>

                <motion.form
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    onSubmit={handleSubmit}
                    className="bg-white/5 backdrop-blur-3xl p-6 md:p-12 border border-white/10 rounded-2xl relative overflow-hidden shadow-2xl"
                >
                    {/* Form Background Pattern */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div className="space-y-3">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Your Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white font-medium outline-none focus:border-[#8b0000] focus:bg-white/10 transition-all duration-300 placeholder:text-white/20"
                                placeholder="Full Name"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white font-medium outline-none focus:border-[#8b0000] focus:bg-white/10 transition-all duration-300 placeholder:text-white/20"
                                placeholder="hello@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-3 mb-8">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Select Service</label>
                        <select
                            name="projectType"
                            value={formData.projectType}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white font-medium outline-none focus:border-[#8b0000] focus:bg-white/10 transition-all duration-300 appearance-none"
                        >
                            <option className="bg-[#08081a] text-white" value="Commercial Ads">Commercial Ads</option>
                            <option className="bg-[#08081a] text-white" value="Custom Image Gen">Custom Image Gen</option>
                            <option className="bg-[#08081a] text-white" value="AI Automation">AI Automation</option>
                            <option className="bg-[#08081a] text-white" value="Campaigns">Campaigns</option>
                            <option className="bg-[#08081a] text-white" value="AI Agents">AI Agents</option>
                            <option className="bg-[#08081a] text-white" value="Video Editing">Video Editing</option>
                            <option className="bg-[#08081a] text-white" value="UI/UX Design">UI/UX Design</option>
                            <option className="bg-[#08081a] text-white" value="Other">Other Inquiry</option>
                        </select>
                    </div>

                    <div className="space-y-3 mb-10">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Your Message</label>
                        <textarea
                            name="message"
                            required
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white font-medium outline-none focus:border-[#8b0000] focus:bg-white/10 transition-all duration-300 resize-none placeholder:text-white/20"
                            placeholder="Tell us about your project or inquiry..."
                        ></textarea>
                    </div>

                    {status === 'error' && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-center">
                            {errorMessage}
                        </div>
                    )}

                    <div className="flex justify-center">
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="w-full md:w-auto font-bold uppercase tracking-widest px-12 py-6 bg-[#8b0000] hover:bg-white hover:text-black transition-all duration-300 rounded-full"
                            disabled={status === 'loading' || status === 'success'}
                        >
                            {status === 'loading' ? (
                                <div className="flex items-center gap-2">
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    SENDING...
                                </div>
                            ) : status === 'success' ? (
                                "MESSAGE SENT!"
                            ) : (
                                "SEND MESSAGE"
                            )}
                        </Button>
                    </div>
                </motion.form>

                <div className="mt-20 border-t border-white/5 pt-10 text-center">
                    <p className="text-[10px] font-mono text-white/10 uppercase tracking-[0.5em]">
                        BOLTSTUDIO // SECURE TRANSMISSION
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Contact;
