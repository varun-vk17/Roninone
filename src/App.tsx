/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

import TheRoninOne from './TheRoninOne';
import TheFounder from './TheFounder';
import TheApply from './TheApply';
import TheFooter from './TheFooter';
import TheApplyModal, { openApplyModal } from './TheApplyModal';


export default function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const { scrollY } = useScroll();
  const rotate = useTransform(scrollY, [0, 2000], [0, 720]);

  useEffect(() => {
    const duration = 2500;
    const interval = 50;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress(Math.min(100, Math.floor((currentStep / steps) * 100)));
      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => setLoading(false), 900);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-grain min-h-screen bg-[#030303] text-white selection:bg-white selection:text-black font-sans relative block w-full">
      <AnimatePresence>
        {loading ? (
          <motion.div
            key="loader"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#000] overflow-hidden pointer-events-none"
            exit={{ opacity: 0, transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] } }}
          >
            {/* Rotated World for the Diagonal Cut */}
            <div className="absolute w-[250vw] h-[250vh] flex flex-col justify-center items-center rotate-[-25deg] z-10">

              {/* Top Half */}
              <motion.div
                className="absolute top-0 left-0 w-full h-1/2 bg-[#000]"
                exit={{ y: "-100%", transition: { duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.1 } }}
              />

              {/* Bottom Half */}
              <motion.div
                className="absolute bottom-0 left-0 w-full h-1/2 bg-[#000]"
                exit={{ y: "100%", transition: { duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.1 } }}
              />

              {/* The Katana Slash with Brand Colors */}
              <motion.div
                className="absolute top-1/2 left-0 w-full h-[3px] bg-gradient-to-r from-cyan-400 via-blue-500 to-[#5443d3] -translate-y-1/2 shadow-[0_0_40px_10px_rgba(0,255,204,0.6)] mix-blend-screen"
                initial={{ scaleX: 0, opacity: 0, originX: 0 }}
                animate={
                  progress === 100
                    ? { scaleX: 1, opacity: [0, 1, 1] }
                    : { scaleX: 0, opacity: 0 }
                }
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                exit={{ scaleY: 0, opacity: 0, transition: { duration: 0.4 } }}
              >
                <div className="absolute inset-0 bg-white/50 blur-[2px]" />
              </motion.div>
            </div>

            {/* Progress Indicator (Unrotated - Positioned Bottom) */}
            <motion.div
              className="absolute bottom-16 md:bottom-24 z-30 flex flex-col items-center w-56 md:w-64"
              animate={progress === 100 
                ? { opacity: 0, y: 20, filter: "blur(10px)" } 
                : { opacity: [0.6, 1, 0.6], filter: ["blur(2px)", "blur(0px)", "blur(2px)"] }
              }
              transition={progress === 100 ? { duration: 0.4, ease: "easeIn" } : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              exit={{ opacity: 0 }}
            >
              {/* Katana Blade Progress Bar */}
              <div className="w-full h-[1px] bg-white/10 relative">
                {/* The Blade Edge */}
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-cyan-400 to-blue-500 shadow-[0_0_12px_rgba(0,255,204,0.8)] mix-blend-screen"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
                {/* The Spark / Tip */}
                <motion.div
                  className="absolute top-1/2 h-[3px] w-[3px] bg-white rounded-full shadow-[0_0_15px_3px_rgba(255,255,255,1)] -translate-y-1/2 -translate-x-1/2"
                  initial={{ left: "0%" }}
                  animate={{ left: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div>

              <div className="flex justify-between w-full mt-4 font-mono text-[9px] md:text-[10px] text-white/50 tracking-[0.3em] uppercase">
                <span>Unsheathing_</span>
                <span>{progress}%</span>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            className="relative block w-full min-h-screen"
          >
            {/* FIXED COLLAGE BACKGROUND FOR WHOLE PAGE */}
            <div className="fixed inset-0 bg-[#000] overflow-hidden pointer-events-none z-0">
            </div>

            {/* Floating Pill Header */}
            <motion.nav
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex w-[95%] max-w-5xl items-center justify-between rounded-full border border-white/10 bg-white/5 px-2 py-2 backdrop-blur-md shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
            >
              <div className="flex items-center pl-6 pr-4 z-10">
                <span className="text-sm font-bold tracking-[0.25em] uppercase text-white">Ronin</span>
              </div>

              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden sm:flex items-center justify-center pointer-events-none">
                <span className="font-sans text-[10px] sm:text-xs font-medium tracking-[0.2em] text-white/50 uppercase">
                  Make it Matter
                </span>
              </div>

              <div className="flex items-center pr-2 z-10">
                <button onClick={openApplyModal} className="rounded-full bg-white px-6 py-3 text-xs font-bold text-black transition-transform hover:scale-105">
                  Apply for R1
                </button>
              </div>
            </motion.nav>

            {/* Hero Text Content */}
            <main className="relative z-10 flex w-full flex-col items-center pt-40 md:pt-48 px-4 text-center">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-4xl font-display text-[2.7rem] font-medium leading-[1.0] tracking-tighter md:text-[4rem] lg:text-[5rem] text-neutral-100"
              >
                One page.
                Done right.<br></br>
                Changes everything.
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 max-w-2xl text-lg text-neutral-400 md:text-xl font-sans"
              >
                Because when your page works the way
                it should — every visitor becomes
                an opportunity you don't have to chase.
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mt-12"
              >
                <motion.button 
                   onClick={openApplyModal}
                   whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.12)", borderColor: "rgba(255,255,255,0.4)" }}
                   whileTap={{ scale: 0.95 }}
                   transition={{ type: "spring", stiffness: 400, damping: 15 }}
                   className="group relative overflow-hidden rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-8 py-4 text-xs font-medium text-white transition-shadow duration-300 hover:shadow-[0_0_40px_0_rgba(0,255,204,0.3)] shadow-xl"
                >
                  <span className="relative z-10">Apply for R1</span>
                </motion.button>
              </motion.div>
            </main>

            {/* The Visual - The Artifact (Cinematic Gradient & Void) */}
            <div className="relative mx-auto z-20 mt-20 flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-4 md:px-8 pb-32">

              <motion.div
                initial={{ y: 40, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="noise-overlay relative w-full aspect-square md:aspect-[21/9] bg-[#050505] rounded-3xl border border-white/10 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]"
              >
                {/* Vibrant Gradient Mesh (The Color) */}
                <div className="absolute inset-0 opacity-90 mix-blend-screen">
                  <motion.div
                    animate={{
                      x: ['-10%', '10%', '-10%'],
                      y: ['-10%', '10%', '-10%'],
                    }}
                    transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
                    style={{ willChange: 'transform' }}
                    className="absolute top-[-20%] left-[-10%] w-[60%] h-[80%] bg-cyan-600 rounded-full blur-[60px] opacity-70"
                  />
                  <motion.div
                    animate={{
                      x: ['10%', '-10%', '10%'],
                      y: ['10%', '-10%', '10%'],
                    }}
                    transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
                    style={{ willChange: 'transform' }}
                    className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[90%] bg-blue-700 rounded-full blur-[70px] opacity-70"
                  />
                  <motion.div
                    animate={{
                      x: ['-5%', '5%', '-5%'],
                      y: ['5%', '-5%', '5%'],
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                    style={{ willChange: 'transform' }}
                    className="absolute top-[10%] right-[20%] w-[40%] h-[60%] bg-[#5443d3] rounded-full blur-[50px] opacity-60"
                  />
                  {/* Grain on gradients */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
                      backgroundSize: '180px 180px',
                      backgroundRepeat: 'repeat',
                      opacity: 0.18,
                      mixBlendMode: 'soft-light',
                    }}
                  />
                </div>

                {/* The Void (The Ronin Standard - Precision cutting through noise) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ rotate }}
                    className="relative w-48 h-48 md:w-64 md:h-64 bg-[#020202] rounded-full border border-white/20 shadow-[inset_0_0_40px_rgba(0,0,0,1),0_0_50px_rgba(0,0,0,0.8)] flex items-center justify-center"
                  >
                    {/* Inner Ring */}
                    <div className="absolute inset-4 rounded-full border border-white/5 border-dashed"></div>
                    {/* Center Dot */}
                    <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>

                    {/* Crosshairs to make rotation visible */}
                    <div className="absolute inset-0 flex items-center justify-between px-4 opacity-30">
                      <div className="w-6 h-px bg-white/40"></div>
                      <div className="w-6 h-px bg-white/40"></div>
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-between py-4 opacity-30">
                      <div className="w-px h-6 bg-white/40"></div>
                      <div className="w-px h-6 bg-white/40"></div>
                    </div>
                  </motion.div>
                </div>

                {/* Technical Markings / UI Chrome */}
                <div className="absolute top-6 left-6 flex items-center gap-3">
                  <div className="w-6 h-px bg-white/40"></div>
                  <span className="text-[9px] font-mono tracking-[0.2em] text-white/60 uppercase">RN-01</span>
                </div>

                <div className="absolute bottom-6 right-6 flex items-center gap-3">
                  <span className="text-[9px] font-mono tracking-[0.2em] text-white/60 uppercase">The Standard</span>
                  <div className="w-6 h-px bg-white/40"></div>
                </div>

                <div className="absolute top-6 right-6 text-[9px] font-mono tracking-[0.2em] text-white/30 uppercase">
                  [ Active ]
                </div>

                <div className="absolute bottom-6 left-6 text-[9px] font-mono tracking-[0.2em] text-white/30 uppercase">
                  SYS.RDY
                </div>

                {/* Crosshairs */}
                <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/10 pointer-events-none"></div>
                <div className="absolute left-0 right-0 top-1/2 h-px bg-white/10 pointer-events-none"></div>
              </motion.div>
            </div>

            <TheRoninOne />
            <TheFounder />
            <TheApply />
            <TheApplyModal />
            <TheFooter />

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
