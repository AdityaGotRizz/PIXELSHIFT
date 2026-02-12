import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className,
    icon,
    ...props
}) => {
    const variants = {
        primary: "bg-gradient-to-r from-primary via-secondary to-accent-cyan text-white hover:opacity-90 shadow-lg shadow-primary/30 font-black uppercase italic tracking-tighter",
        secondary: "bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 font-bold uppercase tracking-tight",
        outline: "border-2 border-primary text-primary hover:bg-primary/10 font-bold uppercase tracking-tight",
        ghost: "text-gray-400 hover:text-white hover:bg-white/5 font-mono text-xs uppercase"
    };

    const sizes = {
        sm: "px-4 py-1.5 text-sm",
        md: "px-6 py-2.5 text-base",
        lg: "px-8 py-3.5 text-lg"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                "rounded-full font-medium transition-all duration-300 flex items-center gap-2",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
            {icon && <span className="text-xl">{icon}</span>}
        </motion.button>
    );
};

export default Button;
