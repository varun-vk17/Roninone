import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect } from 'react';

// Global trigger
export const openApplyModal = () => window.dispatchEvent(new Event('open-apply-modal'));

// ─── Types ──────────────────────────────────────────────────
type Step = 'intro' | 's1' | 's2' | 's3' | 's4' | 's5' | 'done';

interface FormState {
  businessStage: string;
  frustration: string;
  desiredFeeling: string[];
  oneThingToSolve: string;
  name: string;
  business: string;
  website: string;
}

// ─── Styles ──────────────────────────────────────────────────
const inputCls =
  'w-full bg-white/[0.04] border border-white/10 rounded-xl px-5 py-4 font-sans text-white text-sm outline-none transition-all duration-300 focus:bg-white/[0.07] focus:border-white/20 focus:shadow-[0_0_24px_rgba(255,255,255,0.04)] placeholder:text-white/20';

const STEPS: Step[] = ['intro', 's1', 's2', 's3', 's4', 's5', 'done'];

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

function OptionPill({
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
      className={`w-full text-left px-5 py-3.5 rounded-xl border text-sm font-sans transition-all duration-200 cursor-pointer ${
        selected
          ? 'border-white/30 bg-white/[0.07] text-white'
          : 'border-white/[0.07] bg-white/[0.02] text-white/50 hover:border-white/15 hover:text-white/75 hover:bg-white/[0.04]'
      }`}
    >
      {children}
    </button>
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

// ─── Main Component ──────────────────────────────────────────
export default function TheApplyModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>('intro');
  const [dir, setDir] = useState(1);

  const [form, setForm] = useState<FormState>({
    businessStage: '',
    frustration: '',
    desiredFeeling: [],
    oneThingToSolve: '',
    name: '',
    business: '',
    website: '',
  });

  const set = <K extends keyof FormState>(key: K, val: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: val }));

  const toggleFeeling = (val: string) => {
    setForm((f) => ({
      ...f,
      desiredFeeling: f.desiredFeeling.includes(val)
        ? f.desiredFeeling.filter((v) => v !== val)
        : [...f.desiredFeeling, val],
    }));
  };

  const goTo = (next: Step) => {
    const cur = STEPS.indexOf(step);
    const nxt = STEPS.indexOf(next);
    setDir(nxt > cur ? 1 : -1);
    setStep(next);
  };

  useEffect(() => {
    const handle = () => {
      setIsOpen(true);
      setStep('intro');
      setDir(1);
      setForm({ businessStage: '', frustration: '', desiredFeeling: [], oneThingToSolve: '', name: '', business: '', website: '' });
    };
    window.addEventListener('open-apply-modal', handle);
    return () => window.removeEventListener('open-apply-modal', handle);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  const buildWhatsAppMessage = () => {
    const feelings = form.desiredFeeling.length > 0 ? form.desiredFeeling.join(', ') : 'Not specified';
    const website = form.website.trim() || 'Not provided';
    const msg = `Hi Varun,\n\nI completed the Ronin clarity session.\n\nName: ${form.name}\nBusiness: ${form.business}\nWebsite: ${website}\n\nCurrent challenge:\n${form.businessStage}\n\nFrustration:\n${form.frustration}\n\nWhen people visit my site, I want them to feel:\n${feelings}\n\nOne thing Ronin can solve:\n${form.oneThingToSolve}`;
    return `https://wa.me/918610871405?text=${encodeURIComponent(msg)}`;
  };

  // Progress: s1–s5 are the 5 form steps
  const formSteps: Step[] = ['s1', 's2', 's3', 's4', 's5'];
  const formStepIdx = formSteps.indexOf(step);
  const showProgress = formStepIdx >= 0;
  const progressPct = showProgress
    ? Math.round(((formStepIdx + 1) / formSteps.length) * 100)
    : step === 'done' ? 100 : 0;

  const screens: Record<Step, React.ReactNode> = {

    // ── INTRO ──────────────────────────────────────────────────
    intro: (
      <Screen dir={dir}>
        <div className="space-y-5 py-2">
          <span className="font-mono text-[9px] text-white/25 tracking-[0.35em] uppercase">Business Clarity Session</span>
          <h2 className="font-display text-[1.65rem] sm:text-3xl text-white font-medium tracking-tight leading-[1.2]">
            Let's start with one question.
          </h2>
          <p className="font-sans text-sm text-white/40 leading-relaxed">
            Not an application. Not a form.<br />
            A guided experience to understand your business.
          </p>
        </div>
        <NextBtn onClick={() => goTo('s1')} label="Begin →" />
      </Screen>
    ),

    // ── SCREEN 1: Business Stage ────────────────────────────────
    s1: (
      <Screen dir={dir}>
        <div className="space-y-1">
          <h3 className="font-display text-xl sm:text-2xl text-white font-medium tracking-tight leading-snug">
            What best describes your business today?
          </h3>
        </div>
        <div className="flex flex-col gap-2.5">
          {[
            "We're just getting started.",
            "We're growing but don't stand out.",
            "We look outdated online.",
            "People don't understand what makes us different.",
            "Something else.",
          ].map((opt) => (
            <OptionPill
              key={opt}
              selected={form.businessStage === opt}
              onClick={() => {
                set('businessStage', opt);
                setTimeout(() => goTo('s2'), 200);
              }}
            >
              {opt}
            </OptionPill>
          ))}
        </div>
      </Screen>
    ),

    // ── SCREEN 2: Frustration ───────────────────────────────────
    s2: (
      <Screen dir={dir}>
        <div className="space-y-1">
          <h3 className="font-display text-xl sm:text-2xl text-white font-medium tracking-tight leading-snug">
            What's frustrating you most right now?
          </h3>
        </div>
        <div className="flex flex-col gap-2.5">
          {[
            "Not enough leads.",
            "Low trust.",
            "Weak first impressions.",
            "Website doesn't reflect our quality.",
            "Hard to explain what we do.",
          ].map((opt) => (
            <OptionPill
              key={opt}
              selected={form.frustration === opt}
              onClick={() => {
                set('frustration', opt);
                setTimeout(() => goTo('s3'), 200);
              }}
            >
              {opt}
            </OptionPill>
          ))}
        </div>
      </Screen>
    ),

    // ── SCREEN 3: Desired Feeling (multi-select) ────────────────
    s3: (
      <Screen dir={dir}>
        <div className="space-y-1">
          <h3 className="font-display text-xl sm:text-2xl text-white font-medium tracking-tight leading-snug">
            When someone visits your website, what should they feel?
          </h3>
          <p className="font-sans text-xs text-white/30 pt-1">Select all that apply.</p>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {['Trust', 'Confidence', 'Premium', 'Innovation', 'Simplicity', 'Authority'].map((opt) => (
            <OptionPill
              key={opt}
              selected={form.desiredFeeling.includes(opt)}
              onClick={() => toggleFeeling(opt)}
            >
              {opt}
            </OptionPill>
          ))}
        </div>
        <NextBtn onClick={() => goTo('s4')} disabled={form.desiredFeeling.length === 0} />
      </Screen>
    ),

    // ── SCREEN 4: Open Text ─────────────────────────────────────
    s4: (
      <Screen dir={dir}>
        <div className="space-y-1">
          <h3 className="font-display text-xl sm:text-2xl text-white font-medium tracking-tight leading-snug">
            If Ronin could solve one thing for you, what would it be?
          </h3>
        </div>
        <textarea
          autoFocus
          className={`${inputCls} resize-none`}
          rows={4}
          placeholder="e.g. Make it clear what we do in the first 5 seconds..."
          value={form.oneThingToSolve}
          onChange={(e) => set('oneThingToSolve', e.target.value)}
        />
        <NextBtn onClick={() => goTo('s5')} disabled={!form.oneThingToSolve.trim()} />
      </Screen>
    ),

    // ── SCREEN 5: Contact Details ───────────────────────────────
    s5: (
      <Screen dir={dir}>
        <div className="space-y-1">
          <h3 className="font-display text-xl sm:text-2xl text-white font-medium tracking-tight leading-snug">
            Tell us about your business.
          </h3>
        </div>
        <div className="flex flex-col gap-3">
          <input
            autoFocus
            type="text"
            className={inputCls}
            placeholder="Your name"
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
          />
          <input
            type="text"
            className={inputCls}
            placeholder="Business name"
            value={form.business}
            onChange={(e) => set('business', e.target.value)}
          />
          <input
            type="url"
            className={inputCls}
            placeholder="Website (optional)"
            value={form.website}
            onChange={(e) => set('website', e.target.value)}
          />
        </div>
        <NextBtn
          onClick={() => goTo('done')}
          disabled={!form.name.trim() || !form.business.trim()}
          label="See results →"
        />
      </Screen>
    ),

    // ── DONE: Final Screen ──────────────────────────────────────
    done: (
      <Screen dir={dir}>
        <div className="space-y-4 py-1">
          <h2 className="font-display text-2xl sm:text-3xl text-white font-medium tracking-tight leading-snug">
            We have enough to start the conversation.
          </h2>
          <p className="font-sans text-sm text-white/45 leading-relaxed">
            Based on your answers, it sounds like the challenge isn't just your website.
          </p>
          <p className="font-sans text-sm text-white/45 leading-relaxed">
            It's how your business is being perceived.
          </p>
          <p className="font-sans text-sm text-white/30 leading-relaxed">
            We'll review everything personally and get back to you within 24 hours.
          </p>
        </div>

        <div className="space-y-3">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => window.open(buildWhatsAppMessage(), '_blank')}
            className="w-full rounded-xl bg-[#25D366] px-6 py-4 font-display font-semibold text-white text-sm tracking-tight shadow-[0_0_30px_rgba(37,211,102,0.15)] hover:shadow-[0_0_40px_rgba(37,211,102,0.25)] transition-all duration-300 flex items-center justify-center gap-2.5"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Continue on WhatsApp →
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
                className="h-full bg-white/40"
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
