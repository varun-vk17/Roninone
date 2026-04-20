/**
 * TheFooter.tsx — Edge-to-edge wordmark footer
 * Unio reference layout: Multi-column top links, massive center wordmark, split bottom copyright.
 */
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { openApplyModal } from './TheApplyModal';

gsap.registerPlugin(ScrollTrigger);

const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

export default function TheFooter() {
    const footerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.footer-mark', 
                { opacity: 0, y: 50 }, 
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 1.2, 
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: 'top 95%',
                    }
                }
            );
        }, footerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section className="relative z-10 w-full bg-[#000] px-4 md:px-8 pb-8">
            <div className="w-full h-px bg-white/20 mb-16" />
            
            <footer 
                ref={footerRef}
                className="w-full flex flex-col items-center overflow-hidden"
            >
                {/* Top Navigation Grid */}
                <div className="w-full grid grid-cols-2 md:grid-cols-12 gap-8 sm:gap-10 mb-16 sm:mb-20 md:mb-32">
                    
                    {/* Col 1 — Navigation */}
                    <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
                        <span className="font-sans text-[13px] text-white/40 mb-2">Navigation</span>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="font-sans text-[15px] text-white font-medium hover:text-white/60 transition-colors text-left"
                        >
                            Home
                        </button>
                        <button
                            onClick={() => scrollTo('ronin-one')}
                            className="font-sans text-[15px] text-white font-medium hover:text-white/60 transition-colors text-left"
                        >
                            Ronin One
                        </button>
                        <button
                            onClick={() => scrollTo('founder')}
                            className="font-sans text-[15px] text-white font-medium hover:text-white/60 transition-colors text-left"
                        >
                            The Founder
                        </button>
                        <button
                            onClick={() => scrollTo('apply')}
                            className="font-sans text-[15px] text-white font-medium hover:text-white/60 transition-colors text-left"
                        >
                            Get Audit
                        </button>
                    </div>

                    {/* Col 2 — Connect */}
                    <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
                        <span className="font-sans text-[13px] text-white/40 mb-2">Connect</span>
                        <a
                            href="https://www.linkedin.com/in/varun-kumaran17"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-sans text-[15px] text-white font-medium hover:text-white/60 transition-colors inline-flex items-center gap-1.5 group"
                        >
                            LinkedIn
                            <svg
                                className="w-3 h-3 opacity-40 group-hover:opacity-80 transition-opacity"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            >
                                <path d="M7 17L17 7M17 7H7M17 7v10"/>
                            </svg>
                        </a>
                        <a
                            href="https://wa.me/918610871405"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-sans text-[15px] text-white font-medium hover:text-white/60 transition-colors"
                        >
                            WhatsApp
                        </a>
                    </div>

                    {/* Col 3 — CTA */}
                    <div className="col-span-2 md:col-span-8 flex flex-col md:items-end text-left md:text-right gap-3 pt-4 sm:pt-6 md:pt-0">
                        <h3 className="font-display text-3xl md:text-4xl text-white font-medium tracking-tight whitespace-normal sm:whitespace-nowrap">
                            Ready to set a new standard?
                        </h3>
                        <button
                            onClick={openApplyModal}
                            className="font-sans text-[15px] text-white font-medium underline underline-offset-[6px] decoration-white/40 hover:decoration-white transition-all w-fit md:ml-auto"
                        >
                            Get clarity audit
                        </button>
                    </div>

                </div>

                {/* Wordmark */}
                <div className="w-full flex justify-center items-center footer-mark pb-16 md:pb-32 overflow-hidden px-4">
                    <span 
                        className="font-sans font-semibold text-white tracking-tight leading-[0.85] select-none text-center whitespace-nowrap"
                        style={{ fontSize: 'clamp(1.8rem, 8.5vw, 12rem)' }}
                    >
                        Make It Matter
                    </span>
                </div>

                {/* Bottom Copyright */}
                <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 pb-4">
                    <span className="font-sans text-[13px] md:text-[15px] text-white font-medium">
                        ©2026 - All Rights Reserved.
                    </span>
                    <a
                        href="https://www.linkedin.com/in/varun-kumaran17"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-sans text-[13px] text-white/40 hover:text-white/70 transition-colors"
                    >
                        Varun Kumaran
                    </a>
                </div>
                
            </footer>
        </section>
    );
}
