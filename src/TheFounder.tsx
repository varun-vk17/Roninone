/**
 * TheFounder.tsx — The Operator
 * Structure: Match Unio structure (Card with circle image left, info right. Text block below).
 * Style: Apple-eqsue. Minimalist, high legibility, generous padding, ultra-subtle borders, 
 *        no social gimmicks, focus on typography and space.
 */
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// @ts-ignore - Vite handles static asset imports
import founderImg from '../IMG_20260402_233027_077.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function TheFounder() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray<HTMLElement>('.fc').forEach((el, i) => {
                gsap.fromTo(el,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1, y: 0,
                        duration: 1.2,
                        ease: 'power3.out',
                        delay: i * 0.1,
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 85%',
                            toggleActions: 'play none none none',
                        }
                    }
                );
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            id="founder"
            ref={sectionRef}
            className="relative w-full bg-transparent flex flex-col items-center overflow-hidden py-32 md:py-48"
        >
            <div className="w-full max-w-[1040px] mx-auto px-6">

                {/* ── Section Title ── */}
                <div className="fc mb-12 pl-2">
                    <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-medium tracking-tight">
                        Who builds this?
                    </h2>
                </div>

                {/* ── The Ronin Profile Card (HUD Style) ── */}
                <div className="fc relative w-full bg-[#020202]/90 backdrop-blur-md rounded-[2.5rem] p-6 sm:p-8 md:p-14 mb-12 sm:mb-16 flex flex-col md:flex-row items-center md:items-start gap-8 sm:gap-10 md:gap-16 border border-white/20 shadow-[inset_0_0_50px_rgba(0,0,0,1),0_20px_60px_rgba(0,0,0,0.8)]">

                    {/* Stitched inner border (HUD aesthetic) */}
                    <div className="absolute inset-[12px] md:inset-[16px] rounded-[2rem] border border-white/10 border-dashed pointer-events-none z-0" />

                    {/* Left: The Ronin Orb Avatar */}
                    <div className="shrink-0 relative z-10">
                        <div className="relative w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] md:w-[240px] md:h-[240px] rounded-full overflow-hidden bg-[#020202]/90 border border-white/20 shadow-[inset_0_0_60px_rgba(0,0,0,1),0_0_80px_rgba(0,0,0,0.6)] flex items-center justify-center">
                            {/* The Profile Picture */}
                            <img
                                src={founderImg}
                                alt="Varun Kumaran"
                                className="absolute inset-0 w-full h-full object-cover z-10"
                            />
                        </div>
                    </div>

                    {/* Right: Info Stack */}
                    <div className="flex-1 flex flex-col justify-center w-full md:pt-4">

                        {/* Eyebrow */}
                        <span className="font-mono text-[10px] text-white/40 tracking-[0.2em] uppercase mb-3 block">
                            Founder, Ronin
                        </span>

                        {/* Name */}
                        <h3 className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-medium tracking-tight mb-3 sm:mb-4">
                            Varun Kumaran
                        </h3>

                        {/* Core Statement */}
                        <p className="font-sans text-lg sm:text-xl md:text-2xl text-white/80 leading-snug tracking-tight font-light mb-6 sm:mb-8 max-w-lg">
                            Turning unclear businesses into trusted, revenue-driving systems.
                        </p>

                        {/* Clean minimal separator */}
                        <div className="w-full h-px bg-white/[0.06] mb-8" />

                        {/* HUD Dossier Metadata */}
                        <div className="grid grid-cols-2 gap-x-6 sm:gap-x-12 gap-y-4 sm:gap-y-6 z-10 relative mt-2">
                            <div className="flex flex-col gap-1">
                                <span className="font-mono text-[9px] text-white/30 uppercase tracking-[0.3em]">Location</span>
                                <span className="font-sans text-sm md:text-base text-white/90 font-medium tracking-wide">Global</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="font-mono text-[9px] text-white/30 uppercase tracking-[0.3em]">Focus</span>
                                <span className="font-sans text-sm md:text-base text-white/90 font-medium tracking-wide">Conversion UX</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="font-mono text-[9px] text-white/30 uppercase tracking-[0.3em]">Standard</span>
                                <span className="font-sans text-sm md:text-base text-white/90 font-medium tracking-wide">Ronin One</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="font-mono text-[9px] text-white/30 uppercase tracking-[0.3em]">Status</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                    <span className="font-sans text-sm md:text-base text-cyan-400 font-medium tracking-wide">Active</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="fc w-full max-w-4xl pl-2">
                    <p className="font-sans text-base sm:text-lg md:text-2xl text-white/50 leading-relaxed font-light tracking-tight">
                        Varun built Ronin after seeing the same problem again and again —
                        good businesses that don’t convert.

                        Not because the product is bad,
                        but because it’s unclear, unfocused, and poorly positioned.

                        Most try to fix this with design, tools, or more traffic.
                        It doesn’t work.

                        Ronin was built to fix the real problem —
                        clarity, trust, and conversion.

                        One system. One focus. One standard.
                    </p>
                </div>

            </div>
        </section>
    );
}
