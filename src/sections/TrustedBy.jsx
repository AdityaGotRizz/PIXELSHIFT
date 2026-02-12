import React from 'react';
import { motion } from 'framer-motion';
import trustedByImg from '../assets/images/trusted-by.png';

const TrustedBy = () => {
    return (
        <section className="pt-2 pb-20 bg-dark-900 flex justify-center items-center relative z-20 overflow-hidden">
            <div className="container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative group"
                >
                    {/* Glow effect behind the image */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-gradient-to-tr from-primary/30 to-secondary/30 blur-[120px] rounded-full group-hover:opacity-100 opacity-70 transition-all" />

                    <img
                        src={trustedByImg}
                        alt="Trusted by the Best"
                        className="relative z-10 w-full max-w-5xl mx-auto rounded-xl shadow-[0_0_30px_rgba(167,139,250,0.2)] border border-primary/20"
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default TrustedBy;
