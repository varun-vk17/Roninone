/**
 * TheFooter.tsx — Edge-to-edge wordmark footer
 * Unio reference layout: Multi-column top links, massive center wordmark, split bottom copyright.
 */
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { openApplyModal } from './TheApplyModal';

gsap.registerPlugin(ScrollTrigger);

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
            <div className="w-full h-px bg-white/20 mb-16" /> {/* THE SEPARATING LINE */}
            
            <footer 
                ref={footerRef}
                className="w-full flex flex-col items-center overflow-hidden"
            >
                {/* Top Navigation Grid (Unio Style) */}
                <div className="w-full grid grid-cols-2 md:grid-cols-12 gap-10 mb-20 md:mb-32">
                    
                    {/* Col 1 */}
                    <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
                        <span className="font-sans text-[13px] text-white/40 mb-2">Navigation</span>
                        <a href="#" className="font-sans text-[15px] text-white font-medium hover:text-white/70 transition-colors">The Standard</a>
                        <a href="#" className="font-sans text-[15px] text-white font-medium hover:text-white/70 transition-colors">The Process</a>
                    </div>

                    {/* Col 2 */}
                    <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
                        <span className="font-sans text-[13px] text-white/40 mb-2">Connect</span>
                        <a href="#" className="font-sans text-[15px] text-white font-medium hover:text-white/70 transition-colors">LinkedIn</a>
                        <a href="#" className="font-sans text-[15px] text-white font-medium hover:text-white/70 transition-colors">hello@ronin.com</a>
                    </div>

                    {/* Col 3 - Call to Action */}
                    <div className="col-span-2 md:col-span-8 flex flex-col md:items-end text-left md:text-right gap-3 pt-6 md:pt-0">
                        <h3 className="font-display text-3xl md:text-4xl text-white font-medium tracking-tight whitespace-nowrap">
                            Ready to set a new standard?
                        </h3>
                        <button onClick={openApplyModal} className="font-sans text-[15px] text-white font-medium underline underline-offset-[6px] decoration-white/40 hover:decoration-white transition-all w-fit md:ml-auto">
                            Apply for Ronin One
                        </button>
                    </div>

                </div>

                {/* The Massive Edge-to-Edge Wordmark */}
                <div className="w-full flex justify-center items-center footer-mark pb-16 md:pb-32 overflow-hidden px-4">
                    <span 
                        className="font-sans font-semibold text-white tracking-tight leading-[0.85] select-none text-center whitespace-nowrap"
                        style={{ fontSize: 'clamp(2.5rem, 8.5vw, 12rem)' }}
                    >
                        Make It Matter
                    </span>
                </div>

                {/* Bottom Copyright */}
                <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4">
                    <span className="font-sans text-[13px] md:text-[15px] text-white font-medium">
                        ©2026 - All Rights Reserved.
                    </span>
                </div>
                
            </footer>
        </section>
    );
}
