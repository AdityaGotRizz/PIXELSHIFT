import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Calendar, Tag } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { blogPosts } from '../data/blogPosts';

const BlogPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const foundPost = blogPosts.find(p => p.id === id);
        if (foundPost) {
            setPost(foundPost);
        } else {
            // navigate('/blog'); // Optional: redirect if not found
        }
    }, [id, navigate]);

    if (!post) {
        return (
            <div className="min-h-screen bg-dark-900 flex items-center justify-center text-white">
                Loading...
            </div>
        );
    }

    // Simple Markdown Parser
    const renderContent = (content) => {
        const sections = content.split('\n\n');

        return sections.map((section, index) => {
            // Headers
            if (section.startsWith('## ')) {
                return <h2 key={index} className="text-3xl text-white font-bold mb-6 mt-12">{parseInline(section.replace('## ', ''))}</h2>;
            }
            if (section.startsWith('### ')) {
                return <h3 key={index} className="text-2xl text-white font-bold mb-4 mt-8">{parseInline(section.replace('### ', ''))}</h3>;
            }

            // Blockquote (rough approximation if needed, though user content didn't explicitly use > style much, but standard md does)
            // The provided content uses "---" for separators, let's handle that
            if (section.trim() === '---') {
                return <hr key={index} className="border-white/10 my-12" />;
            }

            // Lists
            if (section.trim().startsWith('- ')) {
                const items = section.split('\n').filter(line => line.trim().startsWith('- '));
                return (
                    <ul key={index} className="list-disc pl-6 mb-6 space-y-2 text-gray-300">
                        {items.map((item, i) => (
                            <li key={i}>{parseInline(item.replace('- ', ''))}</li>
                        ))}
                    </ul>
                );
            }

            // Tables (Simple rendering for the specific case study table)
            if (section.trim().startsWith('|')) {
                const rows = section.split('\n').filter(row => row.trim().startsWith('|'));
                return (
                    <div key={index} className="overflow-x-auto my-8">
                        <table className="w-full text-left border-collapse">
                            <tbody>
                                {rows.map((row, rIndex) => {
                                    const cells = row.split('|').filter(cell => cell.trim() !== '');
                                    // Skip separator rows like |---|---|
                                    if (row.includes('---')) return null;

                                    return (
                                        <tr key={rIndex} className={rIndex === 0 ? "bg-white/10" : "border-b border-white/5"}>
                                            {cells.map((cell, cIndex) => (
                                                <td key={cIndex} className={`p-4 ${rIndex === 0 ? "font-bold text-white" : "text-gray-300"}`}>
                                                    {parseInline(cell.trim())}
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                );
            }

            // Paragraphs
            return <p key={index} className="mb-6 text-gray-300 leading-relaxed font-sans">{parseInline(section)}</p>;
        });
    };

    // Helper to parse bold (**text**) and italic (*text*)
    const parseInline = (text) => {
        // This is a very basic parser. It splits by ** and alternates normal/bold.
        // It isn't robust for nested or complex markdown but works for standard bolding.
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i} className="text-white font-bold">{part.slice(2, -2)}</strong>;
            }
            return part; // Return text as is (can add more parsing here if needed)
        });
    };

    return (
        <PageTransition>
            <article className="min-h-screen bg-dark-900 pt-32 pb-40 px-6">
                {/* Progress Bar (Fake) */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="fixed top-0 left-0 h-1 bg-[#8b0000] z-50 origin-left"
                />

                <div className="container mx-auto max-w-4xl relative">
                    <Link to="/blog" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-12 font-mono text-xs uppercase tracking-widest transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back_To_Root
                    </Link>

                    <header className="mb-16 border-b border-white/10 pb-16">
                        <div className="flex flex-wrap gap-4 mb-6">
                            <span className="bg-[#8b0000]/10 text-[#8b0000] px-3 py-1 text-[10px] font-pixel uppercase tracking-widest border border-[#8b0000]/20">
                                {post.category || 'Opinion'}
                            </span>
                            <span className="bg-white/5 text-white/60 px-3 py-1 text-[10px] font-mono uppercase tracking-widest">
                                READ_TIME: 5_MIN
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-6xl font-black text-white uppercase tracking-tighter leading-[1.1] mb-8">
                            {post.title}
                        </h1>

                        <div className="flex items-center justify-between font-mono text-xs text-white/40 uppercase tracking-widest">
                            <div className="flex items-center gap-6">
                                <span className="flex items-center gap-2">
                                    <Calendar className="w-3 h-3" /> {post.date}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Tag className="w-3 h-3" /> {post.category || 'Startups'}
                                </span>
                            </div>
                            <button className="hover:text-white transition-colors">
                                <Share2 className="w-4 h-4" />
                            </button>
                        </div>
                    </header>

                    <div className="prose prose-invert prose-lg max-w-none">
                        {renderContent(post.content)}
                    </div>
                </div>
            </article>
        </PageTransition>
    );
};

export default BlogPost;
