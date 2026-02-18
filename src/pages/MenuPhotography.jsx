import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';


const MenuPhotography = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        auditory: '', // Simple bot check or just internal naming? Using 'gmail' as requested
        gmail: '',
        country: ''
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
                        email: formData.gmail,
                        project_type: 'Gallery Unlock: Menu Photography',
                        message: `User Country: ${formData.country}`
                    }
                ]);

            if (error) throw error;

            // Success
            setIsUnlocked(true);
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Gallery images from public folder
    const pastaFolder = "/PASTA - HANDMADE CARBONARA";
    const pastaImages = [
        "Professional_food_photography_202602161119 (3).jpeg",
        "Professional_food_photography_202602161119 (6).jpeg",
        "Professional_food_photography_202602161119 (8).jpeg",
        "Professional_food_photography_202602161119 (9).jpeg",
        "Professional_food_photography_202602161120 (3).jpeg",
        "Professional_food_photography_202602161120 (5).jpeg",
        "Professional_food_photography_202602161120 (7).jpeg"
    ].map(filename => ({
        src: `${pastaFolder}/${filename}`,
        alt: "Handmade Carbonara Detail"
    }));

    const steakFolder = "/MAIN COURSE - TOMAHAWK STEAK";
    const steakImages = [
        "Commercial_food_photography_202602161106 (14).jpeg",
        "Commercial_food_photography_202602161106 (2).jpeg",
        "Commercial_food_photography_202602161106 (5).jpeg",
        "Commercial_food_photography_202602161106 (7).jpeg",
        "Commercial_food_photography_202602161106 (8).jpeg",
        "Commercial_food_photography_202602161107 (2).jpeg",
        "Commercial_food_photography_202602161107.jpeg"
    ].map(filename => ({
        src: `${steakFolder}/${filename}`,
        alt: "Tomahawk Steak"
    }));

    const cocktailFolder = "/COCKTAILS - SMOKED OLD FASHIONED";
    const cocktailImages = [
        "Commercial_beverage_photography_20260216114 (1).jpeg",
        "Commercial_beverage_photography_20260216114 (3).jpeg",
        "Commercial_beverage_photography_20260216114 (4).jpeg",
        "Commercial_beverage_photography_20260216114 (5).jpeg",
        "Commercial_beverage_photography_20260216114 (7).jpeg",
        "Commercial_beverage_photography_202602161141 (3).jpeg",
        "Commercial_beverage_photography_202602161141.jpeg"
    ].map(filename => ({
        src: `${cocktailFolder}/${filename}`,
        alt: "Smoked Old Fashioned"
    }));

    const appetizerFolder = "/APPETIZER - SEARED SCALLOPS";
    const appetizerImages = [
        "Commercial_food_photography_202602161055 (1).jpeg",
        "Commercial_food_photography_202602161055 (13).jpeg",
        "Commercial_food_photography_202602161055 (14).jpeg",
        "Commercial_food_photography_202602161055 (3).jpeg",
        "Commercial_food_photography_202602161055 (7).jpeg",
        "Commercial_food_photography_202602161055.jpeg",
        "Commercial_food_photography_2k_202602161047.jpeg",
        "_variation_104_202602161056 (1).jpeg"
    ].map(filename => ({
        src: `${appetizerFolder}/${filename}`,
        alt: "Seared Scallops"
    }));

    const foodFolder = "/food";
    const foodImages = [
        "bur 1.png", "bur 3.png", "bur 4.png", "bur 7.png", "bur 8.png", "bur9.png",
        "fe 1.png", "fe 2.png", "fe 3.png", "fe 4.png", "fe 5.png", "fe 6.png",
        "fe 7.png", "fe 8.png", "fe 9.png", "fe 10.png", "fe 11.png", "fe 12.png",
        "fe 13.png", "fe 14.png", "fe 15.png", "fe 16.png", "fe 17.png", "fe 18.png"
    ].map(filename => ({
        src: `${foodFolder}/${filename}`,
        alt: "Gourmet Dish"
    }));

    const newFolder = "/New folder";
    const newFolderImages = [
        "download (6).jpg",
        "food shots 1.png", "food shots 2.png", "food shots 3.png", "food shots 4.png", "food shots 5.png",
        "food shots 6.png", "food shots 7.png", "food shots 8.png", "food shots 9.png", "food shots 10.png",
        "food shots 11.png", "food shots 12.png", "food shots 13.png", "food shots 14.png", "food shots 15.png",
        "food shots 16.png", "food shots 17.png", "food shots 18.png", "food shots 19.png", "food shots 20.png",
        "food shots 21.png",
        "q 26.png", "q 27.png", "q 28.png", "q 29.png", "q 30.png", "q 31.png", "q 32.png", "q 33.png"
    ].map(filename => ({
        src: `${newFolder}/${filename}`,
        alt: "Culinary Shot"
    }));

    // logical order: Appertizer -> Pasta ->  Food -> New Folder -> Main -> Cocktail
    const galleryImages = [...appetizerImages, ...pastaImages, ...foodImages, ...newFolderImages, ...steakImages, ...cocktailImages];

    return (
        <div className="min-h-screen bg-dark-900 text-white relative">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center mix-blend-difference">
                <Link to="/" className="text-xl font-bold uppercase tracking-widest hover:text-accent-blue transition-colors">
                    &larr; Back to Home
                </Link>
                <div className="text-sm font-mono opacity-50">RESTAURANT & CAFE PHOTOGRAPHY</div>
            </nav>

            {/* Main Content Area */}
            <div className={`container mx-auto px-4 py-24 transition-all duration-700 ${isUnlocked ? 'filter-none' : 'blur-xl pointer-events-none'}`}>
                <header className="mb-16 text-center">
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
                        Culinary <br /> Masterpieces
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        A curated selection of high-end menu photography that captures the essence of taste and atmosphere.
                    </p>
                </header>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {galleryImages.map((img, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative aspect-[4/5] overflow-hidden rounded-sm bg-dark-800"
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
                        {/* Overlay to prevent clicking behind */}
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="relative bg-dark-800 border border-white/10 p-8 md:p-12 max-w-lg w-full shadow-2xl rounded-xl overflow-hidden"
                        >
                            {/* Decorative elements */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-blue to-purple-600" />

                            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 uppercase tracking-tight text-white">
                                Exclusive Access
                            </h2>
                            <p className="text-accent-blue text-center font-mono text-sm mb-2 uppercase tracking-widest">
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
                                        className="w-full bg-dark-900 border border-white/10 p-3 rounded text-white focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all"
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
                                        className="w-full bg-dark-900 border border-white/10 p-3 rounded text-white focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all"
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
                                        className="w-full bg-dark-900 border border-white/10 p-3 rounded text-white focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all"
                                        placeholder="Your Country"
                                        value={formData.country}
                                        onChange={handleChange}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-accent-blue hover:bg-accent-blue/80 text-white font-bold py-4 rounded uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? "Unlocking..." : "Unlock Gallery"}
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

export default MenuPhotography;
