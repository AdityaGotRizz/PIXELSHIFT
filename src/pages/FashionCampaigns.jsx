import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const FashionCampaigns = () => {
    const [isUnlocked, setIsUnlocked] = useState(false);
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
        setIsUnlocked(true);
    };

    // Gallery images from public folder
    const fashionFolder = "/Fashion Campaigns";
    const fashionImages = [
        "Action_leaning_back_2k_202602160942 (1).jpeg",
        "Action_leaning_back_2k_202602160942.jpeg",
        "Action_model_gripping_2k_202602160950.jpeg",
        "Action_model_holding_2k_202602160947.jpeg",
        "Action_model_standing_2k_202602160936.jpeg",
        "Action_model_standing_2k_202602160941 (1).jpeg",
        "Action_model_stands_2k_202602160950.jpeg",
        "Action_model_tightening_2k_202602160945 (1).jpeg",
        "Action_model_walking_2k_202602160945.jpeg"
    ].map(filename => ({
        src: `${fashionFolder}/${filename}`,
        alt: "Fashion Campaign Shot"
    }));

    const jan11Folder = "/13 JAN 1.1 ASDF";
    const jan11Images = [
        "Caught_midmotion_as_2k_202602131202.jpeg",
        "Holding_a_basketball_2k_202602131202.jpeg",
        "Leaning_back_against_2k_202602131158 (1).jpeg",
        "Model_hanging_one_2k_202602131139 (1).jpeg",
        "Model_leaning_face_2k_202602131201 (1).jpeg",
        "Model_pulling_the_2k_202602131158.jpeg",
        "Model_standing_on_2k_202602131159.jpeg",
        "Walking_away_from_2k_202602131159.jpeg",
        "_model_standing_2k_202602131158.jpeg"
    ].map(filename => ({
        src: `${jan11Folder}/${filename}`,
        alt: "Jan 1.1 Campaign"
    }));

    const jan12Folder = "/13 JAN 1.2 ASDF";
    const jan12Images = [
        "Hands_buttoning_the_2k_202602131237.jpeg",
        "Looking_up_from_2k_202602131235.jpeg",
        "Model_bending_down_2k_202602131236 (1).jpeg",
        "Shot_from_very_2k_202602131233.jpeg",
        "Sitting_in_a_2k_202602131237.jpeg",
        "Sitting_on_the_2k_202602131234 (1).jpeg",
        "Standing_against_a_2k_202602131233.jpeg",
        "_leaning_on_2k_202602131235.jpeg",
        "_one_foot_2k_202602131232.jpeg"
    ].map(filename => ({
        src: `${jan12Folder}/${filename}`,
        alt: "Jan 1.2 Campaign"
    }));

    const jan13Folder = "/13 JAN 1.3 ASDF";
    const jan13Images = [
        "For_model_reference_2k_202602131242 (1).jpeg",
        "For_model_reference_2k_202602131242 (2).jpeg",
        "For_model_reference_2k_202602131309 (1).jpeg",
        "For_model_reference_2k_202602131309 (2).jpeg",
        "Holding_the_flannel_2k_202602131308.jpeg",
        "Model_sitting_on_2k_202602131307 (1).jpeg",
        "Sitting_on_the_2k_202602131308 (1).jpeg",
        "Standing_with_the_2k_202602131309.jpeg",
        "Walking_toward_the_2k_202602131307 (1).jpeg"
    ].map(filename => ({
        src: `${jan13Folder}/${filename}`,
        alt: "Jan 1.3 Campaign"
    }));

    const jan15Folder = "/15 JAN 3.1 ASDF";
    const jan15Images = [
        "Action_leaning_on_2k_202602142035.jpeg",
        "Action_model_adjusting_2k_202602142035.jpeg",
        "Action_model_looking_2k_202602142037.jpeg",
        "Action_one_hand_2k_202602142037.jpeg",
        "Action_peering_over_2k_202602142023.jpeg",
        "Action_sitting_on_2k_202602142030.jpeg",
        "Action_wind_blowing_2k_202602142031.jpeg",
        "Action_wind_blowing_2k_202602142033.jpeg",
        "For_model_reference_2k_202602142007 (2).jpeg",
        "For_model_reference_2k_202602141631.jpeg",
        "For_model_reference_2k_202602141632.jpeg",
        "For_model_reference_2k_202602141630.jpeg"
    ].map(filename => ({
        src: `${jan15Folder}/${filename}`,
        alt: "Jan 3.1 Campaign"
    }));

    const galleryImages = [...fashionImages, ...jan15Images, ...jan12Images, ...jan13Images, ...jan11Images];

    return (
        <div className="min-h-screen bg-dark-900 text-white relative">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center mix-blend-difference">
                <Link to="/" className="text-xl font-bold uppercase tracking-widest hover:text-accent-blue transition-colors">
                    &larr; Back to Home
                </Link>
                <div className="text-sm font-mono opacity-50">FASHION CAMPAIGNS</div>
            </nav>

            {/* Main Content Area */}
            <div className={`container mx-auto px-4 py-24 transition-all duration-700 ${isUnlocked ? 'filter-none' : 'blur-xl pointer-events-none'}`}>
                <header className="mb-16 text-center">
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
                        High Fashion <br /> Editorial
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Avant-garde visuals redefining the landscape of modern fashion photography.
                    </p>
                </header>

                {/* Gallery Grid - Masonry-ish feel with varied aspect ratios if needed, but standard grid for now */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {galleryImages.map((img, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative overflow-hidden rounded-sm bg-dark-800"
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
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-600" /> {/* Gold theme for Fashion */}

                            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 uppercase tracking-tight text-white">
                                Exclusive Access
                            </h2>
                            <p className="text-amber-500 text-center font-mono text-sm mb-8 uppercase tracking-widest border-b border-white/10 pb-4">
                                The Gallery Can Only Be Visible After Sign Up
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        className="w-full bg-dark-900 border border-white/10 p-3 rounded text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
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
                                        className="w-full bg-dark-900 border border-white/10 p-3 rounded text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
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
                                        className="w-full bg-dark-900 border border-white/10 p-3 rounded text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                                        placeholder="Your Country"
                                        value={formData.country}
                                        onChange={handleChange}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-amber-600 hover:bg-amber-600/80 text-white font-bold py-4 rounded uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] mt-4"
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

export default FashionCampaigns;
