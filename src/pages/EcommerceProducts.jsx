import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';

const EcommerceProducts = () => {
    // Initialize from session storage
    const [isUnlocked, setIsUnlocked] = useState(() => {
        return sessionStorage.getItem('galleryUnlocked') === 'true';
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        projectType: 'Commercial Ads',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const { error } = await supabase
                .from('contacts')
                .insert([
                    {
                        name: formData.name,
                        email: formData.email,
                        project_type: formData.projectType,
                        message: `LEAD_SOURCE: Gallery Unlock (Product Photography) | ${formData.message}`
                    }
                ]);

            if (error) throw error;

            // Success
            sessionStorage.setItem('galleryUnlocked', 'true');
            setIsUnlocked(true);
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Gallery images from public folder
    const techFolder = "/tech";
    const techImages = [
        "pr 3.png", "pr 4.png", "pr 5.png",
        "prd 1.png", "prd 10.png", "prd 11.png",
        "prd 13.png", "prd 2.png", "prd 3.png",
        "prd 5.png", "prd 6.png", "prd 8.png"
    ].map(filename => ({
        src: `${techFolder}/${filename}`,
        alt: "Tech Product"
    }));

    const productsFolder = "/products";
    const miscImages = [
        "beverage shots 1.png", "beverage shots 3.png", "beverage shots 4.png", "beverage shots 5.png",
        "beverage shots 6.png", "beverage shots 7.png", "beverage shots 8.png", "beverage shots 9.png",
        "beverage shots 10.png", "beverage shots 11.png", "beverage shots2.png",
        "q 1.png", "q 2.png", "q 3.png", "q 4.png", "q 5.png", "q 6.png", "q 7.png",
        "q 10.png", "q 11.png", "q 12.png", "q 13.png", "q 14.png", "q 17.png", "q 18.png", "q 19.png",
        "q 20.png", "q 21.png", "q 22.png", "q 23.png", "q 24.png", "q 25.png",
        "q 38.png", "q 39.png", "q 40.png", "q 41.png"
    ].map(filename => ({
        src: `${productsFolder}/${filename}`,
        alt: "Product Shot"
    }));

    const productImages = [...techImages, ...miscImages];

    return (
        <div className="min-h-screen bg-dark-900 text-white relative">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center mix-blend-difference">
                <Link to="/" className="text-xl font-bold uppercase tracking-widest hover:text-accent-blue transition-colors">
                    &larr; Back to Home
                </Link>
                <div className="text-sm font-mono opacity-50">ECOMMERCE PRODUCTS</div>
            </nav>

            {/* Main Content Area */}
            <div className={`container mx-auto px-4 py-24 transition-all duration-700 ${isUnlocked ? 'filter-none' : 'blur-xl pointer-events-none'}`}>
                <header className="mb-16 text-center">
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
                        Product <br /> Photography
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Showcasing products with precision and style for the digital marketplace.
                    </p>
                </header>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {productImages.map((img, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative aspect-square overflow-hidden rounded-sm bg-dark-800"
                        >
                            <img
                                src={img.src}
                                alt={`${img.alt} ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lead Capture Modal */}
            <AnimatePresence>
                {!isUnlocked && (
                    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="relative bg-[#08081a] border border-white/10 p-8 md:p-12 max-w-2xl w-full shadow-2xl rounded-2xl overflow-hidden"
                        >
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-cyan-600" />

                            <div className="text-center mb-8 relative z-10">
                                <h2 className="text-2xl md:text-3xl font-wide font-black uppercase tracking-tight text-white mb-2">
                                    Exclusive Access
                                </h2>
                                <p className="text-emerald-500 font-mono text-xs uppercase tracking-widest">
                                    The Gallery Is Locked
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-xs font-bold text-gray-400 uppercase tracking-widest">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-medium outline-none focus:border-emerald-500 focus:bg-white/10 transition-all placeholder:text-white/20"
                                            placeholder="Full Name"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-medium outline-none focus:border-emerald-500 focus:bg-white/10 transition-all placeholder:text-white/20"
                                            placeholder="hello@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="projectType" className="text-xs font-bold text-gray-400 uppercase tracking-widest">Inquiry Type</label>
                                    <select
                                        id="projectType"
                                        name="projectType"
                                        value={formData.projectType}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-medium outline-none focus:border-emerald-500 focus:bg-white/10 transition-all appearance-none"
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

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-xs font-bold text-gray-400 uppercase tracking-widest">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows="3"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-medium outline-none focus:border-emerald-500 focus:bg-white/10 transition-all resize-none placeholder:text-white/20"
                                        placeholder="Tell us about yourself..."
                                        value={formData.message}
                                        onChange={handleChange}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-emerald-600 hover:bg-white hover:text-black font-bold py-4 rounded-full uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? "Unlocking..." : "Unlock Collection"}
                                </button>
                            </form>

                            <div className="mt-6 text-center text-xs text-gray-500 relative z-10">
                                <Link to="/" className="hover:text-white underline decoration-gray-600 underline-offset-4">
                                    Return to Home Page
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default EcommerceProducts;
