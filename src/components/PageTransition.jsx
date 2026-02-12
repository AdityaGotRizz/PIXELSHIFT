import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
    initial: {
        opacity: 0,
        y: 20,
        scale: 0.98,
        filter: "blur(10px)"
    },
    in: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1] // Custom ease "out-quart"
        }
    },
    out: {
        opacity: 0,
        y: -20,
        filter: "blur(10px)",
        transition: {
            duration: 0.4,
            ease: "easeInOut"
        }
    }
};

const PageTransition = ({ children }) => {
    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            className="w-full"
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
