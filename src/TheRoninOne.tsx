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
            title: 'It starts with understanding',
            description: "If they don’t understand instantly, they don’t stay — and nothing converts.",
            blobs: (
                <>
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-blue-600 to-[#5443d3] opacity-50" />
                    <div className="absolute top-[-20%] right-[-20%] w-[90%] h-[90%] bg-blue-200 rounded-full blur-[100px] opacity-25" />
                </>
            ),
            icon: (
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <circle cx="18" cy="18" r="12" stroke="white" strokeWidth="1.5" strokeOpacity="0.7" />
                    <circle cx="18" cy="18" r="4" fill="white" fillOpacity="0.6" />
                </svg>
            )
        },
        {
            num: '02',
            title: 'Then it creates direction',
            description: "A landing page leads visitors — step by step — toward one decision.",
            blobs: (
                <>
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-500 via-blue-600 to-[#5443d3] opacity-50" />
                    <div className="absolute bottom-[-20%] left-[-20%] w-[90%] h-[90%] bg-blue-200 rounded-full blur-[100px] opacity-25" />
                </>
            ),
            icon: (
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <polygon points="18,7 31,28 5,28" stroke="white" strokeWidth="1.5" strokeOpacity="0.7" strokeLinejoin="round" fill="none" />
                    <polygon points="18,14 24,24 12,24" fill="white" fillOpacity="0.55" />
                </svg>
            )
        },
        {
            num: '03',
            title: 'Revenue is the Result',
            description: "Every element must justify its place, or it quietly costs you revenue.",
            blobs: (
                <>
                    <div className="absolute inset-0 bg-gradient-to-bl from-cyan-500 via-blue-600 to-[#5443d3] opacity-50" />
                    <div className="absolute bottom-[-20%] right-[-20%] w-[90%] h-[90%] bg-blue-200 rounded-full blur-[100px] opacity-25" />
                </>
            ),
            icon: (
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

                {/* Context */}
                <div className="cb space-y-4 mb-16">
                    <p className="font-sans text-base md:text-lg text-white/40 tracking-tight leading-relaxed max-w-xl">
                        For twenty years, a landing page<br />
                        meant a brief, a design, and a hope.
                    </p>
                    <p className="font-sans text-base md:text-lg text-white/40 tracking-tight leading-relaxed max-w-xl">
                        Most still do.
                    </p>
                </div>

                {/* The Headline */}
                <div className="cb pb-28">
                    <h2 className="font-display text-5xl md:text-[4.5rem] lg:text-[5.5rem] text-white font-medium tracking-tighter leading-[1.0]">
                        Ronin One.<br />
                        <span className="text-white/60 whitespace-nowrap text-[2.2rem] md:text-[3.4rem] lg:text-[4rem]">The standard for your business</span>
                    </h2>
                </div>
            </div>

            {/* ─────────────────────────────────────────────
                MOMENT 2 — The Black Box
            ───────────────────────────────────────────── */}
            <div className="cb w-full max-w-[1040px] mx-auto px-6 pb-0">
                <div className="relative w-full bg-[#020202]/90 backdrop-blur-md rounded-[2.5rem] border border-white/20 shadow-[inset_0_0_50px_rgba(0,0,0,1),0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden">

                    {/* Stitched inner border */}
                    <div className="absolute inset-[14px] rounded-[2rem] border border-white/10 border-dashed pointer-events-none z-0" />

                    <div className="relative z-10 p-10 md:p-16 flex flex-col gap-10">

                        {/* Headline */}
                        <p className="font-sans text-2xl md:text-3xl text-white/85 leading-snug tracking-tight font-light">
                            A system for building landing pages that actually convert.
                        </p>

                        {/* Separator */}
                        <div className="w-full h-px bg-white/[0.07]" />

                        {/* Subtext */}
                        <div className="space-y-5">
                            <p className="font-sans text-lg text-white/50 leading-relaxed tracking-tight">
                                Ronin One isn't a design service.<br />
                                It's a structured system built on clarity, conversion logic, and user behavior — designed to turn attention into revenue.
                            </p>
                            <p className="font-sans text-lg text-white/50 leading-relaxed tracking-tight">
                                Every page is built using the Ronin System, combining messaging, structure, and decision-driven design into a single focused experience.
                            </p>
                        </div>

                        {/* Separator */}
                        <div className="w-full h-px bg-white/[0.07]" />

                        {/* Experience layer */}
                        <p className="font-sans text-lg text-white/40 leading-relaxed tracking-tight italic">
                            From the first interaction to final delivery, every step is designed to be clear, focused, and frictionless — just like the pages we build.
                        </p>

                    </div>
                </div>
            </div>

            {/* ─────────────────────────────────────────────
                MOMENT 3 — Feature Cards
            ───────────────────────────────────────────── */}
            <div className="cb w-full max-w-[1120px] mx-auto px-4 pt-48 md:pt-[18rem] pb-32">
                {/* Bridge line */}
                <h2 className="font-display text-4xl md:text-5xl text-white font-medium tracking-tight mb-24 text-center">
                    Every Ronin page follows the same principle.
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {cardsData.map((card) => (
                        <motion.div
                            whileHover="hover"
                            onClick={openApplyModal}
                            key={card.num}
                            className="relative rounded-[1.75rem] overflow-hidden flex flex-col justify-between bg-[#050505] transition-colors duration-700 hover:bg-[#070707] cursor-pointer group/card"
                            style={{ minHeight: '460px' }}
                        >
                            {/* Blobs */}
                            <motion.div
                                variants={{
                                    hover: { scale: 1.08, opacity: 1, filter: "brightness(1.5)" }
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="absolute inset-0 mix-blend-screen pointer-events-none"
                            >
                                {card.blobs}
                            </motion.div>

                            {/* Grain */}
                            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`, backgroundSize: '180px 180px', opacity: 0.35, mixBlendMode: 'soft-light' }} />

                            {/* Visual orb */}
                            <div className="relative z-10 flex-1 flex items-center justify-center">
                                <div className="relative w-24 h-24 rounded-full bg-[#020202]/80 border border-white/20 shadow-[inset_0_0_30px_rgba(0,0,0,1),0_0_50px_rgba(0,0,0,0.6)] flex items-center justify-center">
                                    <div className="absolute inset-3 rounded-full border border-white/10 border-dashed" />
                                    {card.icon}
                                </div>
                            </div>

                            {/* Bottom info block */}
                            <motion.div
                                variants={{ hover: { y: -10, backgroundColor: "rgba(10, 10, 10, 0.95)", borderColor: "rgba(0, 255, 204, 0.4)" } }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="relative z-10 m-3 rounded-2xl bg-[#020202]/85 border border-white/20 shadow-[inset_0_0_30px_rgba(0,0,0,1),0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur-md p-6"
                            >
                                <div className="absolute inset-[10px] rounded-xl border border-white/10 border-dashed pointer-events-none" />
                                <div className="relative z-10 space-y-2">
                                    <span className="font-mono text-[9px] text-white/40 tracking-[0.3em] uppercase block">{card.num}</span>
                                    <h3 className="font-display text-[1.25rem] text-white font-medium tracking-tight leading-tight">
                                        {card.title}
                                    </h3>
                                    <p className="font-sans text-[0.85rem] text-white/60 tracking-tight leading-relaxed">
                                        {card.description}
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ─────────────────────────────────────────────
                MOMENT 4 — Verdict + CTA
            ───────────────────────────────────────────── */}
            <div className="w-full flex flex-col items-center text-center px-6 pb-36 max-w-4xl mx-auto space-y-12">
                <div className="cb space-y-6">
                    <h3 className="font-display text-4xl md:text-[3.5rem] text-white font-medium tracking-tighter leading-[1.05]">
                        This is what a landing page<br /> should have always been.
                    </h3>
                </div>
            </div>
        </section>
    );
}
