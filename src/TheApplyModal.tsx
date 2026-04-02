import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect } from 'react';

// Global trigger function to open the modal from ANY component
export const openApplyModal = () => window.dispatchEvent(new Event('open-apply-modal'));

export default function TheApplyModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        window.addEventListener('open-apply-modal', handleOpen);
        return () => window.removeEventListener('open-apply-modal', handleOpen);
    }, []);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const onClose = () => {
        setIsOpen(false);
        setTimeout(() => setStatus('idle'), 500); // Reset after exit animation
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('sending');

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            // Replace with your Formspree/Netlify endpoint
            const response = await fetch('https://formspree.io/f/YOUR_ENDPOINT_HERE', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setStatus('success');
                setTimeout(() => onClose(), 2500);
            } else {
                setStatus('error');
            }
        } catch (err) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto">
                    {/* Dark Blurred Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-2xl"
                        onClick={status === 'sending' ? undefined : onClose}
                    />

                    {/* Gradient Ambient Glow behind the modal */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 0.3, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="absolute w-[60vw] h-[60vh] bg-gradient-to-br from-cyan-500 via-blue-600 to-[#5443d3] rounded-full blur-[100px] pointer-events-none mix-blend-screen"
                    />

                    {/* The Modal Form Container */}
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-xl mx-4 bg-[#050505] border border-white/10 rounded-[2rem] shadow-[0_0_80px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden"
                    >
                        {/* Stitched inner border styling */}
                        <div className="absolute inset-[8px] rounded-[1.5rem] border border-white/5 border-dashed pointer-events-none z-0" />

                        {/* Top Ribbon & Close Button */}
                        <div className="relative z-10 flex items-center justify-between px-8 pt-8 pb-4">
                            <span className="font-mono text-[10px] text-white/50 tracking-[0.3em] uppercase">
                                Transmission_Link
                            </span>
                            <button 
                                onClick={onClose}
                                disabled={status === 'sending'}
                                className="text-white/40 hover:text-white transition-colors duration-300 disabled:opacity-0"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>

                        {/* Form Body */}
                        <form className="relative z-10 px-8 pb-10 flex flex-col gap-6" onSubmit={handleSubmit}>
                            
                            <div className="space-y-2">
                                <h3 className="font-display text-4xl text-white font-medium tracking-tight">
                                    {status === 'success' ? 'Link Established.' : 'Initiate.'}
                                </h3>
                                <p className="font-sans text-sm text-white/40">
                                    {status === 'success' ? 'Transmission received. We will be in touch.' : 'Zero retainers. Zero friction. Tell us what you need.'}
                                </p>
                            </div>

                            {status !== 'success' && (
                                <>
                                    <div className="flex flex-col gap-4 mt-2">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {/* Name Input */}
                                            <div className="relative group">
                                                <input 
                                                    name="name"
                                                    type="text" 
                                                    required
                                                    disabled={status === 'sending'}
                                                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-4 font-sans text-white text-sm outline-none transition-all duration-300 focus:bg-white/[0.05] focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(0,255,204,0.15)] placeholder:text-white/20 disabled:opacity-50"
                                                    placeholder="Your Name"
                                                />
                                            </div>

                                            {/* Email Input */}
                                            <div className="relative group">
                                                <input 
                                                    name="email"
                                                    type="email" 
                                                    required
                                                    disabled={status === 'sending'}
                                                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-4 font-sans text-white text-sm outline-none transition-all duration-300 focus:bg-white/[0.05] focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(0,255,204,0.15)] placeholder:text-white/20 disabled:opacity-50"
                                                    placeholder="Email Address"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {/* What you do */}
                                            <div className="relative group">
                                                <input 
                                                    name="role"
                                                    type="text" 
                                                    required
                                                    disabled={status === 'sending'}
                                                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-4 font-sans text-white text-sm outline-none transition-all duration-300 focus:bg-white/[0.05] focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(0,255,204,0.15)] placeholder:text-white/20 disabled:opacity-50"
                                                    placeholder="What do you do?"
                                                />
                                            </div>

                                            {/* Website Link (Optional) */}
                                            <div className="relative group">
                                                <input 
                                                    name="website"
                                                    type="url" 
                                                    disabled={status === 'sending'}
                                                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-4 font-sans text-white text-sm outline-none transition-all duration-300 focus:bg-white/[0.05] focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(0,255,204,0.15)] placeholder:text-white/20 disabled:opacity-50"
                                                    placeholder="Website (Optional)"
                                                />
                                            </div>
                                        </div>

                                        {/* Message Input */}
                                        <div className="relative group">
                                            <textarea 
                                                name="message"
                                                required
                                                rows={4}
                                                disabled={status === 'sending'}
                                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-4 font-sans text-white text-sm outline-none transition-all duration-300 focus:bg-white/[0.05] focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(0,255,204,0.15)] placeholder:text-white/20 resize-none disabled:opacity-50"
                                                placeholder="Mission Brief (What are we building for you?)"
                                            ></textarea>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <motion.button 
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        disabled={status === 'sending'}
                                        type="submit"
                                        className="w-full relative overflow-hidden rounded-xl bg-white px-8 py-4 font-display font-semibold text-black shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all duration-300 group disabled:opacity-50"
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            {status === 'sending' ? 'Sending...' : 'Send Transmission'}
                                            <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                                        </span>
                                    </motion.button>
                                </>
                            )}
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
