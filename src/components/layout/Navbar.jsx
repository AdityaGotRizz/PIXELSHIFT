import React, { useState, useEffect } from 'react';
import { Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import { cn } from '../../lib/utils';
import LoginModal from '../auth/LoginModal';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Services', href: '#services', type: 'hash' },
        { name: 'Process', href: '#process', type: 'hash' },
        { name: 'Work', href: '#work', type: 'hash' },
        { name: 'Blog', href: '/blog', type: 'internal' },
        { name: 'Contact', href: '#contact', type: 'hash' },
    ];

    const handleNavClick = (e, link) => {
        if (link.type === 'hash') {
            e.preventDefault();
            if (location.pathname !== '/') {
                navigate('/');
                setTimeout(() => {
                    const element = document.getElementById(link.href.substring(1));
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            } else {
                const element = document.getElementById(link.href.substring(1));
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <nav
                className={cn(
                    "fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-transparent",
                    isScrolled ? "bg-dark-900/80 backdrop-blur-lg border-white/10 py-4" : "bg-transparent py-6"
                )}
            >
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <Link to="/" className="flex items-baseline group">
                        <span className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-white">BOLTSTUDIO</span>
                        <span className="font-mono text-[10px] ml-2 text-primary opacity-70 group-hover:opacity-100 transition-opacity hidden lg:inline tracking-tighter uppercase font-bold">
                            [ AI_SERVICES_CORE_v2.0 ]
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-10">
                        <div className="flex items-center gap-8">
                            {navLinks.map((link) => (
                                link.type === 'internal' ? (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        className="text-gray-300 hover:text-white transition-colors text-lg font-medium"
                                    >
                                        {link.name}
                                    </Link>
                                ) : (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        onClick={(e) => handleNavClick(e, link)}
                                        className="text-gray-300 hover:text-white transition-colors text-lg font-medium cursor-pointer"
                                    >
                                        {link.name}
                                    </a>
                                )
                            ))}
                        </div>

                        <button
                            onClick={() => setIsLoginOpen(true)}
                            className="text-gray-300 hover:text-white text-lg font-medium flex items-center gap-2"
                        >
                            <User className="w-5 h-5" /> Client Login
                        </button>

                        <Button variant="primary" size="md" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
                            Start Project
                        </Button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-dark-900/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
                        >
                            <div className="flex flex-col p-6 gap-4">
                                {navLinks.map((link) => (
                                    link.type === 'internal' ? (
                                        <Link
                                            key={link.name}
                                            to={link.href}
                                            className="text-gray-300 hover:text-white text-lg font-medium"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    ) : (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            onClick={(e) => handleNavClick(e, link)}
                                            className="text-gray-300 hover:text-white text-lg font-medium cursor-pointer"
                                        >
                                            {link.name}
                                        </a>
                                    )
                                ))}
                                <button
                                    onClick={() => { setIsLoginOpen(true); setIsMobileMenuOpen(false); }}
                                    className="text-left text-gray-300 hover:text-white text-lg font-medium flex items-center gap-2"
                                >
                                    <User className="w-4 h-4" /> Client Login
                                </button>
                                <Button variant="primary" className="w-full justify-center" onClick={() => { setIsMobileMenuOpen(false); document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }); }}>
                                    Start Project
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
        </>
    );
};

export default Navbar;
