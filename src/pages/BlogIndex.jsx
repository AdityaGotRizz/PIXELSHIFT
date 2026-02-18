import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';

import { blogPosts } from '../data/blogPosts';

const BlogIndex = () => {
    return (
        <PageTransition>
            <SEO
                title="Blog"
                description="Insights from the bleeding edge of interface capability and strategic automation. Read our latest articles on AI, design, and growth."
                url="/blog"
            />
            <section className="min-h-screen bg-dark-900 pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-5xl">
                    <div className="flex flex-col items-start mb-20">
                        <div className="inline-block border border-[#8b0000] px-4 py-1 rounded-full text-[10px] font-pixel text-[#8b0000] uppercase tracking-[0.3em] mb-6 bg-[#8b0000]/10">
                            Neural_Archive_v1.0
                        </div>
                        <h1 className="text-4xl sm:text-6xl md:text-9xl font-black text-white uppercase tracking-tighter mb-8 leading-none">
                            System <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b0000] to-white italic">Logs</span>
                        </h1>
                        <p className="font-mono text-gray-400 max-w-xl text-lg">
                            Insights from the bleeding edge of interface capability and strategic automation.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                        {blogPosts.map((article, index) => (
                            <Link to={`/blog/${article.id}`} key={article.id}>
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group relative border-t border-white/10 py-12 hover:bg-white/5 transition-colors duration-300"
                                >
                                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-gray-500">
                                                <span>{article.date}</span>
                                                <span className="w-1 h-1 bg-[#8b0000] rounded-full" />
                                                <span className="text-[#8b0000] font-bold">[{article.category}]</span>
                                            </div>
                                            <h2 className="text-2xl md:text-5xl font-bold text-white uppercase tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#8b0000] transition-all duration-300">
                                                {article.title}
                                            </h2>
                                            <p className="text-gray-400 font-medium max-w-2xl">
                                                {article.excerpt}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-4 opacity-50 group-hover:opacity-100 transition-opacity">
                                            <span className="font-pixel text-[10px] uppercase tracking-widest text-white">Read_File</span>
                                            <div className="w-12 h-12 border border-white/20 flex items-center justify-center rounded-full group-hover:bg-[#8b0000] group-hover:border-[#8b0000] transition-all">
                                                <ArrowRight className="w-5 h-5 text-white -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </PageTransition>
    );
};

export default BlogIndex;
