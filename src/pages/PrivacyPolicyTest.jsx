import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <PageTransition>
            <article className="min-h-screen bg-dark-900 pt-32 pb-40 px-6">
                <div className="container mx-auto max-w-4xl relative">
                    <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-12 font-mono text-xs uppercase tracking-widest transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back_To_Home
                    </Link>

                    <header className="mb-16 border-b border-white/10 pb-16">
                        <h1 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">
                            Privacy Policy
                        </h1>
                        <p className="font-mono text-xs text-white/40 uppercase tracking-widest">
                            Last Updated: 12 FEB 2026
                        </p>
                    </header>

                    <div className="prose prose-invert prose-lg max-w-none prose-headings:font-wide prose-headings:uppercase prose-headings:tracking-tight prose-p:font-sans prose-p:text-gray-300 prose-p:leading-relaxed">
                        <p className="lead text-2xl font-light text-white leading-relaxed mb-12">
                            Welcome to BADDIE CONSULTING ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information.
                        </p>

                        <h2 className="text-3xl text-white font-bold mb-6">1. Information We Collect</h2>
                        <h3 className="text-2xl text-white font-bold mb-4">1.1 Personal Information You Provide</h3>
                        <p>We collect information that you voluntarily provide to us when you contact us, request services, or make a payment. This may include your name, email address, phone number, company details, and billing information.</p>

                        <h3 className="text-2xl text-white font-bold mb-4">1.2 Information Automatically Collected</h3>
                        <p>When you visit our website, we automatically collect certain information about your device and browsing activity, including IP address, browser type, and pages visited.</p>

                        <h2 className="text-3xl text-white font-bold mb-6">2. How We Use Your Information</h2>
                        <ul className="list-disc pl-6 space-y-2 mb-8">
                            <li>To provide and deliver our services (AI photography, video marketing, etc.)</li>
                            <li>To process transactions and send invoices</li>
                            <li>To communicate with you about your projects</li>
                            <li>To improve our website and services</li>
                            <li>To comply with legal obligations</li>
                        </ul>

                        <h2 className="text-3xl text-white font-bold mb-6">3. How We Share Your Information</h2>
                        <p>We do not sell your personal information. We may share your information with trusted third-party service providers who assist us in operating our website and conducting our business (e.g., payment processors, cloud storage), provided they agree to keep this information confidential.</p>

                        <h2 className="text-3xl text-white font-bold mb-6">4. Data Security</h2>
                        <p>We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>

                        <h2 className="text-3xl text-white font-bold mb-6">5. Your Rights</h2>
                        <p>Depending on your location, you may have rights regarding your personal information, such as the right to access, correct, or delete your data. Contact us at privacy@baddieconsulting.com to exercise these rights.</p>

                        <h2 className="text-3xl text-white font-bold mb-6">6. Contact Us</h2>
                        <p>If you have questions about this Privacy Policy, please contact us at:</p>
                        <ul className="list-none space-y-2 mb-8 font-mono text-sm bg-white/5 p-6 rounded-lg border border-white/10">
                            <li><strong>Email:</strong> privacy@baddieconsulting.com</li>
                            <li><strong>Company:</strong> Baddie Consulting</li>
                        </ul>
                    </div>
                </div>
            </article>
        </PageTransition>
    );
};

export default PrivacyPolicy;
