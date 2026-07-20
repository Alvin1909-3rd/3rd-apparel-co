'use client';
import { useState } from 'react';

const SLIDES = [
  {
    num: '01 / 03',
    title: 'You scanned the difference.',
    body: "This is a living guide to actually owning your money — no bank, no gatekeeper, no permission needed.",
  },
  {
    num: '02 / 03',
    title: "Here's how to move.",
    body: "Tap any entry to open it. Mark entries cleared as you finish — your progress fills the ledger up top.",
  },
  {
    num: '03 / 03',
    title: 'The toolkit is always open.',
    body: "Tap the Toolkit for a plain-English glossary, scam red flags, a security checklist, and a position sizer.",
  },
];

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [slide, setSlide] = useState(0);

  const next = () => {
    if (slide < SLIDES.length - 1) {
      setSlide(s => s + 1);
    } else {
      onComplete();
    }
  };

  const isLast = slide === SLIDES.length - 1;

  return (
    <div className="l-onboarding">
      <div className="l-onboarding__bg" />

      <div className="l-onboarding__logo">3RD APPAREL CO · THE CHOSEN FEW</div>

      <div className="l-onboarding__slides">
        <div
          className="l-onboarding__track"
          style={{ transform: `translateX(-${slide * 100}%)` }}
        >
          {SLIDES.map((s, i) => (
            <div key={i} className="l-onboarding__slide">
              <div className="l-onboarding__card">
                <div className="l-onboarding__num">{s.num}</div>
                <div className="l-onboarding__title">{s.title}</div>
                <div className="l-onboarding__body">{s.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="l-onboarding__dots">
        {SLIDES.map((_, i) => (
          <div
            key={i}
            className={`l-onboarding__dot${i === slide ? ' l-onboarding__dot--active' : ''}`}
          />
        ))}
      </div>

      <div className="l-onboarding__actions">
        {slide > 0 && (
          <button className="l-btn-ghost" onClick={() => setSlide(s => s - 1)}>
            Back
          </button>
        )}
        <button className="l-btn-primary" onClick={next}>
          {isLast ? 'Enter the guide →' : 'Next →'}
        </button>
      </div>
    </div>
  );
}
