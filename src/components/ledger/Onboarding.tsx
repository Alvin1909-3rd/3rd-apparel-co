'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';

const PRODUCT_HREF = '/shop/btcusd-hoodie';

const SLIDES = [
  {
    num: '01 / 03',
    title: 'You scanned the difference.',
    body: "This is a living guide to actually owning your money. No bank, no gatekeeper, no permission needed.",
  },
  {
    num: '02 / 03',
    title: "Here's how to move.",
    body: "Tap any entry to open it. Mark entries cleared as you finish, and your progress fills the ledger up top.",
  },
  {
    num: '03 / 03',
    title: 'The toolkit is always open.',
    body: "Tap the Toolkit for a plain English glossary, scam red flags, a security checklist, and a position sizer.",
  },
];

const SWIPE_THRESHOLD = 40;

interface OnboardingProps {
  onComplete: () => void;
  onSeen: () => void;
}

export default function Onboarding({ onComplete, onSeen }: OnboardingProps) {
  const [slide, setSlide] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const isLast = slide === SLIDES.length - 1;
  const goTo = (i: number) => setSlide(Math.max(0, Math.min(SLIDES.length - 1, i)));

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (dx <= -SWIPE_THRESHOLD) goTo(slide + 1);
    else if (dx >= SWIPE_THRESHOLD) goTo(slide - 1);
  };

  return (
    <div className="l-onboarding">
      <div className="l-onboarding__bg" />

      <div className="l-onboarding__logo">3RD APPAREL CO · THE CHOSEN FEW</div>

      <div
        className="l-onboarding__slides"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="l-onboarding__track"
          style={{ transform: `translateX(-${slide * 100}%)` }}
        >
          {SLIDES.map((s, i) => (
            <div key={i} className="l-onboarding__slide" aria-hidden={i !== slide}>
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
          <button
            key={i}
            type="button"
            className="l-onboarding__dot-btn"
            onClick={() => goTo(i)}
            aria-label={`Go to card ${i + 1} of ${SLIDES.length}`}
            aria-current={i === slide ? 'step' : undefined}
          >
            <span className={`l-onboarding__dot${i === slide ? ' l-onboarding__dot--active' : ''}`} />
          </button>
        ))}
      </div>

      <div className="l-onboarding__actions">
        {slide > 0 && (
          <button type="button" className="l-btn-ghost" onClick={() => goTo(slide - 1)}>
            Back
          </button>
        )}
        {isLast ? (
          <Link href={PRODUCT_HREF} className="l-btn-primary" onClick={onSeen}>
            Shop the BTC hoodie →
          </Link>
        ) : (
          <button type="button" className="l-btn-primary" onClick={() => goTo(slide + 1)}>
            Next →
          </button>
        )}
      </div>

      {isLast && (
        <button type="button" className="l-onboarding__skip" onClick={onComplete}>
          Or enter the guide first
        </button>
      )}
    </div>
  );
}
