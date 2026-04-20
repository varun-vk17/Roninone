import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect } from 'react';

// Global trigger
export const openApplyModal = () => window.dispatchEvent(new Event('open-apply-modal'));

// ─── Types ──────────────────────────────────────────────────
type Step = 'intro' | 'q1' | 'q2' | 'q3' | 'q4' | 'q5' | 'q6' | 'q7' | 'contact' | 'done';

interface FormState {
  whatYouDo: string;
  whoFor: string;
  landingSource: string;
  goal: string;
  friction: string;
  revenue: string;
  url: string;
  name: string;
  email: string;
}

// ─── Styles ──────────────────────────────────────────────────
const inputCls =
  'w-full bg-white/[0.04] border border-white/10 rounded-xl px-5 py-4 font-sans text-white text-sm outline-none transition-all duration-300 focus:bg-white/[0.07] focus:border-cyan-400/50 focus:shadow-[0_0_24px_rgba(34,211,238,0.08)] placeholder:text-white/20';

const STEPS: Step[] = ['intro', 'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'contact', 'done'];

// ─── Sub-components ──────────────────────────────────────────
function Screen({ children, dir = 1 }: { children: React.ReactNode; dir?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: dir * 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: dir * -24 }}
      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-7"
    >
      {children}
    </motion.div>
  );
}

function QLabel({ step, total, children }: { step: number; total: number; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <span className="font-mono text-[9px] text-white/25 tracking-[0.3em] uppercase">
        {step} / {total}
      </span>
      <h3 className="font-display text-xl sm:text-2xl text-white font-medium tracking-tight leading-snug">
        {children}
      </h3>
    </div>
  );
}

function NextBtn({ onClick, disabled, label = 'Next →' }: { onClick: () => void; disabled?: boolean; label?: string }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className="w-full rounded-xl bg-white px-6 py-4 font-display font-semibold text-black text-sm tracking-tight shadow-[0_0_30px_rgba(255,255,255,0.07)] hover:shadow-[0_0_40px_rgba(255,255,255,0.14)] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
    >
      {label}
    </motion.button>
  );
}

function OptionPill({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  key?: React.Key;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-5 py-3.5 rounded-xl border text-sm font-sans transition-all duration-250 ${
        selected
          ? 'border-cyan-400/50 bg-cyan-400/[0.06] text-white shadow-[0_0_18px_rgba(34,211,238,0.08)]'
          : 'border-white/8 bg-white/[0.02] text-white/50 hover:border-white/15 hover:text-white/75 hover:bg-white/[0.04]'
      }`}
    >
      {children}
    </button>
  );
}

// ─── Main Component ──────────────────────────────────────────
export default function TheApplyModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>('intro');
  const [dir, setDir] = useState(1);
  const [sending, setSending] = useState(false);

  const [form, setForm] = useState<FormState>({
    whatYouDo: '',
    whoFor: '',
    landingSource: '',
    goal: '',
    friction: '',
    revenue: '',
    url: '',
    name: '',
    email: '',
  });

  const set = (key: keyof FormState, val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  const goTo = (next: Step) => {
    const cur = STEPS.indexOf(step);
    const nxt = STEPS.indexOf(next);
    setDir(nxt > cur ? 1 : -1);
    setStep(next);
  };

  const next = (s: Step) => goTo(s);

  useEffect(() => {
    const handle = () => {
      setIsOpen(true);
      setStep('intro');
      setDir(1);
      setForm({ whatYouDo: '', whoFor: '', landingSource: '', goal: '', friction: '', revenue: '', url: '', name: '', email: '' });
    };
    window.addEventListener('open-apply-modal', handle);
    return () => window.removeEventListener('open-apply-modal', handle);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  const handleSubmit = async () => {
    setSending(true);
    try {
      await fetch('https://formspree.io/f/YOUR_ENDPOINT_HERE', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } catch (_) {}
    setSending(false);
    next('done');
  };

  // Progress: exclude intro + done from bar
  const formSteps: Step[] = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'contact'];
  const formStepIdx = formSteps.indexOf(step);
  const showProgress = formStepIdx >= 0;
  const progressPct = showProgress
    ? Math.round(((formStepIdx + 1) / formSteps.length) * 100)
    : step === 'done' ? 100 : 0;

  const screens: Record<Step, React.ReactNode> = {

    // ── STEP 1: LANDING ────────────────────────────────────────
    intro: (
      <Screen dir={dir}>
        <div className="space-y-5 py-4">
          <div className="space-y-1">
            <span className="font-mono text-[9px] text-white/25 tracking-[0.35em] uppercase">Get clarity audit</span>
          </div>
          <h2 className="font-display text-[1.65rem] sm:text-3xl text-white font-medium tracking-tight leading-[1.2]">
            Let's find what's blocking your conversions.
          </h2>
          <p className="font-sans text-sm text-white/40 leading-relaxed">
            Answer a few quick questions.<br />
            You'll get a clear breakdown of what's not working.
          </p>
        </div>
        <NextBtn onClick={() => next('q1')} label="Start audit →" />
      </Screen>
    ),

    // ── STEP 2: FORM (one question per screen) ─────────────────
    q1: (
      <Screen dir={dir}>
        <QLabel step={1} total={7}>What do you do?</QLabel>
        <input
          autoFocus
          className={inputCls}
          placeholder="e.g. I run a coaching business..."
          value={form.whatYouDo}
          onChange={e => set('whatYouDo', e.target.value)}
        />
        <NextBtn onClick={() => next('q2')} disabled={!form.whatYouDo.trim()} />
      </Screen>
    ),

    q2: (
      <Screen dir={dir}>
        <QLabel step={2} total={7}>Who do you sell to?</QLabel>
        <input
          autoFocus
          className={inputCls}
          placeholder="e.g. Agency owners, ecommerce brands..."
          value={form.whoFor}
          onChange={e => set('whoFor', e.target.value)}
        />
        <NextBtn onClick={() => next('q3')} disabled={!form.whoFor.trim()} />
      </Screen>
    ),

    q3: (
      <Screen dir={dir}>
        <QLabel step={3} total={7}>Where do people land first?</QLabel>
        <div className="flex flex-col gap-2.5">
          {(['Website', 'Landing page', 'Instagram', 'Other'] as const).map(opt => (
            <OptionPill
              key={opt}
              selected={form.landingSource === opt}
              onClick={() => set('landingSource', opt)}
            >
              {opt}
            </OptionPill>
          ))}
        </div>
        <NextBtn onClick={() => next('q4')} disabled={!form.landingSource} />
      </Screen>
    ),

    q4: (
      <Screen dir={dir}>
        <QLabel step={4} total={7}>What's your main goal?</QLabel>
        <div className="flex flex-col gap-2.5">
          {(['Leads', 'Sales', 'Calls', 'Signups'] as const).map(opt => (
            <OptionPill
              key={opt}
              selected={form.goal === opt}
              onClick={() => set('goal', opt)}
            >
              {opt}
            </OptionPill>
          ))}
        </div>
        <NextBtn onClick={() => next('q5')} disabled={!form.goal} />
      </Screen>
    ),

    q5: (
      <Screen dir={dir}>
        <QLabel step={5} total={7}>What's not working right now?</QLabel>
        <textarea
          autoFocus
          className={`${inputCls} resize-none`}
          rows={4}
          placeholder="People land but don't take action. The page feels unclear..."
          value={form.friction}
          onChange={e => set('friction', e.target.value)}
        />
        <NextBtn onClick={() => next('q6')} disabled={!form.friction.trim()} />
      </Screen>
    ),

    q6: (
      <Screen dir={dir}>
        <QLabel step={6} total={7}>Monthly revenue range</QLabel>
        <div className="flex flex-col gap-2.5">
          {(['$0 – $5k', '$5k – $15k', '$15k – $30k', '$30k+'] as const).map(opt => (
            <OptionPill
              key={opt}
              selected={form.revenue === opt}
              onClick={() => set('revenue', opt)}
            >
              {opt}
            </OptionPill>
          ))}
        </div>
        <NextBtn onClick={() => next('q7')} disabled={!form.revenue} />
      </Screen>
    ),

    q7: (
      <Screen dir={dir}>
        <QLabel step={7} total={7}>Link to your current page</QLabel>
        <input
          autoFocus
          type="url"
          className={inputCls}
          placeholder="https://yourpage.com"
          value={form.url}
          onChange={e => set('url', e.target.value)}
        />
        <NextBtn onClick={() => next('contact')} disabled={!form.url.trim()} />
      </Screen>
    ),

    // ── CONTACT: where to send the breakdown ──────────────────
    contact: (
      <Screen dir={dir}>
        <div className="space-y-1">
          <span className="font-mono text-[9px] text-white/25 tracking-[0.3em] uppercase">Last step</span>
          <h3 className="font-display text-xl sm:text-2xl text-white font-medium tracking-tight leading-snug">
            Where should we send the breakdown?
          </h3>
        </div>
        <div className="flex flex-col gap-3">
          <input
            autoFocus
            type="text"
            className={inputCls}
            placeholder="Your name"
            value={form.name}
            onChange={e => set('name', e.target.value)}
          />
          <input
            type="email"
            className={inputCls}
            placeholder="Email address"
            value={form.email}
            onChange={e => set('email', e.target.value)}
          />
        </div>
        <NextBtn
          onClick={handleSubmit}
          disabled={sending || !form.name.trim() || !form.email.trim()}
          label={sending ? 'Submitting...' : 'Submit audit →'}
        />
      </Screen>
    ),

    // ── STEP 3: TRANSITION SCREEN ─────────────────────────────
    done: (
      <Screen dir={dir}>
        <div className="space-y-5 py-2">
          <div className="w-8 h-8 rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="rgb(34,211,238)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="space-y-3">
            <h2 className="font-display text-2xl sm:text-3xl text-white font-medium tracking-tight leading-snug">
              Got it. Here's what happens next.
            </h2>
            <p className="font-sans text-sm text-white/45 leading-relaxed">
              We'll review your business and identify what's blocking clarity, trust, and conversion.
            </p>
            <p className="font-sans text-sm text-white/30 leading-relaxed">
              If there's a real opportunity to fix it, we'll send you a breakdown + next steps.
            </p>
          </div>
        </div>

        {/* STEP 4: POWER MOVE — WhatsApp redirect */}
        <div className="space-y-3">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() =>
              window.open(
                'https://wa.me/918610871405?text=Just%20submitted%20the%20audit.%20Looking%20forward%20to%20your%20breakdown.',
                '_blank'
              )
            }
            className="w-full rounded-xl bg-[#25D366] px-6 py-4 font-display font-semibold text-white text-sm tracking-tight shadow-[0_0_30px_rgba(37,211,102,0.15)] hover:shadow-[0_0_40px_rgba(37,211,102,0.25)] transition-all duration-300 flex items-center justify-center gap-2.5"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Message us on WhatsApp ↗
          </motion.button>

          <button
            type="button"
            onClick={close}
            className="w-full font-mono text-[9px] text-white/20 tracking-[0.35em] uppercase hover:text-white/40 transition-colors py-1"
          >
            Close
          </button>
        </div>
      </Screen>
    ),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-2xl"
            onClick={close}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md flex flex-col bg-[#030303] border border-white/[0.08] rounded-[2rem] shadow-[0_0_100px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.05)] overflow-hidden"
          >
            {/* Dashed inner border */}
            <div className="absolute inset-[10px] rounded-[1.55rem] border border-white/[0.04] border-dashed pointer-events-none z-0" />

            {/* Progress bar */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-white/[0.04] z-10">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500"
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            {/* Fixed header */}
            <div className="relative z-10 flex items-center justify-between px-7 pt-7 pb-4 flex-shrink-0">
              <div className="flex items-center gap-2.5">
                {step !== 'intro' && step !== 'done' && (
                  <button
                    type="button"
                    onClick={() => {
                      const idx = STEPS.indexOf(step);
                      if (idx > 0) goTo(STEPS[idx - 1] as Step);
                    }}
                    className="text-white/25 hover:text-white/55 transition-colors mr-1"
                    aria-label="Back"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M19 12H5M5 12l7 7M5 12l7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                )}
                <span className="font-mono text-[9px] text-white/20 tracking-[0.35em] uppercase">Ronin One</span>
              </div>
              <button
                onClick={close}
                className="text-white/20 hover:text-white/50 transition-colors"
                aria-label="Close"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="relative z-10 px-7 pb-8 pt-2 overflow-hidden">
              <AnimatePresence mode="wait" custom={dir}>
                <div key={step}>
                  {screens[step]}
                </div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
