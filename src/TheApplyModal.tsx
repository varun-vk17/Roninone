import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect } from 'react';

// Global trigger
export const openApplyModal = () => window.dispatchEvent(new Event('open-apply-modal'));

// ─── Types ──────────────────────────────────────────────────
type Path = 'has-page' | 'no-page' | null;
type Step =
  | 'intro'
  | 'branch'
  | 'url'
  | 'what-you-build'
  | 'goal'
  | 'friction'
  | 'who-for'
  | 'system'
  | 'submit'
  | 'done';

interface FormState {
  path: Path;
  url: string;
  whatBuilding: string;
  goal: string;
  friction: string;
  whoFor: string;
  name: string;
  email: string;
}

// ─── Input / Option Styles ───────────────────────────────────
const inputCls =
  'w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 sm:px-5 sm:py-4 font-sans text-white text-sm outline-none transition-all duration-300 focus:bg-white/[0.05] focus:border-cyan-400/60 focus:shadow-[0_0_20px_rgba(34,211,238,0.1)] placeholder:text-white/25';

function OptionBtn({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-4 py-3 sm:px-5 sm:py-4 rounded-xl border text-sm font-sans transition-all duration-300 ${
        selected
          ? 'border-cyan-400/60 bg-cyan-400/5 text-white shadow-[0_0_16px_rgba(34,211,238,0.1)]'
          : 'border-white/10 bg-white/[0.02] text-white/60 hover:border-white/20 hover:text-white/80'
      }`}
    >
      {children}
    </button>
  );
}

// ─── Screen wrapper with slide animation ────────────────────
function Screen({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-7"
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px w-5 bg-white/30" />
      <span className="font-mono text-[10px] text-white/40 tracking-[0.35em] uppercase">{text}</span>
    </div>
  );
}

function Headline({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white font-medium tracking-tight leading-snug">
      {children}
    </h2>
  );
}

function Sub({ children }: { children: React.ReactNode }) {
  return <p className="font-sans text-sm text-white/45 leading-relaxed tracking-tight">{children}</p>;
}

function Micro({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-[10px] text-white/25 tracking-[0.25em] uppercase">{children}</p>;
}

function PrimaryBtn({
  onClick,
  disabled,
  type = 'button',
  children,
}: {
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
  children: React.ReactNode;
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className="w-full rounded-xl bg-white px-6 py-3 sm:px-8 sm:py-4 font-display font-semibold text-black text-sm shadow-[0_0_30px_rgba(255,255,255,0.08)] hover:shadow-[0_0_40px_rgba(255,255,255,0.16)] transition-all duration-300 disabled:opacity-40"
    >
      {children}
    </motion.button>
  );
}

// ─── Main Component ─────────────────────────────────────────
export default function TheApplyModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>('intro');
  const [sending, setSending] = useState(false);

  const [form, setForm] = useState<FormState>({
    path: null,
    url: '',
    whatBuilding: '',
    goal: '',
    friction: '',
    whoFor: '',
    name: '',
    email: '',
  });

  const set = (key: keyof FormState, val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  useEffect(() => {
    const handle = () => {
      setIsOpen(true);
      setStep('intro');
      setForm({ path: null, url: '', whatBuilding: '', goal: '', friction: '', whoFor: '', name: '', email: '' });
    };
    window.addEventListener('open-apply-modal', handle);
    return () => window.removeEventListener('open-apply-modal', handle);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch('https://formspree.io/f/YOUR_ENDPOINT_HERE', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } catch (_) {}
    setSending(false);
    setStep('done');
  };

  const goals = ['Get signups', 'Book calls', 'Sell product', 'Other'];

  const stepContent: Record<Step, React.ReactNode> = {

    // ── Screen 1: Intro ──────────────────────────────────────
    intro: (
      <Screen>
        <Eyebrow text="Ronin One" />
        <div className="space-y-3">
          <Headline>Let's look at your page.</Headline>
          <Sub>Before anything is built, we understand how your page works — or how it should.</Sub>
        </div>
        <Micro>Takes less than a minute</Micro>
        <PrimaryBtn onClick={() => setStep('branch')}>Continue →</PrimaryBtn>
      </Screen>
    ),

    // ── Screen 2: Branch ─────────────────────────────────────
    branch: (
      <Screen>
        <Eyebrow text="Step 01" />
        <Headline>Do you already have a landing page?</Headline>
        <div className="flex flex-col gap-3">
          <OptionBtn selected={form.path === 'has-page'} onClick={() => set('path', 'has-page')}>Yes, I have one</OptionBtn>
          <OptionBtn selected={form.path === 'no-page'} onClick={() => set('path', 'no-page')}>Not yet</OptionBtn>
        </div>
        <PrimaryBtn
          disabled={!form.path}
          onClick={() => setStep(form.path === 'has-page' ? 'url' : 'what-you-build')}
        >
          Continue →
        </PrimaryBtn>
      </Screen>
    ),

    // ── Screen 3A: URL ───────────────────────────────────────
    url: (
      <Screen>
        <Eyebrow text="Step 02" />
        <div className="space-y-2">
          <Headline>Share your page.</Headline>
          <Sub>We'll review this through the Ronin System.</Sub>
        </div>
        <input
          className={inputCls}
          type="url"
          placeholder="https://yourpage.com"
          value={form.url}
          onChange={e => set('url', e.target.value)}
        />
        <PrimaryBtn onClick={() => setStep('goal')} disabled={!form.url.trim()}>Continue →</PrimaryBtn>
      </Screen>
    ),

    // ── Screen 3B: What you build ────────────────────────────
    'what-you-build': (
      <Screen>
        <Eyebrow text="Step 02" />
        <Headline>What are you building?</Headline>
        <input
          className={inputCls}
          type="text"
          placeholder="Describe your offer briefly"
          value={form.whatBuilding}
          onChange={e => set('whatBuilding', e.target.value)}
        />
        <PrimaryBtn onClick={() => setStep('goal')} disabled={!form.whatBuilding.trim()}>Continue →</PrimaryBtn>
      </Screen>
    ),

    // ── Screen 4: Goal (shared) ──────────────────────────────
    goal: (
      <Screen>
        <Eyebrow text="Step 03" />
        <Headline>What should this page achieve?</Headline>
        <div className="flex flex-col gap-3">
          {goals.map(g => (
            <OptionBtn key={g} selected={form.goal === g} onClick={() => set('goal', g)}>{g}</OptionBtn>
          ))}
        </div>
        <PrimaryBtn
          disabled={!form.goal}
          onClick={() => setStep(form.path === 'has-page' ? 'friction' : 'who-for')}
        >
          Continue →
        </PrimaryBtn>
      </Screen>
    ),

    // ── Screen 5A: Where it's not working ───────────────────
    friction: (
      <Screen>
        <Eyebrow text="Step 04" />
        <div className="space-y-2">
          <Headline>Where do you think it's not working?</Headline>
          <Sub>Optional — but it helps us focus our review.</Sub>
        </div>
        <textarea
          className={`${inputCls} resize-none`}
          rows={4}
          placeholder="People land but don't take action. The page feels unclear..."
          value={form.friction}
          onChange={e => set('friction', e.target.value)}
        />
        <PrimaryBtn onClick={() => setStep('system')}>Continue →</PrimaryBtn>
      </Screen>
    ),

    // ── Screen 5B: Who is this for ───────────────────────────
    'who-for': (
      <Screen>
        <Eyebrow text="Step 04" />
        <div className="space-y-2">
          <Headline>Who is this for?</Headline>
          <Sub>Optional — helps us understand your audience.</Sub>
        </div>
        <input
          className={inputCls}
          type="text"
          placeholder="e.g. Founders, coaches, SaaS teams..."
          value={form.whoFor}
          onChange={e => set('whoFor', e.target.value)}
        />
        <PrimaryBtn onClick={() => setStep('system')}>Continue →</PrimaryBtn>
      </Screen>
    ),

    // ── Screen 6: System reinforcement ──────────────────────
    system: (
      <Screen>
        <Eyebrow text="What happens next" />
        <Headline>Here's what happens next.</Headline>
        <div className="space-y-5">
          <Sub>Every page is reviewed and built using the Ronin System:</Sub>
          <div className="flex flex-col gap-3 pl-1">
            {['Clarity — does the page communicate instantly?', 'Structure — does it guide the visitor forward?', 'Conversion — does every element earn its place?'].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-2 shrink-0" />
                <p className="font-sans text-sm text-white/55 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
          <Sub>No guesswork. No templates. Just what works.</Sub>
        </div>
        <PrimaryBtn onClick={() => setStep('submit')}>Continue →</PrimaryBtn>
      </Screen>
    ),

    // ── Screen 7: Submit ─────────────────────────────────────
    submit: (
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <AnimatePresence mode="wait">
          <Screen key="submit-screen">
            <Eyebrow text="Final step" />
            <Headline>Submit for review.</Headline>
            <div className="flex flex-col gap-3">
              <input
                className={inputCls}
                type="text"
                placeholder="Your name"
                required
                value={form.name}
                onChange={e => set('name', e.target.value)}
              />
              <input
                className={inputCls}
                type="email"
                placeholder="Email address"
                required
                value={form.email}
                onChange={e => set('email', e.target.value)}
              />
            </div>
            <PrimaryBtn type="submit" disabled={sending || !form.name.trim() || !form.email.trim()}>
              {sending ? 'Submitting...' : 'Submit →'}
            </PrimaryBtn>
          </Screen>
        </AnimatePresence>
      </form>
    ),

    // ── Screen 8: Confirmation ───────────────────────────────
    done: (
      <Screen>
        <Eyebrow text="Received" />
        <div className="space-y-4">
          <Headline>We're reviewing your page.</Headline>
          <Sub>You'll hear back with what we see — and how we'd improve it.</Sub>
          <p className="font-sans text-sm text-white/30 leading-relaxed italic">
            If it makes sense, we'll show you the direction we'd take.
          </p>
        </div>
        {/* Separator */}
        <div className="w-full h-px bg-white/[0.07]" />
        <button onClick={close} className="font-mono text-[10px] text-white/30 tracking-[0.3em] uppercase hover:text-white/50 transition-colors text-left">
          Close
        </button>
      </Screen>
    ),
  };

  // ── Progress indicator ────────────────────────────────────
  const ORDER: Step[] = ['intro', 'branch', 'url', 'what-you-build', 'goal', 'friction', 'who-for', 'system', 'submit', 'done'];
  const progressPct = Math.round(((ORDER.indexOf(step) + 1) / ORDER.length) * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-black/85 backdrop-blur-2xl"
            onClick={close}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg mx-4 bg-[#020202]/95 border border-white/10 rounded-[2rem] shadow-[0_0_80px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.06)] overflow-hidden"
          >
            {/* Inner dashed border */}
            <div className="absolute inset-[10px] rounded-[1.6rem] border border-white/5 border-dashed pointer-events-none z-0" />

            {/* Progress bar — top edge */}
            <div className="absolute top-0 left-0 w-full h-px bg-white/5">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-[#5443d3] transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>

            {/* Header row */}
            <div className="relative z-10 flex items-center justify-between px-5 sm:px-8 pt-6 sm:pt-8 pb-2">
              <span className="font-mono text-[9px] text-white/25 tracking-[0.35em] uppercase">Ronin One</span>
              <button
                onClick={close}
                className="text-white/25 hover:text-white/60 transition-colors duration-300"
                aria-label="Close"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="relative z-10 px-5 sm:px-8 pb-8 sm:pb-10 pt-5 sm:pt-6">
              <AnimatePresence mode="wait">
                <div key={step}>
                  {stepContent[step]}
                </div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
