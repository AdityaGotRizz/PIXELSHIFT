import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

const TermsOfService = () => {
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
                            Terms of Service
                        </h1>
                        <p className="font-mono text-xs text-white/40 uppercase tracking-widest">
                            Last Updated: 12 FEB 2026
                        </p>
                    </header>

                    <div className="prose prose-invert prose-lg max-w-none prose-headings:font-wide prose-headings:uppercase prose-headings:tracking-tight prose-p:font-sans prose-p:text-gray-300 prose-p:leading-relaxed">
                        <p className="lead text-2xl font-light text-white leading-relaxed mb-12">
                            Welcome to BOLTSTUDIO. These Terms of Service govern your access to and use of our website and services. By accessing or using our services, you agree to be bound by these Terms.
                        </p>

                        <h2 className="text-3xl text-white font-bold mb-6">1. Services</h2>
                        <p>BOLTSTUDIO provides AI-powered marketing content creation services, including product photography, video marketing, and social media content. You acknowledge that our services utilize artificial intelligence tools to create visual content.</p>

                        <h2 className="text-3xl text-white font-bold mb-6">2. Client Obligations</h2>
                        <p>You agree to provide accurate project requirements and necessary materials. You represent that you have the rights to all materials provided to us. You are responsible for ensuring that your use of our deliverables complies with applicable laws and platform policies (e.g., Amazon, Shopify).</p>

                        <h2 className="text-3xl text-white font-bold mb-6">3. Payment Terms</h2>
                        <p>Payment terms are specified in your service agreement or invoice. We reserve the right to suspend services for unpaid accounts. All fees are non-refundable unless otherwise stated in our Refund Policy.</p>

                        <h2 className="text-3xl text-white font-bold mb-6">4. Intellectual Property</h2>
                        <p>Upon full payment, we transfer ownership of the final deliverables to you. We retain the right to showcase the work in our portfolio unless you request otherwise.</p>

                        <h2 className="text-3xl text-white font-bold mb-6">5. Limitation of Liability</h2>
                        <p>To the maximum extent permitted by law, BOLTSTUDIO shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues.</p>

                        <h2 className="text-3xl text-white font-bold mb-6">6. Contact Information</h2>
                        <ul className="list-none space-y-2 mb-8 font-mono text-sm bg-white/5 p-6 rounded-lg border border-white/10">
                            <li><strong>Email:</strong> legal@boltstudio.com</li>
                            <li><strong>Company:</strong> BoltStudio</li>
                        </ul>
                    </div>
                </div>
            </article>
        </PageTransition>
    );
};

export default TermsOfService;
