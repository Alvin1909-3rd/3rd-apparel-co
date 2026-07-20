'use client';
import { MODULES } from '@/data/ledgerContent';
import { LedgerProgress } from '@/hooks/useLedgerProgress';
import { IconCheck, IconModule, IconToolkit, IconSun, IconMoon } from './icons/ModuleIcons';

const TICKER_TEXT = '  (BTCUSD) · STORAGE OF WEALTH  ·  YOUR KEYS YOUR COINS  ·  NO MIDDLEMAN  ·  8 ENTRIES  ·  SELF-CUSTODY  ·  THE CHOSEN FEW  ·  DO YOUR OWN RESEARCH  ·  ';

interface HubProps {
  progress: LedgerProgress;
  firstVisit: boolean;
  onOpenModule: (index: number) => void;
  onOpenToolkit: (tab: string) => void;
  onToggleTheme: () => void;
}

export default function Hub({ progress, firstVisit, onOpenModule, onOpenToolkit, onToggleTheme }: HubProps) {
  const cleared = progress.clearedModules.length;
  const isDark = progress.theme === 'dark';

  return (
    <div className="l-hub">
      <div className="l-ticker" aria-hidden="true">
        <div className="l-ticker__inner">
          <span>{TICKER_TEXT}</span>
          <span>{TICKER_TEXT}</span>
        </div>
      </div>

      <div className="l-hub__header">
        <div className="l-hub__header-row">
          <div className="l-hub__eyebrow">3rd Apparel Co · The Ledger</div>
          <button className="l-hub__theme-btn" onClick={onToggleTheme} aria-label="Toggle theme">
            {isDark ? <IconSun size={15} /> : <IconMoon size={15} />}
          </button>
        </div>
        <h1 className="l-hub__title">Crypto, the<br />easy way.</h1>
        <p className="l-hub__subtitle">From someone who learned it the hard way.</p>
      </div>

      <div className="l-hub__rule" />

      <div className="l-ledger">
        <div className="l-ledger__header">
          <span className="l-ledger__label">LEDGER · ENTRIES CLEARED</span>
          <span className="l-ledger__count">
            <em>{cleared}</em>
            <small> / {MODULES.length}</small>
          </span>
        </div>
        <div className="l-ledger__steps">
          {MODULES.map(mod => {
            const isCleared = progress.clearedModules.includes(mod.id);
            return (
              <div
                key={mod.id}
                className={`l-ledger__step${isCleared ? ' l-ledger__step--done' : ''}`}
                style={{ '--mod-color': mod.color } as React.CSSProperties}
                title={mod.title}
              />
            );
          })}
        </div>
      </div>

      <div className="l-modules">
        {MODULES.map((mod, i) => {
          const isCleared = progress.clearedModules.includes(mod.id);
          const isPulse = firstVisit && i === 0;
          return (
            <button
              key={mod.id}
              className={`l-module-card${isCleared ? ' l-module-card--cleared' : ''}${isPulse ? ' l-module-card--pulse' : ''}`}
              style={{ '--mod-color': mod.color } as React.CSSProperties}
              onClick={() => onOpenModule(i)}
              aria-label={`Open module ${mod.id}: ${mod.title}`}
            >
              <span className="l-module-card__bg-num" aria-hidden="true">{mod.id}</span>
              <div className="l-module-card__icon">
                <IconModule id={mod.id} color={mod.color} size={22} />
              </div>
              <div className="l-module-card__meta">
                <div className="l-module-card__code">{mod.code}</div>
                <div className="l-module-card__title">{mod.title}</div>
                <div className="l-module-card__time">{mod.readTime} read</div>
              </div>
              <div className={`l-module-card__check${isCleared ? ' l-module-card__check--done' : ''}`}>
                {isCleared && <IconCheck size={12} color="#0C0C0E" />}
              </div>
            </button>
          );
        })}
      </div>

      <button className="l-toolkit-entry" onClick={() => onOpenToolkit('glossary')}>
        <div className="l-toolkit-entry__icon">
          <IconToolkit size={20} color="var(--fg-muted)" />
        </div>
        <div>
          <div className="l-toolkit-entry__label">REFERENCE</div>
          <div className="l-toolkit-entry__title">The Toolkit</div>
        </div>
        <div className="l-toolkit-entry__arrow">
          <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
            <path d="M6 3 L11 8 L6 13" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </button>

      <div className="l-hub__footer">
        <p className="l-hub__footer-line">
          You made it this far. The difference is worn, not told.{' '}
          <a href="/shop" className="l-hub__footer-link">Get yours →</a>
        </p>
        <p className="l-hub__footer-disclaimer">
          Educational only — not financial advice. Do your own research.
        </p>
        <p className="l-hub__footer-brand">3RD APPAREL CO · THE CHOSEN FEW</p>
      </div>
    </div>
  );
}
