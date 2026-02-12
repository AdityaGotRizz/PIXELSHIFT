import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white text-black pt-24 pb-12 border-t-8 border-black">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
                    <div className="md:col-span-2">
                        <div className="flex items-baseline mb-8 group">
                            <span className="text-3xl md:text-5xl font-wide font-bold uppercase italic tracking-tighter">PIXELSHIFT</span>
                            <span className="font-pixel text-[10px] ml-4 text-primary bg-black text-white px-2 py-1">
                                [ GLOBAL_CORE_v4.2 ]
                            </span>
                        </div>
                        <p className="font-script text-3xl text-secondary mb-10 max-w-sm leading-tight -rotate-1">
                            "Transforming energy into digital infrastructure, one pixel at a time."
                        </p>
                        <div className="pt-8 border-t-2 border-dashed border-black/10 inline-block">
                            <span className="block text-[10px] font-pixel text-black/40 uppercase mb-3 tracking-widest">Partner_Registry:8201</span>
                            <p className="font-wide text-2xl font-bold uppercase tracking-tighter text-black">
                                ADITYA<span className="text-primary italic">.SYS</span>
                            </p>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-pixel text-xs text-black/30 uppercase mb-10">Navigation</h4>
                        <ul className="space-y-4 font-wide text-sm uppercase font-bold">
                            <li><a href="#services" className="hover:text-primary transition-all hover:translate-x-1 inline-block">{" >> "}Services</a></li>
                            <li><a href="#work" className="hover:text-primary transition-all hover:translate-x-1 inline-block">{" >> "}Showcase</a></li>
                            <li><a href="#about" className="hover:text-primary transition-all hover:translate-x-1 inline-block">{" >> "}About</a></li>
                            <li><a href="#contact" className="hover:text-primary transition-all hover:translate-x-1 inline-block">{" >> "}Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-pixel text-xs text-black/30 uppercase mb-10">Legal</h4>
                        <ul className="space-y-4 font-wide text-sm uppercase font-bold">
                            <li><Link to="/privacy" className="hover:text-primary transition-all hover:translate-x-1 inline-block">Privacy_Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-primary transition-all hover:translate-x-1 inline-block">Terms_of_Srv</Link></li>
                            <li className="mt-8 pt-8 border-t border-black/5">
                                <span className="font-pixel text-[10px] text-black/40">© 2026 PIXELSHIFT</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-10 border-t-2 border-black flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="font-pixel text-[10px] text-black/40 tracking-tight uppercase">
                        Protocol: Secure // Env: Production // Status: Active
                    </div>
                    <div className="flex gap-4">
                        <div className="w-10 h-10 border-2 border-black flex items-center justify-center font-pixel text-xs hover:bg-black hover:text-white transition-all cursor-pointer shadow-pixel">TW</div>
                        <div className="w-10 h-10 border-2 border-black flex items-center justify-center font-pixel text-xs hover:bg-black hover:text-white transition-all cursor-pointer shadow-pixel">LI</div>
                        <div className="w-10 h-10 border-2 border-black flex items-center justify-center font-pixel text-xs hover:bg-black hover:text-white transition-all cursor-pointer shadow-pixel">IG</div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
