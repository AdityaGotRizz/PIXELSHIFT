import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const EcommerceProducts = () => {
    // Initialize from session storage
    const [isUnlocked, setIsUnlocked] = useState(() => {
        return sessionStorage.getItem('galleryUnlocked') === 'true';
    });

    const [formData, setFormData] = useState({
        name: '',
        gmail: '',
        country: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', formData);
        sessionStorage.setItem('galleryUnlocked', 'true');
        setIsUnlocked(true);
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
                            className="relative bg-dark-800 border border-white/10 p-8 md:p-12 max-w-lg w-full shadow-2xl rounded-xl overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-cyan-600" /> {/* Tech/Eco theme */}

                            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 uppercase tracking-tight text-white">
                                Exclusive Access
                            </h2>
                            <p className="text-emerald-500 text-center font-mono text-sm mb-2 uppercase tracking-widest">
                                The Gallery Can Only Be Visible After Sign Up
                            </p>
                            <p className="text-gray-500 text-center text-xs mb-8 italic">
                                *One-time sign up for your current session.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        className="w-full bg-dark-900 border border-white/10 p-3 rounded text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                                        placeholder="Enter your full name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="gmail" className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Gmail</label>
                                    <input
                                        type="email"
                                        id="gmail"
                                        name="gmail"
                                        required
                                        className="w-full bg-dark-900 border border-white/10 p-3 rounded text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                                        placeholder="your.email@gmail.com"
                                        value={formData.gmail}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="country" className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Country</label>
                                    <input
                                        type="text"
                                        id="country"
                                        name="country"
                                        required
                                        className="w-full bg-dark-900 border border-white/10 p-3 rounded text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                                        placeholder="Your Country"
                                        value={formData.country}
                                        onChange={handleChange}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-emerald-600 hover:bg-emerald-600/80 text-white font-bold py-4 rounded uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] mt-4"
                                >
                                    Unlock Collection
                                </button>
                            </form>

                            <div className="mt-6 text-center text-xs text-gray-500">
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
