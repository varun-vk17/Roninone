/**
 * TheBleed.tsx — Section 02 MK IX
 * "The Problem" Diagnostic
 * Minimalist, high-impact typography. Centered, full-width, zero cards.
 */
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TheBleed() {
    const sectionRef = useRef<HTMLElement>(null);
    const eyebrowRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const bodyRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                }
            });

            tl.fromTo(eyebrowRef.current,
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
            )
                .fromTo(headlineRef.current,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
                    '-=0.4'
                )
                .fromTo(bodyRef.current,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
                    '-=0.6'
                );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full py-32 md:py-64 bg-transparent overflow-hidden flex flex-col items-center justify-center text-center">

            {/* Background Accent - Very Subtle */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-white/[0.02] blur-[120px] rounded-full" />
            </div>

            <div className="w-full max-w-7xl mx-auto px-6 md:px-12 z-10 relative flex flex-col items-center">

                {/* Eyebrow Tagline */}
                <div ref={eyebrowRef} className="flex items-center gap-4 mb-16 md:mb-24">
                    <div className="w-8 h-px bg-white/20"></div>
                    <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase">SYS.DIAG // THE PROBLEM</span>
                    <div className="w-8 h-px bg-white/20"></div>
                </div>

                {/* The Headline */}
                <h2 ref={headlineRef} className="font-display text-5xl md:text-8xl lg:text-9xl font-medium tracking-tighter text-white leading-[1] mb-24 md:mb-32">
                    You're losing people<br />
                    you'll never know you lost.
                </h2>

                {/* The Flowing Thought */}
                <div ref={bodyRef} className="max-w-4xl mx-auto">
                    <p className="font-sans text-xl md:text-3xl text-white/60 leading-relaxed tracking-tight font-light">
                        They found you. They landed.<br />
                        They looked for a reason to stay<br />
                        and didn't find one fast enough.<br /><br />

                        So they left. And your business<br />
                        never knew they were there.<br /><br />

                        That's not a traffic problem.<br />
                        That's a <span className="text-white font-medium">page problem.</span>
                    </p>
                </div>

            </div>
        </section>
    );
}

