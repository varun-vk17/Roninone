import { motion } from 'motion/react';
import { openApplyModal } from './TheApplyModal';
import TheMission from './TheMission';
import LazyVideo from './LazyVideo';

const fadeInUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-10% 0px -10% 0px" },
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
};


export default function TheRoninOne() {

    const cardsData = [
        {
            num: '01',
            title: 'Be Clear',
            description: "People should understand what you do in seconds. If they have to figure it out, you've already lost them.",
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
            title: 'Keep Attention',
            description: "Once people arrive, give them a reason to stay. Good design keeps people interested.",
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
            title: 'Build Trust',
            description: "People buy from businesses they trust. Your website should make that trust feel natural.",
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
            id="ronin-one"
            className="relative w-full bg-transparent flex flex-col items-center overflow-hidden"
        >
            {/* ─────────────────────────────────────────────
                MOMENT 1 — The Declaration
            ───────────────────────────────────────────── */}
            <div className="w-full flex flex-col items-center text-center px-6 pt-36 max-w-4xl mx-auto">
                <motion.div {...fadeInUp} className="inline-flex items-center gap-3 mb-10">
                    <div className="h-px w-8 bg-white/30" />
                    <span className="font-mono text-xs sm:text-sm md:text-base text-white tracking-[0.4em] uppercase opacity-70">The Disconnect</span>
                    <div className="h-px w-8 bg-white/30" />
                </motion.div>


            </div>

            {/* ─────────────────────────────────────────────
                MOMENT 2 — The Black Box
            ───────────────────────────────────────────── */}
            <motion.div {...fadeInUp} className="w-full max-w-[1040px] mx-auto px-6 pb-0">
                <div className="relative w-full bg-[#020202]/90 backdrop-blur-md rounded-[2.5rem] border border-white/20 shadow-[inset_0_0_50px_rgba(0,0,0,1),0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden">

                    {/* Stitched inner border */}
                    <div className="absolute inset-[14px] rounded-[2rem] border border-white/10 border-dashed pointer-events-none z-0" />

                    <div className="absolute top-6 right-6 sm:top-8 sm:right-8 md:top-10 md:right-10 z-20 inline-flex items-center gap-2.5 border border-white/10 rounded-full px-4 py-2 bg-white/[0.04] scale-90 sm:scale-100 origin-top-right">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-50" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400" />
                        </span>
                        <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-white/50">The Reality</span>
                    </div>

                    <div className="relative z-10 p-6 pt-16 sm:p-10 sm:pt-20 md:p-16 flex flex-col gap-6 sm:gap-8">

                        {/* Headline */}
                        <p className="font-quirlone text-2xl sm:text-3xl md:text-4xl text-white/90 leading-snug tracking-tight font-medium mt-4 sm:mt-0">
                            Great businesses get overlooked every day.
                        </p>

                        {/* Separator */}
                        <div className="w-full h-px bg-white/[0.07]" />

                        {/* Subtext */}
                        <div className="space-y-6 sm:space-y-8">
                            <p className="font-sans text-base sm:text-xl text-white/60 leading-relaxed tracking-tight">
                                Not because they're worse.<br />
                                Not because people don't need them.
                            </p>

                            <p className="font-sans text-lg sm:text-2xl text-white/85 leading-relaxed tracking-tight">
                                But because what makes them valuable isn't immediately clear.
                            </p>

                            <p className="font-sans text-base sm:text-xl text-white/60 leading-relaxed tracking-tight">
                                When people don't understand the difference, they choose what's familiar.
                            </p>
                        </div>

                        {/* Separator */}
                        <div className="w-full h-px bg-white/[0.07]" />

                        {/* Experience layer */}
                        <p className="font-sans text-xl sm:text-2xl text-white/80 leading-relaxed tracking-tight italic">
                            The goal isn't to look different.<br />
                            <span className="text-white not-italic font-medium mt-2 block">It's to be understood.</span>
                        </p>

                    </div>
                </div>
            </motion.div>

            <TheMission />

            {/* ─────────────────────────────────────────────
                MOMENT 3 — Feature Cards
            ───────────────────────────────────────────── */}
            <motion.div {...fadeInUp} className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 pt-32 sm:pt-48 pb-12 sm:pb-20">
                {/* Bridge line */}
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-medium tracking-tight mb-16 sm:mb-24 text-center">
                    Every good website does three things.
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                    {/* Card 1 */}
                    <div className="relative h-[380px] sm:h-[460px] rounded-2xl bg-neutral-950 overflow-hidden p-6 sm:p-8">
                        <div className="absolute top-1/2 -translate-y-1/2 -left-[420px] h-[460px] w-[460px] rounded-full bg-[#1e3a8a] blur-3xl opacity-40 pointer-events-none" />
                        <div className="relative z-10 flex flex-col h-full">
                            <h3 className="font-display text-2xl sm:text-3xl text-white font-medium tracking-tight leading-tight">
                                Be Clear
                            </h3>
                            <p className="mt-12 sm:mt-20 font-sans text-base sm:text-[1.1rem] text-white/60 tracking-tight leading-relaxed max-w-[280px]">
                                People should understand what you do in seconds. If they have to figure it out, you've already lost them.
                            </p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="relative h-[380px] sm:h-[460px] rounded-2xl bg-neutral-950 overflow-hidden flex flex-col">
                        <div className="relative w-full overflow-hidden" style={{ height: '75%' }}>
                            <LazyVideo 
                                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260421_072701_f6a01abb-eb30-4559-9d6e-774362defbc3.mp4" 
                                autoPlay 
                                loop 
                                muted 
                                playsInline 
                                className="w-full h-full object-contain block mix-blend-screen scale-[1.15] translate-y-4" 
                            />
                            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-neutral-950" />
                        </div>
                        <div className="flex-1 flex flex-col items-start justify-center p-6 sm:p-8">
                            <h3 className="font-display text-2xl sm:text-3xl text-white font-medium tracking-tight leading-tight text-left mb-1.5">
                                Keep Attention
                            </h3>
                            <p className="font-sans text-base sm:text-[1.1rem] text-white/60 tracking-tight leading-relaxed text-left">
                                Once people arrive, give them a reason to stay. Good design keeps people interested.
                            </p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="relative h-[380px] sm:h-[460px] rounded-2xl bg-neutral-950 overflow-hidden p-6 sm:p-8">
                        <div className="absolute -top-28 -right-28 h-56 w-56 rounded-full bg-[#1e3a8a] blur-3xl opacity-40 pointer-events-none" />
                        <div className="relative z-10 flex flex-col h-full">
                            <h3 className="font-display text-2xl sm:text-3xl text-white font-medium tracking-tight leading-tight">
                                Build Trust
                            </h3>
                            <p className="mt-auto font-sans text-base sm:text-[1.1rem] text-white/60 tracking-tight leading-relaxed max-w-[320px]">
                                People buy from businesses they trust. Your website should make that trust feel natural.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* ─────────────────────────────────────────────
                MOMENT 4 — Verdict + CTA
            ───────────────────────────────────────────── */}
            <div className="w-full flex flex-col items-center text-center px-6 pb-24 sm:pb-36 max-w-4xl mx-auto space-y-12">
                <motion.div {...fadeInUp} className="space-y-6">
                    <h3 className="font-display text-3xl sm:text-4xl md:text-[3.5rem] text-white font-medium tracking-tighter leading-[1.05]">
                        This is what a better website <br className="hidden sm:block" /> feels like.
                    </h3>
                </motion.div>
            </div>
        </section>
    );
}
