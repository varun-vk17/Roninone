/**
 * TheApply.tsx — Final CTA Section MK V
 *
 * Inspiration from TheRoninOne: blob gradients, dark orb, grain, frosted panel.
 * Structure: entirely different — one wide landscape "stage" card, split layout.
 * Left: The orb, alive, radiating. Right: The CTA content.
 * Above/below: The same quiet typographic rhythm as Ronin One.
 */
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { openApplyModal } from './TheApplyModal';

gsap.registerPlugin(ScrollTrigger);

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`;

export default function TheApply() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray<HTMLElement>('.ac').forEach((el, i) => {
                gsap.fromTo(el,
                    { opacity: 0, y: 24 },
                    {
                        opacity: 1, y: 0,
                        duration: 0.9,
                        ease: 'power3.out',
                        delay: i * 0.05,
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

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-transparent flex flex-col items-center overflow-hidden"
        >

            {/* ── Eyebrow ── */}
            <div className="w-full flex flex-col items-center text-center px-6 pt-64 pb-24 md:pb-32 max-w-4xl mx-auto">
                <div className="ac inline-flex items-center gap-2 mb-10">
                    <div className="h-px w-6 bg-white/30" />
                    <span className="font-mono text-[10px] text-white tracking-[0.4em] uppercase opacity-70">Apply</span>
                    <div className="h-px w-6 bg-white/30" />
                </div>
                <h2 className="ac font-display text-5xl md:text-[4.5rem] lg:text-[5rem] text-white font-medium tracking-tighter leading-[1.0]">
                    The page your business<br />has been waiting for.
                </h2>
            </div>

            {/* ── The Stage — one wide landscape card ── */}
            <div className="ac w-full max-w-[1120px] mx-auto px-4 pb-48 md:pb-64">
                <div
                    className="relative rounded-[1.75rem] overflow-hidden bg-[#050505] flex flex-col md:flex-row"
                    style={{ minHeight: '480px' }}
                >
                    {/* ── Blob gradient — full card background ── */}
                    <div className="absolute inset-0 mix-blend-screen pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-blue-600 to-[#5443d3] opacity-50" />
                        <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[120%] bg-blue-200 rounded-full blur-[120px] opacity-25" />
                        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[80%] bg-cyan-300 rounded-full blur-[100px] opacity-20" />
                    </div>
                    {/* Grain */}
                    <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: GRAIN, backgroundSize: '180px 180px', opacity: 0.35, mixBlendMode: 'soft-light' }} />

                    {/* ── LEFT — The Orb ── */}
                    <div className="relative z-10 flex-1 flex items-center justify-center py-16 md:py-0 md:min-h-full">
                        {/* Concentric rings */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            {[1.6, 2.4, 3.2].map((s, i) => (
                                <div
                                    key={i}
                                    className="absolute rounded-full border border-white/[0.08]"
                                    style={{ width: `${s * 96}px`, height: `${s * 96}px` }}
                                />
                            ))}
                        </div>
                        {/* Orb */}
                        <div className="relative w-24 h-24 rounded-full bg-[#020202]/85 border border-white/20 shadow-[inset_0_0_40px_rgba(0,0,0,1),0_0_60px_rgba(0,0,0,0.7)] flex items-center justify-center">
                            <div className="absolute inset-3 rounded-full border border-white/10 border-dashed" />
                            {/* The point. Where everything leads. */}
                            <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_12px_4px_rgba(255,255,255,0.5)]" />
                        </div>
                    </div>

                    {/* ── Vertical divider ── */}
                    <div className="hidden md:block relative z-10 w-px self-stretch my-8 bg-white/10" />
                    <div className="block md:hidden relative z-10 h-px mx-8 bg-white/10" />

                    {/* ── RIGHT — The CTA panel (frosted) ── */}
                    <div className="relative z-10 flex-1 flex flex-col justify-between p-3">
                        <div className="h-full rounded-2xl bg-[#020202]/85 border border-white/20 shadow-[inset_0_0_30px_rgba(0,0,0,1),0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur-md p-8 flex flex-col justify-between gap-10">
                            {/* Stitched inner */}
                            <div className="absolute inset-[10px] rounded-xl border border-white/10 border-dashed pointer-events-none" />

                            {/* Top — copy */}
                            <div className="relative z-10 space-y-5">
                                <span className="font-mono text-[9px] text-white/40 tracking-[0.3em] uppercase block">Ronin One</span>
                                <p className="font-display text-2xl md:text-3xl text-white font-medium tracking-tight leading-tight">
                                    We work with businesses ready to stop waiting and start performing.
                                </p>
                                <p className="font-sans text-sm text-white/40 leading-relaxed tracking-tight">
                                    No retainers. No agencies.<br className="hidden md:block" />One page. Done right.
                                </p>
                            </div>

                            {/* Bottom — scarcity + CTA */}
                            <div className="relative z-10 flex flex-col gap-5">
                                {/* Scarcity pill */}
                                <div className="inline-flex items-center gap-2.5 self-start border border-white/10 rounded-full px-4 py-2 bg-white/[0.04]">
                                    <span className="relative flex h-1.5 w-1.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-50" />
                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white/80" />
                                    </span>
                                    <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-white/50">3 spots open</span>
                                </div>
                                {/* CTA */}
                                <button onClick={openApplyModal} className="group flex items-center gap-3 bg-white text-black font-display font-semibold text-sm md:text-base px-8 py-4 rounded-full hover:bg-white/90 transition-all duration-300 shadow-[0_0_50px_rgba(255,255,255,0.18)] hover:shadow-[0_0_80px_rgba(255,255,255,0.3)] self-start">
                                    Apply for Ronin One
                                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Closing line ── */}
            <div className="ac w-full flex flex-col items-center text-center px-6 pb-48 max-w-4xl mx-auto space-y-4">
                <div className="flex flex-col items-center gap-1">
                    <span className="font-mono text-[11px] tracking-[0.4em] uppercase text-white/30">THE RONIN ONE IS</span>
                    <span className="font-display text-2xl md:text-3xl tracking-tight text-white font-bold">A STANDARD.</span>
                </div>
            </div>

        </section>
    );
}
