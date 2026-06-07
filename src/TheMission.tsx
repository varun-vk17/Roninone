import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const Word = ({ children, progress, range, highlight }: any) => {
    const opacity = useTransform(progress, range, [0.15, 1]);
    return (
        <span className="relative inline-block mr-[0.25em] mt-[0.1em]">
            <motion.span 
                style={{ opacity }} 
                className={highlight ? "text-white font-semibold" : "text-white/60"}
            >
                {children}
            </motion.span>
        </span>
    );
};

export default function TheMission() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 75%", "end 50%"]
    });

    const lines = [
        "Ronin exists to shape how businesses are understood, trusted, and remembered.",
        "Because when people understand the value, they see the difference.",
        "And when they see the difference, they make better decisions.",
        "For themselves.",
        "And for your business."
    ];

    const wordsPerLine = lines.map(line => line.split(" "));
    const totalWords = wordsPerLine.reduce((acc, words) => acc + words.length, 0);

    let currentWordIndex = 0;

    const renderWords = (words: string[]) => {
        return words.map((word, i) => {
            const start = currentWordIndex / totalWords;
            const end = start + (1 / totalWords);
            currentWordIndex++;
            
            const cleanWord = word.replace(/[^a-zA-Z]/g, '').toLowerCase();
            const highlights = ["understand", "trust", "choose", "value", "difference", "decisions", "themselves", "business"];
            const isHighlight = highlights.includes(cleanWord);
            
            return (
                <Word key={i} progress={scrollYProgress} range={[start, end]} highlight={isHighlight}>
                    {word}
                </Word>
            );
        });
    };

    return (
        <section ref={containerRef} className="w-full pt-32 md:pt-48 pb-16 md:pb-24 flex flex-col items-center px-4 relative z-10">
            {/* Large Video Container */}
            <div className="w-full max-w-[800px] aspect-square rounded-[2rem] overflow-hidden mb-24 flex justify-center items-center relative shadow-[0_0_80px_rgba(0,0,0,0.8)]">
                <video
                    src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_132944_a0d124bb-eaa1-4082-aa30-2310efb42b4b.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover mix-blend-screen"
                />
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />
            </div>

            {/* Scroll-driven Text Reveal */}
            <div className="w-full max-w-4xl mx-auto text-center flex flex-col gap-8 md:gap-12">
                {/* Paragraph 1 (Large) */}
                <p className="text-xl md:text-3xl lg:text-[2.6rem] font-medium tracking-tight leading-snug">
                    {renderWords(wordsPerLine[0])}
                </p>
                {/* Paragraphs 2-5 (Smaller) */}
                <div className="flex flex-col gap-4 mt-4">
                    {wordsPerLine.slice(1).map((words, idx) => (
                        <p key={idx} className="text-lg md:text-xl lg:text-2xl font-medium leading-snug">
                            {renderWords(words)}
                        </p>
                    ))}
                </div>
            </div>
        </section>
    );
}
