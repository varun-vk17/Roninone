import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { openApplyModal } from './TheApplyModal';

gsap.registerPlugin(ScrollTrigger);

export default function TheRoninOne() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray<HTMLElement>('.cb').forEach((el, i) => {
                gsap.fromTo(el,
                    { opacity: 0, y: 24 },
                    {
                        opacity: 1, y: 0,
                        duration: 0.9,
                        ease: 'power3.out',
                        delay: i * 0.04,
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 90%',
                            toggleActions: 'play none none none',
                        }
                    }
                );
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const cardsData = [
        {
            num: '01',
            headline: 'More revenue.\nBetter conversions.',
            blobs: (
                <>
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-blue-600 to-[#5443d3] opacity-50" />
                    <div className="absolute top-[-20%] right-[-20%] w-[90%] h-[90%] bg-blue-200 rounded-full blur-[100px] opacity-25" />
                </>
            ),
            icon: (
                /* Abstract: single perfect circle — contained, resolved */
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <circle cx="18" cy="18" r="12" stroke="white" strokeWidth="1.5" strokeOpacity="0.7" />
                    <circle cx="18" cy="18" r="4" fill="white" fillOpacity="0.6" />
                </svg>
            )
        },
        {
            num: '02',
            headline: 'A business that commands\nthe perception it deserves.',
            blobs: (
                <>
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-500 via-blue-600 to-[#5443d3] opacity-50" />
                    <div className="absolute bottom-[-20%] left-[-20%] w-[90%] h-[90%] bg-blue-200 rounded-full blur-[100px] opacity-25" />
                </>
            ),
            icon: (
                /* Abstract: equilateral triangle — stable, apex-oriented */
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <polygon points="18,7 31,28 5,28" stroke="white" strokeWidth="1.5" strokeOpacity="0.7" strokeLinejoin="round" fill="none" />
                    <polygon points="18,14 24,24 12,24" fill="white" fillOpacity="0.55" />
                </svg>
            )
        },
        {
            num: '03',
            headline: 'Built around your business.\nEngineered to perform.',
            blobs: (
                <>
                    <div className="absolute inset-0 bg-gradient-to-bl from-cyan-500 via-blue-600 to-[#5443d3] opacity-50" />
                    <div className="absolute bottom-[-20%] right-[-20%] w-[90%] h-[90%] bg-blue-200 rounded-full blur-[100px] opacity-25" />
                </>
            ),
            icon: (
                /* Abstract: square rotated 45° — a diamond of precision */
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <rect x="9" y="9" width="18" height="18" rx="1" transform="rotate(45 18 18)" stroke="white" strokeWidth="1.5" strokeOpacity="0.7" fill="none" />
                    <rect x="14" y="14" width="8" height="8" rx="0.5" transform="rotate(45 18 18)" fill="white" fillOpacity="0.55" />
                </svg>
            )
        }
    ];

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-transparent flex flex-col items-center overflow-hidden"
        >
            {/* ─────────────────────────────────────────────
                MOMENT 1 — The Declaration
            ───────────────────────────────────────────── */}
            <div className="w-full flex flex-col items-center text-center px-6 pt-36 max-w-4xl mx-auto">
                <div className="cb inline-flex items-center gap-2 mb-10">
                    <div className="h-px w-6 bg-white/30" />
                    <span className="font-mono text-[10px] text-white tracking-[0.4em] uppercase opacity-70">Ronin One</span>
                    <div className="h-px w-6 bg-white/30" />
                </div>

                {/* Block 1 — The context. */}
                <div className="cb space-y-4">
                    <p className="font-sans text-base md:text-lg text-white/40 tracking-tight leading-relaxed max-w-xl">
                        For twenty years, a landing page<br />
                        meant a brief, a design, and a hope.
                    </p>
                    <p className="font-sans text-base md:text-lg text-white/40 tracking-tight leading-relaxed max-w-xl">
                        Most still do.
                    </p>
                </div>
            </div>

            {/* ── The deliberate pause ── */}
            <div className="w-full flex flex-col items-center text-center px-6 pt-12 pb-28 max-w-4xl mx-auto">
                <h2 className="cb font-display text-5xl md:text-[4.5rem] lg:text-[5.5rem] text-white font-medium tracking-tighter leading-[1.0]">
                    Ronin One.<br />
                    <span className="text-white/60 whitespace-nowrap text-[2.2rem] md:text-[3.4rem] lg:text-[4rem]">The standard for your business</span>
                </h2>
            </div>

            {/* ─────────────────────────────────────────────
                MOMENT 2 — The Three Outcomes (Ronin Style Visuals)
            ───────────────────────────────────────────── */}
            <div className="cb w-full max-w-[1120px] mx-auto px-4 pb-32">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {cardsData.map((card) => (
                        <motion.div
                            whileHover="hover"
                            onClick={openApplyModal}
                            key={card.num}
                            className="relative rounded-[1.75rem] overflow-hidden flex flex-col justify-between bg-[#050505] transition-colors duration-700 hover:bg-[#070707] cursor-pointer group/card"
                            style={{ minHeight: '460px' }}
                        >
                            {/* Blobs — mix-blend-screen for vibrant color pools */}
                            <motion.div
                                variants={{
                                    hover: { scale: 1.08, opacity: 1, filter: "brightness(1.5)" }
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="absolute inset-0 mix-blend-screen pointer-events-none"
                            >
                                {card.blobs}
                            </motion.div>

                            {/* Grain — to give it that organic Apple/OpenAI wallpaper feel */}
                            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`, backgroundSize: '180px 180px', opacity: 0.35, mixBlendMode: 'soft-light' }} />

                            {/* Visual — centered orb mark (Ronin Style) */}
                            <div className="relative z-10 flex-1 flex items-center justify-center">
                                <div className="relative w-24 h-24 rounded-full bg-[#020202]/80 border border-white/20 shadow-[inset_0_0_30px_rgba(0,0,0,1),0_0_50px_rgba(0,0,0,0.6)] flex items-center justify-center">
                                    <div className="absolute inset-3 rounded-full border border-white/10 border-dashed" />
                                    {card.icon}
                                </div>
                            </div>

                            {/* Bottom — solid dark block matching orb style */}
                            <motion.div
                                variants={{ hover: { y: -10, backgroundColor: "rgba(10, 10, 10, 0.95)", borderColor: "rgba(0, 255, 204, 0.4)" } }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="relative z-10 m-3 rounded-2xl bg-[#020202]/85 border border-white/20 shadow-[inset_0_0_30px_rgba(0,0,0,1),0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur-md p-6"
                            >
                                {/* Stitched inner border */}
                                <div className="absolute inset-[10px] rounded-xl border border-white/10 border-dashed pointer-events-none" />

                                {/* Content container */}
                                <div className="relative z-10 space-y-2">
                                    <span className="font-mono text-[9px] text-white/40 tracking-[0.3em] uppercase block">{card.num}</span>
                                    <p className="font-display text-[0.95rem] text-white font-medium tracking-tight whitespace-pre-line leading-tight">
                                        {card.headline}
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ─────────────────────────────────────────────
                MOMENT 3 — Verdict + CTA
            ───────────────────────────────────────────── */}
            <div className="w-full flex flex-col items-center text-center px-6 pb-36 max-w-4xl mx-auto space-y-12">
                {/* The stamp — above the closing line */}


                <div className="cb space-y-6">
                    <h3 className="font-display text-4xl md:text-[3.5rem] text-white font-medium tracking-tighter leading-[1.05]">
                        This is what a landing page<br /> should have always been.
                    </h3>
                </div>


            </div>
        </section>
    );
}



